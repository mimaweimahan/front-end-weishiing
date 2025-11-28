<template>
	<view class="index">
		<u-icon style="padding: 0 10px;" name="arrow-leftward" color="#333" size="70" @click="back"></u-icon>
		<view class="content">
			<view class="title">{{$t('recharge.txt4')}}</view>
			<view class="dataView">
				<view class="data" @click="select(0)">
					<view class="text">{{$t('recharge.txt5')}}</view>
					<view class="input">
						<u-input v-model="country" type="text" :placeholder="$t('recharge.txt6')" @focus="select(0)" />
					</view>
					<u-icon name="arrow-right" color="#999" size="28"></u-icon>
				</view>
				<view class="data" @click.capture="select(1)">
					<view class="text">{{$t('recharge.txt12')}}</view>
					<view class="input">
						<u-input v-model="bill" type="text" :placeholder="$t('recharge.txt7')" @focus="select(1)" />
					</view>
					<u-icon name="arrow-right" color="#999" size="28"></u-icon>
				</view>
			</view>

			<view class="amount">
				<view class="text">{{$t('recharge.txt8')}}</view>
				<view class="input">
					<u-input v-model="amount" type="text" :placeholder="$t('recharge.txt9')"
						placeholder-style="font-size:20px;color:rgb(192, 196, 204);" />
				</view>
				<!-- <view class="bom">≈ 0 $</view> -->
			</view>

			<view class="tip">{{$t('recharge.txt10')}}</view>
		</view>
		<view class="btn">
			<view class="confirm">{{$t('recharge.txt11')}}</view>
		</view>
		<!-- range-key为cateName -->
		<u-picker mode="selector" v-model="show" :range="selector" @confirm="confirm"></u-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				country: '',
				bill: '',
				amount: '',
				show: false,
				selectorCountry: [1, 2, 3],
				selectorBill: [4, 5, 6],
				selector: []
			}
		},
		mounted() {
			
		},
		methods: {
			back() {
				this.$emit('back')
			},
			select(e) {
				if (e == 0) {
					this.selector = this.selectorCountry
				} else {
					this.selector = this.selectorBill
				}
				this.show = true
			},
			confirm(e) {
				console.log(e);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.index {
		min-height: 100vh;
		background-color: #eff1f3;
		padding: 5px 0px;

		.content {
			padding: 0 15px;
		}

		.title {
			font-size: 28px;
			weight: 800;
			padding: 20px 0;
		}

		.dataView {
			margin-top: 10px;
			background: #ffffff;
			border-radius: 8px;
			padding: 15px;

			.data {
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 14px;

				.text {
					width: 28%;
				}

				.input {
					flex: 1;
				}
			}

			.data:nth-child(1) {
				margin-bottom: 20px;
			}
		}

		.amount {
			margin-top: 12px;
			background: #ffffff;
			border-radius: 8px;
			padding: 15px;

			.text {
				font-size: 16px;
			}

			.input {
				margin-top: 10px;
			}

			.bom {
				font-size: 12px;
				color: #9796A5;
			}
		}

		.tip {
			font-size: 16px;
			color: #9796A5;
			margin-top: 12px;
			padding: 0px 16px 0px;
		}
		
		.btn{
			position: fixed;
			width: 100%;
			bottom: 30px;
			padding: 0 15px;
			
			.confirm{
				width: 100%;
				padding: 10px 0;
				text-align: center;
				background-color: #FB7208;
				color: #fff;
			}
		}
	}
</style>