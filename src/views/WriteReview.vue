<template>
    <div>
        <h1>리뷰 작성</h1>
        <form @submit.prevent="submitForm">
            <div>
                <label for="text-input">Text Input:</label>
                <input id="text-input" type="text" v-model="textInput">
                <h2>{{ textInput }}</h2>
            </div>
            <div>
                <label for="image-input">Image Input:</label>
                <input id="image-input" type="file" ref="imageInput" @change="handleImageChange">
            </div>
            <button type="submit">Submit</button>
        </form>
    </div>
</template>
  
<script setup>
import axios from 'axios';
import {ref} from 'vue';

const review = ref({
    //이건 Props로 받아와야함
    gymId : 1796322688,
    //일단 이거는 더미로
    userId : 'ssafy2',
    content : null,
    //이 형식으로만 넣을 수 있게 form에서 짜줘야할 듯
    visitDate : '2023-11-06',
})

const textInput = ref(null);
const selectedImage = ref(null);

const handleImageChange = function(event) {
    console.log("왜안되는데");
    console.log(event.target.files);
    selectedImage.value = event.target.files[0];
};

const submitForm = function() {
    let formData = new FormData();
    review.value.content = textInput.value;
    //formDate에 담아서 전송
    formData.append('review', new Blob([JSON.stringify(review.value)], {type : "application/json"}));
    if (selectedImage.value){
        formData.append('image', selectedImage.value);
    }

    axios.post('http://localhost:8080/api/review/write', formData, {  headers: {
            'Content-Type': 'multipart/form-data',
        }})
        .then(response => {
            console.log('Server response:', response.data);
            // 성공적으로 서버 응답을 받았을 때 수행할 작업
        })
        .catch(error => {
            console.error('Error sending data to server:', error);
        });
};

</script>

<style scoped>
</style>