<template>
	<view class="container">
		<canvas :canvas-id="`lineCanvas${index}`" class="line-canvas"
			:style="{ width: canvasWidth + 'px', height: canvasHeight + 'px' }">
		</canvas>
	</view>
</template>

<script>
	export default {
		props: {
			symbol: {
				type: String,
				default: ''
			},
			riseFall: {
				type: String,
				default: ''
			},
			kLineList: {
				type: [Array, Object],
				default: () => []
			},
			index: {
				type: Number,
				default: 0
			},
		},
		data() {
			return {
				canvasWidth: 90, // 画布宽度
				canvasHeight: 40, // 画布高度
				currentIndex: 0, // 当前绘制点的索引
				dataPoints: [],
				isDrawing:true
			};
		},
		beforeDestroy(){
			this.isDrawing = false
		},
		mounted() {
			this.$nextTick(()=>{
				this.isDrawing = true
				this.dataPoints=this.kLineList
				this.startAnimation();
			})
			// 获取屏幕宽度
			// uni.getSystemInfo({
			// 	success: (res) => {
			// 		this.canvasWidth = res.windowWidth;
			// 		 // 启动动画
			// this.startAnimation();
			// 	},
			// });
		},
		methods: {
			// 动画绘制
			startAnimation() {
				const maxValue = Math.max(...this.dataPoints);
				const minValue = Math.min(...this.dataPoints); // 获取最小值
				const range = maxValue - minValue; // 计算数据范围
				const scaleFactor = this.canvasHeight / range; // 动态缩放比例

				// 缩放并平移数据点到画布范围
				const scaledData = this.dataPoints.map(value => (value - minValue) * scaleFactor);

				const ctx = uni.createCanvasContext(`lineCanvas${this.index}`, this);
				const step = this.canvasWidth / (scaledData.length - 1); // 计算点间距

				const drawNextPoint = () => {
					if (!this.isDrawing) return;
					ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight); // 清除画布
					if (this.riseFall >= 0) {
						ctx.setStrokeStyle('#c0dd2b'); // 线条颜色
					} else {
						ctx.setStrokeStyle('#ce7735'); // 线条颜色
					}

					ctx.setLineWidth(1);

					ctx.beginPath();
					for (let i = 0; i <= this.currentIndex; i++) {
						const x = step * i;
						const y = this.canvasHeight - scaledData[i]; // 翻转 Y 坐标
						if (i === 0) {
							ctx.moveTo(x, y); // 起点
						} else {
							ctx.lineTo(x, y); // 连接点
						}
					}
					ctx.stroke(); // 绘制线条

					// 更新画布
					ctx.draw(true);

					if (this.currentIndex < scaledData.length - 1) {
						this.currentIndex++;
						setTimeout(drawNextPoint, 50); // 每 100ms 更新一次
					}
				};

				drawNextPoint();
			},
			close(){
				this.isDrawing=false
			}
		},
	};
</script>

<style>
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		/* background-color: #000; */
		/* 黑色背景 */
		height: 40px;
		margin-left: 40px;
	}

	.line-canvas {
		/* background-color: #000; */
		/* 黑色背景 */
	}
</style>