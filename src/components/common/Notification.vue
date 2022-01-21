<template>
  <v-container fluid>
    <v-banner two-line elevation="2">
      <v-avatar slot="icon">
        <v-icon color="red accent-1">
          mdi-bell
        </v-icon>
      </v-avatar>
      {{ notification }}
    </v-banner>
  </v-container>
</template>

<script>
export default {
  name: "Notification",
  props: [],
  data: function () {
    return {
      notification: ''
    }
  },
  created () {
    this.notification = 'ざーからのお知らせ'
  }
}
</script>

<style scoped>

</style>