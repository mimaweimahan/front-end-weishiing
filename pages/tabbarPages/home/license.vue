<template>
	<view class="index">
		<navTop :title="$t('other.txt10')"></navTop>
		<view class="content">
			<image :src="img" mode="widthFix" @tap="previewImage"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				img:'../../../static/images/license.jpg'
			}
		},
		methods: {
			previewImage() {
				uni.previewImage({
					urls: [this.img], // 需要预览的图片链接列表
					current: this.img // 当前显示图片的链接
				});
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
		image {
			width: 100%;
			margin-top: 20px;
		}
	}
</style>