<template>
  <div class="py-0 resource-container">
    <div class="white resource">
      <div
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

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <a :href="resource.url" class="title mt-4" target="_blank" v-bind="attrs" v-on="on">
                {{ resource.title }}
              </a>
            </template>
            <span>click here to view the resource on our project partner website</span>
          </v-tooltip>
          <br/>
          
          <a :href="resource.projectUrl" target="_blank">{{ resource.projectName }}</a>
          <div v-html="resource.overview" class="mt-6"></div>
          <p v-if="!resource.isProgram && resource.items && resource.items.length > 0" class="mt-6">
            Resource {{ resource.items[0].itemNum }} of <a @click="viewProgram(resource.items[0].id, 'SUMMARY')">{{ resource.items[0].title }}</a>
          </p>
          <p v-if="resource.outcome" class="mb-2">
            <b>Learning Outcomes</b>
          </p>
          <div v-html="resource.outcome" class="mt-2"></div>

          <p class="mt-4" v-if="resource.duration">
            <b>Duration</b> {{ resource.duration }}
          </p>
          <p class="mb-0" v-if="resource.endorsements"><b>Certifications</b></p>
          <p v-if="resource.endorsements">{{ resource.endorsements }}</p>

          <template v-if="resource.capabilityCodes.length > 0">
            <p class="mt-4 mb-0">
              <b class="text-uppercase">Capabilities:</b>
              <v-chip
                class="ma-2"
                v-for="(code, index) in resource.capabilityCodes"
                :key="index"
              >
                {{ code }}
              </v-chip>
            </p>
            
          </template>

          <template v-if="selectedAudienceItems.length > 0">
            <p class="mt-2 mb-0">
              <b class="text-uppercase">Audience: </b> {{ selectedAudienceItems }}
            </p>
          </template>
          <template v-if="selectedTypeItems.length > 0">
            <p class="mt-2 mb-0">
              <b class="text-uppercase">Type: </b> {{ selectedTypeItems }}
            </p>
          </template>
          <template v-if="selectedModeItems.length > 0">
            <p class="mt-2 mb-0">
              <b class="text-uppercase">Mode: </b> {{ selectedModeItems }}
            </p>
          </template>
          <template v-if="selectedContextItems.length > 0">
            <p class="mt-2 mb-0">
              <b class="text-uppercase">Context: </b> {{ selectedContextItems }}
            </p>
          </template>
          <template v-if="selectedIllnessItems.length > 0">
            <p class="mt-2 mb-0">
              <b class="text-uppercase">Illness: </b> {{ selectedIllnessItems }}
            </p>
          </template>
          <template v-if="selectedPedagogyItems.length > 0">
            <p class="mt-2 mb-0">
              <b class="text-uppercase">Pedagogy: </b> {{ selectedPedagogyItems }}
            </p>
          </template>
          <template v-if="selectedRoleItems.length > 0">
            <p class="mt-2 mb-0">
              <b class="text-uppercase">Role: </b> {{ selectedRoleItems }}
            </p>
          </template>
          <template v-if="selectedSymptomItems.length > 0">
            <p class="mt-2 mb-0">
              <b class="text-uppercase">Symptom: </b> {{ selectedSymptomItems }}
            </p>
          </template>
          <template v-if="selectedTopicItems.length > 0">
            <p class="mt-2 mb-0">
              <b class="text-uppercase">Topic: </b> {{ selectedTopicItems }}
            </p>
          </template>
        </div>
        <div class="pa-4 mb-0 mb-sm-10 mt-auto d-flex justify-end align-end">
          <v-tooltip left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="bg-pace-yellow" small fab @click="shareResource" v-bind="attrs" v-on="on">
                <v-icon
                  class="white--text"
                  aria-controls
                >mdi-share-variant</v-icon>
              </v-btn>
            </template>
            <span>Share resource</span>
          </v-tooltip>
        </div>
      </div>
      <v-snackbar v-model="snackbar" :multi-line="true" :timeout="-1">
        To keep items for later in 'My Resources' and for PaCE to recall your
        filters you need to sign-in.
        <br />
        <p class="mb-0 mt-2 text-center">
          <a @click="register">Create an account</a> | 
          <a @click="login">Sign in</a> |
          <a @click="snackbar = false">No thanks</a>
        </p>
      </v-snackbar>
    </div>
  </div>
</template>

<script>
import { tagTypeEnumItems } from "@/data/staticItems";
import { mapGetters, mapActions } from "vuex";
import resourceDetailMixin from "@/mixins/resourceDetailMixin";

export default {
  name: "Resource",

  mixins: [resourceDetailMixin],

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
      handler: async function (val) {
        if (!val) {
          this.snackbar = true;
        } else {
          this.snackbar = false;
          this.resource = await this.getResourceDetail(this.resourceId);
          this.resource.capabilityCodes.sort(this.codeSort);
        }
      },
    },

    resourceId: {
      handler: async function (val) {
        if (val) {
          this.resource = await this.getResourceDetail(val);
          this.resource.capabilityCodes.sort(this.codeSort);
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
    ...mapActions(["toggleAuthModal"]),

    closeDialog() {
      this.$emit("close-modal", this.isModuleView);
    },

    login() {
      this.toggleAuthModal('LOGIN');
    },

    register() {
      this.toggleAuthModal('REGISTER');
    },

    viewProgram(item, viewMode) {
      this.$emit('view-program', item, viewMode);
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

.resource-container {
  min-height: 100%;
  display: inline;
}

.resource {
  min-height: 100%;
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
    width: calc(100vw - 40px);
  }
}
</style>
