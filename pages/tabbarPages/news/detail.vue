<template>
	<view class="index">
		<navTop :title="newsInfo.title"></navTop>
		<view class="top">
			<view class="tab">{{newsInfo.label}}</view>
			<view class="time">{{newsInfo.createtime_text}}</view>
		</view>
		
		<view class="content" v-html="newsInfo.content"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				newsInfo:{},
				id:''
			}
		},
		onShow() {
			this.getNewsInfo()
		},
		onLoad(option) {
			this.id = option.id
		},
		methods: {
			getNewsInfo() {
				this.$http.request('GET', this.$apis.getNewsInfo,{
					id:this.id
				}).then(res => {
					if (res.data.code == 1) {
						this.newsInfo = res.data.data
					}
				}).finally(res => {})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.index{
		padding: 15px;
	}
.top{
	display: flex;
	justify-content: space-between;
	margin-bottom: 20px;
	
	.tab{
		font-size: 14px;
		padding: 0 5px;
		color: #FB7208;
		background-color: rgba(251, 114, 8, 0.1);
	}
	
	.time{
		font-size: 14px;
		color: #999;
		margin-left: 20px;
	}
	
}
</style>
