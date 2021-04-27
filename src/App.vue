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

  components: {
    
  },

  methods: {
    ...mapActions("user", ["getCurrent"]),
    submit() {
      this.$refs.form.validate();
      if (this.$refs.form.validate(true)) {
        this.Login({
          UserName: this.email,
          Password: this.password
        }).then(res => {
          console.log(res);
          this.$router.push({ path: "/search" });
        });
      }
    }
  },

  async created() {
    let res = await this.getCurrent()
  }

};
</script>

<style lang="scss">
@import "style";

</style>
