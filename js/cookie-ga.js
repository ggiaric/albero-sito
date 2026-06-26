/* Banner cookie + Google Analytics 4 con consenso preventivo (GDPR) */
(function () {
  var GA_ID = 'G-QN8WBBPRBR';
  var KEY = 'af_cookie_consent';

  function loadGA() {
    if (window.__gaLoaded) return;
    window.__gaLoaded = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_ID, { anonymize_ip: true });
  }

  function hideBanner() {
    var b = document.getElementById('cookie-banner');
    if (b) b.parentNode.removeChild(b);
  }

  function setConsent(v) {
    try { localStorage.setItem(KEY, v); } catch (e) {}
    hideBanner();
    if (v === 'accept') loadGA();
  }

  function showBanner() {
    var b = document.createElement('div');
    b.id = 'cookie-banner';
    b.className = 'cookie-banner';
    b.setAttribute('role', 'dialog');
    b.innerHTML =
      '<p>Usiamo cookie tecnici e, con il tuo consenso, Google Analytics per statistiche anonime. ' +
      'Vedi la <a href="privacy.html">Privacy &amp; Cookie</a>.</p>' +
      '<div class="cookie-actions">' +
      '<button type="button" class="btn btn--outline" id="cookie-reject">Rifiuta</button>' +
      '<button type="button" class="btn btn--gold" id="cookie-accept">Accetta</button>' +
      '</div>';
    document.body.appendChild(b);
    document.getElementById('cookie-accept').onclick = function () { setConsent('accept'); };
    document.getElementById('cookie-reject').onclick = function () { setConsent('reject'); };
  }

  var c = null;
  try { c = localStorage.getItem(KEY); } catch (e) {}

  if (c === 'accept') {
    loadGA();
  } else if (c === 'reject') {
    /* niente: consenso negato */
  } else {
    if (document.body) showBanner();
    else document.addEventListener('DOMContentLoaded', showBanner);
  }
})();
