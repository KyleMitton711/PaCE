<template>
  <v-app id="search">
      <router-link to="/auth" class="v-underline ml-auto mr-3 mt-3 white--text signin-link">Sign in ></router-link>
     <router-view />
  </v-app>
</template>

<script>
  export default {
    name: 'Searchlayout',
    components: {
      
    },
  }
</script>

<style lang="scss">
#search {
    background: url('../../assets/PaCE_Spider_GraphicElement.png') #F15F35;
}
</style>