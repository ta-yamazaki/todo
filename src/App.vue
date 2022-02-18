<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
import {onAuth} from "@/firebase/firebase";

export default {
  name: 'App',
  components: {
  },
  data: function () {
    return {
    }
  },
  created() {
    onAuth();
  }
};
</script>

<style scoped>
</style>
