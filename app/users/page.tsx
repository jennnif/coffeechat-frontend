"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { User } from "@/lib/types";
import Link from "next/link";

export default function UsersPage() {
  const [list, setList] = useState<User[]>([]);
  const [form, setForm] = useState<Partial<User & { password: string }>>({});
  const [msg, setMsg] = useState("");

  async function load() {
    try {
      const data = await api<User[]>(`/api/users/users`);
      setList(data || []);
    } catch (e: any) {
      setMsg(`목록 오류: ${e?.status} ${e?.message}`);
    }
  }

  useEffect(() => { load(); }, []);

  async function createUser(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    try {
      await api(`/api/users/users`, {
        method: "POST",
        body: JSON.stringify(form),
      });
      setForm({});
      await load();
      setMsg("생성 완료");
    } catch (e: any) {
      setMsg(`생성 실패: ${e?.status} ${e?.message}`);
    }
  }

  async function remove(user_id: string) {
    if (!confirm(`삭제할까요? ${user_id}`)) return;
    try {
      await api(`/api/users/users/${encodeURIComponent(user_id)}`, { method: "DELETE" });
      await load();
    } catch (e: any) {
      setMsg(`삭제 실패: ${e?.status} ${e?.message}`);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">사용자 목록</h2>
        {msg && <p className="text-sm text-neutral-400">{msg}</p>}
        <table className="w-full mt-3 border border-neutral-800 text-sm">
          <thead className="bg-neutral-900">
            <tr>
              <th className="p-2 text-left">user_id</th>
              <th className="p-2 text-left">username</th>
              <th className="p-2 text-left">nickname</th>
              <th className="p-2">액션</th>
            </tr>
          </thead>
          <tbody>
            {list.map(u => (
              <tr key={u.user_id} className="border-t border-neutral-800">
                <td className="p-2"><Link className="underline" href={`/users/${encodeURIComponent(u.user_id)}`}>{u.user_id}</Link></td>
                <td className="p-2">{u.username || "-"}</td>
                <td className="p-2">{u.nickname || "-"}</td>
                <td className="p-2 text-center">
                  <button onClick={()=>remove(u.user_id)} className="px-2 py-1 bg-red-600 rounded">삭제</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h3 className="font-semibold mb-2">사용자 등록</h3>
        <form onSubmit={createUser} className="grid sm:grid-cols-2 gap-2">
          <input className="px-3 py-2 bg-neutral-900 border border-neutral-800 rounded" placeholder="user_id"
            value={form.user_id || ""} onChange={e=>setForm(f=>({ ...f, user_id: e.target.value }))}/>
          <input className="px-3 py-2 bg-neutral-900 border border-neutral-800 rounded" placeholder="username"
            value={form.username || ""} onChange={e=>setForm(f=>({ ...f, username: e.target.value }))}/>
          <input className="px-3 py-2 bg-neutral-900 border border-neutral-800 rounded" placeholder="nickname"
            value={form.nickname || ""} onChange={e=>setForm(f=>({ ...f, nickname: e.target.value }))}/>
          <input className="px-3 py-2 bg-neutral-900 border border-neutral-800 rounded" placeholder="password" type="password"
            value={(form as any).password || ""} onChange={e=>setForm(f=>({ ...f, password: e.target.value }))}/>
          <button className="px-4 py-2 bg-white text-black rounded">등록</button>
        </form>
      </div>
    </div>
  );
}
