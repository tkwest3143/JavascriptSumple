/**
 * OS規定のWebブラウザで指定されたurlを開きます。
 * @param {String} url 表示するURL
 */
function startBrowser(url) {
  const { shell } = require("electron");
  shell.openExternal(url);
}
