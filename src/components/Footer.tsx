import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8">
          {/* 로고 및 설명 */}
          <div className="footer-logo">
            <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
              <FontAwesomeIcon icon={faCode} />
              COMMIT
            </h3>
            <p className="text-gray-400">금융수학과 IT 동아리</p>
          </div>

          {/* 연락처 */}
          <div className="footer-contact">
            <h4 className="text-lg font-semibold mb-4">연락처</h4>
            <p className="text-gray-400">Email: yjhn0410@gmail.com</p>
          </div>
        </div>

        {/* 하단 저작권 */}
        <div className="footer-bottom border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-400">
            © 2025 COMMIT. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 