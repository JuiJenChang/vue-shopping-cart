<template>
  <div class="px-72 py-5 h-full bg-gray-300">
    <div v-if="products.length > 0">
      <ul class="divide-y divide-black">
        <li
          v-for="item in products"
          :key="item.id"
          class="flex justify-between items-center h-32"
        >
          <div class="flex">
            <img :src="item.img" class="w-24 h-24" />
            <div class="flex flex-col justify-between ml-2">
              <span>{{ item.name }}</span>
              <span>SIZE:{{ item.size }}</span>
              <span>${{ item.price }}</span>
            </div>
          </div>
          <div class="flex items-center">
            <i
              @click="deleteProduct(item)"
              class="el-icon-delete text-xl cursor-pointer"
            ></i>
          </div>
        </li>
      </ul>
      <div
        class="flex items-center justify-between pt-4 mt-8 border-t-2 border-gray-800"
      >
        <span>TOTAL: ${{ total }}</span>
        <button
          class="bg-gray-100 hover:bg-white text-gray-800 font-bold py-2 px-4 rounded focus:outline-none"
        >
          CHECKOUT
        </button>
      </div>
    </div>
    <div v-else>There are no items in the shopping cart</div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "Cart",
  setup() {
    const store = useStore();
    const products = computed(() => {
      return store.state.Cart.productsData;
    });
    const total = computed(() => {
      return products.value.reduce((prev, curr) => prev + curr.price, 0);
    });
    const deleteProduct = (item) => {
      store.commit("Cart/deleteProductsData", item);
    };
    return {
      products,
      total,
      deleteProduct,
    };
  },
};
</script>

<style scoped></style>
