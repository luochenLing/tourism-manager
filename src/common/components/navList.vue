<template>
  <div class="root" ref="root">
    <ul class="nav-class" ref="navList" :style="style">
      <slot name="item"></slot>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.root {
  float: left;
  box-sizing: border-box;
  overflow: hidden;
  background: #f8f8f8;
}
</style>

<script lang="ts">
export default {
  name: "navList",
  props: {
    //横向标题高度
    subtractHeight: {
      type: Number,
      default: 0
    },
    viewClientHeight: {
      type: Number,
      default: 0
    },
    //近似等于超出边界时最大可拖动距离(px);
    additionalY: {
      type: Number,
      default: 50
    },
    // 惯性回弹指数(值越大，幅度越大，惯性回弹距离越长);
    reBoundExponent: {
      type: Number,
      default: 10,
      validator(value: number) {
        return value > 0;
      }
    },
    //灵敏度(惯性滑动时的灵敏度,值越小，阻力越大),可近似认为速度减为零所需的时间(ms);
    sensitivity: {
      type: Number,
      default: 1000,
      validator(value: number) {
        return value > 0;
      }
    },
    //列表的UL标签的高度，这个主要是应对可伸缩的UL高度进行适应管理
    domHeight: {
      type: Number,
      default: 0,
      validator(value: number) {
        return value >= 0;
      }
    }
  },
  data() {
    return {
      frameStartTime: 0, //动画开始时间
      frameEndTime: 0, //动画结束时间
      frameTime: 16.7, //最平滑动画的最佳循环间隔是1000ms/60，约等于16.7ms,大多数显示器的刷新频率是60Hz，相当于每秒钟重绘60次
      acceleration: 0, //加速度
      speed: 0, //速度
      lastY: 0, //移动动画后的位置
      startY: 0, //移动开始的起始位置
      currentY: 0, //移动时当前的距离
      translateY: 0, ///运动的距离
      inertiaFrame: 0, //控制动画的开关，类似控制定时器的开关
      touching: false, // 是否处于touch状态;
      startMoveTime: 0, //开始移动时间
      endMoveTime: 0, //结束移动时间
      zeroSpeed: 0.001, // 当speed绝对值小于该值时认为速度为0 (可用于控制惯性滚动结束期的顺滑度)
      reBounding: false, // 是否处于回弹过程;
      fixBottom: false,
      reBoundingDuration: 360 //回弹过程duration;
    };
  },
  watch:{
    viewClientHeight(){
      let $this: any = this;
      let height = $this.viewClientHeight - $this.subtractHeight;
      $this.$refs.root.style.height = `${height}px`;
    }
  },
  computed: {
    // 可视区高度;
    viewAreaHight() {
      let $this: any = this;
      return $this.viewClientHeight - $this.subtractHeight;
    },
    navListHeight() {
      let $this: any = this;
      if ($this.domHeight > 0) {
        return $this.domHeight;
      } else {
        return $this.$refs.navList.offsetHeight;
      }
    },
    //可视区与可滑动元素高度差值,就是展示你所看到的选项部分高度
    listHeight() {
      let $this: any = this;
      return $this.navListHeight - $this.viewAreaHight;
    },
    style() {
      let $this: any = this;
      if ($this.fixBottom) return {};
      return {
        transitionTimingFunction: $this.transitionTimingFunction,
        transitionDuration: `${$this.transitionDuration}ms`,
        transform: `translate3d(0px, ${$this.translateY}px, 0px)`
      };
    },
    transitionDuration() {
      let $this: any = this;
      if ($this.touching || (!$this.reBounding && !$this.touching)) {
        return 0;
      }
      if ($this.reBounding && !$this.touching) {
        return $this.reBoundingDuration;
      }
    },
    transitionTimingFunction() {
      let $this: any = this;
      return $this.reBounding
        ? "cubic-bezier(0.25, 0.46, 0.45, 0.94)"
        : "cubic-bezier(0.1, 0.57, 0.1, 1)";
    },
    isMoveTop() {
      let $this: any = this;
      return $this.currentY <= $this.startY;
    },
    isMoveDown() {
      let $this: any = this;
      return $this.currentY >= $this.startY;
    }
  },
  methods: {
    navTouchStart(e: any) {
      e.stopPropagation();
      let $this: any = this;
      cancelAnimationFrame($this.inertiaFrame);
      //每次点击的时候初始化动画，记录当前点击的位置
      $this.lastY = e.touches[0].clientY;
    },
    navTouchMove(e: any) {
      let $this: any = this;
      e.preventDefault(); //这个阻止父元素的下拉事件发生
      e.stopPropagation(); //这个阻止冒泡事件
      $this.touching = true;
      $this.startMoveTime = $this.endMoveTime; //上次时间更新开始时间
      $this.startY = $this.lastY; //上次点击位置更新开始位置
      $this.currentY = e.touches[0].clientY; //当前点击位置
      $this.moveFollowTouch();
      $this.endMoveTime = e.timeStamp;
    },
    navTouchEnd(e: any) {
      let $this: any = this;
      $this.touching = false;
      if ($this.checkReboundY()) {
        //做了边界修正后。停止动画
        cancelAnimationFrame($this.inertiaFrame);
      } else {
        //正常滚动结束的时候的操作
        //手指的停顿时间
        let silenceTime = e.timeStamp - $this.endMoveTime;
        //获取移动结束后停止的时间
        let timeStamp = $this.endMoveTime - $this.startMoveTime;
        //这里的八秒是最佳时间？或许可有可无
        timeStamp = timeStamp > 0 ? timeStamp : 8;
        if (silenceTime > 100) return; // 停顿时间超过100ms不产生惯性滑动;
        //物理学中用速度来表示物体运动的快慢和方向。速度在数值上等于物体运动的位移跟发生这段位移所用的时间的比值。速度的计算公式为v=Δx/Δt
        $this.speed = ($this.lastY - $this.startY) / timeStamp;
        //阻力越小，速度越大
        $this.acceleration = $this.speed / $this.sensitivity;
        $this.frameStartTime = new Date().getTime();
        $this.inertiaFrame = requestAnimationFrame($this.moveByInertia);
      }
    },
    //惯性滚动
    moveByInertia() {
      let $this: any = this;
      $this.frameEndTime = new Date().getTime();
      $this.frameTime = $this.frameEndTime - $this.frameStartTime;
      //10,惯性回弹指数
      if ($this.isMoveTop) {
        if ($this.translateY <= -$this.listHeight) {
          //加速度公式
          $this.acceleration *=
            ($this.reBoundExponent +
              Math.abs($this.translateY + $this.listHeight)) /
            $this.reBoundExponent;
          //速度衰减
          $this.speed = Math.min($this.speed - $this.acceleration, 0);
          //溢出时候的操作
        } else {
          //.加速度乘以时间得到的是速度
          $this.speed = Math.min(
            $this.speed - $this.acceleration * $this.frameTime,
            0
          ); //速度衰减
        }
      } else if ($this.isMoveDown) {
        if ($this.translateY >= 0) {
          $this.acceleration *=
            ($this.reBoundExponent + $this.translateY) / $this.reBoundExponent;
          $this.speed = Math.max($this.speed - $this.acceleration, 0);
          //溢出操作
        } else {
          //正常操作
          $this.speed = Math.max(
            $this.speed - $this.acceleration * $this.frameTime,
            0
          );
        }
      }
      //匀变速直线运动的公式：速度*时间/2
      $this.translateY += ($this.speed * $this.frameTime) / 2;
      //当speed绝对值小于该值时认为速度为0 (可用于控制惯性滚动结束期的顺滑度)
      if (Math.abs($this.speed) <= $this.zeroSpeed) {
        $this.checkReboundY();
        return;
      }
      //滚动一次以后记录一下结束时间更始为下一次的开始时间
      $this.frameStartTime = $this.frameEndTime;
      $this.inertiaFrame = requestAnimationFrame($this.moveByInertia);
    },
    //拖动
    moveFollowTouch() {
      let $this: any = this;
      if ($this.isMoveTop) {
        if (
          ($this.translateY <= 0 && $this.translateY + $this.listHeight > 0) ||
          $this.translateY > 0
        ) {
          //this.translateY + this.listHeight 正常的可视区域拖动范围
          //可以理解为向上移动的单位都是负数接近于负无穷，向下移动的单位接近于正无穷
          $this.translateY += $this.currentY - $this.lastY; //正常滑行距离
        } else if ($this.translateY + $this.listHeight <= 0) {
          //溢出可视区的范围
          //additionalY,近似等于超出边界时最大可拖动距离(px);
          $this.translateY +=
            ($this.additionalY * ($this.currentY - $this.lastY)) /
            ($this.viewAreaHight +
              Math.abs($this.translateY + $this.listHeight));
        }
      } else {
        if ($this.translateY >= 0) {
          //溢出移动
          $this.translateY +=
            ($this.additionalY * ($this.currentY - $this.lastY)) /
            ($this.viewAreaHight + $this.translateY);
        } else if (
          ($this.translateY <= 0 && $this.translateY + $this.listHeight >= 0) ||
          $this.translateY + $this.listHeight <= 0
        ) {
          //正常部分计算
          $this.translateY += $this.currentY - $this.lastY;
        }
      }
      $this.lastY = $this.currentY;
    },
    //检测是否回弹
    checkReboundY() {
      let $this: any = this;
      $this.reBounding = false;
      if ($this.listHeight <= 0) {
        //列表高度小于视窗高度的时候不需要滚动
        $this.reBounding = true;
        $this.translateY = 0;
      } else if ($this.translateY > 0) {
        //上面的高度超了，重置为0,来个回弹效果
        $this.reBounding = true;
        $this.translateY = 0;
      } else if ($this.translateY < -$this.listHeight) {
        //下面的距离超了
        $this.reBounding = true;
        $this.translateY = -$this.listHeight;
      }
      //以上部为主，这个看得懂吧
      return $this.translateY === 0 || $this.translateY === -$this.listHeight;
    }
  },
  mounted() {
    let $this: any = this;
    //绑定事件
    $this.$refs.navList.addEventListener("touchstart", $this.navTouchStart);
    $this.$refs.navList.addEventListener("touchmove", $this.navTouchMove);
    $this.$refs.navList.addEventListener("touchend", $this.navTouchEnd);
  },
  beforeDestroy() {
    //在https://github.com/ScoutYin/ly-tab这个项目做参考的时候发现把事件移除写到了destoryed阶段，在这里发现在这个阶段的元素已经移除了，不能做绑定或移除的操作，所以写到了beforeDestroy，如果不移除，可能会导致其他页面监听这些事件的结果
    let $this: any = this;
    $this.$refs.navList.removeEventListener("touchstart", $this.navTouchStart);
    $this.$refs.navList.removeEventListener("touchmove", $this.navTouchMove);
    $this.$refs.navList.removeEventListener("touchend", $this.navTouchEnd);
  }
};
</script>
