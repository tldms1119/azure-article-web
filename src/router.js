import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import NotFoundPage from "./components/NotFoundPage";
import ArticleBoard from "./components/ArticleBoard";
import ArticleUpdate from "./components/ArticleUpdate";
import ArticleInsert from "./components/ArticleInsert";

// 바뀌는 URL을 한곳에서 정의
const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <NotFoundPage />, // 해당 경로로 접속하지 않았을떄 연결
        children: [
            // 로그인 후 권한 처리 등 용이하게 사용하기 위해 children으로 경로 따라감
            // children의 children으로 하위 path 잡아갈 수 있음(2depth, 3depth 이동 시) -> children: <Outlet />
            // Link 태그를 이용해서 Router에서 미리 정의해놓은 path를 기입하게 되면 해당하는 컴포넌트 렌더링해줌
            {
                path: "/articles",
                element: <ArticleBoard/>,
            },
            {
                path: "/articles/:id",
                element: <ArticleUpdate/>,
            },
            {
                path: "/articles/register",
                element: <ArticleInsert/>,
            },
            // TODO Root path 로 들어오면 바로 list 로 리다이렉트 시키고 싶은데요
        ],
    },
]);

export default router;