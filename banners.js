// Banners do Blog Bioflora: edite só esta lista para trocar as propagandas.
// formato: "v" = vertical (lateral dos posts) · "h" = horizontal (faixa entre seções)
(function () {
  var Y = 'https://images.yampi.me/assets/stores/farmacia-bioflora/uploads/images/';
  var BANNERS = [
    { id: 'amora', rotulo: 'Da nossa loja', cor: 'rosa', titulo: 'Amora 600mg', texto: 'Extrato da folha, manipulado em Itajubá.', cta: 'Ver na loja →',
      img: Y + 'amora-600mg-alivia-os-sintomas-da-menopausa-648dae7dc664b-large.jpg',
      url: 'https://www.farmaciabioflora.com.br/amora-600mg-alivia-os-sintomas-da-menopausa-6360117d90bd2/p' },
    { id: 'melaleuca', rotulo: 'Da nossa loja', cor: 'verde', titulo: 'Enxaguatório com melaleuca', texto: 'Antisséptico na diluição certa para o dia a dia.', cta: 'Ver na loja →',
      img: Y + 'enxaguatorio-bucal-com-oe-melaleuca-antisseptico-500ml-64219145cdaeb-large.jpg',
      url: 'https://www.farmaciabioflora.com.br/enxaguatorio-bucal-com-oe-melaleuca-antisseptico/p' },
    { id: 'whatsapp', rotulo: 'Bioflora', cor: 'vinho', titulo: 'Tem uma receita?', texto: 'Mande a foto pelo WhatsApp e receba o orçamento na hora.', cta: 'Pedir pelo WhatsApp →',
      img: null, url: 'https://www.farmaciabioflora.com.br/atendimento/pedidos-whatsapp' },
    { id: 'magnesio', rotulo: 'Da nossa loja', cor: 'escuro', titulo: 'Blend 6 Magnésios', texto: 'Seis tipos de magnésio em uma cápsula.', cta: 'Ver na loja →',
      img: Y + 'blend-6-magnesio-30-capsulas-65ae51b9a5dd7-large.jpg',
      url: 'https://www.farmaciabioflora.com.br/blend-6-magnesios/p' }
  ];

  function el(b, formato) {
    var a = document.createElement('a');
    a.className = 'ad ad-' + formato + ' ' + b.cor;
    a.href = b.url; a.target = '_blank'; a.rel = 'noopener sponsored';
    a.dataset.banner = b.id;
    a.innerHTML = '<span class="rot">' + b.rotulo + '</span>' +
      (b.img ? '<img src="' + b.img + '" alt="" loading="lazy">' : '') +
      '<span class="txt"><b>' + b.titulo + '</b><span class="t">' + b.texto + '</span>' +
      (formato === 'v' ? '<span class="cta-ad">' + b.cta + '</span>' : '') + '</span>' +
      (formato === 'h' ? '<span class="cta-ad">' + b.cta + '</span>' : '');
    return a;
  }

  var usados = {};
  function escolher(excluir) {
    var lista = BANNERS.filter(function (b) { return !usados[b.id] && b.id !== excluir; });
    if (!lista.length) { usados = {}; lista = BANNERS; }
    var b = lista[Math.floor(Math.random() * lista.length)];
    usados[b.id] = 1; return b;
  }

  document.querySelectorAll('[data-ad]').forEach(function (slot) {
    var formato = slot.dataset.ad, n = +(slot.dataset.qtd || 1);
    for (var k = 0; k < n; k++) slot.appendChild(el(escolher(slot.dataset.excluir), formato));
  });
})();
