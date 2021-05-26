<template>
  <div>
    <div class="mt-4">
      <v-card>
        <v-data-table 
          :headers="headers" 
          :items="resources" 
          hide-default-footer 
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
                  label="Search Programs"
                  single-line
                  hide-details
                  clearable
                  @input="searchInput"
                ></v-text-field>
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="800px">
                <template v-slot:activator="{ on }">
                  <v-btn color="primary" dark class="mb-2" v-on="on"><v-icon>mdi-select-group</v-icon>Add Program</v-btn>
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
                          <p>Overview</p>
                          <tiptap-vuetify
                            v-model="form.overview"
                            placeholder="Overview"
                            :card-props="{ flat: true, outlined: true }"
                            :extensions="extensions"
                          />
                          <!--tiptap-vuetify
                            v-model="form.outcome"
                            placeholder="Outcome"
                            :extensions="extensions"
                            :card-props="{ flat: true, outlined: true }"
                          /-->
                          <v-textarea 
                            label="Certifications" 
                            v-model="form.endorsements"
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
                          <!--tiptap-vuetify
                            v-model="form.overview"
                            placeholder="Overview"
                            :card-props="{ flat: true, outlined: true }"
                            :extensions="extensions"
                          /-->
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
                            v-model="form.tagFilterAudienceIds"
                            :items="filterAudienceTags"
                            item-text="name"
                            item-value="id"
                            chips
                            label="FilterAudience"
                            multiple
                            deletable-chips
                            clearable
                          >
                          </v-autocomplete>
                          <!--v-autocomplete
                            v-model="form.tagFilterTypeIds"
                            :items="filterTypeTags"
                            item-text="name"
                            item-value="id"
                            chips
                            label="FilterType"
                            multiple
                            deletable-chips
                            clearable
                          >
                          </v-autocomplete-->
                          <v-autocomplete
                            v-model="form.tagFilterModeIds"
                            :items="filterModeTags"
                            item-text="name"
                            item-value="id"
                            chips
                            label="FilterMode"
                            multiple
                            deletable-chips
                            clearable
                          >
                          </v-autocomplete>
                          <!--v-autocomplete
                            v-model="form.tagContentPadegogyIds"
                            :items="contentPadegogyTags"
                            item-text="name"
                            item-value="id"
                            chips
                            label="ContentPadegogy"
                            multiple
                            deletable-chips
                            clearable
                          >
                          </v-autocomplete>
                          <v-autocomplete
                            v-model="form.tagContentTopicIds"
                            :items="contentTopicTags"
                            item-text="name"
                            item-value="id"
                            chips
                            label="ContentTopic"
                            multiple
                            deletable-chips
                            clearable
                          >
                          </v-autocomplete>
                          <v-autocomplete
                            v-model="form.tagContentSymptomIds"
                            :items="contentSymptomTags"
                            item-text="name"
                            item-value="id"
                            chips
                            label="ContentSymptom"
                            multiple
                            deletable-chips
                            clearable
                          >
                          </v-autocomplete>
                          <v-autocomplete
                            v-model="form.tagContentIllnessIds"
                            :items="contentIllnessTags"
                            item-text="name"
                            item-value="id"
                            chips
                            label="ContentIllness"
                            multiple
                            deletable-chips
                            clearable
                          >
                          </v-autocomplete>
                          <v-autocomplete
                            v-model="form.tagContentContextIds"
                            :items="contentContextTags"
                            item-text="name"
                            item-value="id"
                            chips
                            label="ContentContext"
                            multiple
                            deletable-chips
                            clearable
                          >
                          </v-autocomplete>
                          <v-autocomplete
                            v-model="form.tagContentRoleIds"
                            :items="contentRoleTags"
                            item-text="name"
                            item-value="id"
                            chips
                            label="ContentRole"
                            multiple
                            deletable-chips
                            clearable
                          >
                          </v-autocomplete-->
                        </v-col>
                      </v-row>
                      <v-row class="d-flex justify-center">
                        <v-col md="6" cols="12">
                          <v-list>
                            <v-subheader inset>Selected modules</v-subheader>
                            <draggable
                              :list="selectedModules" 
                              group="resources" 
                              class="p-2 cursor-move" 
                              style="min-height: 150px;" 
                              :multiDrag="true"
                              selectedClass="bg-pace-grey"
                            >
                              <v-list-item v-for="listItem in selectedModules" :key="listItem.id" @click.prevent>
                                <v-list-item-avatar>
                                  <img :src="listItem.projectLogo" />
                                </v-list-item-avatar>

                                <v-list-item-content>
                                  <v-list-item-title v-text="listItem.title"></v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>
                            </draggable>
                          </v-list>
                        </v-col>
                        <v-col md="6" cols="12">
                          <v-text-field
                            v-model="resourceKeyword"
                            append-icon="mdi-magnify"
                            label="Resources"
                            single-line
                            hide-details
                            clearable
                            @input="searchResource"
                          ></v-text-field>
                          <v-list max-height="200px" height="200px" style="overflow-y: scroll;">
                            <draggable 
                              :list="totalResources" 
                              group="resources" 
                              class="p-2 cursor-move" 
                              :multiDrag="true"
                              selectedClass="bg-pace-grey"
                            >
                              <v-list-item
                                v-for="listItem in totalResources" 
                                :key="listItem.id" 
                                @click.prevent 
                                role="item" 
                              >
                                <v-list-item-avatar>
                                  <img :src="listItem.projectLogo" />
                                </v-list-item-avatar>

                                <v-list-item-content>
                                  <v-list-item-title v-text="listItem.title"></v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>
                            </draggable>
                          </v-list>
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
          <v-pagination v-model="pagination.pageIndex" :length="Math.ceil(pagination.total / pagination.pageSize)" @input="loadPrograms"></v-pagination>
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
import draggable from "vuedraggable";
import { TiptapVuetify, Heading, Bold, Italic, Strike, Underline, Code, Paragraph, BulletList, OrderedList, ListItem, Link, Blockquote, HardBreak, HorizontalRule, History } from 'tiptap-vuetify'

export default {
  name: "AdminPrograms",
  mixins: [validationMixin],
  validations: {
    form: {
      projectId: { required },
      title: { required },
      url: { required },
      type: { required },
      duration: {  },
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
    draggable,
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
      isProgram: true,
      capabilityCodes: [],
      tagFilterAudienceIds: [],
      tagFilterTypeIds: [],
      tagFilterModeIds: [],
      tagContentPadegogyIds: [],
      tagContentTopicIds: [],
      tagContentSymptomIds: [],
      tagContentIllnessIds: [],
      tagContentContextIds: [],
      tagContentRoleIds: [],
      items: [] // modules
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
      isProgram: true,
      capabilityCodes: [],
      tagFilterAudienceIds: [],
      tagFilterTypeIds: [],
      tagFilterModeIds: [],
      tagContentPadegogyIds: [],
      tagContentTopicIds: [],
      tagContentSymptomIds: [],
      tagContentIllnessIds: [],
      tagContentContextIds: [],
      tagContentRoleIds: [],
      items: [] // modules
    },
    filters: {
      isProgram: true
    },
    isLoading: false,
    deleteConfirmDialog: false,
    selectedItemId: null,
    tags: [],
    filterAudienceTags: [],
    filterTypeTags: [],
    filterModeTags: [],
    contentPadegogyTags: [],
    contentTopicTags: [],
    contentSymptomTags: [],
    contentIllnessTags: [],
    contentContextTags: [],
    contentRoleTags: [],
    capabilityCodes: capabilityCodes,
    resourceTypeItems: resourceTypeEnumItems,
    tagTypeItems: tagTypeEnumItems,
    capabilityCodeItems: [],
    selectedModules: [],
    totalResources: [],
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
      pageSize: 15,
      pageIndex: 1,
      total: null
    },
    resourceKeyword: null
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Add Program" : "Edit Program";
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
    ...mapActions("resource", ["getResources", "filterResources", "addResource", "getResourceDetail", "deleteResource", "updateResource"]),
    ...mapActions("tag", ["getTags"]),
    
    async initialize() {
      this.isLoading = true;
      this.projects = await this.getProjects();
      let tagdata = await this.getTags();
      this.tags = tagdata.map((item, index) => {
        let tagIndex = findIndex(this.tagTypeItems, function(o) { return o.key == item.tagType; });
        return { ...item, index, tagLabel: this.tagTypeItems[tagIndex].name }
      });
      this.filterAudienceTags = this.tags.filter(item => item.tagLabel == "FilterAudience");
      this.filterTypeTags = this.tags.filter(item => item.tagLabel == "FilterType");
      this.filterModeTags = this.tags.filter(item => item.tagLabel == "FilterMode");
      this.contentPadegogyTags = this.tags.filter(item => item.tagLabel == "ContentPadegogy");
      this.contentTopicTags = this.tags.filter(item => item.tagLabel == "ContentTopic");
      this.contentSymptomTags = this.tags.filter(item => item.tagLabel == "ContentSymptom");
      this.contentIllnessTags = this.tags.filter(item => item.tagLabel == "ContentIllness");
      this.contentContextTags = this.tags.filter(item => item.tagLabel == "ContentContext");
      this.contentRoleTags = this.tags.filter(item => item.tagLabel == "ContentRole");
      this.loadPrograms();
      let res = await this.filterResources({isProgram: false});
      this.totalResources = Object.assign([], res.results);
      this.totalResources = this.totalResources.filter(item => {
        if (!item.isProgram) {
          if (item.items == null || item.items.length == 0) {
            return item;
          }
        }
      });
      
      this.isLoading = false;
    },

    async editItem(item) {
      this.editedIndex = this.resources.indexOf(item);
      let res = await this.getResourceDetail(item.id);
      this.form = Object.assign({}, res);
      this.selectedModules = this.form.items != null ? Object.assign([], this.form.items) : [];
      this.dialog = true;
    },

    async deleteItem() {
      await this.deleteResource(this.selectedItemId);
      this.deleteConfirmDialog = false;
      this.pagination.pageIndex = 1;
      this.initialize();
    },

    close() {
      this.dialog = false;
      this.form = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
      this.selectedTags = [];
      setTimeout(() => {
        this.$v.$reset();
      }, 100)
    },

    async save() {
      this.selectedModules = this.selectedModules.map((item, index) => ({ ...item, itemNum: index + 1}));
      this.form.items = [];
      for (let i = 0; i < this.selectedModules.length; i ++) {
        this.form.items.push(this.selectedModules[i].id);
      }
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

    async loadPrograms() {
      this.isLoading = true;
      if (this.search && this.search.length > 0) {
        this.filters['searchText'] = this.search;
      } else {
        delete this.filters['searchText'];
      }
      this.filters.pageIndex = this.pagination.pageIndex;
      this.filters.pageSize = this.pagination.pageSize;
      let res = await this.filterResources(this.filters);
      this.resources = res.results
        .filter(item => item.isProgram)
        .map((item, index) => {
        let resourceTypeIndex = findIndex(this.resourceTypeItems, function(o) { return o.key == item.type; });
        return { ...item, index, resourceTypeLabel: resourceTypeIndex > -1 ? this.resourceTypeItems[resourceTypeIndex].name : item.type }
      });
      this.pagination.pageSize = res.pageSize;
      this.pagination.total = res.total;
      this.pagination.pageIndex = res.currentPage;
      this.isLoading = false;
    },

    searchInput: debounce(async function () {
      this.pagination.pageIndex = 1;
      this.loadPrograms();
    }, 500),

    searchResource: debounce(async function () {
      let res = await this.filterResources({isProgram: false, searchText: this.resourceKeyword});
      this.totalResources = Object.assign([], res.results);
      this.totalResources = this.totalResources.filter(item => {
        if (!item.isProgram) {
          if (item.items == null || item.items.length == 0) {
            return item;
          }
        }
      });
    }, 300),
  }
};
</script>