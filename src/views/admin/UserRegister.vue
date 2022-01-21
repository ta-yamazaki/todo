<template>
  <div>
    <h5 class="text-h5">{{ title }}</h5>
    <br>
    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
    >
      <v-text-field
          v-model="name"
          :counter="30"
          :rules="nameRules"
          label="名前（ニックネーム）"
          required
      ></v-text-field>

      <v-select
          v-model="gender"
          :items="genderList"
          :rules="[v => !!v || '選択してください。']"
          label="性別"
          required
      ></v-select>

      <v-select
          v-model="belongs"
          :items="belongsList"
          :rules="[v => !!v || '選択してください。']"
          label="所属"
          required
      ></v-select>

      <v-radio-group v-model="role" row
                     :rules="[v => !!v || '選択してください。']">
        <v-radio label="一般ユーザー" value="user"></v-radio>
        <v-radio label="管理者" value="admin"></v-radio>
      </v-radio-group>

      <v-text-field v-model="email"
                    label="メールアドレス"
                    type="email"
                    :rules="[ v => !!v, v => v && /.+@.+\..+/.test(v) || 'メールアドレスの形式が正しくありません' ]"
      ></v-text-field>

      <v-text-field v-model="password"
                    label="パスワード"
                    type="text"
                    :rules="[ v => !!v ]"
      ></v-text-field>

      <br>

      <v-btn
          @click="submit"
          :loading="loading"
          :disabled="!valid || loading"
          color="primary"
          type= "submit"
      >
        登録
      </v-btn>

    </v-form>
  </div>
</template>

<script>
import {doc, setDoc} from "firebase/firestore/lite";
import firebase from "@/firebase/firebase";

export default {
  name: 'UserRegister',
  components: {
  },
  data () {
    return {
      title: '新規ユーザー登録',
      valid: true,
      name: "",
      nameRules: [
        v => !!v || '必須入力です。',
        v => (v && v.length <= 30) || '30文字以内で入力してください。',
      ],
      gender: null,
      genderList: [ '男性', '女性' ],
      belongs: null,
      belongsList: [ 'SS', 'キャンパス', '青年部', '家庭局', '壮年部' ],
      role: null,
      email: null,
      password: null,
      db: null,
      loading: false,
      currentCredential: null
    }
  },
  created() {
    this.db = firebase.db;
    this.currentCredential = this.$store.state.authCredential;
  },
  methods: {
    async syncContent() {
    },
    uid() {
      return this.$store.state.user.uid;
    },
    submit() {
      const valid = this.$refs.form.validate();
      if (!valid) return;
      this.registerUser();
    },
    async registerUser() {
      this.loading = true;

      let currentEmail = this.currentCredential._email;
      let currentPassword = this.currentCredential._password;

      try {
        let uid = await firebase.createUser(this.email, this.password, this.name);
        await setDoc(doc(this.db, "users", uid), {
          name: this.name,
          gender: this.gender,
          belongs: this.belongs,
          role: this.role
        });
        await firebase.login(currentEmail, currentPassword);
        alert("登録しました。");
        await this.$router.push({ name: "AdminUserList" })
      } catch (e) {
        let emailAlreadyUsed = e.message.toString() === "Firebase: Error (auth/email-already-in-use).";
        if (emailAlreadyUsed) alert("このメールアドレスはすでに使われています。");
        else alert("失敗しました。");
        console.log(e)
      }

      this.loading = false;
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
