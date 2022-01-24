<template>
  <v-container class="pa-0">
    <header-bar v-bind:title="title"/>

    <v-list>
      <v-list-item-group>
        <v-list-item
            v-for="log in logs"
            :key="log.id"
        >
          <v-list-item-content>
            <v-list-item-title>
              {{ log.log }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>

  </v-container>
</template>

<script>
import Firebase from "@/firebase/firebase";
import {collection, getDocs, query, orderBy, limit} from "firebase/firestore/lite";
// import {where} from "firebase/firestore/lite";
import HeaderBar from "@/components/common/HeaderBar";

export default {
  name: "List",
  components: {
    HeaderBar,
  },
  data () {
    return {
      title: 'ログ',
      logs: {},
      db: null,
    }
  },
  created() {
    this.db = Firebase.db;
    this.syncContent();
  },
  methods: {
    async syncContent() {
      const q = query(
          collection(this.db, "logs"),
          // where("status", "==", "未"),
          orderBy("createdAt", "desc"),
          limit(10),
      );
      const logsSnap = await getDocs(q);
      logsSnap.forEach((log) => {
        let data = log.data();
        let assigned = data.assigned
        let logData = {
          id: log.id,
          createdAt: data.createdAt,
          type: data.type,
          user: data.user,
          log: data.log,
          assigned: assigned,
          status: data.status,
        }
        this.logs.push(logData)
      }, this.logs);
    },
    doLogout() {
      Firebase.logout();
    }
  }
}
</script>

<style scoped>

</style>