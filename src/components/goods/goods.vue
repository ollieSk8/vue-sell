<template>
 <div class="goods">
   <div class="menu-wrapper">
     <ul>
       <li v-for="item in goods" class="menu-item">
         <span class="text border-1px">
            <span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span>
           {{item.name}}
         </span>
       </li>
     </ul>
   </div>
   <div class="foods-wrapper"></div>
 </div>
</template>
<script>
  const ERR_OK = 0;
  export default {
    data() {
      return {
        goods: []
      };
    },
    props: {
      seller: Object
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      this.$http.get('/api/goods').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.goods = response.data;
        }
      }, (response) => {

      });
    }
  };
</script>
<style lang="less" rel="stylesheet/less">
  @import "../../common/less/mixin.less";
.goods{
  position: absolute;
  width:100%;
  top:174px;
  bottom:46px;
  display: flex;
  overflow:hidden;
  .menu-wrapper{
    flex:0 0 80px;
    width:80px;
    background-color:#f3f5f7;
    .menu-item{
      display:table;
      height:54px;
      width:56px;
      line-height:14px;
      padding:0px 12px;
      .icon{
        vertical-align: top;
        display: inline-block;
        width:12px;
        height:12px;
        margin-right:2px;
        background-size:12px 12px;
        background-repeat: no-repeat;
        &.decrease{
          .bg-image('../../components/goods/decrease_3');
        }
        &.discount{
          .bg-image('../../components/goods/discount_3');
        }
        &.guarantee{
          .bg-image('../../components/goods/guarantee_3');
        }
        &.invoice{
          .bg-image('../../components/goods/invoice_3');
        }
        &.special{
          .bg-image('../../components/goods/special_3');
        }
      }
      .text{
        font-size:12px;
        display: table-cell;
        vertical-align: middle;
        .border-1px(rgba(7,17,27,.1));

      }
    }
  }
  .foods-wrapper{

  }
}
</style>
