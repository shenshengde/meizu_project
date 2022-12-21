<template>
  <div>
    <v-header></v-header>
    <div v-if="shopcarData.length > 0" class="shopcart-wrapper">
      <table class="shopcart-header">
        <tr>
          <td class="cart-select">
            <input
              type="checkbox"
              class="cart-checkbox"
              :checked="IsAllChecked"
              @click="checkAllGoods"
            />
            <span>全选</span>
          </td>
          <td class="cart-name">商品</td>
          <td class="cart-price">单价(元)</td>
          <td class="cart-num">数量</td>
          <td class="cart-total">小计</td>
          <td class="cart-operate">操作</td>
        </tr>
      </table>
      <div class="shopcart-list">
        <table>
          <tr
            v-for="(item, index) in shopcarData"
            :key="index"
            class="cart-product"
          >
            <td class="cart-select">
              <input
                type="checkbox"
                class="cart-checkbox"
                :checked="item.checked"
                @click="checkgoods(item.id)"
              />
              <img :src="item.imageUrl" alt="" class="cart-img" />
            </td>
            <td class="cart-name">
              <span class="cart-title">{{ item.goodsName }}</span>
              <span class="cart-desc">{{ item.goodsDesc }}</span>
            </td>
            <td class="cart-price">￥{{ item.goodsPrice }}</td>
            <td class="cart-num">
              <div class="cart-input clearfix">
                <button class="fl" @click="decrese(item.id)">-</button>
                <input class="fl" type="number" v-model="item.count" />
                <button class="fl" @click="increse(item.id)">+</button>
              </div>
            </td>
            <td class="cart-total">￥{{ item.goodsPrice * item.count }}</td>
            <td class="cart-operate">
              <i class="icon-font icon-close" @click="delgoods(item.id)"></i>
            </td>
          </tr>
        </table>
      </div>
      <div class="clearfix shopcart-footer">
        <div class="fl">
          <input
            type="checkbox"
            class="cart-checkbox"
            :checked="IsAllChecked"
            @click="checkAllGoods"
          />
          <span>全选</span>
          <span class="footer-remove">删除选中的商品</span>
          <span
            >共<span class="footer-number gray">{{ ShopcarTotal }}</span
            >件商品,已选<span class="footer-number blue">{{
              checkedgoodsTotal
            }}</span
            >件商品</span
          >
        </div>
        <div class="fr">
          <span
            >已优惠<span class="footer-number red">0.00</span
            >元，合计(不含运费):<span class="footer-number red footer-total"
              >￥{{ chechedgoodsPrice }}</span
            ></span
          >
          <a
            href="javascript:;"
            class="btn success"
            :class="{ cancel: checkedgoodsTotal <= 0 }"
            @click="goToorder"
            >结算</a
          >
        </div>
      </div>
    </div>
    <div v-else class="shopcart-empty">
      <div class="empty-content">
        <div class="empty-left"></div>
        <div class="empty-right">
          <P class="empty-desc">购物车内还没有商品,赶紧去选购吧</P>
          <a href="javasrcipt:;" class="btn success" @click="gotoIndex"
            >返回商城首页</a
          >
        </div>
      </div>
    </div>
    <v-footer></v-footer>
    <!-- “sync 相当于给组件绑定了一个属性(子组件中还是通过props接收),并且约定好了一个自定义事件, -->
    <!-- @update:属性名,这样一来,子组件只需要通过 $emit(update:属性名,val), -->
    <!-- 即可修改父组件属性,这样一来无论是调用还是维护都十分方便了” -->
    <v-dialog
      :show.sync="dialogShow"
      title="提示"
      @confirm="confirmdelete"
      @concel="dialogShow = false"
    >
      <div>确定删除该商品吗？</div>
    </v-dialog>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import vHeader from '../components/header'
import vFooter from '../components/vFooter'
import VDialog from '../components/dialog'
export default {
  name: 'Shopcart',
  components: {
    vHeader,
    vFooter,
    VDialog
  },
  data() {
    return {
      dialogShow: false,
      curentId: null
    }
  },
  computed: {
    shopcarData() {
      //拿到购物车的数据
      return this.$store.state.shopcarData
    },
    ...mapGetters([
      'IsAllChecked',
      'checkedgoodsTotal',
      'chechedgoodsPrice',
      'ShopcarTotal'
    ])
  },
  methods: {
    ...mapMutations([
      'INCREASE_SHOPCART',
      'REDUCE_SHOPCART',
      'CHECK_Goods',
      'CHECK_ALL_GOODS',
      'DEL_SHOPCAR'
    ]),
    increse(id) {
      this.INCREASE_SHOPCART(id)
    },
    decrese(id) {
      this.REDUCE_SHOPCART(id)
    },
    checkgoods(id) {
      this.CHECK_Goods(id)
    },
    checkAllGoods() {
      this.CHECK_ALL_GOODS(this.IsAllChecked)
    },
    delgoods(id) {
      // this.DEL_SHOPCAR(id)
      this.dialogShow = true
      this.curentId = id
    },
    confirmdelete() {
      //因为当我们点击的时候,拿不到id的值,这个时候需要提前传入一个id
      this.DEL_SHOPCAR(this.curentId)
      this.dialogShow = false
    },
    gotoIndex() {
      this.$router.push({
        name: 'Index'
      })
    },
    goToorder() {
      this.$router.push({
        name: 'Order'
      })
    }
  }
}
</script>

<style lang="less">
.shopcart-wrapper {
  // height: 800px;
  width: 1240px;
  margin: 10px auto;

  .shopcart-header {
    height: 50px;
    background-color: #fff;
    border-bottom: 1px solid #efefef;
    color: #333;
  }

  .cart-select {
    padding-left: 45px;
    text-align: left;
    width: 248px;

    .cart-img {
      width: 100px;
      height: 100px;
      margin-left: 90px;
      vertical-align: middle;
    }

    // .ipt {
    //   margin-right: 5px;
    //   vertical-align: middle;
    //   border-radius: 2px;
    // }
  }
  .cart-checkbox {
    width: 18px;
    height: 18px;
    border-color: #bdbdbd;
    display: inline-block;
    background-color: #fff;
    border-radius: 2px;
    font-size: 10px;
    vertical-align: middle;
    margin-right: 8px;
  }
  .cart-name {
    width: 270px;
    text-align: center;

    .cart-title {
      display: inline-block;
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .cart-desc {
      color: #999;
    }
  }
  .cart-price {
    width: 220px;
    text-align: center;
  }
  .cart-num {
    width: 200px;
    text-align: center;
  }
  .cart-total {
    width: 160px;
    text-align: center;
  }
  .cart-operate {
    width: 170px;
    text-align: center;
    padding-left: 20px;
  }
  .shopcart-list {
    background-color: #fff;
    margin-bottom: 10px;
  }
  .cart-product {
    height: 150px;
    border-top: 1px solid #efefef;

    &:last-child {
      border-bottom: 1px solid #efefef;
    }
  }
  .cart-input {
    width: 200px;
    height: 38px;
    border: 1px solid #efefef;
    margin: 0 auto;
    border-radius: 4px;

    button {
      width: 100px;
      height: 38px;
      text-align: center;
      background: transparent;
      border: none;
      font-size: 20px;
      cursor: pointer;
      margin-top: 0px;
    }

    input {
      width: 58px;
      height: 36px;
      border: none;
      border-left: 1px solid #efefef;
      border-right: 1px solid #efefef;
      text-align: center;
      margin-top: 0px;
      margin-left: -3px;
    }
  }
  .shopcart-footer {
    height: 70px;
    line-height: 70px;
    background-color: #fff;
    padding: 0 45px;
    color: #666;

    .footer-remove {
      color: #999;
      margin: 0 30px 0 20px;
    }
    .footer-number {
      font-weight: bold;
      margin: 0 15px;
    }
    .gray {
      color: #333;
    }

    .blue {
      color: #00c3f5;
    }

    .red {
      color: #e02b41;
    }
    .footer-total {
      font-size: 20px;
      margin-right: 35px;
    }
  }
}
.shopcart-empty {
  width: 1240px;
  margin: 10px auto;
  background-color: #fff;
  display: table;
  height: 360px;
  margin-bottom: 60px;

  .empty-content {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
  }
  .empty-left {
    display: inline-block;
    width: 100px;
    height: 114px;
    background: url('../assets/images/shopcart.png') no-repeat;
    margin-right: 30px;
  }
  .empty-right {
    display: inline-block;
    vertical-align: middle;
    text-align: left;
    margin-top: -72px;
    .empty-desc {
      color: #666;
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 15px;
    }
  }
}
</style>
