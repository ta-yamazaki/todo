<template>
  <v-footer
      padless
      fixed
  >
    <v-btn
        large
        height="60"
        tile
        elevation="0"
        block
        @click="toTop()"
    >
<v-icon
    large>
  mdi-home
</v-icon>
    </v-btn>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
  methods: {
    toTop() {
      // this.$router.back();
      this.$router.push({ name: "List" });
    }
  },
}
</script>

<style scoped>

</style>