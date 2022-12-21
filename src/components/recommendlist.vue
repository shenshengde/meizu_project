<template>
  <div>
    <div class="goods-header">
      <div class="clearfix recommend-header">
        <h3 class="fl title">推荐商品</h3>
      </div>
      <div class="fr">
        <i
          class="sign-symbol icon-font icon-left"
          :class="{ disabled: activeIndex === 0 }"
          @click="prev"
        ></i>
        <i
          class="sign-symbol icon-font icon-right"
          :class="{ disabled: activeIndex === pageSize }"
          @click="next"
        ></i>
      </div>
    </div>
    <div class="goods-item" :style="listwrapper">
      <ul class="clearfix">
        <li
          class="goods-list"
          v-for="(item, index) in data"
          :key="index"
          :class="{ 'last-child': (index + 1) % 4 === 0 }"
        >
          <a href="">
            <img :src="item.goodsUrl" alt="" />
            <div class="goods-name">{{ item.goodsName }}</div>
            <div class="goods-desc">{{ item.goodsDesc }}</div>
            <div class="goods-price">
              <!-- 表示斜体文本效果 -->
              <i>￥</i>
              {{ item.goodsPrice }}
              <span class="goods-lower" v-if="item.lower">起&nbsp;&nbsp;</span>
              <span class="goods-oldprice" v-if="item.oldPrice">{{
                item.oldPrice
              }}</span>
            </div>
          </a>
          <div class="goods-product" v-if="item.newProduct">新品</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'recommend-list',
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      activeIndex: 0
    }
  },
  computed: {
    listwrapper() {
      return {
        width: `${this.data.length * 250}px`,
        transform: `translateX(-${this.activeIndex * 1240}px)`,
        transitionDuration: '.3s'
      }
    },
    pageSize() {
      return Math.floor(this.data.length / 5)
    }
  },
  methods: {
    prev() {
      if (this.activeIndex === 0) return
      this.activeIndex -= 1
    },
    next() {
      if (this.activeIndex === this.pageSize) return
      this.activeIndex += 1
    }
  }
}
</script>

<style lang="less">
.goods-header {
  height: 68px;
  // border: 2px solid red;

  .recommend-header {
    margin: 20px auto 10px;

    .title {
      font-size: 30px;
      font-weight: 400;
    }
    .sign-symbol {
      display: inline-block;
      width: 24px;
      height: 24px;
      cursor: pointer;
      color: #00c3f5;
      font-size: 12px;
      border: 1px solid #00c3f5;
    }
  }
}
.goods-item {
  width: 1240px;
  background-color: white;
  overflow: hidden;

  .goods-list {
    float: left;
    width: 220px;
    // height: 400px;
    background-color: #fff;
    /* 当箭头移上去，箭头会变成手的模样 */
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    margin: 0 15px;
    padding: 34px 0 15px;
    // margin-top: 10px;
    // margin-right: 6px;
    overflow: hidden;
    text-align: center;
    img {
      height: 180px;
      &:hover {
        //一定到照片上面去，照片吗、放大1.倍
        transform: scale(1.2);
        transition: all 0.3s;
      }
    }

    &:hover {
      // 在边框周围设置阴影
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    }

    &.last-child {
      // 因为不确定是不是所有的vue组件都是这样，所以需要通过计算得到
      margin-right: 0;
    }
  }
  .goods-img {
    height: 230px;
    margin-top: 30px;
  }
  .goods-name {
    margin-top: 30px;
    margin-bottom: 2px;
    color: #555757;
    font-size: 16px;
  }
  .goods-desc {
    font-size: 14px;
    color: #999;
  }
  .goods-price {
    position: relative;
    display: inline-block;
    padding-left: 14px;
    font-size: 16px;
    color: #c00;
    margin-top: 8px;
    i {
      font-style: normal;
      font-size: 14px;
      position: absolute;
      left: 0;
      top: 5px;
    }
    .goods-lower {
      font-size: 16px;
    }
    .goods-oldprice {
      // 定义文本上的一条线
      text-decoration: line-through;
      color: #666;
      font-size: 14px;
      margin-left: 8px;
    }
  }
  .goods-product {
    position: absolute;
    left: 30px;
    top: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    border-radius: 50%;
    background: linear-gradient(120deg, #2e74f6, #56bdf9);
    color: white;
  }
}
</style>
