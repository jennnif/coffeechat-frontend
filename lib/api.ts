/**
 * 클라이언트는 항상 `/api/*`만 호출하고, 서버(Route Handler)가 백엔드로 프록시한다.
 */

export async function request<T>(input: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`/api${input}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP ${response.status}: ${errorText}`);
  }

  return response.json();
}
