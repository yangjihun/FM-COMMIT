import React, { useEffect, useRef } from 'react';

interface LoginButtonProps {
  className?: string;
}

const LoginButton: React.FC<LoginButtonProps> = ({ className = '' }) => {
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initializeGoogleSignIn = () => {
      if ((window as any).google && (window as any).google.accounts && buttonRef.current) {
        try {
          // 기존 버튼이 있다면 제거
          buttonRef.current.innerHTML = '';

          (window as any).google.accounts.id.initialize({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID_HERE',
            callback: (response: any) => {
              if ((window as any).handleGoogleLogin) {
                (window as any).handleGoogleLogin(response);
              }
            },
            // COOP 문제 해결을 위한 설정
            use_fedcm_for_prompt: false,
            cancel_on_tap_outside: false
          });

          (window as any).google.accounts.id.renderButton(
            buttonRef.current,
            {
              theme: 'outline',
              size: 'medium',
              text: 'signin_with',
              width: '100%',
              // COOP 문제 해결을 위한 설정
              use_fedcm_for_prompt: false
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
    <div className={className}>
      <div ref={buttonRef}></div>
    </div>
  );
};

export default LoginButton;