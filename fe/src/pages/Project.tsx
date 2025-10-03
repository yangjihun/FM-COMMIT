import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faProjectDiagram, 
  faTimes, 
  faUsers, 
  faCalendar,
  faCode,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import projectsData from '../data/projects.json';

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

const Project: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  
  const projects: Project[] = projectsData.projects;
  
  const categories = ['전체', ...Array.from(new Set(projects.map(p => p.category).flat()))];
  
  const filteredProjects = selectedCategory === '전체' 
    ? projects 
    : projects.filter(p => p.category.includes(selectedCategory));

  const getStatusColor = (status: string) => {
    switch (status) {
      case '진행중':
        return 'text-blue-600 bg-blue-100';
      case '완료':
        return 'text-green-600 bg-green-100';
      case '기획중':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case '초급':
        return 'text-green-600 bg-green-100';
      case '중급':
        return 'text-yellow-600 bg-yellow-100';
      case '고급':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <section className="bg-gradient-primary text-white py-20">
        <div className="pt-16 max-w-6xl mx-auto px-6 text-center">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <FontAwesomeIcon icon={faProjectDiagram} className="text-3xl" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Project</h1>
          <p className="text-xl opacity-90"></p>
        </div>
      </section>
      
      <div className="pt-24 pb-20 min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          {/* 헤더 섹션 */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              팀 프로젝트
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              COMMIT에서 진행 중인 다양한 프로젝트들을 확인해보세요
            </p>
          </div>

          {/* 카테고리 필터 */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* 프로젝트 그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer overflow-hidden"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(project.difficulty)}`}>
                      {project.difficulty}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  
                  {/* 진행률 */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">진행률</span>
                      <span className="text-sm font-medium text-gray-700">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* 기술 스택 */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.slice(0, 3).map((tech, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        +{project.techStack.length - 3}
                      </span>
                    )}
                  </div>

                  {/* 팀 정보 */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <FontAwesomeIcon icon={faUsers} />
                      <span>{project.team.length}명</span>
                    </div>
                    <span>{project.category.join(', ')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <FontAwesomeIcon icon={faProjectDiagram} className="text-6xl text-gray-300 mb-4" />
              <p className="text-xl text-gray-500">해당 카테고리에 프로젝트가 없습니다.</p>
            </div>
          )}
        </div>

        {/* 프로젝트 상세 모달 */}
        {selectedProject && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedProject(null)}
          >
            <div 
              className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">
                  {selectedProject.title}
                </h2>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
              
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* 왼쪽: 프로젝트 이미지 및 기본 정보 */}
                  <div>
                    <img 
                      src={selectedProject.image} 
                      alt={selectedProject.title}
                      className="w-full h-64 object-cover rounded-lg mb-6"
                    />
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedProject.status)}`}>
                          {selectedProject.status}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(selectedProject.difficulty)}`}>
                          {selectedProject.difficulty}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-gray-600">
                        <FontAwesomeIcon icon={faCalendar} />
                        <span>{formatDate(selectedProject.startDate)} ~ {selectedProject.endDate ? formatDate(selectedProject.endDate) : '진행중'}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-gray-600">
                        <FontAwesomeIcon icon={faUsers} />
                        <span>팀원: {selectedProject.team.join(', ')}</span>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-700">진행률</span>
                          <span className="font-medium text-gray-700">{selectedProject.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className="bg-primary h-3 rounded-full"
                            style={{ width: `${selectedProject.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 오른쪽: 상세 설명 */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <FontAwesomeIcon icon={faProjectDiagram} />
                        프로젝트 개요
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {selectedProject.detailDescription.map((description, index) => (
                          <p key={index} className="text-gray-600 leading-relaxed">
                            {description}
                          </p>
                        ))}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <FontAwesomeIcon icon={faCode} />
                        기술 스택
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.techStack.map((tech, index) => (
                          <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <FontAwesomeIcon icon={faCheck} />
                        주요 기능
                      </h3>
                      <ul className="space-y-2">
                        {selectedProject.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2 text-gray-600">
                            <span className="text-green-500">•</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Project; 