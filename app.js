document.querySelectorAll('.motion').forEach((button, index) => {
  const video = button.closest('.media').querySelector('video');
  if (!video) return;
  button.type = 'button';
  const sync = () => {
    const paused = video.paused;
    button.setAttribute('aria-pressed', String(paused));
    button.setAttribute('aria-label', `${paused ? '播放' : '暂停'}项目${index + 1}视频`);
    button.textContent = paused ? '▷ 播放' : 'Ⅱ 暂停';
  };
  video.addEventListener('play', sync);
  video.addEventListener('pause', sync);
  video.addEventListener('error', () => {
    button.textContent = '视频加载失败';
    button.disabled = true;
  });
  button.addEventListener('click', async () => {
    if (video.paused) {
      try { await video.play(); } catch { video.controls = true; }
    } else {
      video.pause();
    }
    sync();
  });
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    video.autoplay = false;
    video.pause();
  }
  sync();
});