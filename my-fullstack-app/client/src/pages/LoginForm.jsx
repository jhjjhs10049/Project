import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import '../css/LoginForm.css'; // 파일 이름의 대소문자 수정

const LoginForm = () => {
    const navigate = useNavigate();

    // 컴포넌트가 마운트되면 페이지 상단으로 스크롤
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const sweetalert = (title, contents, icon, confirmButtonText) => {
        Swal.fire({
            title,
            text: contents,
            icon,
            confirmButtonText,
            iconColor: icon === 'warning' ? '#ff0000' : undefined
        });
    };

    const validateForm = () => {
        if (!form.email.trim()) {
            sweetalert('이메일을 입력해주세요.', '', 'warning', '닫기');
            return false;
        }

        if (!form.email.includes('@')) {
            sweetalert('유효한 이메일 형식이 아닙니다.', '이메일에는 @가 포함되어야 합니다.', 'warning', '닫기');
            return false;
        }

        if (!form.password.trim()) {
            sweetalert('비밀번호를 입력해주세요.', '', 'warning', '닫기');
            return false;
        }

        return true;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const emailParts = form.email.split('@');
            const email1 = emailParts[0] || '';
            const email2 = emailParts.length > 1 ? emailParts[1] : '';

            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    is_Email1: email1,
                    is_Email2: email2,
                    is_Password: form.password
                }),
            });

            const data = await response.json();

            if (data.success) {
                // 로그인 성공 처리
                localStorage.setItem('userInfo', JSON.stringify(data.user));
                sweetalert('로그인 성공', '', 'success', '확인');
                navigate('/'); // 메인 페이지로 이동
            } else {
                // 로그인 실패 처리
                sweetalert('로그인 실패', '이메일 또는 비밀번호가 일치하지 않습니다.', 'warning', '닫기');
            }
        } catch (err) {
            sweetalert('작업중 오류가 발생하였습니다.', err.message, 'error', '닫기');
            console.log(err.message);
        }
    };

    const handleRegister = () => {
        navigate('/Register2');
    };

    return (
        <div className="login-container">
            <div className="login-outer-header">
                <h2>로그인</h2>
            </div>
            <div className="login-form-box">
                <div className="login-form-content">
                    <form onSubmit={handleLogin}>
                        {/* 이메일 입력 */}
                        <div className="login-form-group">
                            <label htmlFor="email">이메일</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="login-input"
                                placeholder="이메일 주소를 입력해주세요"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* 비밀번호 입력 */}
                        <div className="login-form-group">
                            <label htmlFor="password">비밀번호</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="login-input"
                                placeholder="비밀번호를 입력해주세요"
                                value={form.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* 로그인 버튼 */}
                        <button
                            type="submit"
                            className="login-submit-btn"
                        >
                            로그인
                        </button>

                        {/* 아이디/비밀번호 변경 버튼 */}
                        <div className="login-options">
                            <button
                                type="button"
                                className="login-option-btn"
                                onClick={() => navigate('/change-id')}
                            >
                                아이디 변경
                            </button>
                            <span className="login-divider">|</span>
                            <button
                                type="button"
                                className="login-option-btn"
                                onClick={() => navigate('/change-password')}
                            >
                                비밀번호 변경
                            </button>
                        </div>

                        {/* 회원가입 버튼 */}
                        <div className="login-register-link">
                            <p>아직 회원이 아니신가요?</p>
                            <button
                                type="button"
                                className="login-register-btn"
                                onClick={handleRegister}
                            >
                                회원가입
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;