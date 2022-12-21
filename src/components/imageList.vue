<template>
  <div
    :class="{
      'img-wrapper': data1 === 'small',
      'img-wrapper-big': data1 !== 'small'
    }"
  >
    <img class="img" :src="data[activeIndex]" alt="" />
    <ul class="imgs">
      <li
        :class="{ active: activeIndex === index }"
        class="imgs-item"
        v-for="(item, index) in data"
        @mouseenter="changeImage(index)"
        :key="index"
      >
        <img :src="item" alt="" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'image-list',
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    },
    //作为两个页面由谁展示的判断条件
    data1: {
      type: String,
      default: 'small'
    }
  },
  data() {
    return {
      activeIndex: 0
    }
  },
  methods: {
    changeImage(index) {
      this.activeIndex = index
    }
  }
}
</script>

<style lang="less">
.img-wrapper {
  text-align: center;
  .img {
    margin-top: 20px;
    height: 230px;
  }
  .imgs {
    overflow: hidden;
    margin: 5px auto -20px;

    .imgs-item {
      display: inline-block;
      //   width: 40px;
      //   height: 40px;
      border-radius: 4px;
      margin: 0 4px;
      border: 1px solid #efefef;
      cursor: pointer;

      &.active {
        border-color: #bdbdbd;
      }

      img {
        width: 40px;
        height: 40px;
      }
    }
  }
}
.img-wrapper-big {
  text-align: center;
  .img {
    margin: 20px auto;
    height: 375px;
  }
  .imgs {
    overflow: hidden;
    margin-top: 10px;

    .imgs-item {
      display: inline-block;
      width: 75px;
      height: 75px;
      border-radius: 4px;
      margin: 0 5px;
      border: 1px solid transparent;
      cursor: pointer;

      &.active {
        border-color: #dcdcdc;
      }

      img {
        width: 40px;
        height: 40px;
      }
    }
  }
}
</style>
