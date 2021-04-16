<template>
  <div>
    <div class="mt-4">
      <v-card>
        <v-data-table :headers="headers" :items="projects" :search="search" sort-by="calories" class="border">
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search Projects"
                  single-line
                  hide-details
                ></v-text-field>
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on }">
                  <v-btn color="primary" dark class="mb-2" v-on="on"><v-icon>mdi-map-marker</v-icon>Add Project</v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field 
                            label="Name" 
                            v-model="form.name"
                            :error-messages="fieldErrors('form.name')"
                            @input="$v.form.name.$touch()"
                            @blur="$v.form.name.$touch()"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-textarea 
                            label="Description" 
                            v-model="form.description"
                            :error-messages="fieldErrors('form.description')"
                            @input="$v.form.description.$touch()"
                            @blur="$v.form.description.$touch()"
                            :rows="4"
                          ></v-textarea>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field 
                            label="Abbreviation" 
                            v-model="form.abbreviation"
                            :error-messages="fieldErrors('form.abbreviation')"
                            @input="$v.form.abbreviation.$touch()"
                            @blur="$v.form.abbreviation.$touch()"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-file-input
                            show-size
                            v-model="form.logo"
                            label="Logo" 
                            accept="image/*"
                            truncate-length="20"
                            :error-messages="fieldErrors('form.logo')"
                            @input="$v.form.logo.$touch()"
                            @blur="$v.form.logo.$touch()"
                          ></v-file-input>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field 
                            label="Url" 
                            v-model="form.url"
                            :error-messages="fieldErrors('form.url')"
                            @input="$v.form.url.$touch()"
                            @blur="$v.form.url.$touch()"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field 
                            label="ProjectLead" 
                            v-model="form.projectLead"
                            :error-messages="fieldErrors('form.projectLead')"
                            @input="$v.form.projectLead.$touch()"
                            @blur="$v.form.projectLead.$touch()"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                    <v-btn color="blue darken-1" text :disabled="$v.form.$invalid" @click="save">Save</v-btn>
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
  name: "AdminProjects",
  mixins: [validationMixin],
  validations: {
    form: {
      name: { required },
      description: { required },
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
        required: "Description is required"
      },
      abbreviation: {
        required: "Abbreviation is required"
      },
      logo: { required: "Logo is required" },
      url: { required: "Url is required" },
      projectLead: { required: "Project lead is required" }
    }
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
    }
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Project" : "Edit Project";
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
    ...mapActions("project", ["getProjects", "addProject", "getProject"]),
    async initialize() {
      this.projects = await this.getProjects();
    },

    editItem(item) {
      this.editedIndex = this.projects.indexOf(item);
      this.form = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.projects.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.projects.splice(index, 1);
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
        Object.assign(this.projects[this.editedIndex], this.form);
      } else {
        this.projects.push(this.form);
      }
      this.close();
    }
  }
};
</script>