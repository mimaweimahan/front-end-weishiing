<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// this.$http.request('GET', this.$apis.getConfig, {
			// 	keyword: 'kefu'
			// }).then(res => {
			// 	if (res.data.code == 1) {
			// 		this.$store.commit('setService', res.data.data.kefu);
			// 	}
			// }).finally(res => {})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "uview-ui/index.scss";
</style>