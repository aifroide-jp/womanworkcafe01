/* グローバルナビ
   index.html / prompts.html の先頭に差し込む。
   進行順（はじめに → ペアワーク → おわりに）で並べる。 */

const NAV_ITEMS = [
  { id:"top", label:"トップ",     href:"index.html" },
  { id:"1",   label:"はじめに",   href:"index.html#/1", step:"1" },
  { id:"3",   label:"ペアワーク", href:"index.html#/3", step:"2" },
  { id:"2",   label:"おわりに",   href:"index.html#/2", step:"3" },
  { id:"prompts", label:"プロンプト集", href:"prompts.html" },
  { id:"qr", label:"QR", href:"qr.html" }
];

function currentNavId(){
  if(/prompts\.html$/.test(location.pathname)) return "prompts";
  if(/qr\.html$/.test(location.pathname)) return "qr";
  const m = location.hash.match(/^#\/([123])/);
  return m ? m[1] : "top";
}

function renderNav(){
  const cur = currentNavId();
  let nav = document.querySelector(".gnav");
  if(!nav){
    nav = document.createElement("nav");
    nav.className = "gnav";
    nav.setAttribute("aria-label", "ページ切り替え");
    const main = document.querySelector("main");
    main.parentNode.insertBefore(nav, main);
  }
  nav.innerHTML = `<div class="gnav-in">` + NAV_ITEMS.map(n => `
    <a href="${n.href}" class="${n.id === cur ? "is-current" : ""}"${n.id === cur ? ' aria-current="page"' : ""}>
      ${n.step ? `<span class="gnav-step">${n.step}</span>` : ""}${n.label}
    </a>`).join("") + `</div>`;
  const c = nav.querySelector(".is-current");
  if(c) c.scrollIntoView({ block:"nearest", inline:"center" });
}

document.addEventListener("DOMContentLoaded", renderNav);
window.addEventListener("hashchange", renderNav);
