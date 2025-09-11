"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { appointmentStore, type Appointment } from "@/lib/appointmentStore";

interface FutureAppointment extends Appointment {
  isHost: boolean;
  timeDisplay: string;
}

export default function MyAppointmentsPage() {
  const { user, isLoggedIn } = useAuth();
  const [appointments, setAppointments] = useState<FutureAppointment[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<FutureAppointment[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (user && isLoggedIn) {
      loadFutureAppointments();
    }
  }, [user, isLoggedIn]);

  useEffect(() => {
    // 검색어에 따라 필터링
    const filtered = appointments.filter(appointment =>
      appointment.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredAppointments(filtered);
  }, [appointments, searchQuery]);

  const loadFutureAppointments = () => {
    if (!user) return;

    const now = new Date();
    const allAppointments = appointmentStore.getAllAppointments();
    
    // 현재 사용자가 호스트이거나 참여자인 약속 중에서 미래 약속만 필터링
    const futureAppointments: FutureAppointment[] = allAppointments
      .filter(apt => {
        // 현재 사용자가 호스트이거나 참여자인 약속
        const isHost = apt.hostEmail === user.email;
        const isParticipant = apt.participants.includes(user.email);
        
        if (!isHost && !isParticipant) return false;

        // 미래 약속인지 확인
        const appointmentDateTime = new Date(`${apt.date}T${apt.startTime}`);
        return appointmentDateTime > now;
      })
      .map(apt => ({
        ...apt,
        isHost: apt.hostEmail === user.email,
        timeDisplay: `${apt.date} ${apt.startTime} - ${apt.endTime}`
      }))
      .sort((a, b) => {
        // 날짜순으로 정렬 (가까운 날짜부터)
        const dateA = new Date(`${a.date}T${a.startTime}`);
        const dateB = new Date(`${b.date}T${b.startTime}`);
        return dateA.getTime() - dateB.getTime();
      });

    setAppointments(futureAppointments);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-neutral-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-400 mb-4">로그인이 필요합니다</h1>
          <p className="text-neutral-300">약속 조회 페이지에 접근하려면 로그인해주세요.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">약속 조회</h1>
          <p className="text-xl text-neutral-300">
            <span className="text-blue-400">{user?.email.split('@')[0]}</span>님은 현재{' '}
            <span className="text-green-400 font-semibold">{appointments.length}건</span>의 약속이 예정되어 있습니다.
          </p>
        </div>

        {/* 검색창 */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="제목으로 검색하세요..."
              className="w-full bg-neutral-800 border border-neutral-600 rounded-lg px-4 py-3 pl-10 focus:outline-none focus:border-blue-500 transition-colors"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400">
              🔍
            </div>
          </div>
        </div>

        {/* 약속 목록 */}
        <div className="space-y-4">
          {filteredAppointments.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📅</div>
              <h3 className="text-xl font-semibold mb-2 text-neutral-300">
                {searchQuery ? '검색 결과가 없습니다' : '예정된 약속이 없습니다'}
              </h3>
              <p className="text-neutral-400">
                {searchQuery 
                  ? '다른 검색어로 시도해보세요' 
                  : '새로운 커피챗에 참여해보세요!'
                }
              </p>
            </div>
          ) : (
            filteredAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="bg-neutral-800 rounded-lg p-6 hover:bg-neutral-700 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{appointment.title}</h3>
                    <p className="text-neutral-300 text-sm mb-3">{appointment.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {appointment.isHost ? (
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        주최자
                      </span>
                    ) : (
                      <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        참여자
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="text-neutral-400">📍</span>
                    <span>{appointment.building} {appointment.floor}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-neutral-400">🕒</span>
                    <span>{appointment.timeDisplay}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-neutral-400">👥</span>
                    <span>
                      {appointment.isHost 
                        ? `참여자 ${appointment.participants.length}명`
                        : `주최자: ${appointment.hostNickname}`
                      }
                    </span>
                  </div>
                </div>

                {/* 추가 정보 */}
                <div className="mt-4 pt-4 border-t border-neutral-700">
                  <div className="flex items-center justify-between text-xs text-neutral-400">
                    <span>생성일: {new Date(appointment.createdAt).toLocaleDateString()}</span>
                    <span>ID: {appointment.id}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* 통계 정보 */}
        {appointments.length > 0 && (
          <div className="mt-8 bg-neutral-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">약속 현황</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">
                  {appointments.filter(apt => apt.isHost).length}
                </div>
                <div className="text-sm text-neutral-400">내가 주최한 약속</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">
                  {appointments.filter(apt => !apt.isHost).length}
                </div>
                <div className="text-sm text-neutral-400">참여한 약속</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">
                  {appointments.length}
                </div>
                <div className="text-sm text-neutral-400">총 예정 약속</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
