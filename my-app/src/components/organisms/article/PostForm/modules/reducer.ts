import React from "react";
import { InputForm, Action } from "./types";

export const reducer: React.Reducer<InputForm, Action> = (
  prevState,
  action
) => {
  switch (action.type) {
    case "showErrorMessage":
      return {
        ...prevState,
        shouldShowError: true,
      };
    case "changeArticleTitle":
      if (!action.payload.title.length) {
        return {
          ...prevState,
          title: {
            value: action.payload.title,
            errorMessage: "必須入力です",
          },
        };
      }

      return {
        ...prevState,
        title: {
          value: action.payload.title,
          errorMessage: undefined,
        },
      };
    case "changeArticleDescription":
      if (!action.payload.description.length) {
        return {
          ...prevState,
          description: {
            value: action.payload.description,
            errorMessage: "必須入力です",
          },
        };
      }

      return {
        ...prevState,
        description: {
          value: action.payload.description,
          errorMessage: undefined,
        },
      };
    default:
      return prevState;
  }
};
