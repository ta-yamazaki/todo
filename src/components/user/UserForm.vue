<template>
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

      <v-radio-group v-model="role" v-if="isAdminPage" row>
        <v-radio label="一般ユーザー" value="user"></v-radio>
        <v-radio label="管理者" value="admin"></v-radio>
      </v-radio-group>

      <br>

      <v-btn
          @click="submit"
          :loading="loading"
          :disabled="!valid || loading"
          color="primary"
          type= "submit"
      >
        更新
      </v-btn>

    </v-form>
</template>

<script>
import firebase from '@/firebase/firebase.js'
import {doc, setDoc} from 'firebase/firestore/lite';

export default {
  name: 'UserForm',
  props: [ "isAdminPage", "initUser", "initName" ],
  data () {
    return {
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
      db: null,
      loading: false,
    }
  },
  created() {
    this.db = firebase.db;
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
      this.updateUser();
    },
    async updateUser() {
      this.loading = true;
      let docId = this.uid();

      try {
        await setDoc(doc(this.db, "users", docId), {
          name: this.name,
          gender: this.gender,
          belongs: this.belongs
        });
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
    // initName() {
    //   return this.initUser.name;
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
