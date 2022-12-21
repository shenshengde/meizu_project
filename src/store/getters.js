const getters = {
  IsAllChecked(state) {
    let checked = true
    state.shopcarData.forEach((item) => {
      if (!item.checked) {
        checked = false
      }
    })
    return checked
  },
  checkedgoodsTotal(state) {
    let total = 0
    state.shopcarData.forEach((item) => {
      if (item.checked) {
        total += item.count
      }
    })
    return total
  },
  chechedgoodsPrice(state) {
    let total = 0
    state.shopcarData.forEach((item) => {
      if (item.checked) {
        total += item.count * item.goodsPrice
      }
    })
    return total
  },
  ShopcarTotal(state) {
    let total = 0
    state.shopcarData.forEach((item) => {
      total += item.count
    })
    return total
  }
}
export default getters
