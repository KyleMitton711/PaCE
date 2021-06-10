<template>
  <v-app id="auth">
    <router-view />
  </v-app>
</template>

<script>
  export default {
    name: 'Authlayout',
    components: {
      
    },
  }
</script>

<style lang="scss">

#auth::after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  background: url('../../assets/PaCE_Spider_GraphicElement.png');
  background-size: 65% 85vh;
  background-position: -100px -100px;
  background-repeat: no-repeat;
  opacity: 0.6;
}

#auth {
  background: #939597;
  position: relative;

  .v-application--wrap {
    z-index: 1;
  }
}

@media (max-width: 600px) {
  #auth {
    background: #F15F35;
  }

  #auth::after {
    background-size: 500px 700px;
    background-position: -200px -200px;
  }
}
</style>