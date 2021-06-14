<template>
  <div class="min-h-full bg-gray-300 flex justify-center items-center">
    <div
      class="min-w-1/3 h-80 bg-white rounded-lg shadow-2xl flex flex-col justify-evenly relative"
    >
      <i
        @click="router.push('/member/edit')"
        class="el-icon-edit-outline absolute top-5 right-5 text-xl hover:text-gray-400 cursor-pointer"
      ></i>
      <h1
        class="w-full flex justify-center items-center font-bold text-gray-800 text-2xl"
      >
        PROFILE
      </h1>
      <div class="flex h-3/5 px-10 flex-col justify-between">
        <div class="flex items-center">
          <span class="text-xl font-bold">USERNAME :</span>
          <span class="ml-6">{{ state.userInfo.username }}</span>
        </div>
        <div class="flex items-center">
          <span class="text-xl font-bold">PHONE :</span>
          <span class="ml-6">{{ state.userInfo.phone }}</span>
        </div>
        <div class="flex items-center">
          <span class="text-xl font-bold">ADDRESS :</span>
          <span class="ml-6">{{ state.userInfo.address }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "Member",
  setup() {
    const router = useRouter();
    const state = reactive({
      userInfo: JSON.parse(localStorage.getItem("userInfo"))._value[0],
    });
    return {
      state,
      router,
    };
  },
};
</script>

<style scoped></style>
