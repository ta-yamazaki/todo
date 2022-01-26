<template>
  <v-container class="pa-0">
    <header-bar v-bind:title="title"/>

    <v-list>

      <v-subheader style="background-color: #f3faff">ざ</v-subheader>
      <v-list-item-group>
        <v-list-item
            v-for="todo in todos_ざ"
            :key="todo.id"
            :to="{ name: 'Detail', params: { id: todo.id } }"
        >
          <v-list-item-content>
            <v-list-item-title>
              {{ todo.name }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>

      <br>
      <v-subheader style="background-color: #fffaff">さ</v-subheader>
      <v-list-item-group>
        <v-list-item
            v-for="todo in todos_さ"
            :key="todo.id"
            :to="{ name: 'Detail', params: { id: todo.id } }"
        >
          <v-list-item-content>
            <v-list-item-title>
              {{ todo.name }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>

      <br>
      <v-subheader style="background-color: whitesmoke">未定</v-subheader>
      <v-list-item-group>
        <v-list-item
            v-for="todo in todos_未定"
            :key="todo.id"
            :to="{ name: 'Detail', params: { id: todo.id } }"
        >
          <v-list-item-content>
            <v-list-item-title>
              {{ todo.name }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <v-btn
        :to="{ name: 'New' }"
        fab
        color="primary"
        fixed bottom right
        class="mr-3 mb-16"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
import Firebase from "@/firebase/firebase";
import {collection, getDocs, query, where} from "firebase/firestore/lite";
import HeaderBar from "@/components/common/HeaderBar";

export default {
  name: "List",
  components: {
    HeaderBar,
  },
  data () {
    return {
      title: 'TODO',
      todos_ざ: [],
      todos_さ: [],
      todos_未定: [],
      db: null,
    }
  },
  created() {
    this.db = Firebase.db;
    this.syncContent();
  },
  methods: {
    async syncContent() {
      const q = query(collection(this.db, "todos"), where("status", "==", "未"));
      const todosSnap = await getDocs(q);
      todosSnap.forEach((todo) => {
        let data = todo.data();
        let todoData = {
          id: todo.id,
          name: data.name,
        }
        let assigned = data.assigned;
        if (assigned === "ざ") this.todos_ざ.push(todoData)
        if (assigned === "さ") this.todos_さ.push(todoData)
        if (assigned === "未定") this.todos_未定.push(todoData)
      });
    },
    doLogout() {
      Firebase.logout();
    }
  }
}
</script>

<style scoped>

</style>