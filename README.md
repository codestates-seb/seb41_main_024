<div align="center">
 <img src="client/public/logos/logoBig.svg">
<h2>Ngether(엔게더) - 실시간 위치기반 공동구매 플랫폼</h2>
</div>
<h2>
<a href="https://www.notion.so/codestates/b6d94a84cd10493793b629eb74a3f35c?p=f90ea549c5754a8ebd1ca62ea3d3f7c1&pm=s">노션 링크</a>
&nbsp;
<a href="https://ngether.xyz/">서비스 링크</a>
</h2>
<br>

## Ngether 로컬에서 시작하기
---
<details markdown="1">
<summary><strong>Client</strong></summary>

<h4 style="color:#5ad7b7"><strong>$\huge\textnormal{\color{#5ad7b7}yarn\ install}$</strong></h4>
<p>개발에 필요한 패키지들을 설치합니다.</p>

<h4 style="color:#5ad7b7"><strong>$\huge\textnormal{\color{#5ad7b7}yarn\ dev}$</strong></h4>
<p>개발 모드로 앱을 실행합니다.
브라우저에서 https://localhost:3443으로 실행됩니다.</p>

<h4 style="color:#5ad7b7"><strong>$\huge\textnormal{\color{#5ad7b7}yarn\ build}$</strong></h4>
<p>작업 완료 후 배포를 위한 build폴더가 생성됩니다.</p>
<h4 style="color:#5ad7b7"><strong>https 서버 시작하기</strong></h4>
<p>http에서는 지도 서비스를 지원하지 않습니다. https 환경에서 앱을 시작해주시기 바랍니다</p>
<p>mac에서 설치하기</p>
<p>$\huge\textnormal{\color{#5ad7b7}brew\ install\ mkcert}$</p>
<p>Linux에서 설치하기</p>
<p>$\huge\textnormal{\color{#5ad7b7}sudo\ apt\ install\ libnss3-tools}$</p>
<p>공통</p>
<p>mkcert key.pem cert.pem 입력 후 파일명 key.pem과 cert.pem으로 변경</p>
</details>

<details markdown="1">
<summary><strong>Server</strong></summary>
<h4 style="color:#cc6cab"><strong> aws와 github actions를 사용하여 서버 배포하기</strong></h4>
<ol>
    <li>레포지토리에 변화가 생기면 Github Actions 작동</li>
    <li>프로젝트 빌드 결과물(.jar)을 S3로 전송 및 저장 </li>
    <li>Amazon CodeDeploy에 배포 명령 </li>
    <li>S3에서 Amazon CodeDeploy에 프로젝트 빌드 결과물(.jar) 전달</li>
    <li>EC2 배포 및 실행</li>
</ol>
</details>
<br>

## 나누조 팀소개
---
|김형진|김은수|박경현|송현우|
|:--:|:--:|:--:|:--:|
|[<img width="140px" height="140px" src="readmeImage/김형진.png">](https://raw.githubusercontent.com/codestates-seb/seb41_main_024/readme/readmeImage/%EA%B9%80%ED%98%95%EC%A7%84.png)|[<img width="140px" height="140px" src="https://cdn.discordapp.com/attachments/1059639201731182705/1070205097600102470/c2aabf0408d26d274d05aef03f83a9d2-sticker.png">](https://raw.githubusercontent.com/codestates-seb/seb41_main_024/readme/readmeImage/%EA%B9%80%EC%9D%80%EC%88%98.png)|[<img width="140px" height="140px" src="https://cdn.discordapp.com/attachments/1059639201731182705/1070205298029101126/4b505b32b.PNG">](https://raw.githubusercontent.com/codestates-seb/seb41_main_024/readme/readmeImage/%EB%B0%95%EA%B2%BD%ED%98%84.png)|[<img width="140px" height="140px" src="https://cdn.discordapp.com/attachments/1059639201731182705/1070203560626769941/da4ef0c91fc0ee99c1609cfa58fc86d4-sticker.png">](https://raw.githubusercontent.com/codestates-seb/seb41_main_024/readme/readmeImage/%EC%86%A1%ED%98%84%EC%9A%B0.png)|
|FE(팀장)|FE|FE|FE|
|[koreadinosaur](https://github.com/koreadinosaur)|[noah-eunsoo](https://github.com/noah-eunsoo)|[Pikadev1771](https://github.com/Pikadev1771)|[SHWsgithub](https://github.com/SHWsgithub)|

|김연주|박지윤|최지현|
|:--:|:--:|:--:|
|[<img width="140px" height="140px" src="https://cdn.discordapp.com/attachments/1059639201731182705/1070203709843329034/ec9c5931875927fc181542a8cdb6a853-sticker.png">](https://raw.githubusercontent.com/codestates-seb/seb41_main_024/readme/readmeImage/%EA%B9%80%EC%97%B0%EC%A3%BC.png)|[<img width="140px" height="140px" src="https://cdn.discordapp.com/attachments/1059639201731182705/1070204891747844106/5392d2c8940c52f0ebe0f02e4edd2d20-sticker.png">](https://raw.githubusercontent.com/codestates-seb/seb41_main_024/readme/readmeImage/%EB%B0%95%EC%A7%80%EC%9C%A4.png)|[<img width="140px" height="140px" src="https://cdn.discordapp.com/attachments/1059639201731182705/1070203285740458015/ee5b2ccd5d8e0f65e76a42869822cfee-sticker.png">](https://raw.githubusercontent.com/codestates-seb/seb41_main_024/readme/readmeImage/%EC%B5%9C%EC%A7%80%ED%98%84.png)|
|BE|BE|BE|
|[yeonzzoo](https://github.com/yeonzzoo)|[parkjiyun98](https://github.com/parkjiyun98)|[Aru-slave](https://github.com/Aru-slave)|

<br>

## 아키텍처
---
<img src="https://github.com/codestates-seb/seb41_main_024/blob/readme/readmeImage/Web_App_Reference_Architecture_3.png" />
<br>

## ERD
---
<img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/8a217a16-9f28-4b67-bebc-330be74c4288/ERD_ScreenShot.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230201%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230201T054605Z&X-Amz-Expires=86400&X-Amz-Signature=8b7f09fb32a834a3d8ffe5a968b0bbfc7c788488c14c3e6467ea5ac1c0375bd2&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22ERD%2520ScreenShot.png%22&x-id=GetObject">

## Ngether 사용 예시
---
<details markdown="1">
<br>
<summary><strong>회원가입 및 로그인, 마이페이지</strong></summary>
메인페이지
<br>
<img width="100%" src="https://raw.githubusercontent.com/codestates-seb/seb41_main_024/readme/readmeImage/appUserFlow/ngether.xyz_main.png" />
<br>
<br>
회원가입
<br>
<img width="100%" src="https://raw.githubusercontent.com/codestates-seb/seb41_main_024/readme/readmeImage/appUserFlow/signup.gif" />
<br>
<br>
로그인
<br>
<img width="100%" src="https://raw.githubusercontent.com/codestates-seb/seb41_main_024/readme/readmeImage/appUserFlow/login.gif" />
<br>
<br>
마이페이지
<br>
<img width="100%" src="https://raw.githubusercontent.com/codestates-seb/seb41_main_024/readme/readmeImage/appUserFlow/mypage.gif" />

</details>
<details markdown="1">
<summary><strong>게시물 등록, 검색, 수정</strong></summary>
<br>
<br>
게시물 등록
<br>
<img width="100%" src="https://raw.githubusercontent.com/codestates-seb/seb41_main_024/readme/readmeImage/appUserFlow/ngether.xyz_main.png" />
<br>
<br>
검색
<br>
<img width="100%" src="https://raw.githubusercontent.com/codestates-seb/seb41_main_024/readme/readmeImage/appUserFlow/nearby_search.gif" />
<br>
<br>
수정
<br>
<img width="100%" src="https://raw.githubusercontent.com/codestates-seb/seb41_main_024/readme/readmeImage/appUserFlow/nearby_edit.gif" />
<br>
<br>
삭제
<br>
<img width="100%" src="https://raw.githubusercontent.com/codestates-seb/seb41_main_024/readme/readmeImage/appUserFlow/nearby_delete.gif" />
</details>

<details markdown="1">
<summary><strong>주소록 등록, 나의 쉐어링, 찜</strong></summary>
<br>
<br>
주소록 등록
<br>
<img width="100%" src="https://raw.githubusercontent.com/codestates-seb/seb41_main_024/readme/readmeImage/appUserFlow/adress_post.gif" />
<br>
<br>
나의 쉐어링 
<br>
<img width="100%" src="https://raw.githubusercontent.com/codestates-seb/seb41_main_024/readme/readmeImage/appUserFlow/my_sharing.gif" />
<br>
<br>
1:1 문의 등록
<br>
<img width="100%" src="https://raw.githubusercontent.com/codestates-seb/seb41_main_024/readme/readmeImage/appUserFlow/post_qna.gif" />
</details>

<details markdown="1">
<summary><strong>채팅리스트, 채팅방</strong></summary>
<br>
<br>
채팅리스트, 채팅방
<br>
<img width="100%" src="https://github.com/codestates-seb/seb41_main_024/blob/readme/readmeImage/appUserFlow/chatting.gif" />
<br>
<br>
유저 강퇴 (방장일 시)
<br>
<img width="100%" src="https://raw.githubusercontent.com/codestates-seb/seb41_main_024/readme/readmeImage/appUserFlow/userBan.gif" />
<br>
<br>
강퇴당한 유저
<br>
<img width="100%" src="https://raw.githubusercontent.com/codestates-seb/seb41_main_024/readme/readmeImage/appUserFlow/userBanned.gif" />
<br>
<br>
강퇴당한 유저 해당 게시물 입장 시도시
<br>
<img width="100%" src="https://raw.githubusercontent.com/codestates-seb/seb41_main_024/readme/readmeImage/appUserFlow/afterBan.gif" />

</details>

<details markdown="1">
<summary><strong>관리자 페이지</strong></summary>
<br>
<br>
유저 신고 및 문의 처리
<br>
<img width="100%" src="https://raw.githubusercontent.com/codestates-seb/seb41_main_024/readme/readmeImage/appUserFlow/admin_page.gif" />
<br>
</details>

## git & github guide
---
<details markdown="1">
<summary><strong>branch</strong></summary>
<ul>
  <li>
    strategy
    <ul>
      <li>main브랜치에서 dev브랜치를 생성합니다. dev브랜치에서 feat브랜치를 생성 후 작업합니다.</li>
      <li>작업이 완료된 feat브랜치들은 dev브랜치에만 merge할 수 있습니다.</li>
      <li>배포 전 개발 완료된 dev브랜치를 main브랜치에 merge후 main브랜치를 배포합니다.</li>
    </ul>
  </li>
  <li>
    branch types
    <ul>
      <li>main : 배포 브랜치</li>
      <li>dev : 개발 브랜치</li>
      <li>feat/branchname : 기능 브랜치</li>
      <li>hotfix : 오류 또는 긴급 수정 브랜치</li>
    </ul>
  </li>
  <li>
    feat브랜치 name style
    <ul>
      <li>
        basic : 기능별로 브랜치를 생성하고, 1개의 브랜치는 1명의 사용자가 담당합니다.
        <pre>
feat/개발영역/기능명
feat/front/login
feat/back/login</pre>
      </li>
      <li>
        sub : 예외상황으로 1개의 브랜치에서 여러명이 작업할 경우 sub브랜치 생성 후 작업합니다.
        <pre>
feat/개발영역/기능명_sub_세부기능
feat/front/login_sub_sns
feat/back/login_sub_sns</pre>
       </li>
    </ul>
  </li>
</ul>
</details>

<details markdown="1">
<summary><strong>commit</strong></summary>
<ul>
  <li>
    structure
    <pre>
타입 - #이슈번호 : 제목
(공백줄)
상세 설명</pre>
  </li>
  <li>
    type
    <ul>
      <li>feat: A new feature</li>
      <li>fix: A bug fix</li>
      <li>docs: Changes to documentation</li>
      <li>style: Formatting, missing semi colons, etc; no code change</li>
      <li>refactor: Refactoring production code</li>
      <li>test: Adding tests, refactoring test; no production code change</li>
      <li>chore: Updating build tasks, package manager configs, etc; no production code change</li>
    </ul>
  </li>
  <li>
    example
    <pre>
feat - #1 : 로그인 html,css 완료
<br/>
공통 인풋 텍스트, 버튼 컴포넌트 적용</pre>
  </li>
</ul>
</details>
    
<details markdown="1">
<summary><strong>merge</strong></summary>
<ul>
  <li>github pull request를 사용해 merge합니다.</li>
  <li>front개발은 최소 front 1명을 리뷰어로, back개발은 최소 back 1명을 리뷰어로 pull request 합니다.</li>
  <li>front, back 같이 진행하는 개발은 최소 front,back 각 1명을 리뷰어로 pull request 합니다.</li>
</ul>
</details>

