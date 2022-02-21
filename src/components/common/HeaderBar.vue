<template>
  <header>
    <v-app-bar app elevation="1" color="primary" dark dense>
      <v-toolbar-title href="/">{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text @click="doLogout">
          ログアウト
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
  </header>
</template>

<script>
import {logout} from "@/firebase/auth";

export default {
  name: "Header",
  props: ["title"],
  components: {
  },
  created() {
  },
  methods: {
    doLogout() {
      logout();
    }
  },
  computed: {
  }
}
</script>

<style scoped>

</style>