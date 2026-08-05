import React from "react";
import { General } from "../../components/organisms/general";
import { Title } from "../../components/organisms/Title";
import { PcHeader } from "../../components/organisms/header.pc";
import { SmHeader } from "../../components/organisms/header.sm";
// import { paths } from "../../utils/paths";
// import { Link } from "react-router-dom";

export const GeneralPage: React.FC = () => {
  return (
    <div className="App">
      <>
        <PcHeader />
        <SmHeader />
        <Title>ブログサービス課題</Title>
        <General />
      </>

      {/* 記事投稿画面＆記事詳細画面　リンク */}
      {/* <nav className="leading-10">
        <li>
          <Link to={paths.article.add}>記事投稿画面</Link>
        </li>
        <li>
          <Link to={paths.articles.detail("hoge")}>記事詳細画面(ダミー)</Link>
        </li>
      </nav> */}
    </div>
  );
};
