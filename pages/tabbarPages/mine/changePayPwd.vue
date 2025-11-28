<template>
	<view class="index">
		<navTop :title="$t('other.txt13')"></navTop>
		<view class="content">
			<view class="data">
				<view class="label">{{$t('set.txt5')}}</view>
				<view class="input">
					<u-input v-model="oldPwd" type="text" :placeholder="$t('set.txt6')" />
				</view>
			</view>
			<view class="data">
				<view class="label">{{$t('set.txt7')}}</view>
				<view class="input">
					<u-input maxlength="6" v-model="newPwd" password type="number" :placeholder="$t('set.txt8')" />
				</view>
			</view>
			<view class="data">
				<view class="label">{{$t('set.txt9')}}</view>
				<view class="input">
					<u-input maxlength="6" v-model="newPwd2" password type="number" :placeholder="$t('set.txt10')" />
				</view>
			</view>
		</view>

		<view class="btn">
			<view class="confirm" @click="resetpwd">{{$t('set.txt11')}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				oldPwd: '',
				newPwd: '',
				newPwd2: '',
				isClick:false
			}
		},
		methods: {
			resetpwd() {
				if(this.newPwd.length<4 || this.newPwd2.length<4){
					uni.showToast({
						title: this.$t('other.txt25'),
						icon: 'none'
					})
					return
				}
				if(this.isClick){
					return
				}else{
					this.isClick = true
				}
				this.$http.request('POST', this.$apis.resetpwd,{
					old_password:this.oldPwd,
					new_password:this.newPwd,
					confirm_password:this.newPwd2,
					type:2
				}).then(res => {
					if (res.data.code == 1) {
						uni.showToast({
							title:res.data.msg,
							icon:'none'
						})
						setTimeout(()=>{
							uni.navigateBack({
								delta:1
							})
						},2000)
					}
				}).finally(res => {
					this.isClick = false
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

		.data {
			display: flex;
			align-items: center;
			padding: 10px 5%;
			border-bottom: 1px solid #eee;

			&:nth-child(1) {
				border-top: 1px solid #eee;
			}

			.label {
				width: 25%;
			}

			.input {
				flex: 1;
				border-radius: 5px;
				padding: 0px 5%;
				background: #f7f7fa;
				line-height: inherit;
			}
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
			display: block;
			border: 0;
			margin: 30px auto;
			text-align: center;
		}
	}
</style>