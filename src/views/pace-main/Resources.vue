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
              <v-btn text :class="filters && (filters.tagFilterAudienceIds.length > 0 || filters.tagFilterTypeIds.length > 0 || filters.tagFilterModeIds.length > 0) ? 'pace-yellow--text' : 'pace-grey--text'" v-on:click = "onFilter()">
                  Filters
                  <v-icon :class="filters && (filters.tagFilterAudienceIds.length > 0 || filters.tagFilterTypeIds.length > 0 || filters.tagFilterModeIds.length > 0) ? 'pace-yellow--text' : 'pace-grey--text'">{{isShowFilter ? "mdi-filter-variant-minus" : "mdi-filter-variant"}}</v-icon>
              </v-btn>
            </v-system-bar>
            
            <div class="pa-3 content-filter mb-3" v-if="isShowFilter">
              <p v-if="filters && (filters.tagFilterAudienceIds.length > 0 || filters.tagFilterTypeIds.length > 0 || filters.tagFilterModeIds.length > 0)">Your filters:</p>
              <p v-else>No filters</p>
              <p v-if="filters && filters.tagFilterAudienceIds.length > 0">
                <b>{{ filters.tagFilterAudienceIds.length }} Audience{{ filters.tagFilterAudienceIds.length > 1 ? 's' : '' }}:</b> {{ selectedAudienceItems }} 
                <span class="float-right pace-yellow--text"><v-icon @click="filters.tagFilterAudienceIds = [], changeFilters()">mdi-close</v-icon></span>
              </p>
              <p v-if="filters && filters.tagFilterTypeIds.length > 0">
                <b>{{ filters.tagFilterTypeIds.length }} Type{{ filters.tagFilterTypeIds.length > 1 ? 's' : '' }}:</b> {{ selectedTypeItems }} 
                <span class="float-right pace-yellow--text"><v-icon @click="filters.tagFilterTypeIds = [], changeFilters()">mdi-close</v-icon></span>
              </p>
              <p v-if="filters && filters.tagFilterModeIds.length > 0">
                <b>{{ filters.tagFilterModeIds.length }} Mode{{ filters.tagFilterModeIds.length > 1 ? 's' : '' }}:</b> {{ selectedModeItems }} 
                <span class="float-right pace-yellow--text"><v-icon @click="filters.tagFilterModeIds = [], changeFilters()">mdi-close</v-icon></span>
              </p>
            </div>
            
            <v-list two-line subheader class="pt-5 mb-10 px-3" v-if="resources.length > 0">
              <ResourceListItem
                v-for="(item, i) in resources"
                :key="i + 'resources'"
                :item="item"
                @view-resource="viewResource(item)"
                @view-program="viewProgram"
              />
              <infinite-loading @infinite="infiniteHandler" spinner="bubbles">
                <div slot="no-more"></div>
                <div slot="no-results"></div>
              </infinite-loading>
            </v-list>
            <template v-else>
              <div v-if="isLoadingResource" class="text-center">
                <v-progress-circular
                  :size="70"
                  :width="7"
                  color="pace-yellow"
                  indeterminate
                ></v-progress-circular>
              </div>
              <p v-else class="no-more-text">
                There are no matching results. Please try clearing some filters and keywords from your search.
              </p>
            </template>
          </div>
          <v-dialog v-model="showResource" persistent content-class="resource-dialog ma-0">
            <Program 
              v-if="selectedResource && selectedResource.isProgram"
              @close-modal="closeResource" 
              :resourceId="selectedResource.id"
              :viewMode="selectedResource.viewMode"
              @view-module="viewModule"
            />
            <Resource 
              v-else
              @close-modal="closeResource" 
              :resourceId="selectedResource.id" 
              :isModuleView="moduleMode" 
            />
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
import ResourceListItem from '@/components/customComponents/ResourceListItem'

export default {
  name: "Resources",
  components: {
    Resource,
    Program,
    ResourceListItem
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
    isLoadingResource: true,
    resourceLoaded: false,
    moduleMode: false
  }),
  computed: {
    selectedAudienceItems() {
      if (this.filters && this.filters.tagFilterAudienceIds) {
        let nameArray = this.filters.tagFilterAudienceIds.map(id => {
          for (let i = 0; i < this.audienceItems.length ; i ++) {
            if (this.audienceItems[i].id == id) {
              return this.audienceItems[i].name;
            }
          }
        });

        return nameArray.join(', ');
      } else return "";
    },

    selectedTypeItems() {
      if (this.filters && this.filters.tagFilterTypeIds) {
        let nameArray = this.filters.tagFilterTypeIds.map(id => {
          for (let i = 0; i < this.typeItems.length ; i ++) {
            if (this.typeItems[i].id == id) {
              return this.typeItems[i].name;
            }
          }
        });

        return nameArray.join(', ');
      } else return "";
    },

    selectedModeItems() {
      if (this.filters && this.filters.tagFilterModeIds) {
        let nameArray = this.filters.tagFilterModeIds.map(id => {
          for (let i = 0; i < this.modeItems.length ; i ++) {
            if (this.modeItems[i].id == id) {
              return this.modeItems[i].name;
            }
          }
        });

        return nameArray.join(', ');
      } else return "";
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

    viewResource(item) {
      this.selectedResource = Object.assign({}, item);
      this.selectedResource = JSON.parse(JSON.stringify(this.selectedResource));
      this.showResource = true;
    },

    viewProgram(id, viewMode) {
      this.selectedResource = {
        id: id,
        isProgram: true,
        viewMode
      };
      this.showResource = true;
    },

    changeFilters() {
      this.isLoadingResource = true;
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

    viewModule(item) {
      this.showResource = false;
      this.selectedResource = Object.assign({}, item);
      this.selectedResource = JSON.parse(JSON.stringify(this.selectedResource));
      this.moduleMode = true;
      this.showResource = true;
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

    closeResource(isModuleView = false) {
      this.moduleMode = false;
      this.showResource = false;
      if (isModuleView) {
        this.selectedResource = Object.assign({}, {
          id: this.selectedResource.programResourceId,
          isProgram: true
        });
        this.showResource = true;
      } else {
        this.selectedResource = Object.assign({}, {
          id: null,
          items: []
        });
      }
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

    validFilters() {
      let items = [];
      if (this.filters && this.filters.tagFilterAudienceIds) {
        for (let i = 0; i < this.filters.tagFilterAudienceIds.length; i ++) {
          let index = findIndex(this.audienceItems, (e) => {
              return e.id == this.filters.tagFilterAudienceIds[i];
          }, 0);
          if (index > -1) {
            items.push(this.filters.tagFilterAudienceIds[i]);
          }
        }
        this.filters.tagFilterAudienceIds = Object.assign([], items);
      }

      if (this.filters && this.filters.tagFilterTypeIds) {
        items = [];
        for (let i = 0; i < this.filters.tagFilterTypeIds.length; i ++) {
          let index = findIndex(this.typeItems, (e) => {
              return e.id == this.filters.tagFilterTypeIds[i];
          }, 0);
          if (index > -1) {
            items.push(this.filters.tagFilterTypeIds[i]);
          }
        }
        this.filters.tagFilterTypeIds = Object.assign([], items);
      }

      if (this.filters && this.filters.tagFilterModeIds) {
        items = [];
        for (let i = 0; i < this.filters.tagFilterModeIds.length; i ++) {
          let index = findIndex(this.modeItems, (e) => {
              return e.id == this.filters.tagFilterModeIds[i];
          }, 0);
          if (index > -1) {
            items.push(this.filters.tagFilterModeIds[i]);
          }
        }
        this.filters.tagFilterModeIds = Object.assign([], items);
      }
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
    this.validFilters();
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

.no-more-text {
  font-size: 14px;
  padding: 0 40px;
  text-align: center;
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
