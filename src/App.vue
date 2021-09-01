<template>
  <v-app id="materialpro" :class="`${!$vuetify.breakpoint.smAndDown ? 'full-sidebar' : 'mini-sidebar'}`">
    <router-view />
    <notifications :duration="5000"/>
  </v-app>

</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'App',

  data() {
    return {
      showUpdateUI: false
    }
  },
  
  methods: {
    ...mapActions("user", ["getCurrent"]),
    async accept() {
      this.showUpdateUI = false;
      await this.$workbox.messageSW({ type: "SKIP_WAITING" });
    }
  },

  async created() {
    if (this.$workbox) {
      this.$workbox.addEventListener("waiting", () => {
        this.showUpdateUI = true;
      });
    }
    let res = await this.getCurrent()
  }

};
</script>

<style lang="scss">
@import "style";

</style>
