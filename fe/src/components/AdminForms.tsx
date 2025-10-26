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

export interface StudyFormData {
  header: {
    title: string;
    description: string;
    icon: string;
  };
  description: string;
  infoCards: Array<{ icon: string; title: string; content: string; }>;
  studyContent: Array<{ icon: string; title: string; description: string; }>;
  weeklyStudies: Array<{ week: number; date: string; href: string; }>;
  stats: {
    totalSessions: string;
    basicTrack: { label: string; current: string; };
    advancedTrack: { label: string; current: string; };
  };
}

interface StudyFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: StudyFormData) => void;
  initialData?: StudyFormData | null;
}

const defaultStudyFormData: StudyFormData = {
  header: {
    title: '',
    description: '',
    icon: 'book'
  },
  description: '',
  infoCards: [],
  studyContent: [],
  weeklyStudies: [],
  stats: {
    totalSessions: '',
    basicTrack: {
      label: '',
      current: ''
    },
    advancedTrack: {
      label: '',
      current: ''
    }
  }
};

const createDefaultStudyFormData = (): StudyFormData => JSON.parse(JSON.stringify(defaultStudyFormData));

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

  const handleMultilineArrayChange = (field: keyof ProjectFormData, value: string) => {
    const array = value
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);
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

          <div>
            <label className="block text-sm font-medium text-gray-700">상세 설명 (줄바꿈으로 구분)</label>
            <textarea
              value={formData.detailDescription.join('\n')}
              onChange={(e) => handleMultilineArrayChange('detailDescription', e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              rows={4}
              placeholder={'각 줄마다 항목을 입력해주세요.\n예)\n프로젝트 개요 문장\n세부 설명 문장'}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">주요 기능 (줄바꿈으로 구분)</label>
            <textarea
              value={formData.features.join('\n')}
              onChange={(e) => handleMultilineArrayChange('features', e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              rows={4}
              placeholder={'예)\n유저 인증\n실시간 알림'}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">도전 과제 (줄바꿈으로 구분)</label>
            <textarea
              value={formData.challenges.join('\n')}
              onChange={(e) => handleMultilineArrayChange('challenges', e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              rows={4}
              placeholder={'예)\n대규모 트래픽 처리\n외부 API 연동'}
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

type StudyArrayKey = 'infoCards' | 'studyContent' | 'weeklyStudies';

export const StudyForm: React.FC<StudyFormProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState<StudyFormData>(createDefaultStudyFormData());

  useEffect(() => {
    if (initialData) {
      setFormData(JSON.parse(JSON.stringify(initialData)));
    } else if (isOpen) {
      setFormData(createDefaultStudyFormData());
    }
  }, [initialData, isOpen]);

  const updateArrayItem = (key: StudyArrayKey, index: number, field: string, value: string | number) => {
    setFormData(prev => {
      const items = [...(prev[key] as any[])];
      items[index] = { ...items[index], [field]: value };
      return { ...prev, [key]: items };
    });
  };

  const addArrayItem = (key: StudyArrayKey, defaultValue: Record<string, any>) => {
    setFormData(prev => ({
      ...prev,
      [key]: [ ...(prev[key] as any[]), defaultValue ]
    }));
  };

  const removeArrayItem = (key: StudyArrayKey, index: number) => {
    setFormData(prev => {
      const items = [...(prev[key] as any[])];
      items.splice(index, 1);
      return { ...prev, [key]: items };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">스터디 정보 수정</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Header */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">헤더 제목</label>
              <input
                type="text"
                value={formData.header.title}
                onChange={(e) => setFormData(prev => ({ ...prev, header: { ...prev.header, title: e.target.value } }))}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">헤더 아이콘</label>
              <input
                type="text"
                value={formData.header.icon}
                onChange={(e) => setFormData(prev => ({ ...prev, header: { ...prev.header, icon: e.target.value } }))}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="예: book"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">헤더 설명</label>
            <textarea
              value={formData.header.description}
              onChange={(e) => setFormData(prev => ({ ...prev, header: { ...prev.header, description: e.target.value } }))}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              rows={2}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">소개 문구</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              rows={3}
            />
          </div>

          {/* Info cards */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">정보 카드</h3>
              <button
                type="button"
                onClick={() => addArrayItem('infoCards', { icon: 'calendar', title: '', content: '' })}
                className="px-3 py-1 bg-blue-500 text-white rounded"
              >
                추가
              </button>
            </div>
            {formData.infoCards.length === 0 && (
              <p className="text-sm text-gray-500">정보 카드를 추가하세요.</p>
            )}
            {formData.infoCards.map((card, index) => (
              <div key={`info-${index}`} className="grid md:grid-cols-4 gap-4 items-end border border-gray-200 rounded-lg p-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">아이콘</label>
                  <input
                    type="text"
                    value={card.icon}
                    onChange={(e) => updateArrayItem('infoCards', index, 'icon', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">제목</label>
                  <input
                    type="text"
                    value={card.title}
                    onChange={(e) => updateArrayItem('infoCards', index, 'title', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">내용</label>
                  <input
                    type="text"
                    value={card.content}
                    onChange={(e) => updateArrayItem('infoCards', index, 'content', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeArrayItem('infoCards', index)}
                  className="text-right text-sm text-red-500"
                >
                  삭제
                </button>
              </div>
            ))}
          </section>

          {/* Study content */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">주요 활동</h3>
              <button
                type="button"
                onClick={() => addArrayItem('studyContent', { icon: 'book', title: '', description: '' })}
                className="px-3 py-1 bg-blue-500 text-white rounded"
              >
                추가
              </button>
            </div>
            {formData.studyContent.length === 0 && (
              <p className="text-sm text-gray-500">활동을 추가하세요.</p>
            )}
            {formData.studyContent.map((content, index) => (
              <div key={`content-${index}`} className="grid md:grid-cols-3 gap-4 border border-gray-200 rounded-lg p-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">아이콘</label>
                  <input
                    type="text"
                    value={content.icon}
                    onChange={(e) => updateArrayItem('studyContent', index, 'icon', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">제목</label>
                  <input
                    type="text"
                    value={content.title}
                    onChange={(e) => updateArrayItem('studyContent', index, 'title', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">설명</label>
                  <textarea
                    value={content.description}
                    onChange={(e) => updateArrayItem('studyContent', index, 'description', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    rows={2}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeArrayItem('studyContent', index)}
                  className="text-right text-sm text-red-500 md:col-span-3"
                >
                  삭제
                </button>
              </div>
            ))}
          </section>

          {/* Weekly studies */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">주차별 스터디</h3>
              <button
                type="button"
                onClick={() => addArrayItem('weeklyStudies', { week: formData.weeklyStudies.length + 1, date: '', href: '' })}
                className="px-3 py-1 bg-blue-500 text-white rounded"
              >
                추가
              </button>
            </div>
            {formData.weeklyStudies.length === 0 && (
              <p className="text-sm text-gray-500">주차 데이터를 추가하세요.</p>
            )}
            {formData.weeklyStudies.map((study, index) => (
              <div key={`week-${index}`} className="grid md:grid-cols-4 gap-4 border border-gray-200 rounded-lg p-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">주차</label>
                  <input
                    type="number"
                    value={study.week}
                    onChange={(e) => updateArrayItem('weeklyStudies', index, 'week', Number(e.target.value))}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    min={1}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">날짜</label>
                  <input
                    type="text"
                    value={study.date}
                    onChange={(e) => updateArrayItem('weeklyStudies', index, 'date', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="예: 7.15"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">링크</label>
                  <input
                    type="text"
                    value={study.href}
                    onChange={(e) => updateArrayItem('weeklyStudies', index, 'href', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeArrayItem('weeklyStudies', index)}
                  className="text-right text-sm text-red-500 md:col-span-4"
                >
                  삭제
                </button>
              </div>
            ))}
          </section>

          {/* Stats */}
          <section className="space-y-3">
            <h3 className="text-lg font-semibold">스터디 현황</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">총 세션</label>
                <input
                  type="text"
                  value={formData.stats.totalSessions}
                  onChange={(e) => setFormData(prev => ({ ...prev, stats: { ...prev.stats, totalSessions: e.target.value } }))}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">기초반 라벨</label>
                <input
                  type="text"
                  value={formData.stats.basicTrack.label}
                  onChange={(e) => setFormData(prev => ({ ...prev, stats: { ...prev.stats, basicTrack: { ...prev.stats.basicTrack, label: e.target.value } } }))}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">기초반 현재 진행</label>
                <input
                  type="text"
                  value={formData.stats.basicTrack.current}
                  onChange={(e) => setFormData(prev => ({ ...prev, stats: { ...prev.stats, basicTrack: { ...prev.stats.basicTrack, current: e.target.value } } }))}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">심화반 라벨</label>
                <input
                  type="text"
                  value={formData.stats.advancedTrack.label}
                  onChange={(e) => setFormData(prev => ({ ...prev, stats: { ...prev.stats, advancedTrack: { ...prev.stats.advancedTrack, label: e.target.value } } }))}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">심화반 현재 진행</label>
                <input
                  type="text"
                  value={formData.stats.advancedTrack.current}
                  onChange={(e) => setFormData(prev => ({ ...prev, stats: { ...prev.stats, advancedTrack: { ...prev.stats.advancedTrack, current: e.target.value } } }))}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
            </div>
          </section>

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
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
