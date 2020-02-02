<template>
    <div style="background-color:#fff;">
        <p style="font-size:150%;">这里是博客页面</p>
        <form style="width:90%;">
            <div class="form-group row">
                <label for="blogTitle" class="col-sm-2 col-form-label">标题:</label>
                <div class="col-sm-10">
                    <input type="email" class="form-control" id="blogTitle" v-model="blogData.title">
                </div>
            </div>
            <div class="form-group row">
                <label for="blogText" class="col-sm-2 col-form-label">正文:</label>
                <div class="col-sm-10">
                    <textarea id="blogText" class="form-control" style="width:100%;height:250px;" v-model="blogData.context"></textarea>
                </div>
            </div>
            <div class="form-group row">
                <label for="blogFlag" class="col-sm-2 col-form-label">标签:</label>
                <div class="col-sm-4">
                    <div @click="clickSelect">
                        <input type="text" placeholder="标签" class="form-control" v-model="blogData.label">
                    </div>
                    <div v-show="show">
                        <input type="text" @click="getvalue(index,item)" class="form-control" v-for="(item,index) in optionData" :key="item.index" :value="item.name">
                    </div>
                </div>
            </div>
        </form>
        <div class="submit">
            <button type="button" class="btn btn-primary btn-blog" @click="blogSubmit">发布</button>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            show:false,
            blogData:{
                thitle:'',
                context:'',
                label:'',
                author:'',
                ctime:''
            },
            optionData:[
                {
                    name:'js'
                },{
                    name:'css'
                },{
                    name:'html'
                }
            ]
        }
    },
    methods:{
        clickSelect(){
            this.show = !this.show;
        },
        getvalue(index,item){
            this.blogData.label = item.name;
            this.show = !this.show;
        },
        blogSubmit(){
            this.blogData.author = this.$store.state.user.username;
            this.blogData.ctime = new Date().format('yyyy-MM-dd hh:mm:ss');
            this.$axios.post('/edit',this.blogData)
            .then(response =>{
                console.log(response);
                this.$router.push({path:'/'})
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
            
            
            var string=(new Date()).format("yyyy-MM-dd HH:mm:ss")
    }
}
</script>
<style>
    .form-control:focus{
        outline:none !important;
        border:1px solid #007bff !important;
        box-shadow: none !important;
    }
    .btn-blog{
        background-color:#007bff !important;
        width:20%;
        height:50px;
        float:left;
        margin-left:30px;
    }
    .submit{
        width:100%;
        background-color: #fff;
        height:100px;
    }
</style>