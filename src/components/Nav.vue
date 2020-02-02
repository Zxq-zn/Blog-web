<template>
    <div class="navText">
            <div class="logo">Zxq-blog</div>
            <div class="text">
                <ul class="nav justify-content-center">
                    <li class="nav-item">
                        <router-link to="/" class="nav-link ">首页</router-link>
                    </li>
                    <li class="nav-item">
                         <router-link to="/video" class="nav-link ">视频</router-link>
                    </li>
                    <li class="nav-item">
                         <router-link to="/blog" class="nav-link ">博客</router-link>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">论坛</a>
                    </li>
                    <li>
                        <input class="form-control form" type="search" v-model="searchInput" placeholder="请输入搜索..." aria-label="Search" @keyup.enter="search">
                    </li>
                </ul>
            </div>
            <div class="use" v-if="loginUser" style="color:#007bff">
                <span>{{loginUser}}</span>
                <div @click="out" style="display:inline-block;"><router-link to="/" style="color:red;margin-left:20px;font-size:95%;">退出</router-link></div>
            </div>
            <div class="use" v-if="!loginUser">
                <router-link to="/login">登录</router-link>
                <router-link to="/register" style="margin-left:20px;">注册</router-link>
            </div>
    </div>
</template>

<script>

  export default {
      data(){
          return{
              searchInput:''
          }
      },
      methods:{
          search(){
              this.bus.$emit('searchEvent',this.searchInput);//触发bus的事件
              this.searchInput = '';
          },
          out(){
              this.$store.commit('out');
          }
      },
      computed:{
          loginUser(){
              return this.$store.state.user.username;
          }
      }
  }
</script>

<style>
.navText{
    width:100%;
    height:60px;
    border-bottom: 1px solid #ccc;
    position:fixed;
    background-color: #fff;
    top:0;
    left:0;
    z-index:2;
    padding: 10px;
}
.logo{
    display:inline-block;
    font-size:120%;
    position: relative;
    right:280px;
}
.text{
    display: inline-block;
    position: relative;
    left:100px;
}
.form:focus{
    outline: none !important;
    box-shadow: none !important;
}
.use{
    display: inline-block;
    position: relative;
    left:260px;
}
</style>