// 약속 관리를 위한 메모리 기반 저장소
interface Appointment {
  id: string;
  title: string;
  description: string;
  building: string;
  floor: string;
  date: string;
  startTime: string;
  endTime: string;
  hostEmail: string;
  hostNickname: string;
  participants: string[];
  createdAt: string;
}

class AppointmentStore {
  private appointments: Appointment[] = [];
  private idCounter = 1;

  constructor() {
    this.loadAppointments();
  }

  // localStorage에서 약속 데이터 로드
  private loadAppointments() {
    if (typeof window !== 'undefined') {
      const savedAppointments = localStorage.getItem('coffeechat_appointments');
      const savedIdCounter = localStorage.getItem('coffeechat_idCounter');
      
      if (savedAppointments) {
        this.appointments = JSON.parse(savedAppointments);
      }
      if (savedIdCounter) {
        this.idCounter = parseInt(savedIdCounter);
      }
    }
  }

  // localStorage에 약속 데이터 저장
  private saveAppointments() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('coffeechat_appointments', JSON.stringify(this.appointments));
      localStorage.setItem('coffeechat_idCounter', this.idCounter.toString());
    }
  }

  // 약속 생성
  createAppointment(appointmentData: Omit<Appointment, 'id' | 'participants' | 'createdAt'>) {
    this.loadAppointments(); // 최신 데이터 로드
    
    const newAppointment: Appointment = {
      ...appointmentData,
      id: this.idCounter.toString(),
      participants: [],
      createdAt: new Date().toISOString()
    };
    
    this.appointments.push(newAppointment);
    this.idCounter++;
    
    this.saveAppointments(); // localStorage에 저장
    return newAppointment;
  }

  // 특정 사용자가 생성한 약속 조회
  getAppointmentsByHost(hostEmail: string): Appointment[] {
    this.loadAppointments(); // 최신 데이터 로드
    return this.appointments.filter(apt => apt.hostEmail === hostEmail);
  }

  // 특정 사용자가 참여한 약속 조회
  getAppointmentsByParticipant(userEmail: string): Appointment[] {
    this.loadAppointments(); // 최신 데이터 로드
    return this.appointments.filter(apt => apt.participants.includes(userEmail));
  }

  // 약속에 참여
  joinAppointment(appointmentId: string, userEmail: string): boolean {
    this.loadAppointments(); // 최신 데이터 로드
    
    const appointment = this.appointments.find(apt => apt.id === appointmentId);
    if (appointment && !appointment.participants.includes(userEmail)) {
      appointment.participants.push(userEmail);
      this.saveAppointments(); // localStorage에 저장
      return true;
    }
    return false;
  }

  // 모든 약속 조회
  getAllAppointments(): Appointment[] {
    this.loadAppointments(); // 최신 데이터 로드
    return [...this.appointments];
  }

  // 특정 건물/층의 약속 조회
  getAppointmentsByLocation(building: string, floor: string): Appointment[] {
    this.loadAppointments(); // 최신 데이터 로드
    return this.appointments.filter(apt => 
      apt.building === building && apt.floor === floor
    );
  }
}

// 싱글톤 인스턴스
export const appointmentStore = new AppointmentStore();
export type { Appointment };
