<template>
  <svg
    :class="svgClass"
    aria-hidden="true"
    :style="{
      color: props.color,
      width: props.width,
      height: props.height,
    }"
    v-on="$attrs"
  >
    <use :xlink:href="iconName" />
  </svg>
</template>

<script lang="ts">
export default {
  name: "SvgIcon",
};
</script>

<script lang="ts" setup>
/**
 * 名称：SvgIcon
 * @param name String required
 * @param color String
 * @param width String
 * @param height String
 * 依赖：svgBuilder 插件 需要在 vite或webpack中配置
 * 使用方式：
 * 在 template 中使用 <svg-icon name="bug"/>
 */
import { computed } from "vue";
interface SvgIconProps {
  name: string;
  color?: string;
  width?: string;
  height?: string;
}

const props = withDefaults(defineProps<SvgIconProps>(), {
  color: "#333",
  width: "14px",
  height: "14px",
});

const iconName = computed((): string => `#icon-${props.name}`);
const svgClass = computed((): string => {
  if (props.name) {
    return `svg-icon icon-${props.name}`;
  } else {
    return "svg-icon";
  }
});
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  overflow: hidden;
}
</style>
