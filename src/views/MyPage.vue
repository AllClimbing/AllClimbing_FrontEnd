<script setup>
    import { useRouter } from 'vue-router';

    const router = useRouter();


    const deleteLoginToken = () => {
        localStorage.removeItem('access-token');
        alert('로그아웃 되었습니다.');
        router.push('/login');
    }
</script>

<template>
    <div class="content-container">
        마이페이지 입니다.

        <button @click="deleteLoginToken">로그아웃</button>
    </div>
</template>

<style scoped>
.content-container{
    max-width:39rem;
    min-height: 69.5rem;
    height: 94vh;

    color:white;
    background-color:#292929;
}
</style>
