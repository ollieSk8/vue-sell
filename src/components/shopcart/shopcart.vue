<template>
<div class="shopcart">
  <div class="content">
    <div class="content-left">
      <div class="logo-wrapper">
        <div class="logo" :class="{'highlight':totalCount>0}">
          <i class="icon-shopping_cart"></i>
        </div>
        <div class="num" v-show="totalCount>0">{{totalCount}}</div>
      </div>
      <div class="price" :class="{'highlight':totalPrice>0}">¥{{totalPrice}}</div>
      <div class="desc">另需配送费¥{{deliveryPrice}}元</div>
    </div>
    <div class="content-right">
      <div class="pay" :class="payClass">
        {{payDesc}}
      </div>
    </div>
  </div>
</div>
</template>
<script>
    export default {
      props: {
        selectFoods: {
          type: Array,
          default() {
            return [];
          }
        },
        deliveryPrice: {
          type: Number,
          default: 0
        },
        minPrice: {
          type: Number,
          default: 0
        }
      },
      computed: {
        totalPrice() {
          let total = 0;
          this.selectFoods.forEach((food) => {
            total += food.price * food.count;
          });
          return total;
        },
        totalCount() {
          let count = 0;
          this.selectFoods.forEach((food) => {
            count += food.count;
          });
          return count;
        },
        payDesc() {
          if (this.totalCount === 0) {
            return `¥${this.minPrice}元起送`;
          } else {
            if (this.totalPrice >= this.minPrice) {
              return '去结算';
            } else {
              return `还差¥${this.minPrice - this.totalPrice}元起送`;
            }
          }
        },
        payClass() {
          if (this.totalPrice >= this.minPrice) {
            return 'enough';
          }
        }
      }
    };
</script>
<style lang="less" rel="stylesheet/less">
.shopcart{
  position: fixed;
  left:0;
  bottom:0;
  z-index:50;
  background-color:#000;
  width:100%;
  .content{
    display: flex;
    background-color:#141d27;
    color:rgba(255,255,255,0.4);
    font-size:0;
    height:48px;
    .content-left{
      flex:1;
      .logo-wrapper{
        display:inline-block;
        position: relative;
        top:-10px;
        margin:0 12px;
        padding:6px;
        width:56px;
        height:56px;
        box-sizing:border-box;
        vertical-align: top;
        border-radius: 50%;
        background-color:#141d27;
        .logo{
          width:100%;
          height:100%;
          border-radius: 50%;
          background-color:#2b343c;
          text-align: center;
          &.highlight{
            background-color:rgb(0,160,220);
            .icon-shopping_cart{
              color:#fff;
            }
          }
          .icon-shopping_cart{
            font-size:24px;
            color:#80858a;
            line-height:44px;
          }
        }
        .num{
          position:absolute;
          top:0px;
          right:0px;
          width:24px;
          line-height:16px;
          height:16px;
          text-align:center;
          border-radius:16px;
          font-size:10px;
          font-weight:700;
          color:#fff;
          background-color:rgb(240,20,20);
          box-shadow:0px 4px 8px 0px rgba(0,0,0,.4);
        }
      }
      .price{
        display:inline-block;
        vertical-align: top;
        line-height:24px;
        margin-top:12px;
        box-sizing: border-box;
        padding-right:12px;
        border-right:1px solid rgba(255,255,255,.1);
        font-size:16px;
        font-weight:700;
        color:rgba(255,255,255,.4);
        &.highlight{
          color:#fff;
        }
      }
      .desc{
        display:inline-block;
        vertical-align:top;
        line-height:24px;
        margin:12px 0 0 12px;
        font-size:10px;
      }
    }
    .content-right{
      flex:0 0 105px;
      width:105px;
      .pay{
        font-size:12px;
        height:48px;
        line-height:48px;
        text-align: center;
        font-weight:700;
        background-color:#2b333b;
        &.enough{
          background-color:#00b43c;
          color:#fff;
        }
      }
    }
  }
}
</style>
