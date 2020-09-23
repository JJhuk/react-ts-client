### 클라이언트

기술 스택

- React
    - Hook 사용할 것
- React Router
- Http client
    - KY : [https://github.com/sindresorhus/ky](https://github.com/sindresorhus/ky)
    - axios
    - fetch
    - superagent : [https://github.com/visionmedia/superagent](https://github.com/visionmedia/superagent)
- Typescript
- Eslint for typescript
- Reducx/Mobx
    - [https://github.com/mobxjs/mobx-react](https://github.com/mobxjs/mobx-react)
- React hook form
    - [https://react-hook-form.com/kr/](https://react-hook-form.com/kr/)
- UI 컴포넌트 라이브러리는 써도되고 안써도 무방함
    - [https://ant.design/](https://ant.design/) 추천

기술 요구사항

- 엑세스토큰이 만료되면 로그인 페이지로 이동 혹은 리프레시 토큰 할 것

사용자 요구사항

- 로그인 페이지 (이메일, 패스워드)
    - [x]  로그인 한 후 메인 페이지 이동 가능
    - [x]  회원가입 페이지로 이동 가능
    - [ ]  `로그인 유지하기` 체크박스를 통해 로그인 지속할지 여부 결정
- 회원 가입 페이지 (이름, 이메일, 패스워드 입력)
    - [x]  회원 가입 완료 시 바로 로그인 페이지로 이동
    - [x]  로그인 페이지로 이동 가능
- 메인 페이지
    - [x]  `{UserName} 안녕하세요!` 문구가 보임
    - [x]  로그아웃 할 수 있음
    - [x]  내 정보 보기로 이동 가능
    - [x]  현재 시간 및 날씨 정보 지속적으로 업데이트 될 것
        - 날씨 정보의 경우 아래 링크를 참고하여 서버를 경유하여 데이터를 가져올 것
        - [https://tagilog.tistory.com/354](https://tagilog.tistory.com/354)
- 내 정보 보기 페이지
    - [x]  유저의 가입 날짜와 이름, 이메일이 보임
    - [x]  이름에 대해서 편집이 가능해야함
    - [ ]  회원 탈퇴가 가능해야함
    - [x]  메인페이지로 이동 가능함
