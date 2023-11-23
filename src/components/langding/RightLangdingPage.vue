<script setup>
    import "@/assets/css/landing.css";
</script>

<template>
    <div class="container">
        <div class="Box">
            <div class="slideshow">
                <div class="slideshow-images">
                    <img src="@/assets/LandingPage/landingMainView.png" alt="메인화면">
                    <img src="@/assets/LandingPage/landingSearch.png" alt="검색">
                    <img src="@/assets/LandingPage/landingReview.png" alt="리뷰작성">
                    <img src="@/assets/LandingPage/landingWish.png" alt="위시리스트">
                </div>
            </div>
            <div class="slideshow-y">
                <div class="slideshow-comment">
                    <div>로그인이 완료되면 <br/>근처 암장리스트를 자동으로 검색해요.</div>
                    <div>검색 기능을 이용해 <br/>암장을 편리하게 검색할 수 있어요.</div>
                    <div>상세페이지에서 <br/>암장 정보를 조회하고 리뷰를 작성할 수 있어요.</div>
                    <div>내가 자주가는 암장은 <br/>찜목록에 저장하고 확인이 가능해요.</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .Box{
        text-align: center;
        font-size: 3rem;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    @keyframes slide-x {
        0%, 20%, 25%, 45%, 50%, 70%, 75%, 95%, 100% {
            transform: translateX(0);
        }
        20%, 25% {
            transform: translateX(-25%);
        }
        45%, 50% {
            transform: translateX(-50%);
        }
        70%, 75% {
            transform: translateX(-75%);
        }
        95%, 100% {
            transform: translateX(-100%);
        }
    }

    @keyframes slide-y {
        0%, 20%, 25%, 45%, 50%, 70%, 75%, 95%, 100% {
            transform: translateY(0);
        }
        20%, 25% {
            transform: translateY(-25%);
        }
        45%, 50% {
            transform: translateY(-50%);
        }
        70%, 75% {
            transform: translateY(-75%);
        }
        95%, 100% {
            transform: translateY(-100%);
        }
    }
    
    .slideshow {
        position: relative;
        width: 30rem;
        height: 25rem;
        overflow: hidden;
    }
    
    .slideshow-images {
        width:120rem;
        height: 25rem;
        display: flex;
        animation: slide-x 20s infinite;
    }
    
    .slideshow img {
        width: 25%;
        height: auto;
    }
    .slideshow-y {
        position: relative;
        width: 30rem;
        height: 7.5rem;
        overflow: hidden;
    }
    .slideshow-comment {
        display: flex;
        flex-direction: column;
        animation: slide-y 20s infinite;
    }
    .slideshow-comment div {
        width: 100%;
        height: 7.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.3rem;
    }
</style>
