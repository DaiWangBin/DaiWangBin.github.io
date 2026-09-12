document.querySelectorAll('.motion').forEach((button,index)=>{
  const image=button.parentElement.querySelector('img');
  const setPaused=paused=>{
    image.src=paused?image.dataset.still:image.dataset.motion;
    button.setAttribute('aria-pressed',String(paused));
    button.setAttribute('aria-label',`${paused?'播放':'暂停'}项目${index+1}动图`);
    button.textContent=paused?'▷ 播放':'Ⅱ 暂停';
  };
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)setPaused(true);
  button.addEventListener('click',()=>setPaused(button.getAttribute('aria-pressed')!=='true'));
});
