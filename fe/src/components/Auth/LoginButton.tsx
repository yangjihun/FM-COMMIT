import React, { useEffect, useRef } from 'react';

interface LoginButtonProps {
  className?: string;
  size?: 'medium' | 'large';
  width?: number | string;
  label?: string;
}

const LoginButton: React.FC<LoginButtonProps> = ({
  className = '',
  size = 'medium',
  width = '100%',
  label = 'gachon 계정으로 로그인'
}) => {
  const googleButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initializeGoogleSignIn = () => {
      if ((window as any).google && (window as any).google.accounts && googleButtonRef.current) {
        try {
          googleButtonRef.current.innerHTML = '';

          (window as any).google.accounts.id.initialize({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID_HERE',
            callback: (response: any) => {
              if ((window as any).handleGoogleLogin) {
                (window as any).handleGoogleLogin(response);
              }
            }
          });

          (window as any).google.accounts.id.renderButton(googleButtonRef.current, {
            theme: 'outline',
            size,
            text: 'signin_with',
            width
          });
        } catch (error) {
          console.error('Google Sign-In initialization failed:', error);
        }
      }
    };

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
  }, [size, width]);

  const buttonWidth = typeof width === 'number' ? `${width}px` : width;
  const buttonHeightClass = size === 'large' ? 'h-11' : 'h-10';
  const buttonTextClass = size === 'large' ? 'text-base' : 'text-sm';

  return (
    <div className={className}>
      <div className="relative" style={{ width: buttonWidth }}>
        <div ref={googleButtonRef} className="absolute inset-0 z-20 opacity-0" aria-label={label}></div>
        <div
          className={`pointer-events-none flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 font-medium text-gray-700 shadow-sm ${buttonHeightClass} ${buttonTextClass}`}
        >
          {label}
        </div>
      </div>
    </div>
  );
};

export default LoginButton;
