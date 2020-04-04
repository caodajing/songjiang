<!--数据设置-->
<template>
	<div class="leftNav-box">
		<div class="title">
			<span>数据设置</span>
			<i class="iconfont icon-icon-test"></i>
		</div>
		<ul class="list">
			<router-link :to="item.path" tag="li"  v-for="item in navList" :class="[item.act ? 'act' : '']">{{item.name}}</router-link>	
		</ul>
	</div>
</template>


<script>
    export default {
        name: "leftNav",
        data(){
        	return{
        		navList:[
        			{
        				name:"人员设置",
        				path:"/personSet/index",
                        act:false
        			},
        			{
        				name:"仓库管理",
        				path:"/storeManage/index",
                        act:false
        			},
        			{
        				name:"车辆设置",
        				path:"/carSet/index",
                        act:false
        			},
        			{
        				name:"装备设置",
        				path:"/equipmentSet/index",
                        act:false
        			},
        			{
        				name:"水源",
        				path:"/waterSource/index",
                        act:false
        			},
        			{
        				name:"接警信息",
        				path:"/alarmInfo/index",
                        act:false
        			},
                    {
                        name:"战时快报",
                        path:"/news/index",
                        act:false
                    },
                    {
                        name:"训练类型",
                        path:"/trainType/index",
                        act:false
                    },
        			{
        				name:"火患分析",
        				path:"/fire/index",
                        act:false
        			},
        		],
        	}
        },
        mounted(){
            console.log(this.$route);
            if(this.$route.path == '/storeManage/detail'){
                this.navList.map((val,i) => {
                    if(i == 1){
                        val.act = true;
                    }else{
                        val.act = false;
                    }
                })
            }
        }
    }
</script>


