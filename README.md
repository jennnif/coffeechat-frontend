# Coffee Chat Admin Frontend

Next.js 14 + TypeScript + Tailwind로 구축된 MSA 백엔드 관리형 프론트엔드입니다.

## 기능

- **사용자 관리**: 사용자 생성, 수정, 삭제, 관리자 권한 설정
- **약속 관리**: 약속 생성, 수정, 삭제, 상태 관리 (예정/취소/완료)
- **게스트 관리**: 게스트 참석 상태 관리 (참석 예정/참석/불참)
- **장소 관리**: 약속 장소 관리

## 기술 스택

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- date-fns

## 설치 및 실행

1. 의존성 설치:
```bash
npm install
```

2. 환경 변수 설정:
`.env.local` 파일에 실제 API 서비스 URL을 설정하세요:
```
USER_API=https://your-user-service-url
APPOINTMENT_API=https://your-appointment-service-url
GUEST_API=https://your-guest-service-url
LOCATION_API=https://your-location-service-url
```

3. 개발 서버 실행:
```bash
npm run dev
```

4. 브라우저에서 `http://localhost:3000` 접속

## API 프록시

모든 API 호출은 Next.js rewrites를 통해 프록시됩니다:
- `/api/users/*` → `USER_API/*`
- `/api/appointments/*` → `APPOINTMENT_API/*`
- `/api/guest/*` → `GUEST_API/*`
- `/api/locations/*` → `LOCATION_API/*`

## 프로젝트 구조

```
├── app/
│   ├── globals.css          # 전역 스타일
│   ├── layout.tsx           # 루트 레이아웃
│   ├── page.tsx             # 대시보드
│   ├── users/               # 사용자 관리
│   ├── appointments/        # 약속 관리
│   ├── guests/              # 게스트 관리
│   └── locations/           # 장소 관리
├── lib/
│   ├── types.ts             # 타입 정의
│   ├── api.ts               # API 유틸리티
│   └── format.ts            # 포맷 유틸리티
└── components/              # 재사용 컴포넌트
```

## 주요 특징

- **반응형 디자인**: Tailwind CSS를 사용한 모바일 친화적 UI
- **타입 안전성**: TypeScript로 타입 안전한 개발
- **API 프록시**: CORS 문제 해결을 위한 Next.js rewrites 활용
- **에러 처리**: 사용자 친화적인 에러 메시지
- **로딩 상태**: 데이터 로딩 중 사용자 피드백
