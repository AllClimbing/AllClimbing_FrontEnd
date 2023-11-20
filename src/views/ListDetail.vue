<script setup>
    import { useRoute } from 'vue-router';
    import { onBeforeMount, onMounted, ref } from 'vue';
    import axios from 'axios';

    const route = useRoute();
    const id = ref(route.params.id);
    const isLoading = ref(true);
    const gymData = ref({});
    const reviewData = ref([]);
    const title = ref("제목");
    const hasComment = ref(true);

    onBeforeMount(async () => {
        try {
            // 서버에서 gymData 불러오기
            const gymResponse = await axios.get(`http://localhost:8080/api/gym/${id.value}`);
            gymData.value = gymResponse.data;
            title.value = gymData.value.gymName;
            console.log(gymData.value.contact);

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
            <div class="header">
                <div class="left_button"><img src="@/assets/backArrow.svg"></div>
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
                    <br/>
                    <p>연락처 : {{gymData.contact || '010-4580-7180'}}</p>
                    <p>카카오맵 바로가기 : 
                        <a class='external_link' v-bind:href="`https://place.map.kakao.com/${gymData.gymId}`">바로가기</a>
                    </p>
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
                <div class="review_content">
                    <div class="review_card">
                        <div class="header_section">
                            <img src="@/assets/profile.svg" alt="댓글 작성자">
                            <p class="review_writer">닉네임</p>
                            <p>방문일자 : 23.11.16</p>
                        </div>
                        <p class="review_content">다른 지점에 비해 넓고 좋네요.
                            직원분들 친절하셔서 모르는 문제 잘 알려주시고 휴식공간도 쾌적해서 시간보내기 좋습니다. 김남준 사랑해...</p>
                        <div v-if="hasComment" class="btn_section">
                            <div class="btn_comment">댓글 1 개 더보기</div>
                        </div>
                    </div>
                    <div class="review_card">
                        <div class="header_section">
                            <img src="@/assets/profile.svg" alt="댓글 작성자">
                            <p class="review_writer">닉네임</p>
                            <p>방문일자 : 23.11.16</p>
                        </div>
                        <p class="review_content">다른 지점에 비해 넓고 좋네요.
                            직원분들 친절하셔서 모르는 문제 잘 알려주시고 휴식공간도 쾌적해서 시간보내기 좋습니다. 김남준 사랑해...</p>
                    </div>
                    <div class="review_card">
                        <div class="header_section">
                            <img src="@/assets/profile.svg" alt="댓글 작성자">
                            <p class="review_writer">닉네임</p>
                            <p>방문일자 : 23.11.16</p>
                        </div>
                        <p class="review_content">다른 지점에 비해 넓고 좋네요.
                            직원분들 친절하셔서 모르는 문제 잘 알려주시고 휴식공간도 쾌적해서 시간보내기 좋습니다. 김남준 사랑해...</p>
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
    margin-top: 1.6rem;
    margin-left: 1.6rem;
    margin-bottom: 1.6rem;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
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
    padding: 2rem;

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
}

.review_writer{
    margin: 1rem;
    flex-grow: 2;
}

.review_content{
    font-size: 1.3rem;
}

.btn_section{
    margin-top: 1.8rem;
    font-size: 1.6rem;
    text-align: center;
}

</style>
