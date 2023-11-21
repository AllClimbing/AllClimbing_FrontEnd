import { ref } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'
import axios from 'axios'

const REST_USER_API = `http://localhost:8080/api/user`

export const useUserStore = defineStore('user', () => {

  const loginUserId = ref('')
  const userLogin = function (userId, password) {

    axios.post(`${REST_USER_API}/login`, { userId, password })
      .then((response) => {
        console.log(response)
        localStorage.setItem('access-token', response.data)
        // sessionStorage.setItem('access-token', response.data)

        const token = response.data.split('.')
        console.log(token);
        let id = token[1]
        //base64 문자열 디코딩
        id = atob(id) //여기까지는 String
        id = JSON.parse(id) //String을 Json으로 변경
        console.log(id);
        loginUserId.value = id['userId'];
        console.log(loginUserId.value);

      })
      .then(() =>
      {router.push({ name: "home" });})
      .catch(() => {

      })

  }




  return { userLogin, loginUserId}
})
