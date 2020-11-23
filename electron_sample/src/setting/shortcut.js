const { app, dialog, globalShortcut } = require("electron");

globalShortcut.register("CmdOrCtrl+Alt+K", () => {
  dialog.showMessageBox({
    type: "info",
    message: "Success!",
    detail: "You pressed the registered global shortcut keybinding.",
    buttons: ["OK"],
  });
});

//画面を閉じるショートカット
globalShortcut.register("CmdOrCtrl+Q", () => {
  dialog
    .showMessageBox({
      type: "info",
      message: "アプリを終了してもよろしいですか?",
      detail: "アプリを終了すると保存していない情報は削除されます。",
      buttons: ["OK", "CANCEL"],
    })
    .then((result) => {
      if (result.response == 0) {
        app.quit();
      }
    });
});

app.on("will-quit", () => {
  globalShortcut.unregisterAll();
});
