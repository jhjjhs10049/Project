import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import '../css/Register.css';

const Register = ({ history }) => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email1: '',
        email2: '',
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
    const [verifiedEmail, setVerifiedEmail] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });

        if (name === 'email1' || name === 'email2') {
            setIsEmailVerified(false);
            setVerifiedEmail('');
        }
    };

    const mustNumber = (value) => value.replace(/[^0-9]/g, '');

    const sweetalert = (title, contents, icon, confirmButtonText) => {
        Swal.fire({ title, text: contents, icon, confirmButtonText });
    };

    // 이메일 중복확인 함수////////////////////////////////////////////////////////////////////////
    const checkEmailDuplicate = async (e) => {
        e.preventDefault();
        if (!form.email1.trim() || !form.email2.trim()) {
            sweetalert('이메일 주소를 다시 확인해주세요.', '', 'info', '닫기');
            return;
        }

        const email = `${form.email1}@${form.email2}`;

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
                sweetalert('이미 존재하는 이메일입니다.', '', 'info', '닫기');
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
    };

    ////////////////////////////////////////////////////////////////////////////////////////////

    const validateForm = () => {
        const pattern1 = /[0-9]/;        // 숫자
        const pattern2 = /[a-zA-Z]/;     // 영문자(대소문자)
        const pattern3 = /[~!@#$%^&*()_+|<>?:{}]/; // 특수문자 (현재 사용되지 않음)

        if (!form.email1.trim() || !form.email2.trim()) {
            sweetalert('이메일 주소를 다시 확인해주세요.', '', 'info', '닫기');
            return false;
        }

        if (!isEmailVerified) {
            sweetalert('이메일 중복확인이 필요합니다.', '', 'info', '닫기');
            return false;
        }

        const currentEmail = `${form.email1}@${form.email2}`;
        if (currentEmail !== verifiedEmail) {
            sweetalert('이메일이 변경되었습니다. 다시 중복확인이 필요합니다.', '', 'info', '닫기');
            return false;
        }

        if (!form.password.trim()) {
            sweetalert('비밀번호를 입력해주세요.', '', 'info', '닫기');
            return false;
        }

        if (form.password !== form.confirmPassword) {
            sweetalert('비밀번호가 일치하지 않습니다.', '', 'info', '닫기');
            return false;
        }

        if (
            !pattern1.test(form.password) || // 숫자가 포함되어야 함
            !pattern2.test(form.password) || // 영문자가 포함되어야 함
            form.password.length < 2 ||      // 최소 2자 이상
            form.password.length > 16        // 최대 16자 이하
        ) {
            sweetalert('2~16자 영문 ,숫자를 사용하세요.', '', 'info', '닫기');
            return false;
        }

        if (!form.name.trim()) {
            sweetalert('성명을 입력해주세요.', '', 'info', '닫기');
            return false;
        }

        if (!form.organization.trim()) {
            sweetalert('소속기관을 입력해주세요.', '', 'info', '닫기');
            return false;
        }

        if (!form.major.trim()) {
            sweetalert('전공을 입력해주세요.', '', 'info', '닫기');
            return false;
        }

        if (!form.phone1 || !form.phone2 || !form.phone3) {
            sweetalert('휴대전화 번호를 입력해주세요.', '', 'info', '닫기');
            return false;
        }

        return true;
    };

    const submitClick = async (type, e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const email = `${form.email1}@${form.email2}`;

        try {
            console.log(email);

            const payload = {
                is_Useremail1: form.email1,
                is_Useremail2: form.email2,
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
                sweetalert('회원가입이 완료되었습니다.', '', 'info', '닫기');
                navigate('/LoginForm');
            } else {
                sweetalert('작업중 오류가 발생하였습니다.', '작업오류', 'error', '닫기');
            }
        } catch (err) {
            sweetalert('작업중 오류가 발생하였습니다.', err.message, 'error', '닫기');
            console.log(err.message);
        }
    };

    useEffect(() => {
        const styleElement = document.createElement('style');

        styleElement.innerHTML = `
            option {
                color: #000 !important;
                background-color: white;
            }
        `;

        document.head.appendChild(styleElement);

        return () => {
            document.head.removeChild(styleElement);
        };
    }, []);

    return (
        <div>
            <section className="sub_wrap register-bg">
                <article className="s_cnt re_1 ct1">
                    <div className="li_top">
                        <h2 className="s_tit1">회원가입</h2>
                        <div className="register-form-container">
                            <form method="post" name="frm">
                                <div className="re1_wrap">
                                    <div className="re_cnt ct2">
                                        <table className="table_ty1 register-table">
                                            <tbody>
                                                <tr className="re_email">
                                                    <th>이메일</th>
                                                    <td>
                                                        <div className="email-wrapper">
                                                            <div className="email-input-group">
                                                                <input
                                                                    type="text"
                                                                    name="email1"
                                                                    placeholder="이메일을 입력해주세요."
                                                                    value={form.email1}
                                                                    onChange={handleChange}
                                                                    className="email-input"
                                                                />
                                                                <span className="e_goll email-at">@</span>
                                                                <select
                                                                    name="email2"
                                                                    value={form.email2}
                                                                    onChange={handleChange}
                                                                    className="email-select"
                                                                    style={{ color: form.email2 && form.email2 !== "" ? "#000" : "#757575" }}
                                                                    required
                                                                >
                                                                    <option value="">선택하세요</option>
                                                                    <option value='naver.com'>naver.com</option>
                                                                    <option value='hanmail.net'>hanmail.net</option>
                                                                    <option value='nate.com'>nate.com</option>
                                                                    <option value='hotmail.com'>hotmail.com</option>
                                                                    <option value='gmail.com'>gmail.com</option>
                                                                    <option value='yahoo.co.kr'>yahoo.co.kr</option>
                                                                    <option value='yahoo.com'>yahoo.com</option>
                                                                </select>
                                                            </div>
                                                            <div className={`email-button-group ${isEmailVerified ? 'has-verification' : ''}`}>
                                                                <button
                                                                    type="button"
                                                                    className="check-button"
                                                                    onClick={checkEmailDuplicate}
                                                                >
                                                                    중복확인
                                                                </button>
                                                                {isEmailVerified && (
                                                                    <span className="verify-complete">
                                                                        <svg className="check-icon" viewBox="0 0 24 24">
                                                                            <path d="M20 6L9 17l-5-5" />
                                                                        </svg>
                                                                        확인완료
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>비밀번호</th>
                                                    <td style={{ width: '100%' }}>
                                                        <div className="input-container" style={{ width: '100%' }}>
                                                            <input
                                                                type="password"
                                                                name="password"
                                                                placeholder="비밀번호를 입력해주세요."
                                                                value={form.password}
                                                                onChange={handleChange}
                                                                className="register-input"
                                                                style={{ width: '100%' }}
                                                            />
                                                            <p style={{
                                                                fontSize: '12px',
                                                                color: '#888',
                                                                margin: '5px 0 0 2px',
                                                                padding: 0
                                                            }}>
                                                                비밀번호는 2~16자 영문, 숫자를 사용해 주세요.
                                                            </p>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>비밀번호 확인</th>
                                                    <td style={{ width: '100%' }}>
                                                        <div className="input-container" style={{ width: '100%' }}>
                                                            <input
                                                                type="password"
                                                                name="confirmPassword"
                                                                placeholder="비밀번호를 다시 입력해주세요."
                                                                value={form.confirmPassword}
                                                                onChange={handleChange}
                                                                className="register-input"
                                                                style={{ width: '100%' }}
                                                            />
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>성명</th>
                                                    <td style={{ width: '100%' }}>
                                                        <div className="input-container" style={{ width: '100%' }}>
                                                            <input
                                                                type="text"
                                                                name="name"
                                                                placeholder="성명을 입력해주세요."
                                                                value={form.name}
                                                                onChange={handleChange}
                                                                className="register-input"
                                                                style={{ width: '100%' }}
                                                            />
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>소속 기관</th>
                                                    <td style={{ width: '100%' }}>
                                                        <div className="input-container" style={{ width: '100%' }}>
                                                            <input
                                                                type="text"
                                                                name="organization"
                                                                placeholder="소속 기관명을 입력해주세요."
                                                                value={form.organization}
                                                                onChange={handleChange}
                                                                className="register-input"
                                                                style={{ width: '100%' }}
                                                            />
                                                            <p style={{
                                                                fontSize: '12px',
                                                                color: '#888',
                                                                margin: '5px 0 0 2px',
                                                                padding: 0
                                                            }}>
                                                                해당사항이 없을시엔 "없음"으로 적어주세요.
                                                            </p>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>전공</th>
                                                    <td style={{ width: '100%' }}>
                                                        <div className="input-container" style={{ width: '100%' }}>
                                                            <input
                                                                type="text"
                                                                name="major"
                                                                placeholder="전공을 입력해주세요."
                                                                value={form.major}
                                                                onChange={handleChange}
                                                                className="register-input"
                                                                style={{ width: '100%' }}
                                                            />
                                                            <p style={{
                                                                fontSize: '12px',
                                                                color: '#888',
                                                                margin: '5px 0 0 2px',
                                                                padding: 0
                                                            }}>
                                                                해당사항이 없을시엔 "없음"으로 적어주세요.
                                                            </p>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr className="tr_tel">
                                                    <th>핸드폰</th>
                                                    <td>
                                                        <div className="phone-wrapper">
                                                            <select
                                                                name="phone1"
                                                                className="phone-select"
                                                                value={form.phone1}
                                                                onChange={handleChange}
                                                                style={{ color: form.phone1 && form.phone1 !== "" ? "#000" : "#757575" }}
                                                            >
                                                                <option value="">선택</option>
                                                                <option value="010">010</option>
                                                                <option value="011">011</option>
                                                                <option value="016">016</option>
                                                                <option value="017">017</option>
                                                                <option value="018">018</option>
                                                                <option value="019">019</option>
                                                            </select>
                                                            <span className="tel_dot phone-dash">-</span>
                                                            <input
                                                                name="phone2"
                                                                maxLength="4"
                                                                value={form.phone2}
                                                                className="phone-input"
                                                                onChange={(e) => handleChange({ target: { name: 'phone2', value: mustNumber(e.target.value) } })}
                                                            />
                                                            <span className="tel_dot phone-dash">-</span>
                                                            <input
                                                                name="phone3"
                                                                maxLength="4"
                                                                value={form.phone3}
                                                                className="phone-input"
                                                                onChange={(e) => handleChange({ target: { name: 'phone3', value: mustNumber(e.target.value) } })}
                                                            />
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="btn_confirm signup-button-wrapper">
                                    <div
                                        className="bt_ty bt_ty2 submit_ty1 signup-button"
                                        onClick={(e) => submitClick('signup', e)}
                                    >
                                        회원가입
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </article>
            </section>
        </div>
    );
};

export default Register;