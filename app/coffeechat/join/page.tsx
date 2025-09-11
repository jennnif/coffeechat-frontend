"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { appointmentStore } from "@/lib/appointmentStore";

interface Building {
  id: string;
  name: string;
  floors: { floor: number; appointmentCount: number }[];
}

const buildingNames = [
  { id: "gwanghwamun", name: "광화문" },
  { id: "pangyo", name: "판교" },
  { id: "umyeon", name: "우면" },
  { id: "bundang", name: "분당" }
];

const allFloors = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

export default function JoinCoffeeChatPage() {
  const [hoveredBuilding, setHoveredBuilding] = useState<string | null>(null);
  const [buildings, setBuildings] = useState<Building[]>([]);
  const router = useRouter();

  // 실제 약속 데이터를 기반으로 건물별 층별 약속 수 계산
  useEffect(() => {
    const updateBuildings = () => {
      const allAppointments = appointmentStore.getAllAppointments();
      
      const buildingsData = buildingNames.map(building => {
        const floors = allFloors.map(floor => {
          const appointments = allAppointments.filter(apt => 
            apt.building === building.id && apt.floor === `${floor}층`
          );
          return {
            floor,
            appointmentCount: appointments.length
          };
        }).filter(floor => floor.appointmentCount > 0); // 약속이 있는 층만 표시

        return {
          id: building.id,
          name: building.name,
          floors
        };
      });

      setBuildings(buildingsData);
    };

    updateBuildings();
    
    // 페이지가 포커스될 때마다 데이터 새로고침 (약속 생성 후 돌아올 때)
    const handleFocus = () => updateBuildings();
    window.addEventListener('focus', handleFocus);
    
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const handleFloorSelect = (buildingId: string, buildingName: string, floor: number) => {
    router.push(`/coffeechat/join/${buildingId}/${floor}?name=${encodeURIComponent(buildingName)}`);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">커피챗 참여하기</h1>
          <p className="text-xl text-neutral-300">
            원하는 건물을 선택하고 층을 골라 커피챗에 참여해보세요
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {buildings.length > 0 ? buildings.map((building) => (
            <div
              key={building.id}
              className="relative"
              onMouseEnter={() => setHoveredBuilding(building.id)}
              onMouseLeave={() => setHoveredBuilding(null)}
            >
              {/* 건물 카드 */}
              <div className="bg-neutral-800 rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:bg-neutral-700 hover:scale-105">
                <div className="text-center">
                  {/* 건물 아이콘 */}
                  <div className="w-20 h-32 bg-gradient-to-b from-blue-500 to-blue-700 rounded-lg mx-auto mb-4 flex items-end justify-center relative">
                    <div className="absolute inset-0 bg-neutral-200 opacity-20 rounded-lg"></div>
                    <div className="text-4xl mb-2">🏢</div>
                  </div>
                  <h3 className="text-xl font-semibold">{building.name}</h3>
                  <p className="text-sm text-neutral-400 mt-2">
                    {building.floors.reduce((sum, floor) => sum + floor.appointmentCount, 0)}개의 커피챗
                  </p>
                </div>
              </div>

              {/* 층별 모달 (호버 시 표시) */}
              {hoveredBuilding === building.id && (
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-80 rounded-2xl flex items-center justify-center z-10">
                  <div className="bg-neutral-800 rounded-xl p-6 w-full mx-4">
                    <h4 className="text-lg font-semibold mb-4 text-center">{building.name} - 층 선택</h4>
                    <div className="space-y-3">
                      {building.floors.map((floorData) => (
                        <button
                          key={floorData.floor}
                          onClick={() => handleFloorSelect(building.id, building.name, floorData.floor)}
                          className="w-full bg-neutral-700 hover:bg-blue-600 rounded-lg p-3 transition-colors flex justify-between items-center"
                        >
                          <span>{floorData.floor}층</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-neutral-300">
                              {floorData.appointmentCount}개
                            </span>
                            {Array.from({ length: floorData.appointmentCount }).map((_, i) => (
                              <div key={i} className="w-2 h-2 bg-blue-400 rounded-full"></div>
                            ))}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )) : (
            <div className="col-span-full text-center py-12">
              <p className="text-neutral-400">현재 진행 중인 커피챗이 없습니다.</p>
            </div>
          )}
        </div>

        {/* 안내 텍스트 */}
        <div className="text-center mt-12">
          <p className="text-neutral-400">
            건물에 마우스를 올려 층별 커피챗 현황을 확인하세요
          </p>
        </div>
      </div>
    </div>
  );
}