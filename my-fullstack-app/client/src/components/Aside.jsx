import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import cookie from 'react-cookies';

import photoReview from '../img/aside/photo_review.jpg';

function Aside({ isOpen, setIsOpen }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    // 메뉴 아이콘 스타일
    const menuIconStyle = {
        position: 'fixed',
        top: '20px',
        right: isOpen ? '330px' : '20px',
        transition: 'right 0.5s ease-in-out',
        zIndex: 1011,
        padding: '8px',
        cursor: 'pointer',
        boxShadow: 'none',
    };

    // Aside 스타일
    const asideStyle = {
        width: '320px',
        right: isOpen ? '0' : '-320px',
        borderTopRightRadius: '0',
        borderBottomRightRadius: '0',
        transition: 'right 0.5s ease-in-out',
    };

    // 유저 정보 섹션 스타일
    const userInfoSectionStyle = {
        backgroundColor: '#1a1a1a',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px',
    };

    // 유저 정보 제목 스타일
    const userInfoTitleStyle = {
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: '15px',
        borderBottom: '1px solid #9270D7',
        paddingBottom: '10px',
    };

    // 로그인 버튼 스타일
    const loginButtonStyle = {
        backgroundColor: '#9270D7',
        color: 'white',
        border: 'none',
        padding: '10px 15px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        width: '100%',
        textAlign: 'center',
        display: 'block',
        textDecoration: 'none',
        marginTop: '10px',
    };

    // 사용자 정보 항목 스타일
    const userInfoItemStyle = {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
        color: 'white',
    };

    // 사용자 아이콘 스타일
    const userIconStyle = {
        marginRight: '10px',
        width: '16px',
        height: '16px',
    };

    useEffect(() => {
        // 쿠키에서 로그인 정보 확인
        const checkLoginStatus = () => {
            const cookie_username = cookie.load('username');
            if (cookie_username) {
                setIsLoggedIn(true);
                setUsername(cookie_username);
            } else {
                setIsLoggedIn(false);
                setUsername('');
            }
        };

        checkLoginStatus();

        // 로컬 스토리지 변경 감지를 위한 이벤트 리스너
        window.addEventListener('storage', checkLoginStatus);

        return () => {
            window.removeEventListener('storage', checkLoginStatus);
        };
    }, []);

    // 로그인 페이지로 이동
    const goToLogin = () => {
        navigate('/LoginForm');
        setIsOpen(false); // 사이드바 닫기
    };

    return (
        <>
            {/* 메뉴 아이콘 */}
            <div style={menuIconStyle} onClick={() => setIsOpen(!isOpen)}>
                <img
                    src={require("../img/layout/menu.png")}
                    alt="menu"
                    style={{ width: '35px', height: '35px', display: 'block' }}
                />
            </div>

            {/* Aside 컴포넌트 */}
            <aside
                className={`aside ${isOpen ? 'active' : ''}`}
                style={asideStyle}
            >
                {/* 유저 정보 섹션 */}
                <div style={userInfoSectionStyle}>
                    <div style={userInfoTitleStyle}>유저 정보</div>

                    {isLoggedIn ? (
                        // 로그인된 경우 유저 정보 표시
                        <div>
                            <div style={userInfoItemStyle}>
                                <img
                                    src={require("../img/layout/profile.png")}
                                    alt="user"
                                    style={userIconStyle}
                                />
                                <span
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => {
                                        console.log('Navigating to MyPage');
                                        navigate('/MyPage');
                                        setIsOpen(false);
                                    }}
                                >
                                    {username}님 환영합니다
                                </span>
                            </div>
                            <div style={userInfoItemStyle}>
                                <span style={{ marginRight: '10px', fontSize: '16px' }}>📧</span>
                                <span>{cookie.load('useremail') || '이메일 정보 없음'}</span>
                            </div>
                            <div style={{
                                marginTop: '15px',
                                textAlign: 'center'
                            }}>
                                <Link
                                    to="/MyPage"
                                    style={{
                                        color: '#9270D7',
                                        textDecoration: 'none',
                                        fontSize: '14px',
                                        fontWeight: 'bold'
                                    }}
                                    onClick={() => {
                                        console.log('Link to MyPage clicked');
                                        setIsOpen(false);
                                    }}
                                >
                                    마이페이지 바로가기 &gt;
                                </Link>
                            </div>
                        </div>
                    ) : (
                        // 로그인되지 않은 경우 로그인 링크 표시
                        <div>
                            <p
                                style={{
                                    color: '#9270D7',
                                    marginBottom: '15px',
                                    cursor: 'pointer',
                                    textDecoration: 'underline',
                                    textAlign: 'center',
                                    fontSize: '16px'
                                }}
                                onClick={goToLogin}
                            >
                                로그인이 필요합니다
                            </p>
                        </div>
                    )}
                </div>

                {/* 기존 메뉴 유지 */}
                <nav id="asidenav">
                    <ul>
                        <li><Link to="/ClickExample">공지사항</Link></li>
                        <li><Link to="/ChangeExample1">상품문의</Link></li>
                        <li><Link to="/ChangeExample2">배송조회</Link></li>
                        <li><Link to="/OnclickExample">장바구니</Link></li>
                        <li><Link to="/favorites">관심상품</Link></li>
                    </ul>
                </nav>

                {/* 닫기 버튼 */}
                <button className="aside-close" onClick={() => setIsOpen(false)}>
                    ×
                </button>
            </aside>

            {/* 오버레이 */}
            <div
                className={`overlay ${isOpen ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
            ></div>
        </>
    );
}

export default Aside;