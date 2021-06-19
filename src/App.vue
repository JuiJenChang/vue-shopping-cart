<template>
  <div class="h-screen" v-loading="isLoading">
    <nav
      class="bg-gray-800 w-full h-20 px-24 flex justify-between items-center text-xl sticky top-0 z-50"
    >
      <ul class="w-2/5 flex justify-between items-center">
        <li
          class="text-white hover:bg-gray-400 hover:bg-opacity-25 rounded-lg cursor-pointer flex items-center px-5 h-10"
          v-for="(item, index) in navList"
          :key="index"
          @click="item.click"
        >
          {{ item.label }}
        </li>
      </ul>
      <div class="text-white w-40 h-full flex justify-between items-center">
        <router-link
          to="/cart"
          class="hover:bg-gray-400 hover:bg-opacity-25 rounded-full cursor-pointer flex items-center justify-center h-10 w-10"
        >
          <i class="el-icon-shopping-cart-1"></i>
        </router-link>
        <div
          v-if="loginStatus"
          @click="logout"
          class="hover:bg-gray-400 hover:bg-opacity-25 rounded-lg cursor-pointer flex items-center px-5 h-10"
        >
          Logout
        </div>
        <div
          v-else
          @click="router.push('/login')"
          class="hover:bg-gray-400 hover:bg-opacity-25 rounded-lg cursor-pointer flex items-center px-5 h-10"
        >
          Login
        </div>
      </div>
    </nav>
    <main class="h-full">
      <router-view />
    </main>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import firebase from "firebase";
import { ElMessage } from "element-plus";
import { computed, onBeforeMount } from "vue";
import { useStore } from "vuex";

export default {
  name: "App",
  setup() {
    const store = useStore();
    const router = useRouter();
    const loginStatus = computed(() => {
      return store.state.loginStatus;
    });
    const isLoading = computed(() => {
      return store.state.isLoading;
    });
    const navList = [
      {
        label: "Home",
        click: () => {
          router.push("/");
        },
      },
      {
        label: "Products",
        click: () => {
          router.push("/products");
        },
      },
      {
        label: "Member",
        click: () => {
          router.push("/member");
        },
      },
    ];
    const logout = () => {
      store.commit("setIsLoading", true);
      firebase
        .auth()
        .signOut()
        .then(() => {
          localStorage.clear();
          store.commit("setLoginStatus", false);
          if (router.currentRoute.value.path === "/member" || router.currentRoute.value.path === "/member/updatepassword") {
            router.push("/login");
          }
          store.commit("setIsLoading", false);
          ElMessage.success({
            message: "Sign out successfully",
            type: "success",
          });
        })
        .catch((err) => {
          store.commit("setIsLoading", false);
          ElMessage.error(`${err.message}`);
        });
    };
    onBeforeMount(() => {
      const user = localStorage.getItem("userInfo");
      if (user) {
        store.commit("setLoginStatus", true);
      }
    });
    return {
      navList,
      router,
      logout,
      loginStatus,
      isLoading,
    };
  },
};
</script>

<style>
.el-loading-spinner {
  display: flex;
  justify-content: center;
}
</style>
