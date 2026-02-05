// API通信の共通クライアント（後でURLや認証を追加）
// 引数: path=エンドポイント, options=fetchの追加設定
// 戻り値: JSONをパースしたレスポンス
export const apiClient = async <T>(path: string, options: RequestInit = {}): Promise<T> => {
    // 共通ヘッダーを付与しつつfetchを実行
    const res = await fetch(path, {
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
        },
        ...options,
    });

    // HTTPエラーは例外として扱う
    if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
    }

    // JSONとして返却
    return res.json() as Promise<T>;
};