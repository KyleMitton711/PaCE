<template>
  <v-container id="login" class="fill-height justify-center" tag="section">
    <v-row justify="center">
      <v-col lg="11" sm="8" xl="7">
        <v-card class="elevation-4">
          <v-row>
            <v-col lg="7" md="6" class="d-none d-md-flex login-image">
            </v-col>
            <v-col lg="5" md="6" class="pr-0">
              <div class="pa-7 pa-sm-12">
                <p class="font-weight-bold mt-4 text-center blue-grey--text text--darken-2">New Password</p>
                <h6 class="subtitle-1 mb-5 text-center">
                  Enter a new password
                </h6>

                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field
                    v-model="password"
                    :counter="10"
                    :rules="passwordRules"
                    label="Password"
                    required
                    outlined
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                  ></v-text-field>
                  <v-text-field
                    v-model="confirmpass"
                    :counter="10"
                    :rules="passwordRules"
                    label="Confirm password"
                    required
                    outlined
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                  ></v-text-field>
                  <v-btn
                    :disabled="!valid"
                    block
                    class="mr-4 white--text bg-pace-yellow"
                    submit
                    @click="submit"
                  >Save password</v-btn>
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
export default {
  name: "NewPassword",
  data: () => ({
    valid: true,
    password: "",
    show1: false,
    confirmpass: "",
    passwordRules: [
      password => !!password || "Password is required",
      password => (password && password.length <= 10) || "Password must be less than 10 characters",
      confirmation => confirmation === this.password || "Password doesn't match"
    ],
  }),
  methods: {
    submit() {
      this.$refs.form.validate();
      if (this.$refs.form.validate(true)) {
        this.$router.push({ path: "/auth/login" });
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
