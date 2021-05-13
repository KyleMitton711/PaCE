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
  background: url('../../assets/PaCE_Spider_GraphicElement.png') #939597;
  background-size: 65% 85%;
  background-position: -100px -100px;
  background-repeat: no-repeat;
}

@media (max-width: 600px) {
  #blank {
    background: url('../../assets/PaCE_Spider_GraphicElement.png') #F15F35;
    background-size: 500px 700px;
    background-position: -200px -200px;
    background-repeat: no-repeat;
  }
}
</style>