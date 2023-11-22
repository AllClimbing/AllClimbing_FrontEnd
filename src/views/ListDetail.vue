<script setup>
    import { useRoute, useRouter } from 'vue-router';
    import { onBeforeMount, onMounted, ref, computed } from 'vue';
    import {useUserStore} from '@/stores/user.js';
    import axios from 'axios';

    const route = useRoute();
    const router = useRouter();
    const id = ref(route.params.id);
    const isLoading = ref(true);
    const gymData = ref({});
    const reviewData = ref([]);
    const title = ref("제목");
    const displayCount = ref(4);

    const loginUserId = useUserStore().loginUserId;
    const keyword = {
        userId : loginUserId,
        gymId : route.params.id
    };
    const favoriteData = ref(null);

    const displayedReview = computed(() => reviewData.value.slice(0, displayCount.value));
    const hasMoreItems = computed(() => displayCount.value < reviewData.value.length);

    onBeforeMount(async () => {

        try {
            // 서버에서 gymData 불러오기
            const gymResponse = await axios.get(`http://localhost:8080/api/gym/${id.value}`);
            gymData.value = gymResponse.data;
            title.value = gymData.value.gymName;

            // 서버에서 reviewData 불러오기
            const reviewResponse = await axios.get(`http://localhost:8080/api/review/${id.value}`);
            reviewData.value = reviewResponse.data;
            isLoading.value = false;

            //서버에서 찜 Data 불러오기
            const favoriteResponse = await axios.post(`http://localhost:8080/api/gym/favorite`, keyword);
            favoriteData.value = favoriteResponse.data;

            

        } catch (e) {
            console.error("데이터 로딩에 실패했습니다");
        }

    });



    const convertVisitDate = (date) => {
        return `${date.substring(2, 4)}.${date.substring(5, 7)}.${date.substring(8, 10)} 방문`;
    } 

    const convertRegDate = (date) => {
        return `${date.substring(2, 4)}.${date.substring(5, 7)}.${date.substring(8, 10)} ${date.substring(11, 13)}:${date.substring(14, 16)} 작성`;
    }

    const showMoreReviews = () => {
        if (hasMoreItems.value) {
            if(displayCount.value + 4 > reviewData.value.length){
                displayCount.value = reviewData.value.length;
            } else {
                displayCount.value += 4;
            }
        }
    }

    const RouteForAddReview = (id) => {
        router.push(`/review/${id}`);
    }  

    onMounted(() => {
    });


</script>

<template>
    <div class="content-container">
        <div v-if="isLoading">
            데이터를 불러오는 중입니다.
        </div>
        <div v-else>
            <div class="header">
                <div class="left_button"
                    @click="$router.go(-1)"
                ><img src="@/assets/backArrow.svg"></div>
                <p>{{ title }}</p>
                <div class="right_button"><img src="@/assets/addBtn.svg"></div>
            </div>
            <div class="thumbnail_img">
                <img src="@/assets/dummy.webp" alt="썸네일">
            </div>
            <div class="gym_info">
                <h2>암장 정보</h2>
                <div class="gym_info_content">
                    <p>운영 시간 : 09:00 ~ 24:00</p>
                    <p>넓이 : {{gymData.area ? gymData : 140}}  </p>
                    <p>주소 : {{gymData.gymAddress}}</p>
                    <p>
                        {{gymData.parking ? "주차 가능" : "주차 불가"}}, 
                        {{gymData.shower ? "샤워 가능" : "샤워 불가"}}
                    </p>
                </div>
            </div>

            <div class="gym_info_external">
                <h2>외부 링크</h2>
                <div class="external_icon_content">
                    <div class="external_icon">
                        <a class='external_link' v-bind:href="`https://place.map.kakao.com/${gymData.gymId}`">
                            <img src="@/assets/map.svg" alt="카카오맵">
                        </a>
                        <p>카카오맵</p>
                    </div>
                    <div class="external_icon">
                        <a class='external_link' v-bind:href="`https://place.map.kakao.com/${gymData.gymId}`">
                            <img src="@/assets/link.svg" alt="공식 홈페이지">
                        </a>
                        <p>공식 홈페이지</p>
                    </div>
                    <div class="external_icon">
                        <a class='external_link' v-bind:href="`tel:010-4580-7180`">
                            <img src="@/assets/call.svg" alt="전화하기">
                        </a>
                        <p>전화하기</p>
                    </div>
                </div>
            </div>
            <div class="pill_badge_container">
                <h2>방문 후기</h2>
                <div>
                    <div id="badge">
                        👶 초보자들이 입문하기좋아요
                    </div>
                    <div id="badge">
                        🙆‍♂️ 직원이 친절해요
                    </div>
                    <div id="badge">
                        📷 삼각대 보유중
                    </div>
                    <div id="badge">
                        ♥ 시설이 청결해요
                    </div>
                    <div id="badge">
                        🕋 시설이 넓어요
                    </div>
                </div>
            </div>
            <div class="review_container">
                <h2>고객 리뷰</h2>
                <div class="review_add_button"
                    @click="RouteForAddReview(gymData.gymId)"
                >
                    <img src="@/assets/reviewAddBtn.svg" alt="리뷰 작성하기">
                    <p>리뷰 작성하기</p>
                </div>
                <div 
                    v-for="review in displayedReview" 
                    :key="review.gymId" 
                    class="review_content"
                >
                    <div class="review_card">
                        <div class="header_section">
                            <img src="@/assets/profile.svg" alt="댓글 작성자">
                            <p class="review_writer">{{ review.userId }}</p>
                            <p class="visit_date"> {{ convertVisitDate(review.visitDate) }} </p>
                        </div>
                        <img class="review_image" :src="review.reviewImgURL+'/'+review.saveFileName" style="height : auto; width : 100px;">
                        <p class="review_content">{{ review.content }}</p>
                        <div class="reg_date">
                            <p>{{ convertRegDate(review.regDate) }}</p>
                        </div> 
                    </div>
                </div>
                <div class="show_more_button_container">
                    <div
                    v-if="hasMoreItems"
                    @click="showMoreReviews"
                    class="show_more_button"
                >
                    <img src="@/assets/underArrow.svg" alt="더보기 버튼">
                    <p>리뷰 더보기</p>
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
    width:100%;
    margin: 0 auto;
    height: 94vh;
    overflow: scroll;

    color:white;
    background-color:#292929;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    height: 5.8rem;
    font-size: 1.6rem;
    font-weight: bold;
}

.left_button{
    width: 2.4rem;
    height: 2.4rem;
    margin-left: 1.6rem;

    margin-top: 0.2rem;
    cursor: pointer;
}
.right_button{
    width: 2.4rem;
    height: 2.4rem;
    margin-right: 1.6rem;

    margin-top: 0.5rem;
}

.gym_info {
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
    margin-left: 1.6rem;
    margin-bottom: 1.6rem;
}

.gym_info_external {
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
    margin-left: 1.6rem;
}

.gym_info_content {
    width: 34.8rem;
    background-color: #1C1C1C;

    border-radius: 0.5rem;
    padding-left: 1rem;
    font-size: 1.4rem;
    line-height: 0.5rem;

    color : #cccccc;
}

.external_link{
    color: #36DDAB;
    text-decoration: none;
}

.pill_badge_container{
    width: 100%;
    height: 100%;
    margin-top: 1.6rem;
    margin-left: 1.6rem;
    margin-bottom: 1.6rem;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
    margin-left: 1.6rem;
}

#badge {
    background-color: #36DDAB;
    padding: 1rem;
    border-radius: 0.5rem;
    white-space: nowrap;

    width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: start;
    margin-left: 0.5rem;
    margin-bottom: 0.8rem;

    display: inline-block;
    width: auto;
    white-space: nowrap;
}

.review_container{
    width: 32rem;
    height: 100%;
    margin-left: 1.6rem;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
}

.review_add_button{
    width: 33.6rem;
    height: 3.2rem;
    background-color: #4A4A4A;
    border-radius: 1rem;

    padding: 0.5rem 1rem;
    margin-bottom: 1.6rem;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    font-size: 1.3rem;
    font-weight: bold;
    color: #cccccc;

    cursor: pointer;
}

.review_add_button > img{
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 0.5rem;
}

.review_content{
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
}

.review_card{
    width: 100%;
    height: 100%;

    background-color: #1C1C1C;
    border-radius: 0.5rem;
    padding: 0.75rem 2rem;

    margin-bottom: 1.6rem;
}

.header_section{
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: start;

    font-size: 1.3rem;
}
.header_section img {
    width: 2.4rem;
    height: 2.4rem;

    margin: 0.5rem;
    margin-top: 0.7rem;
}

.review_writer{
    margin: 1rem;
    flex-grow: 2;
}

.review_content{
    font-size: 1.3rem;
}

.reg_date{
    margin-top: 1rem;
    font-size: 1.3rem;
    text-align: right;
    color: #cccccc;
}

.visit_date{
    margin-top: 1rem;
    font-size: 1.3rem;
    text-align: right;
    color: #cccccc;
}

.show_more_button_container{
    width: 100%;
    height: 100%;

    margin-left: 2rem;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.show_more_button{
    width: 10rem;
    height: 3.2rem;
    background-color: #4A4A4A;
    border-radius: 1rem;

    padding: 0.5rem 1rem;
    margin-bottom: 1.6rem;

    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    font-size: 1.3rem;
    font-weight: bold;
    color: #cccccc;

    cursor: pointer;
}

.external_icon_content{
    width: 35.8rem;
    height: 100%;
    border-radius: 0.5rem;

    padding: 1.2rem 0 0 0;

    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    background-color: #1C1C1C;
}

.external_icon{
    cursor: pointer;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    font-size: 1.4rem;
    color:#cccccc;

}

.external_icon img{
    width: 6rem;
    height: 6rem;
}



</style>
