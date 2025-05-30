@echo off
echo Express 서버 의존성 설치 및 서버 시작

cd /d %~dp0\server

echo 필요한 패키지 설치 중...
call npm install

echo 서버 시작 준비가 완료되었습니다.
echo 서버를 시작하려면 아무 키나 누르세요...
pause
