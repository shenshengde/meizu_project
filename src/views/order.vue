<template>
  <div>
    <v-header></v-header>
    <div class="order">
      <div class="order-item">
        <h1 class="order-title order-line">收货人信息</h1>
        <ul class="address-list clearfix">
          <li
            v-for="(item, index) in addressData"
            :key="index"
            class="address-item fl"
            @click="checkAddress(item)"
            :class="{ active: item.checked }"
          >
            <div class="clearfix address-title">
              <div class="fl">{{ item.name }}</div>
              <div class="fr">{{ item.phone }}</div>
            </div>
            <div class="address-info">
              {{ item.province }}{{ item.city }}{{ item.district
              }}{{ item.street }}
            </div>
            <div class="address-checked" v-show="item.checked">
              <i class="icon-font icon-check address-check"></i>
            </div>
          </li>
          <li class="address-item fl">
            <div class="address-add_icon">+</div>
            <div>添加新地址</div>
          </li>
        </ul>
      </div>
      <div class="order-item">
        <h1 class="order-title">确认订单信息</h1>
        <table class="order-goods">
          <thead>
            <tr>
              <th class="goods-name">商品</th>
              <th class="goods-price Item-Prices">单价</th>
              <th class="goods-number">数量</th>
              <th class="goods-count">小计</th>
              <th class="goods-express">配送方式</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in orderData" :key="index">
              <td class="goods-name">
                <img :src="item.imageUrl" alt="" />
                <div class="goods-desc">
                  <p>{{ item.goodsName }}</p>
                  <p>{{ item.goodsDesc }}</p>
                </div>
              </td>
              <td class="goods-price item-price">￥{{ item.goodsPrice }}</td>
              <td class="goods-number">{{ item.count }}</td>
              <td class="goods-count">
                {{ item.count * item.goodsPrice }}
              </td>
              <!-- 表示表单合并 -->
              <td :rowspan="orderData.length" class="goods-express">
                快递配送:运费 <span class="red">￥0.00</span>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <!-- colspan是HTML的一种合并列的标签属性，其属性是设置当前单元格横跨的列数 -->
              <td colspan="3" class="order-footer">
                备注:<textarea>备注...</textarea>
              </td>
              <td colspan="2" class="footer-total">
                合计:<span class="price">￥{{ chechedgoodsPrice }}</span>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div class="order-item clearfix">
        <h1 class="order-title">选择支付方式</h1>
        <div class="order-pay">
          <div class="pay-item clearfix">
            <h1 class="pay-title fl">支付宝</h1>
            <ul class="fl clearfix pay-content">
              <li>
                <input
                  v-model="payMode"
                  type="radio"
                  value="huabei"
                  name="pay"
                />
                <img src="../assets/images/banks/huabei.png" alt="" />
              </li>
              <li>
                <input
                  v-model="payMode"
                  type="radio"
                  value="alipay"
                  name="pay"
                />
                <img src="../assets/images/banks/alipay.png" alt="" />
              </li>
            </ul>
          </div>
          <div class="pay-item clearfix">
            <h1 class="fl pay-title">微信</h1>
            <ul class="fl clearfix pay-content">
              <li>
                <input
                  v-model="payMode"
                  type="radio"
                  value="wechat"
                  name="pay"
                />
                <img src="../assets/images/banks/wechat.png" alt="" />
              </li>
            </ul>
          </div>
          <div class="pay-item clearfix">
            <h1 class="pay-title fl">网上银行</h1>
            <ul class="fl clearfix pay-content pay-bank">
              <li>
                <input
                  v-model="payMode"
                  type="radio"
                  value="zhongguo"
                  name="pay"
                />
                <img src="../assets/images/banks/zhongguo.png" alt="" />
              </li>
              <li>
                <input
                  v-model="payMode"
                  type="radio"
                  value="nongye"
                  name="pay"
                />
                <img src="../assets/images/banks/nongye.png" alt="" />
              </li>
              <li>
                <input
                  v-model="payMode"
                  type="radio"
                  value="jianshe"
                  name="pay"
                />
                <img src="../assets/images/banks/jianshe.png" alt="" />
              </li>
              <li>
                <input
                  v-model="payMode"
                  type="radio"
                  value="gongshang"
                  name="pay"
                />
                <img src="../assets/images/banks/gongshang.png" alt="" />
              </li>
              <li>
                <input
                  v-model="payMode"
                  type="radio"
                  value="jiaotong"
                  name="pay"
                />
                <img src="../assets/images/banks/jiaotong.png" alt="" />
              </li>
              <li>
                <input
                  v-model="payMode"
                  type="radio"
                  value="zhaoshang"
                  name="pay"
                />
                <img src="../assets/images/banks/zhaoshang.png" alt="" />
              </li>
              <li>
                <input
                  v-model="payMode"
                  type="radio"
                  value="youzheng"
                  name="pay"
                />
                <img src="../assets/images/banks/youzheng.png" alt="" />
              </li>
              <li>
                <input
                  v-model="payMode"
                  type="radio"
                  value="xingye"
                  name="pay"
                />
                <img src="../assets/images/banks/xingye.png" alt="" />
              </li>
              <li>
                <input
                  v-model="payMode"
                  type="radio"
                  value="shanghai"
                  name="pay"
                />
                <img src="../assets/images/banks/shanghai.png" alt="" />
              </li>
            </ul>
          </div>
          <ul class="order-total">
            <li class="clearfix">
              <div class="fl">总金额</div>
              <div class="fr">￥{{ chechedgoodsPrice }}</div>
            </li>
            <li class="clearfix">
              <div class="fl">运费</div>
              <div class="fr">￥0.00</div>
            </li>
            <li class="order-line"></li>
            <li class="clearfix">
              <div class="fl">应付</div>
              <div class="fr order-price">￥{{ chechedgoodsPrice }}</div>
            </li>
            <li class="order-btn">
              <a href="javascript:;" class="btn success" @click="pushOrder"
                >下单支付</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
    <v-footer></v-footer>
    <v-dialog
      :show.sync="dialogShow"
      :width="360"
      :height="80"
      :confirm-button-show="false"
      :cancel-button-show="false"
    >
      <div>
        <i class="icon-font icon-check-circle add-success"></i>成功提交订单
      </div>
      <a class="go-shopcart" href="javascript:;" @click="goToIndex">返回首页</a>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import axios from 'axios'
import vHeader from '../components/header'
import vFooter from '../components/vFooter'
import vDialog from '../components/dialog'
export default {
  name: 'Order',
  components: {
    vHeader,
    vFooter,
    vDialog
  },
  data() {
    return {
      addressData: [],
      payMode: '',
      dialogShow: false
    }
  },
  computed: {
    orderData() {
      const data = this.$store.state.shopcarData.filter((item) => item.checked)
      return data
    },
    ...mapGetters(['chechedgoodsPrice'])
  },
  mounted() {
    this.getAddressData()
  },
  methods: {
    ...mapMutations(['REMOVE_GOODS']),
    async getAddressData() {
      const { data } = await axios.get('/apiaddressData')
      this.addressData = data
    },
    checkAddress(val) {
      this.addressData.forEach((item) => {
        item.checked = false
        if (item.id === val.id) {
          item.checked = true
        }
      })
    },
    //提交商品的所有数据到后台
    pushOrder() {
      //货物提交的时间
      const date = new Date()
      //货物的地址
      const address = this.addressData.filter((item) => item.checked[0])
      const data = {
        orderId: date.getTime(),
        address: address,
        orderData: this.orderData,
        price: this.chechedgoodsPrice,
        time: date,
        payMode: this.payMode
      }
      this.REMOVE_GOODS

      console.log(data)
      this.dialogShow = true
    },
    goToIndex() {
      this.$router.push({
        name: 'Index'
      })
    }
  }
}
</script>

<style lang="less">
.order {
  width: 1240px;
  margin: 0 auto;

  .order-item {
    margin-top: 10px;
    padding: 0 40px 10px;
    background-color: #fff;
    // height: 300px;
  }
  .order-title {
    padding: 20px 0;
    font-size: 18px;
    color: black;
    text-indent: 10px;
  }
  .order-line {
    border-bottom: 1px solid #efefef;
  }
  .address-list {
    margin-top: 30px;
    padding-left: 12px;
    clear: both;

    .address-item {
      width: 275px;
      height: 144px;
      margin: 0 12px 30px 0;
      border: 1px solid #efefef;
      padding: 15px;
      transition: border-color 0.8s;
      position: relative;

      &:hover,
      &.active {
        border-color: #00c3f5;
      }
    }
    .address-title {
      font-size: 12px;
      font-weight: bold;
      color: black;
      border-bottom: 1pxs solid #efefef;
      line-height: 40px;
    }
    .address-info {
      font-size: 12px;
      padding-top: 10px;
      //例如div宽200px，它的内容就会到200px自动换行，如果该行末端有个英文单词很长（congratulation等），它会把单词截断，变成该行末端为conra(congratulation的前端部分)，下一行为tulation（conguatulation）的后端部分了。
      word-break: break-all;
      //例子与上面一样，但区别就是它会把congratulation整个单词看成一个整体，如果该行末端宽度不够显示整个单词，它会自动把整个单词放到下一行，而不会把单词截断掉的。
      word-wrap: break-word;
    }
    .address-checked {
      position: absolute;
      width: 0;
      height: 0;
      right: 0;
      bottom: 0;
      border-right: 30px solid #00c3f5;
      border-top: 30px solid transparent;
    }
    .address-check {
      position: absolute;
      right: -30px;
      bottom: 6px;
      font-size: 12px;
      color: white;
    }
    .address-item {
      text-align: center;
      transition: color 0.3s;

      &:hover {
        color: #00c3f5;
      }
      .address-add_icon {
        font-size: 30px;
        margin-top: 30px;
        margin-bottom: 30px;
        line-height: 1px;
      }
    }
  }
  .order-goods {
    margin-top: 32px;
    border: 1px solid #efefef;

    thead {
      tr {
        height: 63px;
        border-bottom: 1px solid #efefef;
      }

      .goods-number,
      .goods-count,
      .goods-express {
        font-size: 18px;
        color: black;
      }

      .goods-name {
        font-size: 12px;
        font-weight: 400;
        color: #666;
      }
    }
    tbody tr {
      border-bottom: 1px solid #efefef;
    }

    tfoot tr {
      background-color: #f5f5f5;
    }

    .goods-name {
      width: 438px;
      padding-left: 10px;
      text-align: left;
      cursor: pointer;

      img {
        width: 120px;
        height: 120px;
        vertical-align: middle;
      }

      .goods-desc {
        display: inline-block;
        vertical-align: middle;
        font-size: 16px;
      }
    }
    .goods-price {
      width: 225px;
      font-weight: bold;
      text-align: center;
      font-size: 18px;
      color: black;
      // margin-top: 17px;
    }
    .goods-number {
      width: 139px;
      font-weight: bold;
      text-align: center;
    }
    .goods-count {
      width: 173px;
      text-align: right;
      font-weight: bold;
    }
    .goods-express {
      width: 184px;
      color: #999;
      text-align: center;
      border: 1px solid #efefef;

      .red {
        color: #e02b41;
        font-weight: bold;
      }
    }
    .order-footer {
      padding: 15px 20px;
      font-size: 12px;

      textarea {
        width: 552px;
        height: 48px;
        border: 1px solid #efefef;
        padding: 5px;
        outline: 0;
        resize: none;
        background-color: #fff;
        margin-left: 5px;
        vertical-align: middle;
      }
    }
    .footer-total {
      text-align: right;
      color: #e02b41;
      padding: 15px 20px;
      font-weight: bold;

      .price {
        font-size: 22px;
      }
    }
  }

  .order-pay {
    padding: 40px 26px 14px;
    border: 1px solid #efefef;

    .pay-item {
      margin-bottom: 26px;
    }
    .pay-title {
      width: 60px;
      line-height: 40px;
      color: #333;
      font-size: 14px;
      margin: 0 20px 0 0;
    }
    .pay-content {
      li {
        float: left;
        margin-right: 40px;
        margin-bottom: 26px;
      }

      input {
        vertical-align: middle;
        margin-right: 20px;
      }

      img {
        vertical-align: middle;
      }
    }
    .pay-bank {
      width: 1020px;
    }
  }
  .order-total {
    width: 318px;
    float: right;
    margin-top: 30px;

    li {
      margin-bottom: 20px;
    }

    .order-line {
      height: 1px;
      background-color: #efefef;
    }
    .order-btn {
      float: right;
    }
    .order-price {
      color: #e02b41;
      font-weight: bold;
      font-size: 20px;
    }
  }
}
.item-price {
  margin-top: 45px;
}
.Item-Prices {
  margin-top: 18px;
}
</style>
