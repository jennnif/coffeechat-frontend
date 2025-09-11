// localStorage 기반 사용자 저장소
interface User {
  email: string;
  password: string;
}

class UserStore {
  private users: User[] = [];

  constructor() {
    this.loadUsers();
  }

  // localStorage에서 사용자 데이터 로드
  private loadUsers() {
    if (typeof window !== 'undefined') {
      const savedUsers = localStorage.getItem('coffeechat_users');
      if (savedUsers) {
        this.users = JSON.parse(savedUsers);
      }
    }
  }

  // localStorage에 사용자 데이터 저장
  private saveUsers() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('coffeechat_users', JSON.stringify(this.users));
    }
  }

  // 회원가입
  signup(email: string, password: string): { success: boolean; message: string } {
    this.loadUsers(); // 최신 데이터 로드
    
    // 이미 존재하는 이메일인지 확인
    const existingUser = this.users.find(user => user.email === email);
    if (existingUser) {
      return { success: false, message: "이미 가입된 이메일입니다." };
    }

    // 새 사용자 추가
    this.users.push({ email, password });
    this.saveUsers(); // localStorage에 저장
    return { success: true, message: "회원가입이 완료되었습니다!" };
  }

  // 로그인
  login(email: string, password: string): { success: boolean; message: string } {
    this.loadUsers(); // 최신 데이터 로드
    
    const user = this.users.find(user => user.email === email);
    
    if (!user) {
      return { success: false, message: "가입된 정보가 없습니다." };
    }

    if (user.password !== password) {
      return { success: false, message: "비밀번호가 일치하지 않습니다." };
    }

    return { success: true, message: "로그인 되었습니다!" };
  }

  // 모든 사용자 조회 (디버깅용)
  getAllUsers(): User[] {
    this.loadUsers(); // 최신 데이터 로드
    return [...this.users];
  }
}

// 싱글톤 인스턴스
export const userStore = new UserStore();
