// Calbie Creative Simple C.C. Script loaded from Vercel
// <script src="https://calbie-custom-scripts.vercel.app/advanced-cc-banner.js" defer></script>

// advanced-consent-manager.js
document.addEventListener('DOMContentLoaded', () => {
  console.log("[Calbie Code] Advanced Cookie Banner - Running");
  try {
    // --- DOM Elements ---
    const consentBanner = document.querySelector('[data-calbie-cc="banner"]');
    const preferencesPopup = document.querySelector(
      '[data-calbie-cc="preferences-popup"]'
    );

    const acceptAllButton = document.querySelector('[data-calbie-cc="accept"]');
    const declineAllButton = document.querySelector('[data-calbie-cc="decline"]');
    const managePreferencesButton = document.querySelector(
      '[data-calbie-cc="manage-preferences"]'
    );
    const savePreferencesButton = document.querySelector(
      '[data-calbie-cc="save-preferences"]'
    );
    const closePreferencesButton = document.querySelector(
      '[data-calbie-cc="close-preferences"]'
    );
    const openSettingsLink = document.querySelector(
      '[data-calbie-cc="open-settings"]'
    );

    const analyticsCheckbox = document.querySelector(
      '[data-calbie-cc-category="analytics"]'
    );
    const marketingCheckbox = document.querySelector(
      '[data-calbie-cc-category="marketing"]'
    );

    // --- Early Exit if Critical Elements Missing ---
    if (!consentBanner) {
      console.warn(
        '[Calbie Code] Advanced Cookie Banner - Warning: Banner element not found. Please add data-calbie-cc="banner" attribute to your banner div.'
      );
      return;
    }

    if (!acceptAllButton || !declineAllButton) {
      console.warn(
        '[Calbie Code] Advanced Cookie Banner - Warning: Action buttons not found. Please check your data-calbie-cc attributes.'
      );
      return;
    }

    // Ensure banner starts hidden to prevent flash of content before delay
    consentBanner.style.display = 'none';
    if (preferencesPopup) preferencesPopup.style.display = 'none';

    // --- Constants ---
    const CONSENT_KEY = 'calbie_cc_preferences';

    // Default preferences (all non-essential declined)
    const defaultPreferences = {
      status: 'pending', // 'accepted', 'declined', 'custom'
      categories: {
        essential: true, // Essential scripts are always true and not user-configurable
        analytics: false,
        marketing: false,
      },
    };

    // --- Animation Constants ---
    const BANNER_DELAY = 5000;
    const SLIDE_IN_DURATION = 1000;
    const SLIDE_OUT_DURATION = 750;
    const QUINT_EASE = 'cubic-bezier(0.83, 0, 0.17, 1)';

    // --- Helper Functions ---

    /**
     * Detects existing marketing and analytics scripts on the page.
     * @returns {object} Object containing detected scripts and script details.
     */
    function detectScripts() {
      const detected = {
        googleAnalytics: false,
        googleTagManager: false,
        metaPixel: false,
        googleMaps: false,
        otherAnalytics: [],
        otherMarketing: [],
      };

      // Common analytics and marketing script domains/patterns
      const analyticsPatterns = [
        'google-analytics.com',
        'googletagmanager.com',
        'analytics.google.com',
        'hotjar.com',
        'mouseflow.com',
        'clarity.ms',
        'mixpanel.com',
        'segment.com',
        'amplitude.com',
        'heap.io',
        'fullstory.com',
        'logrocket.com',
        'quantcast.com',
        'chartbeat.com',
        'newrelic.com',
        'pendo.io',
      ];

      const marketingPatterns = [
        'facebook.net/fbevents',
        'connect.facebook.net',
        'doubleclick.net',
        'ads.google.com',
        'adservice.google.com',
        'googleadservices.com',
        'linkedin.com/px',
        'snap.licdn.com',
        'twitter.com/i/adsct',
        'analytics.twitter.com',
        'bat.bing.com',
        'reddit.com/api/v2',
        'pinterest.com/ct',
        'tiktok.com/i18n/pixel',
        'quora.com/qevents',
        'taboola.com',
        'outbrain.com',
        'criteo.com',
        'adroll.com',
        'convertkit.com',
      ];

      // Check for specific known services
      if (window.gtag || window.ga || (window.dataLayer && !window.dataLayer._blocked)) {
        detected.googleAnalytics = true;
      }

      if (window.google_tag_manager || document.querySelector('script[src*="googletagmanager.com/gtm.js"]')) {
        detected.googleTagManager = true;
      }

      if (window.fbq || window._fbq || document.querySelector('script[src*="facebook.net/fbevents"]')) {
        detected.metaPixel = true;
      }

      if (window.google?.maps || document.querySelector('script[src*="maps.googleapis.com"]')) {
        detected.googleMaps = true;
      }

      // Scan all script tags for analytics and marketing patterns
      const allScripts = document.querySelectorAll('script[src]');
      allScripts.forEach(script => {
        const src = script.src.toLowerCase();
        
        // Check analytics patterns
        analyticsPatterns.forEach(pattern => {
          if (src.includes(pattern)) {
            const scriptName = pattern.split('.')[0]; // e.g., 'hotjar' from 'hotjar.com'
            if (!detected.otherAnalytics.includes(scriptName)) {
              detected.otherAnalytics.push(scriptName);
            }
          }
        });

        // Check marketing patterns
        marketingPatterns.forEach(pattern => {
          if (src.includes(pattern)) {
            const scriptName = pattern.split('.')[0]; // e.g., 'linkedin' from 'linkedin.com/px'
            if (!detected.otherMarketing.includes(scriptName)) {
              detected.otherMarketing.push(scriptName);
            }
          }
        });
      });

      return detected;
    }

    /**
     * Hides the cc banner.
     */
    function hideBanner() {
      if (consentBanner) {
        consentBanner.style.display = 'none';
        console.log('[Calbie Code] Advanced Cookie Banner - Info: Banner hidden');
      }
    }

    /**
     * Shows the cc banner.
     */
    function showBanner() {
      if (consentBanner) {
        consentBanner.style.display = 'block';
        console.log('[Calbie Code] Advanced Cookie Banner - Info: Banner shown');
      }
    }

    /**
     * Animates the banner sliding in from the right.
     */
    function slideInBanner() {
      if (!consentBanner) return;
      consentBanner.style.display = 'block';
      if (typeof consentBanner.animate === 'function') {
        consentBanner.animate(
          [
            { transform: 'translateX(100%)' },
            { transform: 'translateX(0)' }
          ],
          { duration: SLIDE_IN_DURATION, easing: QUINT_EASE }
        );
      }
      console.log('[Calbie Code] Advanced Cookie Banner - Info: Banner sliding in');
    }

    /**
     * Animates the banner sliding out to the right, then hides it.
     */
    function slideOutBanner() {
      if (!consentBanner) return;
      if (typeof consentBanner.animate === 'function') {
        var anim = consentBanner.animate(
          [
            { transform: 'translateX(0)' },
            { transform: 'translateX(100%)' }
          ],
          { duration: SLIDE_OUT_DURATION, easing: QUINT_EASE, fill: 'forwards' }
        );
        anim.onfinish = function() {
          consentBanner.style.display = 'none';
          anim.cancel();
          console.log('[Calbie Code] Advanced Cookie Banner - Info: Banner slid out');
        };
      } else {
        consentBanner.style.display = 'none';
      }
    }

    /**
     * Hides the preferences popup.
     */
    function hidePreferencesPopup() {
      if (preferencesPopup) {
        preferencesPopup.style.display = 'none';
        console.log('[Calbie Code] Advanced Cookie Banner - Info: Preferences popup hidden');
      }
    }

    /**
     * Shows the preferences popup.
     */
    function showPreferencesPopup() {
      if (preferencesPopup) {
        preferencesPopup.style.display = 'block';
        console.log('[Calbie Code] Advanced Cookie Banner - Info: Preferences popup shown');
      }
    }

    /**
     * Hides both banner and popup.
     */
    function hideAllConsentUIs() {
      hideBanner();
      hidePreferencesPopup();
    }

    /**
     * Checks if any marketing or analytics scripts were detected.
     * @param {object} detected - The detected scripts object.
     * @returns {boolean} True if any scripts were detected.
     */
    function hasAnyScripts(detected) {
      return Object.values(detected).some(value => value === true);
    }

    /**
     * Manages script blocking/unblocking based on consent preferences.
     * @param {object} preferences - The user's consent preferences object.
     */
    function manageScripts(preferences) {
      try {
        // --- Google Analytics / GTM ---
        if (preferences.categories.analytics) {
          // Unblock Google Analytics / GTM
          if (!window.dataLayer || typeof window.dataLayer.push !== 'function' || window.dataLayer._blocked) {
            window.dataLayer = window.dataLayer || [];
            delete window.dataLayer._blocked;
            console.log('[Calbie Code] Advanced Cookie Banner - Success: Google Analytics/GTM unblocked');
          }
          if (window.gtag && window.gtag._blocked) {
            delete window.gtag._blocked;
            console.log('[Calbie Code] Advanced Cookie Banner - Success: gtag function unblocked');
          }
        } else {
          // Block Google Analytics / GTM
          window.dataLayer = {
            push: function () {
              console.log('[Calbie Code] Advanced Cookie Banner - Info: GTM/GA dataLayer push blocked');
            },
            _blocked: true,
          };
          window.gtag = function () {};
          window.gtag._blocked = true;
          console.log('[Calbie Code] Advanced Cookie Banner - Success: Google Analytics/GTM blocked');
        }

        // --- Meta Pixel ---
        if (preferences.categories.marketing) {
          // Unblock Meta Pixel
          if (window.fbq && window.fbq._blocked) {
            delete window.fbq._blocked;
            console.log('[Calbie Code] Advanced Cookie Banner - Success: Meta Pixel unblocked');
          }
        } else {
          // Block Meta Pixel
          window.fbq = function () {};
          window.fbq._blocked = true;
          window._fbq = window.fbq;
          console.log('[Calbie Code] Advanced Cookie Banner - Success: Meta Pixel blocked');
        }
      } catch (e) {
        console.error("[Calbie Code] Advanced Cookie Banner - Error in manageScripts: ", e);
      }
    }

    /**
     * Populates the preferences popup with current saved choices.
     */
    function populatePreferencesUI() {
      try {
        const savedPreferences =
          JSON.parse(localStorage.getItem(CONSENT_KEY)) || defaultPreferences;

        if (analyticsCheckbox) {
          analyticsCheckbox.checked = savedPreferences.categories.analytics;
        }
        if (marketingCheckbox) {
          marketingCheckbox.checked = savedPreferences.categories.marketing;
        }

        console.log('[Calbie Code] Advanced Cookie Banner - Info: Preferences UI populated');
      } catch (e) {
        console.error("[Calbie Code] Advanced Cookie Banner - Error populating preferences UI: ", e);
      }
    }

    /**
     * Saves the current preferences from the UI and applies them.
     */
    function savePreferences() {
      try {
        const currentPreferences = {
          status: 'custom',
          categories: {
            essential: true,
            analytics: analyticsCheckbox ? analyticsCheckbox.checked : false,
            marketing: marketingCheckbox ? marketingCheckbox.checked : false,
          },
        };

        localStorage.setItem(CONSENT_KEY, JSON.stringify(currentPreferences));
        hideAllConsentUIs();
        
        // Log detected scripts and custom preferences
        const detectedScripts = detectScripts();
        console.log('[Calbie Code] Advanced Cookie Banner - Success: Custom preferences applied');
        manageScripts(currentPreferences);
      } catch (e) {
        console.error("[Calbie Code] Advanced Cookie Banner - Error saving preferences: ", e);
      }
    }

    // --- Event Listeners ---

    if (acceptAllButton) {
      acceptAllButton.addEventListener('click', (e) => {
        try {
          e.preventDefault();
          const acceptedPreferences = {
            status: 'accepted',
            categories: {
              essential: true,
              analytics: true,
              marketing: true,
            },
          };
          localStorage.setItem(CONSENT_KEY, JSON.stringify(acceptedPreferences));
          hidePreferencesPopup();
          slideOutBanner();
          
          console.log('[Calbie Code] Advanced Cookie Banner - Success: All categories accepted');
          manageScripts(acceptedPreferences);
        } catch (err) {
          console.error("[Calbie Code] Advanced Cookie Banner - Error on accept all: ", err);
        }
      });
    }

    if (declineAllButton) {
      declineAllButton.addEventListener('click', (e) => {
        try {
          e.preventDefault();
          const declinedPreferences = {
            status: 'declined',
            categories: {
              essential: true,
              analytics: false,
              marketing: false,
            },
          };
          localStorage.setItem(CONSENT_KEY, JSON.stringify(declinedPreferences));
          hidePreferencesPopup();
          slideOutBanner();
          
          console.log('[Calbie Code] Advanced Cookie Banner - Success: All non-essential categories declined');
          manageScripts(declinedPreferences);
        } catch (err) {
          console.error("[Calbie Code] Advanced Cookie Banner - Error on decline all: ", err);
        }
      });
    }

    if (managePreferencesButton) {
      managePreferencesButton.addEventListener('click', (e) => {
        try {
          e.preventDefault();
          hideBanner();
          populatePreferencesUI();
          showPreferencesPopup();
        } catch (err) {
          console.error("[Calbie Code] Advanced Cookie Banner - Error opening preferences: ", err);
        }
      });
    }

    if (savePreferencesButton) {
      savePreferencesButton.addEventListener('click', (e) => {
        try {
          e.preventDefault();
          savePreferences();
        } catch (err) {
          console.error("[Calbie Code] Advanced Cookie Banner - Error in save listener: ", err);
        }
      });
    }

    if (closePreferencesButton) {
      closePreferencesButton.addEventListener('click', (e) => {
        try {
          e.preventDefault();
          hideAllConsentUIs();

          // If consent was never given, show the main banner again
          const currentConsent = JSON.parse(localStorage.getItem(CONSENT_KEY));
          if (!currentConsent || currentConsent.status === 'pending') {
            showBanner();
          }
        } catch (err) {
          console.error("[Calbie Code] Advanced Cookie Banner - Error closing preferences: ", err);
        }
      });
    }

    if (openSettingsLink) {
      openSettingsLink.addEventListener('click', (e) => {
        try {
          e.preventDefault();
          hideAllConsentUIs();
          populatePreferencesUI();
          showPreferencesPopup();
        } catch (err) {
          console.error("[Calbie Code] Advanced Cookie Banner - Error opening settings: ", err);
        }
      });
    }

    // --- Initialization ---
    // Detect and log scripts on page load
    const detectedScripts = detectScripts();
    console.log('[Calbie Code] Advanced Cookie Banner - Info: Detected scripts:', detectedScripts);
    
    // If no scripts detected, hide banner and exit
    if (!hasAnyScripts(detectedScripts)) {
      console.log('[Calbie Code] Advanced Cookie Banner - Info: No scripts detected, hiding banner');
      hideAllConsentUIs();
      return;
    }
    
    let initialPreferences = JSON.parse(localStorage.getItem(CONSENT_KEY));

    if (initialPreferences && initialPreferences.status) {
      // Ensure categories object exists and has default values if missing
      initialPreferences.categories = {
        ...defaultPreferences.categories,
        ...(initialPreferences.categories || {}),
      };
      hideAllConsentUIs();
      manageScripts(initialPreferences);
      console.log('[Calbie Code] Advanced Cookie Banner - Success: Loaded existing consent');
    } else {
      // No consent found, show the banner after delay with slide-in animation
      setTimeout(function() {
        slideInBanner();
      }, BANNER_DELAY);
      localStorage.setItem(CONSENT_KEY, JSON.stringify(defaultPreferences));
      console.log('[Calbie Code] Advanced Cookie Banner - Info: No previous consent found, banner will appear after delay');
    }

    /**
     * Detects GTM container ID from the page
     * @returns {string|null} GTM ID if found, null otherwise
     */
    function detectGTMId() {
      // Method 1: Check for script with data-gtm-id attribute
      const gtmScript = document.querySelector('script[data-gtm-id]');
      if (gtmScript) {
        return gtmScript.getAttribute('data-gtm-id');
      }

      // Method 2: Check existing GTM scripts in the page
      const scripts = document.querySelectorAll(
        'script[src*="googletagmanager.com/gtm.js"]'
      );
      for (let script of scripts) {
        const match = script.src.match(/id=(GTM-[A-Z0-9]+)/);
        if (match) {
          return match[1];
        }
      }

      // Method 3: Check if GTM is already loaded (dataLayer exists)
      if (window.google_tag_manager) {
        const gtmIds = Object.keys(window.google_tag_manager);
        if (gtmIds.length > 0) {
          return gtmIds[0];
        }
      }

      return null;
    }

    /**
     * Loads GTM dynamically with the detected or provided ID
     * @param {string} gtmId - The GTM container ID
     */
    function loadGTM(gtmId) {
      if (window.gtmLoaded || !gtmId) return;

      (function (w, d, s, l, i) {
        w[l] = w[l] || [];
        w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
        var f = d.getElementsByTagName(s)[0],
          j = d.createElement(s),
          dl = l != 'dataLayer' ? '&l=' + l : '';
        j.async = true;
        j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
        f.parentNode.insertBefore(j, f);
      })(window, document, 'script', 'dataLayer', gtmId);

      window.gtmLoaded = true;
      console.log(`[Calbie Code] Advanced Cookie Banner - Success: GTM loaded with ID: ${gtmId}`);
    }

    /**
     * Enables GTM if it's already loaded, or loads it if needed
     */
    function enableGTM() {
      const gtmId = detectGTMId();

      if (gtmId) {
        // If GTM is already loaded, just ensure dataLayer works
        if (window.google_tag_manager) {
          window.dataLayer = window.dataLayer || [];
          console.log(`[Calbie Code] Advanced Cookie Banner - Info: GTM already loaded (${gtmId})`);
        } else {
          // GTM not loaded yet, load it now
          loadGTM(gtmId);
        }
      }
    }

    /**
     * Blocks GTM by neutering the dataLayer
     */
    function blockGTM() {
      window.dataLayer = {
        push: function () {
          console.log('[Calbie Code] Advanced Cookie Banner - Info: GTM dataLayer push blocked');
        },
      };
      console.log('[Calbie Code] Advanced Cookie Banner - Success: GTM blocked');
    }

    console.log("[Calbie Code] Advanced Cookie Banner - Success: Initialized");
  } catch (error) {
    console.error("[Calbie Code] Advanced Cookie Banner - Error: ", error);
  }
});
