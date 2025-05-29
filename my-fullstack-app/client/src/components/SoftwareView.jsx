import React, { useEffect, useState, useCallback } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const SoftwareView = () => {
    const navigate = useNavigate();
    const { swtcode } = useParams();
    const [beforeSwtcode] = useState(swtcode);

    const [toolName, setToolName] = useState('');
    const [swtFunction, setSwtFunction] = useState('');
    const [demoSite, setDemoSite] = useState('');
    const [gitUrl, setGitUrl] = useState('');
    const [comments, setComments] = useState('');

    const [mode] = useState(swtcode === 'register' ? 'register' : 'modify');
    const [fileName, setFileName] = useState(''); const [fileName2, setFileName2] = useState(''); const [manualName, setManualName] = useState('');
    const [mainImagePreview, setMainImagePreview] = useState('');
    const [labelImagePreview, setLabelImagePreview] = useState('');
    // const [manualPath, setManualPath] = useState(''); // 사용하지 않는 변수

    const [mainFile, setMainFile] = useState(null);
    const [labelFile, setLabelFile] = useState(null);
    const [manualFile, setManualFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    // 한개의 정보를 가져오는 함수(list~~ select )
    const callSwToolInfoApi = useCallback(async () => {
        try {
            const response = await fetch('http://localhost:5000/api/Swtool?type=list', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ is_Swtcode: beforeSwtcode }),
            });

            if (!response.ok) throw new Error('서버 응답 실패');

            const result = await response.json();
            const data = result?.[0];

            if (data) {
                setToolName(data.swt_toolname || '');
                setDemoSite(data.swt_demo_site || '');
                setGitUrl(data.swt_github_url || '');
                setComments(data.swt_comments || '');
                setSwtFunction(data.swt_function || '');
                setFileName(data.swt_big_imgpath || '');
                setFileName2(data.swt_imagepath || '');
                setManualName(data.swt_manual_path || ''); if (data.swt_image) {
                    setMainImagePreview(`/image/${data.swt_image}`);
                } if (data.swt_label) {
                    setLabelImagePreview(`/image/${data.swt_label}`);
                }
                // 사용하지 않는 코드 주석 처리
                // if (data.swt_manual) {
                //     setManualPath(`/swmanual/${data.swt_manual}`);
                // }
            } else {
                alert('데이터를 불러올 수 없습니다.');
            }
        } catch (error) {
            alert('작업 중 오류가 발생하였습니다.');
            console.error('API 호출 에러:', error.message);
        }
    }, [beforeSwtcode]);

    // modify 이면 한개의 정보를 가져오는 동작으로 이동
    useEffect(() => {
        if (mode === 'modify') {
            callSwToolInfoApi();
        }
    }, [mode, callSwToolInfoApi]);

    // 파일버튼을 클릭해서 파일첨부했을때 html -> handleFileInput
    const handleFileInput = (type, e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (type === 'file') {
            setFileName(file.name);
            setMainFile(file);
            setMainImagePreview(URL.createObjectURL(file));
        } else if (type === 'file2') {
            setFileName2(file.name);
            setLabelFile(file);
            setLabelImagePreview(URL.createObjectURL(file));
        } else if (type === 'manual') {
            setManualName(file.name);
            setManualFile(file);
        }
    };

    // 파일을 서버로 업로드하는 동작 submitClick -> uploadFile 
    const uploadFile = async (file, path) => {
        const formData = new FormData();
        formData.append('file', file);
        setUploading(true);
        try {
            const response = await fetch(`http://localhost:5000/api/upload?type=${path}`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('업로드 실패');

            const res = await response.json();
            return res.filename;
        } catch (error) {
            console.error('파일 업로드 실패:', error);
            throw error;
        } finally {
            setUploading(false);
        }
    };

    // 저장버튼 또는 수정버튼 클릭시 html -> submitClick
    const submitClick = async (type, e) => {
        e.preventDefault();

        if (uploading) {
            alert('파일 업로드가 완료될 때까지 기다려주세요.');
            return;
        }

        if (!toolName || !demoSite || !gitUrl || !comments || !swtFunction) {
            alert('모든 필수 항목을 입력해주세요.');
            return;
        }

        let uploadedMainImg = fileName;
        let uploadedLabelImg = fileName2;
        let uploadedManual = manualName;

        try {
            if (mainFile) {
                uploadedMainImg = await uploadFile(mainFile, 'uploads/image/');
            }
            if (labelFile) {
                uploadedLabelImg = await uploadFile(labelFile, 'uploads/image/');
            }
            if (manualFile) {
                uploadedManual = await uploadFile(manualFile, 'uploads/swmanual/');
            }

            const jsonData = {
                is_Swtcode: swtcode,
                is_Email: "guest",
                is_Swt_toolname: toolName,
                is_Swt_demo_site: demoSite,
                is_Giturl: gitUrl,
                is_Comments: comments,
                is_Swt_function: swtFunction,
                is_MainImg: uploadedMainImg,
                is_LabelImg: uploadedLabelImg,
                is_MenualName: uploadedManual,
            };

            if (type === 'modify') {
                jsonData.is_beforeSwtcode = beforeSwtcode;
            }

            const response = await fetch(`http://localhost:5000/api/Swtool?type=${type}`, {   //type=save, type=modify
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(jsonData),
            });

            const result = await response.json();

            if (result.affectedRows > 0) {
                Swal.fire({
                    position: 'bottom-end',
                    icon: 'success',
                    title: `Software Tools ${type === 'save' ? '등록' : '수정'}이 완료되었습니다.`,
                    showConfirmButton: false,
                    timer: 1000
                }).then(() => navigate('/SoftwareList'));
            } else {
                Swal.fire('저장 실패', '서버에서 저장하지 못했습니다.', 'error');
            }
        } catch (err) {
            console.error('작업 중 예외 발생:', err);
            alert('저장 도중 오류가 발생했습니다.');
        }
    };

    return (
        <section className="sub_wrap">
            <article className="s_cnt mp_pro_li ct1">
                <div className="li_top">
                    <h2 className="s_tit1">Software Tools 등록/수정</h2>
                </div>
                <div className="bo_w re1_wrap re1_wrap_writer">
                    <form name="frm" id="frm">
                        <article className="res_w">
                            <p className="ment" style={{ textAlign: "right" }}>
                                <span className="red">(*)</span>표시는 필수입력사항 입니다.
                            </p>
                            <div className="tb_outline">
                                <table className="table_ty1">
                                    <tbody>
                                        <tr>
                                            <th><label>툴 이름<span className="red">(*)</span></label></th>
                                            <td><input type="text" value={toolName} onChange={(e) => setToolName(e.target.value)} /></td>
                                        </tr>
                                        <tr>
                                            <th><label>데모 URL<span className="red">(*)</span></label></th>
                                            <td><input type="text" value={demoSite} onChange={(e) => setDemoSite(e.target.value)} /></td>
                                        </tr>
                                        <tr>
                                            <th><label>Github URL<span className="red">(*)</span></label></th>
                                            <td><input type="text" value={gitUrl} onChange={(e) => setGitUrl(e.target.value)} /></td>
                                        </tr>
                                        <tr>
                                            <th><label>설명<span className="red">(*)</span></label></th>
                                            <td><textarea value={comments} onChange={(e) => setComments(e.target.value)} /></td>
                                        </tr>
                                        <tr>
                                            <th>메뉴얼 파일</th>
                                            <td className="fileBox">
                                                <label htmlFor="uploadBtn1" className="btn_file">파일선택</label>
                                                <input type="text" readOnly value={manualName} placeholder="선택된 파일 없음" />
                                                <input type="file" id="uploadBtn1" onChange={e => handleFileInput('manual', e)} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>메인 이미지</th>
                                            <td className="fileBox">
                                                <label htmlFor="imageSelect" className="btn_file">파일선택</label>
                                                <input type="text" readOnly value={fileName} placeholder="선택된 파일 없음" />
                                                <input type="file" id="imageSelect" onChange={e => handleFileInput('file', e)} />
                                                {mainImagePreview && <img src={mainImagePreview} alt="Main Preview" />}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>라벨 이미지</th>
                                            <td className="fileBox">
                                                <label htmlFor="imageSelect2" className="btn_file">파일선택</label>
                                                <input type="text" readOnly value={fileName2} placeholder="선택된 파일 없음" />
                                                <input type="file" id="imageSelect2" onChange={e => handleFileInput('file2', e)} />
                                                {labelImagePreview && <img src={labelImagePreview} alt="Label Preview" />}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th><label>상세 기능<span className="red">(*)</span></label></th>
                                            <td><textarea value={swtFunction} onChange={(e) => setSwtFunction(e.target.value)} /></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="btn_confirm mt20">
                                    <Link to="/SoftwareList" className="bt_ty bt_ty1 cancel_ty1">취소</Link>
                                    <button
                                        type="button"
                                        className="bt_ty bt_ty2 submit_ty1"
                                        onClick={(e) => submitClick(mode === 'register' ? 'save' : 'modify', e)}
                                    >
                                        {mode === 'register' ? '저장' : '수정'}
                                    </button>
                                </div>
                            </div>
                        </article>
                    </form>
                </div>
            </article>
        </section>
    );
};

export default SoftwareView;