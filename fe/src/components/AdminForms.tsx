import React, { useState, useEffect } from 'react';

interface ProjectFormData {
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

interface RegularStudyFormData {
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

interface ProjectFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ProjectFormData) => void;
  editingItem?: ProjectFormData | null;
}

interface RegularStudyFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: RegularStudyFormData) => void;
  editingItem?: RegularStudyFormData | null;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({ isOpen, onClose, onSave, editingItem }) => {
  const [formData, setFormData] = useState<ProjectFormData>({
    id: '',
    title: '',
    description: '',
    status: '모집중',
    progress: 0,
    team: [],
    techStack: [],
    startDate: '',
    endDate: '',
    image: '',
    category: [],
    difficulty: '초급',
    detailDescription: [],
    features: [],
    challenges: []
  });

  useEffect(() => {
    if (editingItem) {
      setFormData(editingItem);
    } else {
      setFormData({
        id: '',
        title: '',
        description: '',
        status: '모집중',
        progress: 0,
        team: [],
        techStack: [],
        startDate: '',
        endDate: '',
        image: '',
        category: [],
        difficulty: '초급',
        detailDescription: [],
        features: [],
        challenges: []
      });
    }
  }, [editingItem]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleArrayChange = (field: keyof ProjectFormData, value: string) => {
    const array = value.split(',').map(item => item.trim()).filter(item => item);
    setFormData(prev => ({ ...prev, [field]: array }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">
          {editingItem ? '프로젝트 수정' : '프로젝트 추가'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">ID</label>
            <input
              type="text"
              value={formData.id}
              onChange={(e) => setFormData(prev => ({ ...prev, id: e.target.value }))}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">제목</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">설명</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">상태</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="모집중">모집중</option>
                <option value="진행중">진행중</option>
                <option value="완료">완료</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">진행률 (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.progress}
                onChange={(e) => setFormData(prev => ({ ...prev, progress: parseInt(e.target.value) || 0 }))}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">시작일</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">종료일</label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">팀원 (쉼표로 구분)</label>
            <input
              type="text"
              value={formData.team.join(', ')}
              onChange={(e) => handleArrayChange('team', e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="예: 홍길동, 김철수"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">기술 스택 (쉼표로 구분)</label>
            <input
              type="text"
              value={formData.techStack.join(', ')}
              onChange={(e) => handleArrayChange('techStack', e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="예: React, Node.js, MongoDB"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">카테고리 (쉼표로 구분)</label>
            <input
              type="text"
              value={formData.category.join(', ')}
              onChange={(e) => handleArrayChange('category', e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="예: 웹 개발, 모바일"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">난이도</label>
            <select
              value={formData.difficulty}
              onChange={(e) => setFormData(prev => ({ ...prev, difficulty: e.target.value }))}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="초급">초급</option>
              <option value="중급">중급</option>
              <option value="고급">고급</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">이미지 경로</label>
            <input
              type="text"
              value={formData.image}
              onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="/image.png"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              {editingItem ? '수정' : '추가'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const RegularStudyForm: React.FC<RegularStudyFormProps> = ({ isOpen, onClose, onSave, editingItem }) => {
  const [formData, setFormData] = useState<RegularStudyFormData>({
    id: '',
    title: '',
    description: '',
    status: '모집중',
    startDate: '',
    endDate: '',
    image: '',
    category: [],
    link: '',
    team: 0
  });

  useEffect(() => {
    if (editingItem) {
      setFormData(editingItem);
    } else {
      setFormData({
        id: '',
        title: '',
        description: '',
        status: '모집중',
        startDate: '',
        endDate: '',
        image: '',
        category: [],
        link: '',
        team: 0
      });
    }
  }, [editingItem]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleArrayChange = (field: keyof RegularStudyFormData, value: string) => {
    const array = value.split(',').map(item => item.trim()).filter(item => item);
    setFormData(prev => ({ ...prev, [field]: array }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">
          {editingItem ? '정기 스터디 수정' : '정기 스터디 추가'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">ID</label>
            <input
              type="text"
              value={formData.id}
              onChange={(e) => setFormData(prev => ({ ...prev, id: e.target.value }))}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">제목</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">설명</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">상태</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="모집중">모집중</option>
                <option value="진행중">진행중</option>
                <option value="완료">완료</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">팀원 수</label>
              <input
                type="number"
                min="0"
                value={formData.team}
                onChange={(e) => setFormData(prev => ({ ...prev, team: parseInt(e.target.value) || 0 }))}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">시작일</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">종료일</label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">카테고리 (쉼표로 구분)</label>
            <input
              type="text"
              value={formData.category.join(', ')}
              onChange={(e) => handleArrayChange('category', e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="예: 파이썬, C언어"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">링크</label>
            <input
              type="url"
              value={formData.link}
              onChange={(e) => setFormData(prev => ({ ...prev, link: e.target.value }))}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="https://example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">이미지 경로</label>
            <input
              type="text"
              value={formData.image}
              onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="/image.png"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              {editingItem ? '수정' : '추가'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
