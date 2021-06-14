<template>
  <div class="p-5 h-auto flex flex-wrap bg-gray-300">
    <div
      v-for="item in productList"
      :key="item.id"
      class="bg-gray-100 h-96 w-col-3 m-10px rounded-lg shadow-xl"
    >
      <div class="w-full h-3/5 rounded-t-lg">
        <img class="w-full h-full rounded-t-lg" :src="item.img" />
      </div>
      <div
        class="bg-gray-800 w-full h-2/5 rounded-b-lg px-5 pt-2 pb-3 flex flex-col justify-between"
      >
        <div class="flex flex-col text-white">
          <span class="">{{ item.name }}</span>
          <span class="text-right mt-3">$ {{ item.price }}</span>
        </div>
        <button
          class="bg-gray-100 hover:bg-white text-gray-800 font-bold py-2 px-4 rounded focus:outline-none"
          @click="pickProduct(item)"
        >
          PICK
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { productList } from "../../utils/productList";
import { useRouter } from "vue-router";

export default {
  name: "Products",
  setup() {
    const router = useRouter();
    const pickProduct = (item) => {
      router.push({
        name: "ProductDetail",
        params: { id: item.id },
        query: {
          id: item.id,
          name: item.name,
          img: item.img,
          price: item.price,
          size: item.size,
        },
      });
    };
    return {
      productList,
      pickProduct,
    };
  },
};
</script>

<style scoped>
* {
  --column: 5;
  --margin: 10px;
}

.w-col-3 {
  width: calc(100% / var(--column) - 2 * var(--margin));
}

.m-10px {
  margin: var(--margin);
}
</style>
