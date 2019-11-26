<template lang="">
    <div class="search-layout">
        <NavBar class="search-banner">
            <div class="search-left" slot="nav-left">
                <van-icon name="wap-home-o" @click="goHome" size="30px" />
                <van-icon class="search-icon" @click="goSearch" name="search"  size="30px" />
            </div>
            <span class="title" slot="nav-center">目的地大全</span>
            <span class="my" slot="nav-right">我的</span>
        </navBar>
        <van-tree-select
            height="93vh"
            :items="items"
            :main-active-index.sync="activeIndex"
            style="padding-top:50px;"
        >
            <template slot="content">
                <product-list></product-list>
            </template>
        </van-tree-select>
    </div>
</template>

<style lang="scss" scope>
    .search-layout{
        .van-sidebar-item--select{
            border-color: #23cc77;
        }
        .search-banner{
            justify-content: flex-start;
            .search-left{
                padding-left: 20px;
                .search-icon{
                    padding-left: 10px;
                }
            }
            .title{
                font-size: 16px;
                margin: 0 auto;
            }
            .my{
                margin-right: 15px;
            }
        }

    }
</style>

<script lang="ts">
import NavBar from '../comment/navBar.vue';
import ProductList from '../comment/productList.vue';
import { Vue } from "vue-property-decorator";
import { TreeSelect,Image,Icon } from 'vant';

export default Vue.extend({
    name:'searchPanelByCategory',
    components:{
        NavBar,
        [TreeSelect.name]:TreeSelect,
        [Image.name]:Image,
        [Icon.name]:Icon,
        ProductList
    },
    data() {
        return {
            items: [{ text: '分组 1' }, { text: '分组 2' }],
            activeIds: [1, 2],
            activeIndex: 0
        };
    },
    methods:{
        goHome(){
            this.$router.push('/home');
        },
        goSearch(){
            this.$router.push('/searchPanel');
        }
    }
})
</script>