<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import '@/assets/css/PlaceList.css';
import axios from 'axios';

const router = useRouter();
const gymList = ref([]);
const wishList = ref([]);
let isLoading = ref(true);

const routeToDetail = (id) => {
  router.push(`/detail/${id}`);
};


//마운트전에 해버리고
onBeforeMount(async() => {
    try {
            const token = localStorage.getItem('access-token').split('.')
            const id = JSON.parse(atob(token[1]))['userId'];

            const gymResponse = await axios.get(`http://localhost:8080/api/gym/list/${id}`);
            gymList.value = gymResponse.data;
            console.log(gymList.value);

            const res = await axios.get(`http://localhost:8080/api/gym/list/${id}`);
            wishList.value = res.data;
            isLoading.value = false;

    } catch (e) {
        console.error("데이터 로딩에 실패했습니다");
    }
});


</script>

<template>
      <div class="content-container">
          <div v-if="isLoading" class="loadingMsg" >
            <img src="@/assets/loading.svg" alt="로딩중...">
            <p>데이터를 열심히 불러오고 있어요...</p>
          </div>
          <div v-else>
            <div class="header">
                <p>찜 목록</p>
            </div>
            <div class="gym_list">
                <div  
                    class="gym_content_container"
                    v-for="gym in gymList"
                    :key="gym.gymName"
                    @click="routeToDetail(gym.gymId)"
                >
                    <img src="@/assets/map.svg" alt='지도' class="gym-info__logo"/>
                    <div class="gym-info__content">
                        <div class="gym-info__content__name">{{gym.gymName}}</div>
                        <div class="gym-info__content__address">{{gym.gymAddress}}</div>
                        <div class="gym-info__content__phone">{{gym.contact ? gym.contact : "전화번호를 제공하지 않는 암장입니다."}}</div>
                      </div>
                      <div 
                        class="gym-info__content__distance"
                        @click.stop=""
                        >
                        <a v-bind:href="`tel:010-4580-7180`">
                            <img class="phone_img" src="@/assets/phone.svg" alt="phone">
                        </a>
                      </div>
                </div>
            </div>
          </div>
      </div>
  </template>

<style scoped>
.header {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 4rem;
    font-size: 1.6rem;
    font-weight: bold;

    margin-bottom: 1rem;
}

.phone_img{
    width: 4rem;
    height: 4rem;
}

</style>
