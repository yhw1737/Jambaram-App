const { app, BrowserWindow, ipcMain } = require('electron');
const ipc = ipcMain;  
const path = require('path');
const { createWebSocketConnection } = require('league-connect');

if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = async () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration : true,
      contextIsolation : false
    },
  });
  
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  ipc.on('minimizeApp', ()=>{
    mainWindow.minimize();
  })

  ipc.on('maximizeApp', ()=>{
    if(mainWindow.isMaximized()){
      mainWindow.restore();
    } else {
      mainWindow.maximize();
    }
  })

  ipc.on('closeApp', ()=>{
    mainWindow.close();
  })

  try {
    const ws = await createWebSocketConnection({
      authenticationOptions: {
        awaitConnection: true,
      },
    });
    ws.subscribe('/lol-champ-select/v1/session', (data) => {
      console.log('Received champion pick data'); // 로그 추가
      mainWindow.webContents.send('championPickData', data.actions);
    });
  } catch (error) {
    console.error('WebSocket connection failed:', error); // 에러 로그 추가
  }

};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
