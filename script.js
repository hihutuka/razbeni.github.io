/* script.js — razbeni Portfolio */
'use strict';

// Handled with portfolioObserverContent logic instead to avoid duplicate declarations

/* ----------------------------------------
   Hero items — appear immediately
   ---------------------------------------- */
const showHeroItems = () => {
  const heroItems = document.querySelectorAll('.hero .fade-in, .hero .fade-in-up');
  heroItems.forEach((el, i) => {
    setTimeout(() => el.classList.add('is-visible'), i * 140);
  });
};

/* ----------------------------------------
   Mobile navigation hamburger
   ---------------------------------------- */
const initNav = () => {
  const hamburger = document.getElementById('hamburger');
  const nav = document.querySelector('.nav');

  if (!hamburger || !nav) return;

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    nav.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on nav link click
  nav.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      nav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
};

/* ----------------------------------------
   Sticky header shadow on scroll
   ---------------------------------------- */
const initHeaderShadow = () => {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const update = () => {
    if (window.scrollY > 10) {
      header.style.boxShadow = '0 4px 24px rgba(0,0,0,0.4)';
    } else {
      header.style.boxShadow = 'none';
    }
  };

  window.addEventListener('scroll', update, { passive: true });
  update();
};

/* ----------------------------------------
   Active nav link highlight on scroll
   ---------------------------------------- */
const initActiveNav = () => {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          links.forEach((l) => {
            l.classList.toggle(
              'active',
              l.getAttribute('href') === `#${id}`
            );
          });
        }
      });
    },
    { rootMargin: '-50% 0px -50% 0px' }
  );

  sections.forEach((s) => observer.observe(s));
};

/* ----------------------------------------
   Dynamic Portfolio Data
   ---------------------------------------- */
const portfolioData = [
  {
    title: "Fantasy RPG BGM – Dungeon Theme",
    description: "ファンタジーRPGのダンジョンシーン向けに制作。ループ再生で違和感が出ないよう構成を調整し、長時間聴いても疲れにくいダイナミクスを設計しました。<br /><small>担当：作曲 / ミックス / マスタリング</small>",
    youtubeId: "owzkhCKML0I",
    thumbnail: "images/work1.png",
    badge: "BGM"
  },
  {
    title: "City Pop Track – Mix",
    description: "シティポップ楽曲のミックス対応。各パートの定位と音の奥行きを整理し、Spotify / Apple Music のラウドネス基準（−14 LUFS）に合わせて納品しました。<br /><small>担当：ミックス / マスタリング</small>",
    youtubeId: "",
    thumbnail: "images/work2.png",
    badge: "Mix"
  },
  {
    title: "Short Film BGM – Cinematic",
    description: "短編映像向けのBGM制作。映像の尺に合わせてテンポと展開を設計し、セリフや効果音を邪魔しない音量バランスで仕上げました。<br /><small>担当：作曲 / ミックス</small>",
    youtubeId: "",
    thumbnail: "images/work3.png",
    badge: "Cinematic"
  },
  {
    title: "Indie Game BGM – Retro Fusion",
    description: "インディーゲーム向けに、チップチューン風の音色とリアルな音源を組み合わせて制作。複数シーン分をセットで対応し、BGM間の統一感を維持しました。<br /><small>担当：作曲 / ミックス</small>",
    youtubeId: "",
    thumbnail: "images/work4.png",
    badge: "Game BGM"
  },
  {
    title: "Ambient BGM – Loopable",
    description: "ゲームのロビーや待機画面向けのアンビエントBGM制作。ループポイントを自然につなげ、長時間流しても違和感のない構成にしました。<br /><small>担当：作曲 / ミックス / マスタリング</small>",
    youtubeId: "",
    thumbnail: "images/work5.png",
    badge: "Ambient"
  },
  {
    title: "Track Mastering – Streaming向け",
    description: "完成済み音源のマスタリング対応。配信プラットフォームのラウドネス基準に準拠しつつ、音圧・音質のバランスを整えて納品しました。<br /><small>担当：マスタリング</small>",
    youtubeId: "",
    thumbnail: "images/work6.png",
    badge: "Mastering"
  }
];

/* ----------------------------------------
   Portfolio Render & Inline YouTube Playback
   ---------------------------------------- */
let currentPortfolioLimit = 6;
let portfolioObserverContent = null;

const renderPortfolio = () => {
  const grid = document.getElementById('portfolio-grid');
  const loadMoreBtn = document.getElementById('load-more-btn');
  const moreContainer = document.getElementById('portfolio-more-container');

  if (!grid) return;

  grid.innerHTML = '';
  const visibleItems = portfolioData.slice(0, currentPortfolioLimit);

  visibleItems.forEach((item, index) => {
    // Extract video ID from URL if full URL is provided in the future
    let videoId = item.youtubeId;
    if (videoId && videoId.includes('youtube.com')) {
      const urlParams = new URLSearchParams(new URL(videoId).search);
      videoId = urlParams.get('v');
    } else if (videoId && videoId.includes('youtu.be')) {
      videoId = videoId.split('/').pop().split('?')[0];
    }

    const hasYoutube = !!videoId;
    const delayClass = index % 3 === 0 ? '' : index % 3 === 1 ? 'delay-1' : 'delay-2';

    const article = document.createElement('article');
    article.className = `card fade-in-up ${delayClass}`;
    if (hasYoutube) {
      article.setAttribute('data-youtube-id', videoId);
    }

    article.innerHTML = `
      <div class="card-img-wrap">
        <img src="${item.thumbnail}" alt="${item.title}" loading="lazy" />
        <span class="card-badge">${item.badge}</span>
        ${hasYoutube ? `<div class="card-play-icon">▶</div>` : ''}
      </div>
      <div class="card-body">
        <h3 class="card-title">${item.title}</h3>
        <p class="card-desc">${item.description}</p>
      </div>
    `;

    // Add click event for inline playback
    if (hasYoutube) {
      article.addEventListener('click', (e) => {
        const target = e.currentTarget;
        const imgWrap = target.querySelector('.card-img-wrap');

        // Prevent re-initialization if already playing
        if (imgWrap.querySelector('iframe')) return;

        imgWrap.innerHTML = `
          <iframe 
            src="https://www.youtube.com/embed/${videoId}?autoplay=1" 
            title="YouTube video player" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen
            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
          </iframe>
        `;
      });
    }

    grid.appendChild(article);
  });

  // Handle "Show More" functionality
  if (portfolioData.length > currentPortfolioLimit && loadMoreBtn) {
    moreContainer.style.display = 'block';
    loadMoreBtn.onclick = () => {
      currentPortfolioLimit = portfolioData.length;
      renderPortfolio();
      // Re-initialize observer for new elements
      if (portfolioObserverContent) {
        setTimeout(() => portfolioObserverContent(), 50);
      }
    };
  } else if (moreContainer) {
    moreContainer.style.display = 'none';
  }
};

/* ----------------------------------------
   Intersection Observer — scroll fade in (Updated for dynamic content)
   ---------------------------------------- */
const observeElements = () => {
  const items = document.querySelectorAll('.fade-in, .fade-in-up');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  items.forEach((el) => {
    if (!el.classList.contains('is-visible')) {
      observer.observe(el);
    }
  });
};
portfolioObserverContent = observeElements;

/* ----------------------------------------
   Boot
   ---------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  renderPortfolio();
  showHeroItems();
  observeElements();
  initNav();
  initHeaderShadow();
  initActiveNav();
});
