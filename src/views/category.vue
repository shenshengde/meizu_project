<template>
  <div>
    <v-header></v-header>
    <div class="categroy-wrapper">
      <div class="bread">
        <span>首页</span>
        <span class="row">></span>
        <span>全部</span>
        <span class="row">></span>
        <span class="last-bread">手机</span>
      </div>
      <fiter-box :data="fiterBoxData" @filter="getResult"></fiter-box>
      <sort-box @getkey="getsortkey" @getStork="getsortStork"></sort-box>
      <category-list
        @clickItem="goToDetail"
        :data="categroylistData"
      ></category-list>
      <recommend-list :data="recommendData"></recommend-list>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
import axios from 'axios'
import vHeader from '../components/header'
import vFooter from '../components/vFooter'
import categoryList from '../components/categorylist'
import fiterBox from '../components/fiterBox'
import SortBox from '@/components/sortBox'
import RecommendList from '../components/recommendlist'
export default {
  name: 'category',
  components: {
    vHeader,
    vFooter,
    categoryList,
    fiterBox,
    SortBox,
    RecommendList
  },
  data() {
    return {
      categroylistData: [],
      fiterBoxData: [],
      categroylistcopyData: [],
      recommendData: [],
      currentResult: null,
      currentStock: null,
      currentKey: null
    }
  },
  mounted() {
    this.getcategroylistData()
    this.getfiterBoxData()
    this.getrecommendlistData()
  },
  methods: {
    async getcategroylistData() {
      const { data } = await axios.get('/apicategoryList')
      this.categroylistData = data
      //  concat() 方法用于连接两个或多个数组
      this.categroylistcopyData = [].concat(data)
    },
    async getfiterBoxData() {
      const { data } = await axios.get('/apiqueryList')
      this.fiterBoxData = data
    },
    async getrecommendlistData() {
      const { data } = await axios.get('/apismartSale')
      this.recommendData = data
    },
    getResult(val) {
      this.currentResult = val
      this.getsort()
    },
    getsortkey(key) {
      this.currentKey = key
      this.getsort()
    },
    getsortStork(val) {
      this.currentStock = val
      this.getsort()
    },
    getsort() {
      //这里到时候在听一遍
      this.categoryListData = [].concat(this.categroylistcopyData)
      if (this.currentResult) {
        Object.keys(this.currentResult).forEach((key) => {
          if (this.currentResult[key]) {
            this.categroylistData = this.categroylistData.filter((item) => {
              return item.features.indexOf(this.currentResult[key]) >= 0
            })
          }
        })
      }
      if (this.currentStock === true) {
        this.categroylistData = this.categroylistData.filter((item) => {
          return item.available
        })
      } else {
        this.categroylistData = this.categroylistData.filter((item) => {
          return (item.available = true || false)
        })
      }
      if (this.currentKey) {
        if (this.currentKey === 'recommend') {
          this.categroylistData.sort((a, b) => {
            return b.shelveTime - a.shelveTime
          })
        } else if (this.currentKey === 'new') {
          this.categroylistData.sort((a, b) => {
            return b.publishedTime - a.publishedTime
          })
        } else if (this.currentKey === 'low') {
          this.categroylistData.sort((a, b) => {
            return b.goodsPrice - a.goodsPrice
          })
        } else if (this.currentKey === 'height') {
          this.categroylistData.sort((a, b) => {
            return a.goodsPrice - b.goodsPrice
          })
        }
      }
    },
    goToDetail(item) {
      //跳转页面
      this.$router.push({
        name: 'Detail',
        params: {
          id: item.id
        }
      })
    }
  }
}
</script>

<style lang="less">
.categroy-wrapper {
  width: 1240px;
  margin: 0 auto;
  // height: 2500px;
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
</style>
