"use client";
import { api } from "@/lib/api";
import type { User } from "@/lib/types";
import { useEffect, useState } from "react";

export default function UserDetail({ params }: { params: { user_id: string }}) {
  const id = decodeURIComponent(params.user_id);
  const [data, setData] = useState<User | null>(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const u = await api<User>(`/api/users/users/${encodeURIComponent(id)}`);
        setData(u);
      } catch (e: any) {
        setMsg(`조회 실패: ${e?.status} ${e?.message}`);
      }
    })();
  }, [id]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">사용자 상세</h2>
      {msg && <p className="text-sm text-neutral-400">{msg}</p>}
      <pre className="mt-3 p-3 bg-neutral-900 rounded border border-neutral-800 text-xs overflow-auto">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
