<template>
  <div id="app">
    <Header/>
    <!-- 展示路由 -->
    <router-view></router-view>
    <Footer v-show="$route.meta.show"/>
  </div>
</template>

<script>
  import Header from '@/components/Header/index.vue';
  import Footer from '@/components/Footer/index.vue';
  export default {
      name: "App",
      components: {
        Header,
        Footer
      },
      mounted() {
        // 通知vuex发请求获取数据,存储在仓库中
        this.$store.dispatch('categoryList')
      },
  }
</script>

<style>

</style>