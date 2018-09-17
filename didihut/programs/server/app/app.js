var require = meteorInstall({"folder":{"comps.ls.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// folder/comps.ls.js                                                                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// Generated by LiveScript 1.5.0
if (Meteor.isClient) {
  this.comp = {
    welcome: function(){
      return {
        view: function(){
          return m('div', m('link', {
            rel: 'stylesheet',
            href: 'https:/maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'
          }), m('section.hero.is-success.is-medium.is-bold', m('.hero-head', m('nav.navbar', m('.container', m('.navbar-brand', m('a.navbar-item', m('h1.title', 'SIPIL')), m('span.navbar-burger.burger', {
            'data-target': 'navbarMenu'
          }, [0, 1, 2].map(function(){
            return m('span');
          }))), m('.navbar-menu#navbarMenu', m('.navbar-end', m('.tabs.is-right', m('ul', ['beranda', 'tentang', 'perusahaan', 'dinas', 'admin'].map(function(i){
            return m('li', m('a', {
              href: "/" + i
            }, _.startCase(i)));
          })), m('span.navbar-item', m('a.button.is-white.is-outlined', {
            href: '/login'
          }, m('span.icon', m('i.fa.fa-github')), m('span', {
            title: 'Hello from the other side'
          }, 'Login'))))))))), m('.hero-body', m('.container.has-text-centered', m('h1.title', 'Sistem Pelaporan Izin Lingkungan'), m('h2.subtitle', 'Dinas Lingkungan Hidup & Kehutanan Prov. Riau')))), m('.box.cta', m('p.has-text-centered', m('span.tag.is-primary', 'New'), m('span', 'Versi 1.0, Sept 2018'))), m('section.container', m('.columns.features', [
            {
              icon: 'building',
              title: 'Bagi perusahaan',
              content: 'Dapat lebih mudah mengirim laporan kepada Dinas terkait'
            }, {
              icon: 'university',
              title: 'Bagi Pemerintah',
              content: 'Lebih mudah mengelola dokumen laporan perusahaan'
            }, {
              icon: 'file',
              title: 'Semua Online',
              content: 'Interaksi Perusahaan dan Pemerintah melalui Teknologi'
            }
          ].map(function(i){
            return m('.column.is-4', m('.card.is-shady', m('.card-image.has-text-centered', m("i.fa.fa-3x.fa-" + i.icon)), m('.card-content', m('.content', m('h4', i.title), m('p', i.content), m('p', m('a', {
              href: '#'
            }, 'Pelajari'))))));
          }))));
        }
      };
    }
  };
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"funcs.ls.js":function(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// folder/funcs.ls.js                                                                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// Generated by LiveScript 1.5.0
var slice$ = [].slice;
this._ = lodash;
this.coll = {};
this.schema = {};
this.afState = {};
this.ors = function(it){
  return it.find(function(it){
    return it;
  });
};
this.ands = function(it){
  if (_.every(it)) {
    return _.last(it);
  }
};
if (Meteor.isClient) {
  this.m = require('mithril');
  this.abnormalize = function(obj){
    var recurse;
    recurse = function(name, value){
      var ref$;
      if (value != null && value.getMonth) {
        return ref$ = {}, ref$[name + ""] = value, ref$;
      } else if (_.isObject(value)) {
        return _.assign.apply(_, [{}].concat(slice$.call(_.map(value, function(val, key){
          return recurse(name + "." + key, val);
        }))));
      } else {
        return ref$ = {}, ref$[name + ""] = value, ref$;
      }
    };
    return _.assign.apply(_, [{}].concat(slice$.call(_.map(recurse('obj', obj), function(val, key){
      var ref$;
      return ref$ = {}, ref$[key.substring(4) + ""] = val, ref$;
    }))));
  };
  this.normalize = function(obj){
    var recurse, key, val;
    recurse = function(value, name){
      var isNum, res, ref$;
      if (_.isObject(value)) {
        isNum = _.size(_.filter(value, function(val, key){
          return +key;
        }));
        res = (ref$ = {}, ref$[name + ""] = isNum > 0
          ? _.map(value, recurse)
          : value.getMonth
            ? value
            : _.merge.apply(_, [{}].concat(slice$.call(_.map(value, recurse)))), ref$);
        if (+name) {
          return res[name];
        } else {
          return res;
        }
      } else {
        if (+name) {
          return value;
        } else {
          return ref$ = {}, ref$[name + ""] = value, ref$;
        }
      }
    };
    obj = recurse(obj, 'obj').obj;
    for (key in obj) {
      val = obj[key];
      if (key.split('.').length > 1) {
        delete obj[key];
      }
    }
    return obj;
  };
  this.autoForm = function(opts){
    var state, scope, that, usedSchema, theSchema, omitFields, usedFields, arr, optionList, ref$, key$, stateTempGet, abnDoc, normed, attr, inputTypes;
    state = afState;
    scope = (that = opts.scope) ? new SimpleSchema(function(){
      var reducer;
      reducer = function(res, val, key){
        var ref$;
        if (new RegExp("^" + that).test(key)) {
          return _.merge(res, (ref$ = {}, ref$[key + ""] = val, ref$));
        } else {
          return res;
        }
      };
      return _.reduce(opts.schema._schema, reducer, {});
    }()) : void 8;
    usedSchema = scope || opts.schema;
    theSchema = function(name){
      return usedSchema._schema[name];
    };
    omitFields = opts.omitFields ? _.pull.apply(_, [_.values(usedSchema._firstLevelSchemaKeys)].concat(slice$.call(opts.omitFields))) : void 8;
    usedFields = ors(arr = [omitFields, opts.fields, usedSchema._firstLevelSchemaKeys]);
    optionList = function(name){
      var arr, ref$, ref1$;
      return ors(arr = [
        (ref$ = theSchema(name)) != null ? (ref1$ = ref$.allowedValues) != null ? ref1$.map(function(i){
          return {
            value: i,
            label: _.startCase(i)
          };
        }) : void 8 : void 8, function(){
          var ref$, ref1$, ref2$, ref3$, ref4$, ref5$;
          if (_.isFunction((ref$ = theSchema(name)) != null ? (ref1$ = ref$.autoform) != null ? ref1$.options : void 8 : void 8)) {
            return (ref2$ = theSchema(name)) != null ? (ref3$ = ref2$.autoform) != null ? ref3$.options() : void 8 : void 8;
          } else {
            return (ref4$ = theSchema(name)) != null ? (ref5$ = ref4$.autoform) != null ? ref5$.options : void 8 : void 8;
          }
        }(), ['true', 'false'].map(function(i){
          return {
            value: JSON.parse(i),
            label: _.startCase(i)
          };
        })
      ]);
    };
    state.arrLen == null && (state.arrLen = {});
    state.form == null && (state.form = {});
    state.temp == null && (state.temp = {});
    state.errors == null && (state.errors = {});
    (ref$ = state.form)[key$ = opts.id] == null && (ref$[key$] = {});
    (ref$ = state.temp)[key$ = opts.id] == null && (ref$[key$] = []);
    stateTempGet = function(field){
      if (state.temp[opts.id]) {
        return _.findLast(state.temp[opts.id], function(i){
          return i.name === field;
        });
      }
    };
    if (opts.doc) {
      abnDoc = abnormalize(opts.doc);
    }
    normed = function(it){
      return it.replace(/\d/g, '$');
    };
    attr = {
      form: {
        id: opts.id,
        onchange: function(arg$){
          var target, arr, ref$, ref1$;
          target = arg$.target;
          arr = ['radio', 'checkbox', 'select'];
          if (!in$((ref$ = theSchema(target.name)) != null ? (ref1$ = ref$.autoform) != null ? ref1$.type : void 8 : void 8, arr)) {
            state.form[opts.id][target.name] = target.value;
          }
          return opts.autosave && $("form#" + opts.id).submit();
        },
        onsubmit: function(e){
          var temp, formFields, formValues, obj, context, formTypes, that, ref$, ref1$;
          e.preventDefault();
          temp = state.temp[opts.id].map(function(i){
            var ref$;
            return ref$ = {}, ref$[i.name + ""] = i.value, ref$;
          });
          formFields = _.filter(e.target, function(i){
            var a, arr, b;
            a = function(){
              return i.value !== 'on' && i.name;
            };
            arr = ['radio', 'checkbox', 'select'];
            b = function(){
              var ref$, ref1$;
              return in$((ref$ = theSchema(i)) != null ? (ref1$ = ref$.autoform) != null ? ref1$.type : void 8 : void 8, arr);
            };
            return a() && !b();
          });
          formValues = formFields.map(function(arg$){
            var name, value;
            name = arg$.name, value = arg$.value;
            return name && _.reduceRight(name.split('.'), function(res, inc){
              var ref$;
              return ref$ = {}, ref$[inc + ""] = res, ref$;
            }, value ? (function(){
              switch (theSchema(normed(name)).type) {
              case String:
                return value;
              case Number:
                return +value;
              case Date:
                return new Date(value);
              }
            }()) : void 8);
          });
          obj = normalize(_.merge.apply(_, temp.concat(formValues)));
          context = usedSchema.newContext();
          context.validate(_.merge({}, obj, opts.doc || {}));
          state.errors[opts.id] = _.assign.apply(_, [{}].concat(slice$.call(context._invalidKeys.map(function(i){
            var ref$;
            return ref$ = {}, ref$[i.name + ""] = i.type, ref$;
          }))));
          formTypes = function(doc){
            return {
              insert: function(){
                return opts.collection.insert(doc || obj);
              },
              update: function(){
                return opts.collection.update({
                  _id: abnDoc._id
                }, {
                  $set: doc || obj
                });
              },
              method: function(){
                return Meteor.call(opts.meteormethod, doc || obj);
              },
              'update-pushArray': function(){
                var ref$;
                return opts.collection.update({
                  _id: abnDoc._id
                }, {
                  $push: (ref$ = {}, ref$[opts.scope + ""] = {
                    $each: _.values(obj[opts.scope])
                  }, ref$)
                });
              }
            };
          };
          if (that = (ref$ = opts.hooks) != null ? ref$.before : void 8) {
            that(obj, function(moded){
              return formTypes(moded)[opts.type]();
            });
          } else {
            formTypes()[opts.type]();
          }
          return (ref1$ = opts.hooks) != null ? typeof ref1$.after == 'function' ? ref1$.after(obj) : void 8 : void 8;
        }
      },
      radio: function(name, value){
        var ref$;
        return {
          type: 'radio',
          name: name,
          id: name + "" + value,
          checked: value === (((ref$ = stateTempGet(name)) != null ? ref$.value : void 8) || (abnDoc != null ? abnDoc[name] : void 8)),
          onchange: function(){
            return state.temp[opts.id].push({
              name: name,
              value: value
            });
          }
        };
      },
      select: function(name){
        var ref$;
        return {
          name: name,
          value: ((ref$ = stateTempGet(name)) != null ? ref$.value : void 8) || (abnDoc != null ? abnDoc[name] : void 8),
          onchange: function(arg$){
            var target;
            target = arg$.target;
            return state.temp[opts.id].push({
              name: name,
              value: target.value
            });
          }
        };
      },
      checkbox: function(name, value){
        return {
          type: 'checkbox',
          name: name,
          id: name + "" + value,
          data: value,
          onchange: function(){
            return state.temp[opts.id].push({
              name: name,
              value: _.map($("input:checked[name='" + name + "']"), function(it){
                var theVal;
                theVal = function(it){
                  var that;
                  if (that = +it) {
                    return that;
                  } else {
                    return it;
                  }
                };
                return theVal(it.attributes.data.nodeValue);
              })
            });
          },
          checked: stateTempGet(name)
            ? in$(value.toString(), _.map(stateTempGet(name).value, function(it){
              return it.toString();
            }))
            : abnDoc != null && abnDoc[name + ".0"] ? in$(value.toString(), _.compact(_.map(abnDoc, function(val, key){
              if (_.includes(key, name)) {
                return val.toString();
              }
            }))) : void 8
        };
      },
      arrLen: function(name, type){
        return {
          onclick: function(){
            var ref$, num;
            (ref$ = state.arrLen)[name] == null && (ref$[name] = 0);
            num = {
              inc: 1,
              dec: -1
            };
            return state.arrLen[name] += num[type];
          }
        };
      }
    };
    inputTypes = function(name, schema){
      var label, ref$, error;
      label = ((ref$ = theSchema(name)) != null ? ref$.label : void 8) || _.startCase(_.last(_.split(name, '.')));
      error = _.startCase(_.find(state.errors[opts.id], function(val, key){
        return key === name;
      }));
      return {
        hidden: function(){
          return m('input', {
            type: 'hidden',
            name: name,
            id: name,
            value: typeof schema.autoValue == 'function' ? schema.autoValue(name, _.map(state.form[opts.id], function(val, key){
              return {
                name: key,
                value: val
              };
            })) : void 8
          });
        },
        textarea: function(){
          return m('div', m('textarea.textarea', {
            name: name,
            id: name,
            'class': error ? 'is-danger' : void 8,
            placeholder: label,
            value: state.form[opts.id][name] || (abnDoc != null ? abnDoc[name] : void 8)
          }), error ? m('p.help.is-danger', error) : void 8);
        },
        range: function(){
          var ref$;
          return m('div', m('label.label', label), m('input', {
            type: 'range',
            id: name,
            name: name,
            'class': error ? 'is-danger' : void 8,
            value: state.form[opts.id][name] || (abnDoc != null ? (ref$ = abnDoc[name]) != null ? ref$.toString() : void 8 : void 8)
          }), error ? m('p.help.is-danger', error) : void 8);
        },
        checkbox: function(){
          return m('div', m('label.label', label), optionList(name).map(function(j){
            return m('label.checkbox', m('input', attr.checkbox(name, j.value)), m('span', _.startCase(j.label)));
          }), error ? m('p.help.is-danger', error) : void 8);
        },
        select: function(){
          return m('div', m('label.label', label), m('.select', m('select', attr.select(name), m('option', {
            value: ''
          }, _.startCase('Select One')), optionList(normed(name)).map(function(j){
            return m('option', {
              value: j.value
            }, _.startCase(j.label));
          }))), error ? m('p.help.is-danger', error) : void 8);
        },
        radio: function(){
          return m('.control', m('label.label', label), optionList(name).map(function(j){
            return m('label.radio', m('input', attr.radio(name, j.value)), m('span', _.startCase(j.label)));
          }));
        },
        other: function(){
          var defaultInputTypes, defaultType, maped, ref$, ref1$, that, ref2$, ref3$, filtered, found, docLen, this$ = this;
          defaultInputTypes = {
            text: String,
            number: Number,
            radio: Boolean,
            date: Date
          };
          defaultType = function(){
            return _.find(_.toPairs(defaultInputTypes), function(it){
              return it[1] === schema.type;
            });
          };
          maped = _.map(usedSchema._schema, function(val, key){
            return _.merge(val, {
              name: key
            });
          });
          if ((ref$ = schema.autoform) != null && ref$.options) {
            return inputTypes(name, defaultType()[0]).select();
          } else if (((ref1$ = defaultType()) != null ? ref1$[0] : void 8) === 'radio') {
            return inputTypes(name, defaultType()[0]).radio();
          } else if (that = (ref2$ = defaultType()) != null ? ref2$[0] : void 8) {
            return m('.field', m('label.label', label), m('.control', m('input.input', {
              'class': error ? 'is-danger' : void 8,
              type: ((ref3$ = schema.autoform) != null ? ref3$.type : void 8) || that,
              name: name,
              id: name,
              value: function(){
                var date, ref$;
                date = (abnDoc != null ? abnDoc[name] : void 8) && that === 'date' && moment(abnDoc[name]).format('YYYY-MM-DD');
                return ((ref$ = state.form[opts.id]) != null ? ref$[name] : void 8) || date || (abnDoc != null ? abnDoc[name] : void 8);
              }()
            })), error ? m('p.help.is-danger', error) : void 8);
          } else if (schema.type === Object) {
            filtered = _.filter(maped, function(j){
              var getLen, conds;
              getLen = function(str){
                return _.size(_.split(str, '.'));
              };
              return _.every(conds = [_.includes(j.name, normed(name) + "."), getLen(name) + 1 === getLen(j.name)]);
            });
            return m('.box', m('h5.subtitle', label), filtered.map(function(j){
              var type, ref$, last;
              type = (j != null ? (ref$ = j.autoform) != null ? ref$.type : void 8 : void 8) || 'other';
              last = _.last(_.split(j.name, '.'));
              return inputTypes(name + "." + last, j)[type]();
            }));
          } else if (schema.type === Array) {
            found = maped.find(function(it){
              return it.name === normed(name) + ".$";
            });
            if (opts.type !== 'update-pushArray') {
              docLen = function(it){
                return it.length - 1;
              }(_.filter(abnDoc, function(val, key){
                return _.includes(key, name + ".");
              }));
            }
            return m('.box', m('h5.subtitle', label), m('a.button.is-success', attr.arrLen(name, 'inc'), '+ Add'), m('a.button.is-warning', attr.arrLen(name, 'dec'), '- Rem'), (function(){
              var i$, to$, results$ = [];
              for (i$ = 1, to$ = state.arrLen[name] || docLen || 0; i$ <= to$; ++i$) {
                results$.push(i$);
              }
              return results$;
            }()).map(function(num){
              var type, ref$;
              type = (typeof j != 'undefined' && j !== null ? (ref$ = j.autoform) != null ? ref$.type : void 8 : void 8) || 'other';
              return inputTypes(name + "." + num, found)[type]();
            }), error ? m('p.help.is-danger', error) : void 8);
          }
        }
      };
    };
    return {
      view: function(){
        var ref$, ref1$;
        return m('form', attr.form, m('.row', usedFields.map(function(i){
          var type, ref$, ref1$;
          type = ((ref$ = theSchema(i)) != null ? (ref1$ = ref$.autoform) != null ? ref1$.type : void 8 : void 8) || 'other';
          return inputTypes(i, theSchema(i))[type]();
        })), m('.row', m('.col', m('input.button.is-primary', {
          type: 'submit',
          value: opts != null ? opts.buttonContent : void 8,
          'class': opts != null ? opts.buttonClasses : void 8
        })), m('.col', m('input.button.is-warning', {
          type: 'reset',
          value: opts != null ? (ref$ = opts.reset) != null ? ref$.content : void 8 : void 8,
          'class': opts != null ? (ref1$ = opts.reset) != null ? ref1$.classes : void 8 : void 8
        }))));
      }
    };
  };
  this.autoTable = function(opts){
    var attr;
    attr = {
      rowEvent: function(doc){
        return {
          onclick: function(){
            return opts.rowEvent.onclick(doc);
          },
          ondblclick: function(){
            return opts.rowEvent.ondblclick(doc);
          }
        };
      }
    };
    return {
      view: function(){
        return m('table.table', m('thead', m('tr', opts.fields.map(function(i){
          return m('th', _.startCase(i));
        }))), m('tbody', opts.collection.find().fetch().map(function(i){
          return m('tr', attr.rowEvent(i), opts.fields.map(function(j){
            return m('td', i[j]);
          }));
        })));
      }
    };
  };
}
function in$(x, xs){
  var i = -1, l = xs.length >>> 0;
  while (++i < l) if (x === xs[i]) return true;
  return false;
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"both.ls.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// both.ls.js                                                                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// Generated by LiveScript 1.5.0
coll.company = new Meteor.Collection('company');
coll.company.allow(_.merge.apply(_, ['insert', 'update', 'remove'].map(function(it){
  var ref$;
  return ref$ = {}, ref$[it + ""] = function(){
    return true;
  }, ref$;
})));
schema.profil = {
  nama_perusahaan: {
    type: String
  },
  jenis_badan_hukum: {
    type: String
  },
  alamat_perusahaan: {
    type: String
  },
  nomor_telfon: {
    type: String
  },
  status_permodalan: {
    type: String
  },
  bidang_usaha: {
    type: String
  },
  izin_persetujuan: {
    type: String
  },
  kuasa_direksi: {
    type: String
  },
  penanggungjawab: {
    type: String
  },
  izin_lainnya: {
    type: [String],
    optional: true
  }
};
schema.awal = {
  uklrkl: {
    type: Object,
    optional: true
  },
  'uklrkl.jenis_dampak': {
    type: String,
    optional: true
  },
  'uklrkl.sumber_dampak': {
    type: [String],
    optional: true
  },
  'uklrkl.indikator_keberhasilan': {
    type: [String],
    optional: true
  },
  'uklrkl.rencana_pengelolaan': {
    type: [String],
    optional: true
  },
  'uklrkl.lokasi': {
    type: [String],
    optional: true
  },
  'uklrkl.periode': {
    type: [String],
    optional: true
  },
  uplrpl: {
    type: Object,
    optional: true
  },
  'uplrpl.jenis_dampak': {
    type: String,
    optional: true
  },
  'uplrpl.sumber_dampak': {
    type: [String],
    optional: true
  },
  'uplrpl.indikator_keberhasilan': {
    type: [String],
    optional: true
  },
  'uplrpl.rencana_pemantauan': {
    type: [String],
    optional: true
  },
  'uplrpl.lokasi': {
    type: [String],
    optional: true
  },
  'uplrpl.frekwensi': {
    type: [String],
    optional: true
  }
};
schema.matrix = {
  indikator_keberhasilan: {
    type: String
  },
  parameter: {
    type: String
  },
  pengelolaan_dilakukan: {
    type: String
  },
  pemantauan_dilakukan: {
    type: String
  }
};
schema.semester = {
  reports: {
    type: Array
  },
  'reports.$': {
    type: Object
  },
  'reports.$.tanggal_lapor': {
    type: Date,
    autoform: {
      type: 'hidden'
    },
    autoValue: function(){
      return new Date();
    }
  },
  'reports.$.semester_ke': {
    type: Number,
    autoform: {
      type: 'select',
      options: [1, 2].map(function(i){
        return {
          value: i,
          label: "Semester " + i
        };
      })
    }
  },
  'reports.$.sumber_dampak': {
    type: String
  },
  'reports.$.jenis_dampak': {
    type: String
  },
  'reports.$.matrix': {
    type: [new SimpleSchema(schema.matrix)]
  },
  'reports.$.link_file': {
    type: String
  },
  'reports.$.penilaian_dinas': {
    type: String
  }
};
schema.company = {
  profil: {
    type: new SimpleSchema(schema.profil)
  },
  dok_lingkungan: {
    type: [new SimpleSchema(schema.awal)],
    optional: true
  },
  reports: {
    type: [new SimpleSchema(schema.semester)],
    optional: true
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"client.ls.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// client.ls.js                                                                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// Generated by LiveScript 1.5.0
var slice$ = [].slice;
if (Meteor.isClient) {
  this.state = {};
  comp.layout = function(comp){
    return {
      view: function(){
        var that;
        return m('div', m('nav.navbar.is-success', m('.navbar-menu', m('.navbar-start', m('.navbar-brand', m('.navbar-item', m('h1.title', 'SIPIL')))), m('.navbar-end', m('.navbar-item.has-dropdown', {
          'class': state.userMenu ? 'is-active' : void 8
        }, m('a.navbar-link', {
          onclick: function(){
            return state.userMenu = !state.userMenu;
          }
        }, m('span', 'User')), m('.navbar-dropdown.is-right', function(){
          var arr;
          arr = [
            [
              'Login', function(){
                return m.route.set('/login');
              }
            ], [
              'Logout', function(){
                return Meteor.logout();
              }
            ]
          ];
          return arr.map(function(i){
            return m('a.navbar-item', {
              onclick: i[1]
            }, m('span', i[0]));
          });
        }()))))), m('.columns', Meteor.userId() && m('.column.is-2', m('aside.menu.box', m('p.menu-label', 'Admin Menu'), m('ul.menu-list', ['perusahaan', 'dinas', 'admin'].map(function(i){
          return m('li', m('a', {
            href: "/" + i
          }, m('span', _.startCase(i))));
        })))), m('.column', m('br'), (that = comp) ? m('.container', m(that)) : void 8)));
      }
    };
  };
  comp.perusahaan = function(){
    return {
      view: function(){
        var that, ref$;
        return m('.content', {
          oncreate: function(){
            return Meteor.subscribe('coll', 'company', {
              onReady: function(){
                return m.redraw();
              }
            });
          }
        }, !m.route.param('idperusahaan')
          ? m('div', m('h5', 'Daftar Perusahaan'), m('table.table', m('thead', m('tr', m('th', 'Nama Perusahaan'))), m('tbody', coll.company.find().fetch().map(function(i){
            return m('tr', {
              ondblclick: function(){
                return m.route.set("/perusahaan/" + i._id);
              }
            }, m('td', _.startCase(i.profil.nama_perusahaan)));
          }))))
          : m('div', m('h5', 'Profil Perusahaan'), (that = (ref$ = coll.company.findOne({
            _id: m.route.param('idperusahaan')
          })) != null ? ref$.profil : void 8) ? m('table.table', [
            [
              {
                head: 'Nama Perusahaan',
                cell: that.nama_perusahaan
              }, {
                head: 'Jenis Badan Hukum',
                cell: that.jenis_badan_hukum
              }
            ], [
              {
                head: 'Alamat Perusahaan',
                cell: that.alamat_perusahaan
              }, {
                head: 'Nomor Telfon',
                cell: that.nomor_telfon
              }
            ], [
              {
                head: 'Status Permodalan',
                cell: that.status_permodalan
              }, {
                head: 'Bidang Usaha',
                cell: that.bidang_usaha
              }
            ], [
              {
                head: 'Izin Persetujuan',
                cell: that.izin_persetujuan
              }, {
                head: 'Penanggungjawab',
                cell: that.penanggungjawab
              }
            ], [{
              head: 'Kuasa Direksi',
              cell: that.kuasa_direksi
            }]
          ].map(function(i){
            return m('tr', i.map(function(j){
              return [m('th', j.head), m('td', j.cell)];
            }));
          })) : void 8, m('.button.is-success', {
            onclick: function(){
              return state.showForm = !state.showForm;
            }
          }, m('span', '+Tambah Laporan')), state.showForm && m(autoForm({
            collection: coll.company,
            schema: new SimpleSchema(schema.semester),
            type: 'update-pushArray',
            doc: coll.company.findOne({
              _id: m.route.param('idperusahaan')
            }),
            scope: 'reports',
            id: 'formSemester',
            buttonContent: 'Tambahkan'
          })), [0, 1].map(function(){
            return m('br');
          }), (that = coll.company.findOne({
            _id: m.route.param('idperusahaan')
          })) ? that.reports.map(function(i){
            return m('div', m('h5', "Semester " + i.semester_ke), m('table.table', [
              {
                head: 'Tanggal Lapor',
                cell: i.tanggal_lapor.toString()
              }, {
                head: 'Jenis Dampak',
                cell: i.jenis_dampak
              }, {
                head: 'Sumber Dampak',
                cell: i.sumber_dampak
              }, {
                head: 'File Laporan',
                cell: i.link_file
              }
            ].map(function(j){
              return m('tr', [m('th', j.head), m('td', j.cell)]);
            })), m('.box', i.matrix.map(function(j, num){
              return m('div', m('h6', "Matrix " + (num + 1)), m('table.table', [
                {
                  head: 'Indikator Keberhasilan',
                  cell: j.indikator_keberhasilan
                }, {
                  head: 'Parameter',
                  cell: j.parameter
                }, {
                  head: 'Pemantauan Dilakukan',
                  cell: j.pemantauan_dilakukan
                }, {
                  head: 'Pengelolaan Dilakukan',
                  cell: j.pengelolaan_dilakukan
                }
              ].map(function(k){
                return m('tr', [m('th', k.head), m('td', k.cell)]);
              })));
            })));
          }) : void 8));
      }
    };
  };
  comp.dinas = function(){
    return {
      view: function(){
        return m('.content', m('h5', 'Dinas'));
      }
    };
  };
  comp.admin = function(){
    return {
      view: function(){
        return m('.content', m('.button.is-success', {
          onclick: function(){
            return state.showForm = !state.showForm;
          }
        }, m('span', '+Tambah Perusahaan')), state.showForm && m(autoForm({
          collection: coll.company,
          schema: new SimpleSchema(schema.company),
          type: 'insert',
          id: 'formCompany'
        })));
      }
    };
  };
  comp.login = function(){
    return {
      view: function(){
        var that;
        return m('form', {
          onsubmit: function(e){
            var vals;
            e.preventDefault();
            vals = _.initial(_.map(e.target, function(it){
              return it.value;
            }));
            return Meteor.loginWithPassword.apply(Meteor, slice$.call(vals).concat([function(err){
              if (err) {
                state.error = 'Salah Password atau Username';
                return m.redraw();
              } else {
                return m.route.set('/perusahaan');
              }
            }]));
          }
        }, m('input.input', {
          type: 'text',
          placeholder: 'Username'
        }), m('input.input', {
          type: 'password',
          placeholder: 'Password'
        }), m('input.button.is-success', {
          type: 'submit',
          value: 'Login'
        }), (that = state.error) ? m('article.message', m('.message-header', m('p', that), m('button.delete', {
          'aria-label': 'delete'
        }))) : void 8);
      }
    };
  };
  m.route.prefix('');
  m.route(document.body, '/welcome', _.merge.apply(_, [
    {
      '/welcome': comp.welcome()
    }, {
      '/login': comp.layout(comp.login())
    }
  ].concat(
    slice$.call(['perusahaan', 'dinas', 'admin'].map(function(i){
      var ref$;
      return ref$ = {}, ref$["/" + i] = comp.layout(comp[i]()), ref$;
    })), [{
      '/perusahaan/:idperusahaan': comp.layout(comp.perusahaan())
    }]
  )));
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"server.ls.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// server.ls.js                                                                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// Generated by LiveScript 1.5.0
if (Meteor.isServer) {
  Meteor.publish('coll', function(name, sel, mod){
    sel == null && (sel = {});
    mod == null && (mod = {});
    return coll[name].find(sel, mod);
  });
  Meteor.methods({
    consolelog: function(doc){
      return console.log(doc);
    }
  });
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},{
  "extensions": [
    ".js",
    ".json"
  ]
});
require("/folder/comps.ls.js");
require("/folder/funcs.ls.js");
require("/both.ls.js");
require("/client.ls.js");
require("/server.ls.js");