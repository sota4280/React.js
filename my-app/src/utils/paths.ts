export const paths = {
  top: "/",
  form: "/form",
  index: "/index",
  login: "/login",
  mypage: "/mypage",
  register: "/register",
  post: "/post",
  detail: "/articles/:articleId",
  list: "/list",
  articleDetail: (articleId: number) => `/articles/${articleId}`,
};
