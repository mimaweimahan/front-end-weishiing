<template>
	<view class="index">
		<u-icon class="icon" name="arrow-leftward" color="#333" size="40" @click="toBack" v-if="type==-1"></u-icon>
		<u-popup v-model="show" mode="bottom" height="92%" border-radius="40" :mask-custom-style="maskStyle">
			<view class="pop">
				<view class="title">{{$t('recharge.txt1')}}</view>
				<!-- <view class="data" @click="change(0)">
					<view class="left">
						<image src="../../../static/images/bank.png" mode=""></image>
						<view class="text">{{$t('recharge.txt3')}}</view>
					</view>
					<u-icon name="arrow-right" color="#999" size="28"></u-icon>
				</view> -->
				<view class="data" @click="change(1)">
					<view class="left">
						<image src="../../../static/images/coin.png" mode=""  style="width: 25px;height: 25px;"></image>
						<view class="text">{{$t('recharge.txt2')}}</view>
					</view>
					<u-icon name="arrow-right" color="#999" size="28"></u-icon>
				</view>
			</view>
		</u-popup>
		<bankTransfer @back="back" v-show="type==0"></bankTransfer>
		<usdtRecharge ref="usdtRecharge" @back="back" v-show="type==1"></usdtRecharge>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: true,
				type: -1,
				maskStyle: {
					display:'none'
				},
				address:''
			}
		},
		onShow() {
		},
		methods: {
			back() {
				this.type = -1
				this.show = true
			},
			change(type) {
				this.type = type
				this.show = false
				if(this.type==0){
					
				}else{
					this.$refs.usdtRecharge.getConfig()
				}
			},
			toBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.icon {
		position: absolute;
		top: 10px;
		left: 10px;
		z-index: 999999999999;
	}

	.index {
		min-height: 100vh;
		background-color: #eff1f3;
		// padding: 5px 10px;
	}

	.pop {
		padding: 20px 15px;

		.title {
			font-size: 28px;
			weight: 800;
			margin-bottom: 8px;
		}

		.data {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20px 0px 20px;

			.left {
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 20px;


				image {
					width: 30px;
					height: 30px;
				}

				.text {
					margin-left: 12px;
				}
			}
		}

		.data:nth-child(2) {
			border-bottom: 1px solid #eee;
		}
	}
</style>