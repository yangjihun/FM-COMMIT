import { useRef, useEffect, type ReactNode } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface PrivateRouteProps {
  children: ReactNode;
  fallback?: ReactNode;
}

const PrivateRoute = ({ 
  children, 
  fallback
}: PrivateRouteProps) => {
  const { user, isLoading } = useAuth();
  const googleSignInRef = useRef<HTMLDivElement>(null);

  const defaultFallback = (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">로그인이 필요합니다</h2>
          <p className="text-gray-600">이 페이지를 보려면 로그인해주세요.</p>
        </div>
        <div className="space-y-4">
          <div ref={googleSignInRef}></div>
          <button
            onClick={() => window.location.href = '/'}
            className="w-full px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    const initializeGoogleSignIn = () => {
      if ((window as any).google && (window as any).google.accounts && googleSignInRef.current) {
        try {
          // 기존 버튼이 있다면 제거
          googleSignInRef.current.innerHTML = '';

          (window as any).google.accounts.id.initialize({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID_HERE',
            callback: (response: any) => {
              if ((window as any).handleGoogleLogin) {
                (window as any).handleGoogleLogin(response);
              }
            }
          });

          (window as any).google.accounts.id.renderButton(
            googleSignInRef.current,
            {
              theme: 'outline',
              size: 'large',
              text: 'signin_with',
              width: '100%'
            }
          );
        } catch (error) {
          console.error('Google Sign-In 초기화 실패:', error);
        }
      }
    };

    // Google 스크립트가 로드될 때까지 대기
    if ((window as any).google) {
      initializeGoogleSignIn();
    } else {
      const checkGoogle = setInterval(() => {
        if ((window as any).google) {
          clearInterval(checkGoogle);
          initializeGoogleSignIn();
        }
      }, 100);
      
      return () => clearInterval(checkGoogle);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return user ? <>{children}</> : <>{fallback || defaultFallback}</>;
};

export default PrivateRoute;
