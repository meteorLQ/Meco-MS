import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';
import cookie from 'js-cookie';
import { message } from 'ant-design-vue';
import request from '../utils/request';

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
    meta: {
      specialLayout: true,
    }
  },
  {
    path: '/login',
    name: '登录',
    component: () => import('../views/Login.vue'),
    meta: {
      specialLayout: true,
    }
  },
  {
    path: '/dashboard',
    name: '后台总览',
    component: () => import('../views/Dashboard.vue'),
  },
  {
    path: '/pages',
    name: '文章管理',
    component: () => import('../views/Pages.vue'),
  },
  {
    path: '/messages',
    name: '消息管理',
    component: () => import('../views/Messages.vue'),
  },
  {
    path: '/search',
    name: '全局搜索',
    component: () => import('../views/Search.vue')
  },
  {
    path: '/test-page',
    name: '测试页面',
    component: () => import('../views/TestPage.vue')
  },
  {
    path: '/server-log',
    name: '服务器日志',
    component: () => import('../views/ServerLog.vue'),
  },
  {
    path: '/edit/:path',
    name: '编辑文章',
    component: () => import('../views/NewPage.vue'),
    // meta: {
    //   specialLayout: true,
    // }
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/404.vue'),
    meta: {
      specialLayout: true,
    }
  },
  { path: '/:pathMatch(.*)*', redirect: '/404' },
];

const allowList:string[] = ['/login', '/404', '/403']

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (allowList.includes(to.path)) {
    next();
  }
  else if (cookie.get('logged')) {
    next();
  }
  else {
    next();
    // new Promise((resolve, reject): void => {
    //   request({
    //     url: '/api/admin/logged',
    //     method: 'get',
    //   })
    //   .then(res => {
    //     if (res.data.code == '1000') {
    //       cookie.set('logged', '1');
    //       resolve(res)
    //     }
    //     else if (res.data.code == '2000') {
    //       message.error('请先登录~')
    //       next('/login')
    //       resolve(res)
    //     }
    //     else {
    //       reject(new Error("数据返回异常"))
    //     }
    //   })
    //   .catch(err => {
    //     reject(err)
    //   })
    // });
  }
});


export default router