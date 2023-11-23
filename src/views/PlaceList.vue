<script setup>
import '@/assets/css/PlaceList.css';

import { onMounted, ref } from 'vue';
import { getDistanceFormat } from '@/utils/format.js';
import { routeToDetail } from '@/utils/route.js';
import  { useRouter } from 'vue-router';

import LoadingImage from '../components/common/LoadingImage.vue';

const listCnt = ref(0);
const location = ref('');
const gymList = ref([]);
const router = useRouter();
const isLoading = ref(true);

//마운트됐을때
onMounted(() => {
  nearPlaces();
});


const nearPlaces = () => {
  navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      const ps = new kakao.maps.services.Places();

      const currentCoordinate = new kakao.maps.LatLng(latitude, longitude);
    
      const options = {
        location: currentCoordinate,
        radius: 3000,
        size:6,
        sort: kakao.maps.services.SortBy.DISTANCE,
      };
      // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
      ps.keywordSearch("클라이밍", placesSearchCB, options);
  });
}

const searchPlaces = function () {
  navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      // eslint-disable-next-line no-undef
      const ps = new kakao.maps.services.Places();

      const keyword = location.value;

      if (!keyword.replace(/^\s+|\s+$/g, '')) {
        alert('키워드를 입력해주세요!');
        return false;
      }

      const currentCoordinate = new kakao.maps.LatLng(latitude, longitude);
      const options = {
            location: currentCoordinate,
            size:8,
      };

      ps.keywordSearch(keyword+" 클라이밍", placesSearchCB, options);
});
}

// 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
const placesSearchCB = (data, status) => {
    switch (status){
        case kakao.maps.services.Status.OK:
            isLoading.value = false;
            gymList.value = data;
            listCnt.value = data.length;
            return;
        case kakao.maps.services.Status.ZERO_RESULT:
            alert('검색 결과가 존재하지 않습니다.');
            return;
        case kakao.maps.services.Status.ERROR:
            alert('검색 결과 중 오류가 발생했습니다.');
            return;
    }
}

</script>

<template>
      <div class="content-container">
          <form @submit.prevent="searchPlaces">
              <input v-model="location" type="search" name="location" placeholder="내 주변 암장 검색" >
          </form>
          <LoadingImage v-if="isLoading" />
          <div v-else>
            <div class='msg'> 내 근처에서 갈만한 <span>{{listCnt}}</span> 개의 암장을 찾았어요.</div>
            <div class="gym_list">
                <div  
                    class="gym_content_container"
                    v-for="gym in gymList"
                    :key="gym.place_name"
                    @click="routeToDetail(router, gym.id)"
                >
                    <img src="@/assets/map.svg" alt='지도' class="gym-info__logo" />
                    <div class="gym-info__content">
                        <div class="gym-info__content__name">{{gym.place_name}}</div>
                        <div class="gym-info__content__address">{{gym.address_name}}</div>
                        <div class="gym-info__content__phone">{{gym.phone ? gym.phone : "전화번호를 제공하지 않는 업장입니다."}}</div>
                      </div>
                      <div class="gym-info__content__distance">
                        <div class="distance_section">
                          <img src="@/assets/distanceImg.svg" alt="거리">
                          <p>{{getDistanceFormat(gym.distance)}}</p>
                        </div>
                      </div>
                </div>
            </div>
          </div>
      </div>
  </template>

<style scoped>
</style>
