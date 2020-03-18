<template>
	<div style="margin:0">
		<Header/>
		<div class="container">
			<section class="blog-list">
				<ul>
					<li v-for="(blog,index) in data.data" :key="index">
						<article class="blog">
							<h1 class="title" @click="blogNav(blog.id)">{{ blog.title }}</h1>
							<hr style="color:green;"/>
							<div class="time">
                <span>
                  <i class="el-icon-date"></i>&nbsp;&nbsp;{{ blog.createTime}}
                </span>
								&nbsp;&nbsp;
								<span>
                  <i class="el-icon-chat-dot-round"></i>&nbsp;&nbsp;{{ blog.view }}
                </span>
								&nbsp;&nbsp;
								<span>
                  <i class="el-icon-user-solid"></i>&nbsp;&nbsp;{{ blog.author }}
                </span>
							</div>
							<span class="type">
                <i class="el-icon-document"></i>&nbsp;{{ blog.typeName }}
              </span>
							<p
								class="content"
							>
								内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</p>
						</article>
					</li>
				</ul>
				<div class="block">
					<el-pagination
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
						:current-page="currentPage"
						:page-sizes="[10, 30, 50, 100]"
						:page-size="count"
						layout="total, sizes, prev, pager, next, jumper"
						:total="data.count"
						style="white-space: pre-wrap;">
					</el-pagination>
				</div>
			</section>
			<section class="hidden-mobile">
				<Aside/>
			</section>
		</div>
	</div>
</template>

<script>
	import Header from "../components/header";
	import Aside from "../components/aside";
	import '../../static/css/container.css';
	import {request} from "../components/common/requests";

	export default {
		name: "index",
		data() {
			return {
				data: {},
				currentPage: 1,
				count: 10,
				searchContent: null

			};
		},
		components: {
			Header,
			Aside
		},
		created() {
			let config = {
				url: "/blog/getBlogs",
				params: {
					page: this.currentPage,
					limit: this.count,
					searchContent: this.searchContent
				}
			};
			request(config).then(response => {
				this.data = response.data
			}).catch(err => {
				console.log(err)
			})
		},
		methods: {
			handleSizeChange: function (val) {
				this.count = val;
				let config = {
					url: "/blog/getBlogs",
					params: {
						page: this.currentPage,
						limit: this.count,
						searchContent: this.searchContent
					}
				};
				request(config).then(response => {
					this.data = response.data
				}).catch(err => {
					console.log(err)
				})
			},
			handleCurrentChange: function (val) {
				this.currentPage = val;
				let config = {
					url: "/blog/getBlogs",
					params: {
						page: this.currentPage,
						limit: this.count,
						searchContent: this.searchContent
					}
				};
				request(config).then(response => {
					this.data = response.data
				}).catch(err => {
					console.log(err)
				})
			},
			blogNav: function (id) {
				this.$router.push({ name: 'Blog', params: { id: id }})
			}
		}
	};
</script>

<style scoped>
	.blog {
		width: 100%;
		height: 200px;
		margin-bottom: 20px;
		padding: 5px 10px;
		border: 1px solid burlywood;
		border-radius: 20px;
		background-color: whitesmoke;
		overflow-y: hidden;
	}

	.blog .title {
		font-size: 25px;
		margin-bottom: 5px;
		margin-top: 5px;
		cursor: pointer;
	}

	.blog .title:hover {
		color: #409EFF;
		font-weight: bolder;
		font-size: 30px;
	}

	.blog .time {
		margin-bottom: 5px;
		color: darkcyan;
		border: 1px dashed darkcyan;
		width: 340px;
	}

	.blog .type {
		font-size: 19px;
		color: red;
		margin-top: 5px;
		margin-bottom: 9px;
	}

	.blog .content {
		margin-top: 5px;
		font-size: 16px;
	}
</style>
