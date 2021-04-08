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
          <span class="white--text page-header-title mr-3">The Advance Project ToolKit</span>
          <v-icon
            class="pace-yellow--text bookmark-icon ml-auto"
            size="30"
            aria-controls
            @click="toggleBookmark"
          >{{ isBookmarked ? 'mdi-bookmark' : 'mdi-bookmark' }}</v-icon>
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
      <div class="pa-0" v-if="isModule">
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
              <div v-for="(item, index) in modules" :key="index">
                <h3>{{item.title}}</h3>
                <p class="pace-grey--text">{{item.content}}</p>
              </div>
            </div>
          </v-tab-item>
          <v-tab-item>
            <div class="pa-4">
              <h3>Enroled Nurse Toolkit</h3>
              <p>A suite of online palliative care teaching and learning resources for integration into Enrolled Nurses courses. Curriculum aligned to HLTENN010 Apply a palliative approach in nursing practice and EN Standards of Practice.</p>
            </div>
          </v-tab-item>
        </v-tabs-items>
      </div>
      <div v-else class="pa-4">
        <div class="d-flex align-center">
          <v-avatar size="64">
            <v-icon
              class="grey"
              v-text="dd"
            ></v-icon>
          </v-avatar>
          <h3 class="ml-4">ToolKit</h3>
        </div>
        <h3 class="mt-4">The Advance Project Toolkit</h3>
        <p class="mt-6">The toolkit is a reference guide which is designed to complement the online training, so you have all the information in one place to refer to as needed after completing the online learning modules. It contains the resources that GPs, practice nurses and practice managers will need to get started, practise their skills and incorporate the Advance ProjectTM assessment tools into everyday clinical practice.</p>

        <h4 class="mt-4">Learning theroy / approach</h4>
        <ul>
          <li>Experiental learning</li>
          <li>Reflection</li>
          <li>Story Telling</li>
          <li>Information sharing</li>
        </ul>

        <p class="mt-4"><b>Duration</b> 2-3 Hrs. APNA Endrorsed 3 hrs CPD.</p>

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
export default {
  name: "Resource",

  data: () => ({
    tab: null,
    isModule: true,
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
    }]
  }),

  methods: {
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
