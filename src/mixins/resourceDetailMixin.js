import { resourceTypeEnumItems, tagTypeEnumItems } from "@/data/staticItems";
import { findIndex } from "lodash";
import { mapGetters, mapActions } from 'vuex'

export default {
  data: () => ({
    isBookmarked: true,
    resourceTypeItems: resourceTypeEnumItems,
    tagTypeItems: tagTypeEnumItems,
    resource: null,
    audienceItems: [],
    typeItems: [],
    modeItems: [],
    snackbar: false
  }),

  computed: {
    ...mapGetters("auth", ["user"]),
    resourceType() {
      if (this.resource && this.resource.typeId && this.typeItems.length > 0) {
        let resourceTypeIndex = findIndex(this.typeItems, (o) => { return o.id == this.resource.typeId; });
        return this.typeItems[resourceTypeIndex].name;
      } else return null;
    },

    tagType() {
      if (this.resource && this.resource.tags) {
        let tags = this.resource.tags.map((item, index) => {
          let tagIndex = findIndex(this.tagTypeItems, function(o) { return o.key == item.tagType; });
          return this.tagTypeItems[tagIndex].name;
        });
        return tags;
      } else return [];
    },

    selectedAudienceItems() {
      if (this.resource && this.resource.tagFilterAudienceIds) {
        let nameArray = this.resource.tagFilterAudienceIds.map(id => {
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
      if (this.resource && this.resource.tagFilterTypeIds) {
        let nameArray = this.resource.tagFilterTypeIds.map(id => {
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
      if (this.resource && this.resource.tagFilterModeIds) {
        let nameArray = this.resource.tagFilterModeIds.map(id => {
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
    ...mapActions("resource", ["bookmarkResource", "unbookmarkResource", "getResourceDetail"]),
    async toggleBookmark() {
      if (this.user == null) {
        this.snackbar = true;
        return;
      }
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

    fallbackCopyTextToClipboard(text) {
      var textArea = document.createElement("textarea");
      textArea.value = text;
      
      // Avoid scrolling to bottom
      textArea.style.top = "0";
      textArea.style.left = "0";
      textArea.style.position = "fixed";
    
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
    
      try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Fallback: Copying text command was ' + msg);
      } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
      }
    
      document.body.removeChild(textArea);
    },

    copyTextToClipboard(text) {
      if (!navigator.clipboard) {
        this.fallbackCopyTextToClipboard(text);
        return;
      }
      navigator.clipboard.writeText(text).then(function() {
        console.log('Async: Copying to clipboard was successful!');
      }, function(err) {
        console.error('Async: Could not copy text: ', err);
      });
    },

    shareResource() {
      this.copyTextToClipboard(this.resource.url);
      this.$notify({
        text: 'Link copied!',
        type: 'success'
      });
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