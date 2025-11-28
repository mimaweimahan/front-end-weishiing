<template>
	<view class="index">
		<navTop :title="$t('other.txt8')"></navTop>
		<view class="content">
			<view class="card" v-for="(item,index) in list" :key="index">
				<view class="title">{{item.title}}</view>
				<view class="intro">{{item.content}}</view>
				<view class="time">{{item.createtime_text}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
				currentPage: 1,
				isMore: true
			}
		},
		onShow() {
			this.getNoticeList()
		},
		onReachBottom() {
			if (this.isMore) {
				this.currentPage++
				this.getNoticeList()
			}
		},
		methods: {
			getNoticeList() {
				this.$http.request('GET', this.$apis.getNoticeList,{
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
	.index {
		min-height: 100vh;
		background-color: rgba(251, 114, 8, 0.05);

		.content {
			padding: 15px;

			.card {
				background-color: #fff;
				margin-bottom: 10px;
				padding: 10px;
				border-radius: 10px;

				.title {
					font-size: 20px;
					font-weight: 600;
				}

				.intro {
					font-size: 16px;
					margin-top: 5px;
				}

				.time {
					font-size: 13px;
					margin-top: 10px;
					color: #999;
				}
			}
		}
	}
</style>