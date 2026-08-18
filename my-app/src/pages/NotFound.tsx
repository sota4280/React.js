import { Header } from "../components/organisms/Header";

export const NotFound: React.FC = () => {
  return (
    <>
      <Header />

      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-4xl font-bold tracking-wider">404</p>
          <p className="mt-2 text-sm font-semibold">NOT FOUND</p>
          <p className="mt-6 text-sm text-gray-600">
            ページが見つかりませんでした。
          </p>
        </div>
      </div>
    </>
  );
};
