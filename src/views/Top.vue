<template>
  <div>
    <v-btn to="/archive"
           class="float-end"
           text
           color="primary"
    >
      アーカイブ
    </v-btn>
    <h5 class="text-h5">{{ title }}</h5>
    <p class="text-center">{{ msg }}</p>
  </div>
</template>

<script>
import realtime_db from '../firebase/firestore-realtime.js'
import {doc, onSnapshot} from 'firebase/firestore';

export default {
  name: 'Top',
  components: {

  },
  data () {
    return {
      title: '配信',
      msg: '',
      db: null,
      unsubscribe: null,
    }
  },
  created() {
    this.db = realtime_db;
    this.syncContent();
    // this.unsubscribe();
  },
  methods: {
    async syncContent() {

      const streamingDocRef = await doc(this.db, 'lives', 'streaming');
      this.unsubscribe = onSnapshot(streamingDocRef, (doc) => {
        let msg = doc.get('link');
        if (!this.isLiveStreaming(msg)) msg = "現在配信は行われていません。";
        this.msg = msg;
      });

      // unsubscribe();
    },
    isLiveStreaming(streamingLink) {
      return this.isExists(streamingLink);
    },
    isExists(value) {
      return typeof value !== 'undefined';
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
