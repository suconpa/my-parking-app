import PageContainer from "../../components/layouts/PageContainer";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import { Outlet } from "react-router-dom";

interface LayoutProps {
  hasHeader: boolean;
  hasFooter: boolean;
}

// 각 경로에 맞는 페이지에서 적용해야하는 레이아웃을 props로 받아 리턴해주는 컴포넌트
const LayoutRoute = ({ hasHeader, hasFooter }: LayoutProps) => {
  return (
    <PageContainer>
      {hasHeader && <Header />}
      <Outlet />
      {hasFooter && <Footer />}
    </PageContainer>
  );
};

export default LayoutRoute;
