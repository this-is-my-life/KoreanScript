const electron = require('electron')
const app = electron.app
const ipcMain = electron.ipcMain
const globalShortcut = electron.globalShortcut
const path = require('path')
let startWindow
let mainWindow
let githubWindow
let oldKostWindow

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
  globalShortcut.register('Return', () => {
    if (startWindow) {
      createMainWindow()
      startWindow.close()
    }
  })
}

function createMainWindow () {

  mainWindow = new electron.BrowserWindow({
    minWidth: 800,
    minHeight: 600,
    icon: path.join(__dirname, './src/img/kostImage.ico')
  })
  mainWindow.setMenu(null)
  mainWindow.loadFile('./src/main.html')
  mainWindow.on('closed', () => {
    mainWindow = null
  })
  globalShortcut.unregister('Return')
}

function createGithubWindow () {
  githubWindow = new electron.BrowserWindow({
    minWidth: 800,
    minHeight: 600,
    icon: path.join(__dirname, './src/img/kostImage.ico')
  })
  githubWindow.setMenu(null)
  githubWindow.loadURL('https://github.com/PMHStudio/KoreanScript')
  githubWindow.on('closed', () => {
    githubWindow = null
  })
}

function createOldKostWindow () {
  oldKostWindow = new electron.BrowserWindow({
    minWidth: 800,
    minHeight: 600,
    icon: path.join(__dirname, './src/img/kostImage.ico')
  })
  oldKostWindow.setMenu(null)
  oldKostWindow.loadURL('http://kost.pmhstudio.kro.kr/')
  oldKostWindow.on('closed', () => {
    oldKostWindow = null
  })
}

app.on('ready', () => {
  globalShortcut.register('CommandOrControl+Shift+P', () => {
    if (startWindow) {
      startWindow.toggleDevTools()
    } else if (mainWindow) {
      mainWindow.toggleDevTools()
    }
  })

  globalShortcut.register('CommandOrControl+Alt+Shift+P', () => {
    if (!oldKostWindow) {
      createOldKostWindow()
    }
  })

  globalShortcut.register('Esc', () => {
    if (githubWindow) {
      githubWindow.close()
    } else if (oldKostWindow) {
      oldKostWindow.close()
    } else if (startWindow) {
      app.quit()
    } else if (mainWindow) {
      createStartWindow()
      mainWindow.close()
    }
  })

  globalShortcut.register('F1', () => {
    if (!githubWindow) {
      createGithubWindow()
    }
  })
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
  createMainWindow()
  startWindow.close()
})

ipcMain.on('ipc-study', () => {
  createGithubWindow()
})
