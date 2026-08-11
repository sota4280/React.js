import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

// ブラウザー上でAPIリクエストを監視し、handlersに定義したモックを実行する
export const worker = setupWorker(...handlers);
