<template>
  <v-container>
    <v-app-bar app elevation="1" color="primary" dark>
      <v-btn
          class="ma-n3"
          color="white"
          @click="returnList()"
          text
          fab >
        <v-icon
        >
          mdi-arrow-left-bold
        </v-icon>
      </v-btn>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-app-bar>
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

      <v-radio-group v-model="status" row
                     :rules="[v => !!v || '選択してください。']">
        <v-radio label="未" value="未"></v-radio>
        <v-radio label="完" value="完"></v-radio>
      </v-radio-group>

      <br>

      <v-btn
          @click="submit"
          :loading="loading"
          :disabled="!valid || loading"
          color="primary"
          type= "button"
      >
        更新
      </v-btn>

    </v-form>
  </v-container>
</template>

<script>
import {updateDoc, doc, getDoc} from "firebase/firestore/lite";
import firebase from "@/firebase/firebase";

export default {
  name: "Detail",
  data () {
    return {
      title: '更新',
      valid: true,
      id: null,
      name: "",
      assigned: null,
      status: null,
      db: null,
      loading: false,
    }
  },
  created() {
    this.db = firebase.db;
    this.getUser();
  },
  methods: {
    async syncContent() {
    },
    submit() {
      const valid = this.$refs.form.validate();
      if (!valid) return;
      this.updateUser();
    },
    async getUser() {
      this.id = this.$route.params.id;
      const todo = await getDoc(doc(this.db, "todos", this.id));
      if (!todo.exists()) {
        await this.$router.push({name: "List"})
        return;
      }

      let todoData = todo.data();
      this.name = todoData.name;
      this.assigned = todoData.assigned;
      this.status = todoData.status;
    },
    updateUser() {
      this.loading = true;

      updateDoc(doc(this.db, "todos", this.id), {
        name: this.name,
        assigned: this.assigned,
        status: this.status,
      }).then(() => {
        alert("更新しました。");
        this.$router.back();
      }).catch((e) => {
        console.log(e);
        alert("失敗しました。");
      });

      this.loading = false;
    },
    returnList() {
      this.$router.back();
      // this.$router.push({ name: "List" });
    }
  },
}
</script>

<style scoped>

</style>