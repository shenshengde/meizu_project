<template>
  <div class="swiper" :style="picSize">
    <ul :style="list_Wrapper" class="swiper-ul">
      <li class="swiper-list" v-for="(item, index) in data" :key="index">
        <a href="http://www.baidu.com">
          <img :style="picSize" :src="item.imgUrl" alt="" />
        </a>
      </li>
    </ul>
    <ul class="swiper-btn">
      <li
        v-for="(item, index) in data"
        :key="index"
        @click="btn(index)"
        :class="{ active: activeIndex === index }"
      ></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Swiper',
  props: {
    //父组件提供数据，我们这里需要渲染
    data: {
      type: Array,
      default() {
        return []
      }
    },
    height: {
      type: Number,
      default: 500 //默认值，当父组件未定义时，系统会默认这个值
    },
    width: {
      type: Number,
      default: 1240
    },
    delay: {
      type: Number,
      default: 3000
    }
  },
  computed: {
    picSize() {
      return {
        width: `${this.width}px`,
        height: `${this.height}px`
      }
    },
    list_Wrapper() {
      return {
        //所有照片加起来的总长度
        width: `${this.data.length * this.width}px`,
        height: `${this.height}px`,
        transform: `translateX(-${this.activeIndex * this.width}px)`,
        transitionDuration: '.3s'
      }
    }
  },
  data() {
    return {
      activeIndex: 0,
      timer: null
      //   haveDuration: true
    }
  },
  mounted() {
    this.setTimer()
  },
  methods: {
    setTimer() {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        if (this.activeIndex === this.data.length - 1) {
          this.activeIndex = 0
          //   this.haveDuration = false
        } else {
          this.activeIndex++
          //   this.haveDuration = true
        }
      }, this.delay)
    },
    btn(index) {
      this.activeIndex = index
      //   this.haveDuration = true
    }
  }
}
</script>

<style lang="less" scoped>
.swiper {
  position: relative;
  overflow: hidden;

  .swiper-ul {
    font-size: 0;
  }

  .swiper-list {
    display: inline-block;
  }
  .swiper-btn {
    position: absolute;
    left: 30%;
    bottom: 20px;
    display: inline-block;

    li {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      margin: 0 5px;
      background-color: white;
      cursor: pointer;
      display: inline-block;

      &.active {
        background-color: transparent;
        border: 1px solid #fff;
      }
    }
  }
}
</style>
