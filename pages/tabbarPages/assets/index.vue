<template>
	<view class="index">
		<view class="content">
			<view class="other">
				<view class="header">
					<view class=""><u-icon name="arrow-left" color="#fff" size="50" @click="back"></u-icon></view>
					<view class="top">{{$t('assets.txt1')}}</view>
					<view class=""></view>
				</view>


				<view class="total">{{$t('assets.txt2')}}(CNY)</view>
				<view class="num">
					<text>{{userInfo.money}}</text>
					<!-- ≈
					<text>564456</text>
					<text @click="show=true">(ghh)<u-icon style="margin-left: 3px;" name="arrow-down" color="#fff"
							size="24"></u-icon></text> -->
				</view>
				<view class="data">
					<view class="left">
						<view class="title">{{$t('assets.txt3')}}</view>
						<view class="money">{{income.todayIncome}}</view>
					</view>
					<view class="right">
						<view class="title">{{$t('assets.txt4')}}</view>
						<view class="money">{{income.totalIncome}}</view>
					</view>
				</view>
				<view class="handle">
					<view class="left">
						<image src="../../../static/images/zc_cz.png" mode=""></image>
						<view class="text" @click="go('/pages/tabbarPages/mine/recharge')">{{$t('assets.txt5')}}</view>
					</view>
					<view class="right">
						<image src="../../../static/images/zc_tx.png" mode=""></image>
						<view class="text" @click="go('/pages/tabbarPages/mine/withdrawal')">{{$t('assets.txt6')}}</view>
					</view>
				</view>
			</view>
			<scroll-view scroll-y="true" class="scroll"  @scrolltolower="loadMoreData">
				<noData v-if="list.length==0"></noData>
				<view class="recordList">
					<view class="record" v-for="(item,index) in list" :key="index">
						<view class="recordTop">
							<view class="left">{{item.type_text}}</view>
							<view :class="['right',{'right1':item.money>=0}]"> {{item.money}}</view>
						</view>
						<view class="recordBottom">
							<view class="recordData">
								<view class="text">{{$t('assets.txt7')}}</view>
								<view class="recordNum"> {{item.money}}</view>
							</view>
							<view class="recordData">
								<view class="text">{{$t('assets.txt8')}}</view>
								<view class="recordNum">{{item.after}}</view>
							</view>
							<view class="recordData">
								<view class="text">{{$t('assets.txt9')}}</view>
								<view class="recordNum" >{{item.createtime_text}}</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<u-picker mode="selector" v-model="show" :default-selector="[0]" :range="selector"></u-picker>
		<tabbarBottom :current="3"></tabbarBottom>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				selector: [1, 2, 3],
				income:{},
				userInfo:{},
				list:[],
				currentPage: 1,
				isMore: true
			}
		},
		onShow() {
			this.getUserIncome()
			this.getUserinfo()
			this.getMoneyLog()
		},
		methods: {
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			getUserinfo() {
				this.$http.request('GET', this.$apis.getUserinfo).then(res => {
					if (res.data.code == 1) {
						this.userInfo = res.data.data
					}
				}).finally(res => {})
			},
			getUserIncome() {
				this.$http.request('GET', this.$apis.getUserIncome).then(res => {
					if (res.data.code == 1) {
						this.income = res.data.data
					}
				}).finally(res => {})
			},
			getMoneyLog() {
				this.$http.request('GET', this.$apis.getMoneyLog,{
					page:this.currentPage
				}).then(res => {
					if (res.data.code == 1) {
						if (res.data.data.length > 0) {
							this.list = this.list.concat(res.data.data)
						}else{
							this.isMore = false
						}
					}
				}).finally(res => {})
			},
			loadMoreData() {
				if (this.isMore) {
					this.currentPage++
					this.getMoneyLog()
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.index {
		min-height: 100vh;
		background: rgba(251, 114, 8, 0.05);
	}
	
	.scroll{
		height: calc(100vh - 260px);
	}

	.content {
		.other {
			background-image: linear-gradient(to bottom right, #ffa959, #FB7208);
			color: #fff;
		}
		
		.header{
			padding: 0 5px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			view:nth-child(2n+1){
				width: 10%;
			}
		}

		.top {
			padding: 12px;
			text-align: center;
			font-weight: 500;
			font-size: 18px;
		}

		.total {
			padding: 0 20px;
		}

		.num {
			padding: 0 20px;
			margin: 0px 0px 12px 0;
			font-size: 16px;

			text {
				display: inline-block;
			}

			text:nth-child(1) {
				font-size: 32px;
				margin-right: 10px;
			}

			text:nth-child(2) {
				margin-left: 2px;
			}

			text:nth-child(3) {
				font-size: 12px;
				margin-left: 12px;
			}
		}

		.data {
			display: flex;
			padding: 0 20px;
			justify-content: space-between;

			.left,
			.right {
				width: 50%;
				font-size: 12px;

				.money {
					font-size: 22px;
					margin: 12px 0;
				}
			}
		}

		.handle {
			display: flex;

			.left,
			.right {
				display: flex;
				align-items: center;
				width: 50%;
				padding-top: 16px;
				padding-bottom: 14px;
				border: #f7f7fa 1px solid;
				font-size: 16px;
				color: #f7f7fa;
				// vertical-align: middle;
				border-left-style: none;
				justify-content: center;
			}

			.right {
				border-right-style: none;
			}

			image {
				width: 24px;
				height: 24px;
			}
		}

		.recordList {
			padding-top: 10px;

			.record {
				background-color: #fff;
				margin-bottom: 10px;
				padding: 15px;

				.recordTop {
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 18px;
					padding-bottom: 10px;

					.right {
						color: rgb(234, 77, 61);
					}

					.right1 {
						color: rgb(0, 192, 135);
					}
				}

				.recordBottom {
					display: flex;
					font-size: 16px;
					text-align: center;
					justify-content: space-between;

					.recordData {
						// width: calc(100% / 3);
						display: flex;
						flex-direction: column;
						justify-content: space-between;

						.text {
							margin-bottom: 10px;
							color: rgb(193, 195, 210);
						}
						.recordNum{
							font-size: 12px;
						}
						
					}


				}
			}
		}
	}
</style>