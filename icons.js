/* 共有ピクトグラム（線画SVG）
   index.html / wall.html の両方で読み込む。 */

const SVG_OPEN = '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">';
const ICONS = {
  // えんぴつ
  write:  SVG_OPEN + '<path d="M14 50l4-14L42 12a5 5 0 0 1 7 7L25 43l-14 4z"/><path d="M36 18l7 7"/><path d="M12 56h40"/></svg>',
  // スマホとハート
  sns:    SVG_OPEN + '<rect x="18" y="8" width="28" height="48" rx="5"/><path d="M28 13h8"/><path d="M32 42c-6-4-9-8-9-12a4.5 4.5 0 0 1 9-1 4.5 4.5 0 0 1 9 1c0 4-3 8-9 12z"/></svg>',
  // お鍋と湯気
  life:   SVG_OPEN + '<path d="M12 30h40v10a14 14 0 0 1-14 14H26a14 14 0 0 1-14-14z"/><path d="M8 30h48"/><path d="M26 22c-2-3 2-5 0-8"/><path d="M38 22c-2-3 2-5 0-8"/><path d="M12 36H6M52 36h6"/></svg>',
  // カレンダー
  plan:   SVG_OPEN + '<rect x="10" y="14" width="44" height="40" rx="5"/><path d="M10 26h44"/><path d="M22 8v10M42 8v10"/><path d="M20 36h6M29 36h6M38 36h6M20 45h6M29 45h6"/></svg>',
  // 虫めがね
  search: SVG_OPEN + '<circle cx="28" cy="28" r="15"/><path d="M39 39l14 14"/><path d="M21 27a7 7 0 0 1 6-6"/></svg>',
  // ふきだし2つ
  talk:   SVG_OPEN + '<path d="M11 10h26a5 5 0 0 1 5 5v11a5 5 0 0 1-5 5H23l-8 6v-6h-4a5 5 0 0 1-5-5V15a5 5 0 0 1 5-5z"/><path d="M46 24h7a5 5 0 0 1 5 5v11a5 5 0 0 1-5 5h-3v6l-8-6H30a5 5 0 0 1-5-5v-3"/></svg>',
  // 書類の山
  paper:  SVG_OPEN + '<path d="M18 10h20l10 10v32a3 3 0 0 1-3 3H18a3 3 0 0 1-3-3V13a3 3 0 0 1 3-3z"/><path d="M38 10v10h10"/><path d="M23 30h18M23 38h18M23 46h12"/></svg>',
  // きらめき
  none:   SVG_OPEN + '<path d="M30 8c2 12 8 18 20 20-12 2-18 8-20 20-2-12-8-18-20-20 12-2 18-8 20-20z"/><path d="M50 40c1 5 3 7 8 8-5 1-7 3-8 8-1-5-3-7-8-8 5-1 7-3 8-8z"/></svg>',
  // ハート
  heart:  SVG_OPEN + '<path d="M32 54C20 45 8 36 8 24a11 11 0 0 1 24-4 11 11 0 0 1 24 4c0 12-12 21-24 30z"/></svg>',
  // マイク
  mic:    SVG_OPEN + '<rect x="24" y="8" width="16" height="28" rx="8"/><path d="M14 30a18 18 0 0 0 36 0"/><path d="M32 48v8M22 56h20"/></svg>',
  // プレゼント
  gift:   SVG_OPEN + '<rect x="10" y="26" width="44" height="28" rx="3"/><path d="M8 18h48v8H8z"/><path d="M32 18v36"/><path d="M32 18c-4-8-10-10-14-6s2 6 14 6z"/><path d="M32 18c4-8 10-10 14-6s-2 6-14 6z"/></svg>'
};

/* 壁や結果カードで、見出し文字列からアイコンを引く */
const TITLE_ICON = {
  // 画面1：タイプ名
  "ことばを任せる人":"write", "発信を任せる人":"sns", "暮らしを軽くする人":"life",
  "段取りを任せる人":"plan", "調べものを任せる人":"search", "伝え方を磨く人":"talk",
  "紙の山をほどく人":"paper", "これから見つける人":"none",
  // 画面2：明日使うもの
  "褒めてもらう":"heart", "逆インタビューで強みを出す":"mic", "SNS・発信の文章":"sns",
  "献立・暮らしのこと":"life", "メモや書類の整理":"paper", "人にキャッチコピーを贈る":"gift",
  "とにかく一度、話しかける":"talk"
};
