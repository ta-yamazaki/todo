<template>
  <div>
    <header-bar @drawer-clicked='drawer = !drawer'/>

    <v-navigation-drawer app v-model="drawer">
      <side-navigation />
    </v-navigation-drawer>

    <v-main>
      <notification />

      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </div>
</template>

<script>
import HeaderBar from "@/components/common/HeaderBar";
import SideNavigation from "@/components/common/SideNavigation";
import Notification from "@/components/common/Notification";

export default {
  name: 'Main',
  components: {
    HeaderBar,
    SideNavigation,
    Notification,
  },
  data: function () {
    return {
      drawer: null
    }
  },
  created() {
  }
};
</script>
