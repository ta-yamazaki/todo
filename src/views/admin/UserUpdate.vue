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

      <br>

      <v-btn
          @click="submit"
          :disabled="!valid || loading"
          :loading="loading"
          color="primary"
          type= "submit"
      >
        更新
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import firebase from "@/firebase/firebase";
import {doc, getDoc, updateDoc} from "firebase/firestore/lite";

export default {
  name: 'UserUpdate',
  components: {
  },
  data () {
    return {
      title: 'ユーザー情報更新',
      valid: true,
      currentName: "",
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
      db: null,
      loading: false,
    }
  },
  created() {
    this.db = firebase.db;
    this.role = this.$store.getters.userRole;
    this.getUser();
  },
  methods: {
    async syncContent() {
    },
    uid() {
      return this.$route.params.uid;
    },
    async getUser() {
      let docId = this.uid();
      const user = await getDoc(doc(this.db, "users", docId));
      if (!user.exists()) return;

      let userData = user.data();
      this.name = userData.name;
      this.currentName = this.name;
      this.gender = userData.gender;
      this.belongs = userData.belongs;
    },
    submit() {
      const valid = this.$refs.form.validate();
      if (!valid) return;
      this.updateUser();
    },
    isNameChanged() {
      return this.name !== this.currentName;
    },
    async updateUser() {
      this.loading = true;
      let docId = this.uid();

      try {
        await updateDoc(doc(this.db, "users", docId), {
          name: this.name,
          gender: this.gender,
          belongs: this.belongs,
          role: this.role
        });
        if (this.isNameChanged())
          await firebase.updateDisplayName(this.name);
        alert("更新しました。");
      } catch (e) {
        alert("失敗しました。");
      }

      await this.getUser();
      this.loading = false;
    },
  },
  computed: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
