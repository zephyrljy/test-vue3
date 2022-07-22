<template>
  <GanttView :option="option" :data="data" />
</template>

<script lang="ts" setup>
import dayjs from "dayjs";
const data = ref([]);

const option: { columns: TableColumns[] } = {
  columns: [
    {
      title: "卫星名",
      field: "name",
      width: 100,
    },
  ],
};

const timeOne = dayjs().format("YYYY-MM-DD HH:mm:ss");
const timeTwo = dayjs(timeOne).add(12, "h").format("YYYY-MM-DD HH:mm:ss");
const timeThree = dayjs(timeOne).add(24, "h").format("YYYY-MM-DD HH:mm:ss");

const getRandomTimeByRang = (time1 = timeOne, time2 = timeTwo) => {
  return dayjs.unix(dayjs(time1).unix() + Math.random() * (dayjs(time2).unix() - dayjs(time1).unix())).format("YYYY-MM-DD HH:mm:ss");
};

for (let i = 0; i < 30; i++) {
  const startTime = getRandomTimeByRang(timeOne, timeTwo);
  const endTime = getRandomTimeByRang(timeTwo, timeThree);
  const obj = {
    name: "satellite",
    startTime,
    endTime,
    taskList: [],
  };
  for (let j = 0; j < 10; j++) {
    const taskStartTime = getRandomTimeByRang(startTime, endTime);
    const endTaskTime = dayjs(taskStartTime).add(Math.random() * 3 + 3, "m");
    const taskObj = {
      startTime: taskStartTime,
      endTime: endTaskTime,
    };
    obj.taskList.push(taskObj);
  }
  data.value.push(obj);
}
</script>

<style>
html,
body {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
