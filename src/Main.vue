<template>
  <div>

    <!--    <v-navigation-drawer app v-model="drawer">-->
    <!--      <side-navigation />-->
    <!--    </v-navigation-drawer>-->

    <v-main>
      <!--      <notification />-->

      <router-view />
    </v-main>

    <footer-bar />
  </div>
</template>

<script>
// import HeaderBar from "@/components/common/HeaderBar";
// import SideNavigation from "@/components/common/SideNavigation";
// import Notification from "@/components/common/Notification";
import FooterBar from "@/components/common/FooterBar";

export default {
  name: 'Main',
  components: {
    // HeaderBar,
    // SideNavigation,
    // Notification,
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
