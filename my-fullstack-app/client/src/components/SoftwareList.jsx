//my-fullstack-app\client\src\components\SoftwareList.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../css/SoftwareList.css'; // CSS 파일 임포트

function SoftwareList() {
    const [swToolList, setSwToolList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [originalList, setOriginalList] = useState([]);
    const [searchCategory, setSearchCategory] = useState('all'); // 검색 카테고리 추가 (all, name, function)

    useEffect(() => {
        callSwToolListApi();
    }, []);

    // DB 목록보기 api
    const callSwToolListApi = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/Swtool?type=list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({})
            });

            if (!response.ok) throw new Error('서버 응답 실패');

            const data = await response.json();
            let resultData = [];

            if (Array.isArray(data)) {
                resultData = data;
            } else if (data?.json) {
                resultData = data.json;
            } else {
                alert('데이터를 불러오지 못했습니다.');
                return;
            }

            setSwToolList(resultData);
            setOriginalList(resultData); // 원본 리스트 저장
        } catch (error) {
            alert('작업 중 오류가 발생하였습니다: ' + error.message);
            console.error('API 호출 에러:', error);
        }
    };

    // 검색어 변경 핸들러
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // 검색 카테고리 변경 핸들러
    const handleCategoryChange = (e) => {
        setSearchCategory(e.target.value);
    };

    // 검색 실행 함수 - 대소문자 구분 없이 검색하도록 개선
    const performSearch = () => {
        if (searchTerm.trim() === '') {
            setSwToolList(originalList); // 검색어가 없으면 원본 리스트 표시
            return;
        }

        // 검색어 소문자 변환 (한 번만 처리)
        const term = searchTerm.toLowerCase().trim();

        const filteredList = originalList.filter(item => {
            // 검색할 필드 값도 안전하게 소문자 변환 및 null 체크
            const toolName = item.swt_toolname ? item.swt_toolname.toLowerCase() : '';
            const toolFunction = item.swt_function ? item.swt_function.toLowerCase() : '';

            switch (searchCategory) {
                case 'name':
                    return toolName.includes(term);
                case 'function':
                    return toolFunction.includes(term);
                case 'all':
                default:
                    return toolName.includes(term) || toolFunction.includes(term);
            }
        });

        setSwToolList(filteredList);
    };

    // 검색 버튼 클릭 핸들러
    const handleSearch = () => {
        performSearch();
    };

    // 검색어 입력 필드에서 엔터키 이벤트 핸들러 - 강화
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // 폼 제출 방지
            performSearch(); // 검색 실행
        }
    };

    // 검색 초기화 핸들러
    const handleResetSearch = () => {
        setSearchTerm('');
        setSearchCategory('all');
        setSwToolList(originalList);
    };

    // 삭제onClick 시 deleteSwtool('sw00001')
    const deleteSwtool = (toolCode) => {
        sweetalertDelete('정말 삭제하시겠습니까?', async () => {
            try {
                const response = await fetch('http://localhost:5000/api/Swtool?type=delete', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ is_SwtCd: toolCode })
                });

                if (!response.ok) throw new Error('삭제 요청 실패');

                await callSwToolListApi();
            } catch (error) {
                alert('작업 중 오류가 발생하였습니다.');
                console.error('삭제 에러:', error);
            }
        });
    };

    // tilte='정말 삭제하시겠습니까?', callbackFunc=async()전체
    const sweetalertDelete = async (title, callbackFunc) => {
        const result = await Swal.fire({
            title: title,
            text: '',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        });

        if (result.isConfirmed) {
            try {
                await callbackFunc(); // callbackFunc() 호출하여 async()부분의 삭제요청 성공
                await Swal.fire('Deleted!', '삭제되었습니다.', 'success');
            } catch (err) {
                await Swal.fire('오류', '삭제 실패', 'error');
            }
        }
    };

    // html의 SwToolListAppend() 호출되어 swToolList배열에 저장된 레코드의 각 필드값을 화면에 출력
    const SwToolListAppend = () => {
        return swToolList.map((data, idx) => {
            const date = data.reg_date || '';
            const reg_date = date.length >= 8
                ? `${date.substr(0, 4)}년${date.substr(4, 2)}월${date.substr(6, 2)}일`
                : date;

            return (
                <tr className="hidden_type" key={data.swt_code || idx}>
                    <td>{data.swt_toolname}</td>
                    <td>{data.swt_function}</td>
                    <td>{reg_date}</td>
                    <td>
                        <Link to={`/SoftwareView/${data.swt_code}`} className="bt_c1 bt_c2 w50_b">수정</Link>
                        <a href="#n" className="bt_c1 w50_b" onClick={() => deleteSwtool(data.swt_code)}>삭제</a>
                    </td>
                </tr>
            );
        });
    };

    // 브라우저에 출력될 태그
    return (
        <section className="sub_wrap">
            <article className="s_cnt mp_pro_li ct1 mp_pro_li_admin">
                <div className="li_top">
                    <h2 className="s_tit1">Software Tools 목록</h2>
                    <div className="li_top_sch af">
                        {/* 검색 UI 추가 - 인라인 스타일을 CSS 클래스로 교체 */}
                        <div className="search-container">
                            <select
                                value={searchCategory}
                                onChange={handleCategoryChange}
                                className="search-select"
                            >
                                <option value="all">전체</option>
                                <option value="name">툴 이름</option>
                                <option value="function">기능</option>
                            </select>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                onKeyDown={handleKeyPress} // onKeyPress 대신 onKeyDown 사용 (더 안정적)
                                placeholder="검색어를 입력하세요"
                                className="search-input"
                                aria-label="검색어 입력" // 접근성 향상
                            />
                            <button
                                onClick={handleSearch}
                                className="search-button"
                                aria-label="검색 실행" // 접근성 향상
                            >
                                검색
                            </button>
                            <button
                                onClick={handleResetSearch}
                                className="reset-button"
                            >
                                초기화
                            </button>
                        </div>
                        <Link to="/SoftwareView/register" className="sch_bt2 wi_au">Tool 등록</Link>
                    </div>
                </div>

                <div className="list_cont list_cont_admin">
                    <table className="table_ty1 ad_tlist">
                        <thead>
                            <tr>
                                <th>툴 이름</th>
                                <th>기능</th>
                                <th>등록일</th>
                                <th>기능</th>
                            </tr>
                        </thead>
                    </table>
                    <table className="table_ty2 ad_tlist">
                        <tbody>
                            {swToolList.length > 0 ?
                                SwToolListAppend() :
                                <tr><td colSpan="4" className="no-results">검색 결과가 없습니다</td></tr>}
                        </tbody>
                    </table>
                </div>
            </article>
        </section>
    );
}

export default SoftwareList;