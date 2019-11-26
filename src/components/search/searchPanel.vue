<template>
    <div class="search-layout">
        <NavBar class="nav-search">
            <span class="cancel" @click="cancel" slot="nav-left">取消</span>
            <input class="search-content" v-model="condition" slot="nav-center" @keyup="showClearSearch" type="text" placeholder="目的地"/>
            <van-icon slot="nav-right" @click="clearCondition" v-show="showClearDom" class="nav-clear" name="clear" color="#999" size="30px" />
            <van-icon slot="nav-right" class="search-pro" name="search" color="#2dbb55" size="30px" />
        </navBar>

        <div class="hot">
            <div class="hot-title">热门搜索</div>
            <ul class="hot-content">
                <li class="hot-item">日本</li>
                <li class="hot-item">泰国</li>
                <li class="hot-item">美国</li>
                <li class="hot-item" style="margin-right:0">马来西亚</li>
                <li class="hot-item">印度尼西亚</li>
                <li class="hot-item">沙巴</li>
                <li class="hot-item">九州</li>
                <li class="hot-item" style="margin-right:0">伦敦</li>
                <li class="hot-item">西班牙</li>
                <li class="hot-item">云南</li>
            </ul>
        </div>
        <div class="history">
            <div class="history-title">
                <span>历史搜索</span>
                <van-icon class="search-pro" name="delete" color="#2dbb55" size="20px" />
            </div>
            <ul class="history-content">
                <li class="history-item">大理</li>
                <li class="history-item">巴塞罗那</li>
                <li class="history-item">马德里</li>
            </ul>
        </div>
    </div>
</template>

<style lang="scss" scope>
.search-layout{
    .nav-search{
        background: #fff;
        .cancel{
            color: #2dbb55;
            flex: 18%;
        }
        .search-content{
            flex: 70%;
            border: none;
            height: 1.5rem;
            background-color: #e5e5e5;
            padding: 5px 10px;
            position: relative;
        }
        .nav-clear{
            position: absolute;
            right: 14%;
        }
        .search-pro{
            flex: 12%
        }
    }

    .hot,.history{
        padding-top: 50px;
        display: flex;
        flex-direction: column;
        background: #fff;
        margin: 0 10px;
        .hot-title{
           border-bottom: 1px solid #d4d4d4;
           height: 1.5rem;
           color:#999;
        }
        .hot-content{
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            width: 100%;
            justify-content:flex-start;
            align-content:flex-start; 
            list-style: none;
            .hot-item{
                border: 1px solid #d4d4d4;
                width: 20%;
                text-align: center;
                height: 30px;
                line-height: 30px;
                margin: 10px 10px 0 0;
            }
        }
    }

    .history{
        .history-title{
           border-bottom: 1px solid #d4d4d4;
           height: 1.5rem;
           color:#999;
           display: flex;
           justify-content: space-between;
        }
        .history-content{
            display: flex;
            flex-flow: column nowrap;
            color: #999;
            
            .history-item{
                margin-top: 10px;
            }
        }
    }

}

</style>

<script lang="ts">
import NavBar from '../comment/navBar.vue';
import { Vue } from "vue-property-decorator";
import { Icon } from 'vant';

export default Vue.extend({
    name:'searchPanel',
    data(){
        return{
            condition:'',
            showClearDom:false
        };
    },
    components:{
        NavBar,
        [Icon.name]: Icon,
    },
    methods:{
        //清空输入内容按钮显示
        showClearSearch(){
            var $that=this;
            if($that.condition){
                $that.showClearDom=true;
            }else{
               $that.showClearDom=false; 
            }
        },
        //清空条件事件
        clearCondition(){
            var $that=this;
            $that.condition='';
            $that.showClearDom=false;
        },
        //取消
        cancel(){
            this.$router.back();
        }
    }
})
</script>