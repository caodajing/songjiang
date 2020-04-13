<template>
    <div class="pagination-wrap clearfix" v-if="pageNum">
        <div class="box flex">
            <el-pagination
                background
                layout="prev, pager, next"
                :current-page="currentPage"
                :page-count="pageNum"
                prev-text="上一页" next-text="下一页" @current-change="currentChange">
            </el-pagination>
            <span class="demonstration">共{{pageNum}}页</span>
            <div class="go-page-box clearfix">
                <span>到第</span>
                <input type="text" v-model="page" @input="validateNumber(page)">
                <span>页</span>
                <i @click="sure">确定</i>
            </div>
        </div>
        
    </div>
    
</template>

<script>
export default {
    name: 'pagination',
    data () {
        return {    
            page:"",
            currentPage:1,
        }
    },
    components:{
  	
    },
    props:["pageNum","TocurrentPage"],
    computed:{
        
    },
    created(){

    },
    mounted(){
       
    },
    methods:{
        currentChange(page){
            this.$emit("changePage",page);
        },
        sure(){
            console.log(this.pageNum)
            if(this.page > this.pageNum){
                this.$message("超过最大页数");
            }else if(this.page == 0){
                this.$message("最小页数为1");
            }else if(this.page == this.currentPage){
                this.$message("已是当前页数");
            }else{
                this.currentPage = parseInt(this.page);
                this.$emit("changePage",this.page);
            }
        },
        validateNumber(val) {
            this.page = val.replace(/[^\d]/g, "");
        },
    },
    watch:{
        TocurrentPage(val,oldVal){
            this.currentPage = parseInt(val);
        }
    }
  
}
</script>

