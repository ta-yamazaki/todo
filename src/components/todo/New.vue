<template>
  <div>
  <v-app-bar elevation="0" color="primary lighten-1" dark>
    <v-toolbar-title href="/">{{ title }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn
        icon dark
        @click="dialogClose()"
    >
      <v-icon>mdi-close</v-icon>
    </v-btn>
  </v-app-bar>

  <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        style="background-color: white"
    >
    <v-container>
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

  </v-container>

    </v-form>
  </div>
</template>

<script>
import {addDoc, collection} from "firebase/firestore/lite";
import db from "@/firebase/firestore";

export default {
  name: "New",
  components: {},
  props: ["dialog"],
  data () {
    return {
      title: '新規追加',
      valid: false,
      name: "",
      assigned: null,
      db: null,
      loading: false,
    }
  },
  created() {
    this.db = db;
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

      let newTodo = {
        name: this.name,
        assigned: this.assigned,
        status: "未",
      };

      addDoc(collection(this.db, "todos"), newTodo).then((doc) => {
        newTodo.id = doc.id;
        this.$emit("registerToList", newTodo);
        this.clearForm();
      }).catch((e) => {
        console.log(e);
        alert("失敗しました。");
      }).finally(() => {
        this.$refs.form.reset();
        this.loading = false;
      });

    },
    back() {
      this.$router.back();
      // this.$router.push({ name: "List" });
    },
    todoToString() {
      return "[担当] " + this.assigned + ",　[やること] " + this.name;
    },
    dialogClose() {
      this.$emit("dialogClose");
    },
    clearForm() {
      this.name = "";
      this.assigned = null;
    }
  },
}
</script>

<style scoped>

</style>