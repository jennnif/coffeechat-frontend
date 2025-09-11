/**
 * Location Service API 클라이언트
 */

import { request } from './api';
import type { LocationResponse, LocationRequest } from '../types/location';

/**
 * 모든 위치 조회
 * GET /locations
 */
export async function getAllLocations(): Promise<LocationResponse[]> {
  return request<LocationResponse[]>('/locations');
}

/**
 * 특정 위치 조회
 * GET /locations/{locationId}
 */
export async function getLocationById(locationId: string): Promise<LocationResponse> {
  return request<LocationResponse>(`/locations/${encodeURIComponent(locationId)}`);
}

/**
 * 위치 생성
 * POST /locations
 */
export async function createLocation(locationData: LocationRequest): Promise<LocationResponse> {
  return request<LocationResponse>('/locations', {
    method: 'POST',
    body: JSON.stringify(locationData),
  });
}

/**
 * 위치 삭제
 * DELETE /locations/{locationId}
 */
export async function deleteLocation(locationId: string): Promise<void> {
  return request<void>(`/locations/${encodeURIComponent(locationId)}`, {
    method: 'DELETE',
  });
}
