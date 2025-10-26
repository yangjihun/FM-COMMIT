import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faProjectDiagram, 
  faTimes, 
  faUsers, 
  faCalendar
} from '@fortawesome/free-solid-svg-icons';
import { publicApi } from '../services/api';

interface Project {
  id: string;
  title: string;
  description: string;
  status: string;
  team: number;
  startDate: string;
  endDate: string;
  image: string;
  link: string;
  category: string[];
}

const RegularStudy: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudies = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await publicApi.getRegularStudy();
        if (response.status === 'success') {
          setProjects(response.data || []);
        } else {
          setError(response.error || '스터디 정보를 불러오지 못했습니다.');
        }
      } catch (err) {
        setError('스터디 정보를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudies();
  }, []);
  
  const categories = ['전체', ...Array.from(new Set(projects.flatMap(p => p.category || [])))];
  
  const filteredProjects = selectedCategory === '전체' 
    ? projects 
    : projects.filter(p => (p.category || []).includes(selectedCategory));

  const formatDate = (dateString: string) => {
    if (!dateString) return '미정';
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString('ko-KR', {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Study</h1>
          <p className="text-xl opacity-90"></p>
        </div>
      </section>
      
      <div className="pt-24 pb-20 min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          {/* 헤더 섹션 */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              소그룹 스터디
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              COMMIT에서 진행 중인 다양한 소그룹 스터디들을 확인해보세요
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

          {/* 상태 표시 */}
          {isLoading && (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          )}
          {error && (
            <div className="text-center text-red-500 py-10">{error}</div>
          )}

          {/* 프로젝트 그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {!isLoading && !error && filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer overflow-hidden"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative flex items-center justify-center">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-48 h-48 object-cover"
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* 팀 정보 */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <FontAwesomeIcon icon={faUsers} />
                      <span>{project.team ? `${project.team}명` : '인원 미정'}</span>
                    </div>
                    <span>{(project.category || []).join(', ') || '카테고리 미정'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {!isLoading && !error && filteredProjects.length === 0 && (
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
                    {selectedProject.image && (
                      <img 
                        src={selectedProject.image} 
                        alt={selectedProject.title}
                        className="w-64 h-64 object-cover rounded-lg mb-6"
                      />
                    )}
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        {selectedProject.link && (
                          <a 
                            href={selectedProject.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="underline text-blue-400 hover:text-blue-500 break-all"
                          >
                            {selectedProject.link}
                          </a>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2 text-gray-600">
                        <FontAwesomeIcon icon={faCalendar} />
                        <span>{formatDate(selectedProject.startDate)} ~ {selectedProject.endDate ? formatDate(selectedProject.endDate) : '진행중'}</span>
                      </div>
                    </div>
                  </div>

                  {/* 오른쪽: 상세 설명 */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <FontAwesomeIcon icon={faProjectDiagram} />
                        스터디 개요
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {selectedProject.description}
                      </p>
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

export default RegularStudy; 
