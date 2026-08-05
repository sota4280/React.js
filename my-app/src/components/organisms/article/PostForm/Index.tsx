import React, { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../../utils/paths";
import { Button } from "../../../atoms";
import { LabelAndTextInput, LabelAndTextArea } from "../../../molecules";
import { reducer } from "./modules/reducer";
import type { InputForm, RequestBody } from "./modules/types";


export const requiredError = "必須入力です";
export const initialState: InputForm = {
    shouldShowError: false,
    title: {
        value: "",
        errorMessage: requiredError,
    },
    description: {
        value: "",
        errorMessage: requiredError,
    },
};
export const PostForm: React.FC = () => {
  const navigate = useNavigate();
  const [formState, dispatch] = useReducer(reducer, initialState);

  const { shouldShowError,title, description } = formState;

  const clickPostButton = async () => {
      if(!shouldShowError){
          dispatch({
              type:'showErrorMessage'
          })
      }
      if(title.errorMessage !==undefined || description.errorMessage !== undefined) return;

    const body: RequestBody = {
      user_id: "hoge", // TODO ログイン機能仕込んだらuserId指定してあげてね
      title: formState.title.value,
      content: formState.description.value,
    };
    await fetch("http://localhost:8000/api/articles", {
      body: JSON.stringify(body),
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        //　TODO　エラーハンドリング理解してやってもらいたいので、書いていない
        //  よって一通りの画面実装が終わったら下記を修正してほしい
        throw new Error("通信エラー");
      })
      .then((result) => {
        navigate(paths.articles.detail(result.article_id));
      })
      .catch((e: Error) => {
        alert(e.message);
      });
  };

  return (
    <div>
      <div className="mb-5 w-1/2">
        <LabelAndTextInput
          labelTitle="タイトル"
          value={title.value}
          placeholder="タイトル"
          onChange={(value) => {
            dispatch({
              type: "changeArticleTitle",
              payload: {
                title: value,
              },
            });
          }}
          errorMessage={shouldShowError ? title.errorMessage : undefined}
        />
      </div>

      <div className="mb-5">
        <LabelAndTextArea
          labelTitle="投稿内容"
          value={description.value}
          placeholder=""
          onChange={(value) => {
            dispatch({
              type: "changeArticleDescription",
              payload: {
                description: value,
              },
            });
          }}
          errorMessage={shouldShowError ? description.errorMessage : undefined}
        />
      </div>

      <div className="w-3/12 float-right">
        <Button
          name="投稿する"
          onClick={clickPostButton}
        />
      </div>
    </div>
  );
};
