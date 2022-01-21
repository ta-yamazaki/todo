<template>

  <v-container fluid style="height: 100vh;">
    <v-row class="text-center mt-16">
      <v-col></v-col>
      <v-col cols="12" sm="4">
        <v-card :loading="loading" elevation="5">
          <v-card-title color="gray" class="text-no-wrap">
            埠頭配信サイト
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="py-7">
            <v-form
                ref="form"
                v-model="valid"
                lazy-validation
            >
              <v-text-field v-model="email"
                            label="メールアドレス"
                            type="email"
                            :rules="[ v => !!v, v => v && /.+@.+\..+/.test(v) || 'メールアドレスの形式が正しくありません' ]"
              ></v-text-field>
              <v-text-field v-model="password"
                            label="パスワード"
                            type="password"
                            :rules="[ v => !!v ]"
              ></v-text-field>

              <p style="color: orangered">{{ errorMessage }}</p>
              <v-btn
                  :disabled="!valid || loading"
                  color="primary"
                  @click="doLogin"
                  :loading="loading"
                  type= "submit"
              >
                ログイン
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col></v-col>
    </v-row>
  </v-container>
</template>

<script>
import Firebase from '@/firebase/firebase.js'

export default {
  name: "Login",
  data() {
    return {
      email: null,
      password: null,
      valid: true,
      errorMessage: "",
      loading: false,
    };
  },
  created: function() {
    let isLogin = this.$store.getters.isSignedIn;
    if (isLogin) this.$router.push({ name: "Top" });
  },
  computed: {
  },
  methods: {
    doLogin() {
      const valid = this.$refs.form.validate();
      if (!valid) return;

      this.loading = true;

      Firebase.login(this.email, this.password)
          .then(() => {
            console.log("ログインしました。");
            let redirectPath = this.$route.query.redirect;
            if (typeof redirectPath === 'undefined') redirectPath = "/";
            this.$router.push(redirectPath);
          })
          .catch(() => {
            setTimeout(() => {
              this.loading = false;
              this.errorMessage = "メールアドレスとパスワードを確認してください";
              console.log("ログイン失敗しました。");
            }, 1000)
          })
      .finally(() => {
        setTimeout(() => (this.loading = false), 1000)
      });

    }
  }
}
</script>

<style scoped>
.container {
  background-image:
      url("https://free-materials.com/adm/wp-content/uploads/2017/05/adpDSC_2512-750x499.jpg") !important;
  background-position: center center !important;
  background-size: cover !important;
  background-color: darkgray;
  background-blend-mode: lighten;
  overflow: hidden
}
</style>