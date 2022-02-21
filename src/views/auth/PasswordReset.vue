<template>

  <v-container fluid style="height: 100vh;">
    <v-row class="text-center mt-16">
      <v-col></v-col>
      <v-col cols="12" sm="4">
        <v-card :loading="loading" elevation="5">
          <v-card-title color="gray" class="text-no-wrap">
            パスワードリセット
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

              <br>

              <v-btn
                  :disabled="!valid || loading"
                  :loading="loading"
                  color="primary"
                  @click="reset"
                  type= "submit"
              >
                パスワードリセット
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
import {passwordReset} from '@/firebase/auth'

export default {
  name: "Login",
  data() {
    return {
      email: null,
      valid: true,
      loading: false,
    };
  },
  created: function() {

  },
  computed: {
  },
  methods: {
    reset() {
      const valid = this.$refs.form.validate();
      if (!valid) return;

      this.loading = true;

      passwordReset(this.email)
          .then(() => {
            alert("パスワードリセットのメールを送りました。")
          })
          .catch(() => {
            alert("パスワードリセットに失敗しました。")
          })
          .finally(() => {
            setTimeout(() => (this.loading = false), 500)
          });
    }
  }
}
</script>

<style scoped>
.container {
  /*background-image:*/
  /*    url("https://free-materials.com/adm/wp-content/uploads/2017/05/adpDSC_2512-750x499.jpg") !important;*/
  /*background-position: center center !important;*/
  /*background-size: cover !important;*/
  background-color: whitesmoke;
  /*background-blend-mode: lighten;*/
  /*overflow: hidden*/
}
</style>