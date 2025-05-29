import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import cookie from 'react-cookies';
import '../css/LoginForm.css'; // 새로운 CSS 파일 임포트

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const sweetalert = (title, contents, icon, confirmButtonText) => {
        Swal.fire({
            title,
            text: contents,
            icon,
            confirmButtonText
        });
    };

    const submitClick = async () => {
        if (email.trim() === '' || password.trim() === '') {
            sweetalert('이메일과 비밀번호를 입력해주세요.', '', 'info', '닫기');
            return;
        }

        try {
            const loginRes = await fetch('http://localhost:5000/api/LoginForm?type=signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ is_Email: email, is_Password: password })
            });

            const user = await loginRes.json();
            var useremail = user.useremail;
            var username = user.username;
            var userpassword = user.userpassword;
            if (user?.useremail) {
                console.log("LoginForm useremail=" + user.useremail);
                console.log("LoginForm username=" + user.username);
                sweetalert('로그인 되었습니다.', user.username + '님 환영합니다', 'info', '닫기');

                const expires = new Date();
                expires.setMinutes(expires.getMinutes() + 60);
                cookie.save('useremail', useremail, { path: '/', expires });
                cookie.save('username', username, { path: '/', expires });
                cookie.save('userpassword', userpassword, { path: '/', expires });

                setTimeout(() => {
                    navigate('/');
                    window.location.reload(); // 강제 새로고침
                }, 1000);
            } else {
                sweetalert('이메일과 비밀번호를 확인해주세요.', '에러', 'info', '닫기');
            }
        } catch (error) {
            sweetalert('이메일과 비밀번호를 확인해주세요.', error, 'info', '닫기');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // 기본 폼 제출 방지
            submitClick();
        }
    };

    return (
        <div>
            <section className="sub_wrap">
                <article className="s_cnt re_1 ct1">
                    <div className="li_top">
                        <h2 className="s_tit1">로그인</h2>
                        <div className="login-wrapper">
                            <form onSubmit={(e) => { e.preventDefault(); submitClick(); }}>
                                <div className="login-container">
                                    <div className="input-container">
                                        <label htmlFor="email">이메일</label>
                                        <input
                                            type="text"
                                            id="email"
                                            placeholder="이메일을 입력해주세요."
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="login-input"
                                            onKeyPress={handleKeyPress}
                                        />
                                    </div>
                                    <div className="input-container">
                                        <label htmlFor="password">비밀번호</label>
                                        <input
                                            type="password"
                                            id="password"
                                            placeholder="비밀번호를 입력해주세요."
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="login-input"
                                            onKeyPress={handleKeyPress}
                                        />
                                    </div>

                                    {/* 간격을 위한 빈 div 추가 */}
                                    <div style={{ height: '20px' }}></div>

                                    <button
                                        type="button"
                                        className="login-button"
                                        onClick={submitClick}
                                    >
                                        로그인
                                    </button>
                                    <div className="links-container">
                                        <Link to={'/register'} className="register-link">회원가입</Link>
                                        <Link to={'#'} className="reset-link">비밀번호 재설정</Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </article>
            </section>
        </div>
    );
}

export default LoginForm;