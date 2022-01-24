<template>
  <v-container class="pa-0">
    <header-bar v-bind:title="title"/>

    <v-list>

<!--      <template v-slot:activator>-->
<!--        <v-list-item-title>ざ</v-list-item-title>-->
<!--      </template>-->
      <v-subheader style="background-color: #f3faff">ざ</v-subheader>
      <v-list-item-group>
        <v-list-item
            v-for="todo in todos.ざ"
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
            v-for="todo in todos.さ"
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
            v-for="todo in todos.未定"
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

    <v-footer fixed color="transparent" class="pr-5 pb-16 mb-3">
      <v-spacer></v-spacer>
      <v-btn
          :to="{ name: 'New' }"
          color="primary"
          fab
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-footer>
  </v-container>
</template>

<script>
import firebase from "@/firebase/firebase";
import {collection, deleteDoc, doc, getDocs, updateDoc, query, where} from "firebase/firestore/lite";
import Firebase from "@/firebase/firebase";
import HeaderBar from "@/components/common/HeaderBar";

export default {
  name: "List",
  components: {
    HeaderBar,
  },
  data () {
    return {
      title: 'TODO',
      todos: {
        ざ: [],
        さ: [],
        未定: [],
      },
      db: null,
    }
  },
  created() {
    this.db = firebase.db;
    this.syncContent();
  },
  methods: {
    async syncContent() {
      const q = query(collection(this.db, "todos"), where("status", "==", "未"));
      const todosSnap = await getDocs(q);
      todosSnap.forEach((todo) => {
        let data = todo.data();
        let assigned = data.assigned
        let todoData = {
          id: todo.id,
          name: data.name,
          assigned: assigned,
          status: data.status,
        }
        this.todos[assigned].push(todoData)
      }, this.todos);
    },
    doLogout() {
      Firebase.logout();
    }
  }
}
</script>

<style scoped>

</style>