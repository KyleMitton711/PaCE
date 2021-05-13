<template>
<v-container class="py-0">
  <v-row class="white resource">
    <v-col cols="12" class="pa-0 full-height-md d-flex flex-column pt-0" v-if="resource">
      <div class="bg-pace-orange py-3 px-4 page-header d-flex justify-space-between">
        <div class="page-header-title-block d-flex align-center">
          <v-icon
            class="white--text d-sm-none mr-3"
            size="30"
            aria-controls
            @click="closeDialog"
          >mdi-arrow-left</v-icon>
          <span class="white--text page-header-title mr-3">{{ resource && resource.title }}</span>
          <v-icon
            class="pace-yellow--text bookmark-icon ml-auto"
            size="30"
            aria-controls
            @click="toggleBookmark"
          >{{ resource.isBookmark ? 'mdi-bookmark' : 'mdi-bookmark-outline' }}</v-icon>
        </div>
        <div class="d-none d-sm-block">
          <v-icon
            class="white--text"
            size="30"
            aria-controls
            @click="closeDialog"
          >mdi-close</v-icon>
        </div>
      </div>
      <div class="pa-0">
        <v-tabs
          v-model="tab"
          grow
        >
          <v-tab>
            Modules
          </v-tab>
          <v-tab>
            Summary
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab" class="ma-1 mt-2">
          <v-tab-item>
            <div class="pa-4">
              <div v-for="(item, index) in programModules" :key="index">
                <h3>{{item.title}}</h3>
                <p class="pace-grey--text" v-html="item.overview"></p>
              </div>
            </div>
          </v-tab-item>
          <v-tab-item>
            <div class="pa-4">
              <div class="d-flex align-center">
                <v-avatar size="64">
                  <img :src="resource.projectLogo" />
                </v-avatar>
                <h3 class="ml-4">ToolKit</h3>
              </div>
              <h3 class="mt-4"><a :href="resource.url">{{ resource.title }}</a></h3>
              <p v-html="resource.overview" class="mt-6"></p>
              <p v-html="resource.outcome" class="mt-2"></p>
              <p class="mt-4">{{ resourceType }}</p>
              <p class="mt-4"><b>Duration</b> {{ resource.duration }}</p>

              <p class="mt-4 mb-0" v-if="selectedAudienceItems.length > 0"><b>Audience:</b></p>
              <p class="mb-0">{{ selectedAudienceItems }}</p>
              <p class="mt-2 mb-0" v-if="selectedTypeItems.length > 0"><b>Type:</b></p>
              <p class="mb-0">{{ selectedTypeItems }}</p>
              <p class="mt-2 mb-0" v-if="selectedModeItems.length > 0"><b>Mode:</b></p>
              <p class="mb-0">{{ selectedModeItems }}</p>
            </div>
          </v-tab-item>
        </v-tabs-items>
      </div>
      <div class="pa-4 mb-0 mb-sm-10 mt-auto d-flex justify-end align-end">
        <v-btn color="bg-pace-yellow" small fab @click="shareResource">
          <v-icon
            class="white--text"
            aria-controls
          >mdi-share-variant</v-icon>
        </v-btn>
      </div>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
import { resourceTypeEnumItems, tagTypeEnumItems } from "@/data/staticItems";
import { findIndex } from "lodash";
import { mapActions } from 'vuex'
import resourceDetailMixin from "@/mixins/resourceDetailMixin";
import shareResourceMixin from "@/mixins/shareResourceMixin";

export default {
  name: "Program",

  mixins: [resourceDetailMixin, shareResourceMixin],

  props: {
    resourceId: String
  },

  data: () => ({
    tab: null,
    isBookmarked: true,
    modules: [{
      title: 'Module1: The role of law in end of life care',
      content: 'Describe the role of law in end of life clinical practice.'
    },{
      title: 'Module2: Capacity and consent to medical treatment',
      content: 'Identify when consent to medical treatment is required and when it will be valid'
    },{
      title: 'Module item 3',
      content: 'Secondary text'
    }],
    resourceTypeItems: resourceTypeEnumItems,
    tagTypeItems: tagTypeEnumItems,
    resource: null,
    audienceItems: [],
    typeItems: [],
    modeItems: []
  }),

  computed: {
    resourceType() {
      if (this.resource) {
        let resourceTypeIndex = findIndex(this.resourceTypeItems, (o) => { return o.key == this.resource.type; });
        return this.resourceTypeItems[resourceTypeIndex].name;
      } else return null;
    },

    tagType() {
      let tags = this.resource.tags.map((item, index) => {
        let tagIndex = findIndex(this.tagTypeItems, function(o) { return o.key == item.tagType; });
        return this.tagTypeItems[tagIndex].name;
      });
      return tags;
    },

    selectedAudienceItems() {
      let nameArray = this.resource.tagFilterAudienceIds.map(id => {
        for (let i = 0; i < this.audienceItems.length ; i ++) {
          if (this.audienceItems[i].id == id) {
            return this.audienceItems[i].name;
          }
        }
      });

      return nameArray.join(', ');
    },

    selectedTypeItems() {
      let nameArray = this.resource.tagFilterTypeIds.map(id => {
        for (let i = 0; i < this.typeItems.length ; i ++) {
          if (this.typeItems[i].id == id) {
            return this.typeItems[i].name;
          }
        }
      });

      return nameArray.join(', ');
    },

    selectedModeItems() {
      let nameArray = this.resource.tagFilterModeIds.map(id => {
        for (let i = 0; i < this.modeItems.length ; i ++) {
          if (this.modeItems[i].id == id) {
            return this.modeItems[i].name;
          }
        }
      });

      return nameArray.join(', ');
    },

    programModules() {
      if (this.resource && this.resource.items) {
        let items = Object.assign([], this.resource.items);
        items.sort(function(a, b) {
          if (a.itemNum > b.itemNum) return 1;
          else return -1;
        });
        return items;
      } else {
        return [];
      }
    }
  },

  methods: {
    ...mapActions("resource", ["bookmarkResource", "unbookmarkResource", "getResourceDetail"]),

    shareResource() {
      this.copyTextToClipboard(this.resource.url);
    }
  },

  async mounted() {
    if (this.resourceId) {
      this.resource = await this.getResourceDetail(this.resourceId);
    }
  }
};
</script>

<style lang="scss" scoped>
.resource {
  min-height: 100vh;
}

::v-deep .resource .v-tab {
  background-color: $pace-yellow;
}

::v-deep .resource .theme--light.v-tabs-items {
  border: none;
}

@media (max-width: 600px) {
  .page-header-title-block {
    width: 100%;
  }
}
</style>
