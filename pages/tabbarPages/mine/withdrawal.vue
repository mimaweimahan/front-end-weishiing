<template>
	<view class="index">
		<u-icon class="icon" name="arrow-leftward" color="#333" size="40" @click="toBack" v-if="type==-1"></u-icon>
		<u-icon class="icon2" name="edit-pen" color="#333" size="40"
			@click="go('/pages/tabbarPages/mine/payment')"></u-icon>
		<u-popup v-model="show" mode="bottom" height="92%" border-radius="40" :mask-custom-style="maskStyle">
			<view class="pop">
				<view class="title">{{$t('withdrawal.txt1')}}</view>
				<view class="data" @click="change(0)">
					<view class="left">
						<image src="../../../static/images/bank.png" mode=""
							style="width: 20px;height: 20px;margin-left: 2px;"></image>
						<view class="text">{{$t('withdrawal.txt2')}}</view>
					</view>
					<u-icon name="arrow-right" color="#999" size="28"></u-icon>
				</view>
				<view class="data" @click="change(1)">
					<view class="left">
						<image src="../../../static/images/coin.png" mode="" style="width: 25px;height: 25px;"></image>
						<view class="text">{{$t('withdrawal.txt3')}}</view>
					</view>
					<u-icon name="arrow-right" color="#999" size="28"></u-icon>
				</view>
			</view>
		</u-popup>
		<tengyoZhen ref="tengyoZhen" @back="back" v-show="type==0" :fee="withdrawal_fee"></tengyoZhen>
		<digitalCurrency ref="digitalCurrency" @back="back" v-show="type==1" :fee="withdrawal_fee"></digitalCurrency>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: true,
				type: -1,
				maskStyle: {
					display: 'none',
				},
				withdrawal_fee:undefined
			}
		},
		onShow() {
			this.getConfig()
			if (!this.show) {
				if (this.type == 0) {
					this.$refs.tengyoZhen.getUserBankList()
					this.$refs.tengyoZhen.getUserinfo()
				} else {
					this.$refs.digitalCurrency.getUserAddressList()
					this.$refs.digitalCurrency.getUserinfo()
				}
			}

		},
		methods: {
			getConfig() {
				this.$http.request('GET', this.$apis.getConfig, {
					keyword: 'withdrawal_fee'
				}).then(res => {
					if (res.data.code == 1) {
						this.withdrawal_fee=res.data.data.withdrawal_fee * 1
					}
				}).finally(res => {})
			},
			back() {
				this.type = -1
				this.show = true
			},
			change(type) {
				this.type = type
				this.show = false
				if (this.type == 0) {
					this.$refs.tengyoZhen.getUserBankList()
					this.$refs.tengyoZhen.getUserinfo()
				} else {
					this.$refs.digitalCurrency.getUserAddressList()
					this.$refs.digitalCurrency.getUserinfo()
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

	.icon2 {
		position: absolute;
		top: 10px;
		right: 10px;
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


				// image {
				// 	width: 25px;
				// 	height: 25px;
				// }

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