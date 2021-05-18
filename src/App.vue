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
  
  methods: {
    ...mapActions("user", ["getCurrent"])
  },

  async created() {
    let res = await this.getCurrent()
  }

};
</script>

<style lang="scss">
@import "style";

</style>
