// Blog Bioflora: busca, filtro por tema e carrossel
(function () {
  var norm = function (t) { return (t || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); };
  var rows = [].slice.call(document.querySelectorAll('.list .row'));
  var noresult = document.querySelector('.noresult');
  var filtro = document.querySelector('.filtro');
  var temas = { fitoterapicos: 'Fitoterápicos', pele: 'Pele', suplementos: 'Suplementos', mulher: 'Saúde da mulher', 'saude-bucal': 'Saúde bucal', manipulacao: 'Manipulação' };

  function aplicar(q, tema) {
    var termos = norm(q).split(/\s+/).filter(Boolean), vis = 0;
    rows.forEach(function (r) {
      var txt = norm(r.textContent + ' ' + r.dataset.busca);
      var ok = termos.every(function (t) { return txt.indexOf(t) > -1; }) &&
        (!tema || (' ' + r.dataset.tema + ' ').indexOf(' ' + tema + ' ') > -1);
      r.hidden = !ok; if (ok) vis++;
    });
    if (noresult) noresult.hidden = vis > 0;
    if (filtro) {
      var rotulo = q ? 'Resultados para “' + q + '”' : tema ? 'Tema: ' + (temas[tema] || tema) : '';
      filtro.hidden = !rotulo; filtro.querySelector('span').textContent = rotulo;
    }
  }

  var form = document.getElementById('busca');
  if (form && rows.length) {
    var p = new URLSearchParams(location.search), q = p.get('q') || '', tema = p.get('tema') || '';
    form.q.value = q;
    if (q || tema) aplicar(q, tema);
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = form.q.value.trim();
      history.replaceState(null, '', v ? '?q=' + encodeURIComponent(v) + '#guias' : location.pathname);
      aplicar(v, '');
      document.getElementById('guias').scrollIntoView({ behavior: 'smooth' });
    });
    form.q.addEventListener('input', function () { if (!form.q.value) aplicar('', ''); });
    if (filtro) filtro.querySelector('button').addEventListener('click', function () {
      form.q.value = ''; history.replaceState(null, '', location.pathname); aplicar('', '');
    });
  }

  // Carrossel
  var car = document.getElementById('carrossel');
  if (car) {
    var slides = [].slice.call(car.querySelectorAll('.slide')), dots = [].slice.call(car.querySelectorAll('.dots button')), i = 0, timer;
    var reduz = matchMedia('(prefers-reduced-motion: reduce)').matches;
    function ir(n) {
      i = (n + slides.length) % slides.length;
      slides.forEach(function (s, k) { s.classList.toggle('on', k === i); s.tabIndex = k === i ? 0 : -1; });
      dots.forEach(function (d, k) { d.classList.toggle('on', k === i); d.setAttribute('aria-selected', k === i); });
    }
    function play() { if (!reduz) { clearInterval(timer); timer = setInterval(function () { ir(i + 1); }, 5000); } }
    dots.forEach(function (d, k) { d.addEventListener('click', function () { ir(k); play(); }); });
    car.addEventListener('mouseenter', function () { clearInterval(timer); });
    car.addEventListener('mouseleave', play);
    var x0 = null;
    car.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    car.addEventListener('touchend', function (e) {
      if (x0 === null) return; var dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 40) { ir(i + (dx < 0 ? 1 : -1)); play(); }
    });
    ir(0); play();
  }
})();

// nav fica "vidro" ao rolar
(function(){var n=document.querySelector(".nav");if(!n)return;var f=function(){n.classList.toggle("stuck",scrollY>40)};addEventListener("scroll",f,{passive:true});f();})();

// Sumário: destaca a seção que está na tela
(function(){var links=[].slice.call(document.querySelectorAll('.toc a'));if(!links.length||!('IntersectionObserver' in window))return;
var mapa={};links.forEach(function(a){var id=a.getAttribute('href').slice(1),h=document.getElementById(id);if(h)mapa[id]=a;});
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){links.forEach(function(l){l.classList.remove('on')});var a=mapa[e.target.id];if(a)a.classList.add('on');}})},{rootMargin:'-120px 0px -65% 0px'});
Object.keys(mapa).forEach(function(id){io.observe(document.getElementById(id))});})();

// Botão "voltar ao topo"
(function(){var b=document.createElement('button');b.className='topo';b.type='button';b.setAttribute('aria-label','Voltar ao início da página');
b.innerHTML='<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
document.body.appendChild(b);b.addEventListener('click',function(){scrollTo({top:0,behavior:'smooth'})});
var f=function(){b.classList.toggle('on',scrollY>600)};addEventListener('scroll',f,{passive:true});f();})();

// Leia também: 1 artigo do mesmo tema + 2 aleatórios
(function(){var box=document.querySelector('.recs');if(!box)return;
var P=[
{u:'/saude-das-articulacoes',t:'Saúde das articulações: o guia completo',r:'Guia completo',img:'/img/capas/articulacoes.jpg',c:'foto',tema:'suplementos fitoterapicos'},
{u:'/passiflora-para-que-serve',t:'Passiflora: para que serve e como tomar',r:'Fitoterápico',img:'/img/capas/passiflora.jpg',c:'foto',tema:'fitoterapicos sono'},
{u:'/amora-para-menopausa',t:'Amora para menopausa',r:'Saúde da mulher',img:'/img/capas/amora.jpg',c:'foto',tema:'fitoterapicos mulher'},
{u:'/oleo-de-melaleuca-nos-dentes',t:'Óleo de melaleuca nos dentes',r:'Saúde bucal',img:'/img/capas/melaleuca.jpg',c:'foto',tema:'saude-bucal manipulacao'},
{u:'/farmacia-de-manipulacao-itajuba',t:'Farmácia de manipulação em Itajubá',r:'Manipulação',img:'/img/fachada.jpg',c:'foto',tema:'manipulacao'}];
var aqui=location.pathname.replace(/\.html$/,'').replace(/\/$/,'');var eu=P.filter(function(p){return p.u===aqui})[0];
var resto=P.filter(function(p){return p!==eu});var sh=function(l){return l.map(function(x){return[Math.random(),x]}).sort(function(a,b){return a[0]-b[0]}).map(function(x){return x[1]})};
var temas=eu?eu.tema.split(' '):['manipulacao'];
var rel=sh(resto).sort(function(a,b){var f=function(p){return p.tema.split(' ').filter(function(t){return temas.indexOf(t)>-1}).length};return f(b)-f(a)})[0];
var lista=[rel].concat(sh(resto.filter(function(p){return p!==rel})).slice(0,2));
box.innerHTML='<h2 class="cal">Leia também</h2><div class="recs-g">'+lista.map(function(p){return '<a class="rec '+p.c+'" href="'+p.u+'"><span class="im"><img src="'+p.img+'" alt="" loading="lazy"></span><span class="rot">'+p.r+'</span><b>'+p.t+'</b><span class="vai">Ler artigo →</span></a>'}).join('')+'</div>';})();
