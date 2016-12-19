import Vue from 'vue';
import VueRouter from 'vue-router';
import routeConfig from './route-config';
import App from './App';
Vue.use(VueRouter);
/* eslint-disable no-new */
const router = new VueRouter();
router.map(routeConfig);
router.redirect({
  '/': '/goods'
});
router.start(App, '#app');
