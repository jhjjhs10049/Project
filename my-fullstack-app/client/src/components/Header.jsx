import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import Swal from 'sweetalert2';
import '../css/header.css';

const Header = () => {
    const [username, setUsername] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLogoHovered, setIsLogoHovered] = useState(false);    // 필요한 경우 나중에 사용할 수 있도록 주석 처리
    // const showUserInfo = () => {
    //     setShowMyInfo(true);
    // };

    // const showAlert = (title, contents, icon, confirmButtonText) => {
    //     Swal.fire({
    //         title,
    //         text: contents,
    //         icon,
    //         confirmButtonText
    //     });
    // };

    useEffect(() => {
        // 페이지가 로드될 때마다 쿠키 체크
        const checkLoginStatus = () => {
            const cookie_useremail = cookie.load('useremail');
            const cookie_username = cookie.load('username');
            const cookie_password = cookie.load('userpassword');
            console.log("Header cookie_useremail=" + cookie_useremail);
            console.log("Header cookie_username=" + cookie_username);

            if (cookie_useremail && cookie_username) {
                setUsername(cookie_username);
                const expires = new Date();
                expires.setMinutes(expires.getMinutes() + 60);

                cookie.save('useremail', cookie_useremail, { path: '/', expires });
                cookie.save('username', cookie_username, { path: '/', expires });
                cookie.save('userpassword', cookie_password, { path: '/', expires });
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
                setUsername('');
            }
        };

        checkLoginStatus();

        // 로컬 스토리지 변경 감지를 위한 이벤트 리스너 추가
        window.addEventListener('storage', checkLoginStatus);

        return () => {
            window.removeEventListener('storage', checkLoginStatus);
        };
    }, []);

    const logout = () => {
        Swal.fire({
            title: '로그아웃 하시겠습니까?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: '예',
            cancelButtonText: '아니오',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33'
        }).then((result) => {
            if (result.isConfirmed) {
                cookie.remove('useremail', { path: '/' });
                cookie.remove('username', { path: '/' });
                cookie.remove('userpassword', { path: '/' });
                setIsLoggedIn(false);
                Swal.fire({
                    title: '로그아웃 되었습니다.',
                    text: '안전하게 로그아웃 되었습니다.',
                    icon: 'success',
                    confirmButtonText: '확인'
                });
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
        });
    };

    return (
        <header className="gnb_box header">
            <div className="h_nav ct1 af header-nav">
                <div className="logo">
                    <Link to={'/'}>
                        <img
                            src={require(isLogoHovered ? "../img/layout/yoonlogo.png" : "../img/layout/yoonlogo0.png")}
                            alt="logo"
                            onMouseEnter={() => setIsLogoHovered(true)}
                            onMouseLeave={() => setIsLogoHovered(false)}
                        />
                    </Link>
                </div>
                <nav className="gnb gnb_admin">
                    <ul className="af">
                        <li className="menulist product-menu-item">
                            <Link to={'/Shopping'} className="header-link">
                                <span className="cart-icon-wrapper">
                                    <img
                                        src={require("../img/layout/cart0.png")}
                                        alt="cart icon"
                                        className="cart-icon cart-default"
                                    />
                                    <img
                                        src={require("../img/layout/cart.png")}
                                        alt="cart icon hover"
                                        className="cart-icon cart-hover"
                                    />
                                </span>
                                제품 보기
                            </Link>
                        </li>
                        <li className="menulist"><Link to={'/Info'} className="header-link">회사 소개</Link></li>
                        <li className="menulist"><Link to={'/Center'} className="header-link">홍보센터</Link></li> {/* 홍보센터 링크 수정 */}
                        <li className="menulist"><Link to={'/SoftwareList'} className="header-link">자료실</Link></li>
                        <li className="menulist"><Link to={'/Map'} className="header-link">오시는길</Link></li>
                        {!isLoggedIn && (
                            <>
                                <li className="menulist"><Link to={'/Register2'} className="header-link">회원가입</Link></li>
                                <li className="menulist"><Link to={'/LoginForm'} className="header-link">로그인</Link></li>
                            </>
                        )}                        {isLoggedIn && (
                            <>
                                <li className="menulist">
                                    <Link to="#" onClick={logout} className="header-link">로그아웃</Link>
                                </li>                                <li className="menulist profile-menu-item">
                                    <Link to="#" className="header-link">
                                        <span className="profile-icon-wrapper">
                                            <img
                                                src={require("../img/layout/profile0.png")}
                                                alt="profile icon"
                                                className="profile-icon profile-default"
                                            />
                                            <img
                                                src={require("../img/layout/profile.png")}
                                                alt="profile icon hover"
                                                className="profile-icon profile-hover"
                                            />
                                        </span>
                                        {username}님
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
