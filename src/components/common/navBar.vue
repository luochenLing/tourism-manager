<template>
    <div class="nav-title">
        <slot name="nav-left">
            <span class="back" slot="nav-left" @click="goBack"></span>
        </slot>
        <slot name="nav-center"><h3>center</h3></slot>
        <slot name="nav-right"><h3>right</h3></slot>
    </div>
</template>
<script lang="ts">

export default {
    name:"NavBar",
    methods:{
        goBack() {
           ((this as any).$router).back();
        }
    }
}
</script>

<style lang="scss" scoped>
    .nav-title {
        background-color: #fff;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-around;
        align-items: center;
        height: 50px;
        font-size: 14px;
        position:fixed;
        top:0;
        z-index: 99;
        width: 100%;
        min-width: 320px;
        text-align: center;
        .back{
            background: url("/images/common/icon-sprite.png") no-repeat;
            transform: scale(0.5);
            display: block;
            width: 1.5rem;
            height: 2rem;
            background-position: 0px -204px;
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
        .logo {
            width: 35px;
            padding-left: 12px;
            padding-right: 5px;
            }
            .nav-my-info {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                width: 42px;
            }
        .nav-search {
            color: #666;
            border-radius: 15px;
            background-color: #f5f5f5;
            flex: 1;
            position: relative;
            height: 29px;
            line-height: 28px;
            &:after {
                content: "";
                background: url(/images/home/search-sprite.png);
                position: absolute;
                height: 28px;
                width: 30px;
                top: 0;
                left: 4px;
                transform: scale(0.5);
            }
        }
    }
</style>