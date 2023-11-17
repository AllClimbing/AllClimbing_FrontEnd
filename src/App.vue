<script setup>
    import AppLayout from "./components/common/AppLayout.vue";
    import LeftLandingPage from "./components/langding/LeftLandingPage.vue";
    import RightLandingPage from "./components/langding/RightLangdingPage.vue";
    import "./assets/css/app.css";
</script>

<template>
    <div id="app">
        <LeftLandingPage />
        <AppLayout />
        <RightLandingPage />
    </div>
</template>

<style scoped>
</style>
