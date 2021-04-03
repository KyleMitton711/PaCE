<template>
  <v-container id="login" class="fill-height justify-center" tag="section">
    <v-row justify="center">
      <v-col lg="11" md="11" sm="8" xl="7">
        <v-card class="elevation-4 pa-3">
          <v-row>
            <v-col lg="7" md="6" class="d-none d-md-flex login-image">
            </v-col>
            <v-col lg="5" md="6">
              <div v-if="tab == 1">
                <v-list-item-subtitle class="text-wrap">
                  What are you looking for today?
                </v-list-item-subtitle>
                <h4 class="title mt-4">Resources for:</h4>
                <div class="mt-4">
                  <v-list>
                    <v-list-item-group v-model="selectedResource" mandatory color="pace_grey">
                      <v-list-item
                        v-for="(item, i) in items"
                        :key="i"
                        @click="selectResource(i)"
                      >
                        <v-list-item-avatar size="60">
                          <v-icon class="grey lighten-1 white--text" v-text="item.icon"></v-icon>
                        </v-list-item-avatar>

                        <v-list-item-content>
                          <h4 class="text">{{item.text}}</h4>
                          <span class="subtext">{{item.subtext}}</span>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </div>
                <div class="d-block d-sm-flex align-center mb-4 mt-4">
                  <div class="ml-auto">
                    <span class="mr-3">None of above?</span><a href="/search" class="link">Skip to search</a>
                  </div>
                </div>
              </div>
              <div v-else>
                <h4 class="title mt-4">Which capabilities would you like to develop?</h4>
                <div class="mt-4">
                  <v-list>
                    <v-list-item-group v-model="selectedCapabilities" multiple mandatory color="pace_grey">
                      <v-list-item
                        v-for="(item, i) in items[selectedResource].subItems"
                        :key="i"
                      >
                        <v-list-item-avatar size="60">
                          <v-icon class="grey lighten-1 white--text" v-text="item.icon"></v-icon>
                        </v-list-item-avatar>

                        <v-list-item-content>
                          <p class="subtext">{{item.text}}</p>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </div>
                <div class="d-block d-sm-flex align-center mb-4 mt-4">
                  <div class="ml-auto">
                    <span class="mr-3" @click="tab = 1">&lt;- back</span>
                  </div>
                  <div class="ml-auto text-right">
                    <span class="mr-2">View {{selectedCapabilities && selectedCapabilities.length}} of {{items[selectedResource].subItems.length}} selected</span>
                    <v-btn color="pace-grey" fab small @click="goToSearch">
                      <v-icon>mdi-chevron-right</v-icon>
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
        icon: 'mdi-wifi',
        text: 'Health practitioner / professional',
        subtext: 'Graduate capabilities in palliative care',
        subItems: [{
          id: 1,
          icon: 'mdi-wifi',
          text: 'Person-centred comunication in the context of an individual\'s responses to loss and grief, existential challenges, uncertainty & changing goals of care'
        }, {
          id: 2,
          icon: 'mdi-wifi',
          text: 'Appreciation of and demonstrated respect for the diverse human and clinical responses of each individual throughout their illness trajectory'
        }, {
          id: 3,
          icon: 'mdi-wifi',
          text: 'Understanding of principles for assessment and management of clinical and supportive care needs'
        }]
      },
      {
        icon: 'mdi-bluetooth',
        text: 'Health care worker',
        subtext: 'Graduate capabilities in palliative care',
        subItems: [{
          id: 1,
          icon: 'mdi-wifi',
          text: 'Person-centred comunication in the context of an individual\'s responses to loss and grief, existential challenges, uncertainty & changing goals of care'
        }, {
          id: 2,
          icon: 'mdi-wifi',
          text: 'Appreciation of and demonstrated respect for the diverse human and clinical responses of each individual throughout their illness trajectory'
        }, {
          id: 3,
          icon: 'mdi-wifi',
          text: 'Understanding of principles for assessment and management of clinical and supportive care needs'
        }]
      },
      {
        icon: 'mdi-chart-donut',
        text: 'Specialist',
        subtext: 'Specialist capabilities in palliative care',
        subItems: [{
          id: 1,
          icon: 'mdi-wifi',
          text: 'Person-centred comunication in the context of an individual\'s responses to loss and grief, existential challenges, uncertainty & changing goals of care'
        }, {
          id: 2,
          icon: 'mdi-wifi',
          text: 'Appreciation of and demonstrated respect for the diverse human and clinical responses of each individual throughout their illness trajectory'
        }, {
          id: 3,
          icon: 'mdi-wifi',
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
  }
};
</script>

<style lang="scss" scoped>
.login-image {
  background-image: url('../../assets/image1.png');
  background-position-x: center;
}

.link {
  text-decoration: underline;
}

.text {
  font-size: 17px;
}

.subtext {
  font-size: 14px;
}

.v-list-item {
  height: 100px;
  align-items: flex-start;
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
