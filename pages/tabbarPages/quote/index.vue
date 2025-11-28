<template>
	<view>
		<view class="content">
			<navTop :title="$t('tabbar')[1]" :isBack="false"></navTop>

			<view class="data">
				<!-- <view class="header">
					<view class="text">product</view>
					<view class="text">Latest price</view>
					<view class="text">Rise and fall</view>
				</view> -->
				<view class="yDataList">
					<view class="data" v-for="(item,index) in list" :key="index" @click="toDetail(item)">
						<view class="left">
							<view class="name">{{item.title}}</view>
							<view class="text">{{item.symbol}}</view>
							<view class="info">
								<view class="price">{{item.price}}</view>
								<view :class="['percentage',{'percentage1':item.price_zf>=0}]">{{item.price_zf}}%
								</view>
							</view>
						</view>
						<view class="right">
							<view :class="['btn',{'btnBg':item.bg=='zhang'}]">
								<view class="text">{{$t('home.txt12')}}</view>
								<view class="price">{{item.price_low}}</view>
							</view>
							<view :class="['btn',{'btnBg':item.bg=='die'}]">
								<view class="text">{{$t('home.txt13')}}</view>
								<view class="price">{{item.price_high}}</view>
							</view>
						</view>
						<!-- <view><text :class="['btn',{'btn1':0.2>0}]">{{0.2>0?'+':'-'}}4566</text></view> -->
					</view>
				</view>
			</view>
		</view>
		<tabbarBottom :current="1"></tabbarBottom>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				oldList: [],
				timer: null
			}
		},
		onShow() {
			this.getProductList()
			this.timer = setInterval(() => {
				this.getProductList()
			}, 5000)
		},
		onHide() {
			if (this.timer) {
				clearInterval(this.timer);
				this.timer = null;
			}
		},
		methods: {
			getProductList() {
				this.oldList = this.list
				this.$http.request('POST', this.$apis.getProductList).then(res => {
					if (res.data.code == 1) {
						this.list = res.data.data

						if (this.oldList.length > 0) {
							this.list.forEach((item, index) => {
								item.price = parseFloat(Number(item.price)).toString();
								item.price_low = parseFloat(Number(item.price)).toString();
								item.price_high = parseFloat(Number(item.price)).toString();
								if (item.price < this.oldList[index].price) {
									item.bg = 'die'
								} else {
									item.bg = 'zhang'
								}
							})
						} else {
							this.list.forEach((item, index) => {
								item.bg = 'zhang'
								item.price = parseFloat(Number(item.price)).toString();
								item.price_low = parseFloat(Number(item.price)).toString();
								item.price_high = parseFloat(Number(item.price)).toString();
							})
						}
					}
				}).finally(res => {})
			},
			toDetail(item) {
				uni.setStorageSync('code', item.code)
				uni.switchTab({
					url: '/pages/tabbarPages/transaction/index'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.data {
		.header {
			display: flex;
			padding: 5px 0;
			border-bottom: 1px solid #eee;
			// padding: 0 15px;
			font-size: 12px;
			color: #90a2b0;

			.text {
				width: calc(100% / 3);
				text-align: center;
			}
		}

		// .cardList {
		// 	.card {
		// 		display: flex;
		// 		align-items: center;
		// 		border-bottom: 1px solid #f1f1f1;
		// 		padding: 10px 16px 13px;
		// 		justify-content: space-between;

		// 		.left {
		// 			display: flex;

		// 			image {
		// 				width: 22px;
		// 				height: 22px;
		// 				border-radius: 50%;
		// 				margin-top: 5px;
		// 			}

		// 			.info {
		// 				margin-left: 10px;

		// 				.name {
		// 					color: #000;
		// 					font-size: 14px;
		// 				}

		// 				.num {
		// 					font-size: 13px;
		// 					font-weight: normal;
		// 					color: #90a2b0;
		// 				}
		// 			}
		// 		}

		// 		.price {
		// 			width: 30%;
		// 			color: #e94438;
		// 		}

		// 		.price1 {
		// 			color: rgb(0, 192, 135);
		// 		}

		// 		.btn {
		// 			text {
		// 				display: inline-block;
		// 				padding: 4px 0;
		// 				width: 80px;
		// 				border-radius: 2px;
		// 				background: rgb(233, 68, 56);
		// 				color: #fff;
		// 				font-size: 16px;
		// 				font-weight: bold;
		// 				text-align: center;
		// 			}

		// 			.btn1{
		// 				background: #00c087;
		// 			}
		// 		}
		// 	}
		// }

		.yDataList {
			background-color: #fff;
			padding-bottom: 10px;

			.data {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 5px 15px 5px;
				margin-top: 10px;
				border-bottom: 1px solid #f1f1f1;

				// view {
				// 	width: calc(100% / 3);
				// 	text-align: center;
				// 	font-weight: 700;
				// }

				// view:nth-child(1) {
				// 	text-align: left;
				// }

				// view:nth-last-child(1) {
				// 	text-align: right;
				// }

				// text {
				// 	background: #e94438;
				// 	color: #fff;
				// 	border-radius: 2px;
				// 	font-size: 16px;
				// 	padding: 4px 0px;
				// 	display: inline-block;
				// 	width: 80px;
				// 	text-align: center;
				// }

				// .btn1{
				// 	background: #00c087;
				// }

				.left {
					width: 40%;

					.name {
						font-weight: 700;
						font-size: 16px;
					}

					.text {
						color: #999;
						font-size: 12px;
						margin: 2px 0 7px 0;
					}

					.info {
						display: flex;
						align-items: center;
						justify-content: space-between;
						color: #00c087;

						.percentage {
							color: #e94438;
						}

						.percentage1 {
							color: #00c087;
						}
					}

				}

				.right {
					display: flex;
					align-items: center;
					justify-content: space-between;
					flex: 1;
					margin-left: 15px;

					.btn {
						background-color: #e94438;
						width: 48%;
						padding: 10px 0;
						text-align: center;
						color: #fff;
						border-radius: 6px;

						.text {
							font-size: 12px;
							margin-bottom: 6px;
						}

						.price {
							font-size: 15px;
						}
					}
					.btnBg {
						background-color: #00c087;
					}
				}
			}
		}
	}
</style>