import { onUnmounted, ref } from "vue";
import { db } from "./main";

const usersCollection = db.collection("users");

export const createUser = (user) => {
  const users = db.collection("users").doc(`${user.uid}`).set(user);
  return users;
};

export const loadUser = () => {
  let user = ref([]);
  const close = usersCollection.onSnapshot((snapshot) => {
    user.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    localStorage.setItem("userInfo", JSON.stringify(user));
  });
  onUnmounted(close);
  return user;
};

export const updateUser = (id, user) => {
  return usersCollection.doc(id).update(user);
};
