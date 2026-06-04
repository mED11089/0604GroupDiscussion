import { defineConfig } from 'vite';

// GitHub Pages 部署於 https://<user>.github.io/<repo>/ 子路徑。
// 將 base 設為 "/<repo-name>/"（此處以 /ad-sdm-guide/ 為範例）。
// ⚠ 若你的 repository 名稱不同，請同步修改此處與 index.html 內的 canonical / og:url。
export default defineConfig({
  base: '/0604GroupDiscussion/',
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsDir: 'assets',
  },
  server: {
    port: 5173,
    open: true,
  },
});
