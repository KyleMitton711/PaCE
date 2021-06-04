<template>
  <div>
    <div class="mt-4">
      <v-card>
        <v-data-table
          :headers="headers"
          :items="users"
          class="border"
          hide-default-footer
          :loading="isLoading"
          :items-per-page="pagination.PageSize"
          loading-text="Loading... Please wait"
          @update:options="onOptionUpdated"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search Users"
                  single-line
                  hide-details
                  clearable
                  :autocomplete="false"
                  @input="searchInput"
                ></v-text-field>
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" persistent max-width="800px">
                <template v-slot:activator="{ on }">
                  <v-btn color="primary" dark class="mb-2" v-on="on"><v-icon>mdi-account-multiple</v-icon>Add User</v-btn>
                </template>
                <v-card>
                  <v-card-title class="bg-pace-yellow">
                    <span class="headline white--text">{{ formTitle }}</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" v-if="editedIndex > -1" class="position-relative">
                          <vue-dropzone 
                            ref="dropzone"
                            id="dropzone" 
                            :options="dropzoneOptions" 
                            :useCustomSlot="true" 
                            v-on:vdropzone-files-added="fileAdded"
                          >
                            <div class="dropzone-custom-content bg-pace-grey border-grey" v-if="form.avatarURL">
                              <img :src="form.form.avatarURL" width="100%" height="100%" />
                            </div>
                            <div class="dropzone-custom-content bg-pace-grey border-grey" v-else>
                              <h3 class="dropzone-custom-title white--text">No avatar</h3>
                              <div class="subtitle">Click here or drag drop to upload</div>
                            </div>
                          </vue-dropzone>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field 
                            label="First name" 
                            v-model="form.firstName"
                            :error-messages="fieldErrors('form.firstName')"
                            @input="$v.form.firstName.$touch()"
                            @blur="$v.form.firstName.$touch()"
                          >
                            <template v-slot:label>
                              <span>First name</span><span class="red--text ml-1">*</span>
                            </template>
                          </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field 
                            label="Last name" 
                            v-model="form.lastName"
                            :error-messages="fieldErrors('form.lastName')"
                            @input="$v.form.lastName.$touch()"
                            @blur="$v.form.lastName.$touch()"
                          >
                            <template v-slot:label>
                              <span>Last name</span><span class="red--text ml-1">*</span>
                            </template>
                          </v-text-field>
                        </v-col>
                        <v-col cols="12" md="12">
                          <v-text-field 
                            label="Email" 
                            v-model="form.email"
                            type="email"
                            :error-messages="fieldErrors('form.email')"
                            @input="$v.form.email.$touch()"
                            @blur="$v.form.email.$touch()"
                          >
                            <template v-slot:label>
                              <span>Email</span><span class="red--text ml-1">*</span>
                            </template>
                          </v-text-field>
                          <v-text-field 
                            label="Password" 
                            v-model="form.password"
                            type="password"
                            :error-messages="fieldErrors('form.password')"
                            @input="$v.form.password.$touch()"
                            @blur="$v.form.password.$touch()"
                            v-if="editedIndex === -1"
                          >
                            <template v-slot:label>
                              <span>Password</span><span class="red--text ml-1">*</span>
                            </template>
                          </v-text-field>
                          <v-text-field 
                            label="Phone number" 
                            v-model="form.phoneNumber"
                            :error-messages="fieldErrors('form.phoneNumber')"
                            @input="$v.form.phoneNumber.$touch()"
                            @blur="$v.form.phoneNumber.$touch()"
                          >
                            <template v-slot:label>
                              <span>Phone number</span><span class="red--text ml-1">*</span>
                            </template>
                          </v-text-field>
                          <v-select
                            label="User type"
                            :items="userTypeItems"
                            item-value="id"
                            item-text="name"
                            v-model="form.userType"
                            v-if="editedIndex === -1"
                            :error-messages="fieldErrors('form.userType')"
                            @input="$v.form.userType.$touch()"
                            @blur="$v.form.userType.$touch()"
                          >
                            <template v-slot:label>
                              <span>User type</span><span class="red--text ml-1">*</span>
                            </template>
                          </v-select>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="border-pace-orange pace-orange--text" @click="close">Cancel</v-btn>
                    <v-btn class="bg-pace-orange white--text" :disabled="$v.form.$invalid" @click="save">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template slot="item.actions" slot-scope="{ item }">
            <v-icon small class="mr-2 pace-yellow--text" @click="editItem(item)">mdi-pencil</v-icon>
            <v-icon small class="pace-orange--text" @click="showDeleteConfirmDialog(item)">mdi-delete</v-icon>
          </template>
          <template slot="item.fullName" slot-scope="{ item }">
            <span class="font-weight-title">{{ item.fullName }}</span>
          </template>
          <template slot="item.userType" slot-scope="{ item }">
            {{ item.userTypeLabel }}
          </template>
          <template slot="item.archived" slot-scope="{ item }">
            {{ item.archived != null ? moment(item.archived).format('YYYY-MM-DD hh:mm') : '' }}
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reload</v-btn>
          </template>
        </v-data-table>
        <div class="text-xs-center pt-2" v-if="pagination.total">
          <v-pagination v-model="pagination.PageIndex" :length="Math.ceil(pagination.total / pagination.PageSize)" @input="loadUsers"></v-pagination>
        </div>
        <v-dialog v-model="deleteConfirmDialog" max-width="400px">
          <v-card>
            <v-card-title class="bg-pace-yellow">
              <span class="headline white--text">Confirm Deletion</span>
            </v-card-title>
            <v-card-text class="pt-2">
              <span class="title black--text">Are you sure you want to delete this item?</span>
            </v-card-text>
            <v-card-actions>
              <v-btn class="border-pace-orange pace-orange--text" @click="deleteConfirmDialog = false">Cancel</v-btn>
              <v-spacer></v-spacer>
              <v-btn class="bg-pace-orange white--text" @click="deleteItem">Delete</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card>
    </div>
  </div>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone'
import { mapActions } from 'vuex';
import moment from 'moment';
import {
  required,
  requiredIf,
  maxLength,
  minLength,
  email,
  numeric,
  helpers 
} from "vuelidate/lib/validators";
import validationMixin from "@/mixins/validationMixin";
import debounce from "debounce";
import { upload } from "@/fileupload";
import { validPassword } from "@/utils/validators"

const validateIf = (prop, validator) =>
  helpers.withParams({ type: 'validatedIf', prop }, function(value, parentVm) {
    return helpers.ref(prop, this, parentVm) ? validator(value) : true
  })

export default {
  name: "AdminUsers",
  mixins: [validationMixin],
  validations: {
    form: {
      firstName: { required },
      lastName: { required },
      email: { required, email },
      phoneNumber: { required, numeric },
      userType: { 
        required: requiredIf(function (nestedModel) {
          return this.editedIndex === -1;
        }),
      },
      password: {
        required: requiredIf(function (nestedModel) {
          return this.editedIndex === -1;
        }),
        validPassword: validateIf(function (nestedModel) {
          return this.editedIndex === -1;
        }, validPassword),
        minLength: validateIf(function (nestedModel) {
          return this.editedIndex === -1;
        }, minLength(6))
      }
    }
  },
  validationMessages: {
    form: {
      firstName: {
        required: "First name is required"
      },
      lastName: {
        required: "Last name is required"
      },
      email: {
        required: "Email is required",
        email: "Email must be valid"
      },
      phoneNumber: {
        required: "Phone number is required",
        numeric: "Phone number must be valid",
      },
      userType: { required: "User type is required" },
      password: { 
        required: "Password is required",
        minLength: "Password must be more than 6 characters",
        validPassword: "Password must contain uppercase, lowercase, number and symbol"
      }
    }
  },
  components: {
    vueDropzone: vue2Dropzone
  },
  data: () => ({
    dialog: false,
    headers: [
      { text: "Name", value: "fullName" },
      { text: "Email", value: "email" },
      { text: "Phone number", value: "phoneNumber" },
      { text: "User type", value: "userType", sortable: false },
      { text: "Archived", value: "archived" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    users: [],
    editedIndex: -1,
    defaultItem: {
      firstName: null,
      lastName: null,
      email: null,
      phoneNumber: null,
      userType: null,
      password: null,
      avatarURL: null
    },
    search: null,
    form: {
      firstName: null,
      lastName: null,
      email: null,
      phoneNumber: null,
      userType: null,
      password: null,
      avatarURL: null
    },
    deleteConfirmDialog: false,
    selectedItemId: null,
    isLoading: false,
    dropzoneOptions: {
      url: 'https://httpbin.org/post',
      thumbnailWidth: 150,
      maxFilesize: 0.5,
      headers: { "My-Awesome-Header": "header value" },
      autoDiscover: false,
      autoProcessQueue: false,
      autoQueue: false,
      acceptedFiles: "image/png, image/jpeg",
    },
    userTypeItems: [{
        id: 0,
        name: 'User'
      }, {
        id: 2,
        name: 'Admin'
      }],
    pagination: {
      PageIndex: 1,
      PageSize: 10,
      total: null
    },
    sort: {
      sortBy: null,
      isDescending: true,
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Add User" : "Edit User";
    },
    moment() {
      return moment;
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.pagination.PageSize = Math.floor((window.innerHeight - 200) / 55);
    this.initialize();
  },

  methods: {
    ...mapActions("user", ["getUsers", "addUser", "updateUser", "deleteUser"]),
    
    onOptionUpdated(options) {
      this.sort.sortBy = options.sortBy[0];
      this.sort.isDescending = options.sortDesc[0];
      this.initialize();
    },

    async initialize() {
      this.isLoading = true;
      let payload = {
        PageIndex: this.pagination.PageIndex,
        PageSize: this.pagination.PageSize,
        SearchText: this.search
      };
      if (this.sort.sortBy) {
        payload = { ...payload, ...this.sort };
      }
      if (this.search == null || this.search.length == 0) {
        delete payload['SearchText'];
      }
      let res = await this.getUsers(payload);
      this.users = res.results;
      this.pagination.total = res.total;
      this.users = this.users.map(item => {
        let label = "";
        for (let i = 0; i < this.userTypeItems.length; i ++) {
          if (this.userTypeItems[i].id == item.userType) {
            label = this.userTypeItems[i].name;
          }
        }
        return { ...item, userTypeLabel: label }
      })
      this.isLoading = false;
    },

    editItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.form = Object.assign({}, item);
      this.dialog = true;
    },

    async deleteItem() {
      await this.deleteUser(this.selectedItemId);
      this.deleteConfirmDialog = false;
      this.pagination.PageIndex = 1;
      this.initialize();
    },

    showDeleteConfirmDialog(item) {
      this.deleteConfirmDialog = true;
      this.selectedItemId = item.id;
    },

    close() {
      this.dialog = false;
      this.form = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
      setTimeout(() => {
        this.$v.$reset();
        this.$refs.dropzone.removeAllFiles();
      }, 100)
    },

    async save() {
      if (this.editedIndex > -1) {
        let res = await this.updateUser(this.form);
        console.log(res)
        if (res === true) {
          this.$notify({
            text: 'User updated successfully',
            type: 'success'
          });
          this.initialize();
          this.close();
        } else {
          this.$notify({
            text: res.errors[0].errorMessage,
            type: 'error'
          });
        }
      } else {
        let res = await this.addUser(this.form);
        if (res === true) {
          this.$notify({
            text: 'User added successfully',
            type: 'success'
          });
          this.initialize();
          this.close();
        } else {
          this.$notify({
            text: res.errors[0].errorMessage,
            type: 'error'
          });
        }
      }
      
    },

    async fileAdded(file) {
      this.form.avatarURL = await upload(file[0]);
    },

    searchInput: debounce(async function () {
      this.pagination.PageIndex = 1;
      this.initialize();
    }, 500),

    loadUsers: debounce(async function () {
      this.initialize();
    }, 500),
  }
};
</script>
<style lang="sass" scoped>
.dropzone-custom-content 
  text-align: center

.dropzone-custom-title 
  margin-top: 0
  color: #00b782

.subtitle 
  color: #314b5f

.vue-dropzone.dropzone
  background-color: #939597
  width: 200px
  height: 200px
  border-radius: 50%
  margin: 0 auto
  overflow: hidden

::v-deep .dropzone .dz-preview
    margin: 0

::v-deep .dropzone .dz-preview .dz-progress
  display: none
</style>