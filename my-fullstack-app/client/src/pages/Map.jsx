import React from "react";

// 인라인 스타일 정의는 모두 CSS 파일로 이동했으므로 제거

function Map() {
    return (
        <div>
            <section className="sub_wrap">
                <article className="s_cnt re_1 ct1">
                    <div className="li_top">                        <h2 className="s_tit1">찾아오시는 길</h2>
                        <div className="map-content-wrapper">
                            <div className="map-container">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1922.4293645677158!2d128.59270052086677!3d35.870381861947486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3565e3797cd9ef15%3A0x8eab30b39a105523!2z7KSR7JWZ66Gc7JetIOycpOyEsURY7JWE7Lm0642w66-4!5e0!3m2!1sko!2skr!4v1744163716798!5m2!1sko!2skr"
                                    width="100%"
                                    height="450"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="학원 위치"
                                ></iframe>                            </div>

                            <div className="location-info">
                                <div className="info-section">
                                    <h3>주소</h3>
                                    <p>대구광역시 중구 국채보상로 582 미도빌딩 7층</p>
                                </div>
                                <div className="info-section">
                                    <h3>연락처</h3>
                                    <p>Tel: 053-252-8889</p>
                                    <p>Email: yoon@dxcenter.co.kr</p>
                                </div>
                                <div className="info-section">
                                    <h3>교통안내</h3>
                                    <p>1호선 중앙로역 2번출구 도보 1~2분 내외</p>
                                </div>
                            </div>
                        </div>                        <h2 className="s_tit1 video-title">홍보 영상</h2>
                        <div className="video-container">
                            <iframe
                                width="100%"
                                height="500"
                                src="https://www.youtube.com/embed/Y741E3IM2Kw"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </article>
            </section>
        </div>
    );
}

export default Map;