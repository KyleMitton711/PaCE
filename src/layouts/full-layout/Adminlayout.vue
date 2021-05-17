<template>
  <v-app id="inspire" :class="{ horizontalstyle: setHorizontalLayout }">
    <AdminHeader
      v-model="expandOnHover"
    ></AdminHeader>
    <v-main>
      <v-container fluid class="page-wrapper">
        <router-view />
      </v-container>
    </v-main>
    <!-- ---------------------------------- -->
    <!--- Vertical Sidebar  part -->
    <!-- ---------------------------------- -->
    <AdminSidebar
      :expand-on-hover.sync="expandOnHover"
    ></AdminSidebar>
    
    <!-- <Footer></Footer> -->
  </v-app>
</template>

<script>
import AdminHeader from "./admin-header/AdminHeader";
import AdminSidebar from "./admin-sidebar/AdminSidebar";
// import Footer from "./footer/Footer";
import { mapState, mapMutations } from "vuex";
export default {
  name: "Adminlayout",

  components: {
    AdminHeader,
    AdminSidebar,
    // Footer,
  },

  props: {
    source: String,
  },
  data: () => ({
    expandOnHover: false,
  }),
  computed: {
    ...mapState(["Customizer_drawer", "setHorizontalLayout"]),
  },

  methods: {
    ...mapMutations({
      setCustomizerDrawer: "SET_CUSTOMIZER_DRAWER",
    }),
  },
};
</script>

<style>
</style>