<template>
	<view class="index">
		<navTop :title="''"></navTop>
		<view class="content">
			<image :src="img" mode=""></image>
			<view class="address">{{address}}</view>
			<view class="btn" @click="copy">{{$t('other.txt6')}}</view>
		</view>
	</view>
</template>

<script>
	import QRCode from 'qrcode'
	export default {
		data() {
			return {
				img: '',
				address: 'http://www.kucoiinliu.com/share?agent=18417'
			}
		},
		onShow() {
			this.getShareUrl()
		},
		methods: {
			getShareUrl() {
				this.$http.request('GET', this.$apis.getShareUrl).then(res => {
					if (res.data.code == 1) {
						this.address = res.data.data
						this.setCode(this.address)
					}
				}).finally(res => {})
			},
			setCode(path = 'https://www.example.com') {
				const opts = {
					errorCorrectionLevel: 'H',
					type: 'image/png',
					quality: 0.92,
					margin: 1,
				};

				QRCode.toDataURL(path, opts)
					.then(url => {
						this.img = url
					})
					.catch(err => {
						console.error(err);
					});
			},
			copy() {
				uni.setClipboardData({
					data: this.address,
					success: () => {
						uni.showToast({
							title: '',
							icon: 'success'
						});
					}
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
		background-image: url('../../../static/images/bg6.png');
		background-size: 100% 58px;
		background-repeat: no-repeat;
		background-color: #fff;
		text-align: center;
		padding: 100px 0;


		image {
			width: 164px;
			height: 164px;
			margin-bottom: 20px;
		}

		.address {
			border-radius: 20px;
			padding: 10px 5%;
			background: #f7f7fa;
			width: 80%;
			white-space: nowrap;
			/* 禁止文本换行 */
			overflow: hidden;
			/* 超出容器部分隐藏 */
			text-overflow: ellipsis;
			margin: auto;
		}

		.btn {
			padding: 10px 0;
			background-color: #FB7208;
			margin: 30px 50px;
			border-radius: 20px;
			color: #fff;
		}
	}
</style>