<script setup>

</script>

<template>
        <div class="loadingMsg">
            <img src="@/assets/loading.svg" alt="로딩중...">
            <p>데이터를 열심히 불러오고 있어요...</p>
        </div>
</template>

<style scoped>

    .loadingMsg,
    .msg {
    font-size: 2.4rem;
    text-align: center;
    margin-bottom: 3.4rem;
    height: 82vh;
    min-height: 60vh;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    }

    .loadingMsg img {
    width: 10rem;
    height: 10rem;
    margin-bottom: 1.6rem;
    }


</style>