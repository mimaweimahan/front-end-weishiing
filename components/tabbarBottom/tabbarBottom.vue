<template>
	<view>
		<u-tabbar v-model="current" :list="list" height="55px" :mid-button="false" inactive-color="#a2a6a5" active-color="#ffa959"
			icon-size="35"></u-tabbar>
	</view>
</template>

<script>
	export default {
		props: {
			current: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {

			}
		},
		computed: {
			list() {
				return [{
						iconPath: "../../../static/images/tabbar-1.png",
						selectedIconPath: "../../../static/images/tabbar-11.png",
						text: this.$t("tabbar")[0],
						customIcon: false,
						pagePath: '/pages/tabbarPages/home/index'
					},
					{
						iconPath: "../../../static/images/tabbar-2.png",
						selectedIconPath: "../../../static/images/tabbar-22.png",
						text: this.$t("tabbar")[1],
						customIcon: false,
						pagePath: '/pages/tabbarPages/quote/index'
					},
					// {
					// 	iconPath: "../../../static/images/tabbar-3.png",
					// 	selectedIconPath: "../../../static/images/tabbar-33.png",
					// 	text: this.$t("tabbar")[2],
					// 	customIcon: false,
					// 	pagePath: '/pages/tabbarPages/transaction/index'
					// },
					{
						iconPath: "../../../static/images/tabbar-4.png",
						selectedIconPath: "../../../static/images/tabbar-44.png",
						text: this.$t("tabbar")[3],
						customIcon: false,
						pagePath: '/pages/tabbarPages/news/index'
					},
					// {
					// 	iconPath: "../../../static/images/tabbar-4.png",
					// 	selectedIconPath: "../../../static/images/tabbar-44.png",
					// 	text: this.$t("home.txt7"),
					// 	customIcon: false,
					// 	pagePath: '/pages/tabbarPages/assets/index'
					// },
					{
						iconPath: "../../../static/images/tabbar-5.png",
						selectedIconPath: "../../../static/images/tabbar-55.png",
						text: this.$t("tabbar")[4],
						isDot: false,
						customIcon: false,
						pagePath: '/pages/tabbarPages/mine/index'
					}
				];
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
</style>