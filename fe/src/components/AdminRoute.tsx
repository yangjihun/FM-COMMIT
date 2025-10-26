import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isLoading) return;
    
    if (!user) {
      navigate('/admin/login');
      return;
    }
    
    if (user.level !== 'admin') {
      navigate('/');
      return;
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (!user || user.level !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-red-600 mb-2">접근 권한이 없습니다</h2>
            <p className="text-gray-600">이 페이지는 관리자만 접근할 수 있습니다.</p>
          </div>
          <div className="space-y-4">
            <button
              onClick={() => navigate('/')}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              홈으로 돌아가기
            </button>
            <button
              onClick={() => navigate('/admin/login')}
              className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
            >
              관리자 로그인
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AdminRoute;
