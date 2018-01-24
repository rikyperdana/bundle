var require = meteorInstall({"folder":{"array.coffee":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// folder/array.coffee                                                                                              //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
this.colors = [{
  item: 'KSA/KPA',
  color: 'purple'
}, {
  item: 'APL',
  color: 'white'
}, {
  item: 'HL',
  color: 'green'
}, {
  item: 'HP',
  color: 'yellow'
}, {
  item: 'HPK',
  color: 'pink'
}, {
  item: 'HPT',
  color: '#33e72d'
}];
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"funcs.coffee":function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// folder/funcs.coffee                                                                                              //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
this._ = lodash;
this.coll = {};

if (Meteor.isClient) {
  this.currentRoute = function () {
    return Router.current().route.getName();
  };

  this.currentPar = function (name) {
    return Router.current().params[name];
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
  layoutTemplate: 'layout'
});
Router.route('/', {
  action: function () {
    return this.render('beranda');
  }
});

_.map(['login', 'admin'], function (i) {
  return Router.route('/' + i, {
    action: function () {
      return this.render(i);
    }
  });
});

Router.route('/peta/:grup?/:item?', {
  action: function () {
    return this.render('peta');
  },
  waitOn: function () {
    var sel;

    if (Meteor.isClient) {
      sel = {
        grup: this.params.grup
      };
      this.params.item && (sel.item = this.params.item);
      return Meteor.subscribe('coll', 'geojsons', sel, {});
    }
  }
});
coll.geojsons = new Meteor.Collection('geojsons');
coll.geojsons.allow({
  insert: function () {
    return true;
  },
  update: function () {
    return true;
  },
  remove: function () {
    return true;
  }
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

if (Meteor.isClient) {
  Router.onAfterAction(function () {
    if (currentRoute() === 'admin' && !Meteor.userId()) {
      return Router.go('/');
    }
  });
  Template.registerHelper('startCase', function (val) {
    return _.startCase(val);
  });
  Template.registerHelper('upperCase', function (val) {
    return _.upperCase(val);
  });
  Template.menu.onRendered(function () {
    $('.collapsible').collapsible();
    return Meteor.call('list', function (err, res) {
      return res && Session.set('list', res);
    });
  });
  Template.menu.helpers({
    list: function () {
      return Session.get('list');
    }
  });
  Template.menu.events({
    'click #logout': function () {
      return Meteor.logout();
    }
  });
  Template.beranda.onRendered(function () {
    return $('.slider').slider({
      height: 900
    });
  });
  Template.peta.onRendered(function () {
    var baseMaps, bases, fillColor, items, layers, map, overLays, tiles;

    fillColor = function (val) {
      var find;
      find = _.find(colors, function (i) {
        return i.item === val;
      });
      return find.color;
    };

    layers = _.map(coll.geojsons.find().fetch(), function (i) {
      var geojson;
      return geojson = L.geoJson(i, {
        style: function (feature) {
          return {
            fillColor: fillColor(feature.properties.F_Prbhn),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
          };
        },
        onEachFeature: function (feature, layer) {
          layer.on({
            mouseover: function (event) {
              event.target.setStyle({
                weight: 3,
                dashArray: ''
              });
              return event.target.bringToFront();
            },
            mouseout: function (event) {
              return geojson.resetStyle(event.target);
            },
            click: function (event) {
              return map.fitBounds(event.target.getBounds());
            }
          });
          return layer.bindPopup(function () {
            var content, key, ref, val;
            content = '';
            ref = feature.properties;

            for (key in meteorBabelHelpers.sanitizeForInObject(ref)) {
              val = ref[key];
              content += '<b>Data ' + key + '</b>' + ': ' + val + '</br>';
            }

            return content;
          });
        }
      });
    });
    tiles = ['OpenTopoMap', 'Esri.WorldImagery'];
    bases = _.map(tiles, function (i) {
      return L.tileLayer.provider(i);
    });
    baseMaps = _.zipObject(tiles, bases);
    items = _.map(coll.geojsons.find().fetch(), function (i) {
      return _.upperCase(i.item);
    });
    overLays = _.zipObject(items, layers);
    map = L.map('peta', {
      center: [0.5, 101],
      zoom: 8,
      zoomControl: false,
      attributionControl: false,
      layers: [].concat(_toConsumableArray(bases), _toConsumableArray(layers))
    });
    L.control.layers(baseMaps, overLays, {
      collapsed: false
    }).addTo(map);
    return L.control.locate({
      position: 'topright'
    }).addTo(map);
  });
  Template.admin.events({
    'change :file': function (event) {
      var file, reader;
      file = event.target.files[0];
      reader = new FileReader();

      reader.onload = function () {
        var doc, name, split;
        split = _.split(_.kebabCase(file.name), '-');

        if (split[2] === 'geojson') {
          name = {
            grup: split[0],
            item: split[1]
          };
          doc = _.assign(name, JSON.parse(reader.result));
          return Meteor.call('import', 'geojsons', name, doc, function (err, res) {
            return res && Materialize.toast('Unggah Berhasil', 3000, 'orange');
          });
        }
      };

      return reader.readAsText(file, 'UTF-8');
    }
  });
  Template.login.events({
    'submit form': function (event) {
      var _Meteor;

      var creds;
      event.preventDefault();
      creds = _.map(['username', 'password'], function (i) {
        return event.target.children[i].value;
      });
      return (_Meteor = Meteor).loginWithPassword.apply(_Meteor, _toConsumableArray(creds).concat([function (err) {
        if (!err) {
          return Router.go('/');
        }
      }]));
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
  Meteor.publish('coll', function (name, selector, modifier) {
    return coll[name].find(selector, modifier);
  });
  Meteor.methods({
    "import": function (name, selector, modifier) {
      return coll[name].upsert(selector, modifier);
    },
    list: function () {
      var arr, key, map, ref, val;
      map = _.map(coll.geojsons.find().fetch(), function (i) {
        return _.pick(i, ['grup', 'item']);
      });
      arr = [];
      ref = _.groupBy(map, 'grup');

      for (key in meteorBabelHelpers.sanitizeForInObject(ref)) {
        val = ref[key];
        arr.push({
          grup: key,
          items: _.map(val, function (j) {
            return j.item;
          })
        });
      }

      return arr;
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
require("./folder/array.coffee");
require("./folder/funcs.coffee");
require("./both.coffee");
require("./client.coffee");
require("./server.coffee");
//# sourceURL=meteor://💻app/app/app.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvZm9sZGVyL2FycmF5LmNvZmZlZSIsIm1ldGVvcjovL/CfkrthcHAvZm9sZGVyL2Z1bmNzLmNvZmZlZSIsIm1ldGVvcjovL/CfkrthcHAvYm90aC5jb2ZmZWUiLCJtZXRlb3I6Ly/wn5K7YXBwL2NsaWVudC5jb2ZmZWUiLCJtZXRlb3I6Ly/wn5K7YXBwL3NlcnZlci5jb2ZmZWUiXSwibmFtZXMiOlsiY29sb3JzIiwiaXRlbSIsImNvbG9yIiwiXyIsImxvZGFzaCIsImNvbGwiLCJNZXRlb3IiLCJpc0NsaWVudCIsImN1cnJlbnRSb3V0ZSIsIlJvdXRlciIsImN1cnJlbnQiLCJyb3V0ZSIsImdldE5hbWUiLCJjdXJyZW50UGFyIiwibmFtZSIsInBhcmFtcyIsImNvbmZpZ3VyZSIsImxheW91dFRlbXBsYXRlIiwiYWN0aW9uIiwicmVuZGVyIiwibWFwIiwiaSIsIndhaXRPbiIsInNlbCIsImdydXAiLCJzdWJzY3JpYmUiLCJnZW9qc29ucyIsIkNvbGxlY3Rpb24iLCJhbGxvdyIsImluc2VydCIsInVwZGF0ZSIsInJlbW92ZSIsIm9uQWZ0ZXJBY3Rpb24iLCJ1c2VySWQiLCJnbyIsIlRlbXBsYXRlIiwicmVnaXN0ZXJIZWxwZXIiLCJ2YWwiLCJzdGFydENhc2UiLCJ1cHBlckNhc2UiLCJtZW51Iiwib25SZW5kZXJlZCIsIiQiLCJjb2xsYXBzaWJsZSIsImNhbGwiLCJlcnIiLCJyZXMiLCJTZXNzaW9uIiwic2V0IiwiaGVscGVycyIsImxpc3QiLCJnZXQiLCJldmVudHMiLCJsb2dvdXQiLCJiZXJhbmRhIiwic2xpZGVyIiwiaGVpZ2h0IiwicGV0YSIsImJhc2VNYXBzIiwiYmFzZXMiLCJmaWxsQ29sb3IiLCJpdGVtcyIsImxheWVycyIsIm92ZXJMYXlzIiwidGlsZXMiLCJmaW5kIiwiZmV0Y2giLCJnZW9qc29uIiwiTCIsImdlb0pzb24iLCJzdHlsZSIsImZlYXR1cmUiLCJwcm9wZXJ0aWVzIiwiRl9QcmJobiIsIndlaWdodCIsIm9wYWNpdHkiLCJkYXNoQXJyYXkiLCJmaWxsT3BhY2l0eSIsIm9uRWFjaEZlYXR1cmUiLCJsYXllciIsIm9uIiwibW91c2VvdmVyIiwiZXZlbnQiLCJ0YXJnZXQiLCJzZXRTdHlsZSIsImJyaW5nVG9Gcm9udCIsIm1vdXNlb3V0IiwicmVzZXRTdHlsZSIsImNsaWNrIiwiZml0Qm91bmRzIiwiZ2V0Qm91bmRzIiwiYmluZFBvcHVwIiwiY29udGVudCIsImtleSIsInJlZiIsInRpbGVMYXllciIsInByb3ZpZGVyIiwiemlwT2JqZWN0IiwiY2VudGVyIiwiem9vbSIsInpvb21Db250cm9sIiwiYXR0cmlidXRpb25Db250cm9sIiwiY29udHJvbCIsImNvbGxhcHNlZCIsImFkZFRvIiwibG9jYXRlIiwicG9zaXRpb24iLCJhZG1pbiIsImZpbGUiLCJyZWFkZXIiLCJmaWxlcyIsIkZpbGVSZWFkZXIiLCJvbmxvYWQiLCJkb2MiLCJzcGxpdCIsImtlYmFiQ2FzZSIsImFzc2lnbiIsIkpTT04iLCJwYXJzZSIsInJlc3VsdCIsIk1hdGVyaWFsaXplIiwidG9hc3QiLCJyZWFkQXNUZXh0IiwibG9naW4iLCJjcmVkcyIsInByZXZlbnREZWZhdWx0IiwiY2hpbGRyZW4iLCJ2YWx1ZSIsImxvZ2luV2l0aFBhc3N3b3JkIiwiaXNTZXJ2ZXIiLCJwdWJsaXNoIiwic2VsZWN0b3IiLCJtb2RpZmllciIsIm1ldGhvZHMiLCJ1cHNlcnQiLCJhcnIiLCJwaWNrIiwiZ3JvdXBCeSIsInB1c2giLCJqIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxLQUFDQSxNQUFELEdBQVUsQ0FDVDtBQUFBQyxRQUFNLFNBQU47QUFDQUMsU0FBTztBQURQLENBRFMsRUFJVDtBQUFBRCxRQUFNLEtBQU47QUFDQUMsU0FBTztBQURQLENBSlMsRUFPVDtBQUFBRCxRQUFNLElBQU47QUFDQUMsU0FBTztBQURQLENBUFMsRUFVVDtBQUFBRCxRQUFNLElBQU47QUFDQUMsU0FBTztBQURQLENBVlMsRUFhVDtBQUFBRCxRQUFNLEtBQU47QUFDQUMsU0FBTztBQURQLENBYlMsRUFnQlQ7QUFBQUQsUUFBTSxLQUFOO0FBQ0FDLFNBQU87QUFEUCxDQWhCUyxDQUFWLEM7Ozs7Ozs7Ozs7OztBQ0FBLEtBQUNDLENBQUQsR0FBS0MsTUFBTDtBQUNBLEtBQUNDLElBQUQsR0FBUSxFQUFSOztBQUVBLElBQUdDLE9BQU9DLFFBQVY7QUFDQyxPQUFDQyxZQUFELEdBQWdCO0FBRWIsV0FGZ0JDLE9BQU9DLE9BQVAsR0FBaUJDLEtBQWpCLENBQXVCQyxPQUF2QixFQUVoQjtBQUZhLEdBQWhCOztBQUNBLE9BQUNDLFVBQUQsR0FBYyxVQUFDQyxJQUFEO0FBSVgsV0FKcUJMLE9BQU9DLE9BQVAsR0FBaUJLLE1BQWpCLENBQXdCRCxJQUF4QixDQUlyQjtBQUpXLEdBQWQ7QUFNQSxDOzs7Ozs7Ozs7Ozs7QUNYREwsT0FBT08sU0FBUCxDQUNDO0FBQUFDLGtCQUFnQjtBQUFoQixDQUREO0FBR0FSLE9BQU9FLEtBQVAsQ0FBYSxHQUFiLEVBQ0M7QUFBQU8sVUFBUTtBQUVMLFdBRlEsS0FBS0MsTUFBTCxDQUFZLFNBQVosQ0FFUjtBQUZLO0FBQVIsQ0FERDs7QUFHQWhCLEVBQUVpQixHQUFGLENBQU0sQ0FBQyxPQUFELEVBQVUsT0FBVixDQUFOLEVBQTBCLFVBQUNDLENBQUQ7QUFLeEIsU0FKRFosT0FBT0UsS0FBUCxDQUFhLE1BQUlVLENBQWpCLEVBQ0M7QUFBQUgsWUFBUTtBQUtKLGFBTE8sS0FBS0MsTUFBTCxDQUFZRSxDQUFaLENBS1A7QUFMSTtBQUFSLEdBREQsQ0FJQztBQUxGOztBQUlBWixPQUFPRSxLQUFQLENBQWEscUJBQWIsRUFDQztBQUFBTyxVQUFRO0FBU0wsV0FUUSxLQUFLQyxNQUFMLENBQVksTUFBWixDQVNSO0FBVEg7QUFDQUcsVUFBUTtBQUFHLFFBQUFDLEdBQUE7O0FBQUEsUUFBR2pCLE9BQU9DLFFBQVY7QUFDVmdCLFlBQU07QUFBQUMsY0FBTSxLQUFLVCxNQUFMLENBQVlTO0FBQWxCLE9BQU47QUFDQSxXQUFLVCxNQUFMLENBQVlkLElBQVosS0FBcUJzQixJQUFJdEIsSUFBSixHQUFXLEtBQUtjLE1BQUwsQ0FBWWQsSUFBNUM7QUFlSSxhQWRKSyxPQUFPbUIsU0FBUCxDQUFpQixNQUFqQixFQUF5QixVQUF6QixFQUFxQ0YsR0FBckMsRUFBMEMsRUFBMUMsQ0FjSTtBQUNEO0FBbEJJO0FBRFIsQ0FERDtBQU9BbEIsS0FBS3FCLFFBQUwsR0FBZ0IsSUFBSXBCLE9BQU9xQixVQUFYLENBQXNCLFVBQXRCLENBQWhCO0FBQ0F0QixLQUFLcUIsUUFBTCxDQUFjRSxLQUFkLENBQ0M7QUFBQUMsVUFBUTtBQW1CTCxXQW5CUSxJQW1CUjtBQW5CSDtBQUNBQyxVQUFRO0FBcUJMLFdBckJRLElBcUJSO0FBdEJIO0FBRUFDLFVBQVE7QUF1QkwsV0F2QlEsSUF1QlI7QUF2Qks7QUFGUixDQURELEU7Ozs7Ozs7Ozs7Ozs7O0FDbEJBLElBQUd6QixPQUFPQyxRQUFWO0FBRUNFLFNBQU91QixhQUFQLENBQXFCO0FBQ3BCLFFBQWlCeEIsbUJBQWtCLE9BQWxCLElBQThCLENBQUlGLE9BQU8yQixNQUFQLEVBQW5EO0FBQUksYUFBSnhCLE9BQU95QixFQUFQLENBQVUsR0FBVixDQUFJO0FBQ0Q7QUFGSjtBQUdBQyxXQUFTQyxjQUFULENBQXdCLFdBQXhCLEVBQXFDLFVBQUNDLEdBQUQ7QUFFbEMsV0FGMkNsQyxFQUFFbUMsU0FBRixDQUFZRCxHQUFaLENBRTNDO0FBRkg7QUFDQUYsV0FBU0MsY0FBVCxDQUF3QixXQUF4QixFQUFxQyxVQUFDQyxHQUFEO0FBSWxDLFdBSjJDbEMsRUFBRW9DLFNBQUYsQ0FBWUYsR0FBWixDQUkzQztBQUpIO0FBRUFGLFdBQVNLLElBQVQsQ0FBY0MsVUFBZCxDQUF5QjtBQUN4QkMsTUFBRSxjQUFGLEVBQWtCQyxXQUFsQjtBQUtFLFdBSkZyQyxPQUFPc0MsSUFBUCxDQUFZLE1BQVosRUFBb0IsVUFBQ0MsR0FBRCxFQUFNQyxHQUFOO0FBS2hCLGFBSkhBLE9BQVFDLFFBQVFDLEdBQVIsQ0FBWSxNQUFaLEVBQW9CRixHQUFwQixDQUlMO0FBTEosTUFJRTtBQU5IO0FBS0FYLFdBQVNLLElBQVQsQ0FBY1MsT0FBZCxDQUNDO0FBQUFDLFVBQU07QUFNRixhQU5LSCxRQUFRSSxHQUFSLENBQVksTUFBWixDQU1MO0FBTkU7QUFBTixHQUREO0FBR0FoQixXQUFTSyxJQUFULENBQWNZLE1BQWQsQ0FDQztBQUFBLHFCQUFpQjtBQVFiLGFBUmdCOUMsT0FBTytDLE1BQVAsRUFRaEI7QUFSYTtBQUFqQixHQUREO0FBR0FsQixXQUFTbUIsT0FBVCxDQUFpQmIsVUFBakIsQ0FBNEI7QUFVekIsV0FURkMsRUFBRSxTQUFGLEVBQWFhLE1BQWIsQ0FBb0I7QUFBQUMsY0FBUTtBQUFSLEtBQXBCLENBU0U7QUFWSDtBQUdBckIsV0FBU3NCLElBQVQsQ0FBY2hCLFVBQWQsQ0FBeUI7QUFDeEIsUUFBQWlCLFFBQUEsRUFBQUMsS0FBQSxFQUFBQyxTQUFBLEVBQUFDLEtBQUEsRUFBQUMsTUFBQSxFQUFBMUMsR0FBQSxFQUFBMkMsUUFBQSxFQUFBQyxLQUFBOztBQUFBSixnQkFBWSxVQUFDdkIsR0FBRDtBQUNYLFVBQUE0QixJQUFBO0FBQUFBLGFBQU85RCxFQUFFOEQsSUFBRixDQUFPakUsTUFBUCxFQUFlLFVBQUNxQixDQUFEO0FBY2pCLGVBZHdCQSxFQUFFcEIsSUFBRixLQUFVb0MsR0FjbEM7QUFkRSxRQUFQO0FBZ0JHLGFBZkg0QixLQUFLL0QsS0FlRjtBQWpCUSxLQUFaOztBQUdBNEQsYUFBUzNELEVBQUVpQixHQUFGLENBQU1mLEtBQUtxQixRQUFMLENBQWN1QyxJQUFkLEdBQXFCQyxLQUFyQixFQUFOLEVBQW9DLFVBQUM3QyxDQUFEO0FBQU8sVUFBQThDLE9BQUE7QUFrQmhELGFBbEJnREEsVUFBVUMsRUFBRUMsT0FBRixDQUFVaEQsQ0FBVixFQUM3RDtBQUFBaUQsZUFBTyxVQUFDQyxPQUFEO0FBbUJBLGlCQWxCTjtBQUFBWCx1QkFBV0EsVUFBVVcsUUFBUUMsVUFBUixDQUFtQkMsT0FBN0IsQ0FBWDtBQUNBQyxvQkFBUSxDQURSO0FBRUFDLHFCQUFTLENBRlQ7QUFHQXpFLG1CQUFPLE9BSFA7QUFJQTBFLHVCQUFXLEdBSlg7QUFLQUMseUJBQWE7QUFMYixXQWtCTTtBQW5CUDtBQU9BQyx1QkFBZSxVQUFDUCxPQUFELEVBQVVRLEtBQVY7QUFDZEEsZ0JBQU1DLEVBQU4sQ0FDQztBQUFBQyx1QkFBVyxVQUFDQyxLQUFEO0FBQ1ZBLG9CQUFNQyxNQUFOLENBQWFDLFFBQWIsQ0FDQztBQUFBVix3QkFBUSxDQUFSO0FBQ0FFLDJCQUFXO0FBRFgsZUFERDtBQXlCUSxxQkF0QlJNLE1BQU1DLE1BQU4sQ0FBYUUsWUFBYixFQXNCUTtBQTFCVDtBQUtBQyxzQkFBVSxVQUFDSixLQUFEO0FBd0JELHFCQXZCUmYsUUFBUW9CLFVBQVIsQ0FBbUJMLE1BQU1DLE1BQXpCLENBdUJRO0FBN0JUO0FBT0FLLG1CQUFPLFVBQUNOLEtBQUQ7QUF5QkUscUJBeEJSOUQsSUFBSXFFLFNBQUosQ0FBY1AsTUFBTUMsTUFBTixDQUFhTyxTQUFiLEVBQWQsQ0F3QlE7QUF6QkY7QUFQUCxXQUREO0FBb0NNLGlCQTFCTlgsTUFBTVksU0FBTixDQUFnQjtBQUNmLGdCQUFBQyxPQUFBLEVBQUFDLEdBQUEsRUFBQUMsR0FBQSxFQUFBekQsR0FBQTtBQUFBdUQsc0JBQVUsRUFBVjtBQUNBRSxrQkFBQXZCLFFBQUFDLFVBQUE7O0FBQUEsaUJBQUFxQixHQUFBLDJDQUFBQyxHQUFBO0FBNkJTekQsb0JBQU15RCxJQUFJRCxHQUFKLENBQU47QUE1QlJELHlCQUFXLGFBQVdDLEdBQVgsR0FBZSxNQUFmLEdBQXNCLElBQXRCLEdBQTJCeEQsR0FBM0IsR0FBK0IsT0FBMUM7QUFERDs7QUFnQ08sbUJBOUJQdUQsT0E4Qk87QUFsQ1IsWUEwQk07QUFyQ1E7QUFQZixPQUQ2RCxDQWtCMUQ7QUFsQkssTUFBVDtBQXdCQTVCLFlBQVEsQ0FBQyxhQUFELEVBQWdCLG1CQUFoQixDQUFSO0FBQ0FMLFlBQVF4RCxFQUFFaUIsR0FBRixDQUFNNEMsS0FBTixFQUFhLFVBQUMzQyxDQUFEO0FBbUNqQixhQW5Dd0IrQyxFQUFFMkIsU0FBRixDQUFZQyxRQUFaLENBQXFCM0UsQ0FBckIsQ0FtQ3hCO0FBbkNJLE1BQVI7QUFDQXFDLGVBQVd2RCxFQUFFOEYsU0FBRixDQUFZakMsS0FBWixFQUFtQkwsS0FBbkIsQ0FBWDtBQUNBRSxZQUFRMUQsRUFBRWlCLEdBQUYsQ0FBTWYsS0FBS3FCLFFBQUwsQ0FBY3VDLElBQWQsR0FBcUJDLEtBQXJCLEVBQU4sRUFBb0MsVUFBQzdDLENBQUQ7QUFxQ3hDLGFBckMrQ2xCLEVBQUVvQyxTQUFGLENBQVlsQixFQUFFcEIsSUFBZCxDQXFDL0M7QUFyQ0ksTUFBUjtBQUNBOEQsZUFBVzVELEVBQUU4RixTQUFGLENBQVlwQyxLQUFaLEVBQW1CQyxNQUFuQixDQUFYO0FBQ0ExQyxVQUFNZ0QsRUFBRWhELEdBQUYsQ0FBTSxNQUFOLEVBQ0w7QUFBQThFLGNBQVEsQ0FBQyxHQUFELEVBQU0sR0FBTixDQUFSO0FBQ0FDLFlBQU0sQ0FETjtBQUVBQyxtQkFBYSxLQUZiO0FBR0FDLDBCQUFvQixLQUhwQjtBQUlBdkMsMkNBQVNILEtBQVQsc0JBQW1CRyxNQUFuQjtBQUpBLEtBREssQ0FBTjtBQU1BTSxNQUFFa0MsT0FBRixDQUFVeEMsTUFBVixDQUFpQkosUUFBakIsRUFBMkJLLFFBQTNCLEVBQXFDO0FBQUF3QyxpQkFBVztBQUFYLEtBQXJDLEVBQXVEQyxLQUF2RCxDQUE2RHBGLEdBQTdEO0FBMENFLFdBekNGZ0QsRUFBRWtDLE9BQUYsQ0FBVUcsTUFBVixDQUFpQjtBQUFBQyxnQkFBUztBQUFULEtBQWpCLEVBQXNDRixLQUF0QyxDQUE0Q3BGLEdBQTVDLENBeUNFO0FBakZIO0FBMENBZSxXQUFTd0UsS0FBVCxDQUFldkQsTUFBZixDQUNDO0FBQUEsb0JBQWdCLFVBQUM4QixLQUFEO0FBQ2YsVUFBQTBCLElBQUEsRUFBQUMsTUFBQTtBQUFBRCxhQUFPMUIsTUFBTUMsTUFBTixDQUFhMkIsS0FBYixDQUFtQixDQUFuQixDQUFQO0FBQ0FELGVBQVMsSUFBSUUsVUFBSixFQUFUOztBQUNBRixhQUFPRyxNQUFQLEdBQWdCO0FBQ2YsWUFBQUMsR0FBQSxFQUFBbkcsSUFBQSxFQUFBb0csS0FBQTtBQUFBQSxnQkFBUS9HLEVBQUUrRyxLQUFGLENBQVEvRyxFQUFFZ0gsU0FBRixDQUFZUCxLQUFLOUYsSUFBakIsQ0FBUixFQUFnQyxHQUFoQyxDQUFSOztBQUNBLFlBQUdvRyxNQUFNLENBQU4sTUFBWSxTQUFmO0FBQ0NwRyxpQkFBTztBQUFBVSxrQkFBTTBGLE1BQU0sQ0FBTixDQUFOO0FBQWdCakgsa0JBQU1pSCxNQUFNLENBQU47QUFBdEIsV0FBUDtBQUNBRCxnQkFBTTlHLEVBQUVpSCxNQUFGLENBQVN0RyxJQUFULEVBQWV1RyxLQUFLQyxLQUFMLENBQVdULE9BQU9VLE1BQWxCLENBQWYsQ0FBTjtBQWlESyxpQkFoRExqSCxPQUFPc0MsSUFBUCxDQUFZLFFBQVosRUFBc0IsVUFBdEIsRUFBa0M5QixJQUFsQyxFQUF3Q21HLEdBQXhDLEVBQTZDLFVBQUNwRSxHQUFELEVBQU1DLEdBQU47QUFpRHRDLG1CQWhETkEsT0FBUTBFLFlBQVlDLEtBQVosQ0FBa0IsaUJBQWxCLEVBQXFDLElBQXJDLEVBQTJDLFFBQTNDLENBZ0RGO0FBakRQLFlBZ0RLO0FBR0Q7QUF4RFUsT0FBaEI7O0FBMERHLGFBbkRIWixPQUFPYSxVQUFQLENBQWtCZCxJQUFsQixFQUF3QixPQUF4QixDQW1ERztBQTdEWTtBQUFoQixHQUREO0FBYUF6RSxXQUFTd0YsS0FBVCxDQUFldkUsTUFBZixDQUNDO0FBQUEsbUJBQWUsVUFBQzhCLEtBQUQ7QUFBQTs7QUFDZCxVQUFBMEMsS0FBQTtBQUFBMUMsWUFBTTJDLGNBQU47QUFDQUQsY0FBUXpILEVBQUVpQixHQUFGLENBQU0sQ0FBQyxVQUFELEVBQWEsVUFBYixDQUFOLEVBQWdDLFVBQUNDLENBQUQ7QUFzRG5DLGVBckRKNkQsTUFBTUMsTUFBTixDQUFhMkMsUUFBYixDQUFzQnpHLENBQXRCLEVBQXlCMEcsS0FxRHJCO0FBdERHLFFBQVI7QUF3REcsYUF0REgsbUJBQU9DLGlCQUFQLG1DQUF5QkosS0FBekIsVUFBbUMsVUFBQy9FLEdBQUQ7QUFDbEMsYUFBT0EsR0FBUDtBQXVETSxpQkF2RFVwQyxPQUFPeUIsRUFBUCxDQUFVLEdBQVYsQ0F1RFY7QUFDRDtBQXpETixVQXNERztBQTFEVztBQUFmLEdBREQ7QUFrRUEsQzs7Ozs7Ozs7Ozs7O0FDL0lELElBQUc1QixPQUFPMkgsUUFBVjtBQUVDM0gsU0FBTzRILE9BQVAsQ0FBZSxNQUFmLEVBQXVCLFVBQUNwSCxJQUFELEVBQU9xSCxRQUFQLEVBQWlCQyxRQUFqQjtBQUFwQixXQUNGL0gsS0FBS1MsSUFBTCxFQUFXbUQsSUFBWCxDQUFnQmtFLFFBQWhCLEVBQTBCQyxRQUExQixDQURFO0FBQUg7QUFHQTlILFNBQU8rSCxPQUFQLENBQ0M7QUFBQSxjQUFRLFVBQUN2SCxJQUFELEVBQU9xSCxRQUFQLEVBQWlCQyxRQUFqQjtBQUFKLGFBQ0gvSCxLQUFLUyxJQUFMLEVBQVd3SCxNQUFYLENBQWtCSCxRQUFsQixFQUE0QkMsUUFBNUIsQ0FERztBQUFKO0FBR0FsRixVQUFNO0FBQ0wsVUFBQXFGLEdBQUEsRUFBQTFDLEdBQUEsRUFBQXpFLEdBQUEsRUFBQTBFLEdBQUEsRUFBQXpELEdBQUE7QUFBQWpCLFlBQU1qQixFQUFFaUIsR0FBRixDQUFNZixLQUFLcUIsUUFBTCxDQUFjdUMsSUFBZCxHQUFxQkMsS0FBckIsRUFBTixFQUFvQyxVQUFDN0MsQ0FBRDtBQUNyQyxlQUFKbEIsRUFBRXFJLElBQUYsQ0FBT25ILENBQVAsRUFBVSxDQUFDLE1BQUQsRUFBUyxNQUFULENBQVYsQ0FBSTtBQURDLFFBQU47QUFFQWtILFlBQU0sRUFBTjtBQUNBekMsWUFBQTNGLEVBQUFzSSxPQUFBLENBQUFySCxHQUFBOztBQUFBLFdBQUF5RSxHQUFBLDJDQUFBQyxHQUFBO0FBR0t6RCxjQUFNeUQsSUFBSUQsR0FBSixDQUFOO0FBRkowQyxZQUFJRyxJQUFKLENBQ0M7QUFBQWxILGdCQUFNcUUsR0FBTjtBQUNBaEMsaUJBQU8xRCxFQUFFaUIsR0FBRixDQUFNaUIsR0FBTixFQUFXLFVBQUNzRyxDQUFEO0FBSVgsbUJBSmtCQSxFQUFFMUksSUFJcEI7QUFKQTtBQURQLFNBREQ7QUFERDs7QUFXRyxhQVBIc0ksR0FPRztBQWZFO0FBSE4sR0FERDtBQXNCQSxDIiwiZmlsZSI6Ii9hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJAY29sb3JzID0gW1xuXHRpdGVtOiAnS1NBL0tQQSdcblx0Y29sb3I6ICdwdXJwbGUnXG4sXG5cdGl0ZW06ICdBUEwnXG5cdGNvbG9yOiAnd2hpdGUnXG4sXG5cdGl0ZW06ICdITCdcblx0Y29sb3I6ICdncmVlbidcbixcblx0aXRlbTogJ0hQJ1xuXHRjb2xvcjogJ3llbGxvdydcbixcblx0aXRlbTogJ0hQSydcblx0Y29sb3I6ICdwaW5rJ1xuLFxuXHRpdGVtOiAnSFBUJ1xuXHRjb2xvcjogJyMzM2U3MmQnXG5dXG4iLCJAXyA9IGxvZGFzaFxuQGNvbGwgPSB7fVxuXG5pZiBNZXRlb3IuaXNDbGllbnRcblx0QGN1cnJlbnRSb3V0ZSA9IC0+IFJvdXRlci5jdXJyZW50KCkucm91dGUuZ2V0TmFtZSgpXG5cdEBjdXJyZW50UGFyID0gKG5hbWUpIC0+IFJvdXRlci5jdXJyZW50KCkucGFyYW1zW25hbWVdXG4iLCJSb3V0ZXIuY29uZmlndXJlXG5cdGxheW91dFRlbXBsYXRlOiAnbGF5b3V0J1xuXG5Sb3V0ZXIucm91dGUgJy8nLFxuXHRhY3Rpb246IC0+IHRoaXMucmVuZGVyICdiZXJhbmRhJ1xuXG5fLm1hcCBbJ2xvZ2luJywgJ2FkbWluJ10sIChpKSAtPlxuXHRSb3V0ZXIucm91dGUgJy8nK2ksXG5cdFx0YWN0aW9uOiAtPiB0aGlzLnJlbmRlciBpXG5cblJvdXRlci5yb3V0ZSAnL3BldGEvOmdydXA/LzppdGVtPycsXG5cdGFjdGlvbjogLT4gdGhpcy5yZW5kZXIgJ3BldGEnXG5cdHdhaXRPbjogLT4gaWYgTWV0ZW9yLmlzQ2xpZW50XG5cdFx0c2VsID0gZ3J1cDogdGhpcy5wYXJhbXMuZ3J1cFxuXHRcdHRoaXMucGFyYW1zLml0ZW0gYW5kIHNlbC5pdGVtID0gdGhpcy5wYXJhbXMuaXRlbVxuXHRcdE1ldGVvci5zdWJzY3JpYmUgJ2NvbGwnLCAnZ2VvanNvbnMnLCBzZWwsIHt9XG5cbmNvbGwuZ2VvanNvbnMgPSBuZXcgTWV0ZW9yLkNvbGxlY3Rpb24gJ2dlb2pzb25zJ1xuY29sbC5nZW9qc29ucy5hbGxvd1xuXHRpbnNlcnQ6IC0+IHRydWVcblx0dXBkYXRlOiAtPiB0cnVlXG5cdHJlbW92ZTogLT4gdHJ1ZVxuIiwiaWYgTWV0ZW9yLmlzQ2xpZW50XG5cblx0Um91dGVyLm9uQWZ0ZXJBY3Rpb24gLT5cblx0XHRSb3V0ZXIuZ28gJy8nIGlmIGN1cnJlbnRSb3V0ZSgpIGlzICdhZG1pbicgYW5kIG5vdCBNZXRlb3IudXNlcklkKClcblxuXHRUZW1wbGF0ZS5yZWdpc3RlckhlbHBlciAnc3RhcnRDYXNlJywgKHZhbCkgLT4gXy5zdGFydENhc2UgdmFsXG5cdFRlbXBsYXRlLnJlZ2lzdGVySGVscGVyICd1cHBlckNhc2UnLCAodmFsKSAtPiBfLnVwcGVyQ2FzZSB2YWxcblxuXHRUZW1wbGF0ZS5tZW51Lm9uUmVuZGVyZWQgLT5cblx0XHQkKCcuY29sbGFwc2libGUnKS5jb2xsYXBzaWJsZSgpXG5cdFx0TWV0ZW9yLmNhbGwgJ2xpc3QnLCAoZXJyLCByZXMpIC0+XG5cdFx0XHRyZXMgYW5kIFNlc3Npb24uc2V0ICdsaXN0JywgcmVzXG5cblx0VGVtcGxhdGUubWVudS5oZWxwZXJzXG5cdFx0bGlzdDogLT4gU2Vzc2lvbi5nZXQgJ2xpc3QnXG5cblx0VGVtcGxhdGUubWVudS5ldmVudHNcblx0XHQnY2xpY2sgI2xvZ291dCc6IC0+IE1ldGVvci5sb2dvdXQoKVxuXG5cdFRlbXBsYXRlLmJlcmFuZGEub25SZW5kZXJlZCAtPlxuXHRcdCQoJy5zbGlkZXInKS5zbGlkZXIgaGVpZ2h0OiA5MDBcblxuXHRUZW1wbGF0ZS5wZXRhLm9uUmVuZGVyZWQgLT5cblx0XHRmaWxsQ29sb3IgPSAodmFsKSAtPlxuXHRcdFx0ZmluZCA9IF8uZmluZCBjb2xvcnMsIChpKSAtPiBpLml0ZW0gaXMgdmFsXG5cdFx0XHRmaW5kLmNvbG9yXG5cdFx0bGF5ZXJzID0gXy5tYXAgY29sbC5nZW9qc29ucy5maW5kKCkuZmV0Y2goKSwgKGkpIC0+IGdlb2pzb24gPSBMLmdlb0pzb24gaSxcblx0XHRcdHN0eWxlOiAoZmVhdHVyZSkgLT5cblx0XHRcdFx0ZmlsbENvbG9yOiBmaWxsQ29sb3IgZmVhdHVyZS5wcm9wZXJ0aWVzLkZfUHJiaG5cblx0XHRcdFx0d2VpZ2h0OiAyXG5cdFx0XHRcdG9wYWNpdHk6IDFcblx0XHRcdFx0Y29sb3I6ICd3aGl0ZSdcblx0XHRcdFx0ZGFzaEFycmF5OiAnMydcblx0XHRcdFx0ZmlsbE9wYWNpdHk6IDAuN1xuXHRcdFx0b25FYWNoRmVhdHVyZTogKGZlYXR1cmUsIGxheWVyKSAtPlxuXHRcdFx0XHRsYXllci5vblxuXHRcdFx0XHRcdG1vdXNlb3ZlcjogKGV2ZW50KSAtPlxuXHRcdFx0XHRcdFx0ZXZlbnQudGFyZ2V0LnNldFN0eWxlXG5cdFx0XHRcdFx0XHRcdHdlaWdodDogM1xuXHRcdFx0XHRcdFx0XHRkYXNoQXJyYXk6ICcnXG5cdFx0XHRcdFx0XHRldmVudC50YXJnZXQuYnJpbmdUb0Zyb250KClcblx0XHRcdFx0XHRtb3VzZW91dDogKGV2ZW50KSAtPlxuXHRcdFx0XHRcdFx0Z2VvanNvbi5yZXNldFN0eWxlIGV2ZW50LnRhcmdldFxuXHRcdFx0XHRcdGNsaWNrOiAoZXZlbnQpIC0+XG5cdFx0XHRcdFx0XHRtYXAuZml0Qm91bmRzIGV2ZW50LnRhcmdldC5nZXRCb3VuZHMoKVxuXHRcdFx0XHRsYXllci5iaW5kUG9wdXAgLT5cblx0XHRcdFx0XHRjb250ZW50ID0gJydcblx0XHRcdFx0XHRmb3Iga2V5LCB2YWwgb2YgZmVhdHVyZS5wcm9wZXJ0aWVzXG5cdFx0XHRcdFx0XHRjb250ZW50ICs9ICc8Yj5EYXRhICcra2V5Kyc8L2I+JysnOiAnK3ZhbCsnPC9icj4nXG5cdFx0XHRcdFx0Y29udGVudFxuXHRcdHRpbGVzID0gWydPcGVuVG9wb01hcCcsICdFc3JpLldvcmxkSW1hZ2VyeSddXG5cdFx0YmFzZXMgPSBfLm1hcCB0aWxlcywgKGkpIC0+IEwudGlsZUxheWVyLnByb3ZpZGVyIGlcblx0XHRiYXNlTWFwcyA9IF8uemlwT2JqZWN0IHRpbGVzLCBiYXNlc1xuXHRcdGl0ZW1zID0gXy5tYXAgY29sbC5nZW9qc29ucy5maW5kKCkuZmV0Y2goKSwgKGkpIC0+IF8udXBwZXJDYXNlIGkuaXRlbVxuXHRcdG92ZXJMYXlzID0gXy56aXBPYmplY3QgaXRlbXMsIGxheWVyc1xuXHRcdG1hcCA9IEwubWFwICdwZXRhJyxcblx0XHRcdGNlbnRlcjogWzAuNSwgMTAxXVxuXHRcdFx0em9vbTogOFxuXHRcdFx0em9vbUNvbnRyb2w6IGZhbHNlXG5cdFx0XHRhdHRyaWJ1dGlvbkNvbnRyb2w6IGZhbHNlXG5cdFx0XHRsYXllcnM6IFtiYXNlcy4uLiwgbGF5ZXJzLi4uXVxuXHRcdEwuY29udHJvbC5sYXllcnMoYmFzZU1hcHMsIG92ZXJMYXlzLCBjb2xsYXBzZWQ6IGZhbHNlKS5hZGRUbyBtYXBcblx0XHRMLmNvbnRyb2wubG9jYXRlKHBvc2l0aW9uOid0b3ByaWdodCcpLmFkZFRvIG1hcFxuXG5cdFRlbXBsYXRlLmFkbWluLmV2ZW50c1xuXHRcdCdjaGFuZ2UgOmZpbGUnOiAoZXZlbnQpIC0+XG5cdFx0XHRmaWxlID0gZXZlbnQudGFyZ2V0LmZpbGVzWzBdXG5cdFx0XHRyZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpXG5cdFx0XHRyZWFkZXIub25sb2FkID0gLT5cblx0XHRcdFx0c3BsaXQgPSBfLnNwbGl0IF8ua2ViYWJDYXNlKGZpbGUubmFtZSksICctJ1xuXHRcdFx0XHRpZiBzcGxpdFsyXSBpcyAnZ2VvanNvbidcblx0XHRcdFx0XHRuYW1lID0gZ3J1cDogc3BsaXRbMF0sIGl0ZW06IHNwbGl0WzFdXG5cdFx0XHRcdFx0ZG9jID0gXy5hc3NpZ24gbmFtZSwgSlNPTi5wYXJzZSByZWFkZXIucmVzdWx0XG5cdFx0XHRcdFx0TWV0ZW9yLmNhbGwgJ2ltcG9ydCcsICdnZW9qc29ucycsIG5hbWUsIGRvYywgKGVyciwgcmVzKSAtPlxuXHRcdFx0XHRcdFx0cmVzIGFuZCBNYXRlcmlhbGl6ZS50b2FzdCAnVW5nZ2FoIEJlcmhhc2lsJywgMzAwMCwgJ29yYW5nZSdcblx0XHRcdHJlYWRlci5yZWFkQXNUZXh0IGZpbGUsICdVVEYtOCdcblxuXHRUZW1wbGF0ZS5sb2dpbi5ldmVudHNcblx0XHQnc3VibWl0IGZvcm0nOiAoZXZlbnQpIC0+XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpXG5cdFx0XHRjcmVkcyA9IF8ubWFwIFsndXNlcm5hbWUnLCAncGFzc3dvcmQnXSwgKGkpIC0+XG5cdFx0XHRcdGV2ZW50LnRhcmdldC5jaGlsZHJlbltpXS52YWx1ZVxuXHRcdFx0TWV0ZW9yLmxvZ2luV2l0aFBhc3N3b3JkIGNyZWRzLi4uLCAoZXJyKSAtPlxuXHRcdFx0XHR1bmxlc3MgZXJyIHRoZW4gUm91dGVyLmdvICcvJ1xuIiwiaWYgTWV0ZW9yLmlzU2VydmVyXG5cblx0TWV0ZW9yLnB1Ymxpc2ggJ2NvbGwnLCAobmFtZSwgc2VsZWN0b3IsIG1vZGlmaWVyKSAtPlxuXHRcdGNvbGxbbmFtZV0uZmluZCBzZWxlY3RvciwgbW9kaWZpZXJcblxuXHRNZXRlb3IubWV0aG9kc1xuXHRcdGltcG9ydDogKG5hbWUsIHNlbGVjdG9yLCBtb2RpZmllcikgLT5cblx0XHRcdGNvbGxbbmFtZV0udXBzZXJ0IHNlbGVjdG9yLCBtb2RpZmllclxuXG5cdFx0bGlzdDogLT5cblx0XHRcdG1hcCA9IF8ubWFwIGNvbGwuZ2VvanNvbnMuZmluZCgpLmZldGNoKCksIChpKSAtPlxuXHRcdFx0XHRfLnBpY2sgaSwgWydncnVwJywgJ2l0ZW0nXVxuXHRcdFx0YXJyID0gW11cblx0XHRcdGZvciBrZXksIHZhbCBvZiBfLmdyb3VwQnkobWFwLCAnZ3J1cCcpXG5cdFx0XHRcdGFyci5wdXNoXG5cdFx0XHRcdFx0Z3J1cDoga2V5XG5cdFx0XHRcdFx0aXRlbXM6IF8ubWFwIHZhbCwgKGopIC0+IGouaXRlbVxuXHRcdFx0YXJyXG4iXX0=
