<template>
  <div class="gantt-table">
    <vxe-table :data="data">
      <template v-for="(column, index) in columns" :key="index">
        <vxe-column :field="column.field" :title="column.title"></vxe-column>
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

const columns = computed(() => {
  return props.option.columns;
});
</script>

<style scoped></style>
