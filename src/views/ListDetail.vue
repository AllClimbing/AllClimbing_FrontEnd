<script setup>
    import { useRoute } from 'vue-router';
    import { onBeforeMount, onMounted, ref } from 'vue';
    import axios from 'axios';

    const route = useRoute();
    const id = ref(route.params.id);
    const isLoading = ref(true);
    const gymData = ref({});
    const reviewData = ref([]);

    onBeforeMount(async () => {
        try {
            // 서버에서 gymData 불러오기
            const gymResponse = await axios.get(`http://localhost:8080/api/gym/${id.value}`);
            gymData.value = gymResponse.data;
            console.log(gymData.value);

            // 서버에서 reviewData 불러오기
            const reviewResponse = await axios.get(`http://localhost:8080/api/review/${id.value}`);
            reviewData.value = reviewResponse.data;

            isLoading.value = false;
            console.log(reviewData.value);
        } catch (error) {
            console.error(error);
        }
    });

    onMounted(() => {

    });
</script>

<template>
    <div class="content-container">
        <div v-if="isLoading">
            데이터를 불러오는 중입니다.
        </div>
        <div v-else>
            데이터를 불러왔습니다.
        </div>
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