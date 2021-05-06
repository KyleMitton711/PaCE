<template>
<v-container class="py-0">
  <v-row class="white resource">
    <v-col cols="12" class="pa-0 full-height-md d-flex flex-column pt-0">
      <div class="bg-pace-orange py-3 px-4 page-header d-flex justify-space-between">
        <div class="page-header-title-block d-flex align-center">
          <v-icon
            class="white--text d-sm-none mr-3"
            size="30"
            aria-controls
            @click="closeDialog"
          >mdi-arrow-left</v-icon>
          <span class="white--text page-header-title mr-3">{{ resource.title }}</span>
          <v-icon
            class="pace-yellow--text bookmark-icon ml-auto"
            size="30"
            aria-controls
            @click="toggleBookmark"
          >{{ isBookmarked ? 'mdi-bookmark' : 'mdi-bookmark-outline' }}</v-icon>
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
        <h3 class="mt-4">{{ resource.title }}</h3>
        <p v-html="resource.overview" class="mt-6"></p>
        <p class="mt-4">{{ resourceType }}</p>
        <p class="mt-4"><b>Duration</b> {{ resource.duration }}</p>

        <p class="mt-4 mb-0"><b>Audience:</b></p>
        <p>Palliative care workforce</p>
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
import { mapGetters, mapActions } from 'vuex'

export default {
  name: "Resource",

  props: {
    resource: Object
  },

  data: () => ({
    tab: null,
    isModule: true,
    isBookmarked: true,
    resourceTypeItems: resourceTypeEnumItems,
    tagTypeItems: tagTypeEnumItems,
    info: {
      projectLink: "",
      title: "The Advance Project Toolkit",
      overview: "The toolkit is a reference guide which is designed to complement the online training, so you have all the information in one place to refer to as needed after completing the online learning modules. It contains the resources that GPs, practice nurses and practice managers will need to get started, practise their skills and incorporate the Advance ProjectTM assessment tools into everyday clinical practice.",
      url: "https://pcc4u.org.au/wp-content/uploads/2019/08/Principles.pdf",
      learningOutcomes: "This document includes core values, desirable learning outcomes, principles for learning and teaching, and benchmarks for curricula.",
      endorsements: "",
      graduateCapabilities: ['E1', 'E2'],
      audience: ["Allied Health Professional", "Medical Practitioner", "Nursing"],
      type: ["Curriculum"], 
      mode: [],
      content: [],
      duration: "2-3 Hrs. APNA Endrorsed 3 hrs CPD."
    }
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
    ...mapActions("resource", ["bookmarkResource", "unbookmarkResource"]),
    toggleBookmark() {
      this.isBookmarked = !this.isBookmarked;
    },

    closeDialog() {
      this.$emit('close-modal');
    },

    shareResource() {
      
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
