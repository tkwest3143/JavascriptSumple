const { app, BrowserWindow, globalShortcut } = require("electron");

const path = require("path");
const glob = require("glob");
var sqlite3 = require("sqlite3").verbose();

const logger = require("log4js").getLogger();
logger.level = "debug";

const debug = /--debug/.test(process.argv[2]);
var isDevopen = false;

let mainWindow = null;
function init() {
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
    mainWindow.loadURL("file://" + __dirname + "/index.html");
    loadSetting();
    // 次の起動コマンドでデバックモードで起動します: electron . --debug
    if (debug) {
      globalShortcut.register("CommandOrControl+d", function () {
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

  /**
   *
   */
  app.on("activate", () => {
    if (mainWindow === null) {
      createWindow();
    }
  });

  /**
   * DBが存在しない場合に作成します。
   */
  function dbInit() {
    var db = new sqlite3.Database("schedule.db");
    // テーブルを作成する。
    db.run(
      "CREATE TABLE IF NOT EXISTS todo ( todo_id INTEGER, title TEXT, discription TEXT, start_date DATETIME, end_date DATETIME)"
    );
  }
  function makeSingleInstance() {
    if (process.mas) return;

    app.requestSingleInstanceLock();

    app.on("second-instance", () => {
      if (mainWindow) {
        if (mainWindow.isMinimized()) mainWindow.restore();
        mainWindow.focus();
      }
    });
  }
  /**
   * electronのsettingを読み込みます。
   */
  function loadSetting() {
    const files = glob.sync(path.join(__dirname, "src/setting/*.js"));
    files.forEach((file) => {
      logger.debug(file);
      require(file);
    });
  }
}
init();
