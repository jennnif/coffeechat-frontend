"use client";
import { api } from "@/lib/api";
import type { LocationItem } from "@/lib/types";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Locations() {
  const [list, setList] = useState<LocationItem[]>([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await api<LocationItem[]>(`/api/locations/locations`);
        setList(data || []);
      } catch (e: any) {
        setMsg(`조회 실패: ${e?.status} ${e?.message}`);
      }
    })();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold">장소 목록</h2>
      {msg && <p className="text-sm text-neutral-400">{msg}</p>}
      <table className="w-full mt-3 border border-neutral-800 text-sm">
        <thead className="bg-neutral-900">
          <tr><th className="p-2 text-left">location_id</th><th className="p-2 text-left">name</th></tr>
        </thead>
        <tbody>
          {list.map(x => (
            <tr key={x.location_id} className="border-t border-neutral-800">
              <td className="p-2"><Link className="underline" href={`/locations/${encodeURIComponent(x.location_id)}`}>{x.location_id}</Link></td>
              <td className="p-2">{x.name || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
