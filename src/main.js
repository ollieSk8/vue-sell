import Vue from 'vue';
import VueRouter from 'vue-router';
import routeConfig from './route-config';
import App from './App';
import 'common/less/index.less';
Vue.use(VueRouter);
/* eslint-disable no-new */
const router = new VueRouter({
  linkActiveClass: 'active'
});
router.map(routeConfig);
router.redirect({
  '/': '/goods'
});
router.start(App, '#app');
