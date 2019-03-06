var require = meteorInstall({"folder":{"funcs.ls.js":function(require){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// folder/funcs.ls.js                                                                                                //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
this.bool = function(it){
  return !!it;
};
this.reduce = function(){
  var params, res$, i$, to$;
  res$ = [];
  for (i$ = 0, to$ = arguments.length; i$ < to$; ++i$) {
    res$.push(arguments[i$]);
  }
  params = res$;
  if (params.length === 2) {
    return Object.values(params[0]).reduce(params[1]);
  } else if (params.length === 3) {
    return Object.values(params[1]).reduce(params[2], params[0]);
  } else {
    return 'your arguments are invalid';
  }
};
this.same = function(it){
  return bool(reduce(it, function(res, inc){
    if (res === inc) {
      return inc;
    }
  }));
};
this.reverse = function(it){
  return reduce([], it, function(res, inc){
    return [inc].concat(slice$.call(res));
  });
};
if (Meteor.isClient) {
  this.m = require('mithril');
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
        if (+name + 1) {
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
    var state, scope, that, usedSchema, theSchema, omitFields, usedFields, arr, optionList, ref$, key$, stateTempGet, clonedDoc, usedDoc, normed, attr, columnize, inputTypes;
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
      var arr, ref$, ref1$, ref2$, ref3$, ref4$, ref5$, ref6$, ref7$;
      return ors(arr = [
        (ref$ = theSchema(normed(name))) != null ? (ref1$ = ref$.allowedValues) != null ? ref1$.map(function(i){
          return {
            value: i,
            label: _.startCase(i)
          };
        }) : void 8 : void 8, _.isFunction((ref2$ = theSchema(normed(name))) != null ? (ref3$ = ref2$.autoform) != null ? ref3$.options : void 8 : void 8)
          ? (ref4$ = theSchema(normed(name))) != null ? (ref5$ = ref4$.autoform) != null ? ref5$.options(name) : void 8 : void 8
          : (ref6$ = theSchema(normed(name))) != null ? (ref7$ = ref6$.autoform) != null ? ref7$.options : void 8 : void 8, ['true', 'false'].map(function(i){
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
        return _.findLast(state.temp[opts.id], function(it){
          return it.name === field;
        });
      }
    };
    if (that = opts.scope) {
      clonedDoc = _.assign({}, opts.doc, (ref$ = {}, ref$[that + ""] = [], ref$));
    }
    usedDoc = clonedDoc || opts.doc;
    normed = function(it){
      return it.replace(/\d/g, '$');
    };
    attr = {
      form: {
        id: opts.id,
        onchange: function(arg$){
          var target, that, arr, ref$, ref1$;
          target = arg$.target;
          if (that = opts.onchange) {
            that(target);
          }
          arr = ['radio', 'checkbox', 'select'];
          if (!in$((ref$ = theSchema(target.name)) != null ? (ref1$ = ref$.autoform) != null ? ref1$.type : void 8 : void 8, arr)) {
            state.form[opts.id][target.name] = target.value;
          }
          return opts.autosave && $("form#" + opts.id).submit();
        },
        onsubmit: function(e){
          var temp, formValues, obj, context, after, formTypes, that, ref$;
          e.preventDefault();
          temp = state.temp[opts.id].map(function(it){
            var ref$;
            return ref$ = {}, ref$[it.name + ""] = it.value, ref$;
          });
          formValues = _.filter(e.target, function(i){
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
          }).map(function(arg$){
            var name, value;
            name = arg$.name, value = arg$.value;
            if (name && value) {
              return _.reduceRight(name.split('.'), function(res, inc){
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
            }
          });
          obj = normalize(_.merge.apply(_, temp.concat(formValues)));
          context = usedSchema.newContext();
          context.validate(_.merge({}, obj, !opts.scope ? opts.doc || {} : void 8));
          state.errors[opts.id] = _.merge.apply(_, [{}].concat(slice$.call(function(){
            var a;
            a = context._invalidKeys.filter(function(i){
              var arr, ref$;
              return ands(arr = [i.type !== 'keyNotInSchema', !((ref$ = theSchema(normed(i.name))) != null && ref$.autoValue)]);
            });
            return a.map(function(it){
              var ref$;
              return ref$ = {}, ref$[it.name + ""] = it.type, ref$;
            });
          }())));
          after = function(err, res){
            var ref$;
            if (res) {
              return (ref$ = opts.hooks) != null ? ref$.after(res) : void 8;
            }
          };
          formTypes = function(doc){
            return {
              insert: function(){
                return opts.collection.insert(doc || obj, after);
              },
              update: function(){
                return opts.collection.update({
                  _id: usedDoc._id
                }, {
                  $set: doc || obj
                }, after);
              },
              method: function(){
                return Meteor.call(opts.meteormethod, doc || obj, after);
              },
              'update-pushArray': function(){
                var ref$;
                return opts.collection.update({
                  _id: usedDoc._id
                }, {
                  $push: (ref$ = {}, ref$[opts.scope + ""] = {
                    $each: _.values(obj[opts.scope])
                  }, ref$)
                }, function(err, res){
                  var ref$;
                  if (res) {
                    return (ref$ = opts.hooks) != null ? ref$.after(doc) : void 8;
                  }
                });
              }
            };
          };
          if (_.values(state.errors[opts.id]).length === 0) {
            if (that = (ref$ = opts.hooks) != null ? ref$.before : void 8) {
              return that(obj, function(moded){
                return formTypes(moded)[opts.type]();
              });
            } else {
              return formTypes()[opts.type]();
            }
          }
        }
      },
      radio: function(name, value){
        var ref$;
        return {
          type: 'radio',
          name: name,
          id: name + "" + value,
          checked: value === (((ref$ = stateTempGet(name)) != null ? ref$.value : void 8) || (usedDoc != null ? usedDoc[name] : void 8)),
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
          value: ((ref$ = stateTempGet(name)) != null ? ref$.value : void 8) || (usedDoc != null ? usedDoc[name] : void 8),
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
        var that;
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
          checked: (that = stateTempGet(name))
            ? in$(value.toString(), _.map(that.value, function(it){
              return it.toString();
            }))
            : usedDoc != null && usedDoc[name + ".0"] ? in$(value.toString(), _.compact(_.map(usedDoc, function(val, key){
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
    columnize = function(it){
      var chunk, recDom, structure;
      chunk = function(it){
        return reduce([], it, function(res, inc){
          var end, ref$, i$, first, last;
          end = function(){
            return slice$.call(res).concat([[inc]]);
          };
          if ((ref$ = inc.type) === Object || ref$ === Array) {
            return end();
          } else {
            first = 0 < (i$ = res.length - 1) ? slice$.call(res, 0, i$) : (i$ = 0, []), last = res[i$];
            if (!((last != null ? last.length : void 8) < opts.columns)) {
              return end();
            } else {
              if ((ref$ = last[0].type) === Object || ref$ === Array) {
                return end();
              } else {
                return slice$.call(first).concat([slice$.call(last).concat([inc])]);
              }
            }
          }
        });
      };
      recDom = function(i){
        if (_.isArray(i)) {
          return i.map(function(it){
            return recDom(it);
          });
        } else {
          return function(){
            var type, ref$, split, title;
            type = (i != null ? (ref$ = i.autoform) != null ? ref$.type : void 8 : void 8) || 'other';
            split = _.split(i.name, '.');
            title = function(){
              if (split.length === 1) {
                return i.head;
              } else {
                return i.head + "." + _.last(split);
              }
            };
            return inputTypes(title(), i)[type]();
          }();
        }
      };
      structure = function(it){
        return it.map(function(i){
          return m('.columns', i.map(function(j){
            var ref$;
            return m('div', {
              'class': ((ref$ = j.attrs) != null ? ref$.type : void 8) !== 'hidden' ? 'column' : void 8
            }, j);
          }));
        });
      };
      return structure(recDom(chunk(it)));
    };
    inputTypes = function(name, schema){
      var title, arr, ref$, label, error;
      title = ors(arr = [(ref$ = theSchema(normed(name))) != null ? ref$.label : void 8, _.startCase(_.last(_.split(normed(name), '.')))]);
      label = m('label.label', m('span', title), !theSchema(normed(name)).optional ? m('span.has-text-danger', '*') : void 8);
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
                value: val,
                name: key
              };
            })) : void 8
          });
        },
        textarea: function(){
          return m('div', label, m('textarea.textarea', {
            name: name,
            id: name,
            'class': error ? 'is-danger' : void 8,
            value: state.form[opts.id][name] || (usedDoc != null ? usedDoc[name] : void 8)
          }), error ? m('p.help.is-danger', error) : void 8);
        },
        range: function(){
          var ref$;
          return m('div', label, m('input', {
            type: 'range',
            id: name,
            name: name,
            'class': error ? 'is-danger' : void 8,
            value: state.form[opts.id][name] || (usedDoc != null ? (ref$ = usedDoc[name]) != null ? ref$.toString() : void 8 : void 8)
          }), error ? m('p.help.is-danger', error) : void 8);
        },
        checkbox: function(){
          return m('div', label, optionList(name).map(function(j){
            return m('label.checkbox', m('input', attr.checkbox(name, j.value)), m('span', _.startCase(j.label)));
          }), error ? m('p.help.is-danger', error) : void 8);
        },
        select: function(){
          var arr, ref$;
          return m('div', label, m('.select', m('select', attr.select(name), m('option', {
            value: ''
          }, ors(arr = [(ref$ = theSchema(normed(name)).autoform) != null ? ref$.firstLabel : void 8, 'Select One'])), optionList(name).map(function(j){
            return m('option', {
              value: j.value
            }, j.label);
          }))), error ? m('p.help.is-danger', error) : void 8);
        },
        radio: function(){
          return m('.control', label, optionList(normed(name)).map(function(j){
            return m('label.radio', m('input', attr.radio(name, j.value)), m('span', _.startCase(j.label)));
          }), error ? m('p.help.is-danger', error) : void 8);
        },
        other: function(){
          var defaultInputTypes, defaultType, maped, ref$, ref1$, that, ref2$, ref3$, sorted, filtered, found, docLen, this$ = this;
          defaultInputTypes = {
            text: String,
            number: Number,
            radio: Boolean,
            date: Date
          };
          defaultType = function(){
            return _.toPairs(defaultInputTypes).find(function(it){
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
            return m('.field', label, m('.control', m('input.input', {
              'class': error ? 'is-danger' : void 8,
              type: ((ref3$ = schema.autoform) != null ? ref3$.type : void 8) || that,
              name: name,
              id: name,
              step: 'any',
              value: function(){
                var date, ref$;
                date = (usedDoc != null ? usedDoc[name] : void 8) && that === 'date' && moment(usedDoc[name]).format('YYYY-MM-DD');
                return ((ref$ = state.form[opts.id]) != null ? ref$[name] : void 8) || date || (usedDoc != null ? usedDoc[name] : void 8);
              }()
            })), error ? m('p.help.is-danger', error) : void 8);
          } else if (schema.type === Object) {
            sorted = function(){
              return reduce([], reverse(maped), function(res, inc){
                var ref$;
                if (((ref$ = inc.autoform) != null ? ref$.type : void 8) === 'hidden') {
                  return slice$.call(res).concat([inc]);
                } else {
                  return [inc].concat(slice$.call(res));
                }
              });
            };
            filtered = sorted().filter(function(j){
              var getLen, conds;
              getLen = function(str){
                return _.size(_.split(str, '.'));
              };
              return _.every(conds = [_.includes(j.name, normed(name) + "."), getLen(name) + 1 === getLen(j.name)]);
            });
            return m('.box', !+label ? m('h5', label) : void 8, m('.box', columnize(filtered.map(function(it){
              return _.merge(it, {
                head: name
              });
            }))));
          } else if (schema.type === Array) {
            found = maped.find(function(it){
              return it.name === normed(name) + ".$";
            });
            docLen = opts.scope === name
              ? 1
              : function(it){
                return it.length - 1;
              }(_.filter(usedDoc, function(val, key){
                return _.includes(key, name + ".");
              }));
            return m('.box', opts.scope !== name ? m('div', m('h5.subtitle', label), m('a.button.is-success', attr.arrLen(name, 'inc'), '+ Add'), m('a.button.is-warning', attr.arrLen(name, 'dec'), '- Rem')) : void 8, (function(){
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
        return m('.box', m('form', attr.form, m('.row', columnize(usedFields.map(function(i){
          return _.merge(theSchema(i), {
            name: i,
            head: i
          });
        }))), m('.row', m('.columns', m('.column.is-1', m('input.button.is-primary', {
          type: 'submit',
          value: opts != null ? opts.buttonContent : void 8,
          'class': opts != null ? opts.buttonClasses : void 8
        })), m('.column.is-1', m('input.button.is-warning', {
          type: 'reset',
          value: opts != null ? (ref$ = opts.reset) != null ? ref$.content : void 8 : void 8,
          'class': opts != null ? (ref1$ = opts.reset) != null ? ref1$.classes : void 8 : void 8
        }))))));
      }
    };
  };
}
function in$(x, xs){
  var i = -1, l = xs.length >>> 0;
  while (++i < l) if (x === xs[i]) return true;
  return false;
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"parent.ls.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// folder/parent.ls.js                                                                                               //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
// Generated by LiveScript 1.5.0
if (Meteor.isClient) {
  this.coll = {};
  this.state = {};
  this.tds = function(it){
    return it.map(function(i){
      return m('td', i);
    });
  };
  this.hari = function(it){
    return moment(it).format('D MMM YYYY');
  };
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"both.ls.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// both.ls.js                                                                                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
// Generated by LiveScript 1.5.0
['kontrak', 'izin', 'limbah'].map(function(i){
  coll[i] = new Meteor.Collection(i);
  return coll[i].allow({
    insert: function(){
      return true;
    }
  });
});
schema.kontrak = new SimpleSchema({
  nama: {
    type: String,
    label: 'Nama Perusahaan'
  },
  pelanjut: {
    type: String,
    label: 'Perusahaan Pengelola Lanjut'
  },
  jenis: {
    type: String,
    label: 'Jenis Pengelolaan'
  },
  no_kontrak: {
    type: String,
    label: 'Nomor Kontrak'
  },
  mulai: {
    type: Date,
    label: 'Tanggal Kontrak'
  },
  akhir: {
    type: Date,
    label: 'Tanggal Habis Berlaku'
  },
  lampiran: {
    type: String
  },
  status: {
    type: Number,
    optional: true,
    autoform: {
      type: 'hidden'
    }
  }
});
schema.izin = new SimpleSchema({
  nama: {
    type: String,
    label: 'Nama Perusahaan'
  },
  no_kep: {
    type: String,
    label: 'No. Surat Keputusan'
  },
  terbit: {
    type: Date,
    label: 'Tanggal Terbit'
  },
  habis: {
    type: Date,
    label: 'Tanggal Habis Berlaku'
  },
  jenis: {
    type: Number,
    label: 'Jenis Perizinan'
  },
  lampiran: {
    type: String
  },
  status: {
    type: Number,
    optional: true,
    autoform: {
      type: 'hidden'
    }
  }
});
schema.limbah = new SimpleSchema({
  nama: {
    type: String,
    label: 'Nama Perusahaan'
  },
  alamat: {
    type: String,
    label: 'Alamat Perusahaan'
  },
  no_kep: {
    type: String,
    label: 'No. Surat Keputusan'
  },
  sektor: {
    type: String,
    label: 'Sektor Industri'
  },
  kode: {
    type: String,
    label: 'Kode Limbah'
  },
  nama_limbah: {
    type: String
  },
  sumber: {
    type: Number,
    label: 'Sumber Limbah',
    decimal: true
  },
  tanggal: {
    type: Date,
    label: 'Tanggal Dihasilkan'
  },
  masa: {
    type: Number,
    label: 'Masa Simpan',
    decimal: true
  },
  jumlah: {
    type: Object,
    label: 'Jumlah Ton'
  },
  'jumlah.masuk': {
    type: Number,
    label: 'Dihasilkan/Masuk',
    decimal: true
  },
  'jumlah.lanjut': {
    type: Number,
    label: 'Telah Dikelola Lanjut',
    decimal: true
  },
  'jumlah.disimpan': {
    type: Number,
    label: 'Disimpan TPS',
    decimal: true
  }
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"client.ls.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// client.ls.js                                                                                                      //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
// Generated by LiveScript 1.5.0
var attr, comp, slice$ = [].slice;
if (Meteor.isClient) {
  attr = {
    kontrak: {
      heads: ['nama_perusahaan', 'perusahaan_pengelola_lanjut', 'jenis_pengelolaan', 'no_kontrak', 'tanggal_kontrak', 'tanggal_habis_berlaku', 'lampiran', 'status']
    },
    limbah: {
      heads: ['nama', 'alamat', 'no_kep', 'sektor', 'kode', 'nama_limbah', 'sumber', 'tanggal', 'masa']
    },
    izin: {
      heads: ['nama', 'no_kep', 'terbit', 'habis', 'jenis', 'lampiran', 'status']
    },
    createForm: function(name, type){
      return m(autoForm({
        schema: schema[name],
        collection: coll[name],
        type: type,
        id: "form" + name,
        columns: 3,
        hooks: {
          after: function(){
            var ref$;
            return (ref$ = state.showForm, delete state.showForm, ref$) && m.redraw();
          }
        }
      }));
    },
    addButton: m('.button.is-success', {
      onclick: function(){
        return state.showForm = !state.showForm;
      }
    }, m('span', '+Tambah')),
    security: function(){
      if (Meteor.userId()) {
        return true;
      } else {
        return m.route.set('login') && m.redraw();
      }
    },
    brs: function(height){
      return (function(){
        var i$, to$, results$ = [];
        for (i$ = 0, to$ = height; i$ < to$; ++i$) {
          results$.push(i$);
        }
        return results$;
      }()).map(function(){
        return m('br');
      });
    }
  };
  comp = {
    kontrak: {
      view: function(){
        return attr.security() && m('.container', m('h5.title', 'Kontrak Perusahaan'), attr.addButton, state.showForm && attr.createForm('kontrak', 'insert'), attr.brs(3), m('h5.title', 'Tabel Kontrak'), m('table.table', {
          oncreate: function(){
            return Meteor.subscribe('coll', 'kontrak', {
              onReady: function(){
                return m.redraw();
              }
            });
          }
        }, m('thead', m('tr', attr.kontrak.heads.map(function(i){
          return m('th', _.startCase(i));
        }))), m('tbody', coll.kontrak.find().fetch().map(function(i){
          return m('tr', tds([i.nama, i.pelanjut, i.jenis, i.no_kontrak, hari(i.mulai), hari(i.akhir), i.lampiran, i.status || '-']));
        }))));
      }
    },
    izin: {
      view: function(){
        return attr.security() && m('.container', m('h5.title', 'Perizinan'), attr.addButton, state.showForm && attr.createForm('izin', 'insert'), attr.brs(3), m('h5.title', 'Tabel Perizinan'), m('table.table', {
          oncreate: function(){
            return Meteor.subscribe('coll', 'izin', {
              onReady: function(){
                return m.redraw();
              }
            });
          }
        }, m('thead', m('tr', attr.izin.heads.map(function(i){
          return m('th', _.startCase(i));
        }))), m('tbody', coll.izin.find().fetch().map(function(i){
          return m('tr', tds([i.nama, i.no_kep, hari(i.terbit), hari(i.habis), i.jenis, i.lampiran, i.status || '-']));
        }))));
      }
    },
    limbah: {
      view: function(){
        return attr.security() && m('.container', m('h5.title', 'Jenis Limbah'), attr.addButton, state.showForm && attr.createForm('limbah', 'insert'), attr.brs(3), m('h5.title', 'Tabel Jenis Limbah'), m('table.table', {
          oncreate: function(){
            return Meteor.subscribe('coll', 'limbah', {
              onReady: function(){
                return m.redraw();
              }
            });
          }
        }, m('thead', m('tr', attr.limbah.heads.map(function(i){
          return m('th', _.startCase(i));
        }))), m('tbody', coll.limbah.find().fetch().map(function(i){
          return m('tr', tds([i.nama, i.alamat, i.no_kep, i.sektor, i.kode, i.nama_limbah, i.sumber, hari(i.tanggal), i.masa]));
        }))));
      }
    },
    login: function(){
      return {
        view: function(){
          var that;
          return m('.container', attr.brs(3), m('.columns', m('.column'), m('.column', m('.content', m('h5', 'Login')), m('form', {
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
                  return m.route.set('/dashboard');
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
          }))) : void 8)), m('.column')));
        }
      };
    },
    register: function(){
      return {
        view: function(){
          return m('.container', m('.content', attr.brs(2), m('h5', 'Pendaftaran User Perusahaan'), m('p', 'Persyaratan sebagai berikut')));
        }
      };
    },
    layout: function(comp){
      return {
        view: function(){
          var ref$, that;
          return m('div', m('nav.navbar.is-info', m('.navbar-brand', m('a.navbar-item', 'App Lingkungan')), m('.navbar-end', Meteor.userId() && m('.navbar-item.has-dropdown', {
            'class': state.linkMenu ? 'is-active' : void 8
          }, m('a.navbar-link', {
            onclick: function(){
              return state.linkMenu = !state.linkMenu;
            }
          }, m('span', 'Menu')), m('.navbar-dropdown.is-right', ['kontrak', 'izin', 'limbah'].map(function(i){
            return m('a.navbar-item', {
              onclick: function(){
                return m.route.set("/" + i) && m.redraw();
              }
            }, m('span', _.startCase(i)));
          }))), m('.navbar-item.has-dropdown', {
            'class': state.userMenu ? 'is-active' : void 8
          }, m('a.navbar-link', {
            onclick: function(){
              return state.userMenu = !state.userMenu;
            }
          }, m('span', ((ref$ = Meteor.user()) != null ? ref$.username : void 8) || 'User')), m('.navbar-dropdown.is-right', function(){
            var arr;
            arr = Meteor.userId()
              ? [[
                'Logout', function(){
                  return Meteor.logout() && m.redraw();
                }
              ]]
              : arr = [
                [
                  'Login', function(){
                    return m.route.set('login') && m.redraw();
                  }
                ], [
                  'Register', function(){
                    return m.route.set('register') && m.redraw();
                  }
                ]
              ];
            return arr.map(function(i){
              return m('a.navbar-item', {
                onclick: i != null ? i[1] : void 8
              }, i != null ? i[0] : void 8);
            });
          }())))), m('.columns', m('.column', (that = comp) ? m(that) : void 8)));
        }
      };
    }
  };
  m.route.prefix('');
  m.route(document.body, '/login', {
    '/kontrak': comp.layout(comp.kontrak),
    '/izin': comp.layout(comp.izin),
    '/limbah': comp.layout(comp.limbah),
    '/login': comp.layout(comp.login),
    '/register': comp.layout(comp.register)
  });
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"server.ls.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// server.ls.js                                                                                                      //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},{
  "extensions": [
    ".js",
    ".json"
  ]
});
require("/folder/funcs.ls.js");
require("/folder/parent.ls.js");
require("/both.ls.js");
require("/client.ls.js");
require("/server.ls.js");