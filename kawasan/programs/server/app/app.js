var require = meteorInstall({"folder":{"array.coffee":function(){

///////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                           //
// folder/array.coffee                                                                       //
//                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////
                                                                                             //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
this.colors = [{
  item: 'KSA/KPA',
  color: '#ad3fff'
}, {
  item: 'APL',
  color: 'white'
}, {
  item: 'HL',
  color: '#02ad00'
}, {
  item: 'HP',
  color: '#ffff00'
}, {
  item: 'HPK',
  color: '#ff5eff'
}, {
  item: 'HPT',
  color: '#8af200'
}];
///////////////////////////////////////////////////////////////////////////////////////////////

},"funcs.coffee":function(){

///////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                           //
// folder/funcs.coffee                                                                       //
//                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////
                                                                                             //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
this._ = lodash;
this.coll = {};

if (Meteor.isClient) {
  this.currentPar = function (name) {
    return Router.current().params[name];
  };
}
///////////////////////////////////////////////////////////////////////////////////////////////

}},"both.coffee":function(){

///////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                           //
// both.coffee                                                                               //
//                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////
                                                                                             //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
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
///////////////////////////////////////////////////////////////////////////////////////////////

},"client.coffee":function(){

///////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                           //
// client.coffee                                                                             //
//                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////
                                                                                             //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

if (Meteor.isClient) {
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
      layers: [].concat(_toConsumableArray(bases), _toConsumableArray(layers))
    });
    L.control.layers(baseMaps, overLays).addTo(map);
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
      return (_Meteor = Meteor).loginWithPassword.apply(_Meteor, _toConsumableArray(creds));
    }
  });
}
///////////////////////////////////////////////////////////////////////////////////////////////

},"server.coffee":function(){

///////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                           //
// server.coffee                                                                             //
//                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////
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
///////////////////////////////////////////////////////////////////////////////////////////////

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvZm9sZGVyL2FycmF5LmNvZmZlZSIsIm1ldGVvcjovL/CfkrthcHAvZm9sZGVyL2Z1bmNzLmNvZmZlZSIsIm1ldGVvcjovL/CfkrthcHAvYm90aC5jb2ZmZWUiLCJtZXRlb3I6Ly/wn5K7YXBwL2NsaWVudC5jb2ZmZWUiLCJtZXRlb3I6Ly/wn5K7YXBwL3NlcnZlci5jb2ZmZWUiXSwibmFtZXMiOlsiY29sb3JzIiwiaXRlbSIsImNvbG9yIiwiXyIsImxvZGFzaCIsImNvbGwiLCJNZXRlb3IiLCJpc0NsaWVudCIsImN1cnJlbnRQYXIiLCJuYW1lIiwiUm91dGVyIiwiY3VycmVudCIsInBhcmFtcyIsImNvbmZpZ3VyZSIsImxheW91dFRlbXBsYXRlIiwibG9hZGluZ1RlbXBsYXRlIiwicm91dGUiLCJhY3Rpb24iLCJyZW5kZXIiLCJtYXAiLCJpIiwid2FpdE9uIiwic2VsIiwiZ3J1cCIsInN1YnNjcmliZSIsImdlb2pzb25zIiwiQ29sbGVjdGlvbiIsImFsbG93IiwiaW5zZXJ0IiwidXBkYXRlIiwicmVtb3ZlIiwiVGVtcGxhdGUiLCJyZWdpc3RlckhlbHBlciIsInZhbCIsInN0YXJ0Q2FzZSIsInVwcGVyQ2FzZSIsIm1lbnUiLCJvblJlbmRlcmVkIiwiJCIsImNvbGxhcHNpYmxlIiwiY2FsbCIsImVyciIsInJlcyIsIlNlc3Npb24iLCJzZXQiLCJoZWxwZXJzIiwibGlzdCIsImdldCIsInBldGEiLCJiYXNlTWFwcyIsImJhc2VzIiwiZmlsbENvbG9yIiwiaXRlbXMiLCJsYXllcnMiLCJvdmVyTGF5cyIsInRpbGVzIiwiZmluZCIsImZldGNoIiwiZ2VvanNvbiIsIkwiLCJnZW9Kc29uIiwic3R5bGUiLCJmZWF0dXJlIiwicHJvcGVydGllcyIsIkZfUHJiaG4iLCJ3ZWlnaHQiLCJvcGFjaXR5IiwiZGFzaEFycmF5IiwiZmlsbE9wYWNpdHkiLCJvbkVhY2hGZWF0dXJlIiwibGF5ZXIiLCJvbiIsIm1vdXNlb3ZlciIsImV2ZW50IiwidGFyZ2V0Iiwic2V0U3R5bGUiLCJicmluZ1RvRnJvbnQiLCJtb3VzZW91dCIsInJlc2V0U3R5bGUiLCJjbGljayIsImZpdEJvdW5kcyIsImdldEJvdW5kcyIsImJpbmRQb3B1cCIsImNvbnRlbnQiLCJrZXkiLCJyZWYiLCJ0aWxlTGF5ZXIiLCJwcm92aWRlciIsInppcE9iamVjdCIsImNlbnRlciIsInpvb20iLCJ6b29tQ29udHJvbCIsImNvbnRyb2wiLCJhZGRUbyIsImxvY2F0ZSIsInBvc2l0aW9uIiwiYWRtaW4iLCJldmVudHMiLCJmaWxlIiwicmVhZGVyIiwiZmlsZXMiLCJGaWxlUmVhZGVyIiwib25sb2FkIiwiZG9jIiwic3BsaXQiLCJrZWJhYkNhc2UiLCJhc3NpZ24iLCJKU09OIiwicGFyc2UiLCJyZXN1bHQiLCJNYXRlcmlhbGl6ZSIsInRvYXN0IiwicmVhZEFzVGV4dCIsImxvZ2luIiwiY3JlZHMiLCJwcmV2ZW50RGVmYXVsdCIsImNoaWxkcmVuIiwidmFsdWUiLCJsb2dpbldpdGhQYXNzd29yZCIsImlzU2VydmVyIiwicHVibGlzaCIsInNlbGVjdG9yIiwibW9kaWZpZXIiLCJtZXRob2RzIiwidXBzZXJ0IiwiYXJyIiwicGljayIsImdyb3VwQnkiLCJwdXNoIiwiaiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsS0FBQ0EsTUFBRCxHQUFVLENBQ1Q7QUFBQUMsUUFBTSxTQUFOO0FBQ0FDLFNBQU87QUFEUCxDQURTLEVBSVQ7QUFBQUQsUUFBTSxLQUFOO0FBQ0FDLFNBQU87QUFEUCxDQUpTLEVBT1Q7QUFBQUQsUUFBTSxJQUFOO0FBQ0FDLFNBQU87QUFEUCxDQVBTLEVBVVQ7QUFBQUQsUUFBTSxJQUFOO0FBQ0FDLFNBQU87QUFEUCxDQVZTLEVBYVQ7QUFBQUQsUUFBTSxLQUFOO0FBQ0FDLFNBQU87QUFEUCxDQWJTLEVBZ0JUO0FBQUFELFFBQU0sS0FBTjtBQUNBQyxTQUFPO0FBRFAsQ0FoQlMsQ0FBVixDOzs7Ozs7Ozs7Ozs7QUNBQSxLQUFDQyxDQUFELEdBQUtDLE1BQUw7QUFDQSxL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LEVBQVMsTUFBVCxDQUFWLENBQUk7QUFEQyxRQUFOO0FBRUF5RyxZQUFNLEVBQU47QUFDQXhDLFlBQUFsRixFQUFBNEgsT0FBQSxDQUFBNUcsR0FBQTs7QUFBQSxXQUFBaUUsR0FBQSwyQ0FBQUMsR0FBQTtBQUdLcEQsY0FBTW9ELElBQUlELEdBQUosQ0FBTjtBQUZKeUMsWUFBSUcsSUFBSixDQUNDO0FBQUF6RyxnQkFBTTZELEdBQU47QUFDQWhDLGlCQUFPakQsRUFBRWdCLEdBQUYsQ0FBTWMsR0FBTixFQUFXLFVBQUNnRyxDQUFEO0FBSVgsbUJBSmtCQSxFQUFFaEksSUFJcEI7QUFKQTtBQURQLFNBREQ7QUFERDs7QUFXRyxhQVBINEgsR0FPRztBQWZFO0FBSE4sR0FERDtBQXNCQSxDIiwiZmlsZSI6Ii9hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJAY29sb3JzID0gW1xuXHRpdGVtOiAnS1NBL0tQQSdcblx0Y29sb3I6ICcjYWQzZmZmJ1xuLFxuXHRpdGVtOiAnQVBMJ1xuXHRjb2xvcjogJ3doaXRlJ1xuLFxuXHRpdGVtOiAnSEwnXG5cdGNvbG9yOiAnIzAyYWQwMCdcbixcblx0aXRlbTogJ0hQJ1xuXHRjb2xvcjogJyNmZmZmMDAnXG4sXG5cdGl0ZW06ICdIUEsnXG5cdGNvbG9yOiAnI2ZmNWVmZidcbixcblx0aXRlbTogJ0hQVCdcblx0Y29sb3I6ICcjOGFmMjAwJ1xuXVxuIiwiQF8gPSBsb2Rhc2hcbkBjb2xsID0ge31cblxuaWYgTWV0ZW9yLmlzQ2xpZW50XG5cdEBjdXJyZW50UGFyID0gKG5hbWUpIC0+IFJvdXRlci5jdXJyZW50KCkucGFyYW1zW25hbWVdXG4iLCJSb3V0ZXIuY29uZmlndXJlXG5cdGxheW91dFRlbXBsYXRlOiAnbGF5b3V0J1xuXHRsb2FkaW5nVGVtcGxhdGU6ICdsb2FkaW5nJ1xuXG5Sb3V0ZXIucm91dGUgJy8nLFxuXHRhY3Rpb246IC0+IHRoaXMucmVuZGVyICdiZXJhbmRhJ1xuXG5fLm1hcCBbJ2xvZ2luJywgJ2FkbWluJ10sIChpKSAtPlxuXHRSb3V0ZXIucm91dGUgJy8nK2ksXG5cdFx0YWN0aW9uOiAtPiB0aGlzLnJlbmRlciBpXG5cblJvdXRlci5yb3V0ZSAnL3BldGEvOmdydXA/LzppdGVtPycsXG5cdGFjdGlvbjogLT4gdGhpcy5yZW5kZXIgJ3BldGEnXG5cdHdhaXRPbjogLT4gaWYgTWV0ZW9yLmlzQ2xpZW50XG5cdFx0c2VsID0gZ3J1cDogdGhpcy5wYXJhbXMuZ3J1cFxuXHRcdHRoaXMucGFyYW1zLml0ZW0gYW5kIHNlbC5pdGVtID0gdGhpcy5wYXJhbXMuaXRlbVxuXHRcdE1ldGVvci5zdWJzY3JpYmUgJ2NvbGwnLCAnZ2VvanNvbnMnLCBzZWwsIHt9XG5cbmNvbGwuZ2VvanNvbnMgPSBuZXcgTWV0ZW9yLkNvbGxlY3Rpb24gJ2dlb2pzb25zJ1xuY29sbC5nZW9qc29ucy5hbGxvd1xuXHRpbnNlcnQ6IC0+IHRydWVcblx0dXBkYXRlOiAtPiB0cnVlXG5cdHJlbW92ZTogLT4gdHJ1ZVxuIiwiaWYgTWV0ZW9yLmlzQ2xpZW50XG5cblx0VGVtcGxhdGUucmVnaXN0ZXJIZWxwZXIgJ3N0YXJ0Q2FzZScsICh2YWwpIC0+IF8uc3RhcnRDYXNlIHZhbFxuXHRUZW1wbGF0ZS5yZWdpc3RlckhlbHBlciAndXBwZXJDYXNlJywgKHZhbCkgLT4gXy51cHBlckNhc2UgdmFsXG5cblx0VGVtcGxhdGUubWVudS5vblJlbmRlcmVkIC0+XG5cdFx0JCgnLmNvbGxhcHNpYmxlJykuY29sbGFwc2libGUoKVxuXHRcdE1ldGVvci5jYWxsICdsaXN0JywgKGVyciwgcmVzKSAtPlxuXHRcdFx0cmVzIGFuZCBTZXNzaW9uLnNldCAnbGlzdCcsIHJlc1xuXG5cdFRlbXBsYXRlLm1lbnUuaGVscGVyc1xuXHRcdGxpc3Q6IC0+IFNlc3Npb24uZ2V0ICdsaXN0J1xuXG5cdFRlbXBsYXRlLnBldGEub25SZW5kZXJlZCAtPlxuXHRcdGZpbGxDb2xvciA9ICh2YWwpIC0+XG5cdFx0XHRmaW5kID0gXy5maW5kIGNvbG9ycywgKGkpIC0+IGkuaXRlbSBpcyB2YWxcblx0XHRcdGZpbmQuY29sb3Jcblx0XHRsYXllcnMgPSBfLm1hcCBjb2xsLmdlb2pzb25zLmZpbmQoKS5mZXRjaCgpLCAoaSkgLT4gZ2VvanNvbiA9IEwuZ2VvSnNvbiBpLFxuXHRcdFx0c3R5bGU6IChmZWF0dXJlKSAtPlxuXHRcdFx0XHRmaWxsQ29sb3I6IGZpbGxDb2xvciBmZWF0dXJlLnByb3BlcnRpZXMuRl9QcmJoblxuXHRcdFx0XHR3ZWlnaHQ6IDJcblx0XHRcdFx0b3BhY2l0eTogMVxuXHRcdFx0XHRjb2xvcjogJ3doaXRlJ1xuXHRcdFx0XHRkYXNoQXJyYXk6ICczJ1xuXHRcdFx0XHRmaWxsT3BhY2l0eTogMC43XG5cdFx0XHRvbkVhY2hGZWF0dXJlOiAoZmVhdHVyZSwgbGF5ZXIpIC0+XG5cdFx0XHRcdGxheWVyLm9uXG5cdFx0XHRcdFx0bW91c2VvdmVyOiAoZXZlbnQpIC0+XG5cdFx0XHRcdFx0XHRldmVudC50YXJnZXQuc2V0U3R5bGVcblx0XHRcdFx0XHRcdFx0d2VpZ2h0OiAzXG5cdFx0XHRcdFx0XHRcdGRhc2hBcnJheTogJydcblx0XHRcdFx0XHRcdGV2ZW50LnRhcmdldC5icmluZ1RvRnJvbnQoKVxuXHRcdFx0XHRcdG1vdXNlb3V0OiAoZXZlbnQpIC0+XG5cdFx0XHRcdFx0XHRnZW9qc29uLnJlc2V0U3R5bGUgZXZlbnQudGFyZ2V0XG5cdFx0XHRcdFx0Y2xpY2s6IChldmVudCkgLT5cblx0XHRcdFx0XHRcdG1hcC5maXRCb3VuZHMgZXZlbnQudGFyZ2V0LmdldEJvdW5kcygpXG5cdFx0XHRcdGxheWVyLmJpbmRQb3B1cCAtPlxuXHRcdFx0XHRcdGNvbnRlbnQgPSAnJ1xuXHRcdFx0XHRcdGZvciBrZXksIHZhbCBvZiBmZWF0dXJlLnByb3BlcnRpZXNcblx0XHRcdFx0XHRcdGNvbnRlbnQgKz0gJzxiPkRhdGEgJytrZXkrJzwvYj4nKyc6ICcrdmFsKyc8L2JyPidcblx0XHRcdFx0XHRjb250ZW50XG5cdFx0dGlsZXMgPSBbJ09wZW5Ub3BvTWFwJywgJ0VzcmkuV29ybGRJbWFnZXJ5J11cblx0XHRiYXNlcyA9IF8ubWFwIHRpbGVzLCAoaSkgLT4gTC50aWxlTGF5ZXIucHJvdmlkZXIgaVxuXHRcdGJhc2VNYXBzID0gXy56aXBPYmplY3QgdGlsZXMsIGJhc2VzXG5cdFx0aXRlbXMgPSBfLm1hcCBjb2xsLmdlb2pzb25zLmZpbmQoKS5mZXRjaCgpLCAoaSkgLT4gXy51cHBlckNhc2UgaS5pdGVtXG5cdFx0b3ZlckxheXMgPSBfLnppcE9iamVjdCBpdGVtcywgbGF5ZXJzXG5cdFx0bWFwID0gTC5tYXAgJ3BldGEnLFxuXHRcdFx0Y2VudGVyOiBbMC41LCAxMDFdXG5cdFx0XHR6b29tOiA4XG5cdFx0XHR6b29tQ29udHJvbDogZmFsc2Vcblx0XHRcdGxheWVyczogW2Jhc2VzLi4uLCBsYXllcnMuLi5dXG5cdFx0TC5jb250cm9sLmxheWVycyhiYXNlTWFwcywgb3ZlckxheXMpLmFkZFRvIG1hcFxuXHRcdEwuY29udHJvbC5sb2NhdGUocG9zaXRpb246J3RvcHJpZ2h0JykuYWRkVG8gbWFwXG5cblx0VGVtcGxhdGUuYWRtaW4uZXZlbnRzXG5cdFx0J2NoYW5nZSA6ZmlsZSc6IChldmVudCkgLT5cblx0XHRcdGZpbGUgPSBldmVudC50YXJnZXQuZmlsZXNbMF1cblx0XHRcdHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKClcblx0XHRcdHJlYWRlci5vbmxvYWQgPSAtPlxuXHRcdFx0XHRzcGxpdCA9IF8uc3BsaXQgXy5rZWJhYkNhc2UoZmlsZS5uYW1lKSwgJy0nXG5cdFx0XHRcdGlmIHNwbGl0WzJdIGlzICdnZW9qc29uJ1xuXHRcdFx0XHRcdG5hbWUgPSBncnVwOiBzcGxpdFswXSwgaXRlbTogc3BsaXRbMV1cblx0XHRcdFx0XHRkb2MgPSBfLmFzc2lnbiBuYW1lLCBKU09OLnBhcnNlIHJlYWRlci5yZXN1bHRcblx0XHRcdFx0XHRNZXRlb3IuY2FsbCAnaW1wb3J0JywgJ2dlb2pzb25zJywgbmFtZSwgZG9jLCAoZXJyLCByZXMpIC0+XG5cdFx0XHRcdFx0XHRyZXMgYW5kIE1hdGVyaWFsaXplLnRvYXN0ICdVbmdnYWggQmVyaGFzaWwnLCAzMDAwLCAnb3JhbmdlJ1xuXHRcdFx0cmVhZGVyLnJlYWRBc1RleHQgZmlsZSwgJ1VURi04J1xuXG5cdFRlbXBsYXRlLmxvZ2luLmV2ZW50c1xuXHRcdCdzdWJtaXQgZm9ybSc6IChldmVudCkgLT5cblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KClcblx0XHRcdGNyZWRzID0gXy5tYXAgWyd1c2VybmFtZScsICdwYXNzd29yZCddLCAoaSkgLT5cblx0XHRcdFx0ZXZlbnQudGFyZ2V0LmNoaWxkcmVuW2ldLnZhbHVlXG5cdFx0XHRNZXRlb3IubG9naW5XaXRoUGFzc3dvcmQgY3JlZHMuLi5cbiIsImlmIE1ldGVvci5pc1NlcnZlclxuXG5cdE1ldGVvci5wdWJsaXNoICdjb2xsJywgKG5hbWUsIHNlbGVjdG9yLCBtb2RpZmllcikgLT5cblx0XHRjb2xsW25hbWVdLmZpbmQgc2VsZWN0b3IsIG1vZGlmaWVyXG5cblx0TWV0ZW9yLm1ldGhvZHNcblx0XHRpbXBvcnQ6IChuYW1lLCBzZWxlY3RvciwgbW9kaWZpZXIpIC0+XG5cdFx0XHRjb2xsW25hbWVdLnVwc2VydCBzZWxlY3RvciwgbW9kaWZpZXJcblxuXHRcdGxpc3Q6IC0+XG5cdFx0XHRtYXAgPSBfLm1hcCBjb2xsLmdlb2pzb25zLmZpbmQoKS5mZXRjaCgpLCAoaSkgLT5cblx0XHRcdFx0Xy5waWNrIGksIFsnZ3J1cCcsICdpdGVtJ11cblx0XHRcdGFyciA9IFtdXG5cdFx0XHRmb3Iga2V5LCB2YWwgb2YgXy5ncm91cEJ5KG1hcCwgJ2dydXAnKVxuXHRcdFx0XHRhcnIucHVzaFxuXHRcdFx0XHRcdGdydXA6IGtleVxuXHRcdFx0XHRcdGl0ZW1zOiBfLm1hcCB2YWwsIChqKSAtPiBqLml0ZW1cblx0XHRcdGFyclxuIl19
