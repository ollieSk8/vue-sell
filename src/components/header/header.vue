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
    <div class="supports-count" v-if="seller.supports">
      <span class="count">{{seller.supports.length}}个</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
  </div>
  <div class="bulletin-wrapper">
    <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
    <i class="icon-keyboard_arrow_right"></i>
  </div>
  <div class="background">
    <img :src="seller.avatar" alt="" width="100%" height="100%">
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
    background-color:rgba(7,17,27,.5);
    position:relative;
    .content-wrapper{
      padding:24px 12px 18px 24px;
      font-size:0;
      position:relative;
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
            font-size:10px;
            vertical-align: top;
          }
        }
      }
      .supports-count{
        position:absolute;
        right:12px;
        bottom:14px;
        padding:0 8px;
        height:24px;
        line-height:24px;
        border-radius:14px;
        background-color:rgba(0,0,0,.2);
        text-align: center;
        .count{
          font-size:10px;
          vertical-align: top;
        }
        .icon-keyboard_arrow_right{
          font-size:10px;
          line-height:24px;
          margin-left:2px;
        }
      }
    }
    .bulletin-wrapper{
      height:28px;
      line-height:28px;
      padding:0 22px 0 12px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow:ellipsis;
      position:relative;
      background-color:rgba(7,17,27,.2);
      .bulletin-title{
        display:inline-block;
        width:22px;
        height:12px;
        .bg-image('../../components/header/bulletin');
        background-repeat: no-repeat;
        background-size:22px 12px;
        vertical-align: top;
        margin-top:7px;
      }
      .bulletin-text{
        font-size:10px;
        font-weight:200;
        vertical-align: top;
        margin:0 4px;
      }
      .icon-keyboard_arrow_right{
        position:absolute;
        font-size:10px;
        right:12px;
        top:9px;
      }
    }
    .background{
      position:absolute;
      left:0px;
      top:0px;
      width:100%;
      height:100%;
      z-index:-1;
      filter:blur(10px);
    }
  }
</style>
