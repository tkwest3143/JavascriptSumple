"use strict";
var $ = require("jquery");

// 設定ボタンクリック
$("#btnSetting").on("click", function () {
    $("#mainView").load("file://" + __dirname + "/setting.html");
    sendTsuchi();
  });

  //予定を作成するボタンクリック
$("#btnCreateTodo").on("click", function () {
    showModalWindow("file://" + __dirname + "/createTodo.html");
    $(window).on("close");
  });