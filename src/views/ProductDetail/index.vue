<template>
  <div class="pl-32 pr-40 pt-12 pb-5 h-full bg-gray-300 flex justify-between">
    <div class="w-3/6 h-full">
      <img class="w-full h-4/5" :src="state.product.img" />
    </div>
    <div>
      <div class="flex flex-col justify-between">
        <h3 class="text-2xl">{{ state.product.name }}</h3>
        <span class="text-xl">$ {{ state.product.price }}</span>
      </div>
      <div class="mt-2">
        <h4 class="text-xl mb-2">SIZE(CM)</h4>
        <div class="h-64 grid grid-cols-4 gap-4">
          <button
            v-for="item in state.sizeList"
            :key="item"
            class="bg-gray-100 hover:bg-white text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:bg-gray-800 focus:text-white"
            @click="pickSize(item)"
          >
            {{ item }}
          </button>
        </div>
      </div>
      <div class="pt-4 mt-8 border-t-2 border-gray-800">
        <button
          class="bg-gray-100 hover:bg-white text-gray-800 font-bold py-2 px-4 rounded focus:outline-none"
          @click="addToCart"
        >
          ADD TO CART
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { onBeforeMount, reactive } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";

export default {
  name: "ProductDetail",
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const state = reactive({
      product: {},
      size: "",
      sizeList: [
        "24",
        "24.5",
        "25",
        "25.5",
        "26",
        "26.5",
        "27",
        "27.5",
        "28",
        "28.5",
        "29",
        "29.5",
      ],
    });
    const pickSize = (item) => {
      state.size = item;
    };
    const addToCart = () => {
      if (state.size === "") {
        ElMessage.error("Please select the size of the shoes first");
      } else {
        const timestamp = Math.floor(Date.now());
        state.product.size = state.size;
        state.product.id = timestamp;
        state.product.price = parseInt(state.product.price);
        store.commit("Cart/addProductsData", state.product);
        router.push("/cart");
      }
      state.size = "";
    };
    onBeforeMount(() => {
      state.product = { ...route.query };
    });
    return {
      state,
      pickSize,
      addToCart,
    };
  },
};
</script>

<style scoped></style>
