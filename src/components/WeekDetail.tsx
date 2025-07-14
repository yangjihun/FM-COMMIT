import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCalendarWeek, 
  faCalendar, 
  faUsers, 
  faClock, 
  faMapMarkerAlt,
  faArrowLeft,
  faArrowRight,
  faPlayCircle
} from '@fortawesome/free-solid-svg-icons';
import studyData from '../data/study.json';

interface WeekData {
  id: number;
  title: string;
  description: string;
  info: {
    date: string;
    participants: string;
    time: string;
    location: string;
  };
  activities: {
    title: string;
    content: string[];
  }[];
  learningContent: string;
  assignments: string;
  stats: {
    attendanceRate: string;
    completionRate: string;
  };
  navigation: {
    prev: string | null;
    next: string | null;
  };
}

interface WeekDetailProps {
  weekData: WeekData;
}

const WeekDetail: React.FC<WeekDetailProps> = ({ weekData }) => {
  const infoCards = [
    { icon: faCalendar, title: '날짜', content: weekData.info.date },
    { icon: faUsers, title: '참여인원', content: weekData.info.participants },
    { icon: faClock, title: '시간', content: weekData.info.time },
    { icon: faMapMarkerAlt, title: '장소', content: weekData.info.location }
  ];

  return (
    <div className="pt-16 break-words break-keep">
      {/* 활동 헤더 */}
      <section className="bg-gradient-primary text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <FontAwesomeIcon icon={faCalendarWeek} className="text-3xl" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{weekData.title}</h1>
          <p className="text-xl opacity-90">{weekData.description}</p>
        </div>
      </section>

      {/* 스터디 정보 */}
      <section className="py-8 md:py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {infoCards.map((card, index) => (
              <div key={index} className="md:card p-6 text-center group hover:shadow-xl transition-all duration-300">
                <div className="w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <FontAwesomeIcon 
                    icon={card.icon} 
                    className="text-2xl md:text-3xl text-primary" 
                  />
                </div>
                <h3 className="md:text-lg font-semibold mb-2 text-gray-800">{card.title}</h3>
                <p className="text-sm md:text-md text-gray-600">{card.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 스터디 내용 */}
      <section className="pb-16 pt-0 md:pt-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* 메인 콘텐츠 */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold mb-8 text-gray-800">스터디 내용</h2>
              
              {/* 활동 내용 */}
              <div className="space-y-6 mb-12">
                {weekData.activities.map((activity, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                      <FontAwesomeIcon icon={faPlayCircle} className="text-primary" />
                      {activity.title}
                    </h3>
                    <ul className="space-y-2">
                      {activity.content.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-gray-600 leading-relaxed">
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* 학습 내용 */}
              <div className="bg-blue-50 rounded-lg p-6 mb-8">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">학습 내용</h3>
                <a href={weekData.learningContent} className="text-gray-700 leading-relaxed">{weekData.learningContent}</a>
              </div>

              {/* 과제 및 준비사항 */}
              <div className="bg-purple-50 rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">과제 및 준비사항</h3>
                <p className="text-gray-700 leading-relaxed">{weekData.assignments}</p>
              </div>
            </div>

            {/* 사이드바 */}
            <div className="space-y-6">
              {/* 주차별 스터디 */}
              <div className="card p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-800">주차별 스터디</h3>
                <div className="space-y-3">
                  {studyData.weeklyStudies.map((study) => (
                    <Link
                      key={study.week}
                      to={study.href}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 group ${
                        study.week === weekData.id 
                          ? 'bg-gradient-primary text-white' 
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <FontAwesomeIcon 
                        icon={faCalendarWeek} 
                        className={`transition-colors duration-300 ${
                          study.week === weekData.id 
                            ? 'text-white' 
                            : 'text-primary group-hover:text-secondary'
                        }`} 
                      />
                      <span className={`transition-colors duration-300 ${
                        study.week === weekData.id 
                          ? 'text-white font-semibold' 
                          : 'text-gray-700 group-hover:text-gray-900'
                      }`}>
                        {study.week}주차 ({study.date})
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* 스터디 현황 */}
              <div className="card p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-800">스터디 현황</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">참석률</span>
                    <span className="font-semibold text-gray-800">{weekData.stats.attendanceRate}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">진행 상황</span>
                    <span className="font-semibold text-gray-800">{weekData.stats.completionRate}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 네비게이션 */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center">
            <div>
              {weekData.navigation.prev ? (
                <Link 
                  to={`/study/${weekData.navigation.prev}`}
                  className="btn btn-primary"
                >
                  <FontAwesomeIcon icon={faArrowLeft} />
                  이전 주차
                </Link>
              ) : (
                <Link 
                  to="/study"
                  className="btn btn-primary"
                >
                  <FontAwesomeIcon icon={faArrowLeft} />
                  스터디 목록
                </Link>
              )}
            </div>
            
            <div>
              {weekData.navigation.next ? (
                <Link 
                  to={`/study/${weekData.navigation.next}`}
                  className="btn btn-primary"
                >
                  다음 주차
                  <FontAwesomeIcon icon={faArrowRight} />
                </Link>
              ) : (
                <div className="btn btn-primary opacity-50 cursor-not-allowed">
                  완료
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WeekDetail; 