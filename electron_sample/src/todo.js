var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("todo.sqlite");
/**
 * todo情報を取得します。
 * @param {String} start_date 予定開始日
 * @param {String} end_date 予定終了日
 */
function selectTodo(start_date, end_date) {
  db.serialize(function () {
    // テーブルを作成する。
    db.run(
      "CREATE TABLE IF NOT EXISTS todo (title TEXT, discription TEXT, start_date TEXT, end_date"
    );
    const result = [];
    //データを取得する
    db.get(
      "SELECT title,discription,start_date,end_date FROM todo where ${start_date} between CURRENT_DATE and date('now', '1 days')",
      function (err, row) {
        if (err) {
          return;
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
          });
          return resolve(result);
        }
      }
    );
  });
  // DBを閉じる。
  db.close();
}

/**
 * todo情報を追加します
 * @param {Todo} todo 登録するtodo情報
 */
function insertTodo(todo) {
  db.serialize(function () {
    // テーブルを作成する。
    db.run(
      "CREATE TABLE IF NOT EXISTS todo (title TEXT, discription TEXT, start_date TEXT, end_date"
    );
    // データを登録する。
    var stmt = db.prepare("INSERT INTO todo VALUES (?,?,?,?)");
    stmt.run(todo.title, todo.discription, todo.start_date, todo.end_date);
    stmt.finalize();
  });
  // DBを閉じる。
  db.close();
}
export class Todo {
  constructor(title, discription, start_date, end_date) {
    this.title = title;
    this.discription = discription;
    this.start_date = start_date;
    this.end_date = end_date;
  }
}
