<template>
  <div class="chat-layout" ref="chatLayout">
    <NavBar>
      <div class="nav-center" slot="nav-center">我的管家</div>
      <div class="nav-right" slot="nav-right">
        <!-- <h4>注册</h4> -->
      </div>
    </NavBar>
    <ul class="chat-content" ref="chatContent" @click="closeEmojiBox">
      <chat-msg
        v-for="(item, index) in callRecordList"
        :flag="item.flag"
        :imgUrl="item.imgUrl"
        :msgContent="item.msgContent"
        :key="index"
      />
    </ul>
    <div :class="`tool-bar ${showEmojiBox ? 'tool-active' : ''}`">
      <div class="tool">
        <input
          type="text"
          class="chat-msg"
          @keypress="sendMsg($event)"
          v-model="msgContent"
          ref="chatMsg"
        />
        <span class="emojis" @click="getEmjisBox">😀</span>
      </div>
      <van-grid class="emoji-box">
        <van-grid-item
          v-for="(item, index) in chatList"
          :text="item"
          :key="index"
          @click="getEmojiItem(item)"
        />
      </van-grid>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Grid, GridItem, Toast } from "vant";
import Cookie from "js-cookie";
import NavBar from "@/common/components/navBar.vue";
import ChatMsg from "@/views/common/chatMsg.vue";
import SocketHandler from "@/utils/socketHandler";
import Common from "@/utils/common";

@Component({
  name: "ChatBox",
  components: {
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    NavBar,
    ChatMsg
  }
})
class ChatBox extends Vue {
  chatList = [
    "😀",
    "😄",
    "😁",
    "😆",
    "😅",
    "🤣",
    "😂",
    "🙂",
    "😍",
    "😘",
    "😜",
    "🙄",
    "😪",
    "😒",
    "😭",
    "😤",
    "😡",
    "💩",
    "👌",
    "👍",
    "✌",
    "😨"
  ];
  showEmojiBox = false;
  msgContent = "";
  callRecordList = [
    {
      flag: true,
      imgUrl: "",
      msgContent: "花儿为什么那么红"
    },
    {
      flag: false,
      imgUrl: "",
      msgContent: "问花去"
    }
  ];
  //发送信息类
  msgObj = {
    SenderID: "",
    ReceiverID: "f3f13537293b4c6bb8186305c37e8668",
    MessageType: "text",
    Content: ""
  };

  mounted() {
    this.setBoxHeight(window.screen.availHeight);
  }

  beforeDestroy() {
    SocketHandler.closeWs();
    SocketHandler.onClose((e: any) => {
      console.log("连接已关闭...", e);
    });
  }

  getEmjisBox() {
    if (!this.showEmojiBox) {
      this.showEmojiBox = true;
    }
  }
  setBoxHeight(height: number) {
    let chatLayout: any = this.$refs.chatLayout;
    chatLayout.style.height = `${window.screen.availHeight - 44}px`;
  }
  getEmojiItem(val: any) {
    this.msgContent += val;
    (this.$refs.chatMsg as any).focus();
  }

  closeEmojiBox() {
    this.showEmojiBox = false;
  }

  sendMsg(event: any) {
    if (event.keyCode == 13) {
      if (this.msgContent == "") {
        Toast.fail("发送消息不能为空！");
        return;
      }
      (this.$refs.chatMsg as any).focus();
      let sid = <string>Cookie.get("uid");
      this.msgObj.SenderID = sid;
      this.msgObj.Content = Common.utf16toEntities(this.msgContent);
      SocketHandler.sendMsg(this.msgObj, () => {
        this.$nextTick(() => {
          let chatLayout: any = this.$refs.chatLayout;
          chatLayout.scrollTop = chatLayout.scrollHeight;
        });
        this.msgContent = "";
      });

      SocketHandler.onMessage((e: any) => {
        //相同的时候说明是自己发送的信息，不同的时候说明是对方发送的
        console.log(e);
        let ret = JSON.parse(e.data);
        let sid = <string>Cookie.get("uid");
        //界面显示类
        let msgItem = {
          flag: false,
          imgUrl: "",
          msgContent: this.msgContent
        };
        if (sid != ret.SenderID) {
          this.msgObj.ReceiverID = ret.SenderID;
          msgItem.flag = false;
        } else {
          msgItem.flag = true;
        }
        msgItem.msgContent = Common.uncodeUtf16(ret.Content);
        this.callRecordList.push(msgItem);
        this.$nextTick(() => {
          let chatLayout: any = this.$refs.chatLayout;
          chatLayout.scrollTop = chatLayout.scrollHeight;
        });
      });
    }
  }
}

export default ChatBox;
</script>

<style lang="scss" scoped>
.layout {
  overflow: hidden;
}
.chat-layout {
  background: #f8f8f8;
  overflow: auto;
  .chat-content {
    padding: 60px 10px 0 10px;
    font-size: 16px;
    // height: 100%;
  }

  .tool-bar {
    position: fixed;
    bottom: 0;
    width: 100vw;
    padding: 6px 5px;
    box-sizing: border-box;
    background: #f0f0f0;
    z-index: 10;
    .tool {
      display: flex;
      justify-content: center;
      align-items: center;
      .chat-msg {
        flex: 90%;
        height: 30px;
        border: none;
        border-radius: 8px;
      }
      .emojis {
        flex: 10%;
        font-size: 16px;
        text-align: center;
      }
    }
    .emoji-box {
      /deep/span {
        font-size: 16px;
      }
      position: absolute;
      top: 45px;
      left: 0;
      height: calc(100% - 42px);
      overflow: auto;
    }
    &::after {
      content: "";
      clear: both;
      display: block;
    }
  }
  .tool-active {
    height: 40vh;
  }
}

/deep/.back {
  flex: 15%;
}

.nav-center {
  flex: 70%;
}

.nav-right {
  flex: 15%;
  color: #32c45d;
}
</style>
