<template>
  <div class="clearfix sort-box">
    <div class="fl sort-oder">
      <a
        href="javascript:;"
        @click="setSortkey('recommend')"
        :class="{ active: activeSortkey === 'recommend' }"
        >推荐</a
      >
      <a
        href="javascript:;"
        :class="{ active: activeSortkey === 'new' }"
        @click="setSortkey('new')"
        >新品</a
      >
      <a
        href="javascript:;"
        @click="changeprice"
        :class="{
          active: activeSortkey === 'low' || activeSortkey === 'height'
        }"
        >价格
        <!-- 箭头符号 -->
        <i class="icon-font arow" :class="iconarrow"></i>
      </a>
    </div>
    <div class="fr sort-fr">
      <input v-model="haveStock" type="checkbox" class="checkbox" />
      <span>仅显示有货商品</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sort-box',
  data() {
    return {
      activeSortkey: '',
      //默认价格是由低到高排序
      activePrice: 'low',
      haveStock: false
    }
  },
  computed: {
    iconarrow() {
      if (this.activePrice === 'low') {
        return 'icon-down'
      } else {
        return 'icon-up'
      }
    }
  },
  watch: {
    haveStock(val) {
      this.$emit('getStork', val)
    }
  },
  mounted() {
    this.setSortkey('recommend')
  },
  methods: {
    setSortkey(val) {
      this.activeSortkey = val
      this.$emit('getkey', this.activeSortkey)
    },
    changeprice() {
      if (this.activeSortkey === this.activePrice) {
        this.activePrice = this.activePrice === 'low' ? 'height' : 'low'
      }
      this.setSortkey(this.activePrice)
    }
  }
}
</script>

<style lang="less">
.sort-box {
  margin: 12px auto 28px;
  //   margin-top: 5px;
  color: #666;
  height: 3px;
  text-align: center;
  .sort-oder {
    a {
      margin-right: 50px;
      //   padding-top: 5px;

      &:hover,
      &.active {
        color: #00c3f5;
        transition: all 0.2s;
      }
      &:hover .arow {
        //在同一行显示  block 自己占一行
        display: inline;
      }
    }
    .arow {
      display: none;
    }
  }
  .sort-fr {
    margin: -3px auto;
    .checkbox {
      margin: 10px;
    }
  }
}
</style>
