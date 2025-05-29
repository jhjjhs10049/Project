//my-fullstack-app/server/server.js

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;
// 기타 미들웨어 및 라우터 설정
const dbRouter = require('./routes/dbconnect_Module');
const swtoolRouter = require('./routes/SwtoolRout');
const fileuploadRouter = require("./routes/UploadRoute");   // 파일업로드
const usersRouter = require("./routes/UsersRout");
const path = require('path');

// CORS 설정
app.use(cors({
    origin: 'http://localhost:3000', // 허용할 클라이언트의 출처
    methods: ['GET', 'POST'],        // 허용할 HTTP 메서드
    credentials: true                // 인증 정보 포함 여부 (필요한 경우)
}));


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

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});