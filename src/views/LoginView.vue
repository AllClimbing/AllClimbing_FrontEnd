<template>
    <div class="content_container">
        <form class="login_Form" @submit.prevent="login">
            <input class="login_input" type="text" v-model="userId" placeholder="아이디를 입력해주세요.">
            <input class="login_input" type="password" v-model="password" placeholder="비밀번호를 입력해주세요.">
            <button>로그인</button>
        </form> 
    </div>
</template>

<script setup>

import {ref} from 'vue';
import {useUserStore} from '@/stores/user.js';

const store = useUserStore();

const userId = ref(null);
const password = ref(null);

const login = () => {
    store.userLogin(userId.value, password.value);
}

</script>

<style scoped>

.content_container{
    max-width:39rem;
    min-height: 69.5rem;
    height: 94vh;

    color:white;
    background-color:#292929;
}

.login_Form{
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    height:100%;

    font-size:1.4rem;
}

.login_input{
    width:24rem;
    height:3rem;
    margin-bottom:1rem;
    border:none;
    outline:none;
    padding-left:1rem;

    background-color: #292929;
    border-bottom: 1px solid #ffffff;
}

.login_input{
    color:#ffffff;
}

.login_input::placeholder{
    color:#ffffff;
}

.login_input::placeholder:focus{
    color:#36DDAB;
}

.login_input:focus{
    color: #36DDAB;
    border-bottom: 2px solid #36DDAB;
}

button{
    width:25.22rem;
    height:4rem;
    border-radius:0.5rem;
    border:none;
    outline:none;
    background-color:#36DDAB;
    color:#ffffff;
    font-weight:bold;
    font-size:1.2rem;
}
</style>