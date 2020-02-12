<template>
  <li :class="`${flag ? 'my' : 'server'}`">
    <img
      src="@/images/common/head-portrait.jpg"
      :class="`${flag ? 'my-icon' : 'server-icon'}`"
      alt=""
    />
    <div :class="`${flag ? 'my-content' : 'server-content'}`">
     {{msgContent}}
    </div>
  </li>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component({
    name:'ChatMsg'
})
class ChatMsg extends Vue {
  //是我方发送的还是客服方发送的消息,是我方时为true
  @Prop({ default: true, type: Boolean }) flag!: boolean;
  //发送内容
  @Prop({ default: "", type: String }) msgContent!: string;
  //头像
  @Prop({ default: "", type: String }) imgUrl!: string;
}

export default ChatMsg;
</script>

<style lang="scss" scoped>
li {
  padding: 10px 0;
  &::after {
    content: "";
    clear: both;
    display: block;
  }
  .my-icon,
  .server-icon {
    width: 40px;
    border-radius: 100%;
    border: 2px #abe4bf solid;
    float: left;
  }

  .my-icon {
    float: left;
  }

  .server-icon {
    float: right;
  }

  .my-content,
  .server-content {
    background-color: #c3e678;
    position: relative;
    border-radius: 8px;
    box-sizing: border-box;
    width: 200px;
    min-height: 40px;
    padding: 10px;
    &::before {
      content: "";
      position: absolute;
      width: 0px;
      height: 0;
      border: 8px solid transparent;
      top: 10px;
    }
  }

  .my-content {
    margin-left: 15px;
    float: left;
    &::before {
      border-right-color: #c3e678;
      right: 100%;
    }
  }

  .server-content {
    margin-right: 15px;
    float: right;
    &::before {
      border-left-color: #c3e678;
      left: 100%;
    }
  }
}
</style>
