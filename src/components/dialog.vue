<template>
  <div class="dia-mask" v-show="show">
    <div class="dia-box">
      <div class="dia-wrapper" :style="dialogBox">
        <div class="dia-header" :class="{ 'dialog-title': title }">
          {{ title }}
          <i class="icon-font icon-close dia-close" @click="close"></i>
        </div>
        <div :style="dialogContent">
          <!-- 显示在Shopcart的<v-dialog>xxx</v-dialog>里面的内容 -->
          <slot></slot>
        </div>
        <div v-if="confirmButtonShow || concelButtonShow">
          <button
            class="dia-define btn success"
            @click="confirm"
            :show="confirmButtonShow"
          >
            {{ confirmButtonText }}
          </button>
          <button class="btn success" @click="concel" :show="concelButtonShow">
            {{ concelButtonText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VDialog',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    //封装弹框
    height: {
      type: Number,
      default: 120
    },
    width: {
      type: Number,
      default: 500
    },
    title: {
      type: String,
      default: ''
    },
    confirmButtonShow: {
      type: Boolean,
      default: true
    },
    concelButtonShow: {
      type: Boolean,
      default: true
    },
    confirmButtonText: {
      type: String,
      default: '确定'
    },
    concelButtonText: {
      type: String,
      default: '取消'
    }
  },
  computed: {
    dialogContent() {
      return {
        height: `${this.height}px`
      }
    },
    dialogBox() {
      return {
        width: `${this.width}px`
      }
    }
  },
  methods: {
    close() {
      //要改变父组件的值，要用自定义事件
      this.$emit('update:show', false)
    },
    confirm() {
      this.$emit('confirm')
    },
    concel() {
      this.$emit('concel')
    }
  }
}
</script>

<style lang="less">
.dia-mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(153, 153, 153, 0.6);
  //table的padding会失效
  display: table;

  .dia-box {
    //margin设置会失效
    display: table-cell;
    vertical-align: middle;
  }
  .dia-wrapper {
    margin: 0 auto;
    background-color: #fff;
    text-align: center;
  }
  .dia-header {
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-radius: 4px 4px 0 0;
    font-size: 18px;
    //定义字体粗细
    font-weight: bold;
    color: black;
    position: relative;
  }
  .dialog-title {
    border-bottom: 1px solid #efefef;
  }
  .dia-close {
    position: absolute;
    right: 26px;
    top: 16px;
    color: #bdbdbd;
  }
  .dia-content {
    height: 120px;
    line-height: 120px;
  }
  .dia-define {
    margin-right: 40px;
  }
}
</style>
