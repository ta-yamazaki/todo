<template>
  <div>
    <v-main>
      <router-view />
    </v-main>
    <footer-bar />
  </div>
</template>

<script>
import FooterBar from "@/components/common/FooterBar";

export default {
  name: 'Main',
  components: {
    FooterBar,
  },
  data: function () {
    return {
    }
  },
  created() {
  }
};
</script>
