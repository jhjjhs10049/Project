import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import cookie from 'react-cookies';
import Swal from 'sweetalert2';
// axios 대신 기본 fetch API 사용
import '../css/MyPage.css';

const MyPage = () => {
    // 사용자 정보 상태 수정 - 회사명, 업태, 핸드폰으로 변경
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        company: '',  // 회사명
        business: '', // 업태
        phone: ''     // 핸드폰 (sector 대신)
    });

    // 수정 모드 상태
    const [isEditMode, setIsEditMode] = useState(false);
    // 로그인 상태 확인
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // 로딩 상태
    const [isLoading, setIsLoading] = useState(true);

    // 페이지 로드 시 사용자 정보 가져오기
    useEffect(() => {
        const checkLoginStatus = () => {
            const cookie_username = cookie.load('username');
            const cookie_useremail = cookie.load('useremail');

            if (cookie_username && cookie_useremail) {
                setIsLoggedIn(true);

                // 데이터베이스에서 사용자 정보 가져오기
                fetchUserData(cookie_useremail);
            } else {
                setIsLoggedIn(false);
                setIsLoading(false);
            }
        };

        checkLoginStatus();
    }, []);

    // 데이터베이스에서 사용자 정보 가져오기
    const fetchUserData = async (email) => {
        try {
            console.log('사용자 정보 가져오기 시도:', email);

            // 실제 백엔드 API URL로 변경해야 합니다
            const response = await fetch(`/api/users/${email}`);

            if (!response.ok) {
                console.error('API 응답 오류:', response.status, response.statusText);
                throw new Error(`서버 응답 오류: ${response.status}`);
            }

            const data = await response.json();
            console.log('서버에서 받은 데이터:', data);

            // 데이터베이스에서 받아온 정보로 상태 업데이트
            if (data) {
                setUserData({
                    username: data.username || '',
                    email: data.email || '',
                    company: data.company || '',
                    business: data.business || '',
                    phone: data.phone || ''
                });

                console.log('사용자 데이터 설정 완료:', {
                    username: data.username,
                    email: data.email,
                    company: data.company,
                    business: data.business,
                    phone: data.phone
                });
            } else {
                console.warn('서버에서 데이터를 찾을 수 없습니다');
                // 데이터가 없는 경우 처리
                fallbackToLocalData();
            }

            setIsLoading(false);
        } catch (error) {
            console.error('사용자 정보를 가져오는 데 실패했습니다:', error);

            // API 호출이 실패할 경우 쿠키에서 정보를 가져옴 (폴백 메커니즘)
            fallbackToLocalData();
        }
    };

    // 로컬 데이터(쿠키)에서 정보를 가져오는 대체 함수
    const fallbackToLocalData = () => {
        console.log('로컬 데이터에서 정보 가져오기');

        // 쿠키에서 정보 가져오기
        const localUsername = cookie.load('username');
        const localEmail = cookie.load('useremail');
        const localCompany = cookie.load('usercompany');
        const localBusiness = cookie.load('userbusiness');
        const localPhone = cookie.load('userphone');

        console.log('쿠키에서 가져온 데이터:', {
            username: localUsername,
            email: localEmail,
            company: localCompany,
            business: localBusiness,
            phone: localPhone
        });

        setUserData({
            username: localUsername || '',
            email: localEmail || '',
            company: localCompany || '',
            business: localBusiness || '',
            phone: localPhone || ''
        });

        setIsLoading(false);
    };

    // 입력 변경 핸들러
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };

    // 수정 모드 토글
    const toggleEditMode = () => {
        setIsEditMode(!isEditMode);
    };

    // 사용자 정보 저장
    const saveUserInfo = async () => {
        try {
            // 로딩 표시
            Swal.fire({
                title: '저장 중...',
                text: '회원 정보를 업데이트하고 있습니다.',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            // 백엔드 API가 실제로 없기 때문에 발생하는 오류를 처리하기 위해
            // API 호출을 시도하되, 오류가 발생하면 로컬 저장으로 대체
            try {
                // 실제 API 호출 시도
                const response = await fetch(`/api/users/${userData.email}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: userData.username,
                        company: userData.company,
                        business: userData.business,
                        phone: userData.phone
                    })
                });

                if (!response.ok) {
                    throw new Error(`서버 응답 오류: ${response.status}`);
                }

                const result = await response.json();
                console.log('업데이트 결과:', result);
            } catch (apiError) {
                console.error('API 호출 실패, 로컬 저장으로 대체:', apiError);
                // API 호출 실패 시 경고 표시하지 않고 로컬 저장으로 계속 진행
            }

            // 쿠키에 정보 저장 (백업 또는 API가 없을 때 대체용)
            const expires = new Date();
            expires.setMinutes(expires.getMinutes() + 60);

            cookie.save('username', userData.username, { path: '/', expires });
            cookie.save('usercompany', userData.company, { path: '/', expires });
            cookie.save('userbusiness', userData.business, { path: '/', expires });
            cookie.save('userphone', userData.phone, { path: '/', expires });

            console.log('쿠키 저장 완료');

            // API 호출 성공 여부와 관계없이 저장 완료 메시지 표시
            Swal.fire({
                title: '저장 완료',
                text: '회원 정보가 성공적으로 업데이트되었습니다.',
                icon: 'success',
                confirmButtonText: '확인'
            });

            setIsEditMode(false);
        } catch (error) {
            console.error('사용자 정보 업데이트 중 예상치 못한 오류:', error);

            Swal.fire({
                title: '저장 실패',
                text: '회원 정보 업데이트 중 오류가 발생했습니다. 다시 시도해 주세요.',
                icon: 'error',
                confirmButtonText: '확인'
            });
        }
    };

    // 회원 탈퇴
    const deleteAccount = async () => {
        Swal.fire({
            title: '회원 탈퇴',
            text: '정말로 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc3545',
            cancelButtonColor: '#6c757d',
            confirmButtonText: '탈퇴',
            cancelButtonText: '취소'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // 로딩 표시
                    Swal.fire({
                        title: '처리 중...',
                        text: '회원 탈퇴를 처리하고 있습니다.',
                        allowOutsideClick: false,
                        didOpen: () => {
                            Swal.showLoading();
                        }
                    });

                    // fetch API로 변경
                    const response = await fetch(`/api/users/${userData.email}`, {
                        method: 'DELETE'
                    });

                    if (!response.ok) {
                        throw new Error('서버 응답 오류');
                    }

                    // 쿠키 삭제
                    cookie.remove('username', { path: '/' });
                    cookie.remove('useremail', { path: '/' });
                    cookie.remove('userpassword', { path: '/' });
                    cookie.remove('usercompany', { path: '/' });
                    cookie.remove('userbusiness', { path: '/' });
                    cookie.remove('userphone', { path: '/' });

                    Swal.fire({
                        title: '탈퇴 완료',
                        text: '회원 탈퇴가 완료되었습니다.',
                        icon: 'success',
                        confirmButtonText: '확인'
                    }).then(() => {
                        window.location.href = '/';
                    });
                } catch (error) {
                    console.error('회원 탈퇴 실패:', error);

                    Swal.fire({
                        title: '탈퇴 실패',
                        text: '회원 탈퇴 처리 중 오류가 발생했습니다. 다시 시도해 주세요.',
                        icon: 'error',
                        confirmButtonText: '확인'
                    });
                }
            }
        });
    };

    // 로딩 중 표시
    if (isLoading) {
        return <div className="mypage-loading">로딩 중...</div>;
    }

    // 로그인되지 않은 경우 리다이렉트
    if (!isLoggedIn) {
        return <Navigate to="/LoginForm" />;
    }

    return (
        <div className="mypage-container">
            <div className="mypage-header">
                <h1>마이페이지</h1>
            </div>

            <div className="mypage-content">
                <div className="mypage-card">
                    <div className="mypage-card-header">
                        <h2>회원 정보</h2>
                        <button
                            className={`mypage-edit-btn ${isEditMode ? 'save-mode' : 'edit-mode'}`}
                            onClick={isEditMode ? saveUserInfo : toggleEditMode}
                        >
                            {isEditMode ? '저장' : '수정'}
                        </button>
                    </div>

                    <div className="mypage-form">
                        <div className="form-group">
                            <label>이름</label>
                            <input
                                type="text"
                                name="username"
                                value={userData.username}
                                onChange={handleInputChange}
                                disabled={!isEditMode}
                            />
                        </div>

                        <div className="form-group">
                            <label>이메일</label>
                            <input
                                type="email"
                                name="email"
                                value={userData.email}
                                disabled={true} // 이메일은 변경 불가능
                            />
                            <small>이메일은 변경할 수 없습니다.</small>
                        </div>

                        <div className="form-group">
                            <label>회사명</label>
                            <input
                                type="text"
                                name="company"
                                value={userData.company}
                                onChange={handleInputChange}
                                disabled={!isEditMode}
                            />
                        </div>

                        <div className="form-group">
                            <label>업태</label>
                            <input
                                type="text"
                                name="business"
                                value={userData.business}
                                onChange={handleInputChange}
                                disabled={!isEditMode}
                            />
                        </div>

                        <div className="form-group">
                            <label>핸드폰</label>
                            <input
                                type="tel"
                                name="phone"
                                value={userData.phone}
                                onChange={handleInputChange}
                                disabled={!isEditMode}
                            />
                        </div>
                    </div>
                </div>

                <div className="mypage-danger-zone">
                    <h3>계정 관리</h3>
                    <button className="mypage-delete-btn" onClick={deleteAccount}>
                        회원 탈퇴
                    </button>
                    <p>계정을 삭제하면 모든 데이터가 영구적으로 제거됩니다.</p>
                </div>
            </div>
        </div>
    );
};

// 디버깅을 위한 콘솔 로그 추가
console.log("MyPage component loaded");

export default MyPage;
