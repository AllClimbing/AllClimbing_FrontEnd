# SSAFY 10th FINAL PROJECT ( FrontEnd )
<br/>

## 👐 팀원 구성 및 역할 분담👐

<table align="center">
    <tr align="center">
          <td style="min-width: 220px;">
            <a href="https://github.com/NamjunKim12">
              <img src="https://github.com/namjunkim12.png"" width="250">
                <br />
              <b>김남준(팀장)</b>
            </a> 
        </td>
        <td style="min-width: 220px;">
            <a href="https://github.com/jseok0917">
              <img src="https://github.com/ssafy10-seoul07/PJT6-M/assets/69416561/e103b1e7-cbaa-4efe-9cc2-8c15b87b82c6" width="250">
              <br />
              <b>석지명</b>
            </a> 
        </td>
    </tr>
    <tr align="center">
        <td>
        🙋 프론트엔드 리드<br>
        - CSS 마크업 구현<br>
        - 리뷰, 페이지 마크업 구현<br>
        - 페이지별 API 통신 로직 개발<br>
        - 개발자 경험 개선을 위한 코드 리팩토링<br>
        <br/>
        </td>
        <td>
        🙋 프론트엔드 팀원<br>
        - 리뷰 수정, 삭제 기능 개발<br>
        - 네비게이션 가드를 이용한 로그인 기능 개발<br>
        <br/>
        </td>
    </tr>
</table>
<br>

## 📌 프로젝트 목표


🟢 웹 아키텍처를 이해하고 이를 활용하여 웹 프로젝트를 설계하고 구현

🟢 Vue3버전을 활용한 SPA 클라이언트 구현


## 📌 기술 스택 및 와이어 프레임

![frontend_structure](https://github.com/jseok0917/jseok0917/assets/139304962/d8a77c02-66ba-497b-98e5-ff5b913b5675)


## 📌 프로젝트_프론트엔드 구현 결과

### 1️⃣ API 통신

🟢 Axios 라이브러리를 사용하여 서버와 통신한다.

  - 로그인 성공시 서버로부터 JWT를 localStorage에 저장한다.

```javascript
//Jwt를 활용한 로그인 구현
const REST_USER_API = `http://localhost:8080/api/user`

export const useUserStore = defineStore('user', () => {
  const loginUserId = ref('')
  const userLogin = (userId, password) => {
    axios
      .post(`${REST_USER_API}/login`, { userId, password })
      .then((response) => {
        localStorage.setItem('access-token', response.data)

        const token = response.data.split('.')
        loginUserId.value = (JSON.parse(atob(token[1])))['userId']
        
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
```
<br>
<br>

  - 전역 navigation guard를 이용하여 페이지 라우팅마다 로그인 상태를 확인함

```javascript
// Jwt 토큰을 활용한 로그인 전역가드 설정
router.beforeEach(async (to, from, next) => {
  //페이지가 바뀔때마다 서버로 토큰을 보내 유효성을 검사한다.
  if (to.name === 'login') {
    return next()
  }

  const token = window.localStorage.getItem('access-token')
  if (!token) {
    alert('로그인이 필요합니다.')
    return next('/login')
  }

  try {
    const response = await axios.get('http://localhost:8080/api/user/validation?token=' + token);
    const isAuth = response.data;
    
    

    if (isAuth) {
      useUserStore().loginUserId = ((JSON.parse(atob((token.split("."))[1])))['userId'])
      next();

    } else {
      alert('로그인이 필요합니다.')
      next('/login')
    }
  } catch (error) {
    console.error('Error sending data to server:', error)
    alert('로그인이 필요합니다.')
    next('/login')
  }
})
```
<br>
<br>

  - API통신 및 컴포넌트 리렌더링을 통한 암장, 리뷰 목록 조회/작성/수정/삭제 가능

```javascript
//암장목록 조회 로직
const fetchGymData = async () => {
    try {
        const gymResponse = await axios.get(`${URL.GYM_API}${id.value}`);
        gymData.value = gymResponse.data;
        title.value = gymData.value.gymName;
    } catch (e) {
        console.error("암장 데이터 로딩에 실패했습니다");
    }
}

//리뷰작성 로직(파일도 업로드 가능하도록)
const review = ref({})

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
        .post(`${URL.REVIEW_API}write`, formData, {
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

//리뷰 삭제 로직
const deleteReview = async (reviewNo) => {
    try{
        await axios.delete(`${URL.REVIEW_API}delete/${reviewNo}`);
        reviewData.value = reviewData.value.filter((review) => review.reviewNo !== reviewNo);
    } catch(e){
        console.log("리뷰 삭제 에러");
    }
}
```
<br>
<br>
  - 컴포넌트 리렌더링과 서버 통신을 이용한 찜/찜해제 기능 추가

```javascript
//찜 기능
const doFavorite = async () => {
    try {
         await axios.post(`h${URL.GYM_API}favorite/${id.value}`, keyword);
         isFavorite.value = true;
    } catch(e){
        console.log('좋아요 에러');
    }
}

//찜 해제 기능
const cancelFavorite = async () => {
    try {
        await axios.post(`${URL.GYM_API}favorite/delete`, keyword);
        isFavorite.value = false;
    } catch(e){
        console.log("찜하기 해제 에러");
    }
}
```



### 2️⃣ 페이지 구조 및 Routing을 활용한 SPA 구현

![PageStructure2](https://github.com/jseok0917/jseok0917/assets/139304962/9508b3ed-16d2-422a-91c0-d506bbebbca8)


### 3️⃣ UX & UI, CSS

🟢 제한된 폰트 / 컬러 / 그레이스케일의 사용으로 프로덕트 내의 디자인 일관성 유지

![스크린샷 2023-11-24 오전 1 46 05](https://github.com/AllClimbing/AllClimbing_FrontEnd/assets/69416561/ba6a6e1f-12b3-4b58-9b35-4531bba45cc5)



🟢 데이터 로딩을 나타내는 이미지와 문구로 유저의 사용성 증대

![image](https://github.com/AllClimbing/AllClimbing_FrontEnd/assets/69416561/ffe2c0d1-3b76-4f35-acea-3e3fc812380f)



🟢 뱃지 UI와 다양한 아이콘 사용으로 다양한 정보를 시각적으로 표현

![image](https://github.com/AllClimbing/AllClimbing_FrontEnd/assets/69416561/fa8bf57a-027b-4925-8965-1265fba7f6be)





### 4️⃣ 카카오맵 API 활용

🟢 카카오맵 API를 활용하여 주변 암장 목록 불러오기, 암장 검색 기능 구현

🟢 카카오 API에서 제공하는 ES5의 보일러 플레이트 코드를 ES6 문법을 활용하여 리팩토링 진행

```javascript
const nearPlaces = () => {
  navigator.geolocation.getCurrentPosition((position) => {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude

    const ps = new kakao.maps.services.Places()

    const currentCoordinate = new kakao.maps.LatLng(latitude, longitude)

    const options = {
      location: currentCoordinate,
      radius: 3000,
      size: 6,
      sort: kakao.maps.services.SortBy.DISTANCE
    }
    ps.keywordSearch('클라이밍', placesSearchCB, options)
  })
}

const searchPlaces = function () {
  navigator.geolocation.getCurrentPosition((position) => {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude

    const ps = new kakao.maps.services.Places()

    const keyword = location.value

    if (!keyword.replace(/^\s+|\s+$/g, '')) {
      alert('키워드를 입력해주세요!')
      return false
    }

    const currentCoordinate = new kakao.maps.LatLng(latitude, longitude)
    const options = {
      location: currentCoordinate,
      size: 8
    }

    ps.keywordSearch(keyword + ' 클라이밍', placesSearchCB, options)
  })
}

// 장소검색이 완료됐을 때 호출되는 콜백함수
const placesSearchCB = (data, status) => {
  switch (status) {
    case kakao.maps.services.Status.OK:
      isLoading.value = false
      gymList.value = data
      listCnt.value = data.length
      return
    case kakao.maps.services.Status.ZERO_RESULT:
      alert('검색 결과가 존재하지 않습니다.')
      return
    case kakao.maps.services.Status.ERROR:
      alert('검색 결과 중 오류가 발생했습니다.')
      return
  }
}
```
### 5️⃣ 기타
🟢 Vue에서 제공하는 computed variable을 이용하여, 리뷰 목록을 4개씩 불러오는 Pagination 기능 구현

```vue.js
const displayedReview = computed(() => reviewData.value.slice(0, displayCount.value));
const hasMoreItems = computed(() => displayCount.value < reviewData.value.length);

const showMoreReviews = () => {
    if (hasMoreItems.value) {
        if (displayCount.value + 4 > reviewData.value.length) {
            displayCount.value = reviewData.value.length;
        } else {
            displayCount.value += 4;
        }
    }
}

// template
<div class="show_more_button_container">
    <div v-if="hasMoreItems" @click="showMoreReviews" class="show_more_button">
        <img src="@/assets/underArrow.svg" alt="더보기 버튼">
        <p>리뷰 더보기</p>
    </div>
</div>
```

🟢 여러 컴포넌트에서 사용하는 유틸함수는 @/utils 내의 유틸함수로 분리하여 사용

```js
//route.js
const API_BASE_URL = `http://localhost:8080/api/`

export const GYM_API = `${API_BASE_URL}gym/`
export const REVIEW_API = `${API_BASE_URL}review/`
export const USER_API = `${API_BASE_URL}user/`

const URL = {
  GYM_API,
  REVIEW_API,
  USER_API
}

export { URL }

//format.js
const convertVisitDate = (date) => {
  return `${date.substring(2, 4)}.${date.substring(5, 7)}.${date.substring(8, 10)} 방문`
}

const convertRegDate = (date) => {
  return `${date.substring(2, 4)}.${date.substring(5, 7)}.${date.substring(8, 10)} ${date.substring(
    11,
    13
  )}:${date.substring(14, 16)} 작성`
}

const getDistanceFormat = (dist) => {
  if (dist < 1000) return `${dist} M`
  return `${Math.round(dist / 100) / 10} KM`
}

export { convertRegDate, convertVisitDate, getDistanceFormat }

//api.js

export const routeForAddReview = (router, id) => {
  router.push(`/review/${id}`)
}

export const routeForUpdateReview = (router, gymId, reviewNo) => {
  router.push(`/review/${gymId}/${reviewNo}`)
}

export const routeToDetail = (router, id) => {
  router.push(`/detail/${id}`)
}


```
🟢 이미지 최적화를 위해 대부분의 이미지 확장자는 .svg 포맷으로 사용함


## 🗂️ 디렉토리 구조

![frontFolderStructure](https://github.com/jseok0917/jseok0917/assets/139304962/1e2c3be1-492b-4237-a354-54f52c3cab66)
