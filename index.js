(function () {
  function getUrlHost(url) {
    var parser = document.createElement('a');
    parser.href = url;
    return parser.host;
  }

  function getDefaultHosts() {
    var arr = [];
    arr.push(getUrlHost(window.location.href));
    return arr;
  }

  function setTargetBlank(el) {
    el.setAttribute('target', '_blank');
  }

  function argType(el) {
    if (typeof el.forEach === 'function') {
      return 'foreachable';
    }
    if (Node.prototype.isPrototypeOf(el)) {
      return 'node';
    }
    if (NodeList.prototype.isPrototypeOf(el)) {
      return 'nodelist';
    }
    return false;
  }

  function callOnAll(els) {
    for (i = 0; i < els.length; ++i) {
      decentlySmartTarget(els[i]);
    }
    return;
  }

  function decentlySmartTarget(el, hosts, cb) {
    // no el arg, run on all document anchors
    if (!el) {
      return callOnAll(document.querySelectorAll('a'));
    }
    // el is nodelist, iterate
    if (argType(el) === 'nodelist' || argType(el) === 'foreachable') {
      return callOnAll(el);
    }
    // el is something it shouldn't be, do nothing
    if (!argType(el)) {
      return false;
    }
    // el must be a single node

    if (!hosts) {
      hosts = getDefaultHosts();
    }

    if (!cb) {
      cb = setTargetBlank;
    }

    var href = String(el.getAttribute('href'));

    if (href.startsWith('mailto:')) {
      return false;
    }

    if (href.startsWith('tel:')) {
      return false;
    }

    if (el.nodeName !== 'A') {
      return;
    }

    if (!el.href) {
      return;
    }

    if (!hosts.includes(getUrlHost(href))) {
      cb(el);
    }
  }

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = decentlySmartTarget;
  } else {
    if (typeof define === 'function' && define.amd) {
      define([], function () {
        return decentlySmartTarget;
      });
    } else {
      window.decentlySmartTarget = decentlySmartTarget;
    }
  }
})();
