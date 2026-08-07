import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { paths } from "./utils/paths";
import { FormPage } from "./pages/form";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import "./index.css";
import "sanitize.css";
import "sanitize.css/forms.css";
import "sanitize.css/typography.css";

// 開発環境の時だけmswのモックサーバーが動くようにしている
async function enableMocking() {
  // 常に動作するように仮変更
  // if (import.meta.env.VITE_NODE_ENV !== 'development') {
  //   return
  // }

  // ここは、モック仕様
  try {
    const { worker } = await import("./mocks/browser");
    await worker.start();
  } catch (error) {
    // MSWが起動できなくても描画は続ける
    console.warn("MSW start failed", error);
  }
}

enableMocking().finally(() => {
  const rootElement = document.getElementById("root");

  if (!rootElement) {
    throw new Error("Root element was not found");
  }

  // ルートログ
  console.log(rootElement);

  createRoot(rootElement).render(
    <StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path={paths.top} element={<App />} />
            <Route path={paths.form} element={<FormPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </StrictMode>,
  );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
