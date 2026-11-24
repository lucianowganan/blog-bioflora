// Formulários de material grátis (isca): <form data-isca="articulacoes">
(function () {
  var URL = 'https://gbbjpltqmbhlfluqhrmg.supabase.co/functions/v1/blog-isca';
  document.querySelectorAll('form[data-isca]').forEach(function (f) {
    var box = f.closest('.isca') || f;
    var input = f.querySelector('input[type=email]');
    var btn = f.querySelector('button');
    var msg = box.querySelector('.isca-msg');
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!input.value || !input.checkValidity()) { if (msg) msg.textContent = 'Digite um e-mail válido.'; return; }
      btn.disabled = true; var t = btn.textContent; btn.textContent = 'Enviando…';
      fetch(URL, { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: input.value, isca: f.dataset.isca, origem: location.pathname }) })
        .then(function (r) { return r.json(); })
        .then(function (d) {
          if (d && d.ok && d.enviado === false && d.motivo) { if (msg) msg.textContent = 'Acabamos de enviar o guia para este e-mail. Confira a caixa de entrada e o spam (dá para pedir de novo em 10 minutos).'; }
          else if (d && d.ok) { box.classList.add('feito'); }
          else if (msg) { msg.textContent = 'Confira o e-mail digitado e tente de novo.'; }
        })
        .catch(function () { if (msg) msg.textContent = 'Não conseguimos enviar agora. Tente de novo em instantes.'; })
        .finally(function () { btn.disabled = false; btn.textContent = t; });
    });
  });
})();
