const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const globalShortcut = electron.globalShortcut;

let mainWindow = null;
const debug = /--debug/.test(process.argv[2]);
var isDevopen = false;

/**
 * 画面作成メソッド
 */
function createWindow() {
  //ウィンドウオプション
  const windowOptions = {
    width: 1080,
    minWidth: 680,
    height: 840,
    minHeight: 480,
    title: app.getName(),
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  };
  // mainWindowを作成
  mainWindow = new BrowserWindow(windowOptions);
  mainWindow.setMenu(null);
  mainWindow.loadURL("file://" + __dirname + "/public/index.html");

  // 次の起動コマンドでデバックモードで起動します: electron . --debug
  if (debug) {
    globalShortcut.register("Ctrl+d", function () {
      if (isDevopen) {
        mainWindow.webContents.closeDevTools();
        isDevopen = false;
      } else {
        mainWindow.webContents.openDevTools();
        isDevopen = true;
      }
    });
  }

  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}

app.on("ready", () => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
