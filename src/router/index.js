import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    // 因為被嵌套的<router-view>是在HomeView中的，所以將在此處理配置嵌套路由
    // 使用children來配置子級路由，children子級的配置方式與routes子級的配置方式相同
    // 通常，應該配置redirect屬性，表示重定向，因為一旦發現嵌套，原來的視圖（例如HomeView）是不完整的，不應該允許直接訪問
    // 以下配置重定向的效果：一旦訪問 / 路徑，就會自動跳轉到 /user/list 路徑
    path: '/',
    name: 'home',
    component: HomeView,
    redirect: '/hamburger/menu',
    children:[

      {
        path: '/hamburger/menu/shopping-car',
        component: () => import('../views/ShoppingCar/ShoppingCarView.vue'),
        meta: {
          title: 'shopping cart'
        }
      },

    ]
  },
  {
    path: '/hamburger/menu',
    component: () => import('../views/HamburgerMenu/HamburgerMenuView.vue'),
    meta: {
      title: 'Hamburger Menu'
    }
  },
  {
    path: '/hamburger/order-management',
    component: () => import('../views/OrderManagement/OrderManagementView.vue'),
    meta: {
      title: 'Hamburger Menu'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router



router.beforeEach((to, from, next)=>{

  if(to.meta.title){ // if判斷， 沒有設置標題的頁面使用默認值
    document.title = to.meta.title;
  }

  next(); //"放行"
})