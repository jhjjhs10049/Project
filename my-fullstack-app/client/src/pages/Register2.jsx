import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import '../css/Register2.css';

const Register2 = () => {
    const navigate = useNavigate(); const [form, setForm] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        organization: '',
        major: '',
        phone1: '',
        phone2: '',
        phone3: ''
    });
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [verifiedEmail, setVerifiedEmail] = useState(''); const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });

        if (name === 'email') {
            setIsEmailVerified(false);
            setVerifiedEmail('');
        }
    };

    const mustNumber = (value) => value.replace(/[^0-9]/g, ''); const sweetalert = (title, contents, icon, confirmButtonText) => {
        Swal.fire({ title, text: contents, icon, confirmButtonText });
    };

    // 이메일 중복확인 함수
    const checkEmailDuplicate = async (e) => {
        e.preventDefault();
        if (!form.email.trim()) {
            sweetalert('이메일 주소를 다시 확인해주세요.', '', 'warning', '닫기');
            return;
        }

        // 이메일에 @ 포함 여부 확인
        if (!form.email.includes('@')) {
            sweetalert('유효한 이메일 형식이 아닙니다.', '이메일에는 @가 포함되어야 합니다.', 'warning', '닫기');
            return;
        }

        const email = form.email;

        try {
            const dupRes = await fetch('http://localhost:5000/api/register?type=dplicheck', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ is_Email: email })
            });

            if (!dupRes.ok) {
                throw new Error(`이메일 중복 확인 요청 실패 ${dupRes.status}`);
            }

            const dupResult = await dupRes.json();
            console.log('중복확인 응답:', dupResult);

            const isDuplicate = dupResult[0]?.num !== 0;

            if (isDuplicate) {
                sweetalert('이미 존재하는 이메일입니다.', '', 'warning', '닫기');
                setIsEmailVerified(false);
            } else {
                sweetalert('사용 가능한 이메일입니다.', '', 'success', '확인');
                setIsEmailVerified(true);
                setVerifiedEmail(email);
            }
        } catch (err) {
            sweetalert('작업중 오류가 발생하였습니다.', err.message, 'error', '닫기');
            console.log(err.message);
        }
    }; const validateForm = () => {
        const pattern1 = /[0-9]/;        // 숫자
        const pattern2 = /[a-zA-Z]/;     // 영문자(대소문자)
        const emailPattern = /@/;        // 이메일에 @ 포함 확인

        if (!form.email.trim()) {
            sweetalert('이메일 주소를 다시 확인해주세요.', '', 'warning', '닫기');
            return false;
        }

        // 이메일에 @ 포함 여부 확인
        if (!emailPattern.test(form.email)) {
            sweetalert('유효한 이메일 형식이 아닙니다.', '이메일에는 @가 포함되어야 합니다.', 'warning', '닫기');
            return false;
        }

        if (!isEmailVerified) {
            sweetalert('이메일 중복확인이 필요합니다.', '', 'warning', '닫기');
            return false;
        }

        const currentEmail = form.email;
        if (currentEmail !== verifiedEmail) {
            sweetalert('이메일이 변경되었습니다. 다시 중복확인이 필요합니다.', '', 'warning', '닫기');
            return false;
        }

        if (!form.password.trim()) {
            sweetalert('비밀번호를 입력해주세요.', '', 'warning', '닫기');
            return false;
        }

        if (form.password !== form.confirmPassword) {
            sweetalert('비밀번호가 일치하지 않습니다.', '', 'warning', '닫기');
            return false;
        }

        if (
            !pattern1.test(form.password) || // 숫자가 포함되어야 함
            !pattern2.test(form.password) || // 영문자가 포함되어야 함
            form.password.length < 2 ||      // 최소 2자 이상
            form.password.length > 16        // 최대 16자 이하
        ) {
            sweetalert('비밀번호는 2~16자 영문 ,숫자를 사용하세요.', '', 'warning', '닫기');
            return false;
        }

        if (!form.name.trim()) {
            sweetalert('성명을 입력해주세요.', '', 'warning', '닫기');
            return false;
        }

        if (!form.organization.trim()) {
            sweetalert('소속 회사명을 입력해주세요.', '', 'warning', '닫기');
            return false;
        }

        if (!form.major.trim()) {
            sweetalert('회사의 업태를를 입력해주세요.', '', 'warning', '닫기');
            return false;
        }

        if (!form.phone1 || !form.phone2 || !form.phone3) {
            sweetalert('휴대전화 번호를 입력해주세요.', '', 'warning', '닫기');
            return false;
        }

        return true;
    }; const submitClick = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            // 이메일에서 사용자 이름과 도메인 부분 추출
            const emailParts = form.email.split('@');
            const email1 = emailParts[0] || '';
            const email2 = emailParts.length > 1 ? emailParts[1] : '';

            const payload = {
                is_Useremail1: email1,
                is_Useremail2: email2,
                is_Password: form.password,
                is_Username: form.name,
                is_Organization: form.organization,
                is_Usermajor: form.major,
                is_Userphone1: form.phone1,
                is_Userphone2: form.phone2,
                is_Userphone3: form.phone3,
            };

            const response = await fetch('http://localhost:5000/api/register?type=signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const result = await response.json();
            if (result.affectedRows > 0) {
                // 사용자가 확인 버튼을 클릭해야 로그인 페이지로 이동
                Swal.fire({
                    title: '회원가입이 완료되었습니다.',
                    icon: 'success',
                    confirmButtonText: '로그인하기'
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/LoginForm');
                        // 페이지 상단으로 스크롤
                        window.scrollTo(0, 0);
                    }
                });
            } else {
                sweetalert('작업중 오류가 발생하였습니다.', '작업오류', 'warning', '닫기');
            }
        } catch (err) {
            sweetalert('작업중 오류가 발생하였습니다.', err.message, 'warning', '닫기');
            console.log(err.message);
        }
    };

    return (
        <div className="register2-container">
            <div className="register2-outer-header">
                <h2>회원가입</h2>
            </div>
            <div className="register2-form-box">
                <div className="register2-form-content">
                    <form>
                        {/* 이메일 입력 */}
                        <div className="register2-form-group">
                            <label htmlFor="email">이메일</label>
                            <div className="register2-email-group">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="register2-input register2-email-input"
                                    placeholder="이메일 주소를 입력해주세요"
                                    value={form.email}
                                    onChange={handleChange}
                                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                                    title="유효한 이메일 주소를 입력해주세요 (예: yoonsung@light.com)"
                                    required
                                />
                            </div>
                            <p className="register2-help-text"> 예시) yoonsung@light.com</p>
                            <div className="register2-email-verify">
                                {isEmailVerified && (
                                    <div className="register2-verified">
                                        <svg viewBox="0 0 24 24">
                                            <path d="M20 6L9 17l-5-5" />
                                        </svg>
                                        확인완료
                                    </div>
                                )}
                                <button
                                    type="button"
                                    className="register2-verify-btn"
                                    onClick={checkEmailDuplicate}
                                >
                                    중복확인
                                </button>
                            </div>
                        </div>

                        {/* 비밀번호 입력 */}
                        <div className="register2-form-group">
                            <label htmlFor="password">비밀번호</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="register2-input"
                                placeholder="비밀번호를 입력해주세요"
                                value={form.password}
                                onChange={handleChange}
                            />
                            <p className="register2-help-text">비밀번호는 2~16자 영문, 숫자를 사용해 주세요.</p>
                        </div>

                        {/* 비밀번호 확인 */}
                        <div className="register2-form-group">
                            <label htmlFor="confirmPassword">비밀번호 확인</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                className="register2-input"
                                placeholder="비밀번호를 다시 입력해주세요"
                                value={form.confirmPassword}
                                onChange={handleChange}
                            />
                        </div>

                        {/* 성명 */}
                        <div className="register2-form-group">
                            <label htmlFor="name">성명</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="register2-input"
                                placeholder="성명을 입력해주세요"
                                value={form.name}
                                onChange={handleChange}
                            />
                        </div>

                        {/* 소속 기관 */}
                        <div className="register2-form-group">
                            <label htmlFor="organization">회사명</label>
                            <input
                                type="text"
                                id="organization"
                                name="organization"
                                className="register2-input"
                                placeholder="소속 회사명을 입력해주세요"
                                value={form.organization}
                                onChange={handleChange}
                            />
                            <p className="register2-help-text">해당사항이 없을시엔 "없음"으로 적어주세요.</p>
                        </div>

                        {/* 전공 */}
                        <div className="register2-form-group">
                            <label htmlFor="major">업태</label>
                            <input
                                type="text"
                                id="major"
                                name="major"
                                className="register2-input"
                                placeholder="회사의 업태를 입력해주세요"
                                value={form.major}
                                onChange={handleChange}
                            />
                            <p className="register2-help-text">해당사항이 없을시엔 "없음"으로 적어주세요.</p>
                        </div>

                        {/* 핸드폰 */}
                        <div className="register2-form-group">
                            <label htmlFor="phone">핸드폰</label>
                            <div className="register2-phone-group">
                                <select
                                    name="phone1"
                                    className="register2-phone-select"
                                    value={form.phone1}
                                    onChange={handleChange}
                                >
                                    <option value="">선택</option>
                                    <option value="010">010</option>
                                    <option value="011">011</option>
                                    <option value="016">016</option>
                                    <option value="017">017</option>
                                    <option value="018">018</option>
                                    <option value="019">019</option>
                                </select>
                                <span className="register2-phone-dash">-</span>
                                <input
                                    type="text"
                                    name="phone2"
                                    className="register2-input register2-phone-input"
                                    maxLength="4"
                                    value={form.phone2}
                                    onChange={(e) => handleChange({ target: { name: 'phone2', value: mustNumber(e.target.value) } })}
                                />
                                <span className="register2-phone-dash">-</span>
                                <input
                                    type="text"
                                    name="phone3"
                                    className="register2-input register2-phone-input"
                                    maxLength="4"
                                    value={form.phone3}
                                    onChange={(e) => handleChange({ target: { name: 'phone3', value: mustNumber(e.target.value) } })}
                                />
                            </div>
                        </div>

                        {/* 가입 버튼 */}
                        <button
                            type="button"
                            className="register2-submit-btn"
                            onClick={submitClick}
                        >
                            회원가입
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register2;
