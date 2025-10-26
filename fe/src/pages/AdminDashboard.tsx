import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { dataApi, userApi, tokenManager } from '../services/api';
import { ProjectForm, RegularStudyForm } from '../components/AdminForms';
import { useAuth } from '../contexts/AuthContext';

interface Project {
  id: string;
  title: string;
  description: string;
  status: string;
  progress: number;
  team: string[];
  techStack: string[];
  startDate: string;
  endDate: string;
  image: string;
  category: string[];
  difficulty: string;
  detailDescription: string[];
  features: string[];
  challenges: string[];
}

interface RegularStudy {
  id: string;
  title: string;
  description: string;
  status: string;
  startDate: string;
  endDate: string;
  image: string;
  category: string[];
  link: string;
  team: number;
}

interface AdminUser {
  _id: string;
  name: string;
  email: string;
  level: string;
  createdAt: string;
}

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'projects' | 'study' | 'regular-study' | 'users'>('projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [regularStudies, setRegularStudies] = useState<RegularStudy[]>([]);
  const [studyData, setStudyData] = useState<any>(null);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editingItem, setEditingItem] = useState<any>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  const token = tokenManager.getToken();

  useEffect(() => {
    // 로딩 중이면 대기
    if (isLoading) return;
    
    // 토큰이 없으면 로그인 페이지로
    if (!token) {
      navigate('/admin/login');
      return;
    }
    
    // 사용자 정보가 없거나 admin이 아니면 접근 거부
    if (!user || user.level !== 'admin') {
      navigate('/');
      return;
    }
    
    loadData();
  }, [activeTab, token, user, isLoading]);

  const loadData = async () => {
    if (!token) return;
    
    setLoading(true);
    try {
      if (activeTab === 'projects') {
        const response = await dataApi.getProjects(token);
        if (response.status === 'success') {
          setProjects(response.data || []);
        }
      } else if (activeTab === 'regular-study') {
        const response = await dataApi.getRegularStudy(token);
        if (response.status === 'success') {
          setRegularStudies(response.data || []);
        }
      } else if (activeTab === 'study') {
        const response = await dataApi.getStudy(token);
        if (response.status === 'success') {
          setStudyData(response.data);
        }
      } else if (activeTab === 'users') {
        const response = await userApi.getAllUsers(token);
        if (response.status === 'success') {
          setUsers(response.data || []);
        }
      }
    } catch (err) {
      setError('데이터를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    tokenManager.removeToken();
    navigate('/admin/login');
  };

  const handleDelete = async (id: string) => {
    if (!token || !confirm('정말 삭제하시겠습니까?')) return;

    try {
      if (activeTab === 'projects') {
        await dataApi.deleteProject(token, id);
        setProjects(projects.filter(p => p.id !== id));
      } else if (activeTab === 'regular-study') {
        await dataApi.deleteRegularStudy(token, id);
        setRegularStudies(regularStudies.filter(s => s.id !== id));
      }
    } catch (err) {
      setError('삭제 중 오류가 발생했습니다.');
    }
  };

  const handleSave = async (item: any) => {
    if (!token) return;

    try {
      if (activeTab === 'projects') {
        if (editingItem) {
          await dataApi.updateProject(token, editingItem.id, item);
          setProjects(projects.map(p => p.id === editingItem.id ? item : p));
        } else {
          await dataApi.addProject(token, item);
          setProjects([...projects, item]);
        }
      } else if (activeTab === 'regular-study') {
        if (editingItem) {
          await dataApi.updateRegularStudyItem(token, editingItem.id, item);
          setRegularStudies(regularStudies.map(s => s.id === editingItem.id ? item : s));
        } else {
          await dataApi.addRegularStudy(token, item);
          setRegularStudies([...regularStudies, item]);
        }
      }
      setEditingItem(null);
      setShowAddForm(false);
    } catch (err) {
      setError('저장 중 오류가 발생했습니다.');
    }
  };

  const handleUserLevelChange = async (userId: string, newLevel: string) => {
    if (!token || !confirm('사용자 권한을 변경하시겠습니까?')) return;

    try {
      const response = await userApi.updateUserLevel(token, userId, newLevel);
      if (response.status === 'success') {
        setUsers(users.map(user => 
          user._id === userId ? { ...user, level: newLevel } : user
        ));
      } else {
        setError(response.error || '권한 변경 중 오류가 발생했습니다.');
      }
    } catch (err) {
      setError('권한 변경 중 오류가 발생했습니다.');
    }
  };

  const renderProjectsTable = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">프로젝트 관리</h3>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          프로젝트 추가
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">제목</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">진행률</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">팀</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">작업</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {projects.map((project) => (
              <tr key={project.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {project.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {project.status}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {project.progress}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {project.team.join(', ')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => setEditingItem(project)}
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderUsersTable = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">사용자 관리</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">이름</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">이메일</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">권한</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">가입일</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">작업</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    user.level === 'admin' 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {user.level === 'admin' ? '관리자' : '일반 사용자'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {user.level === 'admin' ? (
                    <button
                      onClick={() => handleUserLevelChange(user._id, 'customer')}
                      className="text-orange-600 hover:text-orange-900"
                    >
                      일반 사용자로 변경
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUserLevelChange(user._id, 'admin')}
                      className="text-green-600 hover:text-green-900"
                    >
                      관리자로 승격
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderRegularStudyTable = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">정기 스터디 관리</h3>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          스터디 추가
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">제목</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">카테고리</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">팀원 수</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">작업</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {regularStudies.map((study) => (
              <tr key={study.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {study.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {study.status}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {study.category.join(', ')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {study.team}명
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => setEditingItem(study)}
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => handleDelete(study.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              로그아웃
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { key: 'projects', label: '프로젝트' },
              { key: 'study', label: '스터디' },
              { key: 'regular-study', label: '정기 스터디' },
              { key: 'users', label: '사용자 관리' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.key
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="py-6">
          {error && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
              <p className="mt-2 text-gray-600">로딩 중...</p>
            </div>
          ) : (
            <>
              {activeTab === 'projects' && renderProjectsTable()}
              {activeTab === 'regular-study' && renderRegularStudyTable()}
              {activeTab === 'users' && renderUsersTable()}
              {activeTab === 'study' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">스터디 정보 관리</h3>
                  <div className="bg-white p-6 rounded-lg shadow">
                    <pre className="whitespace-pre-wrap text-sm">
                      {JSON.stringify(studyData, null, 2)}
                    </pre>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Forms */}
      <ProjectForm
        isOpen={showAddForm && activeTab === 'projects'}
        onClose={() => {
          setShowAddForm(false);
          setEditingItem(null);
        }}
        onSave={handleSave}
        editingItem={editingItem}
      />

      <RegularStudyForm
        isOpen={showAddForm && activeTab === 'regular-study'}
        onClose={() => {
          setShowAddForm(false);
          setEditingItem(null);
        }}
        onSave={handleSave}
        editingItem={editingItem}
      />
    </div>
  );
};

export default AdminDashboard;
