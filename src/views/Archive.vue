<template>
  <div class="hello">
    <h5 class="text-h5">{{ title }}</h5>
    <v-simple-table>
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left"></th>
          <th class="text-left"></th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="item in archives"
            :key="item.title"
        >
          <td>{{ item.title }}</td>
          <td>{{ item.link }}</td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import firestore from '@/firebase/firebase.js'
import { collection, getDocs } from 'firebase/firestore/lite'

export default {
  name: 'Archive',
  data () {
    return {
      title: 'アーカイブ',
      archives: [],
      db: null
    }
  },
  created() {
    this.db = firestore.db;
    this.syncContent();
  },
  methods: {
    async syncContent() {
      const archivesSnap = await getDocs(collection(this.db, "archives"));
      archivesSnap.forEach((archive) => {
        let data = archive.data();
        let archiveData = {
          title: data.title,
          link: data.link
        }
        this.archives.push(archiveData)
      }, this.archives);
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
