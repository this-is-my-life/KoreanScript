const electron = require('electron')
const app = electron.app
const ipcMain = electron.ipcMain
const path = require('path')
let startWindow
let mainWindow
let githubWindow
let oldKostWindow


const Menu = electron.Menu
const menuTemplate = [
  {
    label: 'The Hidden Button',
    submenu: [
      {
        label: 'Github Info',
        accelerator: 'F1',
        click (item, focusedWindow) {
          !githubWindow ? createGithubWindow() : null 
        }
      },
      {
        label: 'Hidden',
        accelerator: process.platform === 'darwin' ? 'Alt+Command+P' : 'Ctrl+Shift+P',
        click (item, focusedWindow) {
          !oldKostWindow ? createOldKostWindow() : null
        }
      },
      {
        label: 'Toggle Developer Tools',
        accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
        click (item, focusedWindow) {
          focusedWindow ? focusedWindow.toggleDevTools() : null
        }
      }
    ]
  }
]
const menu = Menu.buildFromTemplate(menuTemplate)

function createStartWindow () {
  startWindow = new electron.BrowserWindow({
    width: 400,
    height: 300,
    resizable: false,
    autoHideMenuBar: true,
    icon: path.join(__dirname, './src/img/kostImage.ico')
  })
  startWindow.setMenu(menu)
  startWindow.loadFile('./src/index.html')
  startWindow.on('closed', () => {
    startWindow = null
  })
}

function createMainWindow () {

  mainWindow = new electron.BrowserWindow({
    minWidth: 800,
    minHeight: 600,
    autoHideMenuBar: true,
    icon: path.join(__dirname, './src/img/kostImage.ico')
  })
  mainWindow.setMenu(menu)
  mainWindow.loadFile('./src/main.html')
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

function createGithubWindow () {
  githubWindow = new electron.BrowserWindow({
    minWidth: 800,
    minHeight: 600,
    autoHideMenuBar: true,
    icon: path.join(__dirname, './src/img/kostImage.ico')
  })
  githubWindow.setMenu(menu)
  githubWindow.loadURL('https://github.com/PMHStudio/KoreanScript')
  githubWindow.on('closed', () => {
    githubWindow = null
  })
}

function createOldKostWindow () {
  oldKostWindow = new electron.BrowserWindow({
    minWidth: 800,
    minHeight: 600,
    autoHideMenuBar: true,
    icon: path.join(__dirname, './src/img/kostImage.ico')
  })
  oldKostWindow.setMenu(menu)
  oldKostWindow.loadURL('http://kost.pmhstudio.kro.kr/')
  oldKostWindow.on('closed', () => {
    oldKostWindow = null
  })
}

app.on('ready', () => {
  if (!startWindow) {
    createStartWindow()
  }
})

app.on('activate', () => {
  if (!startWindow) {
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
