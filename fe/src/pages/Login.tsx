import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';

const Login: React.FC = () => {
  useEffect(() => {
    const initializeGoogleSignIn = () => {
      if ((window as any).google && (window as any).google.accounts) {
        try {
          (window as any).google.accounts.id.initialize({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID_HERE',
            callback: (response: any) => {
              if ((window as any).handleGoogleLogin) {
                (window as any).handleGoogleLogin(response);
              }
            }
          });

          (window as any).google.accounts.id.renderButton(
            document.getElementById('google-signin-button-login'),
            {
              theme: 'outline',
              size: 'large',
              text: 'signin_with',
              width: 300
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <FontAwesomeIcon 
              icon={faCode} 
              className="text-3xl text-blue-500 mr-2" 
            />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              COMMIT
            </h1>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">로그인이 필요합니다</h2>
          <p className="text-gray-600">COMMIT의 주요 활동을 보려면 로그인해주세요.</p>
        </div>
        
        <div className="space-y-6 flex flex-col items-center justify-center">
          <div className="text-center">
            <div id="google-signin-button-login"></div>
          </div>
          
          <div className="text-center">
            <button
              onClick={() => window.location.href = '/'}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              홈으로 돌아가기
            </button>
          </div>
        </div>
        
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-sm font-medium text-blue-900 mb-2">COMMIT이란?</h3>
          <p className="text-xs text-blue-700">
            가천대학교 금융수학과 IT 동아리로, 프로그래밍과 금융에 관심 있는 학생들이 함께 성장하는 공간입니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;