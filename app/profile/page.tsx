"use client";
import { useAuth } from "@/contexts/AuthContext";
import { appointmentStore, type Appointment } from "@/lib/appointmentStore";
import { useState, useEffect } from "react";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [myAppointments, setMyAppointments] = useState<Appointment[]>([]);
  const [joinedAppointments, setJoinedAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    if (user) {
      const hosted = appointmentStore.getAppointmentsByHost(user.email);
      const joined = appointmentStore.getAppointmentsByParticipant(user.email);
      setMyAppointments(hosted);
      setJoinedAppointments(joined);
    }
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-400 mb-4">로그인이 필요합니다</h1>
          <p className="text-neutral-300">마이페이지에 접근하려면 로그인해주세요.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-neutral-800 rounded-2xl p-8">
          <h1 className="text-3xl font-bold mb-8">마이페이지</h1>
          
          <div className="space-y-6">
            <div className="bg-neutral-700 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">사용자 정보</h2>
              <div className="space-y-2">
                <p><span className="text-neutral-400">이메일:</span> {user.email}</p>
                <p><span className="text-neutral-400">가입일:</span> {new Date().toLocaleDateString()}</p>
              </div>
            </div>

            <div className="bg-neutral-700 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">내 커피챗 현황</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">{myAppointments.length}</div>
                  <div className="text-sm text-neutral-400">내가 생성한 커피챗</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{joinedAppointments.length}</div>
                  <div className="text-sm text-neutral-400">참여한 커피챗</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">{myAppointments.length + joinedAppointments.length}</div>
                  <div className="text-sm text-neutral-400">총 커피챗</div>
                </div>
              </div>
            </div>

            {/* 내가 생성한 커피챗 목록 */}
            <div className="bg-neutral-700 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">내가 생성한 커피챗</h2>
              {myAppointments.length === 0 ? (
                <p className="text-neutral-400 text-center py-8">생성한 커피챗이 없습니다.</p>
              ) : (
                <div className="space-y-4">
                  {myAppointments.map((appointment) => (
                    <div key={appointment.id} className="bg-neutral-600 rounded-lg p-4">
                      <h3 className="font-semibold text-lg mb-2">{appointment.title}</h3>
                      <p className="text-neutral-300 text-sm mb-3">{appointment.description}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-neutral-400">위치:</span> {appointment.building} {appointment.floor}
                        </div>
                        <div>
                          <span className="text-neutral-400">날짜:</span> {appointment.date}
                        </div>
                        <div>
                          <span className="text-neutral-400">시간:</span> {appointment.startTime} - {appointment.endTime}
                        </div>
                        <div>
                          <span className="text-neutral-400">참여자:</span> {appointment.participants.length}명
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 참여한 커피챗 목록 */}
            <div className="bg-neutral-700 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">참여한 커피챗</h2>
              {joinedAppointments.length === 0 ? (
                <p className="text-neutral-400 text-center py-8">참여한 커피챗이 없습니다.</p>
              ) : (
                <div className="space-y-4">
                  {joinedAppointments.map((appointment) => (
                    <div key={appointment.id} className="bg-neutral-600 rounded-lg p-4">
                      <h3 className="font-semibold text-lg mb-2">{appointment.title}</h3>
                      <p className="text-neutral-300 text-sm mb-3">{appointment.description}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-neutral-400">주최자:</span> {appointment.hostNickname}
                        </div>
                        <div>
                          <span className="text-neutral-400">위치:</span> {appointment.building} {appointment.floor}
                        </div>
                        <div>
                          <span className="text-neutral-400">날짜:</span> {appointment.date}
                        </div>
                        <div>
                          <span className="text-neutral-400">시간:</span> {appointment.startTime} - {appointment.endTime}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-neutral-700 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">계정 관리</h2>
              <div className="space-y-4">
                <button className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors">
                  프로필 수정
                </button>
                <button className="w-full bg-neutral-600 hover:bg-neutral-500 px-4 py-2 rounded-lg transition-colors">
                  비밀번호 변경
                </button>
                <button 
                  onClick={logout}
                  className="w-full bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
                >
                  로그아웃
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
