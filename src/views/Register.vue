<template>
<div>
    <el-form class="login-container" label-position="left" label-width="0px">
        <h3 class="login_title">系统注册</h3>
        <el-form-item>
            <el-input type="text" v-model="registerForm.username" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item>
            <el-input type="password" v-model="registerForm.password" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
            <el-input type="password" v-model="registerForm.oldpassword" auto-complete="off" placeholder="确认密码"></el-input>
        </el-form-item>
        <el-form-item>
            <el-input type="text" v-model="registerForm.phone" auto-complete="off" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item style="width: 100%">
            <el-button type="primary" style="width: 100%;background: #007bff;border: none" v-on:click="register">注册</el-button>
        </el-form-item>
    </el-form>
</div>
</template>

<script>
export default {
    data() {
        return {
            registerForm: {
                username: '',
                password: '',
                oldpassword:'',
                phone:''
            },
            responseResult: []
        }
    },
    methods: {
        register() {
            if(this.registerForm.password != this.registerForm.oldpassword){
                alert('两次密码输入不一致!')
            }else{
                if(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.registerForm.phone)){
                 this.$axios
                .post('/register', {
                    username: this.registerForm.username,
                    password: this.registerForm.password,
                    phone: this.registerForm.phone
                })
                .then(response => {
                    console.log(response);
                    if(response.data.code == 233){
                        alert('用户名已注册，请更改!');
                    }else if(response.data.code == 200){
                        this.$router.push('/login')
                    }
                })
                .catch(error => {
                    console.log('error:' + error)
                })
                // sessionStorage.setItem('username',this.registerForm.username)
                // sessionStorage.setItem('password',this.registerForm.password)
                // this.$router.push('/login')
                }else{
                alert('手机号格式错误!')
                }
            }
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
