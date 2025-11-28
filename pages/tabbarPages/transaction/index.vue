<template>
	<view>
		<view class="content">
			<navTop :title="$t('transaction.txt1')" :isBack="false"></navTop>
			<view class="top">
				<view class="left" @click="productShow=true">
					<view class="text">{{productInfo.symbol}}</view>
					<image src="../../../static/images/threejiao.png" mode=""></image>
				</view>
				<view class="right" @click="go('/pages/tabbarPages/mine/record')">
					<image src="../../../static/images/copy.png" mode=""></image>
					<view class="text">{{$t('other.txt22')}}</view>
				</view>
			</view>
			<view class="currentData">
				<view class="left">
					<view class="text1">{{$t('transaction.txt3')}}</view>
					<view class="text2">{{productInfo.price}}</view>
					<view class="text3">{{productInfo.price_zf}}%</view>
				</view>
				<view class="right">
					<view class="data">
						<view class="text">{{$t('transaction.txt4')}}</view>
						<view class="num">{{productInfo.price_high}}</view>
					</view>
					<view class="data">
						<view class="text">{{$t('transaction.txt5')}}</view>
						<view class="num">{{productInfo.price_low}}</view>
					</view>
					<view class="data">
						<view class="text">{{$t('transaction.txt6')}}</view>
						<view class="num">{{productInfo.open_price}}</view>
					</view>
					<view class="data">
						<view class="text">{{$t('transaction.txt7')}}</view>
						<view class="num">{{productInfo.vol}}</view>
					</view>
				</view>
			</view>
			<view class="timeList">
				<view class="time">{{$t('transaction.txt8')}}</view>
				<view :class="['time',{'time1':index==timeIndex}]" v-for="(item,index) in timeListTop" :key="index"
					@click="changeTime(index)">{{item.name}}</view>
			</view>
			<klinechart ref="klinechart" :symbol="symbol" :timeIndex="timeIndex" @close="getClose"></klinechart>
			<view class="btn">
				<view class="left" @click="openPop(-1)">{{$t('transaction.txt9')}}</view>
				<view class="center" @click="openPop(0)">{{$t('transaction.txt10')}}</view>
				<view class="right" @click="openPop(1)">{{$t('transaction.txt11')}}</view>
			</view>
		</view>
		<u-popup v-model="show" mode="center" length="80%" border-radius="20" closeable>
			<view class="pop">
				<view class="title">{{$t('transaction.txt12')}}</view>
				<view class="info">
					<view class="data">
						<view class="left">{{$t('transaction.txt13')}}</view>
						<view class="right">{{productInfo.symbol}}</view>
					</view>
					<view class="data">
						<view class="left">{{$t('transaction.txt14')}}</view>
						<view :class="['right',{'right1':btnType==0},{'right2':btnType==-1}]">
							{{btnType<=0?(btnType==0?$t('transaction.txt15'):$t('transaction.txt9')):$t('transaction.txt16')}}
						</view>
					</view>
					<view class="data">
						<view class="left">{{$t('transaction.txt17')}}</view>
						<view class="right">{{productInfo.price}}</view>
					</view>
					<view class="data" v-if="productTimeList.length > selectTimeIndex">
						<view class="left">{{$t('other.txt1')}}</view>
						<view class="right">{{productTimeList[selectTimeIndex].profit_ratio}}</view>
					</view>
					<view class="data" v-if="productTimeList.length > selectTimeIndex">
						<view class="left">{{$t('other.txt7')}}</view>
						<view class="right">{{productTimeList[selectTimeIndex].lose_ratio}}</view>
					</view>
					<view class="data"
						v-if="productTimeList.length > selectTimeIndex&&productTimeList[selectTimeIndex].min>0">
						<view class="left">{{$t('other.txt2')}}</view>
						<view class="right">{{productTimeList[selectTimeIndex].min}}</view>
					</view>
					<view class="data"
						v-if="productTimeList.length > selectTimeIndex&&productTimeList[selectTimeIndex].max>0">
						<view class="left">{{$t('other.txt3')}}</view>
						<view class="right">{{productTimeList[selectTimeIndex].max}}</view>
					</view>
				</view>
				<view class="selectTime">
					<view class="text">{{$t('transaction.txt18')}}</view>
					<scroll-view scroll-x="true" class="scrollTime">
						<view class="timeAll">
							<view :class="['time',{'time1':selectTimeIndex==index}]"
								v-for="(item,index) in productInfo.timeList" :key="index" @click="selectTime(index)">
								{{item.seconds_desc}}
							</view>
						</view>
					</scroll-view>
				</view>
				<view class="amount">
					<view class="text">{{$t('transaction.txt19')}}</view>
					<view class="input">
						<u-input v-model="amount" type="text" />
					</view>
					<view class="text">{{$t('transaction.txt20')}}：{{userInfo.money}}</view>
				</view>
				<view class="popBtn">
					<view class="confirm" @click="submit">{{$t('transaction.txt21')}}</view>
				</view>
			</view>
		</u-popup>
		<u-popup v-model="productShow" mode="left" length="70%">
			<view class="productPop">
				<view class="title">{{$t('transaction.txt22')}}</view>
				<scroll-view scroll-y="true">
					<view class="productList">
						<view class="product" v-for="(item,index) in productList" :key="index" @click="toDetail(item)">
							<view class="code">{{item.symbol}}</view>
							<view class="name">{{item.title}}</view>
						</view>

					</view>
				</scroll-view>
			</view>
		</u-popup>
		<u-popup v-model="orderShow" mode="center" length="80%" border-radius="20" closeable @close="orderClose">
			<view class="orderPop">
				<view class="title">{{$t('transaction.txt23')}}</view>
				<view class="timeDown" v-show="!timeEnd">
					<view class="dot"></view>
					<!-- <view class="time">50</view> -->
					<u-count-down ref="uCountDown" class="time" :timestamp="orderInfo.countdown" :show-days="false"
						:show-hours="orderInfo.countdown>3600?true:false"
						:show-minutes="orderInfo.countdown>60?true:false" font-size="34" color="#FB7208"
						:autoplay="false" @end="toTimeEnd"></u-count-down>
					<view class="text">{{$t('transaction.txt17')}}</view>
					<view class="price">{{productInfo.price}}</view>
				</view>
				<view class="result" v-show="timeEnd">
					<view class="money">{{orderInfo.fact_profits}}</view>
					<view class="text">{{$t('transaction.txt24')}}</view>
				</view>
				<view class="info">
					<view class="data data1">
						<view class="left">{{$t('transaction.txt25')}}</view>
						<view :class="['right',{'right1':btnType==0},{'right2':btnType==-1}]">
							{{btnType<=0?$t('transaction.txt15'):$t('transaction.txt16')}}
						</view>
					</view>
					<view class="data data2">
						<view class="left">{{$t('transaction.txt26')}}</view>
						<view class="right">{{amount}}</view>
					</view>
					<view class="data data3">
						<view class="left">{{$t('transaction.txt27')}}</view>
						<view class="right">{{productInfo.open_price}}</view>
					</view>
					<view class="data data4" v-show="!timeEnd">
						<view class="left">{{$t('transaction.txt28')}}</view>
						<view class="right">{{orderInfo.profit_loss}}</view>
					</view>
					<view class="data data5" v-show="!timeEnd">
						<view class="left">{{$t('transaction.txt29')}}</view>
						<view class="right">{{orderInfo.order_sn}}</view>
					</view>
				</view>
				<view class="orderbtn">
					<view class="btn" @click="orderShow=false">{{$t('transaction.txt30')}}</view>
				</view>
			</view>
		</u-popup>
		<tabbarBottom :current="2"></tabbarBottom>
	</view>
</template>

<script>
	import {
		intervals,
		intervals1,
		chartTypes,
		shapes
	} from '@/components/klinechart/params.js'
	export default {
		data() {
			return {
				intervals1,
				timeIndex: 2,
				show: false,
				productShow: false,
				orderShow: false,
				timeList: [],
				productTimeList: [],
				amount: '',
				btnType: -1,
				selectTimeIndex: 0,
				productList: [],
				productIndex: 0,
				symbol: '',
				productInfo: {},
				userInfo: {},
				isClick: false,
				timeEnd: false,
				orderId: '',
				orderInfo: {},
				timeListTop: [{
						name: 5 + this.$t('klinechart.time1'),
						value: '5min',
						time: 5
					},
					{
						name: 30 + this.$t('klinechart.time1'),
						value: '30min',
						time: 30
					},
					{
						name: 60 + this.$t('klinechart.time1'),
						value: '60min',
						time: 60
					},
					{
						name: 1 + this.$t('klinechart.time2'),
						value: '1day',
						time: 360
					}
				]
			}
		},
		onShow() {
			this.getProductList()
			this.getUserinfo()
		},
		onHide() {
			this.$refs.klinechart.clearTimer()
			uni.setStorageSync('code', '')
		},
		methods: {
			changeTime(index) {
				this.timeIndex = index
			},
			selectTime(index) {
				this.selectTimeIndex = index
			},
			openPop(type) {
				this.btnType = type
				this.show = true
			},
			toTimeEnd() {
				this.$nextTick(() => {
					this.getOrderInfo()
				})

				this.timeEnd = true
			},
			orderClose() {
				this.getproductData()
				this.timeEnd = false
			},
			submit() {
				let direction = 0
				let type = 0
				if (this.btnType == 1) {
					direction = 2
					type = 0
				} else if (this.btnType == 0) {
					direction = 1
					type = 0
				} else if (this.btnType == -1) {
					type = 1
				}
				if (this.isClick) {
					return
				} else {
					this.isClick = true
				}
				this.$http.request('POST', this.$apis.orderSubmit, {
					product_id: this.productInfo.id,
					direction,
					seconds: this.productInfo.timeList[this.selectTimeIndex].seconds,
					amount: this.amount,
					open_price: this.productInfo.price,
					profit_ratio: this.productInfo.timeList[this.selectTimeIndex].profit_ratio,
					type,
				}).then(res => {
					if (res.data.code == 1) {
						this.orderId = res.data.data.order_id
						this.getOrderInfo()
						this.show = false
						this.orderShow = true
						this.$nextTick(() => {
							this.$refs.uCountDown.start(); // 确保组件挂载完成后调用
						});
						this.amount = ''
					}
				}).finally(res => {
					this.isClick = false
				})
			},
			getOrderInfo() {
				this.$http.request('GET', this.$apis.getOrderInfo, {
					order_id: this.orderId
				}).then(res => {
					if (res.data.code == 1) {
						this.orderInfo = res.data.data
						this.orderInfo.fact_profits = parseFloat(Number(this.orderInfo.fact_profits)).toString();
					}
				}).finally(res => {})
			},
			getUserinfo() {
				this.$http.request('GET', this.$apis.getUserinfo).then(res => {
					if (res.data.code == 1) {
						this.userInfo = res.data.data
					}
				}).finally(res => {})
			},
			getProductList() {
				this.$http.request('GET', this.$apis.getProductList).then(res => {
					if (res.data.code == 1) {
						this.productList = res.data.data
						if (!uni.getStorageSync('code')) {
							this.symbol = this.productList[0].code
						} else {
							this.symbol = uni.getStorageSync('code')
						}
						this.getproductData()
					}
				}).finally(res => {})
			},
			toDetail(item) {
				this.symbol = item.code
				this.getproductData()
				this.productShow = false
			},
			getproductData() {
				this.$http.request('GET', this.$apis.getproductData, {
					symbol: this.symbol
				}).then(res => {
					if (res.data.code == 1) {
						this.productInfo = res.data.data
						this.productTimeList = this.productInfo.timeList
						this.productInfo.price = parseFloat(Number(this.productInfo.price)).toString();
						this.productTimeList[this.selectTimeIndex].min = parseFloat(Number(this.productTimeList[
							this.selectTimeIndex].min)).toString();
						this.productTimeList[this.selectTimeIndex].max = parseFloat(Number(this.productTimeList[
							this.selectTimeIndex].max)).toString();
						this.productInfo.open_price = parseFloat(Number(this.productInfo.open_price)).toString();
						this.productInfo.price_low = parseFloat(Number(this.productInfo.price_low)).toString();
						this.productInfo.price_high = parseFloat(Number(this.productInfo.price_high)).toString();
						this.productInfo.vol = parseFloat(Number(this.productInfo.vol)).toString();
					}
				}).finally(res => {})
			},
			getClose(e) {
				this.productInfo.price = parseFloat(Number(e)).toString();
			}
		}
	}
</script>


<style lang="scss" scoped>
	.content {
		padding-bottom: 80px;

		.title {
			font-size: 16px;
			text-align: center;
			padding: 15px;
		}

		.top {
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1px solid rgb(238, 238, 238);
			padding: 10px 15px;

			.left,
			.right {
				display: flex;
				align-items: center;

				image {
					width: 20px;
					height: 20px;
				}
			}

			.left {
				font-weight: 700;
			}
		}

		.currentData {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 15px;

			.left {
				.text1 {
					color: rgb(78, 91, 133);
				}

				.text2 {
					font-size: 28px;
					font-weight: bold;
					color: #e43e42;
				}

				.text3 {
					font-size: 17px;
					color: #e43e42;
					margin-left: 5px;
				}
			}

			.right {
				display: flex;
				flex-wrap: wrap;
				width: 50%;
				font-size: 13px;

				.data {
					width: 50%;
					color: #636e82;
					margin-bottom: 10px;
				}
			}
		}

		.timeList {
			display: flex;
			margin-bottom: 15px;

			color: #4e5b85;
			font-size: 11px;
			font-weight: 600;

			.time {
				margin-right: 10px;
				padding: 7px 5px;
			}

			.time1 {
				border-bottom: 1px solid #FB7208;
			}
		}

		.btn {
			background-color: #fff;
			display: flex;
			justify-content: center;
			margin-top: 10px;
			width: 100%;
			position: fixed;
			bottom: 50px;
			left: 0;
			padding: 10px 15px;
			z-index: 9999;

			view {
				width: 45.0vw;
				height: 40px;
				font-size: 16px;
				color: #fff;
				border-radius: 30px;
				text-align: center;
				line-height: 40px;
			}

			.left {
				background: #FB7208 !important;
				margin-right: 3vw;
			}

			.center {
				background: #00c087 !important;
				margin-right: 3vw;
			}

			.right {
				background: #e43e42 !important;
			}
		}
	}

	.pop {
		.title {
			color: #333;
			padding: 15px 0;
			border-bottom: 1px solid #eee;
			text-align: center;
			font-size: 16px;
		}

		.info {
			padding: 10px;
			background: #f7f7fa;
			border-radius: 5px;
			margin: 5px 15px;
			color: #333;

			.data {
				display: flex;
				justify-content: space-between;
			}

			.data:nth-child(1) {
				color: #8d9dbc;
				padding-bottom: 3px;
			}

			.data:nth-child(2) {
				padding-bottom: 3px;

				.right {
					color: rgb(228, 62, 66);
				}

				.right1 {
					color: rgb(89, 187, 95);
				}

				.right2 {
					color: #FB7208;
				}
			}
		}

		.selectTime {
			padding: 0 15px;

			.text {
				font-size: 16px;
				color: #62759a;
				margin-bottom: 10px;
			}

			.scrollTime {
				width: 100%;

				.timeAll {
					display: flex;

					.time {
						padding: 10px 15px;
						background: #ededf5;
						font-size: 16px;
						color: #62759a;
						border-radius: 5px;
						margin-right: 2%;
						text-align: center;
					}

					.time1 {
						background: #FB7208;
						color: #fff;
					}
				}

			}
		}

		.amount {
			padding: 0 15px;

			.text {
				font-size: 16px;
				color: #62759a;
				margin: 5px 0;
			}

			.text:nth-last-child(1) {
				margin: 10px 0;
				font-size: 14px;
			}

			.input {
				margin-bottom: 5px;
				background: #f7f7fa;
				padding: 0px 5%;
				border-radius: 5px;
				color: #62759a;
			}
		}

		.popBtn {
			border-top: 1px solid #eee;

			.confirm {
				background: #FB7208;
				color: #fff;
				font-size: 16px;
				padding: 10px 0px;
				border-radius: 20px;
				width: 50%;
				text-align: center;
				margin: 10px auto
			}
		}
	}

	.productPop {
		.title {
			color: #000;
			margin-top: 10px;
			line-height: 35px;
			padding-left: 15px;
			padding-bottom: 10px;
			border-bottom: 1px solid #f1f1f1;
			font-size: 20px;
			font-weight: bold;
		}

		.productList {
			.product {
				padding: 0 15px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-bottom: 1px solid #f1f1f1;
				height: 60px;
				line-height: 60px;
				font-size: 18px;
				font-weight: bold;
				color: #1A384A;

				.name {
					font-weight: normal;
					color: #7d818a;
				}
			}
		}
	}

	.orderPop {

		.title {
			color: #333;
			padding: 15px 0;
			border-bottom: 1px solid #eee;
			text-align: center;
		}

		.timeDown {
			position: relative;
			height: 150px;
			width: 150px;
			margin: 10px auto;
			border: 10px solid #eee;
			border-radius: 50%;
			text-align: center;

			.dot {
				position: absolute;
				background: #FB7208;
				width: 10px;
				height: 10px;
				border-radius: 50%;
				margin: 0 calc(50% - 5px);
				top: -10px;
			}

			.time {
				color: #FB7208;
				font-size: 20px;
				margin-top: 30px;
			}

			.text {
				margin: 5px 0;
				color: #62759a;
			}

			.price {
				color: rgb(89, 187, 95);
			}
		}

		.result {
			height: 150px;
			text-align: center;
			display: flex;
			flex-direction: column;
			justify-content: center;

			.money {
				color: #FB7208;
				font-size: 20px;
				margin-bottom: 10px;
			}

			.text {}
		}

		.info {
			margin: 5px auto !important;
			padding: 10px 10px 5px 10px;
			margin: 20px auto;
			background: #f7f7fa;
			border-radius: 5px;
			width: 90%;

			.data {
				display: flex;
				justify-content: space-between;
				align-items: center;
				color: #62759a;
				margin-bottom: 5px;

				.left {}
			}

			.data1,
			.data4 {
				.right {
					color: rgb(89, 187, 95);
				}
			}

			.data1 {
				.right {
					color: rgb(228, 62, 66);
				}

				.right1 {
					color: rgb(89, 187, 95);
				}

				.right2 {
					color: #FB7208;
				}
			}
		}

		.orderbtn {
			border-top: 1px solid #eee;

			.btn {
				background: #FB7208;
				color: #fff;
				font-size: 16px;
				padding: 10px 0px;
				border-radius: 20px;
				display: block;
				width: 50%;
				text-align: center;
				margin: 10px auto;

			}

		}
	}
</style>