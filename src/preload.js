const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  onChampionPickData: (callback) => ipcRenderer.on('championPickData', (event, data) => callback(data))
});

console.log('preload script loaded');