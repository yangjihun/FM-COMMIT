import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const RouteScrollToTop: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // 라우트가 변경될 때마다 페이지 최상단으로 스크롤
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // 즉시 이동 (smooth는 너무 느림)
    });
  }, [location.pathname]); // pathname이 변경될 때마다 실행

  return null; // 이 컴포넌트는 UI를 렌더링하지 않음
};

export default RouteScrollToTop; 