// form入力値
export type FormValues = {
  name: string;
  user: string;
  mail: string;
  password: string;
  confirmPassword: string;
  zip: string;
  prefecture: string;
  municipalities: string;
  address: string;
};

// form エラー
export type FormErrors = {
  name: string;
  user: string;
  mail: string;
  password: string;
  confirmPassword: string;
  zip: string;
  prefecture: string;
  municipalities: string;
  address: string;
};

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
  status: string;
};
