<template>
  <div class="h-full bg-gray-300 flex justify-center items-center">
    <div class="w-2/5 h-80 bg-white rounded-lg shadow-2xl">
      <h1
        class="w-full h-12 flex justify-center items-center font-bold text-gray-800 text-2xl"
      >
        LOGIN
      </h1>
      <el-form
        :model="state.loginForm"
        :rules="state.rules"
        ref="loginForm"
        class="flex flex-col items-center"
      >
        <el-form-item label="E-mail" prop="email">
          <el-input v-model="state.loginForm.email"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input
            type="password"
            v-model="state.loginForm.password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            class="bg-gray-800 hover:bg-gray-300 hover:text-gray-800 text-white font-bold py-1 px-4 rounded focus:outline-none ml-3"
            @click="login"
          >
            Login
          </el-button>
          <el-button
            class="bg-gray-800 hover:bg-gray-300 hover:text-gray-800 text-white font-bold py-1 px-4 rounded focus:outline-none ml-3"
            @click="router.push('/register')"
          >
            Register
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import firebase from "firebase";
import { ElMessage } from "element-plus";
import { loadUser } from "../firestore";
import { useStore } from "vuex";

export default {
  name: "Login",
  setup() {
    const store = useStore();
    const router = useRouter();
    const state = reactive({
      loginForm: {
        email: "",
        password: "",
      },
      rules: {
        email: [
          {
            required: true,
            message: "please enter your account",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "please enter your password",
            trigger: "blur",
          },
        ],
      },
    });
    const loginForm = ref(null);
    const login = () => {
      loginForm.value.validate((valid) => {
        if (valid) {
          store.commit("setIsLoading", true);
          firebase
            .auth()
            .signInWithEmailAndPassword(
              state.loginForm.email,
              state.loginForm.password
            )
            .then(() => {
              loadUser();
              store.commit("setLoginStatus", true);
              router.push("/");
              store.commit("setIsLoading", false);
              ElMessage.success({
                message: "Sign in suceesfully",
                type: "success",
              });
            })
            .catch((err) => {
              store.commit("setIsLoading", false);
              ElMessage.error(`${err.message}`);
            });
        } else {
          console.log("error");
        }
      });
    };
    return {
      state,
      router,
      loginForm,
      login,
    };
  },
};
</script>

<style scoped>
.el-input {
  width: 300px;
}
</style>
