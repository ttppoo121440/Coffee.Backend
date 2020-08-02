import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '@/layout';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login'),
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import(/* webpackChunkName: "Home" */ '@/views/Home'),
      },
      {
        path: '/products',
        name: 'Products',
        component: () => import(/* webpackChunkName: "Products" */ '@/views/Products'),
      },
      {
        path: '/picture',
        name: 'Picture',
        component: () => import(/* webpackChunkName: "Picture" */ '@/views/Picture'),
      },
      {
        path: '/coupons',
        name: 'Coupons',
        component: () => import(/* webpackChunkName: "Coupons" */ '@/views/Coupons'),
      },
      {
        path: '/order',
        name: 'Order',
        component: () => import(/* webpackChunkName: "Order" */ '@/views/Order'),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savePosition) {
    if (savePosition) {
      return savePosition;
    }
    if (to.hash) {
      return { selector: to.hash };
    }
    return { x: 0, y: 0 };
  },
});

export default router;
