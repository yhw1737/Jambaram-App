window.onload = function() {
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

document.addEventListener('DOMContentLoaded', function () {
  const links = document.querySelectorAll('.sidebar ul li a');
  const content = document.getElementById('content');

  links.forEach(function (link) {
    link.addEventListener('click', function () {
      links.forEach(function (link) {
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
    window.electronAPI.onChampionPickData((data) => {
      document.getElementById('champion-pick').click();
      displayChampionPick(content, data);
    });
  }
});

function displayChampionPick(content, myTeam) {
  content.innerHTML = '<h1>챔피언 픽</h1>';
  var championList = document.createElement('ul');

  myTeam.forEach(player => {
    var listItem = document.createElement('li');
    listItem.textContent = `챔피언 ID: ${player.championId}`;
    championList.appendChild(listItem);
  });

  content.appendChild(championList);
}