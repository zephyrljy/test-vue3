<template>
  <div class="gantt-view">
    <GanttTable @scroll-y="handleScrollYEvent($event, 'table')" ref="tableRef" :option="option" :data="data"></GanttTable>
    <GanttChart ref="chartRef" :data="data" @scroll-y="handleScrollYEvent($event, 'chart')"></GanttChart>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";

const option: { columns: TableColumns[] } = {
  columns: [
    {
      title: "姓名",
      field: "name",
      width: 100,
    },
    {
      title: "开始时间",
      field: "startTime",
    },
    {
      title: "开始时间",
      field: "startTime",
    },
  ],
};
const data = ref([
  {
    name: "兵三号卫星",
    startTime: "2022-01-01 00:00:00",
    endTime: "2022-01-01 23:59:59",
  },
  {
    name: "兵三号卫星",
    startTime: "2022-01-01 00:00:00",
    endTime: "2022-01-01 23:59:59",
  },
]);

const getRandomTimeByRang = (type: number) => {
  const time1 = dayjs("2022-01-01 00:00:00").unix();
  const time2 = dayjs("2022-01-01 12:00:00").unix();
  const time3 = dayjs("2022-01-01 24:00:00").unix();

  if (type === 0) {
    return dayjs.unix(Math.random() * (time2 - time1) + time1).format("YYYY-MM-DD HH:mm:ss");
  } else {
    return dayjs.unix(Math.random() * (time3 - time2) + time2).format("YYYY-MM-DD HH:mm:ss");
  }
};

const tableRef = ref();
const chartRef = ref();
const handleScrollYEvent = (y, type) => {
  if (type === "table") {
    chartRef.value.setScrollY(y);
  } else {
    tableRef.value.setScrollY(y);
  }
};

for (let i = 0; i < 30; i++) {
  const obj = {
    name: "卫星",
    startTime: getRandomTimeByRang(0),
    endTime: getRandomTimeByRang(1),
  };
  data.value.push(obj);
}
</script>

<style scoped lang="scss">
.gantt-view {
  width: 1200px;
  height: 300px;
  display: flex;
  flex-flow: row nowrap;
  background-color: transparent;
  overflow: hidden;
  margin: 200px auto;
}

.scrollbar-x {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 40px;
  overflow-x: auto;
  z-index: 2000;

  &::-webkit-scrollbar {
    appearance: none;
    height: 10px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: skyblue;
    background-image: -webkit-linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.2) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0.2) 75%,
      transparent 75%,
      transparent
    );
  }
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #ededed;
    border-radius: 10px;
  }

  .x-child {
    height: 5px;
  }

  svg {
    font-size: 0px;
    display: block;
  }
}
.scrollbar-y {
  position: absolute;
  width: 40px;
  right: 0;
  top: 40px;
  bottom: 0;
  overflow-y: auto;
  z-index: 3000;

  &::-webkit-scrollbar {
    appearance: none;
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: skyblue;
    background-image: -webkit-linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.2) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0.2) 75%,
      transparent 75%,
      transparent
    );
  }
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #ededed;
    border-radius: 10px;
  }

  .y-child {
    height: 5px;
  }

  svg {
    font-size: 0px;
    display: block;
  }
}
</style>
