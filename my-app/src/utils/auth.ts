const TOKEN_LIFETIME_MS = 60 * 60 * 1000;

// APIから取得したtokenと60分後の有効期限をlocalStorageへ保存する
export const saveAccessToken = (accessToken: string): void => {
  localStorage.setItem('access_token', accessToken);
  localStorage.setItem("access_token_expires_at", String(Date.now() + TOKEN_LIFETIME_MS));
};

// 保存されている認証情報をすべて削除する
export const clearAccessToken = (): void => {
  localStorage.removeItem('access_token');
  localStorage.removeItem("access_token_expires_at");
};

// tokenが存在して、有効期限内の場合だけtokenを返す
export const getAccessToken = (): string | null => {
  const accessToken = localStorage.getItem('access_token');
  const expiresAt = Number(localStorage.getItem("access_token_expires_at"));

  if (!accessToken || !expiresAt || Date.now() >= expiresAt) {
    clearAccessToken();
    return null;
  }

  return accessToken;
};

// 現在ログイン中か確認する
export const isAuthenticated = (): boolean => Boolean(getAccessToken());

// 認証が必要なAPIへ設定するAuthorizationヘッダーを作成する
export const getAuthorizationHeader = (): Record<string, string> => {
  const accessToken = getAccessToken();
  return accessToken
    ? { Authorization: `Bearer ${accessToken}` }
    : {};
};
