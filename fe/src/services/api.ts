// API 기본 설정
const API_BASE_URL = 'http://localhost:5000/api';

// API 응답 타입 정의
interface ApiResponse<T> {
  status: 'success' | 'fail';
  data?: T;
  user?: T;
  token?: string;
  error?: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  level: string;
}

// 인증 관련 API
export const authApi = {
  // 구글 로그인
  loginWithGoogle: async (credential: string): Promise<ApiResponse<User>> => {
    const response = await fetch(`${API_BASE_URL}/auth/google`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token: credential })
    });

    return await response.json();
  }
};

// 사용자 관련 API
export const userApi = {
  // 사용자 정보 가져오기
  getUserInfo: async (token: string): Promise<ApiResponse<User>> => {
    const response = await fetch(`${API_BASE_URL}/user/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    return await response.json();
  }
};

// 토큰 관리
export const tokenManager = {
  getToken: (): string | null => {
    return localStorage.getItem('token');
  },
  
  setToken: (token: string): void => {
    localStorage.setItem('token', token);
  },
  
  removeToken: (): void => {
    localStorage.removeItem('token');
  }
};
