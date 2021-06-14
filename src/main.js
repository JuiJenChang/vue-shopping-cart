import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "./style/tailwind.css";
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBKIIdOuaiWClax7dC1hDBlQi6e38McbuE",
  authDomain: "vue-shopping-cart-e54ab.firebaseapp.com",
  projectId: "vue-shopping-cart-e54ab",
  storageBucket: "vue-shopping-cart-e54ab.appspot.com",
  messagingSenderId: "98013505095",
  appId: "1:98013505095:web:43e55ffe66ec0de97f7362",
  measurementId: "G-B0TE5YEYKZ",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();

createApp(App).use(store).use(router).use(ElementPlus).mount("#app");
