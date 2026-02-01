// API通信の共通クライアント（後でURLや認証を追加）
export const apiClient = async <T>(path: string, options: RequestInit = {}): Promise<T> => {
  const res = await fetch(path, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json() as Promise<T>;
};
