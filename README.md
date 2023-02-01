<div align="center">
 <img src="client/public/logos/logoBig.svg">
<h2>Ngether(엔게더) - 실시간 위치기반 공동구매 플랫폼</h2>
</div>
<h2>
<a href="https://www.notion.so/codestates/b6d94a84cd10493793b629eb74a3f35c?p=f90ea549c5754a8ebd1ca62ea3d3f7c1&pm=s">노션 링크</a>
</h2>
<br>

### 🚀Ngether 로컬에서 시작하기

<details markdown="1">
<summary><strong>Client</strong></summary>

<h4 style="color:#5ad7b7"><strong>yarn install</strong></h4>
<p>개발에 필요한 패키지들을 설치합니다.</p>

<h4 style="color:#5ad7b7"><strong>yarn dev</strong></h4>
<p>개발 모드로 앱을 실행합니다.
브라우저에서 https://localhost:3443으로 실행됩니다.</p>

<h4 style="color:#5ad7b7"><strong>yarn build</strong></h4>
<p>작업 완료 후 배포를 위한 build폴더가 생성됩니다.</p>
<h4 style="color:#5ad7b7"><strong>https 서버 시작하기</strong></h4>
<p>http에서는 지도 서비스를 지원하지 않습니다. https 환경에서 앱을 시작해주시기 바랍니다</p>
<p>mac에서 설치하기</p>
<p>brew install mkcert</p>
<p>Linux에서 설치하기</p>
<p>sudo apt install libnss3-tools</p>
<p>공통</p>
<p>mkcert key.pem cert.pem 입력 후 파일명 key.pem과 cert.pem으로 변경</p>
</details>


<details markdown="1">
<summary><strong>Server</strong></summary>
<h4 style="color:#cc6cab"><strong>EC2 서버를 사용하여 서버 배포하기</strong></h4>
<ol>
    <li>레포지토리에 변화가 생기면 Github Actions 작동</li>
    <li>프로젝트 빌드 결과물(.jar)을 S3로 전송 및 저장 <주소></li>
    <li>Amazon CodeDeploy에 배포 명령 </li>
    <li>S3에서 Amazon CodeDeploy에 프로젝트 빌드 결과물(.jar) 전달</li>
    <li>EC2 배포 및 실행</li>
</ol>
</details>
<br>

## 나누조 팀소개


|김형진|김은수|박경현|송현우|김연주|박지윤|최지현|
|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
|[<img width="140px" height="140px" src="readmeImage/김형진.png">](https://raw.githubusercontent.com/codestates-seb/seb41_main_024/readme/readmeImage/%EA%B9%80%ED%98%95%EC%A7%84.png)|[<img width="140px" height="140px" src="https://cdn.discordapp.com/attachments/1059639201731182705/1070205097600102470/c2aabf0408d26d274d05aef03f83a9d2-sticker.png">](https://raw.githubusercontent.com/codestates-seb/seb41_main_024/readme/readmeImage/%EA%B9%80%EC%9D%80%EC%88%98.png)|[<img width="140px" height="140px" src="https://cdn.discordapp.com/attachments/1059639201731182705/1070205298029101126/4b505b32b.PNG">](https://raw.githubusercontent.com/codestates-seb/seb41_main_024/readme/readmeImage/%EB%B0%95%EA%B2%BD%ED%98%84.png)|[<img width="140px" height="140px" src="https://cdn.discordapp.com/attachments/1059639201731182705/1070203560626769941/da4ef0c91fc0ee99c1609cfa58fc86d4-sticker.png">](https://raw.githubusercontent.com/codestates-seb/seb41_main_024/readme/readmeImage/%EC%86%A1%ED%98%84%EC%9A%B0.png)|[<img width="140px" height="140px" src="https://cdn.discordapp.com/attachments/1059639201731182705/1070203709843329034/ec9c5931875927fc181542a8cdb6a853-sticker.png">](https://raw.githubusercontent.com/codestates-seb/seb41_main_024/readme/readmeImage/%EA%B9%80%EC%97%B0%EC%A3%BC.png)|[<img width="140px" height="140px" src="https://cdn.discordapp.com/attachments/1059639201731182705/1070204891747844106/5392d2c8940c52f0ebe0f02e4edd2d20-sticker.png">](https://raw.githubusercontent.com/codestates-seb/seb41_main_024/readme/readmeImage/%EB%B0%95%EC%A7%80%EC%9C%A4.png)|[<img width="140px" height="140px" src="https://cdn.discordapp.com/attachments/1059639201731182705/1070203285740458015/ee5b2ccd5d8e0f65e76a42869822cfee-sticker.png">](https://raw.githubusercontent.com/codestates-seb/seb41_main_024/readme/readmeImage/%EC%B5%9C%EC%A7%80%ED%98%84.png)|
|FE(팀장)|FE|FE|FE|BE|BE|BE|
|[koreadinosaur](https://github.com/koreadinosaur)|[noah-eunsoo](https://github.com/noah-eunsoo)|[Pikadev1771](https://github.com/Pikadev1771)|[SHWsgithub](https://github.com/SHWsgithub)|[yeonzzoo](https://github.com/yeonzzoo)|[parkjiyun98](https://github.com/parkjiyun98)|[Aru-slave](https://github.com/Aru-slave)|

<br>
## 아키텍처

---
<img src="https://github.com/codestates-seb/seb41_main_024/blob/readme/readmeImage/Web_App_Reference_Architecture_3.png" />
<br>

## ERD
---
<img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/8a217a16-9f28-4b67-bebc-330be74c4288/ERD_ScreenShot.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230201%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230201T054605Z&X-Amz-Expires=86400&X-Amz-Signature=8b7f09fb32a834a3d8ffe5a968b0bbfc7c788488c14c3e6467ea5ac1c0375bd2&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22ERD%2520ScreenShot.png%22&x-id=GetObject">

## Ngether 사용 예시

<details markdown="1">
<summary><strong>회원가입 및 로그인, 마이페이지</strong></summary>
메인페이지
<br>
<img width="100%" src="https://raw.githubusercontent.com/codestates-seb/seb41_main_024/readme/readmeImage/appUserFlow/ngether.xyz_main.png" />
회원가입
<br>
<img width="100%" src="https://github.com/codestates-seb/seb41_main_024/blob/readme/readmeImage/appUserFlow/%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85.gif" />
로그인
<br>
<img width="100%" src="https://raw.githubusercontent.com/codestates-seb/seb41_main_024/readme/readmeImage/appUserFlow/login.gif" />
마이페이지
<br>
<img width="100%" src="https://github.com/codestates-seb/seb41_main_024/blob/readme/readmeImage/appUserFlow/edit-profile.gif" />

</details>
<details markdown="1">
<summary><strong>게시물 등록, 검색, 수정</strong></summary>
게시물 등록
<br>
<img width="100%" src="https://raw.githubusercontent.com/codestates-seb/seb41_main_024/readme/readmeImage/appUserFlow/ngether.xyz_main.png" />

검색
<br>
<img width="100%" src="https://raw.githubusercontent.com/codestates-seb/seb41_main_024/readme/readmeImage/appUserFlow/search.gif" />


수정
<br>
<img width="100%" src="https://raw.githubusercontent.com/codestates-seb/seb41_main_024/readme/readmeImage/appUserFlow/edit.gif" />

삭제
<br>
<img width="100%" src="https://github.com/codestates-seb/seb41_main_024/blob/readme/readmeImage/appUserFlow/delete.gif" />
</details>

<details markdown="1">
<summary><strong>주소록 등록, 나의 쉐어링, 찜</strong></summary>
주소롱 등록
<br>
<img width="100%" src="https://github.com/codestates-seb/seb41_main_024/blob/readme/readmeImage/appUserFlow/location-save.gif" />

나의 쉐어링 
<br>
<img width="100%" src="https://github.com/codestates-seb/seb41_main_024/blob/readme/readmeImage/appUserFlow/my-sharing.gif" />

1:1 문의 등록
<br>
<img width="100%" src="https://github.com/codestates-seb/seb41_main_024/blob/readme/readmeImage/appUserFlow/question.gif" />
</details>

<details markdown="1">
<summary><strong>채팅리스트, 채팅방</strong></summary>

채팅리스트, 채팅방
<br>
<img width="100%" src="https://github.com/codestates-seb/seb41_main_024/blob/readme/readmeImage/appUserFlow/chatting.gif" />

</details>

<details markdown="1">
<summary><strong>관리자 페이지</strong></summary>
1:1 문의 답변
<br>
<img width="100%" src="https://github.com/codestates-seb/seb41_main_024/blob/readme/readmeImage/appUserFlow/Answer.gif" />

유저 정지
<br>
<img width="100%" src="https://github.com/codestates-seb/seb41_main_024/blob/readme/readmeImage/appUserFlow/blockuser.gif" />



</details>



