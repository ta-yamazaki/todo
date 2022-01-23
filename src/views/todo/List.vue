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

    <v-dialog v-model="dialogDone" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">このTODOのステータスを完了にします。</v-card-title>
        <v-divider></v-divider>
        <v-card-title class="text-h6">{{todoToBeDone.name}}</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="" text @click="closeDelete">キャンセル</v-btn>
          <v-btn color="primary" text @click="todoDone">OK</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">削除してよろしいですか？</v-card-title>
        <v-divider></v-divider>
        <v-card-title class="text-h6">{{todoToBeDeleted.name}}</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="" text @click="closeDelete">キャンセル</v-btn>
          <v-btn color="red darken-1" text @click="deleteTodo">OK</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
      search: '',
      todos: {
        ざ: [],
        さ: [],
        未定: [],
      },
      selectedTodo: null,
      dialogDone: false,
      todoToBeDone: {
        name: "",
      },
      dialogDelete: false,
      todoToBeDeleted: {
        name: "",
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
    showDoneDialog(todo) {
      this.editedIndex = this.todos.indexOf(todo);
      this.todoToBeDone = todo;
      this.dialogDone = true;
    },
    todoDone() {
      let id = this.todoToBeDone.id;
      updateDoc(doc(this.db, "todos", id), {
        status: "完",
      }).then(() => {
        alert("更新しました。");
      }).catch((e) => {
        alert("失敗しました。");
        console.log(e);
      });

      this.todos.splice(this.editedIndex, 1);
      this.closeDone();
    },
    showDeleteDialog(todo) {
      this.editedIndex = this.todos.indexOf(todo);
      this.todoToBeDeleted = todo;
      this.dialogDelete = true;
    },
    deleteTodo() {
      let id = this.todoToBeDeleted.id;
      deleteDoc(doc(this.db, "todos", id))
          .then(() => {
            alert("削除しました。");
          })
          .catch((e) => {
            alert("失敗しました。");
            console.log(e);
          });

      this.todos.splice(this.editedIndex, 1);
      this.closeDelete();
    },
    closeDone() {
      this.dialogDone = false;
      this.$nextTick(() => {
        this.editedIndex = -1;
      })
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedIndex = -1;
      })
    },
    doLogout() {
      Firebase.logout();
    }
  }
}
</script>

<style scoped>

</style>