var require = meteorInstall({"template.view.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// template.view.js                                                                                           //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
                                                                                                              // 1
Template.__checkName("layout");                                                                               // 2
Template["layout"] = new Template("Template.layout", (function() {                                            // 3
  var view = this;                                                                                            // 4
  return [ Spacebars.include(view.lookupTemplate("menu")), Spacebars.include(view.lookupTemplate("yield")) ];
}));                                                                                                          // 6
                                                                                                              // 7
Template.__checkName("menu");                                                                                 // 8
Template["menu"] = new Template("Template.menu", (function() {                                                // 9
  var view = this;                                                                                            // 10
  return HTML.DIV({                                                                                           // 11
    "class": "navbar-fixed"                                                                                   // 12
  }, HTML.NAV({                                                                                               // 13
    "class": "green"                                                                                          // 14
  }, HTML.DIV({                                                                                               // 15
    "class": "nav-wrapper"                                                                                    // 16
  }, HTML.Raw('<ul class="left hide-on-med-and-down"><li><a>Beranda</a></li>\n<li><a>Tentang</a></li></ul>'), "\n", HTML.Raw('<a class="brand-logo center">DISLHK</a>'), "\n", HTML.Raw('<ul class="right"><li><a href="/login">Login</a></li></ul>'), "\n", HTML.UL({
    "class": [ "fixed", " ", "side-nav" ]                                                                     // 18
  }, HTML.Raw('<li class="grey lighten-2"><a><b>Admin Menu</b></a></li>'), "\n", HTML.UL({                    // 19
    "class": [ "collapsible", " ", "collapsible-accordion" ]                                                  // 20
  }, Blaze.Each(function() {                                                                                  // 21
    return {                                                                                                  // 22
      _sequence: Spacebars.call(view.lookup("list")),                                                         // 23
      _variable: "i"                                                                                          // 24
    };                                                                                                        // 25
  }, function() {                                                                                             // 26
    return HTML.LI(HTML.A({                                                                                   // 27
      "class": "collapsible-header",                                                                          // 28
      href: function() {                                                                                      // 29
        return [ "/peta/", Spacebars.mustache(Spacebars.dot(view.lookup("i"), "grup")) ];                     // 30
      }                                                                                                       // 31
    }, Blaze.View("lookup:startCase", function() {                                                            // 32
      return Spacebars.mustache(view.lookup("startCase"), Spacebars.dataMustache(Spacebars.dot(view.lookup("i"), "grup")));
    })), "\n", HTML.DIV({                                                                                     // 34
      "class": "collapsible-body"                                                                             // 35
    }, HTML.UL(Blaze.Each(function() {                                                                        // 36
      return {                                                                                                // 37
        _sequence: Spacebars.call(Spacebars.dot(view.lookup("i"), "items")),                                  // 38
        _variable: "j"                                                                                        // 39
      };                                                                                                      // 40
    }, function() {                                                                                           // 41
      return HTML.LI(HTML.A({                                                                                 // 42
        href: function() {                                                                                    // 43
          return [ "/peta/", Spacebars.mustache(Spacebars.dot(view.lookup("i"), "grup")), "/", Spacebars.mustache(view.lookup("j")) ];
        }                                                                                                     // 45
      }, Blaze.View("lookup:upperCase", function() {                                                          // 46
        return Spacebars.mustache(view.lookup("upperCase"), Spacebars.dataMustache(view.lookup("j")));        // 47
      })));                                                                                                   // 48
    }))));                                                                                                    // 49
  }))))));                                                                                                    // 50
}));                                                                                                          // 51
                                                                                                              // 52
Template.__checkName("beranda");                                                                              // 53
Template["beranda"] = new Template("Template.beranda", (function() {                                          // 54
  var view = this;                                                                                            // 55
  return HTML.Raw('<div class="container"><h5>Beranda</h5></div>');                                           // 56
}));                                                                                                          // 57
                                                                                                              // 58
Template.__checkName("peta");                                                                                 // 59
Template["peta"] = new Template("Template.peta", (function() {                                                // 60
  var view = this;                                                                                            // 61
  return HTML.Raw('<div id="peta"></div>');                                                                   // 62
}));                                                                                                          // 63
                                                                                                              // 64
Template.__checkName("admin");                                                                                // 65
Template["admin"] = new Template("Template.admin", (function() {                                              // 66
  var view = this;                                                                                            // 67
  return HTML.Raw('<div class="container"><div class="file-field input-field"><div class="btn"><span>Unggah Peta</span>\n<input type="file"></div>\n<div class="file-path-wrapper"><input class="file-path validate" type="text" placeholder="Unggah geojson"></div></div></div>');
}));                                                                                                          // 69
                                                                                                              // 70
Template.__checkName("login");                                                                                // 71
Template["login"] = new Template("Template.login", (function() {                                              // 72
  var view = this;                                                                                            // 73
  return HTML.Raw('<div class="container"><h5>Login Admin</h5>\n<form><input name="username" placeholder="Username">\n<input name="password" placeholder="Password" type="password">\n<input class="btn" type="submit" value="Login"></form></div>');
}));                                                                                                          // 75
                                                                                                              // 76
Template.__checkName("loading");                                                                              // 77
Template["loading"] = new Template("Template.loading", (function() {                                          // 78
  var view = this;                                                                                            // 79
  return HTML.Raw('<div class="progress center"><div class="indeterminate"></div></div>');                    // 80
}));                                                                                                          // 81
                                                                                                              // 82
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"folder":{"array.coffee":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// folder/array.coffee                                                                                        //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
this.colors = [{                                                                                              // 1
  item: 'KSA/KPA',                                                                                            // 2
  color: '#ad3fff'                                                                                            // 3
}, {                                                                                                          // 2
  item: 'APL',                                                                                                // 5
  color: 'white'                                                                                              // 6
}, {                                                                                                          // 5
  item: 'HL',                                                                                                 // 8
  color: '#02ad00'                                                                                            // 9
}, {                                                                                                          // 8
  item: 'HP',                                                                                                 // 11
  color: '#ffff00'                                                                                            // 12
}, {                                                                                                          // 11
  item: 'HPK',                                                                                                // 14
  color: '#ff5eff'                                                                                            // 15
}, {                                                                                                          // 14
  item: 'HPT',                                                                                                // 17
  color: '#8af200'                                                                                            // 18
}];                                                                                                           // 17
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"funcs.coffee":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// folder/funcs.coffee                                                                                        //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
this._ = lodash;                                                                                              // 1
this.coll = {};                                                                                               // 2
                                                                                                              //
if (Meteor.isClient) {                                                                                        // 4
  this.currentPar = function (name) {                                                                         // 5
    return Router.current().params[name];                                                                     // 7
  };                                                                                                          // 5
}                                                                                                             // 9
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"both.coffee":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// both.coffee                                                                                                //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Router.configure({                                                                                            // 1
  layoutTemplate: 'layout',                                                                                   // 2
  loadingTemplate: 'loading'                                                                                  // 3
});                                                                                                           // 2
Router.route('/', {                                                                                           // 5
  action: function () {                                                                                       // 6
    return this.render('beranda');                                                                            // 8
  }                                                                                                           // 6
});                                                                                                           // 6
                                                                                                              //
_.map(['login', 'admin'], function (i) {                                                                      // 8
  return Router.route('/' + i, {                                                                              // 13
    action: function () {                                                                                     // 10
      return this.render(i);                                                                                  // 15
    }                                                                                                         // 10
  });                                                                                                         // 10
});                                                                                                           // 8
                                                                                                              //
Router.route('/peta/:grup?/:item?', {                                                                         // 12
  action: function () {                                                                                       // 13
    return this.render('peta');                                                                               // 22
  },                                                                                                          // 13
  waitOn: function () {                                                                                       // 14
    var sel;                                                                                                  // 14
                                                                                                              //
    if (Meteor.isClient) {                                                                                    // 14
      sel = {                                                                                                 // 15
        grup: this.params.grup                                                                                // 15
      };                                                                                                      // 15
      this.params.item && (sel.item = this.params.item);                                                      // 16
      return Meteor.subscribe('coll', 'geojsons', sel, {});                                                   // 31
    }                                                                                                         // 32
  }                                                                                                           // 14
});                                                                                                           // 13
coll.geojsons = new Meteor.Collection('geojsons');                                                            // 19
coll.geojsons.allow({                                                                                         // 20
  insert: function () {                                                                                       // 21
    return true;                                                                                              // 40
  },                                                                                                          // 21
  update: function () {                                                                                       // 22
    return true;                                                                                              // 43
  },                                                                                                          // 21
  remove: function () {                                                                                       // 23
    return true;                                                                                              // 46
  }                                                                                                           // 23
});                                                                                                           // 21
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"client.coffee":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// client.coffee                                                                                              //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
                                                                                                              //
if (Meteor.isClient) {                                                                                        // 1
  Template.registerHelper('startCase', function (val) {                                                       // 3
    return _.startCase(val);                                                                                  // 3
  });                                                                                                         // 3
  Template.registerHelper('upperCase', function (val) {                                                       // 4
    return _.upperCase(val);                                                                                  // 6
  });                                                                                                         // 4
  Template.menu.onRendered(function () {                                                                      // 6
    $('.collapsible').collapsible();                                                                          // 7
    return Meteor.call('list', function (err, res) {                                                          // 10
      return res && Session.set('list', res);                                                                 // 11
    });                                                                                                       // 8
  });                                                                                                         // 6
  Template.menu.helpers({                                                                                     // 11
    list: function () {                                                                                       // 12
      return Session.get('list');                                                                             // 16
    }                                                                                                         // 12
  });                                                                                                         // 12
  Template.peta.onRendered(function () {                                                                      // 14
    var baseMaps, bases, fillColor, items, layers, map, overLays, tiles;                                      // 15
                                                                                                              //
    fillColor = function (val) {                                                                              // 15
      var find;                                                                                               // 16
      find = _.find(colors, function (i) {                                                                    // 16
        return i.item === val;                                                                                // 24
      });                                                                                                     // 16
      return find.color;                                                                                      // 26
    };                                                                                                        // 15
                                                                                                              //
    layers = _.map(coll.geojsons.find().fetch(), function (i) {                                               // 18
      var geojson;                                                                                            // 18
      return geojson = L.geoJson(i, {                                                                         // 30
        style: function (feature) {                                                                           // 19
          return {                                                                                            // 32
            fillColor: fillColor(feature.properties.F_Prbhn),                                                 // 20
            weight: 2,                                                                                        // 21
            opacity: 1,                                                                                       // 22
            color: 'white',                                                                                   // 23
            dashArray: '3',                                                                                   // 24
            fillOpacity: 0.7                                                                                  // 25
          };                                                                                                  // 20
        },                                                                                                    // 19
        onEachFeature: function (feature, layer) {                                                            // 26
          layer.on({                                                                                          // 27
            mouseover: function (event) {                                                                     // 28
              event.target.setStyle({                                                                         // 29
                weight: 3,                                                                                    // 30
                dashArray: ''                                                                                 // 31
              });                                                                                             // 30
              return event.target.bringToFront();                                                             // 48
            },                                                                                                // 28
            mouseout: function (event) {                                                                      // 33
              return geojson.resetStyle(event.target);                                                        // 51
            },                                                                                                // 28
            click: function (event) {                                                                         // 35
              return map.fitBounds(event.target.getBounds());                                                 // 54
            }                                                                                                 // 35
          });                                                                                                 // 28
          return layer.bindPopup(function () {                                                                // 57
            var content, key, ref, val;                                                                       // 38
            content = '';                                                                                     // 38
            ref = feature.properties;                                                                         // 39
                                                                                                              //
            for (key in meteorBabelHelpers.sanitizeForInObject(ref)) {                                        // 39
              val = ref[key];                                                                                 // 62
              content += '<b>Data ' + key + '</b>' + ': ' + val + '</br>';                                    // 40
            }                                                                                                 // 39
                                                                                                              //
            return content;                                                                                   // 65
          });                                                                                                 // 37
        }                                                                                                     // 26
      });                                                                                                     // 19
    });                                                                                                       // 18
    tiles = ['OpenTopoMap', 'Esri.WorldImagery'];                                                             // 42
    bases = _.map(tiles, function (i) {                                                                       // 43
      return L.tileLayer.provider(i);                                                                         // 72
    });                                                                                                       // 43
    baseMaps = _.zipObject(tiles, bases);                                                                     // 44
    items = _.map(coll.geojsons.find().fetch(), function (i) {                                                // 45
      return _.upperCase(i.item);                                                                             // 76
    });                                                                                                       // 45
    overLays = _.zipObject(items, layers);                                                                    // 46
    map = L.map('peta', {                                                                                     // 47
      center: [0.5, 101],                                                                                     // 48
      zoom: 8,                                                                                                // 49
      zoomControl: false,                                                                                     // 50
      layers: [].concat(_toConsumableArray(bases), _toConsumableArray(layers))                                // 51
    });                                                                                                       // 48
    L.control.layers(baseMaps, overLays).addTo(map);                                                          // 52
    return L.control.locate({                                                                                 // 86
      position: 'topright'                                                                                    // 53
    }).addTo(map);                                                                                            // 53
  });                                                                                                         // 14
  Template.admin.events({                                                                                     // 55
    'change :file': function (event) {                                                                        // 56
      var file, reader;                                                                                       // 57
      file = event.target.files[0];                                                                           // 57
      reader = new FileReader();                                                                              // 58
                                                                                                              //
      reader.onload = function () {                                                                           // 59
        var doc, name, split;                                                                                 // 60
        split = _.split(_.kebabCase(file.name), '-');                                                         // 60
                                                                                                              //
        if (split[2] === 'geojson') {                                                                         // 61
          name = {                                                                                            // 62
            grup: split[0],                                                                                   // 62
            item: split[1]                                                                                    // 62
          };                                                                                                  // 62
          doc = _.assign(name, JSON.parse(reader.result));                                                    // 63
          return Meteor.call('import', 'geojsons', name, doc, function (err, res) {                           // 104
            return res && Materialize.toast('Unggah Berhasil', 3000, 'orange');                               // 105
          });                                                                                                 // 64
        }                                                                                                     // 107
      };                                                                                                      // 59
                                                                                                              //
      return reader.readAsText(file, 'UTF-8');                                                                // 109
    }                                                                                                         // 56
  });                                                                                                         // 56
  Template.login.events({                                                                                     // 68
    'submit form': function (event) {                                                                         // 69
      var _Meteor;                                                                                            // 69
                                                                                                              //
      var creds;                                                                                              // 70
      event.preventDefault();                                                                                 // 70
      creds = _.map(['username', 'password'], function (i) {                                                  // 71
        return event.target.children[i].value;                                                                // 117
      });                                                                                                     // 71
      return (_Meteor = Meteor).loginWithPassword.apply(_Meteor, _toConsumableArray(creds));                  // 119
    }                                                                                                         // 69
  });                                                                                                         // 69
}                                                                                                             // 122
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"server.coffee":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// server.coffee                                                                                              //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
if (Meteor.isServer) {                                                                                        // 1
  Meteor.publish('coll', function (name, selector, modifier) {                                                // 3
    return coll[name].find(selector, modifier);                                                               // 3
  });                                                                                                         // 3
  Meteor.methods({                                                                                            // 6
    "import": function (name, selector, modifier) {                                                           // 7
      return coll[name].upsert(selector, modifier);                                                           // 7
    },                                                                                                        // 7
    list: function () {                                                                                       // 10
      var arr, key, map, ref, val;                                                                            // 11
      map = _.map(coll.geojsons.find().fetch(), function (i) {                                                // 11
        return _.pick(i, ['grup', 'item']);                                                                   // 12
      });                                                                                                     // 11
      arr = [];                                                                                               // 13
      ref = _.groupBy(map, 'grup');                                                                           // 14
                                                                                                              //
      for (key in meteorBabelHelpers.sanitizeForInObject(ref)) {                                              // 14
        val = ref[key];                                                                                       // 17
        arr.push({                                                                                            // 15
          grup: key,                                                                                          // 16
          items: _.map(val, function (j) {                                                                    // 17
            return j.item;                                                                                    // 21
          })                                                                                                  // 17
        });                                                                                                   // 16
      }                                                                                                       // 14
                                                                                                              //
      return arr;                                                                                             // 25
    }                                                                                                         // 10
  });                                                                                                         // 7
}                                                                                                             // 28
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},{
  "extensions": [
    ".js",
    ".json",
    ".html",
    ".jade",
    ".coffee",
    ".styl"
  ]
});
require("./template.view.js");
require("./folder/array.coffee");
require("./folder/funcs.coffee");
require("./both.coffee");
require("./client.coffee");
require("./server.coffee");