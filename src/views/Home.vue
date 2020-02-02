<template>
  <div class="home">
    <ul class="list-group">
        <li class="list-group-item" v-for="(item,index) in blogs" :key="index">
          <div class="item">
            <div class="title" @click="linkDetail(index)"><router-link to="">{{item.title}}</router-link></div>
            <div class="context">{{item.context}}</div>
            <div class="time"> {{item.author}} | {{item.ctime}}</div>
          </div>
        </li>
    </ul>
    <Page @Page="pageChange"></Page>   
  </div>
</template>

<script>
// @ is an alias to /src
import Page from '@/components/Page.vue'

export default {
  name: 'home',
  data(){
    return {
      blogs:[],
      blog:[]
    }
  },
  components:{
    Page
  },
  methods:{
    getBlogs(){
      this.$axios.post('/blogs')
      .then(response => {
        this.blogs = response.data;
        this.blog = response.data;
        let length = this.blogs.length;
        this.$store.commit('changePageCount',length);
        this.pageChange(1);
      })
    },
    linkDetail(index){
      let data = JSON.stringify(this.blogs[index]);
      this.$router.push({path:'/detail/:data',query:{data:data}});
    },
    pageChange(item){
      console.log('pageChange');
      console.log(item);
      let arr = [];
      arr = this.blog.map((value,index,blog) => {
        if(index>=(item-1)*5 && index<(item*5)){
          return value;
        }
      })
      this.blogs=arr.filter(value =>{
        if(value){
          return true;
        }else{
          return false;
        }
      })
      
    }
  },
  mounted(){
    const that = this;
    this.getBlogs();
    this.bus.$on('searchEvent',function(data){
      console.log('bus事件触发');
      this.$axios.post('/search',{
        data:data
      })
      .then( response => {
      console.log('search接口成功');
      that.blogs =  response.data;
      let length = that.blogs.length;
      that.$store.commit('changePageCount',length);
      })
      .catch( error => {
        console.log('search失败');
        console.log(error);
      })
    })
  },
  beforeDestroy(){
    this.bus.$off('searchEvent');
  }
}
</script>
<style>
.item{
  width:100%;
  height:150px;
  /* background-color:aqua; */
  text-align:left !important;
  margin-left:10px;
}
.title{
  font-size:150%;
}
.context{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  height:100px;
  padding-top:20px;
  line-height: 60px;
}
</style>
