<template>
	<div class="userRoom">
		<div class="toHome">
			<router-link to="/navList/topicList">首页/</router-link>
		</div>
		
	</div>
</template>

<script>
	export default {
		name:'userRoom'
	}
</script>

<style scoped lang=scss>
	.userRoom{
		padding: 10px 30px;
		.toHome{
			height: 40px;
			line-height: 40px;
			background-color: #eee;
			padding-left: 10px;
			border-bottom: 1px solid #ccc;
			a{
				color:#00DD00;
				&:hover{
					text-decoration: underline;
				}
			}
		}
	}
	
</style>