import { resourceTypeEnumItems, tagTypeEnumItems } from "@/data/staticItems";
import { findIndex } from "lodash";
import { mapActions } from 'vuex'

export default {
  data: () => ({
    isBookmarked: true,
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
  },

  methods: {
    ...mapActions("tag", ["getTags"]),
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
      
    }
  },

  async mounted() {
    if (this.resourceId) {
      this.resource = await this.getResourceDetail(this.resourceId);
    }
    this.audienceItems = await this.getTags('FilterAudience');
    this.typeItems = await this.getTags('FilterType');
    this.modeItems = await this.getTags('FilterMode');
  }
};