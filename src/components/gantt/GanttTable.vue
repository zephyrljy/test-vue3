<template>
  <div class="gantt-table">
    <vxe-table :border="false" @scroll.native="handleScrollEvent" ref="tableRef" :height="300" size="small" :data="data" show-overflow :row-config="{ height: 40 }">
      <template v-for="(column, index) in columns" :key="index">
        <vxe-column :field="column.field" :title="column.title" align="center" :width="column.width || undefined" :min-width="column.minWidth || undefined"></vxe-column>
      </template>
    </vxe-table>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    option: {
      columns: TableColumns[];
    };
    data: any[];
  }>(),
  {}
);

const tableRef = ref();
const emit = defineEmits(["scroll-y"]);
const handleScrollEvent = () => {
  const dom = tableRef.value.$el.querySelector(".vxe-table--body-wrapper");
  emit("scroll-y", dom.scrollTop);
};
const setScrollY = (y) => {
  const dom = tableRef.value.$el.querySelector(".vxe-table--body-wrapper");
  dom.scrollTop = y;
};
defineExpose({ setScrollY });

const columns = computed(() => {
  return props.option.columns;
});
</script>

<style scoped>
.gantt-table {
  width: 500px;
  flex: none;
}
</style>
