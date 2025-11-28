<template>
	<view class="index">
		<view class="content">
			<u-icon name="arrow-left" color="#fff" size="50" @click="back"></u-icon>

			<view class="data">
				<view class="left">
					<view class="text text1">{{$t('help.txt1')}}</view>
					<view class="text text2">{{$t('help.txt2')}}</view>
				</view>
				<image src="../../../static/images/kefu.png" mode="" ></image>
			</view>
			
			
		</view>
		
		<view class="cardList">
			<view class="card" @click="go('/pages/tabbarPages/home/about')">
				<view class="left">
					<!-- <image src="../../../static/images/mine4.png" mode=""></image> -->
				</view>
				<view class="right">
					<view class="text">{{$t('other.txt9')}}</view>
					<u-icon name="arrow-right" color="rgba(251, 114, 8,0.5)" size="40"></u-icon>
				</view>
			</view>
			<view class="card" @click="go('/pages/tabbarPages/home/license')">
				<view class="left">
					<!-- <image src="../../../static/images/mine4.png" mode=""></image> -->
				</view>
				<view class="right">
					<view class="text">{{$t('other.txt10')}}</view>
					<u-icon name="arrow-right" color="rgba(251, 114, 8,0.5)" size="40"></u-icon>
				</view>
			</view>
			<view class="card" @click="go('/pages/tabbarPages/home/companyProfile')">
				<view class="left">
					<!-- <image src="../../../static/images/mine4.png" mode=""></image> -->
				</view>
				<view class="right">
					<view class="text">{{$t('other.txt15')}}</view>
					<u-icon name="arrow-right" color="rgba(251, 114, 8,0.5)" size="40"></u-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			back(){
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.index {
		min-height: 100vh;
		background: rgba(251, 114, 8, 0.05);
	}
	.content {
		background-color: #FB7208;
		color: #fff;
		padding: 5px 0 0 5px;

		.data {
			padding: 0 0 0 10px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 10px;

			image {
				width: 128px;
				height: 120px;
			}

			.text1 {
				font-size: 30px;
				font-weight: bold;
				margin-bottom: 5px;
			}
		}
	}
	
	.cardList{
		background-color: #fff;
		margin: 15px;
		border-radius: 10px;
	}
	
	.card {
		display: flex;
		padding: 5px 3%;
		align-items: center;
		
		image {
			width: 20px;
			height: 20px;
		}
	}
	.card:nth-last-child(1) {
		.right {
			border: none;
		}
	}
	
	.left {
		display: flex;
		align-items: center;
	}
	
	.right {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex: 1;
		margin-left: 3%;
		border-bottom: 1px solid #eee;
		padding-bottom: 10px;
		margin-top: 10px;
	}
</style>