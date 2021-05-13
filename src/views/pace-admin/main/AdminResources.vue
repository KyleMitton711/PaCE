<template>
  <div>
    <div class="mt-4">
      <v-card>
        <v-data-table :headers="headers" :items="resources" hide-default-footer class="border" :loading="isLoading">
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search Resources"
                  single-line
                  hide-details
                  @input="searchInput"
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
                          <tiptap-vuetify
                            v-model="form.outcome"
                            placeholder="Outcome"
                            :extensions="extensions"
                            :card-props="{ flat: true, outlined: true }"
                          />
                          <!-- <v-textarea 
                            label="Outcome" 
                            v-model="form.outcome"
                            :error-messages="fieldErrors('form.outcome')"
                            @input="$v.form.outcome.$touch()"
                            @blur="$v.form.outcome.$touch()"
                            :counter="1200"
                            :rows="4"
                          ></v-textarea> -->
                          <v-textarea 
                            label="Endorsements" 
                            v-model="form.endorsements"
                            :counter="500"
                          ></v-textarea>
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-select 
                            label="Type" 
                            v-model="form.type"
                            :error-messages="fieldErrors('form.type')"
                            @blur="$v.form.type.$touch()"
                            :items="resourceTypeItems"
                            item-value="key"
                            item-text="name"
                          ></v-select>
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-text-field 
                            label="Duration"
                            v-model="form.duration"
                            :error-messages="fieldErrors('form.duration')"
                            @input="$v.form.duration.$touch()"
                            @blur="$v.form.duration.$touch()"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <!-- <v-textarea 
                            label="Overview" 
                            v-model="form.overview"
                            :counter="1200"
                          ></v-textarea> -->
                          <tiptap-vuetify
                            v-model="form.overview"
                            placeholder="Overview"
                            :card-props="{ flat: true, outlined: true }"
                            :extensions="extensions"
                          />
                          <v-select
                            v-model="form.capabilityCodes"
                            :items="capabilityCodeItems"
                            chips
                            label="Capability Codes"
                            multiple
                            :error-messages="fieldErrors('form.capabilityCodes')"
                            @blur="$v.form.capabilityCodes.$touch()"
                          ></v-select>
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
            <v-icon small class="mr-2 pace-yellow--text" @click="editItem(item)">mdi-pencil</v-icon>
            <v-icon small class="pace-orange--text" @click="showDeleteConfirmDialog(item)">mdi-delete</v-icon>
          </template>
          <template slot="item.projectId" slot-scope="{ item }">
            {{ getProjectName(item.projectId) }}
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
          </template>
        </v-data-table>
        <div class="text-xs-center pt-2" v-if="pagination.total">
          <v-pagination v-model="pagination.pageIndex" :length="Math.ceil(pagination.total / pagination.pageSize)" @input="loadResources"></v-pagination>
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
  required,
  maxLength,
} from "vuelidate/lib/validators";
import validationMixin from "@/mixins/validationMixin";
import debounce from "debounce";
import { capabilityCodes } from "@/data/capabilitycodes";
import { resourceTypeEnumItems, tagTypeEnumItems } from "@/data/staticItems";
import { findIndex } from "lodash";
import { TiptapVuetify, Heading, Bold, Italic, Strike, Underline, Code, Paragraph, BulletList, OrderedList, ListItem, Link, Blockquote, HardBreak, HorizontalRule, History } from 'tiptap-vuetify'

export default {
  name: "AdminResources",
  mixins: [validationMixin],
  validations: {
    form: {
      projectId: { required },
      title: { required },
      url: { required },
      type: { required },
      duration: { required },
      capabilityCodes: { required }
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
      type: {
        required: "Type is required"
      },
      duration: {
        required: "Duration is required"
      },
      capabilityCodes: {
        required: "Capability Codes is required"
      }
    }
  },
  components: { 
    TiptapVuetify 
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
      { text: "Type", value: "resourceTypeLabel" },
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
      type: null,
      duration: null,
      overview: null,
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
      type: null,
      duration: null,
      overview: null,
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
    resourceTypeItems: resourceTypeEnumItems,
    tagTypeItems: tagTypeEnumItems,
    filters: {},
    isLoading: false,
    deleteConfirmDialog: false,
    selectedItemId: null,
    tags: [],
    selectedTags: [],
    capabilityCodes: capabilityCodes,
    capabilityCodeItems: [],
    extensions: [
      History,
      Blockquote,
      Link,
      Underline,
      Strike,
      Italic,
      ListItem,
      BulletList,
      OrderedList,
      [Heading, {
        options: {
          levels: [1, 2, 3]
        }
      }],
      Bold,
      Code,
      HorizontalRule,
      Paragraph,
      HardBreak
    ],
    pagination: {
      pageSize: 5,
      pageIndex: 1,
      total: null
    },
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

  mounted() {
    for (let i = 0; i < capabilityCodes.length; i ++) {
      let code = capabilityCodes[i];
      let items = code.items.map((item, index) => {
        return code.short + (index + 1)
      });
      this.capabilityCodeItems = [...this.capabilityCodeItems, ...items]
    }
  },

  methods: {
    ...mapActions("project", ["getProjects"]),
    ...mapActions("resource", ["filterResources", "addResource", "getResourceDetail", "deleteResource", "updateResource"]),
    ...mapActions("tag", ["getTags"]),
    
    async initialize() {
      this.isLoading = true;
      this.projects = await this.getProjects();
      let tagdata = await this.getTags();
      this.tags = tagdata.map((item, index) => {
        let tagIndex = findIndex(this.tagTypeItems, function(o) { return o.key == item.tagType; });
        return { ...item, index, tagLabel: this.tagTypeItems[tagIndex].name }
      });
      this.loadResources();
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
        if (this.form['tag' + tag.tagLabel + 'Ids'].indexOf(tag.id) == -1) {
          this.form['tag' + tag.tagLabel + 'Ids'].push(tag.id);
        }
      }
    },

    async loadResources() {
      if (this.search && this.search.length > 0) {
        this.filters['searchText'] = this.search;
      } else {
        delete this.filters['searchText'];
      }
      this.filters.pageIndex = this.pagination.pageIndex;
      this.filters.pageSize = this.pagination.pageSize;
      let res = await this.filterResources(this.filters);
      let data = Object.assign([], res.results);
      this.resources = data.map((item, index) => {
        let resourceTypeIndex = findIndex(this.resourceTypeItems, function(o) { return o.key == item.type; });
        return { ...item, index, resourceTypeLabel: resourceTypeIndex > -1 ? this.resourceTypeItems[resourceTypeIndex].name : item.type }
      });
      this.pagination.pageSize = res.pageSize;
      this.pagination.total = res.total;
      this.pagination.pageIndex = res.currentPage;
    },

    searchInput: debounce(async function () {
      this.loadResources();
    }, 500)
  }
};
</script>