<template>
  <v-app id="search">
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
    <a
      class="white--text ml-auto mr-3 mt-3 signin-link d-block d-sm-none"
      v-if="user"
      >Hi {{ user.firstName + " " + user.lastName }}
      <span class="v-underline" @click="logout"> Sign out ></span></a
    >
    <a
      @click="login"
      class="
        v-underline
        ml-auto
        mr-3
        mt-3
        white--text
        signin-link
        d-block d-sm-none
      "
      v-else
      >Sign in ></a
    >
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
  name: "Greetinglayout",
  components: {
    Login,
    Register,
    // NewPassword,
    ResetPassword,
  },
  computed: {
    ...mapGetters("auth", ["user"]),
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
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      window.location.reload();
    },
    login() {
      this.toggleAuthModal("LOGIN");
    },
  },
};
</script>

<style lang="scss">
#search {
  background: #939597;
}

@media (max-width: 600px) {
  #search {
    background: #f15f35;
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
    background: url("../../assets/PaCE_Spider_GraphicElement.png");
    background-size: 500px 700px;
    background-position: -200px -200px;
    background-repeat: no-repeat;
    opacity: 0.6;
  }
}
</style>