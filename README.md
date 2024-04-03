# RabbitHole - VR LMS 시스템

LMS는 학생들의 VR학습을 보조하고, 학습을 진행할 때, 교사가 개입할 수 있게 하는 **관리 및 지도**의 기능,

학생들의 학습을 설계하고 수업안을 제작하여, 맞춤형 수업을 가능하게 하는 **설계**,

학생들이 VR기기를 통해서 학습한 성적을 관리하고, 학습한 데이터를 관찰할 수 있게 하는 **성적 평가**의 기능을 포함하는 시스템 입니다.

</br>

관리 및 지도의 기능

- 모니터링 시스템
- 학생 제어 기능
- 학생 class 관리 기능

설계

- 수업 설계 기능
- 저장된 수업 조회 기능 (추후 개발)
- 게임 제작 기능 (추후 개발)
  
</br>

## 메인 기능 - 수업 실행 화면 (학생들의 VR화면 실시간 모니터링)

https://github.com/arky02/RabbitHole/assets/46954114/9ab57887-0e24-404d-b4ca-e225cc85c348

- 해당 수업 세션에 접속한 학생들의 유니티 VR 실시간 화면을 한번에 볼 수 있는 선생님용 화면입니다. WebRTC를 이용하여 구현하였습니다.
- socket 통신으로 학생들에게 해당 세션에서 다룰 수업안 자료를 선택하여 전송할 수 있으며, 해당 수업을 멈추거나 일시정지 할 수 있습니다.

</br>

## 로그인 화면
### test 계정 - 아이디: hello / 비밀번호: 00000
<img width="1680" alt="Screen Shot 2024-03-29 at 12 35 45 AM" src="https://github.com/arky02/RabbitHole/assets/46954114/11e7b019-24fb-4feb-b5b9-75877a2187b3">

</br>

## 메인 화면
<img width="1680" alt="Screen Shot 2024-03-29 at 12 35 58 AM" src="https://github.com/arky02/RabbitHole/assets/46954114/83f06a6b-ba3b-4359-ba21-55c8b0fada77">

</br>

## 수업 시작 대기 화면
<img width="1680" alt="Screen Shot 2024-03-29 at 12 39 14 AM" src="https://github.com/arky02/RabbitHole/assets/46954114/79777f61-41dc-449e-a4b0-554835ce4746">

</br>

## 기타 페이지 디자인
<img width="1680" alt="Screen Shot 2024-03-29 at 12 40 45 AM" src="https://github.com/arky02/RabbitHole/assets/46954114/8d4e6ae7-b8d9-47c9-b345-84613e693f15">
