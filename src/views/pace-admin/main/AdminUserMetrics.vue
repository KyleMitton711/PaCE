<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" class="d-flex justify-end">
        <v-select
          :items="dayCountOptions"
          v-model="dayCount"
          @change="initialize"
          style="max-width: 150px"
        >
        </v-select>
      </v-col>
      <v-col cols="12" md="3">
        <TheDownloadCount title="Total Searches" value="456" />
      </v-col>
      <v-col cols="12" md="3">
        <TheDownloadCount title="Total Clicks" value="12456" />
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="bg-white">
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-tabs
          v-model="tab"
          background-color="transparent"
          color="primary"
        >
          <v-tab>
            Visited Resources
          </v-tab>
          <v-tab>
            Bookmarked
          </v-tab>
          <v-tab>
            Filters
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-card
              color="primary"
              flat
            >
              <v-data-table
                :headers="headers"
                :items="projects"
                class="border"
                :loading="isLoading"
                loading-text="Loading... Please wait"
              >
                <template v-slot:no-data>
                  <v-btn color="primary" @click="initialize">Reset</v-btn>
                </template>
              </v-data-table>
            </v-card>
          </v-tab-item>
          <v-tab-item>
          </v-tab-item>
          <v-tab-item>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';
import debounce from "debounce";
import TheDownloadCount from "@/components/customComponents/download-count/TheDownloadCount";

export default {
  name: "AdminUserMetrics",
  components: {
    TheDownloadCount
  },
  data: () => ({
    dayCountOptions: [{
      text: '1 Day',
      value: 1
    }, {
      text: '7 Days',
      value: 7
    }, {
      text: '14 Days',
      value: 14
    }, {
      text: '30 Days',
      value: 30
    }],
    headers: [
      {
        text: "Count",
        align: "start",
        value: "count"
      },
      { text: "Name", value: "name" },
    ],
    projects: [],
    isLoading: false,
    tab: null,
    dayCount: 1
  }),

  computed: {
  },

  created() {
    this.initialize();
    
  },

  methods: {
    ...mapActions("project", ["getProjects", "addProject", "getProject", "editProject", "deleteProject"]),
    async initialize() {
      this.isLoading = true;
      this.projects = await this.getProjects();
      this.isLoading = false;
    },
  }
};
</script>
<style lang="sass" scoped>
</style>