// store.js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		token: '',
		uid: '',
		lang: 'en-us',
		userList: [],
		service:''
	},
	mutations: {
		setToken(state, value) {
			state.token = value;
			uni.setStorageSync('token', value)
		},
		setUid(state, value) {
			state.uid = value;
			uni.setStorageSync('uid', value)
		},
		setLang(state, value) {
			state.lang = value;
			uni.setStorageSync('lang', value)
		},
		setUsers(state, value) {
			var has = false
			state.userList.forEach((item,index)=>{
				if(item.id==value.id){
					has = true
					item = value
				}
			})
			if(!has){
				state.userList.push(value)
			}
			uni.setStorageSync('userList', state.userList)
		},
		setService(state, value){
			state.service = value;
			uni.setStorageSync('service', value)
		}
	},
	actions: {

	},
	getters: {
		token: state => state.token,
		uid: state => state.uid,
	}
});

export default store;