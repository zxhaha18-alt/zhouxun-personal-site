周迅 · AI 产品经理个人网页

运行方式
1. 将整个文件夹解压到本地。
2. 双击 open-preview.command（或 start-site.command）。
3. 浏览器会打开 http://127.0.0.1:4175/。

不要直接双击 index.html。直接以 file:// 打开时，浏览器会阻止网页里的 ES Module 和 Three.js 外部模块，页面会出现导航但主体空白。

也可以在当前文件夹启动一个静态服务器，然后打开 index.html。

内容修改
编辑 content.js 可以修改首页、AI 产品方法论、项目与作品、经历、教育和联系信息。
项目封面位于 assets/projects/。

部署到 GitHub Pages
请保持 index.html、content.js、site.js、main.js 和 assets 文件夹的相对位置不变，并将它们一起上传到仓库根目录。

说明
网页需要联网加载 Google Fonts、Tailwind CDN 和 Three.js 模块；花海鼠标互动和日夜模式属于网页交互效果。为避免部分设备出现整屏频闪，液态鼠标遮罩已停用。
