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

<br/>
<br/>


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

  - API통신 및 컴포넌트 리렌더링을 통한 리뷰 작성/조회/수정/삭제가 가능


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
