@echo off
echo Express 서버와 React 클라이언트 시작

echo 1. 서버 시작...
start cmd /k "cd /d %~dp0\server && node server.js"

echo 2. 5초 대기...
timeout /t 5 > nul

echo 3. 클라이언트 시작...
start cmd /k "cd /d %~dp0\client && npm start"

echo 서버와 클라이언트가 별도의 창에서 실행됩니다.
