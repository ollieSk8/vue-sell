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
      <div class="pay" :class="payClass" @click="showPrice">
        {{payDesc}}
      </div>
    </div>
  </div>
  <div class="ball-container">
    <div v-for="ball in balls" v-show="ball.show" transition="drop" class="ball">
      <div class="inner inner-hook"></div>
    </div>
  </div>
</div>
</template>
<script>
  /*global alert*/
    export default {
      data() {
        return {
          balls: [
            {show: false},
            {show: false},
            {show: false},
            {show: false},
            {show: false}
          ],
          dropball: []
        };
      },
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
      },
      methods: {
        showPrice() {
          if (this.totalPrice >= this.minPrice) {
             alert('总共需要支付:' + (this.totalPrice + this.deliveryPrice) + '元');
          }
        },
        _drop(el) {
          for (let i = 0; i < this.balls.length; i++) {
            let ball = this.balls[i];
            if (!ball.show) {
              ball.show = true;
              ball.el = el;
              this.dropball.push(ball);
              return;
            }
          }
        }
      },
      transitions: {
        drop: {
          beforeEnter(el) {
            let count = this.balls.length;
            while (count--) {
              let ball = this.balls[count];
              if (ball.show) {
                let rect = ball.el.getBoundingClientRect();
                let x = rect.left - 22;
                let y = -(window.innerHeight - rect.top - 22 - 24);
                el.style.display = '';
                el.style.webkitTransform = `translate3d(0px,${y}px,0px)`;
                el.style.transform = `translate3d(0px,${y}px,0px)`;
                let inner = el.getElementsByClassName('inner-hook')[0];
                inner.style.webkitTransform = `translate3d(${x}px,0px,0px)`;
                inner.style.transform = `translate3d(${x}px,0px,0px)`;
              }
            }
          },
          enter(el) {
            /* eslint-disable no-unused-vars */
            var rf = el.offsetHeight;
            this.$nextTick(() => {
              el.style.webkitTransform = 'translate3d(0px,0px,0px)';
              el.style.transform = 'translate3d(0px,0px,0px)';
              let inner = el.getElementsByClassName('inner-hook')[0];
              inner.style.webkitTransform = 'translate3d(0px,0px,0px)';
              inner.style.transform = 'translate3d(0px,0px,0px)';
            });
          },
          afterEnter(el) {
            let ball = this.dropball.shift();
            if (ball) {
              ball.show = false;
              el.style.display = 'none';
            }
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
  .ball-container{
    .ball{
      position:fixed;
      left:32px;
      bottom:22px;
      z-index:200;
      &.drop-transition{
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
        .inner{
          width:16px;
          height:16px;
          border-radius:50%;
          background-color:rgb(0,160,220);
          transition: all 0.4s linear;
        }
      }
    }
  }
}
</style>
