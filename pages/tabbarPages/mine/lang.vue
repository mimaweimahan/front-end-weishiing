<template>
	<view class="index">
		<navTop :title="$t('set.txt2')"></navTop>
		<view class="content">
			<view class="data" v-for="(item,index) in list" :key="index" @click="changeLang(item,index)">
				<view class="left">
					<image :src="item.img" mode=""></image>
					<view class="text">{{item.title}}</view>
				</view>
				<image src="../../../static/images/check.png" mode="" v-if="langIndex==index"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				langIndex:0,
				list:[
					{
						img:'../../../static/lang/lang.en-us.png',
						code:'en-us',
						title:'English'
					},
					{
						img:'../../../static/lang/lang.zh-cn.png',
						code:'zh-cn',
						title:'中文'
					},
					// {
					// 	img:'../../../static/lang/lang.de-de.png',
					// 	code:'de-de',
					// 	title:'Deutsche'
					// },
					// {
					// 	img:'../../../static/lang/lang.fr-fr.png',
					// 	code:'fr-fr',
					// 	title:'Français'
					// },
					// {
					// 	img:'../../../static/lang/lang.ko-kr.png',
					// 	code:'ko-kr',
					// 	title:'조선어'
					// },
					// {
					// 	img:'../../../static/lang/lang.es-es.png',
					// 	code:'es-es',
					// 	title:'Español'
					// },
					// {
					// 	img:'../../../static/lang/lang.hi-in.png',
					// 	code:'hi-in',
					// 	title:'हिन्दी'
					// }
				]
			}
		},
		onShow() {
			this.list.forEach((item,index)=>{
				if(item.code==uni.getStorageSync('lang')){
					this.langIndex = index
				}
			})
		},
		methods: {
			changeLang(item,index){
				this.langIndex = index
				this.$i18n.locale = item.code
				this.$store.commit('setLang', item.code);
				uni.showToast({
					icon:'success'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.index {
		min-height: 100vh;
		background-color: rgba(251, 114, 8, 0.05);
	}

	.content {
		margin-top: 10px;
		.data {
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid #ddd;
			padding: 10px 3% ;
			background-color: #fff;
			image{
				width: 20px;
				height: 20px;
				border-radius: 50%;
			}
			
			.left{
				display: flex;
				align-items: center;
				image{
					margin-right: 10px;
				}
			}
		}
	}
</style>