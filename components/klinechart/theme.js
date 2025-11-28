const textColorDark = '#929AA5'//y轴字体颜色
const gridColorDark = '#f1f1f1'//虚线网格颜色
const axisLineColorDark = '#646464'//大边框颜色
const crossTextBackgroundColorDark = '#373a40'

const textColorLight = '#76808F'
const gridColorLight = '#ededed'
const axisLineColorLight = '#DDDDDD'
const crossTextBackgroundColorLight = '#686d76'

export default function(theme) {
	const textColor = theme === 'dark' ? textColorDark : textColorLight
	const gridColor = theme === 'dark' ? gridColorDark : gridColorLight
	const axisLineColor = theme === 'dark' ? axisLineColorDark : axisLineColorLight
	const crossLineColor = theme === 'dark' ? '#646464' : axisLineColorLight
	const crossTextBackgroundColor = theme === 'dark' ? crossTextBackgroundColorDark : crossTextBackgroundColorLight
	return {
		grid: {
			horizontal: {
				color: gridColor
			},
			vertical: {
				color: gridColor
			}
		},
		candle: {
			bar: {
				// upColor: '#EF5350',
				// downColor: '#26A69A',
				noChangeColor: '#888888'
			},
			priceMark: {
				high: {
					color: textColor
				},
				low: {
					color: textColor
				}
			},
			tooltip: {
				showRule:'none',
				labels: ['Time', 'Open', 'Close', 'High', 'Low'],
				text: {
					color: textColor
				},
				showType:'standard',
				rect:{
					offsetTop: 24,
					borderColor: '#3f4254',
					backgroundColor: 'rgba(17, 17, 17, .3)'
				}
			}
		},
		technicalIndicator: {
			tooltip: {
				showParams: false,
			}
		},
		xAxis: {
			axisLine: {
				color: axisLineColor
			},
			tickLine: {
				color: axisLineColor
			},
			tickText: {
				color: textColor
			}
		},
		yAxis: {
			axisLine: {
				color: axisLineColor
			},
			tickLine: {
				color: axisLineColor
			},
			tickText: {
				color: textColor
			}
		},
		separator: {
			color: axisLineColor
		},
		crosshair: {
			horizontal: {
				line: {
					color: crossLineColor
				},
				text: {
					backgroundColor: crossTextBackgroundColor
				}
			},
			vertical: {
				line: {
					color: crossLineColor
				},
				text: {
					backgroundColor: crossTextBackgroundColor
				}
			}
		}
	}
}
