"use client";
import { api } from "@/lib/api";
import { useState } from "react";

export default function LoginPage() {
  const [user_id, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    try {
      // POST /users/login
      const res = await api<{ token?: string; [k: string]: any }>(`/api/users/users/login`, {
        method: "POST",
        body: JSON.stringify({ user_id, password }),
      });
      setMsg(`로그인 성공: ${res?.token ? "토큰 발급" : "토큰 없음"}`);
    } catch (e: any) {
      setMsg(`로그인 실패 (${e?.status}): ${e?.message}`);
    }
  }

  return (
    <div className="max-w-md">
      <h2 className="text-xl font-semibold mb-4">로그인</h2>
      <form onSubmit={submit} className="space-y-3">
        <input className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded"
               placeholder="user_id(이메일)" value={user_id} onChange={e=>setUserId(e.target.value)} />
        <input className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded"
               placeholder="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="px-4 py-2 bg-white text-black rounded">로그인</button>
      </form>
      {msg && <p className="mt-3 text-sm text-neutral-300 whitespace-pre-wrap">{msg}</p>}
    </div>
  );
}
