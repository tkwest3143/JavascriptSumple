var sqlite3 = require("sqlite3").verbose();
var $ = require("jquery");

/**
 * イベント
 */
//初期表示
$(window).on("load", function () {
  var db = new sqlite3.Database("todo.db");
  var start_date = new Date();
  var nextdate = start_date.getDate() + 1;
  //データを取得する
  return db.all(
    "SELECT title,discription,start_date,end_date FROM todo order by start_date",
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
          rows.forEach((row) => {
            $("#todoArea").after(
              '<div id="todoitem">' +
                '<div class="col-3">タイトル</div>' +
                '<div id="txt_title" class="col-9"></div>' +
                '<div class="col-3">内容</div>' +
                '<div id="txt_discription" class="col-9"></div></div>'
            );
            $("#txt_title").html(row.title);
            $("#txt_discription").html(row.discription);
            console.log(row);
          });
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
    $("#title").val(),
    $("#discription").val(),
    $("#start_date").val() + $("#start_time").val(),
    $("#end_date").val() + $("#end_time").val()
  );
  insertTodo(todo);
  window.close();
});
/**
 * todo情報を追加します
 * @param {Todo} todo 登録するtodo情報
 */
function insertTodo(todo) {
  var db = new sqlite3.Database("todo.db");
  db.serialize(function () {
    console.log(todo.title);
    // データを登録する。
    var stmt = db.prepare(
      "INSERT INTO todo(title,discription,start_date,end_date) VALUES (?,?,?,?)",
      [todo.title, todo.discription, todo.start_date, todo.end_date]
    );
    stmt.run();
    stmt.finalize();
  });
  // DBを閉じる。
  db.close();
}

/**
 *todo情報
 */
class Todo {
  constructor(title, discription, start_date, end_date) {
    this.title = title;
    this.discription = discription;
    this.start_date = start_date;
    this.end_date = end_date;
  }
}
