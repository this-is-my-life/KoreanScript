const { ipcRenderer } = require('electron')
document.getElementById('in-startButton').addEventListener('click', () => {
  ipcRenderer.send('ipc-startButton')
})
