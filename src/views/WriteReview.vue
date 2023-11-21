<template>
  <div id="body">
    <h1>리뷰 작성</h1>
    <div id="writeForm">
      <form @submit.prevent="submitForm">
        <div>
          <label for="text-input">내용</label>
          <input id="text-input" type="textarea" v-model="textInput" />
        </div>
        <div>
          <label for="image-input">사진 선택</label>
          <input id="image-input" type="file" ref="imageInput" @change="handleImageChange" />
        </div>
        <button type="submit">등록</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'

const review = ref({
  //이건 Props로 받아와야함
  gymId: 1796322688,
  //일단 이거는 더미로
  userId: 'ssafy2',
  content: null,
  //이 형식으로만 넣을 수 있게 form에서 짜줘야할 듯
  visitDate: '2023-11-06'
})

const textInput = ref(null)
const selectedImage = ref(null)

const handleImageChange = function (event) {
  console.log('왜안되는데')
  console.log(event.target.files)
  selectedImage.value = event.target.files[0]
}

const submitForm = function () {
  let formData = new FormData()
  review.value.content = textInput.value
  //formDate에 담아서 전송
  formData.append('review', new Blob([JSON.stringify(review.value)], { type: 'application/json' }))
  if (selectedImage.value) {
    formData.append('image', selectedImage.value)
  }

  axios
    .post('http://localhost:8080/api/review/write', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => {
      console.log('Server response:', response.data)
      // 성공적으로 서버 응답을 받았을 때 수행할 작업
    })
    .catch((error) => {
      console.error('Error sending data to server:', error)
    })
}
</script>

<style scoped>
 div {
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h1 {
            font-size: 24px;
            color: #333;
        }

        form {
            margin-top: 20px;
        }

        label {
            display: block;
            margin-bottom: 8px;
            font-weight: bold;
            color: #555;
        }

        input {
            width: 100%;
            padding: 10px;
            margin-bottom: 20px;
            box-sizing: border-box;
            border: 1px solid #ccc;
            border-radius: 4px;
            height: 150px; /* 높이 조절 */
            resize: vertical; /* 사용자가 높이를 조절할 수 있도록 허용 */
        }

        button {
            background-color: #333;
            color: #fff;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }

        button:hover {
            background-color: #555;
        }

        h2 {
            font-size: 18px;
            margin-top: 10px;
            color: #333;
        }

        input[type="file"] {
            margin-top: 5px;
        }
</style>
