"use client";
import { useAuth } from "@/contexts/AuthContext";

export default function ChatPage() {
  const { isLoggedIn } = useAuth();

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* 메인 컨텐츠 */}
        <div className="text-center">
          {/* 아이콘 */}
          <div className="mb-8">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="text-6xl">💬</div>
            </div>
          </div>

          {/* 제목 */}
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            <span className="text-blue-400">채팅</span> 서비스
          </h1>

          {/* 서브 제목 */}
          <h2 className="text-2xl lg:text-3xl font-semibold mb-8 text-neutral-300">
            서비스 구현 예정입니다
          </h2>

          {/* 설명 */}
          <div className="max-w-2xl mx-auto mb-12">
            <p className="text-xl text-neutral-400 leading-relaxed">
              커피챗 참여자들과 실시간으로 소통할 수 있는 채팅 기능을 준비하고 있습니다. 곧 만나보실 수 있습니다! 🚀
            </p>
          </div>

          {/* 기능 미리보기 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-neutral-800 rounded-lg p-6 opacity-60">
              <div className="text-3xl mb-3">💬</div>
              <h3 className="text-lg font-semibold mb-2">실시간 채팅</h3>
              <p className="text-sm text-neutral-400">
                커피챗 참여자들과 즉시 소통
              </p>
            </div>
            <div className="bg-neutral-800 rounded-lg p-6 opacity-60">
              <div className="text-3xl mb-3">📱</div>
              <h3 className="text-lg font-semibold mb-2">모바일 지원</h3>
              <p className="text-sm text-neutral-400">
                언제 어디서나 채팅 가능
              </p>
            </div>
            <div className="bg-neutral-800 rounded-lg p-6 opacity-60">
              <div className="text-3xl mb-3">🔔</div>
              <h3 className="text-lg font-semibold mb-2">알림 기능</h3>
              <p className="text-sm text-neutral-400">
                새로운 메시지 알림 제공
              </p>
            </div>
          </div>

          {/* 액션 버튼 */}
          <div className="flex justify-center">
            <button
              onClick={() => window.location.href = '/'}
              className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
            >
              홈으로 가기
            </button>
          </div>
        </div>

        {/* 로그인 상태에 따른 추가 메시지 */}
        {isLoggedIn && (
          <div className="mt-8 text-center">
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 max-w-xl mx-auto">
              <p className="text-blue-300">
                서비스가 출시되면 자동으로 알림을 받으실 수 있습니다.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
