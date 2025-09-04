import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBook, 
  faProjectDiagram, 
  faUsers, 
  faTools, 
  faChevronRight,
  faExternalLinkAlt,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons';
import { 
  faJs, 
  faGithub, 
  faPython 
} from '@fortawesome/free-brands-svg-icons';
import { faDatabase } from '@fortawesome/free-solid-svg-icons';
import Particles from '../components/Particles';
import LoadingScreen from '../components/LoadingScreen';
import { useAuth } from '../contexts/AuthContext';

interface ActivityCard {
  id: string;
  title: string;
  description: string;
  date: string;
  icon: string;
  href?: string;
  disabled?: boolean;
  status?: 'active' | 'completed' | 'upcoming';
}

interface StatItem {
  label: string;
  value: string | number;
  target?: number;
}

const Home: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<StatItem[]>([
    { label: '멤버', value: 0, target: 24 },
    { label: '프로젝트', value: 0, target: 2 },
    { label: '스터디', value: 0, target: 1 }
  ]);

  const activityCards: ActivityCard[] = [
    {
      id: 'study',
      title: '여름방학 스터디',
      description: '파이썬 기초, 프로젝트',
      date: '2025.07.15 ~ 8.19',
      icon: 'book',
      href: '/study',
      status: 'completed'
    },
    {
      id: 'regular-study',
      title: '소그룹 스터디',
      description: '소그룹별로 진행되는 스터디',
      date: '2025.09 시작 예정',
      icon: 'tools',
      disabled: true,
      status: 'upcoming'
    },
    {
      id: 'project',
      title: '팀 프로젝트',
      description: '개발 프로젝트 진행',
      date: '진행중',
      icon: 'project-diagram',
      href: '/project',
      status: 'upcoming'
    },
    {
      id: 'networking',
      title: '네트워킹 행사',
      description: '',
      date: '준비중',
      icon: 'users',
      href: '/networking',
      disabled: true,
      status: 'upcoming'
    }
  ];

  const animateCounter = (index: number, target: number) => {
    let current = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      
      setStats(prev => prev.map((stat, i) => 
        i === index ? { ...stat, value: Math.floor(current) } : stat
      ));
    }, 16);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            stats.forEach((stat, index) => {
              if (stat.target && stat.target > 0) {
                animateCounter(index, stat.target);
              }
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    const statsElement = document.getElementById('stats-section');
    if (statsElement) {
      observer.observe(statsElement);
    }

    return () => observer.disconnect();
  }, []);

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'book':
        return faBook;
      case 'tools':
        return faTools;
      case 'project-diagram':
        return faProjectDiagram;
      case 'users':
        return faUsers;
      default:
        return faBook;
    }
  };

  return (
    <>
      <LoadingScreen />
      <Particles />
      
      <div className="pt-0 md:pt-16 break-words break-keep">
        {/* 히어로 섹션 */}
        <section id="home" className="min-h-screen bg-gradient-primary text-white relative overflow-hidden pt-0 md:pt-24">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg viewBox="0 0 1 1" className="w-full h-full">
              <polygon points="0,0 1000,100 1000,0" fill="white" />
            </svg>
          </div>
          <div className="absolute invisible md:visible inset-0 opacity-10 pointer-events-none">
            <svg viewBox="0 0 1 1" className="w-full h-full">
              <polygon points="1,0 -100,100 -1000,0" fill="white" />
            </svg>
          </div>
          <div className="mx-auto px-6 py-20">
            <div className="flex flex-col items-center justify-center">
              <div className="flex flex-col justify-center items-center md:grid grid-cols-2 gap-16 md:gap-y-40">
                <div className="z-40 w-full flex flex-col items-center justify-center md:flex-row gap-40">
                  <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                    <p className="bg-gradient-secondary bg-clip-text text-transparent mb-4 md:mb-8">
                      COMMIT
                    </p>
                    <p className="text-2xl md:text-6xl">금융수학과 IT 동아리</p>
                  </h1>
                </div>

                <div className="z-40">
                  <p className="text-xl opacity-90 leading-relaxed">
                    COMMIT은 금융수학과 IT 동아리로,
                    <br />
                    IT 지식을 학습하고 프로젝트를 수행하는 동아리입니다.
                  </p>
                </div>
                
                <div className="flex flex-row gap-8 z-40">
                  <a 
                    href="#activities" 
                    className="btn bg-gradient-secondary w-[140px] h-[55px] text-white"
                  >
                    더 알아보기
                  </a>
                  <a 
                    href="https://docs.google.com/forms/d/e/1FAIpQLSfGXApRzG5jVc0RBcO0PhiHnNQsj3FSk6tylD_RpX4uw4EiQA/viewform?usp=header"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn border-2 border-white hover:bg-white hover:text-primary w-[140px] h-[55px] text-white"
                  >
                    가입하기
                  </a>
                </div>
                
                <div id="stats-section" className="z-40 h-[120px] w-[300px] md:w-[550px] bg-white rounded-2xl shadow-xl p-0 grid grid-cols-3">
                  {stats.map((stat, index) => (
                    <div key={index} className="flex flex-col justify-center items-center h-full text-center border-r border-gray-400 last:border-r-0">
                      <div className="text-3xl font-bold mb-2 text-primary">
                        {stat.value}
                      </div>
                      <div className="text-sm opacity-75 text-gray-500">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="floating-icons">
                <div className="absolute top-28 left-5 animate-float z-0">
                  <FontAwesomeIcon icon={faJs} className="text-4xl md:text-6xl" />
                </div>
                <div className="absolute top-48 right-4 md:right-12 animate-float" style={{ animationDelay: '0.5s' }}>
                  <FontAwesomeIcon icon={faGithub} className="text-4xl md:text-6xl" />
                </div>
                <div className="absolute bottom-16 md:bottom-24 right-14 animate-float" style={{ animationDelay: '1s' }}>
                  <FontAwesomeIcon icon={faDatabase} className="text-4xl md:text-6xl" />
                </div>
                <div className="absolute bottom-14 md:bottom-24 left-14 md:left-32 animate-float" style={{ animationDelay: '1.5s' }}>
                  <FontAwesomeIcon icon={faPython} className="text-4xl md:text-6xl" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 활동 기록 섹션 */}
        <section id="activities" className="py-20 pb-32">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
              주요 활동
            </h2>
            
            <div className="grid gap-6 gap-y-4 md:gap-y-6 grid-cols-1 md:grid-cols-2">
              {activityCards.map((activity) => (
                <div key={activity.id} className="group">
                  {activity.disabled ? (
                    <div className="disabled-record card px-2 md:px-6 py-2 md:py-6 flex items-center justify-between">
                      <div className="flex items-center md:gap-6">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                          <FontAwesomeIcon 
                            icon={getIconComponent(activity.icon)} 
                            className="text-2xl text-gray-400" 
                          />
                        </div>
                        <div>
                          <h3 className="md:text-xl font-semibold text-gray-500 mb-2">
                            {activity.title}
                          </h3>
                          <p className="text-gray-400 mb-1">
                            {activity.description}
                          </p>
                          <span className="text-sm text-gray-400">
                            {activity.date}
                          </span>
                        </div>
                      </div>
                      <FontAwesomeIcon 
                        icon={faChevronRight} 
                        className="text-gray-400" 
                      />
                    </div>
                  ) : (
                    <div 
                      onClick={() => {
                        if (!user) {
                          // 로그인하지 않은 사용자는 로그인 페이지로 이동
                          window.location.href = '/login';
                        } else {
                          // 로그인한 사용자는 해당 페이지로 이동
                          window.location.href = activity.href || '#';
                        }
                      }}
                      className="block card px-2 md:px-6 py-2 md:py-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center md:gap-6">
                          <div className="w-16 h-16 flex items-center justify-center">
                            <FontAwesomeIcon 
                              icon={getIconComponent(activity.icon)} 
                              className="text-2xl text-primary" 
                            />
                          </div>
                          <div>
                            <h3 className="md:text-xl font-semibold text-gray-800 mb-2">
                              {activity.title}
                            </h3>
                            <p className="text-gray-600 mb-1">
                              {activity.description}
                            </p>
                            <span className="text-xs md:text-sm text-primary">
                              {activity.date}
                            </span>
                          </div>
                        </div>
                        <FontAwesomeIcon 
                          icon={faChevronRight} 
                          className="block text-primary group-hover:translate-x-1 transition-transform duration-300" 
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 가입 안내 섹션 */}
        <section id="join" className="pb-20 pt-10 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-12 text-gray-800">
              가입 안내
            </h2>
            
            <div className="bg-white rounded-2xl p-8 lg:p-12">
              <h3 className="text-2xl font-bold mb-6 text-primary">
                COMMIT과 함께 성장하세요!
              </h3>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                새로운 기술을 배우고, 실제 프로젝트를 경험하며,<br />
                동료들과 함께 성장할 수 있는 기회를 놓치지 마세요!
              </p>
              
              <div className="grid md:grid-cols-1 gap-6 mb-8">
                {/* <div className="flex items-center justify-center gap-3 text-gray-700">
                  <FontAwesomeIcon icon={faCalendar} className="text-primary" />
                  <span>지원 기간: 2025.08.01 ~ 2025.08.15</span>
                </div> */}
                <div className="flex items-center justify-center gap-3 text-gray-700">
                  <FontAwesomeIcon icon={faEnvelope} className="text-primary" />
                  <span>문의: yjhn0410@gmail.com</span>
                </div>
              </div>
              
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfGXApRzG5jVc0RBcO0PhiHnNQsj3FSk6tylD_RpX4uw4EiQA/viewform?usp=header"
                target="_blank"
                rel="noopener noreferrer"
                className="btn bg-gradient-secondary h-[55px] text-white"
              >
                <FontAwesomeIcon icon={faExternalLinkAlt} />
                지금 가입하기
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home; 