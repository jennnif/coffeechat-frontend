"use client";
import { useState } from "react";
import { userStore } from "@/lib/userStore";
import { useAuth } from "@/contexts/AuthContext";

interface LoginSignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "login" | "signup";
  onModeChange: (mode: "login" | "signup") => void;
}

export default function LoginSignupModal({ 
  isOpen, 
  onClose, 
  mode, 
  onModeChange 
}: LoginSignupModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const { login } = useAuth();

  const validateEmail = (email: string) => {
    const ktEmailRegex = /^[a-zA-Z0-9._%+-]+@kt\.com$/;
    return ktEmailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length <= 8;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    // 이메일 검증
    if (!email) {
      newErrors.email = "이메일을 입력해주세요.";
    } else if (!validateEmail(email)) {
      newErrors.email = "이메일은 @kt.com 형식이어야 합니다.";
    }

    // 비밀번호 검증
    if (!password) {
      newErrors.password = "비밀번호를 입력해주세요.";
    } else if (!validatePassword(password)) {
      newErrors.password = "비밀번호는 8글자 이내여야 합니다.";
    }

    // 회원가입 시 비밀번호 확인
    if (mode === "signup") {
      if (!confirmPassword) {
        newErrors.confirmPassword = "비밀번호 확인을 입력해주세요.";
      } else if (password !== confirmPassword) {
        newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    if (mode === "login") {
      // 로그인 로직
      const result = userStore.login(email, password);
      if (result.success) {
        login(email); // AuthContext에 로그인 상태 저장
        setSuccessMessage(result.message);
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          onClose();
          setEmail("");
          setPassword("");
        }, 2000);
      } else {
        setErrors({ general: result.message });
      }
    } else {
      // 회원가입 로직
      const result = userStore.signup(email, password);
      if (result.success) {
        setSuccessMessage(result.message);
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          onModeChange("login");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
        }, 2000);
      } else {
        setErrors({ general: result.message });
      }
    }
  };

  const handleClose = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setErrors({});
    setShowSuccess(false);
    setSuccessMessage("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="card p-1">
        <div className="card2">
          <div className="form">
            <div id="heading">
              {mode === "login" ? "Login" : "Signup"}
            </div>
            
            {showSuccess && (
              <div className="text-center text-green-400 mb-4">
                {successMessage}
              </div>
            )}

            {errors.general && (
              <div className="text-center text-red-400 mb-4">
                {errors.general}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="field">
                <svg className="input-icon" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                  <path d="M207.8 20.73c-93.45 18.32-168.7 93.66-187 187.1c-27.64 140.9 68.65 266.2 199.1 285.1c19.01 2.888 36.17-12.26 36.17-31.49l.0001-.6631c0-15.74-11.44-28.88-26.84-31.24c-84.35-12.98-149.2-86.13-149.2-174.2c0-102.9 88.61-185.5 197.6-185.5c109 0 197.6 82.61 197.6 185.5c0 88.07-64.85 161.2-149.2 174.2c-15.4 2.36-26.84 15.5-26.84 31.24l.0001 .6631c0 19.22 17.16 34.38 36.17 31.49c130.4-18.9 226.7-144.2 199.1-285.1C376.4 114.4 301.2 39.05 207.8 20.73zM239.1 304.3c-9.26 13.58-14.67 30.71-14.67 49.33c0 14.78 4.547 28.38 12.1 39.7c-4.547 1.442-9.26 2.127-14.1 2.127c-35.35 0-64-28.65-64-64s28.65-64 64-64c4.84 0 9.553.685 14.1 2.127c-7.553 11.32-12.1 24.92-12.1 39.7c0 18.62 5.41 35.75 14.67 49.33z"/>
                </svg>
                <input
                  type="email"
                  className="input-field"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {errors.email && <div className="text-red-400 text-sm mt-1">{errors.email}</div>}

              <div className="field">
                <svg className="input-icon" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                  <path d="M80 192V144C80 64.47 144.5 0 224 0C303.5 0 368 64.47 368 144V192H384C401.7 192 416 206.3 416 224V448C416 465.7 401.7 480 384 480H64C46.33 480 32 465.7 32 448V224C32 206.3 46.33 192 64 192H80zM144 192H304V144C304 99.82 268.2 64 224 64C179.8 64 144 99.82 144 144V192z"/>
                </svg>
                <input
                  type="password"
                  className="input-field"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {errors.password && <div className="text-red-400 text-sm mt-1">{errors.password}</div>}

              {mode === "signup" && (
                <>
                  <div className="field">
                    <svg className="input-icon" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                      <path d="M80 192V144C80 64.47 144.5 0 224 0C303.5 0 368 64.47 368 144V192H384C401.7 192 416 206.3 416 224V448C416 465.7 401.7 480 384 480H64C46.33 480 32 465.7 32 448V224C32 206.3 46.33 192 64 192H80zM144 192H304V144C304 99.82 268.2 64 224 64C179.8 64 144 99.82 144 144V192z"/>
                    </svg>
                    <input
                      type="password"
                      className="input-field"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  {errors.confirmPassword && <div className="text-red-400 text-sm mt-1">{errors.confirmPassword}</div>}
                </>
              )}

              <div className="btn">
                <button type="submit" className="button1">
                  {mode === "login" ? "Login" : "Signup"}
                </button>
                <button type="button" className="button2" onClick={handleClose}>
                  Close
                </button>
              </div>
            </form>

            <div className="text-center mt-4">
              <button
                type="button"
                className="text-blue-400 hover:text-blue-300 underline"
                onClick={() => onModeChange(mode === "login" ? "signup" : "login")}
              >
                {mode === "login" ? "회원가입하기" : "로그인하기"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
