const { BrowserWindow, Menu, app, shell, dialog } = require("electron");
const debug = /--debug/.test(process.argv[2]);
var isDevopen = false;
let template = [
  {
    label: "ファイル",
    submenu: [
      {
        label: "予定の作成",
        accelerator: "CmdOrCtrl+Z",
        click: (item, focusedWindow) => {},
      },
      {
        label: "今日の予定",
        accelerator: "Shift+CmdOrCtrl+Z",
        click: (item, focusedWindow) => {},
      },
      {
        type: "separator",
      },
      {
        label: "データ削除",
        accelerator: "CmdOrCtrl+Alt+D",
        click: (item, focusedWindow) => {
          if (focusedWindow) {
            if (focusedWindow.id === 1) {
              dialog
                .showMessageBox({
                  type: "info",
                  message: "アプリを終了してもよろしいですか?",
                  detail:
                    "アプリを終了すると保存していない情報は削除されます。",
                  buttons: ["OK", "CANCEL"],
                })
                .then((result) => {
                  if (result.response == 0) {
                    app.quit();
                  }
                });
            }
            focusedWindow.reload();
          }
        },
      },
      {
        label: "閉じる",
        accelerator: "CmdOrCtrl+Q",
        role: "close",
      },
    ],
  },
  {
    label: "View",
    submenu: [
      {
        label: "Reload",
        accelerator: "CmdOrCtrl+R",
        click: (item, focusedWindow) => {
          if (focusedWindow) {
            // on reload, start fresh and close any old
            // open secondary windows
            if (focusedWindow.id === 1) {
              BrowserWindow.getAllWindows().forEach((win) => {
                if (win.id > 1) win.close();
              });
            }
            focusedWindow.reload();
          }
        },
      },
      {
        label: "Toggle Full Screen",
        accelerator: (() => {
          if (process.platform === "darwin") {
            return "Ctrl+Command+F";
          } else {
            return "F11";
          }
        })(),
        click: (item, focusedWindow) => {
          if (focusedWindow) {
            focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
          }
        },
      },
      {
        label: "Toggle Developer Tools",
        accelerator: (() => {
          if (process.platform === "darwin") {
            return "Alt+C";
          } else {
            return "Ctrl+Shift+I";
          }
        })(),
        click: (item, focusedWindow) => {
          if (focusedWindow) {
            focusedWindow.toggleDevTools();
          }
        },
      },
      {
        type: "separator",
      },
      {
        label: "App Menu Demo",
        click: function (item, focusedWindow) {
          if (focusedWindow) {
            const options = {
              type: "info",
              title: "Application Menu Demo",
              buttons: ["Ok"],
              message:
                "This demo is for the Menu section, showing how to create a clickable menu item in the application menu.",
            };
            dialog.showMessageBox(focusedWindow, options, function () {});
          }
        },
      },
    ],
  },
  {
    label: "Window",
    role: "window",
    submenu: [
      {
        label: "Minimize",
        accelerator: "CmdOrCtrl+M",
        role: "minimize",
      },
      {
        label: "Close",
        accelerator: "CmdOrCtrl+W",
        role: "close",
      },
      {
        type: "separator",
      },
      {
        label: "Reopen Window",
        accelerator: "CmdOrCtrl+Shift+T",
        enabled: false,
        key: "reopenMenuItem",
        click: () => {
          app.emit("activate");
        },
      },
    ],
  },
  {
    label: "Help",
    role: "help",
    submenu: [
      {
        label: "abour",
        click: () => {
          shell.openExternal("https://github.com/tkwest3143");
        },
      },
    ],
  },
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
