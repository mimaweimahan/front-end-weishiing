<template>
	<view>
		<navTop :title="$t('news.txt1')" :isBack="false"></navTop>
		<view class="cardList">
			<view class="list" v-for="(item,index) in list" :key="index" @click="go(`/pages/tabbarPages/news/detail?id=${item.id}`)">
				<view class="left">
					<view class="title">{{item.title}}</view>
					<view class="bom">
						<view class="tab">{{item.label}}</view>
						<view class="time">{{item.createtime_text}}</view>
					</view>
				</view>
				<view class="right">
					<image :src="item.image" mode=""></image>
				</view>
			</view>
		</view>
		<tabbarBottom :current="3" v-if="status==2"></tabbarBottom>
		<tabbarBottom1 :current="3" v-if="status==0 || status==1"></tabbarBottom1>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				currentPage: 1,
				isMore: true,
				status:0
			}
		},
		onShow() {
			this.getNewsList()
			this.status = uni.getStorageSync('status')
		},
		onReachBottom() {
			if (this.isMore) {
				this.currentPage++
				this.getNewsList()
			}
		},
		methods: {
			getNewsList() {
				this.$http.request('GET', this.$apis.getNewsList,{
					page:this.currentPage
				}).then(res => {
					if (res.data.code == 1) {
						if (res.data.data.length > 0) {
							this.list = this.list.concat(res.data.data)
						} else {
							this.isMore = false
						}
					}
				}).finally(res => {})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.cardList {
		.list {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 10px;
			border-bottom: 1px solid #eee;

			.left {
				margin-right: 5px;
				.title {
					font-size: 16px;
					margin-bottom: 10px;
				}

				.bom {
					display: flex;
					align-items: center;

					.tab {
						font-size: 12px;
						padding: 0 5px;
						color: #FB7208;
						background-color: rgba(251, 114, 8, 0.1);
					}

					.time {
						font-size: 11px;
						color: #999;
						margin-left: 20px;
					}
				}

			}

			.right {
				image {
					width: 80px;
					height: 50px;
				}
			}
		}
	}
</style>