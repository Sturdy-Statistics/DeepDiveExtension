(function () {
    const KNOWN_HOSTS = [
        // N.B. google handled explicitly in `getEngineIfEligible`
        // 'google.com/search',
        'arxiv.org/abs/',
        'dx.doi.org/',
        'doi.org/',
        'semanticscholar.org/paper/',
        'pubmed.ncbi.nlm.nih.gov/',
        'www.ncbi.nlm.nih.gov/pubmed/'
    ];

    // Returns engine string if eligible on this page, otherwise null
    function getEngineIfEligible() {
        const href = window.location.href;

        // GOOGLE: require results container to avoid homepage/blank states
        if (href.includes('google.com/search') && document.getElementById('search')) {
            return 'google';
        }

        // ACADEMIC: return citation network
        if (KNOWN_HOSTS.some(h => href.includes(h))){
            return 'cn_all';
        }

        // Not a supported page
        return null;
    }

    // Global state
    let fastMode = false;
    let buttonEl = null;
    let textEl = null;
    let currentEngine = null;

    // Construct a URL for Sturdy Statistics Website
    function currentDeepDiveUrl() {
        const q = encodeURIComponent(window.location.href);
        const base = 'https://sturdystatistics.com/deepdive';
        const fast = fastMode ? 1 : 0;
        return `${base}?fast=${fast}&q=${q}&engine=${currentEngine}`;
    }

    // Update button text for fast mode
    function updateButtonLabel() {
        if (textEl) {
            textEl.textContent = fastMode ? '(fast mode)' : 'Deep Dive';
        }
    }

    // Create Deep Dive button if it does not exist
    function ensureButton() {
        if (buttonEl) return buttonEl;

        const wrapper = document.createElement('div');
        wrapper.className = 'deepdive-popup-wrapper';

        const btn = document.createElement('button');
        btn.className = 'deepdive-popup-button';

        const content = document.createElement('div');
        content.className = 'deepdive-button-content';

        // const icon = document.createElement('span');
        // icon.className = 'deepdive-icon';
        // icon.textContent = '🔍';

        const label = document.createElement('span');
        label.className = 'deepdive-text';
        label.textContent = 'Deep Dive';

        // content.appendChild(icon);
        content.appendChild(label);
        btn.appendChild(content);

        btn.title = 'Ctrl-click for fast mode';

        btn.onclick = () => {
            const url = currentDeepDiveUrl();
            window.open(url, '_blank', 'noopener,noreferrer');
        };

        // Add close (×) button
        const close = document.createElement('button');
        close.className = 'deepdive-close-button';
        close.textContent = '×';
        close.title = 'dismiss';
        close.onclick = (e) => {
            e.stopPropagation(); // Prevent triggering the Deep Dive link
            wrapper.remove();    // Remove the entire wrapper
        };

        wrapper.appendChild(btn);
        wrapper.appendChild(close);

        // Position safety in case CSS fails to load
        // Position safety in case CSS fails to load
        wrapper.style.position = 'fixed';
        wrapper.style.bottom = '20px';
        wrapper.style.right = '20px';
        wrapper.style.zIndex = '9999';

        // optional: layout the button + close neatly
        wrapper.style.display = 'flex';
        wrapper.style.gap = '8px';

        document.body.appendChild(wrapper);

        buttonEl = btn;
        textEl = label;
        return btn;
    }

    // toggle "fast mode" setting
    function setFastMode(on) {
        if (fastMode === on) return;
        fastMode = on;
        updateButtonLabel();
    }

    function setupKeyListeners() {
        // Toggle while Ctrl is held
        document.addEventListener('keydown', (e) => {
            // Skip if user is typing in an editable field
            const t = e.target;
            const editing = t && t.closest('input, textarea, [contenteditable="true"]');
            if (editing) return;

            // Only toggle on initial press and not on key repeat
            if ((e.key === 'Control') && !fastMode) {
                setFastMode(true);
            }
        }, { capture: false });

        document.addEventListener('keyup', (e) => {
            // Skip if user is typing in an editable field
            const t = e.target;
            const editing = t && t.closest('input, textarea, [contenteditable="true"]');
            if (editing) return;

            if (e.key === 'Control' && fastMode) {
                setFastMode(false);
            }
        }, { capture: false });

        // Also sanity-sync on window blur/focus so we don't get stuck
        window.addEventListener('blur', () => setFastMode(false));
    }

    // set up only one on page load
    function init() {
        currentEngine = getEngineIfEligible();
        if (!currentEngine) return;              // bail if not supported

        if (document.querySelector('.deepdive-popup-button')) return; // avoid duplicates

        ensureButton();
        setupKeyListeners();
    }

    init();
})();
