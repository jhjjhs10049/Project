import React, { useState } from 'react';

function ClickExample() {
    const [message, setMessage] = useState("처음 메시지입니다.");

    const handleClick = () => {
        setMessage("버튼이 클릭되었습니다!");
    };

    return (
        <div>
            <h1>{message}</h1>
            <button onClick={handleClick}>클릭하세요</button>
        </div>
    );
}

export default ClickExample;