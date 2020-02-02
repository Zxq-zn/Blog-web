<template>
    <div class="breadcrumb">
        <ol class="breadcrumb-list">
            <li v-for="(item,index) in routers" :key="index">{{item.name}}</li>
        </ol>
    </div>
</template>
<script>
export default {
    data(){
        return {
            routers:[]
        }
    },
    methods:{
        getRouter(){
            // console.log(this.$router);
            // console.log(this.$route);
            this.routers = this.$route.matched;
            // console.log(this.routers);
        }
    },
    mounted(){
        this.getRouter();
    },
    watch:{
        $route(){
            this.getRouter();
        }
    }
}
</script>
<style>
    .breadcrumb{
        background-color:#fff !important;
        height:60px;
        margin-top:70px;
    }
    .breadcrumb-list{
        list-style: none;
        line-height: 40px;
        height:40px;
    }
</style>