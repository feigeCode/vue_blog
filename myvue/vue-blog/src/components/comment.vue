<template>
	<div>
		<div v-show="!isLogin" class="login">
			<span>你尚未登录，登录之后方可评论~</span>
			<div class="login-btn">
				<el-button type="primary" @click="login" round>登录</el-button>
				或
				<el-button type="success" round>注册</el-button>
			</div>
		</div>
		<hr/>
		<div class="content whisper-content">
			<div class="cont">
				<div class="whisper-list">
					<div v-show="isLogin" id="comment">
						<div class="textarea">
							<h2 style="color: blue;margin-bottom: 10px;" v-show="isReply">{{ replyContent }}</h2>
							<el-input type="textarea" :rows="8" placeholder="赶快来评论吧~~~~" v-model="comment"></el-input>
						</div>
						<el-button type="primary" @click="submit()" round>提交</el-button>
						<el-button v-show="isReply" type="primary" @click="cancel()" round>取消回复</el-button>
					</div>
					<div class="item-box" v-for="(comment,index) in data.data" :key="index">
						<div class="item">
							<div class="whisper-title">
								<i class="el-icon-date"></i>
								<span class="date">{{ comment.rootComment.createTime }}</span>
							</div>
							<div class="img-box">
								<img
									:src="comment.rootComment.headPhoto"
									alt="头像"
									width="50px"
									height="50px"
									style="border-radius:50px;"
								/>
								<p class="tit">
									<span class="name">{{ comment.rootComment.username }}发表评论</span>
								</p>
							</div>
							<p class="text-cont">发表内容：{{ comment.rootComment.content }}</p>
							<el-button
								type="warning"
								round
								size="small"
								@click="replyFunction(comment.rootComment.username,comment.rootComment.id,comment.rootComment.content)"
							>回复
							</el-button>
							<div class="op-list">
								<p class="like" @click="add(comment.rootComment.id,index)">
									<i class="el-icon-thumb"></i>
									<span>{{ comment.rootComment.good }}</span>
								</p>
								<p class="edit">
									<i class="el-icon-chat-line-round"></i>
									<span>1200</span>
								</p>
								<p class="off" @click="open(index)">
									<span>{{ index==current?"收起":"展开" }}</span>
									<i :class="index==current?up:down"></i>
								</p>
							</div>
						</div>
						<div
							:class="index==current?isShow:unShow"
							v-for="(reply,i) in comment.replies"
							:key="i"
							style="margin-bottom:5px;"
						>
							<div class="list-cont">
								<div class="whisper-title">
									<i class="el-icon-date"></i>
									<span class="date">{{ reply.createTime }}</span>
								</div>
								<div class="cont">
									<div class="img">
										<img
											:src="reply.headPhoto"
											alt="头像"
											width="50px"
											height="50px"
											style="border-radius:50px;"
										/>
									</div>
									<div class="text">
										<p class="tit">
											<span class="name">{{ reply.username }}</span>
											回复
											<span class="name">{{ reply.replier }}</span>
										</p>

										<p class="ct">回复内容：{{ reply.content }}</p>
										<p class="like" @click="add1(reply.id,index,i)">
											<i class="el-icon-thumb"></i>
											<span>{{ reply.good }}</span>
										</p>
									</div>
									<el-button
										type="warning"
										round
										size="small"
										@click="replyFunction(reply.username,reply.id,reply.content)"
									>回复
									</el-button>
								</div>
							</div>
						</div>
					</div>
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
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import "../../static/css/main.css";
	import $ from "../../static/js/jquery-3.4.1.min";
	import { request } from '../components/common/requests'
	export default {
		name: "comment",
		data() {
			return {
				data: {},
				isLogin: true,
				isShow: "review-version",
				unShow: "feige-hidden",
				up: "el-icon-arrow-up",
				down: "el-icon-arrow-down",
				open1: true,
				current: null,
				comment: "",
				parentId: null,
				good: 0,
				replier: null,
				userId: 5,
				currentPage: 1,
				count: 10,
				isReply: false,
				replyContent: ''
			};
		},
		methods: {
			open: function (index) {
				if (this.open1) {
					this.current = index;
					this.open1 = false;
				} else {
					this.current = null;
					this.open1 = true;
				}
			},
			submit: function () {
				//#{content},#{parentId},#{good},#{createTime},#{replier},#{blogId},#{userId}
				let config = {
					url: "/comment/add_comment",
					params: {
						content: this.comment,
						parentId: this.parentId,
						good: this.good,
						replier: this.replier,
						blogId: this.$route.params.id,
						userId: this.userId
					}
				};
				request(config).then(response => {
					this.data = response.data;
					if (response.data.code === "200") {
						this.comment = '';
						this.isReply = false;
						let config1 = {
							url: "/comment/get_comments",
							params: {
								blogId: this.$route.params.id,
								page: this.currentPage,
								count: this.count
							}
						};
						request(config1).then(response => {
							this.data = response.data;
						})
							.catch(err => {
								console.log(err);
							});
					} else {
						console.log(response.data);
					}
				})
					.catch(err => {
						console.log(err);
					});
			},
			replyFunction: function (name, id , content) {
				$("html").animate({scrollTop:$('#comment').offset().top - 60 },300,function () {
					$(".el-textarea__inner").focus();
				});
				this.replyContent = name+' 评论的内容：'+content;
				this.replier = name;
				this.parentId = id;
				this.isReply = true;
			},
		cancel: function () {
			this.replier = null;
			this.parentId = null;
			$(".el-textarea__inner").blur();
			this.isReply = false;
			this.replyContent = '';
		},
			add: function (id, index) {
				this.data.commentAndReplies[index].rootComment.good++;
			},
			add1: function (id, index, i) {
				this.data.commentAndReplies[index].replies[i].good++;
			},
			handleSizeChange: function (val) {
				this.count = val;
				let config = {
					url: "/comment/get_comments",
					params: {
						blogId: this.$route.params.id,
						page: this.currentPage,
						count: this.count
					}
				};
				request(config).then(response => {
					this.data = response.data;
				})
					.catch(err => {
						console.log(err);
					});
			},
			handleCurrentChange: function (val) {
				this.currentPage = val;
				let config = {
					url: "/comment/get_comments",
					params: {
						blogId: this.$route.params.id,
						page: this.currentPage,
						count: this.count
					}
				};
				request(config).then(response => {
					this.data = response.data;
				})
					.catch(err => {
						console.log(err);
					});
			},
			login: function () {
				this.$router.push({name: 'Login'});
			}
		},
		created() {
			let config = {
				url: "/comment/get_comments",
				params: {
					blogId: this.$route.params.id,
					page: this.currentPage,
					count: this.count
				}
			};
			request(config).then(response => {
				this.data = response.data;
			})
				.catch(err => {
					console.log(err);
				});
		}
	}
</script>

<style>
	.feige-hidden {
		display: none;
	}

	.tit .name {
		width: 290px;
		font-size: 20px;
		font-weight: bolder;
		color: slategrey;
	}

	.whisper-content .item-box {
		font-size: 20px;
		font-weight: bold;
		background: white;
		margin-bottom: 20px;
		margin-top: 25px;
	}

	.textarea {
		margin-bottom: 10px;
	}

	.review-version {
		margin-left: 40px;
		background: lightgoldenrodyellow;
		padding: 20px 10px 10px 20px;
	}
	.login {
		width: 370px;
		margin: 30px auto;
		font-weight: bolder;
		font-size: 20px;

	}
	.login .login-btn {
		margin: 0 40px auto;
	}
</style>
