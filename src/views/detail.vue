<template>
  <div class="bg-white">
    <v-header></v-header>
    <div class="categroy-wrapper">
      <div class="bread">
        <span>首页</span>
        <span class="row">></span>
        <span>全部</span>
        <span class="row">></span>
        <span class="last-bread">手机</span>
      </div>
      <div class="clearfix detail-header">
        <div class="fl detail-images">
          <image-list :data="infoData.colorImageUrls" data1="big"></image-list>
        </div>
        <div class="fl detail-props">
          <h1 class="props-list">{{ infoData.goodsName }}</h1>
          <p class="props-desc">{{ infoData.goodsDesc }}</p>
          <div class="props-sale">
            <span class="props-name"
              >价<span class="props-space"></span>格:</span
            >
            <span class="props-price">￥{{ infoData.goodsPrice }}</span>
          </div>
          <div>
            <span class="props-name"
              >支<span class="props-space"></span>持:</span
            >
            <ul class="service-list">
              <li class="list-item">
                <i class="icon-font icon-check-circle"></i>百城速达
              </li>
              <li class="list-item">
                <i class="icon-font icon-check-circle"></i>顺丰包邮
              </li>
              <li class="list-item">
                <i class="icon-font icon-check-circle"></i>七天无理由退货
              </li>
            </ul>
          </div>
          <div>
            <span class="props-name"
              >服<span class="props-space"></span>务:</span
            >
            <span>本商品 魅族 负责发货并提供售后服务</span>
          </div>
          <div>
            <span class="props-name"
              >数<span class="props-space"></span>量:</span
            >
            <div class="clearfix props-number">
              <input
                class="fl props-input"
                type="number"
                v-model="purchaseQuantity"
              />
              <div class="fl change-box">
                <div class="change-value" @click="increse">+</div>
                <div class="change-value" @click="decrese">-</div>
              </div>
            </div>
          </div>
          <div class="grop-buy">
            <a
              @click="addshopcart"
              href="javascript:;"
              class="btn danger"
              style="margin-right: 20px"
              >加入购物车</a
            >
            <a href="javascript:;" class="btn success">立即购买</a>
          </div>
        </div>
      </div>
      <div class="detail-info_wrapper">
        <div class="detail-info">
          <a href="" class="info-title">商品详情</a>
        </div>
        <img
          class="detail-images"
          :src="item"
          alt=""
          v-for="(item, index) in infoData.information"
          :key="index"
        />
      </div>
    </div>
    <v-footer class="footer"></v-footer>
    <v-dialog
      :show.sync="dialogShow"
      :confirmButtonShow="false"
      :concelButtonShow="false"
      :width="360"
      :height="80"
    >
      <div>
        <i class="icon-font icon-check-circle add-success"></i>成功加入购物车
      </div>
      <a href="javascript:;" class="go-shopcart" @click="gotoShopcart"
        >进入购物车</a
      >
    </v-dialog>
  </div>
</template>

<script>
import vHeader from '../components/header'
import vFooter from '../components/vFooter'
import imageList from '../components/imageList'
import VDialog from '../components/dialog'
import axios from 'axios'
export default {
  name: 'detail',
  components: {
    vHeader,
    vFooter,
    imageList,
    VDialog
  },
  data() {
    return {
      infoData: {},
      purchaseQuantity: 1,
      dialogShow: false
    }
  },
  mounted() {
    this.getinfoData(this.$route.params.id)
  },
  methods: {
    async getinfoData(id) {
      const { data } = await axios.get(`/apicategoryList/${id}`)
      this.infoData = data
    },
    increse() {
      this.purchaseQuantity++
    },
    decrese() {
      if (this.purchaseQuantity > 0) {
        this.purchaseQuantity--
      }
    },
    addshopcart() {
      //用来提交mutation里面的数据
      this.$store.commit('ADD_SHOPCART', {
        //提交数据不止商品信息，还有商品数量，所以要写成一个对象
        data: this.infoData,
        num: this.purchaseQuantity
      })
      //调用这个方法
      this.dialogShow = true
      // this.gotoShopcart()
    },
    gotoShopcart() {
      this.$router.push({
        name: 'Shopcart'
      })
    }
  }
}
</script>

ImageList
<style lang="less">
.bg-white {
  background-color: white;
  .categroy-wrapper {
    width: 1240px;
    margin: 0 auto;
    height: 14100px;
  }
  .bread {
    height: 40px;
    line-height: 40px;
    margin-left: 5px;

    .row,
    .last-bread {
      color: #999;
      margin-left: 5px;
    }
  }
  .detail-header {
    height: 550px;
  }
  .detail-images {
    width: 495px;
  }
  .detail-props {
    width: 675px;
    font-size: 12px;
    margin: 55px 35px;

    .props-list {
      font-size: 24px;
      font-weight: 400;
      color: #000;
      margin-bottom: 15px;
    }
    .props-desc {
      font-size: 16px;
      color: #e22841;
      margin-bottom: 15px;
    }
    .props-name {
      padding: 0 10px;
      line-height: 34px;

      .props-space {
        padding: 0 12px;
      }
    }
    .props-sale {
      height: 55px;
      background-color: #f5f5f5;
      margin-bottom: 26px;

      .props-price {
        font-size: 24px;
        color: #e02b41;
        line-height: 55px;
      }
    }
  }
  .service-list {
    display: inline-block;

    .list-item {
      display: inline-block;
      margin-right: 20px;

      i {
        margin-right: 5px;
        color: #00c3f5;
      }
    }
  }
  .props-number {
    display: inline-block;
    vertical-align: middle;

    .props-input {
      width: 53px;
      height: 38px;
      line-height: 38px;
      text-align: center;
      color: #333;
      border: 1px solid #dcdcdc;
      margin-left: 10px;
    }

    .change-box {
      margin: 7px 25px;
      .change-value {
        width: 20px;
        height: 16px;
        font-size: 14px;
        border: 1px solid #dcdcdc;
        color: #666;
        line-height: 16px;
        text-align: center;
        cursor: pointer;
        margin-top: 6px;
      }
    }
    .grop-buy {
      margin-top: 17px;
    }
  }
  .detail-info_wrapper {
    font-size: 0;
    margin-top: -10px;
    margin-bottom: 80px;

    .detail-info {
      height: 62px;
      border-bottom: 1px solid #dcdcdc;
    }

    .info-title {
      font-size: 16px;
      height: 62px;
      line-height: 62px;
      color: #00c3f5;
      border-bottom: 1px solid #00c3f5;
      padding: 0 20px;
      margin-bottom: -1px;
      box-sizing: border-box;
      display: inline-block;
    }

    .detail-images {
      width: 1240px;
    }
  }
}
.add-success {
  color: #00c3f5;
  margin-top: 5px;
}
.go-shopcart {
  color: #00c3f5;
  text-decoration: underline;
}
</style>
