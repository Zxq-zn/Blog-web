<template>
<div>
    <el-form class="login-container" label-position="left" label-width="0px">
        <h3 class="login_title">系统登录</h3>
        <el-form-item>
            <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item>
            <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
            <el-checkbox v-model="loginForm.checked" style="float:left;">记住密码</el-checkbox>
            <router-link to="/register" style="float:right;text-decoration:none;font-size:15px;margin-right:20px;">注册</router-link>
        </el-form-item>
        <el-form-item style="width: 100%">
            <el-button type="primary" style="width: 100%;background: #007bff;border: none" v-on:click="login">登录</el-button>
        </el-form-item>
    </el-form>
</div>
</template>

<script>
export default {
    data() {
        return {
            loginForm: {
                username: '',
                password: '',
                checked: false
            },
            responseResult: []
        }
    },
    methods: {
        login() {
            this.$axios
                .post('/login',{
                    username:this.loginForm.username,
                    password:this.loginForm.password
                })
                .then(response => {
                    if(response.data.code == 200){
                        alert('axios success');
                        this.$store.commit('login',this.loginForm);
                        this.$router.push({path:'/'});
                    }else{
                        alert('axios failer!');
                    }
                })
                .catch(error => {
                    console.log('error:' + error)
                })   
        }
    }
}
</script>

<style>
.login-container {
    border-radius: 10px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    height: 500px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
}

.login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
}
</style>
