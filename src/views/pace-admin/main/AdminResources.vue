<template>
  <div>
    <div class="mt-4">
      <v-card>
        <v-data-table :headers="headers" :items="resources" :search="search" sort-by="calories" class="border">
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
                            item-text="title"
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
                          <v-text-field 
                            label="Type" 
                            v-model="form.type"
                            :error-messages="fieldErrors('form.type')"
                            @input="$v.form.type.$touch()"
                            @blur="$v.form.type.$touch()"
                          ></v-text-field>
                          <v-text-field 
                            label="Duration"
                            type="number" 
                            v-model="form.duration"
                            :error-messages="fieldErrors('form.duration')"
                            @input="$v.form.duration.$touch()"
                            @blur="$v.form.duration.$touch()"
                          ></v-text-field>
                          <v-checkbox
                            v-model="form.isProgram"
                            label="Is program"
                          ></v-checkbox>
                          <v-textarea 
                            label="Overview" 
                            v-model="form.overview"
                            :error-messages="fieldErrors('form.overview')"
                            @input="$v.form.overview.$touch()"
                            @blur="$v.form.overview.$touch()"
                            :counter="1200"
                            :rows="4"
                          ></v-textarea>
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
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
            <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
          </template>
        </v-data-table>
      </v-card>
    </div>
  </div>
</template>

<script>
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
      duration: { required },
      overview: { 
        required,
        maxLength: maxLength(1200)
      }
    }
  },
  validationMessages: {
    form: {
      projectId: {
        required: "Name is required"
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
      },
      overview: {
        required: "Overview is required",
        maxLength: "Overview should be less than 1200 characters"
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
        value: "logo"
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
      type: null,
      duration: null,
      isProgram: false,
      overview: null,
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
      isProgram: false,
      overview: null,
    }
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
    ...mapActions("resource", ["getTotalResources", "addResource", "getResourceDetail"]),
    async initialize() {
      this.resources = await this.getTotalResources();
      this.projects = await this.getProjects();
    },

    editItem(item) {
      this.editedIndex = this.resources.indexOf(item);
      this.form = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.resources.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.resources.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.form = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.resources[this.editedIndex], this.form);
      } else {
        this.resources.push(this.form);
      }
      this.close();
    }
  }
};
</script>