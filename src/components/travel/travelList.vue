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
            <ul class="products-list">
                <product-item :proInfo="item" v-for="item in proList" :key="item.id">
                    <div slot="img-info">
                        <div class="product-addr">{{item.startingPoint}}出发</div>
                        <div class="product-price">
                            <dfn>{{item.priceUint}}</dfn>
                            <em class="price-num">{{item.priceNum}}</em>
                            <span>起</span>
                        </div>
                        <div class="product-other-info">
                            <div class="product-score">
                                <van-icon name="like-o" />
                                <em>{{item.score}}</em>
                            </div>
                            <em>{{item.pCount}}人出游</em>
                        </div>
                    </div>
                    <div slot="content-info">
                        <div class="item-tag">{{item.protag.join('|')}}</div>
                    </div> 
                </product-item>
            </ul>
          </div>
      </div>
  </div>
</template>
<script lang="ts">
    import { Vue } from "vue-property-decorator";
    import  NavBar from "../common/navBar.vue";
    import  ProductItem from '../common/productItem.vue'
    import { Icon } from 'vant';

    export default Vue.extend({
        name:'TravelList',
        components: {
            [Icon.name]: Icon,
            NavBar,
            ProductItem
        },
        data(){
            return{
       
            }
        },
        methods:{
            getSearch(){
                this.$router.push('/searchPanel');
            }
        }
    }) 
</script>

<style lang="scss" scoped>
    em,dfn{
        font-style: normal;
    }
  .products-list{
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-around;
        align-items: center;
        background-color: #fff;
        margin-top: 10px;
        width: 100%;
        align-items: initial;

    .product-addr{
        position: absolute;
        z-index: 1;
        top: 10%;
        left:5%;
        background: rgba(0, 0, 0, 0.7);
        color: #fff;
        font-size: 0.8rem;
        padding: 5px 8px;
        border-radius: 13px;
    }
    .product-price{
        position: absolute;
        bottom: 10%;
        left:5%;
        background: #f60;
        padding: 5px;
        font-size: 0.6rem;
        color: #fff;
        .price-num{
            font-size: 0.9rem;
        }
    }
    .product-other-info{
        position: absolute;
        bottom: 10%;
        right:5%;
        font-size: 0.8rem;
        background: rgba(0, 0, 0, 0.7);
        color: #fff;
        display: flex;
        padding: 2px 5px;
        .product-score{
            margin-right: 5px;
            .van-icon-like-o{
                margin-right: 3px;
            }
        }
        border-radius: 12px;
    }
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
                    background: url('/images/common/icon-sprite.png') no-repeat;
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