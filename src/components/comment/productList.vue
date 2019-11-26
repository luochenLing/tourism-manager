<template>
    <ul class="products-list">
        <li class="products-item">
            <div class="item-img">
                <img src="/images/travel/territory1.jpg" alt="">
                <div class="product-addr">杭州出发</div>
                <div class="product-price">
                    <dfn>￥</dfn>
                    <em class="price-num">1780</em>
                    <span>起</span>
                </div>
                <div class="product-other-info">
                    <div class="product-score">
                        <van-icon name="like-o" />
                        <em>4.9</em>
                    </div>
                    <em>4009人出游</em>
                </div>
            </div>
            <div class="item-content">
                <div class="item-title">华东五市-苏州园林-杭州-乌镇火车5日游</div>
                <div class="item-tag">上门接|无自费|立减</div>
                <div class="item-des">暖冬预售,深度纯玩0购物，国际五星酒店+确保入住西栅&拈花湾双客栈，50元高标餐，2万+牛人选择，6年高销量</div>
            </div>
        </li>
            <li class="products-item">
            <div class="item-img">
                <img src="/images/travel/territory1.jpg" alt="">
                <div class="product-addr">杭州出发</div>
                <div class="product-price">
                    <dfn>￥</dfn>
                    <em class="price-num">1780</em>
                    <span>起</span>
                </div>
                <div class="product-other-info">
                    <div class="product-score">
                        <van-icon name="like-o" />
                        <em>4.9</em>
                    </div>
                    <em>4009人出游</em>
                </div>
            </div>
            <div class="item-content">
                <div class="item-title">华东五市-苏州园林-杭州-乌镇火车5日游</div>
                <div class="item-tag">上门接|无自费|立减</div>
                <div class="item-des">暖冬预售,深度纯玩0购物，国际五星酒店+确保入住西栅&拈花湾双客栈，50元高标餐，2万+牛人选择，6年高销量</div>
            </div>
        </li>
            <li class="products-item">
            <div class="item-img">
                <img src="/images/travel/territory1.jpg" alt="">
                <div class="product-addr">杭州出发</div>
                <div class="product-price">
                    <dfn>￥</dfn>
                    <em class="price-num">1780</em>
                    <span>起</span>
                </div>
                <div class="product-other-info">
                    <div class="product-score">
                        <van-icon name="like-o" />
                        <em>4.9</em>
                    </div>
                    <em>4009人出游</em>
                </div>
            </div>
            <div class="item-content">
                <div class="item-title">华东五市-苏州园林-杭州-乌镇火车5日游</div>
                <div class="item-tag">上门接|无自费|立减</div>
                <div class="item-des">暖冬预售,深度纯玩0购物，国际五星酒店+确保入住西栅&拈花湾双客栈，50元高标餐，2万+牛人选择，6年高销量</div>
            </div>
        </li>
            <li class="products-item">
            <div class="item-img">
                <img src="/images/travel/territory1.jpg" alt="">
                <div class="product-addr">杭州出发</div>
                <div class="product-price">
                    <dfn>￥</dfn>
                    <em class="price-num">1780</em>
                    <span>起</span>
                </div>
                <div class="product-other-info">
                    <div class="product-score">
                        <van-icon name="like-o" />
                        <em>4.9</em>
                    </div>
                    <em>4009人出游</em>
                </div>
            </div>
            <div class="item-content">
                <div class="item-title">华东五市-苏州园林-杭州-乌镇火车5日游</div>
                <div class="item-tag">上门接|无自费|立减</div>
                <div class="item-des">暖冬预售,深度纯玩0购物，国际五星酒店+确保入住西栅&拈花湾双客栈，50元高标餐，2万+牛人选择，6年高销量</div>
            </div>
        </li>
    </ul>
</template>
<script lang="ts">
    import { Icon } from 'vant';
    export default {
        name:"ProductList",
        components:{
            [Icon.name]: Icon,
        }
    }
</script>

<style lang="scss">
    .products-list{
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-around;
        align-items: center;
        background-color: #fff;
        margin-top: 10px;
        width: 100%;
        align-items: initial;
        list-style: none;
        .products-item{
            margin-top: 8px;
            .item-img{
                height: 9.5rem;
                overflow: hidden;
                position: relative;
                img{
                    width: 100%;
                    transform: translateY(-10%);
                }
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
            .item-content{
                display: flex;
                flex-flow: column;
                padding: 0.5rem;
                justify-content: space-around;
                .item-title{
                    font-size: 16px;
                    margin-bottom: 5px;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                }
                .item-tag{
                    color: #999;
                    margin-bottom: 5px;
                    font-size:13px;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                }
                .item-des{
                    color: #999;
                    font-size:13px;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                }
            }
        }
    }
</style>