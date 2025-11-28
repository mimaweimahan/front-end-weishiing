<template>
	<view class="index">
		<navTop :title="$t('withdrawal.txt1')"></navTop>
		<view class="header">
			<view class="text" @click="changeTab(0)">{{$t('withdrawal.txt15')}}</view>
			<view class="text" @click="changeTab(1)">{{$t('withdrawal.txt16')}}</view>
		</view>
		<view class="bank" v-if="tabIndex==0">
			<!-- <view class="select">
				<view class="data" @click="change(0)">
					<view class="label">fdwafes</view>
					<view class="info">{{value1}}</view>
					<u-icon name="arrow-down" color="#000" size="25"></u-icon>
				</view>
				<view class="data" @click="change(1)">
					<view class="label">fdwafes</view>
					<view class="info">{{value2}}</view>
					<u-icon name="arrow-down" color="#000" size="25"></u-icon>
				</view>
			</view> -->
			<view class="inputList">
				<view class="data">
					<view class="label">{{$t('other.txt18')}}</view>
					<view class="input">
						<u-input v-model="real_name" type="text" :placeholder="$t('other.txt16')" />
					</view>
				</view>
				<view class="data">
					<view class="label">{{$t('other.txt19')}}</view>
					<view class="input">
						<u-input v-model="country" type="text" :placeholder="$t('other.txt17')" />
					</view>
				</view>
				<view class="data">
					<view class="label">{{$t('withdrawal.txt4')}}</view>
					<view class="input">
						<u-input v-model="name1" type="text" :placeholder="$t('withdrawal.txt5')" />
					</view>
				</view>
				<view class="data">
					<view class="label">{{$t('withdrawal.txt6')}}</view>
					<view class="input">
						<u-input v-model="opening" type="text"
							:placeholder="$t('withdrawal.txt7')" />
					</view>
				</view>
				<view class="data">
					<view class="label">{{$t('withdrawal.txt8')}}</view>
					<view class="input">
						<u-input v-model="bankNum" type="text" :placeholder="$t('withdrawal.txt9')" />
					</view>
				</view>
				<!-- <view class="data">
					<view class="label">{{$t('withdrawal.txt10')}}</view>
					<view class="input">
						<u-input v-model="branch" type="text" :placeholder="$t('withdrawal.txt11')" />
					</view>
				</view> -->
				<!-- <view class="data">
					<view class="label">{{$t('withdrawal.txt12')}}</view>
					<view class="input">
						<u-input v-model="branchNum" type="text" :placeholder="$t('withdrawal.txt13')" />
					</view>
				</view> -->
			</view>
		</view>
		<view class="usdt" v-else>
			<view class="select">
				<view class="data" @click="change(2)">
					<view class="label">{{$t('withdrawal.txt14')}}</view>
					<view class="info">{{usdtName}}</view>
					<u-icon name="arrow-down" color="#000" size="25"></u-icon>
				</view>
			</view>
			<view class="inputList">
				<view class="data">
					<view class="label">{{$t('withdrawal.txt4')}}</view>
					<view class="input">
						<u-input v-model="name2" type="text" :placeholder="$t('withdrawal.txt5')" />
					</view>
				</view>
			</view>
		</view>

		<view class="btn">
			<view class="confirm" @click="saveAddress">
				{{$t('withdrawal.txt28')}}
			</view>
		</view>
		<u-picker mode="selector" v-model="show" :default-selector="[0]" :range="selector"></u-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				selector: [],
				selector1: [1, 2, 3],
				selector2: [4, 5, 6],
				selector3: ['TRC-20', 'ERC-20'],
				usdtName: 'TRC-20',
				value1: 'xxx',
				value2: 'xxx2',
				name1: '',
				name2: '',
				opening: '',
				bankNum: '',
				branch: '',
				branchNum: '',
				tabIndex: 0,
				real_name:'',
				country:''
			}
		},
		onLoad(option) {
			if (option.tab) {
				this.tabIndex = option.tab
			}
		},
		methods: {
			change(type) {
				if (type == 0) {
					this.selector = this.selector1
				} else if (type == 1) {
					this.selector = this.selector2
				} else {
					this.selector = this.selector3
				}
				this.show = true
			},
			changeTab(index) {
				this.tabIndex = index
			},
			saveAddress() {
				if (this.tabIndex == 0) {
					this.$http.request('POST', this.$apis.saveUserBankList, {
						username: this.name1,
						account: this.bankNum,
						bank_name :this.opening,
						real_name:this.real_name,
						country:this.country
					}).then(res => {
						if (res.data.code == 1) {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							})
							setTimeout(() => {
								uni.navigateBack({
									delta: 1
								})
							}, 2000)
						}
					}).finally(res => {})
				} else {
					this.$http.request('POST', this.$apis.saveUserAddressList, {
						name: this.usdtName,
						address: this.name2
					}).then(res => {
						if (res.data.code == 1) {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							})
							setTimeout(() => {
								uni.navigateBack({
									delta: 1
								})
							}, 2000)
						}
					}).finally(res => {})
				}

			},
		}
	}
</script>

<style lang="scss" scoped>
	.index {
		min-height: 100vh;
		background-color: rgba(251, 114, 8, 0.05);
	}

	.header {
		display: flex;
		justify-content: space-between;
		padding: 12px;

		.text {
			text-align: center;
			width: 50%;
		}
	}

	.select {
		background-color: #fff;

		.data {
			display: flex;
			align-items: center;
			padding: 10px 5%;
			border-bottom: 1px solid #eee;
			justify-content: space-between;

			.label {
				width: 25%;
			}

			.info {
				flex: 1;
				padding-left: 10px;
			}
		}
	}

	.inputList {
		background-color: #fff;

		.data {
			display: flex;
			align-items: center;
			padding: 10px 5%;
			border-bottom: 1px solid #eee;

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
		margin: 35px 0px;
		padding: 0 20px;

		.confirm {
			border-radius: 30px;
			background-color: #FB7208;
			color: #fff;
			text-align: center;
			height: 50px;
			line-height: 50px;
			font-size: 18px;
		}
	}
</style>