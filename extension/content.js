function createDeepdiveButton(url) {
  const wrapper = document.createElement('div');
  wrapper.className = 'deepdive-popup-wrapper';

  const button = document.createElement('button');
  button.className = 'deepdive-popup-button';

  const content = document.createElement('div');
  content.className = 'deepdive-button-content';

  const icon = document.createElement('span');
  icon.className = 'deepdive-icon';
  icon.textContent = '🔍';

  const text = document.createElement('span');
  text.className = 'deepdive-text';
  text.textContent = 'Deep Dive';

  content.appendChild(icon);
  content.appendChild(text);
  button.appendChild(content);
  button.onclick = () => window.open(url, '_blank', 'noopener,noreferrer');

  // Add close (×) button
  const close = document.createElement('button');
  close.className = 'deepdive-close-button';
  close.textContent = '×';
  close.onclick = (e) => {
    e.stopPropagation(); // Prevent triggering the Deep Dive link
    wrapper.remove();    // Remove the entire wrapper
  };

  wrapper.appendChild(button);
  wrapper.appendChild(close);
  return wrapper;
}

function addButtonIfGoogleSearch() {
  const queryParams = new URLSearchParams(window.location.search);
  const query = queryParams.get('q');
  if (!query) return;

  const existing = document.querySelector('.deepdive-popup-button');
  if (existing) return;

  const url = `https://platform.sturdystatistics.com/deepdive?fast=0&q=${encodeURIComponent(query)}&engine=google`;
  const button = createDeepdiveButton(url);

  const target = document.getElementById('search');
  if (target) {
    button.style.position = 'fixed';
    button.style.bottom = '20px';
    button.style.right = '20px';
    button.style.zIndex = '9999';
    document.body.appendChild(button);
  }
}

function addButtonIfAcademicPaper() {
  const currentUrl = window.location.href;

  const knownHosts = [
    'arxiv.org/abs/',
    'dx.doi.org/',
    'doi.org/',
    'semanticscholar.org/paper/',
    'pubmed.ncbi.nlm.nih.gov/',
    'ncbi.nlm.nih.gov/pubmed/'
  ];

  const matches = knownHosts.some(host => currentUrl.includes(host));
  if (!matches) return;

  const existing = document.querySelector('.deepdive-popup-button');
  if (existing) return;

  const url = `https://sturdystatistics.com/deepdive?fast=0&q=${encodeURIComponent(currentUrl)}&engine=cn_all`;
  const button = createDeepdiveButton(url);

  button.style.position = 'fixed';
  button.style.bottom = '20px';
  button.style.right = '20px';
  button.style.zIndex = '9999';
  document.body.appendChild(button);
}

function routeDeepdiveButton() {
    if (window.location.hostname.includes('google.com') && window.location.pathname.startsWith('/search')) {
        addButtonIfGoogleSearch();
    } else {
        addButtonIfAcademicPaper();
    }
}

routeDeepdiveButton();
