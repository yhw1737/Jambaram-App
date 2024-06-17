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
      nodeIntegration : false,
      contextIsolation : true,
    },
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  
  ipcMain.on('minimizeApp', () => mainWindow.minimize());
  ipcMain.on('maximizeApp', () => mainWindow.isMaximized() ? mainWindow.restore() : mainWindow.maximize());
  ipcMain.on('closeApp', () => mainWindow.close());

  connectToClient(mainWindow);

};

app.whenReady().then(createWindow);
app.on('window-all-closed', () => process.platform !== 'darwin' && app.quit());

const connectToClient = async (mainWindow) => {
  try {
    const ws = await createWebSocketConnection({ awaitConnection: true });
    ws.subscribe('/lol-champ-select/v1/session', (data) => {
      console.log('Received data:', data);
      mainWindow.webContents.send('championPickData', data.myTeam);
    });
  } catch (error) {
    console.error('WebSocket connection failed:', error);
  }
};