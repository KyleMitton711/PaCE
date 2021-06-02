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
  background: #939597;
}

@media (max-width: 600px) {
  #search {
    background: #F15F35;
    position: relative;
    .v-application--wrap {
      z-index: 1;
    }
  }

  #search::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    background: url('../../assets/PaCE_Spider_GraphicElement.png');
    background-size: 500px 700px;
    background-position: -200px -200px;
    background-repeat: no-repeat;
    opacity: 0.6;
  }
}
</style>