<template>
  <div>
    <h5 class="text-h5">{{ title }}</h5>
    <router-link :to="{ name: 'AdminUserList'}">ユーザー一覧</router-link>
    <router-link :to="{ name: 'AdminLog'}">ログ</router-link>
  </div>
</template>

<script>
export default {
  name: "Admin",
  components: {
  },
  data () {
    return {
      title: '管理者ページ',
      msg: '管理者用の機能を表示する',
      db: null,
      unsubscribe: null,
    }
  },
  created() {
  },
}
</script>

<style scoped>

</style>