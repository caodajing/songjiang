<template>
    <div class="jingAn-pagination-wrap" v-if="pageNum">
        <!-- <div id="ele"> -->
            <el-pagination
              background
              layout="prev, pager, next"
              :page-count="pageNum" @current-change="currentChange">
            </el-pagination>
            <!-- <div class="Pagination"></div> -->
        <!-- </div> -->
    </div>
    
</template>

<script>
export default {
    name: 'pagination',
    data () {
        return {    
            
        }
    },
    components:{
  	
    },
    props:["pageNum"],
    computed:{

    },
    created(){

    },
    mounted(){
        let vm = this;
        // 调用分页器
        // tool.pagination({
        //     ele: '#ele',
        //     totalCount: 200,
        //     totalPage: vm.pageNum,
        //     currentPage: 1,
        //     needTotalCount: true,
        //     callback: function(page){
        //         vm.$emit("changePage",page);
        //         console.log('当前是第' + page + '页')
        //     }
        // });
    },
    methods:{
        currentChange(page){
            this.$emit("changePage",page);
        }
    },
    watch:{
        pageNum(val,oldVal){
            let vm = this;
            // 调用分页器
            // tool.pagination({
            //     ele: '#ele',
            //     totalCount: 200,
            //     totalPage: val,
            //     currentPage: 1,
            //     needTotalCount: true,
            //     callback: function(page){
            //         vm.$emit("changePage",page);
            //         console.log('当前是第' + page + '页')
                    
            //     }
            // });
        }
    }
  
}
</script>

