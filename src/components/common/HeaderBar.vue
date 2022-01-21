<template>
  <header>
    <v-app-bar app elevation="0" color="white">
      <v-app-bar-nav-icon @click="drawerClicked" />
      <!--        <v-toolbar-items class="pa-2">-->
      <!--          <img src="./assets/icon.png">-->
      <!--        </v-toolbar-items>-->
      <v-toolbar-title href="/">埠頭配信サイト</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn text @click="doLogout">
          ログアウト
        </v-btn>
      </v-toolbar-items>
      <v-icon>mdi-account</v-icon>
      <div class="px-0 text-no-wrap text-h7">
        {{ user.displayName }}
      </div>
      <div v-if="isAdmin" class="px-0 text-no-wrap text-h7">
        ({{ userRole }})
      </div>
    </v-app-bar>
  </header>
</template>

<script>
import Firebase from "@/firebase/firebase";

export default {
  name: "Header",
  components: {
  },
  created() {
  },
  methods: {
    drawerClicked() {
      this.$emit("drawer-clicked");
    },
    // ログアウト処理
    doLogout() {
      Firebase.logout();
    }
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    userStatus() {
      // ログインするとtrue
      return this.$store.getters.isSignedIn;
    },
    userRole() {
      return this.$store.getters.userRole;
    },
    isAdmin() {
      return this.$store.getters.isAdmin;
    }
  }
}
</script>

<style scoped>

</style>