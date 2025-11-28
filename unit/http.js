import store from "@/store/index.js";
import i18n from '@/unit/locales/index.js'
const lang = i18n.messages[i18n.locale]
// const { base64decode, base64encode } = require("nodejs-base64");
// import CryptoJS from "crypto-js";
// import md5 from "js-md5";

const titleMsg = ""

export default {
	request: (method, url, data = {}, header = {}) => {
		if ((!url.includes('product/getProductList')) && (!url.includes('product/getKline'))) {
			uni.showLoading({
				title: titleMsg,
				mask: true,
			});
		}

		return new Promise((reslove, reject) => {
			uni.request({
				url,
				data,
				method,
				header: {
					...header,
					"TOKEN": uni.getStorageSync('token'),
					// "Authorization": store.state.uid,
					"lang": uni.getStorageSync('lang')
				},
				success: (result) => {
					reslove(result);
				},
				fail: (fail) => {
					reject(fail);
				},
				complete: (result) => {
					// 401:重新登录
					// 1:正常返回
					// 0:报错，提示信息
					if ((!url.includes('product/getProductList')) && (!url.includes(
							'product/getKline'))) {
						uni.hideLoading();
					}
					if (result.data.code === 0) {
						uni.showToast({
							title: result.data.msg,
							icon: "none",
							duration: 2000,
						});
					} else if (result.data.code === 2) {
						uni.showModal({
							title: lang.prompt,
							content: result.data.msg,
							showCancel:true,
							cancelText:lang.cancel,
							confirmText:lang.confirm,
							success: function (res) {
								if (res.confirm) {
									window.location.href = uni.getStorageSync('service')
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						});
					} else if (result.data.code === 402) {
						uni.reLaunch({
							url: '/pages/tabbarPages/mine/authentication'
						})
					} else if (result.data.code === 401) {
						store.commit('setToken', '')
						store.commit('setUid', '')
						uni.showToast({
							title: result.data.msg,
							icon: 'none'
						})
						setTimeout(() => {
							uni.reLaunch({
								url: '/pages/userPages/login'
							})
						}, 1000)
					}
				},
			});
		});
	},
	upload: (url, filePath, header = {}) => {
		uni.showLoading({
			title: titleMsg,
			mask: true,
		});
		return new Promise((reslove, reject) => {
			uni.uploadFile({
				url,
				filePath,
				header: {
					...header,
					"TOKEN": store.state.token,
					"Authorization": store.state.uid,
				},
				formData: {
					directory: "authorization",
				},
				name: "imgPath",
				success: (result) => {
					reslove(result);
				},
				fail: (fail) => {
					reject(fail);
				},
				complete: (result) => {
					uni.hideLoading();
				},
			});
		});
	},
};