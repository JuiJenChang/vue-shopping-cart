<template>
  <div class="py-5 min-h-full bg-gray-300 flex justify-center items-center">
    <div class="w-2/5 h-auto bg-white rounded-lg shadow-2xl">
      <h1
        class="w-full h-12 flex justify-center items-center font-bold text-gray-800 text-2xl"
      >
        REGISTER
      </h1>
      <el-form
        :model="state.registerForm"
        :rules="state.rules"
        ref="registerForm"
        class="flex flex-col items-center"
      >
        <el-form-item label="E-mail" prop="email">
          <el-input v-model="state.registerForm.email"></el-input>
        </el-form-item>
        <el-form-item label="Username" prop="username">
          <el-input v-model="state.registerForm.username"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input
            type="password"
            v-model="state.registerForm.password"
          ></el-input>
        </el-form-item>
        <el-form-item label="Confirm password" prop="confirmPassword">
          <el-input
            type="password"
            v-model="state.registerForm.confirmPassword"
          ></el-input>
        </el-form-item>
        <el-form-item label="Phone" prop="phone">
          <el-input v-model="state.registerForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="Address" prop="address">
          <el-input v-model="state.registerForm.address"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            class="bg-gray-800 hover:bg-gray-300 hover:text-gray-800 text-white font-bold py-1 px-4 rounded focus:outline-none mr-3"
            @click="registerSubmit"
          >
            Confirm
          </el-button>
          <el-button
            class="bg-gray-800 hover:bg-gray-300 hover:text-gray-800 text-white font-bold py-1 px-4 rounded focus:outline-none ml-3"
            @click="router.push('/login')"
          >
            Cancel
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
import { createUser } from "../firestore";
import { useStore } from "vuex";

export default {
  name: "Register",
  setup() {
    const store = useStore();
    const router = useRouter();
    const state = reactive({
      registerForm: {
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        phone: "",
        address: "",
        uid: "",
      },
      rules: {
        email: [
          {
            required: true,
            message: "please enter your email",
            trigger: "blur",
          },
          {
            type: "email",
            message: "please enter the correct email address",
            trigger: ["blur", "change"],
          },
        ],
        password: [
          {
            required: true,
            message: "please enter your password",
            trigger: "blur",
          },
          {
            pattern: /^[a-zA-Z0-9]{6,20}$/,
            message: "please enter 6 to 20 English words and numbers",
          },
        ],
        confirmPassword: [
          {
            required: true,
            message: "please enter your password",
            trigger: "blur",
          },
          {
            pattern: /^[a-zA-Z0-9]{6,20}$/,
            message: "please enter 6 to 20 English words and numbers",
          },
        ],
        username: [
          {
            required: true,
            message: "please enter your account",
            trigger: "blur",
          },
        ],
        phone: [
          {
            required: true,
            message: "please enter your phone",
            trigger: "blur",
          },
          { pattern: /^09\d{8}$/, message: "the phone format is wrong" },
        ],
        address: [
          {
            required: true,
            message: "please enter your account",
            trigger: "blur",
          },
          {
            max: 75,
            message: "the characters entered have exceeded",
            trigger: "blur",
          },
        ],
      },
    });
    const createdUid = () => {
      let d = Date.now();
      if (
        typeof performance !== "undefined" &&
        typeof performance.now === "function"
      ) {
        d += performance.now();
      }
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          let r = (d + Math.random() * 16) % 16 | 0;
          d = Math.floor(d / 16);
          return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
        }
      );
    };
    const registerUser = async (user) => {
      await createUser({ ...user });
    };
    const registerForm = ref(null);
    const registerSubmit = () => {
      registerForm.value.validate((valid) => {
        if (valid) {
          if (
            state.registerForm.password !== state.registerForm.confirmPassword
          ) {
            ElMessage.error("Password and confirmed password must be the same");
          } else {
            store.commit("setIsLoading", true);
            firebase
              .auth()
              .createUserWithEmailAndPassword(
                state.registerForm.email,
                state.registerForm.password
              )
              .then(() => {
                state.registerForm.uid = createdUid();
                delete state.registerForm.confirmPassword
                registerUser(state.registerForm);
                router.push("/login");
                store.commit("setIsLoading", false);
                ElMessage.success({
                  message: "Registration success",
                  type: "success",
                });
              })
              .catch((err) => {
                store.commit("setIsLoading", false);
                ElMessage.error(`${err.message}`);
              });
          }
        } else {
          console.log("error");
        }
      });
    };
    return {
      state,
      router,
      registerForm,
      registerSubmit,
    };
  },
};
</script>

<style>
.el-input {
  width: 300px;
}
</style>
