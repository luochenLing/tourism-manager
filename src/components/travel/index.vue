<template>
    <div class="travel-layout">
        <nav-bar>
            <div slot="nav-center" class="nav-search">搜索目的地</div>
            <div slot="nav-right" class="nav-my-info">我的</div>
        </nav-bar>
        <van-swipe :loop="false">
            <van-swipe-item>
                <div class="btn-list">
                    <a>
                        <img src="../../images/travel/tourist-group.png" alt="">
                        <span>跟团游</span>
                    </a>
                    <a>
                        <img src="../../images/travel/free-travel.png" alt="">
                        <span>自由行</span>
                    </a>
                    <a>
                        <img src="../../images/travel/cruise.png" alt="">
                        <span>游轮</span>
                    </a>
                    <a>
                        <img src="../../images/travel/hotel.png" alt="">
                        <span>酒.景</span>
                    </a>
                    <a>
                        <img src="../../images/travel/purpose.png" alt="">
                        <span>目的的参团</span>
                    </a>
                    <a>
                        <img src="../../images/travel/travel-around.png" alt="">
                        <span>周边游</span>
                    </a>
                    <a>
                        <img src="../../images/travel/island.png" alt="">
                        <span>海岛游</span>
                    </a>
                    <a>
                        <img src="../../images/travel/vacation.png" alt="">
                        <span>度假.酒店</span>
                    </a>
                </div>
            </van-swipe-item>
            <van-swipe-item>
                <div class="btn-list">
                    <a>
                        <img src="../../images/travel/visa.png" alt="">
                        <span>免签落地签</span>
                    </a>
                    <a>
                        <img src="../../images/travel/theme.png" alt="">
                        <span>主题游</span>
                    </a>
                </div>
            </van-swipe-item>
        </van-swipe>

        <div class="special">
            <span class="special-title">
                尾单特价
            </span>
            <div class="special-content">
                <nav class="special-item">
                    <img src="/images/travel/special1.jpg" />
                    <h3>希腊一地8日游</h3>
                    <span class="intro">广州往返，圣托里尼，蓝白世界，探索古雅典文明，B线春节班期升级悬崖酒店羊排餐卫城伊亚日落，C线特价雅典自由活动</span>
                    <div class="infos">
                        <span class="type">跟团游</span>
                        <em class="unit">￥</em>
                        <em class="price">8230</em>
                        <span class="discribe">起/人</span>
                    </div>
                </nav>
                <nav class="special-item">
                    <img src="/images/travel/special2.jpg" />
                    <h3>泰国+新加坡+马来西亚9晚10日游</h3>
                    <span class="intro">爸妈放心游/优选航班/泰段0购物0脱团/7晚五星酒店/日游沙美岛/舌尖美食/一次游三国/南京往返</span>
                    <div class="infos">
                        <span class="type">跟团游</span>
                        <em class="unit">￥</em>
                        <em class="price">5480</em>
                        <span class="discribe">起/人</span>
                    </div>
                </nav>
            </div>
        </div>

        <div class="trip-products-list">
            <ul class="products-tabs">
                <li class="active">境内游</li>
                <li>境外游</li>
                <li>更多</li>
            </ul>
            <div class="products-list">
<h1>hahah</h1>
            </div>
        </div>
    </div>
</template>
<script>
    import { Vue } from "vue-property-decorator";
    import  NavBar from "../comment/navBar.vue";
    import { Swipe, SwipeItem } from 'vant';

    export default Vue.extend({
        components: {
            [Swipe.name]: Swipe,
            [SwipeItem.name]: SwipeItem,
            'nav-bar':NavBar
        }
    }) 
</script>

<style lang="scss" scope>
.travel-layout{
    background-color: #F0F0F0;
    .nav-search{
        flex: none;
        width: 13rem;
    }
    .van-swipe{
        padding-bottom: 1rem;
        height: 12rem;
        padding-top: 40px;
        background-color: #fff;
        .btn-list{
            display: flex;
            flex-flow: row wrap;
            font-size: 0.8rem;
            text-align: center;
            a{
                margin-top: 1.2rem;
                width: 25%;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                align-items: center;
                img{
                    width: 3rem;
                    margin-bottom: 0.3rem;
                }
            }
        }
    }

    .special{
        background-color: #fff;
        margin-top: 10px;
        .special-title{
            display: block;
            font-size: 1rem;
            padding: 0.5rem 0 0.5rem 1rem;
            color: #333;
            border-bottom: 1px solid #eee;
            height: 1.5rem;
            position: relative;
            &::before{
                content: '';
                background-color:#9ed969; 
                position: absolute;
                width: 5px;
                height: 2.5rem;
                left: 0;
                top: 0;
            }
        }
        .special-content{
            display: flex;
            flex-flow: row nowrap;
            margin-top: 0.5rem;
            .special-item{
                flex: 1;
                width: 100px;
                h3{
                    font-size: 12px;
                    font-weight: 500;
                    height: 1.5rem;
                    line-height: 1.5rem;
                    margin: 0;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                }
                .intro{
                    display: -webkit-box;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    -webkit-line-clamp: 2; /*控制文本行数，多少行以后开始省略号 */
                    line-clamp: 2;
                    -webkit-box-orient: vertical;
                    color:#999;
                }
                &:nth-child(1){
                    padding: 0 0 0 0.5rem;
                }
                &:nth-child(2){
                    padding: 0 0.5rem 0 0.5rem;
                }
                img{
                    width: 100%;
                }

                .infos{
                    margin-top: 0.5rem;
                    display: flex;
                    flex-direction: row;
                    flex-wrap: nowrap;
                    justify-content: flex-start;
                    align-items:flex-end;
                    .type{
                        color: #999;
                        flex:1;
                    }
                    .unit{
                        font-style: normal;
                        font-size: 10px;
                        color:#f60;
                    }
                    .price{
                        font-style: normal;
                        color:#f60;
                        font-size: 17px;
                        line-height: 17px;
                        font-weight: 600;
                    }
                    .discribe{
                        color: #999;
                        padding-left: 5px;
                    }
                }
            }
        }
    }

    .trip-products-list{
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-around;
        align-items: center;
        background-color: #fff;
        margin-top: 10px;
        .products-tabs{
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-around;
            align-items: center;
            list-style: none;
            font-size: 1rem;
            width: 100%;
            height: 2.8rem;
            line-height: 2.8rem;
            .active{
                border-bottom: 2px solid #33BD61;
                color:#33BD61;
            }
        }
       
        .products-list{
            @extend .trip-products-list;
        }
    }
}
</style>