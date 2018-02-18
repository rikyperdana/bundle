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
                                                                                                                     //
  if (size < 7) {                                                                                                    // 8
    return '0'.repeat(6 - size) + _.toString(num);                                                                   // 27
  }                                                                                                                  // 28
};                                                                                                                   // 6
                                                                                                                     //
if (Meteor.isClient) {                                                                                               // 10
  AutoForm.setDefaultTemplate('materialize');                                                                        // 13
                                                                                                                     //
  this.currentRoute = function () {                                                                                  // 14
    return Router.current().route.getName();                                                                         // 34
  };                                                                                                                 // 14
                                                                                                                     //
  this.currentPar = function (param) {                                                                               // 15
    return Router.current().params[param];                                                                           // 37
  };                                                                                                                 // 15
                                                                                                                     //
  this.search = function () {                                                                                        // 16
    return Session.get('search');                                                                                    // 40
  };                                                                                                                 // 16
                                                                                                                     //
  this.formDoc = function () {                                                                                       // 17
    return Session.get('formDoc');                                                                                   // 43
  };                                                                                                                 // 17
                                                                                                                     //
  this.limit = function () {                                                                                         // 18
    return Session.get('limit');                                                                                     // 46
  };                                                                                                                 // 18
                                                                                                                     //
  this.page = function () {                                                                                          // 19
    return Session.get('page');                                                                                      // 49
  };                                                                                                                 // 19
                                                                                                                     //
  this.roles = function () {                                                                                         // 20
    return Meteor.user().roles;                                                                                      // 52
  };                                                                                                                 // 20
                                                                                                                     //
  this.tag = function (tag, val) {                                                                                   // 21
    return '<' + tag + '>' + val + '</' + tag + '>';                                                                 // 55
  };                                                                                                                 // 21
                                                                                                                     //
  this.sessNull = function () {                                                                                      // 22
    return _.map(_.tail(_.keys(Session.keys)), function (i) {                                                        // 58
      return Session.set(i, null);                                                                                   // 59
    });                                                                                                              // 22
  };                                                                                                                 // 22
}                                                                                                                    // 62
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
      if (doc.total.semua > 0 || doc.cara_bayar !== 1 || doc.anamesa_perawat) {                                      // 21
        doc.billRegis = true;                                                                                        // 21
      }                                                                                                              // 47
                                                                                                                     //
      if (doc.total.semua > 0 && doc.cara_bayar !== 1) {                                                             // 22
        doc.status_bayar = true;                                                                                     // 22
      }                                                                                                              // 50
                                                                                                                     //
      if (doc.obat && 0 === doc.total.semua) {                                                                       // 23
        doc.billRegis = true;                                                                                        // 24
        doc.status_bayar = true;                                                                                     // 25
      }                                                                                                              // 54
                                                                                                                     //
      begin = Session.get('begin');                                                                                  // 26
      stop = moment();                                                                                               // 26
      doc.spm = stop.diff(begin, 'minutes');                                                                         // 27
      doc.petugas = Meteor.userId();                                                                                 // 28
      doc.nobill = parseInt(_.toString(Date.now()).substr(7, 13));                                                   // 29
      return doc;                                                                                                    // 60
    }                                                                                                                // 61
  };                                                                                                                 // 3
                                                                                                                     //
  AutoForm.addHooks('formPasien', {                                                                                  // 32
    before: {                                                                                                        // 33
      'update-pushArray': function (doc) {                                                                           // 34
        var formDoc;                                                                                                 // 35
        formDoc = Session.get('formDoc');                                                                            // 35
                                                                                                                     //
        if (formDoc) {                                                                                               // 36
          Meteor.call('rmRawat', currentPar('no_mr'), formDoc.idbayar);                                              // 36
        }                                                                                                            // 70
                                                                                                                     //
        return this.result(modForm(doc));                                                                            // 71
      }                                                                                                              // 34
    },                                                                                                               // 34
    after: {                                                                                                         // 38
      insert: function () {                                                                                          // 39
        return sessNull();                                                                                           // 76
      },                                                                                                             // 39
      'update-pushArray': function (err, res) {                                                                      // 40
        sessNull();                                                                                                  // 41
                                                                                                                     //
        if (res) {                                                                                                   // 42
          return Meteor.call('pindah', currentPar('no_mr'));                                                         // 81
        }                                                                                                            // 82
      }                                                                                                              // 39
    },                                                                                                               // 39
    formToDoc: function (doc) {                                                                                      // 43
      Session.set('preview', modForm(doc));                                                                          // 44
      return doc;                                                                                                    // 87
    }                                                                                                                // 33
  });                                                                                                                // 33
  AutoForm.addHooks('formGudang', {                                                                                  // 47
    before: {                                                                                                        // 48
      insert: function (doc) {                                                                                       // 49
        doc.idbarang = randomId();                                                                                   // 50
        doc.batch[0].idbatch = randomId();                                                                           // 51
        return this.result(doc);                                                                                     // 95
      },                                                                                                             // 49
      'update-pushArray': function (doc) {                                                                           // 53
        doc.idbatch = randomId();                                                                                    // 54
        return this.result(doc);                                                                                     // 99
      }                                                                                                              // 49
    }                                                                                                                // 49
  });                                                                                                                // 48
}                                                                                                                    // 103
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
          columns: [['NAMA LENGKAP', 'TEMPAT & TANGGAL LAHIR', 'GOLONGAN DARAH', 'JENIS KELAMIN', 'AGAMA', 'PENDIDIKAN', 'PEKERJAAN', 'NAMA AYAH', 'NAMA IBU', 'NAMA SUAMI / ISTRI', 'ALAMAT', 'NO. TELP / HP'], [': ' + doc.regis.nama_lengkap, ': ' + doc.regis.tmpt_lahir + ', ' + moment(doc.regis.tgl_lahir).format('D/MM/YYYY')].concat(slice.call(_.map(['darah', 'kelamin', 'agama', 'pendidikan', 'pekerjaan'], function (i) {
            return ': ' + look(i, doc.regis[i]).label;                                                               // 30
          })), slice.call(_.map(['ayah', 'ibu', 'pasangan', 'alamat', 'kontak'], function (i) {                      // 26
            return ': ' + doc.regis[i];                                                                              // 32
          })))]                                                                                                      // 28
        }, {                                                                                                         // 21
          text: '\nPERSETUJUAN UMUM (GENERAL CONSENT)',                                                              // 32
          alignment: 'center'                                                                                        // 32
        }, {                                                                                                         // 32
          table: {                                                                                                   // 33
            body: [['Cek', {                                                                                         // 33
              text: 'Keterangan',                                                                                    // 34
              alignment: 'center'                                                                                    // 34
            }], [' ', 'Saya akan mentaati peraturan yang berlaku di RSUD Petala Bumi'], [' ', 'Saya memberi kuasa kepada dokter dan semua tenaga kesehatan untuk melakukan pemeriksaan / pengobatan / tindakan yang diperlakukan upaya kesembuhan saya / pasien tersebut diatas'], [' ', 'Saya memberi kuasa kepada dokter dan semua tenaga kesehatan yang ikut merawat saya untuk memberikan keterangan medis saya kepada yang bertanggung jawab atas biaya perawatan saya.'], [' ', 'Saya memberi kuasa kepada RSUD Petala Bumi untuk menginformasikan identitas sosial saya kepada keluarga / rekan / masyarakat'], [' ', 'Saya mengatakan bahwa informasi hasil pemeriksaan / rekam medis saya dapat digunakan untuk pendidikan / penelitian demi kemajuan ilmu kesehatan']]
          }                                                                                                          // 33
        }, '\nPetunjuk :', 'S: Setuju', 'TS: Tidak Setuju', {                                                        // 33
          alignment: 'justify',                                                                                      // 44
          columns: [{                                                                                                // 44
            text: '\n\n\n\n__________________\n' + _.startCase(Meteor.user().username),                              // 45
            alignment: 'center'                                                                                      // 45
          }, {                                                                                                       // 45
            text: 'Pekanbaru, ' + moment().format('DD/MM/YYYY') + '\n\n\n\n__________________\n' + _.startCase(doc.regis.nama_lengkap),
            alignment: 'center'                                                                                      // 46
          }]                                                                                                         // 46
        }]                                                                                                           // 44
      });                                                                                                            // 18
      return pdf.download(zeros(doc.no_mr) + '_consent.pdf');                                                        // 63
    },                                                                                                               // 4
    payRawat: function (doc) {                                                                                       // 50
      var find, i, j, l, len, len1, m, pasien, pdf, ref, ref1, rows, table;                                          // 51
      pasien = coll.pasien.findOne();                                                                                // 51
      rows = [['Uraian', 'Harga']];                                                                                  // 52
      ref = ['tindakan', 'labor', 'radio'];                                                                          // 53
                                                                                                                     //
      for (l = 0, len = ref.length; l < len; l++) {                                                                  // 53
        i = ref[l];                                                                                                  // 71
                                                                                                                     //
        if (doc[i]) {                                                                                                // 54
          ref1 = doc[i];                                                                                             // 54
                                                                                                                     //
          for (m = 0, len1 = ref1.length; m < len1; m++) {                                                           // 54
            j = ref1[m];                                                                                             // 75
            find = _.find(coll.tarif.find().fetch(), function (k) {                                                  // 55
              return k._id === j.nama;                                                                               // 77
            });                                                                                                      // 55
            rows.push([_.startCase(find.nama), _.toString(j.harga)]);                                                // 56
          }                                                                                                          // 54
        }                                                                                                            // 81
      }                                                                                                              // 53
                                                                                                                     //
      table = {                                                                                                      // 57
        table: {                                                                                                     // 57
          widths: ['*', 'auto'],                                                                                     // 57
          body: rows                                                                                                 // 57
        }                                                                                                            // 57
      };                                                                                                             // 57
      pdf = pdfMake.createPdf({                                                                                      // 58
        content: [{                                                                                                  // 59
          text: 'PEMERINTAH PROVINSI RIAU\nRUMAH SAKIT UMUM DAERAH PETALA BUMI\nJL. DR. SOETOMO NO. 65, TELP. (0761) 23024, PEKANBARU',
          alignment: 'center'                                                                                        // 60
        }, {                                                                                                         // 60
          text: '\nRINCIAN BIAYA RAWAT JALAN\n',                                                                     // 61
          alignment: 'center'                                                                                        // 61
        }, {                                                                                                         // 61
          columns: [['NO. MR', 'NAMA PASIEN', 'JENIS KELAMIN', 'TANGGAL LAHIR', 'UMUR', 'KLINIK'], [': ' + zeros(pasien.no_mr), ': ' + _.startCase(pasien.regis.nama_lengkap), ': ' + look('kelamin', pasien.regis.kelamin).label, ': ' + moment().format('D/MM/YYYY'), ': ' + moment().diff(pasien.regis.tgl_lahir, 'years') + ' tahun', ': ' + look('klinik', doc.klinik).label]]
        }, {                                                                                                         // 62
          text: '\n\nRINCIAN PEMBAYARAN',                                                                            // 73
          alignment: 'center'                                                                                        // 73
        }, table, '\nTOTAL BIAYA' + 'Rp ' + _.toString(numeral(doc.total.semua).format('0,0')), {                    // 73
          text: '\nPEKANBARU, ' + moment().format('D/MM/YYYY') + '\n\n\n\n\n' + _.startCase(Meteor.user().username),
          alignment: 'right'                                                                                         // 77
        }]                                                                                                           // 76
      });                                                                                                            // 59
      return pdf.download(zeros(pasien.no_mr) + '_payRawat.pdf');                                                    // 108
    },                                                                                                               // 4
    payRegCard: function (amount, words) {                                                                           // 80
      var doc, pdf;                                                                                                  // 81
      doc = coll.pasien.findOne();                                                                                   // 81
      pdf = pdfMake.createPdf({                                                                                      // 82
        content: [{                                                                                                  // 83
          text: 'PEMERINTAH PROVINSI RIAU\nRUMAH SAKIT UMUM DAERAH PETALA BUMI\nJL. DR. SOETOMO NO. 65, TELP. (0761) 23024, PEKANBARU',
          alignment: 'center'                                                                                        // 84
        }, {                                                                                                         // 84
          text: '\n\nKARCIS',                                                                                        // 85
          alignment: 'center'                                                                                        // 85
        }, {                                                                                                         // 85
          columns: [['TANGGAL', 'NO. MR', 'NAMA PASIEN', 'TARIF', '\n\nPETUGAS'], [': ' + moment().format('DD/MM/YYYY'), ': ' + _.toString(zeros(doc.no_mr)), ': ' + _.startCase(doc.regis.nama_lengkap), ': ' + 'Rp ' + _.toString(amount), '\n\n: ' + _.startCase(Meteor.user().username)]]
        }]                                                                                                           // 86
      });                                                                                                            // 83
      return pdf.download(zeros(doc.no_mr) + '_payRegCard.pdf');                                                     // 126
    },                                                                                                               // 4
    rekap: function (rows) {                                                                                         // 98
      var pdf, strings;                                                                                              // 99
      strings = _.map(rows, function (i) {                                                                           // 99
        return _.map(i, function (j) {                                                                               // 131
          return _.toString(j);                                                                                      // 132
        });                                                                                                          // 99
      });                                                                                                            // 99
      pdf = pdfMake.createPdf({                                                                                      // 100
        content: [{                                                                                                  // 100
          table: {                                                                                                   // 100
            body: strings                                                                                            // 100
          }                                                                                                          // 100
        }]                                                                                                           // 100
      });                                                                                                            // 100
      return pdf.download('rekap.pdf');                                                                              // 144
    }                                                                                                                // 4
  };                                                                                                                 // 4
}                                                                                                                    // 147
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
  satuan: ['Botol', 'Vial', 'Ampul', 'Pcs'],                                                                         // 16
  anggaran: ['BLUD']                                                                                                 // 17
};                                                                                                                   // 2
                                                                                                                     //
_.map(_.keys(selects), function (i) {                                                                                // 19
  return selects[i] = _.map(selects[i], function (j, x) {                                                            // 21
    return {                                                                                                         // 22
      label: j,                                                                                                      // 19
      value: x + 1                                                                                                   // 19
    };                                                                                                               // 19
  });                                                                                                                // 19
});                                                                                                                  // 19
                                                                                                                     //
selects.karcis = _.map([15000, 20000, 25000, 30000, 40000], function (i) {                                           // 21
  return {                                                                                                           // 30
    value: i,                                                                                                        // 21
    label: 'Rp ' + i                                                                                                 // 21
  };                                                                                                                 // 21
});                                                                                                                  // 21
                                                                                                                     //
selects.tindakan = function () {                                                                                     // 23
  var selector, sub;                                                                                                 // 23
                                                                                                                     //
  if (Meteor.isClient) {                                                                                             // 23
    sub = Meteor.subscribe('coll', 'tarif', {}, {});                                                                 // 24
    selector = {                                                                                                     // 25
      jenis: Meteor.user().roles.jalan[0]                                                                            // 25
    };                                                                                                               // 25
                                                                                                                     //
    if (sub.ready()) {                                                                                               // 26
      return _.map(coll.tarif.find(selector).fetch(), function (i) {                                                 // 44
        return {                                                                                                     // 45
          value: i._id,                                                                                              // 27
          label: _.startCase(i.nama)                                                                                 // 27
        };                                                                                                           // 27
      });                                                                                                            // 26
    }                                                                                                                // 23
  }                                                                                                                  // 51
};                                                                                                                   // 23
                                                                                                                     //
selects.dokter = function () {                                                                                       // 29
  var find, selector, sub;                                                                                           // 29
                                                                                                                     //
  if (Meteor.isClient) {                                                                                             // 29
    sub = Meteor.subscribe('coll', 'dokter', {}, {});                                                                // 30
    find = _.find(selects.klinik, function (i) {                                                                     // 31
      return Meteor.user().roles.jalan[0] === _.snakeCase(i.label);                                                  // 59
    });                                                                                                              // 31
    selector = {                                                                                                     // 33
      poli: find.value                                                                                               // 33
    };                                                                                                               // 33
                                                                                                                     //
    if (sub.ready()) {                                                                                               // 34
      return _.map(coll.dokter.find(selector).fetch(), function (i) {                                                // 65
        return {                                                                                                     // 66
          value: i._id,                                                                                              // 35
          label: i.nama                                                                                              // 35
        };                                                                                                           // 35
      });                                                                                                            // 34
    }                                                                                                                // 29
  }                                                                                                                  // 72
};                                                                                                                   // 29
                                                                                                                     //
selects.obat = function () {                                                                                         // 37
  var filter, sub;                                                                                                   // 37
                                                                                                                     //
  if (Meteor.isClient) {                                                                                             // 37
    sub = Meteor.subscribe('coll', 'gudang', {}, {});                                                                // 38
                                                                                                                     //
    filter = function (arr) {                                                                                        // 39
      return _.filter(arr, function (i) {                                                                            // 80
        return i.jenis === 1;                                                                                        // 81
      });                                                                                                            // 39
    };                                                                                                               // 39
                                                                                                                     //
    if (sub.ready()) {                                                                                               // 40
      return _.map(filter(coll.gudang.find().fetch()), function (i) {                                                // 85
        return {                                                                                                     // 86
          value: i._id,                                                                                              // 41
          label: i.nama                                                                                              // 41
        };                                                                                                           // 41
      });                                                                                                            // 40
    }                                                                                                                // 37
  }                                                                                                                  // 92
};                                                                                                                   // 37
                                                                                                                     //
_.map(['labor', 'radio'], function (i) {                                                                             // 43
  return selects[i] = function () {                                                                                  // 96
    var selector, sub;                                                                                               // 44
                                                                                                                     //
    if (Meteor.isClient) {                                                                                           // 44
      sub = Meteor.subscribe('coll', 'tarif', {}, {});                                                               // 45
      selector = {                                                                                                   // 46
        jenis: i                                                                                                     // 46
      };                                                                                                             // 46
                                                                                                                     //
      if (sub.ready()) {                                                                                             // 47
        return _.map(coll.tarif.find(selector).fetch(), function (j) {                                               // 104
          return {                                                                                                   // 105
            value: j._id,                                                                                            // 48
            label: _.startCase(j.nama)                                                                               // 48
          };                                                                                                         // 48
        });                                                                                                          // 47
      }                                                                                                              // 44
    }                                                                                                                // 111
  };                                                                                                                 // 44
});                                                                                                                  // 43
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
    type: Number                                                                                                     // 9
  },                                                                                                                 // 9
  regis: {                                                                                                           // 10
    type: Object                                                                                                     // 10
  },                                                                                                                 // 10
  'regis.nama_lengkap': {                                                                                            // 11
    type: String                                                                                                     // 11
  },                                                                                                                 // 11
  'regis.tgl_lahir': {                                                                                               // 12
    type: Date,                                                                                                      // 12
    autoform: {                                                                                                      // 12
      type: 'pickadate',                                                                                             // 12
      pickadateOptions: {                                                                                            // 12
        selectYears: 150,                                                                                            // 12
        selectMonths: true                                                                                           // 12
      }                                                                                                              // 12
    }                                                                                                                // 12
  },                                                                                                                 // 12
  'regis.tmpt_lahir': {                                                                                              // 13
    type: String,                                                                                                    // 13
    optional: true                                                                                                   // 13
  },                                                                                                                 // 13
  'regis.cara_bayar': {                                                                                              // 14
    type: Number,                                                                                                    // 14
    autoform: {                                                                                                      // 14
      options: selects.cara_bayar,                                                                                   // 14
      type: 'select-radio-inline'                                                                                    // 14
    }                                                                                                                // 14
  },                                                                                                                 // 14
  'regis.kelamin': {                                                                                                 // 15
    type: Number,                                                                                                    // 15
    autoform: {                                                                                                      // 15
      options: selects.kelamin,                                                                                      // 15
      type: 'select-radio-inline'                                                                                    // 15
    }                                                                                                                // 15
  },                                                                                                                 // 15
  'regis.agama': {                                                                                                   // 16
    type: Number,                                                                                                    // 16
    autoform: {                                                                                                      // 16
      options: selects.agama,                                                                                        // 16
      type: 'select-radio-inline'                                                                                    // 16
    }                                                                                                                // 16
  },                                                                                                                 // 16
  'regis.nikah': {                                                                                                   // 17
    type: Number,                                                                                                    // 17
    autoform: {                                                                                                      // 17
      options: selects.nikah,                                                                                        // 17
      type: 'select-radio-inline'                                                                                    // 17
    }                                                                                                                // 17
  },                                                                                                                 // 17
  'regis.pendidikan': {                                                                                              // 18
    type: Number,                                                                                                    // 18
    optional: true,                                                                                                  // 18
    autoform: {                                                                                                      // 18
      options: selects.pendidikan,                                                                                   // 18
      type: 'select-radio-inline'                                                                                    // 18
    }                                                                                                                // 18
  },                                                                                                                 // 18
  'regis.darah': {                                                                                                   // 19
    type: Number,                                                                                                    // 19
    optional: true,                                                                                                  // 19
    autoform: {                                                                                                      // 19
      options: selects.darah,                                                                                        // 19
      type: 'select-radio-inline'                                                                                    // 19
    }                                                                                                                // 19
  },                                                                                                                 // 19
  'regis.pekerjaan': {                                                                                               // 20
    type: Number,                                                                                                    // 20
    optional: true,                                                                                                  // 20
    autoform: {                                                                                                      // 20
      options: selects.pekerjaan,                                                                                    // 20
      type: 'select-radio-inline'                                                                                    // 20
    }                                                                                                                // 20
  },                                                                                                                 // 20
  'regis.kabupaten': {                                                                                               // 21
    type: String,                                                                                                    // 21
    optional: true                                                                                                   // 21
  },                                                                                                                 // 21
  'regis.kecamatan': {                                                                                               // 22
    type: String,                                                                                                    // 22
    optional: true                                                                                                   // 22
  },                                                                                                                 // 22
  'regis.kelurahan': {                                                                                               // 23
    type: String,                                                                                                    // 23
    optional: true                                                                                                   // 23
  },                                                                                                                 // 23
  'regis.alamat': {                                                                                                  // 24
    type: String                                                                                                     // 24
  },                                                                                                                 // 24
  'regis.kontak': {                                                                                                  // 25
    type: String,                                                                                                    // 25
    optional: true                                                                                                   // 25
  },                                                                                                                 // 25
  'regis.ayah': {                                                                                                    // 26
    type: String,                                                                                                    // 26
    optional: true                                                                                                   // 26
  },                                                                                                                 // 26
  'regis.ibu': {                                                                                                     // 27
    type: String,                                                                                                    // 27
    optional: true                                                                                                   // 27
  },                                                                                                                 // 27
  'regis.pasangan': {                                                                                                // 28
    type: String,                                                                                                    // 28
    optional: true                                                                                                   // 28
  },                                                                                                                 // 28
  'regis.petugas': {                                                                                                 // 29
    type: String,                                                                                                    // 30
    autoform: {                                                                                                      // 31
      type: 'hidden'                                                                                                 // 31
    },                                                                                                               // 31
    autoValue: function () {                                                                                         // 32
      if (Meteor.isClient) {                                                                                         // 32
        return Meteor.userId();                                                                                      // 126
      }                                                                                                              // 127
    }                                                                                                                // 30
  },                                                                                                                 // 30
  'regis.date': {                                                                                                    // 33
    type: Date,                                                                                                      // 34
    autoform: {                                                                                                      // 35
      type: 'hidden'                                                                                                 // 35
    },                                                                                                               // 35
    autoValue: function () {                                                                                         // 36
      return new Date();                                                                                             // 136
    }                                                                                                                // 34
  },                                                                                                                 // 34
  'regis.billCard': {                                                                                                // 37
    type: Boolean,                                                                                                   // 37
    optional: true,                                                                                                  // 37
    autoform: {                                                                                                      // 37
      type: 'hidden'                                                                                                 // 37
    }                                                                                                                // 37
  }                                                                                                                  // 37
};                                                                                                                   // 9
schema.fisik = {                                                                                                     // 39
  tekanan_darah: {                                                                                                   // 40
    type: String,                                                                                                    // 40
    optional: true                                                                                                   // 40
  },                                                                                                                 // 40
  nadi: {                                                                                                            // 41
    type: Number,                                                                                                    // 41
    optional: true                                                                                                   // 41
  },                                                                                                                 // 41
  suhu: {                                                                                                            // 42
    type: Number,                                                                                                    // 42
    decimal: true,                                                                                                   // 42
    optional: true                                                                                                   // 42
  },                                                                                                                 // 42
  pernapasan: {                                                                                                      // 43
    type: Number,                                                                                                    // 43
    optional: true                                                                                                   // 43
  },                                                                                                                 // 43
  berat: {                                                                                                           // 44
    type: Number,                                                                                                    // 44
    optional: true                                                                                                   // 44
  },                                                                                                                 // 44
  tinggi: {                                                                                                          // 45
    type: Number,                                                                                                    // 45
    optional: true                                                                                                   // 45
  },                                                                                                                 // 45
  lila: {                                                                                                            // 46
    type: Number,                                                                                                    // 46
    optional: true                                                                                                   // 46
  }                                                                                                                  // 46
};                                                                                                                   // 40
schema.tindakan = {                                                                                                  // 48
  idtindakan: {                                                                                                      // 49
    type: String,                                                                                                    // 49
    optional: true,                                                                                                  // 49
    autoform: {                                                                                                      // 49
      type: 'hidden'                                                                                                 // 49
    }                                                                                                                // 49
  },                                                                                                                 // 49
  nama: {                                                                                                            // 50
    type: String,                                                                                                    // 50
    autoform: {                                                                                                      // 50
      options: selects.tindakan,                                                                                     // 50
      type: 'universe-select'                                                                                        // 50
    }                                                                                                                // 50
  },                                                                                                                 // 50
  dokter: {                                                                                                          // 51
    type: String,                                                                                                    // 51
    autoform: {                                                                                                      // 51
      options: selects.dokter                                                                                        // 51
    }                                                                                                                // 51
  },                                                                                                                 // 51
  harga: {                                                                                                           // 52
    type: Number,                                                                                                    // 52
    optional: true,                                                                                                  // 52
    autoform: {                                                                                                      // 52
      type: 'hidden'                                                                                                 // 52
    }                                                                                                                // 52
  }                                                                                                                  // 52
};                                                                                                                   // 49
schema.labor = {                                                                                                     // 54
  idlabor: {                                                                                                         // 55
    type: String,                                                                                                    // 55
    optional: true,                                                                                                  // 55
    autoform: {                                                                                                      // 55
      type: 'hidden'                                                                                                 // 55
    }                                                                                                                // 55
  },                                                                                                                 // 55
  nama: {                                                                                                            // 56
    type: String,                                                                                                    // 56
    autoform: {                                                                                                      // 56
      options: selects.labor                                                                                         // 56
    }                                                                                                                // 56
  },                                                                                                                 // 56
  harga: {                                                                                                           // 57
    type: Number,                                                                                                    // 57
    optional: true,                                                                                                  // 57
    autoform: {                                                                                                      // 57
      type: 'hidden'                                                                                                 // 57
    }                                                                                                                // 57
  },                                                                                                                 // 57
  hasil: {                                                                                                           // 58
    type: String,                                                                                                    // 58
    optional: true,                                                                                                  // 58
    autoform: {                                                                                                      // 58
      type: 'hidden'                                                                                                 // 58
    }                                                                                                                // 58
  }                                                                                                                  // 58
};                                                                                                                   // 55
schema.radio = {                                                                                                     // 60
  idradio: {                                                                                                         // 61
    type: String,                                                                                                    // 61
    optional: true,                                                                                                  // 61
    autoform: {                                                                                                      // 61
      type: 'hidden'                                                                                                 // 61
    }                                                                                                                // 61
  },                                                                                                                 // 61
  nama: {                                                                                                            // 62
    type: String,                                                                                                    // 62
    autoform: {                                                                                                      // 62
      options: selects.radio                                                                                         // 62
    }                                                                                                                // 62
  },                                                                                                                 // 62
  harga: {                                                                                                           // 63
    type: Number,                                                                                                    // 63
    optional: true,                                                                                                  // 63
    autoform: {                                                                                                      // 63
      type: 'hidden'                                                                                                 // 63
    }                                                                                                                // 63
  },                                                                                                                 // 63
  hasil: {                                                                                                           // 64
    type: String,                                                                                                    // 64
    optional: true,                                                                                                  // 64
    autoform: {                                                                                                      // 64
      type: 'hidden'                                                                                                 // 64
    }                                                                                                                // 64
  }                                                                                                                  // 64
};                                                                                                                   // 61
schema.obat = {                                                                                                      // 66
  idobat: {                                                                                                          // 67
    type: String,                                                                                                    // 67
    optional: true,                                                                                                  // 67
    autoform: {                                                                                                      // 67
      type: 'hidden'                                                                                                 // 67
    }                                                                                                                // 67
  },                                                                                                                 // 67
  nama: {                                                                                                            // 68
    type: String,                                                                                                    // 68
    autoform: {                                                                                                      // 68
      options: selects.obat                                                                                          // 68
    }                                                                                                                // 68
  },                                                                                                                 // 68
  puyer: {                                                                                                           // 69
    type: String,                                                                                                    // 69
    optional: true                                                                                                   // 69
  },                                                                                                                 // 69
  aturan: {                                                                                                          // 70
    type: Object                                                                                                     // 70
  },                                                                                                                 // 70
  'aturan.kali': {                                                                                                   // 71
    type: Number                                                                                                     // 71
  },                                                                                                                 // 71
  'aturan.dosis': {                                                                                                  // 72
    type: Number                                                                                                     // 72
  },                                                                                                                 // 72
  'aturan.bentuk': {                                                                                                 // 73
    type: Number,                                                                                                    // 73
    autoform: {                                                                                                      // 73
      options: selects.bentuk                                                                                        // 73
    }                                                                                                                // 73
  },                                                                                                                 // 73
  jumlah: {                                                                                                          // 74
    type: Number                                                                                                     // 74
  },                                                                                                                 // 74
  harga: {                                                                                                           // 75
    type: Number,                                                                                                    // 75
    optional: true,                                                                                                  // 75
    autoform: {                                                                                                      // 75
      type: 'hidden'                                                                                                 // 75
    }                                                                                                                // 75
  },                                                                                                                 // 75
  subtotal: {                                                                                                        // 76
    type: Number,                                                                                                    // 76
    optional: true,                                                                                                  // 76
    autoform: {                                                                                                      // 76
      type: 'hidden'                                                                                                 // 76
    }                                                                                                                // 76
  },                                                                                                                 // 76
  hasil: {                                                                                                           // 77
    type: String,                                                                                                    // 77
    optional: true,                                                                                                  // 77
    autoform: {                                                                                                      // 77
      type: 'hidden'                                                                                                 // 77
    }                                                                                                                // 77
  }                                                                                                                  // 77
};                                                                                                                   // 67
schema.rawat = {                                                                                                     // 79
  no_mr: {                                                                                                           // 80
    type: Number                                                                                                     // 80
  },                                                                                                                 // 80
  rawat: {                                                                                                           // 81
    type: Array                                                                                                      // 81
  },                                                                                                                 // 81
  'rawat.$': {                                                                                                       // 82
    type: Object                                                                                                     // 82
  },                                                                                                                 // 82
  'rawat.$.tanggal': {                                                                                               // 83
    type: Date,                                                                                                      // 83
    autoform: {                                                                                                      // 83
      type: 'hidden'                                                                                                 // 83
    }                                                                                                                // 83
  },                                                                                                                 // 83
  'rawat.$.idbayar': {                                                                                               // 84
    type: String,                                                                                                    // 84
    optional: true,                                                                                                  // 84
    autoform: {                                                                                                      // 84
      type: 'hidden'                                                                                                 // 84
    }                                                                                                                // 84
  },                                                                                                                 // 84
  'rawat.$.jenis': {                                                                                                 // 85
    type: String,                                                                                                    // 85
    optional: true,                                                                                                  // 85
    autoform: {                                                                                                      // 85
      type: 'hidden'                                                                                                 // 85
    }                                                                                                                // 85
  },                                                                                                                 // 85
  'rawat.$.cara_bayar': {                                                                                            // 86
    type: Number,                                                                                                    // 86
    autoform: {                                                                                                      // 86
      options: selects.cara_bayar,                                                                                   // 86
      type: 'select-radio-inline'                                                                                    // 86
    }                                                                                                                // 86
  },                                                                                                                 // 86
  'rawat.$.klinik': {                                                                                                // 87
    type: Number,                                                                                                    // 87
    autoform: {                                                                                                      // 87
      options: selects.klinik,                                                                                       // 87
      type: 'select-radio-inline'                                                                                    // 87
    }                                                                                                                // 87
  },                                                                                                                 // 87
  'rawat.$.karcis': {                                                                                                // 88
    type: Number,                                                                                                    // 88
    optional: true,                                                                                                  // 88
    autoform: {                                                                                                      // 88
      options: selects.karcis,                                                                                       // 88
      type: 'select-radio-inline'                                                                                    // 88
    }                                                                                                                // 88
  },                                                                                                                 // 88
  'rawat.$.rujukan': {                                                                                               // 89
    type: Number,                                                                                                    // 89
    optional: true,                                                                                                  // 89
    autoform: {                                                                                                      // 89
      options: selects.rujukan,                                                                                      // 89
      type: 'select-radio-inline'                                                                                    // 89
    }                                                                                                                // 89
  },                                                                                                                 // 89
  'rawat.$.billRegis': {                                                                                             // 90
    type: Boolean,                                                                                                   // 90
    optional: true,                                                                                                  // 90
    autoform: {                                                                                                      // 90
      type: 'hidden'                                                                                                 // 90
    }                                                                                                                // 90
  },                                                                                                                 // 90
  'rawat.$.nobill': {                                                                                                // 91
    type: Number,                                                                                                    // 91
    autoform: {                                                                                                      // 91
      type: 'hidden'                                                                                                 // 91
    }                                                                                                                // 91
  },                                                                                                                 // 91
  'rawat.$.status_bayar': {                                                                                          // 92
    type: Boolean,                                                                                                   // 92
    optional: true,                                                                                                  // 92
    autoform: {                                                                                                      // 92
      type: 'hidden'                                                                                                 // 92
    }                                                                                                                // 92
  },                                                                                                                 // 92
  'rawat.$.anamesa_perawat': {                                                                                       // 93
    type: String,                                                                                                    // 93
    optional: true,                                                                                                  // 93
    autoform: {                                                                                                      // 93
      afFieldInput: {                                                                                                // 93
        type: 'textarea',                                                                                            // 93
        rows: 6                                                                                                      // 93
      }                                                                                                              // 93
    }                                                                                                                // 93
  },                                                                                                                 // 93
  'rawat.$.fisik': {                                                                                                 // 94
    optional: true,                                                                                                  // 94
    type: [new SimpleSchema(schema.fisik)]                                                                           // 94
  },                                                                                                                 // 94
  'rawat.$.anamesa_dokter': {                                                                                        // 95
    type: String,                                                                                                    // 95
    optional: true,                                                                                                  // 95
    autoform: {                                                                                                      // 95
      afFieldInput: {                                                                                                // 95
        type: 'textarea',                                                                                            // 95
        rows: 6                                                                                                      // 95
      }                                                                                                              // 95
    }                                                                                                                // 95
  },                                                                                                                 // 95
  'rawat.$.diagnosa': {                                                                                              // 96
    type: String,                                                                                                    // 96
    optional: true                                                                                                   // 96
  },                                                                                                                 // 96
  'rawat.$.tindakan': {                                                                                              // 97
    type: [new SimpleSchema(schema.tindakan)],                                                                       // 97
    optional: true                                                                                                   // 97
  },                                                                                                                 // 97
  'rawat.$.labor': {                                                                                                 // 98
    type: [new SimpleSchema(schema.labor)],                                                                          // 98
    optional: true                                                                                                   // 98
  },                                                                                                                 // 98
  'rawat.$.radio': {                                                                                                 // 99
    type: [new SimpleSchema(schema.radio)],                                                                          // 99
    optional: true                                                                                                   // 99
  },                                                                                                                 // 99
  'rawat.$.obat': {                                                                                                  // 100
    type: [new SimpleSchema(schema.obat)],                                                                           // 100
    optional: true                                                                                                   // 100
  },                                                                                                                 // 100
  'rawat.$.total': {                                                                                                 // 101
    type: Object,                                                                                                    // 101
    optional: true,                                                                                                  // 101
    autoform: {                                                                                                      // 101
      type: 'hidden'                                                                                                 // 101
    }                                                                                                                // 101
  },                                                                                                                 // 101
  'rawat.$.total.tindakan': {                                                                                        // 102
    type: Number,                                                                                                    // 102
    optional: true                                                                                                   // 102
  },                                                                                                                 // 102
  'rawat.$.total.labor': {                                                                                           // 103
    type: Number,                                                                                                    // 103
    optional: true                                                                                                   // 103
  },                                                                                                                 // 103
  'rawat.$.total.radio': {                                                                                           // 104
    type: Number,                                                                                                    // 104
    optional: true                                                                                                   // 104
  },                                                                                                                 // 104
  'rawat.$.total.obat': {                                                                                            // 105
    type: Number,                                                                                                    // 105
    optional: true                                                                                                   // 105
  },                                                                                                                 // 105
  'rawat.$.total.semua': {                                                                                           // 106
    type: Number,                                                                                                    // 106
    optional: true                                                                                                   // 106
  },                                                                                                                 // 106
  'rawat.$.spm': {                                                                                                   // 107
    type: Number,                                                                                                    // 107
    optional: true,                                                                                                  // 107
    autoform: {                                                                                                      // 107
      type: 'hidden'                                                                                                 // 107
    }                                                                                                                // 107
  },                                                                                                                 // 107
  'rawat.$.pindah': {                                                                                                // 108
    type: Number,                                                                                                    // 108
    optional: true,                                                                                                  // 108
    autoform: {                                                                                                      // 108
      options: selects.klinik                                                                                        // 108
    }                                                                                                                // 108
  },                                                                                                                 // 108
  'rawat.$.keluar': {                                                                                                // 109
    type: Number,                                                                                                    // 109
    optional: true,                                                                                                  // 109
    autoform: {                                                                                                      // 109
      options: selects.keluar                                                                                        // 109
    }                                                                                                                // 109
  },                                                                                                                 // 109
  'rawat.$.petugas': {                                                                                               // 110
    type: String,                                                                                                    // 110
    autoform: {                                                                                                      // 110
      type: 'hidden'                                                                                                 // 110
    }                                                                                                                // 110
  }                                                                                                                  // 110
};                                                                                                                   // 80
schema.jalan = _.assign(schema.rawat, {});                                                                           // 112
schema.inap = _.assign(schema.rawat, {});                                                                            // 113
schema.igd = _.assign(schema.rawat, {});                                                                             // 114
schema.gudang = {                                                                                                    // 116
  idbarang: {                                                                                                        // 117
    type: String,                                                                                                    // 118
    autoform: {                                                                                                      // 119
      type: 'hidden'                                                                                                 // 119
    },                                                                                                               // 119
    autoValue: function () {                                                                                         // 120
      return randomId();                                                                                             // 522
    }                                                                                                                // 118
  },                                                                                                                 // 118
  jenis: {                                                                                                           // 121
    type: Number,                                                                                                    // 121
    autoform: {                                                                                                      // 121
      options: selects.barang                                                                                        // 121
    }                                                                                                                // 121
  },                                                                                                                 // 121
  nama: {                                                                                                            // 122
    type: String                                                                                                     // 122
  },                                                                                                                 // 122
  batch: {                                                                                                           // 123
    type: Array                                                                                                      // 123
  },                                                                                                                 // 123
  'batch.$': {                                                                                                       // 124
    type: Object                                                                                                     // 124
  },                                                                                                                 // 124
  'batch.$.idbatch': {                                                                                               // 125
    type: String,                                                                                                    // 126
    autoform: {                                                                                                      // 127
      type: 'hidden'                                                                                                 // 127
    },                                                                                                               // 127
    autoValue: function () {                                                                                         // 128
      return randomId();                                                                                             // 546
    }                                                                                                                // 126
  },                                                                                                                 // 126
  'batch.$.nobatch': {                                                                                               // 129
    type: String                                                                                                     // 129
  },                                                                                                                 // 129
  'batch.$.merek': {                                                                                                 // 130
    type: String                                                                                                     // 130
  },                                                                                                                 // 130
  'batch.$.satuan': {                                                                                                // 131
    type: Number,                                                                                                    // 131
    autoform: {                                                                                                      // 131
      options: selects.satuan                                                                                        // 131
    }                                                                                                                // 131
  },                                                                                                                 // 131
  'batch.$.masuk': {                                                                                                 // 132
    type: Date,                                                                                                      // 132
    autoform: {                                                                                                      // 132
      type: 'pickadate'                                                                                              // 132
    }                                                                                                                // 132
  },                                                                                                                 // 132
  'batch.$.kadaluarsa': {                                                                                            // 133
    type: Date,                                                                                                      // 133
    autoform: {                                                                                                      // 133
      type: 'pickadate'                                                                                              // 133
    }                                                                                                                // 133
  },                                                                                                                 // 133
  'batch.$.digudang': {                                                                                              // 134
    type: Number                                                                                                     // 134
  },                                                                                                                 // 134
  'batch.$.diapotik': {                                                                                              // 135
    type: Number                                                                                                     // 135
  },                                                                                                                 // 135
  'batch.$.beli': {                                                                                                  // 136
    type: Number,                                                                                                    // 136
    decimal: true                                                                                                    // 136
  },                                                                                                                 // 136
  'batch.$.jual': {                                                                                                  // 137
    type: Number,                                                                                                    // 137
    decimal: true                                                                                                    // 137
  },                                                                                                                 // 137
  'batch.$.suplier': {                                                                                               // 138
    type: String                                                                                                     // 138
  },                                                                                                                 // 138
  'batch.$.anggaran': {                                                                                              // 139
    type: Number,                                                                                                    // 139
    autoform: {                                                                                                      // 139
      options: selects.anggaran                                                                                      // 139
    }                                                                                                                // 139
  },                                                                                                                 // 139
  'batch.$.pengadaan': {                                                                                             // 140
    type: Number                                                                                                     // 140
  }                                                                                                                  // 140
};                                                                                                                   // 117
schema.farmasi = _.assign(schema.gudang, {});                                                                        // 142
schema.logistik = _.assign(schema.gudang, {});                                                                       // 143
schema.dokter = {                                                                                                    // 145
  nama: {                                                                                                            // 146
    type: String                                                                                                     // 146
  },                                                                                                                 // 146
  tipe: {                                                                                                            // 147
    type: Number,                                                                                                    // 147
    autoform: {                                                                                                      // 147
      options: selects.tipe_dokter                                                                                   // 147
    }                                                                                                                // 147
  },                                                                                                                 // 147
  poli: {                                                                                                            // 148
    type: Number,                                                                                                    // 148
    autoform: {                                                                                                      // 148
      options: selects.klinik                                                                                        // 148
    }                                                                                                                // 148
  }                                                                                                                  // 148
};                                                                                                                   // 146
schema.tarif = {                                                                                                     // 150
  jenis: {                                                                                                           // 151
    type: String                                                                                                     // 151
  },                                                                                                                 // 151
  nama: {                                                                                                            // 152
    type: String                                                                                                     // 152
  },                                                                                                                 // 152
  harga: {                                                                                                           // 153
    type: Number                                                                                                     // 153
  },                                                                                                                 // 153
  grup: {                                                                                                            // 154
    type: String,                                                                                                    // 154
    optional: true                                                                                                   // 154
  }                                                                                                                  // 154
};                                                                                                                   // 151
                                                                                                                     //
_.map(['dokter', 'tarif'], function (i) {                                                                            // 156
  var obj;                                                                                                           // 157
  obj = {                                                                                                            // 157
    active: {                                                                                                        // 157
      type: Boolean,                                                                                                 // 158
      autoform: {                                                                                                    // 159
        type: 'hidden'                                                                                               // 159
      },                                                                                                             // 159
      autoValue: function () {                                                                                       // 160
        return true;                                                                                                 // 648
      }                                                                                                              // 158
    }                                                                                                                // 158
  };                                                                                                                 // 157
  return _.assign(schema[i], obj);                                                                                   // 652
});                                                                                                                  // 156
                                                                                                                     //
_.map(['pasien', 'gudang', 'dokter', 'tarif'], function (i) {                                                        // 163
  var arr;                                                                                                           // 164
  coll[i] = new Meteor.Collection(i);                                                                                // 164
  arr = ['insert', 'update', 'remove'];                                                                              // 165
  return coll[i].allow(_.zipObject(arr, _.map(arr, function (i) {                                                    // 659
    return function () {                                                                                             // 660
      return true;                                                                                                   // 661
    };                                                                                                               // 166
  })));                                                                                                              // 166
});                                                                                                                  // 163
                                                                                                                     //
_.map(modules.slice(0, 10), function (i) {                                                                           // 168
  return Router.route('/' + i.name + '/:no_mr?', {                                                                   // 667
    name: i.name,                                                                                                    // 170
    action: function () {                                                                                            // 171
      return this.render('pasien');                                                                                  // 670
    },                                                                                                               // 170
    waitOn: function () {                                                                                            // 172
      return _.map(['dokter', 'tarif', 'gudang'], function (j) {                                                     // 673
        return Meteor.subscribe('coll', j, {}, {});                                                                  // 674
      });                                                                                                            // 173
    }                                                                                                                // 170
  });                                                                                                                // 170
});                                                                                                                  // 168
                                                                                                                     //
_.map(modules.slice(10, 12), function (i) {                                                                          // 176
  return Router.route('/' + i.name + '/:idbarang?', {                                                                // 681
    name: i.name,                                                                                                    // 178
    action: function () {                                                                                            // 179
      return this.render('gudang');                                                                                  // 684
    }                                                                                                                // 178
  });                                                                                                                // 178
});                                                                                                                  // 176
                                                                                                                     //
_.map(['panduan'], function (i) {                                                                                    // 181
  return Router.route('/' + i, {                                                                                     // 690
    action: function () {                                                                                            // 183
      return this.render(i);                                                                                         // 692
    }                                                                                                                // 183
  });                                                                                                                // 183
});                                                                                                                  // 181
                                                                                                                     //
Router.route('/manajemen', {                                                                                         // 185
  action: function () {                                                                                              // 186
    return this.render('manajemen');                                                                                 // 699
  },                                                                                                                 // 186
  waitOn: function () {                                                                                              // 187
    return [Meteor.subscribe('users'), Meteor.subscribe('coll', 'dokter', {}, {}), Meteor.subscribe('coll', 'tarif', {}, {})];
  }                                                                                                                  // 186
});                                                                                                                  // 186
Router.route('/login', function () {                                                                                 // 193
  return {                                                                                                           // 707
    action: function () {                                                                                            // 194
      return this.render('login');                                                                                   // 709
    }                                                                                                                // 194
  };                                                                                                                 // 194
});                                                                                                                  // 193
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
    return moment(date).format('D MMM YYYY');                                                                        // 43
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
    return roles()[name];                                                                                            // 97
  }], ['userRole', function (name) {                                                                                 // 29
    return roles()[currentRoute()][0] === name;                                                                      // 101
  }], ['pagins', function (name) {                                                                                   // 30
    var end, l, length, limit, results;                                                                              // 32
    limit = Session.get('limit');                                                                                    // 32
    length = coll[name].find().fetch().length;                                                                       // 33
    end = (length - length % limit) / limit;                                                                         // 34
    return function () {                                                                                             // 109
      results = [];                                                                                                  // 110
                                                                                                                     //
      for (var l = 1; 1 <= end ? l <= end : l >= end; 1 <= end ? l++ : l--) {                                        // 111
        results.push(l);                                                                                             // 111
      }                                                                                                              // 111
                                                                                                                     //
      return results;                                                                                                // 112
    }.apply(this);                                                                                                   // 113
  }]];                                                                                                               // 31
                                                                                                                     //
  _.map(globalHelpers, function (i) {                                                                                // 38
    return Template.registerHelper.apply(Template, i);                                                               // 118
  });                                                                                                                // 38
                                                                                                                     //
  Template.body.events({                                                                                             // 40
    'keypress #search': function (event) {                                                                           // 41
      var term;                                                                                                      // 42
                                                                                                                     //
      if (event.key === 'Enter') {                                                                                   // 42
        term = event.target.value;                                                                                   // 43
                                                                                                                     //
        if (term.length > 2) {                                                                                       // 44
          return Session.set('search', term);                                                                        // 126
        }                                                                                                            // 42
      }                                                                                                              // 128
    }                                                                                                                // 41
  });                                                                                                                // 41
  Template.layout.onRendered(function () {                                                                           // 47
    Session.set('limit', 10);                                                                                        // 48
    return Session.set('page', 0);                                                                                   // 133
  });                                                                                                                // 47
  Template.menu.helpers({                                                                                            // 51
    menus: function () {                                                                                             // 52
      return _.flatMap(_.keys(roles()), function (i) {                                                               // 137
        var find;                                                                                                    // 54
        find = _.find(rights, function (j) {                                                                         // 54
          return j.group === i;                                                                                      // 140
        });                                                                                                          // 54
        return _.map(find.list, function (j) {                                                                       // 142
          return _.find(modules, function (k) {                                                                      // 143
            return k.name === j;                                                                                     // 144
          });                                                                                                        // 55
        });                                                                                                          // 55
      });                                                                                                            // 53
    },                                                                                                               // 52
    navTitle: function () {                                                                                          // 56
      var find;                                                                                                      // 57
      find = _.find(modules, function (i) {                                                                          // 57
        return i.name === currentRoute();                                                                            // 152
      });                                                                                                            // 57
      return (find != null ? find.full : void 0) || _.startCase(currentRoute());                                     // 154
    },                                                                                                               // 52
    today: function () {                                                                                             // 59
      return moment().format('LLL');                                                                                 // 157
    }                                                                                                                // 52
  });                                                                                                                // 52
  Template.menu.events({                                                                                             // 61
    'click #logout': function () {                                                                                   // 62
      return Meteor.logout();                                                                                        // 162
    }                                                                                                                // 62
  });                                                                                                                // 62
  Template.pasien.helpers({                                                                                          // 64
    route: function () {                                                                                             // 65
      return currentRoute();                                                                                         // 167
    },                                                                                                               // 65
    formType: function () {                                                                                          // 66
      if (currentRoute() === 'regis') {                                                                              // 67
        if (currentPar('no_mr')) {                                                                                   // 68
          return 'update';                                                                                           // 172
        } else {                                                                                                     // 68
          return 'insert';                                                                                           // 174
        }                                                                                                            // 67
      } else {                                                                                                       // 67
        return 'update-pushArray';                                                                                   // 177
      }                                                                                                              // 178
    },                                                                                                               // 65
    umur: function (date) {                                                                                          // 71
      return moment().diff(date, 'years') + ' tahun';                                                                // 181
    },                                                                                                               // 65
    showButton: function () {                                                                                        // 72
      return Router.current().params.no_mr || currentRoute() === 'regis';                                            // 184
    },                                                                                                               // 65
    showButtonText: function () {                                                                                    // 73
      switch (currentRoute()) {                                                                                      // 74
        case 'regis':                                                                                                // 74
          return '+ Pasien';                                                                                         // 189
                                                                                                                     //
        case 'jalan':                                                                                                // 74
          return '+ Rawat';                                                                                          // 191
      }                                                                                                              // 74
    },                                                                                                               // 65
    formDoc: function () {                                                                                           // 77
      return formDoc();                                                                                              // 195
    },                                                                                                               // 65
    preview: function () {                                                                                           // 78
      return Session.get('preview');                                                                                 // 198
    },                                                                                                               // 65
    omitFields: function () {                                                                                        // 79
      var arr;                                                                                                       // 80
      arr = ['fisik', 'anamesa_perawat', 'anamesa_dokter', 'diagnosa', 'tindakan', 'labor', 'radio', 'obat', 'spm', 'keluar', 'pindah'];
                                                                                                                     //
      if (!(formDoc() && formDoc().billRegis)) {                                                                     // 81
        return arr;                                                                                                  // 204
      } else if (_.split(Meteor.user().username, '.')[0] !== 'dr') {                                                 // 81
        return arr.slice(2, +arr.length + 1 || 9e9);                                                                 // 206
      }                                                                                                              // 207
    },                                                                                                               // 65
    roleFilter: function (arr) {                                                                                     // 85
      return _.reverse(_.filter(arr, function (i) {                                                                  // 210
        var find;                                                                                                    // 86
        find = _.find(selects.klinik, function (j) {                                                                 // 86
          return j.label === _.startCase(roles().jalan[0]);                                                          // 213
        });                                                                                                          // 86
        return i.klinik === find.value;                                                                              // 215
      }));                                                                                                           // 85
    },                                                                                                               // 65
    userPoli: function () {                                                                                          // 89
      return roles().jalan;                                                                                          // 219
    },                                                                                                               // 65
    insurance: function (val) {                                                                                      // 90
      return 'Rp ' + numeral(val + 30000).format('0,0');                                                             // 222
    },                                                                                                               // 65
    selPol: function () {                                                                                            // 91
      return _.map(roles().jalan, function (i) {                                                                     // 225
        return _.find(selects.klinik, function (j) {                                                                 // 226
          return i === _.snakeCase(j.label);                                                                         // 227
        });                                                                                                          // 92
      });                                                                                                            // 91
    },                                                                                                               // 65
    pasiens: function () {                                                                                           // 93
      var arr, byName, byNoMR, elem, filter, kliniks, now, options, past, ref, ref1, selSub, selector, sub;          // 94
                                                                                                                     //
      if (currentPar('no_mr')) {                                                                                     // 94
        selector = {                                                                                                 // 95
          no_mr: parseInt(currentPar('no_mr'))                                                                       // 95
        };                                                                                                           // 95
        options = {                                                                                                  // 96
          fields: {                                                                                                  // 96
            no_mr: 1,                                                                                                // 96
            regis: 1                                                                                                 // 96
          }                                                                                                          // 96
        };                                                                                                           // 96
        arr = ['bayar', 'jalan', 'labor', 'radio', 'obat'];                                                          // 97
                                                                                                                     //
        if (ref = currentRoute(), indexOf.call(arr, ref) >= 0) {                                                     // 98
          options.fields.rawat = 1;                                                                                  // 98
        }                                                                                                            // 246
                                                                                                                     //
        sub = Meteor.subscribe('coll', 'pasien', selector, options);                                                 // 99
                                                                                                                     //
        if (sub.ready()) {                                                                                           // 100
          return coll.pasien.findOne();                                                                              // 249
        }                                                                                                            // 94
      } else if (search()) {                                                                                         // 94
        byName = {                                                                                                   // 102
          'regis.nama_lengkap': {                                                                                    // 102
            $options: '-i',                                                                                          // 102
            $regex: '.*' + search() + '.*'                                                                           // 102
          }                                                                                                          // 102
        };                                                                                                           // 102
        byNoMR = {                                                                                                   // 103
          no_mr: parseInt(search())                                                                                  // 103
        };                                                                                                           // 103
        selector = {                                                                                                 // 104
          $or: [byName, byNoMR]                                                                                      // 104
        };                                                                                                           // 104
        options = {                                                                                                  // 105
          fields: {                                                                                                  // 105
            no_mr: 1,                                                                                                // 105
            regis: 1                                                                                                 // 105
          }                                                                                                          // 105
        };                                                                                                           // 105
        sub = Meteor.subscribe('coll', 'pasien', selector, options);                                                 // 106
                                                                                                                     //
        if (sub.ready()) {                                                                                           // 107
          return coll.pasien.find().fetch();                                                                         // 272
        }                                                                                                            // 101
      } else if (roles().jalan) {                                                                                    // 101
        now = new Date();                                                                                            // 109
        past = new Date(now.getDate() - 2);                                                                          // 109
        kliniks = _.map(roles().jalan, function (i) {                                                                // 110
          var find;                                                                                                  // 111
          find = _.find(selects.klinik, function (j) {                                                               // 111
            return i === _.snakeCase(j.label);                                                                       // 280
          });                                                                                                        // 111
          return find.value;                                                                                         // 282
        });                                                                                                          // 110
        selector = {                                                                                                 // 113
          rawat: {                                                                                                   // 113
            $elemMatch: {                                                                                            // 113
              klinik: {                                                                                              // 114
                $in: kliniks                                                                                         // 114
              },                                                                                                     // 114
              tanggal: {                                                                                             // 115
                $gt: past                                                                                            // 115
              }                                                                                                      // 115
            }                                                                                                        // 114
          }                                                                                                          // 113
        };                                                                                                           // 113
        sub = Meteor.subscribe('coll', 'pasien', selector, {});                                                      // 116
                                                                                                                     //
        if (sub.ready()) {                                                                                           // 117
          filter = _.filter(coll.pasien.find().fetch(), function (i) {                                               // 118
            var a, b, c, selPol;                                                                                     // 119
                                                                                                                     //
            a = function () {                                                                                        // 119
              var ref1;                                                                                              // 119
              return ref1 = i.rawat[i.rawat.length - 1].klinik, indexOf.call(kliniks, ref1) >= 0;                    // 302
            };                                                                                                       // 119
                                                                                                                     //
            b = function () {                                                                                        // 120
              return !i.rawat[i.rawat.length - 1].total.semua;                                                       // 305
            };                                                                                                       // 120
                                                                                                                     //
            selPol = Session.get('selPol');                                                                          // 121
                                                                                                                     //
            c = function () {                                                                                        // 122
              return i.rawat[i.rawat.length - 1].klinik === selPol;                                                  // 309
            };                                                                                                       // 122
                                                                                                                     //
            if (selPol) {                                                                                            // 123
              return b() && c();                                                                                     // 312
            } else {                                                                                                 // 123
              return a() && b();                                                                                     // 314
            }                                                                                                        // 315
          });                                                                                                        // 118
          return _.sortBy(filter, function (i) {                                                                     // 317
            return i.rawat[i.rawat.length - 1].tanggal;                                                              // 318
          });                                                                                                        // 124
        }                                                                                                            // 108
      } else if (currentRoute() === 'bayar') {                                                                       // 108
        selector = {                                                                                                 // 126
          rawat: {                                                                                                   // 126
            $elemMatch: {                                                                                            // 126
              $or: [{                                                                                                // 126
                'status_bayar': {                                                                                    // 126
                  $ne: true                                                                                          // 126
                }                                                                                                    // 126
              }]                                                                                                     // 126
            }                                                                                                        // 126
          }                                                                                                          // 126
        };                                                                                                           // 126
        sub = Meteor.subscribe('coll', 'pasien', selector, {});                                                      // 127
                                                                                                                     //
        if (sub.ready()) {                                                                                           // 128
          return coll.pasien.find().fetch();                                                                         // 337
        }                                                                                                            // 125
      } else if ((ref1 = currentRoute()) === 'labor' || ref1 === 'radio' || ref1 === 'obat') {                       // 125
        elem = {                                                                                                     // 130
          'status_bayar': true                                                                                       // 130
        };                                                                                                           // 130
        elem[currentRoute()] = {                                                                                     // 131
          $exists: true,                                                                                             // 131
          $elemMatch: {                                                                                              // 131
            hasil: {                                                                                                 // 131
              $exists: false                                                                                         // 131
            }                                                                                                        // 131
          }                                                                                                          // 131
        };                                                                                                           // 131
        selSub = {                                                                                                   // 132
          rawat: {                                                                                                   // 132
            $elemMatch: elem                                                                                         // 132
          }                                                                                                          // 132
        };                                                                                                           // 132
        sub = Meteor.subscribe('coll', 'pasien', selSub, {});                                                        // 133
                                                                                                                     //
        if (sub.ready()) {                                                                                           // 134
          return coll.pasien.find().fetch();                                                                         // 358
        }                                                                                                            // 129
      }                                                                                                              // 360
    }                                                                                                                // 65
  });                                                                                                                // 65
  Template.pasien.events({                                                                                           // 136
    'click #showForm': function () {                                                                                 // 137
      var later;                                                                                                     // 138
      Session.set('showForm', !Session.get('showForm'));                                                             // 138
                                                                                                                     //
      later = function () {                                                                                          // 139
        var list;                                                                                                    // 140
        $('.autoform-remove-item').trigger('click');                                                                 // 140
                                                                                                                     //
        if (currentRoute() === 'jalan') {                                                                            // 141
          _.map(['cara_bayar', 'klinik', 'karcis', 'rujukan'], function (i) {                                        // 142
            $('div[data-schema-key="' + i + '"]').prepend(tag('p', _.startCase(i)));                                 // 143
                                                                                                                     //
            if (formDoc()) {                                                                                         // 144
              $('input[name="' + i + '"][value="' + formDoc()[i] + '"]').attr({                                      // 145
                checked: true                                                                                        // 145
              });                                                                                                    // 145
              return $('input[name="' + i + '"]').attr({                                                             // 377
                disabled: 'disabled'                                                                                 // 146
              });                                                                                                    // 146
            }                                                                                                        // 380
          });                                                                                                        // 142
                                                                                                                     //
          _.map(['anamesa_perawat'], function (i) {                                                                  // 147
            return $('textarea[name="' + i + '"]').val(formDoc()[i]);                                                // 383
          });                                                                                                        // 147
        }                                                                                                            // 385
                                                                                                                     //
        list = ['cara_bayar', 'kelamin', 'agama', 'nikah', 'pendidikan', 'darah', 'pekerjaan'];                      // 149
                                                                                                                     //
        if (currentRoute() === 'regis') {                                                                            // 150
          return _.map(list, function (i) {                                                                          // 388
            return $('div[data-schema-key="regis.' + i + '"]').prepend(tag('p', _.startCase(i)));                    // 389
          });                                                                                                        // 150
        }                                                                                                            // 391
      };                                                                                                             // 139
                                                                                                                     //
      Meteor.setTimeout(later, 1000);                                                                                // 152
      Meteor.subscribe('coll', 'gudang', {}, {});                                                                    // 153
      return Session.set('begin', moment());                                                                         // 395
    },                                                                                                               // 137
    'dblclick #row': function () {                                                                                   // 155
      return Router.go('/' + currentRoute() + '/' + this.no_mr);                                                     // 398
    },                                                                                                               // 137
    'click #close': function () {                                                                                    // 157
      sessNull();                                                                                                    // 157
      return Router.go(currentRoute());                                                                              // 402
    },                                                                                                               // 137
    'click #card': function () {                                                                                     // 158
      var dialog;                                                                                                    // 159
      dialog = {                                                                                                     // 159
        title: 'Cetak Kartu',                                                                                        // 160
        message: 'Yakin untuk cetak kartu ini?'                                                                      // 161
      };                                                                                                             // 160
      return new Confirmation(dialog, function (ok) {                                                                // 410
        if (ok) {                                                                                                    // 162
          return makePdf.card();                                                                                     // 412
        }                                                                                                            // 413
      });                                                                                                            // 162
    },                                                                                                               // 137
    'click #consent': function () {                                                                                  // 165
      var dialog;                                                                                                    // 166
      dialog = {                                                                                                     // 166
        title: 'Cetak General Consent',                                                                              // 167
        message: 'Yakin untuk cetak persetujuan pasien?'                                                             // 168
      };                                                                                                             // 167
      return new Confirmation(dialog, function (ok) {                                                                // 422
        if (ok) {                                                                                                    // 169
          return makePdf.consent();                                                                                  // 424
        }                                                                                                            // 425
      });                                                                                                            // 169
    },                                                                                                               // 137
    'dblclick #bill': function (event) {                                                                             // 170
      var dialog, nodes;                                                                                             // 171
      nodes = _.map(['pasien', 'idbayar', 'karcis'], function (i) {                                                  // 171
        return event.target.attributes[i].nodeValue;                                                                 // 431
      });                                                                                                            // 171
      dialog = {                                                                                                     // 173
        title: 'Pembayaran Pendaftaran',                                                                             // 174
        message: 'Apakah yakin pasien sudah membayar?'                                                               // 175
      };                                                                                                             // 174
      return new Confirmation(dialog, function (ok) {                                                                // 437
        if (ok) {                                                                                                    // 176
          if (nodes[1]) {                                                                                            // 177
            Meteor.call.apply(Meteor, ['billRegis'].concat(slice.call(nodes.slice(0, 2)), [true]));                  // 178
            return makePdf.payRegCard(nodes[2], '...');                                                              // 441
          } else {                                                                                                   // 177
            Meteor.call('billCard', nodes[0], false);                                                                // 181
            return makePdf.payRegCard(10000, 'Sepuluh Ribu Rupiah');                                                 // 444
          }                                                                                                          // 176
        }                                                                                                            // 446
      });                                                                                                            // 176
    },                                                                                                               // 137
    'dblclick #bayar': function (event) {                                                                            // 183
      var dialog, nodes;                                                                                             // 184
      nodes = _.map(['pasien', 'idbayar'], function (i) {                                                            // 184
        return event.target.attributes[i].nodeValue;                                                                 // 452
      });                                                                                                            // 184
      dialog = {                                                                                                     // 186
        title: 'Konfirmasi Pembayaran',                                                                              // 187
        message: 'Apakah yakin tagihan ini sudah dibayar?'                                                           // 188
      };                                                                                                             // 187
      return new Confirmation(dialog, function (ok) {                                                                // 458
        var doc, pasien;                                                                                             // 189
                                                                                                                     //
        if (ok) {                                                                                                    // 189
          Meteor.call.apply(Meteor, ['bayar'].concat(slice.call(nodes)));                                            // 190
          pasien = coll.pasien.findOne({                                                                             // 191
            no_mr: parseInt(nodes[0])                                                                                // 191
          });                                                                                                        // 191
          doc = _.find(pasien.rawat, function (i) {                                                                  // 192
            return i.idbayar === nodes[1];                                                                           // 466
          });                                                                                                        // 192
          return makePdf.payRawat(doc);                                                                              // 468
        }                                                                                                            // 469
      });                                                                                                            // 189
    },                                                                                                               // 137
    'dblclick #request': function (event) {                                                                          // 194
      var nodes;                                                                                                     // 195
      nodes = _.map(['pasien', 'idbayar', 'jenis', 'idjenis'], function (i) {                                        // 195
        return event.target.attributes[i].nodeValue;                                                                 // 475
      });                                                                                                            // 195
      return MaterializeModal.prompt({                                                                               // 477
        message: 'Isikan data requestnya',                                                                           // 198
        callback: function (err, res) {                                                                              // 199
          var params;                                                                                                // 199
                                                                                                                     //
          if (res.submit) {                                                                                          // 199
            params = ['request'].concat(slice.call(nodes), [res.value]);                                             // 200
            return Meteor.call.apply(Meteor, slice.call(params).concat([function (err, res) {                        // 483
              var flat, key, message, rekap, val;                                                                    // 201
                                                                                                                     //
              if (res) {                                                                                             // 201
                message = '';                                                                                        // 202
                                                                                                                     //
                for (key in meteorBabelHelpers.sanitizeForInObject(res)) {                                           // 203
                  val = res[key];                                                                                    // 488
                  message += '</p>' + key + ': ' + val + '</p>';                                                     // 204
                }                                                                                                    // 203
                                                                                                                     //
                MaterializeModal.message({                                                                           // 205
                  title: 'Penyerahan Obat',                                                                          // 206
                  message: message                                                                                   // 207
                });                                                                                                  // 206
                rekap = Session.get('rekap') || [];                                                                  // 208
                flat = _.flatten(_.toPairs(res));                                                                    // 209
                return Session.set('rekap', slice.call(rekap).concat([slice.call(nodes).concat(slice.call(flat))]));
              }                                                                                                      // 498
            }]));                                                                                                    // 201
          }                                                                                                          // 500
        }                                                                                                            // 198
      });                                                                                                            // 198
    },                                                                                                               // 137
    'dblclick #rekap': function () {                                                                                 // 211
      var headers;                                                                                                   // 212
      headers = ['Pasien', 'ID Bayar', 'Jenis', 'ID Request', 'No Batch', 'Jumlah'];                                 // 212
      makePdf.rekap([headers].concat(slice.call(Session.get('rekap'))));                                             // 213
      return Session.set('rekap', null);                                                                             // 508
    },                                                                                                               // 137
    'click .modal-trigger': function (event) {                                                                       // 215
      if (this.idbayar) {                                                                                            // 216
        Session.set('formDoc', this);                                                                                // 217
        Session.set('preview', modForm(this, this.idbayar));                                                         // 218
      }                                                                                                              // 514
                                                                                                                     //
      return $('#preview').modal('open');                                                                            // 515
    },                                                                                                               // 137
    'click #rmRawat': function () {                                                                                  // 220
      var dialog, self;                                                                                              // 221
      self = this;                                                                                                   // 221
      dialog = {                                                                                                     // 222
        title: 'Konfirmasi Hapus',                                                                                   // 223
        message: 'Apakah yakin hapus data rawat pasien ini?'                                                         // 224
      };                                                                                                             // 223
      return new Confirmation(dialog, function (ok) {                                                                // 524
        if (ok) {                                                                                                    // 225
          return Meteor.call('rmRawat', currentPar('no_mr'), self.idbayar);                                          // 526
        }                                                                                                            // 527
      });                                                                                                            // 225
    },                                                                                                               // 137
    'change #selPol': function (event) {                                                                             // 227
      return Session.set('selPol', parseInt(event.target.id));                                                       // 531
    },                                                                                                               // 137
    'click #rmPasien': function () {                                                                                 // 229
      var dialog;                                                                                                    // 230
      dialog = {                                                                                                     // 230
        title: 'Hapus Pasien',                                                                                       // 231
        message: 'Apakah yakin untuk menghapus pasien?'                                                              // 232
      };                                                                                                             // 231
      return new Confirmation(dialog, function (ok) {                                                                // 539
        if (ok) {                                                                                                    // 233
          Meteor.call('rmPasien', currentPar('no_mr'));                                                              // 234
          return Router.go('/' + currentRoute());                                                                    // 542
        }                                                                                                            // 543
      });                                                                                                            // 233
    }                                                                                                                // 137
  });                                                                                                                // 137
  Template["import"].events({                                                                                        // 237
    'change :file': function (event, template) {                                                                     // 238
      return Papa.parse(event.target.files[0], {                                                                     // 549
        header: true,                                                                                                // 240
        step: function (result) {                                                                                    // 241
          var data, modifier, selector;                                                                              // 242
          data = result.data[0];                                                                                     // 242
                                                                                                                     //
          if (currentRoute() === 'regis') {                                                                          // 243
            selector = {                                                                                             // 244
              no_mr: parseInt(data.no_mr)                                                                            // 244
            };                                                                                                       // 244
            modifier = {                                                                                             // 245
              regis: {                                                                                               // 245
                nama_lengkap: _.startCase(data.nama_lengkap),                                                        // 246
                alamat: _.startCase(data.alamat),                                                                    // 247
                agama: parseInt(data.agama),                                                                         // 248
                ayah: _.startCase(data.ayah),                                                                        // 249
                nikah: parseInt(data.nikah),                                                                         // 250
                pekerjaan: parseInt(data.pekerjaan),                                                                 // 251
                pendidikan: parseInt(data.pendidikan),                                                               // 252
                tgl_lahir: new Date(data.tgl_lahir),                                                                 // 253
                tmpt_kelahiran: _.startCase(data.tmpt_kelahiran)                                                     // 254
              }                                                                                                      // 246
            };                                                                                                       // 245
            return Meteor.call('import', 'pasien', selector, modifier);                                              // 571
          } else if (currentRoute() === 'manajemen') {                                                               // 243
            if (data.tipe) {                                                                                         // 257
              selector = {                                                                                           // 258
                nama: data.nama                                                                                      // 258
              };                                                                                                     // 258
              modifier = {                                                                                           // 259
                tipe: parseInt(data.tipe),                                                                           // 260
                poli: parseInt(data.poli),                                                                           // 261
                active: true                                                                                         // 262
              };                                                                                                     // 260
              return Meteor.call('import', 'dokter', selector, modifier);                                            // 582
            } else if (data.harga) {                                                                                 // 257
              selector = {                                                                                           // 265
                nama: _.snakeCase(data.nama)                                                                         // 265
              };                                                                                                     // 265
              modifier = {                                                                                           // 266
                harga: parseInt(data.harga),                                                                         // 267
                jenis: _.snakeCase(data.jenis),                                                                      // 268
                active: true                                                                                         // 269
              };                                                                                                     // 267
              data.grup && (modifier.grup = _.startCase(data.grup));                                                 // 270
              return Meteor.call('import', 'tarif', selector, modifier);                                             // 593
            } else if (data.password) {                                                                              // 264
              Meteor.call('newUser', data);                                                                          // 273
              return Meteor.call('addRole', data.username, [data.role], data.group);                                 // 596
            }                                                                                                        // 256
          } else if (currentRoute() === 'farmasi') {                                                                 // 256
            selector = {                                                                                             // 276
              nama: data.nama                                                                                        // 276
            };                                                                                                       // 276
            modifier = {                                                                                             // 277
              jenis: parseInt(data.jenis),                                                                           // 278
              idbarang: randomId(),                                                                                  // 279
              batch: [{                                                                                              // 280
                idbatch: randomId(),                                                                                 // 281
                anggaran: data.anggaran,                                                                             // 282
                beli: parseInt(data.beli),                                                                           // 283
                diapotik: parseInt(data.diapotik),                                                                   // 284
                digudang: parseInt(data.digudang),                                                                   // 285
                jenis: parseInt(data.jenis),                                                                         // 286
                jual: parseInt(data.jual),                                                                           // 287
                kadaluarsa: new Date(data.kadaluarsa),                                                               // 288
                masuk: new Date(data.masuk),                                                                         // 289
                merek: data.merek || '',                                                                             // 290
                nobatch: data.nobatch,                                                                               // 291
                pengadaan: parseInt(data.pengadaan),                                                                 // 292
                satuan: parseInt(data.satuan),                                                                       // 293
                suplier: data.suplier                                                                                // 294
              }]                                                                                                     // 281
            };                                                                                                       // 278
            return data.nama && Meteor.call('import', 'gudang', selector, modifier, 'batch');                        // 624
          }                                                                                                          // 625
        }                                                                                                            // 240
      });                                                                                                            // 240
    }                                                                                                                // 238
  });                                                                                                                // 238
  Template.gudang.helpers({                                                                                          // 298
    schemagudang: function () {                                                                                      // 299
      return new SimpleSchema(schema.gudang);                                                                        // 632
    },                                                                                                               // 299
    formType: function () {                                                                                          // 300
      if (currentPar('idbarang')) {                                                                                  // 300
        return 'update-pushArray';                                                                                   // 636
      } else {                                                                                                       // 300
        return 'insert';                                                                                             // 638
      }                                                                                                              // 639
    },                                                                                                               // 299
    gudangs: function () {                                                                                           // 301
      var byBatch, byName, selector, sub;                                                                            // 302
                                                                                                                     //
      if (currentPar('idbarang')) {                                                                                  // 302
        selector = {                                                                                                 // 303
          idbarang: currentPar('idbarang')                                                                           // 303
        };                                                                                                           // 303
        sub = Meteor.subscribe('coll', 'gudang', selector, {});                                                      // 304
                                                                                                                     //
        if (sub.ready()) {                                                                                           // 305
          return coll.gudang.findOne();                                                                              // 649
        }                                                                                                            // 302
      } else if (search()) {                                                                                         // 302
        byName = {                                                                                                   // 307
          nama: {                                                                                                    // 307
            $options: '-i',                                                                                          // 307
            $regex: '.*' + search() + '.*'                                                                           // 307
          }                                                                                                          // 307
        };                                                                                                           // 307
        byBatch = {                                                                                                  // 308
          idbatch: search()                                                                                          // 308
        };                                                                                                           // 308
        selector = {                                                                                                 // 309
          $or: [byName, byBatch]                                                                                     // 309
        };                                                                                                           // 309
        sub = Meteor.subscribe('coll', 'gudang', selector, {});                                                      // 310
        return sub.ready() && coll.gudang.find().fetch();                                                            // 665
      } else {                                                                                                       // 306
        sub = Meteor.subscribe('coll', 'gudang', {}, {});                                                            // 313
        return sub.ready() && coll.gudang.find().fetch();                                                            // 668
      }                                                                                                              // 669
    }                                                                                                                // 299
  });                                                                                                                // 299
  Template.gudang.events({                                                                                           // 316
    'click #showForm': function () {                                                                                 // 317
      return Session.set('showForm', !Session.get('showForm'));                                                      // 674
    },                                                                                                               // 317
    'dblclick #row': function () {                                                                                   // 319
      return Router.go('/' + currentRoute() + '/' + this.idbarang);                                                  // 677
    },                                                                                                               // 317
    'dblclick #transfer': function () {                                                                              // 320
      var data;                                                                                                      // 321
      data = this;                                                                                                   // 321
                                                                                                                     //
      if (roles().farmasi) {                                                                                         // 322
        return MaterializeModal.prompt({                                                                             // 683
          message: 'Transfer Gudang > Apotek',                                                                       // 324
          callback: function (err, res) {                                                                            // 325
            if (res.submit) {                                                                                        // 325
              return Meteor.call('transfer', currentPar('idbarang'), data.idbatch, parseInt(res.value));             // 687
            }                                                                                                        // 688
          }                                                                                                          // 324
        });                                                                                                          // 324
      }                                                                                                              // 691
    },                                                                                                               // 317
    'click #rmBarang': function () {                                                                                 // 327
      var dialog, self;                                                                                              // 328
      self = this;                                                                                                   // 328
      dialog = {                                                                                                     // 329
        title: 'Hapus Jenis Obat',                                                                                   // 330
        message: 'Apakah yakin untuk hapus jenis obat ini dari sistem?'                                              // 331
      };                                                                                                             // 330
      return new Confirmation(dialog, function (ok) {                                                                // 700
        if (ok) {                                                                                                    // 332
          return Meteor.call('rmBarang', self.idbarang);                                                             // 702
        }                                                                                                            // 703
      });                                                                                                            // 332
    }                                                                                                                // 317
  });                                                                                                                // 317
  Template.manajemen.onRendered(function () {                                                                        // 335
    return $('select#export').material_select();                                                                     // 708
  });                                                                                                                // 335
  Template.manajemen.helpers({                                                                                       // 338
    users: function () {                                                                                             // 339
      return Meteor.users.find().fetch();                                                                            // 712
    },                                                                                                               // 339
    onUser: function () {                                                                                            // 340
      return Session.get('onUser');                                                                                  // 715
    },                                                                                                               // 339
    selRoles: function () {                                                                                          // 341
      return ['petugas', 'admin'];                                                                                   // 718
    },                                                                                                               // 339
    klinik: function () {                                                                                            // 342
      return selects.klinik;                                                                                         // 721
    },                                                                                                               // 339
    schemadokter: function () {                                                                                      // 343
      return new SimpleSchema(schema.dokter);                                                                        // 724
    },                                                                                                               // 339
    schematarif: function () {                                                                                       // 344
      return new SimpleSchema(schema.tarif);                                                                         // 727
    },                                                                                                               // 339
    dokters: function () {                                                                                           // 345
      var options, selector;                                                                                         // 346
      selector = {                                                                                                   // 346
        active: true                                                                                                 // 346
      };                                                                                                             // 346
      options = {                                                                                                    // 347
        limit: limit(),                                                                                              // 347
        skip: page() * limit()                                                                                       // 347
      };                                                                                                             // 347
      return coll.dokter.find(selector, options).fetch();                                                            // 738
    },                                                                                                               // 339
    tarifs: function () {                                                                                            // 349
      var options, selector;                                                                                         // 350
      selector = {                                                                                                   // 350
        active: true                                                                                                 // 350
      };                                                                                                             // 350
      options = {                                                                                                    // 351
        limit: limit(),                                                                                              // 351
        skip: page() * limit()                                                                                       // 351
      };                                                                                                             // 351
      return coll.tarif.find(selector, options).fetch();                                                             // 749
    }                                                                                                                // 339
  });                                                                                                                // 339
  Template.manajemen.events({                                                                                        // 354
    'submit #userForm': function (event) {                                                                           // 355
      var doc, group, onUser, poli, repeat, role, theRole;                                                           // 356
      event.preventDefault();                                                                                        // 356
      onUser = Session.get('onUser');                                                                                // 357
                                                                                                                     //
      if (!onUser) {                                                                                                 // 358
        doc = {                                                                                                      // 359
          username: event.target.children.username.value,                                                            // 360
          password: event.target.children.password.value                                                             // 361
        };                                                                                                           // 360
        repeat = event.target.children.repeat.value;                                                                 // 362
                                                                                                                     //
        if (doc.password === repeat) {                                                                               // 363
          Meteor.call('newUser', doc);                                                                               // 364
          return $('input').val('');                                                                                 // 765
        } else {                                                                                                     // 363
          return Materialize.toast('Password tidak mirip', 3000);                                                    // 767
        }                                                                                                            // 358
      } else {                                                                                                       // 358
        role = $('input[name="role"]:checked', event.target)[0].id;                                                  // 369
        group = $('input[name="group"]:checked', event.target)[0].id;                                                // 370
        poli = $('input[name="poli"]:checked', event.target)[0];                                                     // 371
        theRole = !poli ? role : _.snakeCase(poli.id);                                                               // 372
        return Meteor.call('addRole', onUser._id, [theRole], group);                                                 // 774
      }                                                                                                              // 775
    },                                                                                                               // 355
    'dblclick #row': function () {                                                                                   // 374
      return Session.set('onUser', this);                                                                            // 778
    },                                                                                                               // 355
    'dblclick #reset': function () {                                                                                 // 375
      var dialog, self;                                                                                              // 376
      self = this;                                                                                                   // 376
      dialog = {                                                                                                     // 377
        title: 'Reset Peranan',                                                                                      // 378
        message: 'Anda yakin untuk menghapus semua perannya?'                                                        // 379
      };                                                                                                             // 378
      return new Confirmation(dialog, function (ok) {                                                                // 787
        if (ok) {                                                                                                    // 380
          return Meteor.call('rmRole', self._id);                                                                    // 789
        }                                                                                                            // 790
      });                                                                                                            // 380
    },                                                                                                               // 355
    'click #close': function () {                                                                                    // 382
      return sessNull();                                                                                             // 794
    },                                                                                                               // 355
    'click #export': function () {                                                                                   // 383
      var select;                                                                                                    // 384
      select = $('select#export').val();                                                                             // 384
      return Meteor.call('export', select, function (err, content) {                                                 // 799
        var blob;                                                                                                    // 385
                                                                                                                     //
        if (content) {                                                                                               // 385
          blob = new Blob([content], {                                                                               // 386
            type: 'text/plain;charset=utf-8'                                                                         // 386
          });                                                                                                        // 386
          return saveAs(blob, select + '.csv');                                                                      // 805
        }                                                                                                            // 806
      });                                                                                                            // 385
    },                                                                                                               // 355
    'dblclick #baris': function (event) {                                                                            // 388
      var dialog, jenis, self;                                                                                       // 389
      jenis = event.currentTarget.className;                                                                         // 389
      dialog = {                                                                                                     // 390
        title: 'Hapus ' + _.startCase(jenis),                                                                        // 391
        message: 'Yakin untuk menghapus ' + jenis + ' dari daftar?'                                                  // 392
      };                                                                                                             // 391
      self = this;                                                                                                   // 393
      return new Confirmation(dialog, function (ok) {                                                                // 817
        if (ok) {                                                                                                    // 394
          return Meteor.call('inactive', jenis, self._id);                                                           // 819
        }                                                                                                            // 820
      });                                                                                                            // 394
    }                                                                                                                // 355
  });                                                                                                                // 355
  Template.login.onRendered(function () {                                                                            // 397
    return $('.slider').slider();                                                                                    // 825
  });                                                                                                                // 397
  Template.login.events({                                                                                            // 400
    'submit form': function (event) {                                                                                // 401
      var password, username;                                                                                        // 402
      event.preventDefault();                                                                                        // 402
      username = event.target.children.username.value;                                                               // 403
      password = event.target.children.password.value;                                                               // 404
      return Meteor.loginWithPassword(username, password, function (err) {                                           // 833
        if (err) {                                                                                                   // 406
          return Materialize.toast('Salah username / password', 3000);                                               // 835
        } else {                                                                                                     // 406
          return Router.go('/' + _.keys(roles())[0]);                                                                // 837
        }                                                                                                            // 838
      });                                                                                                            // 405
    }                                                                                                                // 401
  });                                                                                                                // 401
  Template.pagination.events({                                                                                       // 411
    'click #next': function () {                                                                                     // 412
      return Session.set('page', 1 + page());                                                                        // 844
    },                                                                                                               // 412
    'click #prev': function () {                                                                                     // 413
      return Session.set('page', -1 + page());                                                                       // 847
    },                                                                                                               // 412
    'click #num': function (event) {                                                                                 // 414
      return Session.set('page', parseInt(event.target.innerText));                                                  // 850
    }                                                                                                                // 412
  });                                                                                                                // 412
  Template.report.helpers({                                                                                          // 417
    datas: function () {                                                                                             // 418
      return Session.get('laporan');                                                                                 // 855
    }                                                                                                                // 418
  });                                                                                                                // 418
  Template.report.events({                                                                                           // 420
    'click .datepicker': function (event, template) {                                                                // 421
      var type;                                                                                                      // 422
      type = event.target.attributes.date.nodeValue;                                                                 // 422
      return $('#' + type).pickadate({                                                                               // 862
        onSet: function (data) {                                                                                     // 423
          var end, start;                                                                                            // 424
          Session.set(type + 'Date', data.select);                                                                   // 424
          start = Session.get('startDate');                                                                          // 425
          end = Session.get('endDate');                                                                              // 426
                                                                                                                     //
          if (start && end) {                                                                                        // 427
            return Meteor.call('report', template.data.jenis, start, end, function (err, res) {                      // 869
              return res && Session.set('laporan', res);                                                             // 870
            });                                                                                                      // 428
          }                                                                                                          // 872
        }                                                                                                            // 423
      });                                                                                                            // 423
    },                                                                                                               // 421
    'click #export': function (event, template) {                                                                    // 430
      var blob, content;                                                                                             // 431
      content = exportcsv.exportToCSV(Session.get('laporan').csv, true, ';');                                        // 431
      blob = new Blob([content], {                                                                                   // 432
        type: 'text/plain;charset=utf-8'                                                                             // 432
      });                                                                                                            // 432
      return saveAs(blob, template.data.jenis + '.csv');                                                             // 882
    }                                                                                                                // 421
  });                                                                                                                // 421
}                                                                                                                    // 885
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
  Meteor.publish('users', function () {                                                                              // 9
    return Meteor.users.find({});                                                                                    // 11
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
      }                                                                                                              // 62
                                                                                                                     //
      return exportcsv.exportToCSV(arr, true, ';');                                                                  // 63
    },                                                                                                               // 13
    billCard: function (no_mr, state) {                                                                              // 40
      var modifier, selector;                                                                                        // 41
      selector = {                                                                                                   // 41
        no_mr: parseInt(no_mr)                                                                                       // 41
      };                                                                                                             // 41
      modifier = {                                                                                                   // 42
        $set: {                                                                                                      // 42
          'regis.billCard': state                                                                                    // 42
        }                                                                                                            // 42
      };                                                                                                             // 42
      return coll.pasien.update(selector, modifier);                                                                 // 75
    },                                                                                                               // 13
    billRegis: function (no_mr, idbayar, state) {                                                                    // 45
      var modifier, selector;                                                                                        // 46
      selector = {                                                                                                   // 46
        'rawat.idbayar': idbayar,                                                                                    // 46
        no_mr: parseInt(no_mr)                                                                                       // 46
      };                                                                                                             // 46
      modifier = {                                                                                                   // 47
        $set: {                                                                                                      // 47
          'rawat.$.billRegis': state                                                                                 // 47
        }                                                                                                            // 47
      };                                                                                                             // 47
      return coll.pasien.update(selector, modifier);                                                                 // 88
    },                                                                                                               // 13
    bayar: function (no_mr, idbayar) {                                                                               // 50
      var modifier, selector;                                                                                        // 51
      selector = {                                                                                                   // 51
        'rawat.idbayar': idbayar,                                                                                    // 51
        no_mr: parseInt(no_mr)                                                                                       // 51
      };                                                                                                             // 51
      modifier = {                                                                                                   // 52
        'rawat.$.status_bayar': true                                                                                 // 52
      };                                                                                                             // 52
      return coll.pasien.update(selector, {                                                                          // 99
        $set: modifier                                                                                               // 53
      });                                                                                                            // 53
    },                                                                                                               // 13
    request: function (no_mr, idbayar, jenis, idjenis, hasil) {                                                      // 55
      var filtered, findPasien, findStock, give, i, j, k, key, len, len1, len2, len3, m, modifier, n, o, p, q, ref, ref1, ref2, ref3, ref4, selector, sortedEd, sortedIn;
      selector = {                                                                                                   // 56
        no_mr: parseInt(no_mr)                                                                                       // 56
      };                                                                                                             // 56
      findPasien = coll.pasien.findOne(selector);                                                                    // 57
      ref = findPasien.rawat;                                                                                        // 58
                                                                                                                     //
      for (m = 0, len = ref.length; m < len; m++) {                                                                  // 58
        i = ref[m];                                                                                                  // 111
                                                                                                                     //
        if (i.idbayar === idbayar) {                                                                                 // 59
          if (i[jenis]) {                                                                                            // 59
            ref1 = i[jenis];                                                                                         // 59
                                                                                                                     //
            for (n = 0, len1 = ref1.length; n < len1; n++) {                                                         // 59
              j = ref1[n];                                                                                           // 116
                                                                                                                     //
              if (j['id' + jenis] === idjenis) {                                                                     // 60
                j.hasil = hasil;                                                                                     // 60
              }                                                                                                      // 119
            }                                                                                                        // 59
          }                                                                                                          // 59
        }                                                                                                            // 122
      }                                                                                                              // 58
                                                                                                                     //
      modifier = {                                                                                                   // 61
        rawat: findPasien.rawat                                                                                      // 61
      };                                                                                                             // 61
      coll.pasien.update(selector, {                                                                                 // 62
        $set: modifier                                                                                               // 62
      });                                                                                                            // 62
      give = {};                                                                                                     // 63
                                                                                                                     //
      if (jenis === 'obat') {                                                                                        // 64
        ref2 = findPasien.rawat;                                                                                     // 64
                                                                                                                     //
        for (o = 0, len2 = ref2.length; o < len2; o++) {                                                             // 64
          i = ref2[o];                                                                                               // 134
                                                                                                                     //
          if (i.idbayar === idbayar) {                                                                               // 65
            if (i.obat) {                                                                                            // 65
              ref3 = i.obat;                                                                                         // 65
                                                                                                                     //
              for (p = 0, len3 = ref3.length; p < len3; p++) {                                                       // 65
                j = ref3[p];                                                                                         // 139
                                                                                                                     //
                if (j.idobat === idjenis) {                                                                          // 66
                  findStock = coll.gudang.findOne({                                                                  // 67
                    _id: j.nama                                                                                      // 67
                  });                                                                                                // 67
                                                                                                                     //
                  for (k = q = 1, ref4 = j.jumlah; 1 <= ref4 ? q <= ref4 : q >= ref4; k = 1 <= ref4 ? ++q : --q) {   // 68
                    filtered = _.filter(findStock.batch, function (l) {                                              // 69
                      return l.diapotik > 0;                                                                         // 146
                    });                                                                                              // 69
                    sortedIn = _.sortBy(filtered, function (l) {                                                     // 70
                      return new Date(l.masuk).getTime();                                                            // 149
                    });                                                                                              // 70
                    sortedEd = _.sortBy(sortedIn, function (l) {                                                     // 71
                      return new Date(l.kadaluarsa).getTime();                                                       // 152
                    });                                                                                              // 71
                    sortedEd[0].diapotik -= 1;                                                                       // 72
                    key = findStock.nama(+';' + sortedEd[0].nobatch);                                                // 73
                    give[key] || (give[key] = 0);                                                                    // 74
                    give[key] += 1;                                                                                  // 74
                  }                                                                                                  // 68
                                                                                                                     //
                  selector = {                                                                                       // 75
                    _id: findStock._id                                                                               // 75
                  };                                                                                                 // 75
                  modifier = {                                                                                       // 76
                    $set: {                                                                                          // 76
                      batch: findStock.batch                                                                         // 76
                    }                                                                                                // 76
                  };                                                                                                 // 76
                  coll.gudang.update(selector, modifier);                                                            // 77
                }                                                                                                    // 168
              }                                                                                                      // 65
            }                                                                                                        // 65
          }                                                                                                          // 171
        }                                                                                                            // 64
      }                                                                                                              // 173
                                                                                                                     //
      if (jenis === 'obat') {                                                                                        // 78
        return give;                                                                                                 // 175
      }                                                                                                              // 176
    },                                                                                                               // 13
    transfer: function (idbarang, idbatch, amount) {                                                                 // 80
      var modifier, selector;                                                                                        // 81
      selector = {                                                                                                   // 81
        idbarang: idbarang,                                                                                          // 81
        'batch.idbatch': idbatch                                                                                     // 81
      };                                                                                                             // 81
      modifier = {                                                                                                   // 82
        $inc: {                                                                                                      // 82
          'batch.$.digudang': -amount,                                                                               // 82
          'batch.$.diapotik': amount                                                                                 // 82
        }                                                                                                            // 82
      };                                                                                                             // 82
      return coll.gudang.update(selector, modifier);                                                                 // 190
    },                                                                                                               // 13
    rmPasien: function (no_mr) {                                                                                     // 85
      return coll.pasien.remove({                                                                                    // 193
        no_mr: parseInt(no_mr)                                                                                       // 86
      });                                                                                                            // 86
    },                                                                                                               // 13
    rmRawat: function (no_mr, idbayar) {                                                                             // 88
      var modifier, selector;                                                                                        // 89
      selector = {                                                                                                   // 89
        no_mr: parseInt(no_mr)                                                                                       // 89
      };                                                                                                             // 89
      modifier = {                                                                                                   // 90
        $pull: {                                                                                                     // 90
          rawat: {                                                                                                   // 90
            idbayar: idbayar                                                                                         // 90
          }                                                                                                          // 90
        }                                                                                                            // 90
      };                                                                                                             // 90
      return coll.pasien.update(selector, modifier);                                                                 // 209
    },                                                                                                               // 13
    addRole: function (id, roles, group, poli) {                                                                     // 93
      var role;                                                                                                      // 94
      role = poli || roles;                                                                                          // 94
      return Roles.addUsersToRoles(id, role, group);                                                                 // 214
    },                                                                                                               // 13
    rmRole: function (id) {                                                                                          // 97
      var modifier, selector;                                                                                        // 98
      selector = {                                                                                                   // 98
        _id: id                                                                                                      // 98
      };                                                                                                             // 98
      modifier = {                                                                                                   // 99
        $set: {                                                                                                      // 99
          roles: {}                                                                                                  // 99
        }                                                                                                            // 99
      };                                                                                                             // 99
      return Meteor.users.update(selector, modifier);                                                                // 226
    },                                                                                                               // 13
    newUser: function (doc) {                                                                                        // 102
      var find;                                                                                                      // 103
      find = Accounts.findUserByUsername(doc.username);                                                              // 103
                                                                                                                     //
      if (find) {                                                                                                    // 104
        Accounts.setUsername(find._id, doc.username);                                                                // 105
        return Accounts.setPassword(find._id, doc.password);                                                         // 233
      } else {                                                                                                       // 104
        return Accounts.createUser(doc);                                                                             // 235
      }                                                                                                              // 236
    },                                                                                                               // 13
    rmBarang: function (idbarang) {                                                                                  // 110
      return coll.gudang.remove({                                                                                    // 239
        idbarang: idbarang                                                                                           // 111
      });                                                                                                            // 111
    },                                                                                                               // 13
    inactive: function (name, id) {                                                                                  // 113
      var mod, sel;                                                                                                  // 114
      sel = {                                                                                                        // 114
        _id: id                                                                                                      // 114
      };                                                                                                             // 114
      mod = {                                                                                                        // 114
        $set: {                                                                                                      // 114
          active: false                                                                                              // 114
        }                                                                                                            // 114
      };                                                                                                             // 114
      return coll[name].update(sel, mod);                                                                            // 253
    },                                                                                                               // 13
    pindah: function (no_mr) {                                                                                       // 117
      var find, last, modifier, ref, selector;                                                                       // 118
      find = coll.pasien.findOne({                                                                                   // 118
        'no_mr': parseInt(no_mr)                                                                                     // 118
      });                                                                                                            // 118
      ref = find.rawat, last = ref[ref.length - 1];                                                                  // 119
                                                                                                                     //
      if (last.pindah) {                                                                                             // 120
        selector = {                                                                                                 // 121
          _id: find._id                                                                                              // 121
        };                                                                                                           // 121
        modifier = {                                                                                                 // 122
          $push: {                                                                                                   // 122
            rawat: {                                                                                                 // 122
              idbayar: randomId(),                                                                                   // 123
              tanggal: new Date(),                                                                                   // 124
              cara_bayar: last.cara_bayar,                                                                           // 125
              klinik: last.pindah,                                                                                   // 126
              billRegis: true,                                                                                       // 127
              total: {                                                                                               // 128
                semua: 0                                                                                             // 128
              }                                                                                                      // 128
            }                                                                                                        // 123
          }                                                                                                          // 122
        };                                                                                                           // 122
        return coll.pasien.update(selector, modifier);                                                               // 279
      }                                                                                                              // 280
    },                                                                                                               // 13
    report: function (jenis, start, end) {                                                                           // 131
      var docs, filter;                                                                                              // 132
                                                                                                                     //
      filter = function (arr) {                                                                                      // 132
        return _.filter(arr, function (i) {                                                                          // 285
          var ref;                                                                                                   // 133
          return new Date(start) < (ref = new Date(i.tanggal)) && ref < new Date(end);                               // 287
        });                                                                                                          // 132
      };                                                                                                             // 132
                                                                                                                     //
      docs = _.flatMap(coll.pasien.find().fetch(), function (i) {                                                    // 134
        return _.map(filter(i.rawat), function (j) {                                                                 // 291
          var obj;                                                                                                   // 135
          obj = {                                                                                                    // 135
            no_mr: i.no_mr,                                                                                          // 136
            nama_lengkap: _.startCase(i.regis.nama_lengkap),                                                         // 137
            no_bill: j.nobill,                                                                                       // 138
            cara_bayar: look('cara_bayar', j.cara_bayar).label,                                                      // 139
            rujukan: j.rujukan ? look('rujukan', j.rujukan).label : '',                                              // 140
            klinik: look('klinik', j.klinik).label,                                                                  // 141
            diagnosa: j.diagnosa || '-',                                                                             // 142
            tindakan: _.flatMap(['tindakan', 'labor', 'radio'], function (k) {                                       // 143
              var saring;                                                                                            // 144
              saring = _.filter(j[k], function (l) {                                                                 // 144
                return l;                                                                                            // 304
              });                                                                                                    // 144
              return _.map(saring, function (l) {                                                                    // 306
                return '/' + _.startCase(look2('tarif', l.nama).nama);                                               // 307
              });                                                                                                    // 145
            }),                                                                                                      // 143
            harga: 'Rp ' + j.total.semua,                                                                            // 146
            petugas: Meteor.users.findOne({                                                                          // 147
              _id: j.petugas                                                                                         // 147
            }).username,                                                                                             // 147
            keluar: j.keluar ? look('keluar', j.keluar).label : '-',                                                 // 148
            baru_lama: 'L'                                                                                           // 149
          };                                                                                                         // 136
                                                                                                                     //
          if (jenis === 'pendaftaran') {                                                                             // 150
            return _.pick(obj, ['no_mr', 'nama_lengkap', 'cara_bayar', 'rujukan', 'klinik', 'baru_lama']);           // 318
          } else if (jenis === 'pembayaran') {                                                                       // 150
            return _.pick(obj, ['tanggal', 'no_bill', 'no_mr', 'nama_lengkap', 'klinik', 'tindakan', 'harga', 'petugas']);
          } else if (jenis === 'rawat_jalan') {                                                                      // 152
            return _.pick(obj, ['tanggal', 'no_mr', 'nama_lengkap', 'kelamin', 'umur', 'cara_bayar', 'diagnosa', 'tindakan', 'petugas', 'keluar', 'rujukan']);
          }                                                                                                          // 323
        });                                                                                                          // 134
      });                                                                                                            // 134
      return {                                                                                                       // 326
        headers: _.map(_.keys(docs[0]), function (i) {                                                               // 156
          return _.startCase(i);                                                                                     // 328
        }),                                                                                                          // 156
        rows: _.map(docs, function (i) {                                                                             // 157
          return _.values(i);                                                                                        // 331
        }),                                                                                                          // 157
        csv: docs                                                                                                    // 158
      };                                                                                                             // 156
    }                                                                                                                // 13
  });                                                                                                                // 13
}                                                                                                                    // 337
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
