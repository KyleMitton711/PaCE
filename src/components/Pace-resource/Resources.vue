<template>
  <v-container class="justify-center mt-0 pt-0 pb-0">
    <v-row justify="center">
      <v-col cols="12" class="pa-0 full-height">
        <v-card class="full-height d-flex flex-column resource-list">
          <div>
            <v-system-bar
              height="60"
              color="primary"
              class="white--text"
            >
              <v-btn icon @click="close">
                <v-icon color="white">mdi-arrow-left</v-icon>
              </v-btn>
              <v-toolbar-title>"Best Practice" 81 Results</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn text class="pace-yellow--text" v-on:click = "onFilter()">
                  Filters
                  <v-icon class="pace-yellow--text">{{isShowFilter ? "mdi-filter-variant-minus" : "mdi-filter-variant"}}</v-icon>
              </v-btn>
            </v-system-bar>
            
            <div class="pa-3 content-filter mb-3" v-if="isShowFilter">
              <p>Your filters:</p>
              <span><b>2 Audiences:</b> Student, Acadiemic 
                <span class="float-right pace-yellow--text"><v-icon @click="isShowFilter = false">mdi-close</v-icon></span>
              </span>
            </div>
            
            <v-list two-line subheader class="pt-5 mb-10 px-3">
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
          </div>
          <div class="pa-4 mb-0 mb-sm-10 mt-auto d-flex justify-end align-center">
            <p class="pa-2 mb-0">1/20</p>
            <v-btn color="bg-pace-yellow" fab small @click="nextPage">
              <v-icon color="white">mdi-chevron-right</v-icon>
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Resources",

  data: () => ({
    resources: [
      { id: 22, icon: 'folder', iconClass: 'grey lighten-1 white--text', title: 'Photos', content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." },
      { id: 25, icon: 'folder', iconClass: 'grey lighten-1 white--text', title: 'Recipes', content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." },
      { id: 26, icon: 'folder', iconClass: 'grey lighten-1 white--text', title: 'Work', content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." },
    ],
    isShowFilter: false,
    selectedResource: null,
    showResource: false,
  }),
  computed: {},
  methods: {
    onFilter() {
      this.isShowFilter = !this.isShowFilter;
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

    close() {
      this.$emit('close-modal');
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

::v-deep .resource-list {
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
</style>
