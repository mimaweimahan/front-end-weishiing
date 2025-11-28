<template>
	<view class="index">
		<!-- <navTop :title="$t('register.txt1')"></navTop> -->
		<view class="top">
			<image src="../../static/logo.jpg" mode=""></image>
			<view class="right">
				<view class="text1">{{$t('other.txt4')}}</view>
				<view class="text2">{{$t('other.txt5')}}</view>
			</view>
		</view>
		<image class="center" src="../../static/images/rebg2.jpg" mode=""></image>
		<view class="content">
			<view class="data">
				<u-field v-model="phone" label-width="0" :border-bottom="false" icon="../../static/images/phone.png"
					:placeholder="$t('register.txt2')" :field-style="style" :placeholder-style="pStyle">
				</u-field>
			</view>
			<view class="data">
				<u-field v-model="password" label-width="0" :border-bottom="false" :type="pwdType1"
					icon="../../static/images/pwd.png" :right-icon="pwdIcon1" :placeholder="$t('register.txt3')"
					:field-style="style" :placeholder-style="pStyle" @right-icon-click="pwdView1">
				</u-field>
			</view>
			<view class="data">
				<u-field v-model="password2" label-width="0" :border-bottom="false" :type="pwdType2"
					icon="../../static/images/pwd.png" :right-icon="pwdIcon2" :placeholder="$t('register.txt4')"
					:field-style="style" :placeholder-style="pStyle" @right-icon-click="pwdView2">
				</u-field>
			</view>
			<view class="data">
				<u-field v-model="pay_password" label-width="0" :border-bottom="false" password type="number"
					icon="../../static/images/pwd.png" :placeholder="$t('other.txt11')" :field-style="style"
					:placeholder-style="pStyle" maxlength="6">
				</u-field>
			</view>
			<!-- <view class="data">
				<u-field v-model="name" label-width="0" :border-bottom="false" icon="../../static/images/personal.png"
					placeholder="Please enter your real name" :field-style="style" :placeholder-style="pStyle">
				</u-field>
			</view> -->
			<view class="btn">
				<view class="confirm" @click="register">{{$t('register.txt5')}}</view>
			</view>
			<view class="logintext" @click="go('/pages/userPages/login')">{{$t('login.txt3')}}</view>
			<view class="text">
				<u-radio-group v-model="checked">
					<u-radio @change="radioChange" name="1">
						<view class="radioText">{{$t('register.txt6')}}<text>{{$t('register.txt7')}}</text></view>
					</u-radio>
				</u-radio-group>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: '',
				password: '',
				password2: '',
				pay_password: '',
				name: '',
				style: {
					paddingLeft: '5px',
					height: '20px'
				},
				pStyle: "color:#999",
				pwdIcon1: 'eye',
				pwdType1: 'password',
				pwdIcon2: 'eye',
				pwdType2: 'password',
				checked: '0',
				isClick: false,
				invite_code: ''
			}
		},
		onLoad(option) {
			if (option.invite_code) {
				this.invite_code = option.invite_code
			}
		},
		methods: {
			// 查看密码
			pwdView1() {
				if (this.pwdIcon1 == 'eye') {
					this.pwdIcon1 = 'eye-fill'
					this.pwdType1 = 'text'
				} else {
					this.pwdIcon1 = 'eye'
					this.pwdType1 = 'password'
				}
			},
			// 查看密码
			pwdView2() {
				if (this.pwdIcon2 == 'eye') {
					this.pwdIcon2 = 'eye-fill'
					this.pwdType2 = 'text'
				} else {
					this.pwdIcon2 = 'eye'
					this.pwdType2 = 'password'
				}
			},
			radioChange(e) {
				this.checked = e
			},
			register() {
				if (this.password != this.password2) {
					uni.showToast({
						title: this.$t('register.txt8'),
						icon: 'none'
					})
					return
				}
				
				if(this.pay_password.length<4){
					uni.showToast({
						title: this.$t('other.txt25'),
						icon: 'none'
					})
					return
				}

				if (this.checked != '1') {
					uni.showToast({
						title: this.$t('register.txt9'),
						icon: 'none'
					})
					return
				}

				if (this.isClick) {
					return
				} else {
					this.isClick = true
				}
				this.$http.request('POST', this.$apis.register, {
					username: this.phone,
					password: this.password,
					invite_code: this.invite_code,
					pay_password: this.pay_password
				}).then(res => {
					if (res.data.code == 1) {
						this.$store.commit('setToken', res.data.data.userinfo.token);
						this.$store.commit('setUid', res.data.data.userinfo.user_id);
						this.$store.commit('setUsers', res.data.data.userinfo);
						uni.setStorageSync('isLogin', true)
						this.phone = ''
						this.password = ''
						this.password2 = ''
						this.pay_password = ''
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						})
						setTimeout(() => {
							uni.switchTab({
								url: '/pages/tabbarPages/home/index'
							})
						}, 2000)
					}
				}).finally(res => {
					this.isClick = false
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.index {}

	.top {
		background-image: url('../../static/images/rebg1.jpg');
		background-repeat: no-repeat;
		background-size: cover;
		width: 100%;
		display: flex;
		padding-top: 40px;
		padding-left: 35px;
		align-items: center;
		height: 206px;

		image {
			width: 60px;
			height: 60px;
			border-radius: 50%;
		}

		.right {
			padding-left: 25px;

			.text1 {
				color: #fff;
				font-weight: bold;
				font-size: 20px;
				margin-bottom: 5px;
			}

			.text2 {
				font-size: 21px;
				color: #fff;
			}

		}
	}

	.center {
		width: 100%;
	}

	.content {
		padding: 20px calc(20px + 5%);


		.data {
			margin-bottom: 20px;
			border: 1px solid #e7eaed;
			border-radius: 30px;
		}

		.u-field {
			padding: 10px 15px;
		}

		.btn {
			.confirm {
				background: #FB7208;
				color: #fff;
				border-color: #FB7208;
				font-size: 16px;
				border-radius: 30px;
				height: 40px;
				line-height: 40px;
				text-align: center;
			}
		}

		.text {
			margin-top: 15px;

			.radioText {
				color: #787a7c;
				font-size: 14px;

				text {
					color: #333;
				}
			}
		}


	}

	.logintext {
		color: #ffa959;
		margin-top: 15px;
		font-size: 16px;
		// margin-bottom: 20px;
		border: 1px solid #FB7208;
		border-radius: 30px;
		text-align: center;
		padding: 8px 0;
	}
</style>