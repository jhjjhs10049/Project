import React, { useEffect, useState, useCallback } from 'react';

function TestuseEffect() {
    const [count, setCount] = useState(0);                 //   (2) 상태변경
//////////////////////////////////////////////////////
    useEffect(() => {                                             //   (4) useEffect()실행
        console.log("렌더링 완료 후 실행됨!");             //    (5) [] 공백이면 한번만 실행
    }, [count]);                                                    //     [count] count바뀔때마다 실행

//////////////////////////////////////////////////////////
    const handleClick = useCallback(() => {                                
              console.log("클릭!", count);
    }, [count]);                                                 // count가 바뀔 때만 이 함수가 새로 생성됨


    return (
        <div>
            <p>카운트: {count}</p>                                         { /* (3) 화면 렌더링 */}
            <button onClick={() => setCount(count + 1)}>카운트 증가</button>       { /*(1) 버튼클릭 */}
            <button onClick={handleClick}>콘솔에 출력</button>
        </div>
    );
}

export default TestuseEffect;