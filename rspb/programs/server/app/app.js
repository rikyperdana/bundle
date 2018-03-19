var require = meteorInstall({"folder":{"parent":{"funcs.coffee.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// folder/parent/funcs.coffee.js                                                                                     //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
this._ = lodash;                                                                                                     // 1
this.coll = {};                                                                                                      // 2
this.schema = {};                                                                                                    // 2
                                                                                                                     //
this.look = function (list, val) {                                                                                   // 3
  return _.find(selects[list], function (i) {                                                                        // 8
    return i.value === val;                                                                                          // 9
  });                                                                                                                // 3
};                                                                                                                   // 3
                                                                                                                     //
this.look2 = function (list, id) {                                                                                   // 4
  return _.find(coll[list].find().fetch(), function (i) {                                                            // 14
    return i._id === id;                                                                                             // 15
  });                                                                                                                // 4
};                                                                                                                   // 4
                                                                                                                     //
this.randomId = function () {                                                                                        // 5
  return Math.random().toString(36).slice(2);                                                                        // 20
};                                                                                                                   // 5
                                                                                                                     //
this.zeros = function (num) {                                                                                        // 6
  var size;                                                                                                          // 7
  size = _.size(_.toString(num));                                                                                    // 7
  return '0'.repeat(6 - size) + _.toString(num);                                                                     // 26
};                                                                                                                   // 6
                                                                                                                     //
this.monthDiff = function (date) {                                                                                   // 9
  var diff;                                                                                                          // 10
  diff = date.getTime() - new Date().getTime();                                                                      // 10
  diff /= 1000 * 60 * 60 * 24 * 7 * 4;                                                                               // 11
  return Math.round(diff);                                                                                           // 33
};                                                                                                                   // 9
                                                                                                                     //
if (Meteor.isClient) {                                                                                               // 14
  AutoForm.setDefaultTemplate('materialize');                                                                        // 17
                                                                                                                     //
  this.currentRoute = function () {                                                                                  // 18
    return Router.current().route.getName();                                                                         // 39
  };                                                                                                                 // 18
                                                                                                                     //
  this.currentPar = function (param) {                                                                               // 19
    return Router.current().params[param];                                                                           // 42
  };                                                                                                                 // 19
                                                                                                                     //
  this.search = function () {                                                                                        // 20
    return Session.get('search');                                                                                    // 45
  };                                                                                                                 // 20
                                                                                                                     //
  this.formDoc = function () {                                                                                       // 21
    return Session.get('formDoc');                                                                                   // 48
  };                                                                                                                 // 21
                                                                                                                     //
  this.limit = function () {                                                                                         // 22
    return Session.get('limit');                                                                                     // 51
  };                                                                                                                 // 22
                                                                                                                     //
  this.page = function () {                                                                                          // 23
    return Session.get('page');                                                                                      // 54
  };                                                                                                                 // 23
                                                                                                                     //
  this.roles = function () {                                                                                         // 24
    return Meteor.user().roles;                                                                                      // 57
  };                                                                                                                 // 24
                                                                                                                     //
  this.userGroup = function (name) {                                                                                 // 25
    return roles()[name];                                                                                            // 60
  };                                                                                                                 // 25
                                                                                                                     //
  this.userRole = function (name) {                                                                                  // 26
    return roles()[currentRoute()][0] === name;                                                                      // 63
  };                                                                                                                 // 26
                                                                                                                     //
  this.tag = function (tag, val) {                                                                                   // 27
    return '<' + tag + '>' + val + '</' + tag + '>';                                                                 // 66
  };                                                                                                                 // 27
                                                                                                                     //
  this.userName = function (id) {                                                                                    // 28
    return Meteor.users.findOne({                                                                                    // 69
      _id: id                                                                                                        // 28
    }).username;                                                                                                     // 28
  };                                                                                                                 // 28
                                                                                                                     //
  this.sessNull = function () {                                                                                      // 29
    return _.map(_.tail(_.keys(Session.keys)), function (i) {                                                        // 74
      return Session.set(i, null);                                                                                   // 75
    });                                                                                                              // 29
  };                                                                                                                 // 29
}                                                                                                                    // 78
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"hooks.coffee.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// folder/hooks.coffee.js                                                                                            //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
if (Meteor.isClient) {                                                                                               // 1
  this.modForm = function (doc, idbayar) {                                                                           // 3
    var begin, find, i, l, len, ref, stop;                                                                           // 3
                                                                                                                     //
    if (currentRoute() === 'jalan') {                                                                                // 3
      doc.tanggal = new Date();                                                                                      // 4
      doc.idbayar = idbayar ? idbayar : randomId();                                                                  // 5
      doc.jenis = currentRoute();                                                                                    // 6
      doc.total = {                                                                                                  // 7
        tindakan: 0,                                                                                                 // 7
        labor: 0,                                                                                                    // 7
        radio: 0,                                                                                                    // 7
        obat: 0                                                                                                      // 7
      };                                                                                                             // 7
                                                                                                                     //
      _.map(['tindakan', 'labor', 'radio'], function (i) {                                                           // 8
        var find, j, l, len, ref, results;                                                                           // 9
                                                                                                                     //
        if (doc[i]) {                                                                                                // 9
          ref = doc[i];                                                                                              // 9
          results = [];                                                                                              // 9
                                                                                                                     //
          for (l = 0, len = ref.length; l < len; l++) {                                                              // 19
            j = ref[l];                                                                                              // 20
            j['id' + i] = randomId();                                                                                // 10
            find = _.find(coll.tarif.find().fetch(), function (k) {                                                  // 11
              return k._id === j.nama;                                                                               // 23
            });                                                                                                      // 11
            j.harga = find.harga;                                                                                    // 12
            results.push(doc.total[i] += j.harga);                                                                   // 26
          }                                                                                                          // 9
                                                                                                                     //
          return results;                                                                                            // 28
        }                                                                                                            // 29
      });                                                                                                            // 8
                                                                                                                     //
      ref = doc.obat != null;                                                                                        // 14
                                                                                                                     //
      for (l = 0, len = ref.length; l < len; l++) {                                                                  // 14
        i = ref[l];                                                                                                  // 33
        i.idobat = randomId();                                                                                       // 15
        find = _.find(coll.gudang.find().fetch(), function (k) {                                                     // 16
          return k._id === i.nama;                                                                                   // 36
        });                                                                                                          // 16
        i.harga = 0;                                                                                                 // 17
        i.subtotal = i.harga * i.jumlah;                                                                             // 18
        doc.total.obat += i.subtotal;                                                                                // 19
      }                                                                                                              // 14
                                                                                                                     //
      doc.total.semua = _.reduce(_.values(doc.total), function (acc, val) {                                          // 20
        return acc + val;                                                                                            // 43
      });                                                                                                            // 20
                                                                                                                     //
      if (doc.anamesa_perawat || doc.anamesa_dokter) {                                                               // 21
        doc.billRegis = true;                                                                                        // 21
      }                                                                                                              // 47
                                                                                                                     //
      if (doc.total.semua > 0 || doc.cara_bayar !== 1) {                                                             // 22
        doc.billRegis = true;                                                                                        // 22
      }                                                                                                              // 50
                                                                                                                     //
      if (doc.total.semua > 0 && doc.cara_bayar !== 1) {                                                             // 23
        doc.status_bayar = true;                                                                                     // 23
      }                                                                                                              // 53
                                                                                                                     //
      if (doc.obat && 0 === doc.total.semua) {                                                                       // 24
        doc.billRegis = true;                                                                                        // 25
        doc.status_bayar = true;                                                                                     // 26
      }                                                                                                              // 57
                                                                                                                     //
      begin = Session.get('begin');                                                                                  // 27
      stop = moment();                                                                                               // 27
      doc.spm = stop.diff(begin, 'minutes');                                                                         // 28
      doc.petugas = Meteor.userId();                                                                                 // 29
      doc.nobill = parseInt(_.toString(Date.now()).substr(7, 13));                                                   // 30
      return doc;                                                                                                    // 63
    }                                                                                                                // 64
  };                                                                                                                 // 3
                                                                                                                     //
  AutoForm.addHooks('formPasien', {                                                                                  // 33
    before: {                                                                                                        // 34
      'update-pushArray': function (doc) {                                                                           // 35
        var formDoc;                                                                                                 // 36
        formDoc = Session.get('formDoc');                                                                            // 36
                                                                                                                     //
        if (formDoc) {                                                                                               // 37
          Meteor.call('rmRawat', currentPar('no_mr'), formDoc.idbayar);                                              // 37
        }                                                                                                            // 73
                                                                                                                     //
        return this.result(modForm(doc));                                                                            // 74
      }                                                                                                              // 35
    },                                                                                                               // 35
    after: {                                                                                                         // 39
      insert: function () {                                                                                          // 40
        return sessNull();                                                                                           // 79
      },                                                                                                             // 40
      'update-pushArray': function (err, res) {                                                                      // 41
        sessNull();                                                                                                  // 42
                                                                                                                     //
        if (res) {                                                                                                   // 43
          return Meteor.call('pindah', currentPar('no_mr'));                                                         // 84
        }                                                                                                            // 85
      }                                                                                                              // 40
    },                                                                                                               // 40
    formToDoc: function (doc) {                                                                                      // 44
      Session.set('preview', modForm(doc));                                                                          // 45
                                                                                                                     //
      if (currentRoute() === 'regis') {                                                                              // 46
        Meteor.call('patientExist', doc.no_mr, function (err, res) {                                                 // 47
          if (res) {                                                                                                 // 47
            Materialize.toast('No MR sudah dipakai pasien yang lain', 3000);                                         // 48
            return $('input[name="no_mr"]').val('');                                                                 // 94
          }                                                                                                          // 95
        });                                                                                                          // 47
      }                                                                                                              // 97
                                                                                                                     //
      return doc;                                                                                                    // 98
    }                                                                                                                // 34
  });                                                                                                                // 34
  AutoForm.addHooks('formGudang', {                                                                                  // 52
    before: {                                                                                                        // 53
      insert: function (doc) {                                                                                       // 54
        doc.idbarang = randomId();                                                                                   // 55
        doc.batch[0].idbatch = randomId();                                                                           // 56
        return this.result(doc);                                                                                     // 106
      },                                                                                                             // 54
      'update-pushArray': function (doc) {                                                                           // 58
        return this.result(_.assign(doc, {                                                                           // 109
          idbatch: randomId()                                                                                        // 59
        }));                                                                                                         // 59
      }                                                                                                              // 54
    }                                                                                                                // 54
  });                                                                                                                // 53
  AutoForm.addHooks('formAmprah', {                                                                                  // 61
    before: {                                                                                                        // 62
      'update-pushArray': function (doc) {                                                                           // 62
        return this.result(_.assign(doc, {                                                                           // 118
          idamprah: randomId(),                                                                                      // 64
          peminta: Meteor.userId(),                                                                                  // 65
          tanggal: new Date(),                                                                                       // 66
          ruangan: _.keys(roles())[0]                                                                                // 67
        }));                                                                                                         // 64
      }                                                                                                              // 62
    }                                                                                                                // 62
  });                                                                                                                // 62
}                                                                                                                    // 127
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"modules.coffee.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// folder/modules.coffee.js                                                                                          //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
this.modules = [{                                                                                                    // 1
  name: 'regis',                                                                                                     // 2
  full: 'Pendaftaran',                                                                                               // 3
  icon: 'people',                                                                                                    // 4
  color: 'orange'                                                                                                    // 5
}, {                                                                                                                 // 2
  name: 'bayar',                                                                                                     // 7
  full: 'Pembayaran',                                                                                                // 8
  icon: 'monetization_on',                                                                                           // 9
  color: 'green'                                                                                                     // 10
}, {                                                                                                                 // 7
  name: 'jalan',                                                                                                     // 12
  full: 'Rawat Jalan',                                                                                               // 13
  icon: 'directions',                                                                                                // 14
  color: 'blue'                                                                                                      // 15
}, {                                                                                                                 // 12
  name: 'igd',                                                                                                       // 17
  full: 'IGD',                                                                                                       // 18
  icon: 'airport_shuttle',                                                                                           // 19
  color: 'red'                                                                                                       // 20
}, {                                                                                                                 // 17
  name: 'inap',                                                                                                      // 22
  full: 'Rawat Inap',                                                                                                // 23
  icon: 'hotel',                                                                                                     // 24
  color: 'cyan'                                                                                                      // 25
}, {                                                                                                                 // 22
  name: 'labor',                                                                                                     // 27
  full: 'Laboratorium',                                                                                              // 28
  icon: 'wb_incandescent',                                                                                           // 29
  color: 'amber'                                                                                                     // 30
}, {                                                                                                                 // 27
  name: 'radio',                                                                                                     // 32
  full: 'Radiologi',                                                                                                 // 33
  icon: 'airline_seat_flat',                                                                                         // 34
  color: 'indigo'                                                                                                    // 35
}, {                                                                                                                 // 32
  name: 'obat',                                                                                                      // 37
  full: 'Apotek',                                                                                                    // 38
  icon: 'enhanced_encryption',                                                                                       // 39
  color: 'light-green'                                                                                               // 40
}, {                                                                                                                 // 37
  name: 'admisi',                                                                                                    // 42
  full: 'Admisi',                                                                                                    // 43
  icon: 'assignment',                                                                                                // 44
  color: 'purple'                                                                                                    // 45
}, {                                                                                                                 // 42
  name: 'rekam',                                                                                                     // 47
  full: 'Rekam Medik',                                                                                               // 48
  icon: 'content_copy',                                                                                              // 49
  color: 'brown'                                                                                                     // 50
}, {                                                                                                                 // 47
  name: 'farmasi',                                                                                                   // 52
  full: 'Gudang Farmasi',                                                                                            // 53
  icon: 'local_pharmacy',                                                                                            // 54
  color: 'orange'                                                                                                    // 55
}, {                                                                                                                 // 52
  name: 'logistik',                                                                                                  // 57
  full: 'Gudang Logistik',                                                                                           // 58
  icon: 'rv_hookup',                                                                                                 // 59
  color: 'blue-grey'                                                                                                 // 60
}, {                                                                                                                 // 57
  name: 'manajemen',                                                                                                 // 62
  full: 'Manajemen',                                                                                                 // 63
  icon: 'people',                                                                                                    // 64
  color: 'orange'                                                                                                    // 65
}];                                                                                                                  // 62
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"pdf.coffee.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// folder/pdf.coffee.js                                                                                              //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var slice = [].slice;                                                                                                // 1
                                                                                                                     //
if (Meteor.isClient) {                                                                                               // 1
  this.makePdf = {                                                                                                   // 3
    card: function () {                                                                                              // 4
      var doc, pdf;                                                                                                  // 5
      doc = coll.pasien.findOne();                                                                                   // 5
      pdf = pdfMake.createPdf({                                                                                      // 6
        content: ['Nama  : ' + doc.regis.nama_lengkap, 'No. MR: ' + zeros(doc.no_mr)],                               // 7
        pageSize: 'B8',                                                                                              // 11
        pageMargins: [110, 50, 0, 0],                                                                                // 12
        pageOrientation: 'landscape'                                                                                 // 13
      });                                                                                                            // 7
      return pdf.download(zeros(doc.no_mr) + '_card.pdf');                                                           // 14
    },                                                                                                               // 4
    consent: function () {                                                                                           // 15
      var doc, pdf;                                                                                                  // 16
      doc = coll.pasien.findOne();                                                                                   // 16
      pdf = pdfMake.createPdf({                                                                                      // 17
        content: [{                                                                                                  // 18
          text: 'PEMERINTAH PROVINSI RIAU\nRUMAH SAKIT UMUM DAERAH PETALA BUMI\nJL. Dr. Soetomo No. 65, Telp. (0761) 23024',
          alignment: 'center'                                                                                        // 19
        }, {                                                                                                         // 19
          text: '\nDATA UMUM PASIEN',                                                                                // 20
          alignment: 'center'                                                                                        // 20
        }, {                                                                                                         // 20
          columns: [['NO. MR', 'NAMA LENGKAP', 'TEMPAT & TANGGAL LAHIR', 'GOLONGAN DARAH', 'JENIS KELAMIN', 'AGAMA', 'PENDIDIKAN', 'PEKERJAAN', 'NAMA AYAH', 'NAMA IBU', 'NAMA SUAMI / ISTRI', 'ALAMAT', 'NO. TELP / HP'], _.map([zeros(doc.no_mr), doc.regis.nama_lengkap, (doc.regis.tmpt_lahir || '-') + ', ' + moment(doc.regis.tgl_lahir).format('D/MM/YYYY')].concat(slice.call(_.map(['darah', 'kelamin', 'agama', 'pendidikan', 'pekerjaan'], function (i) {
            var ref;                                                                                                 // 28
            return ((ref = look(i, doc.regis[i])) != null ? ref.label : void 0) || '-';                              // 31
          })), slice.call(_.map(['ayah', 'ibu', 'pasangan', 'alamat', 'kontak'], function (i) {                      // 27
            return doc.regis[i] || '-';                                                                              // 33
          }))), function (i) {                                                                                       // 29
            return ': ' + i;                                                                                         // 35
          })]                                                                                                        // 23
        }, {                                                                                                         // 21
          text: '\nPERSETUJUAN UMUM (GENERAL CONSENT)',                                                              // 33
          alignment: 'center'                                                                                        // 33
        }, {                                                                                                         // 33
          table: {                                                                                                   // 34
            body: [['S', 'TS', {                                                                                     // 34
              text: 'Keterangan',                                                                                    // 35
              alignment: 'center'                                                                                    // 35
            }]].concat(slice.call(_.map([['Saya akan mentaati peraturan yang berlaku di RSUD Petala Bumi'], ['Saya memberi kuasa kepada dokter dan semua tenaga kesehatan untuk melakukan pemeriksaan / pengobatan / tindakan yang diperlakukan upaya kesembuhan saya / pasien tersebut diatas'], ['Saya memberi kuasa kepada dokter dan semua tenaga kesehatan yang ikut merawat saya untuk memberikan keterangan medis saya kepada yang bertanggung jawab atas biaya perawatan saya.'], ['Saya memberi kuasa kepada RSUD Petala Bumi untuk menginformasikan identitas sosial saya kepada keluarga / rekan / masyarakat'], ['Saya mengatakan bahwa informasi hasil pemeriksaan / rekam medis saya dapat digunakan untuk pendidikan / penelitian demi kemajuan ilmu kesehatan']], function (i) {
              return [' ', ' '].concat(slice.call(i));                                                               // 49
            })))                                                                                                     // 36
          }                                                                                                          // 34
        }, '\nPetunjuk :', 'S: Setuju', 'TS: Tidak Setuju', {                                                        // 34
          alignment: 'justify',                                                                                      // 47
          columns: [{                                                                                                // 47
            text: '\n\n\n\n__________________\n' + _.startCase(Meteor.user().username),                              // 48
            alignment: 'center'                                                                                      // 48
          }, {                                                                                                       // 48
            text: 'Pekanbaru, ' + moment().format('DD/MM/YYYY') + '\n\n\n\n__________________\n' + _.startCase(doc.regis.nama_lengkap),
            alignment: 'center'                                                                                      // 49
          }]                                                                                                         // 49
        }]                                                                                                           // 47
      });                                                                                                            // 18
      return pdf.download(zeros(doc.no_mr) + '_consent.pdf');                                                        // 66
    },                                                                                                               // 4
    payRawat: function (no_mr, doc) {                                                                                // 53
      var find, i, j, l, len, len1, m, pasien, pdf, ref, ref1, ref2, ref3, rows, table;                              // 54
      pasien = coll.pasien.findOne({                                                                                 // 54
        no_mr: parseInt(no_mr)                                                                                       // 54
      });                                                                                                            // 54
      rows = [['Uraian', 'Harga']];                                                                                  // 55
      ref = ['tindakan', 'labor', 'radio'];                                                                          // 56
                                                                                                                     //
      for (l = 0, len = ref.length; l < len; l++) {                                                                  // 56
        i = ref[l];                                                                                                  // 76
                                                                                                                     //
        if (doc[i]) {                                                                                                // 57
          ref1 = doc[i];                                                                                             // 57
                                                                                                                     //
          for (m = 0, len1 = ref1.length; m < len1; m++) {                                                           // 57
            j = ref1[m];                                                                                             // 80
            find = _.find(coll.tarif.find().fetch(), function (k) {                                                  // 58
              return k._id === j.nama;                                                                               // 82
            });                                                                                                      // 58
            rows.push([_.startCase(find.nama), _.toString(j.harga)]);                                                // 59
          }                                                                                                          // 57
        }                                                                                                            // 86
      }                                                                                                              // 56
                                                                                                                     //
      table = {                                                                                                      // 60
        table: {                                                                                                     // 60
          widths: ['*', 'auto'],                                                                                     // 60
          body: rows                                                                                                 // 60
        }                                                                                                            // 60
      };                                                                                                             // 60
      pdf = pdfMake.createPdf({                                                                                      // 61
        content: [{                                                                                                  // 62
          text: 'PEMERINTAH PROVINSI RIAU\nRUMAH SAKIT UMUM DAERAH PETALA BUMI\nJL. DR. SOETOMO NO. 65, TELP. (0761) 23024, PEKANBARU',
          alignment: 'center'                                                                                        // 63
        }, {                                                                                                         // 63
          text: '\nRINCIAN BIAYA RAWAT JALAN\n',                                                                     // 64
          alignment: 'center'                                                                                        // 64
        }, {                                                                                                         // 64
          columns: [['NO. MR', 'NAMA PASIEN', 'JENIS KELAMIN', 'TANGGAL LAHIR', 'UMUR', 'KLINIK'], _.map([zeros(pasien.no_mr), _.startCase(pasien.regis.nama_lengkap), ((ref2 = look('kelamin', pasien.regis.kelamin)) != null ? ref2.label : void 0) || '-', moment().format('D/MM/YYYY'), moment().diff(pasien.regis.tgl_lahir, 'years') + ' tahun', ((ref3 = look('klinik', doc.klinik)) != null ? ref3.label : void 0) || '-'], function (i) {
            return ': ' + i;                                                                                         // 105
          })]                                                                                                        // 67
        }, {                                                                                                         // 65
          text: '\n\nRINCIAN PEMBAYARAN',                                                                            // 76
          alignment: 'center'                                                                                        // 76
        }, table, '\nTOTAL BIAYA' + 'Rp ' + _.toString(numeral(doc.total.semua).format('0,0')), {                    // 76
          text: '\nPEKANBARU, ' + moment().format('D/MM/YYYY') + '\n\n\n\n\n' + _.startCase(Meteor.user().username),
          alignment: 'right'                                                                                         // 80
        }]                                                                                                           // 79
      });                                                                                                            // 62
      return pdf.download(zeros(pasien.no_mr) + '_payRawat.pdf');                                                    // 117
    },                                                                                                               // 4
    payRegCard: function (no_mr, amount, words) {                                                                    // 83
      var doc, pdf;                                                                                                  // 84
      doc = coll.pasien.findOne({                                                                                    // 84
        no_mr: parseInt(no_mr)                                                                                       // 84
      });                                                                                                            // 84
      pdf = pdfMake.createPdf({                                                                                      // 85
        content: [{                                                                                                  // 86
          text: 'PEMERINTAH PROVINSI RIAU\nRUMAH SAKIT UMUM DAERAH PETALA BUMI\nJL. DR. SOETOMO NO. 65, TELP. (0761) 23024, PEKANBARU',
          alignment: 'center'                                                                                        // 87
        }, {                                                                                                         // 87
          text: '\n\nKARCIS',                                                                                        // 88
          alignment: 'center'                                                                                        // 88
        }, {                                                                                                         // 88
          columns: [['TANGGAL', 'NO. MR', 'NAMA PASIEN', 'TARIF', '\n\nPETUGAS'], _.map([moment().format('DD/MM/YYYY'), zeros(doc.no_mr), _.startCase(doc.regis.nama_lengkap), 'Rp ' + amount, '\n\n' + _.startCase(Meteor.user().username)], function (i) {
            return ': ' + i;                                                                                         // 135
          })]                                                                                                        // 91
        }]                                                                                                           // 89
      });                                                                                                            // 86
      return pdf.download(zeros(doc.no_mr) + '_payRegCard.pdf');                                                     // 141
    },                                                                                                               // 4
    rekap: function (rows) {                                                                                         // 101
      var pdf, strings;                                                                                              // 102
      strings = _.map(rows, function (i) {                                                                           // 102
        return _.map(i, function (j) {                                                                               // 146
          return _.toString(j);                                                                                      // 147
        });                                                                                                          // 102
      });                                                                                                            // 102
      pdf = pdfMake.createPdf({                                                                                      // 103
        content: [{                                                                                                  // 103
          table: {                                                                                                   // 103
            body: strings                                                                                            // 103
          }                                                                                                          // 103
        }]                                                                                                           // 103
      });                                                                                                            // 103
      return pdf.download('rekap.pdf');                                                                              // 159
    }                                                                                                                // 4
  };                                                                                                                 // 4
}                                                                                                                    // 162
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"rights.coffee.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// folder/rights.coffee.js                                                                                           //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var slice = [].slice;                                                                                                // 1
                                                                                                                     //
if (Meteor.isClient) {                                                                                               // 1
  this.rights = [{                                                                                                   // 3
    group: 'regis',                                                                                                  // 4
    list: ['regis', 'jalan']                                                                                         // 5
  }, {                                                                                                               // 4
    group: 'bayar',                                                                                                  // 7
    list: ['bayar']                                                                                                  // 8
  }, {                                                                                                               // 7
    group: 'jalan',                                                                                                  // 10
    list: ['jalan', 'farmasi']                                                                                       // 11
  }, {                                                                                                               // 10
    group: 'inap',                                                                                                   // 13
    list: ['inap', 'farmasi']                                                                                        // 14
  }, {                                                                                                               // 13
    group: 'labor',                                                                                                  // 16
    list: ['labor']                                                                                                  // 17
  }, {                                                                                                               // 16
    group: 'radio',                                                                                                  // 19
    list: ['radio']                                                                                                  // 20
  }, {                                                                                                               // 19
    group: 'obat',                                                                                                   // 22
    list: ['obat', 'farmasi']                                                                                        // 23
  }, {                                                                                                               // 22
    group: 'rekam',                                                                                                  // 25
    list: ['rekam', 'regis']                                                                                         // 26
  }, {                                                                                                               // 25
    group: 'admisi',                                                                                                 // 28
    list: ['admisi']                                                                                                 // 29
  }, {                                                                                                               // 28
    group: 'manajemen',                                                                                              // 31
    list: ['manajemen']                                                                                              // 32
  }, {                                                                                                               // 31
    group: 'farmasi',                                                                                                // 34
    list: ['farmasi']                                                                                                // 35
  }];                                                                                                                // 34
                                                                                                                     //
  _.map(rights, function (i) {                                                                                       // 38
    i.list = slice.call(i.list).concat(['panduan']);                                                                 // 39
    return i;                                                                                                        // 42
  });                                                                                                                // 38
}                                                                                                                    // 44
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"selects.coffee.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// folder/selects.coffee.js                                                                                          //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
this.selects = {                                                                                                     // 1
  rawat: ['Rawat Jalan', 'Rawat Inap', 'IGD'],                                                                       // 2
  pekerjaan: ['PNS', 'BUMN/BUMD', 'TNI/Polri', 'Dokter', 'Karyawan Swasta', 'Wirausaha', 'Honorer', 'Pensiun', 'Petani', 'Buruh', 'Tidak Bekerja', 'Dan Lain-lain'],
  kelamin: ['Laki-laki', 'Perempuan'],                                                                               // 4
  agama: ['Islam', 'Katolik', 'Protestan', 'Buddha', 'Hindu', 'Kong Hu Chu'],                                        // 5
  pendidikan: ['SD', 'SMP', 'SMA', 'Diploma', 'S1', 'S2', 'S3', 'Tidak Sekolah'],                                    // 6
  darah: ['A', 'B', 'C', 'AB', 'O'],                                                                                 // 7
  cara_bayar: ['Umum', 'BPJS', 'Jamkesda Pekanbaru', 'Jamkesda Kampar', 'Lapas/Dinsos', 'Free'],                     // 8
  nikah: ['Nikah', 'Belum Nikah', 'Janda', 'Duda'],                                                                  // 9
  klinik: ['Penyakit Dalam', 'Gigi', 'Kebidanan', 'THT', 'Anak', 'Saraf', 'Mata', 'Bedah', 'Paru', 'Tb. Dots', 'Kulit', 'Fisioterapi', 'Gizi', 'Metadon', 'Psikologi', 'Tindakan', 'APS Labor', 'APS Radio'],
  bentuk: ['butir', 'kapsul', 'tablet', 'sendok makan', 'sendok teh'],                                               // 11
  tipe_dokter: ['Umum', 'Spesialis'],                                                                                // 12
  rujukan: ['Datang Sendiri', 'RS Lain', 'Puskesmas', 'Faskes Lainnya'],                                             // 13
  keluar: ['Pulang', 'Rujuk'],                                                                                       // 14
  barang: ['Generik', 'Non-Generik', 'Obat Narkotika', 'BHP'],                                                       // 15
  satuan: ['Botol', 'Vial', 'Ampul', 'Pcs', 'Sachet', 'Tube', 'Supp', 'Tablet', 'Minidose', 'Pot', 'Turbuhaler', 'Kaplet'],
  anggaran: ['BLUD', 'APBD', 'Kemenkes', 'Dinkes'],                                                                  // 17
  alias: ['Tn.', 'Ny.', 'Nn.', 'An.', 'By.']                                                                         // 18
};                                                                                                                   // 2
                                                                                                                     //
_.map(_.keys(selects), function (i) {                                                                                // 20
  return selects[i] = _.map(selects[i], function (j, x) {                                                            // 22
    return {                                                                                                         // 23
      label: j,                                                                                                      // 20
      value: x + 1                                                                                                   // 20
    };                                                                                                               // 20
  });                                                                                                                // 20
});                                                                                                                  // 20
                                                                                                                     //
selects.karcis = _.map([15000, 20000, 25000, 30000, 40000], function (i) {                                           // 22
  return {                                                                                                           // 31
    value: i,                                                                                                        // 22
    label: 'Rp ' + i                                                                                                 // 22
  };                                                                                                                 // 22
});                                                                                                                  // 22
                                                                                                                     //
selects.tindakan = function () {                                                                                     // 24
  var selector, sub;                                                                                                 // 24
                                                                                                                     //
  if (Meteor.isClient) {                                                                                             // 24
    sub = Meteor.subscribe('coll', 'tarif', {}, {});                                                                 // 25
    selector = {                                                                                                     // 26
      jenis: Meteor.user().roles.jalan[0]                                                                            // 26
    };                                                                                                               // 26
                                                                                                                     //
    if (sub.ready()) {                                                                                               // 27
      return _.map(coll.tarif.find(selector).fetch(), function (i) {                                                 // 45
        return {                                                                                                     // 46
          value: i._id,                                                                                              // 28
          label: _.startCase(i.nama)                                                                                 // 28
        };                                                                                                           // 28
      });                                                                                                            // 27
    }                                                                                                                // 24
  }                                                                                                                  // 52
};                                                                                                                   // 24
                                                                                                                     //
selects.dokter = function () {                                                                                       // 30
  var find, selector, sub;                                                                                           // 30
                                                                                                                     //
  if (Meteor.isClient) {                                                                                             // 30
    sub = Meteor.subscribe('coll', 'dokter', {}, {});                                                                // 31
    find = _.find(selects.klinik, function (i) {                                                                     // 32
      return Meteor.user().roles.jalan[0] === _.snakeCase(i.label);                                                  // 60
    });                                                                                                              // 32
    selector = {                                                                                                     // 34
      poli: find.value                                                                                               // 34
    };                                                                                                               // 34
                                                                                                                     //
    if (sub.ready()) {                                                                                               // 35
      return _.map(coll.dokter.find(selector).fetch(), function (i) {                                                // 66
        return {                                                                                                     // 67
          value: i._id,                                                                                              // 36
          label: i.nama                                                                                              // 36
        };                                                                                                           // 36
      });                                                                                                            // 35
    }                                                                                                                // 30
  }                                                                                                                  // 73
};                                                                                                                   // 30
                                                                                                                     //
selects.obat = function () {                                                                                         // 38
  var filter, sub;                                                                                                   // 38
                                                                                                                     //
  if (Meteor.isClient) {                                                                                             // 38
    sub = Meteor.subscribe('coll', 'gudang', {}, {});                                                                // 39
                                                                                                                     //
    filter = function (arr) {                                                                                        // 40
      return _.filter(arr, function (i) {                                                                            // 81
        return i.jenis === 1;                                                                                        // 82
      });                                                                                                            // 40
    };                                                                                                               // 40
                                                                                                                     //
    if (sub.ready()) {                                                                                               // 41
      return _.map(filter(coll.gudang.find().fetch()), function (i) {                                                // 86
        return {                                                                                                     // 87
          value: i._id,                                                                                              // 42
          label: i.nama                                                                                              // 42
        };                                                                                                           // 42
      });                                                                                                            // 41
    }                                                                                                                // 38
  }                                                                                                                  // 93
};                                                                                                                   // 38
                                                                                                                     //
_.map(['labor', 'radio'], function (i) {                                                                             // 44
  return selects[i] = function () {                                                                                  // 97
    var selector, sub;                                                                                               // 45
                                                                                                                     //
    if (Meteor.isClient) {                                                                                           // 45
      sub = Meteor.subscribe('coll', 'tarif', {}, {});                                                               // 46
      selector = {                                                                                                   // 47
        jenis: i                                                                                                     // 47
      };                                                                                                             // 47
                                                                                                                     //
      if (sub.ready()) {                                                                                             // 48
        return _.map(coll.tarif.find(selector).fetch(), function (j) {                                               // 105
          return {                                                                                                   // 106
            value: j._id,                                                                                            // 49
            label: _.startCase(j.nama)                                                                               // 49
          };                                                                                                         // 49
        });                                                                                                          // 48
      }                                                                                                              // 45
    }                                                                                                                // 112
  };                                                                                                                 // 45
});                                                                                                                  // 44
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"both.coffee.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// both.coffee.js                                                                                                    //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Router.configure({                                                                                                   // 1
  layoutTemplate: 'layout',                                                                                          // 2
  loadingTemplate: 'loading'                                                                                         // 3
});                                                                                                                  // 2
Router.route('/', {                                                                                                  // 5
  action: function () {                                                                                              // 6
    return this.render('home');                                                                                      // 8
  }                                                                                                                  // 6
});                                                                                                                  // 6
schema.regis = {                                                                                                     // 8
  no_mr: {                                                                                                           // 9
    type: Number,                                                                                                    // 9
    max: 999999                                                                                                      // 9
  },                                                                                                                 // 9
  regis: {                                                                                                           // 10
    type: Object                                                                                                     // 10
  },                                                                                                                 // 10
  'regis.alias': {                                                                                                   // 11
    type: Number,                                                                                                    // 11
    optional: true,                                                                                                  // 11
    autoform: {                                                                                                      // 11
      options: selects.alias,                                                                                        // 11
      type: 'select-radio-inline'                                                                                    // 11
    }                                                                                                                // 11
  },                                                                                                                 // 11
  'regis.nama_lengkap': {                                                                                            // 12
    type: String                                                                                                     // 12
  },                                                                                                                 // 12
  'regis.tgl_lahir': {                                                                                               // 13
    type: Date,                                                                                                      // 13
    autoform: {                                                                                                      // 13
      type: 'pickadate',                                                                                             // 13
      pickadateOptions: {                                                                                            // 13
        selectYears: 150,                                                                                            // 13
        selectMonths: true                                                                                           // 13
      }                                                                                                              // 13
    }                                                                                                                // 13
  },                                                                                                                 // 13
  'regis.tmpt_lahir': {                                                                                              // 14
    type: String,                                                                                                    // 14
    optional: true                                                                                                   // 14
  },                                                                                                                 // 14
  'regis.cara_bayar': {                                                                                              // 15
    type: Number,                                                                                                    // 15
    autoform: {                                                                                                      // 15
      options: selects.cara_bayar,                                                                                   // 15
      type: 'select-radio-inline'                                                                                    // 15
    }                                                                                                                // 15
  },                                                                                                                 // 15
  'regis.kelamin': {                                                                                                 // 16
    type: Number,                                                                                                    // 16
    autoform: {                                                                                                      // 16
      options: selects.kelamin,                                                                                      // 16
      type: 'select-radio-inline'                                                                                    // 16
    }                                                                                                                // 16
  },                                                                                                                 // 16
  'regis.agama': {                                                                                                   // 17
    type: Number,                                                                                                    // 17
    autoform: {                                                                                                      // 17
      options: selects.agama,                                                                                        // 17
      type: 'select-radio-inline'                                                                                    // 17
    }                                                                                                                // 17
  },                                                                                                                 // 17
  'regis.nikah': {                                                                                                   // 18
    type: Number,                                                                                                    // 18
    autoform: {                                                                                                      // 18
      options: selects.nikah,                                                                                        // 18
      type: 'select-radio-inline'                                                                                    // 18
    }                                                                                                                // 18
  },                                                                                                                 // 18
  'regis.pendidikan': {                                                                                              // 19
    type: Number,                                                                                                    // 19
    optional: true,                                                                                                  // 19
    autoform: {                                                                                                      // 19
      options: selects.pendidikan,                                                                                   // 19
      type: 'select-radio-inline'                                                                                    // 19
    }                                                                                                                // 19
  },                                                                                                                 // 19
  'regis.darah': {                                                                                                   // 20
    type: Number,                                                                                                    // 20
    optional: true,                                                                                                  // 20
    autoform: {                                                                                                      // 20
      options: selects.darah,                                                                                        // 20
      type: 'select-radio-inline'                                                                                    // 20
    }                                                                                                                // 20
  },                                                                                                                 // 20
  'regis.pekerjaan': {                                                                                               // 21
    type: Number,                                                                                                    // 21
    optional: true,                                                                                                  // 21
    autoform: {                                                                                                      // 21
      options: selects.pekerjaan,                                                                                    // 21
      type: 'select-radio-inline'                                                                                    // 21
    }                                                                                                                // 21
  },                                                                                                                 // 21
  'regis.kabupaten': {                                                                                               // 22
    type: String,                                                                                                    // 22
    optional: true                                                                                                   // 22
  },                                                                                                                 // 22
  'regis.kecamatan': {                                                                                               // 23
    type: String,                                                                                                    // 23
    optional: true                                                                                                   // 23
  },                                                                                                                 // 23
  'regis.kelurahan': {                                                                                               // 24
    type: String,                                                                                                    // 24
    optional: true                                                                                                   // 24
  },                                                                                                                 // 24
  'regis.alamat': {                                                                                                  // 25
    type: String                                                                                                     // 25
  },                                                                                                                 // 25
  'regis.kontak': {                                                                                                  // 26
    type: String,                                                                                                    // 26
    optional: true                                                                                                   // 26
  },                                                                                                                 // 26
  'regis.ayah': {                                                                                                    // 27
    type: String,                                                                                                    // 27
    optional: true                                                                                                   // 27
  },                                                                                                                 // 27
  'regis.ibu': {                                                                                                     // 28
    type: String,                                                                                                    // 28
    optional: true                                                                                                   // 28
  },                                                                                                                 // 28
  'regis.pasangan': {                                                                                                // 29
    type: String,                                                                                                    // 29
    optional: true                                                                                                   // 29
  },                                                                                                                 // 29
  'regis.petugas': {                                                                                                 // 30
    type: String,                                                                                                    // 31
    autoform: {                                                                                                      // 32
      type: 'hidden'                                                                                                 // 32
    },                                                                                                               // 32
    autoValue: function () {                                                                                         // 33
      if (Meteor.isClient) {                                                                                         // 33
        return Meteor.userId();                                                                                      // 135
      }                                                                                                              // 136
    }                                                                                                                // 31
  },                                                                                                                 // 31
  'regis.date': {                                                                                                    // 34
    type: Date,                                                                                                      // 35
    autoform: {                                                                                                      // 36
      type: 'hidden'                                                                                                 // 36
    },                                                                                                               // 36
    autoValue: function () {                                                                                         // 37
      return new Date();                                                                                             // 145
    }                                                                                                                // 35
  },                                                                                                                 // 35
  'regis.billCard': {                                                                                                // 38
    type: Boolean,                                                                                                   // 38
    optional: true,                                                                                                  // 38
    autoform: {                                                                                                      // 38
      type: 'hidden'                                                                                                 // 38
    }                                                                                                                // 38
  }                                                                                                                  // 38
};                                                                                                                   // 9
schema.fisik = {                                                                                                     // 40
  tekanan_darah: {                                                                                                   // 41
    type: String,                                                                                                    // 41
    optional: true                                                                                                   // 41
  },                                                                                                                 // 41
  nadi: {                                                                                                            // 42
    type: Number,                                                                                                    // 42
    optional: true                                                                                                   // 42
  },                                                                                                                 // 42
  suhu: {                                                                                                            // 43
    type: Number,                                                                                                    // 43
    decimal: true,                                                                                                   // 43
    optional: true                                                                                                   // 43
  },                                                                                                                 // 43
  pernapasan: {                                                                                                      // 44
    type: Number,                                                                                                    // 44
    optional: true                                                                                                   // 44
  },                                                                                                                 // 44
  berat: {                                                                                                           // 45
    type: Number,                                                                                                    // 45
    optional: true                                                                                                   // 45
  },                                                                                                                 // 45
  tinggi: {                                                                                                          // 46
    type: Number,                                                                                                    // 46
    optional: true                                                                                                   // 46
  },                                                                                                                 // 46
  lila: {                                                                                                            // 47
    type: Number,                                                                                                    // 47
    optional: true                                                                                                   // 47
  }                                                                                                                  // 47
};                                                                                                                   // 41
schema.tindakan = {                                                                                                  // 49
  idtindakan: {                                                                                                      // 50
    type: String,                                                                                                    // 50
    optional: true,                                                                                                  // 50
    autoform: {                                                                                                      // 50
      type: 'hidden'                                                                                                 // 50
    }                                                                                                                // 50
  },                                                                                                                 // 50
  nama: {                                                                                                            // 51
    type: String,                                                                                                    // 51
    autoform: {                                                                                                      // 51
      options: selects.tindakan,                                                                                     // 51
      type: 'universe-select'                                                                                        // 51
    }                                                                                                                // 51
  },                                                                                                                 // 51
  dokter: {                                                                                                          // 52
    type: String,                                                                                                    // 52
    autoform: {                                                                                                      // 52
      options: selects.dokter                                                                                        // 52
    }                                                                                                                // 52
  },                                                                                                                 // 52
  harga: {                                                                                                           // 53
    type: Number,                                                                                                    // 53
    optional: true,                                                                                                  // 53
    autoform: {                                                                                                      // 53
      type: 'hidden'                                                                                                 // 53
    }                                                                                                                // 53
  }                                                                                                                  // 53
};                                                                                                                   // 50
schema.labor = {                                                                                                     // 55
  idlabor: {                                                                                                         // 56
    type: String,                                                                                                    // 56
    optional: true,                                                                                                  // 56
    autoform: {                                                                                                      // 56
      type: 'hidden'                                                                                                 // 56
    }                                                                                                                // 56
  },                                                                                                                 // 56
  nama: {                                                                                                            // 57
    type: String,                                                                                                    // 57
    autoform: {                                                                                                      // 57
      options: selects.labor                                                                                         // 57
    }                                                                                                                // 57
  },                                                                                                                 // 57
  harga: {                                                                                                           // 58
    type: Number,                                                                                                    // 58
    optional: true,                                                                                                  // 58
    autoform: {                                                                                                      // 58
      type: 'hidden'                                                                                                 // 58
    }                                                                                                                // 58
  },                                                                                                                 // 58
  hasil: {                                                                                                           // 59
    type: String,                                                                                                    // 59
    optional: true,                                                                                                  // 59
    autoform: {                                                                                                      // 59
      type: 'hidden'                                                                                                 // 59
    }                                                                                                                // 59
  }                                                                                                                  // 59
};                                                                                                                   // 56
schema.radio = {                                                                                                     // 61
  idradio: {                                                                                                         // 62
    type: String,                                                                                                    // 62
    optional: true,                                                                                                  // 62
    autoform: {                                                                                                      // 62
      type: 'hidden'                                                                                                 // 62
    }                                                                                                                // 62
  },                                                                                                                 // 62
  nama: {                                                                                                            // 63
    type: String,                                                                                                    // 63
    autoform: {                                                                                                      // 63
      options: selects.radio                                                                                         // 63
    }                                                                                                                // 63
  },                                                                                                                 // 63
  harga: {                                                                                                           // 64
    type: Number,                                                                                                    // 64
    optional: true,                                                                                                  // 64
    autoform: {                                                                                                      // 64
      type: 'hidden'                                                                                                 // 64
    }                                                                                                                // 64
  },                                                                                                                 // 64
  hasil: {                                                                                                           // 65
    type: String,                                                                                                    // 65
    optional: true,                                                                                                  // 65
    autoform: {                                                                                                      // 65
      type: 'hidden'                                                                                                 // 65
    }                                                                                                                // 65
  }                                                                                                                  // 65
};                                                                                                                   // 62
schema.obat = {                                                                                                      // 67
  idobat: {                                                                                                          // 68
    type: String,                                                                                                    // 68
    optional: true,                                                                                                  // 68
    autoform: {                                                                                                      // 68
      type: 'hidden'                                                                                                 // 68
    }                                                                                                                // 68
  },                                                                                                                 // 68
  nama: {                                                                                                            // 69
    type: String,                                                                                                    // 69
    autoform: {                                                                                                      // 69
      options: selects.obat                                                                                          // 69
    }                                                                                                                // 69
  },                                                                                                                 // 69
  puyer: {                                                                                                           // 70
    type: String,                                                                                                    // 70
    optional: true                                                                                                   // 70
  },                                                                                                                 // 70
  aturan: {                                                                                                          // 71
    type: Object                                                                                                     // 71
  },                                                                                                                 // 71
  'aturan.kali': {                                                                                                   // 72
    type: Number                                                                                                     // 72
  },                                                                                                                 // 72
  'aturan.dosis': {                                                                                                  // 73
    type: Number                                                                                                     // 73
  },                                                                                                                 // 73
  'aturan.bentuk': {                                                                                                 // 74
    type: Number,                                                                                                    // 74
    autoform: {                                                                                                      // 74
      options: selects.bentuk                                                                                        // 74
    }                                                                                                                // 74
  },                                                                                                                 // 74
  jumlah: {                                                                                                          // 75
    type: Number                                                                                                     // 75
  },                                                                                                                 // 75
  harga: {                                                                                                           // 76
    type: Number,                                                                                                    // 76
    optional: true,                                                                                                  // 76
    autoform: {                                                                                                      // 76
      type: 'hidden'                                                                                                 // 76
    }                                                                                                                // 76
  },                                                                                                                 // 76
  subtotal: {                                                                                                        // 77
    type: Number,                                                                                                    // 77
    optional: true,                                                                                                  // 77
    autoform: {                                                                                                      // 77
      type: 'hidden'                                                                                                 // 77
    }                                                                                                                // 77
  },                                                                                                                 // 77
  hasil: {                                                                                                           // 78
    type: String,                                                                                                    // 78
    optional: true,                                                                                                  // 78
    autoform: {                                                                                                      // 78
      type: 'hidden'                                                                                                 // 78
    }                                                                                                                // 78
  }                                                                                                                  // 78
};                                                                                                                   // 68
schema.rawat = {                                                                                                     // 80
  no_mr: {                                                                                                           // 81
    type: Number                                                                                                     // 81
  },                                                                                                                 // 81
  rawat: {                                                                                                           // 82
    type: Array                                                                                                      // 82
  },                                                                                                                 // 82
  'rawat.$': {                                                                                                       // 83
    type: Object                                                                                                     // 83
  },                                                                                                                 // 83
  'rawat.$.tanggal': {                                                                                               // 84
    type: Date,                                                                                                      // 84
    autoform: {                                                                                                      // 84
      type: 'hidden'                                                                                                 // 84
    }                                                                                                                // 84
  },                                                                                                                 // 84
  'rawat.$.idbayar': {                                                                                               // 85
    type: String,                                                                                                    // 85
    optional: true,                                                                                                  // 85
    autoform: {                                                                                                      // 85
      type: 'hidden'                                                                                                 // 85
    }                                                                                                                // 85
  },                                                                                                                 // 85
  'rawat.$.jenis': {                                                                                                 // 86
    type: String,                                                                                                    // 86
    optional: true,                                                                                                  // 86
    autoform: {                                                                                                      // 86
      type: 'hidden'                                                                                                 // 86
    }                                                                                                                // 86
  },                                                                                                                 // 86
  'rawat.$.cara_bayar': {                                                                                            // 87
    type: Number,                                                                                                    // 87
    autoform: {                                                                                                      // 87
      options: selects.cara_bayar,                                                                                   // 87
      type: 'select-radio-inline'                                                                                    // 87
    }                                                                                                                // 87
  },                                                                                                                 // 87
  'rawat.$.klinik': {                                                                                                // 88
    type: Number,                                                                                                    // 88
    autoform: {                                                                                                      // 88
      options: selects.klinik,                                                                                       // 88
      type: 'select-radio-inline'                                                                                    // 88
    }                                                                                                                // 88
  },                                                                                                                 // 88
  'rawat.$.karcis': {                                                                                                // 89
    type: Number,                                                                                                    // 89
    optional: true,                                                                                                  // 89
    autoform: {                                                                                                      // 89
      options: selects.karcis,                                                                                       // 89
      type: 'select-radio-inline'                                                                                    // 89
    }                                                                                                                // 89
  },                                                                                                                 // 89
  'rawat.$.rujukan': {                                                                                               // 90
    type: Number,                                                                                                    // 90
    optional: true,                                                                                                  // 90
    autoform: {                                                                                                      // 90
      options: selects.rujukan,                                                                                      // 90
      type: 'select-radio-inline'                                                                                    // 90
    }                                                                                                                // 90
  },                                                                                                                 // 90
  'rawat.$.billRegis': {                                                                                             // 91
    type: Boolean,                                                                                                   // 91
    optional: true,                                                                                                  // 91
    autoform: {                                                                                                      // 91
      type: 'hidden'                                                                                                 // 91
    }                                                                                                                // 91
  },                                                                                                                 // 91
  'rawat.$.nobill': {                                                                                                // 92
    type: Number,                                                                                                    // 92
    autoform: {                                                                                                      // 92
      type: 'hidden'                                                                                                 // 92
    }                                                                                                                // 92
  },                                                                                                                 // 92
  'rawat.$.status_bayar': {                                                                                          // 93
    type: Boolean,                                                                                                   // 93
    optional: true,                                                                                                  // 93
    autoform: {                                                                                                      // 93
      type: 'hidden'                                                                                                 // 93
    }                                                                                                                // 93
  },                                                                                                                 // 93
  'rawat.$.anamesa_perawat': {                                                                                       // 94
    type: String,                                                                                                    // 94
    optional: true,                                                                                                  // 94
    autoform: {                                                                                                      // 94
      afFieldInput: {                                                                                                // 94
        type: 'textarea',                                                                                            // 94
        rows: 6                                                                                                      // 94
      }                                                                                                              // 94
    }                                                                                                                // 94
  },                                                                                                                 // 94
  'rawat.$.fisik': {                                                                                                 // 95
    optional: true,                                                                                                  // 95
    type: [new SimpleSchema(schema.fisik)]                                                                           // 95
  },                                                                                                                 // 95
  'rawat.$.anamesa_dokter': {                                                                                        // 96
    type: String,                                                                                                    // 96
    optional: true,                                                                                                  // 96
    autoform: {                                                                                                      // 96
      afFieldInput: {                                                                                                // 96
        type: 'textarea',                                                                                            // 96
        rows: 6                                                                                                      // 96
      }                                                                                                              // 96
    }                                                                                                                // 96
  },                                                                                                                 // 96
  'rawat.$.diagnosa': {                                                                                              // 97
    type: String,                                                                                                    // 97
    optional: true,                                                                                                  // 97
    autoform: {                                                                                                      // 97
      afFieldInput: {                                                                                                // 97
        type: 'textarea',                                                                                            // 97
        rows: 6                                                                                                      // 97
      }                                                                                                              // 97
    }                                                                                                                // 97
  },                                                                                                                 // 97
  'rawat.$.planning': {                                                                                              // 98
    type: String,                                                                                                    // 98
    optional: true,                                                                                                  // 98
    autoform: {                                                                                                      // 98
      afFieldInput: {                                                                                                // 98
        type: 'textarea',                                                                                            // 98
        rows: 6                                                                                                      // 98
      }                                                                                                              // 98
    }                                                                                                                // 98
  },                                                                                                                 // 98
  'rawat.$.tindakan': {                                                                                              // 99
    type: [new SimpleSchema(schema.tindakan)],                                                                       // 99
    optional: true                                                                                                   // 99
  },                                                                                                                 // 99
  'rawat.$.labor': {                                                                                                 // 100
    type: [new SimpleSchema(schema.labor)],                                                                          // 100
    optional: true                                                                                                   // 100
  },                                                                                                                 // 100
  'rawat.$.radio': {                                                                                                 // 101
    type: [new SimpleSchema(schema.radio)],                                                                          // 101
    optional: true                                                                                                   // 101
  },                                                                                                                 // 101
  'rawat.$.obat': {                                                                                                  // 102
    type: [new SimpleSchema(schema.obat)],                                                                           // 102
    optional: true                                                                                                   // 102
  },                                                                                                                 // 102
  'rawat.$.total': {                                                                                                 // 103
    type: Object,                                                                                                    // 103
    optional: true,                                                                                                  // 103
    autoform: {                                                                                                      // 103
      type: 'hidden'                                                                                                 // 103
    }                                                                                                                // 103
  },                                                                                                                 // 103
  'rawat.$.total.tindakan': {                                                                                        // 104
    type: Number,                                                                                                    // 104
    optional: true                                                                                                   // 104
  },                                                                                                                 // 104
  'rawat.$.total.labor': {                                                                                           // 105
    type: Number,                                                                                                    // 105
    optional: true                                                                                                   // 105
  },                                                                                                                 // 105
  'rawat.$.total.radio': {                                                                                           // 106
    type: Number,                                                                                                    // 106
    optional: true                                                                                                   // 106
  },                                                                                                                 // 106
  'rawat.$.total.obat': {                                                                                            // 107
    type: Number,                                                                                                    // 107
    optional: true                                                                                                   // 107
  },                                                                                                                 // 107
  'rawat.$.total.semua': {                                                                                           // 108
    type: Number,                                                                                                    // 108
    optional: true                                                                                                   // 108
  },                                                                                                                 // 108
  'rawat.$.spm': {                                                                                                   // 109
    type: Number,                                                                                                    // 109
    optional: true,                                                                                                  // 109
    autoform: {                                                                                                      // 109
      type: 'hidden'                                                                                                 // 109
    }                                                                                                                // 109
  },                                                                                                                 // 109
  'rawat.$.pindah': {                                                                                                // 110
    type: Number,                                                                                                    // 110
    optional: true,                                                                                                  // 110
    autoform: {                                                                                                      // 110
      options: selects.klinik                                                                                        // 110
    }                                                                                                                // 110
  },                                                                                                                 // 110
  'rawat.$.keluar': {                                                                                                // 111
    type: Number,                                                                                                    // 111
    optional: true,                                                                                                  // 111
    autoform: {                                                                                                      // 111
      options: selects.keluar                                                                                        // 111
    }                                                                                                                // 111
  },                                                                                                                 // 111
  'rawat.$.petugas': {                                                                                               // 112
    type: String,                                                                                                    // 112
    autoform: {                                                                                                      // 112
      type: 'hidden'                                                                                                 // 112
    }                                                                                                                // 112
  }                                                                                                                  // 112
};                                                                                                                   // 81
schema.jalan = _.assign({}, schema.rawat, {});                                                                       // 114
schema.inap = _.assign({}, schema.rawat, {});                                                                        // 115
schema.igd = _.assign({}, schema.rawat, {});                                                                         // 116
schema.gudang = {                                                                                                    // 118
  idbarang: {                                                                                                        // 119
    type: String,                                                                                                    // 120
    autoform: {                                                                                                      // 121
      type: 'hidden'                                                                                                 // 121
    },                                                                                                               // 121
    autoValue: function () {                                                                                         // 122
      return randomId();                                                                                             // 547
    }                                                                                                                // 120
  },                                                                                                                 // 120
  jenis: {                                                                                                           // 123
    type: Number,                                                                                                    // 123
    autoform: {                                                                                                      // 123
      options: selects.barang                                                                                        // 123
    }                                                                                                                // 123
  },                                                                                                                 // 123
  nama: {                                                                                                            // 124
    type: String                                                                                                     // 124
  }                                                                                                                  // 124
};                                                                                                                   // 119
schema.farmasi = _.assign({}, schema.gudang, {                                                                       // 126
  kandungan: {                                                                                                       // 127
    type: String                                                                                                     // 127
  },                                                                                                                 // 127
  satuan: {                                                                                                          // 128
    type: Number,                                                                                                    // 128
    autoform: {                                                                                                      // 128
      options: selects.satuan                                                                                        // 128
    }                                                                                                                // 128
  },                                                                                                                 // 128
  batch: {                                                                                                           // 129
    type: Array                                                                                                      // 129
  },                                                                                                                 // 129
  'batch.$': {                                                                                                       // 130
    type: Object                                                                                                     // 130
  },                                                                                                                 // 130
  'batch.$.idbatch': {                                                                                               // 131
    type: String,                                                                                                    // 132
    autoform: {                                                                                                      // 133
      type: 'hidden'                                                                                                 // 133
    },                                                                                                               // 133
    autoValue: function () {                                                                                         // 134
      return randomId();                                                                                             // 583
    }                                                                                                                // 132
  },                                                                                                                 // 132
  'batch.$.nobatch': {                                                                                               // 135
    type: String                                                                                                     // 135
  },                                                                                                                 // 135
  'batch.$.merek': {                                                                                                 // 136
    type: String                                                                                                     // 136
  },                                                                                                                 // 136
  'batch.$.masuk': {                                                                                                 // 137
    type: Date,                                                                                                      // 137
    autoform: {                                                                                                      // 137
      type: 'pickadate',                                                                                             // 137
      pickadateOptions: {                                                                                            // 137
        selectYears: 150,                                                                                            // 137
        selectMonths: true                                                                                           // 137
      }                                                                                                              // 137
    }                                                                                                                // 137
  },                                                                                                                 // 137
  'batch.$.kadaluarsa': {                                                                                            // 138
    type: Date,                                                                                                      // 138
    autoform: {                                                                                                      // 138
      type: 'pickadate',                                                                                             // 138
      pickadateOptions: {                                                                                            // 138
        selectYears: 150,                                                                                            // 138
        selectMonths: true                                                                                           // 138
      }                                                                                                              // 138
    }                                                                                                                // 138
  },                                                                                                                 // 138
  'batch.$.digudang': {                                                                                              // 139
    type: Number                                                                                                     // 139
  },                                                                                                                 // 139
  'batch.$.diapotik': {                                                                                              // 140
    type: Number                                                                                                     // 140
  },                                                                                                                 // 140
  'batch.$.diretur': {                                                                                               // 141
    type: Boolean,                                                                                                   // 141
    optional: true,                                                                                                  // 141
    autoform: {                                                                                                      // 141
      type: 'hidden'                                                                                                 // 141
    }                                                                                                                // 141
  },                                                                                                                 // 141
  'batch.$.beli': {                                                                                                  // 142
    type: Number,                                                                                                    // 142
    decimal: true                                                                                                    // 142
  },                                                                                                                 // 142
  'batch.$.jual': {                                                                                                  // 143
    type: Number,                                                                                                    // 143
    decimal: true                                                                                                    // 143
  },                                                                                                                 // 143
  'batch.$.suplier': {                                                                                               // 144
    type: String                                                                                                     // 144
  },                                                                                                                 // 144
  'batch.$.returnable': {                                                                                            // 145
    type: Boolean,                                                                                                   // 145
    optional: true                                                                                                   // 145
  },                                                                                                                 // 145
  'batch.$.anggaran': {                                                                                              // 146
    type: Number,                                                                                                    // 146
    autoform: {                                                                                                      // 146
      options: selects.anggaran                                                                                      // 146
    }                                                                                                                // 146
  },                                                                                                                 // 146
  'batch.$.pengadaan': {                                                                                             // 147
    type: Number                                                                                                     // 147
  }                                                                                                                  // 147
});                                                                                                                  // 127
schema.amprah = _.assign({}, schema.gudang, {                                                                        // 149
  amprah: {                                                                                                          // 150
    type: Array                                                                                                      // 150
  },                                                                                                                 // 150
  'amprah.$': {                                                                                                      // 151
    type: Object                                                                                                     // 151
  },                                                                                                                 // 151
  'amprah.$.diminta': {                                                                                              // 152
    type: Number                                                                                                     // 152
  }                                                                                                                  // 152
});                                                                                                                  // 150
schema.logistik = _.assign({}, schema.gudang, {});                                                                   // 154
schema.dokter = {                                                                                                    // 156
  nama: {                                                                                                            // 157
    type: String                                                                                                     // 157
  },                                                                                                                 // 157
  tipe: {                                                                                                            // 158
    type: Number,                                                                                                    // 158
    autoform: {                                                                                                      // 158
      options: selects.tipe_dokter                                                                                   // 158
    }                                                                                                                // 158
  },                                                                                                                 // 158
  poli: {                                                                                                            // 159
    type: Number,                                                                                                    // 159
    autoform: {                                                                                                      // 159
      options: selects.klinik                                                                                        // 159
    }                                                                                                                // 159
  }                                                                                                                  // 159
};                                                                                                                   // 157
schema.tarif = {                                                                                                     // 161
  jenis: {                                                                                                           // 162
    type: String                                                                                                     // 162
  },                                                                                                                 // 162
  nama: {                                                                                                            // 163
    type: String                                                                                                     // 163
  },                                                                                                                 // 163
  harga: {                                                                                                           // 164
    type: Number                                                                                                     // 164
  },                                                                                                                 // 164
  grup: {                                                                                                            // 165
    type: String,                                                                                                    // 165
    optional: true                                                                                                   // 165
  }                                                                                                                  // 165
};                                                                                                                   // 162
                                                                                                                     //
_.map(['dokter', 'tarif'], function (i) {                                                                            // 167
  var obj;                                                                                                           // 168
  obj = {                                                                                                            // 168
    active: {                                                                                                        // 168
      type: Boolean,                                                                                                 // 169
      autoform: {                                                                                                    // 170
        type: 'hidden'                                                                                               // 170
      },                                                                                                             // 170
      autoValue: function () {                                                                                       // 171
        return true;                                                                                                 // 708
      }                                                                                                              // 169
    }                                                                                                                // 169
  };                                                                                                                 // 168
  return _.assign(schema[i], obj);                                                                                   // 712
});                                                                                                                  // 167
                                                                                                                     //
_.map(['pasien', 'gudang', 'dokter', 'tarif'], function (i) {                                                        // 174
  var arr;                                                                                                           // 175
  coll[i] = new Meteor.Collection(i);                                                                                // 175
  arr = ['insert', 'update', 'remove'];                                                                              // 176
  return coll[i].allow(_.zipObject(arr, _.map(arr, function (i) {                                                    // 719
    return function () {                                                                                             // 720
      return true;                                                                                                   // 721
    };                                                                                                               // 177
  })));                                                                                                              // 177
});                                                                                                                  // 174
                                                                                                                     //
_.map(modules.slice(0, 10), function (i) {                                                                           // 179
  return Router.route('/' + i.name + '/:no_mr?', {                                                                   // 727
    name: i.name,                                                                                                    // 181
    action: function () {                                                                                            // 182
      return this.render('pasien');                                                                                  // 730
    },                                                                                                               // 181
    waitOn: function () {                                                                                            // 183
      return _.map(['dokter', 'tarif', 'gudang'], function (j) {                                                     // 733
        return Meteor.subscribe('coll', j, {}, {});                                                                  // 734
      });                                                                                                            // 184
    }                                                                                                                // 181
  });                                                                                                                // 181
});                                                                                                                  // 179
                                                                                                                     //
_.map(modules.slice(10, 12), function (i) {                                                                          // 187
  return Router.route('/' + i.name + '/:idbarang?', {                                                                // 741
    name: i.name,                                                                                                    // 189
    action: function () {                                                                                            // 190
      return this.render('gudang');                                                                                  // 744
    },                                                                                                               // 189
    waitOn: function () {                                                                                            // 191
      return Meteor.subscribe('users', {}, {                                                                         // 747
        fields: {                                                                                                    // 191
          username: 1                                                                                                // 191
        }                                                                                                            // 191
      });                                                                                                            // 191
    }                                                                                                                // 189
  });                                                                                                                // 189
});                                                                                                                  // 187
                                                                                                                     //
_.map(['panduan'], function (i) {                                                                                    // 193
  return Router.route('/' + i, {                                                                                     // 757
    action: function () {                                                                                            // 195
      return this.render(i);                                                                                         // 759
    }                                                                                                                // 195
  });                                                                                                                // 195
});                                                                                                                  // 193
                                                                                                                     //
Router.route('/manajemen', {                                                                                         // 197
  action: function () {                                                                                              // 198
    return this.render('manajemen');                                                                                 // 766
  },                                                                                                                 // 198
  waitOn: function () {                                                                                              // 199
    return [Meteor.subscribe('users', {}, {}), Meteor.subscribe('coll', 'dokter', {}, {}), Meteor.subscribe('coll', 'tarif', {}, {})];
  }                                                                                                                  // 198
});                                                                                                                  // 198
Router.route('/login', function () {                                                                                 // 205
  return {                                                                                                           // 774
    action: function () {                                                                                            // 206
      return this.render('login');                                                                                   // 776
    }                                                                                                                // 206
  };                                                                                                                 // 206
});                                                                                                                  // 205
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"client.coffee.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// client.coffee.js                                                                                                  //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var globalHelpers,                                                                                                   // 1
    indexOf = [].indexOf || function (item) {                                                                        // 1
  for (var i = 0, l = this.length; i < l; i++) {                                                                     // 1
    if (i in this && this[i] === item) return i;                                                                     // 1
  }                                                                                                                  // 1
                                                                                                                     //
  return -1;                                                                                                         // 1
},                                                                                                                   // 1
    slice = [].slice;                                                                                                // 1
                                                                                                                     //
if (Meteor.isClient) {                                                                                               // 1
  Router.onBeforeAction(function () {                                                                                // 3
    if (!Meteor.userId()) {                                                                                          // 4
      return this.render('login');                                                                                   // 8
    } else {                                                                                                         // 4
      return this.next();                                                                                            // 10
    }                                                                                                                // 11
  });                                                                                                                // 3
  Router.onAfterAction(function () {                                                                                 // 5
    var ref;                                                                                                         // 6
    sessNull();                                                                                                      // 6
                                                                                                                     //
    if (ref = currentRoute(), indexOf.call(_.uniq(_.flatMap(_.keys(roles()), function (i) {                          // 7
      return _.find(rights, function (j) {                                                                           // 17
        return j.group === i;                                                                                        // 18
      }).list;                                                                                                       // 9
    })), ref) < 0) {                                                                                                 // 8
      return Router.go('/');                                                                                         // 21
    }                                                                                                                // 22
  });                                                                                                                // 5
  globalHelpers = [['coll', function () {                                                                            // 11
    return coll;                                                                                                     // 27
  }], ['schema', function () {                                                                                       // 12
    return new SimpleSchema(schema[currentRoute()]);                                                                 // 31
  }], ['zeros', function (num) {                                                                                     // 13
    return zeros(num);                                                                                               // 35
  }], ['showForm', function () {                                                                                     // 14
    return Session.get('showForm');                                                                                  // 39
  }], ['hari', function (date) {                                                                                     // 15
    return date && moment(date).format('D MMM YYYY');                                                                // 43
  }], ['rupiah', function (val) {                                                                                    // 16
    return 'Rp ' + numeral(val).format('0,0');                                                                       // 47
  }], ['currentPar', function (param) {                                                                              // 17
    return currentPar(param);                                                                                        // 51
  }], ['stringify', function (obj) {                                                                                 // 18
    return JSON.stringify(obj);                                                                                      // 55
  }], ['startCase', function (val) {                                                                                 // 19
    return _.startCase(val);                                                                                         // 59
  }], ['modules', function () {                                                                                      // 20
    return modules;                                                                                                  // 63
  }], ['reverse', function (arr) {                                                                                   // 21
    return _.reverse(arr);                                                                                           // 67
  }], ['sortBy', function (arr, sel, sort) {                                                                         // 22
    return _.sortBy(arr, function (i) {                                                                              // 71
      return -i.tanggal.getTime();                                                                                   // 72
    });                                                                                                              // 23
  }], ['isTrue', function (a, b) {                                                                                   // 23
    return a === b;                                                                                                  // 77
  }], ['isFalse', function (a, b) {                                                                                  // 24
    return a !== b;                                                                                                  // 81
  }], ['look', function (option, value, field) {                                                                     // 25
    return look(option, value)[field];                                                                               // 85
  }], ['look2', function (option, value, field) {                                                                    // 26
    return look2(option, value)[field];                                                                              // 89
  }], ['routeIs', function (name) {                                                                                  // 27
    return currentRoute() === name;                                                                                  // 93
  }], ['userGroup', function (name) {                                                                                // 28
    return userGroup(name);                                                                                          // 97
  }], ['userRole', function (name) {                                                                                 // 29
    return userRole(name);                                                                                           // 101
  }], ['userName', function (id) {                                                                                   // 30
    return _.startCase(userName(id));                                                                                // 105
  }]];                                                                                                               // 31
                                                                                                                     //
  _.map(globalHelpers, function (i) {                                                                                // 33
    return Template.registerHelper.apply(Template, i);                                                               // 110
  });                                                                                                                // 33
                                                                                                                     //
  Template.body.events({                                                                                             // 35
    'keypress #search': function (event) {                                                                           // 36
      var term;                                                                                                      // 37
                                                                                                                     //
      if (event.key === 'Enter') {                                                                                   // 37
        term = event.target.value;                                                                                   // 38
                                                                                                                     //
        if (term.length > 2) {                                                                                       // 39
          return Session.set('search', term);                                                                        // 118
        }                                                                                                            // 37
      }                                                                                                              // 120
    }                                                                                                                // 36
  });                                                                                                                // 36
  Template.layout.onRendered(function () {                                                                           // 42
    Session.set('limit', 10);                                                                                        // 43
    return Session.set('page', 0);                                                                                   // 125
  });                                                                                                                // 42
  Template.menu.helpers({                                                                                            // 46
    menus: function () {                                                                                             // 47
      return _.initial(_.flatMap(_.keys(roles()), function (i) {                                                     // 129
        var find;                                                                                                    // 49
        find = _.find(rights, function (j) {                                                                         // 49
          return j.group === i;                                                                                      // 132
        });                                                                                                          // 49
        return _.map(find.list, function (j) {                                                                       // 134
          return _.find(modules, function (k) {                                                                      // 135
            return k.name === j;                                                                                     // 136
          });                                                                                                        // 50
        });                                                                                                          // 50
      }));                                                                                                           // 48
    },                                                                                                               // 47
    navTitle: function () {                                                                                          // 51
      var find;                                                                                                      // 52
      find = _.find(modules, function (i) {                                                                          // 52
        return i.name === currentRoute();                                                                            // 144
      });                                                                                                            // 52
      return (find != null ? find.full : void 0) || _.startCase(currentRoute());                                     // 146
    },                                                                                                               // 47
    today: function () {                                                                                             // 54
      return moment().format('LLL');                                                                                 // 149
    }                                                                                                                // 47
  });                                                                                                                // 47
  Template.menu.events({                                                                                             // 56
    'click #logout': function () {                                                                                   // 57
      return Meteor.logout();                                                                                        // 154
    }                                                                                                                // 57
  });                                                                                                                // 57
  Template.pasien.helpers({                                                                                          // 59
    heads: function () {                                                                                             // 60
      return {                                                                                                       // 159
        pasien: ['No MR', 'Nama', 'Orang Tua', 'Alamat', 'Jenis Kelamin', 'Tgl Lahir'],                              // 61
        bayar: ['No MR', 'Nama', 'Tanggal', 'Total Biaya', 'Cara Bayar', 'Klinik', 'Aksi'],                          // 62
        labor: ['No MR', 'Pasien', 'Grup', 'Order', 'Aksi'],                                                         // 63
        radio: ['No MR', 'Pasien', 'Order', 'Aksi'],                                                                 // 64
        obat: ['No MR', 'Pasien', 'Nama Obat', 'Kali', 'Dosis', 'Bentuk', 'Jumlah', 'Serah'],                        // 65
        rawat: ['Tanggal', 'Klinik', 'Cara Bayar', 'Bayar Pendaftaran', 'Bayar Tindakan', 'Cek'],                    // 66
        fisik: ['Tekanan Darah', 'Nadi', 'Suhu', 'Pernapasan', 'Berat', 'Tinggi', 'LILA'],                           // 67
        previewDokter: ['Tindakan', 'Dokter', 'Harga'],                                                              // 68
        previewLabor: ['Grup', 'Order', 'Hasil'],                                                                    // 69
        previewRadio: ['Order', 'Arsip'],                                                                            // 70
        previewObat: ['Nama', 'Dosis', 'Bentuk', 'Kali', 'Jumlah']                                                   // 71
      };                                                                                                             // 61
    },                                                                                                               // 60
    route: function () {                                                                                             // 72
      return currentRoute();                                                                                         // 174
    },                                                                                                               // 60
    formType: function () {                                                                                          // 73
      if (currentRoute() === 'regis') {                                                                              // 74
        if (currentPar('no_mr')) {                                                                                   // 75
          return 'update';                                                                                           // 179
        } else {                                                                                                     // 75
          return 'insert';                                                                                           // 181
        }                                                                                                            // 74
      } else {                                                                                                       // 74
        return 'update-pushArray';                                                                                   // 184
      }                                                                                                              // 185
    },                                                                                                               // 60
    umur: function (date) {                                                                                          // 78
      return moment().diff(date, 'years') + ' tahun';                                                                // 188
    },                                                                                                               // 60
    showButton: function () {                                                                                        // 79
      return Router.current().params.no_mr || currentRoute() === 'regis';                                            // 191
    },                                                                                                               // 60
    showButtonText: function () {                                                                                    // 80
      switch (currentRoute()) {                                                                                      // 81
        case 'regis':                                                                                                // 81
          return '+ Pasien';                                                                                         // 196
                                                                                                                     //
        case 'jalan':                                                                                                // 81
          return '+ Rawat';                                                                                          // 198
      }                                                                                                              // 81
    },                                                                                                               // 60
    formDoc: function () {                                                                                           // 84
      return formDoc();                                                                                              // 202
    },                                                                                                               // 60
    preview: function () {                                                                                           // 85
      return Session.get('preview');                                                                                 // 205
    },                                                                                                               // 60
    omitFields: function () {                                                                                        // 86
      var arr;                                                                                                       // 87
      arr = ['anamesa_perawat', 'fisik', 'anamesa_dokter', 'diagnosa', 'planning', 'tindakan', 'labor', 'radio', 'obat', 'spm', 'keluar', 'pindah'];
                                                                                                                     //
      if (!(formDoc() && formDoc().billRegis)) {                                                                     // 88
        return arr;                                                                                                  // 211
      } else if (_.split(Meteor.user().username, '.')[0] !== 'dr') {                                                 // 88
        return arr.slice(2, +arr.length + 1 || 9e9);                                                                 // 213
      }                                                                                                              // 214
    },                                                                                                               // 60
    roleFilter: function (arr) {                                                                                     // 92
      return _.reverse(_.filter(arr, function (i) {                                                                  // 217
        var find;                                                                                                    // 93
        find = _.find(selects.klinik, function (j) {                                                                 // 93
          return j.label === _.startCase(roles().jalan[0]);                                                          // 220
        });                                                                                                          // 93
        return i.klinik === find.value;                                                                              // 222
      }));                                                                                                           // 92
    },                                                                                                               // 60
    userPoli: function () {                                                                                          // 96
      return roles().jalan;                                                                                          // 226
    },                                                                                                               // 60
    insurance: function (val) {                                                                                      // 97
      return 'Rp ' + numeral(val + 30000).format('0,0');                                                             // 229
    },                                                                                                               // 60
    selPol: function () {                                                                                            // 98
      return _.map(roles().jalan, function (i) {                                                                     // 232
        return _.find(selects.klinik, function (j) {                                                                 // 233
          return i === _.snakeCase(j.label);                                                                         // 234
        });                                                                                                          // 99
      });                                                                                                            // 98
    },                                                                                                               // 60
    pasiens: function () {                                                                                           // 100
      var arr, byName, byNoMR, elem, filter, kliniks, now, options, past, ref, ref1, selSub, selector, sub;          // 101
                                                                                                                     //
      if (currentPar('no_mr')) {                                                                                     // 101
        selector = {                                                                                                 // 102
          no_mr: parseInt(currentPar('no_mr'))                                                                       // 102
        };                                                                                                           // 102
        options = {                                                                                                  // 103
          fields: {                                                                                                  // 103
            no_mr: 1,                                                                                                // 103
            regis: 1                                                                                                 // 103
          }                                                                                                          // 103
        };                                                                                                           // 103
        arr = ['bayar', 'jalan', 'labor', 'radio', 'obat'];                                                          // 104
                                                                                                                     //
        if (ref = currentRoute(), indexOf.call(arr, ref) >= 0) {                                                     // 105
          options.fields.rawat = 1;                                                                                  // 105
        }                                                                                                            // 253
                                                                                                                     //
        sub = Meteor.subscribe('coll', 'pasien', selector, options);                                                 // 106
                                                                                                                     //
        if (sub.ready()) {                                                                                           // 107
          return coll.pasien.findOne();                                                                              // 256
        }                                                                                                            // 101
      } else if (search()) {                                                                                         // 101
        byName = {                                                                                                   // 109
          'regis.nama_lengkap': {                                                                                    // 109
            $options: '-i',                                                                                          // 109
            $regex: '.*' + search() + '.*'                                                                           // 109
          }                                                                                                          // 109
        };                                                                                                           // 109
        byNoMR = {                                                                                                   // 110
          no_mr: parseInt(search())                                                                                  // 110
        };                                                                                                           // 110
        selector = {                                                                                                 // 111
          $or: [byName, byNoMR]                                                                                      // 111
        };                                                                                                           // 111
        options = {                                                                                                  // 112
          fields: {                                                                                                  // 112
            no_mr: 1,                                                                                                // 112
            regis: 1                                                                                                 // 112
          }                                                                                                          // 112
        };                                                                                                           // 112
        sub = Meteor.subscribe('coll', 'pasien', selector, options);                                                 // 113
                                                                                                                     //
        if (sub.ready()) {                                                                                           // 114
          return coll.pasien.find().fetch();                                                                         // 279
        }                                                                                                            // 108
      } else if (roles().jalan) {                                                                                    // 108
        now = new Date();                                                                                            // 116
        past = new Date(now.getDate() - 2);                                                                          // 116
        kliniks = _.map(roles().jalan, function (i) {                                                                // 117
          var find;                                                                                                  // 118
          find = _.find(selects.klinik, function (j) {                                                               // 118
            return i === _.snakeCase(j.label);                                                                       // 287
          });                                                                                                        // 118
          return find.value;                                                                                         // 289
        });                                                                                                          // 117
        selector = {                                                                                                 // 120
          rawat: {                                                                                                   // 120
            $elemMatch: {                                                                                            // 120
              klinik: {                                                                                              // 121
                $in: kliniks                                                                                         // 121
              },                                                                                                     // 121
              tanggal: {                                                                                             // 122
                $gt: past                                                                                            // 122
              }                                                                                                      // 122
            }                                                                                                        // 121
          }                                                                                                          // 120
        };                                                                                                           // 120
        sub = Meteor.subscribe('coll', 'pasien', selector, {});                                                      // 123
                                                                                                                     //
        if (sub.ready()) {                                                                                           // 124
          filter = _.filter(coll.pasien.find().fetch(), function (i) {                                               // 125
            var a, b, c, selPol;                                                                                     // 126
                                                                                                                     //
            a = function () {                                                                                        // 126
              var ref1;                                                                                              // 126
              return ref1 = i.rawat[i.rawat.length - 1].klinik, indexOf.call(kliniks, ref1) >= 0;                    // 309
            };                                                                                                       // 126
                                                                                                                     //
            b = function () {                                                                                        // 127
              return !i.rawat[i.rawat.length - 1].total.semua;                                                       // 312
            };                                                                                                       // 127
                                                                                                                     //
            selPol = Session.get('selPol');                                                                          // 128
                                                                                                                     //
            c = function () {                                                                                        // 129
              return i.rawat[i.rawat.length - 1].klinik === selPol;                                                  // 316
            };                                                                                                       // 129
                                                                                                                     //
            if (selPol) {                                                                                            // 130
              return b() && c();                                                                                     // 319
            } else {                                                                                                 // 130
              return a() && b();                                                                                     // 321
            }                                                                                                        // 322
          });                                                                                                        // 125
          return _.sortBy(filter, function (i) {                                                                     // 324
            return i.rawat[i.rawat.length - 1].tanggal;                                                              // 325
          });                                                                                                        // 131
        }                                                                                                            // 115
      } else if (currentRoute() === 'bayar') {                                                                       // 115
        selector = {                                                                                                 // 133
          rawat: {                                                                                                   // 133
            $elemMatch: {                                                                                            // 133
              $or: [{                                                                                                // 133
                'status_bayar': {                                                                                    // 133
                  $ne: true                                                                                          // 133
                }                                                                                                    // 133
              }]                                                                                                     // 133
            }                                                                                                        // 133
          }                                                                                                          // 133
        };                                                                                                           // 133
        sub = Meteor.subscribe('coll', 'pasien', selector, {});                                                      // 134
                                                                                                                     //
        if (sub.ready()) {                                                                                           // 135
          return coll.pasien.find().fetch();                                                                         // 344
        }                                                                                                            // 132
      } else if ((ref1 = currentRoute()) === 'labor' || ref1 === 'radio' || ref1 === 'obat') {                       // 132
        elem = {                                                                                                     // 137
          'status_bayar': true                                                                                       // 137
        };                                                                                                           // 137
        elem[currentRoute()] = {                                                                                     // 138
          $exists: true,                                                                                             // 138
          $elemMatch: {                                                                                              // 138
            hasil: {                                                                                                 // 138
              $exists: false                                                                                         // 138
            }                                                                                                        // 138
          }                                                                                                          // 138
        };                                                                                                           // 138
        selSub = {                                                                                                   // 139
          rawat: {                                                                                                   // 139
            $elemMatch: elem                                                                                         // 139
          }                                                                                                          // 139
        };                                                                                                           // 139
        sub = Meteor.subscribe('coll', 'pasien', selSub, {});                                                        // 140
                                                                                                                     //
        if (sub.ready()) {                                                                                           // 141
          return coll.pasien.find().fetch();                                                                         // 365
        }                                                                                                            // 136
      }                                                                                                              // 367
    }                                                                                                                // 60
  });                                                                                                                // 60
  Template.pasien.events({                                                                                           // 143
    'click #showForm': function () {                                                                                 // 144
      var later;                                                                                                     // 145
      Session.set('showForm', !Session.get('showForm'));                                                             // 145
                                                                                                                     //
      if (userGroup('regis')) {                                                                                      // 146
        Session.set('formDoc', null);                                                                                // 146
      }                                                                                                              // 376
                                                                                                                     //
      later = function () {                                                                                          // 147
        var list;                                                                                                    // 148
        $('.autoform-remove-item').trigger('click');                                                                 // 148
                                                                                                                     //
        if (currentRoute() === 'jalan') {                                                                            // 149
          _.map(['cara_bayar', 'klinik', 'karcis', 'rujukan'], function (i) {                                        // 150
            $('div[data-schema-key="' + i + '"]').prepend(tag('p', _.startCase(i)));                                 // 151
                                                                                                                     //
            if (formDoc()) {                                                                                         // 152
              $('input[name="' + i + '"][value="' + formDoc()[i] + '"]').attr({                                      // 153
                checked: true                                                                                        // 153
              });                                                                                                    // 153
              return $('input[name="' + i + '"]').attr({                                                             // 387
                disabled: 'disabled'                                                                                 // 154
              });                                                                                                    // 154
            }                                                                                                        // 390
          });                                                                                                        // 150
                                                                                                                     //
          _.map(['anamesa_perawat'], function (i) {                                                                  // 155
            return $('textarea[name="' + i + '"]').val(formDoc()[i]);                                                // 393
          });                                                                                                        // 155
        }                                                                                                            // 395
                                                                                                                     //
        list = ['cara_bayar', 'kelamin', 'agama', 'nikah', 'pendidikan', 'darah', 'pekerjaan'];                      // 157
                                                                                                                     //
        if (currentRoute() === 'regis') {                                                                            // 158
          return _.map(list, function (i) {                                                                          // 398
            return $('div[data-schema-key="regis.' + i + '"]').prepend(tag('p', _.startCase(i)));                    // 399
          });                                                                                                        // 158
        }                                                                                                            // 401
      };                                                                                                             // 147
                                                                                                                     //
      Meteor.setTimeout(later, 1000);                                                                                // 160
      Meteor.subscribe('coll', 'gudang', {}, {});                                                                    // 161
      return Session.set('begin', moment());                                                                         // 405
    },                                                                                                               // 144
    'dblclick #row': function () {                                                                                   // 163
      return Router.go('/' + currentRoute() + '/' + this.no_mr);                                                     // 408
    },                                                                                                               // 144
    'click #close': function () {                                                                                    // 165
      sessNull();                                                                                                    // 165
      return Router.go(currentRoute());                                                                              // 412
    },                                                                                                               // 144
    'click #card': function () {                                                                                     // 166
      var dialog;                                                                                                    // 167
      dialog = {                                                                                                     // 167
        title: 'Cetak Kartu',                                                                                        // 168
        message: 'Yakin untuk cetak kartu ini?'                                                                      // 169
      };                                                                                                             // 168
      return new Confirmation(dialog, function (ok) {                                                                // 420
        if (ok) {                                                                                                    // 170
          return makePdf.card();                                                                                     // 422
        }                                                                                                            // 423
      });                                                                                                            // 170
    },                                                                                                               // 144
    'click #consent': function () {                                                                                  // 173
      var dialog;                                                                                                    // 174
      dialog = {                                                                                                     // 174
        title: 'Cetak General Consent',                                                                              // 175
        message: 'Yakin untuk cetak persetujuan pasien?'                                                             // 176
      };                                                                                                             // 175
      return new Confirmation(dialog, function (ok) {                                                                // 432
        if (ok) {                                                                                                    // 177
          return makePdf.consent();                                                                                  // 434
        }                                                                                                            // 435
      });                                                                                                            // 177
    },                                                                                                               // 144
    'dblclick #bill': function (event) {                                                                             // 178
      var dialog, nodes;                                                                                             // 179
      nodes = _.map(['pasien', 'idbayar', 'karcis'], function (i) {                                                  // 179
        return event.target.attributes[i].nodeValue;                                                                 // 441
      });                                                                                                            // 179
      dialog = {                                                                                                     // 181
        title: 'Pembayaran Pendaftaran',                                                                             // 182
        message: 'Apakah yakin pasien sudah membayar?'                                                               // 183
      };                                                                                                             // 182
      return new Confirmation(dialog, function (ok) {                                                                // 447
        if (ok) {                                                                                                    // 184
          if (nodes[1]) {                                                                                            // 185
            Meteor.call.apply(Meteor, ['billRegis'].concat(slice.call(nodes.slice(0, 2)), [true]));                  // 186
            return makePdf.payRegCard(nodes[0], nodes[2], '...');                                                    // 451
          } else {                                                                                                   // 185
            Meteor.call('billCard', nodes[0], false);                                                                // 189
            return makePdf.payRegCard(10000, 'Sepuluh Ribu Rupiah');                                                 // 454
          }                                                                                                          // 184
        }                                                                                                            // 456
      });                                                                                                            // 184
    },                                                                                                               // 144
    'dblclick #bayar': function (event) {                                                                            // 191
      var dialog, nodes;                                                                                             // 192
      nodes = _.map(['pasien', 'idbayar'], function (i) {                                                            // 192
        return event.target.attributes[i].nodeValue;                                                                 // 462
      });                                                                                                            // 192
      dialog = {                                                                                                     // 194
        title: 'Konfirmasi Pembayaran',                                                                              // 195
        message: 'Apakah yakin tagihan ini sudah dibayar?'                                                           // 196
      };                                                                                                             // 195
      return new Confirmation(dialog, function (ok) {                                                                // 468
        var doc, pasien;                                                                                             // 197
                                                                                                                     //
        if (ok) {                                                                                                    // 197
          Meteor.call.apply(Meteor, ['bayar'].concat(slice.call(nodes)));                                            // 198
          pasien = coll.pasien.findOne({                                                                             // 199
            no_mr: parseInt(nodes[0])                                                                                // 199
          });                                                                                                        // 199
          doc = _.find(pasien.rawat, function (i) {                                                                  // 200
            return i.idbayar === nodes[1];                                                                           // 476
          });                                                                                                        // 200
          return makePdf.payRawat(nodes[0], doc);                                                                    // 478
        }                                                                                                            // 479
      });                                                                                                            // 197
    },                                                                                                               // 144
    'dblclick #request': function (event) {                                                                          // 202
      var nodes;                                                                                                     // 203
      nodes = _.map(['pasien', 'idbayar', 'jenis', 'idjenis'], function (i) {                                        // 203
        return event.target.attributes[i].nodeValue;                                                                 // 485
      });                                                                                                            // 203
      return MaterializeModal.prompt({                                                                               // 487
        message: 'Isikan data requestnya',                                                                           // 206
        callback: function (err, res) {                                                                              // 207
          var params;                                                                                                // 207
                                                                                                                     //
          if (res.submit) {                                                                                          // 207
            params = ['request'].concat(slice.call(nodes), [res.value]);                                             // 208
            return Meteor.call.apply(Meteor, slice.call(params).concat([function (err, res) {                        // 493
              var flat, key, message, rekap, val;                                                                    // 209
                                                                                                                     //
              if (res) {                                                                                             // 209
                message = '';                                                                                        // 210
                                                                                                                     //
                for (key in meteorBabelHelpers.sanitizeForInObject(res)) {                                           // 211
                  val = res[key];                                                                                    // 498
                  message += tag('p', key + ': ' + val);                                                             // 212
                }                                                                                                    // 211
                                                                                                                     //
                MaterializeModal.message({                                                                           // 213
                  title: 'Penyerahan Obat',                                                                          // 214
                  message: message                                                                                   // 215
                });                                                                                                  // 214
                rekap = Session.get('rekap') || [];                                                                  // 216
                flat = _.flatten(_.toPairs(res));                                                                    // 217
                return Session.set('rekap', slice.call(rekap).concat([slice.call(nodes).concat(slice.call(flat))]));
              }                                                                                                      // 508
            }]));                                                                                                    // 209
          }                                                                                                          // 510
        }                                                                                                            // 206
      });                                                                                                            // 206
    },                                                                                                               // 144
    'dblclick #rekap': function () {                                                                                 // 219
      var headers;                                                                                                   // 220
      headers = ['Pasien', 'ID Bayar', 'Jenis', 'ID Request', 'No Batch', 'Jumlah'];                                 // 220
      makePdf.rekap([headers].concat(slice.call(Session.get('rekap'))));                                             // 221
      return Session.set('rekap', null);                                                                             // 518
    },                                                                                                               // 144
    'click .modal-trigger': function (event) {                                                                       // 223
      if (this.idbayar) {                                                                                            // 224
        Session.set('formDoc', this);                                                                                // 225
        Session.set('preview', modForm(this, this.idbayar));                                                         // 226
      }                                                                                                              // 524
                                                                                                                     //
      return $('#preview').modal('open');                                                                            // 525
    },                                                                                                               // 144
    'click #rmRawat': function () {                                                                                  // 228
      var dialog, self;                                                                                              // 229
      self = this;                                                                                                   // 229
      dialog = {                                                                                                     // 230
        title: 'Konfirmasi Hapus',                                                                                   // 231
        message: 'Apakah yakin hapus data rawat pasien ini?'                                                         // 232
      };                                                                                                             // 231
      return new Confirmation(dialog, function (ok) {                                                                // 534
        if (ok) {                                                                                                    // 233
          return Meteor.call('rmRawat', currentPar('no_mr'), self.idbayar);                                          // 536
        }                                                                                                            // 537
      });                                                                                                            // 233
    },                                                                                                               // 144
    'change #selPol': function (event) {                                                                             // 235
      return Session.set('selPol', parseInt(event.target.id));                                                       // 541
    },                                                                                                               // 144
    'click #rmPasien': function () {                                                                                 // 237
      var dialog;                                                                                                    // 238
      dialog = {                                                                                                     // 238
        title: 'Hapus Pasien',                                                                                       // 239
        message: 'Apakah yakin untuk menghapus pasien?'                                                              // 240
      };                                                                                                             // 239
      return new Confirmation(dialog, function (ok) {                                                                // 549
        if (ok) {                                                                                                    // 241
          Meteor.call('rmPasien', currentPar('no_mr'));                                                              // 242
          return Router.go('/' + currentRoute());                                                                    // 552
        }                                                                                                            // 553
      });                                                                                                            // 241
    }                                                                                                                // 144
  });                                                                                                                // 144
  Template["import"].events({                                                                                        // 245
    'change :file': function (event, template) {                                                                     // 246
      return Papa.parse(event.target.files[0], {                                                                     // 559
        header: true,                                                                                                // 248
        step: function (result) {                                                                                    // 249
          var data, modifier, selector;                                                                              // 250
          data = result.data[0];                                                                                     // 250
                                                                                                                     //
          if (currentRoute() === 'regis') {                                                                          // 251
            selector = {                                                                                             // 252
              no_mr: parseInt(data.no_mr)                                                                            // 252
            };                                                                                                       // 252
            modifier = {                                                                                             // 253
              regis: {                                                                                               // 253
                nama_lengkap: _.startCase(data.nama_lengkap),                                                        // 254
                alamat: _.startCase(data.alamat),                                                                    // 255
                agama: data.agama ? parseInt(data.agama) : void 0,                                                   // 256
                ayah: data.ayah ? _.startCase(data.ayah) : void 0,                                                   // 257
                nikah: data.nikah ? parseInt(data.nikah) : void 0,                                                   // 258
                pekerjaan: data.pekerjaan ? parseInt(data.pekerjaan) : void 0,                                       // 259
                pendidikan: data.pendidikan ? parseInt(data.pendidikan) : void 0,                                    // 260
                tgl_lahir: Date.parse(data.tgl_lahir) ? new Date(date.tgl_lahir) : void 0,                           // 261
                tmpt_kelahiran: data.tmpt_kelahiran ? _.startCase(data.tmpt_kelahiran) : void 0                      // 262
              }                                                                                                      // 254
            };                                                                                                       // 253
            return Meteor.call('import', 'pasien', selector, modifier);                                              // 581
          } else if (currentRoute() === 'manajemen') {                                                               // 251
            if (data.tipe) {                                                                                         // 265
              selector = {                                                                                           // 266
                nama: data.nama                                                                                      // 266
              };                                                                                                     // 266
              modifier = {                                                                                           // 267
                tipe: parseInt(data.tipe),                                                                           // 268
                poli: parseInt(data.poli),                                                                           // 269
                active: true                                                                                         // 270
              };                                                                                                     // 268
              return Meteor.call('import', 'dokter', selector, modifier);                                            // 592
            } else if (data.harga) {                                                                                 // 265
              selector = {                                                                                           // 273
                nama: _.snakeCase(data.nama)                                                                         // 273
              };                                                                                                     // 273
              modifier = {                                                                                           // 274
                harga: parseInt(data.harga),                                                                         // 275
                jenis: _.snakeCase(data.jenis),                                                                      // 276
                active: true                                                                                         // 277
              };                                                                                                     // 275
              data.grup && (modifier.grup = _.startCase(data.grup));                                                 // 278
              return Meteor.call('import', 'tarif', selector, modifier);                                             // 603
            } else if (data.password) {                                                                              // 272
              Meteor.call('newUser', data);                                                                          // 281
              return Meteor.call('addRole', data.username, [data.role], data.group);                                 // 606
            }                                                                                                        // 264
          } else if (currentRoute() === 'farmasi') {                                                                 // 264
            selector = {                                                                                             // 284
              nama: data.nama                                                                                        // 284
            };                                                                                                       // 284
            modifier = {                                                                                             // 285
              jenis: parseInt(data.jenis),                                                                           // 286
              idbarang: randomId(),                                                                                  // 287
              batch: [{                                                                                              // 288
                idbatch: randomId(),                                                                                 // 289
                anggaran: data.anggaran,                                                                             // 290
                beli: parseInt(data.beli),                                                                           // 291
                diapotik: parseInt(data.diapotik),                                                                   // 292
                digudang: parseInt(data.digudang),                                                                   // 293
                jenis: parseInt(data.jenis),                                                                         // 294
                jual: parseInt(data.jual),                                                                           // 295
                kadaluarsa: new Date(data.kadaluarsa),                                                               // 296
                masuk: new Date(data.masuk),                                                                         // 297
                merek: data.merek || '',                                                                             // 298
                nobatch: data.nobatch,                                                                               // 299
                pengadaan: parseInt(data.pengadaan),                                                                 // 300
                satuan: parseInt(data.satuan),                                                                       // 301
                suplier: data.suplier                                                                                // 302
              }]                                                                                                     // 289
            };                                                                                                       // 286
            return data.nama && Meteor.call('import', 'gudang', selector, modifier, 'batch');                        // 634
          }                                                                                                          // 635
        }                                                                                                            // 248
      });                                                                                                            // 248
    }                                                                                                                // 246
  });                                                                                                                // 246
  Template["export"].onRendered(function () {                                                                        // 306
    return $('select#export').material_select();                                                                     // 641
  });                                                                                                                // 306
  Template["export"].events({                                                                                        // 309
    'click #export': function () {                                                                                   // 310
      var select;                                                                                                    // 311
      select = $('select#export').val();                                                                             // 311
      return Meteor.call('export', select, function (err, content) {                                                 // 647
        var blob;                                                                                                    // 312
                                                                                                                     //
        if (content) {                                                                                               // 312
          blob = new Blob([content], {                                                                               // 313
            type: 'text/plain;charset=utf-8'                                                                         // 313
          });                                                                                                        // 313
          return saveAs(blob, select + '.csv');                                                                      // 653
        }                                                                                                            // 654
      });                                                                                                            // 312
    }                                                                                                                // 310
  });                                                                                                                // 310
  Template.gudang.helpers({                                                                                          // 316
    heads: function () {                                                                                             // 317
      return {                                                                                                       // 660
        barang: ['Jenis Barang', 'Nama Barang', 'Stok Gudang', 'Stok Apotik'],                                       // 318
        batch: ['No Batch', 'Masuk', 'Kadaluarsa', 'Beli', 'Jual', 'Di Gudang', 'Di Apotik', 'Suplier'],             // 319
        amprah: ['Ruangan', 'Peminta', 'Meminta', 'Penyerah', 'Menyerahkan', 'Tanggal']                              // 320
      };                                                                                                             // 318
    },                                                                                                               // 317
    formType: function () {                                                                                          // 321
      if (currentPar('idbarang')) {                                                                                  // 321
        return 'update-pushArray';                                                                                   // 668
      } else {                                                                                                       // 321
        return 'insert';                                                                                             // 670
      }                                                                                                              // 671
    },                                                                                                               // 317
    warning: function (date) {                                                                                       // 322
      switch (false) {                                                                                               // 322
        case !(monthDiff(date) < 2):                                                                                 // 322
          return 'red';                                                                                              // 676
                                                                                                                     //
        case !(monthDiff(date) < 7):                                                                                 // 322
          return 'orange';                                                                                           // 678
                                                                                                                     //
        case !(monthDiff(date) < 13):                                                                                // 322
          return 'yellow';                                                                                           // 680
                                                                                                                     //
        default:                                                                                                     // 322
          return 'green';                                                                                            // 682
      }                                                                                                              // 322
    },                                                                                                               // 317
    gudangs: function () {                                                                                           // 327
      var aggr, byBatch, byName, selector, sub;                                                                      // 328
                                                                                                                     //
      aggr = function (i) {                                                                                          // 328
        return _.map(i, function (j) {                                                                               // 688
          var reduced;                                                                                               // 329
                                                                                                                     //
          reduced = function (name) {                                                                                // 329
            return _.reduce(j.batch, function (sum, n) {                                                             // 691
              return sum + n[name];                                                                                  // 692
            }, 0);                                                                                                   // 329
          };                                                                                                         // 329
                                                                                                                     //
          j.akumulasi = {                                                                                            // 330
            digudang: reduced('digudang'),                                                                           // 330
            diapotik: reduced('diapotik')                                                                            // 330
          };                                                                                                         // 330
          return j;                                                                                                  // 699
        });                                                                                                          // 328
      };                                                                                                             // 328
                                                                                                                     //
      if (currentPar('idbarang')) {                                                                                  // 332
        selector = {                                                                                                 // 333
          idbarang: currentPar('idbarang')                                                                           // 333
        };                                                                                                           // 333
        sub = Meteor.subscribe('coll', 'gudang', selector, {});                                                      // 334
                                                                                                                     //
        if (sub.ready()) {                                                                                           // 335
          return coll.gudang.findOne();                                                                              // 708
        }                                                                                                            // 332
      } else if (search()) {                                                                                         // 332
        byName = {                                                                                                   // 337
          nama: {                                                                                                    // 337
            $options: '-i',                                                                                          // 337
            $regex: '.*' + search() + '.*'                                                                           // 337
          }                                                                                                          // 337
        };                                                                                                           // 337
        byBatch = {                                                                                                  // 338
          idbatch: search()                                                                                          // 338
        };                                                                                                           // 338
        selector = {                                                                                                 // 339
          $or: [byName, byBatch]                                                                                     // 339
        };                                                                                                           // 339
        sub = Meteor.subscribe('coll', 'gudang', selector, {});                                                      // 340
        return sub.ready() && aggr(coll.gudang.find().fetch());                                                      // 724
      } else {                                                                                                       // 336
        sub = Meteor.subscribe('coll', 'gudang', {}, {});                                                            // 343
        return sub.ready() && aggr(coll.gudang.find().fetch());                                                      // 727
      }                                                                                                              // 728
    },                                                                                                               // 317
    nearEds: function () {                                                                                           // 345
      return Session.get('nearEds');                                                                                 // 731
    },                                                                                                               // 317
    addAmprah: function () {                                                                                         // 346
      return Session.get('addAmprah');                                                                               // 734
    },                                                                                                               // 317
    schemaAmprah: function () {                                                                                      // 347
      return new SimpleSchema(schema.amprah);                                                                        // 737
    }                                                                                                                // 317
  });                                                                                                                // 317
  Template.gudang.events({                                                                                           // 349
    'click #showForm': function () {                                                                                 // 350
      return Session.set('showForm', !Session.get('showForm'));                                                      // 742
    },                                                                                                               // 350
    'dblclick #row': function () {                                                                                   // 352
      return Router.go('/' + currentRoute() + '/' + this.idbarang);                                                  // 745
    },                                                                                                               // 350
    'dblclick #transfer': function () {                                                                              // 353
      var data;                                                                                                      // 354
      data = this;                                                                                                   // 354
                                                                                                                     //
      if (roles().farmasi) {                                                                                         // 355
        return MaterializeModal.prompt({                                                                             // 751
          message: 'Transfer Gudang > Apotek',                                                                       // 357
          callback: function (err, res) {                                                                            // 358
            if (res.submit) {                                                                                        // 358
              return Meteor.call('transfer', currentPar('idbarang'), data.idbatch, parseInt(res.value));             // 755
            }                                                                                                        // 756
          }                                                                                                          // 357
        });                                                                                                          // 357
      }                                                                                                              // 759
    },                                                                                                               // 350
    'click #rmBarang': function () {                                                                                 // 360
      var dialog, self;                                                                                              // 361
      self = this;                                                                                                   // 361
      dialog = {                                                                                                     // 362
        title: 'Hapus Jenis Obat',                                                                                   // 363
        message: 'Apakah yakin untuk hapus jenis obat ini dari sistem?'                                              // 364
      };                                                                                                             // 363
      return new Confirmation(dialog, function (ok) {                                                                // 768
        if (ok) {                                                                                                    // 365
          return Meteor.call('rmBarang', self.idbarang);                                                             // 770
        }                                                                                                            // 771
      });                                                                                                            // 365
    },                                                                                                               // 350
    'click #rmBatch': function () {                                                                                  // 367
      var dialog, self;                                                                                              // 368
      self = this;                                                                                                   // 368
      dialog = {                                                                                                     // 369
        title: 'Yakin?',                                                                                             // 369
        message: 'Hapus 1 batch ini'                                                                                 // 369
      };                                                                                                             // 369
      return new Confirmation(dialog, function (ok) {                                                                // 781
        if (ok) {                                                                                                    // 370
          return Meteor.call('rmBatch', currentPar('idbarang'), self.idbatch);                                       // 783
        }                                                                                                            // 784
      });                                                                                                            // 370
    },                                                                                                               // 350
    'click #nearEds': function () {                                                                                  // 372
      var returnable;                                                                                                // 373
      Session.set('nearEds', null);                                                                                  // 373
      returnable = $('#returnable').is(':checked');                                                                  // 374
      return Meteor.call('nearEds', returnable, function (err, res) {                                                // 791
        if (res) {                                                                                                   // 376
          return Session.set('nearEds', res);                                                                        // 793
        }                                                                                                            // 794
      });                                                                                                            // 375
    },                                                                                                               // 350
    'dblclick #nearEd': function () {                                                                                // 377
      var dialog, self;                                                                                              // 378
      self = this;                                                                                                   // 378
      dialog = {                                                                                                     // 379
        title: 'Karantina?',                                                                                         // 379
        message: 'Pindahkan ke karantina'                                                                            // 379
      };                                                                                                             // 379
      return new Confirmation(dialog, function (ok) {                                                                // 804
        if (ok) {                                                                                                    // 380
          return Meteor.call('returBatch', self);                                                                    // 806
        }                                                                                                            // 807
      });                                                                                                            // 380
    },                                                                                                               // 350
    'click #addAmprah': function () {                                                                                // 382
      if (!userGroup('farmasi')) {                                                                                   // 383
        return Session.set('addAmprah', !Session.get('addAmprah'));                                                  // 812
      }                                                                                                              // 813
    },                                                                                                               // 350
    'dblclick #amprah': function () {                                                                                // 385
      var self;                                                                                                      // 386
                                                                                                                     //
      if (userGroup('farmasi')) {                                                                                    // 386
        if (!this.diserah) {                                                                                         // 387
          self = this;                                                                                               // 388
          return MaterializeModal.prompt({                                                                           // 820
            message: 'Jumlah diserahkan',                                                                            // 390
            callback: function (err, res) {                                                                          // 391
              if (res.submit) {                                                                                      // 391
                return Meteor.call('amprah', currentPar('idbarang'), self.idamprah, parseInt(res.value));            // 824
              }                                                                                                      // 825
            }                                                                                                        // 390
          });                                                                                                        // 390
        }                                                                                                            // 386
      }                                                                                                              // 829
    }                                                                                                                // 350
  });                                                                                                                // 350
  Template.manajemen.helpers({                                                                                       // 394
    users: function () {                                                                                             // 395
      return Meteor.users.find().fetch();                                                                            // 834
    },                                                                                                               // 395
    onUser: function () {                                                                                            // 396
      return Session.get('onUser');                                                                                  // 837
    },                                                                                                               // 395
    selRoles: function () {                                                                                          // 397
      return ['petugas', 'admin'];                                                                                   // 840
    },                                                                                                               // 395
    klinik: function () {                                                                                            // 398
      return selects.klinik;                                                                                         // 843
    },                                                                                                               // 395
    schemadokter: function () {                                                                                      // 399
      return new SimpleSchema(schema.dokter);                                                                        // 846
    },                                                                                                               // 395
    schematarif: function () {                                                                                       // 400
      return new SimpleSchema(schema.tarif);                                                                         // 849
    },                                                                                                               // 395
    dokters: function () {                                                                                           // 401
      var options, selector;                                                                                         // 402
      selector = {                                                                                                   // 402
        active: true                                                                                                 // 402
      };                                                                                                             // 402
      options = {                                                                                                    // 403
        limit: limit(),                                                                                              // 403
        skip: page() * limit()                                                                                       // 403
      };                                                                                                             // 403
      return coll.dokter.find(selector, options).fetch();                                                            // 860
    },                                                                                                               // 395
    tarifs: function () {                                                                                            // 405
      var options, selector;                                                                                         // 406
      selector = {                                                                                                   // 406
        active: true                                                                                                 // 406
      };                                                                                                             // 406
      options = {                                                                                                    // 407
        limit: limit(),                                                                                              // 407
        skip: page() * limit()                                                                                       // 407
      };                                                                                                             // 407
      return coll.tarif.find(selector, options).fetch();                                                             // 871
    }                                                                                                                // 395
  });                                                                                                                // 395
  Template.manajemen.events({                                                                                        // 410
    'submit #userForm': function (event) {                                                                           // 411
      var doc, group, onUser, poli, repeat, role, theRole;                                                           // 412
      event.preventDefault();                                                                                        // 412
      onUser = Session.get('onUser');                                                                                // 413
                                                                                                                     //
      if (!onUser) {                                                                                                 // 414
        doc = {                                                                                                      // 415
          username: event.target.children.username.value,                                                            // 416
          password: event.target.children.password.value                                                             // 417
        };                                                                                                           // 416
        repeat = event.target.children.repeat.value;                                                                 // 418
                                                                                                                     //
        if (doc.password === repeat) {                                                                               // 419
          Meteor.call('newUser', doc);                                                                               // 420
          return $('input').val('');                                                                                 // 887
        } else {                                                                                                     // 419
          return Materialize.toast('Password tidak mirip', 3000);                                                    // 889
        }                                                                                                            // 414
      } else {                                                                                                       // 414
        role = $('input[name="role"]:checked', event.target)[0].id;                                                  // 425
        group = $('input[name="group"]:checked', event.target)[0].id;                                                // 426
        poli = $('input[name="poli"]:checked', event.target)[0];                                                     // 427
        theRole = !poli ? role : _.snakeCase(poli.id);                                                               // 428
        return Meteor.call('addRole', onUser._id, [theRole], group);                                                 // 896
      }                                                                                                              // 897
    },                                                                                                               // 411
    'dblclick #row': function () {                                                                                   // 430
      return Session.set('onUser', this);                                                                            // 900
    },                                                                                                               // 411
    'dblclick #reset': function () {                                                                                 // 431
      var dialog, self;                                                                                              // 432
      self = this;                                                                                                   // 432
      dialog = {                                                                                                     // 433
        title: 'Reset Peranan',                                                                                      // 434
        message: 'Anda yakin untuk menghapus semua perannya?'                                                        // 435
      };                                                                                                             // 434
      return new Confirmation(dialog, function (ok) {                                                                // 909
        if (ok) {                                                                                                    // 436
          return Meteor.call('rmRole', self._id);                                                                    // 911
        }                                                                                                            // 912
      });                                                                                                            // 436
    },                                                                                                               // 411
    'click #close': function () {                                                                                    // 438
      return sessNull();                                                                                             // 916
    },                                                                                                               // 411
    'dblclick #baris': function (event) {                                                                            // 439
      var dialog, jenis, self;                                                                                       // 440
      jenis = event.currentTarget.className;                                                                         // 440
      dialog = {                                                                                                     // 441
        title: 'Hapus ' + _.startCase(jenis),                                                                        // 442
        message: 'Yakin untuk menghapus ' + jenis + ' dari daftar?'                                                  // 443
      };                                                                                                             // 442
      self = this;                                                                                                   // 444
      return new Confirmation(dialog, function (ok) {                                                                // 926
        if (ok) {                                                                                                    // 445
          return Meteor.call('inactive', jenis, self._id);                                                           // 928
        }                                                                                                            // 929
      });                                                                                                            // 445
    }                                                                                                                // 411
  });                                                                                                                // 411
  Template.login.onRendered(function () {                                                                            // 448
    return $('.slider').slider();                                                                                    // 934
  });                                                                                                                // 448
  Template.login.events({                                                                                            // 451
    'submit form': function (event) {                                                                                // 452
      var password, username;                                                                                        // 453
      event.preventDefault();                                                                                        // 453
      username = event.target.children.username.value;                                                               // 454
      password = event.target.children.password.value;                                                               // 455
      return Meteor.loginWithPassword(username, password, function (err) {                                           // 942
        if (err) {                                                                                                   // 457
          return Materialize.toast('Salah username / password', 3000);                                               // 944
        } else {                                                                                                     // 457
          return Router.go('/' + _.keys(roles())[0]);                                                                // 946
        }                                                                                                            // 947
      });                                                                                                            // 456
    }                                                                                                                // 452
  });                                                                                                                // 452
  Template.pagination.helpers({                                                                                      // 462
    pagins: function (name) {                                                                                        // 463
      var end, l, length, limit, results;                                                                            // 464
      limit = Session.get('limit');                                                                                  // 464
      length = coll[name].find().fetch().length;                                                                     // 465
      end = (length - length % limit) / limit;                                                                       // 466
      return function () {                                                                                           // 957
        results = [];                                                                                                // 958
                                                                                                                     //
        for (var l = 1; 1 <= end ? l <= end : l >= end; 1 <= end ? l++ : l--) {                                      // 959
          results.push(l);                                                                                           // 959
        }                                                                                                            // 959
                                                                                                                     //
        return results;                                                                                              // 960
      }.apply(this);                                                                                                 // 961
    }                                                                                                                // 463
  });                                                                                                                // 463
  Template.pagination.events({                                                                                       // 469
    'click #next': function () {                                                                                     // 470
      return Session.set('page', 1 + page());                                                                        // 966
    },                                                                                                               // 470
    'click #prev': function () {                                                                                     // 471
      return Session.set('page', -1 + page());                                                                       // 969
    },                                                                                                               // 470
    'click #num': function (event) {                                                                                 // 472
      return Session.set('page', parseInt(event.target.innerText));                                                  // 972
    }                                                                                                                // 470
  });                                                                                                                // 470
  Template.report.helpers({                                                                                          // 475
    datas: function () {                                                                                             // 476
      return Session.get('laporan');                                                                                 // 977
    }                                                                                                                // 476
  });                                                                                                                // 476
  Template.report.events({                                                                                           // 478
    'click .datepicker': function (event, template) {                                                                // 479
      var type;                                                                                                      // 480
      type = event.target.attributes.date.nodeValue;                                                                 // 480
      return $('#' + type).pickadate({                                                                               // 984
        onSet: function (data) {                                                                                     // 481
          var end, start;                                                                                            // 482
          Session.set(type + 'Date', data.select);                                                                   // 482
          start = Session.get('startDate');                                                                          // 483
          end = Session.get('endDate');                                                                              // 484
                                                                                                                     //
          if (start && end) {                                                                                        // 485
            return Meteor.call('report', template.data.jenis, start, end, function (err, res) {                      // 991
              return res && Session.set('laporan', res);                                                             // 992
            });                                                                                                      // 486
          }                                                                                                          // 994
        }                                                                                                            // 481
      });                                                                                                            // 481
    },                                                                                                               // 479
    'click #export': function (event, template) {                                                                    // 488
      var blob, content;                                                                                             // 489
      content = exportcsv.exportToCSV(Session.get('laporan').csv, true, ';');                                        // 489
      blob = new Blob([content], {                                                                                   // 490
        type: 'text/plain;charset=utf-8'                                                                             // 490
      });                                                                                                            // 490
      return saveAs(blob, template.data.jenis + '.csv');                                                             // 1004
    }                                                                                                                // 479
  });                                                                                                                // 479
}                                                                                                                    // 1007
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"server.coffee.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// server.coffee.js                                                                                                  //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
if (Meteor.isServer) {                                                                                               // 1
  Meteor.startup(function () {                                                                                       // 3
    return coll.pasien._ensureIndex({                                                                                // 3
      'regis.nama_lengkap': 1                                                                                        // 4
    });                                                                                                              // 4
  });                                                                                                                // 3
  Meteor.publish('coll', function (name, selector, options) {                                                        // 6
    return coll[name].find(selector, options);                                                                       // 8
  });                                                                                                                // 6
  Meteor.publish('users', function (selector, options) {                                                             // 9
    return Meteor.users.find(selector, options);                                                                     // 11
  });                                                                                                                // 9
  Meteor.methods({                                                                                                   // 12
    "import": function (name, selector, modifier, arrName) {                                                         // 13
      var find, obj, sel;                                                                                            // 14
      find = coll[name].findOne(selector);                                                                           // 14
                                                                                                                     //
      if (!find) {                                                                                                   // 15
        return coll[name].upsert(selector, {                                                                         // 18
          $set: modifier                                                                                             // 16
        });                                                                                                          // 16
      } else if (arrName) {                                                                                          // 15
        sel = {                                                                                                      // 18
          _id: find._id                                                                                              // 18
        };                                                                                                           // 18
        obj = {};                                                                                                    // 19
        obj[arrName] = modifier[arrName][0];                                                                         // 19
        return coll[name].update(sel, {                                                                              // 27
          $push: obj                                                                                                 // 20
        });                                                                                                          // 20
      }                                                                                                              // 30
    },                                                                                                               // 13
    "export": function (jenis) {                                                                                     // 22
      var arr, find;                                                                                                 // 23
                                                                                                                     //
      if (jenis === 'regis') {                                                                                       // 23
        arr = _.map(coll.pasien.find().fetch(), function (i) {                                                       // 24
          return {                                                                                                   // 36
            no_mr: i.no_mr,                                                                                          // 25
            nama_lengkap: i.regis.nama_lengkap                                                                       // 26
          };                                                                                                         // 25
        });                                                                                                          // 24
      } else if (jenis === 'jalan') {                                                                                // 23
        find = function (type, value) {                                                                              // 28
          var doc;                                                                                                   // 29
          doc = _.find(selects[type], function (i) {                                                                 // 29
            return i.value === value;                                                                                // 45
          });                                                                                                        // 29
          return doc.label;                                                                                          // 47
        };                                                                                                           // 28
                                                                                                                     //
        arr = _.flatMap(coll.pasien.find().fetch(), function (i) {                                                   // 31
          if (i.rawat) {                                                                                             // 32
            return _.map(i.rawat, function (j) {                                                                     // 51
              return {                                                                                               // 52
                no_mr: i.no_mr,                                                                                      // 33
                nama_lengkap: i.regis.nama_lengkap,                                                                  // 34
                idbayar: j.idbayar,                                                                                  // 35
                cara_bayar: find('cara_bayar', j.cara_bayar),                                                        // 36
                klinik: find('klinik', j.klinik)                                                                     // 37
              };                                                                                                     // 33
            });                                                                                                      // 32
          }                                                                                                          // 60
        });                                                                                                          // 31
      } else if (jenis === 'farmasi') {                                                                              // 27
        arr = _.flatMap(coll.gudang.find().fetch(), function (i) {                                                   // 39
          return _.map(i.batch, function (j) {                                                                       // 64
            var body, head;                                                                                          // 41
            head = ['jenis', 'nama'];                                                                                // 41
            head = _.zipObject(head, _.map(head, function (k) {                                                      // 42
              return i[k];                                                                                           // 68
            }));                                                                                                     // 42
            body = ['nobatch', 'merek', 'satuan', 'masuk', 'kadaluarsa', 'digudang', 'diapotik', 'beli', 'jual', 'suplier', 'anggaran', 'pengadaan'];
            body = _.zipObject(body, _.map(body, function (k) {                                                      // 44
              return j[k];                                                                                           // 72
            }));                                                                                                     // 44
            return _.assign(head, body);                                                                             // 74
          });                                                                                                        // 40
        });                                                                                                          // 39
      }                                                                                                              // 77
                                                                                                                     //
      return exportcsv.exportToCSV(arr, true, ';');                                                                  // 78
    },                                                                                                               // 13
    billCard: function (no_mr, state) {                                                                              // 48
      var modifier, selector;                                                                                        // 49
      selector = {                                                                                                   // 49
        no_mr: parseInt(no_mr)                                                                                       // 49
      };                                                                                                             // 49
      modifier = {                                                                                                   // 50
        $set: {                                                                                                      // 50
          'regis.billCard': state                                                                                    // 50
        }                                                                                                            // 50
      };                                                                                                             // 50
      return coll.pasien.update(selector, modifier);                                                                 // 90
    },                                                                                                               // 13
    billRegis: function (no_mr, idbayar, state) {                                                                    // 53
      var modifier, selector;                                                                                        // 54
      selector = {                                                                                                   // 54
        'rawat.idbayar': idbayar,                                                                                    // 54
        no_mr: parseInt(no_mr)                                                                                       // 54
      };                                                                                                             // 54
      modifier = {                                                                                                   // 55
        $set: {                                                                                                      // 55
          'rawat.$.billRegis': state                                                                                 // 55
        }                                                                                                            // 55
      };                                                                                                             // 55
      return coll.pasien.update(selector, modifier);                                                                 // 103
    },                                                                                                               // 13
    bayar: function (no_mr, idbayar) {                                                                               // 58
      var modifier, selector;                                                                                        // 59
      selector = {                                                                                                   // 59
        'rawat.idbayar': idbayar,                                                                                    // 59
        no_mr: parseInt(no_mr)                                                                                       // 59
      };                                                                                                             // 59
      modifier = {                                                                                                   // 60
        'rawat.$.status_bayar': true                                                                                 // 60
      };                                                                                                             // 60
      return coll.pasien.update(selector, {                                                                          // 114
        $set: modifier                                                                                               // 61
      });                                                                                                            // 61
    },                                                                                                               // 13
    request: function (no_mr, idbayar, jenis, idjenis, hasil) {                                                      // 63
      var filtered, findPasien, findStock, give, i, j, k, key, len, len1, len2, len3, m, modifier, n, o, p, q, ref, ref1, ref2, ref3, ref4, selector, sortedEd, sortedIn;
      selector = {                                                                                                   // 64
        no_mr: parseInt(no_mr)                                                                                       // 64
      };                                                                                                             // 64
      findPasien = coll.pasien.findOne(selector);                                                                    // 65
      ref = findPasien.rawat;                                                                                        // 66
                                                                                                                     //
      for (m = 0, len = ref.length; m < len; m++) {                                                                  // 66
        i = ref[m];                                                                                                  // 126
                                                                                                                     //
        if (i.idbayar === idbayar) {                                                                                 // 67
          if (i[jenis]) {                                                                                            // 67
            ref1 = i[jenis];                                                                                         // 67
                                                                                                                     //
            for (n = 0, len1 = ref1.length; n < len1; n++) {                                                         // 67
              j = ref1[n];                                                                                           // 131
                                                                                                                     //
              if (j['id' + jenis] === idjenis) {                                                                     // 68
                j.hasil = hasil;                                                                                     // 68
              }                                                                                                      // 134
            }                                                                                                        // 67
          }                                                                                                          // 67
        }                                                                                                            // 137
      }                                                                                                              // 66
                                                                                                                     //
      modifier = {                                                                                                   // 69
        rawat: findPasien.rawat                                                                                      // 69
      };                                                                                                             // 69
      coll.pasien.update(selector, {                                                                                 // 70
        $set: modifier                                                                                               // 70
      });                                                                                                            // 70
      give = {};                                                                                                     // 71
                                                                                                                     //
      if (jenis === 'obat') {                                                                                        // 72
        ref2 = findPasien.rawat;                                                                                     // 72
                                                                                                                     //
        for (o = 0, len2 = ref2.length; o < len2; o++) {                                                             // 72
          i = ref2[o];                                                                                               // 149
                                                                                                                     //
          if (i.idbayar === idbayar) {                                                                               // 73
            if (i.obat) {                                                                                            // 73
              ref3 = i.obat;                                                                                         // 73
                                                                                                                     //
              for (p = 0, len3 = ref3.length; p < len3; p++) {                                                       // 73
                j = ref3[p];                                                                                         // 154
                                                                                                                     //
                if (j.idobat === idjenis) {                                                                          // 74
                  findStock = coll.gudang.findOne({                                                                  // 75
                    _id: j.nama                                                                                      // 75
                  });                                                                                                // 75
                                                                                                                     //
                  for (k = q = 1, ref4 = j.jumlah; 1 <= ref4 ? q <= ref4 : q >= ref4; k = 1 <= ref4 ? ++q : --q) {   // 76
                    filtered = _.filter(findStock.batch, function (l) {                                              // 77
                      return l.diapotik > 0;                                                                         // 161
                    });                                                                                              // 77
                    sortedIn = _.sortBy(filtered, function (l) {                                                     // 78
                      return new Date(l.masuk).getTime();                                                            // 164
                    });                                                                                              // 78
                    sortedEd = _.sortBy(sortedIn, function (l) {                                                     // 79
                      return new Date(l.kadaluarsa).getTime();                                                       // 167
                    });                                                                                              // 79
                    sortedEd[0].diapotik -= 1;                                                                       // 80
                    key = findStock.nama(+';' + sortedEd[0].nobatch);                                                // 81
                    give[key] || (give[key] = 0);                                                                    // 82
                    give[key] += 1;                                                                                  // 82
                  }                                                                                                  // 76
                                                                                                                     //
                  selector = {                                                                                       // 83
                    _id: findStock._id                                                                               // 83
                  };                                                                                                 // 83
                  modifier = {                                                                                       // 84
                    $set: {                                                                                          // 84
                      batch: findStock.batch                                                                         // 84
                    }                                                                                                // 84
                  };                                                                                                 // 84
                  coll.gudang.update(selector, modifier);                                                            // 85
                }                                                                                                    // 183
              }                                                                                                      // 73
            }                                                                                                        // 73
          }                                                                                                          // 186
        }                                                                                                            // 72
      }                                                                                                              // 188
                                                                                                                     //
      if (jenis === 'obat') {                                                                                        // 86
        return give;                                                                                                 // 190
      }                                                                                                              // 191
    },                                                                                                               // 13
    transfer: function (idbarang, idbatch, amount) {                                                                 // 88
      var modifier, selector;                                                                                        // 89
      selector = {                                                                                                   // 89
        idbarang: idbarang,                                                                                          // 89
        'batch.idbatch': idbatch                                                                                     // 89
      };                                                                                                             // 89
      modifier = {                                                                                                   // 90
        $inc: {                                                                                                      // 90
          'batch.$.digudang': -amount,                                                                               // 90
          'batch.$.diapotik': amount                                                                                 // 90
        }                                                                                                            // 90
      };                                                                                                             // 90
      return coll.gudang.update(selector, modifier);                                                                 // 205
    },                                                                                                               // 13
    rmPasien: function (no_mr) {                                                                                     // 93
      return coll.pasien.remove({                                                                                    // 208
        no_mr: parseInt(no_mr)                                                                                       // 94
      });                                                                                                            // 94
    },                                                                                                               // 13
    rmRawat: function (no_mr, idbayar) {                                                                             // 96
      var modifier, selector;                                                                                        // 97
      selector = {                                                                                                   // 97
        no_mr: parseInt(no_mr)                                                                                       // 97
      };                                                                                                             // 97
      modifier = {                                                                                                   // 98
        $pull: {                                                                                                     // 98
          rawat: {                                                                                                   // 98
            idbayar: idbayar                                                                                         // 98
          }                                                                                                          // 98
        }                                                                                                            // 98
      };                                                                                                             // 98
      return coll.pasien.update(selector, modifier);                                                                 // 224
    },                                                                                                               // 13
    addRole: function (id, roles, group, poli) {                                                                     // 101
      var role;                                                                                                      // 102
      role = poli || roles;                                                                                          // 102
      return Roles.addUsersToRoles(id, role, group);                                                                 // 229
    },                                                                                                               // 13
    rmRole: function (id) {                                                                                          // 105
      var modifier, selector;                                                                                        // 106
      selector = {                                                                                                   // 106
        _id: id                                                                                                      // 106
      };                                                                                                             // 106
      modifier = {                                                                                                   // 107
        $set: {                                                                                                      // 107
          roles: {}                                                                                                  // 107
        }                                                                                                            // 107
      };                                                                                                             // 107
      return Meteor.users.update(selector, modifier);                                                                // 241
    },                                                                                                               // 13
    newUser: function (doc) {                                                                                        // 110
      var find;                                                                                                      // 111
      find = Accounts.findUserByUsername(doc.username);                                                              // 111
                                                                                                                     //
      if (find) {                                                                                                    // 112
        Accounts.setUsername(find._id, doc.username);                                                                // 113
        return Accounts.setPassword(find._id, doc.password);                                                         // 248
      } else {                                                                                                       // 112
        return Accounts.createUser(doc);                                                                             // 250
      }                                                                                                              // 251
    },                                                                                                               // 13
    rmBarang: function (idbarang) {                                                                                  // 118
      return coll.gudang.remove({                                                                                    // 254
        idbarang: idbarang                                                                                           // 119
      });                                                                                                            // 119
    },                                                                                                               // 13
    rmBatch: function (idbarang, idbatch) {                                                                          // 121
      var findStock, terbuang;                                                                                       // 122
      findStock = coll.gudang.findOne({                                                                              // 122
        idbarang: idbarang                                                                                           // 122
      });                                                                                                            // 122
      terbuang = _.without(findStock.batch, _.find(findStock.batch, function (i) {                                   // 123
        return i.idbatch === idbatch;                                                                                // 264
      }));                                                                                                           // 123
      return coll.gudang.update({                                                                                    // 266
        _id: findStock._id                                                                                           // 125
      }, {                                                                                                           // 125
        $set: {                                                                                                      // 125
          batch: terbuang                                                                                            // 125
        }                                                                                                            // 125
      });                                                                                                            // 125
    },                                                                                                               // 13
    inactive: function (name, id) {                                                                                  // 127
      var mod, sel;                                                                                                  // 128
      sel = {                                                                                                        // 128
        _id: id                                                                                                      // 128
      };                                                                                                             // 128
      mod = {                                                                                                        // 128
        $set: {                                                                                                      // 128
          active: false                                                                                              // 128
        }                                                                                                            // 128
      };                                                                                                             // 128
      return coll[name].update(sel, mod);                                                                            // 284
    },                                                                                                               // 13
    pindah: function (no_mr) {                                                                                       // 131
      var find, last, modifier, ref, selector;                                                                       // 132
      find = coll.pasien.findOne({                                                                                   // 132
        'no_mr': parseInt(no_mr)                                                                                     // 132
      });                                                                                                            // 132
      ref = find.rawat, last = ref[ref.length - 1];                                                                  // 133
                                                                                                                     //
      if (last.pindah) {                                                                                             // 134
        selector = {                                                                                                 // 135
          _id: find._id                                                                                              // 135
        };                                                                                                           // 135
        modifier = {                                                                                                 // 136
          $push: {                                                                                                   // 136
            rawat: {                                                                                                 // 136
              idbayar: randomId(),                                                                                   // 137
              tanggal: new Date(),                                                                                   // 138
              cara_bayar: last.cara_bayar,                                                                           // 139
              klinik: last.pindah,                                                                                   // 140
              billRegis: true,                                                                                       // 141
              total: {                                                                                               // 142
                semua: 0                                                                                             // 142
              }                                                                                                      // 142
            }                                                                                                        // 137
          }                                                                                                          // 136
        };                                                                                                           // 136
        return coll.pasien.update(selector, modifier);                                                               // 310
      }                                                                                                              // 311
    },                                                                                                               // 13
    report: function (jenis, start, end) {                                                                           // 145
      var docs, filter;                                                                                              // 146
                                                                                                                     //
      filter = function (arr) {                                                                                      // 146
        return _.filter(arr, function (i) {                                                                          // 316
          var ref;                                                                                                   // 147
          return new Date(start) < (ref = new Date(i.tanggal)) && ref < new Date(end);                               // 318
        });                                                                                                          // 146
      };                                                                                                             // 146
                                                                                                                     //
      docs = _.flatMap(coll.pasien.find().fetch(), function (i) {                                                    // 148
        return _.map(filter(i.rawat), function (j) {                                                                 // 322
          var obj;                                                                                                   // 149
          obj = {                                                                                                    // 149
            no_mr: i.no_mr,                                                                                          // 150
            nama_lengkap: _.startCase(i.regis.nama_lengkap),                                                         // 151
            tanggal: j.tanggal,                                                                                      // 152
            no_bill: j.nobill,                                                                                       // 153
            cara_bayar: look('cara_bayar', j.cara_bayar).label,                                                      // 154
            rujukan: j.rujukan ? look('rujukan', j.rujukan).label : '',                                              // 155
            klinik: look('klinik', j.klinik).label,                                                                  // 156
            diagnosa: j.diagnosa || '-',                                                                             // 157
            tindakan: _.flatMap(['tindakan', 'labor', 'radio'], function (k) {                                       // 158
              var saring;                                                                                            // 159
              saring = _.filter(j[k], function (l) {                                                                 // 159
                return l;                                                                                            // 336
              });                                                                                                    // 159
              return _.map(saring, function (l) {                                                                    // 338
                return '/' + _.startCase(look2('tarif', l.nama).nama);                                               // 339
              });                                                                                                    // 160
            }),                                                                                                      // 158
            harga: 'Rp ' + j.total.semua,                                                                            // 161
            petugas: Meteor.users.findOne({                                                                          // 162
              _id: j.petugas                                                                                         // 162
            }).username,                                                                                             // 162
            keluar: j.keluar ? look('keluar', j.keluar).label : '-',                                                 // 163
            baru_lama: i.rawat.length > 1 ? 'Lama' : 'Baru'                                                          // 164
          };                                                                                                         // 150
                                                                                                                     //
          if (jenis === 'pendaftaran') {                                                                             // 165
            return _.pick(obj, ['tanggal', 'no_mr', 'nama_lengkap', 'cara_bayar', 'rujukan', 'klinik', 'diagnosa', 'baru_lama']);
          } else if (jenis === 'pembayaran') {                                                                       // 165
            return _.pick(obj, ['tanggal', 'no_bill', 'no_mr', 'nama_lengkap', 'klinik', 'diagnosa', 'tindakan', 'harga', 'petugas']);
          } else if (jenis === 'rawat_jalan') {                                                                      // 167
            return _.pick(obj, ['tanggal', 'no_mr', 'nama_lengkap', 'kelamin', 'umur', 'cara_bayar', 'diagnosa', 'tindakan', 'petugas', 'keluar', 'rujukan']);
          }                                                                                                          // 355
        });                                                                                                          // 148
      });                                                                                                            // 148
      return {                                                                                                       // 358
        headers: _.map(_.keys(docs[0]), function (i) {                                                               // 171
          return _.startCase(i);                                                                                     // 360
        }),                                                                                                          // 171
        rows: _.map(docs, function (i) {                                                                             // 172
          return _.values(i);                                                                                        // 363
        }),                                                                                                          // 172
        csv: docs                                                                                                    // 173
      };                                                                                                             // 171
    },                                                                                                               // 13
    patientExist: function (no_mr) {                                                                                 // 175
      if (coll.pasien.findOne({                                                                                      // 176
        no_mr: parseInt(no_mr)                                                                                       // 176
      })) {                                                                                                          // 176
        return true;                                                                                                 // 372
      }                                                                                                              // 373
    },                                                                                                               // 13
    nearEds: function (returnable) {                                                                                 // 178
      var assign, batch, diffed, sel, source;                                                                        // 179
      sel = {                                                                                                        // 179
        'digudang': {                                                                                                // 179
          $gt: 0                                                                                                     // 179
        },                                                                                                           // 179
        'diretur': {                                                                                                 // 179
          $ne: true                                                                                                  // 179
        }                                                                                                            // 179
      };                                                                                                             // 179
      source = coll.gudang.find({                                                                                    // 180
        batch: {                                                                                                     // 180
          $elemMatch: sel                                                                                            // 180
        }                                                                                                            // 180
      }).fetch();                                                                                                    // 180
      assign = _.map(source, function (i) {                                                                          // 181
        return _.map(i.batch, function (j) {                                                                         // 391
          return _.assign(j, {                                                                                       // 392
            idbarang: i.idbarang,                                                                                    // 182
            nama: i.nama                                                                                             // 182
          });                                                                                                        // 182
        });                                                                                                          // 181
      });                                                                                                            // 181
      batch = _.flatMap(source, function (i) {                                                                       // 183
        return i.batch;                                                                                              // 399
      });                                                                                                            // 183
      return diffed = _.filter(batch, function (i) {                                                                 // 401
        var a, b;                                                                                                    // 185
                                                                                                                     //
        a = function () {                                                                                            // 185
          return 6 > monthDiff(i.kadaluarsa);                                                                        // 404
        };                                                                                                           // 185
                                                                                                                     //
        b = function () {                                                                                            // 186
          return i.returnable;                                                                                       // 407
        };                                                                                                           // 186
                                                                                                                     //
        if (returnable) {                                                                                            // 187
          return a() && b();                                                                                         // 410
        } else {                                                                                                     // 187
          return a();                                                                                                // 412
        }                                                                                                            // 413
      });                                                                                                            // 184
    },                                                                                                               // 13
    returBatch: function (doc) {                                                                                     // 189
      var findStock, i, len, m, mod, ref, sel;                                                                       // 190
      findStock = coll.gudang.findOne({                                                                              // 190
        idbarang: doc.idbarang                                                                                       // 190
      });                                                                                                            // 190
      ref = findStock.batch;                                                                                         // 191
                                                                                                                     //
      for (m = 0, len = ref.length; m < len; m++) {                                                                  // 191
        i = ref[m];                                                                                                  // 423
                                                                                                                     //
        if (i.idbatch === doc.idbatch) {                                                                             // 192
          i.diretur = true;                                                                                          // 193
        }                                                                                                            // 426
      }                                                                                                              // 191
                                                                                                                     //
      sel = {                                                                                                        // 194
        _id: findStock._id                                                                                           // 194
      };                                                                                                             // 194
      mod = {                                                                                                        // 194
        batch: findStock.batch                                                                                       // 194
      };                                                                                                             // 194
      return coll.gudang.update(sel, {                                                                               // 434
        $set: mod                                                                                                    // 195
      });                                                                                                            // 195
    },                                                                                                               // 13
    amprah: function (idbarang, idamprah, diserah) {                                                                 // 197
      var barang, i, len, m, ref;                                                                                    // 198
      barang = coll.gudang.findOne({                                                                                 // 198
        idbarang: idbarang                                                                                           // 198
      });                                                                                                            // 198
      ref = barang.amprah;                                                                                           // 199
                                                                                                                     //
      for (m = 0, len = ref.length; m < len; m++) {                                                                  // 199
        i = ref[m];                                                                                                  // 445
                                                                                                                     //
        if (i.idamprah === idamprah) {                                                                               // 200
          i.penyerah = this.userId;                                                                                  // 201
          i.diserah = diserah;                                                                                       // 202
        }                                                                                                            // 449
      }                                                                                                              // 199
                                                                                                                     //
      return coll.gudang.update(barang._id, barang);                                                                 // 451
    }                                                                                                                // 13
  });                                                                                                                // 13
}                                                                                                                    // 454
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},{
  "extensions": [
    ".js",
    ".json",
    ".coffee"
  ]
});
require("./folder/parent/funcs.coffee.js");
require("./folder/hooks.coffee.js");
require("./folder/modules.coffee.js");
require("./folder/pdf.coffee.js");
require("./folder/rights.coffee.js");
require("./folder/selects.coffee.js");
require("./both.coffee.js");
require("./client.coffee.js");
require("./server.coffee.js");
//# sourceMappingURL=app.js.map
