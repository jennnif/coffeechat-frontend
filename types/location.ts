/**
 * Location Service 관련 타입 정의
 */

export interface LocationResponse {
  locationId: string;
  building: string;
  floor: string;
}

export interface LocationRequest {
  locationId: string;
  building: string;
  floor: string;
}
