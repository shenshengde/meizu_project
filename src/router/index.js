import Vue from 'vue'
import Router from 'vue-router'
import Index from '../views/index'
import Category from '../views/category'
import Detail from '../views/detail'
import Shopcart from '../views/Shopcart'
import Order from '../views/order'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/category/:id?',
      name: 'Category',
      component: Category
    },
    {
      path: '/detail/:id',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/shopcart/:id',
      name: 'Shopcart',
      component: Shopcart
    },
    {
      path: '/order/:id',
      name: 'Order',
      component: Order
    }
  ]
})
