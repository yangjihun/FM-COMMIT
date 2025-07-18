import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
      
      // 현재 보이는 섹션 감지
      const sections = ['home', 'activities', 'join'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveSection('home');
    closeMenu();
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveSection(sectionId);
    closeMenu();
  };

  const isHomePage = location.pathname === '/';

  const NavButton: React.FC<{ 
    onClick: () => void;
    label: string;
    isActive?: boolean;
  }> = ({ onClick, label, isActive = false }) => (
    <button
      onClick={onClick}
      className={`
        relative px-4 py-2 font-medium transition-all duration-300 
        flex items-center gap-2 group
      `}
    >
      <span>{label}</span>
      {/* 언더라인 애니메이션 */}
      <div className={`
        absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 
        transition-all duration-300 ease-out
        ${isActive 
          ? 'w-full' 
          : 'w-0 group-hover:w-full'
        }
      `} />
    </button>
  );

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100'
          : 'bg-white/90 backdrop-blur-md'
      }`}
    >
      <nav className="py-4">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          {/* 로고 */}
          <div className="logo">
            <Link to="/" className="flex items-center group" onClick={scrollToTop}>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent flex items-center gap-2 transition-all duration-300">
                <FontAwesomeIcon icon={faCode} className="text-blue-500 group-hover:rotate-12 transition-transform duration-300" />
                COMMIT
              </h1>
            </Link>
          </div>

          {/* 데스크톱 네비게이션 */}
          <div className="hidden md:flex items-center space-x-8">
            {isHomePage && (
              <>
                <NavButton
                  onClick={() => scrollToSection('activities')}
                  label="주요 활동"
                  isActive={activeSection === 'activities'}
                />
                <NavButton
                  onClick={() => scrollToSection('join')}
                  label="가입 안내"
                  isActive={activeSection === 'join'}
                />
              </>
            )}
          </div>

          {/* 모바일 햄버거 버튼 */}
          <button
            className="md:hidden relative w-10 h-10 rounded-full transition-all duration-300 hover:scale-110"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} size="lg" />
          </button>
        </div>

        {/* 모바일 메뉴 */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-100">
            <div className="px-6 py-4 space-y-3">
              <NavButton
                onClick={scrollToTop}
                label="홈"
                isActive={isHomePage && activeSection === 'home'}
              />
              {isHomePage && (
                <>
                  <NavButton
                    onClick={() => scrollToSection('activities')}
                    label="주요 활동"
                    isActive={activeSection === 'activities'}
                  />
                  <NavButton
                    onClick={() => scrollToSection('join')}
                    label="가입 안내"
                    isActive={activeSection === 'join'}
                  />
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header; 