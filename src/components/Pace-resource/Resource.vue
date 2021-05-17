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
  name: "Resource",

  mixins: [resourceDetailMixin, shareResourceMixin],

  props: {
    resourceId: String
  },

  data: () => ({
    tab: null,
    isModule: true,
    isBookmarked: true,
    resourceTypeItems: resourceTypeEnumItems,
    tagTypeItems: tagTypeEnumItems,
    resource: null
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
    }
  },

  methods: {
    ...mapActions("resource", ["bookmarkResource", "unbookmarkResource", "getResourceDetail"]),
    async toggleBookmark() {
      let payload = {
        resourceId: this.resourceId
      }
      if (this.resource.isBookmark) {
        await this.unbookmarkResource(payload)
      } else {
        await this.bookmarkResource(payload)
      }
      this.resource.isBookmark = !this.resource.isBookmark;
    },

    closeDialog() {
      this.$emit('close-modal');
    },

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
