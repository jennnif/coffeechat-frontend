"use client";
import { api } from "@/lib/api";
import type { Appointment, Guest, GuestStatus } from "@/lib/types";
import { useEffect, useState } from "react";

export default function AppointmentDetail({ params }: { params: { id: string }}) {
  const id = Number(params.id);
  const [ap, setAp] = useState<Appointment | null>(null);
  const [status, setStatus] = useState<string>("");
  const [guests, setGuests] = useState<Guest[]>([]);
  const [guestForm, setGuestForm] = useState<{ user_id?: string; guest_id?: string }>({});
  const [msg, setMsg] = useState("");

  async function loadAll() {
    setMsg("");
    try {
      const d = await api<Appointment>(`/api/appointments/appointments/${id}`);
      setAp(d);
    } catch (e: any) {
      setMsg(`상세 실패: ${e?.status} ${e?.message}`);
    }
    try {
      const s = await api<{ appointment_status: string }>(`/api/appointments/appointments/${id}/status`);
      setStatus(s?.appointment_status || "");
    } catch {}
    try {
      const gs = await api<Guest[]>(`/api/guest/appointments/${id}/guests`);
      setGuests(gs || []);
    } catch (e: any) {
      // 게스트 서비스 미가동일 수 있음
    }
  }

  useEffect(() => { loadAll(); }, [id]);

  async function changeStatus(next: string) {
    try {
      await api(`/api/appointments/appointments/${id}/status`, {
        method: "PUT",
        body: JSON.stringify({ appointment_status: next }),
      });
      await loadAll();
      setMsg("약속 상태 변경 완료");
    } catch (e: any) {
      setMsg(`상태 변경 실패(${e?.status}): ${e?.message}`);
    }
  }

  async function addGuest(e: React.FormEvent) {
    e.preventDefault();
    try {
      await api(`/api/guest/appointments/${id}/guests`, {
        method: "POST",
        body: JSON.stringify(guestForm),
      });
      setGuestForm({});
      await loadAll();
    } catch (e: any) {
      setMsg(`게스트 등록 실패: ${e?.status} ${e?.message}`);
    }
  }

  async function removeGuest(guest_id: string) {
    if (!confirm("해당 게스트 참가 취소?")) return;
    try {
      await api(`/api/guest/appointments/${id}/guests/${encodeURIComponent(guest_id)}`, { method: "DELETE" });
      await loadAll();
    } catch (e: any) {
      setMsg(`삭제 실패: ${e?.status} ${e?.message}`);
    }
  }

  async function changeGuestStatus(guest_id: string, next: GuestStatus) {
    try {
      await api(`/api/guest/appointments/${id}/guests/${encodeURIComponent(guest_id)}/guest_status`, {
        method: "PATCH",
        body: JSON.stringify({ guest_status: next }),
      });
      await loadAll();
      setMsg("참가자 상태 변경 완료");
    } catch (e: any) {
      // 409 또는 403 등 정책 위반 안내
      setMsg(`참가자 상태 변경 실패(${e?.status}): ${e?.message}`);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">약속 상세 #{id}</h2>
        {msg && <p className="text-sm text-neutral-400">{msg}</p>}
        <pre className="mt-3 p-3 bg-neutral-900 rounded border border-neutral-800 text-xs overflow-auto">
          {JSON.stringify(ap, null, 2)}
        </pre>
      </div>

      <div>
        <h3 className="font-semibold mb-2">약속 상태</h3>
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 rounded bg-neutral-800 text-sm">{status || "-"}</span>
          <button className="px-3 py-1 bg-white text-black rounded" onClick={()=>changeStatus("scheduled")}>scheduled</button>
          <button className="px-3 py-1 bg-white text-black rounded" onClick={()=>changeStatus("completed")}>completed</button>
          <button className="px-3 py-1 bg-red-600 rounded" onClick={()=>changeStatus("cancelled")}>cancelled</button>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-2">게스트</h3>
        <form onSubmit={addGuest} className="flex flex-wrap gap-2 mb-3">
          <input className="px-3 py-2 bg-neutral-900 border border-neutral-800 rounded" placeholder="user_id (optional)"
            value={guestForm.user_id || ""} onChange={e=>setGuestForm(s=>({ ...s, user_id:e.target.value }))}/>
          <input className="px-3 py-2 bg-neutral-900 border border-neutral-800 rounded" placeholder="guest_id"
            value={guestForm.guest_id || ""} onChange={e=>setGuestForm(s=>({ ...s, guest_id:e.target.value }))}/>
          <button className="px-4 py-2 bg-white text-black rounded">게스트 등록</button>
        </form>

        <table className="w-full border border-neutral-800 text-sm">
          <thead className="bg-neutral-900">
            <tr>
              <th className="p-2 text-left">guest_id</th>
              <th className="p-2 text-left">user_id</th>
              <th className="p-2 text-left">status</th>
              <th className="p-2">액션</th>
            </tr>
          </thead>
          <tbody>
            {guests.map(g => (
              <tr key={g.guest_id} className="border-t border-neutral-800">
                <td className="p-2">{g.guest_id}</td>
                <td className="p-2">{g.user_id || "-"}</td>
                <td className="p-2">{g.guest_status}</td>
                <td className="p-2 space-x-1">
                  <button className="px-2 py-1 bg-white text-black rounded" onClick={()=>changeGuestStatus(g.guest_id, "coming")}>coming</button>
                  <button className="px-2 py-1 bg-white text-black rounded" onClick={()=>changeGuestStatus(g.guest_id, "came")}>came</button>
                  <button className="px-2 py-1 bg-white text-black rounded" onClick={()=>changeGuestStatus(g.guest_id, "no_show")}>no_show</button>
                  <button className="px-2 py-1 bg-red-600 rounded" onClick={()=>removeGuest(g.guest_id)}>삭제</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="text-xs text-neutral-400 mt-2">
          서버 정책: END 알림 이전 변경 시도 또는 허용되지 않은 전이는 409, 호스트가 아니면 403.
        </p>
      </div>
    </div>
  );
}
