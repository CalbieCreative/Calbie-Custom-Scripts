// simple-cookie-banner.js
document.addEventListener('DOMContentLoaded', () => {
  // --- DOM Elements ---
  const consentBanner = document.querySelector(
    '[data-cookie-consent="banner"]'
  );
  const acceptButton = document.querySelector(
    '[data-cookie-consent="accept-button"]'
  );
  const declineButton = document.querySelector(
    '[data-cookie-consent="decline-button"]'
  );
  const openSettingsLink = document.querySelector(
    '[data-cookie-consent="open-settings"]'
  );

  // --- Constants ---
  const CONSENT_KEY = 'calbie_cookie_consent_status'; // Key for localStorage

  // --- Helper Functions ---

  /**
   * Dynamically loads a script into the document head.
   * @param {string} src - The URL of the script.
   * @param {string} id - An ID for the script element.
   * @param {boolean} [async=true] - Whether the script should load asynchronously.
   * @param {boolean} [defer=true] - Whether the script should defer execution.
   */
  function loadScript(src, id, async = true, defer = true) {
    if (document.getElementById(id)) return; // Prevent duplicate loading

    const script = document.createElement('script');
    script.src = src;
    script.id = id;
    script.async = async;
    script.defer = defer;
    document.head.appendChild(script);
    console.log(`Script loaded: ${src}`);
  }

  /**
   * Hides the cookie consent banner.
   */
  function hideBanner() {
    if (consentBanner) {
      consentBanner.style.display = 'none';
    }
  }

  /**
   * Shows the cookie consent banner.
   */
  function showBanner() {
    if (consentBanner) {
      consentBanner.style.display = 'block'; // Use 'flex' or 'grid' if your Webflow layout is set that way
      // Basic inline styles for visibility, override these in Webflow Designer
      consentBanner.style.position = 'fixed';
      consentBanner.style.bottom = '0';
      consentBanner.style.left = '0';
      consentBanner.style.width = '100%';
      consentBanner.style.zIndex = '9999';
      consentBanner.style.padding = '20px';
      consentBanner.style.backgroundColor = '#000711'; // Calbie Content Dark Navy
      consentBanner.style.color = '#FFFFFF'; // Calbie Content White
      consentBanner.style.textAlign = 'center';
      consentBanner.style.boxShadow = '0 -2px 10px rgba(0,0,0,0.1)';
      consentBanner.style.borderRadius = '8px 8px 0 0'; // Rounded top corners
    }
  }

  /**
   * Loads essential third-party scripts.
   * IMPORTANT: You MUST remove the original <script> tags for these services from your Webflow custom code.
   */
  function loadEssentialScripts() {
    // Example: Google Analytics
    // Ensure your GA tracking ID is configured in Webflow's project settings.
    // Webflow typically handles gtag.js loading itself if the ID is present.
    // We ensure gtag is initialized here if it's not already.
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag('js', new Date());
    // Replace 'YOUR_GA_TRACKING_ID' with your actual GA ID from Webflow settings if you're not relying on Webflow's auto-init
    // gtag('config', 'YOUR_GA_TRACKING_ID');
    console.log('Google Analytics (Webflow built-in) enabled.');

    // Example: Meta Pixel
    // Replace 'YOUR_META_PIXEL_ID' with your actual Meta Pixel ID from Webflow settings
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod
          ? n.callMethod.apply(n, arguments)
          : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(
      window,
      document,
      'script',
      'https://connect.facebook.net/en_US/fbevents.js'
    );
    // fbq('init', 'YOUR_META_PIXEL_ID'); // Replace with your actual Meta Pixel ID
    // fbq('track', 'PageView');
    console.log('Meta Pixel (Webflow built-in) enabled.');

    // Example: Google Maps (if you have a map element that needs to load)
    // This assumes your map element has an ID like 'my-google-map'
    // and that you've removed the original Google Maps API script tag from Webflow.
    // Replace 'YOUR_GOOGLE_MAPS_API_KEY' with your actual API key.
    // You might also need to ensure the map div is visible before initializing.
    // loadScript(`https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&callback=initMap`, 'google-maps-script', true, true);
    // window.initMap = function() {
    //     const mapElement = document.getElementById('my-google-map');
    //     if (mapElement) {
    //         const map = new google.maps.Map(mapElement, {
    //             center: { lat: -34.397, lng: 150.644 },
    //             zoom: 8,
    //         });
    //     }
    // };
    console.log('Google Maps (Webflow built-in) enabled (if configured).');

    // --- External Scripts (PLACE YOUR CONSENT-DEPENDENT SCRIPTS HERE) ---
    // Example: A custom analytics script
    // loadScript('https://example.com/my-custom-analytics.js', 'custom-analytics-script');

    // Example: A marketing automation script
    // loadScript('https://marketing.example.com/tracking.js', 'marketing-tracker');

    console.log('All essential and accepted third-party scripts loaded.');
  }

  /**
   * Blocks non-essential scripts from loading or initialising.
   * IMPORTANT: This relies on you NOT embedding the script tags directly in Webflow's HTML.
   */
  function blockEssentialScripts() {
    // Disable Google Analytics (Webflow built-in)
    window.dataLayer = { push: function () {} }; // Dummy dataLayer
    window.gtag = function () {}; // Dummy gtag function
    console.log('Google Analytics (Webflow built-in) blocked.');

    // Disable Meta Pixel (Webflow built-in)
    window.fbq = function () {}; // Dummy fbq function
    window._fbq = window.fbq;
    console.log('Meta Pixel (Webflow built-in) blocked.');

    // Disable Google Maps (Webflow built-in)
    // If you have a map element, ensure it's hidden or not initialised.
    window.initMap = function () {
      console.log('Google Maps initialization blocked.');
    };
    console.log('Google Maps (Webflow built-in) blocked.');

    // --- External Scripts (Ensure these are NOT loaded) ---
    // If you had scripts loaded via loadScript(), they won't be loaded here.
    // If you have any other script that might load automatically, you need to
    // find its global variable/function and nullify it here.
    console.log('All non-essential scripts blocked.');
  }

  /**
   * Manages script loading based on the user's consent status.
   * @param {'accepted' | 'declined'} status - The consent status.
   */
  function manageScripts(status) {
    if (status === 'accepted') {
      loadEssentialScripts();
    } else {
      blockEssentialScripts();
    }
  }

  // --- Event Listeners ---

  if (acceptButton) {
    // Apply Calbie Creative styles for acceptance
    acceptButton.style.backgroundColor = '#A8E800'; // Action Green
    acceptButton.style.color = '#000711'; // Text on green
    acceptButton.style.border = 'none';
    acceptButton.style.padding = '12px 24px';
    acceptButton.style.borderRadius = '8px';
    acceptButton.style.cursor = 'pointer';
    acceptButton.style.margin = '0 10px';
    acceptButton.style.fontWeight = 'bold';
    acceptButton.style.transition = 'background-color 0.3s ease';
    acceptButton.addEventListener(
      'mouseenter',
      () => (acceptButton.style.backgroundColor = 'rgba(168, 232, 0, 0.5)')
    ); // Accent Green Glass
    acceptButton.addEventListener(
      'mouseleave',
      () => (acceptButton.style.backgroundColor = '#A8E800')
    );

    acceptButton.addEventListener('click', () => {
      localStorage.setItem(CONSENT_KEY, 'accepted');
      hideBanner();
      manageScripts('accepted');
    });
  }

  if (declineButton) {
    // Apply Calbie Creative styles for decline
    declineButton.style.backgroundColor = '#0C1A31'; // Content Navy
    declineButton.style.color = '#FFFFFF';
    declineButton.style.border = '1px solid #09ADC3'; // Accent Turquoise border
    declineButton.style.padding = '12px 24px';
    declineButton.style.borderRadius = '8px';
    declineButton.style.cursor = 'pointer';
    declineButton.style.margin = '0 10px';
    declineButton.style.fontWeight = 'bold';
    declineButton.style.transition =
      'background-color 0.3s ease, border-color 0.3s ease';
    declineButton.addEventListener('mouseenter', () => {
      declineButton.style.backgroundColor = 'rgba(9, 173, 195, 0.2)'; // Light turquoise hover
      declineButton.style.borderColor = '#09ADC3';
    });
    declineButton.addEventListener('mouseleave', () => {
      declineButton.style.backgroundColor = '#0C1A31';
      declineButton.style.borderColor = '#09ADC3';
    });

    declineButton.addEventListener('click', () => {
      localStorage.setItem(CONSENT_KEY, 'declined');
      hideBanner();
      manageScripts('declined');
    });
  }

  if (openSettingsLink) {
    openSettingsLink.style.color = '#09ADC3'; // Accent Turquoise
    openSettingsLink.style.textDecoration = 'underline';
    openSettingsLink.style.cursor = 'pointer';
    openSettingsLink.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent default link behavior
      showBanner(); // Simply show the banner again for re-selection
    });
  }

  // --- Initialisation ---
  const currentConsent = localStorage.getItem(CONSENT_KEY);
  if (currentConsent) {
    hideBanner();
    manageScripts(currentConsent);
  } else {
    showBanner();
  }

  // --- Google Tag Manager (GTM) Logic (Commented Out) ---
  /*
    // To enable GTM integration:
    // 1. Uncomment this entire block.
    // 2. Ensure your GTM container snippet is NOT directly in Webflow HTML.
    // 3. Replace 'GTM_ID' with your actual GTM Container ID.
    // 4. Adjust the 'loadScript' and 'blockScripts' functions to call GTM functions.

    const GTM_ID = 'GTM-XXXXXXX'; // Replace with your GTM Container ID

    function loadGTM() {
        if (window.gtmLoaded) return; // Prevent duplicate GTM loads
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer',GTM_ID);
        window.gtmLoaded = true;
        console.log('Google Tag Manager loaded.');
    }

    function blockGTM() {
        // Redefine dataLayer to prevent tags from firing
        window.dataLayer = { push: function() { console.log('GTM dataLayer push blocked.'); } };
        console.log('Google Tag Manager blocked.');
    }

    // In manageScripts function, you would call:
    // if (status === 'accepted') {
    //     loadGTM();
    //     // ... other scripts
    // } else {
    //     blockGTM();
    //     // ... other scripts
    // }
    */
});
