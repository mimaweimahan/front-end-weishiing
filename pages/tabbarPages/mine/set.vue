<template>
	<view class="index">
		<navTop :title="''"></navTop>
		<view class="content">
			<view class="data" @click="go('/pages/tabbarPages/mine/changePwd')">
				<view class="text">{{$t('set.txt1')}}</view>
				<u-icon name="arrow-right" color="#999" size="35"></u-icon>
			</view>
			<view class="data" @click="go('/pages/tabbarPages/mine/changePayPwd')">
				<view class="text">{{$t('other.txt13')}}</view>
				<u-icon name="arrow-right" color="#999" size="35"></u-icon>
			</view>
			<view class="data" @click="go('/pages/tabbarPages/mine/lang')">
				<view class="text">{{$t('set.txt2')}}</view>
				<u-icon name="arrow-right" color="#999" size="35"></u-icon>
			</view>
			<view class="data" @click="show=true">
				<view class="text">{{$t('changeUser.txt1')}}</view>
				<u-icon name="arrow-right" color="#999" size="35"></u-icon>
			</view>

			<view class="btn">
				<view class="confirm" @click="logOut">{{$t('set.txt3')}}</view>
			</view>
		</view>
		<u-picker range-key="username" mode="selector" v-model="show" :default-selector="[0]" @confirm="confirm"
			:range="selector" :confirm-text="$t('confirm')" :cancel-text="$t('cancel')"></u-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				selector: [],
			}
		},
		onShow() {
			this.selector = uni.getStorageSync('userList')
			this.selector.push({
				username: this.$t('changeUser.txt2')
			})
		},
		methods: {
			logOut() {
				var that = this
				uni.showModal({
					showCancel: true,
					cancelText: that.$t('cancel'),
					confirmText: that.$t('confirm'),
					title: that.$t('prompt'),
					content: that.$t('tip'),
					success: function(res) {
						if (res.confirm) {
							that.$store.commit('setToken', '');
							that.$store.commit('setUid', '');
							uni.reLaunch({
								url: '/pages/userPages/login'
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})

			},
			confirm(e) {
				let index = e[0]
				if (index == this.selector.length - 1) {
					uni.navigateTo({
						url:'/pages/userPages/login'
					})
				} else {
					this.$store.commit('setToken', this.selector[index].token);
					uni.showToast({
						title: this.$t('changeUser.txt3'),
						icon: 'none'
					})
					setTimeout(() => {
						uni.switchTab({
							url: '/pages/tabbarPages/mine/index'
						})
					}, 1000)
				}

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
		margin-top: 10px;
	}

	.data {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #fff;
		padding: 10px 3%;
		margin-bottom: 20px;

		.text {
			font-size: 16px;
			font-weight: normal;
		}
	}

	.btn {
		.confirm {
			color: #fff;
			background: #FB7208;
			width: 70%;
			margin: 0 auto;
			padding: 10px 0;
			font-size: 18px;
			border-radius: 30px;
			text-align: center;
		}
	}
</style>