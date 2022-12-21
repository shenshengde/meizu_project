<template>
  <div>
    <!-- <div class="header">头部</div> -->
    <v-header></v-header>
    <div class="swiper-wraper">
      <Swiper :data="swiperData"></Swiper>
      <!-- 轮播图 -->
      <ul class="menus">
        <li v-for="(item, index) in menuData" :key="index">
          <a :href="item.href">{{ item.name }}</a>
        </li>
      </ul>
    </div>
    <ul class="post-wrapper" clearfix>
      <li v-for="(item, index) in postData" :key="index">
        <a :href="item.href">
          <img :src="item.imgUrl" alt="" />
        </a>
      </li>
    </ul>
    <div class="index-container">
      <div class="sale">
        <h3 class="title">热卖商品</h3>
        <goodslist :data="hotsalegoodsData"></goodslist>
      </div>
      <div class="sale">
        <h3 class="title">手机</h3>
        <ad-list :data="phoneRecommendData"></ad-list>
        <goodslist :data="phonesaleData"></goodslist>
      </div>
      <div class="sale Border">
        <h3 class="title">智能配件</h3>
        <ad-list :data="smartRecommendData"></ad-list>
        <goodslist :data="smartsaleData"></goodslist>
      </div>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
import axios from 'axios'
import vHeader from '../components/header'
import Swiper from '../components/swiper'
import Goodslist from '@/components/goodslist.vue'
import adList from '@/components/adList'
import vFooter from '@/components/vFooter'
export default {
  name: 'index',
  components: {
    vHeader,
    Swiper,
    Goodslist,
    adList,
    vFooter
  },
  data() {
    return {
      swiperData: [],
      menuData: [],
      postData: [],
      hotsalegoodsData: [],
      phonesaleData: [],
      smartsaleData: [],
      phoneRecommendData: [],
      smartRecommendData: []
    }
  },
  mounted() {
    this.getSwiperData()
    this.getmenuData()
    this.getpostData()
    this.getgoodsData()
    this.getphonesaleData()
    this.getsmartsaleData()
    this.getsmartRecommendData()
    this.getphoneRecommendaleData()
  },
  methods: {
    async getSwiperData() {
      const { data } = await axios.get('/apiadvertise')
      this.swiperData = data
      console.log(data)
    },
    async getmenuData() {
      const { data } = await axios.get('/apimenu')
      this.menuData = data
      console.log(data)
    },
    async getpostData() {
      const { data } = await axios.get('/apipost')
      this.postData = data
      console.log(data)
    },
    async getgoodsData() {
      const { data } = await axios.get('/apihotSale')
      this.hotsalegoodsData = data
      console.log(data)
    },
    async getphonesaleData() {
      const { data } = await axios.get('/apiphoneSale')
      this.phonesaleData = data
      console.log(data)
    },
    async getsmartsaleData() {
      const { data } = await axios.get('/apismartSale')
      this.smartsaleData = data
      console.log(data)
    },
    async getphoneRecommendaleData() {
      const { data } = await axios.get('/apiphoneRecommend')
      this.phoneRecommendData = data
      console.log(data)
    },
    async getsmartRecommendData() {
      const { data } = await axios.get('/apismartRecommend')
      this.smartRecommendData = data
      console.log(data)
    }
  }
}
</script>

<style lang="less">
.swiper-wraper {
  width: 1240px;
  height: 500px;
  position: relative;
  margin: 0 auto;

  .menus {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 303px;
    background-color: rgba(0, 0, 0, 0.5);
    padding-top: 17px;

    li {
      height: 57px;
      line-height: 57px;
    }
    a {
      font-size: 16px;
      padding-left: 40px;
      color: white;
      transition: color 0.3s;

      &:hover {
        color: #31a517;
      }
    }
  }
}
.post-wrapper {
  width: 1240px;
  margin: 10px auto 50px;

  li {
    float: left;
    width: 303px;
    height: 180px;
    margin-right: 9px;

    a {
      transition: opacity 0.3s ease-in-out;

      &:hover {
        opacity: 0.85;
      }
    }

    &:last-child {
      margin-right: 0;
    }
  }
}
.index-container {
  width: 1240px;
  margin: 0 auto;
  height: 3700px;

  .title {
    font-size: 30px;
    font-weight: 400;
    margin-bottom: 10px;
  }
  .sale {
    margin-bottom: 50px;
    .Border {
      height: 1200px;
    }
  }
}
</style>
