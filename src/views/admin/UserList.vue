<template>
  <div>
    <v-card-title>
      <h5 class="text-h5">{{ title }}</h5>
      <v-btn
          :to="{ name: 'AdminUserRegister' }"
          class="ml-3" small
          color="primary"
      >
        新規登録
      </v-btn>
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
        fixed-header
        :headers="headers"
        :items="users"
        no-data-text="データがありません。"
        no-results-text="検索結果がありません。"
        :search="search"
        sort-by="name"
        dense
        hide-default-footer
    >
      <template #item.name="{ item }">
        <router-link :to="{ name: 'AdminUserUpdate', params: { uid: item.id } }">
          {{ item.name }}
        </router-link>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
            color="red"
            small
            @click="deleteUserDialog(item)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">削除してよろしいですか？</v-card-title>
        <v-divider></v-divider>
        <v-card-title class="text-h6">{{userToBeDeleted.name}}</v-card-title>
        <v-card-text>
          {{userToBeDeleted.gender}} {{userToBeDeleted.belongs}} ({{userToBeDeleted.role}})<br><br>
          <v-form
              ref="form"
              v-model="valid"
              lazy-validation
          >
            <v-text-field v-model="deleteEmail"
                          label="削除するユーザーのメールアドレス"
                          type="email"
                          :rules="[ v => !!v, v => v && /.+@.+\..+/.test(v) || 'メールアドレスの形式が正しくありません' ]"
            ></v-text-field>
            <v-text-field v-model="deletePassword"
                          label="削除するユーザーのパスワード"
                          :rules="[ v => !!v ]"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="" text @click="closeDelete">Cancel</v-btn>
          <v-btn color="red darken-1" text @click="deleteUser">OK</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import firebase from '@/firebase/firebase.js'
import {collection, doc, getDocs, deleteDoc} from 'firebase/firestore/lite'

export default {
  name: 'UserList',
  components: {
  },
  data () {
    return {
      title: 'ユーザー一覧',
      search: '',
      headers: [
        { text: '名前（ニックネーム）', align: 'start', value: 'name' },
        { text: '性別', value: 'gender', filterable: false },
        { text: '所属', value: 'belongs', filterable: false },
        { text: '役割', value: 'role', filterable: false},
        { text: '', value: 'actions', sortable: false },
      ],
      users: [],
      userToBeDeleted: {
        name: "",
        gender: "",
        belongs: "",
        role: "",
      },
      role: null,
      db: null,
      dialogDelete: false,
      currentCredential: null,
      valid: true,
      errorMessage: "",
      deleteEmail: null,
      deletePassword: null
    }
  },
  created() {
    this.db = firebase.db;
    this.currentCredential = this.$store.state.authCredential;
    this.syncContent();
  },
  methods: {
    async syncContent() {
      const usersSnap = await getDocs(collection(this.db, "users"));
      usersSnap.forEach((user) => {
        let data = user.data();
        let userData = {
          id: user.id,
          name: data.name,
          gender: data.gender,
          belongs: data.belongs,
          role: data.role
        }
        this.users.push(userData)
      }, this.users);
    },
    deleteUserDialog(user) {
      this.editedIndex = this.users.indexOf(user);
      this.userToBeDeleted = user;
      this.dialogDelete = true;
    },
    async deleteUser() {
      //todo authのユーザーとfirestoreのユーザーを削除
      const valid = this.$refs.form.validate();
      if (!valid) return;

      let uid = this.userToBeDeleted.id;

      // let currentEmail = this.currentCredential._email;
      // let currentPassword = this.currentCredential._password;

      try {
        // await firebase.deleteAuthUser(this.deleteEmail, this.deletePassword);
        await deleteDoc(doc(this.db, "users", uid));
        // await firebase.login(currentEmail, currentPassword);
        alert("削除しました。");
      } catch (e) {
        alert("失敗しました。");
        console.log(e)
      }

      this.users.splice(this.editedIndex, 1);
      this.closeDelete();
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedIndex = -1;
      })
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
