import React, { useState } from "react";
import { Link } from "react-router-dom";

import photoReview from '../img/aside/photo_review.jpg';
import btnOpen from '../img/aside/btn_open.png';
import btnClose from '../img/aside/btn_close.png';


function Aside() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <aside
            className={isOpen ? 'open' : ''}
            style={{
                right: isOpen ? 0 : '-220px',
                transition: 'right 0.5s ease-in-out',
                position: 'fixed'
            }}
        >
            <Link to={'#'}>
                <img src={photoReview} alt="" />

            </Link>
            <nav id="asidenav">
                <ul>
                    <li><a href="/ClickExample">공지사항ClickExample</a></li>
                    <li><a href="/ChangeExample1">상품문의ChangeExample1</a></li>
                    <li><a href="/ChangeExample2">배송조회ChangeExample2</a></li>
                    <li><a href="/OnclickExample">장바구니OnclickExample</a></li>
                    <li><Link to="/favorites">관심상품</Link></li>
                </ul>
            </nav>
            <button onClick={() => setIsOpen(!isOpen)}>
                <img
                    src={isOpen ? btnClose : btnOpen}
                    alt={isOpen ? 'close' : 'open'}
                />
            </button>
        </aside>

    );
}

export default Aside;