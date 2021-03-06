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
    <div class="supports-count" v-if="seller.supports" @click="showDetail()">
      <span class="count">{{seller.supports.length}}个</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
  </div>
  <div class="bulletin-wrapper" @click="showDetail()">
    <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
    <i class="icon-keyboard_arrow_right"></i>
  </div>
  <div class="background">
    <img :src="seller.avatar" alt="" width="100%" height="100%">
  </div>
  <div class="detail" v-show="detailShow" transition="fade">
    <div class="detail-wrapper clearfix">
      <div class="detail-main">
        <h1 class="name">{{seller.name}}</h1>
        <div class="star-wrapper">
          <star :size="48" :score="seller.score"></star>
          <sel-title tip-title="优惠信息"></sel-title>
          <ul v-if="seller.supports" class="supports">
            <li class="supports-item" v-for="item in seller.supports" track-by="$index">
              <span class="icon" :class="classMap[seller.supports[$index].type]"></span>
              <span class="text">{{seller.supports[$index].description}}</span>
            </li>
          </ul>
          <sel-title tip-title="商家公告"></sel-title>
          <div class="bulletin">
            <p class="content">
              {{seller.bulletin}}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="detail-close" @click="hideDetail()">
      <i class="icon-close"></i>
    </div>
  </div>
</div>
</template>
<script>
    import star from 'components/star/star.vue';
    import selTitle from 'components/title.vue';
    export default {
      data() {
        return {
          detailShow: false
        };
      },
      props: {
        seller: {
          type: Object
        }
      },
      created() {
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      },
      methods: {
        showDetail() {
          this.detailShow = true;
        },
        hideDetail() {
          this.detailShow = false;
        }
      },
      components: {
        'star': star,
        'sel-title': selTitle
      }
    };
</script>
<style lang="less" rel="stylesheet/less">
  @import "../../common/less/mixin.less";
  .header{
    color:#fff;
    background-color:rgba(7,17,27,.5);
    position:relative;
    overflow: hidden;
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
        margin-top:8px;
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
    .detail{
      position:fixed;
      left:0px;
      top:0px;
      z-index:100;
      width:100%;
      height:100%;
      overflow:auto;
      background-color:rgba(7,17,27,.8);
      backdrop-filter:blur(10px);
      transition:all 0.5s;
      &.fade-transition {
        opacity: 1;
        background-color: rgba(7, 17, 27, .8);
      }
      &.fade-enter, &.fade-leave {
        opacity: 0;
        background-color: rgba(7, 17, 27, 0);
      }
      .detail-wrapper{
        min-height:100%;
        width:100%;
        .detail-main{
          margin-top:64px;
          padding-bottom:64px;
          .name{
            font-size:16px;
            text-align:center;
            line-height:16px;
            font-weight:700;
          }
          .star-wrapper{
            margin-top:18px;
            padding:2px 0px;
            text-align: center;
            .supports{
              width:80%;
              margin:0 auto;
              .supports-item{
                padding:0px 12px;
                margin-bottom:12px;
                font-size:0px;
                text-align: left;
                &:last-child{
                  margin-bottom:0px;
                }
                .icon{
                  display:inline-block;
                  width:16px;
                  height:16px;
                  vertical-align:top;
                  margin-right:6px;
                  background-size:16px 16px;
                  &.decrease{
                    .bg-image('../../components/header/decrease_2');
                  }
                  &.discount{
                    .bg-image('../../components/header/discount_2');
                  }
                  &.guarantee{
                    .bg-image('../../components/header/guarantee_2');
                  }
                  &.invoice{
                    .bg-image('../../components/header/invoice_2');
                  }
                  &.special{
                    .bg-image('../../components/header/special_2');
                  }
                }
                .text{
                  font-size:12px;
                  line-height:16px;
                }
              }
            }
            .bulletin{
              width:80%;
              margin:0 auto;
              font-size:0;
              .content{
                text-align: justify;
                font-weight:200;
                font-size:12px;
                color:rgb(255,255,255);
                line-height:24px;
                box-sizing:border-box;
                padding:0 12px;
              }
            }
          }
        }
      }
      .detail-close{
        position:relative;
        width:32px;
        height:32px;
        margin:-64px auto 0;
        clear:both;
        font-size:32px;
      }
    }
  }
</style>
