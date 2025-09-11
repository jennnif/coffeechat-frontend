"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { appointmentStore } from "@/lib/appointmentStore";
import { useAuth } from "@/contexts/AuthContext";

interface Appointment {
  id: string;
  title: string;
  location: string;
  time: string;
  startTime: string;
  endTime: string;
  hostNickname: string;
  description: string;
}

// 실제 저장된 약속 데이터에서 해당 층의 약속들을 가져오기
const getAppointmentsByFloor = (building: string, floor: number): Appointment[] => {
  const allAppointments = appointmentStore.getAppointmentsByLocation(building, `${floor}층`);
  
  return allAppointments.map(apt => ({
    id: apt.id,
    title: apt.title,
    location: `${building} ${apt.floor}`,
    time: `${apt.date} ${apt.startTime} - ${apt.endTime}`,
    startTime: apt.startTime,
    endTime: apt.endTime,
    hostNickname: apt.hostNickname,
    description: apt.description
  }));
};

export default function FloorAppointmentsPage({ 
  params 
}: { 
  params: { building: string; floor: string } 
}) {
  const { user } = useAuth();
  const floorNumber = parseInt(params.floor);
  const floorAppointments = getAppointmentsByFloor(params.building, floorNumber);
  
  const [appointments, setAppointments] = useState<Appointment[]>(floorAppointments);
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>(floorAppointments);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const buildingName = searchParams.get("name") || params.building;

  useEffect(() => {
    // 검색어에 따라 필터링
    const filtered = appointments.filter(appointment =>
      appointment.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredAppointments(filtered);
  }, [searchQuery, appointments]);

  const handleBack = () => {
    router.back();
  };

  const handleJoinAppointment = () => {
    if (selectedAppointment && user) {
      const success = appointmentStore.joinAppointment(selectedAppointment.id, user.email);
      
      if (success) {
        alert("커피챗 참여가 완료되었습니다!");
        setSelectedAppointment(null);
        router.push("/profile");
      } else {
        alert("참여에 실패했습니다. 다시 시도해주세요.");
      }
    } else if (!user) {
      alert("로그인이 필요합니다.");
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* 헤더 */}
        <div className="flex items-center mb-8">
          <button 
            onClick={handleBack}
            className="mr-4 p-2 hover:bg-neutral-800 rounded-lg transition-colors"
          >
            ←
          </button>
          <div>
            <h1 className="text-3xl font-bold">
              {buildingName} {params.floor}층
            </h1>
            <p className="text-neutral-400 mt-2">
              현재 '{buildingName} {params.floor}층'에 예정되어 있는 약속의 갯수는 {filteredAppointments.length}개 입니다
            </p>
          </div>
        </div>

        {/* 검색창 */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="약속 제목으로 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {/* 약속 리스트 */}
        <div className="space-y-4">
          {filteredAppointments.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-neutral-400">검색 결과가 없습니다.</p>
            </div>
          ) : (
            filteredAppointments.map((appointment) => (
              <div
                key={appointment.id}
                onClick={() => setSelectedAppointment(appointment)}
                className="bg-neutral-800 rounded-lg p-6 cursor-pointer hover:bg-neutral-700 transition-colors"
              >
                <h3 className="text-xl font-semibold mb-2">{appointment.title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-neutral-300">
                  <div>
                    <span className="text-neutral-400">위치:</span> {appointment.location}
                  </div>
                  <div>
                    <span className="text-neutral-400">시간:</span> {appointment.time}
                  </div>
                  <div>
                    <span className="text-neutral-400">주최자:</span> {appointment.hostNickname}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* 약속 상세 팝업 */}
        {selectedAppointment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-neutral-800 rounded-2xl p-8 max-w-md w-full">
              <h2 className="text-2xl font-bold mb-6">{selectedAppointment.title}</h2>
              
              <div className="space-y-4 mb-8">
                <div>
                  <span className="text-neutral-400">위치:</span>
                  <p className="text-white">{selectedAppointment.location}</p>
                </div>
                <div>
                  <span className="text-neutral-400">시간:</span>
                  <p className="text-white">{selectedAppointment.time}</p>
                </div>
                <div>
                  <span className="text-neutral-400">주최자:</span>
                  <p className="text-white">{selectedAppointment.hostNickname}</p>
                </div>
                <div>
                  <span className="text-neutral-400">설명:</span>
                  <p className="text-white">{selectedAppointment.description}</p>
                </div>
              </div>

              <div className="text-center mb-6">
                <p className="text-lg">참여하시겠습니까?</p>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleJoinAppointment}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  넹
                </button>
                <button
                  onClick={() => setSelectedAppointment(null)}
                  className="flex-1 bg-neutral-600 hover:bg-neutral-500 px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  딴 거
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
