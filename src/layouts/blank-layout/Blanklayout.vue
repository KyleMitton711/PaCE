<template>
  <v-app id="blank">
    <v-dialog
      :value="authModalShow"
      content-class="login-modal"
      overlay-color="#939597"
      :overlay-opacity="1"
      persistent
    >
      <Login
        v-if="authModalShow == 'LOGIN'"
        :dialogView="true"
        @close-modal="authModalShow = null"
        @show-register="authModalShow = 'REGISTER'"
        @reset-password="authModalShow = 'RESETPASSWORD'"
      />
      <Register
        v-else-if="authModalShow == 'REGISTER'"
        :dialogView="true"
        @close-modal="authModalShow = 'LOGIN'"
      />
      <ResetPassword
        v-else-if="authModalShow == 'RESETPASSWORD'"
        :dialogView="true"
        @close-modal="authModalShow = 'LOGIN'"
      />
    </v-dialog>
    <router-view />
  </v-app>
</template>

<script>
import Login from "@/views/pace-auth/Login";
import Register from "@/views/pace-auth/Register";
// import NewPassword from "@/views/pace-auth/NewPassword";
import ResetPassword from "@/views/pace-auth/ResetPassword";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Blanklayout",
  components: {
    Login,
    Register,
    // NewPassword,
    ResetPassword
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["authModal"]),
    authModalShow: {
      get() {
        return this.authModal;
      },
      set(val) {
        this.toggleAuthModal(val);
      },
    },
  },
  methods: {
    ...mapActions(["toggleAuthModal"]),
  },
};
</script>

<style lang="scss">
#blank::after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  background: url("../../assets/PaCE_Spider_GraphicElement.png");
  background-size: 65% 85vh;
  background-position: -100px -100px;
  background-repeat: no-repeat;
  opacity: 0.6;
}

#blank {
  background: #939597;
  position: relative;

  .v-application--wrap {
    z-index: 1;
  }
}

@media (max-width: 600px) {
  #blank {
    background: #f15f35;
  }

  #blank::after {
    background-size: 500px 700px;
    background-position: -200px -200px;
  }
}
</style>