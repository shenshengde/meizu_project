<template>
  <div class="header">
    <div class="header-wrapper clearfix">
      <div class="header-logo fl"></div>
      <div class="header-cart fr">
        <span class="icon-moon icon-cart"></span>
      </div>
      <div class="header-user fr">
        <span class="icon-moon icon-user"></span>
      </div>
      <div class="header-search fr">
        <input type="text" class="search-input" placeholder="购物车" />
        <span class="search-icon icon-moon icon-search"></span>
      </div>
      <ul class="header-nav fr">
        <li
          v-for="(item, index) in navData"
          :key="index"
          @mouseenter="showchildren(item)"
        >
          <a class="nav-item" href="javascript:;" @click="gotoCategory">{{
            item.name
          }}</a>
        </li>
      </ul>
    </div>
    <transition name="nav">
      <div
        class="nav-children"
        v-show="childrenshow"
        @mouseleave="hidenchildren"
      >
        <div class="children-wrapper">
          <!-- tag 里面默认的标签是span -->
          <transition-group tag="ul" @enter="enter">
            <li
              class="children-item"
              v-for="(item, index) in childrenData"
              :key="item.pic"
              :data-index="index"
            >
              <img :src="item.pic" alt="" />
              <p>{{ item.name }}</p>
              <p>{{ item.price }}</p>
            </li>
          </transition-group>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from 'axios'
import Velocity from 'velocity-animate'
export default {
  name: 'vHeader',
  data() {
    return {
      navData: [],
      childrenData: [],
      childrenshow: false
    }
  },
  mounted() {
    this.getNavData()
  },
  methods: {
    async getNavData() {
      const { data } = await axios.get('/apinav')
      this.navData = data
      console.log(data)
    },
    showchildren(item) {
      this.childrenshow = true
      this.childrenData = item.children
    },
    hidenchildren() {
      this.childrenshow = false
    },
    enter(el) {
      // console.log(el)
      const timeout = el.dataset.index * 150
      // console.log(el.dataset.index)
      setTimeout(function () {
        Velocity(el, {
          //不透明度
          opacity: 1,
          //相对于最开始的位置移动50px
          translateX: '-50px'
        })
      }, timeout)
    },
    gotoCategory() {
      //跳转页面
      this.$router.push({
        name: 'Category'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  background-color: white;
  height: 50px;
  position: relative;

  .header-wrapper {
    width: 1240px;
    margin: 0 auto;

    .header-logo {
      width: 140px;
      height: 26px;
      margin: 10px;
      background: url('../assets/images/logo.png') no-repeat;
    }
    .header-cart,
    .header-user {
      padding: 10px 10px 0 10px;
      font-size: 24px;
      cursor: pointer;
      line-height: 1;
    }
    .header-search {
      width: 150px;
      height: 32px;
      border: 1px solid #ddd;
      border-radius: 2px;
      position: relative;
      margin: 10px 0;

      .search-input {
        width: 120px;
        height: 20px;
        border: 0;
        outline: none;
        position: absolute;
        left: 14px;
        top: -10px;
        font-size: 16px;
      }
      .search-icon {
        font-size: 16px;
        position: absolute;
        right: 10px;
        top: 8px;
      }
    }
    .header-nav {
      li {
        display: inline-block;
      }
      a.nav-item {
        display: inline-block;
        padding: 12px 45px;
        margin: 0px;
        font-size: 14px;
        cursor: pointer;
        transition: color 1s ease;

        &:hover {
          color: #31a5e7;
        }
      }
    }
  }
  .nav-children {
    width: 100%;
    height: 156px;
    background-color: white;
    position: absolute;
    top: 50px;
    border-bottom: 1px solid #e9e9e9;
    z-index: 1;

    .children-wrapper {
      width: 1240px;
      padding-left: 100px;
      margin: 0 auto;
    }
    .children-item {
      opacity: 0;
      width: 136px;
      height: 145px;
      left: 30px;
      display: inline-block;
      text-align: center;
      font-size: 13px;
    }
    img {
      width: 100px;
      height: 100px;
    }
  }
  .nav-enter-active {
    height: 156px;
    transition: height 0.3s ease-in-out;
  }
  .nav-enter {
    height: 0;
  }
}
</style>
