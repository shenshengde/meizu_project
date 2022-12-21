<template>
  <div class="fiter-header">
    <ul class="filter-box">
      <li class="box-item clearfix" v-for="(item, index) in data" :key="index">
        <div class="filter-title fl">{{ item.name }}:</div>
        <ul class="fl">
          <li
            class="filter-item fl"
            :class="{ active: activeFilter[item.key] === info.value }"
            v-for="(info, ii) in item.queryList"
            :key="ii"
            @click="changeFilter(item.key, info.value)"
          >
            {{ info.name }}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'filter-box',
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      activeFilter: {}
    }
  },
  methods: {
    changeFilter(key, val) {
      //“$set用来更新数组或对象 $set接收3个参数,参数1:参数是需要更新的数组或对象,
      //参数2:是数组的下标或者对象的属性名,参数3:是更新的内容 ”
      this.$set(this.activeFilter, key, val)
      console.log(key, val)
      this.$emit('filter', this.activeFilter)
    }
  }
}
</script>

<style lang="less" scoped>
.filter-box {
  background: white;
  padding: 15px 10px;
  height: 181px;

  .box-item {
    line-height: 46px;
    height: 60px;
    text-align: center;
  }

  .filter-title {
    width: 85px;
    padding-left: 10px;
    white-space: nowrap;
    color: #333;
    overflow: hidden;
    text-align: center;
  }

  .filter-item {
    cursor: pointer;
    margin-left: 62px;

    &.active {
      color: #00c3f5;
    }
  }
}
</style>
