<template>
        <div class="item">
            <div style="background-color:#fff;padding:30px;">
                <div class="item-title">{{blog.title}}</div>
                <div class="item-author"> 作者：{{blog.author}} | 发布时间：{{blog.ctime}}</div>
                <div class="item-context" v-text="blog.context"></div>
            </div>
            <div class="form">
                <input type="text" class="input" v-model="comment">
                <button class="button" @click="postComment">提交评论</button>
            </div>
            <div class="comment">
                <ul class="list-group">
                    <li class="list-group-item" v-for="(item,index) in comments" :key="index">
                        <div class="comment-author">提出者: {{item.people}}</div>
                        <div class="comment-context">{{item.context}}</div>
                        <div class="comment-ctime">发表于: {{item.ctime}}</div>
                    </li>
                </ul>
            </div>
        </div>
</template>

<script>
export default {
    data(){
        return{
            blog:[],
            comment:'',
            comments:[]
        }
    },
    methods:{
        postComment(){
            this.$axios.post('/postComment',{
                blog_id:this.blog.id,
                context:this.comment,
                ctime: new Date().format('yyyy-MM-dd hh:mm:ss'),
                people: this.$store.state.user.username
            })
            .then(response => {
                console.log('success');
                console.log(response);
                this.getComment();
            })
            .catch(error => {
                console.log(error);
            })
           this.getComment();
           this.comment = '';
        },
        getComment(){
                this.$axios.post('/comments',{
                blog_id:this.blog.id,
                context:this.comment,
                ctime: new Date().format('yyyy-MM-dd hh:mm:ss'),
                people:this.$store.state.user.username
                })
                .then(response => {
                    console.log('comments success');
                    this.comments = response.data;
                })
                .catch(error => {
                    console.log(error);
                })
        }
    },
    mounted(){
            Date.prototype.format = function(format){
                var o = {
                    "M+" : this.getMonth()+1, //month
                    "d+" : this.getDate(), //day
                    "h+" : this.getHours(), //hour
                    "m+" : this.getMinutes(), //minute
                    "s+" : this.getSeconds(), //second
                    "q+" : Math.floor((this.getMonth()+3)/3), //quarter
                    "S" : this.getMilliseconds() //millisecond
                }
            
                if(/(y+)/.test(format)) {
                    format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
                }
            
                for(var k in o) {
                    if(new RegExp("("+ k +")").test(format)) {
                        format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
                    }
                }
                return format;
            }
        this.blog = JSON.parse(this.$route.query.data);
        console.log(this.blog);
        this.getComment();
    }
}
</script>
<style scoped>
    .item{
        width:100%;
        margin:auto;
        background-color: #fff !important;
    }
    .item-title{
        font-weight: bold;
        text-align:center;
        color:#6a7989;
    }
    .item-author{
        text-align:center;
        margin-bottom: 20px;
    }
    .item-context{
        text-indent: 1em; 
        white-space: pre-wrap; 
        word-wrap: break-word;
        padding:10px;
    }
    .form{
        margin-top:50px;
    }
    .input{
        width:600px;
        height:39px;
    }
    .button{
        height:40px;
        background-color: aquamarine;
        border:none;
    }
    .comment{
        margin-top:50px;
    }
    .comment::before{
        content:'评论:';
        font-weight: bold;
        font-size: 130%;
    }
    .comment-author{
        height:30px;
        line-height: 40px;
        width:100%;
    }
    .comment-context{
        padding-top:10px;
        height:50px;
    }
    .comment-ctime{
        height:30px;
        text-align: right;
    }
</style>