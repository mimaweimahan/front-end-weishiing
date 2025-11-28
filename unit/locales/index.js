import VueI18n from 'vue-i18n'
import store from '@/store/index.js'
import Vue from 'vue'
Vue.use(VueI18n)

import en from './en.json';
import zh from './zh.json';
import de from './de.json';
import fr from './fr.json';
import ko from './ko.json';
import es from './es.json';
import hi from './hi.json';

const langlist = {
	en: 'English',
}

var lang = uni.getStorageSync('lang');
if (!lang) {
	lang = 'zh-cn'
	uni.setStorageSync('lang', lang)
}

const i18n = new VueI18n({
	locale: lang,
	messages: {
		'en-us': en,
		'zh-cn': zh,
		'de-de': de,
		'fr-fr': fr,
		'ko-kr': ko,
		'es-es': es,
		'hi-in': hi
	}
})
export default i18n