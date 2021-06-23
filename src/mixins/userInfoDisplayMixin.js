import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters("auth", ["user"]),
    userInfo() {
      if (this.user) {
        if (this.user.fullName) {
          return this.user.fullName;
        } else {
          return this.user.email;
        }
      } else return null;
    },
  }
};