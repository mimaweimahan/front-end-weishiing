<template>
	<view>
		<u-navbar :is-back="isBack" back-text="" back-icon-color="#000" back-icon-size="40" :title="title" title-width="600" :background="background" :border-bottom="false" title-color="#000" title-size="40"></u-navbar>
	</view>
</template>

<script>
	export default {
		props:{
			title:{
				type:String,
				default:''
			},
			bg:{
				type:Boolean,
				default:false
			},
			isBack:{
				type:Boolean,
				default:true
			}
		},
		mounted(){
			if(this.bg){
				this.background.background='rgba(255,255,255,0)'
			}else{
				this.background.background='rgba(255,255,255,1)'
			}
		},
		data() {
			return {
				background:{
					background:''
				}
			}
		},
		methods: {
			
		}
	}
</script>

<style>
html{
	
}
</style>
