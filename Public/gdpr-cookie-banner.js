document.addEventListener('DOMContentLoaded', () => {
  const e = document.querySelector('[data-cookie-consent="banner"]'),
    t = document.querySelector('[data-cookie-consent="preferences-popup"]'),
    o = document.querySelector('[data-cookie-consent="accept-button"]'),
    n = document.querySelector('[data-cookie-consent="decline-button"]'),
    s = document.querySelector('[data-cookie-consent="manage-preferences"]'),
    l = document.querySelector('[data-cookie-consent="save-preferences"]'),
    r = document.querySelector('[data-cookie-consent="close-preferences"]'),
    a = document.querySelector('[data-cookie-consent="open-settings"]'),
    c = document.querySelector('[data-cookie-category="analytics"]'),
    i = document.querySelector('[data-cookie-category="marketing"]'),
    d = 'calbie_cookie_consent_preferences',
    y = {
      status: 'pending',
      categories: { essential: !0, analytics: !1, marketing: !1 },
    };
  function u() {
    e && (e.style.display = 'none'), t && (t.style.display = 'none');
  }
  function g() {
    e &&
      ((e.style.display = 'block'),
      (e.style.position = 'fixed'),
      (e.style.bottom = '0'),
      (e.style.left = '0'),
      (e.style.width = '100%'),
      (e.style.zIndex = '9999'),
      (e.style.padding = '20px'),
      (e.style.backgroundColor = '#000711'),
      (e.style.color = '#FFFFFF'),
      (e.style.textAlign = 'center'),
      (e.style.boxShadow = '0 -2px 10px rgba(0,0,0,0.1)'),
      (e.style.borderRadius = '8px 8px 0 0'));
  }
  function p() {
    t &&
      ((t.style.display = 'block'),
      (t.style.position = 'fixed'),
      (t.style.top = '50%'),
      (t.style.left = '50%'),
      (t.style.transform = 'translate(-50%, -50%)'),
      (t.style.width = '90%'),
      (t.style.maxWidth = '500px'),
      (t.style.zIndex = '10000'),
      (t.style.padding = '30px'),
      (t.style.backgroundColor = '#0C1A31'),
      (t.style.color = '#FFFFFF'),
      (t.style.borderRadius = '12px'),
      (t.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)'));
  }
  function b(e) {
    if (e.categories.analytics) {
      (window.dataLayer = window.dataLayer || []),
        (function () {
          dataLayer.push(arguments);
        })('js', new Date()),
        console.log('Google Analytics (Webflow built-in) enabled.');
    } else
      (window.dataLayer = { push: function () {} }),
        (window.gtag = function () {}),
        console.log('Google Analytics (Webflow built-in) blocked.');
    var t, o, n, s, l, r;
    e.categories.marketing
      ? ((t = window),
        (o = document),
        (n = 'script'),
        t.fbq ||
          ((s = t.fbq =
            function () {
              s.callMethod
                ? s.callMethod.apply(s, arguments)
                : s.queue.push(arguments);
            }),
          t._fbq || (t._fbq = s),
          (s.push = s),
          (s.loaded = !0),
          (s.version = '2.0'),
          (s.queue = []),
          ((l = o.createElement(n)).async = !0),
          (l.src = 'https://connect.facebook.net/en_US/fbevents.js'),
          (r = o.getElementsByTagName(n)[0]).parentNode.insertBefore(l, r)),
        console.log('Meta Pixel (Webflow built-in) enabled.'))
      : ((window.fbq = function () {}),
        (window._fbq = window.fbq),
        console.log('Meta Pixel (Webflow built-in) blocked.')),
      e.categories.functional
        ? console.log('Google Maps (Webflow built-in) enabled (if configured).')
        : ((window.initMap = function () {
            console.log('Google Maps initialization blocked.');
          }),
          console.log('Google Maps (Webflow built-in) blocked.')),
      console.log('All scripts managed based on preferences:', e);
  }
  function k() {
    const e = JSON.parse(localStorage.getItem(d)) || y;
    c && (c.checked = e.categories.analytics),
      i && (i.checked = e.categories.marketing);
  }
  o &&
    ((o.style.backgroundColor = '#A8E800'),
    (o.style.color = '#000711'),
    (o.style.border = 'none'),
    (o.style.padding = '12px 24px'),
    (o.style.borderRadius = '8px'),
    (o.style.cursor = 'pointer'),
    (o.style.margin = '0 10px'),
    (o.style.fontWeight = 'bold'),
    (o.style.transition = 'background-color 0.3s ease'),
    o.addEventListener(
      'mouseenter',
      () => (o.style.backgroundColor = 'rgba(168, 232, 0, 0.5)')
    ),
    o.addEventListener(
      'mouseleave',
      () => (o.style.backgroundColor = '#A8E800')
    ),
    o.addEventListener('click', () => {
      const e = {
        status: 'accepted',
        categories: { essential: !0, analytics: !0, marketing: !0 },
      };
      localStorage.setItem(d, JSON.stringify(e)), u(), b(e);
    })),
    n &&
      ((n.style.backgroundColor = '#0C1A31'),
      (n.style.color = '#FFFFFF'),
      (n.style.border = '1px solid #09ADC3'),
      (n.style.padding = '12px 24px'),
      (n.style.borderRadius = '8px'),
      (n.style.cursor = 'pointer'),
      (n.style.margin = '0 10px'),
      (n.style.fontWeight = 'bold'),
      (n.style.transition =
        'background-color 0.3s ease, border-color 0.3s ease'),
      n.addEventListener('mouseenter', () => {
        (n.style.backgroundColor = 'rgba(9, 173, 195, 0.2)'),
          (n.style.borderColor = '#09ADC3');
      }),
      n.addEventListener('mouseleave', () => {
        (n.style.backgroundColor = '#0C1A31'),
          (n.style.borderColor = '#09ADC3');
      }),
      n.addEventListener('click', () => {
        const e = {
          status: 'declined',
          categories: { essential: !0, analytics: !1, marketing: !1 },
        };
        localStorage.setItem(d, JSON.stringify(e)), u(), b(e);
      })),
    s &&
      ((s.style.backgroundColor = '#0C1A31'),
      (s.style.color = '#09ADC3'),
      (s.style.border = '1px solid #09ADC3'),
      (s.style.padding = '12px 24px'),
      (s.style.borderRadius = '8px'),
      (s.style.cursor = 'pointer'),
      (s.style.margin = '0 10px'),
      (s.style.fontWeight = 'bold'),
      (s.style.transition = 'background-color 0.3s ease, color 0.3s ease'),
      s.addEventListener('mouseenter', () => {
        (s.style.backgroundColor = 'rgba(9, 173, 195, 0.2)'),
          (s.style.color = '#FFFFFF');
      }),
      s.addEventListener('mouseleave', () => {
        (s.style.backgroundColor = '#0C1A31'), (s.style.color = '#09ADC3');
      }),
      s.addEventListener('click', () => {
        hideBanner(), k(), p();
      })),
    l &&
      ((l.style.backgroundColor = '#A8E800'),
      (l.style.color = '#000711'),
      (l.style.border = 'none'),
      (l.style.padding = '12px 24px'),
      (l.style.borderRadius = '8px'),
      (l.style.cursor = 'pointer'),
      (l.style.margin = '20px 10px 0 0'),
      (l.style.fontWeight = 'bold'),
      l.addEventListener(
        'mouseenter',
        () => (l.style.backgroundColor = 'rgba(168, 232, 0, 0.5)')
      ),
      l.addEventListener(
        'mouseleave',
        () => (l.style.backgroundColor = '#A8E800')
      ),
      l.addEventListener('click', function () {
        const e = {
          status: 'custom',
          categories: {
            essential: !0,
            analytics: !!c && c.checked,
            marketing: !!i && i.checked,
          },
        };
        localStorage.setItem(d, JSON.stringify(e)),
          u(),
          b(e),
          console.log('Preferences saved:', e);
      })),
    r &&
      ((r.style.backgroundColor = 'transparent'),
      (r.style.color = '#FFFFFF'),
      (r.style.border = '1px solid #FFFFFF'),
      (r.style.padding = '12px 24px'),
      (r.style.borderRadius = '8px'),
      (r.style.cursor = 'pointer'),
      (r.style.margin = '20px 0 0 10px'),
      (r.style.fontWeight = 'bold'),
      r.addEventListener(
        'mouseenter',
        () => (r.style.backgroundColor = 'rgba(255, 255, 255, 0.2)')
      ),
      r.addEventListener(
        'mouseleave',
        () => (r.style.backgroundColor = 'transparent')
      ),
      r.addEventListener('click', () => {
        u();
        const e = JSON.parse(localStorage.getItem(d));
        (e && 'pending' !== e.status) || g();
      })),
    a &&
      ((a.style.color = '#09ADC3'),
      (a.style.textDecoration = 'underline'),
      (a.style.cursor = 'pointer'),
      a.addEventListener('click', (e) => {
        e.preventDefault(), u(), k(), p();
      }));
  let f = JSON.parse(localStorage.getItem(d));
  f && f.status
    ? ((f.categories = { ...y.categories, ...(f.categories || {}) }), u(), b(f))
    : (g(), localStorage.setItem(d, JSON.stringify(y)));
});
