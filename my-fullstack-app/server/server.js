//my-fullstack-app/server/server.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 5000;
// 기타 미들웨어 및 라우터 설정
const dbRouter = require('./routes/dbconnect_Module');
const swtoolRouter = require('./routes/SwtoolRout');
const fileuploadRouter = require("./routes/UploadRoute");   // 파일업로드
const usersRouter = require("./routes/UsersRout");
const path = require('path');
const fs = require('fs');

// 필요한 디렉토리 확인 및 생성
const uploadsDir = path.join(__dirname, 'uploads');
const imageDir = path.join(uploadsDir, 'image');
const swmanualDir = path.join(uploadsDir, 'swmanual');

if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
    console.log('uploads 폴더 생성 완료');
}
if (!fs.existsSync(imageDir)) {
    fs.mkdirSync(imageDir);
    console.log('uploads/image 폴더 생성 완료');
}
if (!fs.existsSync(swmanualDir)) {
    fs.mkdirSync(swmanualDir);
    console.log('uploads/swmanual 폴더 생성 완료');
}

// CORS 설정
app.use(cors({
    origin: 'http://localhost:3000', // 허용할 클라이언트의 출처
    methods: ['GET', 'POST'],        // 허용할 HTTP 메서드
    credentials: true                // 인증 정보 포함 여부 (필요한 경우)
}));

// 미들웨어 설정
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


app.use('/db', dbRouter);
app.use("/api/Swtool", swtoolRouter);
app.get('/api', (req, res) => {
    res.json({ message: 'Hello from server!' });
});

app.use("/api/upload", fileuploadRouter);   // 파일업로드 라우터
app.use(express.static("./uploads"));       //  정적폴더지정
// 이미지 경로 정적 제공
app.use('/image', express.static(path.join(__dirname, 'uploads/image')));
app.use('/swmanual', express.static(path.join(__dirname, 'uploads/swmanual')));
app.use("/api/register", usersRouter);      // 회원가입
app.use("/api/LoginForm", usersRouter);     // 로그인

// 오류 처리 미들웨어
app.use((err, req, res, next) => {
    console.error('서버 오류:', err);
    res.status(500).json({ error: '서버 내부 오류가 발생했습니다.' });
});

// 404 오류 처리
app.use((req, res) => {
    res.status(404).json({ error: '요청하신 경로를 찾을 수 없습니다.' });
});

// 예외 처리
process.on('uncaughtException', (err) => {
    console.error('처리되지 않은 예외:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('처리되지 않은 거부:', reason);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});