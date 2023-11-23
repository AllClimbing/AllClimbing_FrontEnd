<script setup>
    import { useRouter } from "vue-router";
    const src = ['list','wishlist','competition','mypage'];

    const router = useRouter();

    const navigateThisRoute = (route) => {
        router.push(`/${route}`);
    };
</script>

<template>
    <div class="gnb_container">
        <img 
            v-for="item in src" 
            :key="item" 
            :src="`/src/assets/${item}.svg`" 
            :alt="item"
            @click="navigateThisRoute(item)"
        >
    </div>
</template>
<style scoped>
    .gnb_container{
        max-width:39rem;
        width:39rem;
        height: 6.2rem;
        color:white;
        background-color:#121212;

        position: absolute;
        bottom: 0;

        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    img {
        width: 2.6rem;
        height: 2.6rem;
        cursor: pointer;
    }
</style>
