/**
 * 共通的な処理を実装しています。
 */
const { ipcMain } = require("electron");
const path = require("path");
const remote = require("electron").remote;
const { dialog, app } = require("electron").remote;
const globalShortcut = remote.globalShortcut;
const debug = /--debug/.test(process.argv[2]);
var isDevopen = false;

var $ = require("jquery");
var jQuery = require("jquery");
require("jquery-timepicker/jquery.timepicker");
require("jquery-ui/ui/widgets/datepicker");
require("jquery-ui/ui/i18n/datepicker-ja");

const log4js = require("log4js");
const logger = log4js.getLogger();
logger.level = "debug";

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
 * @param {String} url モーダルで開く画面のURL
 */
function showModalWindow(url) {
  remote.app;
  let subWindow = new remote.BrowserWindow({
    parent: remote.getCurrentWindow(), //親ウィンドウのBrowserWindowオブジェクト
    modal: true, //モーダル
    show: true,
    title: app.getName(),
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });
  subWindow.setMenu(null);

  if (debug) {
    //デバッグ起動時にデバッグモードで開く
    subWindow.webContents.openDevTools();
    globalShortcut.register("Ctrl+l", function () {
      if (isDevopen) {
        subWindow.webContents.closeDevTools();
        isDevopen = false;
      } else {
        subWindow.webContents.openDevTools();
        isDevopen = true;
      }
    });
  }
  subWindow.loadURL(url);
  subWindow.once("ready-to-show", () => {
    subWindow.show();
  });
}

/**
 * 引数に指定されたメッセージをもとにダイアログを表示します
 * @param {String} message メッセージ
 * @param {String} type ダイアログ表示タイプ（INFO,WARN,ERROR）
 */
function showDialog(message, type) {
  dialog.showMessageBox(remote.getCurrentWindow(), {
    type: type,
    message: message,
  });
}

/**
 *Date型をStringに変換します
 * @param {Date} date 変換対象の日付
 * @param {String} format フォーマット
 */
function getStringFromDate(date, format) {
  var year_str = date.getFullYear();
  var month_str = 1 + date.getMonth();
  var day_str = date.getDate();
  var hour_str = date.getHours();
  var minute_str = date.getMinutes();
  var second_str = date.getSeconds();

  month_str = ("0" + month_str).slice(-2);
  day_str = ("0" + day_str).slice(-2);
  hour_str = ("0" + hour_str).slice(-2);
  minute_str = ("0" + minute_str).slice(-2);
  second_str = ("0" + second_str).slice(-2);

  format_str = format;
  format_str = format_str.replace(/YYYY/g, year_str);
  format_str = format_str.replace(/MM/g, month_str);
  format_str = format_str.replace(/DD/g, day_str);
  format_str = format_str.replace(/hh/g, hour_str);
  format_str = format_str.replace(/mm/g, minute_str);
  format_str = format_str.replace(/ss/g, second_str);

  return format_str;
}

/**
 * 日付入力系
 */
// 2日本語を有効化
$.datepicker.setDefaults($.datepicker.regional["ja"]);
// 3日付選択ボックスを生成
$(".date").datepicker({ dateFormat: "yy/mm/dd" });

$(".time").timepicker({
  timeFormat: "h:mm p",
  defaultTime: new Date().getHours().toString(),
  dynamic: true,
  dropdown: true,
  scrollbar: true,
});

/**
 * トリムします
 * @param {Stirng}} str 変換対象文字列
 */
function comTrim(str) {
  return str.replace(/^s+|s+$/g, "");
}
/**
 * sql用のデータに変換します。
 * @param {String} date 変換する日付
 * @param {String} time 変換する時間
 */
function sqlDateTimeFormat(date, time) {
  var retDate = date.replace(/\//g, "-");
  var splTime_1 = comTrim(time).split(" ");
  var splTime_2 = comTrim(splTime_1[0]).split(":");
  logger.debug("retdate " + retDate);
  logger.debug("splTime_1 " + splTime_1[0]);
  logger.debug("splTime_2 " + splTime_2[0]);

  if (comTrim(splTime_1[1]).match(/PM/)) {
    var num = Number(splTime_2[0]) + 12;
    splTime_2[0] = num;
    logger.debug("splTime_2[0] " + splTime_2[0]);
  }
  var retTime = splTime_2[0] + ":" + splTime_2[1];
  logger.debug(retDate + " " + retTime);
  return retDate + " " + retTime;
}

/**
 * ネットにつながっているかどうかを判定
 */
function isNetworkCoonnect() {
  if (window.navigator.onLine) {
    return true;
  } else {
    return false;
  }
}

/**
 * ファイルダイアログを表示します。
 */
function fileDialogOpen() {
  shell.showItemInFolder(os.homedir());
}

/**
 *通知配信クラス
 * @param {String}} title タイトル
 * @param {String} body 本文
 */
function sendTsuchi(title, body) {
  const notification = {
    title: title,
    body: body,
  };
  const myNotification = new window.Notification(
    notification.title,
    notification
  );

  myNotification.onclick = () => {
    console.log("Notification clicked");
  };
}
