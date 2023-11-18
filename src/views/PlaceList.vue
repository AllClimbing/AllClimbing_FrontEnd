<script setup>
import { onBeforeMount,onMounted, ref } from 'vue';

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

const getDistanceFormat = (dist)=> {
    if(dist < 1000) return `${dist} M`
    return `${Math.round(dist/100)/10} KM`
}

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

function searchPlaces() {
  // 장소 검색 객체를 생성합니다
  const ps = new kakao.maps.services.Places();
  const keyword = document.getElementById('keyword').value;

  if (!keyword.replace(/^\s+|\s+$/g, '')) {
    alert('키워드를 입력해주세요!');
    return false;
  }

  // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
  ps.keywordSearch(keyword, placesSearchCB);
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
          <form>
              <input v-model="location" type="search" name="location" placeholder="내 주변 암장 검색">
          </form>
          <div class="loadingMsg" v-if="isLoading">
            <img src="@/assets/loading.svg" alt="로딩중...">
            <p>데이터를 열심히 불러오고 있어요...</p>
          </div>
          <div v-else>
            <div class='msg'> {{`내 근처에서 갈만한 ${listCnt} 개의 암장을 찾았어요.`}}</div>
            <div class="gym_list">
                <div  
                    class="gym_content_container"
                    v-for="gym in gymList"
                    :key="gym.place_name"
                >
                    <div class="gym-info__logo"></div>
                    <div class="gym-info__content">
                        <div class="gym-info__content__name">{{gym.place_name}}</div>
                        <div class="gym-info__content__address">{{gym.address_name}}</div>
                        <div class="gym-info__content__phone">{{gym.phone}}</div>
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
    .content-container{
        max-width:39rem;
        min-height: 69.5rem;
        height: 94vh;

        padding: 1.2rem 1.6rem;

        color:white;
        background-color:#292929;
    }

    form {
        width: 35.6rem;
        height: 5.8rem;
        text-align: center;

        font-size: 2rem;
        font-weight: bold;
        
        margin-bottom: 1.9rem;
    }
    input[type="search"] {
        width: 100%;
        height: 100%;
        background-color: #4A4A4A;
        border: 1px solid #4A4A4A;
        border-radius: 1rem;/* 굴곡 주면 padding 값도 그에 상응하게 적용하는 것이 좋음 */
        padding: 30px;/* 내용물 작성했을 때 여백감 */
        color:#CCCCCC;
    }

    input:focus {
        width:100%;
        background-color: #4A4A4A;
        border: 1px solid #4A4A4A;
    }
    .msg{
        font-size: 1.4rem;
        text-align: center;
        margin-bottom: 3.4rem;
    }

    .loadingMsg{
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

    .loadingMsg img{
      width: 10rem;
      height: 10rem;
      margin-bottom: 1.6rem;
    }

    .gym-list{
        width: 35.8rem;
        height: 100%;

    }

    .gym_content_container{
        width: 32.6rem;
        height: 4.6rem;

        background-color: #1C1C1C;
        border-radius: 1rem;
        margin-bottom: 1.6rem;
        padding: 1.6rem;

        display: flex;
        justify-content: space-between;
        align-items: center;

        cursor:pointer;
    }

    .gym-info__content__name{
        font-size: 1.4rem;
        font-weight: bold;
        margin-bottom: 0.4rem;
    }

    .gym-info__content__address{
        font-size: 1.2rem;
        margin-bottom: 0.4rem;
    }

    .gym-info__content__phone{
        font-size: 1.2rem;
        margin-bottom: 0.4rem;
    }

    .gym-info__logo {
        width: 4.8rem;
        height: 4.8rem;
        border-radius: 50%;
        background-color: #36DDAB;
        margin-right: 1.6rem;
    }

    .gym-info__content {
      width: 70%;
      height: 120%;

      font-size: 1.3rem;

      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;

    }
    .gym-info__content__distance {
        width: 20%;
        height: 100%;

        display: flex;
        justify-content: flex-end;
        align-items: center;

        color: #999999;
    }

    .distance_section{
      width: 100%;
      height: 140%;

      display: flex;
      justify-content: center;
      align-items:end;
    }

    .distance_section img{
      width: 2rem;
      height: 2rem;
      margin-right: 0.4rem;
      margin-bottom: 0.3rem;
    }
</style>
