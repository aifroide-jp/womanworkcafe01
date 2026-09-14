/**
 * わたしのペースではじめる生成AI ワークシート — 保存用
 * スプレッドシートに紐づくApps Scriptとして貼り付けて使います。
 */

var CLEAR_PIN = "ここを自分で決めた文字列に変える";  // 本番前に中身を消すときの合言葉。公開リポジトリに書かないこと
var LIMIT = 80;           // 壁に出す最大枚数

function doPost(e) {
  try {
    var d = JSON.parse(e.postData.contents);
    var name = String(d.screen || "s1").replace(/[^a-z0-9]/gi, "");
    var sh = sheetOf(name);
    var lock = LockService.getScriptLock();
    lock.waitLock(8000);
    sh.appendRow([
      new Date(),
      String(d.nickname || "").slice(0, 20),
      d.share === false ? "非公開" : "公開",
      String(d.title || "").slice(0, 120),
      String(d.body || "").slice(0, 200),
      JSON.stringify(d.answers || {})
    ]);
    lock.releaseLock();
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function doGet(e) {
  var p = e.parameter || {};
  if (p.action === "clear" && p.pin === CLEAR_PIN) {
    var s = sheetOf(String(p.screen || "s1").replace(/[^a-z0-9]/gi, ""));
    if (s.getLastRow() > 1) s.deleteRows(2, s.getLastRow() - 1);
    return json({ ok: true, cleared: true });
  }
  if (p.action !== "list") return json({ ok: true, hello: "worksheet" });

  var sh = sheetOf(String(p.screen || "s1").replace(/[^a-z0-9]/gi, ""));
  var last = sh.getLastRow();
  if (last < 2) return json({ ok: true, items: [] });

  var n = Math.min(LIMIT, last - 1);
  var rows = sh.getRange(last - n + 1, 1, n, 6).getValues();
  var items = [];
  for (var i = rows.length - 1; i >= 0; i--) {
    var r = rows[i];
    if (r[2] === "非公開") {
      items.push({ nickname: r[1], title: r[3], body: "" });
    } else {
      items.push({ nickname: r[1], title: r[3], body: r[4] });
    }
  }
  return json({ ok: true, items: items });
}

function sheetOf(name) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.appendRow(["時刻", "ニックネーム", "公開", "見出し", "本文", "回答"]);
  }
  return sh;
}

function json(o) {
  return ContentService
    .createTextOutput(JSON.stringify(o))
    .setMimeType(ContentService.MimeType.JSON);
}
