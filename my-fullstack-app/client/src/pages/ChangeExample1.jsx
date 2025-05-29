import React, { useState } from 'react';

function ChangeExample1() {
  const [text, setText] = useState("");

  const handleChange = (e) => {
        setText(e.target.value);
  };

  return (
    <div>
      <input type="text" placeholder="입력하세요" onChange={handleChange} />
      <p>입력한 값: {text}</p>
    </div>
  );
}

export default ChangeExample1;