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
    path: '/hamburger',
    name: 'home',
    component: HomeView,
    redirect: '/hamburger/menu-list',
    children:[
      {
        path: '/hamburger/add-menu',
        component: () => import('../views/addMenu/AddMenuView'),
        meta: {
          title: 'Add - Menu'
        }
      },
      {
        path: '/hamburger/menu-list',
        component: () => import('../views/addMenu/MenuListView'),
        meta: {
          title: 'Menu - List'
        }
      },
      {
        path: '/hamburger/order-management',
        component: () => import('../views/orderManagement/OrderManagementView.vue'),
        meta: {
          title: 'Order - Management'
        }
      },
      {
        path: '/hamburger/admin',
        component: () => import('../views/admin/AddAdminView'),
        meta: {
          title: 'Add - Admin'
        }
      },
      {
        path: '/hamburger/admin-list',
        component: () => import('../views/admin/AdminListView'),
        meta: {
          title: 'Admin - List'
        }
      },
    ]
  },
  {
    path: '/hamburger/menu',
    component: () => import('../views/hamburgerMenu/HamburgerMenuView.vue'),
    meta: {
      title: 'Hamburger - Menu'
    }
  },
  {
    path: '/hamburger/menu/shopping-car',
    component: () => import('../views/shoppingCar/ShoppingCarView.vue'),
    meta: {
      title: 'Shopping - Cart'
    }
  },
  {
    path: '/hamburger/login',
    component: () => import('../views/login/LoginView'),
    meta: {
      title: 'Admin - Login'
    }
  },
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