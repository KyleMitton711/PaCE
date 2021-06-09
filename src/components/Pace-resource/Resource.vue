<template>
  <v-container class="py-0">
    <v-row class="white resource">
      <v-col
        cols="12"
        class="pa-0 full-height-md d-flex flex-column pt-0"
        v-if="resource"
      >
        <div
          class="
            bg-pace-orange
            py-3
            px-4
            page-header
            d-flex
            justify-space-between
          "
        >
          <div class="page-header-title-block d-flex align-center">
            <v-icon
              class="white--text d-sm-none mr-3"
              size="30"
              aria-controls
              @click="closeDialog"
            >mdi-arrow-left</v-icon>
            <span class="white--text page-header-title mr-3">
              {{
                isModuleView
                  ? "Module " + (resource && resource.items[0].itemNum) + " : "
                  : ""
              }}
              {{ resource && resource.title }}
            </span>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  class="pace-yellow--text bookmark-icon ml-auto"
                  size="30"
                  aria-controls
                  @click="toggleBookmark"
                  v-bind="attrs"
                  v-on="on"
                > {{
                  resource.isBookmark
                    ? "mdi-bookmark"
                    : "mdi-bookmark-outline"
                  }}</v-icon>
              </template>
              <span>{{ resource.isBookmark ? 'Remove from' : 'Add to' }} 'My Resources'</span>
            </v-tooltip>
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
          <h2 v-if="isModuleView">{{ resource && resource.items[0].title }}</h2>
          <div class="d-flex align-center">
            <v-avatar size="64" color="grey">
              <v-icon>{{ "mdi-" + resource.typeLogo }}</v-icon>
            </v-avatar>
            <h3 class="ml-4">{{ resourceType }}</h3>
          </div>
          <h3 class="mt-4">
            <a :href="resource.url" target="_blank">
              {{
                isModuleView
                  ? "Module " + (resource && resource.items[0].itemNum) + " : "
                  : ""
              }}
              {{ resource.title }}
            </a>
          </h3>
          <div v-html="resource.overview" class="mt-6"></div>
          <p v-if="resource.outcome" class="mb-2">
            <b>Learning Outcomes</b>
          </p>
          <div v-html="resource.outcome" class="mt-2"></div>

          <p class="mt-4" v-if="resource.duration">
            <b>Duration</b> {{ resource.duration }}
          </p>
          <p v-if="resource.endorsements">{{ resource.endorsements }}</p>

          <p class="mt-4 mb-0" v-if="selectedAudienceItems.length > 0">
            <b>Audience:</b>
          </p>
          <p class="mb-0">{{ selectedAudienceItems }}</p>
          <p class="mt-2 mb-0" v-if="selectedTypeItems.length > 0">
            <b>Type:</b>
          </p>
          <p class="mb-0">{{ selectedTypeItems }}</p>
          <p class="mt-2 mb-0" v-if="selectedModeItems.length > 0">
            <b>Mode:</b>
          </p>
          <p class="mb-0">{{ selectedModeItems }}</p>
        </div>
        <div class="pa-4 mb-0 mb-sm-10 mt-auto d-flex justify-end align-end">
          <v-btn color="bg-pace-yellow" small fab @click="shareResource">
            <v-icon class="white--text" aria-controls>mdi-share-variant</v-icon>
          </v-btn>
        </div>
      </v-col>
      <v-dialog v-model="loginModal" content-class="login-modal" overlay-color="#939597" :overlay-opacity="1">
        <Login :dialogView="true" @close-modal="loginModal = false" />
      </v-dialog>
      <v-snackbar v-model="snackbar" :multi-line="true" :timeout="-1">
        To keep items for later in 'My Resources' and for PaCE to recall your
        filters you need to sign-in.
        <br />
        <p class="mb-0 mt-2 text-center">
          <router-link to="/auth/register">Create an account</router-link> |
          <!-- <router-link to="/auth/login">Sign in</router-link> -->
          <a @click="loginModal = true">Sign in</a> |
          <a @click="snackbar = false">No thanks</a>
        </p>
      </v-snackbar>
    </v-row>
  </v-container>
</template>

<script>
import { resourceTypeEnumItems, tagTypeEnumItems } from "@/data/staticItems";
import { findIndex } from "lodash";
import { mapGetters, mapActions } from "vuex";
import resourceDetailMixin from "@/mixins/resourceDetailMixin";
import Login from "@/views/pace-auth/Login";

export default {
  name: "Resource",

  mixins: [resourceDetailMixin],

  components: {
    Login
  },

  props: {
    resourceId: String,
    isModuleView: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    tab: null,
    isBookmarked: true,
    tagTypeItems: tagTypeEnumItems,
    resource: null,
    loginModal: false
  }),

  computed: {
    ...mapGetters("auth", ["user"]),
  },

  watch: {
    user: {
      handler: function (val) {
        if (!val) {
          this.snackbar = true;
        }
      },
    },

    resourceId: {
      handler: async function (val) {
        if (val) {
          this.resource = await this.getResourceDetail(val);
        }
      },
    },
  },

  methods: {
    ...mapActions("resource", [
      "bookmarkResource",
      "unbookmarkResource",
      "getResourceDetail",
    ]),

    closeDialog() {
      this.$emit("close-modal", this.isModuleView);
    },
  },

  async mounted() {
    if (this.resourceId) {
      this.resource = await this.getResourceDetail(this.resourceId);
    }
  },
};
</script>

<style lang="scss" scoped>
::v-deep blockquote {
  border-left: 0.25em solid #dfe2e5;
  color: #6a737d;
  padding-left: 1em;
  margin: 20px 0 !important;
}

.resource {
  min-height: 100vh;
}

::v-deep .resource .v-tab {
  background-color: $pace-yellow;
}

::v-deep .resource .theme--light.v-tabs-items {
  border: none;
}

.page-header-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.page-header-title-block {
  width: calc(100% - 40px);
}

@media (max-width: 600px) {
  .page-header-title-block {
    width: 100%;
  }
}
</style>
