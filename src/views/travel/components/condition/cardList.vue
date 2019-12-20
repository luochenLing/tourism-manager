<template>
  <div class="layout">
    <ul>
      <li
        class="condition"
        v-for="(item, index) in list[0].children"
        :key="index"
      >
        <div class="item-title">
          <span class="title">{{ item.text }}</span>
          <span
            :data-index="index"
            :class="
              activeIndex == index && isShowAll ? 'show-all' : 'cur-select'
            "
            @click="showAll($event)"
            >{{ getSelCondition(item.code) }}</span
          >
        </div>
        <ul class="body" :data-code="item.code">
          <li
            class="line-item"
            ref="dataItem"
            v-for="(citem, cindex) in item.children"
            v-show="cindex > 5 ? false : true"
            :key="citem.id"
            :style="(cindex + 1) % 3 == 0 ? lineStyle : ''"
            :data-code="citem.code"
            :class="getItemClass(item.code).indexOf(citem.code)>-1?'active':''"
            @click="
              checkCurItem($event, { text: citem.text, code: citem.code })
            "
          >
            <span>{{ citem.text }}</span>
            <span v-if="citem.count">{{ citem.count }}人选择</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="footer-bar">
      <div class="reset" @click="resetCondition(list[0].code)">重置</div>
      <div class="submit" @click="submitCondition(list[0].code)">确定</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  height: 100%;
  &::before {
    content: "";
    width: 300px;
    height: 40px;
    display: block;
  }
  & > ul {
    overflow: scroll;
    height: calc(100% - 88px);
  }
  .condition {
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    overflow: scroll;
    .item-title {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      position: relative;
      margin-top: 12px;
      .title {
        flex: 1;
      }
      .cur-select,
      .show-all {
        flex: 2;
        color: #2dbb55;
        text-align: center;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-align: end;
        padding-right: 20px;
        &::after {
          content: "";
          border-right: 1px solid #000;
          border-top: 1px solid #000;
          width: 5px;
          height: 5px;
          display: inline-block;
          transform: rotate(-46deg);
          transition: all 0.5s ease;
          vertical-align: middle;
          position: absolute;
          right: 8px;
          top: 6px;
        }
      }
      .show-all::after {
        transform: rotate(133deg);
      }
    }
    .body {
      display: flex;
      justify-content: flex-start;
      padding: 12px 0 5px 0;
      flex-wrap: wrap;
      font-weight: 500;
      font-size: 13px;
      .line-item {
        width: 31%;
        height: 52px;
        margin: 0 10px 9px 0;
        border: 1px solid #f2f4f7;
        display: flex;
        flex-direction: column;
        text-align: center;
        justify-content: space-around;
        border-radius: 4px;
        box-sizing: border-box;
        span {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          text-align: center;
          background: #f2f4f7;
          z-index: -1;
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        span:nth-child(2) {
          color: #999;
        }
      }

      .active {
        border-color: #2dbb55;
        span {
          color: #2dbb55 !important;
          background: #f7fff9;
        }
      }
    }
  }
  .footer-bar {
    position: fixed;
    line-height: 48px;
    width: 100%;
    bottom: 0;
    background: #fff;
    border-top: 1px solid #e5e5e5;
    display: flex;
    font-size: 18px;
    text-align: center;
    .reset {
      flex: 1;
      color: #000;
    }
    .submit {
      flex: 1;
      background-color: #ff7733;
      color: #fff;
    }
  }
}
</style>

<script lang="ts">
import configEnums from "@/globalConfig/configEmuns";
export default {
  name: "cardList",
  data() {
    return {
      curDateNums: [],
      curTravelTimes: [],
      curSpecialList: [],
      activeIndex: 0,
      //当前列表项选中项
      activeLineIndex: 0,
      isShowAll: false,
      //选项布局样式
      lineStyle: {
        marginRight: 0
      },
      //收起时最多显示几个
      maxShowItem: 6
    };
  },
  props: {
    list: {
      default: []
    }
  },
  methods: {
    //是否显示所有信息
    showAll(e: any) {
      var $dom = e.target;
      var childrenDom = $dom.parentNode.nextElementSibling.children;
      if ($dom.classList.contains("show-all")) {
        $dom.classList.remove("show-all");
        $dom.classList.add("cur-select");
      } else if ($dom.classList.contains("cur-select")) {
        $dom.classList.add("show-all");
        $dom.classList.remove("cur-select");
      }
      if (childrenDom.length > 6) {
        let idx: any;
        for (idx in childrenDom) {
          if (idx > 5) {
            if (childrenDom[idx].style.display == "none") {
              childrenDom[idx].style.display = "";
            } else {
              childrenDom[idx].style.display = "none";
            }
          }
        }
      }
    },
    checkCurItem(e: any, obj: any) {
      let $dom = e.target;
      let $this: any = this;
      let pCode = $dom.parentNode.dataset.code;
      switch (pCode) {
        case configEnums.dateNumList:
          $this.checkItem(e, $this.curDateNums, obj);
          break;
        case configEnums.travelTimeList:
          $this.checkItem(e, $this.curTravelTimes, obj);
          break;
        case configEnums.specialList:
          $this.checkItem(e, $this.curSpecialList, obj);
          break;
      }
    },
    checkItem(e: any, arr: any[], obj: any) {
      let $this: any = this;
      $this.ArryOption(arr, obj);
    },
    //数组的添加删除操作
    ArryOption(arr: any[], item: any) {
      let itemIndex = arr.findIndex((v: any) => {
        return v.code === item.code;
      });
      if (arr && itemIndex < 0) {
        arr.push(item);
      } else {
        arr.splice(itemIndex, 1);
      }
    },
    getItemClass(code: string) {
      let $this: any = this;
      let texts: any[] = [];
      let item: any;
      return $this.getSelArray(code, texts, "code", false);
    },
    getSelCondition(code: string) {
      let $this: any = this;
      let texts: any[] = [];
      let item: any;
      return $this.getSelArray(code, texts, "text", true);
    },
    getSelArray(
      code: string,
      arr: any[],
      type: string,
      haveSplit: boolean = true
    ) {
      let item: any;
      let $this: any = this;
      switch (code) {
        case configEnums.dateNumList:
          this.addSelItem(type, arr, $this.curDateNums);
          if (haveSplit) {
            return arr.join("、");
          } else {
            return arr;
          }
        case configEnums.travelTimeList:
          this.addSelItem(type, arr, $this.curTravelTimes);
          if (haveSplit) {
            return arr.join("、");
          } else {
            return arr;
          }
        case configEnums.specialList:
          this.addSelItem(type, arr, $this.curSpecialList);
          if (haveSplit) {
            return arr.join("、");
          } else {
            return arr;
          }
      }
    },
    addSelItem(type: string, arr: any[], list: any) {
      let $this: any;
      for (let item of list) {
        if (type == "text") {
          arr.push(item.text);
        } else {
          arr.push(item.code);
        }
      }
    },
    resetCondition(code: string) {
      //重置条件
      let $this: any = this;
      $this.$refs.dataItem.forEach((item: any) => {
        item.classList.remove("active");
      });
      switch (code) {
        case configEnums.dateList:
          $this.curDateNums.splice(0);
          $this.curTravelTimes.splice(0);
          break;
        case configEnums.specialList:
          $this.curSpecialList.splice(0);
          break;
      }
    },
    submitCondition(code: string) {
      //提交确认条件
      let $this: any = this;
      let obj = {};
      switch (code) {
        case configEnums.dateList:
          obj = {
            curDateNums: $this.curDateNums.slice(),
            curTravelTimes: $this.curTravelTimes.slice()
          };
          $this.$store.commit("travelFilterCondition/setCurDateList", obj);
          break;
        case configEnums.specialList:
          obj = {
            curSpecialList: $this.curSpecialList.slice()
          };
          $this.$store.commit("travelFilterCondition/setCurSpecialList", obj);
          break;
      }
      $this.$store.commit("travelFilterCondition/setShowConditionPopup", false);
    }
  }
};
</script>
