import Vue from "vue";
import Component from "vue-class-component";//混入必要组件
import common from "@/utils/common";
@Component({
  filters: {
    getProTage: (val: string) => {
        if (val) {
          let valArr = val.split("|");
          let tags: any[] = [];
          valArr.forEach((val, index) => {
            let ret = common.getProTageByCode(parseInt(val));
            tags.push(ret);
          });
          return tags.join("|");
        }
      },
      million: function(val: number) {
        //过万处理
        let num;
        if (val > 9999) {
          //大于9999显示x.xx万
          num = Math.floor(val / 1000) / 10 + "万";
        } else if (val < 9999 && val > -9999) {
          num = val;
        } else if (val < -9999) {
          //小于-9999显示-x.xx万
          num = -(Math.floor(Math.abs(val) / 1000) / 10) + "万";
        }
        return num;
      }
  }
})
class proMixin extends Vue {}

export default proMixin;
