import React from "react";

// 인라인 스타일 정의
const styles = {
    mapContentWrapper: {
        width: '100%',
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
    },
    mapContainer: {
        width: '100%',
        borderRadius: '8px',
        overflow: 'hidden',
        marginBottom: '30px'
    },
    locationInfo: {
        padding: '20px 0'
    },
    infoSection: {
        marginBottom: '20px'
    },
    infoTitle: {
        fontSize: '18px',
        fontWeight: '600',
        color: '#4a6ee0',
        marginBottom: '10px',
        borderLeft: '4px solid #4a6ee0',
        paddingLeft: '10px'
    },
    infoParagraph: {
        fontSize: '15px',
        lineHeight: '1.6',
        color: '#555',
        margin: '5px 0'
    },
    videoTitle: {
        marginTop: '40px'
    },
    videoContainer: {
        width: '100%',
        maxWidth: '1000px',
        margin: '20px auto 40px',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
    }
};

function Map() {
    return (
        <div>
            <section className="sub_wrap">
                <article className="s_cnt re_1 ct1">
                    <div className="li_top">
                        <h2 className="s_tit1">찾아오시는 길</h2>
                        <div style={styles.mapContentWrapper}>
                            <div style={styles.mapContainer}>
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1922.4293645677158!2d128.59270052086677!3d35.870381861947486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3565e3797cd9ef15%3A0x8eab30b39a105523!2z7KSR7JWZ66Gc7JetIOycpOyEsURY7JWE7Lm0642w66-4!5e0!3m2!1sko!2skr!4v1744163716798!5m2!1sko!2skr"
                                    width="100%"
                                    height="450"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="학원 위치"
                                ></iframe>
                            </div>

                            <div style={styles.locationInfo}>
                                <div style={styles.infoSection}>
                                    <h3 style={styles.infoTitle}>주소</h3>
                                    <p style={styles.infoParagraph}>대구광역시 중구 국채보상로 582 미도빌딩 7층</p>
                                </div>
                                <div style={styles.infoSection}>
                                    <h3 style={styles.infoTitle}>연락처</h3>
                                    <p style={styles.infoParagraph}>Tel: 053-252-8889</p>
                                    <p style={styles.infoParagraph}>Email: yoon@dxcenter.co.kr</p>
                                </div>
                                <div style={styles.infoSection}>
                                    <h3 style={styles.infoTitle}>교통안내</h3>
                                    <p style={styles.infoParagraph}>1호선 중앙로역 2번출구 도보 1~2분 내외</p>
                                </div>
                            </div>
                        </div>

                        <h2 className="s_tit1" style={styles.videoTitle}>학원 소개 영상</h2>
                        <div style={styles.videoContainer}>
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