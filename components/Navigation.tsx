"use client";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import LoginSignupModal from "@/components/LoginSignupModal";

export default function Navigation() {
  const { user, logout, isLoggedIn } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"login" | "signup">("login");

  const handleLoginClick = () => {
    setModalMode("login");
    setIsModalOpen(true);
  };

  const handleSignupClick = () => {
    setModalMode("signup");
    setIsModalOpen(true);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <nav className="fixed top-0 w-full bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-blue-500">
                Koffee-Konnect
              </Link>
            </div>

            {/* Navigation Menu */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-8">
                <Link href="/coffeechat/create" className="hover:text-blue-400 transition-colors">
                  약속 생성
                </Link>
                <Link href="/coffeechat/join" className="hover:text-blue-400 transition-colors">
                  약속 참여
                </Link>
                <Link href="/coffeechat/my" className="hover:text-blue-400 transition-colors">
                  약속 조회
                </Link>
                <Link href="/chat" className="hover:text-blue-400 transition-colors">
                  채팅
                </Link>
              </div>
            </div>

            {/* Login/Register or User Menu */}
            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <div className="flex items-center space-x-4">
                  <span className="text-neutral-300">
                    안녕하세요, {user?.email}님
                  </span>
                  <Link 
                    href="/profile" 
                    className="hover:text-blue-400 transition-colors"
                  >
                    마이페이지
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
                  >
                    로그아웃
                  </button>
                </div>
              ) : (
                <>
                  <button 
                    onClick={handleLoginClick}
                    className="hover:text-blue-400 transition-colors"
                  >
                    로그인
                  </button>
                  <button 
                    onClick={handleSignupClick}
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
                  >
                    회원가입
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Login/Signup Modal */}
      <LoginSignupModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        onModeChange={setModalMode}
      />
    </>
  );
}
