<template>
	<view>
		<view class="content">
			<view class="top">
				<view class="set">
					<view class=""></view>
					<view class="">
						<!-- <image src="../../../static/images/set.png" mode="" @click="go('/pages/tabbarPages/mine/set')"></image> -->
					</view>
				</view>

			</view>
			<view class="info">
				<image :src="userInfo.avatar" mode=""></image>
				<view class="username">{{userInfo.nickname}}</view>
				<view class="id">{{$t('mine.txt1')}}:{{userInfo.user_id}}</view>
			</view>

			<view class="handle" v-if="userInfo.safe_status==2">
				<view class="btn" @click="go('/pages/tabbarPages/mine/service')">{{$t('mine.txt2')}}</view>
				<view class="btn" @click="go('/pages/tabbarPages/mine/withdrawal')">{{$t('mine.txt3')}}</view>
				<view class="btn" @click="go('/pages/tabbarPages/assets/index')">{{$t('mine.txt4')}}</view>
			</view>

			<view v-if="userInfo.safe_status==0" class="authentication"
				@click="go('/pages/tabbarPages/mine/authentication')">
				<view class="left">
					<image src="../../../static/images/mine1.png" mode=""></image>
					<view class="text">{{$t('mine.txt5')}}</view>
				</view>
				<view class="right">
					<view class="text">{{$t('mine.txt6')}}</view>
					<u-icon name="arrow-right" color="rgba(251, 114, 8,0.5)" size="40"></u-icon>
				</view>
			</view>
			<view v-if="userInfo.safe_status==1" class="authentication"
				@click="go('/pages/tabbarPages/mine/authentication?status=1')">
				<view class="left">
					<image src="../../../static/images/mine1.png" mode=""></image>
					<view class="text">{{$t('mine.txt5')}}</view>
				</view>
				<view class="right">
					<view class="text">{{$t('mine.txt7')}}</view>
					<u-icon name="arrow-right" color="rgba(251, 114, 8,0.5)" size="40"></u-icon>
				</view>
			</view>

			<view class="serviceList">
				<view class="card" v-if="userInfo.safe_status==2"
					@click="go('/pages/tabbarPages/mine/authentication?status=2')">
					<view class="left">
						<image src="../../../static/images/mine1.png" mode=""></image>
					</view>
					<view class="right">
						<view class="text">{{$t('mine.txt5')}}</view>
						<view class="text" style="color: #FB7208;font-size: 14px;">{{$t('mine.txt8')}}</view>
					</view>
				</view>
				<view class="card" @click="go('/pages/tabbarPages/mine/service')">
					<view class="left">
						<image src="../../../static/images/mine2.png" mode=""></image>
					</view>
					<view class="right">
						<view class="text">{{$t('mine.txt9')}}</view>
						<u-icon name="arrow-right" color="rgba(251, 114, 8,0.5)" size="40"></u-icon>
					</view>
				</view>
				<view class=""  v-if="userInfo.safe_status==2">
					<view class="card" @click="go('/pages/tabbarPages/mine/record')">
						<view class="left">
							<image src="../../../static/images/mine3.png" mode=""></image>
						</view>
						<view class="right">
							<view class="text">{{$t('mine.txt10')}}</view>
							<u-icon name="arrow-right" color="rgba(251, 114, 8,0.5)" size="40"></u-icon>
						</view>
					</view>
					<view class="card" @click="go('/pages/tabbarPages/mine/share')">
						<view class="left">
							<image src="../../../static/images/mine4.png" mode=""></image>
						</view>
						<view class="right">
							<view class="text">{{$t('mine.txt11')}}</view>
							<u-icon name="arrow-right" color="rgba(251, 114, 8,0.5)" size="40"></u-icon>
						</view>
					</view>
					<view class="card" @click="go('/pages/tabbarPages/mine/help')">
						<view class="left">
							<image src="../../../static/images/mine5.png" mode=""></image>
						</view>
						<view class="right">
							<view class="text">{{$t('mine.txt12')}}</view>
							<u-icon name="arrow-right" color="rgba(251, 114, 8,0.5)" size="40"></u-icon>
						</view>
					</view>

					<view class="card" @click="go('/pages/tabbarPages/mine/changePwd')">
						<view class="left">
							<image src="../../../static/images/set1.png" mode=""></image>
						</view>
						<view class="right">
							<view class="text">{{$t('set.txt1')}}</view>
							<u-icon name="arrow-right" color="rgba(251, 114, 8,0.5)" size="40"></u-icon>
						</view>
					</view>
					<view class="card" @click="go('/pages/tabbarPages/mine/changePayPwd')">
						<view class="left">
							<image src="../../../static/images/set2.png" mode=""></image>
						</view>
						<view class="right">
							<view class="text">{{$t('other.txt13')}}</view>
							<u-icon name="arrow-right" color="rgba(251, 114, 8,0.5)" size="40"></u-icon>
						</view>
					</view>
					<!-- <view class="card" @click="go('/pages/tabbarPages/mine/lang')">
					<view class="left">
						<image src="../../../static/images/set3.png" mode=""></image>
					</view>
					<view class="right">
						<view class="text">{{$t('set.txt2')}}</view>
						<u-icon name="arrow-right" color="rgba(251, 114, 8,0.5)" size="40"></u-icon>
					</view>
				</view> -->
					<view class="card" @click="show=true">
						<view class="left">
							<image src="../../../static/images/set4.png" mode=""></image>
						</view>
						<view class="right">
							<view class="text">{{$t('changeUser.txt1')}}</view>
							<u-icon name="arrow-right" color="rgba(251, 114, 8,0.5)" size="40"></u-icon>
						</view>
					</view>
				</view>

			</view>
			<view class="btn">
				<view class="confirm" @click="logOut">{{$t('set.txt3')}}</view>
			</view>
		</view>
		<u-picker range-key="username" mode="selector" v-model="show" :default-selector="[0]" @confirm="confirm"
			:range="selector" :confirm-text="$t('confirm')" :cancel-text="$t('cancel')"></u-picker>
		<tabbarBottom :current="4"  v-if="userInfo.safe_status==2"></tabbarBottom>
		<tabbarBottom1 :current="4"  v-if="userInfo.safe_status==0 || userInfo.safe_status==1"></tabbarBottom1>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				status: 0,
				userInfo: {},
				show: false,
				selector: [],
			}
		},
		onShow() {
			this.getUserinfo()
			this.selector = uni.getStorageSync('userList')
			this.selector.push({
				username: this.$t('changeUser.txt2')
			})
		},
		methods: {
			getUserinfo() {
				this.$http.request('GET', this.$apis.getUserinfo).then(res => {
					if (res.data.code == 1) {
						this.userInfo = res.data.data
					}
				}).finally(res => {})
			},
			confirm(e) {
				let index = e[0]
				if (index == this.selector.length - 1) {
					uni.navigateTo({
						url: '/pages/userPages/login'
					})
				} else {
					this.$store.commit('setToken', this.selector[index].token);
					uni.showToast({
						title: this.$t('changeUser.txt3'),
						icon: 'none'
					})

					setTimeout(() => {
						window.location.reload()
					}, 1000)
				}

			},
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
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		min-height: 100vh;
		background: rgba(251, 114, 8, 0.05);
	}

	.top {
		background-image: url('../../../static/images/minebg.png');
		background-size: 100% 110px;
		background-repeat: no-repeat;
		border-bottom-left-radius: 10px;
		border-bottom-right-radius: 10px;
		height: 110px;
		padding: 15px;

		.set {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		image {
			width: 25px;
			height: 25px;
		}
	}

	.info {
		text-align: center;
		margin-top: -45px;

		image {
			width: 70px;
			height: 70px;
			border-radius: 50%;
		}

		.username {
			font-size: 16px;
			color: #333;
			margin-bottom: 5px;
		}

		.id {
			background: rgba(251, 114, 8, 0.2);
			color: #FB7208;
			padding: 2px 50px;
			border-radius: 20px;
			font-weight: 500;
			display: inline-block;
		}
	}

	.handle {
		padding: 0 15px;
		display: flex;
		align-items: center;
		margin-top: 30px;
		justify-content: space-between;

		.btn {
			border-radius: 5px;
			padding: 8px;
			background: #FB7208;
			color: #fff;
			height: 35px;
			text-align: center;
			width: 28%;
		}
	}

	.authentication {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 30px 15px 0 15px;
		padding: 12px 2%;
		background-color: #fff;
		border-radius: 12px;
		// font-size: 16px;

		image {
			width: 20px;
			height: 20px;
			margin-right: 10px;
		}

		.left,
		.right {
			display: flex;
			align-items: center;
		}

		.right {
			font-size: 14px;
			color: red;
		}
	}

	.serviceList {
		background-color: #fff;
		border-radius: 10px;
		margin: 20px 3%;

		.card {
			display: flex;
			padding: 5px 3%;
			align-items: center;
		}

		.left {
			display: flex;
			align-items: center;
		}

		.right {
			display: flex;
			align-items: center;
			justify-content: space-between;
			flex: 1;
			margin-left: 3%;
			border-bottom: 1px solid #eee;
			padding-bottom: 10px;
			margin-top: 10px;
		}

		.card:nth-last-child(1) {
			.right {
				border: none;
			}
		}

		image {
			width: 20px;
			height: 20px;
		}
	}

	.card1 {
		display: flex;
		padding: 5px 3%;
		align-items: center;

		.left {
			display: flex;
			align-items: center;
		}

		.right {
			display: flex;
			align-items: center;
			justify-content: space-between;
			flex: 1;
			margin-left: 3%;
			border-bottom: 1px solid #eee;
			padding-bottom: 10px;
			margin-top: 10px;
		}

		image {
			width: 25px;
			height: 25px;
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