<template>
  <v-app id="blank">
    <router-view />
  </v-app>
</template>

<script>
  export default {
    name: 'Blanklayout',
    components: {
      
    },
  }
</script>

<style lang="scss">
#blank {
  background: #939597;
}

@media (max-width: 600px) {
  #blank {
    background: #F15F35;
  }
}
</style>