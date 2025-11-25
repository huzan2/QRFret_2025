# 2025 14FRET 정기공연 웹페이지

> **광운대학교 중앙밴드동아리 14FRET의 2025년도 정기공연 관람객을 위한 모바일 웹 서비스**  
> 실시간 티켓번호 발급, 셋리스트 열람 및 곡별 좋아요 기능, 익명 방명록 기능을 제공합니다.

### 프로젝트 소개

밴드 공연 행사에서 관람객들이 공연을 즐기는 데에 추가적인 재미 요소를 더해줄 수 있도록 좋아요, 방명록 등 직접 참여 가능한 기능을 추가하고, 중간 쉬는 시간에 진행하는 경품 추첨 행사를 위한 실시간 티켓번호 발급 기능을 추가한 페이지이다.

- 목표: 공연 당일 단기간에 몰리는 트래픽에도 안정적인 티켓번호 발급 및 상호작용 보장
- 주요 타겟: 모바일 기기를 통해 접속하는 관람객들
- 개발 기간: 2025.11.3~2025.11.11
- 배포 URL: https://qrfret2025.web.app/

### 사용 기술

| 분류                 |            기술             |
| -------------------- | :-------------------------: |
| **FrontEnd**         |   `React+Vite+TypeScript`   |
| **State Management** |          `Zustand`          |
| **Server Function**  |  `Firebase Cloud Function`  |
| **Database**         |    `Firestore Database`     |
| **Infra**            | `Firebase Hosting, Storage` |

### 주요 기능

1. **티켓 추첨 번호 발급**
   - 실시간 티켓번호 발급: 전화번호를 입력하여 추첨 번호를 발급받을 수 있음
   - 재접속 시 데이터 유지: `Zustand Persist` 및 `Browser Local Storage`에 티켓 정보를 저장하여 재접속 시에도 데이터 유지
   - 중복 발급 방지: 데이터베이스를 조회하여 기존에 입력된 번호의 경우 발급된 번호를 다시 가져옴
2. **인터렉티브 셋리스트**
   - 셋리스트 기본 기능: 공연 곡 목록 및 자작곡의 가사를 열람할 수 있음
   - 상호작용 요소: 각 곡별로 좋아요(하트)를 누를 수 있으며, 실시간으로 누적 좋아요 수가 집계됨
   - Optimistic UI: 좋아요 클릭 시 서버 응답을 기다리지 않고 UI를 즉시 업데이트하여 반응성 극대화
3. **익명 방명록**
   - 자유 방명록: 별도 가입 절차 없이 익명으로 방명록(메시지) 작성 가능
   - 자동 닉네임 부여: 누적 방명록 수에 따라 "익명 1", "익명 2"와 같이 서버에서 자동으로 순차적인 닉네임 부여
4. **관리자 페이지**
   - 관리자용 대시보드: 전체 티켓번호 발급 현황 및 방명록을 조회하고, 개별/전체 삭제 가능
   - 접근 방식 한정: URL을 통한 접근을 차단하고, 특정 제스처와 암호 입력을 통해서만 접근 가능하도록 구현

### 프로젝트 구조

```
├── functions/              # Firebase Cloud Functions (Server Function)
│   ├── src/
│   │   ├── index.ts        # API Endpoints (Transaction Logic)
│   │   └── types.ts        # Shared Types
│   └── ...
├── src/                    # React Client (Frontend)
│   ├── assets/             # Images & Icons
│   ├── components/         # Reusable Components
│   ├── hooks/              # Custom Hooks (API Logic separation)
│   ├── Pages/              # Page Components
│   ├── store/              # Zustand State Management
│   ├── styles/             # Global Styles
│   ├── types/              # Type Definitions
│   ├── App.tsx
│   ├── firebase.ts         # Firebase Initialization
│   ├── main.tsx
│   └── Routers.tsx         # Router Configuration
├── firebase.json           # Firebase Deploy Config
└── ...
```

### 페이지 화면

<p align="center">
<img width="45%" alt="Image" src="https://github-production-user-asset-6210df.s3.amazonaws.com/95648841/518649030-cdb338c1-8e0e-42e4-b9ff-53b77ddac52e.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20251125%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20251125T130332Z&X-Amz-Expires=300&X-Amz-Signature=9b56ea1df740f3e2d11ccc2d0a80132e59dfc166573ee1ae3ffe6ecf757719a5&X-Amz-SignedHeaders=host"/>
<img width="45%" alt="Image" src="https://github-production-user-asset-6210df.s3.amazonaws.com/95648841/518649902-4e6be0b9-2bef-458c-bbc7-a165a4013cd5.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20251125%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20251125T130437Z&X-Amz-Expires=300&X-Amz-Signature=c1665e417014a8afdfcd1d45abb5023487c1154be5a7b5f076c946ea5581517c&X-Amz-SignedHeaders=host"/>
<img width="45%" alt="Image" src="https://github-production-user-asset-6210df.s3.amazonaws.com/95648841/518651511-da6abd7f-0b5b-4a82-b214-42a5c9dd47ad.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20251125%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20251125T130752Z&X-Amz-Expires=300&X-Amz-Signature=47c879baf543582c8571ed723ab248206e670dfbb3d0ed0f81858e05a7c17450&X-Amz-SignedHeaders=host"/>
<img width="45%" alt="Image" src="https://github-production-user-asset-6210df.s3.amazonaws.com/95648841/518652019-c47a2826-fa20-4c7e-8911-414580797397.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20251125%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20251125T130855Z&X-Amz-Expires=300&X-Amz-Signature=4bfce782751f954d88a4d360143732b9db7d9a434fc1daa491f3aacc8df492fc&X-Amz-SignedHeaders=host"/>
<img width="45%" alt="Image" src="https://github-production-user-asset-6210df.s3.amazonaws.com/95648841/518652540-60c99b89-535e-4ec5-9b8c-5482dab3f5db.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20251125%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20251125T131010Z&X-Amz-Expires=300&X-Amz-Signature=fcda3bee08e33f1c211bf6c677afc33697fb34cfd315f2e23f7e152030866a42&X-Amz-SignedHeaders=host"/>
</p>

### 발생 이슈 및 트러블슈팅

1. **동시성 이슈**
   - 문제: 여러 사용자가 동시에 티켓 번호 발급이나 좋아요를 누를 경우 데이터베이스 내의 카운트가 덮어씌워지거나 누락되는 **Race Condition**이 발생할 가능성이 존재
   - 해결: 클라이언트에서 직접 DB를 수정하는 방식에서 **Firebase Cloud Function**을 통해 트랜잭션을 실행하는 방식으로 변경. 이를 통해 요청이 여러개 들어와도 데이터베이스 레벨에서 순차적 처리를 보장하여 데이터 무결성 확보
2. **좋아요 기능 반응속도 이슈**
   - 문제: 서버 딜레이로 인해 좋아요(하트)버튼 클릭시 UI 반응이 느림
   - 해결: 좋아요 버튼 클릭시 UI를 먼저 변경하고, 요청 발송 및 처리는 비동기적으로 수행. 요청 실패 시 UI를 원래대로 롤백하는 로직을 구현하여 UX와 신뢰성 모두 향상
