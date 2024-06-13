window.onload = function() {
    alert('functions loaded');

    var btnMin = document.getElementById("min");
    var btnMax = document.getElementById("max");
    var btnClose = document.getElementById("close");

    var stch = 0;

    btnMin.addEventListener("click", () => {
        window.electronAPI.minimizeApp();
    });

    btnMax.addEventListener("click", () => {
        window.electronAPI.maximizeApp();
        if (stch == 0) {
            btnMax.style.backgroundImage = "url('Source/maximize.png')";
            stch = 1;
        } else {
            btnMax.style.backgroundImage = "url('Source/maximize2.png')";
            stch = 0;
        }
    });

    btnClose.addEventListener("click", () => {
        window.electronAPI.closeApp();
    });
};

document.addEventListener('DOMContentLoaded', function() {
    alert('DOM fully loaded and parsed');

    var links = document.querySelectorAll('.sidebar ul li a');
    var content = document.getElementById('content');

    links.forEach(function(link) {
        link.addEventListener('click', function() {
            links.forEach(function(link) {
                link.classList.remove('active');
            });

            this.classList.add('active');

            if (this.id === 'champion-tier') {
                content.innerHTML = '<h1>챔피언 티어</h1><p>챔피언 티어 내용</p>';
            } else if (this.id === 'combination-tier') {
                content.innerHTML = '<h1>조합 티어</h1><p>조합 티어 내용</p>';
            } else if (this.id === 'champion-pick') {
                content.innerHTML = '<h1>챔피언 픽</h1><p>챔피언 픽 정보를 기다리고 있습니다...</p>';
            } else if (this.id === 'random-challenge') {
                content.innerHTML = '<h1>랜덤 챌린지</h1><p>랜덤 챌린지 내용</p>';
            }
        });
    });

    if (window.electronAPI) {
        alert('electronAPI is available');
        window.electronAPI.onChampionPickData((data) => {
            alert('Received champion pick data in renderer');
            displayChampionPick(content, data);
        });
    } else {
        alert('electronAPI is not available');
    }
});

function displayChampionPick(content, actions) {
    content.innerHTML = '<h1>챔피언 픽</h1>';
    var championList = document.createElement('ul');

    actions.forEach(actionGroup => {
        actionGroup.forEach(action => {
            if (action.type === 'pick' && action.championId !== 0) {
                var listItem = document.createElement('li');
                listItem.textContent = `챔피언 ID: ${action.championId}`;
                championList.appendChild(listItem);
            }
        });
    });

    content.appendChild(championList);
}
