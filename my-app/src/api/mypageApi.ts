import type { User } from "../types/type";
import { getAuthorizationHeader } from "../utils/auth";

type UserResponse = {
  user?: User;
  message?: string;
};

export class AuthenticationError extends Error {}

// Bearer tokenを付けてログイン中の会員情報を取得する
export const getCurrentUser = async (): Promise<User> => {
  const response = await fetch("/api/user", {
    headers: getAuthorizationHeader(),
  });

  const data: UserResponse = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message ?? "会員情報の取得に失敗しました");
  }

  if (!data.user) {
    throw new Error("会員情報を取得できませんでした");
  }

  return data.user;
};
