const { ipcRenderer } = require('electron');
const ipc = ipcRenderer;

var btnMin = document.getElementById("min");
var btnMax = document.getElementById("max");
var btnClose = document.getElementById("close");

var stch = 0;

btnMin.addEventListener("click", ()=>{
    ipc.send('minimizeApp');
});

btnMax.addEventListener("click", ()=>{
    ipc.send('maximizeApp');
    if(stch == 0) {btnMax.style.backgroundImage = "url('Source/maximize.png')"; stch = 1;}
    else {btnMax.style.backgroundImage = "url('Source/maximize2.png')"; stch = 0;}
});

btnClose.addEventListener("click", ()=>{
    ipc.send('closeApp');
});

document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');

    const loadContent = (contentId) => {
        switch (contentId) {
            case 'champion-tier':
                content.innerHTML = '<h1>챔피언 티어</h1><p>챔피언 티어 정보가 여기에 표시됩니다.</p>';
                break;
            case 'combination-tier':
                content.innerHTML = '<h1>조합 티어</h1><p>조합 티어 정보가 여기에 표시됩니다.</p>';
                break;
            case 'champion-pick':
                content.innerHTML = '<h1>챔피언 픽</h1><p>챔피언 픽 정보가 여기에 표시됩니다.</p>';
                break;
            case 'random-challenge':
                content.innerHTML = '<h1>랜덤 챌린지</h1><p>랜덤 챌린지 정보가 여기에 표시됩니다.</p>';
                break;
            default:
                content.innerHTML = '<h1>환영합니다</h1><p>사이드바 메뉴를 클릭하여 내용을 확인하세요.</p>';
                break;
        }
    };

    // 초기 콘텐츠 로드
    loadContent();

    // 사이드바 메뉴에 클릭 이벤트 추가
    document.querySelectorAll('.sidebar ul li a').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const contentId = event.target.id;
            loadContent(contentId);
        });
    });
});
