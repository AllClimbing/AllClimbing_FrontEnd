import { ref } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'
import axios from 'axios'

const REST_USER_API = `http://localhost:8080/api/user`

export const useUserStore = defineStore('user', () => {
  const loginUserId = ref('')
  const userLogin = (userId, password) => {
    axios
      .post(`${REST_USER_API}/login`, { userId, password })
      .then((response) => {
        localStorage.setItem('access-token', response.data)

        const token = response.data.split('.')
        let id = token[1]
        id = atob(id)
        id = JSON.parse(id)
        loginUserId.value = id['userId']
      })
      .then(() => {
        router.push('/list')
      })
      .catch((e) => {
        console.log(e)
      })
  }

  return { userLogin, loginUserId }
})
