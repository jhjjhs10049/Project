import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function SoftwareView_1() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        is_Swt_toolname: '',
        is_Swt_demo_site: '',
        is_Giturl: '',
        is_Comments: '',
        is_Swt_function: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const validateForm = () => {
        const { is_Swt_toolname, is_Swt_demo_site, is_Giturl, is_Comments, is_Swt_function } = formData;

        if (!is_Swt_toolname.trim()) {
            alert('툴 이름을 다시 확인해주세요.');
            return false;
        }
        if (!is_Swt_demo_site.trim()) {
            alert('데모 URL을 다시 확인해주세요.');
            return false;
        }
        if (!is_Giturl.trim()) {
            alert('Github URL을 다시 확인해주세요.');
            return false;
        }
        if (!is_Comments.trim()) {
            alert('설명을 다시 확인해주세요.');
            return false;
        }
        if (!is_Swt_function.trim()) {
            alert('상세기능을 다시 확인해주세요.');
            return false;
        }
        return true;
    };

    const sweetalertSucc = (title, showConfirmButton) => {
        Swal.fire({
            position: 'bottom-end',
            icon: 'success',
            title,
            showConfirmButton,
            timer: 1000,
        });
    };

    const handleSubmit = async (type) => {
        if (!validateForm()) return;

        const jsonData = {
            ...formData,
            is_Email: 'guest',
        };

        try {
            const response = await fetch(`http://localhost:5000/api/Swtool?type=${type}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jsonData),
            });
            const body = await response.text();
            //   if (body === "succ") {
            if (type === 'save') {
                sweetalertSucc('Software Tools 등록이 완료되었습니다.', false)
            } else if (type === 'modify') {
                sweetalertSucc('Software Tools 수정이 완료되었습니다.', false)
            }
            setTimeout(function () {
                navigate('/SoftwareList');
            }, 1500);

        } catch (error) {
            alert('작업 중 오류가 발생하였습니다.');
        }
    };

    return (
        <section className="sub_wrap">
            <article className="s_cnt mp_pro_li ct1">
                <div className="li_top">
                    <h2 className="s_tit1">Software Tools 등록/수정</h2>
                </div>
                <div className="bo_w re1_wrap re1_wrap_writer">
                    <form name="frm" id="frm" onSubmit={(e) => e.preventDefault()} method="post">
                        <input type="hidden" name="is_Swtcode" />
                        <input type="hidden" name="is_Email" value="guest" />
                        {/* <input type="hidden" name="is_beforeSwtcode" id="is_beforeSwtcode" value={this.state.before_swtcode} /> */}
                        <article className="res_w">
                            <p className="ment" style={{ textAlign: "right" }}>
                                <span className="red">(*)</span>표시는 필수입력사항 입니다.
                            </p>
                            <div className="tb_outline">
                                <table className="table_ty1">
                                    <tbody>
                                        <tr>
                                            <th>
                                                <label htmlFor="is_Swt_toolname">툴 이름<span className="red">(*)</span></label>
                                            </th>
                                            <td>
                                                <input
                                                    type="text"
                                                    name="is_Swt_toolname"
                                                    id="is_Swt_toolname"
                                                    value={formData.is_Swt_toolname}
                                                    onChange={handleChange}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label htmlFor="is_Swt_demo_site">데모 URL<span className="red">(*)</span></label>
                                            </th>
                                            <td>
                                                <input
                                                    type="text"
                                                    name="is_Swt_demo_site"
                                                    id="is_Swt_demo_site"
                                                    value={formData.is_Swt_demo_site}
                                                    onChange={handleChange}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label htmlFor="is_Giturl">Github URL<span className="red">(*)</span></label>
                                            </th>
                                            <td>
                                                <input
                                                    type="text"
                                                    name="is_Giturl"
                                                    id="is_Giturl"
                                                    value={formData.is_Giturl}
                                                    onChange={handleChange}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label htmlFor="is_Comments">설명<span className="red">(*)</span></label>
                                            </th>
                                            <td>
                                                <textarea
                                                    name="is_Comments"
                                                    id="is_Comments"
                                                    value={formData.is_Comments}
                                                    onChange={handleChange}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <label htmlFor="is_Swt_function">상세 기능<span className="red">(*)</span></label>
                                            </th>
                                            <td>
                                                <textarea
                                                    name="is_Swt_function"
                                                    id="is_Swt_function"
                                                    value={formData.is_Swt_function}
                                                    onChange={handleChange}
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div className="btn_confirm mt20" style={{ marginBottom: "44px" }}>
                                    <Link to="/SoftwareList" className="bt_ty bt_ty1 cancel_ty1">취소</Link>
                                    <button
                                        type="button"
                                        className="bt_ty bt_ty2 submit_ty1 saveclass"
                                        onClick={() => handleSubmit('save')}
                                    >
                                        저장
                                    </button>
                                    <button
                                        type="button"
                                        className="bt_ty bt_ty2 submit_ty1 modifyclass"
                                        onClick={() => handleSubmit('modify')}
                                    >
                                        수정
                                    </button>
                                </div>
                            </div>
                        </article>
                    </form>
                </div>
            </article>
        </section>
    );
}

export default SoftwareView_1;