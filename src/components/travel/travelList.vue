<template>
  <div class="travel-list-layout">
      <nav-bar>
        <div slot="nav-center" @click="getSearch" class="nav-search">搜索目的地</div>
        <div slot="nav-right" class="address">杭州</div>
      </nav-bar>
      <div class="travel-content">
          <ul class="condition">
              <li class="select-item">推荐排序</li>
              <li class="unselect-item">天数/日期</li>
              <li class="unselect-item">玩乐分类</li>
              <li class="unselect-item">更多筛选</li>
          </ul>
          <div class="travel-list">
            <product-list></product-list>
          </div>
      </div>
  </div>
</template>
<script lang="ts">
    import { Vue } from "vue-property-decorator";
    import  NavBar from "../comment/navBar.vue";
    import  ProductList from '../comment/productList.vue'

    export default Vue.extend({
        name:'TravelList',
        components: {
            NavBar,
            ProductList
        },
        methods:{
            getSearch(){
                this.$router.push('/searchPanel');
            }
        }
    }) 
</script>

<style lang="scss" scoped>
ul{
    list-style: none;
    margin: 0;
    padding:0;
}
.travel-list-layout{
    .nav-search{
        flex: none;
        width: 12rem;
    }
    
    .address {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        min-width: 32px;
        max-width: 95px;
        padding-right: 10px;
        &:after {
            content: "";
            border-right: 1px solid black;
            border-top: 1px solid black;
            transform: rotate(134deg);
            width: 7px;
            height: 6px;
            display: inline-block;
            margin-bottom: 3px;
            margin-left: 4px;
        }
    }

    .travel-content{
        padding-top: 50px;
        .condition{
            display: flex;
            justify-content: space-evenly;
            height: 32px;
            line-height: 32px;
            position: fixed;
            z-index: 99;
            width: 100%;
            background: #fff;
            .select-item,.unselect-item{
                line-height: 32px;
                &::after{
                    content: '';
                    background: url('/images/comment/icon-sprite.png') no-repeat;
                    transform: scale(0.5);
                    width: 20px;
                    height: 32px;
                    line-height: 32px;
                    display: inline-block;

                     background-position: 0px -283px;
                    vertical-align: middle;
                }
            }
            .select-item{
                color:#23cc77;
                &::after{
                    background-position: -23px -283px;
                }
            }
        }
        .products-list{
            margin-top: 24px;
        }
    }
}
</style>