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
   <div class="foods-wrapper">
     <ul>
       <li v-for="item in goods" class="food-list">
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
             </div>
           </li>
         </ul>
       </li>
     </ul>
   </div>
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
        }
      }
    }

  }
}
</style>
