"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { appointmentStore } from "@/lib/appointmentStore";

interface NewAppointment {
  title: string;
  description: string;
  building: string;
  floor: string;
  date: string;
  startTime: string;
  endTime: string;
}

const buildings = [
  { id: "gwanghwamun", name: "광화문" },
  { id: "pangyo", name: "판교" },
  { id: "umyeon", name: "우면" },
  { id: "bundang", name: "분당" }
];

const floors = [
  "3층", "4층", "5층", "6층", "7층", "8층", "9층", "10층", 
  "11층", "12층", "13층", "14층", "15층", "16층", "17층"
];

export default function CreateCoffeeChatPage() {
  const { user, isLoggedIn } = useAuth();
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState<NewAppointment>({
    title: "",
    description: "",
    building: "",
    floor: "",
    date: "",
    startTime: "",
    endTime: ""
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-neutral-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-400 mb-4">로그인이 필요합니다</h1>
          <p className="text-neutral-300">약속을 생성하려면 로그인해주세요.</p>
        </div>
      </div>
    );
  }

  const handleInputChange = (field: keyof NewAppointment, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.title.trim()) newErrors.title = "제목을 입력해주세요.";
    if (!formData.description.trim()) newErrors.description = "소개글을 입력해주세요.";
    if (!formData.building) newErrors.building = "건물을 선택해주세요.";
    if (!formData.floor) newErrors.floor = "층을 선택해주세요.";
    if (!formData.date) newErrors.date = "날짜를 선택해주세요.";
    if (!formData.startTime) newErrors.startTime = "시작 시간을 선택해주세요.";
    if (!formData.endTime) newErrors.endTime = "끝 시간을 선택해주세요.";
    
    // 시작 시간과 끝 시간 비교
    if (formData.startTime && formData.endTime && formData.startTime >= formData.endTime) {
      newErrors.endTime = "끝 시간은 시작 시간보다 늦어야 합니다.";
    }

    // 소개글 줄 수 체크 (3줄 이내)
    const lines = formData.description.split('\n').length;
    if (lines > 3) newErrors.description = "소개글은 3줄 이내로 작성해주세요.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    // 약속 생성 로직
    const buildingName = buildings.find(b => b.id === formData.building)?.name || formData.building;
    
    appointmentStore.createAppointment({
      title: formData.title,
      description: formData.description,
      building: formData.building,
      floor: formData.floor,
      date: formData.date,
      startTime: formData.startTime,
      endTime: formData.endTime,
      hostEmail: user!.email,
      hostNickname: user!.email.split('@')[0] // 이메일의 @ 앞부분을 닉네임으로 사용
    });

    setShowSuccess(true);
  };

  const handleBack = () => {
    router.push("/");
  };

  const goToMyPage = () => {
    setShowSuccess(false);
    router.push("/profile");
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">커피챗 생성하기</h1>
          <p className="text-neutral-400">
            새로운 커피챗을 만들어 동료들과 소통해보세요
          </p>
        </div>

        {/* 폼 */}
        <div className="bg-neutral-800 rounded-2xl p-8">
          <div className="space-y-6">
            {/* 제목 */}
            <div>
              <label className="block text-sm font-medium mb-2">제목</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="커피챗 제목을 입력하세요"
                className="w-full bg-neutral-700 border border-neutral-600 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
              />
              {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title}</p>}
            </div>

            {/* 소개글 */}
            <div>
              <label className="block text-sm font-medium mb-2">소개글 (3줄 이내)</label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="커피챗에 대한 간단한 소개를 작성해주세요"
                rows={3}
                className="w-full bg-neutral-700 border border-neutral-600 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors resize-none"
              />
              {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description}</p>}
            </div>

            {/* 커피챗 위치 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 건물 선택 */}
              <div>
                <label className="block text-sm font-medium mb-2">건물</label>
                <select
                  value={formData.building}
                  onChange={(e) => handleInputChange("building", e.target.value)}
                  className="w-full bg-neutral-700 border border-neutral-600 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                >
                  <option value="">건물을 선택하세요</option>
                  {buildings.map((building) => (
                    <option key={building.id} value={building.id}>
                      {building.name}
                    </option>
                  ))}
                </select>
                {errors.building && <p className="text-red-400 text-sm mt-1">{errors.building}</p>}
              </div>

              {/* 층 선택 */}
              <div>
                <label className="block text-sm font-medium mb-2">층</label>
                <select
                  value={formData.floor}
                  onChange={(e) => handleInputChange("floor", e.target.value)}
                  className="w-full bg-neutral-700 border border-neutral-600 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                >
                  <option value="">층을 선택하세요</option>
                  {floors.map((floor) => (
                    <option key={floor} value={floor}>
                      {floor}
                    </option>
                  ))}
                </select>
                {errors.floor && <p className="text-red-400 text-sm mt-1">{errors.floor}</p>}
              </div>
            </div>

            {/* 커피챗 시간 */}
            <div className="space-y-4">
              {/* 날짜 선택 */}
              <div>
                <label className="block text-sm font-medium mb-2">날짜</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full bg-neutral-700 border border-neutral-600 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                />
                {errors.date && <p className="text-red-400 text-sm mt-1">{errors.date}</p>}
              </div>

              {/* 시간 선택 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 시작 시간 */}
                <div>
                  <label className="block text-sm font-medium mb-2">시작 시간</label>
                  <input
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => handleInputChange("startTime", e.target.value)}
                    className="w-full bg-neutral-700 border border-neutral-600 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                  {errors.startTime && <p className="text-red-400 text-sm mt-1">{errors.startTime}</p>}
                </div>

                {/* 끝 시간 */}
                <div>
                  <label className="block text-sm font-medium mb-2">끝 시간</label>
                  <input
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => handleInputChange("endTime", e.target.value)}
                    className="w-full bg-neutral-700 border border-neutral-600 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                  {errors.endTime && <p className="text-red-400 text-sm mt-1">{errors.endTime}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 버튼들 */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handleBack}
            className="bg-neutral-600 hover:bg-neutral-500 px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            뒤로가기
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            생성하기
          </button>
        </div>

        {/* 성공 팝업 */}
        {showSuccess && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-neutral-800 rounded-2xl p-8 max-w-md w-full text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold mb-4 text-green-400">약속이 생성되었습니다!</h2>
              <p className="text-neutral-300 mb-8">
                커피챗이 성공적으로 생성되었습니다. 
                다른 동료들이 참여할 수 있도록 공유해보세요!
              </p>
              <button
                onClick={goToMyPage}
                className="w-full bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                마이페이지에서 확인하기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
