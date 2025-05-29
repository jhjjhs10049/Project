//client/pages/SwalExample.jsx
import React from 'react';
import Swal from 'sweetalert2';

const SwalExample = () => {
    const handleClickSuccess = () => {
        Swal.fire('성공!', '작업이 성공적으로 완료되었습니다.', 'success');
    };

    const handleClickConfirm = () => {
        Swal.fire({
            title: '정말 삭제하시겠습니까?',
            text: '이 작업은 되돌릴 수 없습니다!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '네, 삭제합니다',
            cancelButtonText: '아니요',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('삭제 완료!', '데이터가 삭제되었습니다.', 'success');
            } else {
                Swal.fire('취소됨', '삭제가 취소되었습니다.', 'info');
            }
        });
    };

    const handleClickAutoClose = () => {
        Swal.fire({
            title: '자동 닫힘 팝업',
            text: '1.5초 후 자동으로 사라집니다.',
            icon: 'info',
            timer: 1500,
            showConfirmButton: false,
        });
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h2>SweetAlert2 실습 예제</h2>
            <button onClick={handleClickSuccess}>성공 메시지</button><br /><br />
            <button onClick={handleClickConfirm}>삭제 확인 메시지</button><br /><br />
            <button onClick={handleClickAutoClose}>자동 닫힘 메시지</button>
        </div>
    );
};

export default SwalExample;
