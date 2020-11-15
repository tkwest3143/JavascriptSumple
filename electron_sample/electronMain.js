const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const globalShortcut = electron.globalShortcut;
var sqlite3 = require("sqlite3").verbose();

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
    title: app.getName(),
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  };
  // mainWindowを作成
  mainWindow = new BrowserWindow(windowOptions);
  mainWindow.setMenu(null);
  // Electronに表示するhtmlを絶対パスで指定（相対パスだと動かない）
  mainWindow.loadURL("file://" + __dirname + "/index.html");

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
  dbInit();
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

/**
 * DBが存在しない場合に作成します。
 */
function dbInit() {
  var db = new sqlite3.Database("todo.db");
  // テーブルを作成する。
  db.run(
    "CREATE TABLE IF NOT EXISTS todo (title TEXT, discription TEXT, start_date DATETIME, end_date DATETIME)"
  );
}
