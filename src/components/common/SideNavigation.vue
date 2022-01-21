<template>
  <v-list>
    <v-list-item href="/">
      <v-list-item-icon>
        <v-icon>Pier Broadcast</v-icon>
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

    <v-list-group
        v-if="isAdmin()"
        :value="true"
        prepend-icon="mdi-cog-outline"
        no-action
        :ripple="false"
        color="darkgray"
    >
      <template v-slot:activator>
        <v-list-item-content>
          <v-list-item-title>管理者機能</v-list-item-title>
        </v-list-item-content>
      </template>

      <v-list-item dense v-for="menu in adminMenus" :key="menu.title" :to="menu.path"
                   color="primary"
                   exact>
        <v-list-item-content>
          <v-list-item-title>{{ menu.title }}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-icon>
          <v-icon>{{ menu.icon }}</v-icon>
        </v-list-item-icon>
      </v-list-item>
    </v-list-group>


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
      adminMenus: [
        { title: 'ユーザー一覧', icon: 'mdi-account-multiple-outline', path: '/admin/user' },
        { title: 'ユーザー登録', icon: 'mdi-account-plus-outline', path: '/admin/user/register' },
        { title: 'ログ', icon: 'mdi-message-text-outline', path: '/admin/log' }
      ],
    }
  },
  created() {
  },
  methods: {
    displayable(onlyAdmin) {
      if (onlyAdmin && !this.isAdmin()) return false;
      return true;
    },
    menusFiltered() {
      return this.menus.filter(e => {
        return this.displayable(e.onlyAdmin);
      });
    },
    isAdmin() {
      return this.$store.getters.isAdmin;
    }
  },
  computed: {
  },
}
</script>

<style scoped>

</style>