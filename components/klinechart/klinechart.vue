<template>
	<view class="index">
		<view id="renderKlinechart" :prop="chartData" :change:prop="renderKlinechart.getData" class="content">
		</view>
	</view>
</template>

<script>
	import {
		intervals,
		intervals1,
		chartTypes,
		shapes
	} from './params'
	export default {
		name: "klinechart",
		props: {
			symbol: {
				type: String,
				default: ''
			},
			timeIndex: {
				type: Number,
				default: 0
			},
			//精度
			precision: {
				type: Number,
				default: 4
			},
		},
		data() {
			return {
				//分时
				intervals,
				intervals1,
				//传输给renderjs的数据
				chartData: {
					precision: 4,
					historyData: [], //历史数据
					updateData: {}, //更新的实时数据
					chartType: null, //更新图表类型
					createShapeName: null
				},
				dataList: [],
				timer: null
			}
		},
		mounted() {
		},
		watch: {
			symbol() {
				this.clearTimer()
				this.getKlineChart()
				this.timer = setInterval(() => {
					this.getKlineChart()
				}, 3000)
			},
			timeIndex() {
				this.clearTimer()
				this.getKlineChart()
				this.timer = setInterval(() => {
					this.getKlineChart()
				}, 3000)
			}
		},
		methods: {
			clearTimer() {
				if (this.timer) {
					clearInterval(this.timer);
					this.timer = null;
				}
			},
			getKlineChart() {
				let {
					timeIndex,
					intervals1,
					row,
					symbol
				} = this
				//获取历史K线数据中的，开始时间时间戳，秒级
				const from = Date.parse(new Date()) / 1000 - intervals1[timeIndex].time * 24 * 60 *
					60
				//获取历史K线数据中的，结束时间时间戳，秒级
				const to = Date.parse(new Date()) / 1000
				//当前显示的时间的事件名称
				let period = intervals1[timeIndex].value
				this.period = period
				this.$http.request('GET', this.$apis.getKlineChart, {
					from,
					to,
					symbol,
					period
				}).then(res => {
					if (res.data.code == 1) {
						const data = res.data.data.map((item,index) => {
							if(index == res.data.data.length-1){
								this.$emit('close',item.close)
							}
							return {
								timestamp: Number(item.time),
								open: Number(item.open),
								high: Number(item.high),
								low: Number(item.low),
								close: Number(item.close),
								volume: Number(item.volume),
							}
						})

						//显示历史数据
						setTimeout(() => {
							this.chartData.historyData = data
							// this.chartData.precision = this.precision
						}, 200)

						this.dataList = data
					}
				}).finally(res => {})
			},
		}
	}
</script>
<script module="renderKlinechart" lang="renderjs">
	import {
		init,
		dispose
	} from './klinecharts.min.js'
	import theme from './theme.js'
	import {
		rect,
		circle
	} from './params'
	export default {
		data() {
			return {
				chart: null,
				macd: null
			}
		},
		mounted() {
			this.initChart()
		},
		methods: {
			//初始化图表
			initChart() {
				dispose('renderKlinechart')
				this.chart = init('renderKlinechart')
				//设置黑色主题
				this.chart.setStyleOptions(theme('dark'))
				//设置时区
				// this.chart.setTimezone('Europe/London')
				//在主图上显示MA折线
				this.chart.createTechnicalIndicator({
					name: 'MA',
					calcParams: [5, 10, 30],
				}, false, {
					id: 'candle_pane'
				})
				//显示总量图
				this.chart.createTechnicalIndicator({
					name: 'VOL',
					calcParams: [20, 30],
				}, false, {
					height: 100,
					dragEnabled: false
				})
				//显示MACD图
				// this.macd = this.chart.createTechnicalIndicator('MACD', false, {
				// 	height: 100,
				// 	dragEnabled: false
				// })
				//  this.chart.overrideTechnicalIndicator({
				// 	name:'MACD',
				// })
			},
			getData(newValue, oldValue) {
				if (!this.chart) {
					return;
				}

				//设置历史数据
				if (newValue.historyData) {
					this.chart.clearData()
					this.chart.applyNewData(newValue.historyData)
				}
				//更新实时数据
				if (newValue.updateData) {
					this.chart.updateData(newValue.updateData)
				}
				//修改图表类型
				if (newValue.chartType) {
					this.chart.setStyleOptions({
						candle: {
							type: newValue.chartType
						}
					})
				}
				//设置精度
				this.chart.setPriceVolumePrecision(newValue.precision, newValue.precision)
			}
		},
		beforeDestroy() {
			// if(this.chart){

			// 	dispose('renderKlinechart')
			// }
		}


	}
</script>

<style lang="scss" scoped>
	.index {
		padding: 0 5px;
	}

	.content {
		height: 448px;

	}
</style>