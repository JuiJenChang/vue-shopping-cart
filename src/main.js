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
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();

createApp(App).use(store).use(router).use(ElementPlus).mount("#app");
