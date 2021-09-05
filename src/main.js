import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./assets/tailwind.css"
import firebaseApp from "./firebaseinit";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth(firebaseApp)

onAuthStateChanged(auth, user => {
  store.dispatch("fetchUser", user)
})

createApp(App).use(store).use(router).mount('#app')
