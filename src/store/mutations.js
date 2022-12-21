import Vue from 'vue'

const mutations = {
  //将拿到的商品信息放到state里面去obj就是商品信息
  ADD_SHOPCART(state, obj) {
    //判断当前数据在购物车是否存在
    let haveData = false
    state.shopcarData.forEach((item) => {
      if (item.id === obj.data.id) {
        haveData = true
        item.count += obj.num
      }
    })
    if (!haveData) {
      //set 给obj.data创建一个属性 count
      Vue.set(obj.data, 'count', obj.num)
      Vue.set(obj.data, 'checked', true)
      state.shopcarData.push(obj.data)
    }
    console.log(state.shopcarData)
  },
  INCREASE_SHOPCART(state, id) {
    state.shopcarData.forEach((item) => {
      if (item.id === id) {
        item.count++
      }
    })
  },
  REDUCE_SHOPCART(state, id) {
    state.shopcarData.forEach((item) => {
      if (item.id === id && item.count > 0) {
        item.count--
      }
    })
  },
  CHECK_Goods(state, id) {
    state.shopcarData.forEach((item) => {
      if (item.id === id) {
        item.checked = !item.checked
      }
    })
  },
  CHECK_ALL_GOODS(state, checked) {
    state.shopcarData.forEach((item) => {
      item.checked = !checked
    })
  },
  DEL_SHOPCAR(state, id) {
    state.shopcarData.forEach((item, index) => {
      if (item.id === id) {
        //将点击的这条数据删除
        state.shopcarData.splice(index, 1)
      }
    })
  },
  REMOVE_GOODS(state) {
    state.shopcarData = state.shopcarData.filter((item) => !item.checked)
  }
}
//8.8可以多听一遍
export default mutations
