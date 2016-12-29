<template>
 <div class="goods">
   <div class="menu-wrapper" v-el:menu-wrapper>
     <ul>
       <li v-for="item in goods" class="menu-item" :class="{'current':currentIndex===$index}" @click="selectedMenu($index,$event)">
         <span class="text border-1px">
            <span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span>
           {{item.name}}
         </span>
       </li>
     </ul>
   </div>
   <div class="foods-wrapper" v-el:foods-wrapper>
     <ul>
       <li v-for="item in goods" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
         <ul>
           <li v-for="food in item.foods" class="food-item border-1px">
             <div class="icon">
               <img :src="food.icon" alt="" width="57" height="57">
             </div>
             <div class="content">
               <h2 class="name">{{food.name}}</h2>
               <div class="desc" v-if="food.description">{{food.description}}</div>
               <div class="extra">
                 <span class="count">月售{{food.sellCount}}份</span>
                 <span>好评率{{food.rating}}%</span>
               </div>
               <div class="price">
                 <span class="now">¥{{food.price}}</span>
                 <span v-show="food.oldPrice" class="old">¥{{food.oldPrice}}</span>
               </div>
               <div class="cartcontrol-wrapper">
                 <cartcontrol :food="food"></cartcontrol>
               </div>
             </div>
           </li>
         </ul>
       </li>
     </ul>
   </div>
   <shopcart v-ref:shopcart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" :select-foods="selectFoods"></shopcart>
 </div>
</template>
<script>
  import BScroll from 'better-scroll';
  import shopcart from 'components/shopcart/shopcart.vue';
  import cartcontrol from 'components/cartcontrol/cartcontrol.vue';
  const ERR_OK = 0;
  export default {
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0
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
          this.$nextTick(() => {
            this._initScroll();
            this._calculateHeight();
          });
        }
      }, (response) => {

      });
    },
    events: {
      'cart.add': function (target) {
        // 异步执行下落小球动画
        this.$nextTick(() => {
          this.$refs.shopcart._drop(target);
        });
      }
    },
    methods: {
      _initScroll() {
        this.menuScroll = new BScroll(this.$els.menuWrapper, {click: true});
        this.foodScroll = new BScroll(this.$els.foodsWrapper, {
          click: true,
          probeType: 3
        });
        this.foodScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      _calculateHeight() {
        let foodList = this.$els.foodsWrapper.getElementsByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      },
      selectedMenu(index, event) {
        if (!event._constructed) {
          return;
        }
        let foodList = this.$els.foodsWrapper.getElementsByClassName('food-list-hook');
        let el = foodList[index];
        this.foodScroll.scrollToElement(el, 300);
      }
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          };
        }
        return 0;
      },
      selectFoods() {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          });
        });
        return foods;
      }
    },
    components: {
      shopcart: shopcart,
      cartcontrol: cartcontrol
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
      &.current{
        background-color:#fff;
        font-weight: 700;
        position: relative;
        margin-top:-1px;
        z-index: 10;
        .text{
          .border-none();
        }
      }
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
    .food-list{
      .title{
        width:100%;
        height:26px;
        background-color:#f3f5f7;
        color:rgb(147,153,159);
        font-size:12px;
        line-height:26px;
        box-sizeing:border-box;
        border-left:2px solid #d9dde1;
        padding-left:14px;
      }
      .food-item{
        display: flex;
        margin:18px;
        padding-bottom:18px;
        .border-1px(rgba(7,17,27,.1));
        &:last-child{
          .border-none();
          margin-bottom:0px;
          padding-bottom:20px;
        }
        .icon{
          flex:0 0 57px;
          margin-right:10px;
        }
        .content{
          flex:1;
          .name{
            font-size:14px;
            margin:2px 0px 8px 0px;
            height:14px;
            line-height:14px;
            color:rgb(7,17,27);
          }
          .desc,.extra{
            line-height:10px;
            font-size:10px;
            color:rgb(147,153,159);
          }
          .desc{
            margin-bottom: 8px;
            line-height:14px;
          }
          .extra{
            line-height:10px;
            .count{
              margin-right:12px;
            }
          }
          .price{
            font-weight:700;
            line-height:24px;
            .now{
              margin-right:8px;
              font-size:14px;
              color:rgb(240,20,20);
            }
            .old{
              text-decoration: line-through;
              font-size:10px;
              color:rgb(147,153,159);
            }
          }
          .cartcontrol-wrapper{
            position:absolute;
            right:0;
            bottom:12px;
          }
        }
      }
    }

  }
}
</style>
