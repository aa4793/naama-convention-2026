/**
 * NAAMA 2026 – Global Navigation
 * Single source of truth for the nav across all pages.
 * Auto-detects the active page from window.location.
 */
(function () {
  var links = [
    { href: 'index.html',       label: 'Home' },
    { href: 'agenda.html',      label: 'Program' },
    { href: 'submissions.html', label: 'Call for Submissions' },
    { href: 'hotel.html',       label: 'Convention Hotel' },
    { href: 'leadership.html',  label: 'Convention Leadership' },
  ];

  var page = window.location.pathname.split('/').pop() || 'index.html';
  if (page === '' || page === '/') page = 'index.html';

  var desktopItems = links.map(function (l) {
    var cls = l.href === page ? ' class="active"' : '';
    return '<li><a href="' + l.href + '"' + cls + '>' + l.label + '</a></li>';
  }).join('');

  var mobileItems = links.map(function (l) {
    var cls = l.href === page ? ' class="active"' : '';
    return '<a href="' + l.href + '"' + cls + '>' + l.label + '</a>';
  }).join('');

  var registerURL = 'https://www.zeffy.com/en-US/ticketing/naama-48th-national-convention';

  var html = [
    '<nav class="nav">',
    '  <div class="nav__inner">',
    '    <a href="index.html" class="nav__logo">',
    '      <img src="images/New2025-WH-NAAMA-Full-logo-corrected-500x188-1.png" alt="NAAMA Logo" />',
    '    </a>',
    '    <ul class="nav__links">' + desktopItems + '</ul>',
    '    <div class="nav__register">',
    '      <a href="' + registerURL + '" target="_blank" rel="noopener" class="btn btn-primary">Register</a>',
    '    </div>',
    '    <button class="nav__toggle" onclick="window.toggleNav()" aria-label="Toggle menu">',
    '      <span></span><span></span><span></span>',
    '    </button>',
    '  </div>',
    '  <div class="nav__mobile" id="mobileNav">',
    '    ' + mobileItems,
    '    <a href="' + registerURL + '" target="_blank" rel="noopener" class="btn btn-primary">Register</a>',
    '  </div>',
    '</nav>',
  ].join('\n');

  document.write(html);

  window.toggleNav = function () {
    var el = document.getElementById('mobileNav');
    if (el) el.classList.toggle('open');
  };
}());
