//components/Footer.jsx
import React from 'react';

function Footer({ name }) {
  return (
    <footer className="footer">
      <h2 className="company-name">(주)윤성조명</h2>
      <p className="footer-info">대표자: 윤성</p>
      <p className="footer-info">전화번호: 053-252-8889</p>
      <p className="footer-info">이메일:  yoon@dxcenter.co.kr</p>
      <p className="footer-info">주소: 대구광역시 중구 국채보상로 582 미도빌딩 7층</p>

      <div className="footer-links">
        <a href="#n">개인정보처리방침</a> | <a href="#n">이용약관</a>
      </div>

      <p className="copyright">COPYRIGHT © {name} ALL RIGHTS RESERVED.</p>
    </footer>
  );
}

export default Footer;