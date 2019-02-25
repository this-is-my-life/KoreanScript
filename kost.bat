@echo off
node -v
if not "%ERRORLEVEL%" == "0" (
    cls
    echo Node.js is not installed
    echo Open Installation site..
    start https://nodejs.org
    pause
    exit
)
if not exist ./node_modules (
    echo Downloading Modules...
    npm install
)
echo * 이글이 보인다면 설치작업이 끝난것입니다! >./WorkStation/input.kost
echo * 이제 아래에 한글스크립트를 작성, 저장하신후 >>./WorkStation/input.kost
echo * 이 창을 닫으시면 됩니다! >>./WorkStation/input.kost
start /wait notepad ./WorkStation/input.kost
node kost.js input
start ./output.txt
echo on
