# 異位性皮膚炎全身性治療 SDM 指引

一個繁體中文的醫學教育單頁網站，主題為**異位性皮膚炎（Atopic Dermatitis, AD）的全身性治療選項**，以及如何運用 **Shared Decision-Making（SDM，共享決策）** 將這些選項應用於個案。內容源自病理藥理小組討論「單元十四：皮膚系統疾病」之 SDM 報告。

> **教學用途聲明：** 本網站僅供醫學教育與個案式學習之用，不構成診療建議。實際用藥決策應由主治醫師與病人共同決定，並依在地給付與藥物可及性完成完整的治療前篩檢與監測。

## 內容範圍

- 何時需要升級至全身性治療
- AD 的病理生理基礎（IL-4 / IL-13 / IL-31、JAK–STAT 路徑）
- 全身性治療選項：
  - 傳統免疫調節劑（cyclosporine、methotrexate、azathioprine、MMF）
  - Phototherapy（NB-UVB）
  - Biologics（dupilumab、tralokinumab、lebrikizumab、nemolizumab）
  - 口服 JAK inhibitors（upadacitinib、abrocitinib、baricitinib）
- 各選項之比較定位與指引建議強度
- 個案輪廓與 SDM 應用

## 技術架構

- **建置工具：** [Vite](https://vitejs.dev/)（Vanilla JS，不使用前端框架，確保 GitHub Pages 相容）
- **樣式：** [Tailwind CSS](https://tailwindcss.com/)（CDN 版本，純靜態網站）
- **動畫：** [AOS.js](https://michalsnik.github.io/aos/)（scroll animation，CDN）
- **字型：** Noto Sans TC

### 主題配色（醫療風）

| 用途 | 色碼 |
|---|---|
| Primary（深藍） | `#1e40af` |
| Accent（青色） | `#0891b2` |
| 背景 | 白色 |

## 目錄結構

```
ad-sdm-website/
├── index.html              # 主頁面骨架（含 SEO / OG / Tailwind / AOS）
├── public/
│   └── images/             # 圖片資源（機轉圖、演算法、指引截圖等）
├── public/
│   ├── images/             # 圖片資源（機轉圖、演算法、指引截圖等）
│   └── 404.html            # GitHub Pages SPA fallback（導回首頁）
├── src/
│   ├── css/
│   │   └── style.css       # 自訂樣式（含 navbar 捲動狀態、tabs、accordion、深色模式）
│   └── js/
│       ├── main.js         # 應用程式進入點，掛載所有元件
│       └── components/     # 各區塊元件
│           ├── navbar.js       # 固定導覽列、閱讀進度條、手機選單
│           ├── countUp.js      # Hero 數據 countUp 動畫
│           ├── tabs.js         # 治療選項分類分頁
│           ├── accordion.js    # 藥物卡「了解更多」、參考文獻摺疊
│           ├── comparison.js   # 互動藥物比較表（篩選、展開）
│           ├── caseMatrix.js   # 因子 × 藥物適用性矩陣（高亮）
│           └── radarChart.js   # Chart.js 雷達圖
├── .github/workflows/
│   └── deploy.yml          # GitHub Actions 自動部署
├── vite.config.js
├── package.json
└── .gitignore
```

## 頁面結構（章節錨點）

| 區塊 | 錨點 id | 內容 |
|---|---|---|
| Hero | （頁首） | 標題、個案數據 countUp、向下 CTA |
| 個案介紹 | `#case-intro` | 殷太太 8 項臨床特徵卡片 |
| 病理機轉 | `#mechanism` | IL-4/IL-13/IL-31、JAK–STAT 三步驟 |
| 治療選項 | `#treatments` | Biologics／JAK／傳統分頁 + 治療演算法 |
| 藥物比較 | `#comparison` | 11 種選項互動比較表 |
| 殷太太的選擇 | `#case-analysis` | 因子 × 藥物矩陣 + 雷達圖 |
| SDM 建議 | `#sdm` | SDM 框架、醫病對話、最終推薦 |
| 參考文獻 | `#references` | 11 篇 APA 文獻（摺疊） |

## 網站截圖

> 📸 **截圖放置位置：** 請將首頁截圖存為 `public/images/screenshot.png`，並可在本段下方以
> `![網站截圖](public/images/screenshot.png)` 內嵌；社群分享用的封面圖則命名為
> `public/images/og-cover.jpg`（`index.html` 的 Open Graph `og:image` 已指向此檔）。

<!-- ![網站截圖](public/images/screenshot.png) -->

## 本機開發

```bash
npm install      # 安裝相依套件（Vite）
npm run dev      # 啟動開發伺服器（預設 http://localhost:5173/0604GroupDiscussion/）
npm run build    # 產生 production 版本至 dist/
npm run preview  # 預覽 build 結果
```

> 深色模式會依作業系統 / 瀏覽器的 `prefers-color-scheme` 自動切換，無需手動設定。

## 部署到 GitHub Pages

本專案附帶 GitHub Actions workflow（`.github/workflows/deploy.yml`）：推送到 `main` 分支時，
會自動 `npm ci` → `npm run build` → 將 `dist/` 發佈到 `gh-pages` 分支
（使用 `peaceiris/actions-gh-pages@v4`）。

### 設定步驟

1. **建立 GitHub repository**，名稱建議與 `vite.config.js` 的 `base` 一致。
   - 本專案 `base` 範例為 `"/0604GroupDiscussion/"`，對應 repository 名稱 `0604GroupDiscussion`。
   - 網站網址將是 `https://<你的帳號>.github.io/0604GroupDiscussion/`。
2. **推送程式碼**到 `main` 分支：
   ```bash
   git init
   git add -A
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<你的帳號>/0604GroupDiscussion.git
   git push -u origin main
   ```
3. 等 Actions 跑完後，進入 **Settings → Pages**，將 **Source** 設為 **Deploy from a branch**，
   分支選 **`gh-pages` / `(root)`**，儲存。
4. 之後每次推送到 `main`，網站都會自動重新部署。

### ⚠ 若 repository 名稱不是 `0604GroupDiscussion`

請務必同步修改以下兩處，否則 CSS / JS / 圖片會 404：

1. `vite.config.js` → `base: '/<你的-repo-名稱>/'`
2. `public/404.html` → 將其中的 `/0604GroupDiscussion/` 改成 `/<你的-repo-名稱>/`
3. （選用）`index.html` 的 `<link rel="canonical">` 與 `og:url`

## 如何更換 / 新增圖片

所有圖片放在 **`public/images/`**；在 HTML 中以根路徑 `/images/檔名` 引用
（Vite 會在 build 時自動加上 `base` 前綴，毋須手動處理）。

1. **更換現有圖片**：用同名檔案覆蓋 `public/images/` 內的檔案即可（例如把新的機轉圖
   存成 `il4-il13-il31-biologics-jak.jpg` 覆蓋舊檔）。
2. **新增圖片**：將檔案放入 `public/images/`，再於 `index.html` 加上：
   ```html
   <img src="/images/你的檔名.jpg" alt="說明文字"
        onerror="this.style.display='none'; this.nextElementSibling.classList.remove('hidden');" />
   <div class="hidden"><!-- 圖片載入失敗時的 SVG 佔位 --></div>
   ```
   `onerror` 會在圖片不存在時自動改顯示後方的 SVG 佔位圖。
3. **目前內建圖片**：`il4-il13-il31-biologics-jak.jpg`（病理機轉）、
   `aad-treatment-algorithm.jpg`（治療演算法），以及多張機轉／指引圖供延伸使用。

## 授權與引用

內容引用之文獻清單以 APA 格式列於 SDM 報告原文（亦見網站「參考文獻」區塊）。
圖片資源請依其原始來源之授權條款使用。
