/**
 * User Service API 클라이언트
 */

import { request } from './api';
import type {
  ApiResponse,
  UserResponse,
  UserCreateRequest,
  UserLoginRequest,
  NicknameGenerateRequest,
  NicknameGenerateResponse,
} from '../types/user';

/**
 * 모든 사용자 조회
 * GET /users
 */
export async function getAllUsers(): Promise<ApiResponse<UserResponse[]>> {
  return request<ApiResponse<UserResponse[]>>('/users');
}

/**
 * 사용자 등록
 * POST /users
 */
export async function createUser(userData: UserCreateRequest): Promise<ApiResponse<UserResponse>> {
  return request<ApiResponse<UserResponse>>('/users', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
}

/**
 * 특정 사용자 조회
 * GET /users/{userId}
 */
export async function getUser(userId: string): Promise<ApiResponse<UserResponse>> {
  return request<ApiResponse<UserResponse>>(`/users/${encodeURIComponent(userId)}`);
}

/**
 * 사용자 삭제
 * DELETE /users/{userId}
 */
export async function deleteUser(userId: string): Promise<ApiResponse<void>> {
  return request<ApiResponse<void>>(`/users/${encodeURIComponent(userId)}`, {
    method: 'DELETE',
  });
}

/**
 * 로그인
 * POST /users/login
 */
export async function login(loginData: UserLoginRequest): Promise<ApiResponse<UserResponse>> {
  return request<ApiResponse<UserResponse>>('/users/login', {
    method: 'POST',
    body: JSON.stringify(loginData),
  });
}

/**
 * 로그아웃
 * POST /users/logout
 */
export async function logout(userId: string): Promise<ApiResponse<void>> {
  return request<ApiResponse<void>>(`/users/logout?userId=${encodeURIComponent(userId)}`, {
    method: 'POST',
  });
}

/**
 * 닉네임 생성
 * POST /users/nickname/generate
 */
export async function generateNickname(
  requestData: NicknameGenerateRequest
): Promise<ApiResponse<NicknameGenerateResponse>> {
  return request<ApiResponse<NicknameGenerateResponse>>('/users/nickname/generate', {
    method: 'POST',
    body: JSON.stringify(requestData),
  });
}
