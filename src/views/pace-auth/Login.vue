<template>
  <v-container id="login" class="fill-height justify-center" tag="section">
    <v-row justify="center">
      <v-col lg="11" md="11" sm="8" xl="7">
        <v-card class="elevation-4">
          <v-row>
            <v-col lg="7" md="6" class="d-none d-md-flex login-image">
            </v-col>
            <v-col lg="5" md="6">
              <div class="pa-7 pa-sm-11">
                <img class="logo" src="@/assets/PaCE_Logo_RGB.png" />
                <h2 class="font-weight-bold mt-4 blue-grey--text text--darken-2">Sign in</h2>
                <h6 class="subtitle-1">
                  Don't have an account?
                  <a href="/auth/register" class="pace-orange--text">Sign Up</a>
                </h6>

                <v-form ref="form" v-model="valid" lazy-validation action="/dashboards/analytical">
                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    class="mt-4"
                    required
                    outlined
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    :rules="passwordRules"
                    label="Password"
                    required
                    outlined
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="show1 = !show1"
                    :type="show1 ? 'text' : 'password'"
                  ></v-text-field>

                  <div class="d-block d-sm-flex align-center mb-4 mb-sm-0">
                    <div class="ml-auto text-right">
                      <a href="/auth/resetpassword" class="link">Forgot your password</a>
                    </div>
                  </div>
                  <v-btn
                    :disabled="!valid"
                    block
                    class="mr-4 bg-pace-yellow white--text"
                    submit
                    @click="submit"
                  >Sign In</v-btn>

                  <!-- <div class="d-block d-sm-flex align-center mb-4 mb-sm-0 mt-4">
                    <div class="ml-auto text-center">
                      <a href="/auth/register" class="link">Create your account</a>
                    </div>
                  </div> -->
                </v-form>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: "Login",

  data: () => ({
    valid: true,
    password: "",
    show1: false,
    passwordRules: [
      v => !!v || "Password is required",
      // v => (v && v.length <= 10) || "Password must be less than 10 characters"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    checkbox: false
  }),
  computed: {},
  methods: {
    ...mapActions("auth", ["login"]),
    submit() {
      this.$refs.form.validate();
      if (this.$refs.form.validate(true)) {
        this.login({
          UserName: this.email,
          Password: this.password
        }).then(res => {
          if (res.data) {
            this.$router.push({ path: "/search" });
          } else {
            this.$notify({
              text: res.errors[0].errorMessage,
              type: 'error'
            });
          }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.login-image {
  background-image: url('../../assets/image1.png');
  background-position-x: center;
}

.logo {
  max-width: 369px;
  max-height: 70px;
  width: 100%;
  height: auto;
}
</style>
