"use client";

import { useMemo, useState } from "react";

type AppItem = { id: string; name: string; category: string; tag: string; url: string; description: string };

const categories = ["全部", "教學機器人", "領域互動", "自主探究", "謎語挑戰"];

const appIcons: Record<string, string> = {
  "01":"📝", "02":"📊", "03":"🗺️", "04":"🧩", "05":"💬", "06":"🔎", "07":"❓",
  "A01":"🦸", "A02":"🏙️",
  "B01":"🛍️", "B02":"🏺", "B03":"🦅", "B04":"🛡️", "B05":"🌍", "B06":"🍚", "B07":"💰", "B08":"🧞",
  "C01":"🚨", "C02":"🏭", "C03":"🌱", "C04":"🛒"
};

const apps: AppItem[] = [
  { id:"01", name:"出題機器人", category:"教學機器人", tag:"評量設計", url:"https://gemini.google.com/gem/1w0_-8h8HptM68y9i108R2B04mmjqDCeK?usp=sharing", description:"協助教師快速生成課程評量題目與素養導向試題。" },
  { id:"02", name:"試卷分析機器人", category:"教學機器人", tag:"學習診斷", url:"https://gemini.google.com/gem/1Wbahwleki67fmHIIyX_hCy-qEcHe-17V?usp=sharing", description:"整理試卷表現，協助教師掌握學生學習狀況。" },
  { id:"03", name:"高年級教案設計機器人", category:"教學機器人", tag:"教案設計", url:"https://gemini.google.com/gem/8eaf707b81a4/b59957b970007573?usp=sharing", description:"支援國小高年級社會領域課程與活動設計。" },
  { id:"04", name:"中年級教案設計機器人", category:"教學機器人", tag:"教案設計", url:"https://gemini.google.com/gem/1RHUJpQw9z6yV6tS4HrKq9s8s-SyvamXH?usp=sharing", description:"支援國小中年級社會領域課程與活動設計。" },
  { id:"05", name:"ORID 焦點討論法機器人", category:"教學機器人", tag:"討論引導", url:"https://gemini.google.com/gem/1RMOcO0DOio09X4FzjXg7i0ZIXJlF9P0y?usp=sharing", description:"依 ORID 架構設計由觀察到決策的討論提問。" },
  { id:"06", name:"概念謎語生成機器人", category:"教學機器人", tag:"概念學習", url:"https://gemini.google.com/gem/1Fn0onPPBx3WbkaWicYEw5ekrRMkW_i5Z?usp=sharing", description:"將課程概念轉化為有趣的謎語與課堂挑戰。" },
  { id:"07", name:"社會領域提問設計機器人", category:"教學機器人", tag:"探究提問", url:"https://gemini.google.com/gem/1F7VR1kMpXaEnmpucaiVPDZehDpLcy9NZ?usp=sharing", description:"設計具層次的社會領域探究問題與追問。" },
  { id:"A01", name:"性別平等小超人", category:"領域互動", tag:"性別平等", url:"https://ai.studio/apps/drive/1mnbRcOHw328Kb3273LoNjxHRpaoxfk4I", description:"透過生活情境辨識性別議題，練習判斷與行動。" },
  { id:"A02", name:"城市規劃大師", category:"領域互動", tag:"公共參與", url:"https://aistudio.google.com/apps/drive/1n66X060RDJHVPifc3pBzKF84YFpRC5Ko?showPreview=true&showAssistant=true&fullscreenApplet=true", description:"在多元需求中思考城市發展、公共選擇與規劃。" },
  { id:"B01", name:"小小聰明購物家", category:"自主探究", tag:"消費素養", url:"https://gemini.google.com/share/9fcdd691c96a", description:"從購物情境建立選擇、比較與負責消費能力。" },
  { id:"B02", name:"文化探險記", category:"自主探究", tag:"文化學習", url:"https://gemini.google.com/share/b9a3769b15a0", description:"在探險任務中認識文化特色與多元觀點。" },
  { id:"B03", name:"老鷹紅豆生態網", category:"自主探究", tag:"生態環境", url:"https://gemini.google.com/share/e9042058ffa7", description:"探索物種、生產與環境之間的生態關係。" },
  { id:"B04", name:"人權守護者基地", category:"自主探究", tag:"人權教育", url:"https://gemini.google.com/share/9ca11b807954", description:"從案例與任務理解權利、責任及尊重。" },
  { id:"B05", name:"全球環境偵探社", category:"自主探究", tag:"全球議題", url:"https://gemini.google.com/share/7c5cbf6893e0", description:"蒐集線索、分析證據，探究全球環境問題。" },
  { id:"B06", name:"島嶼的滋味", category:"自主探究", tag:"地方文化", url:"https://gemini.google.com/share/ac5cff9cb8c5", description:"從飲食出發探索島嶼生活、產業與文化。" },
  { id:"B07", name:"理財大挑戰", category:"自主探究", tag:"金融素養", url:"https://gemini.google.com/share/e3a4f1c5d4af", description:"在任務選擇中練習預算、風險與理財觀念。" },
  { id:"B08", name:"神燈精靈的創業指導", category:"自主探究", tag:"創業思考", url:"https://gemini.google.com/share/4de7a641d4ba?hl=zh-TW", description:"從需求、資源與創意出發完成創業思考挑戰。" },
  { id:"C01", name:"全球生存危機", category:"謎語挑戰", tag:"全球議題", url:"https://gemini.google.com/share/bb13be779244", description:"以謎題探索全球危機及彼此相連的世界。" },
  { id:"C02", name:"產業謎語大挑戰", category:"謎語挑戰", tag:"產業經濟", url:"https://gemini.google.com/share/eee21ba6af79", description:"從線索推理不同產業的特色、條件與關係。" },
  { id:"C03", name:"台灣永續環境挑戰賽", category:"謎語挑戰", tag:"永續發展", url:"https://gemini.google.com/share/f6e0a6b36711", description:"以挑戰任務認識台灣環境與永續行動。" },
  { id:"C04", name:"消費達人觀念大考驗", category:"謎語挑戰", tag:"消費素養", url:"https://gemini.google.com/share/951c5d25ccc1", description:"檢視消費觀念，練習做出聰明且負責的選擇。" },
];

export default function Home() {
  const [active, setActive] = useState("全部");
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => apps.filter((app) =>
    (active === "全部" || app.category === active) &&
    `${app.name}${app.tag}${app.description}`.toLowerCase().includes(query.toLowerCase())
  ), [active, query]);

  return <main>
    <header className="site-header">
      <a className="brand" href="#top" aria-label="回到首頁">
        <span className="brand-mark">社</span>
        <span><b>社會領域未來教室</b><small>NTUE SOCIAL STUDIES × AI</small></span>
      </a>
      <a className="header-link" href="#apps">探索全部 APP <span>↓</span></a>
    </header>

    <section className="hero" id="top">
      <div className="tech-grid" aria-hidden="true"></div>
      <div className="data-stream data-stream-one" aria-hidden="true"></div>
      <div className="data-stream data-stream-two" aria-hidden="true"></div>
      <div className="hero-copy">
        <p className="eyebrow"><span></span> 國立臺北教育大學・社會領域教學研究中心（小學組）</p>
        <h1>讓 AI 成為<br/><em>教與學的探究夥伴</em></h1>
        <p className="hero-lead">從教師備課、課堂提問到學生自主探究，21 項 AI 教學應用，打開社會領域學習的新入口。</p>
        <div className="hero-actions">
          <a className="primary-button" href="#apps">開始探索 <span>↘</span></a>
          <span className="hero-note">免安裝・點擊即用・手機可掃碼</span>
        </div>
      </div>
      <div className="hero-visual" aria-hidden="true">
        <div className="orbit orbit-one"></div><div className="orbit orbit-two"></div>
        <div className="hero-glow"></div>
        <img className="hero-chibi" src="/illustrations/chibi-teacher-ai.png" alt="" />
        <div className="visual-card card-a"><span>教</span><b>教學設計</b><small>AI 共備</small></div>
        <div className="visual-card card-b"><span>探</span><b>自主探究</b><small>情境任務</small></div>
        <div className="visual-card card-c"><span>思</span><b>素養思考</b><small>問題解決</small></div>
        <div className="spark s1">✦</div><div className="spark s2">✦</div>
      </div>
    </section>

    <section className="stats" aria-label="網站統計">
      <div><strong>21</strong><span>AI 教學應用</span></div>
      <div><strong>4</strong><span>學習主題分類</span></div>
      <div><strong>1</strong><span>共同入口網站</span></div>
    </section>

    <section className="learning-worlds" aria-label="AI 教學情境">
      <div className="world-intro">
        <p className="eyebrow"><span></span> AI LEARNING WORLDS</p>
        <h2>一起走進<br/>AI 探究學習世界</h2>
        <p>從教師共備到學生任務，科技不是終點，而是觀察社會、提出問題與實踐行動的新工具。</p>
      </div>
      <article className="world-card world-students">
        <span className="world-number">01</span>
        <img src="/illustrations/chibi-students-inquiry.png" alt="兩位學生使用平板進行互動探究的 Q 版插圖" />
        <div><b>對話 × 探究</b><p>在提問、推理與合作中發現答案。</p></div>
      </article>
      <article className="world-card world-city">
        <span className="world-number">02</span>
        <img src="/illustrations/chibi-city-eco.png" alt="學生探索永續城市與環境議題的 Q 版插圖" />
        <div><b>社會 × 行動</b><p>從城市、環境到世界議題展開任務。</p></div>
      </article>
    </section>

    <section className="catalog" id="apps">
      <div className="catalog-circuit" aria-hidden="true"></div>
      <div className="section-heading">
        <div><p className="eyebrow"><span></span> APP COLLECTION</p><h2>選一個任務，開始探索</h2></div>
        <label className="search"><span>⌕</span><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="搜尋 APP 或主題" aria-label="搜尋 APP 或主題" /></label>
      </div>
      <div className="filters" role="tablist" aria-label="APP 分類">
        {categories.map((category) => <button key={category} className={active===category?"active":""} onClick={()=>setActive(category)}>{category}<span>{category==="全部"?apps.length:apps.filter(a=>a.category===category).length}</span></button>)}
      </div>
      <p className="result-count">顯示 {filtered.length} 個應用</p>
      <div className="app-grid">
        {filtered.map((app) => <article className="app-card" data-category={app.category} key={app.id}>
          <div className="card-top"><span className="app-id">{app.id}</span><span className="app-tag">{app.tag}</span></div>
          <div className="app-icon" aria-hidden="true"><span>{appIcons[app.id]}</span><i></i><i></i></div>
          <h3>{app.name}</h3><p>{app.description}</p>
          <div className="card-footer">
            <a href={app.url} target="_blank" rel="noreferrer">開啟 APP <span>↗</span></a>
            <div className="qr-trigger"><img src={`/qr/${app.id}.svg`} alt={`${app.name} QR Code`} /><span>掃描<br/>QR Code</span></div>
          </div>
        </article>)}
      </div>
      {filtered.length===0 && <div className="empty">找不到符合的 APP，請嘗試其他關鍵字。</div>}
    </section>

    <section className="guide">
      <p className="eyebrow"><span></span> HOW TO USE</p><h2>三步驟，立即開始</h2>
      <div className="steps"><div><b>01</b><h3>選擇主題</h3><p>依教學需求或學習任務篩選 APP。</p></div><div><b>02</b><h3>點擊或掃碼</h3><p>電腦點選開啟，手機可直接掃描 QR Code。</p></div><div><b>03</b><h3>展開探究</h3><p>依畫面指引對話、思考並完成任務。</p></div></div>
    </section>

    <footer><div><b>社會領域未來教室</b><span>AI互動教學App・創新教材</span></div><p>國立臺北教育大學社會領域教學研究中心（小學組）</p></footer>
  </main>;
}
