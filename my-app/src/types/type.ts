// form入力値
export type FormValues = {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  zip: string;
  prefecture: string;
  municipalities: string;
  address: string;
};

// form エラー
export type FormErrors = Record<keyof FormValues, string>;

// アドレスAPI
export type ZipAddress = {
  message: string | null;
  results:
    | {
        address1: string;
        address2: string;
        address3: string;
        prefcode: string;
        zipcode: string;
      }[]
    | null;
  status: number;
};

// 会員登録
export type RegisterFormValues = {
  email: string;
  password: string;
  passwordConfirmation: string;
  name: string;
  image: File | null;
};

export type RegisterTextField = Exclude<keyof RegisterFormValues, "image">;

// ログイン
export type LoginFormValues = {
  email: string;
  password: string;
};

export type LoginField = keyof LoginFormValues;

// マイページ
export type User = {
  name: string;
  email: string;
  representative_image: string;
};
