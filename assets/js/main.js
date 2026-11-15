(function () {
  function ready(fn){ if(document.readyState !== "loading") fn(); else document.addEventListener("DOMContentLoaded", fn); }

  ready(function(){
    var sidebar = document.querySelector('.homepage .sidebar');
    var toggle = document.querySelector('.sidebar-toggle');
    var navLinks = Array.prototype.slice.call(document.querySelectorAll('.sidebar nav a[href^="#"]'));
    var sections = navLinks.map(function(a){ try { return document.querySelector(a.getAttribute('href')); } catch(e){ return null; } }).filter(Boolean);

    if (toggle && sidebar) {
      toggle.addEventListener('click', function(){
        var open = sidebar.classList.toggle('active');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    }

    navLinks.forEach(function(link){
      link.addEventListener('click', function(){
        navLinks.forEach(function(l){ l.classList.remove('active'); });
        link.classList.add('active');
        if (sidebar && sidebar.classList.contains('active') && toggle) {
          sidebar.classList.remove('active');
          toggle.setAttribute('aria-expanded','false');
        }
      });
    });

    if ('IntersectionObserver' in window && sections.length) {
      var byId = {};
      navLinks.forEach(function(a){ var id = a.getAttribute('href').slice(1); byId[id]=a; });
      var io = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if (entry.isIntersecting) {
            navLinks.forEach(function(l){ l.classList.remove('active'); });
            var link = byId[entry.target.id];
            if (link) link.classList.add('active');
          }
        });
      }, { rootMargin: '-35% 0px -55% 0px', threshold: 0.01 });
      sections.forEach(function(s){ io.observe(s); });
    }

    var getStarted = document.querySelector('.get-started');
    if (getStarted) {
      getStarted.addEventListener('click', function(e){
        var href = getStarted.getAttribute('href');
        if (href && href.charAt(0) === '#') {
          var target = document.querySelector(href);
          if (target) { e.preventDefault(); target.scrollIntoView({behavior:'smooth'}); }
        }
      });
    }

    if (window.Typed && document.getElementById('typed')) {
      var isEnglish = (document.documentElement.lang || '').toLowerCase().indexOf('en') === 0;
      new Typed('#typed', {
        strings: isEnglish ? ['Front-End Developer', 'UI Developer', 'JavaScript Developer'] : ['Front-End Developer', 'UI Geliştirici', 'JavaScript Geliştirici'],
        typeSpeed: 55, backSpeed: 35, backDelay: 1600, loop: true
      });
    }

    function initIso(){
      if (!window.jQuery || !jQuery.fn.isotope) return;
      var $grid = jQuery('.grid');
      if (!$grid.length) return;
      var PER_PAGE = 6;
      var activeCategory = '*';
      var $items = $grid.find('.element-item');
      $items.each(function(i){
        jQuery(this).toggleClass('is-hidden-project', i >= PER_PAGE).toggleClass('is-shown', i < PER_PAGE);
      });
      function filterFn(){
        var $it = jQuery(this);
        if (activeCategory !== '*') return $it.is(activeCategory);
        return $it.hasClass('is-shown');
      }
      $grid.isotope({ itemSelector: '.element-item', layoutMode: 'fitRows', percentPosition: true, filter: filterFn });

      var $loadMore = jQuery('#load-more');
      function updateLoadMore(){
        if (!$loadMore.length) return;
        var hidden = $items.filter('.is-hidden-project').length;
        var show = activeCategory === '*' && hidden > 0;
        $loadMore.toggle(show);
        if (show) {
          var isEn = (document.documentElement.lang || 'tr').toLowerCase().indexOf('en') === 0;
          $loadMore.text(isEn ? ('Show More (' + hidden + ')') : ('Daha Fazla Göster (' + hidden + ')'));
        }
      }

      jQuery('.filter-button-group').on('click', 'button', function(){
        jQuery(this).addClass('active').siblings().removeClass('active');
        activeCategory = jQuery(this).attr('data-filter') || '*';
        $grid.isotope({ filter: filterFn });
        updateLoadMore();
      });

      $loadMore.on('click', function(){
        $items.filter('.is-hidden-project').slice(0, PER_PAGE).removeClass('is-hidden-project').addClass('is-shown');
        $grid.isotope({ filter: filterFn });
        updateLoadMore();
      });

      updateLoadMore();
    }
    if (window.jQuery) { jQuery(initIso); } else { window.addEventListener('load', initIso); }
  });

  function hideLoader(){
    var loading = document.querySelector('.loading');
    if (loading) {
      loading.classList.add('endLoading');
      setTimeout(function(){ loading.style.display='none'; }, 600);
    }
  }
  window.addEventListener('load', hideLoader);
  document.addEventListener('DOMContentLoaded', function(){ setTimeout(hideLoader, 2500); });
})();
