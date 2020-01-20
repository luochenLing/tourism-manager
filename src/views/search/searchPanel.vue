<template>
  <div class="search-layout">
    <NavBar class="nav-search">
      <span class="cancel" @click="cancel" slot="nav-left">取消</span>
      <input
        class="search-content"
        v-model="condition"
        slot="nav-center"
        @keyup="showClearSearch"
        type="text"
        placeholder="目的地"
        v-focus="true"
      />
      <van-icon
        slot="nav-right"
        @click="clearCondition"
        v-show="showClearDom"
        class="nav-clear"
        name="clear"
        color="#999"
        size="30px"
      />
      <van-icon
        slot="nav-right"
        class="search-pro"
        @click="search"
        name="search"
        color="#2dbb55"
        size="30px"
      />
    </NavBar>

    <div class="hot">
      <div class="hot-title">热门搜索</div>
      <van-skeleton title :row="3" :row-width="['100%','100%','100%']" :title-width="'0%'" :loading="loading">
        <ul class="hot-content">
          <li
            class="hot-item"
            @click="searchHotCity(item.title)"
            v-for="(item, index) in hotCityList"
            :key="item.Id"
            :title="item.code"
            :style="(index + 1) % 4 == 0 ? 'margin-right:0' : ''"
          >
            {{ item.title }}
          </li>
        </ul>
      </van-skeleton>
    </div>
    <div class="history">
      <div class="history-title">
        <span>历史搜索</span>
        <van-icon
          @click="clear"
          class="search-pro"
          name="delete"
          color="#2dbb55"
          size="20px"
        />
      </div>
      <ul
        class="history-content"
        v-for="(item, index) in historyList"
        :key="index"
      >
        <li class="history-item">{{ item }}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import NavBar from "@/common/components/navBar.vue";
import { Vue, Component } from "vue-property-decorator";
import { Icon, Dialog, Toast, Skeleton } from "vant";
import Travel from "@/views/travel/controller/travelController";
import configEmuns from "@/globalConfig/configEmuns";
import TourismService from "@/services/tourismService";
Vue.use(Toast);
@Component({
  name: "SearchPanel",
  components: {
    NavBar,
    [Icon.name]: Icon,
    [Skeleton.name]: Skeleton
  },
  directives: {
    focus: {
      //被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于 document 中）
      inserted: function(el) {
        el.focus();
      },
      //被绑定元素所在的模板更新时调用，而不论绑定值是否变化。通过比较更新前后的绑定值，可以忽略不必要的模板更新
      update: function(el, { value }) {
        if (value) {
          el.focus();
        }
      }
    }
  }
})
class searchPanel extends Vue {
  condition = "";
  showClearDom = false;
  historyList: Array<any> = [];
  hotCityList: Array<any> = [];
  loading = true;
  travel = new Travel();
  created() {
    //历史数据获取
    let curHistoryList = localStorage.getItem("searchKey");
    if (curHistoryList) {
      this.historyList = JSON.parse(curHistoryList);
    }

    TourismService.GetHotCityList().then(ret => {
      if (ret.data) {
        this.hotCityList = ret.data.resultData;
        this.loading = false;
      }
    });
  }

  showClearSearch() {
    if (this.condition) {
      this.showClearDom = true;
    } else {
      this.showClearDom = false;
    }
  }

  //清空条件事件
  clearCondition() {
    this.condition = "";
    this.showClearDom = false;
  }

  //取消
  cancel() {
    this.$router.back();
  }

  //热门搜索
  searchHotCity(val: string) {
    this.condition = val;
    this.search();
  }
  //搜索
  search() {
    if (!this.condition) {
      Toast.fail("条件不能为空");
      return;
    }

    var res = this.travel.AddHistory(this.condition);
    (this.historyList as string[]) = res;
  }

  //清空
  clear() {
    Dialog.confirm({
      title: "提示",
      message: "确定清空历史记录吗"
    })
      .then(() => {
        (this.historyList as string[]).splice(0);
        localStorage.removeItem(configEmuns.searchKey.toString());
      })
      .catch(() => {
        // on cancel
      });
  }
}

export default searchPanel;
</script>

<style lang="scss" scoped>
.search-layout {
  .nav-search {
    background: #fff;
    .cancel {
      color: #2dbb55;
      flex: 18%;
    }
    .search-content {
      flex: 70%;
      border: none;
      height: 1.5rem;
      background-color: #e5e5e5;
      padding: 5px 10px;
      position: relative;
    }
    .nav-clear {
      position: absolute;
      right: 14%;
    }
    .search-pro {
      flex: 12%;
    }
  }

  .hot,
  .history {
    padding-top: 50px;
    display: flex;
    flex-direction: column;
    background: #fff;
    margin: 0 10px;
    .hot-title {
      border-bottom: 1px solid #d4d4d4;
      height: 1.5rem;
      color: #999;
    }
    .hot-content {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      width: 100%;
      justify-content: flex-start;
      align-content: flex-start;
      .hot-item {
        border: 1px solid #d4d4d4;
        width: 20%;
        text-align: center;
        height: 30px;
        line-height: 30px;
        margin: 10px 10px 0 0;
      }
    }
  }

  .history {
    .history-title {
      border-bottom: 1px solid #d4d4d4;
      height: 1.5rem;
      color: #999;
      display: flex;
      justify-content: space-between;
    }
    .history-content {
      display: flex;
      flex-flow: column nowrap;
      color: #999;

      .history-item {
        margin-top: 10px;
      }
    }
  }
}
</style>
