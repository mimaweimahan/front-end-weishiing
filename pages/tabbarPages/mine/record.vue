<template>
	<view class="index">
		<navTop :title="$t('other.txt22')"></navTop>
		<view class="content">
			<view class="header">
				<view :class="['text',{'tab':tabIndex==1}]" @click="changeTab(1)">{{$t('record.txt1')}}</view>
				<view :class="['text',{'tab':tabIndex==3}]" @click="changeTab(3)">{{$t('record.txt3')}}</view>
			</view>
			<scroll-view scroll-y="true" class="scroll" @scrolltolower="loadMoreData">
				<noData v-if="list.length==0"></noData>
				<view class="recordList">
					<view class="record" v-for="(item,index) in list" :key="index">
						<view class="recordTop">
							<view class="left">{{item.product_title}} <text
									:class="{'text1':item.direction==1}">{{item.direction==1?$t('record.txt4'):$t('record.txt5')}}</text></view>
							<view :class="['right',{'right1':item.fact_profits>=0}]">{{item.fact_profits}} </view>
						</view>
						<view class="recordBottom">
							<view class="recordData">
								<view class="text">{{$t('record.txt6')}}</view>
								<view class="recordNum">{{item.amount}}</view>
							</view>
							<view class="recordData">
								<view class="text">{{$t('record.txt8')}}</view>
								<view class="recordNum">{{item.open_price}}</view>
							</view>
							<view class="recordData">
								<view class="text">{{$t('record.txt7')}}</view>
								<view class="recordNum">{{item.end_price}}</view>
							</view>
							<view class="recordData">
								<view class="text">{{$t('record.txt9')}}</view>
								<view class="recordNum" v-if="item.countdown>0">
									<u-count-down :timestamp="item.countdown" :show-days="false" :show-hours="item.countdown>3600?true:false" :show-minutes="item.countdown>60?true:false" color="rgb(193, 195, 210)" separator-color="rgb(193, 195, 210)" @end="remove(index)"></u-count-down>
								</view>
								<view class="recordNum" v-else>
									{{item.seconds}}
								</view>
							</view>
						</view>
						<view class="time">
							<view class="left">{{item.createtime_text}}</view>
							<view class="right">{{item.status==1?$t('record.txt2'):$t('record.txt3')}}</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabIndex: 1,
				list: [],
				currentPage: 1,
				isMore: true
			}
		},
		onShow() {
			this.list = []
			this.currentPage = 1
			this.getOrderList()
		},
		methods: {
			changeTab(index) {
				this.tabIndex = index
				this.list = []
				this.isMore = true
				this.currentPage = 1
				this.getOrderList()
			},
			getOrderList() {
				this.$http.request('GET', this.$apis.getOrderList, {
					page: this.currentPage,
					status: this.tabIndex
				}).then(res => {
					if (res.data.code == 1) {
						if (res.data.data.length > 0) {
							this.list = this.list.concat(res.data.data)
							this.list.forEach((item,index)=>{
								item.fact_profits = parseFloat(Number(item.fact_profits)).toString();
								item.amount = parseFloat(Number(item.amount)).toString();
								item.open_price = parseFloat(Number(item.open_price)).toString();
								item.end_price = parseFloat(Number(item.end_price)).toString();
							})
						} else {
							this.isMore = false
						}

					}
				}).finally(res => {})
			},
			loadMoreData() {
				if (this.isMore) {
					this.currentPage++
					this.getOrderList()
				}

			},
			remove(index){
				this.list.splice(index, 1)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.index {
		min-height: 100vh;
		background-color: rgba(251, 114, 8, 0.05);
	}

	.content {
		.header {
			display: flex;
			line-height: 40px;
			border-top: 1px solid #f1f1f1;
			background-color: #fff;

			.text {
				width: 50%;
				text-align: center;
			}

			.tab {
				color: #FB7208;
				border-bottom: 2px solid #FB7208;
			}
		}

		.scroll {
			height: calc(100vh - 100px);
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
					padding-bottom: 18px;
					color: rgb(181, 183, 201);
					font-size: 16px;

					text {
						font-size: 16px;
						margin-left: 10px;
						color: rgb(234, 77, 61);
					}

					.text1 {
						
						color: rgb(0, 192, 135);
					}

					.right {
						color: rgb(234, 77, 61);
						font-size: 16px
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
						// width: calc(100% / 4);
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						word-break: break-all;
						// padding: 0 5px;

						.text {
							margin-bottom: 10px;
							color: rgb(193, 195, 210);
						}

						.recordNum {
							color: rgb(193, 195, 210);
						}
					}


				}

				.time {
					display: flex;
					margin-top: 20px;
					justify-content: space-between;
					color: rgb(157, 169, 181);
					font-size: 16px;
				}
			}
		}
	}
</style>