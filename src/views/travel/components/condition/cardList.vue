<template>
  <div class="layout">
    <nav-list :viewClientHeight="viewClientHeight" :domHeight="listHeight">
      <template slot="item">
        <li
          class="condition"
          v-for="(item, index) in haveList(list)"
          :key="index"
        >
          <div class="item-title">
            <span class="title">{{ item.text }}</span>
            <span
              :data-index="index"
              :class="getShowAll(item.code) ? 'show-all' : 'cur-select'"
              @click="setShowAll(item.code)"
              >{{ getSelCondition(item.code) }}
            </span>
          </div>
          <ul class="body" :data-code="item.code">
            <li
              class="line-item"
              ref="dataItem"
              v-for="(citem, cindex) in item.children"
              v-show="cindex > 5 ? getShowAll(item.code) : true"
              :key="citem.id"
              :style="(cindex + 1) % 3 == 0 ? lineStyle : ''"
              :class="
                getItemClass(item.code).indexOf(citem.code) > -1 ? 'active' : ''
              "
              @click="
                checkCurItem(item.code, { text: citem.text, code: citem.code })
              "
            >
              <span>{{ citem.text }}</span>
              <span v-if="citem.count">{{ citem.count }}人选择</span>
            </li>
          </ul>
        </li>
      </template>
    </nav-list>

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
  /deep/ .root {
    background: #fff;
    width: 100%;
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
          // vertical-align: middle;
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
import { Vue, Component, Prop, Watch, Emit } from "vue-property-decorator";
import { Toast } from "vant";
import configEnums from "@/globalConfig/configEmuns";
import TourismService from "@/services/tourismService";
import ErrorPage from "@/common/components/error.vue";
import common from "@/utils/common";
Vue.use(Toast);
@Component({
  name: "CardList",
  components: {
    'nav-list':()=>import('@/common/components/navList.vue')
  }
})
class cardList extends Vue {
  @Prop({ default: [], type: Array }) list!: Array<any>;
  //当前选中日期
  curDateNums = [];
  //当前出行日期
  curTravelTimes = [];
  //当前玩乐计划
  curSpecialList = [];
  //当前选中的列表标题项
  viewClientHeight = 0;
  //选项的UL高度
  listHeight = 0;
  //是否显示所有的选项
  showAllList: Array<any> = [];
  //选项布局样式
  lineStyle = {
    marginRight: 0
  };
  //收起时最多显示几个
  maxShowItem = 6;

  //筛选条件
  params = {
    orderFiled: "",
    dateList: [],
    travelTimeList: [],
    specialList: []
  };

  mounted() {
    //98:弹层的footer和header的高度+外边距之和
    let height =
      (<HTMLElement>document.querySelector(".card-popup")).clientHeight - 98;
    this.viewClientHeight = height;
  }

  beforeDestroy() {
    Toast.clear();  
  }

  @Watch("list")
  listChange() {
    let navClass = <HTMLElement>document.querySelector(".nav-class");
    //初始化高度,初始化列表位置
    this.$nextTick(() => {
      this.listHeight = navClass.offsetHeight;
      navClass.style.transform = "translate3d(0px, 0px, 0px)";
      (this.$children[0] as any).translateY = 0; //这里如果用props操作子组件的话还要另外加变量也不太好控制，refs现在这个阶段获取不到，使用children可以把移动的位置初始化一下，解决问题
    });
  }

  @Emit("update:changePopup")
  changePopup(showPopup: boolean) {
    return showPopup;
  }

  @Emit("update:changeProList")
  changeProList(prolist: any[]) {
    return prolist;
  }

  //是否显示所有信息
  setShowAll(code: any) {
    let idx = this.showAllList.findIndex((x: any) => x.code == code);
    if (idx > -1) {
      this.showAllList[idx].value = !this.showAllList[idx].value;
    } else {
      let item: object;
      item = {
        code: code,
        value: true
      };
      this.showAllList.push(item);
    }

    //伸缩的时候让子组件自适应高度
    this.$nextTick(() => {
      this.listHeight = (<HTMLElement>(
        document.querySelector(".nav-class")
      )).offsetHeight;
    });
  }

  getShowAll(code: any) {
    let res = this.showAllList.find((x: any) => x.code == code);
    if (res) {
      return res.value;
    } else {
      return false;
    }
  }

  checkCurItem(code: any, obj: any) {
    switch (code) {
      case configEnums.dateNumList:
        this.checkItem(this.curDateNums, obj);
        break;
      case configEnums.travelTimeList:
        this.checkItem(this.curTravelTimes, obj);
        break;
      case configEnums.specialList:
        this.checkItem(this.curSpecialList, obj);
        break;
    }
  }

  checkItem(arr: any[], obj: any) {
    this.ArryOption(arr, obj);
  }

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
  }

  getItemClass(code: string) {
    let texts: any[] = [];
    return this.getSelArray(code, texts, "code", false);
  }

  getSelCondition(code: string) {
    let texts: any[] = [];
    return this.getSelArray(code, texts, "text", true);
  }

  getSelArray(
    code: string,
    arr: any[],
    type: string,
    haveSplit: boolean = true
  ) {
    switch (code) {
      case configEnums.dateNumList:
        this.addSelItem(type, arr, this.curDateNums);
        if (haveSplit) {
          return arr.join("、");
        } else {
          return arr;
        }
      case configEnums.travelTimeList:
        this.addSelItem(type, arr, this.curTravelTimes);
        if (haveSplit) {
          return arr.join("、");
        } else {
          return arr;
        }
      case configEnums.specialList:
        this.addSelItem(type, arr, this.curSpecialList);
        if (haveSplit) {
          return arr.join("、");
        } else {
          return arr;
        }
    }
  }

  addSelItem(type: string, arr: any[], list: any) {
    for (let item of list) {
      if (type == "text") {
        arr.push(item.text);
      } else {
        arr.push(item.code);
      }
    }
  }

  resetCondition(code: string) {
    //重置条件
    (this.$refs.dataItem as Array<any>).forEach((item: any) => {
      item.classList.remove("active");
    });
    switch (code) {
      case configEnums.dateList:
        this.curDateNums.splice(0);
        this.curTravelTimes.splice(0);
        break;
      case configEnums.specialList:
        this.curSpecialList.splice(0);
        break;
    }
  }

  submitCondition(code: string) {
    //提交确认条件
    let obj: any = {};
    switch (code) {
      case configEnums.dateList:
        obj = {
          curDateNums: this.curDateNums.slice(),
          curTravelTimes: this.curTravelTimes.slice()
        };
        this.$store.commit("travelFilterCondition/setCurDateList", obj);
        this.params = this.getConditions(this.params);

        this.GetTravelInfoListByFilter(this.params);
        break;
      case configEnums.specialList:
        obj = {
          curSpecialList: this.curSpecialList.slice()
        };
        this.params.specialList = obj.curSpecialList.map(
          (val: any, index: any) => {
            return val.code * 1;
          }
        );

        this.$store.commit("travelFilterCondition/setCurSpecialList", obj);
        this.params = this.getConditions(this.params);

        this.GetTravelInfoListByFilter(this.params);
        break;
    }

    this.changePopup(false);
  }

  haveList(list: Array<any>) {
    if (list[0]) {
      return list[0].children;
    } else {
      return new Array();
    }
  }

  getConditions(params: any) {
    params.orderFiled = this.$store.getters[
      `travelFilterCondition/getCurRecommend`
    ].code;
    let dateList = this.$store.getters[`travelFilterCondition/getCurDateList`]
      .curDateNums;
    if (dateList) {
      params.dateList = dateList.map((val: any, idx: any) => {
        return val.code * 1;
      });
    }

    let travelTimeList = this.$store.getters[
      `travelFilterCondition/getCurDateList`
    ].curTravelTimes;
    if (travelTimeList) {
      params.travelTimeList = travelTimeList.map((val: any, idx: any) => {
        return val.code * 1;
      });
    }

    let specialList = this.$store.getters[
      `travelFilterCondition/getCurSpecialList`
    ].curSpecialList;
    if (specialList) {
      params.specialList = specialList.map((val: any, idx: any) => {
        return val.code * 1;
      });
    }
    return params;
  }
  GetTravelInfoListByFilter(params: any) {
    Toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0
      });
    TourismService.GetTravelInfoListByFilter(params)
      .then(ret => {
         Toast.clear();
        if (ret.data && ret.data.resultData) {
          this.changeProList(ret.data.resultData);
        }
      })
      .catch(err => {
        Toast.clear();
        let text = common.GetHttpCodeMsg(err.response.status);
        let url = `/error?showNav=true&text=${text}`;
        this.$router.replace(url);
      });
  }
}
export default cardList;
</script>
