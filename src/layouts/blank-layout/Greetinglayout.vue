<template>
  <v-app id="search">
    <a class="white--text ml-auto mr-3 mt-3 signin-link d-block d-sm-none" v-if="user">Hi {{ user.firstName + ' ' + user.lastName }} <span class="v-underline" @click="logout"> Sign out ></span></a>
    <router-link to="/auth" class="v-underline ml-auto mr-3 mt-3 white--text signin-link d-block d-sm-none" v-else>Sign in ></router-link>
    <router-view />
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Greetinglayout',
  computed: {
    ...mapGetters("auth", ["user"])
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      window.location.href = "/auth";
    }
  }
}
</script>

<style lang="scss">
#search {
  background: url('../../assets/PaCE_Spider_GraphicElement.png') #F15F35;
}
</style>