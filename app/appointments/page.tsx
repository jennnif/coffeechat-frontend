"use client";
import { api } from "@/lib/api";
import type { Appointment } from "@/lib/types";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Appointments() {
  const [list, setList] = useState<Appointment[]>([]);
  const [msg, setMsg] = useState("");
  const [q, setQ] = useState<{ location_id?: string; appointment_status?: string; start_time?: string; end_time?: string }>({});

  async function load() {
    setMsg("");
    try {
      const params = new URLSearchParams();
      if (q.location_id) params.set("location_id", q.location_id);
      if (q.appointment_status) params.set("appointment_status", q.appointment_status);
      if (q.start_time) params.set("start_time", q.start_time);
      if (q.end_time) params.set("end_time", q.end_time);
      const url = params.toString()
        ? `/api/appointments/appointments?${params.toString()}`
        : `/api/appointments/appointments`;
      const data = await api<Appointment[]>(url);
      setList(data || []);
    } catch (e: any) {
      setMsg(`조회 실패: ${e?.status} ${e?.message}`);
    }
  }

  useEffect(() => { load(); }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">약속 목록</h2>
      <form onSubmit={e=>{e.preventDefault();load();}} className="grid sm:grid-cols-4 gap-2">
        <input className="px-3 py-2 bg-neutral-900 border border-neutral-800 rounded" placeholder="location_id"
          value={q.location_id||""} onChange={e=>setQ(s=>({...s, location_id:e.target.value}))}/>
        <input className="px-3 py-2 bg-neutral-900 border border-neutral-800 rounded" placeholder="appointment_status"
          value={q.appointment_status||""} onChange={e=>setQ(s=>({...s, appointment_status:e.target.value}))}/>
        <input type="datetime-local" className="px-3 py-2 bg-neutral-900 border border-neutral-800 rounded"
          value={q.start_time||""} onChange={e=>setQ(s=>({...s, start_time:e.target.value}))}/>
        <input type="datetime-local" className="px-3 py-2 bg-neutral-900 border border-neutral-800 rounded"
          value={q.end_time||""} onChange={e=>setQ(s=>({...s, end_time:e.target.value}))}/>
        <button className="px-4 py-2 bg-white text-black rounded">필터 적용</button>
      </form>

      {msg && <p className="text-sm text-neutral-400">{msg}</p>}

      <table className="w-full border border-neutral-800 text-sm">
        <thead className="bg-neutral-900">
          <tr>
            <th className="p-2 text-left">id</th>
            <th className="p-2 text-left">title</th>
            <th className="p-2 text-left">host</th>
            <th className="p-2 text-left">location</th>
            <th className="p-2 text-left">time</th>
            <th className="p-2 text-left">status</th>
          </tr>
        </thead>
        <tbody>
          {list.map(a => (
            <tr key={a.appointment_id} className="border-t border-neutral-800">
              <td className="p-2"><Link className="underline" href={`/appointments/${a.appointment_id}`}>{a.appointment_id}</Link></td>
              <td className="p-2">{a.title || "-"}</td>
              <td className="p-2">{a.host_id}</td>
              <td className="p-2">{a.location_id}</td>
              <td className="p-2">{a.start_time} ~ {a.end_time}</td>
              <td className="p-2">{a.appointment_status || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
