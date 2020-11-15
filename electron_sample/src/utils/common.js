const remote = require("electron").remote;
const { dialog } = require("electron").remote;
const app = remote.app;

var $ = require("jquery");
var jQuery = require("jquery");
require("jquery-timepicker/jquery.timepicker");
require("jquery-ui/ui/widgets/datepicker");
require("jquery-ui/ui/i18n/datepicker-ja");

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
  remote.app;
  //window.open(url, "", "width=300,height=300");
  let subWindow = new remote.BrowserWindow({
    parent: remote.getCurrentWindow(), //親ウィンドウのBrowserWindowオブジェクト
    modal: true,
    show: false,
    title: app.getName(),
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });
  subWindow.webContents.openDevTools();
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
 *
 * @param {Date} date
 * @param {String} format
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
