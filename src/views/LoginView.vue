<template>
    <div>
        <form id="loginForm" @submit.prevent="login">
            <input id="userId" type="text" v-model="userId" placeholder="아이디를 입력해주세요.">
            <input id="password" type="password" v-model="password" placeholder="비밀번호를 입력해주세요.">
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

const login = function(){
    store.userLogin(userId.value, password.value);
}




</script>

<style scoped>

#loginForm {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

</style>