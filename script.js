// ====== Typewriter (leve)
(function() {
  const el = document.getElementById('typewriter');
  if (!el) return;
  const text = el.getAttribute('data-text');
  let i = 0;

  function type() {
    if (i < text.length) {
      el.textContent = text.substring(0, i + 1);
      i++;
      setTimeout(type, 100);
    }
  }
  type();
})();

// ====== Scroll reveal
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); }
  });
},{ threshold:.12 });
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// ====== Copy e-mail
document.querySelectorAll('.copy').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const text = btn.getAttribute('data-copy');
    navigator.clipboard.writeText(text).then(()=>{
      btn.classList.add('ok');
      btn.textContent = 'Copiado!';
      setTimeout(()=>{ btn.textContent = text; btn.classList.remove('ok'); }, 1100);
    });
  });
});

// ====== Ano rodapé
document.getElementById('year').textContent = new Date().getFullYear();

// ====== Fundo animado (partículas leves)
(function(){
  const c = document.getElementById('bg');
  const ctx = c.getContext('2d', { alpha:true });
  let dpr = Math.min(2, window.devicePixelRatio || 1);
  let w, h, particles;
  const COUNT = 200;
  const SPEED = 1.25;

  function resize(){
    w = c.clientWidth; h = c.clientHeight;
    c.width = Math.floor(w * dpr);
    c.height = Math.floor(h * dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);
    // cria partículas
    particles = Array.from({length:COUNT}, ()=>({
      x: Math.random()*w,
      y: Math.random()*h,
      vx: (Math.random()-.5)*SPEED,
      vy: (Math.random()-.5)*SPEED,
      r: 1 + Math.random()*1.8
    }));
  }

  function step(){
    ctx.clearRect(0,0,w,h);
    // linhas suaves
    for(let i=0;i<particles.length;i++){
      const p = particles[i];
      // move
      p.x += p.vx; p.y += p.vy;
      if(p.x < -50) p.x = w+50; if(p.x > w+50) p.x = -50;
      if(p.y < -50) p.y = h+50; if(p.y > h+50) p.y = -50;

      // desenha ponto
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fillStyle = 'rgba(94,234,212,.55)';
      ctx.fill();

      // conecta vizinhos próximos
      for(let j=i+1;j<particles.length;j++){
        const q = particles[j];
        const dx = p.x - q.x, dy = p.y - q.y;
        const dist = Math.hypot(dx, dy);
        if(dist < 110){
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(56,189,248,${(1 - dist/110) * .18})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(step);
  }

  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', (e)=>{
    // leve parallax no fundo
    const cx = (e.clientX / w - .5) * 6;
    const cy = (e.clientY / h - .5) * 6;
    c.style.transform = `translate(${cx}px, ${cy}px)`;
  });
  resize(); step();
})();
