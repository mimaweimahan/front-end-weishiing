<template>
	<view class="index">
		<u-icon style="padding: 5px 10px 0 10px;" name="arrow-leftward" color="#333" size="40" @click="back"></u-icon>
		<view class="content">
			<view class="title">{{$t('withdrawal.txt17')}}</view>
			<view class="dataView">
				<view class="data" @click="show = true">
					<view class="text">{{$t('withdrawal.txt18')}}</view>
					<view class="right">
						<text>{{bank}}</text>
						<u-icon name="arrow-right" color="#999" size="28"></u-icon>
					</view>

				</view>
			</view>

			<view class="amount">
				<view class="remainder">
					{{$t('withdrawal.txt19')}}: {{userInfo.money}} 
				</view>
				<view class="other">
					<view class="text">{{$t('withdrawal.txt20')}}</view>
					<view class="input">
						<u-input v-model="amount" type="text" :placeholder="$t('withdrawal.txt21')"
							placeholder-style="font-size:20px;color:rgb(192, 196, 204);" />
						<view class="all" @click="all">{{$t('withdrawal.txt22')}}</view>
					</view>
					<!-- <view class="bom">≈ 0.00 ({{$t('withdrawal.txt23')}})</view> -->
				</view>
				<view class="fee">{{$t('other.txt24')}}：{{(amount * (fee * 0.01))}}</view>
			</view>
			<!-- <view class="balance">sfsagfsebnb</view>
			<view class="tip">
				To protect your funds, please contact your online customer before remittances. Make sure your cash card
				or credit card is successfully used. After you have completed the remittance, please send the completed
				picture with the picture.
			</view> -->
			<view class="pwdData">
				<u-input v-model="pay_password" label-width="0" :border-bottom="false" password type="number"
					:placeholder="$t('other.txt11')" :field-style="style" :placeholder-style="pStyle" maxlength="6">
				</u-input>
			</view>
		</view>
		<view class="btn">
			<view class="confirm" @click="withdraw">{{$t('withdrawal.txt24')}}</view>
		</view>
		<!-- range-key为cateName -->
		<u-picker range-key="account" mode="selector" v-model="show" :range="selector" @confirm="confirm"></u-picker>
	</view>
</template>

<script>
	export default {
		props:{
			fee:{
				type:Number,
				default:0
			}
		},
		data() {
			return {
				amount: '',
				show: false,
				selector: [],
				userInfo: {},
				bank: '',
				bankId: '',
				isClick: false,
				pay_password: '',
				style: {
					paddingLeft: '5px',
					height: '20px'
				},
				pStyle: "color:#999",
			}
		},
		mounted() {
			// this.getUserinfo()
			
		},
		methods: {
			back() {
				this.$emit('back')
			},
			confirm(e) {
				let index = e[0]
				this.bank = this.selector[index].account
				this.bankId = this.selector[index].id
			},
			all() {
				this.amount = this.userInfo.money
			},
			getUserinfo() {
				this.$http.request('GET', this.$apis.getUserinfo).then(res => {
					if (res.data.code == 1) {
						this.userInfo = res.data.data
						if (!this.userInfo.pay_password) {
							uni.showToast({
								title: this.$t('other.txt14'),
								icon: 'none'
							})
							setTimeout(() => {
								uni.navigateTo({
									url: '/pages/tabbarPages/mine/changePayPwd'
								})
							}, 1000)
						}
					}
				}).finally(res => {})
			},
			getUserBankList() {
				this.$http.request('GET', this.$apis.getUserBankList).then(res => {
					if (res.data.code == 1) {
						if (res.data.data.length == 0) {
							uni.showToast({
								title: this.$t('recharge.txt17'),
								icon: 'none'
							})
							setTimeout(() => {
								this.go('/pages/tabbarPages/mine/payment')
							}, 2000)
						} else {
							this.selector = res.data.data
						}
					}
				}).finally(res => {})
			},
			withdraw() {
				if (this.isClick) {
					return
				} else {
					this.isClick = true
				}
				this.$http.request('POST', this.$apis.withdraw, {
					amount: this.amount,
					type: 1,
					bank_id: this.bankId,
					pay_password:this.pay_password
				}).then(res => {
					if (res.data.code == 1) {
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						})
						this.bank = ''
						this.amount = ''
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 1000)
					}
				}).finally(res => {
					this.isClick = false
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.pwdData {
		margin-bottom: 20px;
		border: 1px solid #e7eaed;
		border-radius: 8px;
		background-color: #fff;
		margin-top: 20px;
		padding: 0 20px;
	}

	.u-field {
		padding: 10px 15px;
	}

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
			padding: 15px;

			.data {
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 14px;

				.text {
					width: 28%;
				}
			}
		}

		.amount {
			margin-top: 12px;
			background-color: rgba(251, 114, 8, 0.2);
			padding: 5px;
			border-radius: 8px;

			.remainder {
				padding: 10px;
				color: #FB7208;
			}
			.fee{
				padding: 5px 5px 0 ;
				color: #FB7208;
				// text-align: right;
			}

			.other {
				background: #ffffff;
				border-radius: 8px;
				padding: 15px;
			}

			.text {
				font-size: 16px;
			}

			.input {
				margin-top: 10px;
				display: flex;
				align-items: center;

				.all {
					background-color: #FB7208;
					color: #fff;
					padding: 5px 10px;
					border-radius: 3px;
				}
			}

			.bom {
				font-size: 12px;
				color: #9796A5;
			}
		}

		.balance {
			font-size: 10px;
			color: rgb(151, 150, 165);
			margin-top: 10px;
			padding: 0px 16px 0px;
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