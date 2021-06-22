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
    contextItems: [],
    illnessItems: [],
    pedagogyItems: [],
    roleItems: [],
    symptomItems: [],
    topicItems: [],
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

    selectedContextItems() {
      if (this.resource && this.resource.tagContentContextIds) {
        let nameArray = this.resource.tagContentContextIds.map(id => {
          for (let i = 0; i < this.contextItems.length ; i ++) {
            if (this.contextItems[i].id == id) {
              return this.contextItems[i].name;
            }
          }
        });

        return nameArray.join(', ');
      } else return "";
    },

    selectedIllnessItems() {
      if (this.resource && this.resource.tagContentIllnessIds) {
        let nameArray = this.resource.tagContentIllnessIds.map(id => {
          for (let i = 0; i < this.illnessItems.length ; i ++) {
            if (this.illnessItems[i].id == id) {
              return this.illnessItems[i].name;
            }
          }
        });

        return nameArray.join(', ');
      } else return "";
    },

    selectedPedagogyItems() {
      if (this.resource && this.resource.tagContentPedagogyIds) {
        let nameArray = this.resource.tagContentPedagogyIds.map(id => {
          for (let i = 0; i < this.pedagogyItems.length ; i ++) {
            if (this.pedagogyItems[i].id == id) {
              return this.pedagogyItems[i].name;
            }
          }
        });

        return nameArray.join(', ');
      } else return "";
    },

    selectedRoleItems() {
      if (this.resource && this.resource.tagContentRoleIds) {
        let nameArray = this.resource.tagContentRoleIds.map(id => {
          for (let i = 0; i < this.roleItems.length ; i ++) {
            if (this.roleItems[i].id == id) {
              return this.roleItems[i].name;
            }
          }
        });

        return nameArray.join(', ');
      } else return "";
    },

    selectedSymptomItems() {
      if (this.resource && this.resource.tagContentSymptomIds) {
        let nameArray = this.resource.tagContentSymptomIds.map(id => {
          for (let i = 0; i < this.symptomItems.length ; i ++) {
            if (this.symptomItems[i].id == id) {
              return this.symptomItems[i].name;
            }
          }
        });

        return nameArray.join(', ');
      } else return "";
    },

    selectedTopicItems() {
      if (this.resource && this.resource.tagContentTopicIds) {
        let nameArray = this.resource.tagContentTopicIds.map(id => {
          for (let i = 0; i < this.topicItems.length ; i ++) {
            if (this.topicItems[i].id == id) {
              return this.topicItems[i].name;
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
      let url = this.resource.url;
      if (!url) {
        if (!this.resource.isProgram && this.resource.items != null && this.resource.items.length > 0) {
          url = this.resource.items[0].url;
        }
        if (!url) {
          url = this.resource.projectUrl;
        }
      }
      this.copyTextToClipboard(url);
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
    let res = await this.getTags();
    this.audienceItems = res.filter(item => item.tagType == 11);
    this.typeItems = res.filter(item => item.tagType == 12);
    this.modeItems = res.filter(item => item.tagType == 13);
    this.contextItems = res.filter(item => item.tagType == 25);
    this.illnessItems = res.filter(item => item.tagType == 24);
    this.pedagogyItems = res.filter(item => item.tagType == 21);
    this.roleItems = res.filter(item => item.tagType == 26);
    this.symptomItems = res.filter(item => item.tagType == 23);
    this.topicItems = res.filter(item => item.tagType == 22);
  }
};