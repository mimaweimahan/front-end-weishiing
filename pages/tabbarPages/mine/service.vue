<template>
	<view>
		<navTop :title="''"></navTop>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onShow() {
			if(uni.getStorageSync('service')){
				uni.setStorageSync('service','')
				window.history.go(-1)
			}else{
				this.getConfig()
			}
		},
		methods: {
			getConfig() {
				this.$http.request('GET', this.$apis.getConfig, {
					keyword: 'kefu'
				}).then(res => {
					if (res.data.code == 1) {
						uni.setStorageSync('service',1)
						window.location.href = res.data.data.kefu
					}
				}).finally(res => {})
			},
		}
	}
</script>

<style>

</style>