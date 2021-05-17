<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" class="d-flex justify-end py-0">
        <v-select
          :items="dayCountOptions"
          v-model="dayCount"
          @change="initialize"
          style="max-width: 150px"
        >
        </v-select>
      </v-col>
      <v-col cols="12" md="3">
        <TheDownloadCount title="Total Searches" :value="metrics.trendSearch" :periodDays="searchData" icon="mdi-magnify" />
      </v-col>
      <v-col cols="12" md="3">
        <TheDownloadCount title="Total Clicks" :value="metrics.trendClick" :periodDays="clickData" icon="mdi-cursor-default-click-outline" />
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="bg-white">
          <ul>
            <li v-for="(item, index) in lastSearchKeywords" :key="index">{{ item }}</li>
          </ul>
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
                :items="visitedResources"
                class="border"
                :loading="isLoading"
                loading-text="Loading... Please wait"
              >
              </v-data-table>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card
              color="primary"
              flat
            >
              <v-data-table
                :headers="headers"
                :items="bookmarkedResources"
                class="border"
                :loading="isLoading"
                loading-text="Loading... Please wait"
              >
              </v-data-table>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card
              color="primary"
              flat
            >
              <v-data-table
                :headers="filterHeaders"
                :items="frequentlyUsedFilters"
                class="border"
                :loading="isLoading"
                loading-text="Loading... Please wait"
              >
              </v-data-table>
            </v-card>
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
    filterHeaders: [
      { text: "Name", align: "start", value: "name" },
      { text: "Count", value: "count" }
    ],
    projects: [],
    metrics: {},
    isLoading: false,
    tab: null,
    dayCount: 1
  }),

  computed: {
    searchData() {
      return Object.keys(this.metrics).indexOf('periodDays') > -1 ? this.metrics.periodDays.map(item => item.searchCount) : [];
    },

    clickData() {
      return Object.keys(this.metrics).indexOf('periodDays') > -1 ? this.metrics.periodDays.map(item => item.clickCount) : [];
    },

    lastSearchKeywords () {
      return Object.keys(this.metrics).indexOf('listOverPeriod') > -1 ? this.metrics.listOverPeriod.lastSearchKeywords : [];
    },

    bookmarkedResources() {
      if (Object.keys(this.metrics).indexOf('listOverPeriod') > -1) {
        let keys = Object.keys(this.metrics.listOverPeriod.bookmarkedResources);
        let res = [];
        for (let i = 0; i < keys.length; i ++) {
          res.push({
            name: keys[i],
            count: this.metrics.listOverPeriod.bookmarkedResources[keys[i]]
          })
        }
        return res;
      } else return [];
    },

    visitedResources() {
      if (Object.keys(this.metrics).indexOf('listOverPeriod') > -1) {
        let keys = Object.keys(this.metrics.listOverPeriod.visitedResources);
        let res = [];
        for (let i = 0; i < keys.length; i ++) {
          res.push({
            name: keys[i],
            count: this.metrics.listOverPeriod.visitedResources[keys[i]]
          })
        }
        return res;
      } else return [];
    },

    frequentlyUsedFilters() {
      if (Object.keys(this.metrics).indexOf('listOverPeriod') > -1) {
        let keys = Object.keys(this.metrics.listOverPeriod.frequentlyUsedFilters);
        let res = [];
        for (let i = 0; i < keys.length; i ++) {
          res.push({
            name: keys[i],
            count: this.metrics.listOverPeriod.frequentlyUsedFilters[keys[i]]
          })
        }
        return res;
      } else return [];
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    ...mapActions("user", ["getUserMetrics"]),
    async initialize() {
      this.isLoading = true;
      this.metrics = await this.getUserMetrics(this.dayCount);
      this.isLoading = false;
    },
  }
};
</script>
<style lang="sass" scoped>
</style>