/**
 * NAAMA 2026 – Global Navigation
 * Single source of truth for the nav across all pages.
 * Top-level items can be a direct link or a group with a hover dropdown.
 * Active page is auto-detected from window.location; the parent group of the
 * active page is highlighted along with the active child link.
 */
(function () {
  var nav = [
    { label: 'Home', href: 'index.html' },
    { label: 'Program', children: [
      { href: 'agenda.html',      label: 'Scientific Program' },
      { href: 'leadership.html',  label: 'Convention Leadership' },
    ]},
    { label: 'Attend', children: [
      { href: 'hotel.html',       label: 'Convention Hotel' },
      { href: 'tours.html',       label: 'Tours & Events' },
    ]},
    { label: 'Get Involved', children: [
      { href: 'submissions.html', label: 'Call for Submissions' },
      { href: 'sponsorship.html', label: 'Sponsorship' },
    ]},
  ];

  var page = window.location.pathname.split('/').pop() || 'index.html';
  if (page === '' || page === '/') page = 'index.html';

  var chevron = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>';

  function isActive(href) { return href === page; }
  function groupActive(item) {
    return item.children && item.children.some(function (c) { return isActive(c.href); });
  }

  /* ── Desktop ── */
  var desktopItems = nav.map(function (item) {
    if (!item.children) {
      var cls = isActive(item.href) ? ' class="active"' : '';
      return '<li class="nav__item"><a href="' + item.href + '"' + cls + '>' + item.label + '</a></li>';
    }
    var gCls = groupActive(item) ? ' nav__item--group active' : ' nav__item--group';
    var sub = item.children.map(function (c) {
      var cCls = isActive(c.href) ? ' class="active"' : '';
      return '<li><a href="' + c.href + '"' + cCls + '>' + c.label + '</a></li>';
    }).join('');
    return '<li class="nav__item' + gCls + '">' +
             '<span class="nav__group-label" tabindex="0" role="button" aria-haspopup="true" aria-expanded="false">' + item.label + ' ' + chevron + '</span>' +
             '<ul class="nav__dropdown">' + sub + '</ul>' +
           '</li>';
  }).join('');

  /* ── Mobile (grouped with headings) ── */
  var mobileItems = nav.map(function (item) {
    if (!item.children) {
      var cls = isActive(item.href) ? ' class="active"' : '';
      return '<a href="' + item.href + '"' + cls + '>' + item.label + '</a>';
    }
    var sub = item.children.map(function (c) {
      var cCls = isActive(c.href) ? ' class="active"' : '';
      return '<a href="' + c.href + '"' + cCls + '>' + c.label + '</a>';
    }).join('');
    return '<div class="nav__mobile-group">' +
             '<div class="nav__mobile-heading">' + item.label + '</div>' + sub +
           '</div>';
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
