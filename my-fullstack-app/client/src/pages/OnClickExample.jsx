import React, { useState } from 'react';
function OnClickExample() {
    const [name, setName] = useState("");
    const [inputValue, setInputValue] = useState("");

    const submitClick = async (type, e) => {
        e.preventDefault();          //이 문장이 없으면 버튼 클릭시 새로고침되어서 데이터가 날라갈수 있음
        if (type === 'save') {
            setName(inputValue);  // 입력한 값을 name에 설정
            console.log(name);
        }

        /*
          const response = await fetch(`http://localhost:5000/api/Swtool?type=${type}`, {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({ username: name }),
         });
        */
    }

    // 입력 필드의 값이 변경될 때 호출되는 함수
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    return (
        <div>
            <form name="frm">
                <input type="text" value={inputValue} onChange={handleInputChange} />
                <button onClick={(e) => submitClick('save', e)} > 저장 </button><br />
                <span style={{ fontSize: '1.5rem' }}>당신의 이름은 {name}입니다.</span>
            </form>
        </div>
    );
}
export default OnClickExample;