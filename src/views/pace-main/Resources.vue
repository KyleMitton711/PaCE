<template>
  <v-container class="justify-center mt-0 pt-0 pb-0">
    <v-row justify="center">
      <v-col cols="12" class="pa-0 full-height">
        <v-card class="full-height d-flex flex-column resource-list">
          <div>
            <v-system-bar
              height="60"
              color="primary"
              class="white--text"
            >
              <v-btn icon @click="close">
                <v-icon color="white">mdi-arrow-left</v-icon>
              </v-btn>
              <v-toolbar-title>{{ searchText ? `"${searchText}"` : "" }} {{ resourceCount }} Results</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn text :class="filters.tagFilterAudienceIds.length > 0 || filters.tagFilterTypeIds.length > 0 || filters.tagFilterModeIds.length > 0 ? 'pace-yellow--text' : 'pace-grey--text'" v-on:click = "onFilter()">
                  Filters
                  <v-icon :class="filters.tagFilterAudienceIds.length > 0 || filters.tagFilterTypeIds.length > 0 || filters.tagFilterModeIds.length > 0 ? 'pace-yellow--text' : 'pace-grey--text'">{{isShowFilter ? "mdi-filter-variant-minus" : "mdi-filter-variant"}}</v-icon>
              </v-btn>
            </v-system-bar>
            
            <div class="pa-3 content-filter mb-3" v-if="isShowFilter">
              <p v-if="filters.tagFilterAudienceIds.length > 0 || filters.tagFilterTypeIds.length > 0 || filters.tagFilterModeIds.length > 0">Your filters:</p>
              <p v-else>No filters</p>
              <p v-if="filters && filters.tagFilterAudienceIds.length > 0">
                <b>{{ filters.tagFilterAudienceIds.length }} Audiences:</b> {{ selectedAudienceItems }} 
                <span class="float-right pace-yellow--text"><v-icon @click="filters.tagFilterAudienceIds = [], changeFilters()">mdi-close</v-icon></span>
              </p>
              <p v-if="filters && filters.tagFilterTypeIds.length > 0">
                <b>{{ filters.tagFilterTypeIds.length }} Types:</b> {{ selectedTypeItems }} 
                <span class="float-right pace-yellow--text"><v-icon @click="filters.tagFilterTypeIds = [], changeFilters()">mdi-close</v-icon></span>
              </p>
              <p v-if="filters && filters.tagFilterModeIds.length > 0">
                <b>{{ filters.tagFilterModeIds.length }} Modes:</b> {{ selectedModeItems }} 
                <span class="float-right pace-yellow--text"><v-icon @click="filters.tagFilterModeIds = [], changeFilters()">mdi-close</v-icon></span>
              </p>
            </div>
            
            <v-list two-line subheader class="pt-5 mb-10 px-3" v-if="resources.length > 0">
              <v-list-item
                v-for="(item, i) in resources"
                :key="i"
                :class="item['status'] ? 'opened' : 'closed'"
              >
                <v-list-item-avatar tile size="64">
                  <img :src="item.projectLogo" />
                </v-list-item-avatar>

                <v-list-item-content>
                  <span class="black--text " @click="viewResource(i)">{{item.title}}</span>
                  <p v-html="item.overview" class="mt-6 overview"></p>
                  <p v-if="!item.isProgram && item.items && item.items.length > 0" class="mt-6">
                    Module {{ item.items[0].itemNum }} of <a @click="viewProgram(item.items[0].id)">{{ item.items[0].title }}</a>
                  </p>
                  <p class="mt-4" v-if="!item.isProgram && item.duration"><b>Duration</b> {{ item.duration }}</p>
                </v-list-item-content>

                <v-list-item-action>
                  <v-btn icon @click="toggleResource(i)">
                    <v-icon color="grey lighten-1">{{item['status'] ? "mdi-chevron-up" : "mdi-chevron-down"}}</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>

              <infinite-loading @infinite="infiniteHandler" spinner="bubbles">
                <div slot="no-more"></div>
              </infinite-loading>
            </v-list>
            <template v-else>
              <p v-if="!isLoadingResource && resourceLoaded" class="px-2">
                There are no matching results. Please try clearing some filters and keywords from your search.
              </p>
            </template>
          </div>
          <!-- <div class="pa-4 mb-0 mb-sm-10 mt-auto d-flex justify-end align-center" v-if="pagination.total">
            <v-btn color="bg-pace-yellow" fab small @click="prevPage" v-if="pagination.pageIndex > 1">
              <v-icon color="white">mdi-chevron-left</v-icon>
            </v-btn>
            <p class="pa-2 mb-0">{{ pagination.pageIndex }} / {{ Math.ceil(pagination.total / pagination.pageSize) }}</p>
            <v-btn color="bg-pace-yellow" fab small @click="nextPage" v-if="pagination.pageIndex < Math.ceil(pagination.total / pagination.pageSize)">
              <v-icon color="white">mdi-chevron-right</v-icon>
            </v-btn>
          </div> -->
          <v-dialog v-model="showResource" content-class="resource-dialog ma-0">
            <Program @close-modal="closeResource" :resourceId="selectedResource.id" v-if="selectedResource && selectedResource.isProgram" />
            <Resource @close-modal="closeResource" :resourceId="selectedResource.id" v-else />
          </v-dialog>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { resourceTypeEnumItems, tagTypeEnumItems } from "@/data/staticItems";
import { findIndex } from "lodash";
import Resource from '@/components/Pace-resource/Resource'
import Program from '@/components/Pace-resource/Program'

export default {
  name: "Resources",
  components: {
    Resource,
    Program
  },
  data: () => ({
    resources: [],
    isShowFilter: false,
    selectedResource: {
      id: null,
      items: []
    },
    showResource: false,
    filters: null,
    audienceItems: [],
    typeItems: [],
    modeItems: [],
    pagination: {
      pageSize: 5,
      pageIndex: 1,
      total: null
    },
    resourceCount: null,
    searchText: null,
    isLoadingResource: false,
    resourceLoaded: false
  }),
  computed: {
    selectedAudienceItems() {
      let nameArray = this.filters.tagFilterAudienceIds.map(id => {
        for (let i = 0; i < this.audienceItems.length ; i ++) {
          if (this.audienceItems[i].id == id) {
            return this.audienceItems[i].name;
          }
        }
      });

      return nameArray.join(', ');
    },

    selectedTypeItems() {
      let nameArray = this.filters.tagFilterTypeIds.map(id => {
        for (let i = 0; i < this.typeItems.length ; i ++) {
          if (this.typeItems[i].id == id) {
            return this.typeItems[i].name;
          }
        }
      });

      return nameArray.join(', ');
    },

    selectedModeItems() {
      let nameArray = this.filters.tagFilterModeIds.map(id => {
        for (let i = 0; i < this.modeItems.length ; i ++) {
          if (this.modeItems[i].id == id) {
            return this.modeItems[i].name;
          }
        }
      });

      return nameArray.join(', ');
    },
  },
  methods: {
    ...mapActions("tag", ["getTags"]),
    ...mapActions("resource", ["getResourceCount", "filterResources"]),
    onFilter() {
      this.isShowFilter = !this.isShowFilter;
    },

    toggleResource(i) {
      let tmp = Object.assign([], this.resources);
      tmp[i]['status'] = tmp[i]['status'] ? !tmp[i]['status'] : true;
      this.resources = Object.assign([], tmp);
    },

    viewResource(i) {
      this.selectedResource = Object.assign({}, this.resources[i]);
      this.selectedResource = JSON.parse(JSON.stringify(this.selectedResource));
      this.showResource = true;
    },

    viewProgram(id) {
      this.selectedResource = {
        id: id,
        isProgram: true
      };
      this.showResource = true;
    },

    changeFilters() {
      this.resources = [];
      this.pagination = Object.assign({}, {
        pageSize: 5,
        pageIndex: 1,
        total: null
      });
      this.pagination.pageSize = Math.floor((window.innerHeight - 200) / 90);
      this.viewResourceList();
    },

    infiniteHandler($state) {
      let totalPages = Math.ceil(this.pagination.total / this.pagination.pageSize);
      if (totalPages > this.pagination.pageIndex) {
        this.pagination.pageIndex ++;
        this.viewResourceList($state);
      } else {
        $state.complete();
      }
    },

    async viewResourceList($state = null) {
      this.isLoadingResource = true;
      this.filters['pageIndex'] = this.pagination.pageIndex;
      this.filters['pageSize'] = this.pagination.pageSize;
      localStorage.setItem('filters', JSON.stringify(this.filters));
      let count = await this.getResourceCount(this.filters);
      let res = await this.filterResources(this.filters);
      this.resourceCount = count;
      this.resources = [ ...this.resources, ...res.results];
      if ($state) {
        $state.loaded();
      }
      this.pagination.pageSize = res.pageSize;
      this.pagination.total = res.total;
      this.pagination.pageIndex = res.currentPage;
      this.isLoadingResource = false;
      this.resourceLoaded = true;
    },

    close() {
      this.$router.push('/search');
    },

    closeResource() {
      this.showResource = false;
      this.selectedResource = Object.assign({}, {
        id: null,
        items: []
      });
    },

    nextPage() {
      let totalPages = Math.ceil(this.pagination.total / this.pagination.pageSize);
      if (totalPages > this.pagination.pageIndex) this.pagination.pageIndex ++;
      this.viewResourceList();
    },

    prevPage() {
      let totalPages = Math.ceil(this.pagination.total / this.pagination.pageSize);
      if (this.pagination.pageIndex > 1) this.pagination.pageIndex --;
      this.viewResourceList();
    },
  },

  watch: {
    showResource(val) {
      val || this.closeResource();
    }
  },
  
  async mounted() {
    this.pagination.pageSize = Math.floor((window.innerHeight - 150) / 90);
    if (localStorage.getItem('filters')) {
      this.filters = JSON.parse(localStorage.getItem('filters'));
    }
    if (localStorage.getItem('searchText')) {
      this.searchText = localStorage.getItem('searchText');
    } 
    this.resourceCount = await this.getResourceCount(this.filters);
    this.viewResourceList();
    this.audienceItems = await this.getTags('FilterAudience');
    this.typeItems = await this.getTags('FilterType');
    this.modeItems = await this.getTags('FilterMode');
  }
};
</script>

<style lang="scss" scoped>
.content-filter {
  border: 1px solid #9f9f9f;
}

.content {
  margin-left: 80px;
}

.v-list-item {
  padding: 0;
}

::v-deep .resource-list {
  .v-list {
    max-height: calc(100vh - 160px);
    overflow-x: scroll;
  }
}

::v-deep .resource-list {
  .v-list-item {
    padding-left: 0;
    &.closed {
      height: 90px;
      overflow: hidden;
    }

    &.opened {
      height: auto;
      transition: height 1s;
    }
  }

  .v-list-item__avatar {
    align-self: flex-start;
  }

  .v-list-item__action {
    align-self: flex-start;
  }

  .v-list-item__content {
    align-self: flex-start;
    padding: 16px 0;

    span {
      font-size: 18px;
    }

    p {
      color: #4a4a4a;
      letter-spacing: .5px;
      line-height: inherit;
    }
  }
}
</style>
