<template>
  <div>
    <div class="mt-4">
      <v-card>
        <v-data-table
          :headers="headers"
          :items="projects"
          sort-by="calories"
          class="border"
          :loading="isLoading"
          loading-text="Loading... Please wait"
          :page.sync="page"
          :items-per-page="itemsPerPage"
          hide-default-footer
          @page-count="pageCount = $event"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search Projects"
                  single-line
                  hide-details
                  @input="searchInput"
                ></v-text-field>
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="800px">
                <template v-slot:activator="{ on }">
                  <v-btn color="primary" dark class="mb-2" v-on="on"><v-icon>mdi-map-marker</v-icon>Add Project</v-btn>
                </template>
                <v-card>
                  <v-card-title class="bg-pace-yellow">
                    <span class="headline white--text">{{ formTitle }}</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" md="8">
                          <v-text-field 
                            label="Name" 
                            v-model="form.name"
                            :error-messages="fieldErrors('form.name')"
                            @input="$v.form.name.$touch()"
                            @blur="$v.form.name.$touch()"
                          ></v-text-field>
                          <v-text-field 
                            label="Abbreviation" 
                            v-model="form.abbreviation"
                            :error-messages="fieldErrors('form.abbreviation')"
                            @input="$v.form.abbreviation.$touch()"
                            @blur="$v.form.abbreviation.$touch()"
                          ></v-text-field>
                          <v-text-field 
                            label="ProjectLead" 
                            v-model="form.projectLead"
                            :error-messages="fieldErrors('form.projectLead')"
                            @input="$v.form.projectLead.$touch()"
                            @blur="$v.form.projectLead.$touch()"
                          ></v-text-field>
                          <v-textarea 
                            label="Description" 
                            v-model="form.description"
                            :error-messages="fieldErrors('form.description')"
                            @input="$v.form.description.$touch()"
                            @blur="$v.form.description.$touch()"
                            :counter="1200"
                            :rows="4"
                          ></v-textarea>
                          <v-text-field 
                            label="Url" 
                            v-model="form.url"
                            :error-messages="fieldErrors('form.url')"
                            @input="$v.form.url.$touch()"
                            @blur="$v.form.url.$touch()"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4" class="position-relative">
                          <vue-dropzone 
                            ref="dropzone"
                            id="dropzone" 
                            :options="dropzoneOptions" 
                            :useCustomSlot="true" 
                            v-on:vdropzone-files-added="fileAdded"
                          >
                            <div class="dropzone-custom-content bg-pace-grey border-grey" v-if="form.logo">
                              <img :src="form.logo" width="100%" height="100%" />
                            </div>
                            <div class="dropzone-custom-content bg-pace-grey border-grey" v-else>
                              <h3 class="dropzone-custom-title white--text">No Logo</h3>
                              <div class="subtitle">Click here or drag drop to upload</div>
                            </div>
                          </vue-dropzone>
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
          <template slot="item.logo" slot-scope="{ item }">
            <img :src="item.logo" height="48px" class="d-block"/>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
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
import vue2Dropzone from 'vue2-dropzone'
import Vue from 'vue';
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
  name: "AdminProjects",
  mixins: [validationMixin],
  validations: {
    form: {
      name: { required },
      description: { 
        required,
        maxLength: maxLength(1200),
      },
      abbreviation: { required },
      logo: { required },
      url: { required },
      projectLead: { required }
    }
  },
  validationMessages: {
    form: {
      name: {
        required: "Name is required"
      },
      description: {
        required: "Description is required",
        maxLength: "Description should be less than 1200 characters"
      },
      abbreviation: {
        required: "Abbreviation is required"
      },
      logo: { required: "Logo is required" },
      url: { required: "Url is required" },
      projectLead: { required: "Project lead is required" }
    }
  },
  components: {
    vueDropzone: vue2Dropzone
  },
  data: () => ({
    dialog: false,
    headers: [
      {
        text: "Logo",
        align: "start",
        sortable: false,
        value: "logo"
      },
      { text: "Name", value: "name" },
      { text: "Abbreviation", value: "abbreviation" },
      { text: "Lead", value: "projectLead" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    projects: [],
    editedIndex: -1,
    defaultItem: {
      name: null,
      description: null,
      abbreviation: null,
      logo: null,
      url: null,
      projectLead: null
    },
    search: null,
    form: {
      name: null,
      description: null,
      abbreviation: null,
      logo: null,
      url: null,
      projectLead: null
    },
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
    deleteConfirmDialog: false,
    selectedItemId: null,
    isLoading: false,
    page: 1,
    pageCount: 0,
    itemsPerPage: 5,
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Add Project" : "Edit Project";
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
    ...mapActions("project", ["getProjects", "addProject", "getProject", "editProject", "deleteProject"]),
    async initialize() {
      this.isLoading = true;
      this.projects = await this.getProjects(this.search);
      this.isLoading = false;
    },

    editItem(item) {
      this.editedIndex = this.projects.indexOf(item);
      this.form = Object.assign({}, item);
      this.dialog = true;
    },

    async deleteItem() {
      await this.deleteProject(this.selectedItemId);
      this.$notify({
        text: 'Project deleted successfully',
        type: 'success'
      });
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
        let res = await this.editProject(this.form);
        this.$notify({
          text: 'Project updated successfully',
          type: 'success'
        });
      } else {
        let res = await this.addProject(this.form);
        this.$notify({
          text: 'Project added successfully',
          type: 'success'
        });
      }
      this.initialize();
      this.close();
    },

    async fileAdded(file) {
      this.form.logo = await upload(file[0]);
    },

    searchInput: debounce(async function () {
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