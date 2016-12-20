<template>
  <div class="star" :class="starType">
    <span v-for="itemClass in itemClasses " track-by="$index" :class="itemClass" class="starItem"></span>
  </div>
</template>
<script>
  const LENGTH = 5;
  const CL_ON = 'on';
  const CL_HALF = 'half';
  const CL_OFF = 'off';
  export default {
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {
      starType() {
        return 'star-' + this.size;
      },
      itemClasses() {
        let result = [];
        let score = Math.floor(this.score * 2) / 2;
        let hasDecimal = score % 1 !== 0;
        let integer = Math.floor(score);
        for (let i = 0; i < integer; i++) {
          result.push(CL_ON);
        };
        if (hasDecimal) {
          result.push(CL_HALF);
        };
        while (result.length < LENGTH) {
          result.push(CL_OFF);
        };
        return result;
      }
    }
  };
</script>
<style lang="less" rel="stylesheet/less">
  @import "../../common/less/mixin.less";
  .star{
    font-size:0;
    .starItem{
      display:inline-block;
      background-repeat: no-repeat;
    }
    &.star-48{
      .starItem{
        width:20px;
        height:20px;
        margin-right:22px;
        background-size:20px 20px;
        &:last-child{
          margin-right:0px;
        }
        &.on{
          .bg-image('../../components/star/star48_on');
        }
        &.half{
          .bg-image('../../components/star/star48_half');
        }
        &.off{
          .bg-image('../../components/star/star48_off');
        }
      }
    }
    &.star-36{
      .starItem{
        width:15px;
        height:15px;
        margin-right:16px;
        background-size:15px 15px;
        &:last-child{
          margin-right:0px;
        }
        &.on{
          .bg-image('../../components/star/star36_on');
        }
        &.half{
          .bg-image('../../components/star/star36_half');
        }
        &.off{
          .bg-image('../../components/star/star36_off');
        }
      }
    }
    &.star-24{
      .starItem{
        width:10px;
        height:10px;
        margin-right:3px;
        background-size:10px 10px;
        &:last-child{
          margin-right:0px;
        }
        &.on{
          .bg-image('../../components/star/star24_on');
        }
        &.half{
          .bg-image('../../components/star/star24_half');
        }
        &.off{
          .bg-image('../../components/star/star24_off');
        }
      }
    }

  }
</style>
