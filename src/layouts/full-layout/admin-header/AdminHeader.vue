<template>
  <v-app-bar
    app
    clipped-left
    clipped-right
    :color="navbarColor"
    :dark="navbarColor !== 'white'"
  >
    <!---Logo part -->
    <!-- <v-toolbar-title
      class="align-center d-flex logo-width"
      :class="`${showLogo ? 'logo-width' : ''}`"
      v-if="navbarColor !== 'white'"
    >
      <span class="logo-icon">
        <img src="../../../assets/images/logo-light-icon.png" class="mt-2" />
      </span>
      <span class="logo-text ml-2" :class="`${showLogo ? '' : 'hidelogo'}`">
        <img src="../../../assets/images/logo-light-text.png" class="mt-2" />
      </span>
    </v-toolbar-title> -->
    <!---Dark Logo part -->
    <!-- <v-toolbar-title
      class="align-center d-flex logo-width"
      :class="`${showLogo ? 'logo-width' : ''}`"
      v-else
    >
      <span class="logo-icon">
        <img src="../../../assets/images/logo-icon.png" class="mt-2" />
      </span>
      <span class="logo-text ml-2" :class="`${showLogo ? '' : 'hidelogo'}`">
        <img src="../../../assets/images/logo-text.png" class="mt-2" />
      </span>
    </v-toolbar-title> -->
    <!---Logo part -->
    <!---/Toggle sidebar part -->
    <div @click="showhideLogo">
      <v-app-bar-nav-icon
        @click="
          $vuetify.breakpoint.smAndDown
            ? setSidebarDrawer(!Sidebar_drawer)
            : $emit('input', !value)
        "
      />
    </div>
    <!---/Toggle sidebar part -->

    <!-- <v-card v-if="showSearch" class="searchinput">
      <template>
        <v-text-field
          placeholder="Search & hit enter"
          class="mt-3 mb-0"
          append-icon="mdi-close"
          @click:append="searchbox"
        ></v-text-field>
      </template>
    </v-card> -->
    <!---/Search part -->
    <v-spacer />
    <!---right part -->
    <!---User -->
    <!-- <v-menu
      bottom
      left
      offset-y
      origin="top right"
      transition="scale-transition"
    >
      <template v-slot:activator="{ on }">
        <v-btn dark icon v-on="on" class="mr-1">
          <v-avatar size="40">
            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
          </v-avatar>
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, i) in userprofile"
          :key="i"
          :to="item.to"
          @click="item.click"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu> -->
    <!---User -->
  </v-app-bar>
</template>
<script>
// Utilities
import { mapState, mapMutations } from "vuex";
export default {
  name: "AdminHeader",

  components: {},

  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showLogo: true,
      showSearch: false,
      userprofile: [
        { title: "Inbox", to: "/theme/apps/email/inbox" },
        { title: "Account Setting", to: "/theme/form-layouts/flformbasic" },
        { 
          title: "Logout", 
          click: this.logout
        },
      ],
      href() {
        return undefined;
      },
    }
  },

  computed: {
    ...mapState(["navbarColor", "Sidebar_drawer"]),
  },

  methods: {
    ...mapMutations({
      setSidebarDrawer: "SET_SIDEBAR_DRAWER",
    }),
    showhideLogo: function () {
      this.showLogo = !this.showLogo;
    },
    searchbox: function () {
      this.showSearch = !this.showSearch;
    },
    logout: function () {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      window.location.href = "/admin/auth";
    }
  },
};
</script>

<style lang="scss">
.hidelogo {
  display: none;
}
.searchinput {
  position: absolute;
  width: 100%;
  margin: 0;
  left: 0;
  z-index: 10;
  padding: 0 15px;
}
.descpart {
  max-width: 220px;
}
</style>