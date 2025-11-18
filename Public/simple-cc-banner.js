!(function () {
  const t = 'calbie_cookie_consent_status',
    e = (t) => document.querySelector(`[data-calbie-cc="${t}"]`);
  function n() {
    console.log(
      '%cSUCCESS: Third-party scripts loaded (GA, Meta Pixel).',
      'color: #A8E800; font-weight: bold;'
    );
  }
  function c() {
    (window.dataLayer = {
      push: () => console.log('Data Layer push blocked.'),
    }),
      (window.gtag = () => {}),
      (window.fbq = () => {}),
      console.log(
        '%cBLOCKED: Non-essential tracking scripts prevented.',
        'color: #FF6347; font-weight: bold;'
      );
  }
  function o(t) {
    t && (t.style.display = 'none');
  }
  function i(t) {
    t && (t.style.display = 'block');
  }
  function s(t) {
    const n = e('banner');
    if (!n)
      return console.error(
        'CRITICAL ERROR: Cookie banner element (data-calbie-cc="banner") not found.'
      );
    'accepted' === t ? (o(n), n()) : 'declined' === t ? (o(n), c()) : i(n);
  }
  function a(t) {
    const n = e('banner');
    if (!n)
      return console.error(
        'CRITICAL ERROR: Cookie banner element (data-calbie-cc="banner") not found.'
      );
    'accepted' === t ? (o(n), n()) : 'declined' === t ? (o(n), c()) : i(n);
  }
  function l() {
    const n = e('banner'),
      c = e('accept'),
      o = e('decline'),
      i = e('open-settings');
    if (!n || !c || !o)
      return console.error(
        'CRITICAL ERROR: Essential banner elements missing from DOM.'
      );
    c.addEventListener('click', (t) => {
      t.preventDefault(),
        localStorage.setItem(t, 'accepted'),
        o(n),
        a('accepted');
    }),
      o.addEventListener('click', (t) => {
        t.preventDefault(),
          localStorage.setItem(t, 'declined'),
          o(n),
          a('declined');
      }),
      i &&
        i.addEventListener('click', (t) => {
          t.preventDefault(), i(n);
        });
    const s = localStorage.getItem(t);
    a(s);
  }
  document.addEventListener('DOMContentLoaded', l);
})();
