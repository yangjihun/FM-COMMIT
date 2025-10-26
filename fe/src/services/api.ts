// API 기본 설정
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// API 응답 타입 정의
interface ApiResponse<T> {
  status: 'success' | 'fail';
  data?: T;
  user?: T;
  users?: T;
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
  },

  // Admin 로그인
  loginAdmin: async (email: string, password: string): Promise<ApiResponse<User>> => {
    const response = await fetch(`${API_BASE_URL}/auth/admin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
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
  },

  // 모든 사용자 조회 (Admin만)
  getAllUsers: async (token: string): Promise<ApiResponse<any[]>> => {
    const response = await fetch(`${API_BASE_URL}/user/all`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    return await response.json();
  },

  // 사용자 권한 변경 (Admin만)
  updateUserLevel: async (token: string, targetUserId: string, level: string): Promise<ApiResponse<User>> => {
    const response = await fetch(`${API_BASE_URL}/user/level`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ targetUserId, level })
    });

    return await response.json();
  }
};

// 데이터 관리 API
export const dataApi = {
  // 프로젝트 관리
  getProjects: async (token: string): Promise<ApiResponse<any[]>> => {
    const response = await fetch(`${API_BASE_URL}/admin/data/projects`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return await response.json();
  },

  updateProjects: async (token: string, projects: any[]): Promise<ApiResponse<any>> => {
    const response = await fetch(`${API_BASE_URL}/admin/data/projects`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ projects })
    });
    return await response.json();
  },

  addProject: async (token: string, project: any): Promise<ApiResponse<any>> => {
    const response = await fetch(`${API_BASE_URL}/admin/data/projects`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(project)
    });
    return await response.json();
  },

  updateProject: async (token: string, id: string, project: any): Promise<ApiResponse<any>> => {
    const response = await fetch(`${API_BASE_URL}/admin/data/projects/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(project)
    });
    return await response.json();
  },

  deleteProject: async (token: string, id: string): Promise<ApiResponse<any>> => {
    const response = await fetch(`${API_BASE_URL}/admin/data/projects/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return await response.json();
  },

  // 스터디 관리
  getStudy: async (token: string): Promise<ApiResponse<any>> => {
    const response = await fetch(`${API_BASE_URL}/admin/data/study`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return await response.json();
  },

  updateStudy: async (token: string, studyData: any): Promise<ApiResponse<any>> => {
    const response = await fetch(`${API_BASE_URL}/admin/data/study`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(studyData)
    });
    return await response.json();
  },

  // 정기 스터디 관리
  getRegularStudy: async (token: string): Promise<ApiResponse<any[]>> => {
    const response = await fetch(`${API_BASE_URL}/admin/data/regular-study`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return await response.json();
  },

  updateRegularStudy: async (token: string, studies: any[]): Promise<ApiResponse<any>> => {
    const response = await fetch(`${API_BASE_URL}/admin/data/regular-study`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ projects: studies })
    });
    return await response.json();
  },

  addRegularStudy: async (token: string, study: any): Promise<ApiResponse<any>> => {
    const response = await fetch(`${API_BASE_URL}/admin/data/regular-study`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(study)
    });
    return await response.json();
  },

  updateRegularStudyItem: async (token: string, id: string, study: any): Promise<ApiResponse<any>> => {
    const response = await fetch(`${API_BASE_URL}/admin/data/regular-study/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(study)
    });
    return await response.json();
  },

  deleteRegularStudy: async (token: string, id: string): Promise<ApiResponse<any>> => {
    const response = await fetch(`${API_BASE_URL}/admin/data/regular-study/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return await response.json();
  }
};

// 공개 데이터 API
export const publicApi = {
  getProjects: async (): Promise<ApiResponse<any[]>> => {
    const response = await fetch(`${API_BASE_URL}/public/projects`, {
      headers: { 'Content-Type': 'application/json' }
    });
    return await response.json();
  },

  getStudy: async (): Promise<ApiResponse<any>> => {
    const response = await fetch(`${API_BASE_URL}/public/study`, {
      headers: { 'Content-Type': 'application/json' }
    });
    return await response.json();
  },

  getRegularStudy: async (): Promise<ApiResponse<any[]>> => {
    const response = await fetch(`${API_BASE_URL}/public/regular-study`, {
      headers: { 'Content-Type': 'application/json' }
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
