<template>
  <div class="gantt-chart">
    <div class="gantt-chart-container" ref="ganttMapContainerRef" @scroll.native="handleScrollEvent($event, 'x')">
      <div class="gantt-chart-header" ref="ganttChartHeaderRef" :style="headerStyle">
        <div class="header-block" v-for="(block, index) in blocks" :key="index">
          {{ block.time }}
        </div>
      </div>
      <div class="gantt-chart-body" @scroll.native="handleScrollEvent($event, 'y')" ref="ganttChartBodyRef" :style="headerStyle">
        <div class="svg-container">
          <template v-for="(svg, index) in svgList" :key="index">
            <svg width="100%" height="40px">
              <rect :x="svg.position" y="10" :width="svg.width" height="20" style="stroke: #70d5dd; fill: #dd524b"></rect>
            </svg>
          </template>
        </div>
      </div>
    </div>
    <!-- <div class="scrollbar-x" ref="scrollbarXRef" @scroll.native="scroll($event, 'xbar')">
      <div class="x-child" :style="{ width: `${totalWidth}px` }"></div>
    </div>
    <div class="scrollbar-y" ref="scrollbarYRef" @scroll.native="scroll($event, 'ybar')">
      <div class="y-child" :style="{ height: `${totalHeight}px` }"></div>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";

const props = withDefaults(defineProps<{ data: any }>(), {});

const formatTime = (unix: number) => {
  const day = dayjs.unix(unix);
  return day.format("YYYY-MM-DD HH:mm:ss");
};

const addHour = (unix: number, hour: number) => {
  const day = dayjs.unix(unix);
  return day.add(hour, "hour").unix();
};

// 设置时间间隔/h
const timeInterval = ref(2);
// 设置每块宽度
const blockWidth = ref(200);

// 时间
const allTime = computed(() => {
  return props.data.map((item) => {
    return {
      startTime: dayjs(item.startTime).unix(),
      endTime: dayjs(item.endTime).unix(),
    };
  });
});
// 最小时间
const minTime = computed(() => {
  return allTime.value.reduce((acc, cur) => {
    return cur.startTime < acc ? cur.startTime : acc;
  }, allTime.value[0].startTime);
});
// 最大时间
const maxTime = computed(() => {
  return allTime.value.reduce((acc, cur) => {
    return cur.endTime > acc ? cur.endTime : acc;
  }, allTime.value[0].endTime);
});

// 每秒宽度
const secondWidth = computed(() => {
  return blockWidth.value / (timeInterval.value * 60 * 60);
});

const blockLength = computed(() => {
  return Math.floor((maxTime.value - minTime.value) / (timeInterval.value * 60 * 60)) + 2;
});

// 总宽度
const totalWidth = computed(() => {
  return blockWidth.value * blockLength.value;
});
// 总高度
const totalHeight = computed(() => {
  return 40 * svgList.value.length;
});

// 滚动事件
const scrollbarXRef = ref();
const scrollbarYRef = ref();
const ganttMapContainerRef = ref();
const ganttChartBodyRef = ref();
const ganttDataRankRef = ref();
const ganttChartHeaderRef = ref();

const headerStyle = reactive({
  transform: "translateY(0)",
  width: `${totalWidth.value}px`,
});

const handleScrollEvent = (event, type: "x" | "y") => {
  emit("scroll-y", ganttChartBodyRef.value.scrollTop);
};
const setScrollY = (y) => {
  ganttChartBodyRef.value.scrollTop = y;
};
defineExpose({ setScrollY });
const emit = defineEmits(["scroll-y"]);

//
const blocks = computed(() => {
  const blocks = [];
  for (let i = 0; i < blockLength.value; i++) {
    const unix = addHour(minTime.value, i * timeInterval.value);
    const obj = {
      unix,
      time: formatTime(unix),
    };
    blocks.push(obj);
  }
  return blocks;
});

const svgList = computed(() => {
  return allTime.value.map((item) => {
    const obj = {
      width: (item.endTime - item.startTime) * secondWidth.value,
      position: 0.5 * blockWidth.value + (item.startTime - minTime.value) * secondWidth.value,
    };
    return obj;
  });
});

const scroll = (event: any, type: "x" | "y" | "xbar" | "ybar") => {
  if (type === "x") return syncX(event.target.scrollLeft, [scrollbarXRef.value]);
  if (type === "y") return syncY(event.target.scrollTop, [scrollbarYRef.value, ganttDataRankRef.value]);
  if (type === "xbar") return syncX(event.target.scrollLeft, [ganttMapContainerRef.value]);
  if (type === "ybar") return syncY(event.target.scrollTop, [ganttChartBodyRef.value, ganttDataRankRef.value]);
};
const syncX = (left: number, domList: HTMLElement[]) => {
  nextTick(() => {
    domList.forEach((dom) => {
      dom.scrollLeft = left;
    });
  });
};
const syncY = (top: number, domList: HTMLElement[]) => {
  nextTick(() => {
    domList.forEach((dom) => {
      dom.scrollTop = top;
    });
  });
};
</script>

<style scoped lang="scss">
.gantt-chart {
  // position: relative;
  // left: 0;
  // right: 0;
  // top: 0;
  // bottom: 0;
  flex: auto;
  overflow: hidden;

  .gantt-chart-container {
    box-sizing: border-box;
    display: flex;
    flex-flow: column nowrap;
    overflow-x: scroll;
    overflow-y: hidden;
    width: 100%;
    height: 100%;

    background: no-repeat left top/100%;
    background-image: linear-gradient(180deg, #e8eaec, #e8eaec 1px, transparent 1px, transparent), linear-gradient(0deg, #e8eaec, #e8eaec 1px, transparent 1px, transparent),
      linear-gradient(270deg, #e8eaec, #e8eaec 1px, transparent 1px, transparent);

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &-header {
    width: 100%;
    height: 40px;
    display: flex;
    border-bottom: 1px solid #e8eaec;
    flex: none;
    box-sizing: border-box;
    overflow-x: auto;
    background: repeat left top/200px 40px;
    background-image: linear-gradient(180deg, transparent, transparent 39px, #e8eaec 39px, #e8eaec 40px), linear-gradient(90deg, transparent, transparent 199px, #e8eaec, 199px, #e8eaec 200px);

    .header-block {
      width: 200px;
      flex: 0 0 auto;
      font-size: 12px;
      padding-top: 10px;
      text-align: center;
    }
  }
  &-body {
    overflow-y: scroll;
    overflow-x: hidden;

    &::-webkit-scrollbar {
      display: none;
    }
    .svg-container {
      background: repeat left top/200px 40px;
      background-image: linear-gradient(180deg, transparent, transparent 39px, #e8eaec 39px, #e8eaec 40px), linear-gradient(90deg, transparent, transparent 199px, #e8eaec, 199px, #e8eaec 200px);
      display: flex;
      flex-flow: column nowrap;
    }
  }
}
</style>
