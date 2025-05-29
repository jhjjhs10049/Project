import React, { useEffect, useRef } from "react";
import Main2 from "./Main2"; // Main2 컴포넌트 임포트
import Main3 from "./Main3"; // Main3 컴포넌트 임포트

function Main() {
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);

    useEffect(() => {
        // 인터섹션 옵저버 생성
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    // 요소가 화면에 나타나면 fade-in 클래스 추가
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in');
                    } else {
                        // 요소가 화면에서 사라지면 fade-in 클래스 제거
                        entry.target.classList.remove('fade-in');
                    }
                });
            },
            {
                // 옵션 설정
                threshold: 0.1, // 요소의 10%가 보이면 콜백 실행
                rootMargin: '0px' // 루트 마진 설정
            }
        );

        // 타이틀 요소와 서브타이틀 요소 관찰 시작
        const elements = [titleRef.current, subtitleRef.current];
        elements.forEach(element => {
            if (element) {
                observer.observe(element);
            }
        });

        // 컴포넌트 언마운트 시 관찰 중단
        return () => {
            elements.forEach(element => {
                if (element) {
                    observer.unobserve(element);
                }
            });
        };
    }, []);

    return (
        <div>
            <div className="section1">
                <b ref={titleRef}>당신의 도시를 더 빛나게</b>
                <p ref={subtitleRef}>윤성조명은 언제나 여러분의 곁에 있습니다</p>
            </div>

            {/* 그라디언트 연결 부분 추가 */}
            <div className="gradient-connector"></div>

            {/* Main2 컴포넌트 추가 */}
            <Main2 />

            {/* Main3 컴포넌트 추가 */}
            <Main3 />
        </div>
    );
}

export default Main;