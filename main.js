import App from './App'
import http from '@/unit/http.js'
import apis from '@/unit/api.js'
import store from './store/index.js'
import i18n from '@/unit/locales/index.js';

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
import uView from "uview-ui";
Vue.use(uView);
Vue.config.productionTip = false
Vue.prototype.$store = store;
Vue.prototype.$http = http;
Vue.prototype.$apis = apis;

Vue.prototype.timestampToDate = (timestamp) => {
	let date = new Date(timestamp); // 转换为Date对象
	// 获取年月日时分秒
	let year = date.getFullYear();
	let month = ('0' + (date.getMonth() + 1)).slice(-2); // 月份是从0开始的
	let day = ('0' + date.getDate()).slice(-2);
	let hours = ('0' + date.getHours()).slice(-2);
	let minutes = ('0' + date.getMinutes()).slice(-2);
	let seconds = ('0' + date.getSeconds()).slice(-2);
	// 组合成 yyyy-mm-dd HH:mm:ss 格式
	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

Vue.prototype.go = (url = '/pages/userPages/login') => {
	uni.navigateTo({
		url
	})
}
Vue.prototype.to = (url = '') => {
	uni.switchTab({
		url
	})
}

App.mpType = 'app'
const app = new Vue({
	...App,
	store,
	i18n,
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif