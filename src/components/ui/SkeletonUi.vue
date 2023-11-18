<template>
    <span
      :style="{ height, width: computedWidth }"
      class="SkeletonBox"
    />
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  let maxWidth = ref(100);
  let minWidth = ref(80);
  let height = ref('1em');
  let width = ref(null);
  
  let computedWidth = computed(() => {
    return width.value || `${Math.floor((0.9 * (maxWidth.value - minWidth.value)) + minWidth.value)}%`
  });
  </script>
  
  <style lang="scss">
  .SkeletonBox {
    display: inline-block;
    position: relative;
    vertical-align: middle;
    overflow: hidden;
    background-color: #DDDBDD;
    &::after {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      transform: translateX(-100%);
      background-image: linear-gradient(
        90deg,
        rgba(#fff, 0) 0,
        rgba(#fff, 0.2) 20%,
        rgba(#fff, 0.5) 60%,
        rgba(#fff, 0)
      );
      animation: shimmer 5s infinite;
      content: '';
    }
    @keyframes shimmer {
      100% {
        transform: translateX(100%);
      }
    }
  }
  </style>
  