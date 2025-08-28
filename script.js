// Atualiza ano no rodapé
document.getElementById('year').textContent = new Date().getFullYear();

// Copiar e-mail do botão
document.querySelectorAll('.btn.copy').forEach(btn => {
  btn.addEventListener('click', async () => {
    const value = btn.getAttribute('data-copy');
    try{
      await navigator.clipboard.writeText(value);
      const original = btn.textContent.trim();
      btn.textContent = 'Copiado!';
      setTimeout(()=> (btn.textContent = original), 1500);
    }catch(e){
      alert('Não foi possível copiar agora.');
    }
  });
});