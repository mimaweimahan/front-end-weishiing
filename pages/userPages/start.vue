<template>
	<view>
		<swiper class="swiper" indicator-dots auto-height="true" @animationfinish="end">
			<swiper-item v-for="(item,index) in list" :key="index">
				<image :src="item" mode="widthFix"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [
					'../../static/start/start1.jpg?b=1',
					'../../static/start/start2.jpg?b=2',
					'../../static/start/start3.jpg?b=3'
				]
			}
		},
		onShow() {
			if(uni.getStorageSync('isLogin') && !uni.getStorageSync('token')){
				uni.reLaunch({
					url:'/pages/userPages/login'
				})
			}
			
			if(uni.getStorageSync('isLogin') && uni.getStorageSync('token')){
				uni.switchTab({
					url:'/pages/tabbarPages/home/index'
				})
			}
		},
		methods: {
			end(e){
				if(e.detail.current==this.list.length-1){
					this.go('/pages/userPages/login')
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.swiper {
		height: 100vh;
		background-color: #fff9f3;
		position: relative;

		image {
			position: absolute;
			width: 100%;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			/* 通过 transform 实现居中 */
		}
	}
</style>