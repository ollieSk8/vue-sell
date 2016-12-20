<template>
  <div class="tiptitle">
    <div class="line"></div>
    <div class="text">{{tipTitle}}</div>
    <div class="line"></div>
  </div>
</template>
<script>
  export default {
    props: ['tipTitle']
  };
</script>
<style lang="less" rel="stylesheet/less">
  .tiptitle{
    display:flex;
    width:80%;
    margin:28px auto 24px auto;
    .line{
      flex: 1;
      position:relative;
      top:-6px;
      border-bottom:1px solid rgba(255,255,255,.2);
    }
    .text{
      padding:0px 12px;
      font-size:10px;
      font-weight:700;
    }
  }
</style>
