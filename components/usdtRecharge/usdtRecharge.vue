<template>
	<view class="index">
		<u-icon style="padding: 5px 10px 0 10px;" name="arrow-leftward" color="#333" size="40" @click="back"></u-icon>
		<view class="content">
			<view class="title">{{$t('recharge.txt13')}}</view>
			<view class="dataView">
				<view class="data" @click="select(0)">
					<view class="left">
						<image src="../../static/images/usdt.png" mode=""></image>
						<view class="text">{{$t('recharge.txt14')}}</view>
					</view>
					<view class="right">{{$t('recharge.txt15')}}</view>
				</view>
			</view>

			<view class="amount">
				<view class="text">{{$t('recharge.txt8')}}</view>
				<view class="input">
					<u-input v-model="amount" type="text" :placeholder="$t('recharge.txt9')"
						placeholder-style="font-size:20px;color:rgb(192, 196, 204);" />
				</view>
				<!-- <view class="bom">≈ {{amount}} $</view> -->
			</view>

			<view class="tip">
				{{$t('recharge.txt16')}}
			</view>
		</view>
		<view class="btn">
			<view class="confirm" @click="recharge">{{$t('recharge.txt11')}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				country: '',
				bill: '',
				amount: '',
				show: false,
				selectorCountry: [1, 2, 3],
				selectorBill: [4, 5, 6],
				selector: [],
				isClick:false
			}
		},
		mounted() {
		},
		methods: {
			back() {
				this.$emit('back')
			},
			select(e) {
				if (e == 0) {
					this.selector = this.selectorCountry
				} else {
					this.selector = this.selectorBill
				}
				this.show = true
			},
			getConfig() {
				this.$http.request('GET', this.$apis.getConfig,{
					keyword:'address'
				}).then(res => {
					if (res.data.code == 1) {
						if(!res.data.data.address){
							uni.showToast({
								title:this.$t('recharge.txt17'),
								icon:'none'
							})
							setTimeout(()=>{
								this.go('/pages/tabbarPages/mine/payment')
							},2000)
						}
					}
				}).finally(res => {})
			},
			recharge() {
				if(this.isClick){
					return
				}else{
					this.isClick = true
				}
				this.$http.request('POST', this.$apis.recharge, {
					amount: this.amount,
					type: 2
				}).then(res => {
					if (res.data.code == 1) {
						this.amount = ''
						uni.showToast({
							title:res.data.msg,
							icon:'none'
						})
						setTimeout(()=>{
							uni.navigateBack({
								delta:1
							})
						},1000)
					}
				}).finally(res => {
					this.isClick = false
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.index {
		min-height: 100vh;
		background-color: #eff1f3;
		padding: 5px 0px;

		.content {
			padding: 0 15px;
		}

		.title {
			font-size: 28px;
			weight: 800;
			padding: 20px 0;
		}

		.dataView {
			margin-top: 10px;
			background: #ffffff;
			border-radius: 8px;
			padding: 10px 20px;

			.data {
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 14px;

				.left {
					display: flex;
					align-items: center;
					font-size: 16px;

					image {
						width: 36px;
						height: 36px;
						border-radius: 50%;
						margin-right: 10px;
					}
				}

				.right {
					text-align: right;
					margin-right: 16px;
					color: rgb(135, 163, 197);
				}
			}
		}

		.amount {
			margin-top: 12px;
			background: #ffffff;
			border-radius: 8px;
			padding: 15px;

			.text {
				font-size: 16px;
			}

			.input {
				margin-top: 10px;
			}

			.bom {
				font-size: 12px;
				color: #9796A5;
			}
		}

		.tip {
			font-size: 16px;
			color: #9796A5;
			margin-top: 12px;
			padding: 0px 16px 0px;
		}

		.btn {
			position: fixed;
			width: 100%;
			bottom: 30px;
			padding: 0 15px;

			.confirm {
				width: 100%;
				padding: 10px 0;
				text-align: center;
				background-color: #FB7208;
				color: #fff;
				border-radius: 5px;
			}
		}
	}
</style>