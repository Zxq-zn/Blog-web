<template>
    <div style="margin-top:10px;">
        <nav aria-label="Page navigation example">
        <ul class="pagination">
            <li class="page-item">
            <a class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
            </a>
            </li>
            <li class="page-item" v-for="(item,index) in page" :key="index" @click="clickPage(item)"> <a class="page-link" href="#">{{item}}</a></li>
            <li class="page-item">
            <a class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
            </a>
            </li>
        </ul>
        </nav>
    </div>
</template>
<script>
export default {
    data(){
        return {
        }
    },
    computed:{
        count(){
            return Math.ceil(this.$store.state.pageCount/5);
        },
        page(){
            let arr = [];
            for(let i=1;i<=this.count;i++){
                arr.push(i);
            }
            return arr;
        }
    },
    methods:{
        clickPage(item){
            this.$emit('Page',item);
        }
    }
}
</script>