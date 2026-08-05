import React from "react";
import { Title } from "../../../components/organisms/Title";
import { PcHeader } from "../../../components/organisms/header.pc";
import { SmHeader } from "../../../components/organisms/header.sm";
import { ArticlesPage } from "../../../components/organisms/articlesList";

export const ArticleList: React.FC = () => {
  return (
    <>
      <PcHeader />
      <SmHeader />
      <div className="mx-6 max-w-md md:mx-auto">
        <Title>投稿一覧画面</Title>
        <ArticlesPage />
      </div>
    </>
  );
};
