"use client";
import { api } from "@/lib/api";
import type { LocationItem } from "@/lib/types";
import { useEffect, useState } from "react";

export default function LocationDetail({ params }: { params: { id: string }}) {
  const id = decodeURIComponent(params.id);
  const [data, setData] = useState<LocationItem | null>(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const d = await api<LocationItem>(`/api/locations/locations/${encodeURIComponent(id)}`);
        setData(d);
      } catch (e: any) {
        setMsg(`조회 실패: ${e?.status} ${e?.message}`);
      }
    })();
  }, [id]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">장소 상세</h2>
      {msg && <p className="text-sm text-neutral-400">{msg}</p>}
      <pre className="mt-3 p-3 bg-neutral-900 rounded border border-neutral-800 text-xs overflow-auto">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
