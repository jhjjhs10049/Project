import React from 'react';
// import { BrowserRouter as Router } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import Main2 from './components/Main2'; // Main2 컴포넌트 임포트 추가
import Aside from './components/Aside';

import LoginForm from './pages/LoginForm';
import Join from './pages/Join';
import Map from './pages/Map';
import Test from './pages/test';
import SoftwareList from './components/SoftwareList';
import SwalExample from './pages/SwalExample';
import SoftwareView from './components/SoftwareView';
import SoftwareViewOne from './components/SoftwareView_1';
import TestuseEffect from './pages/TestuseEffect';
import ClickExample from './pages/ClickExample';
import ChangeExample1 from './pages/ChangeExample1';
import ChangeExample2 from './pages/ChangeExample2';
import OnClickExample from './pages/OnClickExample';
// import Register from './pages/Register'; // 존재하지 않는 파일 임포트 제거
import Register2 from './pages/Register2';
import Shopping from './pages/Shopping';
import Info from './pages/Info';
import Center from './pages/Center'; // Center 컴포넌트 임포트 추가

import './css/new.css';
import './css/main.css';
import './css/main2.css';
import './css/join.css';
import './css/map.css';
import './css/aside.css';
import './css/footer.css';
import './css/Register2.css';
import './css/shopping.css'; // Shopping CSS 임포트 추가
import './css/info.css'; // Info CSS 임포트 추가
import './css/center.css'; // Center CSS 임포트 추가

function App() {
    return (
        <Router>
            <Header />
            <Aside />

            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/Main2" element={<Main2 />} /> {/* Main2 라우트 추가 */}
                <Route path="/LoginForm" element={<LoginForm />} />
                <Route path="/Join" element={<Join />} />
                <Route path="/Map" element={<Map />} />
                <Route path="/Test" element={<Test />} />
                <Route path="/SoftwareList" element={<SoftwareList />} />
                <Route path="/SwalExample" element={<SwalExample />} />
                <Route path="/SoftwareView/:swtcode" element={<SoftwareView />} />
                <Route path="/SoftwareView_1" element={<SoftwareViewOne />} />
                <Route path="/TestuseEffect" element={<TestuseEffect />} />
                <Route path="/ClickExample" element={<ClickExample />} />
                <Route path="/ChangeExample1" element={<ChangeExample1 />} />
                <Route path="/ChangeExample2" element={<ChangeExample2 />} />
                <Route path="/OnClickExample" element={<OnClickExample />} />
                {/* <Route path="/Register" element={<Register />} /> */} {/* 존재하지 않는 컴포넌트 라우트 제거 */}
                <Route path="/Register2" element={<Register2 />} />
                <Route path="/Shopping" element={<Shopping />} /> {/* Shopping 라우트 추가 */}
                <Route path="/Info" element={<Info />} /> {/* Info 라우트 추가 */}
                <Route path="/Center" element={<Center />} /> {/* Center 라우트 추가 */}
            </Routes>

            <Footer name="HANJUN" />
        </Router>
    );
}

export default App;