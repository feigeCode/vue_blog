<template>
	<div>
		<div id="mountNode">
			<div class="user-login" style="position: relative; height: 100vh;">
				<div class="background"></div>
				<div class="content-wrapper">
					<h2 class="slogan">
						欢迎进入
						<br/>FEIGE的博客网站
					</h2>
					<div
						style="display: flex; justify-content: center; flex-direction: column; padding: 30px 40px; background: rgb(255, 255, 255); border-radius: 6px; box-shadow: rgb(238, 238, 238) 1px 1px 2px;"
					>
						<h4
							style="margin: 0px 0px 20px; text-align: center; color: rgb(48, 128, 254); letter-spacing: 12px;"
						>登录</h4>
						<div>
							<div
								dir="ltr"
								role="row"
								class="next-row"
								style="position: relative; margin-bottom: 25px; flex-direction: column;">
								<div dir="ltr" role="gridcell" class="next-col">
                  <span class="next-input next-medium">
                    <input
						placeholder="用户名"
						maxlength="20"
						height="100%"
						autocomplete="off"
						v-model="username"
					/>
                  </span>
								</div>
								<div dir="ltr" role="gridcell" class="next-col"></div>
							</div>
							<div
								dir="ltr"
								role="row"
								class="next-row"
								style="position: relative; margin-bottom: 25px; flex-direction: column;">
								<div dir="ltr" role="gridcell" class="next-col">
                  <span class="next-input next-medium">
                    <input placeholder="密码" height="100%" type="password" autocomplete="off" v-model="password"/>
                  </span>
								</div>
								<div dir="ltr" role="gridcell" class="next-col"></div>
							</div>
							<div
								dir="ltr"
								role="row"
								class="next-row"
								style="position: relative; margin-bottom: 25px; flex-direction: column;">
								<button
									type="button"
									class="next-btn next-medium next-btn-primary"
									style="width: 240px; background: rgb(48, 128, 254); border-radius: 28px;"
									@click="login" :loading="loading">{{ loading ? '登录中 ...':'登录' }}
								</button>
							</div>
							<div dir="ltr" role="row" class="next-row tips" style="text-align: center;">
								<a
									href="#"
									style="color: rgb(153, 153, 153); text-decoration: none; font-size: 13px;"
								>立即注册</a>
								<span style="color: rgb(220, 214, 214); margin: 0px 8px;">|</span>
								<a
									href="#"
									style="color: rgb(153, 153, 153); text-decoration: none; font-size: 13px;"
								>忘记密码</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>


<script>
	import '../../static/css/login.css';

	export default {
		"name": 'login',
		data() {
			return {
				username: '',
				password: '',
				loading: false,
				timer: null,
			}
		},
		methods: {
			login: function () {
				console.log(this.username, this.password);
				if (this.loading) {
					return;
				}
				this.loading = true;
				this.timer = setTimeout(() => {
					// 动画关闭需要一定的时间
					setTimeout(() => {
						this.loading = false;
					}, 400);
				}, 2000);
				this.$axios.get("http://localhost:8080/user/login", {
					params: {
						username: this.username,
						password: this.password
					}
				}).then((response) => {
					if (response.data) {
						this.$router.push({name: "user"});
						//alert("登录成功！");
					} else {
						alert("登陆失败！");
					}
				})
			}
		}
	}
</script>

<style scoped>
	.background {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-size: cover;
		background-image: url("../assets/1.png");
	}
</style>
