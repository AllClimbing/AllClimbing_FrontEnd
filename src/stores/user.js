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
      .catch(() => {

      })

    router.push({ name: "home" });
  }

  const validateToken = async () => {
    const token = window.localStorage.getItem('access-token');
    if (!token) {
      return false;
    }

    // console.log(token);
    // axios.post('http://localhost:8080/api/user/validation', token, {
    //   headers: {
    //     'Content-Type': 'text/plain', // Content-Type을 text/plain으로 설정
    //   }})
    //   .then(response => {
    //     console.log('Server response:', response.data);
    //     // 성공적으로 서버 응답을 받았을 때 수행할 작업
    //   })
    //   .catch(error => {
    //     console.error('Error sending data to server:', error);
    //   });

    return true;

  }


  return { userLogin, loginUserId, validateToken }
})
