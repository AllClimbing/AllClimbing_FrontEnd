<script setup>
import { onBeforeMount,onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import '@/assets/css/PlaceList.css';

const router = useRouter();
const listCnt = ref(0);
const location = ref('');
const gymList = ref([]);
let isLoading = ref(true);

const initMap = function () {
};

//마운트됐을때
onMounted(() => {
  nearPlaces();
});


//TODO : utils.js로 빼기
const getDistanceFormat = (dist)=> {
    if(dist < 1000) return `${dist} M`
    return `${Math.round(dist/100)/10} KM`
}

const routeToDetail = (id) => {
  router.push(`/detail/${id}`);
};


//마운트전에 해버리고
onBeforeMount(() => {
  if (window.kakao && window.kakao.maps) {
    initMap();
  } else {
    const script = document.createElement('script'); // autoload=false 스크립트를 동적으로 로드하기 위해서 사용
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=af068cfaaa9dcb4e3c1f083f3b9982f0&libraries=services`;
    script.addEventListener('load', () => {
      kakao.maps.load(initMap);
    }); 
    document.head.appendChild(script);
  }
});

function nearPlaces() {
  navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      // 장소 검색 객체를 생성합니다
      const ps = new kakao.maps.services.Places();

      //현재 위치가 너무 이상하게 잡혀서 임의로 집어넣음
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

  console.log("일단여기까지?");

  navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
  // 장소 검색 객체를 생성합니다
  const ps = new kakao.maps.services.Places();
  console.log(location.value);
  console.log(navigator.geolocation.getCurrentPosition);

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

  // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
  ps.keywordSearch(keyword+" 클라이밍", placesSearchCB, options);
});
}

// 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
const placesSearchCB = (data, status) => {
    switch (status){
        case kakao.maps.services.Status.OK:
            console.log(data);
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
          <div class="loadingMsg" v-if="isLoading">
            <img src="@/assets/loading.svg" alt="로딩중...">
            <p>데이터를 열심히 불러오고 있어요...</p>
          </div>
          <div v-else>
            <div class='msg'> 내 근처에서 갈만한 <span>{{listCnt}}</span> 개의 암장을 찾았어요.</div>
            <div class="gym_list">
                <div  
                    class="gym_content_container"
                    v-for="gym in gymList"
                    :key="gym.place_name"
                    @click="routeToDetail(gym.id)"
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
