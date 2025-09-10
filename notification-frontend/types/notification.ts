/**
 * Notification Service 관련 타입 정의
 */

export type GuestStatus = "coming" | "came" | "no_show";

export interface NotificationDto {
  notification_id?: string;
  user_id?: string;
  appointment_id?: string;
  guest_id?: string;
  notification_time?: string;
}

export interface CreateNotificationRequest {
  user_id: string;
  appointment_id: string;
  guest_id: string;
  notification_time: string; // "YYYY-MM-DDTHH:mm:ss" 형식
}

export interface UpdateGuestStatusRequest {
  guest_status: GuestStatus;
}

export interface UpdateGuestStatusResponse {
  appointment_id: string;
  guest_id: string;
  guest_status: GuestStatus;
}
