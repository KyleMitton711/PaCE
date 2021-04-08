<template>
  <v-container id="login" class="justify-center mt-0 pt-0 pb-0 full-height" tag="section">
    <v-row justify="center" class="full-height">
      <v-col lg="11" md="11" sm="8" xl="7" class="pl-2 pr-2 pt-0 pb-0">
        <v-card class="elevation-4">
          <v-row>
            <v-col lg="5" md="5" class="pa-0 full-height-md d-flex flex-column pt-0">
              <div class="bg-pace-orange py-4 px-10">
                <div class="text-right">
                  <router-link to="/auth" class="v-underline white--text ml-auto mr-3 mt-3 white--text signin-link">Sign in ></router-link>
                </div>
                <h3 class="white--text page-title mt-4">Search</h3>
                <v-text-field
                  label="Enter a keyword"
                  append-icon="mdi-magnify"
                  single-line
                  solo
                  class="search-input"
                ></v-text-field>
                <p class="text-right"><a class="white--text v-underline">Browse 816 results ></a></p>
              </div>
              <div class="search-info px-sm-10 px-1 pt-2">
                <v-tabs
                  v-model="tab"
                  fixed-tabs
                >
                  <v-tab
                    v-for="item in items"
                    :key="item.tab"
                  >
                    {{ item.tab }}
                  </v-tab>
                </v-tabs>

                <v-tabs-items v-model="tab" class="ma-1 mt-2">
                  <v-tab-item>
                    <v-card class="elevation-1 pa-5 tab-content" v-if="loggedIn">
                      <p class="mb-1">Too many results?</p>
                      <p>Take a minute to review your filters</p>
                      <p>Current filters</p>

                      <p class="mb-0"><b>Capabilities:</b> Graduate (HP1, HP2) <span class="text-right">X Clear</span></p>
                      <p><b>Audiences:</b> Student; Academic <span class="text-right">X Clear</span></p>
                      <div class="mt-10">
                        <div class="text-right">
                          <span class="more-filters mr-5">More filters</span>
                          <v-btn color="bg-pace-yellow" fab small @click="tab = 1">
                            <v-icon color="white">mdi-chevron-right</v-icon>
                          </v-btn>
                        </div>
                      </div>
                      <p class="tip mt-5">Tip: Tap a filter above to edit your selection.</p>
                    </v-card>
                    <v-card class="elevation-1 pa-5 tab-content" v-else>
                      <p class="mb-1">Welcome to Palliative Care Education Directory</p> <br>
                      <p>To help you find what you need, take a moment to set your search filters</p>
                      <div class="mt-10">
                        <div class="text-right">
                          <span class="more-filters mr-5">Ok, show me</span>
                          <v-btn color="bg-pace-yellow" fab small @click="tab = 1">
                            <v-icon color="white">mdi-chevron-right</v-icon>
                          </v-btn>
                        </div>
                      </div>
                      <p class="tip mt-5">Tip: <router-link to="/auth/register" class="tip v-underline"> Create an account</router-link> to save your filters for future use<br>
                        Note: You can clear your filters at any time to see all results.
                      </p>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item>
                    <v-card class="elevation-1 pa-5 tab-content">
                      <div
                        v-for="(item, i) in audienceItems"
                        :key="i"
                      >
                        <v-checkbox
                          v-model="audience"
                          :label="item.text"
                          :value="item.id"
                          hide-details
                        ></v-checkbox>
                      </div>
                      <div class="mt-10">
                        <div class="text-right">
                          <v-btn color="bg-pace-yellow" fab small @click="tab = 2">
                            <v-icon color="white">mdi-chevron-right</v-icon>
                          </v-btn>
                        </div>
                      </div>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item>
                    <v-card class="elevation-1 pa-5 tab-content">
                      <div
                        v-for="(item, i) in typeItems"
                        :key="i"
                      >
                        <v-checkbox
                          v-model="type"
                          :label="item.text"
                          :value="item.id"
                          hide-details
                        ></v-checkbox>
                      </div>
                      <div class="mt-10">
                        <div class="text-right">
                          <v-btn color="bg-pace-yellow" fab small @click="tab = 3">
                            <v-icon color="white">mdi-chevron-right</v-icon>
                          </v-btn>
                        </div>
                      </div>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item>
                    <v-card class="elevation-1 pa-5 tab-content">
                      <div
                        v-for="(item, i) in modeItems"
                        :key="i"
                      >
                        <v-checkbox
                          v-model="mode"
                          :label="item.text"
                          :value="item.id"
                          hide-details
                        ></v-checkbox>
                      </div>
                      <div class="mt-10">
                        <div class="text-right">
                          <v-btn color="bg-pace-yellow" fab small @click="tab = 0">
                            <v-icon color="white">mdi-chevron-right</v-icon>
                          </v-btn>
                        </div>
                      </div>
                    </v-card>
                  </v-tab-item>
                </v-tabs-items>
              </div>
              <div class="d-flex d-sm-none bg-pace-orange pa-2">
                <h3 class="white--text">My resources</h3>
              </div>
            </v-col>
            
            <v-col lg="7" md="7" class="resource-block pa-2 white pa-md-5 d-flex flex-column">
              <v-list two-line subheader class="pt-5 mb-10">
                <v-list-item
                  v-for="(item, i) in resources"
                  :key="item.title"
                  :class="item['status'] ? 'opened' : 'closed'"
                >
                  <v-list-item-avatar tile size="64">
                    <v-icon
                      :class="[item.iconClass]"
                      v-text="item.icon"
                    ></v-icon>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <span class="black--text " @click="viewResource(i)">{{item.title}}</span>
                    <p v-html="item.content"></p>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-btn icon @click="toggleResource(i)">
                      <v-icon color="grey lighten-1">{{item['status'] ? "mdi-chevron-up" : "mdi-chevron-down"}}</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
              <div class="d-flex justify-space-between mt-auto mb-5">
                <img class="logo" src="@/assets/PaCE_Logo_RGB.png" />
                <div class="text-right">
                  <span class="mr-2">1 / 22</span>
                  <v-btn color="bg-pace-yellow" fab small @click="nextPage">
                    <v-icon color="white">mdi-chevron-right</v-icon>
                  </v-btn>
                </div>
              </div>
            </v-col>
          </v-row>
          <v-dialog v-model="showResource" content-class="resource-dialog ma-0">
            <Resource @close-modal="closeResource"/>
          </v-dialog>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Resource from '@/components/Pace-resource/Resource'
export default {
  name: "Search",

  components: {
    Resource
  },

  data: () => ({
    loggedIn: false,
    tab: null,
    items: [
      { tab: 'Filters:', content: 'Tab 1 Content' },
      { tab: 'Audience', content: 'Tab 2 Content' },
      { tab: 'Type', content: 'Tab 2 Content' },
      { tab: 'Mode', content: 'Tab 2 Content' },
    ],
    audience: [],
    audienceItems: [
      { text: 'Student', id: 1 },
      { text: 'Academic', id: 2 },
      { text: 'Clinician - Accute care', id: 3 },
      { text: 'Clinician - Aged care', id: 4 },
      { text: 'Clinician - Community', id: 5 },
      { text: 'Clinician - Palliative care specialist', id: 6 },
    ],
    type: [],
    typeItems: [
      { text: 'Student', id: 7 },
      { text: 'Academic', id: 8 },
      { text: 'Clinician - Accute care', id: 9 },
      { text: 'Clinician - Aged care', id: 10 },
      { text: 'Clinician - Community', id: 11 },
      { text: 'Clinician - Palliative care specialist', id: 12 },
    ],
    mode: [],
    modeItems: [
      { text: 'Student', id: 13 },
      { text: 'Academic', id: 14 },
      { text: 'Clinician - Accute care', id: 15 },
      { text: 'Clinician - Aged care', id: 16 },
      { text: 'Clinician - Community', id: 17 },
      { text: 'Clinician - Palliative care specialist', id: 18 },
    ],
    resources: [
        { id: 22, icon: 'folder', iconClass: 'grey lighten-1 white--text', title: 'Photos', content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." },
        { id: 25, icon: 'folder', iconClass: 'grey lighten-1 white--text', title: 'Recipes', content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." },
        { id: 26, icon: 'folder', iconClass: 'grey lighten-1 white--text', title: 'Work', content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." },
      ],
    selectedResource: null,
    showResource: false,
  }),

  methods: {
    goToSearch() {
      this.$router.push({ name: 'Greeting' })
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

    closeResource() {
      this.showResource = false;
      this.selectedResource = null;
    },

    nextPage() {

    }
  }
};
</script>

<style lang="scss" scoped>
.logo {
  max-width: 369px;
  max-height: 70px;
  width: 100%;
  height: auto;
}

::v-deep .v-slide-group__prev, ::v-deep .v-slide-group__next {
  display: none!important;
}

::v-deep .search-input .v-text-field__details {
  display: none!important;
}

::v-deep .v-tab {
  color: #757575;
  font-weight: normal;
  font-size: 16px;
  text-transform: capitalize;
}

::v-deep .v-tab::after {
  content: '';
  width: 100%;
  height: 2px;
  background-color: currentColor;
  position: absolute;
  bottom: 0;
}

::v-deep .v-tab--active {
  background-color: transparent;
  color: white;
}

.search-info {
  background: url('../../assets/PaCE_Spider_GraphicElement.png') #FDBB2A;
  background-size: 300px 300px;
  background-repeat: no-repeat;
  flex: 1;
}

::v-deep .theme--light.v-tabs > .v-tabs-bar {
  background-color: transparent;
}

::v-deep .theme--light.v-tabs-items {
  border-radius: 4px;
  border: 1px solid #B2B2B2;
}

.tab-content {
  color: #4a4a4a;
}

.more-filters {
  font-size: 17px;
  font-weight: bold;
}

.tip {
  font-size: 12px;
  color: $pace-grey;
}

::v-deep .v-input--checkbox .v-input__slot {
  display: flex;
  flex-direction: row-reverse;
}

::v-deep .resource-block {
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
    }
  }
}

.logo {
  max-width: 264px;
  max-height: 50px;
  width: 100%;
  height: auto;
}

@media (max-width: 600px) {
  .search-info {
    // flex: unset;
  }

  .v-dialog {
    margin: 0;
    height: 100vh;
  }
}

</style>
