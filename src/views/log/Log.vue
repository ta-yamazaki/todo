<template>
  <v-container class="pa-0">
    <header-bar v-bind:title="title"/>
    <span style="font-size: small">※直近10件</span>
    <v-simple-table dense>
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left">time</th>
          <th class="text-left">user</th>
          <th class="text-left">type</th>
          <th class="text-left"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="log in logs"
            :key="log.id">
          <td>{{ log.createdAt }}</td>
          <td>{{ log.user }}</td>
          <td>{{ log.type }}</td>
          <td>{{ log.log }}</td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>

  </v-container>
</template>

<script>
import {db, logout} from "@/firebase/firebase";
import {collection, getDocs, limit, orderBy, query} from "firebase/firestore/lite";
// import {where} from "firebase/firestore/lite";
import HeaderBar from "@/components/common/HeaderBar";
import dayjs from "dayjs"

export default {
  name: "List",
  components: {
    HeaderBar,
  },
  data () {
    return {
      title: 'ログ',
      logs: [],
      db: null,
    }
  },
  created() {
    this.db = db;
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
      logsSnap.forEach(async (log) => {
        let data = log.data();
        let logData = {
          id: log.id,
          createdAt: this.datetimeFormat(data.createdAt),
          type: data.type,
          user: data.user,
          log: data.log,
        }
        this.logs.push(logData)
      }, this.logs);
    },
    datetimeFormat(timestamp) {
      return dayjs.unix(timestamp.seconds).format("YYYY-MM-DD HH:mm:ss");
    },
    doLogout() {
      logout();
    }
  }
}
</script>

<style scoped>

</style>