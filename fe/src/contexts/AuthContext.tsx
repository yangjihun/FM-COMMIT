import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { authApi, userApi, tokenManager } from '../services/api';

interface User {
  _id: string;
  name: string;
  email: string;
  level: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (credential: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 초기 로그인 상태 확인
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = tokenManager.getToken();
      if (token) {
        try {
          const data = await userApi.getUserInfo(token);
          if (data.status === 'success' && data.user) {
            setUser(data.user);
          } else {
            tokenManager.removeToken();
          }
        } catch (error) {
          console.error('사용자 정보 가져오기 실패:', error);
          tokenManager.removeToken();
        }
      }
      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);

  // 구글 로그인 콜백 설정
  useEffect(() => {
    // 전역 콜백 함수 설정
    (window as any).handleGoogleLogin = async (response: any) => {
      if (response.credential) {
        await login(response.credential);
      }
    };

    return () => {
      if ((window as any).handleGoogleLogin) {
        delete (window as any).handleGoogleLogin;
      }
    };
  }, []);

  const login = async (credential: string) => {
    try {
      const data = await authApi.loginWithGoogle(credential);
      
      if (data.status === 'success' && data.token && data.user) {
        tokenManager.setToken(data.token);
        setUser(data.user);
        // 홈페이지로 리다이렉트
        window.location.href = '/';
      } else {
        alert('로그인 실패: ' + (data.error || '알 수 없는 오류'));
      }
    } catch (error) {
      console.error('로그인 오류:', error);
      alert('로그인 중 오류가 발생했습니다.');
    }
  };

  const logout = () => {
    tokenManager.removeToken();
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};