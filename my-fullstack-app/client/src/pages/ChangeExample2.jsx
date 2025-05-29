import React, { useState } from 'react';

function ChangeExample2() {
    const [toolName, setToolName] = useState("");
    const [Id, setId] = useState("");

    return (
        <div>
            <input type="text" placeholder='이름을 입력하세요' onChange={(e) => setToolName(e.target.value)} /><br />
            <input type="text" placeholder='아이디를 입력하세요' onChange={(e) => setId(e.target.value)} /><br />
            <p>입력한 이름 : {toolName}</p>
            <p>입력한 아이디 : {Id}</p>
        </div>
    );
}

export default ChangeExample2;