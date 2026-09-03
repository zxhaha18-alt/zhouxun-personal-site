import { content } from './content.js';
import { garden } from './main.js';

const $ = (id) => document.getElementById(id);
const interactionOnly = new URLSearchParams(window.location.search).has('interaction');
const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' };
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ESC[c]);
const has = (v) => Array.isArray(v) ? v.length > 0 : Boolean(v && String(v).trim());
const projectFallback = (src) => src.startsWith('./assets/projects/') ? ` data-fallback="./${esc(src.slice('./assets/projects/'.length))}"` : '';

// 空字段渲染成可见占位：标出字段路径与填写建议，填完自动消失
const todo = (path, hint) => `
  <span class="todo">
    <b>待填写</b>${esc(hint)}
    <br><code>content.js → ${esc(path)}</code>
  </span>`;

const or = (value, path, hint, html) => (has(value) ? html : todo(path, hint));

const sectionHeader = (num, label, title) => `
  <header class="section-header reveal mb-10 md:mb-14">
    <div class="flex items-baseline gap-3">
      <span class="font-mono text-[11px] text-cream/35">${esc(num)}</span>
      <span class="text-[11px] tracking-[.22em] uppercase text-cream/40">${esc(label)}</span>
    </div>
    <h2 class="font-stix mt-2 text-[clamp(28px,4.5vw,44px)] leading-tight">${esc(title)}</h2>
  </header>`;

// ---------------------------------------------------------------- hero
function renderHero() {
  if (interactionOnly) {
    document.body.classList.add('interaction-only');
    $('hero').innerHTML = '';
    return;
  }
  $('hero').innerHTML = `
    <div class="hero-single pointer-events-none">
      <p class="hero-eyebrow animate-fade-up [animation-delay:120ms]"><span class="hero-english-name">Lora</span> / ZHOU XUN / AI PRODUCT</p>
      <h1 class="hero-identity animate-fade-up [animation-delay:200ms]">
        <button type="button" id="heroNameBloom" class="hero-name-trigger" aria-label="让名字周围的花朵绽放">
          <span class="hero-name-word">周迅</span><span class="hero-title-role">· AI产品经理</span><i class="hero-name-bud" aria-hidden="true"></i>
        </button>
      </h1>
      <span class="hero-name-bloom-stage" aria-hidden="true"></span>
      <p class="hero-background animate-fade-up [animation-delay:290ms]">百度 / 字节跳动Seed / 央视 / AI初创 实战背景</p>
      <p class="hero-thesis animate-fade-up [animation-delay:390ms]">锚定模型能力边界，捕捉真实业务痛点<br><span>用可量化的方法，把模型能力落地为真正能工作的产品</span></p>
      <div class="hero-glass-ribbon animate-fade-up [animation-delay:490ms]" data-liquid-bubble>
        <div class="hero-bubble-liquid" aria-hidden="true"></div>
        <div class="hero-bubble-frost" aria-hidden="true"></div>
        <div class="hero-evidence-content">
          <div class="hero-capability-pills" aria-label="核心能力">
            <span>产品 Sense</span><span>AI 场景落地</span>
            <span>模型训练与评测</span><span>检索与Agent开发</span><span>业务增长</span><span>数据驱动</span><span class="is-wide">AI Coding与工具链</span>
          </div>
          <svg class="hero-data-wave" viewBox="0 0 780 34" preserveAspectRatio="none" aria-hidden="true"><path d="M0 25 C58 25 68 9 126 12 S205 29 270 20 S348 5 412 15 S499 31 556 18 S639 7 691 13 S744 24 780 8" /></svg>
          <div class="hero-stat-grid" aria-label="代表成果">
            <div class="hero-stat hero-stat-growth"><strong>+13.13%</strong><span>GMV 转化 · 约$8万</span></div>
            <div class="hero-stat hero-stat-reach"><strong>9000万+</strong><span>全网触达</span></div>
            <div class="hero-stat hero-stat-research"><strong>3篇</strong><span>国际顶会论文</span></div>
          </div>
        </div>
      </div>
      <div class="hero-module-actions pointer-events-auto animate-fade-up [animation-delay:600ms]">
        <a href="#methodology" class="hero-module-button hero-module-primary">我的AI产品方法论 <span>↗</span></a>
        <a href="#practice" class="hero-module-button">实习案例 <span>↗</span></a>
        <a href="#portfolio" class="hero-module-button">项目作品集 <span>↗</span></a>
      </div>
    </div>`;
}

// ---------------------------------------------------------------- 01 AI 产品方法论
function methodologyLens(lens, index) {
  return `
    <details class="methodology-item reveal" name="methodology-lens" ${index === 0 ? 'open' : ''}>
      <summary>
        <span class="methodology-index">${String(index + 1).padStart(2, '0')}</span>
        <span class="methodology-title">
          <small>${esc(lens.label)}</small>
          <strong>${esc(lens.title)}</strong>
        </span>
        <span class="methodology-claim">${esc(lens.claim)}${lens.basis ? `<small class="methodology-basis">${esc(lens.basis)}</small>` : ''}</span>
        <span class="methodology-toggle" aria-hidden="true">+</span>
      </summary>
      <div class="methodology-body">
        <div class="methodology-reasoning">
          <span>判断依据</span>
          <p>${esc(lens.reasoning)}</p>
        </div>
        <div class="methodology-playbook">
          <span>操作框架</span>
          <ol>${(lens.methods ?? []).map((method) => `<li>${esc(method)}</li>`).join('')}</ol>
        </div>
        ${has(lens.evidence) ? `<div class="methodology-evidence">
          <span>${esc(lens.evidenceLabel ?? '实践证据')}</span>
          <p>${esc(lens.evidence)}</p>
        </div>` : ''}
      </div>
    </details>`;
}

function renderMethodology() {
  const m = content.methodology ?? {};
  const lenses = m.lenses ?? [];
  $('methodology').innerHTML = sectionHeader('01', m.label ?? 'Methodology', m.title ?? 'AI 产品方法论') + `
    <div class="methodology-intro reveal">
      <p class="methodology-eyebrow">${esc(m.eyebrow ?? '')}</p>
      <p class="methodology-statement">${esc(m.statement ?? '')}</p>
    </div>
    <div class="methodology-loop reveal" aria-label="AI 产品方法闭环">
      ${(m.loop ?? []).map((step, index) => `
        <div class="methodology-step">
          <span>${String(index + 1).padStart(2, '0')}</span>
          <strong>${esc(step.title)}</strong>
          <p>${esc(step.desc)}</p>
        </div>`).join('')}
    </div>
    <div class="methodology-map-head reveal">
      <div>
        <span>Lenses</span>
        <h3>判断视角</h3>
      </div>
    </div>
    <div class="methodology-list">
      ${lenses.map(methodologyLens).join('')}
    </div>
    `;
}

// ---------------------------------------------------------------- 03 作品集
const portfolioPlaceholder = (i) => `
  <article class="project-slot reveal">
    <span>${String(i + 1).padStart(2, '0')}</span>
    <strong>新项目制作中</strong>
    <p>项目名 · 用户场景 · 技术方案 · 验证指标</p>
  </article>`;

function portfolioCard(w, index) {
  const tags = (w.tags ?? []).map((t) => `<span class="tag">${esc(t)}</span>`).join('');
  const inner = `
    <figure class="project-media">
      ${has(w.cover)
        ? `<img src="${esc(w.cover)}"${projectFallback(w.cover)} alt="${esc(w.title)} 项目预览" style="object-position:${esc(w.coverPosition ?? 'center')}">`
        : '<span>Preview pending</span>'}
      <figcaption>${String(index + 1).padStart(2, '0')} / ${esc(w.kind ?? 'Project')}</figcaption>
    </figure>
    <div class="project-content">
      <div class="project-meta">
        <span>${esc(w.role ?? '')}</span>
        <span>${esc(w.year ?? '')}</span>
      </div>
      <h3>${esc(w.title)}</h3>
      ${has(w.subtitle) ? `<p class="project-subtitle">${esc(w.subtitle)}</p>` : ''}
      <p class="project-summary">${esc(w.summary ?? '')}</p>
      <div class="project-values">
        <div>
          <span>用户 / 商业价值</span>
          <p>${esc(w.marketValue ?? '')}</p>
        </div>
        <div>
          <span>技术 / 方法价值</span>
          <p>${esc(w.craftValue ?? '')}</p>
        </div>
      </div>
      ${tags ? `<div class="project-tags">${tags}</div>` : ''}
      <span class="project-open">查看完整项目 <b>↗</b></span>
    </div>
  `;
  return has(w.link)
    ? `<a href="${esc(w.link)}" target="_blank" rel="noopener noreferrer"
         class="project-card reveal">${inner}</a>`
    : `<article class="project-card reveal">${inner}</article>`;
}

function renderPortfolio() {
  const list = content.portfolio ?? [];
  const valueOrder = ['Shroomie · Bite-sized News', '简策 · Resume Studio', '不吃灰 · 学习与求职工作台', 'THE DAILY ME · 个人日报', '星回 · 手势塔罗', '人机关系与情感模型研究', '知著网'];
  const sortedList = [...list].sort((a, b) => valueOrder.indexOf(a.title) - valueOrder.indexOf(b.title));
  const slots = Math.max(0, Number(content.portfolioSlots) || 0);
  $('portfolio').innerHTML = sectionHeader('03', 'Selected Work', '项目与作品') + `
    <div class="portfolio-intro reveal">
      <span>${String(sortedList.length).padStart(2, '0')} completed${slots ? ` / ${String(slots).padStart(2, '0')} in progress` : ''}</span>
    </div>
    <div class="project-grid">${sortedList.map(portfolioCard).join('')}</div>
    ${slots ? `
      <div class="project-slots-head reveal">
        <span>In progress</span>
        <p>接下来的实验与工具会继续补到这里。</p>
      </div>
      <div class="project-slot-grid">${Array.from({ length: slots }, (_, i) => portfolioPlaceholder(i)).join('')}</div>` : ''}`;
}

function initProjectImageFallbacks() {
  document.querySelectorAll('.project-media img[data-fallback]').forEach((image) => {
    image.addEventListener('error', () => {
      const fallback = image.dataset.fallback;
      if (!fallback || image.src.endsWith(fallback)) return;
      image.src = fallback;
    }, { once: true });
  });
}

// ---------------------------------------------------------------- 04 实践
const STEPS = [['problem', '问题'], ['approach', '做法'], ['result', '结果']];

const PRACTICE_SIGNALS = [
  ['+1.32%', '端到端可播率'],
  ['+7.9%', '未知失效命中'],
  ['+13.13%', 'GMV 转化'],
  ['+32%', '选题时效性'],
];

const practiceItem = (it, index) => `
  <details class="practice-case reveal" ${index === 0 ? 'open' : ''}>
    <summary>
      <span class="practice-case-no">0${index + 1}</span>
      <span class="practice-case-title">${esc(it.title)}</span>
      <span class="practice-case-toggle" aria-hidden="true">+</span>
    </summary>
    <div class="practice-case-body">
      ${STEPS.map(([k, label]) => has(it[k]) ? `
        <div class="practice-step">
          <span>${label}</span>
          <p>${esc(it[k])}</p>
        </div>` : '').join('')}
    </div>
  </details>`;

function renderPractice() {
  const list = content.practice ?? [];
  $('practice').innerHTML = sectionHeader('02', 'Practice', '实践') + `
    <div class="practice-list">
      ${list.map((g, companyIndex) => `
        <article class="practice-company practice-tone-${companyIndex} reveal">
          <div class="practice-company-head">
            <div class="practice-company-id">
              <span class="practice-bloom" aria-hidden="true"><i></i><b></b></span>
              <span class="practice-company-no">0${companyIndex + 1}</span>
              <div>
                <h3>${esc(g.org)}</h3>
                <p>${esc(g.role)}</p>
                <span class="practice-period">${esc(g.period)}</span>
              </div>
            </div>
            <div class="practice-signal">
              <strong>${PRACTICE_SIGNALS[companyIndex]?.[0] ?? '[待补充]'}</strong>
              <span>${PRACTICE_SIGNALS[companyIndex]?.[1] ?? '代表结果'}</span>
            </div>
          </div>
          <div class="practice-cases">
            ${(g.items ?? []).map(practiceItem).join('')}
          </div>
        </article>`).join('')}
    </div>`;
  document.querySelectorAll('.practice-company').forEach((company) => {
    const cases = [...company.querySelectorAll('.practice-case')];
    const syncBloom = () => company.classList.toggle('is-active', cases.some((item) => item.open));
    cases.forEach((item) => item.addEventListener('toggle', syncBloom));
    syncBloom();
  });
}

// ---------------------------------------------------------------- 04 工具与能力
function renderToolkit() {
  const list = content.toolkit ?? [];
  $('toolkit').innerHTML = sectionHeader('04', 'Toolkit', '工具与能力') + `
    <div class="space-y-8">
      ${list.map((g) => `
        <div class="reveal">
          <div class="mb-3 text-[11px] tracking-[.18em] uppercase text-cream/35">${esc(g.group)}</div>
          <div class="flex flex-wrap gap-2">
            ${(g.items ?? []).map((i) => `<span class="tag">${esc(i)}</span>`).join('')}
          </div>
        </div>`).join('')}
    </div>`;
}

// ---------------------------------------------------------------- 05 教育
function renderEducation() {
  const list = content.education ?? [];
  $('education').innerHTML = sectionHeader('05', 'Education', '教育') + `
    <div class="space-y-10">
      ${list.map((e) => `
        <div class="reveal">
          <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <div class="flex flex-wrap items-baseline gap-x-3">
              <h3 class="font-stix text-[clamp(19px,2.2vw,26px)]">${esc(e.school)}</h3>
              <span class="text-[13px] text-cream/55">${esc(e.degree)}</span>
            </div>
            <span class="font-mono text-[11px] text-cream/35">${esc(e.period)}</span>
          </div>
          <div class="mt-3 flex flex-wrap gap-2">
            ${(e.notes ?? []).map((n) => `<span class="tag">${esc(n)}</span>`).join('')}
          </div>
        </div>`).join('')}
    </div>`;
}

// ---------------------------------------------------------------- 06 联系
function renderContact() {
  const c = content.contact ?? {};
  const p = content.profile ?? {};
  const links = (c.links ?? []).filter((l) => has(l?.url));
  $('contact').innerHTML = sectionHeader('06', 'Contact', '联系') + `
    <div class="reveal max-w-[720px]">
      ${has(c.invitation) ? `<p class="font-stix text-[clamp(18px,2.2vw,26px)] leading-[1.5] text-cream/85">${esc(c.invitation)}</p>` : ''}
      <div class="mt-8 space-y-3">
        ${has(p.email) ? `
          <a href="mailto:${esc(p.email)}" class="block font-mono text-[15px] text-cream/90 underline decoration-cream/25 underline-offset-4 hover:decoration-cream/70">
            ${esc(p.email)}
          </a>` : ''}
        ${has(p.phone) ? `<div class="font-mono text-[15px] text-cream/70">${esc(p.phone)}</div>` : ''}
      </div>
      ${links.length ? `
        <div class="mt-7 flex flex-wrap gap-2">
          ${links.map((l) => `
            <a href="${esc(l.url)}" target="_blank" rel="noopener noreferrer"
               class="tag transition-colors hover:bg-cream/[.08]">${esc(l.label)}</a>`).join('')}
        </div>`
        : `<div class="mt-7">${todo('contact.links', '社交链接，如 GitHub / 知乎 / 公众号。')}</div>`}
    </div>`;
}

// ---------------------------------------------------------------- 滚动与性能
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// 首屏可见性 → 渲染与交互开关。背景被完全遮住时没有理由继续烧 GPU。
function watchHero() {
  const hero = $('hero');
  let running = true;
  new IntersectionObserver((entries) => {
    const visible = entries[0].isIntersecting;
    garden.setInteractive(visible);
    if (visible && !running) { garden.resume(); running = true; }
    else if (!visible && running) { garden.pause(); running = false; }
  }, { threshold: 0.06 }).observe(hero);
}

// 视口内的元素直接显形。IntersectionObserver 只负责"滚进来时"的渐入效果，
// 显形本身不能只依赖它——否则它一旦没投递（无头环境、深链接跳转）整页正文就是空白。
function revealInView() {
  const limit = window.innerHeight * 0.92;
  document.querySelectorAll('.reveal:not(.in)').forEach((el) => {
    if (el.getBoundingClientRect().top < limit) el.classList.add('in');
  });
}

// 遮罩透明度：首屏 0，滚过一屏后到 1
function watchScroll() {
  const veil = $('veil');
  let queued = false;
  const update = () => {
    queued = false;
    const p = Math.min(1, window.scrollY / (window.innerHeight * 0.75));
    veil.style.opacity = p.toFixed(3);
    if (window.scrollY > 40) $('hint')?.classList.add('hide');
    revealInView();
  };
  window.addEventListener('scroll', () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(update);
  }, { passive: true });
  update();
}

function initSectionNav() {
  const links = [...document.querySelectorAll('[data-nav-target]')];
  const ids = ['hero', 'practice', 'portfolio', 'contact'];
  const sections = ids.map((id) => $(id)).filter(Boolean);
  if (!links.length || !sections.length) return;

  let queued = false;
  const update = () => {
    queued = false;
    const marker = window.scrollY + window.innerHeight * .34;
    let current = sections[0].id;
    sections.forEach((section) => {
      if (section.offsetTop <= marker) current = section.id;
    });
    links.forEach((link) => {
      const active = link.dataset.navTarget === current;
      link.classList.toggle('is-active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };

  window.addEventListener('scroll', () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(update);
  }, { passive: true });
  update();
}

function watchReveal() {
  const items = document.querySelectorAll('.reveal');
  if (reduceMotion) {
    items.forEach((el) => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
  items.forEach((el) => io.observe(el));
}

// ---------------------------------------------------------------- 移动端导航遮罩
function initMenu() {
  const overlay = $('overlay');
  const toggle = $('menu-toggle');
  const openBtn = $('menu-open');
  const closeBtn = $('overlay-close');
  if (!overlay || !toggle || !closeBtn) return;
  const menuIcon = toggle.querySelector('[data-icon="menu"]');
  const closeIcon = toggle.querySelector('[data-icon="close"]');
  let open = false;

  const setOpen = (next) => {
    open = next;
    overlay.classList.toggle('is-open', open);
    overlay.classList.toggle('pointer-events-none', !open);
    overlay.classList.toggle('pointer-events-auto', open);
    document.body.style.overflow = open ? 'hidden' : '';
    toggle.setAttribute('aria-label', open ? '关闭导航' : '打开导航');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuIcon.classList.toggle('opacity-0', open);
    menuIcon.classList.toggle('rotate-90', open);
    menuIcon.classList.toggle('scale-75', open);
    closeIcon.classList.toggle('opacity-0', !open);
    closeIcon.classList.toggle('-rotate-90', !open);
    closeIcon.classList.toggle('scale-75', !open);
    closeIcon.classList.toggle('rotate-0', open);
    closeIcon.classList.toggle('scale-100', open);
  };

  toggle.addEventListener('click', () => setOpen(!open));
  openBtn?.addEventListener('click', () => setOpen(true));
  closeBtn.addEventListener('click', () => setOpen(false));
  // 先关遮罩再滚动，否则 body 的 overflow:hidden 会吃掉锚点跳转
  overlay.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && open) setOpen(false);
  });
}

function initTheme() {
  const toggle = $('themeToggle');
  const label = $('themeLabel');
  if (!toggle || !label) return;
  const saved = window.localStorage.getItem('zhou-xun-theme');
  let theme = saved === 'dark' ? 'dark' : 'light';
  const apply = (next, surprise = false) => {
    theme = next;
    document.body.classList.toggle('theme-light', theme === 'light');
    document.body.classList.toggle('theme-dark', theme === 'dark');
    label.textContent = theme === 'light' ? '夜花' : '日光';
    toggle.setAttribute('aria-label', theme === 'light' ? '进入夜花模式' : '返回日光模式');
    toggle.setAttribute('title', theme === 'light' ? '窗外有新景色？点击进入夜花' : '返回日光模式');
    window.localStorage.setItem('zhou-xun-theme', theme);
    if (surprise && theme === 'dark') {
      document.body.classList.remove('theme-reveal');
      requestAnimationFrame(() => document.body.classList.add('theme-reveal'));
      window.setTimeout(() => document.body.classList.remove('theme-reveal'), 1500);
    }
  };
  apply(theme);
  toggle.addEventListener('click', () => apply(theme === 'light' ? 'dark' : 'light', true));
}

function initNameBloom() {
  const trigger = $('heroNameBloom');
  const stage = document.querySelector('.hero-name-bloom-stage');
  if (!trigger || !stage) return;
  let cleanupTimer;
  const bloom = () => {
    window.clearTimeout(cleanupTimer);
    stage.replaceChildren();
    const positions = [
      [-44, -4, .86, 0],
      [-27, -32, .62, 70],
      [35, -25, .72, 130],
      [48, 8, .9, 190],
      [8, 29, .58, 250],
    ];
    positions.forEach(([x, y, scale, delay], index) => {
      const flower = document.createElement('i');
      flower.className = 'name-flower';
      flower.style.setProperty('--flower-x', `${x}%`);
      flower.style.setProperty('--flower-y', `${y}px`);
      flower.style.setProperty('--flower-scale', scale);
      flower.style.setProperty('--flower-delay', `${delay}ms`);
      flower.style.setProperty('--flower-color', ['#c45138', '#d36249', '#b94631', '#cf765f', '#a93e2a'][index]);
      for (let petal = 0; petal < 8; petal += 1) {
        const part = document.createElement('b');
        part.style.setProperty('--petal-angle', `${petal * 45}deg`);
        flower.appendChild(part);
      }
      flower.appendChild(document.createElement('em'));
      stage.appendChild(flower);
    });
    trigger.classList.remove('is-blooming');
    requestAnimationFrame(() => trigger.classList.add('is-blooming'));
    garden.bloom?.();
    cleanupTimer = window.setTimeout(() => {
      stage.replaceChildren();
      trigger.classList.remove('is-blooming');
    }, 1900);
  };
  trigger.addEventListener('click', bloom);
}

// ---------------------------------------------------------------- 启动
document.documentElement.classList.add('js');

renderHero();
renderMethodology();
renderPractice();
renderPortfolio();
initProjectImageFallbacks();
renderToolkit();
renderEducation();
renderContact();

initMenu();
initTheme();
initSectionNav();
initNameBloom();
watchHero();
watchScroll();
watchReveal();

// 章节内容是脚本注入的，浏览器在解析阶段按空节点算出的锚点位置是错的，渲染完要重新定位。
// 必须用 'instant'：CSS 里 scroll-behavior 是 smooth，'auto' 会沿用它变成动画，
// 后面的 revealInView() 就会在滚动到位之前跑，正文仍然是隐藏的。
if (location.hash) {
  document.querySelector(location.hash)?.scrollIntoView({ behavior: 'instant' });
  revealInView();
}
