const videos = [...document.querySelectorAll('.media video')];
const manualPlayback = window.matchMedia('(max-width: 850px), (pointer: coarse), (prefers-reduced-motion: reduce)').matches || navigator.connection?.saveData;
videos.forEach((video, index) => {
  const button = video.closest('.media').querySelector('.motion');
  if (!button) return;
  let failed = false;
  button.type = 'button';
  const sync = () => {
    const paused = video.paused;
    button.setAttribute('aria-pressed', String(paused));
    button.setAttribute('aria-label', `${paused ? '播放' : '暂停'}项目${index + 1}视频`);
    button.textContent = failed ? '▷ 点击重试' : paused ? '▷ 播放' : video.readyState < 3 ? 'Ⅱ 加载中' : 'Ⅱ 暂停';
  };
  const load = () => {
    if (!video.getAttribute('src')) {
      video.src = video.dataset.src;
      video.load();
    }
  };
  const play = async () => {
    load();
    if (failed) { failed = false; video.load(); }
    videos.forEach(other => { if (other !== video) other.pause(); });
    try { await video.play(); } catch { sync(); }
  };
  ['play', 'pause', 'playing', 'waiting', 'loadeddata'].forEach(event => video.addEventListener(event, sync));
  video.addEventListener('error', () => { failed = true; sync(); });
  button.addEventListener('click', () => {
    if (video.paused || failed) play();
    else video.pause();
  });
  sync();
  if (!manualPlayback && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        play();
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    observer.observe(video);
  }
});
