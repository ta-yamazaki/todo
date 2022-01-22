<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
import Firebase from "@/firebase/firebase";

export default {
  name: 'App',
  components: {
  },
  data: function () {
    return {
    }
  },
  created() {
    Firebase.onAuth();
  }
};
</script>

<style scoped>
</style>
