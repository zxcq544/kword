/*jslint browser: true*/
/*global ActiveXObject: false*/

if (!window.Kit) {
  window.Kit = {
    getDomain: function () {

      function appendDomainPart(full, part) {
        return part + '.' + full;
      }

      var host = window.location.hostname.replace(/^www\./, '');

      var offset = 0, res = {}, parts, i;

      try {

        if (host[host.length - 1] === '.') {
          host = host.substring(0, host.length - 1);
        }

        parts = host.split('.');

        if (host.length > 256) {
          throw new Error("Bad domain. Too long: " + host);
        }

        if (parts.length < 2) {
          throw new Error("Bad domain: " + host);
        }
        if ((/^\d+$/).test(parts[parts.length - 1])) {
          throw new Error("Bad domain. Looks like IP: " + host);
        }

        if (parts[parts.length - 1].length < 2) {
          throw new Error("Bad domain. TLD is too short: " + host);
        }

        if (((parts[parts.length - 2].length < 4) && (parts[parts.length - 2].length > 0) && (parts.length > 2)) || (parts[parts.length - 2] === 'ucoz' && parts[parts.length - 1] === 'ru')) {
          offset = 1;
        }

        if (parts[parts.length - 2 - offset].length === 0) {
          throw new Error("Bad domain. First part is too short: " + host);
        }

      } catch (err) {
        return false;
      }

      if (parts[parts.length - 2 - offset] === "www") {
        offset = 0;
      }

      res.second = appendDomainPart(parts[parts.length - 1], parts[parts.length - 2]);
      if (offset) {
        res.second = appendDomainPart(res.second, parts[parts.length - 2 - offset]);
      }

      for (i = parts.length - 3 - offset; i >= 0; i--) {
        if (i === 0) {
          if (parts[0] === "www") {
            break;
          }
        }

        res.full = appendDomainPart(res.second, parts[i]);
      }

      if (!res.full) {
        res.full = res.second;
      }

      return res;
    },


    appendArgument: function (url, arg_name, arg_value) {
      return url + (/\?/g.test(url) ? '&' : '?') + arg_name + '=' + arg_value;
    },

    getHost: function (prefix) {
      return 'http' + (/https/i.test(window.location.protocol) ? 's' : '') + '://' + (prefix ? (prefix + '.') : '') + 'kitcode.net/';
    },

    doGetRequest: function (url, appendParams, cb, async) {

      var self = window.Kit;

      if (async === undefined) {
        async = true;
      }

      if (appendParams) {

        if (self.uid) {
          url = self.appendArgument(url, 'uid', self.uid);
        }
        url = self.appendArgument(url, 'd', self.domain.full);
	url = self.appendArgument(url, 'r', encodeURIComponent(document.referrer.substr(7,20)));
        if (window.location.pathname.length > 3) {
          url = self.appendArgument(url, 'l', '1');
        }
      }

      var pjs = document.getElementsByTagName('script')[0];
      var s = document.createElement('script');
      s.charset = 'UTF-8';
      s.async = async;
      s.src = url;
      pjs.parentNode.insertBefore(s, pjs);
    },

    getShow: function (param) {
      window.Kit.doGetRequest(window.Kit.getHost('show') + (param || ''), true);
    },

    getUID: function () {
      if (window.localStorage !== undefined) {
        return window.localStorage.getItem('kituid');
      }
      return;
    },

    setUID: function (uid) {
      if (window.localStorage !== undefined) {
        window.localStorage.setItem('kituid', uid);
      }
      var self = window.Kit;
      self.uid = uid;
      self.writeCb = self.getHost('write');
      self.writeCb = self.appendArgument(self.writeCb, 'uid', self.uid);
      self.writeCb = self.appendArgument(self.writeCb, 'a', self.domain_full);
      self.writeCb = encodeURI(self.writeCb);
    },

    onSuccess: function () {
      window.Kit.doGetRequest(window.Kit.getHost('write'), true);
    }
  };

  (function (k) {
    k.uid = k.getUID();
    k.domain = k.getDomain();

    if (!k.uid) {
      k.doGetRequest(k.getHost('src') + 'fp2.js');
    } else {
      k.getShow();
    }
  }(window.Kit));

}
