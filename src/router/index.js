import Vue from 'vue'
import VueRouter from 'vue-router'
import {getAuth, onAuthStateChanged} from "firebase/auth";

import Login from '@/Login.vue'
import Main from "@/Main.vue";
import Top from "@/views/Top";

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/login', name: 'Login', component: Login },
    { path: '/', component: Main,
      children: [
        { path: '/', name: 'Top', component: Top, meta: { requiresAuth: true } },
        { path: '/archive', name: 'Archive', component: () => import('@/views/Archive'), meta: { requiresAuth: true } },
        { path: '/user', name: 'User', component: () => import('@/views/User'), meta: { requiresAuth: true } },
      ]
    },
  ]
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (!requiresAuth) { next(); return; }

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    if (user) { next(); return; }

    // User is signed out
    next({ name: 'Login', query: { redirect: to.fullPath } });
  });

});

export default router
