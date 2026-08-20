type ErrorResponse = {
  message?: string;
};

export class AuthenticationError extends Error {}

//  APIのエラーレスポンスを画面表示用のErrorへ変換
export const throwApiError = async (
  response: Response,
  fallbackMessage: string,
): Promise<never> => {
  const body = (await response.json().catch(() => ({}))) as ErrorResponse;

  if (response.status === 401) {
    throw new AuthenticationError(body.message ?? "認証が必要です");
  }

  throw new Error(body.message ?? fallbackMessage);
};
