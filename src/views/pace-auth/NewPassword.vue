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

                <v-text-field
                  v-model="password"
                  :error-messages="fieldErrors('password')"
                  @input="$v.password.$touch()"
                  @blur="$v.password.$touch()"
                  label="Password"
                  outlined
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="show1 = !show1"
                  :type="show1 ? 'text' : 'password'"
                ></v-text-field>
                <v-text-field
                  v-model="confirmPass"
                  :error-messages="fieldErrors('confirmPass')"
                  @input="$v.confirmPass.$touch()"
                  @blur="$v.confirmPass.$touch()"
                  label="Confirm password"
                  outlined
                  :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="show2 = !show2"
                  :type="show2 ? 'text' : 'password'"
                ></v-text-field>
                <v-btn
                  :disabled="$v.$invalid"
                  block
                  class="mr-4 white--text bg-pace-yellow"
                  @click="submit"
                >Save password</v-btn>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {
  required,
  minLength,
  sameAs
} from "vuelidate/lib/validators";
import validationMixin from "@/mixins/validationMixin";
import { validPassword } from "@/utils/validators"
import { mapActions } from 'vuex';

export default {
  name: "NewPassword",
  mixins: [validationMixin],
  validations: {
    password: {
      required,
      validPassword,
      minLength: minLength(6)
    }, 
    confirmPass: {
      required,
      minLength,
      sameAsPassword: sameAs('password')
    }
  },
  validationMessages: {
    password: { 
      required: "Password is required",
      minLength: "Password must be more than 6 characters",
      validPassword: "Password must contain uppercase, lowercase, number and symbol"
    },
    confirmPass: { 
      required: "Please confirm password",
      minLength: "Password must be more than 6 characters",
      sameAsPassword: "Password is not matched."
    }
  },
  data: () => ({
    valid: true,
    password: null,
    confirmPass: null,
    show1: false,
    show2: false,
  }),
  methods: {
    ...mapActions("account", ["resetPassword"]),
    async submit() {
      let payload = {
        token: this.$route.query.token,
        newPassword: this.password
      }
      let res = await this.resetPassword(payload);
      console.log(res)
      if (res === true) {
        this.$notify({
          text: 'Password is reset successfully!',
          type: 'success'
        });
        this.$router.push({ path: "/auth/login" });
      } else {
        this.$notify({
          text: res.errors[0].errorMessage,
          type: 'error'
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
