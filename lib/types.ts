export type ID = string | number;

export type User = {
  user_id: string;
  username?: string;
  nickname?: string;
  is_admin?: boolean;
  // password는 입력용만 사용
  [k: string]: any;
};

export type LocationItem = {
  location_id: string;
  name?: string;
  [k: string]: any;
};

export type AppointmentStatus = "scheduled" | "cancelled" | "completed" | string;

export type Appointment = {
  appointment_id: number;
  host_id: string;
  title?: string;
  description?: string;
  start_time: string; // ISO or 'YYYY-MM-DDTHH:mm'
  end_time: string;
  location_id: string;
  appointment_status?: AppointmentStatus;
  [k: string]: any;
};

export type GuestStatus = "coming" | "came" | "no_show";

export type Guest = {
  guest_id: string;
  appointment_id: number;
  user_id?: string;
  guest_status: GuestStatus;
  [k: string]: any;
};

export type ApiError = { status: number; message: string };
