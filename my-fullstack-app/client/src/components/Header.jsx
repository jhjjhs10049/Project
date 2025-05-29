import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import cookie from 'react-cookies';
import Swal from 'sweetalert2';
import '../css/header.css';

const Header = () => {
    const [username, setUsername] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showMyInfo, setShowMyInfo] = useState(false);
    const [isLogoHovered, setIsLogoHovered] = useState(false);
    const navigate = useNavigate();

    const sweetalert = (title, contents, icon, confirmButtonText) => {
        Swal.fire({
            title,
            text: contents,
            icon,
            confirmButtonText
        });
    };

    useEffect(() => {
        const cookie_useremail = cookie.load('useremail');
        const cookie_username = cookie.load('username');
        const cookie_password = cookie.load('userpassword');
        console.log("Header cookie_useremail=" + cookie_useremail);
        console.log("Header cookie_username=" + cookie_username);
        if (cookie_useremail && cookie_username) {

            setUsername(cookie_username); // ← 이 줄이 반드시 있어야 username 표시됩니다. 
            const expires = new Date();
            expires.setMinutes(expires.getMinutes() + 60);

            cookie.save('useremail', cookie_useremail, { path: '/', expires });
            cookie.save('username', cookie_username, { path: '/', expires });
            cookie.save('userpassword', cookie_password, { path: '/', expires });
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
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
                            <Link to={'/'} className="header-link">
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
                        <li className="menulist"><Link to={'/'} className="header-link">회사 소개</Link></li>
                        <li className="menulist"><Link to={'/AdminResearchProject'} className="header-link">사회공헌</Link></li>
                        <li className="menulist"><Link to={'/'} className="header-link">홍보센터</Link></li>
                        <li className="menulist"><Link to={'/SoftwareList'} className="header-link">자료실</Link></li>
                        <li className="menulist"><Link to={'/Map'} className="header-link">오시는길</Link></li>
                        {!isLoggedIn && (
                            <>
                                <li className="menulist"><Link to={'/Register'} className="header-link">회원가입</Link></li>
                                <li className="menulist"><Link to={'/LoginForm'} className="header-link">로그인</Link></li>
                            </>
                        )}
                        {isLoggedIn && (
                            <>
                                <li className="menulist">
                                    <a href="#" onClick={(e) => { e.preventDefault(); logout(); }} className="header-link">로그아웃</a>
                                </li>
                                <li className="menulist profile-menu-item">
                                    <a href="#"
                                        onClick={(e) => { e.preventDefault(); }}
                                        className="username-button"
                                    >
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
                                    </a>
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
