<template>
  <div>
    <v-header></v-header>
    <div class="tab">
        <div class="tab-item"><a v-link="{ path: '/goods' }">商品</a></div>
        <div class="tab-item"><a v-link="{ path: '/ratings' }">评价</a></div>
        <div class="tab-item"><a v-link="{ path: '/seller' }">商家</a></div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
  import header from './components/header/header.vue';
  export default {
    components: {
      'v-header': header
    }
  };
</script>
<style lang="less" rel="stylesheet/less">
  #app{
    .tab{
      width:100%;
      height:40px;
      display: flex;
      .tab-item{
        flex:1;
        text-align: center;
        height:40px;
        line-height:40px;
      }
    }
  }
</style>
