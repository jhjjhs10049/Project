//my-fullstack-app/client/pages/Test.jsx
import React, { useEffect,useState } from 'react';

function Test() {
    const [data, setData]=useState(null);
    const [err, setErr]=useState(null);
    useEffect(() => {
        fetch('http://localhost:5000/db', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                mapper: 'SwToolsMapper',
                mapper_id: 'selectCount'
            }),
            credentials: 'include' // 인증 정보 포함
        })
            .then(response => response.json())
            .then(data => {
                setData(data);
                console.log('서버 응답:', data);
            })
            .catch(error => {
                setErr(err);
                console.error('에러 발생:', error);
            });


    }, []);

    return (
        <div>
            <h1>My Test</h1>
            {data ? (<p>{JSON.stringify(data)}</p>):(<p>데이터 없음</p>)}
            {err ? (<p>에러가 있음</p>) : (<p>에러가 없음</p>)}
            {/* /3항연산자 data가 있으면 json 괄호 출력 없으면 뒤 에러괄호 출력 */}
        </div>
    );
}

export default Test;