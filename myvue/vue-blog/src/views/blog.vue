<template>
	<div>
		<Header/>
		<div class="container">
			<section class="blog-list">
				<Content/>
			</section>
			<section class="hidden-mobile">
				<Aside/>
			</section>
		</div>
		<Comment/>
	</div>
</template>

<script>
	import Header from "../components/header";
	import Content from "../components/content";
	import Aside from "../components/aside";
	import Comment from "../components/comment";
	import '../../static/css/container.css'
	export default {
		name: "Blog",
		components: {
			Header,
			Content,
			Aside,
			Comment
		},
		methods: {

		}
	};
</script>

<style scoped>
	.blog-list {
		border: 1px dashed burlywood;
		padding: 2px;
		border-radius: 20px;
		background-color: whitesmoke;
	}
</style>
