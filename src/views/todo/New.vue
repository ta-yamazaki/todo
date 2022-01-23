<template>
  <v-container>
    <header-bar v-bind:title="title"/>

    <br>
    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
    >
      <v-text-field
          v-model="name"
          :counter="30"
          :rules="[v => !!v || '必須入力です。']"
          label="やること"
          required
      ></v-text-field>

      <v-radio-group v-model="assigned" row
                     :rules="[v => !!v || '選択してください。']">
        <v-radio label="ざ" value="ざ"></v-radio>
        <v-radio label="さ" value="さ"></v-radio>
        <v-radio label="未定" value="未定"></v-radio>
      </v-radio-group>

      <br>

      <v-btn
          @click="submit"
          :loading="loading"
          :disabled="!valid || loading"
          color="primary"
          type= "button"
      >
        登録
      </v-btn>
      <v-btn
          @click="back"
          class="ml-3"
          elevation="0"
          type= "button"
      >
        戻る
      </v-btn>

    </v-form>
    </v-container>
</template>

<script>
import {addDoc, collection} from "firebase/firestore/lite";
import firebase from "@/firebase/firebase";
import HeaderBar from "@/components/common/HeaderBar";

export default {
  name: "New",
  components: {
    HeaderBar,
  },
  data () {
    return {
      title: '新規',
      valid: false,
      name: "",
      assigned: null,
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
    submit() {
      const valid = this.$refs.form.validate();
      if (!valid) return;
      this.registerUser();
    },
    registerUser() {
      this.loading = true;

      addDoc(collection(this.db, "todos"), {
        name: this.name,
        assigned: this.assigned,
        status: "未",
      }).then(() => {
        alert("登録しました。");
        this.$router.back();
      }).catch((e) => {
        console.log(e);
        alert("失敗しました。");
      });

      this.loading = false;
    },
    back() {
      this.$router.back();
      // this.$router.push({ name: "List" });
    }
  },
}
</script>

<style scoped>

</style>