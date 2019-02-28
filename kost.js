const electron = require('electron')
const app = electron.app
const ipcMain = electron.ipcMain
const path = require('path')
let startWindow
let mainWindow
let githubWindow

function createStartWindow () {
  startWindow = new electron.BrowserWindow({
    width: 400,
    height: 300,
    resizable: false,
    icon: path.join(__dirname, './src/img/kostImage.ico')
  })
  startWindow.setMenu(null)
  startWindow.loadFile('./src/index.html')
  startWindow.on('closed', () => {
    startWindow = null
  })
}

app.on('ready', () => {
  createStartWindow()
})

app.on('activate', () => {
  if (startWindow === null) {
    createStartWindow()
  }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.on('ipc-startButton', () => {
  mainWindow = new electron.BrowserWindow({
    icon: path.join(__dirname, './src/img/kostImage.ico')
  })
  mainWindow.setMenu(null)
  mainWindow.loadFile('./src/main.html')
  mainWindow.on('closed', () => {
    mainWindow = null
  })
  startWindow.close()
})

ipcMain.on('ipc-study', () => {
  githubWindow = new electron.BrowserWindow({
    icon: path.join(__dirname, './src/img/kostImage.ico')
  })
  githubWindow.setMenu(null)
  githubWindow.loadURL('https://github.com/PMHStudio/KoreanScript/tree/prototype#%EC%98%88%EC%A0%9C')
  githubWindow.on('closed', () => {
    githubWindow = null
  })
})
