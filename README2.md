# FINAL PROJECT README
김남준 석지명

<br/>
<br/>

## 👐 팀원 구성 및 역할 분담👐

<table align="center">
    <tr align="center">
          <td style="min-width: 220px;">
            <a href="https://github.com/NamjunKim12">
              <img src="https://github.com/ssafy10-seoul07/PJT6-M/assets/69416561/d19fb382-d4dc-481a-bcd2-a1315d4df247" width="250">
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
    <tr align="left">
        <td>
        0. 🙋 프론트엔드 리더<br>
        <br/>
        </td>
        <td>
        0. 🙋 백엔드 리더<br> 
        <br/>
        </td>
    </tr>
</table>

<br/>
<br/>

## 📌 프로젝트 개요

<br>

### 1️⃣ 프로젝트 목표

🟢 웹 아키텍처를 이해하고 이를 활용하여 웹 프로젝트를 설계하고 구현할 수 있다.

🟢 SpringBoot와 Vue를 이해하고 활용할 수 있다.

🟢 Rest API와 VueRouter을 활용하여 SPA 방식으로 프로젝트를 구성할 수 있다.

🟢 기존 관통 프로젝트에 새로운 아이디어를 추가하여 과정에서 배운 기술들을 다양하게 구현해 본다.

<br>


### 2️⃣ 요구사항

🟢 기존 진행한 관통 프로젝트의 요구사항을 정리하고 페어 별로 프로젝트에 적용할 아이디어를 추가하여 Final Project를 완성한다.

🟢 SpringBoot와 MyBatis연동을 활용한 RestAPI 서버 구현

🟢 Vue3버전을 활용한 SPA 클라이언트 구현

<br>
<hr>
<br>

## 📌 프로젝트 정보 

### 0️⃣ UX

🟢 사례1 : 친구들과의 실내 암벽등반을 즐기는 진종인(52, 남) 씨

  - 진종인 씨는 친구들과의 클라이밍을 즐긴다.
  - 친구들과 함께 놀려고 실내 클라이밍 암장을 찾아보려고 한다.
  - 네이버 지도앱에 들어가서 "클라이밍"으로 검색한다.
  - 암장의 위치와 간략한 정보는 나와있지만, 해당 암장에 주차장이 있는지,
  친구들과 함께 갈 정도로 넓은지, 샤워실이 있는지 등의
  자세한 정보들은 나와있지 않다.
  
  => 암장들의 상세정보를 볼 수 있는 곳이 있으면 좋겠다.

<br>

🟢 사례2 : 클라이밍이 취미인 이지은(42, 여) 씨

  - 이지은 씨는 태생이 클라이머다.
  - 일주일에 3번 이상 클라이밍을 하러 다닌다.
  - 주변 클라이밍 암장은 모두 정복하여, 다른 암장들을 찾으러 다닌다.
  - 클라이밍 고인물인 이지은 씨는 좀 어려운 난이도의 암장을 찾고싶다.
  - 네이버 지도를 통해서는 암장들의 난이도도 알기 어렵고, 리뷰들도 주관적이라 
  인스타그램, 네이버 블로그, 인터넷 커뮤니티 등을 통해 암장 정보를 일일이 찾아봐야한다.
  - 유일한 클라이밍 어플에서는 자신이 방문한 암장 기록은 쉽게 확인할 수 있지만,
    암장들의 상세한 정보는 알기 어렵다.
  - 또한, 다녀왔던 암장들의 구역 홀드가 변경 됐으면 가려고 하는데,
  암장들의 전화번호를 일일이 찾아 연락하기가 귀찮다. 
  
  => 암장의 상세한 정보들과 연락처들을 한 데 모아둔 곳이 있고,
  갱신된 정보 등을 바로바로 알 수 있는 서비스가 있으면 좋겠다.
  또, 정보와 함께 클라이밍을 즐기는 사람들이 쓴 리뷰들 위주로 볼 수 있는
  커뮤니티 서비스가 있으면 좋겠다.



<br>

### 1️⃣ 프로젝트 목표

🟢 클라이밍 암장의 정보를 제공하는 웹 서비스를 구현한다.

  - 카카오맵 API를 이용한 암장 검색 기능 및 주변 암장 조회 기능을 구현한다.
  - 암장 상세보기 기능을 제공한다.
  - 암장 상세 페이지에서 리뷰 조회 및 작성, 수정, 삭제 기능을 구현한다.
  - 로그인/로그아웃 및 마이페이지를 구현한다.

<br>
<br>

### 2️⃣ 페이지 정의서 & 와이어프레임

<img src="https://github.com/jseok0917/jseok0917/assets/139304962/bf23f389-aab4-4010-8078-18a66bb709ab" style="width : 700px" />
<img src="https://github.com/jseok0917/jseok0917/assets/139304962/4bbd2495-ab13-4662-bffb-86be3ed90fe5" />

<br>
<br>

### 3️⃣ 프로젝트 요구사항 정의서 

<img src="https://github.com/jseok0917/jseok0917/assets/139304962/527f4131-5121-4bc2-8469-92077b96fb5c" style="width : 900px"/>

<br>
<br>

### 4️⃣ 화면 설계서

<img src="https://github.com/jseok0917/jseok0917/assets/139304962/34863f44-d0cb-43ec-b7e7-a57f852dac92" style="width : 900px"/>

<img src="https://github.com/jseok0917/jseok0917/assets/139304962/a746c2b0-648f-4ab6-9fb2-888243b2b4c5" style="width : 900px"/>

<br>
<hr>
<br>

### 5️⃣ 폴더 구조

🟢 프론트엔드 폴더 구조

![frontFolderStructure](https://github.com/jseok0917/jseok0917/assets/139304962/1e2c3be1-492b-4237-a354-54f52c3cab66)

<br>
<br>

🔴 백엔드 폴더 구조

![backFolderStructure](https://github.com/jseok0917/jseok0917/assets/139304962/6672802e-512f-4abd-b00a-2bc3a187d716)

<br>
<hr>
<br>


## 📌 프론트엔드 파트 구성도

![frontend_structure](https://github.com/jseok0917/jseok0917/assets/139304962/d8a77c02-66ba-497b-98e5-ff5b913b5675)

<br>
<hr>
<br>


## 📌 프로젝트_프론트엔드 목표


🟢 웹 아키텍처를 이해하고 이를 활용하여 웹 프로젝트를 설계하고 구현

🟢 Vue3버전을 활용한 SPA 클라이언트 구현

<br>
<hr>
<br>

## 📌 프로젝트_프론트엔드 구현 결과

### 1️⃣ 서버로 요청을 보내고 응답을 받는 파트

🟢 Axios를 사용하여 서버와 통신한다.

  - 로그인 시 서버로부터 토큰을 localStorage에 저장한다.

  - 전역 가드를 이용하여 페이지 이동 시마다 로그인 토큰 유효성 검사

  - 암장 상세보기 시 서버로부터 암장 정보를 받아온다.

  - 리뷰 작성/조회/수정/삭제


<br>
<br>

### 2️⃣ 페이지 구조 및 Routing을 활용한 SPA 구현

![PageStructure2](https://github.com/jseok0917/jseok0917/assets/139304962/9508b3ed-16d2-422a-91c0-d506bbebbca8)

<br>
<br>

### 3️⃣ UX & UI

🟢 일일이 암장에 연락하기가 귀찮다는 UX경험으로 찜목록에서 암장에 바로 전화할 수 있도록
UI 구성

<br>
<br>

### 4️⃣ CSS

🟢

<br>
<br>

### 5️⃣ 카카오맵 API 활용

🟢 랜딩 시 카카오맵 API를 활용하여 주변 암장 목록을 불러온다. 

```javascript
<head>
    <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=af068cfaaa9dcb4e3c1f083f3b9982f0&libraries=services"></script>
  </head>
```

<br>
<br>