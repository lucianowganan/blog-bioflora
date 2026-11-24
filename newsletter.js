// Inscrição na newsletter do Blog Bioflora → Supabase (hub-bioflora), RPC blog_newsletter_inscrever
(function () {
  var URL = 'https://gbbjpltqmbhlfluqhrmg.supabase.co/rest/v1/rpc/blog_newsletter_inscrever';
  var KEY = 'sb_publishable_a_t-5SMQWML0AQ8muZv6Qg_jYYEIFeP';
  document.querySelectorAll('form[data-newsletter]').forEach(function (f) {
    var input = f.querySelector('input[type=email]');
    var btn = f.querySelector('button');
    var msg = document.createElement('p');
    msg.className = 'news-msg';
    msg.setAttribute('role', 'status');
    f.after(msg);
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!input.checkValidity() || !input.value) { msg.textContent = 'Digite um e-mail válido.'; return; }
      btn.disabled = true; var t = btn.textContent; btn.textContent = 'Enviando…';
      fetch(URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', apikey: KEY, Authorization: 'Bearer ' + KEY },
        body: JSON.stringify({ p_email: input.value, p_origem: location.pathname })
      }).then(function (r) { return r.json(); }).then(function (d) {
        if (d && d.ok) { f.reset(); msg.textContent = ''; var box = f.closest('.news'); if (box) box.classList.add('feito'); else msg.textContent = 'Inscrição confirmada! 💚'; }
        else { msg.textContent = 'Confira o e-mail digitado e tente de novo.'; }
      }).catch(function () { msg.textContent = 'Não conseguimos enviar agora. Tente de novo em instantes.'; })
        .finally(function () { btn.disabled = false; btn.textContent = t; });
    });
  });
})();
