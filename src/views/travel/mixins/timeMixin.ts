import Vue from "vue";
import Component from "vue-class-component";//混入必要组件

@Component({
  filters: {
    timeFormat(input: any) {
      input = input.replace(/\-/g, "/"); //横杠的时间不能被识别，所以要替换程斜杠
      let time = new Date(input);
      let year = time.getFullYear(); //年
      let month = time.getMonth() + 1; //月
      let day = time.getDate(); //日
      return `${year}年${month}月${day}日`;
    }
  }
})
class timeMixin extends Vue {}

export default timeMixin;
