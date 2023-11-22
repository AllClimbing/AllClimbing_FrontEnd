<script setup>
import GNB from "./GNB.vue";
import { RouterView } from "vue-router";
</script>

<template>
    <div class="layout-container">
        <RouterView />
        <GNB />
    </div>
</template>

<style scoped>
    .layout-container{
        width:39rem;
        min-height: 100vh;
        color:white;
        background-color:#292929;

        position: relative;
    }


    body{
    -ms-overflow-style: none;
    }
    
   ::-webkit-scrollbar {
     display: none;
   }
</style>
