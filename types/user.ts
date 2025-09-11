/**
 * User Service 관련 타입 정의
 */

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface UserResponse {
  userId: string;
  isAdmin: boolean;
  username: string;
  nickname: string;
}

export interface UserCreateRequest {
  userId: string;      // KT 이메일 (@kt.com)
  username: string;    // 1-50자
  nickname: string;    // 1-50자
  password: string;    // 8자 이상
}

export interface UserLoginRequest {
  userId: string;
  password: string;
}

export interface NicknameGenerateRequest {
  // 닉네임 생성 요청 필드 (추후 백엔드 확인 후 추가)
  [key: string]: any;
}

export interface NicknameGenerateResponse {
  // 닉네임 생성 응답 필드 (추후 백엔드 확인 후 추가)
  [key: string]: any;
}
