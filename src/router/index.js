
import {createWebHashHistory,createRouter}  from 'vue-router'
// @ts-ignore
import Login from '../views/LoginView.vue'
const routes = [{ 
    path: '/', 
    name:'Page', 
    // @ts-ignore
    component: () => import('../views/Page.vue'), 
    redirect: '/login',
    // redirect: to => {
    //     console.log(to);
    //     return {
    //       path: '/login',
    //       query: {
    //         name: '欢迎'
    //       }
    //     }
    //   },
    children: [
    
    { 
        path: '/login', 
        name:'Login', 
        // @ts-ignore
        component: () => import('../views/LoginView.vue')
    },
    { 
      path: '/heartModel', 
      name:'heartModel', 
      // @ts-ignore
      component: () => import('../views/heartModel.vue')
  },{ 
    path: '/home', 
    name:'home', 
    // @ts-ignore
    component: () => import('../views/HomeView.vue')
}
    
]
  }];
    const hash =createWebHashHistory();
   const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: hash,
    routes, // `routes: routes` 的缩写
  })
  // @ts-ignore
  router.beforeEach((to, from, next) => {
    if (to.path == '/login') {
        // 登录或者注册才可以往下进行
        next();
    } else {
        // 获取 token
        const token = sessionStorage.getItem('Authorization'); 
        // token 不存在
        if (token === null || token === '') {
            // alert('您还没有登录，请先登录');
            next('/login');
        } else {
            next();
        }
    }
});

  export default router