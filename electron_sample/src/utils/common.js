const remote = require("electron").remote;
const dialog = require("electron").dialog;

/**
 * OS規定のWebブラウザで指定されたurlを開きます。
 * @param {String} url 表示するURL
 */
function startBrowser(url) {
  const { shell } = require("electron");
  shell.openExternal(url);
}

/**
 * urlに指定されたファイルをモーダルウィンドウで開きます
 * @param {String} url
 */
function showModalWindow(url) {
  let subWindow = new remote.BrowserWindow({
    parent: remote.getCurrentWindow(), //親ウィンドウのBrowserWindowオブジェクト
    modal: true,
    show: false,
  });

  subWindow.loadURL(url);
  subWindow.webContents.openDevTools();
  subWindow.once("ready-to-show", () => {
    subWindow.show();
  });
}

function showMessageBox(message, type) {
  dialog.showMessageBox(remote.getCurrentWindow(), {
    type: type,
    message: message,
  });
}
