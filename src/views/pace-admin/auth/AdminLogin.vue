<template>
  <v-container id="login" class="fill-height justify-center" tag="section">
    <v-row justify="center">
      <v-col lg="11" md="11" sm="8" xl="7">
        <v-card class="elevation-4">
          <v-row>
            <v-col lg="7" md="6" class="d-none d-md-flex login-image"></v-col>
            <v-col lg="5" md="6">
              <div class="pa-7 pa-sm-11">
                <img class="logo" src="@/assets/PaCE_Logo_RGB.png" />
                <h2 class="font-weight-bold mt-4 blue-grey--text text--darken-2">Sign in</h2>
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
                    <v-checkbox v-model="checkbox" label="Remember me?" required></v-checkbox>
                    <div class="ml-auto">
                      <a href="/auth/resetpassword" class="link">Forgot?</a>
                    </div>
                  </div>
                  <v-btn
                    :disabled="!valid"
                    block
                    class="mr-4 bg-pace-yellow white--text"
                    submit
                    @click="submit"
                    :loading="isLoading"
                  >Sign In</v-btn>
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
import { mapActions } from "vuex";
export default {
  name: "AdminLogin",

  data: () => ({
    valid: true,
    password: "",
    show1: false,
    passwordRules: [
      v => !!v || "Password is required",
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    checkbox: false,
    isLoading: false
  }),
  methods: {
    ...mapActions("auth", ["adminLogin"]),
    async submit() {
      this.$refs.form.validate();
      if (this.$refs.form.validate(true)) {
        this.isLoading = true;
        try {
          let res = await this.adminLogin({
            userName: this.email,
            password: this.password
          });
          this.isLoading = false;
          if (res.successful) {
            this.$router.push({ path: "/admin/projects" });
          }
        } catch (err) {
          this.isLoading = false;
          this.$notify({
            text: "Email or password incorrect",
            type: "error"
          });
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.login-image {
  background-image: url("../../../assets/image1.png");
  background-position-x: center;
}

.logo {
  max-width: 369px;
  max-height: 70px;
  width: 100%;
  height: auto;
}
</style>
