<template>
  <div class="footer">
    <div class="footer-wrapper">
      <div class="clearfix boxtop">
        <ul class="fl footer-serve">
          <li v-for="(item, index) in serviceLinkData" :key="index">
            <a :href="item.href">
              <img :src="item.icon" alt="" class="img-set" />
              <span>{{ item.name }}</span>
            </a>
          </li>
        </ul>
        <div class="fr online-serve">
          <span>周一至周日 7:30-24:00</span>
          <p>400-788-333</p>
          <a href="">在线客服</a>
        </div>
      </div>
      <hr class="set-hr" />
      <div>
        <div class="clearfix">
          <ul class="fl footer-bottom">
            <li v-for="(item, index) in externalLinkData" :key="index">
              <a :href="item.href">{{ item.name }}</a>
            </li>
          </ul>
          <div class="footer-rights">
            ©2018 Meizu Telecom Equipment Co., Ltd. All rights
            reserved,粤ICP备13003602号 合字B2-20170010 营业执照 法律声明
          </div>
        </div>
        <div class="fr subscribe">
          <a href="">
            <i class="icon-font icon-weibo"></i>
          </a>
          <a href="">
            <i class="icon-font icon-weixin"></i>
          </a>
          <a href="">
            <i class="icon-font icon-qqzone"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'vFooter',
  //在自己自建内部获取数据，不需要props
  data() {
    return {
      serviceLinkData: [],
      externalLinkData: []
    }
  },
  mounted() {
    this.getserviceLinkData()
    this.getexternalLinkData()
  },
  methods: {
    async getserviceLinkData() {
      const { data } = await axios.get('/apiserviceLink')
      this.serviceLinkData = data
    },
    async getexternalLinkData() {
      const { data } = await axios.get('/apiexternalLink')
      this.externalLinkData = data
    }
  }
}
</script>

<style lang="less">
.footer {
  background-color: #fff;
  padding: 7px 0 10px;
  border: 5px solid #efefef;
  margin-top: 77px;
  // margin-top: 1722px;
  .footer-wrapper {
    width: 1240px;
    margin: 0 auto;
  }
  .boxtop {
    height: 100px;
  }
  .footer-serve {
    width: 1000px;

    li {
      display: inline-block;
      width: 240px;
      height: 57px;
      color: #999;
    }
    img,
    span {
      //垂直居中
      vertical-align: middle;
    }
  }
  .online-serve {
    text-align: right;

    span {
      font-size: 12px;
      color: #999;
    }

    p {
      color: #00c3f5;
      font-size: 30px;
      font-weight: 400;
    }
  }
  .set-hr {
    margin: 20px 0 28px;
    display: block;
    height: 1px;
    border: 0;
    border-top: 1px solid #eee;
  }
  .footer-bottom {
    li {
      display: inline-block;
      padding-right: 15px;
      margin-right: 15px;
      border-right: 1px solid #d6d6d6;
      font-size: 12px;
      color: #999;

      &:last-child {
        border-right: none;
      }
    }
  }
  .footer-rights {
    padding-top: 42px;
    font-size: 12px;
    color: #999;
    padding-left: 16px;
  }
  .subscribe {
    margin-top: -35px;

    a {
      color: #999;
      padding-right: 10px;
      margin-right: 10px;
      border-right: 1px solid #eee;

      &:last-child {
        border-right: none;
      }
      &:hover {
        color: #31a5e7;
      }
    }
  }
}
</style>
