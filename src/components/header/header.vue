<template>
<div class="header">
  <div class="content-wrapper">
    <div class="avatar">
      <img :src="seller.avatar" alt="" width="64" height="64">
    </div>
    <div class="content">
      <div class="title">
        <span class="brand"></span>
        <span class="name">{{seller.name}}</span>
      </div>
      <div class="description">
        {{seller.description}}/{{seller.deliveryTime}}分钟送达
      </div>
      <div class="supports" v-if="seller.supports">
        <span class="icon" :class="classMap[seller.supports[0].type]"></span>
        <span class="text">{{seller.supports[0].description}}</span>
      </div>
    </div>
  </div>
  <div class="bulletin-wrapper">

  </div>
</div>
</template>
<script>
    export default {
      props: {
        seller: {
          type: Object
        }
      },
      created() {
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      }
    };
</script>
<style lang="less" rel="stylesheet/less">
  @import "../../common/less/mixin.less";
  .header{
    color:#fff;
    background-color:#000;
    .content-wrapper{
      padding:24px 12px 18px 24px;
      font-size:0;
      .avatar{
        display: inline-block;
        img{
          border-radius:2px;
        }
      }
      .content{
        display: inline-block;
        font-size:14px;
        margin-left:16px;
        .title{
          margin:2px 0px 8px 0px;
          .brand{
            width:30px;
            height:18px;
            vertical-align:top;
            display:inline-block;
            .bg-image('../../components/header/brand');
            background-repeat: no-repeat;
            background-size:30px 18px;
          }
          .name{
            margin-left:6px;
            font-size:16px;
            font-weight: bold;
          }
        }
        .description{
          margin-bottom:10px;
          line-height:12px;
          font-size:12px;
        }
        .supports{
          .icon{
            vertical-align: top;
            display: inline-block;
            width:12px;
            height:12px;
            margin-right:4px;
            background-size:12px 12px;
            background-repeat: no-repeat;
            &.decrease{
              .bg-image('../../components/header/decrease_1');
            }
            &.discount{
              .bg-image('../../components/header/discount_1');
            }
            &.guarantee{
              .bg-image('../../components/header/guarantee_1');
            }
            &.invoice{
              .bg-image('../../components/header/invoice_1');
            }
            &.special{
              .bg-image('../../components/header/special_1');
            }
          }
          .text{
            line-height:12px;
            font-size:12px;

          }
        }
      }
    }
  }
</style>
