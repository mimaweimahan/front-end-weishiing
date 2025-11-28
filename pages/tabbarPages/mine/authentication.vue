<template>
	<view class="index">
		<navTop :title="$t('mine.txt5')"></navTop>
		<view class="" v-show="status==0">
			<view class="content">
				<view class="data">
					<view class="left">{{$t('other.txt18')}}</view>
					<view class="right" style="padding: 0 10px ;">
						<u-input v-model="real_name" type="text" :placeholder="$t('other.txt16')" />
					</view>
				</view>
				<view class="data">
					<view class="left">{{$t('other.txt20')}}</view>
					<view class="right" style="padding: 0 10px ;">
						<u-input v-model="id_card" type="text" :placeholder="$t('other.txt21')" />
					</view>
				</view>
				<view class="data">
					<view class="left">{{$t('other.txt19')}}</view>
					<view class="right" style="padding: 0 10px ;">
						<u-input v-model="country" type="text" :placeholder="$t('other.txt17')" />
					</view>
				</view>
				<view class="data">
					<view class="left">{{$t('authentication.txt5')}}</view>
					<view class="right" @click="upload(0)">{{$t('authentication.txt2')}}</view>
				</view>
				<view class="data">
					<view class="left">{{$t('authentication.txt5')}}</view>
					<view class="right" @click="upload(1)">{{$t('authentication.txt3')}}</view>
				</view>
				<view class="img">
					<image :src="img1" mode=""></image>
					<image :src="img2" mode=""></image>
				</view>
			</view>
			<view class="btn">
				<view class="confirm" @click="submit">{{$t('authentication.txt4')}}</view>
			</view>
		</view>


		<view class="end" v-show="status!=0">
			<view class="data">
				<view class="left">{{$t('other.txt23')}}</view>
				<view class="right" v-if="status==1">{{$t('mine.txt7')}}</view>
				<view class="right" v-if="status==2">{{$t('mine.txt8')}}</view>
				<view class="right" v-if="status==3">{{$t('authentication.txt6')}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				img1: '',
				img2: '',
				img11: '',
				img22: '',
				status: 0,
				isClick: false,
				real_name: '',
				id_card: '',
				country: ''
			}
		},
		onLoad(option) {
			if (option.status) {
				this.status = option.status
			}
		},
		methods: {
			upload(type) {
				const that = this
				uni.chooseImage({
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;

						uni.uploadFile({
							url: that.$apis.upload,
							filePath: tempFilePaths[0],
							header: {
								token: uni.getStorageSync('token'),
							},
							name: 'file',
							formData: {
								file: that.path
							},
							success: (uploadFileRes) => {
								const data = JSON.parse(uploadFileRes.data);
								if (type == 0) {
									that.img1 = data.data.fullurl
									that.img11 = data.data.url
								} else {
									that.img2 = data.data.fullurl
									that.img22 = data.data.url
								}

							}
						})
					}
				});

			},
			submit() {
				const that = this
				if (that.isClick) {
					return
				}
				if (!that.img1) {
					uni.showToast({
						title: that.$t('authentication.txt7'),
						icon: 'none'
					})
					return
				}
				if (!that.img2) {
					uni.showToast({
						title: that.$t('authentication.txt7'),
						icon: 'none'
					})
					return
				}
				that.isClick = true
				that.$http.request('POST', that.$apis.saveIDCardImages, {
					image1: that.img11,
					image2: that.img22,
					real_name: that.real_name,
					id_card: that.id_card,
					country: that.country
				}).then(res => {
					if (res.data.code == 1) {
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						})
						setTimeout(() => {
							that.status = 3
						}, 1000)
					}
				}).finally(res => {
					that.isClick = false
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.index {
		min-height: 100vh;
		background-color: rgba(251, 114, 8, 0.05);
	}

	.content {
		background-color: #fff;
		margin-top: 10px;

		.data {
			border-bottom: 1px solid #eee;
			display: flex;
			padding: 10px 5%;
			align-items: center;

			.left {
				font-size: 16px;
				width: 25%;
			}

			.right {
				border-radius: 5px;
				display: flex;
				padding: 10px 3%;
				width: 70%;
				background: #f7f7fa;
				margin-left: 5%;
			}
		}

		.img {
			padding: 12px;
		}

		image {
			width: 100%;
			height: 195px;
		}
	}

	.btn {

		.confirm {
			background: #FB7208;
			width: 60%;
			border-radius: 20px;
			color: #fff;
			font-size: 16px;
			padding: 10px 0;
			border: 0;
			margin: 30px auto;
			text-align: center;
		}
	}

	.end {
		background-color: #fff;

		.data {
			border-top: 1px solid #eee;
			display: flex;
			padding: 10px 5%;
			align-items: center;

			.left {
				font-size: 16px;
				width: 25%;
			}

			.right {
				border-radius: 5px;
				display: flex;
				padding: 10px 3%;
				width: 70%;
				background: #f7f7fa;
				margin-left: 5%;
			}
		}
	}
</style>