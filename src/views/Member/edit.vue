<template>
  <div class="py-5 min-h-full bg-gray-300 flex justify-center items-center">
    <div class="w-2/5 h-auto bg-white rounded-lg shadow-2xl">
      <h1
        class="w-full h-12 flex justify-center items-center font-bold text-gray-800 text-2xl"
      >
        EDIT PROFILE
      </h1>
      <el-form
        :model="state.editProfileForm"
        :rules="state.rules"
        ref="editProfileForm"
        class="flex flex-col items-center"
      >
        <el-form-item label="Username" prop="username">
          <el-input v-model="state.editProfileForm.username"></el-input>
        </el-form-item>
        <el-form-item label="Phone" prop="phone">
          <el-input v-model="state.editProfileForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="Address" prop="address">
          <el-input v-model="state.editProfileForm.address"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            class="bg-gray-800 hover:bg-gray-300 hover:text-gray-800 text-white font-bold py-1 px-4 rounded focus:outline-none mr-3"
            @click="editProfileSubmit"
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
import { updateUser } from "../../firestore";
import { useStore } from "vuex";

export default {
  name: "EditProfile",
  setup() {
    const store = useStore();
    const router = useRouter();
    const state = reactive({
      editProfileForm: {
        email: "",
        username: "",
        password: "",
        phone: "",
        address: "",
        uid: "",
      },
      rules: {
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
    const editProfileForm = ref(null);
    const editProfileSubmit = async () => {
      editProfileForm.value.validate(async (valid) => {
        if (valid) {
          store.commit("setIsLoading", true);
          let userInfo = JSON.parse(localStorage.getItem("userInfo"));
          userInfo._value[0] = state.editProfileForm;
          await updateUser(state.editProfileForm.uid, {
            ...state.editProfileForm,
          });
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
          router.push("/member");
          store.commit("setIsLoading", false);
          ElMessage.success({
            message: "update completed",
            type: "success",
          });
        } else {
          console.log("error");
        }
      });
    };
    onBeforeMount(() => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"))._value[0];
      state.editProfileForm.email = userInfo.email;
      state.editProfileForm.username = userInfo.username;
      state.editProfileForm.password = userInfo.password;
      state.editProfileForm.phone = userInfo.phone;
      state.editProfileForm.address = userInfo.address;
      state.editProfileForm.uid = userInfo.uid;
    });
    return {
      state,
      router,
      editProfileForm,
      editProfileSubmit,
    };
  },
};
</script>

<style>
.el-input {
  width: 300px;
}
</style>
