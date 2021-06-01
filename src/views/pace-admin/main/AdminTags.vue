<template>
  <div>
    <div class="mt-4">
      <v-card>
        <v-card-title>{{ tagTypeLabel }}</v-card-title>
        <v-data-table
          :headers="headers"
          :items="tags"
          item-key="index"
          class="border"
          :loading="isLoading"
          loading-text="Loading... Please wait"
          :page.sync="page"
          :items-per-page="itemsPerPage"
          hide-default-footer
          @page-count="pageCount = $event"
          :search="search"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search tags"
                  @input="searchInput"
                  single-line
                  hide-details
                  clearable
                ></v-text-field>
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" persistent max-width="500px">
                <template v-slot:activator="{ on }">
                  <v-btn color="primary" dark class="mb-2" v-on="on"><v-icon>mdi-tag</v-icon>Add Tag</v-btn>
                </template>
                <v-card>
                  <v-card-title class="bg-pace-yellow">
                    <span class="headline white--text">{{ formTitle }}</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field 
                            label="Name *" 
                            v-model="form.name"
                            :error-messages="fieldErrors('form.name')"
                            @input="$v.form.name.$touch()"
                            @blur="$v.form.name.$touch()"
                          >
                            <template v-slot:label>
                              <span>Name</span><span class="red--text ml-1">*</span>
                            </template>
                          </v-text-field>
                          <v-select
                            label="Tag type"
                            :items="tagTypeItems"
                            item-text="name"
                            item-value="key"
                            v-model="form.tagType"
                            :error-messages="fieldErrors('form.tagType')"
                            @blur="$v.form.tagType.$touch()"
                            readonly
                          ></v-select>
                          <v-text-field 
                            label="Icon"
                            v-if="form.tagType == 12"
                            v-model="form.logo"
                            :hint="'https://materialdesignicons.com/'"
                            persistent-hint
                          >
                            <template v-slot:message="{ }">
                              <a target="_blank" href="https://materialdesignicons.com/">https://materialdesignicons.com</a>
                            </template>
                          </v-text-field>
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
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reload</v-btn>
          </template>
        </v-data-table>
        <div class="text-xs-center pt-2">
          <v-pagination v-model="page" :length="pageCount"></v-pagination>
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
import { mapActions } from 'vuex';
import {
  required
} from "vuelidate/lib/validators";
import validationMixin from "@/mixins/validationMixin";
import debounce from "debounce";
import { tagTypeEnumItems } from "@/data/staticItems";
import { findIndex } from "lodash";

export default {
  name: "AdminTags",
  mixins: [validationMixin],
  validations: {
    form: {
      name: { required },
      tagType: { required }
    }
  },
  validationMessages: {
    form: {
      name: {
        required: "Name is required"
      },
      tagType: {
        required: "Tag type is required"
      },
    }
  },
  data: () => ({
    dialog: false,
    headers: [
      {
        text: "Name",
        align: "start",
        value: "name"
      },
      { text: "Actions", value: "actions", sortable: false }
    ],
    tags: [],
    tagTypeItems: tagTypeEnumItems,
    editedIndex: -1,
    defaultItem: {
      name: null,
      tagType: null,
      logo: null
    },
    search: null,
    form: {
      name: null,
      tagType: null,
      logo: null
    },
    deleteConfirmDialog: false,
    selectedItem: null,
    isLoading: false,
    page: 1,
    pageCount: 0,
    itemsPerPage: 15,
    tagType: null,
    tagTypeLabel: null
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Add Tag" : "Edit Tag";
    },
  },

  watch: {
    dialog(val) {
      if (val) {
        // this.$v.$touch();
      } else {
        this.close();
      }
    },

    "$route.params.tagType": function(val) {
      this.tagType = parseInt(val);
      this.form.tagType = this.tagType;
      this.defaultItem.tagType = this.tagType;
      let tagIndex = findIndex(this.tagTypeItems, (o) => { return o.key == this.tagType; });
      this.tagTypeLabel = this.tagTypeItems[tagIndex].pageTitle;
      this.search = null;
      this.initialize();
    }
  },

  created() {
    this.itemsPerPage = Math.floor((window.innerHeight - 300) / 55);
    this.tagType = parseInt(this.$route.params.tagType);
    this.form.tagType = this.tagType;
    this.defaultItem.tagType = this.tagType;
    let tagIndex = findIndex(this.tagTypeItems, (o) => { return o.key == this.tagType; });
    this.tagTypeLabel = this.tagTypeItems[tagIndex].pageTitle;
    this.initialize();
  },

  methods: {
    ...mapActions("tag", ["getTags", "addTag", "updateTag", "deleteTag"]),
    async initialize() {
      this.isLoading = true;
      let data = await this.getTags(this.tagType);
      this.tags = data.map((item, index) => {
        let tagIndex = findIndex(this.tagTypeItems, function(o) { return o.key == item.tagType; });
        return { ...item, index, tagLabel: this.tagTypeItems[tagIndex].name }
      });
      this.isLoading = false;
    },

    editItem(item) {
      this.editedIndex = this.tags.indexOf(item);
      this.form = Object.assign({}, item);
      this.dialog = true;
    },

    async deleteItem() {
      await this.deleteTag(this.selectedItem);
      this.$notify({
        text: "Tag deleted successfully",
        type: "success",
      });
      this.deleteConfirmDialog = false;
      this.page = 1;
      this.initialize();
    },

    showDeleteConfirmDialog(item) {
      this.deleteConfirmDialog = true;
      this.selectedItem = Object.assign({}, item);
    },

    close() {
      this.dialog = false;
      this.form = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
      setTimeout(() => {
        this.$v.$reset();
      }, 100);
    },

    async save() {
      if (this.editedIndex > -1) {
        let res = await this.updateTag(this.form);
        if (res.errors == null) {
          this.$notify({
            text: "Tag updated successfully",
            type: "success",
          });
          this.initialize();
          this.close();
        } else {
          this.$notify({
            text: res.errors[0].errorMessage,
            type: "error",
          });
        }
      } else {
        let res = await this.addTag(this.form);
        if (res.errors == null) {
          this.$notify({
            text: "Project added successfully",
            type: "success",
          });
          this.initialize();
          this.close();
        } else {
          this.$notify({
            text: res.errors[0].errorMessage,
            type: "error",
          });
        }
      }
    },

    searchInput: debounce(async function () {
      this.page = 1;
      this.initialize();
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