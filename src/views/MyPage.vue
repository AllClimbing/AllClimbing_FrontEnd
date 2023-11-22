<script setup>
    import { useRouter } from 'vue-router';
    import axios from 'axios';
    import { ref, onBeforeMount } from 'vue';

    const router = useRouter();
    const userData = ref(null);

    const deleteLoginToken = () => {
        localStorage.removeItem('access-token');
        alert('로그아웃 되었습니다.');
        router.push('/login');
    }

    onBeforeMount(async () => {
        try {
            const token = localStorage.getItem('access-token').split('.')
            const id = JSON.parse(atob(token[1]))['userId'];

            const res = await axios.get(`http://localhost:8080/api/user/${id}`);
            userData.value = res.data;
        } catch (e) {
            console.error("데이터 로딩에 실패했습니다");
        }
    });
</script>

<template>
    <div class="content-container">
        <div class="my_page_info">
            <div class="comment">
                <p> 안녕하세요 <span>{{ userData.nickname }}</span> 님, </p>
                <p> 올클라이밍에 오신것을 환영해요! </p>
            </div>
            <div class="my_page_content">
                <div class="profile_header">
                    <div class="my_page_img_box">
                        <img class="profile_img" src="@/assets/profile.svg" alt="프로필 이미지">
                        <div class="my_page_content_item_content">{{userData.nickname}}</div>
                    </div>
                    <div class="my_page_email_box">
                        <div class="my_page_content_item">
                            <div class="my_page_content_item_content">{{userData.userId}}</div>
                        </div>
                        <div class="my_page_content_item">
                            <div class="my_page_content_item_content">{{userData.email}}</div>
                        </div>
                    </div>
                </div>
                <p style="text-align:center"> 
                    회원 정보 수정 및 탈퇴기능은 아직 준비중이에요. 
                    <br />
                    관련하여 문의할 사항이 있으시면 아래의 문의하기 링크를 이용해주세요.
                </p>
            </div>
        </div>
        <div class="app_info">
            <h2>앱 정보</h2>
            <div class="app_info_content">
                <div class="menu_item">이용약관</div>
                <div class="menu_item">개인정보 처리방침</div>
                <div class="menu_item">오픈소스 라이선스</div>
                <div class="menu_item">Beta Version 0.8</div>
                <div class="menu_item">문의하기</div>
                <div 
                    class="menu_item logout"
                    @click="deleteLoginToken"
                >
                    로그아웃
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .content-container{
        width: 39rem;
        max-width:39rem;
        min-height: 69.5rem;
        height: 94vh;

        color:white;
        background-color:#292929;

        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
    }
    .my_page_info{
        width: 35.8em;

        color: #ffffff; 
    }
    .my_page_content{
        width: 31.8rem;
        height: 9rem;
        border-radius: 0.5rem;
        background-color: #1C1C1C;

        padding: 2rem;

        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }
    .app_info{
        width: 100%;
        height: 40rem;
        border-radius: 0.5rem;

        margin-left: 3.2rem;
        padding: 2rem;

        display: flex;
        flex-direction: column;
    }


    .app_info_content{
        width: 31.8rem;
        height: 22rem;
        border-radius: 0.5rem;
        background-color: #1C1C1C;

        padding: 2rem;

        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }
    .profile_header{
        width: 100%;

        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }
    .profile_img{
        width: 4rem;
        height: 4rem;
    }
    .my_page_img_box{
        width: 4rem;
        height: 6rem;

        margin-right: 1.6rem;

        font-size: 1.3rem;
        
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }
    .comment{
        font-size: 1.5rem;
        line-height: 0.5rem;

        margin-top: 2rem;
        margin-bottom: 2rem;
    }
    .comment span{
        color:#36DDAB;
    }
    .my_page_email_box {
        width: 100%;

        font-size:1.6rem;
        line-height: 2.4rem;

        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: flex-start;
    }
    .menu_item{
        width: 95%;
        height: 5rem;
        border-bottom: 0.15rem solid #cccccc;
        color : #cccccc;

        font-size: 1.5rem;
        line-height: 2.4rem;
        padding-left: 0.5rem;

        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;

        cursor: pointer;
    }
    .logout{
        border : none;
    }
</style>
