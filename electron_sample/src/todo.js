"use strict";
var sqlite3 = require("sqlite3").verbose();
var $ = require("jquery");
const dbName_schedule = "schedule.db";

/**
 * イベント
 */
//初期表示
$(window).on("load", function () {
  var db = new sqlite3.Database(dbName_schedule);
  var start_date = new Date();
  var nextdate = start_date.getDate() + 1;
  //データを取得する
  return db.all(
    "SELECT todo_id,title,discription,start_date,end_date FROM todo order by start_date",
    function (err, rows) {
      if (err) {
        console.error(err.message);
        return err;
      } else {
        //結果が取得できない場合は、何もしない
        if (rows.length == 0) {
          $("#todoArea").html("今日の予定はありません");
          return;
        } else {
          var count = 0;
          $("#todoArea").after('<div class="todoItemList">');
          rows.forEach((row) => {
            $("#todoArea").after(
              '<div class="todoitem" id="item_' +
                count +
                '">' +
                '<div class="col-3">タイトル</div>' +
                '<div id="txt_title" class="col-9"></div>' +
                '<div class="col-3">内容</div>' +
                '<div id="txt_discription" class="col-9"></div>' +
                '<input type="hidden" id="todo_id" value="' +
                row.todo_id +
                '"' +
                "</div>"
            );
            $("#txt_title").html(row.title);
            $("#txt_discription").html(row.discription);
            count++;
          });
          $("#todoArea").after("</div>");
          $("#todoItemList").css({ overflow: "scroll" });
          return;
        }
      }
    }
  );
  db.close();
});
//予定を作成するボタンクリック
$("#btnCreateTodo").on("click", function () {
  showModalWindow("file://" + __dirname + "/createTodo.html");
  $(window).on("close");
});
//予定を見るボタンクリック
$("#btnShowTodo").on("click", function () {
  showDialog("作成してもよろしいですか？", "info");
});

//作成ボタンクリック
$("#btnCreate").on("click", function () {
  const todo = new Todo(
    0,
    $("#title").val(),
    $("#discription").val(),
    sqlDateTimeFormat($("#start_date").val(), $("#start_time").val()),
    sqlDateTimeFormat($("#end_date").val(), $("#end_time").val())
  );
  insertTodo(todo);
  window.close();
});

$("btnTodayTodo").on("change", function () {
  var valSelDate = $("btnTodayTodo").val();
  $("btnTodayTodo").val(valSelDate + "の予定");
});

$("#btnSetting").on("click", function () {
  sendTsuchi();
});
/**
 * todo_idの最大値＋1を取得します。
 */
function getMaxTodoId() {
  var db = new sqlite3.Database(dbName_schedule);
  var maxno = 0;
  db.serialize();
  // todo情報のtodo_id最大値を取得し、＋１する
  var strSql = "SELECT max(todo_id) id_max FROM todo";
  return new Promise((resolve, reject) => {
    db.get(strSql, function (err, row) {
      if (err) {
        logger.error(err);
        return reject(err);
      } else {
        if (row.id_max != null) {
          maxno = row.id_max + 1;
        }
        return resolve(maxno);
      }
    });
  });
}
/**
 * todo情報を追加します
 * @param {Todo} todo 登録するtodo情報
 */
function insertTodo(todo) {
  getMaxTodoId().then((result) => {
    var db = new sqlite3.Database(dbName_schedule);
    var maxno = 0;
    maxno = result;
    db.serialize();
    logger.debug(todo);
    todo.todo_id = maxno;
    // データを登録する。
    var stmt = db.prepare(
      "INSERT INTO todo( todo_id,title,discription,start_date,end_date) VALUES (?,?,?,?,?)",
      [
        todo.todo_id,
        todo.title,
        todo.discription,
        todo.start_date,
        todo.end_date,
      ]
    );
    stmt.run();
    stmt.finalize();

    // DBを閉じる。
    db.close();
  });
}

/**
 *todo情報
 */
class Todo {
  constructor(todo_id, title, discription, start_date, end_date) {
    this.todo_id = todo_id;
    this.title = title;
    this.discription = discription;
    this.start_date = start_date;
    this.end_date = end_date;
  }
}
