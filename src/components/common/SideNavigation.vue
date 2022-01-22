<template>
  <v-list>
    <v-list-item href="/">
      <v-list-item-icon>
        <v-icon></v-icon>
      </v-list-item-icon>
    </v-list-item>
    <v-list-item v-for="menu in menus" :key="menu.title" :to="menu.path"
                 color="primary"
                 exact>
      <v-list-item-icon>
        <v-icon>{{ menu.icon }}</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>{{ menu.title }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

  </v-list>
</template>

<script>
export default {
  name: "SideNavigation",
  props: [],
  data: function () {
    return {
      menus: [
        { title: 'トップ', icon: 'mdi-home', path: '/' },
        { title: 'アーカイブ', icon: 'mdi-clock', path: '/archive' },
        { title: 'ユーザー情報', icon: 'mdi-account', path: '/user' },
      ],
    }
  },
  created() {
  },
  methods: {
  },
  computed: {
  },
}
</script>

<style scoped>

</style>