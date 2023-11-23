<script setup>
import "../assets/css/pages/detail.css";

import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import { onBeforeMount, ref, computed } from 'vue';
import { useUserStore } from '@/stores/user.js';

import { convertRegDate, convertVisitDate } from "@/utils/format.js";
import { routeForAddReview, routeForUpdateReview} from "@/utils/route.js";
import { URL } from "@/utils/api.js";

import LoadingImage from "../components/common/LoadingImage.vue";


const route = useRoute();
const router = useRouter();
const id = ref(route.params.id);

const isLoading = ref(true);
const gymData = ref({});
const reviewData = ref([]);
const title = ref("제목");
const displayCount = ref(4);
const userData = ref(null);
const isFavorite = ref(false);

const displayedReview = computed(() => reviewData.value.slice(0, displayCount.value));
const hasMoreItems = computed(() => displayCount.value < reviewData.value.length);

const loginUserId = useUserStore().loginUserId;
const keyword = {
    userId: loginUserId,
    gymId: route.params.id
};

const doFavorite = async () => {
    try {
         await axios.post(`h${URL.GYM_API}favorite/${id.value}`, keyword);
         isFavorite.value = true;
    } catch(e){
        console.log('좋아요 에러');
    }
}

const cancelFavorite = async () => {
    try {
        await axios.post(`${URL.GYM_API}favorite/delete`, keyword);
        isFavorite.value = false;
    } catch(e){
        console.log("찜하기 해제 에러");
    }
}

const fetchGymData = async () => {
    try {
        const gymResponse = await axios.get(`${URL.GYM_API}${id.value}`);
        gymData.value = gymResponse.data;
        title.value = gymData.value.gymName;
    } catch (e) {
        console.error("암장 데이터 로딩에 실패했습니다");
    }
}

const fetchReviewData = async () => {
    try {
        const reviewResponse = await axios.get(`${URL.REVIEW_API}${id.value}`);
        reviewData.value = reviewResponse.data.sort((a, b)=> new Date(b.regDate) - new Date(a.regDate));
        isLoading.value = false;
    } catch (e) {
        console.error("리뷰 데이터 로딩에 실패했습니다");
    }
}

const fetchFavoriteData = async () => {
    try {
        const favoriteResponse = await axios.post(`${URL.GYM_API}favorite`, keyword);
        isFavorite.value = favoriteResponse.data ? true : false;
    } catch (e) {
        console.error("찜하기 목록 데이터 로딩에 실패했습니다");
    }
}

const fetchUserData = async () => {
    const token = localStorage.getItem('access-token').split('.')
    const userId = JSON.parse(atob(token[1]))['userId'];
    try {
        const userResponse = await axios.get(`http://localhost:8080/api/user/${userId}`);
        userData.value = userResponse.data;
    } catch (e) {
        console.error("유저 정보 데이터 로딩에 실패했습니다");
    }
}

const deleteReview = async (reviewNo) => {
    try{
        await axios.delete(`${URL.REVIEW_API}delete/${reviewNo}`);
        reviewData.value = reviewData.value.filter((review) => review.reviewNo !== reviewNo);
    } catch(e){
        console.log("리뷰 삭제 에러");
    }
}

const showMoreReviews = () => {
    if (hasMoreItems.value) {
        if (displayCount.value + 4 > reviewData.value.length) {
            displayCount.value = reviewData.value.length;
        } else {
            displayCount.value += 4;
        }
    }
}

onBeforeMount(async () => {
    await fetchGymData();
    await fetchReviewData();
    await fetchFavoriteData();
    await fetchUserData();
});

</script>

<template>
    <div class="content-container">
        <LoadingImage v-if="isLoading" />
        <div v-else>
            <div class="header">
                <div class="left_button" @click="$router.go(-1)"><img src="@/assets/backArrow.svg"></div>
                <p>{{ title }}</p>
                <div class="right_button">
                    <img v-if="isFavorite" src="@/assets/fulledHeart.svg" @click="cancelFavorite">
                    <img v-else src="@/assets/emptyHeart.svg" @click="doFavorite">
                </div>
            </div>
            <div class="thumbnail_img">
                <img src="@/assets/dummy.webp" alt="썸네일">
            </div>
            <div class="gym_info">
                <h2>암장 정보</h2>
                <div class="gym_info_content">
                    <p>운영 시간 : 09:00 ~ 24:00</p>
                    <p>넓이 : {{ gymData.area ? gymData : 140 }} </p>
                    <p>주소 : {{ gymData.gymAddress }}</p>
                    <p>
                        {{ gymData.parking ? "주차 가능" : "주차 불가" }},
                        {{ gymData.shower ? "샤워 가능" : "샤워 불가" }}
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
                <div class="review_add_button" @click="routeForAddReview(router, gymData.gymId)">
                    <img src="@/assets/reviewAddBtn.svg" alt="리뷰 작성하기">
                    <p>리뷰 작성하기</p>
                </div>
                <div v-for="review in displayedReview" :key="review.gymId" class="review_content">
                    <div class="review_card">
                        <div class="header_section">
                            <img src="@/assets/profile.svg" alt="댓글 작성자">
                            <p class="review_writer">{{ review.userId }}</p>
                            <p class="visit_date"> {{ convertVisitDate(review.visitDate) }} </p>
                        </div>
                        <p class="review_content">{{ review.content }}</p>
                        <div class="reg_date">
                            <p>{{ convertRegDate(review.regDate) }}</p>
                        </div>
                        <div class="review_edit" v-if="review.userId === userData.userId">
                            <div>
                                <img 
                                    src="@/assets/review_edit.svg" 
                                    alt="수정하기"
                                    @click="routeForUpdateReview(route, gymData.gymId, review.reviewNo)"
                                >
                                <img 
                                    src="@/assets/review_delete.svg" 
                                    alt="삭제하기"
                                    @click.prevent="deleteReview(review.reviewNo)"
                                >
                            </div>
                        </div>
                    </div>
                </div>
                <div class="show_more_button_container">
                    <div v-if="hasMoreItems" @click="showMoreReviews" class="show_more_button">
                        <img src="@/assets/underArrow.svg" alt="더보기 버튼">
                        <p>리뷰 더보기</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>
