<!-- <template>
  <div id="body">
    <h1>리뷰 작성</h1>
    <div id="writeForm">
      <form @submit.prevent="submitForm">
        <div class="inputbox">
          <label for="text-input">내용</label>
          <input id="text-input" type="textarea" v-model="textInput" />
        </div>
        <div class="inputbox">
          <label for="date-input">방문 일자</label>
          <input id="date-input" type="date" v-model="visitDate" />
        </div>
        <div class="inputbox">
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
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '../stores/user';

const route = useRoute();
const router = useRouter();
const gymId = ref(route.params.id);
const userId = useUserStore().loginUserId;

const review = ref({
  //이건 Props로 받아와야함
  gymId: gymId,
  //일단 이거는 더미로
  userId: userId,
  content: null,
  //이 형식으로만 넣을 수 있게 form에서 짜줘야할 듯
  visitDate: '2023-11-06'
})

const textInput = ref(null);
const selectedImage = ref(null);
const visitDate = ref(null);

const handleImageChange = function (event) {
  // console.log('왜안되는데')
  // console.log(event.target.files)
  selectedImage.value = event.target.files[0]
}

const submitForm = function () {
  let formData = new FormData()
  review.value.content = textInput.value;
  review.value.visitDate = visitDate.value;
  //formDate에 담아서 전송
  formData.append('review', new Blob([JSON.stringify(review.value)], { type: 'application/json' }))
  formData.append('image', selectedImage.value)


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
    .then(() => {
      router.push('/detail/'+gymId.value);
    })
    .catch((error) => {
      console.error('Error sending data to server:', error)
    })
}
</script>

<style scoped>
#body {
  height: 620px;
  margin: 20px auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #101010;
  color: #ffffff;
}

#writeForm {
  margin: 10px auto;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.inputbox {
  background-color: #5a5a5a;
  margin: 10px auto;
  padding: 10px;
  border-radius: 8px;
}

h1 {
  font-size: 24px;
  color: #FFFFFF;
}


label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}


button {
  background-color: #36DDAB;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #4A4A4A;
}

h2 {
  font-size: 18px;
  margin-top: 10px;
  color: #333;
}

#text-input {
  height: 200px;
  border-radius: 10px;
}

input[type="file"] {
  margin-top: 5px;
}
</style> -->

<script setup>
  import { useRoute, useRouter} from 'vue-router';
  import { onBeforeMount, ref } from 'vue';
  import { useUserStore } from '@/stores/user.js';
  import axios from 'axios';

  const route = useRoute();
  const router = useRouter();
  const gymId = ref(route.params.id);
  const userId = useUserStore().loginUserId;

  const id = ref(route.params.id);
  const isLoading = ref(true);
  const gymData = ref({});
  const reviewData = ref([]);
  const title = ref("제목");
  const userData = ref(null);

  const loginUserId = useUserStore().loginUserId;
  const keyword = {
      userId: loginUserId,
      gymId: route.params.id
  };
  const isFavorite = ref(false);

  const doFavorite = async () => {
      try {
          const res =  await axios.post(`http://localhost:8080/api/gym/favorite/${id.value}`, keyword);
          isFavorite.value = true;
      } catch(e){
          console.log('좋아요 에러');
      }
  }

  const cancelFavorite = async () => {
      try {
          const res =  await axios.post(`http://localhost:8080/api/gym/favorite/delete`, keyword);
          isFavorite.value = false;
      } catch(e){
          console.log("찜하기 해제 에러");
      }
  }

  onBeforeMount(async () => {
      try {
          // 서버에서 gymData 불러오기
          const gymResponse = await axios.get(`http://localhost:8080/api/gym/${id.value}`);
          gymData.value = gymResponse.data;
          title.value = gymData.value.gymName;

          // 서버에서 reviewData 불러오기
          const reviewResponse = await axios.get(`http://localhost:8080/api/review/${id.value}`);
          reviewData.value = reviewResponse.data;
          isLoading.value = false;

          //서버에서 찜 Data 불러오기
          const favoriteResponse = await axios.post(`http://localhost:8080/api/gym/favorite`, keyword);
          isFavorite.value = favoriteResponse.data ? true : false;


      } catch (e) {
          console.error("데이터 로딩에 실패했습니다");
      }
  });


    const review = ref({
      //이건 Props로 받아와야함
      gymId: gymId,
      //일단 이거는 더미로
      userId: userId,
      content: null,
      //이 형식으로만 넣을 수 있게 form에서 짜줘야할 듯
      visitDate: '2023-11-06'
    })

    const textInput = ref(null);
    const selectedImage = ref(null);
    const visitDate = ref(null);

    const submitForm = () => {
      let formData = new FormData()
      review.value.content = textInput.value;
      review.value.visitDate = visitDate.value;
      //formDate에 담아서 전송
      formData.append('review', new Blob([JSON.stringify(review.value)], { type: 'application/json' }))
      formData.append('image', selectedImage.value)

      axios
        .post('http://localhost:8080/api/review/write', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(() => {
          router.push('/detail/'+gymId.value);
        })
        .catch((e) => {
          console.error('Error sending data to server:', e)
        })
    }
</script>

<template>
    <div class="content-container">
        <div v-if="isLoading">
            데이터를 불러오는 중입니다.
        </div>
        <div v-else>
            <div class="header">
                <div class="left_button" @click="$router.go(-1)"><img src="@/assets/backArrow.svg"></div>
                <p>{{ title }}</p>
                <div class="right_button">
                    <img v-if="isFavorite" src="@/assets/fulledHeart.svg" @click="cancelFavorite">
                    <img v-else src="@/assets/emptyHeart.svg" @click="doFavorite">
                </div>
            </div>
        </div>
        <div class="write_section_body">
          <h2>리뷰 작성</h2>
          <div class="write_form">
            <form @submit.prevent="submitForm">
              <div class="inputbox">
                <label for="text-input">내용</label>
                <textarea id="text-input" type="textarea" v-model="textInput" />
              </div>
              <div class="inputbox">
                <label for="date-input">방문 일자</label>
                <input id="date-input" type="date" placeholder="날짜를 선택해주세요." v-model="visitDate" />
              </div>
            </form>
          </div>
          <button 
            class='submit_button' 
            type="button"
            @click="submitForm"
          >
            등록
          </button>
        </div>
    </div>
</template>

<style scoped>

.content-container {
    max-width: 39rem;
    min-height: 69.5rem;
    height: 94vh;
    overflow: scroll;

    color: white;
    background-color: #292929;
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

.left_button {
    width: 2.4rem;
    height: 2.4rem;
    margin-left: 1.6rem;

    margin-top: 0.2rem;
    cursor: pointer;
}

.right_button {
    cursor: pointer;
    width: 5rem;
    height: 5rem;
}

.right_button img {
    width: 3rem;
    height: 3rem;

    margin-top: 1rem;
    cursor: pointer;
}

.write_section_body {
  width: 34.2rem;
  height: 23rem;
  margin-left:1.6rem;
  border-radius: 0.5rem;

  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: flex-start;

  color: #ffffff;
}

.write_form{
  width: 32.2rem;
  height: 100%;

  padding: 1.2rem 1.8rem;
  border-radius:0.5rem;
  background-color: #1c1c1c;

  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: flex-start;
}

.inputbox{
  width: 100%;
  margin-top: 0.5rem;
  margin-left: 0.7rem;
  margin-bottom: 1.6rem;

  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: flex-start;
}

.inputbox label{
  font-size: 1.4rem;
  margin-bottom: 1.2rem;
}

textarea {
  width: 30rem;
  height:10rem;
  background-color: #1c1c1c;
  border: 0.1rem solid #cccccc;
  border-radius: 0.5rem;
  resize:none;

  color:white;
  font-size: 1.6rem;
}

input[type='date'] {
  border: none; 
  position: relative;
  width: 28.5rem;
  padding: 1rem;

  background-color: #1c1c1c;
  border: 0.1rem solid #cccccc;
  border-radius: 0.5rem;
  text-align: center;
  font-size: 1.3rem;

  color:#ffffff;
}



input[type='date']:focus{
  border: 0.1rem solid #36ddab;
}

input[type='date']::-webkit-calendar-picker-indicator {
  position: absolute; 
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  color: transparent; 
  cursor: pointer;
}


input[type='date']:valid::before {
  display: none; 
}

.submit_button {
  width: 35.8rem;
  height: 5rem;

  background-color: #36DDAB;
  color: white;

  border: none;
  border-radius: 0.5rem;

  font-size: 1.4rem;

  margin-top:1.5rem;
  padding:1rem;

  cursor: pointer;
}

</style>
