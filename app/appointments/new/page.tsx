"use client";
import { api } from "@/lib/api";
import { fmt } from "@/lib/format";
import { useState } from "react";

export default function NewAppointment() {
  const [form, setForm] = useState<any>({});
  const [msg, setMsg] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    try {
      const body = {
        host_id: form.host_id,
        title: form.title,
        description: form.description,
        location_id: form.location_id,
        start_time: fmt.dtLocalToIso(form.start_time),
        end_time: fmt.dtLocalToIso(form.end_time),
      };
      await api(`/api/appointments/appointments`, { method: "POST", body: JSON.stringify(body) });
      setMsg("생성 완료");
      setForm({});
    } catch (e: any) {
      setMsg(`실패: ${e?.status} ${e?.message}`);
    }
  }

  return (
    <div className="max-w-xl">
      <h2 className="text-xl font-semibold mb-3">약속 생성</h2>
      {msg && <p className="text-sm text-neutral-400">{msg}</p>}
      <form onSubmit={submit} className="grid gap-2">
        <input className="px-3 py-2 bg-neutral-900 border border-neutral-800 rounded" placeholder="host_id"
          value={form.host_id || ""} onChange={e=>setForm((f:any)=>({...f, host_id:e.target.value}))}/>
        <input className="px-3 py-2 bg-neutral-900 border border-neutral-800 rounded" placeholder="title"
          value={form.title || ""} onChange={e=>setForm((f:any)=>({...f, title:e.target.value}))}/>
        <textarea className="px-3 py-2 bg-neutral-900 border border-neutral-800 rounded" placeholder="description"
          value={form.description || ""} onChange={e=>setForm((f:any)=>({...f, description:e.target.value}))}/>
        <input className="px-3 py-2 bg-neutral-900 border border-neutral-800 rounded" placeholder="location_id"
          value={form.location_id || ""} onChange={e=>setForm((f:any)=>({...f, location_id:e.target.value}))}/>
        <label className="text-sm text-neutral-400">start_time</label>
        <input type="datetime-local" className="px-3 py-2 bg-neutral-900 border border-neutral-800 rounded"
          value={form.start_time || ""} onChange={e=>setForm((f:any)=>({...f, start_time:e.target.value}))}/>
        <label className="text-sm text-neutral-400">end_time</label>
        <input type="datetime-local" className="px-3 py-2 bg-neutral-900 border border-neutral-800 rounded"
          value={form.end_time || ""} onChange={e=>setForm((f:any)=>({...f, end_time:e.target.value}))}/>
        <button className="px-4 py-2 bg-white text-black rounded mt-2">생성</button>
      </form>
    </div>
  );
}
