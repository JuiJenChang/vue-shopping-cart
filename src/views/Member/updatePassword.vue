<template>
  <div class="py-5 min-h-full bg-gray-300 flex justify-center items-center">
    <div class="w-2/5 h-auto bg-white rounded-lg shadow-2xl">
      <h1
        class="w-full h-12 flex justify-center items-center font-bold text-gray-800 text-2xl"
      >
        UPDATE PASSWORD
      </h1>
      <el-form
        :model="state.updatePasswordForm"
        :rules="state.rules"
        ref="updatePasswordForm"
        class="flex flex-col items-center"
      >
        <el-form-item label="Old Password" prop="oldPassword">
          <el-input type="password" v-model="state.updatePasswordForm.oldPassword"></el-input>
        </el-form-item>
        <el-form-item label="New Password" prop="newPassword">
          <el-input type="password" v-model="state.updatePasswordForm.newPassword"></el-input>
        </el-form-item>
        <el-form-item label="Confirm New Password" prop="confirmNewPassword">
          <el-input type="password" v-model="state.updatePasswordForm.confirmNewPassword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            class="bg-gray-800 hover:bg-gray-300 hover:text-gray-800 text-white font-bold py-1 px-4 rounded focus:outline-none mr-3"
            @click="updatePasswordSubmit"
          >
            Confirm
          </el-button>
          <el-button
            class="bg-gray-800 hover:bg-gray-300 hover:text-gray-800 text-white font-bold py-1 px-4 rounded focus:outline-none ml-3"
            @click="router.push('/member')"
          >
            Cancel
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { onBeforeMount, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import firebase from "firebase";
import { updateUser } from "../../firestore";
import { useStore } from "vuex";

export default {
  name: "UpdatePassword",
  setup() {
    const store = useStore();
    const router = useRouter();
    const state = reactive({
      updatePasswordForm: {
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      },
      profileData: {
        email: "",
        username: "",
        password: "",
        phone: "",
        address: "",
        uid: "",
      },
      rules: {
        oldPassword: [
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
        newPassword: [
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
        confirmNewPassword: [
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
      },
    });
    const reAuth = (checkPassword) => {
      return new Promise((resolve, reject) => {
        const user = firebase.auth().currentUser;
        const password = checkPassword
        const credential = firebase.auth.EmailAuthProvider.credential(user.email, password);
        user.reauthenticateWithCredential(credential).then(() => {
          resolve(user)
        }).catch(err => {
          reject(err.message);
        });
      })
    }
    const updateProfile = async () => {
      await updateUser(state.profileData.uid, {
        ...state.profileData,
      });
    };
    const updatePasswordForm = ref(null);
    const updatePasswordSubmit = () => {
      updatePasswordForm.value.validate((valid) => {
        if (valid) {
          if (state.updatePasswordForm.newPassword !== state.updatePasswordForm.confirmNewPassword) {
            ElMessage.error("Password and confirmed password must be the same");
          } else {
            store.commit("setIsLoading", true);
            reAuth(state.updatePasswordForm.oldPassword)
              .then(user => {
                user.updatePassword(state.updatePasswordForm.newPassword)
                .then(() => {
                  state.profileData.password = state.updatePasswordForm.newPassword;
                  updateProfile();
                  firebase.auth().signOut().then(() => {
                    localStorage.clear();
                    store.commit("setLoginStatus", false);
                    if (router.currentRoute.value.path === "/member/updatepassword") {
                      router.push("/login");
                    }
                    store.commit("setIsLoading", false);
                    ElMessage.success({
                      message: "Password update is successful, please log in again",
                      type: "success",
                    });
                  });
                })
                .catch(err => {
                  store.commit("setIsLoading", false);
                  ElMessage.error(`${err.message}`);
                });
              })
              .catch(err => {
                store.commit("setIsLoading", false);
                ElMessage.error(`${err.message}`);
              });
          }
        } else {
          console.log("error");
        }
      });
    };
    onBeforeMount(() => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"))._value[0];
      state.profileData.email = userInfo.email;
      state.profileData.username = userInfo.username;
      state.profileData.password = userInfo.password;
      state.profileData.phone = userInfo.phone;
      state.profileData.address = userInfo.address;
      state.profileData.uid = userInfo.uid;
    });
    return {
      state,
      router,
      updatePasswordForm,
      updatePasswordSubmit,
    };
  },
};
</script>

<style>
.el-input {
  width: 300px;
}
</style>
