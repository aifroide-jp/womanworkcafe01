/* わたしのペースではじめる生成AI ワークシート
   3画面を hash で切り替える。#/1 #/2 #/3 */

const EVENT = { date: "2026.9.15", place: "COMPASS小倉", host: "ウーマンワークカフェ北九州" };

/* ---------- 画面1：AIに、まず何を頼んでみたい？ ---------- */

const TYPES = {
  write:  { name:"ことばを引き出す人", line:"下書きはAIに。仕上げは、あなたの言葉で。",
            scene:"このあとの「逆インタビュー」で、自分の言葉が引き出されます" },
  sns:    { name:"発信を任せる人", line:"1週間分の投稿を、まとめて用意できます。",
            scene:"後半のデモ「Instagram投稿をまとめて作る」を見てください" },
  life:   { name:"暮らしを軽くする人", line:"冷蔵庫の写真1枚から、今夜の献立が決まります。",
            scene:"終盤の「暮らしでも、こんなふうに使えます」が本番です" },
  plan:   { name:"段取りを任せる人", line:"ばらばらの予定が、1枚に並びます。",
            scene:"「手書きメモ → 整理」のデモが、そのまま使えます" },
  search: { name:"調べものを任せる人", line:"探す時間が、選ぶ時間に変わります。",
            scene:"3原則の③「最終チェックは自分」が、あなたには一番大事です" },
  talk:   { name:"伝え方を磨く人", line:"同じ話を、相手に合わせて言い直せます。",
            scene:"「もっとこうして」と言い直す練習が効きます" },
  paper:  { name:"紙の山をほどく人", line:"写真を撮れば、そこから整理が始まります。",
            scene:"「手書きメモ → 整理」のデモを見てください" },
  none:   { name:"これから見つける人", line:"まだ決めなくて大丈夫。今日ひとつ見つかります。",
            scene:"まずは「私の良いところを見つけて褒めてください」から" }
};

const MOODS = {
  "やってみたい":"今日は、遠慮なく頼んでみてください。",
  "こわい":"こわいと思える人は、最終チェックができる人です。",
  "よくわからない":"わからないまま触って大丈夫。今日はそのための時間です。",
  "もう使っている":"今日は「言い直す」を持ち帰ってください。",
  "やらないとマズい":"焦らなくて大丈夫。今日ここに来た時点で、最初の一歩は済んでいます。",
  "新しい親友":"親友なら、遠慮はいりません。思ったまま話しかけてください。",
  "パートナー":"頼れる相方です。任せるところと、自分で決めるところを分けていきましょう。",
  "なくてはならない":"その感覚があれば、今日は使い方の幅を広げる日です。"
};

const SCREENS = {
  "1": {
    key:"s1",
    eyebrow:"はじめに",
    title:"AIに、まず何を頼んでみたい？",
    lede:"3つ選ぶだけです。今日いちばん役に立つ場面を、その場でお返しします。",
    cta:"わたしの一枚をつくる",
    ctaNote:"すぐに表示されます",
    fields:[
      { id:"stand", type:"single", q:"いまの自分に近いのは？", note:"ひとつ選んでください",
        options:["働いている","子育てと両立中","これから働きたい","起業を考えている","暮らしを楽にしたい"] },
      { id:"tasks", type:"multi", q:"「面倒だな」と思っていることは？", note:"いくつでも",
        options:["文章を書く・考える","SNSの投稿","献立・買いもの","予定の整理","調べもの","人に説明する","片づけ・書類"] },
      { id:"mood", type:"single", q:"AIに、いま一番ある気持ちは？", note:"ひとつ選んでください",
        options:["やってみたい","こわい","よくわからない","もう使っている","やらないとマズい","新しい親友","パートナー","なくてはならない"] }
    ],
    required:["stand","tasks","mood"],
    build(a){
      const map = {
        "文章を書く・考える":"write","SNSの投稿":"sns","献立・買いもの":"life",
        "予定の整理":"plan","調べもの":"search","人に説明する":"talk","片づけ・書類":"paper"
      };
      const first = (a.tasks||[])[0];
      const key = map[first] || "none";
      const t = TYPES[key];
      return {
        icon:ICONS[key],
        kicker:"あなたは、きっと",
        title:t.name,
        line:t.line,
        quote:MOODS[a.mood] || "",
        scene:"今日の見どころ：" + t.scene,
        badges:[a.stand, ...(a.tasks||[]).slice(0,3)],
        wallTitle:t.name,
        wallBody:a.stand
      };
    }
  },

  "2": {
    key:"s2",
    eyebrow:"おわりに",
    title:"明日、これに使う",
    lede:"今日いちばん使えそうだったものを、ひとつだけ決めます。決めたら、班の中で宣言してください。",
    cta:"宣言を一枚にする",
    ctaNote:"できたらスクリーンショットで持ち帰ってください",
    fields:[
      { id:"use", type:"single", q:"今日いちばん使えそうだったのは？", note:"ひとつ選んでください",
        options:["褒めてもらう","逆インタビューで強みを出す","SNS・発信の文章","献立・暮らしのこと","メモや書類の整理","人にキャッチコピーを贈る","とにかく一度、話しかける"] },
      { id:"when", type:"single", q:"いつ使う？", note:"ひとつ選んでください",
        options:["今夜","明日","今週のうちに"] },
      { id:"vow", type:"text", q:"ひとこと宣言", note:"短くてOK。書かなくても進めます",
        placeholder:"例）明日の朝、インスタの文をAIに下書きしてもらう" },
      { id:"trait", type:"single", q:"あなたの持ち味は？", note:"ひとつ選んでください",
        options:["好奇心","粘り強さ","愛嬌","段取り","人に聞ける","やさしさ"] }
    ],
    required:["use","when","trait"],
    share:{ id:"share", label:"この宣言を、前のスクリーンに出してもよい", note:"外すと、自分の画面だけに表示します" },
    build(a){
      return {
        icon:ICONS[TITLE_ICON[a.use]] || ICONS.none,
        kicker:a.when + "、やること",
        title:a.use,
        line:"「" + a.trait + "」を持って、ひとつだけ。",
        quote:a.vow ? "「" + a.vow + "」" : "",
        scene:"うまくいかなかったら、もう一度「もっとこうして」と頼めば大丈夫です。",
        badges:[a.when, a.trait],
        wallTitle:a.use,
        wallBody:(a.vow ? a.vow + "　／" : "") + a.when
      };
    }
  },

  "3": {
    key:"s3",
    eyebrow:"ペアワーク",
    title:"贈るコピー",
    lede:"3分ずつ話を聞いて、相手のキャッチコピーをつくります。メモは箇条書きで大丈夫です。",
    cta:"コピーを3案つくる",
    ctaNote:"気に入らなければ、何度でもつくり直せます",
    fields:[
      { id:"to", type:"text", q:"相手のニックネーム", note:"本名は入れないでください",
        placeholder:"例）ちひろさん" },
      { id:"want", type:"text", q:"その人が、やりたいこと", note:"短い言葉で。「〜したい」は書かなくて大丈夫",
        placeholder:"例）子ども向けのお菓子教室" },
      { id:"likes", type:"multi", q:"好き・得意だと聞いたこと", note:"いくつでも",
        options:["つくること","教えること","話を聞くこと","手を動かすこと","人を集めること","調べること","続けること","もてなすこと"] },
      { id:"good", type:"text", q:"話して「いいな」と思ったところ", note:"ひとことで",
        placeholder:"例）話しているときの顔がいちばん楽しそうだった" }
    ],
    required:["to","want"],
    build(a){
      const l = a.likes || [];
      const l1 = l[0] || "好きなこと";
      const l2 = l[1] || l[0] || "続けること";
      const want = (a.want || "").replace(/[。\s]+$/, "").replace(/を[^、。]{0,6}たい$/, "");
      const copies = [
        want + "は、" + l1 + "から始まる。",
        (l.length > 1 ? l1 + "と" + l2 + "が出会う場所、" + want + "。"
                      : want + "のとなりに、いつも" + l1 + "がある。"),
        (a.good ? a.good.replace(/[。\s]+$/, "") + "。それが、" + a.to + "の始まりです。"
                : a.to + "の" + l1 + "が、誰かの一日を変える。")
      ];
      return {
        icon:ICONS.gift,
        kicker:a.to + " へ",
        title:copies[0],
        copies:copies,
        badges:l.slice(0,3),
        prompt:"私の友人は「" + want + "」をしたい人です。話を聞いたメモを渡します。"
             + "この人のキャッチコピーを3つ作ってください。やわらかい言葉で、専門用語は使わないでください。\n"
             + "メモ：\n・やりたいこと：" + want
             + (l.length ? "\n・好き、得意：" + l.join("、") : "")
             + (a.good ? "\n・話して感じたこと：" + a.good : ""),
        wallTitle:copies[0],
        wallBody:a.to + " へ"
      };
    }
  }
};

/* ---------- 状態 ---------- */

const app = document.getElementById("app");
let screen = null, answers = {}, nickname = "", share = true, result = null;

function route(){
  const m = location.hash.match(/^#\/([123])/);
  if(!m){ renderMenu(); return; }
  screen = SCREENS[m[1]];
  answers = {}; nickname = ""; share = true; result = null;
  render();
  window.scrollTo(0,0);
}

function renderMenu(){
  const steps = [
    { n:"1", href:"#/1", icon:ICONS.none,  title:"AIに、まず何を頼んでみたい？", when:"はじめに",   note:"3つ選ぶと、今日いちばん役に立つ場面が出ます" },
    { n:"2", href:"#/3", icon:ICONS.gift,  title:"贈るコピー",                   when:"ペアワーク", note:"相手の話を聞いて、キャッチコピーを3案つくります" },
    { n:"3", href:"#/2", icon:ICONS.plan,  title:"明日、これに使う",             when:"おわりに",   note:"ひとつだけ決めて、宣言を一枚にします" }
  ];
  app.innerHTML = `
    <section class="hero">
      <p class="eyebrow">${EVENT.date}　${EVENT.place}</p>
      <h1>わたしのペースで<br>はじめる生成AI</h1>
      <p class="lede">今日のワークシートです。講師の合図で、その回のものを開いてください。上のメニューからも切り替えられます。</p>
    </section>

    <nav class="steps" aria-label="ワークシート">
      ${steps.map(s => `
        <a class="step" href="${s.href}">
          <div class="step-icon">${s.icon}</div>
          <div class="step-body">
            <p class="step-when"><span class="step-num">${s.n}</span>${s.when}</p>
            <p class="step-title">${s.title}</p>
            <p class="step-note">${s.note}</p>
          </div>
        </a>`).join("")}
      <a class="step step-sub" href="prompts.html">
        <div class="step-icon">${ICONS.write}</div>
        <div class="step-body">
          <p class="step-when">いつでも</p>
          <p class="step-title">今日のプロンプト集</p>
          <p class="step-note">AIへの頼み方をまとめています。持ち帰り用です</p>
        </div>
      </a>
    </nav>

    <p class="warn">本名・住所・電話番号・お客様の情報は入力しないでください。ニックネームで大丈夫です。</p>
    ${footHTML()}
    <p class="staff">講師用：<a href="wall.html?s=1">冒頭の集計</a>・<a href="wall.html?s=3">コピーの壁</a>・<a href="wall.html?s=2">宣言の壁</a></p>`;
}

function footHTML(){
  return `<p class="foot">${EVENT.date}　${EVENT.place}<br>主催　${EVENT.host}<br>
    入力した内容は、この会場での共有だけに使います。本名・住所・電話番号・お客様の情報は入力しないでください。</p>`;
}

function render(){
  const s = screen;
  app.innerHTML = `
    <p class="eyebrow">${s.eyebrow}</p>
    <h1>${s.title}</h1>
    <p class="lede">${s.lede}</p>
    <p class="warn">本名・住所・電話番号・お客様の情報は入力しないでください。ニックネームで大丈夫です。</p>

    <div class="q">
      <div class="q-head"><p class="q-text">ニックネーム</p></div>
      <p class="q-note">前のスクリーンに表示されます</p>
      <input type="text" id="nick" maxlength="12" placeholder="例）ちひろ、Yuki、みどりさん" autocomplete="off">
    </div>

    ${s.fields.map(fieldHTML).join("")}
    ${s.share ? shareHTML(s.share) : ""}

    <button class="go" id="go">${s.cta}</button>
    <p class="go-note">${s.ctaNote}</p>
    <div class="result" id="result"></div>
    ${footHTML()}`;

  document.getElementById("nick").addEventListener("input", e => { nickname = e.target.value.trim(); });
  app.querySelectorAll(".chip").forEach(c => c.addEventListener("click", onChip));
  app.querySelectorAll("[data-text]").forEach(t => t.addEventListener("input", e => {
    answers[e.target.dataset.text] = e.target.value.trim();
  }));
  const sw = document.getElementById("share");
  if(sw) sw.addEventListener("change", e => { share = e.target.checked; });
  document.getElementById("go").addEventListener("click", submit);
}

function fieldHTML(f, i){
  const head = `<div class="q-head"><span class="q-num">${i+1}</span><p class="q-text">${f.q}</p></div>
                <p class="q-note">${f.note}</p>`;
  if(f.type === "text"){
    const tag = f.id === "vow" || f.id === "good" || f.id === "want"
      ? `<textarea data-text="${f.id}" maxlength="80" placeholder="${f.placeholder}"></textarea>`
      : `<input type="text" data-text="${f.id}" maxlength="20" placeholder="${f.placeholder}" autocomplete="off">`;
    return `<div class="q">${head}${tag}</div>`;
  }
  const chips = f.options.map(o =>
    `<button type="button" class="chip" aria-pressed="false" data-f="${f.id}" data-m="${f.type}" data-v="${o}">${o}</button>`
  ).join("");
  return `<div class="q">${head}<div class="chips">${chips}</div></div>`;
}

function shareHTML(s){
  return `<label class="opt-share">
    <input type="checkbox" id="share" checked>
    <span>${s.label}<br><small>${s.note}</small></span>
  </label>`;
}

function onChip(e){
  const b = e.currentTarget, f = b.dataset.f, v = b.dataset.v;
  if(b.dataset.m === "single"){
    app.querySelectorAll(`.chip[data-f="${f}"]`).forEach(x => x.setAttribute("aria-pressed","false"));
    b.setAttribute("aria-pressed","true");
    answers[f] = v;
  } else {
    const on = b.getAttribute("aria-pressed") === "true";
    b.setAttribute("aria-pressed", on ? "false" : "true");
    const cur = answers[f] || [];
    answers[f] = on ? cur.filter(x => x !== v) : cur.concat([v]);
  }
}

/* ---------- 送信・表示 ---------- */

function submit(){
  const miss = screen.required.filter(k => {
    const v = answers[k];
    return !v || (Array.isArray(v) && v.length === 0);
  });
  if(miss.length){
    toast("まだ選んでいないところがあります");
    const el = app.querySelector(`[data-f="${miss[0]}"],[data-text="${miss[0]}"]`);
    if(el) el.scrollIntoView({block:"center"});
    return;
  }
  if(!nickname) nickname = "名なしさん";
  result = screen.build(answers);
  showResult();
  save();
}

function showResult(){
  const r = result, box = document.getElementById("result");
  const badges = (r.badges || []).filter(Boolean)
    .map((b,i) => `<span class="badge${i===0?" badge-gold":""}">${esc(b)}</span>`).join("");

  let inner;
  if(r.copies){
    inner = `
      <div class="poster-body" style="text-align:left">
        ${r.icon ? `<div class="poster-icon poster-icon-s">${r.icon}</div>` : ""}
        <p class="poster-kicker">${esc(r.kicker)}</p>
        <ul class="copy-list">${r.copies.map(c => `<li>${esc(c)}</li>`).join("")}</ul>
        <div class="badges">${badges}</div>
      </div>`;
  } else {
    inner = `
      <div class="poster-body">
        ${r.icon ? `<div class="poster-icon">${r.icon}</div>` : ""}
        <p class="poster-kicker">${esc(r.kicker)}</p>
        <p class="poster-title">${esc(r.title)}</p>
        <p class="poster-line">${esc(r.line)}</p>
        ${r.quote ? `<p class="poster-quote">${esc(r.quote)}</p>` : ""}
        <div class="badges">${badges}</div>
        ${r.scene ? `<p class="poster-scene">${esc(r.scene)}</p>` : ""}
      </div>`;
  }

  box.innerHTML = `
    <div class="poster">
      <div class="poster-band"><b>${esc(nickname)}</b><span>${EVENT.date}　${EVENT.host}</span></div>
      ${inner}
    </div>
    ${r.prompt ? `
      <div class="after">
        <h2>ここまでで完成です</h2>
        <p>もっと作ってほしい人だけ、下のボタンをどうぞ。頼み方の文がコピーされるので、いつものAIに貼り付けてください。</p>
        <button class="sub" id="copyPrompt">AIへの頼み方をコピーする</button>
      </div>` : ""}
    <button class="sub" id="again">やり直す</button>
    <a class="sub sub-link" href="wall.html?s=${screen.key.slice(1)}">みんなの投稿を見る</a>
    <div id="netnote"></div>`;

  const cp = document.getElementById("copyPrompt");
  if(cp) cp.addEventListener("click", () => copyText(r.prompt));
  document.getElementById("again").addEventListener("click", () => { route(); });
  box.scrollIntoView({behavior:"smooth", block:"start"});
}

function copyText(t){
  const done = () => toast("コピーしました。AIに貼り付けてください");
  if(navigator.clipboard && window.isSecureContext){
    navigator.clipboard.writeText(t).then(done, fallback);
  } else fallback();
  function fallback(){
    const ta = document.createElement("textarea");
    ta.value = t; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    try{ document.execCommand("copy"); done(); }
    catch(e){ toast("コピーできませんでした"); }
    document.body.removeChild(ta);
  }
}

function save(){
  const body = {
    screen: screen.key,
    nickname: nickname,
    share: screen.share ? share : true,
    title: result.wallTitle,
    body: result.wallBody || "",
    answers: answers
  };
  const note = () => {
    const n = document.getElementById("netnote");
    if(n) n.innerHTML = `<p class="notice">いまは通信が届いていないので、前のスクリーンには出ません。この画面はそのまま使えます。</p>`;
  };
  if(!window.API_URL){ note(); return; }
  fetch(window.API_URL, {
    method:"POST",
    headers:{"Content-Type":"text/plain;charset=utf-8"},
    body: JSON.stringify(body)
  }).then(r => r.json()).then(j => { if(!j || !j.ok) note(); }).catch(note);
}

function toast(msg){
  const t = document.createElement("div");
  t.className = "toast"; t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2600);
}

function esc(s){
  return String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}

window.addEventListener("hashchange", route);
route();
