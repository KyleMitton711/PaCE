<template>
  <v-container id="login" class="justify-center mt-10 mt-sm-0 pt-3 pt-sm-0 pb-3 pb-sm-0" tag="section">
    <v-row justify="center">
      <v-col lg="11" md="11" sm="8" xl="7" class="pl-2 pr-2 pt-0 pb-0">
        <v-card class="elevation-4 pl-2 pr-2">
          <v-row>
            <v-col lg="5" md="5" class="d-none d-md-flex bg-pace-yellow full-height">
            </v-col>
            <v-col lg="7" md="7" class="pl-md-10">
              <div class="d-none d-md-flex mt-10 mb-16">
                <img class="logo" src="@/assets/PaCE_Logo_RGB.png" />
                <router-link to="/auth" class="v-underline ml-auto mr-3 black--text signin-link">Sign in ></router-link>
              </div>
              <div v-if="tab == 1">
                <p class="statement text-wrap">
                  What are you looking for today?
                </p>
                <h4 class="tab-title mt-4">Resources for:</h4>
                <div class="mt-4">
                  <v-list>
                    <v-list-item-group v-model="selectedResource" color="pace_grey">
                      <v-list-item
                        v-for="(item, i) in items"
                        :key="i"
                        @click="selectResource(i)"
                      >
                        <v-list-item-avatar size="65">
                          <span class="white--text headline">CJ</span>
                          <!-- <v-icon class="white--text" v-text="item.icon"></v-icon> -->
                        </v-list-item-avatar>

                        <v-list-item-content>
                          <p class="text">{{item.text}}</p>
                          <span class="subtext">{{item.subtext}}</span>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </div>
                <div class="d-block d-sm-flex align-center mb-4 ml-4">
                  <div>
                    <span class="mr-3">None of above?</span><a href="/search" class="link">Skip to search</a>
                  </div>
                </div>
              </div>
              <div v-else>
                <h4 class="tab-title mt-4">Which capabilities would you like to develop?</h4>
                <div class="mt-4">
                  <v-list>
                    <v-list-item-group v-model="selectedCapabilities" multiple mandatory color="pace_grey">
                      <v-list-item
                        v-for="(item, i) in items[selectedResource].subItems"
                        :key="i"
                      >
                        <v-list-item-avatar size="65">
                          <span class="white--text headline">CJ{{i + 1}}</span>
                        </v-list-item-avatar>

                        <v-list-item-content>
                          <p class="subtext">{{item.text}}</p>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </div>
                <div class="d-block d-sm-flex align-center mb-4 mt-4">
                  <div class="ml-3 mr-3">
                    <span @click="tab = 1">&lt;- back</span>
                  </div>
                  <div class="text-right">
                    <span class="selected-count mr-2">View {{selectedCapabilities && selectedCapabilities.length}} of {{items[selectedResource].subItems.length}} selected</span>
                    <v-btn color="bg-pace-yellow" fab small @click="goToSearch">
                      <v-icon color="white">mdi-chevron-right</v-icon>
                    </v-btn>
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Greeting",

  data: () => ({
    tab: 1,
    selectedResource: null,
    selectedCapabilities: null,
    items: [
      {
        text: 'Health practitioner / professional',
        subtext: 'Graduate capabilities in palliative care',
        subItems: [{
          id: 1,
          text: 'Person-centred comunication in the context of an individual\'s responses to loss and grief, existential challenges, uncertainty & changing goals of care'
        }, {
          id: 2,
          text: 'Appreciation of and demonstrated respect for the diverse human and clinical responses of each individual throughout their illness trajectory'
        }, {
          id: 3,
          text: 'Understanding of principles for assessment and management of clinical and supportive care needs'
        }]
      },
      {
        text: 'Health care worker',
        subtext: 'Graduate capabilities in palliative care',
        subItems: [{
          id: 1,
          text: 'Person-centred comunication in the context of an individual\'s responses to loss and grief, existential challenges, uncertainty & changing goals of care'
        }, {
          id: 2,
          text: 'Appreciation of and demonstrated respect for the diverse human and clinical responses of each individual throughout their illness trajectory'
        }, {
          id: 3,
          text: 'Understanding of principles for assessment and management of clinical and supportive care needs'
        }]
      },
      {
        text: 'Specialist',
        subtext: 'Specialist capabilities in palliative care',
        subItems: [{
          id: 1,
          text: 'Person-centred comunication in the context of an individual\'s responses to loss and grief, existential challenges, uncertainty & changing goals of care'
        }, {
          id: 2,
          text: 'Appreciation of and demonstrated respect for the diverse human and clinical responses of each individual throughout their illness trajectory'
        }, {
          id: 3,
          text: 'Understanding of principles for assessment and management of clinical and supportive care needs'
        }]
      },
    ],
  }),

  methods: {
    selectResource(index) {
      this.tab = 2;
    },

    goToSearch() {
      this.$router.push({ name: 'Search' })
    }
  },

  mounted() {
    if (this.$route.query.tab) {
      this.tab = this.$route.query.tab;
      this.selectedResource = 0; // need to update
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

.login-image {
  background-image: url('../../assets/image1.png');
  background-position-x: center;
}

.statement {
  font-size: 17px;
}

.tab-title {
  font-size: 24px;
}

.link {
  text-decoration: underline;
}

.text {
  font-size: 19px;
}

.subtext {
  font-size: 14px;
}

.selected-count {
  font-size: 17px;
  font-weight: bold;
}

.v-list-item {
  max-width: 400px;
  height: 115px;
  align-items: flex-start;
  background-color: #8A8B89;
  margin-bottom: 7px;
  padding-left: 12px;
  .v-list-item__avatar {
    margin-right: 12px;
    border-radius: 50%;
    background-color: #F3B439;
  }

  .v-list-item__content {
    color: white;
  }

  &--active {
    background-color: #F3B439;
    .v-list-item__avatar {
      background-color: #966F23;
      span {
        color: black!important;;
      }
    }
  }
}

.v-list-item__content {
  align-self: flex-start;
}

@media (min-width: 960px) {
  .login-image {
    height: 600px;
  }
}
</style>
