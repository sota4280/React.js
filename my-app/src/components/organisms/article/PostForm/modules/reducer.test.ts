import { reducer } from "./reducer";
import {initialState, requiredError} from "../Index";


/**
 * Jestを用いて状態管理の単体テストコードを実装している
 * 単体テストコードを書くことによって下記メリットが存在する
 * - テストコードが説明書となる(他の人がテストコードを見ることで仕様がわかる)
 *     - 今回だとフォームの仕様がわかる
 * - 自分のコードでバグがないかチェックできる(自分の心理的安全性を高める)
 * - レビュワーの工数を減らせる
 *   - 今回だとフォーム入力のロジックを網羅しているので、レビュワーは手動確認がいらない
 * - この画面を追加修正するときのセーフティーネットとなる
 *   - 仮にこの画面に新規機能を追加したとして、既存の実装が壊れていないかのチェックはテストが落ちていないか?だけを見ればいい
 *     - もしテストコードがない場合は、フォームの全ての振る舞いを手動確認しないとけない
 * - プログラムがテストしてくれるので、手動テストが減る
 */
describe("記事投稿フォームの状態管理テスト", () => {
  describe("エラー表示フラグ", () => {
    it("アクションが発火されたらエラー表示フラグをtrueにする", () => {
      expect(
        reducer(initialState, {
          type: "showErrorMessage",
        })
      ).toEqual({
        ...initialState,
        shouldShowError: true,
      });
    });
  });
  describe("記事タイトル", () => {
    it("入力値が空でない場合、タイトルが入力値に更新されエラーなしがかえる", () => {
      expect(
        reducer(initialState, {
          type: "changeArticleTitle",
          payload: {
            title: "リーダブルコード",
          },
        })
      ).toEqual({
        ...initialState,
        title: {
          value: "リーダブルコード",
          errorMessage: undefined,
        },
      });
    });

    it("入力値が空の場合、タイトルが更新され必須入力エラーを返す", () => {
      expect(
        reducer(initialState, {
          type: "changeArticleTitle",
          payload: {
            title: "",
          },
        })
      ).toEqual({
        ...initialState,
        title: {
          value: "",
          errorMessage: requiredError,
        },
      });
    });
  });

  describe("記事詳細", () => {
    it("入力値が空でない場合、記事詳細が入力値に更新されエラーなしがかえる", () => {
      expect(
        reducer(initialState, {
          type: "changeArticleDescription",
          payload: {
            description: "いろいろ学べる",
          },
        })
      ).toEqual({
        ...initialState,
        description: {
          value: "いろいろ学べる",
          errorMessage: undefined,
        },
      });
    });
    it("入力値が空の場合、記事詳細が入力値に更新され必須入力エラーがかえる", () => {
      expect(
        reducer(initialState, {
          type: "changeArticleDescription",
          payload: {
            description: "",
          },
        })
      ).toEqual({
        ...initialState,
        description: {
          value: "",
          errorMessage: requiredError,
        },
      });
    });
  });
});
