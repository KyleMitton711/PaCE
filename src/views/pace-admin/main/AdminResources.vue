<template>
  <div>
    <div class="mt-4">
      <v-card>
        <v-data-table :headers="headers" :items="resources" :search="search" sort-by="calories" class="border" :loading="isLoading">
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search Resources"
                  single-line
                  hide-details
                ></v-text-field>
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="800px">
                <template v-slot:activator="{ on }">
                  <v-btn color="primary" dark class="mb-2" v-on="on"><v-icon>mdi-map-marker</v-icon>Add Resource</v-btn>
                </template>
                <v-card>
                  <v-card-title class="bg-pace-yellow">
                    <span class="headline white--text">{{ formTitle }}</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <v-select
                            :items="projects"
                            item-value="id"
                            item-text="name"
                            v-model="form.projectId"
                            label="Project"
                            :error-messages="fieldErrors('form.projectId')"
                            @input="$v.form.projectId.$touch()"
                            @blur="$v.form.projectId.$touch()"
                          ></v-select>
                          <v-text-field 
                            label="Title" 
                            v-model="form.title"
                            :error-messages="fieldErrors('form.title')"
                            @input="$v.form.title.$touch()"
                            @blur="$v.form.title.$touch()"
                          ></v-text-field>
                          <v-text-field 
                            label="Url" 
                            v-model="form.url"
                            :error-messages="fieldErrors('form.url')"
                            @input="$v.form.url.$touch()"
                            @blur="$v.form.url.$touch()"
                          ></v-text-field>
                          <v-textarea 
                            label="Outcome" 
                            v-model="form.outcome"
                            :error-messages="fieldErrors('form.outcome')"
                            @input="$v.form.outcome.$touch()"
                            @blur="$v.form.outcome.$touch()"
                            :counter="1200"
                            :rows="4"
                          ></v-textarea>
                          <v-textarea 
                            label="Endorsements" 
                            v-model="form.endorsements"
                            :error-messages="fieldErrors('form.endorsements')"
                            @input="$v.form.endorsements.$touch()"
                            @blur="$v.form.endorsements.$touch()"
                            :counter="500"
                          ></v-textarea>
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-text-field 
                            label="Type" 
                            v-model="form.type"
                            :error-messages="fieldErrors('form.type')"
                            @input="$v.form.type.$touch()"
                            @blur="$v.form.type.$touch()"
                            readonly
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-text-field 
                            label="Duration"
                            type="number" 
                            v-model="form.duration"
                            :error-messages="fieldErrors('form.duration')"
                            @input="$v.form.duration.$touch()"
                            @blur="$v.form.duration.$touch()"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-autocomplete
                            v-model="selectedTags"
                            :items="tags"
                            item-text="name"
                            chips
                            label="Tags"
                            multiple
                            deletable-chips
                            clearable
                            return-object
                            @change="selectTags"
                          ></v-autocomplete>
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
          <template slot="item.projectId" slot-scope="{ item }">
            {{ getProjectName(item.projectId) }}
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
import { mapActions } from 'vuex';
import {
  required,
  maxLength,
} from "vuelidate/lib/validators";
import validationMixin from "@/mixins/validationMixin";
import debounce from "debounce";

export default {
  name: "AdminResources",
  mixins: [validationMixin],
  validations: {
    form: {
      projectId: { required },
      title: { required },
      url: { required },
      outcome: { 
        required,
        maxLength: maxLength(1200),
      },
      endorsements: {
        required,
        maxLength: maxLength(500)
      },
      type: { required },
      duration: { required }
    }
  },
  validationMessages: {
    form: {
      projectId: {
        required: "Project is required"
      },
      title: { 
        required: "Title is required"
      },
      url: { 
        required: "Url is required"
      },
      outcome: { 
        required: "Outcome is required",
        maxLength: "Outcome should be less than 1200 characters"
      },
      endorsements: { 
        required: "Endorsements is required"
      },
      type: {
        required: "Type is required"
      },
      duration: {
        required: "Duration is required"
      }
    }
  },
  data: () => ({
    dialog: false,
    headers: [
      {
        text: "Project",
        align: "start",
        sortable: false,
        value: "projectId"
      },
      { text: "Title", value: "title" },
      { text: "Type", value: "type" },
      { text: "Duration", value: "duration" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    resources: [],
    projects: [],
    editedIndex: -1,
    defaultItem: {
      projectId: null,
      title: null,
      url: null,
      outcome: null,
      endorsements: null,
      type: "Toolkit",
      duration: null,
      capabilityCodes: [],
      tagFilterAudienceIds: [],
      tagFilterTypeIds: [],
      tagFilterModeIds: [],
      tagContentPadegogyIds: [],
      tagContentTopicIds: [],
      tagContentSymptomIds: [],
      tagContentIllnessIds: [],
      tagContentContextIds: [],
      tagContentRoleIds: []
    },
    search: null,
    form: {
      projectId: null,
      title: null,
      url: null,
      outcome: null,
      endorsements: null,
      type: "Toolkit",
      duration: null,
      capabilityCodes: [],
      tagFilterAudienceIds: [],
      tagFilterTypeIds: [],
      tagFilterModeIds: [],
      tagContentPadegogyIds: [],
      tagContentTopicIds: [],
      tagContentSymptomIds: [],
      tagContentIllnessIds: [],
      tagContentContextIds: [],
      tagContentRoleIds: []
    },
    filters: {},
    isLoading: false,
    deleteConfirmDialog: false,
    selectedItemId: null,
    tags: [],
    selectedTags: []
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Add Resource" : "Edit Resource";
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
    ...mapActions("project", ["getProjects"]),
    ...mapActions("resource", ["filterResources", "addResource", "getResourceDetail", "deleteResource", "updateResource"]),
    ...mapActions("tag", ["getTags"]),
    async initialize() {
      this.isLoading = true;
      this.projects = await this.getProjects();
      this.tags = await this.getTags();
      let res = await this.filterResources(this.filters);
      this.resources = Object.assign([], res.results);
      this.isLoading = false;
    },

    editItem(item) {
      this.editedIndex = this.resources.indexOf(item);
      this.form = Object.assign({}, item);
      this.dialog = true;
    },

    async deleteItem() {
      await this.deleteResource(this.selectedItemId);
      this.deleteConfirmDialog = false;
      this.initialize();
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
        let res = await this.updateResource(this.form);
      } else {
        let res = await this.addResource(this.form);
      }
      this.initialize();
      this.close();
    },

    getProjectName (id) {
      let project = this.projects.filter(item => item.id == id);
      return project.length > 0 ? project[0].name : "";
    },

    showDeleteConfirmDialog(item) {
      this.deleteConfirmDialog = true;
      this.selectedItemId = item.id;
    },

    refreshTags () {
      this.form.tagFilterAudienceIds = [];
      this.form.tagFilterTypeIds = [];
      this.form.tagFilterModeIds = [];
      this.form.tagContentPadegogyIds = [];
      this.form.tagContentTopicIds = [];
      this.form.tagContentSymptomIds = [];
      this.form.tagContentIllnessIds = [];
      this.form.tagContentContextIds = [];
      this.form.tagContentRoleIds = [];
    },

    selectTags() {
      this.refreshTags();
      for (let i = 0; i < this.selectedTags.length ; i ++) {
        let tag = this.selectedTags[i];
        if (this.form['tag' + tag.tagType + 'Ids'].indexOf(tag.id) == -1) {
          this.form['tag' + tag.tagType + 'Ids'].push(tag.id);
        }
      }
    }
  }
};
</script>