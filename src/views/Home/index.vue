<template>
  <div class="h-full bg-gray-300 flex justify-center items-center">
    <div class="flex justify-center items-center w-full">
      <el-carousel
        :interval="3000"
        indicator-position="none"
        height="720px"
        class="w-full"
      >
        <el-carousel-item v-for="item in state.productList" :key="item.id">
          <img
            class="w-full h-full cursor-pointer"
            :src="item.banner"
            @click="pickProduct(item)"
          />
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "Home",
  setup() {
    const router = useRouter();
    const state = reactive({
      productList: [
        {
          id: 1,
          name: "nike sacai vaporWaffle",
          banner: require("@/assets/images/home-page-nike-sacai-vaporWaffle.jpeg"),
          img: require("@/assets/images/nike-x-sacai-vaporwaffle-royal-fuchsia.jpeg"),
          price: 20000,
          size: "",
        },
        {
          id: 6,
          name: "adidas yeezy 700 og",
          banner: require("@/assets/images/home-page-yeezy-700-og.jpeg"),
          img: require("@/assets/images/adidas-yeezy-700-og.jpeg"),
          price: 14000,
          size: "",
        },
        {
          id: 7,
          name: "adidas yeezy 500 salt",
          banner: require("@/assets/images/home-page-yeezy-500.jpeg"),
          img: require("@/assets/images/adidas-originals-yeezy-500-salt.jpeg"),
          price: 9600,
          size: "",
        },
        {
          id: 8,
          name: "new balance 990",
          banner: require("@/assets/images/home-page-new-balance-990.jpeg"),
          img: require("@/assets/images/new-balance-990.jpeg"),
          price: 8000,
          size: "",
        },
      ],
    });
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
      state,
      pickProduct,
    };
  },
};
</script>
