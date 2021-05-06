<template>
  <v-navigation-drawer
    v-model="Sidebar_drawer"
    :dark="SidebarColor !== 'white'"
    :color="SidebarColor"
    mobile-breakpoint="960"
    clipped
    :right="$vuetify.rtl"
    mini-variant-width="70"
    :expand-on-hover="expandOnHover"
    app
    id="main-sidebar"
    v-bar
  >
    <!---USer Area -->
    <v-list-item two-line class="profile-bg">
      <v-list-item-content class="white--text">
        <v-list-item-title>{{ user && user.email }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <!---USer Area -->

    <v-list expand nav class="mt-1">
      <template v-for="(item, i) in items">
        <!---If Sidebar Caption -->
        <v-row v-if="item.header" :key="item.header" align="center">
          <v-col cols="12">
            <v-subheader v-if="item.header" class="d-block text-truncate">{{
              item.header
            }}</v-subheader>
          </v-col>
        </v-row>
        <!---If Sidebar Caption -->
        <BaseItemGroup
          v-else-if="item.children"
          :key="`group-${i}`"
          :item="item"
        ></BaseItemGroup>

        <BaseItem v-else :key="`item-${i}`" :item="item" />
      </template>
      <!---Sidebar Items -->
    </v-list>

    <v-list nav class="mt-15">
      <v-list-item
        to="/admin/users"
      >
        <v-list-item-icon>
          <v-icon v-text="'mdi-account-multiple'" />
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title v-text="'Users'" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import AdminSidebarItems from "./AdminSidebarItems";
export default {
  name: "Admin-Sidebar",
  props: {
    expandOnHover: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    items: AdminSidebarItems,
  }),
  computed: {
    ...mapState(["SidebarColor", "SidebarBg"]),
    ...mapGetters('auth', ['user']),
    Sidebar_drawer: {
      get() {
        return this.$store.state.Sidebar_drawer;
      },
      set(val) {
        this.$store.commit("SET_SIDEBAR_DRAWER", val);
      },
    },
  },
  watch: {
    "$vuetify.breakpoint.smAndDown"(val) {
      this.$emit("update:expandOnHover", !val);
    },
  },

  methods: {},
};
</script>
<style lang="scss">
#main-sidebar {
  box-shadow: 1px 0 20px rgba(0, 0, 0, 0.08);
  -webkit-box-shadow: 1px 0 20px rgba(0, 0, 0, 0.08);
  .v-navigation-drawer__border {
    display: none;
  }
  .v-list {
    padding: 8px 15px;
  }
  .v-list-item {
    &__icon--text,
    &__icon:first-child {
      justify-content: center;
      text-align: center;
      width: 20px;
    }
  }
  .profile-bg {
    background: url('../../../assets/PaCE_Spider_GraphicElement.png') #8A8B89;
    background-size: 300px 300px;
    background-position: -100px -200px;
    background-repeat: no-repeat;
    min-height: 150px;
    .v-list-item__content {
      align-self: flex-end;
    }
  }
}
</style>