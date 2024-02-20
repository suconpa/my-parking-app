import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Theme from "./components/UI/Theme";

import PrivateRoute from "./router/layouts/PrivateRoute";
import UserTypeRoute from "./router/layouts/UserTypeRoute";
import LayoutRoute from "./router/layouts/LayoutRoute";

import ErrorPage from "./pages/ErrorPage";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";

import ProductDetailPage from "./pages/products/ProductDetailPage";
import ProductRegistPage from "./pages/products/ProductRegistPage";
import ProductEditPage from "./pages/products/ProductEditPage";

import MyPage from "./pages/my-services/MyPage";
import MyPageEditPage from "./pages/my-services/MyPageEditPage";
import MyProductPage from "./pages/my-services/MyProductPage";

import PurchasePage from "./pages/purchase/PurchaseFormPage";
import PurchaseResultPage from "./pages/purchase/PurchaseResultPage";

import SellerRepliesPage from "./pages/reply/SellerRepliesPage";
import ReplyPage from "./pages/reply/ReplyPage";
import MyReplyPage from "./pages/reply/MyReplyPage";

import OrderHistoryPage from "./pages/order-hisotry/OrderHistoryPage";
import OrderHistoryDetailPage from "./pages/order-hisotry/OrderHistoryDetailPage";

// 라우터 설정
const router = createBrowserRouter([
  // 로그인(토큰 X)을 하진 않았을때만 접근 가능 페이지
  {
    path: "/",
    element: <PrivateRoute isNeedLoggedIn={false} />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <LayoutRoute hasHeader={true} hasFooter={false} />,
        children: [
          {
            path: "login",
            element: <LoginPage />,
          },
          {
            path: "signup",
            element: <SignUpPage />,
          },
        ],
      },
    ],
  },
  // 로그인(토큰 O)을 해야만 접근 가능 페이지
  {
    path: "/",
    element: <PrivateRoute isNeedLoggedIn={true} />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <LayoutRoute hasHeader={true} hasFooter={true} />,
        children: [
          {
            // 회원(공통)
            path: "mypage",
            children: [
              {
                path: ":userId",
                element: <MyPage />,
              },
              {
                path: ":userId/edit",
                element: <MyPageEditPage />,
              },
            ],
          },
          {
            // 리뷰(공통) - 판매자 리뷰 보는 페이지
            path: "reply/seller-replies/:sellerId",
            element: <SellerRepliesPage />,
          },
        ],
      },

      // 로그인한 유저타입이 "seller"일때
      {
        element: <UserTypeRoute userType="seller" />,
        children: [
          {
            element: <LayoutRoute hasHeader={true} hasFooter={true} />,
            children: [
              {
                // 회원
                path: "mypage/:userId/mylist",
                element: <MyProductPage />,
              },
              {
                // 상품
                path: "products",
                children: [
                  // 상품 등록페이지
                  {
                    path: "regist",
                    element: <ProductRegistPage />,
                  },
                  // 상품 수정페이지
                  {
                    path: ":productId/edit",
                    element: <ProductEditPage />,
                  },
                ],
              },
            ],
          },
        ],
      },
      // 로그인한 유저타입이 "user"일때
      {
        element: <UserTypeRoute userType="user" />,
        children: [
          {
            element: <LayoutRoute hasHeader={true} hasFooter={true} />,
            children: [
              {
                // 구매
                path: "purchase",
                children: [
                  // 구매 양식 페이지
                  {
                    index: true,
                    element: <PurchasePage />,
                  },
                  // 구매 결과 페이지
                  {
                    path: "result",
                    element: <PurchaseResultPage />,
                  },
                ],
              },
              {
                // 리뷰
                path: "reply",
                children: [
                  // 리뷰 쓰는 페이지
                  {
                    path: ":productId/:orderId",
                    element: <ReplyPage />,
                  },
                  // 내가 쓴 리뷰 보는 페이지
                  {
                    path: "replies",
                    element: <MyReplyPage />,
                  },
                ],
              },
              {
                // 주문 목록
                path: "order-history",
                children: [
                  {
                    index: true,
                    element: <OrderHistoryPage />,
                  },
                  {
                    path: ":orderId",
                    element: <OrderHistoryDetailPage />,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  // 언제든 접근 가능한 페이지
  {
    path: "/",
    element: <PrivateRoute isNeedLoggedIn={false} />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "home",
        element: <HomePage />,
      },
      {
        element: <LayoutRoute hasHeader={true} hasFooter={false} />,
        children: [
          {
            path: "products/:productId",
            element: <ProductDetailPage />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <Theme>
      <RouterProvider router={router} />
    </Theme>
  );
}

export default App;
