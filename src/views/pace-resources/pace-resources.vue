<template>
  <v-container class="justify-center mt-0 pt-0 pb-0 full-height">
    <v-row justify="center" class="full-height">
      <v-col lg="11" md="11" sm="8" xl="7" class="pl-2 pr-2 pt-0 pb-0">
        <v-card class="full-height d-flex flex-column">
          <div>
            <v-system-bar
              height="60"
              color="primary"
              class="white--text"
            >
              <v-btn icon>
                <v-icon color="white">mdi-arrow-left</v-icon>
              </v-btn>
              <v-toolbar-title>"Best Pracice" 81 Results</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn v-on:click = "onFilter()">
                  Filters
                  <v-icon>mdi-filter</v-icon>
              </v-btn>
            </v-system-bar>
            
            <div class="pa-3 content-filter mb-3" v-if="isShowFilter">
              <p>Your filters:</p>
              <span><b>2 Audiences:</b> Student, Acadiemic 
                <span class="float-right"><v-icon>mdi-backspace</v-icon>clear</span>
              </span>
            </div>
            
            <v-list-item v-for="(item, i) in messages" :key="i">
              <v-expansion-panels
                v-model="item.panel"
                multiple>     
                <v-expansion-panel>
                  <v-expansion-panel-header>
                    <v-list-item-title>
                      <div class="d-flex align-center py-3">
                        <div class="mr-3">
                          <button type="button" class="elevation-0 v-btn v-btn--contained v-btn--fab v-btn--round theme--light v-size--default grey" radius=""></button>
                        </div>
                        <div class="mx-3">
                          <h4>{{ item.title }}</h4>
                          <span class="text--secondary caption descpart d-block truncate-text">{{item.desc}}</span>
                        </div>
                      </div>
                    </v-list-item-title>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <p class="content">{{item.content}}</p>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-list-item>
          </div>
          <v-card
            class="d-flex justify-end pa-2 mt-auto"
          >
            <p class="pa-2">1/20</p>
            <v-btn color="bg-pace-yellow" fab small @click="nextPage">
              <v-icon color="white">mdi-chevron-right</v-icon>
            </v-btn>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Resources",

  data: () => ({
    messages: [
      {
        title: "Program of Experence in the Palliative Approadch-PEPA",
        desc: "Palliative approach to care workshop",
        content:
          " Module 3 of Erolled Nurse Toolkit Duration 2-3 hrs APNA Endrosed "
      },
      {
        title: "Palliative Care Curriculum for Undergraduates - PCC4U",
        desc: "Module 1.Principles of Palliative care",
        content:
          " Module 3 of Erolled Nurse Toolkit Duration 2-3 hrs APNA Endrosed "
      },
      {
        title: "Third item - Resource Title",
        desc:
          "Expand to show more of the extract content. Lorem ispurm dapibus, neque id cursus faucibus ispurm dapibus, neque id cursus ",
        content:
          " Module 3 of Erolled Nurse Toolkit Duration 2-3 hrs APNA Endrosed "
      },
      {
        title: "Palliative Care Curriculum for Undergraduates - PCC4U",
        desc: "Module 1.Principles of Palliative care",
        content:
          " Module 3 of Erolled Nurse Toolkit Duration 2-3 hrs APNA Endrosed "
      }
    ],
    isShowFilter: false
  }),
  computed: {},
  methods: {
    onFilter() {
      this.isShowFilter = !this.isShowFilter;
    },
    nextPage() {}
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
</style>
