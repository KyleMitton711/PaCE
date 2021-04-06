<template>
  <v-container id="login" class="justify-center mt-0 pt-0 pb-0 full-height" tag="section">
    <v-row justify="center" class="full-height">
      <v-col lg="11" md="11" sm="8" xl="7" class="pl-2 pr-2 pt-0 pb-0">
        <v-card class="elevation-4">
          <v-row>
            <v-col lg="5" md="5" class="pa-0 full-height d-flex flex-column pt-0">
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
                <p class="text-right"><a class="white--text">Browse 816 results ></a></p>
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
                    <v-card class="elevation-1 pa-5 tab-content">
                      <p class="mb-1">Too many results?</p>
                      <p>Take a minute to review your filters</p>
                      <p>Current filters</p>

                      <p class="mb-0"><b>Capabilities:</b> Graduate (HP1, HP2) <span class="text-right">X Clear</span></p>
                      <p><b>Audiences:</b> Student; Academic <span class="text-right">X Clear</span></p>
                      <div class="mt-10">
                        <div class="text-right">
                          <span class="more-filters mr-5">More filters</span>
                          <v-btn color="bg-pace-yellow" fab small @click="goToSearch">
                            <v-icon color="white">mdi-chevron-right</v-icon>
                          </v-btn>
                        </div>
                      </div>
                      <p class="tip mt-5">Tip: Tap a filter above to edit your selection.</p>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item>
                    <v-card flat>
                      <v-card-text></v-card-text>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item>
                    <v-card flat>
                      <v-card-text></v-card-text>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item>
                    <v-card flat>
                      <v-card-text></v-card-text>
                    </v-card>
                  </v-tab-item>
                </v-tabs-items>
              </div>
            </v-col>
            <v-col lg="7" md="7" class="">
              <v-expansion-panels accordion>
                <v-expansion-panel
                  v-for="(item,i) in 5"
                  :key="i"
                >
                  <v-expansion-panel-header>
                    Item <br>
                    Item33
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Search",

  data: () => ({
    tab: null,
    items: [
      { tab: 'Filters:', content: 'Tab 1 Content' },
      { tab: 'Audience', content: 'Tab 2 Content' },
      { tab: 'Type', content: 'Tab 2 Content' },
      { tab: 'Mode', content: 'Tab 2 Content' },
    ]
  }),

  methods: {
    goToSearch() {
      this.$router.push({ name: 'Greeting' })
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

@media (max-width: 600px) {
  .search-info {
    // flex: unset;
  }
}

</style>
