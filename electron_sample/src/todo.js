var sqlite3 = require("sqlite3").verbose();
var $ = require("jquery");

function initTodo() {
  const todoInfo = selectTodo(new Date());
}

/**
 * todo情報を取得します。
 * @param {Date} start_date 予定開始日
 */
function selectTodo(start_date) {
  const result = [];
  var db = new sqlite3.Database("todo.db");
  // テーブルを作成する。
  db.run(
    "CREATE TABLE IF NOT EXISTS todo (title TEXT, discription TEXT, start_date DATETIME, end_date DATETIME)"
  );

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
          console.log(rows);
          // DBを閉じる。
          db.close();
          return new Todo();
        } else {
          rows.forEach((row) => {
            result.push(
              new Todo(
                row["title"],
                row["discription"],
                row["start_date"],
                row["end_date"]
              )
            );
            console.log(result);
            // DBを閉じる。
            db.close();
            return result;
          });
        }
      }
    }
  );
}

/**
 * todo情報を追加します
 * @param {Todo} todo 登録するtodo情報
 */
function insertTodo(todo) {
  var db = new sqlite3.Database("todo.db");
  db.serialize(function () {
    // テーブルを作成する。
    db.run(
      "CREATE TABLE IF NOT EXISTS todo (title TEXT, discription TEXT, start_date DATETIME, end_date DATETIME)"
    );

    console.log(todo.title);
    // データを登録する。
    var stmt = db.prepare(
      "INSERT INTO todo(title,discription,start_date,end_date) VALUES (?,?,?,?)",
      [
        todo.title,
        todo.discription,
        getStringFromDate(todo.start_date, "YYYY-MM-DD hh:mm:dd"),
        getStringFromDate(todo.end_date, "YYYY-MM-DD hh:mm:dd"),
      ]
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

/**
 * イベント
 */
//初期表示
$(window).on("load", function () {
  const todoInfo = selectTodo(new Date());
  console.log(todoInfo);
  if (todoInfo != undefined) {
    todoInfo.forEach((element) => {
      console.log(element);
      $("#todoArea").html("<p>" + element.title + "</p>" + element.discription);
    });
  } else {
    $("#todoArea").html("<p>予定はありません</p>");
  }
});
//予定を作成するボタンクリック
$("#btnCreateTodo").on("click", function () {
  showModalWindow("file://" + __dirname + "/createTodo.html");
});
//予定を見るボタンクリック
$("#btnShowTodo").on("click", function () {
  showDialog("作成してもよろしいですか？", "info");
});
//予定ボタンクリック
$("#btnTodayTodo").on("click", function () {
  showDialog("作成してもよろしいですか？", "info");
});
//作成ボタンクリック
$("#btnCreate").on("click", function () {
  const todo = new Todo(
    $("#title").val(),
    $("#discription").val(),
    new Date(),
    new Date()
  );
  console.log(todo);
  insertTodo(todo);
});
