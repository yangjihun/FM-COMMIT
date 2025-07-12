import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBook, 
  faCalendar, 
  faUsers, 
  faClock, 
  faMapMarkerAlt,
  faArrowLeft,
  faHeart,
  faRocket,
  faTools,
  faCalendarWeek
} from '@fortawesome/free-solid-svg-icons';
import { faPython } from '@fortawesome/free-brands-svg-icons';
import studyData from '../data/study.json';

interface InfoCard {
  icon: string;
  title: string;
  content: string;
}

interface StudyContent {
  icon: string;
  title: string;
  description: string;
}

const Study: React.FC = () => {
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'calendar':
        return faCalendar;
      case 'users':
        return faUsers;
      case 'clock':
        return faClock;
      case 'map-marker-alt':
        return faMapMarkerAlt;
      case 'python':
        return faPython;
      case 'heart':
        return faHeart;
      case 'rocket':
        return faRocket;
      case 'tools':
        return faTools;
      case 'book':
        return faBook;
      default:
        return faBook;
    }
  };

  return (
    <div className="pt-16">
      {/* 활동 헤더 */}
      <section className="bg-gradient-primary text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <FontAwesomeIcon icon={getIconComponent(studyData.header.icon)} className="text-3xl" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{studyData.header.title}</h1>
          <p className="text-xl opacity-90">{studyData.header.description}</p>
        </div>
      </section>

      {/* 활동 정보 */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {studyData.infoCards.map((card, index) => (
              <div key={index} className="card p-6 text-center group hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <FontAwesomeIcon 
                    icon={getIconComponent(card.icon)} 
                    className="text-xl text-white" 
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">{card.title}</h3>
                <p className="text-gray-600">{card.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 활동 내용 */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* 메인 콘텐츠 */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold mb-8 text-gray-800">활동 내용</h2>
              
              <div className="prose prose-lg max-w-none mb-12">
                <p className="text-gray-600 leading-relaxed">
                  {studyData.description}
                </p>
              </div>

              <h3 className="text-2xl font-bold mb-6 text-gray-800">주요 활동</h3>
              <div className="space-y-4">
                {studyData.studyContent.map((content, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <FontAwesomeIcon 
                        icon={getIconComponent(content.icon)} 
                        className="text-white" 
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">{content.title}</h4>
                      <p className="text-gray-600">{content.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 사이드바 */}
            <div className="space-y-6">
              {/* 주요 성과 */}
              <div className="card p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-800">주요 목표표</h3>
                <div className="flex flex-wrap gap-2">
                  {studyData.achievements.map((achievement, index) => (
                    <span 
                      key={index} 
                      className="bg-gradient-primary text-white px-3 py-1 rounded-full text-sm"
                    >
                      {achievement}
                    </span>
                  ))}
                </div>
              </div>

              {/* 스터디 현황 */}
              <div className="card p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-800">스터디 현황</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">총 세션</span>
                    <span className="font-semibold text-gray-800">{studyData.stats.totalSessions}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="text-sm text-gray-600 mb-1">{studyData.stats.basicTrack.label}</div>
                    <div className="font-semibold text-gray-800">{studyData.stats.basicTrack.current}</div>
                  </div>
                  <div className="border-t pt-3">
                    <div className="text-sm text-gray-600 mb-1">{studyData.stats.advancedTrack.label}</div>
                    <div className="font-semibold text-gray-800">{studyData.stats.advancedTrack.current}</div>
                  </div>
                </div>
              </div>

              {/* 주차별 스터디 */}
              <div className="card p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-800">주차별 스터디</h3>
                <div className="space-y-3">
                  {studyData.weeklyStudies.map((study) => (
                    <Link
                      key={study.week}
                      to={study.href}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-300 group"
                    >
                      <FontAwesomeIcon 
                        icon={faCalendarWeek} 
                        className="text-primary group-hover:text-secondary transition-colors duration-300" 
                      />
                      <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                        {study.week}주차 ({study.date})
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 돌아가기 버튼 */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <Link 
            to="/#activities" 
            className="btn btn-primary"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            활동 기록으로 돌아가기
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Study; 