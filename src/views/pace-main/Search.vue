<template>
  <v-container id="login" class="justify-center mt-0 pt-3 pt-sm-0 pb-3 pb-sm-0" tag="section">
    <v-row justify="center">
      <v-col lg="11" md="11" sm="8" xl="7" class="pl-2 pr-2 pt-0 pb-0">
        <v-card class="elevation-4 pl-2 pr-2">
          <v-row>
            <v-col lg="5" md="5" class="d-none d-md-flex bg-pace-yellow full-height">
            </v-col>
            <v-col lg="7" md="7" class="pl-md-10">
              <div class="page-header">
                <router-link to="/auth" class="v-underline ml-auto mr-3 mt-3 white--text signin-link d-block d-sm-none">Sign in ></router-link>
              </div>
              <div>
                <h3>Search</h3>
                <v-text-field
                  label="Enter a keyword"
                  append-icon="mdi-magnify"
                  single-line
                  solo
                ></v-text-field>
                <p class="">Browse 816 results</p>
              </div>
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

              <v-tabs-items v-model="tab">
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
                <v-tab-item>
                  <v-card flat>
                    <v-card-text></v-card-text>
                  </v-card>
                </v-tab-item>
              </v-tabs-items>
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
      { tab: 'Refine:', content: 'Tab 1 Content' },
      { tab: 'Audience', content: 'Tab 2 Content' },
      { tab: 'Type', content: 'Tab 2 Content' },
      { tab: 'Mode', content: 'Tab 2 Content' },
    ]
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
.logo {
  max-width: 369px;
  max-height: 70px;
  width: 100%;
  height: auto;
}

>>>.v-slide-group__prev, .v-slide-group__next {
  display: none!important;
}
</style>
