<template>
  <div class="category-header">
    <ul class="clearfix HT" v-if="data.length > 0">
      <!-- 因为不确定是不是所有的vue组件都是这样，所以需要通过一个自定义方法，这样组件在不同的低氧，可通过不同的数据产生不同的事件 -->
      <li
        @click="clickItem(item)"
        class="catelist"
        v-for="(item, index) in data"
        :key="index"
        :class="{ 'last-child': (index + 1) % 4 === 0 }"
      >
        <a :href="item.href">
          <image-list :data="item.colorImageUrls"></image-list>
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
    <div class="clearfix empty" v-else>
      <div class="fl emptyimg"></div>
      <div class="fr empty-fr">
        <div class="title">抱歉,没有找到相关商品</div>
        <p>
          建议您:<br />
          1.适当减少筛选条件<br />
          2.尝试其他条件
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import imageList from './imageList'
export default {
  name: 'category-list',
  components: {
    imageList
  },
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    clickItem(item) {
      this.$emit('clickItem', item)
    }
  }
}
</script>

<style lang="less">
.category-header {
  height: 1700px;
}
.catelist {
  float: left;
  width: 303px;
  height: 416px;
  background-color: #fff;
  /* 当箭头移上去，箭头会变成手的模样 */
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  margin-top: 10px;
  margin-right: 6px;
  overflow: hidden;
  text-align: center;

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
  // margin-top: 30px;
  margin-bottom: 2px;
  color: #333;
  font-size: 14px;
}
.goods-desc {
  font-size: 12px;
  color: #999;
}
.goods-price {
  position: relative;
  display: inline-block;
  padding-left: 14px;
  font-size: 18px;
  color: #c00;
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
    font-size: 12px;
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
.empty {
  width: 335px;
  height: 200px;
  margin: 120px auto 380px;

  .emptyimg {
    background: url('../assets/images/xiongmao.png');
    width: 105px;
    height: 135px;
    margin-right: 30px;
  }

  .empty-fr {
    width: 200px;
  }
  .title {
    font-size: 18px;
    color: #003cf5;
    margin: 15px auto;
  }
}
</style>
