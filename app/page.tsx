"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LoginSignupModal from "@/components/LoginSignupModal";
import { useAuth } from "@/contexts/AuthContext";

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"login" | "signup">("login");
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  const handleServiceStart = () => {
    if (isLoggedIn) {
      router.push("/coffeechat/join");
    } else {
      setModalMode("signup");
      setIsModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <h1 className="text-2xl lg:text-5xl font-bold" style={{ lineHeight: '1.2' }}>
              소통이 필요한 당신을 위한{" "}
              <span className="text-blue-500">가장 완벽한 서비스</span>,{" "}
              <span className="text-blue-400">koffee-konnect</span>
            </h1>
            <p className="text-xl text-neutral-300 leading-relaxed">
              사내 동료들과 자연스러운 소통의 시간을 만들어보세요.
              <br />
              커피 한 잔으로 시작되는 새로운 인연의 기회를 발견하세요.
            </p>
            <div className="flex space-x-4">
              <button 
                onClick={handleServiceStart}
                className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
              >
                서비스 시작하기
              </button>
              <button className="border border-neutral-600 hover:border-neutral-500 px-8 py-3 rounded-lg text-lg font-semibold transition-colors flex items-center space-x-2">
                <span>더 알아보기</span>
              </button>
            </div>
          </div>

          {/* Right Content - Coffee Icon */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-96 h-96 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <div className="text-8xl">☕</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="bg-neutral-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold text-neutral-300">
              Trusted by <span className="text-blue-400">500+</span> companies worldwide
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center opacity-60">
            <div className="text-center text-2xl font-bold text-neutral-400">Samsung</div>
            <div className="text-center text-2xl font-bold text-neutral-400">LG</div>
            <div className="text-center text-2xl font-bold text-neutral-400">SK</div>
            <div className="text-center text-2xl font-bold text-neutral-400">Kakao</div>
            <div className="text-center text-2xl font-bold text-neutral-400">Naver</div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content - Coffee Icon 2 */}
          <div className="flex justify-center lg:justify-start">
            <div className="w-96 h-96 bg-gradient-to-br from-orange-500 to-pink-600 rounded-full flex items-center justify-center">
              <div className="text-8xl">🫖</div>
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-8">
            <h2 className="text-4xl font-bold">커피챗의 놀라운 효과</h2>
            <p className="text-xl text-neutral-300">
              간단한 커피 한 잔으로 시작되는 의미 있는 변화를 경험해보세요.
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 p-3 rounded-lg">
                  <span className="text-2xl">🤝</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">팀워크 향상</h3>
                  <p className="text-neutral-300">자연스러운 대화를 통해 동료들과 더 깊은 유대감을 형성하세요.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 p-3 rounded-lg">
                  <span className="text-2xl">💡</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">창의적 아이디어 발굴</h3>
                  <p className="text-neutral-300">편안한 분위기에서 새로운 아이디어와 관점을 공유하고 발전시키세요.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 p-3 rounded-lg">
                  <span className="text-2xl">🌟</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">업무 만족도 증가</h3>
                  <p className="text-neutral-300">소통이 활발한 조직에서 더 높은 업무 만족도를 경험하세요.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-neutral-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-semibold text-blue-400 tracking-wide uppercase">TESTIMONIALS</h2>
            <h3 className="text-4xl font-bold mt-2">사용자들의 생생한 후기</h3>
            <p className="text-xl text-neutral-300 mt-4">
              커피챗을 통해 변화를 경험한 동료들의 이야기를 들어보세요.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* 카드 1 */}
            <div className="bg-neutral-800 p-8 rounded-lg">
              <p className="text-lg mb-6 text-neutral-300">
                "처음엔 어색했지만 커피챗을 통해 다른 부서 동료들과 친해질 수 있었어요.
                이제는 업무 협업도 훨씬 수월해졌습니다!"
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-xl">👩‍💼</div>
                <div>
                  <div className="font-semibold">김민지</div>
                  <div className="text-sm text-neutral-400">마케팅팀 과장</div>
                </div>
              </div>
            </div>

            {/* 카드 2 */}
            <div className="bg-neutral-800 p-8 rounded-lg">
              <p className="text-lg mb-6 text-neutral-300">
                "매주 정기적인 커피챗으로 팀 분위기가 정말 좋아졌어요.
                간단한 만남이지만 큰 변화를 가져다주었습니다."
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-xl">👨‍💻</div>
                <div>
                  <div className="font-semibold">박준혁</div>
                  <div className="text-sm text-neutral-400">개발팀 팀장</div>
                </div>
              </div>
            </div>

            {/* 카드 3 */}
            <div className="bg-neutral-800 p-8 rounded-lg">
              <p className="text-lg mb-6 text-neutral-300">
                "신입 직원으로서 커피챗이 정말 도움이 되었어요.
                선배들과 자연스럽게 대화하며 회사 문화를 빠르게 적응할 수 있었습니다."
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-xl">👨‍🎓</div>
                <div>
                  <div className="font-semibold">이수현</div>
                  <div className="text-sm text-neutral-400">기획팀 사원</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-600 rounded-2xl p-12 text-center">
            <h2 className="text-4xl font-bold mb-4">지금 바로 시작해보세요!</h2>
            <p className="text-xl mb-8 text-blue-100">
              더 나은 소통, 더 강한 팀워크를 위한 첫 걸음을 내딛어보세요.
            </p>
            <button 
              onClick={handleServiceStart}
              className="bg-white text-blue-600 hover:bg-neutral-100 px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
            >
              서비스 시작하기
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="text-2xl font-bold text-blue-500">Koffee-Konnect</div>
              <p className="text-neutral-400">
                사내 소통 활성화를 위한 커피챗 매칭 서비스입니다.
                Next.js와 TailwindCSS로 구축되었습니다.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">서비스</h3>
              <div className="space-y-2 text-neutral-400">
                <div>약속 생성</div>
                <div>약속 참여</div>
                <div>약속 조회</div>
                <div>채팅</div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">지원</h3>
              <div className="space-y-2 text-neutral-400">
                <div>이용약관</div>
                <div>개인정보처리방침</div>
                <div>고객지원</div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">연락처</h3>
              <div className="space-y-2 text-neutral-400">
                <div>이메일: support@koffee-konnect.com</div>
                <div>전화: 02-1234-5678</div>
                <div>주소: 서울시 강남구 테헤란로 123</div>
              </div>
            </div>
          </div>

          <div className="border-t border-neutral-800 mt-8 pt-8 text-center text-neutral-400">
            <p>Copyright © 2025. Koffee-Konnect. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Login/Signup Modal */}
      <LoginSignupModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        onModeChange={setModalMode}
      />
    </div>
  );
}
