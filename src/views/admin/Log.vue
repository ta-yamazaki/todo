<template>
  <div>
    <v-card-title>
      <h5 class="text-h5">{{ title }}</h5>
      <v-spacer></v-spacer>
      <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
      ></v-text-field>
    </v-card-title>

    <v-data-table
        :headers="headers"
        :items="logs"
        :search="search"
        sort-by="createdAt"
        no-data-text="データがありません。"
        no-results-text="検索結果がありません。"
        dense
        mobile="true"
        disable-sort
        fixed-header
        hide-default-footer
    >
    </v-data-table>
  </div>
</template>

<script>
import firebase from '@/firebase/firebase.js'
import {collection, getDocs, getDoc, query, orderBy} from 'firebase/firestore/lite'
import moment from "moment"

export default {
  name: 'Log',
  components: {
  },
  data () {
    return {
      title: 'ログ',
      search: '',
      headers: [
        { text: '日時', align: 'start', value: 'createdAt', width: "170px" },
        { text: 'ユーザー', value: 'userName', sortable: false },
        { text: '', value: 'log', sortable: false },
      ],
      logs: [],
      db: null,
    }
  },
  created() {
    this.db = firebase.db;
    this.syncContent();
  },
  methods: {
    async syncContent() {
      const logsSnap = await getDocs(query(collection(this.db, "logs"), orderBy("createdAt", "desc")));
      logsSnap.forEach(async (log) => {
        let data = log.data();

        let user = await getDoc(data.user);
        let logData = {
          createdAt: this.datetimeFormat(data.createdAt),
          userName: user.exists() ? user.get("name") : "",
          log: data.log,
        }
        this.logs.push(logData)
      }, this.logs);
    },
    datetimeFormat(timestamp) {
      return moment.unix(timestamp.seconds).format("YYYY-MM-DD HH:mm:ss");
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
