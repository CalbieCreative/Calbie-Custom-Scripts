// gdpr-cookie-banner.js
document.addEventListener('DOMContentLoaded', () => {
  // --- DOM Elements ---
  const consentBanner = document.querySelector(
    '[data-cookie-consent="banner"]'
  );
  const preferencesPopup = document.querySelector(
    '[data-cookie-consent="preferences-popup"]'
  );

  const acceptAllButton = document.querySelector(
    '[data-cookie-consent="accept-button"]'
  );
  const declineAllButton = document.querySelector(
    '[data-cookie-consent="decline-button"]'
  );
  const managePreferencesButton = document.querySelector(
    '[data-cookie-consent="manage-preferences"]'
  ); // Assuming you'll add this button
  const savePreferencesButton = document.querySelector(
    '[data-cookie-consent="save-preferences"]'
  );
  const closePreferencesButton = document.querySelector(
    '[data-cookie-consent="close-preferences"]'
  );
  const openSettingsLink = document.querySelector(
    '[data-cookie-consent="open-settings"]'
  );

  const analyticsCheckbox = document.querySelector(
    '[data-cookie-category="analytics"]'
  );
  const marketingCheckbox = document.querySelector(
    '[data-cookie-category="marketing"]'
  );

  // --- Constants ---
  const CONSENT_KEY = 'calbie_cookie_consent_preferences'; // Key for localStorage

  // Default preferences (all non-essential declined)
  const defaultPreferences = {
    status: 'pending', // 'accepted', 'declined', 'custom'
    categories: {
      essential: true, // Essential cookies are always true and not user-configurable
      analytics: false,
      marketing: false,
    },
  };

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
   * Hides the cookie consent banner and preferences popup.
   */
  function hideAllConsentUIs() {
    if (consentBanner) {
      consentBanner.style.display = 'none';
    }
    if (preferencesPopup) {
      preferencesPopup.style.display = 'none';
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
   * Shows the preferences popup.
   */
  function showPreferencesPopup() {
    if (preferencesPopup) {
      preferencesPopup.style.display = 'block'; // Use 'flex' or 'grid' as per your Webflow layout
      // Basic inline styles for visibility, override these in Webflow Designer
      preferencesPopup.style.position = 'fixed';
      preferencesPopup.style.top = '50%';
      preferencesPopup.style.left = '50%';
      preferencesPopup.style.transform = 'translate(-50%, -50%)';
      preferencesPopup.style.width = '90%';
      preferencesPopup.style.maxWidth = '500px';
      preferencesPopup.style.zIndex = '10000';
      preferencesPopup.style.padding = '30px';
      preferencesPopup.style.backgroundColor = '#0C1A31'; // Calbie Content Navy
      preferencesPopup.style.color = '#FFFFFF';
      preferencesPopup.style.borderRadius = '12px';
      preferencesPopup.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
    }
  }

  /**
   * Loads scripts based on the provided consent preferences.
   * IMPORTANT: You MUST remove the original <script> tags for these services from your Webflow custom code.
   * @param {object} preferences - The user's consent preferences object.
   */
  function manageScripts(preferences) {
    // --- Google Analytics ---
    if (preferences.categories.analytics) {
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag('js', new Date());
      // gtag('config', 'YOUR_GA_TRACKING_ID'); // Uncomment if not relying on Webflow's auto-init
      console.log('Google Analytics (Webflow built-in) enabled.');
    } else {
      window.dataLayer = { push: function () {} };
      window.gtag = function () {};
      console.log('Google Analytics (Webflow built-in) blocked.');
    }

    // --- Meta Pixel ---
    if (preferences.categories.marketing) {
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
    } else {
      window.fbq = function () {};
      window._fbq = window.fbq;
      console.log('Meta Pixel (Webflow built-in) blocked.');
    }

    // --- Google Maps ---
    // Google Maps is often loaded via a script tag with a callback.
    // For consent, you typically ensure the map div is only rendered/initialised if consent is given.
    if (preferences.categories.functional) {
      // Assuming functional category for maps
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
    } else {
      window.initMap = function () {
        console.log('Google Maps initialization blocked.');
      };
      console.log('Google Maps (Webflow built-in) blocked.');
    }

    // --- External Scripts (PLACE YOUR CONSENT-DEPENDENT SCRIPTS HERE) ---
    // Example: Custom Analytics Script
    // If your custom analytics script depends on 'analytics' consent
    // if (preferences.categories.analytics) {
    //     loadScript('https://example.com/my-custom-analytics.js', 'custom-analytics-script');
    // } else {
    //     // Add logic to disable if already loaded or prevent future loading
    // }

    // Example: Marketing Automation Script
    // If your marketing script depends on 'marketing' consent
    // if (preferences.categories.marketing) {
    //     loadScript('https://marketing.example.com/tracking.js', 'marketing-tracker');
    // } else {
    //     // Add logic to disable if already loaded or prevent future loading
    // }

    console.log('All scripts managed based on preferences:', preferences);
  }

  /**
   * Populates the preferences popup with current saved choices.
   */
  function populatePreferencesUI() {
    const savedPreferences =
      JSON.parse(localStorage.getItem(CONSENT_KEY)) || defaultPreferences;
    if (analyticsCheckbox) {
      analyticsCheckbox.checked = savedPreferences.categories.analytics;
    }
    if (marketingCheckbox) {
      marketingCheckbox.checked = savedPreferences.categories.marketing;
    }
  }

  /**
   * Saves the current preferences from the UI and applies them.
   */
  function savePreferences() {
    const currentPreferences = {
      status: 'custom',
      categories: {
        essential: true, // Always true
        analytics: analyticsCheckbox ? analyticsCheckbox.checked : false,
        marketing: marketingCheckbox ? marketingCheckbox.checked : false,
      },
    };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(currentPreferences));
    hideAllConsentUIs();
    manageScripts(currentPreferences);
    console.log('Preferences saved:', currentPreferences);
  }

  // --- Event Listeners ---

  if (acceptAllButton) {
    // Apply Calbie Creative styles for acceptance
    acceptAllButton.style.backgroundColor = '#A8E800'; // Action Green
    acceptAllButton.style.color = '#000711'; // Text on green
    acceptAllButton.style.border = 'none';
    acceptAllButton.style.padding = '12px 24px';
    acceptAllButton.style.borderRadius = '8px';
    acceptAllButton.style.cursor = 'pointer';
    acceptAllButton.style.margin = '0 10px';
    acceptAllButton.style.fontWeight = 'bold';
    acceptAllButton.style.transition = 'background-color 0.3s ease';
    acceptAllButton.addEventListener(
      'mouseenter',
      () => (acceptAllButton.style.backgroundColor = 'rgba(168, 232, 0, 0.5)')
    ); // Accent Green Glass
    acceptAllButton.addEventListener(
      'mouseleave',
      () => (acceptAllButton.style.backgroundColor = '#A8E800')
    );

    acceptAllButton.addEventListener('click', () => {
      const acceptedPreferences = {
        status: 'accepted',
        categories: {
          essential: true,
          analytics: true,
          marketing: true,
        },
      };
      localStorage.setItem(CONSENT_KEY, JSON.stringify(acceptedPreferences));
      hideAllConsentUIs();
      manageScripts(acceptedPreferences);
    });
  }

  if (declineAllButton) {
    // Apply Calbie Creative styles for decline
    declineAllButton.style.backgroundColor = '#0C1A31'; // Content Navy
    declineAllButton.style.color = '#FFFFFF';
    declineAllButton.style.border = '1px solid #09ADC3'; // Accent Turquoise border
    declineAllButton.style.padding = '12px 24px';
    declineAllButton.style.borderRadius = '8px';
    declineAllButton.style.cursor = 'pointer';
    declineAllButton.style.margin = '0 10px';
    declineAllButton.style.fontWeight = 'bold';
    declineAllButton.style.transition =
      'background-color 0.3s ease, border-color 0.3s ease';
    declineAllButton.addEventListener('mouseenter', () => {
      declineAllButton.style.backgroundColor = 'rgba(9, 173, 195, 0.2)'; // Light turquoise hover
      declineAllButton.style.borderColor = '#09ADC3';
    });
    declineAllButton.addEventListener('mouseleave', () => {
      declineAllButton.style.backgroundColor = '#0C1A31';
      declineAllButton.style.borderColor = '#09ADC3';
    });

    declineAllButton.addEventListener('click', () => {
      const declinedPreferences = {
        status: 'declined',
        categories: {
          essential: true,
          analytics: false,
          marketing: false,
        },
      };
      localStorage.setItem(CONSENT_KEY, JSON.stringify(declinedPreferences));
      hideAllConsentUIs();
      manageScripts(declinedPreferences);
    });
  }

  if (managePreferencesButton) {
    managePreferencesButton.style.backgroundColor = '#0C1A31'; // Content Navy
    managePreferencesButton.style.color = '#09ADC3'; // Accent Turquoise
    managePreferencesButton.style.border = '1px solid #09ADC3';
    managePreferencesButton.style.padding = '12px 24px';
    managePreferencesButton.style.borderRadius = '8px';
    managePreferencesButton.style.cursor = 'pointer';
    managePreferencesButton.style.margin = '0 10px';
    managePreferencesButton.style.fontWeight = 'bold';
    managePreferencesButton.style.transition =
      'background-color 0.3s ease, color 0.3s ease';
    managePreferencesButton.addEventListener('mouseenter', () => {
      managePreferencesButton.style.backgroundColor = 'rgba(9, 173, 195, 0.2)';
      managePreferencesButton.style.color = '#FFFFFF';
    });
    managePreferencesButton.addEventListener('mouseleave', () => {
      managePreferencesButton.style.backgroundColor = '#0C1A31';
      managePreferencesButton.style.color = '#09ADC3';
    });

    managePreferencesButton.addEventListener('click', () => {
      hideBanner();
      populatePreferencesUI();
      showPreferencesPopup();
    });
  }

  if (savePreferencesButton) {
    savePreferencesButton.style.backgroundColor = '#A8E800'; // Action Green
    savePreferencesButton.style.color = '#000711';
    savePreferencesButton.style.border = 'none';
    savePreferencesButton.style.padding = '12px 24px';
    savePreferencesButton.style.borderRadius = '8px';
    savePreferencesButton.style.cursor = 'pointer';
    savePreferencesButton.style.margin = '20px 10px 0 0';
    savePreferencesButton.style.fontWeight = 'bold';
    savePreferencesButton.addEventListener(
      'mouseenter',
      () =>
        (savePreferencesButton.style.backgroundColor = 'rgba(168, 232, 0, 0.5)')
    );
    savePreferencesButton.addEventListener(
      'mouseleave',
      () => (savePreferencesButton.style.backgroundColor = '#A8E800')
    );

    savePreferencesButton.addEventListener('click', savePreferences);
  }

  if (closePreferencesButton) {
    closePreferencesButton.style.backgroundColor = 'transparent';
    closePreferencesButton.style.color = '#FFFFFF';
    closePreferencesButton.style.border = '1px solid #FFFFFF';
    closePreferencesButton.style.padding = '12px 24px';
    closePreferencesButton.style.borderRadius = '8px';
    closePreferencesButton.style.cursor = 'pointer';
    closePreferencesButton.style.margin = '20px 0 0 10px';
    closePreferencesButton.style.fontWeight = 'bold';
    closePreferencesButton.addEventListener(
      'mouseenter',
      () =>
        (closePreferencesButton.style.backgroundColor =
          'rgba(255, 255, 255, 0.2)')
    );
    closePreferencesButton.addEventListener(
      'mouseleave',
      () => (closePreferencesButton.style.backgroundColor = 'transparent')
    );

    closePreferencesButton.addEventListener('click', () => {
      hideAllConsentUIs();
      // If consent was never given, show the main banner again
      const currentConsent = JSON.parse(localStorage.getItem(CONSENT_KEY));
      if (!currentConsent || currentConsent.status === 'pending') {
        showBanner();
      }
    });
  }

  if (openSettingsLink) {
    openSettingsLink.style.color = '#09ADC3'; // Accent Turquoise
    openSettingsLink.style.textDecoration = 'underline';
    openSettingsLink.style.cursor = 'pointer';
    openSettingsLink.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent default link behavior
      hideAllConsentUIs(); // Hide any current UI
      populatePreferencesUI(); // Load current preferences into checkboxes
      showPreferencesPopup(); // Show the preferences popup
    });
  }

  // --- Initialisation ---
  let initialPreferences = JSON.parse(localStorage.getItem(CONSENT_KEY));
  if (initialPreferences && initialPreferences.status) {
    // Ensure categories object exists and has default values if missing (e.g., from older consent)
    initialPreferences.categories = {
      ...defaultPreferences.categories,
      ...(initialPreferences.categories || {}),
    };
    hideAllConsentUIs();
    manageScripts(initialPreferences);
  } else {
    // No consent found or invalid, show the banner
    showBanner();
    // Set initial state in localStorage as pending if not already there
    localStorage.setItem(CONSENT_KEY, JSON.stringify(defaultPreferences));
  }

  // --- Google Tag Manager (GTM) Logic (Commented Out) ---
  /*
    // To enable GTM integration:
    // 1. Uncomment this entire block.
    // 2. Ensure your GTM container snippet is NOT directly in Webflow HTML.
    // 3. Replace 'GTM_ID' with your actual GTM Container ID.
    // 4. Adjust the 'manageScripts' function to call GTM functions based on consent.

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

    // In manageScripts function, you would add logic like this:
    // if (preferences.categories.analytics || preferences.categories.marketing) { // Or specific GTM consent
    //     loadGTM();
    // } else {
    //     blockGTM();
    // }
    */
});
