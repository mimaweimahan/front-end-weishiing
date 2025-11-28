<template>
	<view>
		<view class="content">
			<view class="top">
				<view class="left" style="width: 10%;">
					<image src="../../../static/images/logo.jpg" mode=""></image>
				</view>
				<view class="homeTitle" style="font-size: 18px;font-weight: 600;">
					{{$t('other.txt4')}}
				</view>
				<view class="right" style="width: 10%;text-align: right;">
					<!-- <image style="width: 25px;height: 25px;" :src="require(`@/static/lang/lang.${lang}.png`)" mode=""
						@click="go('/pages/tabbarPages/mine/lang')">
					</image> -->
				</view>
			</view>
			<!-- 轮播 -->
			<u-swiper @click="changeSwiper" class="swiper" style="margin: 15px 0;width: 100%;" height="350"
				img-mode="fill" :list="swiperList" :effect3d="true" name="image"></u-swiper>

			<!-- 公告 -->
			<view class="notice" @click="go('/pages/tabbarPages/home/noticeList')">
				<u-notice-bar :more-icon="false" :list="[notice]" type="none" bg-color="#f7f7fa" border-radius="40"
					padding="15rpx 30rpx" font-size="24"></u-notice-bar>
			</view>

			<!-- 横向滑动数据 -->
			<view class="xdata" v-if="userInfo.safe_status==2">
				<scroll-view class="scrollx" scroll-x="true">
					<view class="allData">
						<view class="data" v-for="(item,index) in list" :key="index">
							<view class="title">{{item.title}}</view>
							<view :class="['num',{'colorx':item.price_zf>=0}]">{{item.price}}</view>
							<view :class="['percentage',{'colorx':item.price_zf>=0}]">{{item.price_zf}}%</view>
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="xdata" v-if="userInfo.safe_status==0 || userInfo.safe_status==1">
				<scroll-view class="scrollx" scroll-x="true">
					<view class="allData">
						<view class="data" v-for="(item,index) in list" :key="index">
							<view class="title">{{item.title}}</view>
							<view :class="['num',{'colorx':item.price_zf>=0}]">{{item.price}}</view>
							<view :class="['percentage',{'colorx':item.price_zf>=0}]">{{item.price_zf}}%</view>
						</view>
					</view>
				</scroll-view>
			</view>

			<!-- 服务菜单 -->
			<view class="serviceList" v-if="userInfo.safe_status==2">
				<view class="service">
					<view class="handle" @click="go('/pages/tabbarPages/mine/service')">
						<image src="../../../static/images/home1.png" mode=""></image>
						<view class="text">{{$t('home.txt1')}}</view>
					</view>
					<view class="handle" @click="go('/pages/tabbarPages/mine/withdrawal')">
						<image src="../../../static/images/home2.png" mode=""></image>
						<view class="text">{{$t('home.txt2')}}</view>
					</view>
					<view class="handle" @click="go('/pages/tabbarPages/mine/service')">
						<image src="../../../static/images/home3.png" mode=""></image>
						<view class="text">{{$t('home.txt3')}}</view>
					</view>
					<!-- <view class="handle" @click="go('/pages/tabbarPages/mine/share')">
						<image src="../../../static/images/home4.png" mode=""></image>
						<view class="text">{{$t('home.txt4')}}</view>
					</view> -->
					<!-- <view class="handle" @click="go('/pages/tabbarPages/mine/record')">
						<image src="../../../static/images/home5.png" mode=""></image>
						<view class="text">{{$t('home.txt5')}}</view>
					</view> -->
					<!-- <view class="handle" @click="to('/pages/tabbarPages/transaction/index')">
						<image src="../../../static/images/home6.png" mode=""></image>
						<view class="text">{{$t('home.txt6')}}</view>
					</view> -->
					<view class="handle" @click="go('/pages/tabbarPages/assets/index')">
						<image src="../../../static/images/home7.png" mode=""></image>
						<view class="text">{{$t('home.txt7')}}</view>
					</view>
					<!-- <view class="handle" @click="go('/pages/tabbarPages/mine/help')">
						<image src="../../../static/images/home8.png" mode=""></image>
						<view class="text">{{$t('home.txt8')}}</view>
					</view> -->
				</view>
			</view>

			<!-- 纵向数据 -->
			<view class="yData">
				<!-- <view class="tab">
					<view :class="['left',{'tab1':tabIndex==0}]" @click="changeTab(0)">Increase list</view>
					<view :class="['right',{'tab1':tabIndex==1}]" @click="changeTab(1)">transaction volume list</view>
				</view> -->

				<view class="header" v-if="userInfo.safe_status==2">
					<view class="text">{{$t('home.txt9')}}</view>
					<view class="text">{{$t('home.txt10')}}</view>
					<view class="text">{{$t('home.txt11')}}</view>
				</view>
				<view class="header1" v-if="userInfo.safe_status==0 || userInfo.safe_status==1">
					<view class="text">{{$t('home.txt9')}}</view>
					<view class="text">{{$t('home.txt10')}}</view>
					<view class="text">{{$t('home.txt11')}}</view>
				</view>

				<view class="yDataList">
					<view class="data" v-for="(item,index) in list" :key="index" @click="toDetail(item)"
						v-if="userInfo.safe_status==2">
						<view class="left">
							<view class="" style="display: flex;align-items: center;">
								<image :src="item.image" mode=""></image>
								<view class="name">{{item.title}}</view>
							</view>

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
					<view class="data" v-for="(item,index) in list" :key="index" v-if="userInfo.safe_status==0 || userInfo.safe_status==1">

						<view class="left1">
							<view class="" style="display: flex;align-items: center;">
								<image :src="item.image" mode=""></image>
								<view class="name">{{item.title}}</view>
							</view>

							<view class="text">{{item.symbol}}</view>
							<view class="info">
								<view class="price">{{item.price}}</view>
								<view :class="['percentage',{'percentage1':item.price_zf>=0}]">{{item.price_zf}}%
								</view>
							</view>
						</view>
						<view class="right">
							<qiun-data-charts type="area" :chartData="item.chartData" :errorShow="false"
								background="none" :tooltipShow="false" :tapLegend="false" :zf="item.price_zf"/>
						</view>
						<!-- <view><text :class="['btn',{'btn1':0.2>0}]">{{0.2>0?'+':'-'}}4566</text></view> -->
					</view>
				</view>
			</view>
		</view>
		<tabbarBottom :current="0" v-if="userInfo.safe_status==2"></tabbarBottom>
		<tabbarBottom1 :current="0" v-if="userInfo.safe_status==0 || userInfo.safe_status==1"></tabbarBottom1>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList: [],
				notice: [],
				tabIndex: 0,
				isClick: false,
				list: [],
				oldList: [],
				timer: null,
				lang: '',
				currentPage: 1,
				userInfo: {}
			}
		},
		onShow() {
			this.getUserinfo()
			this.getConfig()
			this.lang = uni.getStorageSync('lang')
			this.getBannerList()
			this.getProductList()
			this.getNoticeList()
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
			getUserinfo() {
				this.$http.request('GET', this.$apis.getUserinfo).then(res => {
					if (res.data.code == 1) {
						this.userInfo = res.data.data
						uni.setStorageSync('status', this.userInfo.safe_status)
					}
				}).finally(res => {})
			},
			getNoticeList() {
				this.$http.request('GET', this.$apis.getNoticeList, {
					page: this.currentPage
				}).then(res => {
					if (res.data.code == 1) {
						if (res.data.data.length > 0) {
							this.notice = res.data.data[0].title
						}
					}
				}).finally(res => {})
			},
			changeTab(type) {
				this.tabIndex = type
			},
			getConfig() {
				this.$http.request('GET', this.$apis.getConfig, {
					keyword: 'notice'
				}).then(res => {
					if (res.data.code == 1) {
						this.notice = res.data.data.notice
					}
				}).finally(res => {})
			},
			getBannerList() {
				this.$http.request('GET', this.$apis.getBannerList).then(res => {
					if (res.data.code == 1) {
						this.swiperList = res.data.data
					}
				}).finally(res => {})
			},
			getProductList() {
				this.oldList = this.list
				this.$http.request('GET', this.$apis.getProductList).then(res => {
					if (res.data.code == 1) {

						this.list = res.data.data
						if (this.oldList.length > 0) {
							this.list.forEach((item, index) => {
								item.price = parseFloat(Number(item.price)).toString();
								item.price_low = parseFloat(Number(item.price)).toString();
								item.price_high = parseFloat(Number(item.price)).toString();
								item.chartData = this.oldList[index].chartData
								if (item.price < this.oldList[index].price) {
									item.bg = 'die'
								} else {
									item.bg = 'zhang'
								}
								this.$forceUpdate()
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
			},
			changeSwiper(e) {
				if (this.swiperList[e].url) {
					this.go(this.swiperList[e].url)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		min-height: 100vh;
		background-color: rgba(251, 114, 8, 0.05);



		.top {
			padding: 5px 10px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			background-color: #fff;

			image {
				width: 30px;
				height: 30px;
				border-radius: 50%;
			}
		}

		.notice {
			padding: 10px 20px;
		}

		.xdata {
			padding: 10px 13px;

			.scrollx {

				.allData {
					display: flex;
				}

				.data {
					text-align: center;
					margin-right: 10px;
					min-width: 125px;
					max-width: 125px;
					padding: 10px 0;
					background-color: #fff;
					border-radius: 5px;


					.title {
						font-size: 85%;
					}

					.num {
						font-size: 14px;
						margin: 2px 0;
						color: #e94438;
					}

					.percentage {
						font-size: 12px;
						color: #e94438;
					}

					.colorx {
						color: #00c087;
					}
				}
			}
		}

		.serviceList {
			padding-bottom: 10px;

			.service {
				background-color: #fff;
				display: flex;
				flex-wrap: wrap;
			}

			.handle {
				text-align: center;
				width: calc(100% / 4);
				padding: 15px 0px;

				image {
					width: 25px;
					height: 25px;
				}

				.text {
					font-size: 13px;
					white-space: nowrap;
				}
			}
		}

		.yData {
			padding-bottom: 10px;

			.tab {
				background-color: #fff;
				display: flex;
				align-items: center;

				view {
					width: 50%;
					text-align: center;
					font-weight: bold;
					padding: 15px 0;
					font-size: 15px;
					color: rgb(144, 162, 176);
				}

				.tab1 {
					color: #ffa959;
					position: relative;

					&::after {
						position: absolute;
						content: '';
						width: 20%;
						margin: 0 40%;
						height: 1px;
						background-color: #ffa959;
						bottom: 0;
						left: 0;
					}
				}
			}

			.header {
				display: flex;
				padding: 5px 15px;
				align-items: center;
				justify-content: space-between;
				color: #7d818a;

				.text {
					width: calc(100% / 3);
					font-size: 12px;
					text-align: center;
				}

				.text:nth-child(1) {
					text-align: left;
				}

				.text:nth-child(2) {
					margin-left: -110px;
				}

				.text:nth-last-child(1) {
					text-align: right;
				}
			}

			.header1 {
				display: flex;
				padding: 5px 15px;
				align-items: center;
				justify-content: space-between;
				color: #7d818a;

				.text {
					width: calc(100% / 3);
					font-size: 12px;
					text-align: center;
				}

				.text:nth-child(1) {
					text-align: left;
				}

				.text:nth-child(2) {
					margin-left: -40px;
				}

				.text:nth-last-child(1) {
					text-align: right;
				}
			}

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

						image {
							width: 20px;
							height: 20px;
							margin-right: 5px;
						}

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

					.left1 {
						width: 50%;

						image {
							width: 20px;
							height: 20px;
							margin-right: 5px;
						}

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
						height: 80px;
						width: 180px;

						.chartsview {
							width: 100%;
							height: 100%;
						}

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
	}
</style>