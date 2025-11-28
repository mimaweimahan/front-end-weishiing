<template>
	<view class="index">
		<view class="top">
			<view class=""></view>
			<view class="">
				<!-- <image style="border-radius: 50%;" :src="`../../static/lang/lang.${lang}.png`" mode="" @click="go('/pages/tabbarPages/mine/lang')"></image> -->
			</view>
		</view>

		<view class="logo">
			<image src="../../static/logo.jpg" mode=""></image>
		</view>

		<view class="content">
			<view class="data">
				<u-field v-model="phone" label-width="0" :border-bottom="false" icon="../../static/images/phone.png"
					:placeholder="$t('login.txt1')" :field-style="style" :placeholder-style="pStyle">
				</u-field>
			</view>
			<view class="data">
				<u-field v-model="password" label-width="0" :border-bottom="false" :type="pwdType"
					icon="../../static/images/pwd.png" :right-icon="pwdIcon" :placeholder="$t('login.txt2')"
					:field-style="style" :placeholder-style="pStyle" @right-icon-click="pwdView">
				</u-field>
			</view>
			<view class="btn">
				<view class="confirm" @click="login">{{$t('login.txt3')}}</view>
			</view>
			<view class="text" @click="go('/pages/userPages/register')">{{$t('login.txt4')}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: '',
				password: '',
				style: {
					paddingLeft: '5px',
					height: '20px'
				},
				pStyle: "color:#999",
				pwdIcon:'eye',
				pwdType:'password',
				isClick:false,
				lang:''
			}
		},
		onShow() {
			this.lang = uni.getStorageSync('lang')
		},
		methods: {
			// 查看密码
			pwdView(){
				if(this.pwdIcon=='eye'){
					this.pwdIcon='eye-fill'
					this.pwdType='text'
				}else{
					this.pwdIcon='eye'
					this.pwdType='password'
				}
			},
			login(){
				if(this.isClick){
					return
				}else{
					this.isClick = true
				}
				this.$http.request('POST',this.$apis.login,{
					account: this.phone,
					password: this.password,
				}).then(res=>{
					if(res.data.code==1){
						this.$store.commit('setToken', res.data.data.userinfo.token);
						this.$store.commit('setUid', res.data.data.userinfo.user_id);
						this.$store.commit('setUsers', res.data.data.userinfo);
						uni.setStorageSync('isLogin',true)
						this.phone=''
						this.password=''
						uni.showToast({
							title:res.data.msg,
							icon:'none'
						})
						setTimeout(()=>{
							uni.switchTab({
								url:'/pages/tabbarPages/home/index'
							})
						},2000)
					}
				}).finally(res=>{
					this.isClick = false
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.index {
		padding: 20px;
	}

	.top {
		display: flex;
		justify-content: space-between;
		align-items: center;

		image {
			width: 30px;
			height: 30px;
		}
	}

	.logo {
		text-align: center;
		margin-top: 10px;

		image {
			width: 100px;
			height: 100px;
			border-radius: 20px;
		}
	}

	.content {
		margin-top: 50px;
		padding: 0 5%;

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
				margin-top: 35px;
				border-radius: 30px;
				height: 40px;
				line-height: 40px;
				text-align: center;
			}
		}
		
		.text{
			color: #ffa959;
			margin-top: 15px;
			font-size: 16px;
			// margin-bottom: 20px;
			border: 1px solid #FB7208;
			border-radius: 30px;
			text-align: center;
			padding: 8px 0;
		}
	}
</style>