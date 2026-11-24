// Banners do Blog Bioflora: edite só esta lista para trocar as propagandas.
// formato: "v" = vertical (lateral dos posts) · "h" = horizontal (faixa entre seções)
// Para usar arte pronta do design: arte: { v: { src: '/img/banners/x-v.webp' }, h: { src: '/img/banners/x-h.webp', mobile: '/img/banners/x-h-mobile.webp' } }
(function () {
  var Y = 'https://images.yampi.me/assets/stores/farmacia-bioflora/uploads/images/';
  var BANNERS = [
    { id: 'amora', rotulo: 'Da nossa loja', cor: 'laranja', titulo: 'Amora 600mg', texto: 'Extrato da folha, manipulado em Itajubá.', cta: 'Ver na loja →',
      img: '/img/produtos/amora.png',
      url: 'https://www.farmaciabioflora.com.br/amora-600mg-alivia-os-sintomas-da-menopausa-6360117d90bd2/p' },
    { id: 'melaleuca', rotulo: 'Da nossa loja', cor: 'prata', titulo: 'Enxaguatório com melaleuca', texto: 'Antisséptico na diluição certa para o dia a dia.', cta: 'Ver na loja →',
      img: '/img/produtos/melaleuca.png',
      url: 'https://www.farmaciabioflora.com.br/enxaguatorio-bucal-com-oe-melaleuca-antisseptico/p' },
    { id: 'whatsapp', rotulo: 'Bioflora', cor: 'vinho', titulo: 'Tem uma receita?', texto: 'Mande a foto pelo WhatsApp e receba o orçamento na hora.', cta: 'Pedir pelo WhatsApp →',
      img: null, url: 'https://www.farmaciabioflora.com.br/atendimento/pedidos-whatsapp' },
    { id: 'magnesio', rotulo: 'Da nossa loja', cor: 'laranja2', titulo: 'Blend 6 Magnésios', texto: 'Seis tipos de magnésio em uma cápsula.', cta: 'Ver na loja →',
      img: '/img/produtos/magnesio.png',
      url: 'https://www.farmaciabioflora.com.br/blend-6-magnesios/p' }
    ,{ id: 'passiflora', rotulo: 'Da nossa loja', cor: 'roxo', titulo: 'Passiflora 300mg', texto: 'Extrato da flor do maracujá, para usar à noite.', cta: 'Ver na loja →',
      img: '/img/produtos/passiflora.png', url: 'https://www.farmaciabioflora.com.br/passiflora-maracuja-300mg-com-60-capsulas/p' }
    ,{ id: 'colageno2', rotulo: 'Da nossa loja', cor: 'laranja', titulo: 'Colágeno Tipo II 40mg', texto: 'Não desnaturado, uma cápsula ao dia.', cta: 'Ver na loja →',
      img: '/img/produtos/colageno2.png', url: 'https://www.farmaciabioflora.com.br/colageno-tipo-2-generico-uc-ll/p' }
  ];

  function el(b, formato) {
    var a = document.createElement('a');
    var arte = b.arte && b.arte[formato];
    if (arte) { // banner em arte fechada (imagem pronta do design)
      a.className = 'ad ad-arte ad-' + formato; a.href = b.url; a.target = '_blank'; a.rel = 'noopener sponsored'; a.dataset.banner = b.id;
      a.innerHTML = '<picture>' + (arte.mobile ? '<source media="(max-width:700px)" srcset="' + arte.mobile + '">' : '') +
        '<img src="' + arte.src + '" alt="' + b.titulo + '" loading="lazy"></picture>';
      return a;
    }
    a.className = 'ad ad-' + formato + ' ' + b.cor;
    a.href = b.url; a.target = '_blank'; a.rel = 'noopener sponsored';
    a.dataset.banner = b.id;
    a.innerHTML = '<span class="txt"><span class="rot">' + b.rotulo + '</span><b>' + b.titulo + '</b><span class="t">' + b.texto + '</span>' +
      '<span class="cta-ad">' + b.cta + '</span></span>' +
      (b.img ? '<span class="foto"><img src="' + b.img + '" alt="" loading="lazy"></span>' : '');
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
    if (slot.dataset.produtos) { // só produtos do tema da página
      slot.dataset.produtos.split(' ').forEach(function (id) {
        var b = BANNERS.filter(function (x) { return x.id === id; })[0]; if (b) slot.appendChild(el(b, formato));
      });
      return;
    }
    for (var k = 0; k < n; k++) slot.appendChild(el(escolher(slot.dataset.excluir), formato));
  });
})();
