<template>
  <div>
    <div class="mt-4">
      <v-card>
        <v-data-table
          :headers="headers"
          :items="users"
          class="border"
          :loading="isLoading"
          loading-text="Loading... Please wait"
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
                  @input="searchInput"
                ></v-text-field>
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="800px">
                <template v-slot:activator="{ on }">
                  <v-btn color="primary" dark class="mb-2" v-on="on"><v-icon>mdi-map-marker</v-icon>Add User</v-btn>
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
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field 
                            label="Last name" 
                            v-model="form.lastName"
                            :error-messages="fieldErrors('form.lastName')"
                            @input="$v.form.lastName.$touch()"
                            @blur="$v.form.lastName.$touch()"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="12">
                          <v-text-field 
                            label="Email" 
                            v-model="form.email"
                            type="email"
                            :error-messages="fieldErrors('form.email')"
                            @input="$v.form.email.$touch()"
                            @blur="$v.form.email.$touch()"
                          ></v-text-field>
                          <v-text-field 
                            label="Password" 
                            v-model="form.password"
                            type="password"
                            :error-messages="fieldErrors('form.password')"
                            @input="$v.form.password.$touch()"
                            @blur="$v.form.password.$touch()"
                            v-if="editedIndex === -1"
                          ></v-text-field>
                          <v-text-field 
                            label="Phone number" 
                            v-model="form.phoneNumber"
                            :error-messages="fieldErrors('form.phoneNumber')"
                            @input="$v.form.phoneNumber.$touch()"
                            @blur="$v.form.phoneNumber.$touch()"
                          ></v-text-field>
                          <v-select
                            label="User type"
                            :items="['User', 'Admin']"
                            v-model="form.userType"
                            :error-messages="fieldErrors('form.userType')"
                            @input="$v.form.userType.$touch()"
                            @blur="$v.form.userType.$touch()"
                          ></v-select>
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
            <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
            <v-icon small @click="showDeleteConfirmDialog(item)">mdi-delete</v-icon>
          </template>
          <template slot="item.name" slot-scope="{ item }">
            {{ item.firstName + ' ' + item.lastName }}
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
          </template>
        </v-data-table>
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
import {
  required,
  requiredIf,
  maxLength,
  minLength,
  email,
  numeric
} from "vuelidate/lib/validators";
import validationMixin from "@/mixins/validationMixin";
import debounce from "debounce";
import { upload } from "@/fileupload";

export default {
  name: "AdminUsers",
  mixins: [validationMixin],
  validations: {
    form: {
      firstName: { required },
      lastName: { required },
      email: { required, email },
      phoneNumber: { required, numeric },
      userType: { required },
      password: {
        required: requiredIf(function (nestedModel) {
          return this.editedIndex === -1;
        }),
        minLength: minLength(6)
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
        minLength: "Password must be more than 6 characters"
      }
    }
  },
  components: {
    vueDropzone: vue2Dropzone
  },
  data: () => ({
    dialog: false,
    headers: [
      { text: "Name", value: "name" },
      { text: "Email", value: "email" },
      { text: "Phone number", value: "phoneNumber" },
      { text: "User type", value: "userType" },
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
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Add User" : "Edit User";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    ...mapActions("user", ["getUsers", "addUser", "updateUser", "deleteUser"]),
    async initialize() {
      this.isLoading = true;
      this.users = await this.getUsers();
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
      this.initialize();
    },

    showDeleteConfirmDialog(item) {
      this.deleteConfirmDialog = true;
      this.selectedItemId = item.id;
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.form = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    async save() {
      if (this.editedIndex > -1) {
        let res = await this.updateUser(this.form);
      } else {
        let res = await this.addUser(this.form);
      }
      this.initialize();
      this.close();
    },

    async fileAdded(file) {
      this.form.avatarURL = await upload(file[0]);
    },

    searchInput: debounce(async function () {
      // this.initialize();
    }, 500)
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

::v-deep .dropzone .dz-preview .dz-progress
  display: none
</style>