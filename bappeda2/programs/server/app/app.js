var require = meteorInstall({"folder":{"global":{"funcs.coffee":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// folder/global/funcs.coffee                                                                                       //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
this._ = lodash;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"parent":{"funcs.coffee":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// folder/parent/funcs.coffee                                                                                       //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
this._ = lodash;

if (Meteor.isClient) {
  this.currentRoute = function () {
    return Router.current().route.getName();
  };

  this.currentPar = function (name) {
    return Router.current().params[name];
  };

  AutoForm.setDefaultTemplate('materialize');
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"arr.coffee":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// folder/arr.coffee                                                                                                //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var defaults, makeOpts;
defaults = ['nama', 'alamat', 'bentuk', 'kondisi'];
this.fasilitas = {
  pendidikan: ['jumlah siswa', 'jumlah guru', 'jumlah kelas'],
  pariwisata: ['jumlah kunjungan', 'jarak pekanbaru'],
  kesehatan: ['jumlah pasien', 'jumlah dokter', 'jumlah kapasitas'],
  industri: ['jumlah produksi'],
  kominfo: ['luas cakupan'],
  sosial: ['jumlah penghuni'],
  perhubungan: ['jumlah trafik'],
  pora: ['jumlah kegiatan'],
  kebudayaan: ['jumlah kegiatan'],
  agama: ['jumlah kegiatan']
};

_.map(_.keys(fasilitas), function (i) {
  return fasilitas[i] = [].concat(_toConsumableArray(defaults), _toConsumableArray(fasilitas[i]));
});

makeOpts = function (arr) {
  return _.map(arr, function (i) {
    return {
      value: i,
      label: _.startCase(i)
    };
  });
};

this.selects = {
  pendidikan: {
    bentuk: makeOpts(['sd', 'smp', 'sma', 'smk'])
  },
  kondisi: makeOpts(['baik', 'rusak ringan', 'rusak sedang', 'rusak berat'])
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"funcs.coffee":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// folder/funcs.coffee                                                                                              //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
if (Meteor.isClient) {
  this.currentRoute = function () {
    return Router.current().route.getName();
  };

  this.currentPar = function (name) {
    return Router.current().params[name];
  };

  AutoForm.setDefaultTemplate('materialize');
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"hooks.coffee":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// folder/hooks.coffee                                                                                              //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
if (Meteor.isClient) {
  AutoForm.addHooks('formTitik', {
    before: {
      insert: function (doc) {
        var self;
        self = this;
        return geocode.getLocation(doc.alamat, function (location) {
          var key, ref, ref1, res, val;

          for (key in meteorBabelHelpers.sanitizeForInObject(doc)) {
            val = doc[key];
            doc[key] = _.lowerCase(val);
          }

          res = location.results;

          if (res) {
            doc.latlng = (ref = res[0]) != null ? ref.geometry.location : void 0;
            doc.alamat = (ref1 = res[0]) != null ? ref1.formatted_address : void 0;
          }

          doc.kelompok = currentPar('type');
          return self.result(doc);
        });
      }
    }
  });
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"plugins":{"leafletAjax.js":function(require,exports){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// plugins/leafletAjax.js                                                                                           //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
if (Meteor.isClient) {
  !function () {
    function a(b, c, d) {
      var e = a.resolve(b);

      if (null == e) {
        d = d || b, c = c || "root";
        var f = new Error('Failed to require "' + d + '" from "' + c + '"');
        throw f.path = d, f.parent = c, f.require = !0, f;
      }

      var g = a.modules[e];
      return g.exports || (g.exports = {}, g.client = g.component = !0, g.call(this, g.exports, a.relative(e), g)), g.exports;
    }

    a.modules = {}, a.aliases = {}, a.resolve = function (b) {
      "/" === b.charAt(0) && (b = b.slice(1));

      for (var c = [b, b + ".js", b + ".json", b + "/index.js", b + "/index.json"], d = 0; d < c.length; d++) {
        var b = c[d];
        if (a.modules.hasOwnProperty(b)) return b;
        if (a.aliases.hasOwnProperty(b)) return a.aliases[b];
      }
    }, a.normalize = function (a, b) {
      var c = [];
      if ("." != b.charAt(0)) return b;
      a = a.split("/"), b = b.split("/");

      for (var d = 0; d < b.length; ++d) ".." == b[d] ? a.pop() : "." != b[d] && "" != b[d] && c.push(b[d]);

      return a.concat(c).join("/");
    }, a.register = function (b, c) {
      a.modules[b] = c;
    }, a.alias = function (b, c) {
      if (!a.modules.hasOwnProperty(b)) throw new Error('Failed to alias "' + b + '", it does not exist');
      a.aliases[c] = b;
    }, a.relative = function (b) {
      function c(a, b) {
        for (var c = a.length; c--;) if (a[c] === b) return c;

        return -1;
      }

      function d(c) {
        var e = d.resolve(c);
        return a(e, b, c);
      }

      var e = a.normalize(b, "..");
      return d.resolve = function (d) {
        var f = d.charAt(0);
        if ("/" == f) return d.slice(1);
        if ("." == f) return a.normalize(e, d);
        var g = b.split("/"),
            h = c(g, "deps") + 1;
        return h || (h = 0), d = g.slice(0, h + 1).join("/") + "/deps/" + d;
      }, d.exists = function (b) {
        return a.modules.hasOwnProperty(d.resolve(b));
      }, d;
    }, a.register("calvinmetcalf-setImmediate/lib/index.js", function (a, b, c) {
      "use strict";

      function d() {
        var a,
            b = 0,
            c = g;

        for (g = []; a = c[b++];) a();
      }

      var e,
          f = [b("./nextTick"), b("./mutation"), b("./postMessage"), b("./messageChannel"), b("./stateChange"), b("./timeout")],
          g = [];
      f.some(function (a) {
        var b = a.test();
        return b && (e = a.install(d)), b;
      });

      var h = function (a) {
        var b, c;
        return arguments.length > 1 && "function" == typeof a && (c = Array.prototype.slice.call(arguments, 1), c.unshift(void 0), a = a.bind.apply(a, c)), 1 === (b = g.push(a)) && e(d), b;
      };

      h.clear = function (a) {
        return a <= g.length && (g[a - 1] = function () {}), this;
      }, c.exports = h;
    }), a.register("calvinmetcalf-setImmediate/lib/nextTick.js", function (a) {
      "use strict";

      a.test = function () {
        return "object" == typeof process && "[object process]" === Object.prototype.toString.call(process);
      }, a.install = function () {
        return process.nextTick;
      };
    }), a.register("calvinmetcalf-setImmediate/lib/postMessage.js", function (a, b) {
      "use strict";

      var c = b("./global");
      a.test = function () {
        if (!c.postMessage || c.importScripts) return !1;
        var a = !0,
            b = c.onmessage;
        return c.onmessage = function () {
          a = !1;
        }, c.postMessage("", "*"), c.onmessage = b, a;
      }, a.install = function (a) {
        function b(b) {
          b.source === c && b.data === d && a();
        }

        var d = "com.calvinmetcalf.setImmediate" + Math.random();
        return c.addEventListener ? c.addEventListener("message", b, !1) : c.attachEvent("onmessage", b), function () {
          c.postMessage(d, "*");
        };
      };
    }), a.register("calvinmetcalf-setImmediate/lib/messageChannel.js", function (a, b) {
      "use strict";

      var c = b("./global");
      a.test = function () {
        return !!c.MessageChannel;
      }, a.install = function (a) {
        var b = new c.MessageChannel();
        return b.port1.onmessage = a, function () {
          b.port2.postMessage(0);
        };
      };
    }), a.register("calvinmetcalf-setImmediate/lib/stateChange.js", function (a, b) {
      "use strict";

      var c = b("./global");
      a.test = function () {
        return "document" in c && "onreadystatechange" in c.document.createElement("script");
      }, a.install = function (a) {
        return function () {
          var b = c.document.createElement("script");
          return b.onreadystatechange = function () {
            a(), b.onreadystatechange = null, b.parentNode.removeChild(b), b = null;
          }, c.document.documentElement.appendChild(b), a;
        };
      };
    }), a.register("calvinmetcalf-setImmediate/lib/timeout.js", function (a) {
      "use strict";

      a.test = function () {
        return !0;
      }, a.install = function (a) {
        return function () {
          setTimeout(a, 0);
        };
      };
    }), a.register("calvinmetcalf-setImmediate/lib/global.js", function (a, b, c) {
      c.exports = "object" == typeof global && global ? global : this;
    }), a.register("calvinmetcalf-setImmediate/lib/mutation.js", function (a, b) {
      "use strict";

      var c = b("./global"),
          d = c.MutationObserver || c.WebKitMutationObserver;
      a.test = function () {
        return d;
      }, a.install = function (a) {
        var b = new d(a),
            e = c.document.createElement("div");
        return b.observe(e, {
          attributes: !0
        }), c.addEventListener("unload", function () {
          b.disconnect(), b = null;
        }, !1), function () {
          e.setAttribute("drainQueue", "drainQueue");
        };
      };
    }), a.register("lie/lie.js", function (a, b, c) {
      function d(a) {
        function b(a, b) {
          return d(function (c, d) {
            k.push({
              resolve: a,
              reject: b,
              resolver: c,
              rejecter: d
            });
          });
        }

        function c(a, c) {
          return l ? l(a, c) : b(a, c);
        }

        function h(a, b) {
          for (var d, h, i = a ? "resolve" : "reject", j = 0, m = k.length; m > j; j++) d = k[j], h = d[i], "function" == typeof h ? g(f, h, b, d.resolver, d.rejecter) : a ? d.resolver(b) : d.rejecter(b);

          l = e(c, b, a);
        }

        function i(a) {
          l || h(!0, a);
        }

        function j(a) {
          l || h(!1, a);
        }

        if (!(this instanceof d)) return new d(a);
        var k = [],
            l = !1;
        this.then = c;

        try {
          a(function (a) {
            a && "function" == typeof a.then ? a.then(i, j) : i(a);
          }, j);
        } catch (m) {
          j(m);
        }
      }

      function e(a, b, c) {
        return function (e, h) {
          var i = c ? e : h;
          return "function" != typeof i ? d(function (b, c) {
            a(b, c);
          }) : d(function (a, c) {
            g(f, i, b, a, c);
          });
        };
      }

      function f(a, b, c, d) {
        try {
          var e = a(b);
          e && "function" == typeof e.then ? e.then(c, d) : c(e);
        } catch (f) {
          d(f);
        }
      }

      var g = b("immediate");
      c.exports = d;
    }), a.alias("calvinmetcalf-setImmediate/lib/index.js", "lie/deps/immediate/lib/index.js"), a.alias("calvinmetcalf-setImmediate/lib/nextTick.js", "lie/deps/immediate/lib/nextTick.js"), a.alias("calvinmetcalf-setImmediate/lib/postMessage.js", "lie/deps/immediate/lib/postMessage.js"), a.alias("calvinmetcalf-setImmediate/lib/messageChannel.js", "lie/deps/immediate/lib/messageChannel.js"), a.alias("calvinmetcalf-setImmediate/lib/stateChange.js", "lie/deps/immediate/lib/stateChange.js"), a.alias("calvinmetcalf-setImmediate/lib/timeout.js", "lie/deps/immediate/lib/timeout.js"), a.alias("calvinmetcalf-setImmediate/lib/global.js", "lie/deps/immediate/lib/global.js"), a.alias("calvinmetcalf-setImmediate/lib/mutation.js", "lie/deps/immediate/lib/mutation.js"), a.alias("calvinmetcalf-setImmediate/lib/index.js", "lie/deps/immediate/index.js"), a.alias("calvinmetcalf-setImmediate/lib/index.js", "immediate/index.js"), a.alias("calvinmetcalf-setImmediate/lib/index.js", "calvinmetcalf-setImmediate/index.js"), a.alias("lie/lie.js", "lie/index.js"), L.Util.Promise = a("lie");
  }(), L.Util.ajax = function (url, options) {
    "use strict";

    if (options = options || {}, options.jsonp) return L.Util.ajax.jsonp(url, options);
    var request,
        cancel,
        out = L.Util.Promise(function (resolve, reject) {
      var Ajax;
      cancel = reject, Ajax = void 0 === window.XMLHttpRequest ? function () {
        try {
          return new ActiveXObject("Microsoft.XMLHTTP.6.0");
        } catch (a) {
          try {
            return new ActiveXObject("Microsoft.XMLHTTP.3.0");
          } catch (b) {
            reject("XMLHttpRequest is not supported");
          }
        }
      } : window.XMLHttpRequest;
      var response;
      request = new Ajax(), request.open("GET", url), request.onreadystatechange = function () {
        4 === request.readyState && (request.status < 400 && options.local || 200 === request.status ? (window.JSON ? response = JSON.parse(request.responseText) : options.evil && (response = eval("(" + request.responseText + ")")), resolve(response)) : request.status ? reject(request.statusText) : reject("Attempted cross origin request without CORS enabled"));
      }, request.send();
    });
    return out.then(null, function (a) {
      return request.abort(), a;
    }), out.abort = cancel, out;
  }, L.Util.jsonp = function (a, b) {
    b = b || {};
    var c,
        d,
        e,
        f,
        g = document.getElementsByTagName("head")[0],
        h = L.DomUtil.create("script", "", g),
        i = L.Util.Promise(function (i, j) {
      f = j;
      var k = b.cbParam || "callback";
      b.callbackName ? c = b.callbackName : (e = "_" + ("" + Math.random()).slice(2), c = "L.Util.jsonp.cb." + e), h.type = "text/javascript", e && (L.Util.jsonp.cb[e] = function (a) {
        g.removeChild(h), delete L.Util.jsonp.cb[e], i(a);
      }), d = -1 === a.indexOf("?") ? a + "?" + k + "=" + c : a + "&" + k + "=" + c, h.src = d;
    }).then(null, function (a) {
      return g.removeChild(h), delete L.Util.ajax.cb[e], a;
    });
    return i.abort = f, i;
  }, L.Util.jsonp.cb = {}, L.GeoJSON.AJAX = L.GeoJSON.extend({
    defaultAJAXparams: {
      dataType: "json",
      callbackParam: "callback",
      local: !1,
      middleware: function (a) {
        return a;
      }
    },
    initialize: function (a, b) {
      this.urls = [], a && ("string" == typeof a ? this.urls.push(a) : "function" == typeof a.pop ? this.urls = this.urls.concat(a) : (b = a, a = void 0));
      var c = L.Util.extend({}, this.defaultAJAXparams);

      for (var d in b) this.defaultAJAXparams.hasOwnProperty(d) && (c[d] = b[d]);

      this.ajaxParams = c, this._layers = {}, L.Util.setOptions(this, b), this.on("data:loaded", function () {
        this.filter && this.refilter(this.filter);
      }, this);
      var e = this;
      this.urls.length > 0 && L.Util.Promise(function (a) {
        a();
      }).then(function () {
        e.addUrl();
      });
    },
    clearLayers: function () {
      return this.urls = [], L.GeoJSON.prototype.clearLayers.call(this), this;
    },
    addUrl: function (a) {
      var b = this;
      a && ("string" == typeof a ? b.urls.push(a) : "function" == typeof a.pop && (b.urls = b.urls.concat(a)));
      var c = b.urls.length,
          d = 0;
      b.fire("data:loading"), b.urls.forEach(function (a) {
        "json" === b.ajaxParams.dataType.toLowerCase() ? L.Util.ajax(a, b.ajaxParams).then(function (a) {
          var c = b.ajaxParams.middleware(a);
          b.addData(c), b.fire("data:progress", c);
        }, function (a) {
          b.fire("data:progress", {
            error: a
          });
        }) : "jsonp" === b.ajaxParams.dataType.toLowerCase() && L.Util.jsonp(a, b.ajaxParams).then(function (a) {
          var c = b.ajaxParams.middleware(a);
          b.addData(c), b.fire("data:progress", c);
        }, function (a) {
          b.fire("data:progress", {
            error: a
          });
        });
      }), b.on("data:progress", function () {
        ++d === c && b.fire("data:loaded");
      });
    },
    refresh: function (a) {
      a = a || this.urls, this.clearLayers(), this.addUrl(a);
    },
    refilter: function (a) {
      "function" != typeof a ? (this.filter = !1, this.eachLayer(function (a) {
        a.setStyle({
          stroke: !0,
          clickable: !0
        });
      })) : (this.filter = a, this.eachLayer(function (b) {
        a(b.feature) ? b.setStyle({
          stroke: !0,
          clickable: !0
        }) : b.setStyle({
          stroke: !1,
          clickable: !1
        });
      }));
    }
  }), L.geoJson.ajax = function (a, b) {
    return new L.GeoJSON.AJAX(a, b);
  };
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"both.coffee":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// both.coffee                                                                                                      //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});
Router.route('/', {
  action: function () {
    return this.render('home');
  }
});
this.coll = {};
this.schema = {};

_.map(_.keys(fasilitas), function (i) {
  schema[i] = {};
  return _.map(fasilitas[i], function (j) {
    var ref;
    schema[i][j] = {
      type: String,
      optional: true
    };
    schema[i].bentuk = {
      type: String,
      autoform: {
        options: (ref = selects[i]) != null ? ref.bentuk : void 0
      }
    };
    return schema[i].kondisi = {
      type: String,
      autoform: {
        options: selects.kondisi
      }
    };
  });
});

_.map(['titik', 'area', 'kurva'], function (i) {
  var arr;
  coll[i] = new Meteor.Collection(i);
  arr = ['insert', 'update', 'remove'];
  return coll[i].allow(_.zipObject(arr, _.map(arr, function (i) {
    return function () {
      return true;
    };
  })));
});

Router.route('/titik/:type/:page/:id?', {
  name: 'titik',
  action: function () {
    return this.render('titik');
  },
  waitOn: function () {
    var opt, sel;

    if (Meteor.isClient) {
      sel = {
        kelompok: currentPar('type')
      };
      opt = {
        limit: 100,
        skip: 100 * this.params.page
      };
      return Meteor.subscribe('coll', 'titik', sel, opt);
    }
  }
});

_.map(['login'], function (i) {
  return Router.route('/' + i, {
    action: function () {
      return this.render(i);
    }
  });
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"client.coffee":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// client.coffee                                                                                                    //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var globalHelpers;

if (Meteor.isClient) {
  globalHelpers = [['startCase', function (val) {
    return _.startCase(val);
  }], ['coll', function () {
    return coll;
  }], ['prop', function (obj, prop) {
    return obj[prop];
  }]];

  _.map(globalHelpers, function (i) {
    var _Template;

    return (_Template = Template).registerHelper.apply(_Template, _toConsumableArray(i));
  });

  Template.menu.helpers({
    menus: function () {
      return _.keys(fasilitas);
    }
  });
  Template.menu.events({
    'click #logout': function () {
      return Meteor.logout();
    }
  });
  Template.titik.onRendered(function () {
    return Meteor.call('latlngs', currentPar('type'), function (err, res) {
      var allMarkers, baseMaps, categories, content, map, markers, onEachFeature, overLays, riau, select, source, style, titles, topo;

      if (res) {
        $('select').material_select();
        L.Icon.Default.imagePath = '/packages/bevanhunt_leaflet/images/';
        topo = L.tileLayer.provider('OpenTopoMap');
        style = {
          color: 'white',
          weight: 2
        };

        onEachFeature = function (feature, layer) {
          return layer.bindPopup('Kab: ' + _.startCase(feature.properties.wil));
        };

        riau = L.geoJson.ajax('/maps/riau.geojson', {
          style: style,
          onEachFeature: onEachFeature
        });
        source = _.filter(res, function (i) {
          return i.latlng;
        });

        select = function (type) {
          return _.map(_.uniqBy(source, type), function (i) {
            return i[type];
          });
        };

        categories = [].concat(_toConsumableArray(select('bentuk')), _toConsumableArray(select('kondisi')));
        titles = _.map(categories, function (i) {
          return _.startCase(i);
        });

        content = function (obj) {
          var key, ref, string, val;
          string = '';
          ref = _.pick(obj, fasilitas[currentPar('type')]);

          for (key in meteorBabelHelpers.sanitizeForInObject(ref)) {
            val = ref[key];
            string += "<b>" + _.startCase(key) + ": </b>" + _.startCase(val) + "</br>";
          }

          return string;
        };

        markers = _.zipObject(titles, _.map(categories, function (i) {
          var filter;
          filter = _.filter(source, function (j) {
            return _.includes([j.bentuk, j.kondisi], i);
          });
          return filter && L.layerGroup(_.map(filter, function (j) {
            return L.marker(j.latlng).bindPopup(content(j));
          }));
        }));
        allMarkers = L.layerGroup(_.map(source, function (i) {
          return L.marker(i.latlng).bindPopup(content(i));
        }));
        map = L.map('peta', {
          center: [0.5, 101],
          zoom: 8,
          zoomControl: false,
          attributionControl: false,
          layers: [topo, riau, allMarkers]
        });
        baseMaps = {
          Topo: topo,
          Esri: L.tileLayer.provider('Esri.WorldImagery')
        };
        overLays = _.assign(markers, {
          Semua: allMarkers
        });
        return L.control.layers(baseMaps, overLays, {
          collapsed: false
        }).addTo(map);
      }
    });
  });
  Template.titik.helpers({
    heads: function () {
      return _.keys(schema[currentPar('type')]);
    },
    rows: function () {
      return _.filter(coll.titik.find().fetch(), function (i) {
        var a, b, filter;
        filter = Session.get('filter');

        a = function () {
          return i.bentuk === filter.bentuk;
        };

        b = function () {
          return i.kondisi === filter.kondisi;
        };

        if (filter) {
          return a() && b();
        } else {
          return true;
        }
      });
    },
    formType: function () {
      if (currentPar('id')) {
        return 'update';
      } else {
        return 'insert';
      }
    },
    doc: function () {
      return coll[currentRoute()].findOne({
        _id: currentPar('id')
      });
    },
    schema: function () {
      return new SimpleSchema(schema[currentPar('type')]);
    },
    showForm: function () {
      return Session.get('showForm');
    },
    filter: function (type) {
      var uniq;
      uniq = _.uniqBy(coll.titik.find().fetch(), type);
      return _.map(uniq, function (i) {
        return i[type];
      });
    }
  });
  Template.titik.events({
    'click #add': function () {
      return Session.set('showForm', !Session.get('showForm'));
    },
    'click #remove': function (event) {
      var data, dialog, doc;
      data = event.currentTarget.attributes.data.nodeValue;
      doc = coll.titik.findOne({
        _id: data
      });
      dialog = {
        title: 'Hapus Data?',
        message: 'Yakin hapus data ini?'
      };
      return new Confirmation(dialog, function (ok) {
        if (ok) {
          return Meteor.call('remove', 'titik', doc._id);
        }
      });
    },
    'dblclick #update': function (event) {
      var data, opt, sel;

      if (Meteor.userId()) {
        data = event.currentTarget.attributes.data.nodeValue;
        Router.go(currentRoute(), {
          page: 0,
          id: data,
          type: currentPar('type')
        });
        opt = {
          limit: 1
        };
        sel = {
          _id: currentPar('id')
        };
        Meteor.subscribe('coll', 'titik', sel, opt);
        return Session.set('showForm', true);
      }
    },
    'change select': function (event) {
      var obj;
      obj = {};
      obj[event.target.id] = event.target.value;
      return Session.set('filter', _.assign(Session.get('filter') || {}, obj));
    },
    'click #geocode': function () {
      return _.map(_.shuffle(coll.titik.find().fetch()), function (i) {
        return geocode.getLocation(i.alamat + ' Riau', function (location) {
          var ref, ref1, res;
          res = location.results;

          if (res) {
            i.latlng = (ref = res[0]) != null ? ref.geometry.location : void 0;
            i.alamat = (ref1 = res[0]) != null ? ref1.formatted_address : void 0;
            return Meteor.call('update', 'titik', i);
          }
        });
      });
    }
  });
  Template.login.events({
    'submit form': function (event) {
      var _Meteor;

      var creds;
      event.preventDefault();
      creds = _.map(['username', 'password'], function (i) {
        return event.target[i].value;
      });
      return (_Meteor = Meteor).loginWithPassword.apply(_Meteor, _toConsumableArray(creds).concat([function (err) {
        if (!err) {
          return Router.go('/');
        }
      }]));
    }
  });
  Template.import.events({
    'change :file': function (event, template) {
      return Papa.parse(event.target.files[0], {
        header: true,
        step: function (result) {
          var data, modifier, selector;
          data = result.data[0];
          selector = {
            nama: data.nama,
            kelompok: currentPar('type')
          };
          modifier = _.omit(data, ['nama', 'kelompok']);
          return Meteor.call('import', currentRoute(), selector, modifier);
        }
      });
    }
  });
  Template.pagination.onRendered(function () {
    return Meteor.call('length', currentRoute(), currentPar('type'), function (err, res) {
      var k, ref, results;
      return Session.set('pagins', function () {
        results = [];

        for (var k = 1, ref = (res - res % 100) / 100; 1 <= ref ? k <= ref : k >= ref; 1 <= ref ? k++ : k--) {
          results.push(k);
        }

        return results;
      }.apply(this));
    });
  });
  Template.pagination.helpers({
    pagins: function () {
      return Session.get('pagins');
    }
  });
  Template.pagination.events({
    'click #num': function (event) {
      return Router.go(currentRoute(), {
        type: currentPar('type'),
        page: parseInt(event.currentTarget.text)
      });
    }
  });
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"server.coffee":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// server.coffee                                                                                                    //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
if (Meteor.isServer) {
  Meteor.publish('coll', function (name, selector, options) {
    return coll[name].find(selector, options);
  });
  Meteor.methods({
    remove: function (name, id) {
      return coll[name].remove(id);
    },
    "import": function (name, selector, modifier) {
      return coll[name].upsert(selector, {
        $set: modifier
      });
    },
    update: function (name, doc) {
      return coll[name].update(doc._id, doc);
    },
    length: function (name, grup) {
      return coll[name].find({
        kelompok: grup
      }).fetch().length;
    },
    latlngs: function (grup) {
      var sel;
      sel = {
        kelompok: grup,
        latlng: {
          $exists: true
        }
      };
      return coll.titik.find(sel).fetch();
    }
  });
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},{
  "extensions": [
    ".js",
    ".json",
    ".coffee"
  ]
});
require("./folder/global/funcs.coffee");
require("./folder/parent/funcs.coffee");
require("./folder/arr.coffee");
require("./folder/funcs.coffee");
require("./folder/hooks.coffee");
require("./plugins/leafletAjax.js");
require("./both.coffee");
require("./client.coffee");
require("./server.coffee");
//# sourceURL=meteor://💻app/app/app.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvZm9sZGVyL2dsb2JhbC9mdW5jcy5jb2ZmZWUiLCJtZXRlb3I6Ly/wn5K7YXBwL2ZvbGRlci9wYXJlbnQvZnVuY3MuY29mZmVlIiwibWV0ZW9yOi8v8J+Su2FwcC9mb2xkZXIvYXJyLmNvZmZlZSIsIm1ldGVvcjovL/CfkrthcHAvZm9sZGVyL2Z1bmNzLmNvZmZlZSIsIm1ldGVvcjovL/CfkrthcHAvZm9sZGVyL2hvb2tzLmNvZmZlZSIsIm1ldGVvcjovL/CfkrthcHAvcGx1Z2lucy9sZWFmbGV0QWpheC5qcyIsIm1ldGVvcjovL/CfkrthcHAvYm90aC5jb2ZmZWUiLCJtZXRlb3I6Ly/wn5K7YXBwL2NsaWVudC5jb2ZmZWUiLCJtZXRlb3I6Ly/wn5K7YXBwL3NlcnZlci5jb2ZmZWUiXSwibmFtZXMiOlsiXyIsImxvZGFzaCIsIk1ldGVvciIsImlzQ2xpZW50IiwiY3VycmVudFJvdXRlIiwiUm91dGVyIiwiY3VycmVudCIsInJvdXRlIiwiZ2V0TmFtZSIsImN1cnJlbnRQYXIiLCJuYW1lIiwicGFyYW1zIiwiQXV0b0Zvcm0iLCJzZXREZWZhdWx0VGVtcGxhdGUiLCJkZWZhdWx0cyIsIm1ha2VPcHRzIiwiZmFzaWxpdGFzIiwicGVuZGlkaWthbiIsInBhcml3aXNhdGEiLCJrZXNlaGF0YW4iLCJpbmR1c3RyaSIsImtvbWluZm8iLCJzb3NpYWwiLCJwZXJodWJ1bmdhbiIsInBvcmEiLCJrZWJ1ZGF5YWFuIiwiYWdhbWEiLCJtYXAiLCJrZXlzIiwiaSIsImFyciIsInZhbHVlIiwibGFiZWwiLCJzdGFydENhc2UiLCJzZWxlY3RzIiwiYmVudHVrIiwia29uZGlzaSIsImFkZEhvb2tzIiwiYmVmb3JlIiwiaW5zZXJ0IiwiZG9jIiwic2VsZiIsImdlb2NvZGUiLCJnZXRMb2NhdGlvbiIsImFsYW1hdCIsImxvY2F0aW9uIiwia2V5IiwicmVmIiwicmVmMSIsInJlcyIsInZhbCIsImxvd2VyQ2FzZSIsInJlc3VsdHMiLCJsYXRsbmciLCJnZW9tZXRyeSIsImZvcm1hdHRlZF9hZGRyZXNzIiwia2Vsb21wb2siLCJyZXN1bHQiLCJhIiwiYiIsImMiLCJkIiwiZSIsInJlc29sdmUiLCJmIiwiRXJyb3IiLCJwYXRoIiwicGFyZW50IiwicmVxdWlyZSIsImciLCJtb2R1bGVzIiwiZXhwb3J0cyIsImNsaWVudCIsImNvbXBvbmVudCIsImNhbGwiLCJyZWxhdGl2ZSIsImFsaWFzZXMiLCJjaGFyQXQiLCJzbGljZSIsImxlbmd0aCIsImhhc093blByb3BlcnR5Iiwibm9ybWFsaXplIiwic3BsaXQiLCJwb3AiLCJwdXNoIiwiY29uY2F0Iiwiam9pbiIsInJlZ2lzdGVyIiwiYWxpYXMiLCJoIiwiZXhpc3RzIiwic29tZSIsInRlc3QiLCJpbnN0YWxsIiwiYXJndW1lbnRzIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJ1bnNoaWZ0IiwiYmluZCIsImFwcGx5IiwiY2xlYXIiLCJwcm9jZXNzIiwiT2JqZWN0IiwidG9TdHJpbmciLCJuZXh0VGljayIsInBvc3RNZXNzYWdlIiwiaW1wb3J0U2NyaXB0cyIsIm9ubWVzc2FnZSIsInNvdXJjZSIsImRhdGEiLCJNYXRoIiwicmFuZG9tIiwiYWRkRXZlbnRMaXN0ZW5lciIsImF0dGFjaEV2ZW50IiwiTWVzc2FnZUNoYW5uZWwiLCJwb3J0MSIsInBvcnQyIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50Iiwib25yZWFkeXN0YXRlY2hhbmdlIiwicGFyZW50Tm9kZSIsInJlbW92ZUNoaWxkIiwiZG9jdW1lbnRFbGVtZW50IiwiYXBwZW5kQ2hpbGQiLCJzZXRUaW1lb3V0IiwiZ2xvYmFsIiwiTXV0YXRpb25PYnNlcnZlciIsIldlYktpdE11dGF0aW9uT2JzZXJ2ZXIiLCJvYnNlcnZlIiwiYXR0cmlidXRlcyIsImRpc2Nvbm5lY3QiLCJzZXRBdHRyaWJ1dGUiLCJrIiwicmVqZWN0IiwicmVzb2x2ZXIiLCJyZWplY3RlciIsImwiLCJqIiwibSIsInRoZW4iLCJMIiwiVXRpbCIsIlByb21pc2UiLCJhamF4IiwidXJsIiwib3B0aW9ucyIsImpzb25wIiwicmVxdWVzdCIsImNhbmNlbCIsIm91dCIsIkFqYXgiLCJ3aW5kb3ciLCJYTUxIdHRwUmVxdWVzdCIsIkFjdGl2ZVhPYmplY3QiLCJyZXNwb25zZSIsIm9wZW4iLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwibG9jYWwiLCJKU09OIiwicGFyc2UiLCJyZXNwb25zZVRleHQiLCJldmlsIiwiZXZhbCIsInN0YXR1c1RleHQiLCJzZW5kIiwiYWJvcnQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsIkRvbVV0aWwiLCJjcmVhdGUiLCJjYlBhcmFtIiwiY2FsbGJhY2tOYW1lIiwidHlwZSIsImNiIiwiaW5kZXhPZiIsInNyYyIsIkdlb0pTT04iLCJBSkFYIiwiZXh0ZW5kIiwiZGVmYXVsdEFKQVhwYXJhbXMiLCJkYXRhVHlwZSIsImNhbGxiYWNrUGFyYW0iLCJtaWRkbGV3YXJlIiwiaW5pdGlhbGl6ZSIsInVybHMiLCJhamF4UGFyYW1zIiwiX2xheWVycyIsInNldE9wdGlvbnMiLCJvbiIsImZpbHRlciIsInJlZmlsdGVyIiwiYWRkVXJsIiwiY2xlYXJMYXllcnMiLCJmaXJlIiwiZm9yRWFjaCIsInRvTG93ZXJDYXNlIiwiYWRkRGF0YSIsImVycm9yIiwicmVmcmVzaCIsImVhY2hMYXllciIsInNldFN0eWxlIiwic3Ryb2tlIiwiY2xpY2thYmxlIiwiZmVhdHVyZSIsImdlb0pzb24iLCJjb25maWd1cmUiLCJsYXlvdXRUZW1wbGF0ZSIsImxvYWRpbmdUZW1wbGF0ZSIsImFjdGlvbiIsInJlbmRlciIsImNvbGwiLCJzY2hlbWEiLCJTdHJpbmciLCJvcHRpb25hbCIsImF1dG9mb3JtIiwiQ29sbGVjdGlvbiIsImFsbG93IiwiemlwT2JqZWN0Iiwid2FpdE9uIiwib3B0Iiwic2VsIiwibGltaXQiLCJza2lwIiwicGFnZSIsInN1YnNjcmliZSIsImdsb2JhbEhlbHBlcnMiLCJvYmoiLCJwcm9wIiwicmVnaXN0ZXJIZWxwZXIiLCJUZW1wbGF0ZSIsIm1lbnUiLCJoZWxwZXJzIiwibWVudXMiLCJldmVudHMiLCJsb2dvdXQiLCJ0aXRpayIsIm9uUmVuZGVyZWQiLCJlcnIiLCJhbGxNYXJrZXJzIiwiYmFzZU1hcHMiLCJjYXRlZ29yaWVzIiwiY29udGVudCIsIm1hcmtlcnMiLCJvbkVhY2hGZWF0dXJlIiwib3ZlckxheXMiLCJyaWF1Iiwic2VsZWN0Iiwic3R5bGUiLCJ0aXRsZXMiLCJ0b3BvIiwiJCIsIm1hdGVyaWFsX3NlbGVjdCIsIkljb24iLCJEZWZhdWx0IiwiaW1hZ2VQYXRoIiwidGlsZUxheWVyIiwicHJvdmlkZXIiLCJjb2xvciIsIndlaWdodCIsImxheWVyIiwiYmluZFBvcHVwIiwicHJvcGVydGllcyIsIndpbCIsInVuaXFCeSIsInN0cmluZyIsInBpY2siLCJpbmNsdWRlcyIsImxheWVyR3JvdXAiLCJtYXJrZXIiLCJjZW50ZXIiLCJ6b29tIiwiem9vbUNvbnRyb2wiLCJhdHRyaWJ1dGlvbkNvbnRyb2wiLCJsYXllcnMiLCJUb3BvIiwiRXNyaSIsImFzc2lnbiIsIlNlbXVhIiwiY29udHJvbCIsImNvbGxhcHNlZCIsImFkZFRvIiwiaGVhZHMiLCJyb3dzIiwiZmluZCIsImZldGNoIiwiU2Vzc2lvbiIsImdldCIsImZvcm1UeXBlIiwiZmluZE9uZSIsIl9pZCIsIlNpbXBsZVNjaGVtYSIsInNob3dGb3JtIiwidW5pcSIsInNldCIsImV2ZW50IiwiZGlhbG9nIiwiY3VycmVudFRhcmdldCIsIm5vZGVWYWx1ZSIsInRpdGxlIiwibWVzc2FnZSIsIkNvbmZpcm1hdGlvbiIsIm9rIiwidXNlcklkIiwiZ28iLCJpZCIsInRhcmdldCIsInNodWZmbGUiLCJsb2dpbiIsImNyZWRzIiwicHJldmVudERlZmF1bHQiLCJsb2dpbldpdGhQYXNzd29yZCIsImltcG9ydCIsInRlbXBsYXRlIiwiUGFwYSIsImZpbGVzIiwiaGVhZGVyIiwic3RlcCIsIm1vZGlmaWVyIiwic2VsZWN0b3IiLCJuYW1hIiwib21pdCIsInBhZ2luYXRpb24iLCJwYWdpbnMiLCJwYXJzZUludCIsInRleHQiLCJpc1NlcnZlciIsInB1Ymxpc2giLCJtZXRob2RzIiwicmVtb3ZlIiwidXBzZXJ0IiwiJHNldCIsInVwZGF0ZSIsImdydXAiLCJsYXRsbmdzIiwiJGV4aXN0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsS0FBQ0EsQ0FBRCxHQUFLQyxNQUFMLEM7Ozs7Ozs7Ozs7OztBQ0FBLEtBQUNELENBQUQsR0FBS0MsTUFBTDs7QUFFQSxJQUFHQyxPQUFPQyxRQUFWO0FBRUMsT0FBQ0MsWUFBRCxHQUFnQjtBQUFiLFdBQWdCQyxPQUFPQyxPQUFQLEdBQWlCQyxLQUFqQixDQUF1QkMsT0FBdkIsRUFBaEI7QUFBYSxHQUFoQjs7QUFDQSxPQUFDQyxVQUFELEdBQWMsVUFBQ0MsSUFBRDtBQUVYLFdBRnFCTCxPQUFPQyxPQUFQLEdBQWlCSyxNQUFqQixDQUF3QkQsSUFBeEIsQ0FFckI7QUFGVyxHQUFkOztBQUNBRSxXQUFTQyxrQkFBVCxDQUE0QixhQUE1QjtBQUlBLEM7Ozs7Ozs7Ozs7Ozs7O0FDVkQsSUFBQUMsUUFBQSxFQUFBQyxRQUFBO0FBQUFELFdBQVcsQ0FBQyxNQUFELEVBQVMsUUFBVCxFQUFtQixRQUFuQixFQUE2QixTQUE3QixDQUFYO0FBQ0EsS0FBQ0UsU0FBRCxHQUNDO0FBQUFDLGNBQVksQ0FBQyxjQUFELEVBQWlCLGFBQWpCLEVBQWdDLGNBQWhDLENBQVo7QUFDQUMsY0FBWSxDQUFDLGtCQUFELEVBQXFCLGlCQUFyQixDQURaO0FBRUFDLGFBQVcsQ0FBQyxlQUFELEVBQWtCLGVBQWxCLEVBQW1DLGtCQUFuQyxDQUZYO0FBR0FDLFlBQVUsQ0FBQyxpQkFBRCxDQUhWO0FBSUFDLFdBQVMsQ0FBQyxjQUFELENBSlQ7QUFLQUMsVUFBUSxDQUFDLGlCQUFELENBTFI7QUFNQUMsZUFBYSxDQUFDLGVBQUQsQ0FOYjtBQU9BQyxRQUFNLENBQUMsaUJBQUQsQ0FQTjtBQVFBQyxjQUFZLENBQUMsaUJBQUQsQ0FSWjtBQVNBQyxTQUFPLENBQUMsaUJBQUQ7QUFUUCxDQUREOztBQVlBMUIsRUFBRTJCLEdBQUYsQ0FBTzNCLEVB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QzVULElBQUQsRUFBT29ULFFBQVAsRUFBaUI3SyxPQUFqQjtBQUFwQixXQUNGaUUsS0FBS3hNLElBQUwsRUFBV2lSLElBQVgsQ0FBZ0JtQyxRQUFoQixFQUEwQjdLLE9BQTFCLENBREU7QUFBSDtBQUdBL0ksU0FBT3FVLE9BQVAsQ0FDQztBQUFBQyxZQUFRLFVBQUM5VCxJQUFELEVBQU9zUyxFQUFQO0FBQUosYUFDSDlGLEtBQUt4TSxJQUFMLEVBQVc4VCxNQUFYLENBQWtCeEIsRUFBbEIsQ0FERztBQUFKO0FBRUEsY0FBUSxVQUFDdFMsSUFBRCxFQUFPb1QsUUFBUCxFQUFpQkQsUUFBakI7QUFDSixhQUFIM0csS0FBS3hNLElBQUwsRUFBVytULE1BQVgsQ0FBa0JYLFFBQWxCLEVBQTRCO0FBQUFZLGNBQU1iO0FBQU4sT0FBNUIsQ0FBRztBQUhKO0FBSUFjLFlBQVEsVUFBQ2pVLElBQUQsRUFBTzhCLEdBQVA7QUFJSixhQUhIMEssS0FBS3hNLElBQUwsRUFBV2lVLE1BQVgsQ0FBa0JuUyxJQUFJeVAsR0FBdEIsRUFBMkJ6UCxHQUEzQixDQUdHO0FBUko7QUFNQXVDLFlBQVEsVUFBQ3JFLElBQUQsRUFBT2tVLElBQVA7QUFLSixhQUpIMUgsS0FBS3hNLElBQUwsRUFBV2lSLElBQVgsQ0FBZ0I7QUFBQW5PLGtCQUFVb1I7QUFBVixPQUFoQixFQUFnQ2hELEtBQWhDLEdBQXdDN00sTUFJckM7QUFYSjtBQVFBOFAsYUFBUyxVQUFDRCxJQUFEO0FBQ1IsVUFBQWhILEdBQUE7QUFBQUEsWUFBTTtBQUFBcEssa0JBQVVvUixJQUFWO0FBQWdCdlIsZ0JBQVE7QUFBQXlSLG1CQUFTO0FBQVQ7QUFBeEIsT0FBTjtBQWNHLGFBYkg1SCxLQUFLeUIsS0FBTCxDQUFXZ0QsSUFBWCxDQUFnQi9ELEdBQWhCLEVBQXFCZ0UsS0FBckIsRUFhRztBQWZLO0FBUlQsR0FERDtBQTJCQSxDIiwiZmlsZSI6Ii9hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJAXyA9IGxvZGFzaFxuIiwiQF8gPSBsb2Rhc2hcblxuaWYgTWV0ZW9yLmlzQ2xpZW50XG5cblx0QGN1cnJlbnRSb3V0ZSA9IC0+IFJvdXRlci5jdXJyZW50KCkucm91dGUuZ2V0TmFtZSgpXG5cdEBjdXJyZW50UGFyID0gKG5hbWUpIC0+IFJvdXRlci5jdXJyZW50KCkucGFyYW1zW25hbWVdXG5cdEF1dG9Gb3JtLnNldERlZmF1bHRUZW1wbGF0ZSAnbWF0ZXJpYWxpemUnXG4iLCJkZWZhdWx0cyA9IFsnbmFtYScsICdhbGFtYXQnLCAnYmVudHVrJywgJ2tvbmRpc2knXVxuQGZhc2lsaXRhcyA9XG5cdHBlbmRpZGlrYW46IFsnanVtbGFoIHNpc3dhJywgJ2p1bWxhaCBndXJ1JywgJ2p1bWxhaCBrZWxhcyddXG5cdHBhcml3aXNhdGE6IFsnanVtbGFoIGt1bmp1bmdhbicsICdqYXJhayBwZWthbmJhcnUnXVxuXHRrZXNlaGF0YW46IFsnanVtbGFoIHBhc2llbicsICdqdW1sYWggZG9rdGVyJywgJ2p1bWxhaCBrYXBhc2l0YXMnXVxuXHRpbmR1c3RyaTogWydqdW1sYWggcHJvZHVrc2knXVxuXHRrb21pbmZvOiBbJ2x1YXMgY2FrdXBhbiddXG5cdHNvc2lhbDogWydqdW1sYWggcGVuZ2h1bmknXVxuXHRwZXJodWJ1bmdhbjogWydqdW1sYWggdHJhZmlrJ11cblx0cG9yYTogWydqdW1sYWgga2VnaWF0YW4nXVxuXHRrZWJ1ZGF5YWFuOiBbJ2p1bWxhaCBrZWdpYXRhbiddXG5cdGFnYW1hOiBbJ2p1bWxhaCBrZWdpYXRhbiddXG5cbl8ubWFwIChfLmtleXMgZmFzaWxpdGFzKSwgKGkpIC0+XG5cdGZhc2lsaXRhc1tpXSA9IFtkZWZhdWx0cy4uLiwgZmFzaWxpdGFzW2ldLi4uXVxuXG5tYWtlT3B0cyA9IChhcnIpIC0+IF8ubWFwIGFyciwgKGkpIC0+IHZhbHVlOiBpLCBsYWJlbDogXy5zdGFydENhc2UgaVxuXG5Ac2VsZWN0cyA9XG5cdHBlbmRpZGlrYW46XG5cdFx0YmVudHVrOiBtYWtlT3B0cyBbJ3NkJywgJ3NtcCcsICdzbWEnLCAnc21rJ11cblx0a29uZGlzaTogbWFrZU9wdHMgWydiYWlrJywgJ3J1c2FrIHJpbmdhbicsICdydXNhayBzZWRhbmcnLCAncnVzYWsgYmVyYXQnXVxuIiwiaWYgTWV0ZW9yLmlzQ2xpZW50XG5cblx0QGN1cnJlbnRSb3V0ZSA9IC0+IFJvdXRlci5jdXJyZW50KCkucm91dGUuZ2V0TmFtZSgpXG5cdEBjdXJyZW50UGFyID0gKG5hbWUpIC0+IFJvdXRlci5jdXJyZW50KCkucGFyYW1zW25hbWVdXG5cdEF1dG9Gb3JtLnNldERlZmF1bHRUZW1wbGF0ZSAnbWF0ZXJpYWxpemUnXG4iLCJpZiBNZXRlb3IuaXNDbGllbnRcblxuXHRBdXRvRm9ybS5hZGRIb29rcyAnZm9ybVRpdGlrJyxcblx0XHRiZWZvcmU6XG5cdFx0XHRpbnNlcnQ6IChkb2MpIC0+XG5cdFx0XHRcdHNlbGYgPSB0aGlzXG5cdFx0XHRcdGdlb2NvZGUuZ2V0TG9jYXRpb24gZG9jLmFsYW1hdCwgKGxvY2F0aW9uKSAtPlxuXHRcdFx0XHRcdGRvY1trZXldID0gXy5sb3dlckNhc2UgdmFsIGZvciBrZXksIHZhbCBvZiBkb2Ncblx0XHRcdFx0XHRyZXMgPSBsb2NhdGlvbi5yZXN1bHRzXG5cdFx0XHRcdFx0aWYgcmVzXG5cdFx0XHRcdFx0XHRkb2MubGF0bG5nID0gcmVzWzBdPy5nZW9tZXRyeS5sb2NhdGlvblxuXHRcdFx0XHRcdFx0ZG9jLmFsYW1hdCA9IHJlc1swXT8uZm9ybWF0dGVkX2FkZHJlc3Ncblx0XHRcdFx0XHRkb2Mua2Vsb21wb2sgPSBjdXJyZW50UGFyICd0eXBlJ1xuXHRcdFx0XHRcdHNlbGYucmVzdWx0IGRvY1xuIiwiaWYoTWV0ZW9yLmlzQ2xpZW50KSB7IWZ1bmN0aW9uKCl7ZnVuY3Rpb24gYShiLGMsZCl7dmFyIGU9YS5yZXNvbHZlKGIpO2lmKG51bGw9PWUpe2Q9ZHx8YixjPWN8fFwicm9vdFwiO3ZhciBmPW5ldyBFcnJvcignRmFpbGVkIHRvIHJlcXVpcmUgXCInK2QrJ1wiIGZyb20gXCInK2MrJ1wiJyk7dGhyb3cgZi5wYXRoPWQsZi5wYXJlbnQ9YyxmLnJlcXVpcmU9ITAsZn12YXIgZz1hLm1vZHVsZXNbZV07cmV0dXJuIGcuZXhwb3J0c3x8KGcuZXhwb3J0cz17fSxnLmNsaWVudD1nLmNvbXBvbmVudD0hMCxnLmNhbGwodGhpcyxnLmV4cG9ydHMsYS5yZWxhdGl2ZShlKSxnKSksZy5leHBvcnRzfWEubW9kdWxlcz17fSxhLmFsaWFzZXM9e30sYS5yZXNvbHZlPWZ1bmN0aW9uKGIpe1wiL1wiPT09Yi5jaGFyQXQoMCkmJihiPWIuc2xpY2UoMSkpO2Zvcih2YXIgYz1bYixiK1wiLmpzXCIsYitcIi5qc29uXCIsYitcIi9pbmRleC5qc1wiLGIrXCIvaW5kZXguanNvblwiXSxkPTA7ZDxjLmxlbmd0aDtkKyspe3ZhciBiPWNbZF07aWYoYS5tb2R1bGVzLmhhc093blByb3BlcnR5KGIpKXJldHVybiBiO2lmKGEuYWxpYXNlcy5oYXNPd25Qcm9wZXJ0eShiKSlyZXR1cm4gYS5hbGlhc2VzW2JdfX0sYS5ub3JtYWxpemU9ZnVuY3Rpb24oYSxiKXt2YXIgYz1bXTtpZihcIi5cIiE9Yi5jaGFyQXQoMCkpcmV0dXJuIGI7YT1hLnNwbGl0KFwiL1wiKSxiPWIuc3BsaXQoXCIvXCIpO2Zvcih2YXIgZD0wO2Q8Yi5sZW5ndGg7KytkKVwiLi5cIj09YltkXT9hLnBvcCgpOlwiLlwiIT1iW2RdJiZcIlwiIT1iW2RdJiZjLnB1c2goYltkXSk7cmV0dXJuIGEuY29uY2F0KGMpLmpvaW4oXCIvXCIpfSxhLnJlZ2lzdGVyPWZ1bmN0aW9uKGIsYyl7YS5tb2R1bGVzW2JdPWN9LGEuYWxpYXM9ZnVuY3Rpb24oYixjKXtpZighYS5tb2R1bGVzLmhhc093blByb3BlcnR5KGIpKXRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIGFsaWFzIFwiJytiKydcIiwgaXQgZG9lcyBub3QgZXhpc3QnKTthLmFsaWFzZXNbY109Yn0sYS5yZWxhdGl2ZT1mdW5jdGlvbihiKXtmdW5jdGlvbiBjKGEsYil7Zm9yKHZhciBjPWEubGVuZ3RoO2MtLTspaWYoYVtjXT09PWIpcmV0dXJuIGM7cmV0dXJuLTF9ZnVuY3Rpb24gZChjKXt2YXIgZT1kLnJlc29sdmUoYyk7cmV0dXJuIGEoZSxiLGMpfXZhciBlPWEubm9ybWFsaXplKGIsXCIuLlwiKTtyZXR1cm4gZC5yZXNvbHZlPWZ1bmN0aW9uKGQpe3ZhciBmPWQuY2hhckF0KDApO2lmKFwiL1wiPT1mKXJldHVybiBkLnNsaWNlKDEpO2lmKFwiLlwiPT1mKXJldHVybiBhLm5vcm1hbGl6ZShlLGQpO3ZhciBnPWIuc3BsaXQoXCIvXCIpLGg9YyhnLFwiZGVwc1wiKSsxO3JldHVybiBofHwoaD0wKSxkPWcuc2xpY2UoMCxoKzEpLmpvaW4oXCIvXCIpK1wiL2RlcHMvXCIrZH0sZC5leGlzdHM9ZnVuY3Rpb24oYil7cmV0dXJuIGEubW9kdWxlcy5oYXNPd25Qcm9wZXJ0eShkLnJlc29sdmUoYikpfSxkfSxhLnJlZ2lzdGVyKFwiY2FsdmlubWV0Y2FsZi1zZXRJbW1lZGlhdGUvbGliL2luZGV4LmpzXCIsZnVuY3Rpb24oYSxiLGMpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIGQoKXt2YXIgYSxiPTAsYz1nO2ZvcihnPVtdO2E9Y1tiKytdOylhKCl9dmFyIGUsZj1bYihcIi4vbmV4dFRpY2tcIiksYihcIi4vbXV0YXRpb25cIiksYihcIi4vcG9zdE1lc3NhZ2VcIiksYihcIi4vbWVzc2FnZUNoYW5uZWxcIiksYihcIi4vc3RhdGVDaGFuZ2VcIiksYihcIi4vdGltZW91dFwiKV0sZz1bXTtmLnNvbWUoZnVuY3Rpb24oYSl7dmFyIGI9YS50ZXN0KCk7cmV0dXJuIGImJihlPWEuaW5zdGFsbChkKSksYn0pO3ZhciBoPWZ1bmN0aW9uKGEpe3ZhciBiLGM7cmV0dXJuIGFyZ3VtZW50cy5sZW5ndGg+MSYmXCJmdW5jdGlvblwiPT10eXBlb2YgYSYmKGM9QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLDEpLGMudW5zaGlmdCh2b2lkIDApLGE9YS5iaW5kLmFwcGx5KGEsYykpLDE9PT0oYj1nLnB1c2goYSkpJiZlKGQpLGJ9O2guY2xlYXI9ZnVuY3Rpb24oYSl7cmV0dXJuIGE8PWcubGVuZ3RoJiYoZ1thLTFdPWZ1bmN0aW9uKCl7fSksdGhpc30sYy5leHBvcnRzPWh9KSxhLnJlZ2lzdGVyKFwiY2FsdmlubWV0Y2FsZi1zZXRJbW1lZGlhdGUvbGliL25leHRUaWNrLmpzXCIsZnVuY3Rpb24oYSl7XCJ1c2Ugc3RyaWN0XCI7YS50ZXN0PWZ1bmN0aW9uKCl7cmV0dXJuXCJvYmplY3RcIj09dHlwZW9mIHByb2Nlc3MmJlwiW29iamVjdCBwcm9jZXNzXVwiPT09T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHByb2Nlc3MpfSxhLmluc3RhbGw9ZnVuY3Rpb24oKXtyZXR1cm4gcHJvY2Vzcy5uZXh0VGlja319KSxhLnJlZ2lzdGVyKFwiY2FsdmlubWV0Y2FsZi1zZXRJbW1lZGlhdGUvbGliL3Bvc3RNZXNzYWdlLmpzXCIsZnVuY3Rpb24oYSxiKXtcInVzZSBzdHJpY3RcIjt2YXIgYz1iKFwiLi9nbG9iYWxcIik7YS50ZXN0PWZ1bmN0aW9uKCl7aWYoIWMucG9zdE1lc3NhZ2V8fGMuaW1wb3J0U2NyaXB0cylyZXR1cm4hMTt2YXIgYT0hMCxiPWMub25tZXNzYWdlO3JldHVybiBjLm9ubWVzc2FnZT1mdW5jdGlvbigpe2E9ITF9LGMucG9zdE1lc3NhZ2UoXCJcIixcIipcIiksYy5vbm1lc3NhZ2U9YixhfSxhLmluc3RhbGw9ZnVuY3Rpb24oYSl7ZnVuY3Rpb24gYihiKXtiLnNvdXJjZT09PWMmJmIuZGF0YT09PWQmJmEoKX12YXIgZD1cImNvbS5jYWx2aW5tZXRjYWxmLnNldEltbWVkaWF0ZVwiK01hdGgucmFuZG9tKCk7cmV0dXJuIGMuYWRkRXZlbnRMaXN0ZW5lcj9jLmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsYiwhMSk6Yy5hdHRhY2hFdmVudChcIm9ubWVzc2FnZVwiLGIpLGZ1bmN0aW9uKCl7Yy5wb3N0TWVzc2FnZShkLFwiKlwiKX19fSksYS5yZWdpc3RlcihcImNhbHZpbm1ldGNhbGYtc2V0SW1tZWRpYXRlL2xpYi9tZXNzYWdlQ2hhbm5lbC5qc1wiLGZ1bmN0aW9uKGEsYil7XCJ1c2Ugc3RyaWN0XCI7dmFyIGM9YihcIi4vZ2xvYmFsXCIpO2EudGVzdD1mdW5jdGlvbigpe3JldHVybiEhYy5NZXNzYWdlQ2hhbm5lbH0sYS5pbnN0YWxsPWZ1bmN0aW9uKGEpe3ZhciBiPW5ldyBjLk1lc3NhZ2VDaGFubmVsO3JldHVybiBiLnBvcnQxLm9ubWVzc2FnZT1hLGZ1bmN0aW9uKCl7Yi5wb3J0Mi5wb3N0TWVzc2FnZSgwKX19fSksYS5yZWdpc3RlcihcImNhbHZpbm1ldGNhbGYtc2V0SW1tZWRpYXRlL2xpYi9zdGF0ZUNoYW5nZS5qc1wiLGZ1bmN0aW9uKGEsYil7XCJ1c2Ugc3RyaWN0XCI7dmFyIGM9YihcIi4vZ2xvYmFsXCIpO2EudGVzdD1mdW5jdGlvbigpe3JldHVyblwiZG9jdW1lbnRcImluIGMmJlwib25yZWFkeXN0YXRlY2hhbmdlXCJpbiBjLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIil9LGEuaW5zdGFsbD1mdW5jdGlvbihhKXtyZXR1cm4gZnVuY3Rpb24oKXt2YXIgYj1jLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7cmV0dXJuIGIub25yZWFkeXN0YXRlY2hhbmdlPWZ1bmN0aW9uKCl7YSgpLGIub25yZWFkeXN0YXRlY2hhbmdlPW51bGwsYi5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGIpLGI9bnVsbH0sYy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYXBwZW5kQ2hpbGQoYiksYX19fSksYS5yZWdpc3RlcihcImNhbHZpbm1ldGNhbGYtc2V0SW1tZWRpYXRlL2xpYi90aW1lb3V0LmpzXCIsZnVuY3Rpb24oYSl7XCJ1c2Ugc3RyaWN0XCI7YS50ZXN0PWZ1bmN0aW9uKCl7cmV0dXJuITB9LGEuaW5zdGFsbD1mdW5jdGlvbihhKXtyZXR1cm4gZnVuY3Rpb24oKXtzZXRUaW1lb3V0KGEsMCl9fX0pLGEucmVnaXN0ZXIoXCJjYWx2aW5tZXRjYWxmLXNldEltbWVkaWF0ZS9saWIvZ2xvYmFsLmpzXCIsZnVuY3Rpb24oYSxiLGMpe2MuZXhwb3J0cz1cIm9iamVjdFwiPT10eXBlb2YgZ2xvYmFsJiZnbG9iYWw/Z2xvYmFsOnRoaXN9KSxhLnJlZ2lzdGVyKFwiY2FsdmlubWV0Y2FsZi1zZXRJbW1lZGlhdGUvbGliL211dGF0aW9uLmpzXCIsZnVuY3Rpb24oYSxiKXtcInVzZSBzdHJpY3RcIjt2YXIgYz1iKFwiLi9nbG9iYWxcIiksZD1jLk11dGF0aW9uT2JzZXJ2ZXJ8fGMuV2ViS2l0TXV0YXRpb25PYnNlcnZlcjthLnRlc3Q9ZnVuY3Rpb24oKXtyZXR1cm4gZH0sYS5pbnN0YWxsPWZ1bmN0aW9uKGEpe3ZhciBiPW5ldyBkKGEpLGU9Yy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO3JldHVybiBiLm9ic2VydmUoZSx7YXR0cmlidXRlczohMH0pLGMuYWRkRXZlbnRMaXN0ZW5lcihcInVubG9hZFwiLGZ1bmN0aW9uKCl7Yi5kaXNjb25uZWN0KCksYj1udWxsfSwhMSksZnVuY3Rpb24oKXtlLnNldEF0dHJpYnV0ZShcImRyYWluUXVldWVcIixcImRyYWluUXVldWVcIil9fX0pLGEucmVnaXN0ZXIoXCJsaWUvbGllLmpzXCIsZnVuY3Rpb24oYSxiLGMpe2Z1bmN0aW9uIGQoYSl7ZnVuY3Rpb24gYihhLGIpe3JldHVybiBkKGZ1bmN0aW9uKGMsZCl7ay5wdXNoKHtyZXNvbHZlOmEscmVqZWN0OmIscmVzb2x2ZXI6YyxyZWplY3RlcjpkfSl9KX1mdW5jdGlvbiBjKGEsYyl7cmV0dXJuIGw/bChhLGMpOmIoYSxjKX1mdW5jdGlvbiBoKGEsYil7Zm9yKHZhciBkLGgsaT1hP1wicmVzb2x2ZVwiOlwicmVqZWN0XCIsaj0wLG09ay5sZW5ndGg7bT5qO2orKylkPWtbal0saD1kW2ldLFwiZnVuY3Rpb25cIj09dHlwZW9mIGg/ZyhmLGgsYixkLnJlc29sdmVyLGQucmVqZWN0ZXIpOmE/ZC5yZXNvbHZlcihiKTpkLnJlamVjdGVyKGIpO2w9ZShjLGIsYSl9ZnVuY3Rpb24gaShhKXtsfHxoKCEwLGEpfWZ1bmN0aW9uIGooYSl7bHx8aCghMSxhKX1pZighKHRoaXMgaW5zdGFuY2VvZiBkKSlyZXR1cm4gbmV3IGQoYSk7dmFyIGs9W10sbD0hMTt0aGlzLnRoZW49Yzt0cnl7YShmdW5jdGlvbihhKXthJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBhLnRoZW4/YS50aGVuKGksaik6aShhKX0sail9Y2F0Y2gobSl7aihtKX19ZnVuY3Rpb24gZShhLGIsYyl7cmV0dXJuIGZ1bmN0aW9uKGUsaCl7dmFyIGk9Yz9lOmg7cmV0dXJuXCJmdW5jdGlvblwiIT10eXBlb2YgaT9kKGZ1bmN0aW9uKGIsYyl7YShiLGMpfSk6ZChmdW5jdGlvbihhLGMpe2coZixpLGIsYSxjKX0pfX1mdW5jdGlvbiBmKGEsYixjLGQpe3RyeXt2YXIgZT1hKGIpO2UmJlwiZnVuY3Rpb25cIj09dHlwZW9mIGUudGhlbj9lLnRoZW4oYyxkKTpjKGUpfWNhdGNoKGYpe2QoZil9fXZhciBnPWIoXCJpbW1lZGlhdGVcIik7Yy5leHBvcnRzPWR9KSxhLmFsaWFzKFwiY2FsdmlubWV0Y2FsZi1zZXRJbW1lZGlhdGUvbGliL2luZGV4LmpzXCIsXCJsaWUvZGVwcy9pbW1lZGlhdGUvbGliL2luZGV4LmpzXCIpLGEuYWxpYXMoXCJjYWx2aW5tZXRjYWxmLXNldEltbWVkaWF0ZS9saWIvbmV4dFRpY2suanNcIixcImxpZS9kZXBzL2ltbWVkaWF0ZS9saWIvbmV4dFRpY2suanNcIiksYS5hbGlhcyhcImNhbHZpbm1ldGNhbGYtc2V0SW1tZWRpYXRlL2xpYi9wb3N0TWVzc2FnZS5qc1wiLFwibGllL2RlcHMvaW1tZWRpYXRlL2xpYi9wb3N0TWVzc2FnZS5qc1wiKSxhLmFsaWFzKFwiY2FsdmlubWV0Y2FsZi1zZXRJbW1lZGlhdGUvbGliL21lc3NhZ2VDaGFubmVsLmpzXCIsXCJsaWUvZGVwcy9pbW1lZGlhdGUvbGliL21lc3NhZ2VDaGFubmVsLmpzXCIpLGEuYWxpYXMoXCJjYWx2aW5tZXRjYWxmLXNldEltbWVkaWF0ZS9saWIvc3RhdGVDaGFuZ2UuanNcIixcImxpZS9kZXBzL2ltbWVkaWF0ZS9saWIvc3RhdGVDaGFuZ2UuanNcIiksYS5hbGlhcyhcImNhbHZpbm1ldGNhbGYtc2V0SW1tZWRpYXRlL2xpYi90aW1lb3V0LmpzXCIsXCJsaWUvZGVwcy9pbW1lZGlhdGUvbGliL3RpbWVvdXQuanNcIiksYS5hbGlhcyhcImNhbHZpbm1ldGNhbGYtc2V0SW1tZWRpYXRlL2xpYi9nbG9iYWwuanNcIixcImxpZS9kZXBzL2ltbWVkaWF0ZS9saWIvZ2xvYmFsLmpzXCIpLGEuYWxpYXMoXCJjYWx2aW5tZXRjYWxmLXNldEltbWVkaWF0ZS9saWIvbXV0YXRpb24uanNcIixcImxpZS9kZXBzL2ltbWVkaWF0ZS9saWIvbXV0YXRpb24uanNcIiksYS5hbGlhcyhcImNhbHZpbm1ldGNhbGYtc2V0SW1tZWRpYXRlL2xpYi9pbmRleC5qc1wiLFwibGllL2RlcHMvaW1tZWRpYXRlL2luZGV4LmpzXCIpLGEuYWxpYXMoXCJjYWx2aW5tZXRjYWxmLXNldEltbWVkaWF0ZS9saWIvaW5kZXguanNcIixcImltbWVkaWF0ZS9pbmRleC5qc1wiKSxhLmFsaWFzKFwiY2FsdmlubWV0Y2FsZi1zZXRJbW1lZGlhdGUvbGliL2luZGV4LmpzXCIsXCJjYWx2aW5tZXRjYWxmLXNldEltbWVkaWF0ZS9pbmRleC5qc1wiKSxhLmFsaWFzKFwibGllL2xpZS5qc1wiLFwibGllL2luZGV4LmpzXCIpLEwuVXRpbC5Qcm9taXNlPWEoXCJsaWVcIil9KCksTC5VdGlsLmFqYXg9ZnVuY3Rpb24odXJsLG9wdGlvbnMpe1widXNlIHN0cmljdFwiO2lmKG9wdGlvbnM9b3B0aW9uc3x8e30sb3B0aW9ucy5qc29ucClyZXR1cm4gTC5VdGlsLmFqYXguanNvbnAodXJsLG9wdGlvbnMpO3ZhciByZXF1ZXN0LGNhbmNlbCxvdXQ9TC5VdGlsLlByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSxyZWplY3Qpe3ZhciBBamF4O2NhbmNlbD1yZWplY3QsQWpheD12b2lkIDA9PT13aW5kb3cuWE1MSHR0cFJlcXVlc3Q/ZnVuY3Rpb24oKXt0cnl7cmV0dXJuIG5ldyBBY3RpdmVYT2JqZWN0KFwiTWljcm9zb2Z0LlhNTEhUVFAuNi4wXCIpfWNhdGNoKGEpe3RyeXtyZXR1cm4gbmV3IEFjdGl2ZVhPYmplY3QoXCJNaWNyb3NvZnQuWE1MSFRUUC4zLjBcIil9Y2F0Y2goYil7cmVqZWN0KFwiWE1MSHR0cFJlcXVlc3QgaXMgbm90IHN1cHBvcnRlZFwiKX19fTp3aW5kb3cuWE1MSHR0cFJlcXVlc3Q7dmFyIHJlc3BvbnNlO3JlcXVlc3Q9bmV3IEFqYXgscmVxdWVzdC5vcGVuKFwiR0VUXCIsdXJsKSxyZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZT1mdW5jdGlvbigpezQ9PT1yZXF1ZXN0LnJlYWR5U3RhdGUmJihyZXF1ZXN0LnN0YXR1czw0MDAmJm9wdGlvbnMubG9jYWx8fDIwMD09PXJlcXVlc3Quc3RhdHVzPyh3aW5kb3cuSlNPTj9yZXNwb25zZT1KU09OLnBhcnNlKHJlcXVlc3QucmVzcG9uc2VUZXh0KTpvcHRpb25zLmV2aWwmJihyZXNwb25zZT1ldmFsKFwiKFwiK3JlcXVlc3QucmVzcG9uc2VUZXh0K1wiKVwiKSkscmVzb2x2ZShyZXNwb25zZSkpOnJlcXVlc3Quc3RhdHVzP3JlamVjdChyZXF1ZXN0LnN0YXR1c1RleHQpOnJlamVjdChcIkF0dGVtcHRlZCBjcm9zcyBvcmlnaW4gcmVxdWVzdCB3aXRob3V0IENPUlMgZW5hYmxlZFwiKSl9LHJlcXVlc3Quc2VuZCgpfSk7cmV0dXJuIG91dC50aGVuKG51bGwsZnVuY3Rpb24oYSl7cmV0dXJuIHJlcXVlc3QuYWJvcnQoKSxhfSksb3V0LmFib3J0PWNhbmNlbCxvdXR9LEwuVXRpbC5qc29ucD1mdW5jdGlvbihhLGIpe2I9Ynx8e307dmFyIGMsZCxlLGYsZz1kb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF0saD1MLkRvbVV0aWwuY3JlYXRlKFwic2NyaXB0XCIsXCJcIixnKSxpPUwuVXRpbC5Qcm9taXNlKGZ1bmN0aW9uKGksail7Zj1qO3ZhciBrPWIuY2JQYXJhbXx8XCJjYWxsYmFja1wiO2IuY2FsbGJhY2tOYW1lP2M9Yi5jYWxsYmFja05hbWU6KGU9XCJfXCIrKFwiXCIrTWF0aC5yYW5kb20oKSkuc2xpY2UoMiksYz1cIkwuVXRpbC5qc29ucC5jYi5cIitlKSxoLnR5cGU9XCJ0ZXh0L2phdmFzY3JpcHRcIixlJiYoTC5VdGlsLmpzb25wLmNiW2VdPWZ1bmN0aW9uKGEpe2cucmVtb3ZlQ2hpbGQoaCksZGVsZXRlIEwuVXRpbC5qc29ucC5jYltlXSxpKGEpfSksZD0tMT09PWEuaW5kZXhPZihcIj9cIik/YStcIj9cIitrK1wiPVwiK2M6YStcIiZcIitrK1wiPVwiK2MsaC5zcmM9ZH0pLnRoZW4obnVsbCxmdW5jdGlvbihhKXtyZXR1cm4gZy5yZW1vdmVDaGlsZChoKSxkZWxldGUgTC5VdGlsLmFqYXguY2JbZV0sYX0pO3JldHVybiBpLmFib3J0PWYsaX0sTC5VdGlsLmpzb25wLmNiPXt9LEwuR2VvSlNPTi5BSkFYPUwuR2VvSlNPTi5leHRlbmQoe2RlZmF1bHRBSkFYcGFyYW1zOntkYXRhVHlwZTpcImpzb25cIixjYWxsYmFja1BhcmFtOlwiY2FsbGJhY2tcIixsb2NhbDohMSxtaWRkbGV3YXJlOmZ1bmN0aW9uKGEpe3JldHVybiBhfX0saW5pdGlhbGl6ZTpmdW5jdGlvbihhLGIpe3RoaXMudXJscz1bXSxhJiYoXCJzdHJpbmdcIj09dHlwZW9mIGE/dGhpcy51cmxzLnB1c2goYSk6XCJmdW5jdGlvblwiPT10eXBlb2YgYS5wb3A/dGhpcy51cmxzPXRoaXMudXJscy5jb25jYXQoYSk6KGI9YSxhPXZvaWQgMCkpO3ZhciBjPUwuVXRpbC5leHRlbmQoe30sdGhpcy5kZWZhdWx0QUpBWHBhcmFtcyk7Zm9yKHZhciBkIGluIGIpdGhpcy5kZWZhdWx0QUpBWHBhcmFtcy5oYXNPd25Qcm9wZXJ0eShkKSYmKGNbZF09YltkXSk7dGhpcy5hamF4UGFyYW1zPWMsdGhpcy5fbGF5ZXJzPXt9LEwuVXRpbC5zZXRPcHRpb25zKHRoaXMsYiksdGhpcy5vbihcImRhdGE6bG9hZGVkXCIsZnVuY3Rpb24oKXt0aGlzLmZpbHRlciYmdGhpcy5yZWZpbHRlcih0aGlzLmZpbHRlcil9LHRoaXMpO3ZhciBlPXRoaXM7dGhpcy51cmxzLmxlbmd0aD4wJiZMLlV0aWwuUHJvbWlzZShmdW5jdGlvbihhKXthKCl9KS50aGVuKGZ1bmN0aW9uKCl7ZS5hZGRVcmwoKX0pfSxjbGVhckxheWVyczpmdW5jdGlvbigpe3JldHVybiB0aGlzLnVybHM9W10sTC5HZW9KU09OLnByb3RvdHlwZS5jbGVhckxheWVycy5jYWxsKHRoaXMpLHRoaXN9LGFkZFVybDpmdW5jdGlvbihhKXt2YXIgYj10aGlzO2EmJihcInN0cmluZ1wiPT10eXBlb2YgYT9iLnVybHMucHVzaChhKTpcImZ1bmN0aW9uXCI9PXR5cGVvZiBhLnBvcCYmKGIudXJscz1iLnVybHMuY29uY2F0KGEpKSk7dmFyIGM9Yi51cmxzLmxlbmd0aCxkPTA7Yi5maXJlKFwiZGF0YTpsb2FkaW5nXCIpLGIudXJscy5mb3JFYWNoKGZ1bmN0aW9uKGEpe1wianNvblwiPT09Yi5hamF4UGFyYW1zLmRhdGFUeXBlLnRvTG93ZXJDYXNlKCk/TC5VdGlsLmFqYXgoYSxiLmFqYXhQYXJhbXMpLnRoZW4oZnVuY3Rpb24oYSl7dmFyIGM9Yi5hamF4UGFyYW1zLm1pZGRsZXdhcmUoYSk7Yi5hZGREYXRhKGMpLGIuZmlyZShcImRhdGE6cHJvZ3Jlc3NcIixjKX0sZnVuY3Rpb24oYSl7Yi5maXJlKFwiZGF0YTpwcm9ncmVzc1wiLHtlcnJvcjphfSl9KTpcImpzb25wXCI9PT1iLmFqYXhQYXJhbXMuZGF0YVR5cGUudG9Mb3dlckNhc2UoKSYmTC5VdGlsLmpzb25wKGEsYi5hamF4UGFyYW1zKS50aGVuKGZ1bmN0aW9uKGEpe3ZhciBjPWIuYWpheFBhcmFtcy5taWRkbGV3YXJlKGEpO2IuYWRkRGF0YShjKSxiLmZpcmUoXCJkYXRhOnByb2dyZXNzXCIsYyl9LGZ1bmN0aW9uKGEpe2IuZmlyZShcImRhdGE6cHJvZ3Jlc3NcIix7ZXJyb3I6YX0pfSl9KSxiLm9uKFwiZGF0YTpwcm9ncmVzc1wiLGZ1bmN0aW9uKCl7KytkPT09YyYmYi5maXJlKFwiZGF0YTpsb2FkZWRcIil9KX0scmVmcmVzaDpmdW5jdGlvbihhKXthPWF8fHRoaXMudXJscyx0aGlzLmNsZWFyTGF5ZXJzKCksdGhpcy5hZGRVcmwoYSl9LHJlZmlsdGVyOmZ1bmN0aW9uKGEpe1wiZnVuY3Rpb25cIiE9dHlwZW9mIGE/KHRoaXMuZmlsdGVyPSExLHRoaXMuZWFjaExheWVyKGZ1bmN0aW9uKGEpe2Euc2V0U3R5bGUoe3N0cm9rZTohMCxjbGlja2FibGU6ITB9KX0pKToodGhpcy5maWx0ZXI9YSx0aGlzLmVhY2hMYXllcihmdW5jdGlvbihiKXthKGIuZmVhdHVyZSk/Yi5zZXRTdHlsZSh7c3Ryb2tlOiEwLGNsaWNrYWJsZTohMH0pOmIuc2V0U3R5bGUoe3N0cm9rZTohMSxjbGlja2FibGU6ITF9KX0pKX19KSxMLmdlb0pzb24uYWpheD1mdW5jdGlvbihhLGIpe3JldHVybiBuZXcgTC5HZW9KU09OLkFKQVgoYSxiKX07fVxuIiwiUm91dGVyLmNvbmZpZ3VyZVxuXHRsYXlvdXRUZW1wbGF0ZTogJ2xheW91dCdcblx0bG9hZGluZ1RlbXBsYXRlOiAnbG9hZGluZydcblxuUm91dGVyLnJvdXRlICcvJyxcblx0YWN0aW9uOiAtPiB0aGlzLnJlbmRlciAnaG9tZSdcblxuQGNvbGwgPSB7fTsgQHNjaGVtYSA9IHt9XG5cbl8ubWFwIChfLmtleXMgZmFzaWxpdGFzKSwgKGkpIC0+XG5cdHNjaGVtYVtpXSA9IHt9OyBfLm1hcCBmYXNpbGl0YXNbaV0sIChqKSAtPlxuXHRcdHNjaGVtYVtpXVtqXSA9IHR5cGU6IFN0cmluZywgb3B0aW9uYWw6IHRydWVcblx0XHRzY2hlbWFbaV0uYmVudHVrID0gdHlwZTogU3RyaW5nLCBhdXRvZm9ybTogb3B0aW9uczogc2VsZWN0c1tpXT8uYmVudHVrXG5cdFx0c2NoZW1hW2ldLmtvbmRpc2kgPSB0eXBlOiBTdHJpbmcsIGF1dG9mb3JtOiBvcHRpb25zOiBzZWxlY3RzLmtvbmRpc2lcblxuXy5tYXAgWyd0aXRpaycsICdhcmVhJywgJ2t1cnZhJ10sIChpKSAtPlxuXHRjb2xsW2ldID0gbmV3IE1ldGVvci5Db2xsZWN0aW9uIGlcblx0YXJyID0gWydpbnNlcnQnLCAndXBkYXRlJywgJ3JlbW92ZSddXG5cdGNvbGxbaV0uYWxsb3cgXy56aXBPYmplY3QgYXJyLCBfLm1hcCBhcnIsIChpKSAtPiAtPiB0cnVlXG5cblJvdXRlci5yb3V0ZSAnL3RpdGlrLzp0eXBlLzpwYWdlLzppZD8nLFxuXHRuYW1lOiAndGl0aWsnXG5cdGFjdGlvbjogLT4gdGhpcy5yZW5kZXIgJ3RpdGlrJ1xuXHR3YWl0T246IC0+IGlmIE1ldGVvci5pc0NsaWVudFxuXHRcdHNlbCA9IGtlbG9tcG9rOiBjdXJyZW50UGFyICd0eXBlJ1xuXHRcdG9wdCA9IGxpbWl0OiAxMDAsIHNraXA6IDEwMCAqIHRoaXMucGFyYW1zLnBhZ2Vcblx0XHRNZXRlb3Iuc3Vic2NyaWJlICdjb2xsJywgJ3RpdGlrJywgc2VsLCBvcHRcblxuXy5tYXAgWydsb2dpbiddLCAoaSkgLT5cblx0Um91dGVyLnJvdXRlICcvJyArIGksXG5cdFx0YWN0aW9uOiAtPiB0aGlzLnJlbmRlciBpXG4iLCJpZiBNZXRlb3IuaXNDbGllbnRcblxuXHRnbG9iYWxIZWxwZXJzID0gW1xuXHRcdFsnc3RhcnRDYXNlJywgKHZhbCkgLT4gXy5zdGFydENhc2UgdmFsXVxuXHRcdFsnY29sbCcsIC0+IGNvbGxdXG5cdFx0Wydwcm9wJywgKG9iaiwgcHJvcCkgLT4gb2JqW3Byb3BdXVxuXHRdXG5cdF8ubWFwIGdsb2JhbEhlbHBlcnMsIChpKSAtPiBUZW1wbGF0ZS5yZWdpc3RlckhlbHBlciBpLi4uXG5cblx0VGVtcGxhdGUubWVudS5oZWxwZXJzXG5cdFx0bWVudXM6IC0+IF8ua2V5cyBmYXNpbGl0YXNcblxuXHRUZW1wbGF0ZS5tZW51LmV2ZW50c1xuXHRcdCdjbGljayAjbG9nb3V0JzogLT4gTWV0ZW9yLmxvZ291dCgpXG5cblx0VGVtcGxhdGUudGl0aWsub25SZW5kZXJlZCAtPiBNZXRlb3IuY2FsbCAnbGF0bG5ncycsIGN1cnJlbnRQYXIoJ3R5cGUnKSwgKGVyciwgcmVzKSAtPiBpZiByZXNcblx0XHQkKCdzZWxlY3QnKS5tYXRlcmlhbF9zZWxlY3QoKVxuXHRcdEwuSWNvbi5EZWZhdWx0LmltYWdlUGF0aCA9ICcvcGFja2FnZXMvYmV2YW5odW50X2xlYWZsZXQvaW1hZ2VzLydcblx0XHR0b3BvID0gTC50aWxlTGF5ZXIucHJvdmlkZXIgJ09wZW5Ub3BvTWFwJ1xuXHRcdHN0eWxlID0gY29sb3I6ICd3aGl0ZScsIHdlaWdodDogMlxuXHRcdG9uRWFjaEZlYXR1cmUgPSAoZmVhdHVyZSwgbGF5ZXIpIC0+XG5cdFx0XHRsYXllci5iaW5kUG9wdXAgJ0thYjogJyArIF8uc3RhcnRDYXNlIGZlYXR1cmUucHJvcGVydGllcy53aWxcblx0XHRyaWF1ID0gTC5nZW9Kc29uLmFqYXggJy9tYXBzL3JpYXUuZ2VvanNvbicsXG5cdFx0XHRzdHlsZTogc3R5bGUsIG9uRWFjaEZlYXR1cmU6IG9uRWFjaEZlYXR1cmVcblx0XHRzb3VyY2UgPSBfLmZpbHRlciByZXMsIChpKSAtPiBpLmxhdGxuZ1xuXHRcdHNlbGVjdCA9ICh0eXBlKSAtPiBfLm1hcCAoXy51bmlxQnkgc291cmNlLCB0eXBlKSwgKGkpIC0+IGlbdHlwZV1cblx0XHRjYXRlZ29yaWVzID0gW3NlbGVjdCgnYmVudHVrJykuLi4sIHNlbGVjdCgna29uZGlzaScpLi4uXVxuXHRcdHRpdGxlcyA9IF8ubWFwIGNhdGVnb3JpZXMsIChpKSAtPiBfLnN0YXJ0Q2FzZSBpXG5cdFx0Y29udGVudCA9IChvYmopIC0+XG5cdFx0XHRzdHJpbmcgPSAnJ1xuXHRcdFx0Zm9yIGtleSwgdmFsIG9mIF8ucGljayBvYmosIGZhc2lsaXRhc1tjdXJyZW50UGFyICd0eXBlJ11cblx0XHRcdFx0c3RyaW5nICs9IFwiPGI+I3tfLnN0YXJ0Q2FzZSBrZXl9OiA8L2I+I3tfLnN0YXJ0Q2FzZSB2YWx9PC9icj5cIlxuXHRcdFx0c3RyaW5nXG5cdFx0bWFya2VycyA9IF8uemlwT2JqZWN0IHRpdGxlcywgXy5tYXAgY2F0ZWdvcmllcywgKGkpIC0+XG5cdFx0XHRmaWx0ZXIgPSBfLmZpbHRlciBzb3VyY2UsIChqKSAtPiBfLmluY2x1ZGVzIFtqLmJlbnR1aywgai5rb25kaXNpXSwgaVxuXHRcdFx0ZmlsdGVyIGFuZCBMLmxheWVyR3JvdXAgXy5tYXAgZmlsdGVyLCAoaikgLT5cblx0XHRcdFx0TC5tYXJrZXIoai5sYXRsbmcpLmJpbmRQb3B1cCBjb250ZW50IGpcblx0XHRhbGxNYXJrZXJzID0gTC5sYXllckdyb3VwIF8ubWFwIHNvdXJjZSwgKGkpIC0+XG5cdFx0XHRMLm1hcmtlcihpLmxhdGxuZykuYmluZFBvcHVwIGNvbnRlbnQgaVxuXHRcdG1hcCA9IEwubWFwICdwZXRhJyxcblx0XHRcdGNlbnRlcjogWzAuNSwgMTAxXVxuXHRcdFx0em9vbTogOFxuXHRcdFx0em9vbUNvbnRyb2w6IGZhbHNlXG5cdFx0XHRhdHRyaWJ1dGlvbkNvbnRyb2w6IGZhbHNlXG5cdFx0XHRsYXllcnM6IFt0b3BvLCByaWF1LCBhbGxNYXJrZXJzXVxuXHRcdGJhc2VNYXBzID0gVG9wbzogdG9wbywgRXNyaTogTC50aWxlTGF5ZXIucHJvdmlkZXIgJ0VzcmkuV29ybGRJbWFnZXJ5J1xuXHRcdG92ZXJMYXlzID0gXy5hc3NpZ24gbWFya2VycywgU2VtdWE6IGFsbE1hcmtlcnNcblx0XHRMLmNvbnRyb2wubGF5ZXJzKGJhc2VNYXBzLCBvdmVyTGF5cywgY29sbGFwc2VkOiBmYWxzZSkuYWRkVG8gbWFwXG5cblx0VGVtcGxhdGUudGl0aWsuaGVscGVyc1xuXHRcdGhlYWRzOiAtPiBfLmtleXMgc2NoZW1hW2N1cnJlbnRQYXIgJ3R5cGUnXVxuXHRcdHJvd3M6IC0+IF8uZmlsdGVyIGNvbGwudGl0aWsuZmluZCgpLmZldGNoKCksIChpKSAtPlxuXHRcdFx0ZmlsdGVyID0gU2Vzc2lvbi5nZXQgJ2ZpbHRlcidcblx0XHRcdGEgPSAtPiBpLmJlbnR1ayBpcyBmaWx0ZXIuYmVudHVrXG5cdFx0XHRiID0gLT4gaS5rb25kaXNpIGlzIGZpbHRlci5rb25kaXNpXG5cdFx0XHRpZiBmaWx0ZXIgdGhlbiBhKCkgYW5kIGIoKSBlbHNlIHRydWVcblx0XHRmb3JtVHlwZTogLT4gaWYgKGN1cnJlbnRQYXIgJ2lkJykgdGhlbiAndXBkYXRlJyBlbHNlICdpbnNlcnQnXG5cdFx0ZG9jOiAtPiBjb2xsW2N1cnJlbnRSb3V0ZSgpXS5maW5kT25lIF9pZDogY3VycmVudFBhciAnaWQnXG5cdFx0c2NoZW1hOiAtPiBuZXcgU2ltcGxlU2NoZW1hIHNjaGVtYVtjdXJyZW50UGFyICd0eXBlJ11cblx0XHRzaG93Rm9ybTogLT4gU2Vzc2lvbi5nZXQgJ3Nob3dGb3JtJ1xuXHRcdGZpbHRlcjogKHR5cGUpIC0+XG5cdFx0XHR1bmlxID0gXy51bmlxQnkgY29sbC50aXRpay5maW5kKCkuZmV0Y2goKSwgdHlwZVxuXHRcdFx0Xy5tYXAgdW5pcSwgKGkpIC0+IGlbdHlwZV1cblxuXHRUZW1wbGF0ZS50aXRpay5ldmVudHNcblx0XHQnY2xpY2sgI2FkZCc6IC0+XG5cdFx0XHRTZXNzaW9uLnNldCAnc2hvd0Zvcm0nLCBub3QgU2Vzc2lvbi5nZXQgJ3Nob3dGb3JtJ1xuXHRcdCdjbGljayAjcmVtb3ZlJzogKGV2ZW50KSAtPlxuXHRcdFx0ZGF0YSA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuYXR0cmlidXRlcy5kYXRhLm5vZGVWYWx1ZVxuXHRcdFx0ZG9jID0gY29sbC50aXRpay5maW5kT25lIF9pZDogZGF0YVxuXHRcdFx0ZGlhbG9nID1cblx0XHRcdFx0dGl0bGU6ICdIYXB1cyBEYXRhPydcblx0XHRcdFx0bWVzc2FnZTogJ1lha2luIGhhcHVzIGRhdGEgaW5pPydcblx0XHRcdG5ldyBDb25maXJtYXRpb24gZGlhbG9nLCAob2spIC0+IGlmIG9rXG5cdFx0XHRcdE1ldGVvci5jYWxsICdyZW1vdmUnLCAndGl0aWsnLCBkb2MuX2lkXG5cdFx0J2RibGNsaWNrICN1cGRhdGUnOiAoZXZlbnQpIC0+IGlmIE1ldGVvci51c2VySWQoKVxuXHRcdFx0ZGF0YSA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuYXR0cmlidXRlcy5kYXRhLm5vZGVWYWx1ZVxuXHRcdFx0Um91dGVyLmdvIGN1cnJlbnRSb3V0ZSgpLCBwYWdlOiAwLCBpZDogZGF0YSwgdHlwZTogY3VycmVudFBhciAndHlwZSdcblx0XHRcdG9wdCA9IGxpbWl0OiAxOyBzZWwgPSBfaWQ6IGN1cnJlbnRQYXIgJ2lkJ1xuXHRcdFx0TWV0ZW9yLnN1YnNjcmliZSAnY29sbCcsICd0aXRpaycsIHNlbCwgb3B0XG5cdFx0XHRTZXNzaW9uLnNldCAnc2hvd0Zvcm0nLCB0cnVlXG5cdFx0J2NoYW5nZSBzZWxlY3QnOiAoZXZlbnQpIC0+XG5cdFx0XHRvYmogPSB7fTsgb2JqW2V2ZW50LnRhcmdldC5pZF0gPSBldmVudC50YXJnZXQudmFsdWVcblx0XHRcdFNlc3Npb24uc2V0ICdmaWx0ZXInLCBfLmFzc2lnbiBTZXNzaW9uLmdldCgnZmlsdGVyJykgb3Ige30sIG9ialxuXHRcdCdjbGljayAjZ2VvY29kZSc6IC0+XG5cdFx0XHRfLm1hcCAoXy5zaHVmZmxlIGNvbGwudGl0aWsuZmluZCgpLmZldGNoKCkpLCAoaSkgLT5cblx0XHRcdFx0Z2VvY29kZS5nZXRMb2NhdGlvbiBpLmFsYW1hdCArICcgUmlhdScsIChsb2NhdGlvbikgLT5cblx0XHRcdFx0XHRyZXMgPSBsb2NhdGlvbi5yZXN1bHRzXG5cdFx0XHRcdFx0aWYgcmVzXG5cdFx0XHRcdFx0XHRpLmxhdGxuZyA9IHJlc1swXT8uZ2VvbWV0cnkubG9jYXRpb25cblx0XHRcdFx0XHRcdGkuYWxhbWF0ID0gcmVzWzBdPy5mb3JtYXR0ZWRfYWRkcmVzc1xuXHRcdFx0XHRcdFx0TWV0ZW9yLmNhbGwgJ3VwZGF0ZScsICd0aXRpaycsIGlcblxuXHRUZW1wbGF0ZS5sb2dpbi5ldmVudHNcblx0XHQnc3VibWl0IGZvcm0nOiAoZXZlbnQpIC0+XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpXG5cdFx0XHRjcmVkcyA9IF8ubWFwIFsndXNlcm5hbWUnLCAncGFzc3dvcmQnXSwgKGkpIC0+IGV2ZW50LnRhcmdldFtpXS52YWx1ZVxuXHRcdFx0TWV0ZW9yLmxvZ2luV2l0aFBhc3N3b3JkIGNyZWRzLi4uLCAoZXJyKSAtPlxuXHRcdFx0XHRSb3V0ZXIuZ28gJy8nIHVubGVzcyBlcnJcblxuXHRUZW1wbGF0ZS5pbXBvcnQuZXZlbnRzXG5cdFx0J2NoYW5nZSA6ZmlsZSc6IChldmVudCwgdGVtcGxhdGUpIC0+XG5cdFx0XHRQYXBhLnBhcnNlIGV2ZW50LnRhcmdldC5maWxlc1swXSxcblx0XHRcdFx0aGVhZGVyOiB0cnVlXG5cdFx0XHRcdHN0ZXA6IChyZXN1bHQpIC0+XG5cdFx0XHRcdFx0ZGF0YSA9IHJlc3VsdC5kYXRhWzBdXG5cdFx0XHRcdFx0c2VsZWN0b3IgPSBuYW1hOiBkYXRhLm5hbWEsIGtlbG9tcG9rOiBjdXJyZW50UGFyICd0eXBlJ1xuXHRcdFx0XHRcdG1vZGlmaWVyID0gXy5vbWl0IGRhdGEsIFsnbmFtYScsICdrZWxvbXBvayddXG5cdFx0XHRcdFx0TWV0ZW9yLmNhbGwgJ2ltcG9ydCcsIGN1cnJlbnRSb3V0ZSgpLCBzZWxlY3RvciwgbW9kaWZpZXJcblxuXHRUZW1wbGF0ZS5wYWdpbmF0aW9uLm9uUmVuZGVyZWQgLT5cblx0XHRNZXRlb3IuY2FsbCAnbGVuZ3RoJywgY3VycmVudFJvdXRlKCksIGN1cnJlbnRQYXIoJ3R5cGUnKSwgKGVyciwgcmVzKSAtPlxuXHRcdFx0U2Vzc2lvbi5zZXQgJ3BhZ2lucycsIFsxLi4ocmVzIC0gKHJlcyAlIDEwMCkpIC8gMTAwXVxuXHRcblx0VGVtcGxhdGUucGFnaW5hdGlvbi5oZWxwZXJzXG5cdFx0cGFnaW5zOiAtPiBTZXNzaW9uLmdldCAncGFnaW5zJ1xuXG5cdFRlbXBsYXRlLnBhZ2luYXRpb24uZXZlbnRzXG5cdFx0J2NsaWNrICNudW0nOiAoZXZlbnQpIC0+XG5cdFx0XHRSb3V0ZXIuZ28gY3VycmVudFJvdXRlKCksXG5cdFx0XHRcdHR5cGU6IGN1cnJlbnRQYXIgJ3R5cGUnXG5cdFx0XHRcdHBhZ2U6IHBhcnNlSW50IGV2ZW50LmN1cnJlbnRUYXJnZXQudGV4dFxuIiwiaWYgTWV0ZW9yLmlzU2VydmVyXG5cblx0TWV0ZW9yLnB1Ymxpc2ggJ2NvbGwnLCAobmFtZSwgc2VsZWN0b3IsIG9wdGlvbnMpIC0+XG5cdFx0Y29sbFtuYW1lXS5maW5kIHNlbGVjdG9yLCBvcHRpb25zXG5cblx0TWV0ZW9yLm1ldGhvZHNcblx0XHRyZW1vdmU6IChuYW1lLCBpZCkgLT5cblx0XHRcdGNvbGxbbmFtZV0ucmVtb3ZlIGlkXG5cdFx0aW1wb3J0OiAobmFtZSwgc2VsZWN0b3IsIG1vZGlmaWVyKSAtPlxuXHRcdFx0Y29sbFtuYW1lXS51cHNlcnQgc2VsZWN0b3IsICRzZXQ6IG1vZGlmaWVyXG5cdFx0dXBkYXRlOiAobmFtZSwgZG9jKSAtPlxuXHRcdFx0Y29sbFtuYW1lXS51cGRhdGUgZG9jLl9pZCwgZG9jXG5cdFx0bGVuZ3RoOiAobmFtZSwgZ3J1cCkgLT5cblx0XHRcdGNvbGxbbmFtZV0uZmluZChrZWxvbXBvazogZ3J1cCkuZmV0Y2goKS5sZW5ndGhcblx0XHRsYXRsbmdzOiAoZ3J1cCkgLT5cblx0XHRcdHNlbCA9IGtlbG9tcG9rOiBncnVwLCBsYXRsbmc6ICRleGlzdHM6IHRydWVcblx0XHRcdGNvbGwudGl0aWsuZmluZChzZWwpLmZldGNoKClcbiJdfQ==
