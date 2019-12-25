<template>
  <ul class="card-list">
    <li class="card-item" v-for="(item, index) in list" :key="index">
      <div class="ticket-inform">
        <div class="ticket-header">
          <div class="price">
            <span>{{ item.price }}</span>
            <dfn>￥</dfn>
          </div>
          <div class="rule">
            <span @click="getRoleInfo(item)">
              查看规则
            </span>
          </div>
        </div>
        <div class="ticket-body">
          <strong class="title">{{ item.title }}</strong>
          <div class="explain">{{ item.explain }}</div>
          <div class="time">
            有效期:{{ item.startTime | timeFormat }}-{{
              item.endTime | timeFormat
            }}
          </div>
          <div
            :class="item.isReceive ? 'receive' : 'unreceive'"
            @click="getTicket(index, item.isReceive)"
          >
            {{ item.isReceive ? "已领取" : "领取" }}
          </div>
        </div>
      </div>
      <div class="ticket-rule" v-show="item.showRole">{{ item.rule }}</div>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Emit } from "vue-property-decorator";
import timeMinxin from '@/views/travel/mixins/timeMixin'
@Component({
  name: "Coupon",
})
export default class Coupon extends timeMinxin {
  @Prop({ default: [] }) list!: [];
  created() {
    this.list.forEach((item: any) => {
      this.$set(item, "showRole", false);
    });
  }

  //查看规则
  getRoleInfo(item: any) {
    item.showRole = !item.showRole;
  }

  //领取
  getTicket(index: number, item: boolean) {
    if (item) {
      return;
    }
    item=!item;
    this.receiveCoupon(index, item);
  }

  @Emit("receiveCoupon")
  receiveCoupon(index: number, flag: boolean) {}
}
</script>

<style lang="scss" scoped>
dfn,
em,
i {
  font-style: normal;
}
.card-list {
  padding: 0 5px;
  height: calc(100% - 40px);
  overflow-y: auto;
  box-sizing: border-box;
  .card-item {
    min-height: 154px;
    border-radius: 12px;
    margin-bottom: 12px;
    border: 1px solid #ccc;
    border-top: 4px solid #f50;
    .ticket-inform {
      min-height: 154px;
      display: flex;
      position: relative;
      .ticket-header {
        border-right: 1px dashed #e9e9e9;
        color: #ff6108;
        width: 35%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        .price {
          span {
            font-size: 20px;
          }
        }
        .rule {
          color: #666;
          span::after {
            content: "";
            border-right: 1px solid #666;
            border-top: 1px solid #666;
            width: 5px;
            height: 5px;
            margin-left: 5px;
            display: inline-block;
            transform: rotate(-46deg);
            transition: all 0.5s ease;
          }
        }
      }
      .ticket-body {
        box-sizing: border-box;
        width: 65%;
        flex-direction: column;
        padding: 0 20px;
        line-height: 20px;
        .title {
          display: block;
          padding-top: 14px;
          font-size: 14px;
        }
        .time {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 100%;
          color: #999;
        }
        .explain {
          color: #999;
          width: 100%;
          overflow: hidden;
          display: -webkit-box;
          line-clamp: 2;
          box-orient: vertical;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .unreceive,
        .receive {
          background: linear-gradient(to right, #ff9b15, #ff6108);
          border-radius: 30px;
          font-size: 13px;
          color: #fff;
          text-align: center;
          position: absolute;
          bottom: 5px;
          width: 70px;
          height: 30px;
          line-height: 30px;
          right: 10px;
        }
        .receive {
          background: #fff;
          border: 1px solid #999;
          color: #666;
        }
      }
    }
    .ticket-rule {
      line-height: 22px;
      padding: 10px;
    }
  }
}
</style>
