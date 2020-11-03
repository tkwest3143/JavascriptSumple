const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow = null;
const debug = /--debug/.test(process.argv[2]);

/**
 * 画面作成メソッド
 */
function createWindow() {
  //ウィンドウオプション
  const windowOptions = {
    width: 1080,
    minWidth: 680,
    height: 840,
    title: app.getName(),
    webPreferences: {
      nodeIntegration: true,
    },
  };
  // mainWindowを作成
  mainWindow = new BrowserWindow(windowOptions);
  // Electronに表示するhtmlを絶対パスで指定（相対パスだと動かない）
  mainWindow.loadURL("file://" + __dirname + "/index.html");

  // 次の起動コマンドでデバックモードで起動します: electron . --debug
  if (debug) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}

app.on("ready", () => {
  createWindow();
  displayAbout();
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

function displayAbout() {}
