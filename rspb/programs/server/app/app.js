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
  SimpleSchema.debug = true;                                                                                         // 12
  AutoForm.setDefaultTemplate('materialize');                                                                        // 13
                                                                                                                     //
  this.currentRoute = function () {                                                                                  // 14
    return Router.current().route.getName();                                                                         // 35
  };                                                                                                                 // 14
                                                                                                                     //
  this.currentPar = function (param) {                                                                               // 15
    return Router.current().params[param];                                                                           // 38
  };                                                                                                                 // 15
                                                                                                                     //
  this.search = function () {                                                                                        // 16
    return Session.get('search');                                                                                    // 41
  };                                                                                                                 // 16
                                                                                                                     //
  this.formDoc = function () {                                                                                       // 17
    return Session.get('formDoc');                                                                                   // 44
  };                                                                                                                 // 17
                                                                                                                     //
  this.limit = function () {                                                                                         // 18
    return Session.get('limit');                                                                                     // 47
  };                                                                                                                 // 18
                                                                                                                     //
  this.page = function () {                                                                                          // 19
    return Session.get('page');                                                                                      // 50
  };                                                                                                                 // 19
                                                                                                                     //
  this.roles = function () {                                                                                         // 20
    return Meteor.user().roles;                                                                                      // 53
  };                                                                                                                 // 20
}                                                                                                                    // 55
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"hooks.coffee.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// folder/hooks.coffee.js                                                                                            //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var closeForm;                                                                                                       // 1
                                                                                                                     //
if (Meteor.isClient) {                                                                                               // 1
  this.modForm = function (doc, idbayar) {                                                                           // 3
    var begin, i, l, len, ref, stop, total;                                                                          // 3
                                                                                                                     //
    if (currentRoute() === 'jalan') {                                                                                // 3
      doc.tanggal = new Date();                                                                                      // 4
      doc.idbayar = idbayar ? idbayar : randomId();                                                                  // 5
      doc.jenis = currentRoute();                                                                                    // 6
      total = {                                                                                                      // 7
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
          for (l = 0, len = ref.length; l < len; l++) {                                                              // 21
            j = ref[l];                                                                                              // 22
            j['id' + i] = randomId();                                                                                // 10
            find = _.find(coll.tarif.find().fetch(), function (k) {                                                  // 11
              return k._id === j.nama;                                                                               // 25
            });                                                                                                      // 11
            j.harga = find.harga;                                                                                    // 12
            results.push(total[i] += j.harga);                                                                       // 28
          }                                                                                                          // 9
                                                                                                                     //
          return results;                                                                                            // 30
        }                                                                                                            // 31
      });                                                                                                            // 8
                                                                                                                     //
      if (doc.obat) {                                                                                                // 14
        ref = doc.obat;                                                                                              // 14
                                                                                                                     //
        for (l = 0, len = ref.length; l < len; l++) {                                                                // 14
          i = ref[l];                                                                                                // 36
          i.idobat = randomId();                                                                                     // 14
        }                                                                                                            // 14
      }                                                                                                              // 39
                                                                                                                     //
      doc.total = {                                                                                                  // 15
        tindakan: total.tindakan,                                                                                    // 16
        labor: total.labor,                                                                                          // 17
        radio: total.radio                                                                                           // 18
      };                                                                                                             // 16
      doc.total.semua = doc.total.tindakan + doc.total.labor + doc.total.radio;                                      // 19
                                                                                                                     //
      if (doc.total.semua > 0 || doc.cara_bayar !== 1) {                                                             // 20
        doc.billRegis = true;                                                                                        // 20
      }                                                                                                              // 48
                                                                                                                     //
      if (doc.total.semua > 0 && doc.cara_bayar !== 1) {                                                             // 21
        doc.status_bayar = true;                                                                                     // 21
      }                                                                                                              // 51
                                                                                                                     //
      if (doc.obat && 0 === doc.total.semua) {                                                                       // 22
        doc.billRegis = true;                                                                                        // 23
        doc.status_bayar = true;                                                                                     // 24
      }                                                                                                              // 55
                                                                                                                     //
      begin = Session.get('begin');                                                                                  // 25
      stop = moment();                                                                                               // 25
      doc.spm = stop.diff(begin, 'minutes');                                                                         // 26
      doc.petugas = Meteor.userId();                                                                                 // 27
      doc.nobill = parseInt(_.toString(Date.now()).substr(7, 13));                                                   // 28
      return doc;                                                                                                    // 61
    }                                                                                                                // 62
  };                                                                                                                 // 3
                                                                                                                     //
  closeForm = function () {                                                                                          // 31
    return _.map(['showForm', 'formDoc'], function (i) {                                                             // 65
      return Session.set(i, null);                                                                                   // 66
    });                                                                                                              // 32
  };                                                                                                                 // 31
                                                                                                                     //
  AutoForm.addHooks('formPasien', {                                                                                  // 35
    before: {                                                                                                        // 36
      'update-pushArray': function (doc) {                                                                           // 37
        var formDoc;                                                                                                 // 38
        formDoc = Session.get('formDoc');                                                                            // 38
                                                                                                                     //
        if (formDoc) {                                                                                               // 39
          Meteor.call('rmRawat', currentPar('no_mr'), formDoc.idbayar);                                              // 39
        }                                                                                                            // 76
                                                                                                                     //
        return this.result(modForm(doc));                                                                            // 77
      }                                                                                                              // 37
    },                                                                                                               // 37
    after: {                                                                                                         // 41
      insert: function () {                                                                                          // 42
        return closeForm();                                                                                          // 82
      },                                                                                                             // 42
      'update-pushArray': function (err, res) {                                                                      // 43
        closeForm();                                                                                                 // 44
                                                                                                                     //
        if (res) {                                                                                                   // 45
          return Meteor.call('pindah', currentPar('no_mr'));                                                         // 87
        }                                                                                                            // 88
      }                                                                                                              // 42
    },                                                                                                               // 42
    formToDoc: function (doc) {                                                                                      // 46
      Session.set('preview', modForm(doc));                                                                          // 47
      return doc;                                                                                                    // 93
    }                                                                                                                // 36
  });                                                                                                                // 36
  AutoForm.addHooks('formGudang', {                                                                                  // 50
    before: {                                                                                                        // 51
      insert: function (doc) {                                                                                       // 52
        doc.idbarang = randomId();                                                                                   // 53
        doc.batch[0].idbatch = randomId();                                                                           // 54
        return this.result(doc);                                                                                     // 101
      },                                                                                                             // 52
      'update-pushArray': function (doc) {                                                                           // 56
        doc.idbatch = randomId();                                                                                    // 57
        return this.result(doc);                                                                                     // 105
      }                                                                                                              // 52
    }                                                                                                                // 52
  });                                                                                                                // 51
}                                                                                                                    // 109
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"menus.coffee.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// folder/menus.coffee.js                                                                                            //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
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
}                                                                                                                    // 38
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
if (Meteor.isClient) {                                                                                               // 1
  this.makePdf = {                                                                                                   // 3
    card: function () {                                                                                              // 4
      var doc, pdf;                                                                                                  // 5
      doc = coll.pasien.findOne();                                                                                   // 5
      pdf = pdfMake.createPdf({                                                                                      // 6
        content: ['Nama: ' + doc.regis.nama_lengkap, 'No. MR: ' + doc.no_mr],                                        // 7
        pageSize: 'B8',                                                                                              // 11
        pageMargins: [110, 50, 0, 0],                                                                                // 12
        pageOrientation: 'landscape'                                                                                 // 13
      });                                                                                                            // 7
      return pdf.download(doc.no_mr + '_card.pdf');                                                                  // 12
    },                                                                                                               // 4
    consent: function () {                                                                                           // 15
      var doc, pdf;                                                                                                  // 16
      doc = coll.pasien.findOne();                                                                                   // 16
      pdf = pdfMake.createPdf({                                                                                      // 17
        content: [{                                                                                                  // 18
          text: 'PEMERINTAH PROVINSI RIAU\nRUMAH SAKIT UMUM DAERAH PETALA BUMI\nJL. Dr. Soetomo No. 65, Telp. (0761) 23024',
          alignment: 'center'                                                                                        // 19
        }, '\nDATA UMUM PASIEN', '\nNAMA LENGKAP : ' + doc.regis.nama_lengkap, 'TEMPAT & TANGGAL LAHIR : ' + doc.regis.tmpt_lahir + ', tanggal ' + moment(doc.regis.tgl_lahir).format('D/MMMM/YYYY'), 'GOLONGAN DARAH : ' + look('darah', doc.regis.darah).label, 'JENIS KELAMIN : ' + look('kelamin', doc.regis.kelamin).label, 'AGAMA : ' + look('agama', doc.regis.agama).label, 'PENDIDIKAN : ' + look('pendidikan', doc.regis.pendidikan).label, 'PEKERJAAN : ' + look('pekerjaan', doc.regis.pekerjaan).label, 'NAMA AYAH : ' + doc.regis.ayah, 'NAMA IBU : ' + doc.regis.ibu, 'NAMA SUAMI/ISTRI : ' + doc.regis.pasangan, 'ALAMAT : ' + doc.regis.alamat, 'NO. TELP / HP : ' + doc.regis.kontak, '\nPERSETUJUAN UMUM (GENERAL CONSENT)', '\nSaya akan mentaati peraturan yang berlaku di RSUD Petala Bumi', 'Saya memberi kuasa kepada dokter dan semua tenaga kesehatan untuk melakukan pemeriksaan / pengobatan / tindakan yang diperlakukan upaya kesembuhan saya / pasien tersebut diatas', 'Saya memberi kuasa kepada dokter dan semua tenaga kesehatan yang ikut merawat saya untuk memberikan keterangan medis saya kepada yang bertanggung jawab atas biaya perawatan saya.', 'Saya memberi kuasa kepada RSUD Petala Bumi untuk menginformasikan identitas sosial saya kepada keluarga / rekan / masyarakat', 'Saya mengatakan bahwa informasi hasil pemeriksaan / rekam medis saya dapat digunakan untuk pendidikan / penelitian demi kemajuan ilmu kesehatan', '\nPetunjuk :', 'S: Setuju', 'TS: Tidak Setuju', {
          text: 'Pekanbaru,                        .\n\n\n__________________',                                       // 42
          alignment: 'right'                                                                                         // 42
        }]                                                                                                           // 42
      });                                                                                                            // 18
      return pdf.download(doc.no_mr + '_consent.pdf');                                                               // 28
    },                                                                                                               // 4
    payRawat: function (doc) {                                                                                       // 45
      var find, i, j, l, len, len1, m, pasien, pdf, ref, ref1, rows, table;                                          // 46
      pasien = coll.pasien.findOne();                                                                                // 46
      rows = [['Uraian', 'Harga']];                                                                                  // 47
      ref = ['tindakan', 'labor', 'radio'];                                                                          // 48
                                                                                                                     //
      for (l = 0, len = ref.length; l < len; l++) {                                                                  // 48
        i = ref[l];                                                                                                  // 36
                                                                                                                     //
        if (doc[i]) {                                                                                                // 49
          ref1 = doc[i];                                                                                             // 49
                                                                                                                     //
          for (m = 0, len1 = ref1.length; m < len1; m++) {                                                           // 49
            j = ref1[m];                                                                                             // 40
            find = _.find(coll.tarif.find().fetch(), function (k) {                                                  // 50
              return k._id === j.nama;                                                                               // 42
            });                                                                                                      // 50
            rows.push([_.startCase(find.nama), _.toString(j.harga)]);                                                // 51
          }                                                                                                          // 49
        }                                                                                                            // 46
      }                                                                                                              // 48
                                                                                                                     //
      table = {                                                                                                      // 52
        table: {                                                                                                     // 52
          widths: [400, 100],                                                                                        // 52
          body: rows                                                                                                 // 52
        }                                                                                                            // 52
      };                                                                                                             // 52
      pdf = pdfMake.createPdf({                                                                                      // 53
        content: [{                                                                                                  // 54
          text: 'PEMERINTAH PROVINSI RIAU\nRUMAH SAKIT UMUM DAERAH PETALA BUMI\nJL. DR. SOETOMO NO. 65, TELP. (0761) 23024, PEKANBARU',
          alignment: 'center'                                                                                        // 55
        }, '\nRINCIAN BIAYA RAWAT JALAN', 'IDENTITAS PASIEN', 'NO. MR' + pasien.no_mr, 'NAMA PASIEN' + pasien.regis.nama_lengkap, 'JENIS KELAMIN' + look('kelamin', pasien.regis.kelamin).label, 'TANGGAL LAHIR' + moment(pasien.regis.tgl_lahir).format('D MM YYYY'), 'UMUR' + _.toString(moment().diff(pasien.regis.tgl_lahir, 'years')), 'KLINIK', '\n\nRINCIAN PEMBAYARAN', table, 'TOTAL BIAYA' + 'Rp ' + _.toString(numeral(doc.total.semua).format('0,0')), '\nPEKANBARU, ' + moment().format('DD MM YYYY'), 'PETUGAS']
      });                                                                                                            // 54
      return pdf.download(pasien.no_mr + '_payRawat.pdf');                                                           // 62
    },                                                                                                               // 4
    payRegCard: function (amount, words) {                                                                           // 71
      var doc, pdf;                                                                                                  // 72
      doc = coll.pasien.findOne();                                                                                   // 72
      pdf = pdfMake.createPdf({                                                                                      // 73
        content: [{                                                                                                  // 74
          text: 'PEMERINTAH PROVINSI RIAU\nRUMAH SAKIT UMUM DAERAH PETALA BUMI\nJL. DR. SOETOMO NO. 65, TELP. (0761) 23024, PEKANBARU',
          alignment: 'center'                                                                                        // 75
        }, '\nKARCIS', 'TANGGAL : ' + moment().format('DD MM YYYY'), 'NO. MR : ' + _.toString(doc.no_mr), 'NAMA PASIEN : ' + doc.regis.nama_lengkap, '\nTARIF : Rp ' + _.toString(amount), {
          text: '(' + words + ')',                                                                                   // 83
          italics: true                                                                                              // 83
        }]                                                                                                           // 83
      });                                                                                                            // 74
      return pdf.download(doc.no_mr + '_payRegCard.pdf');                                                            // 78
    },                                                                                                               // 4
    rekap: function (rows) {                                                                                         // 86
      var pdf, strings;                                                                                              // 87
      strings = _.map(rows, function (i) {                                                                           // 87
        return _.map(i, function (j) {                                                                               // 83
          return _.toString(j);                                                                                      // 84
        });                                                                                                          // 87
      });                                                                                                            // 87
      pdf = pdfMake.createPdf({                                                                                      // 88
        content: [{                                                                                                  // 88
          table: {                                                                                                   // 88
            body: strings                                                                                            // 88
          }                                                                                                          // 88
        }]                                                                                                           // 88
      });                                                                                                            // 88
      return pdf.download('rekap.pdf');                                                                              // 96
    }                                                                                                                // 4
  };                                                                                                                 // 4
}                                                                                                                    // 99
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
  pekerjaan: ['Pegawa Negeri', 'Karyawan Swasta', 'Wirausaha', 'Petani', 'Tidak Bekerja'],                           // 3
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
selects.tindakan = function () {                                                                                     // 21
  var selector, sub;                                                                                                 // 21
                                                                                                                     //
  if (Meteor.isClient) {                                                                                             // 21
    sub = Meteor.subscribe('coll', 'tarif', {}, {});                                                                 // 22
    selector = {                                                                                                     // 23
      jenis: Meteor.user().roles.jalan[0]                                                                            // 23
    };                                                                                                               // 23
                                                                                                                     //
    if (sub.ready()) {                                                                                               // 24
      return _.map(coll.tarif.find(selector).fetch(), function (i) {                                                 // 37
        return {                                                                                                     // 38
          value: i._id,                                                                                              // 25
          label: _.startCase(i.nama)                                                                                 // 25
        };                                                                                                           // 25
      });                                                                                                            // 24
    }                                                                                                                // 21
  }                                                                                                                  // 44
};                                                                                                                   // 21
                                                                                                                     //
selects.dokter = function () {                                                                                       // 27
  var find, selector, sub;                                                                                           // 27
                                                                                                                     //
  if (Meteor.isClient) {                                                                                             // 27
    sub = Meteor.subscribe('coll', 'dokter', {}, {});                                                                // 28
    find = _.find(selects.klinik, function (i) {                                                                     // 29
      return Meteor.user().roles.jalan[0] === _.snakeCase(i.label);                                                  // 52
    });                                                                                                              // 29
    selector = {                                                                                                     // 31
      poli: find.value                                                                                               // 31
    };                                                                                                               // 31
                                                                                                                     //
    if (sub.ready()) {                                                                                               // 32
      return _.map(coll.dokter.find(selector).fetch(), function (i) {                                                // 58
        return {                                                                                                     // 59
          value: i._id,                                                                                              // 33
          label: i.nama                                                                                              // 33
        };                                                                                                           // 33
      });                                                                                                            // 32
    }                                                                                                                // 27
  }                                                                                                                  // 65
};                                                                                                                   // 27
                                                                                                                     //
selects.obat = function () {                                                                                         // 35
  var filter, sub;                                                                                                   // 35
                                                                                                                     //
  if (Meteor.isClient) {                                                                                             // 35
    sub = Meteor.subscribe('coll', 'gudang', {}, {});                                                                // 36
                                                                                                                     //
    filter = function (arr) {                                                                                        // 37
      return _.filter(arr, function (i) {                                                                            // 73
        return i.jenis === 1;                                                                                        // 74
      });                                                                                                            // 37
    };                                                                                                               // 37
                                                                                                                     //
    if (sub.ready()) {                                                                                               // 38
      return _.map(filter(coll.gudang.find().fetch()), function (i) {                                                // 78
        return {                                                                                                     // 79
          value: i._id,                                                                                              // 39
          label: i.nama                                                                                              // 39
        };                                                                                                           // 39
      });                                                                                                            // 38
    }                                                                                                                // 35
  }                                                                                                                  // 85
};                                                                                                                   // 35
                                                                                                                     //
_.map(['labor', 'radio'], function (i) {                                                                             // 41
  return selects[i] = function () {                                                                                  // 89
    var selector, sub;                                                                                               // 42
                                                                                                                     //
    if (Meteor.isClient) {                                                                                           // 42
      sub = Meteor.subscribe('coll', 'tarif', {}, {});                                                               // 43
      selector = {                                                                                                   // 44
        jenis: i                                                                                                     // 44
      };                                                                                                             // 44
                                                                                                                     //
      if (sub.ready()) {                                                                                             // 45
        return _.map(coll.tarif.find(selector).fetch(), function (j) {                                               // 97
          return {                                                                                                   // 98
            value: j._id,                                                                                            // 46
            label: _.startCase(j.nama)                                                                               // 46
          };                                                                                                         // 46
        });                                                                                                          // 45
      }                                                                                                              // 42
    }                                                                                                                // 104
  };                                                                                                                 // 42
});                                                                                                                  // 41
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
schema.tindakan = {                                                                                                  // 39
  idtindakan: {                                                                                                      // 40
    type: String,                                                                                                    // 40
    optional: true,                                                                                                  // 40
    autoform: {                                                                                                      // 40
      type: 'hidden'                                                                                                 // 40
    }                                                                                                                // 40
  },                                                                                                                 // 40
  nama: {                                                                                                            // 41
    type: String,                                                                                                    // 41
    autoform: {                                                                                                      // 41
      options: selects.tindakan                                                                                      // 41
    }                                                                                                                // 41
  },                                                                                                                 // 41
  dokter: {                                                                                                          // 42
    type: String,                                                                                                    // 42
    autoform: {                                                                                                      // 42
      options: selects.dokter                                                                                        // 42
    }                                                                                                                // 42
  },                                                                                                                 // 42
  harga: {                                                                                                           // 43
    type: Number,                                                                                                    // 43
    optional: true,                                                                                                  // 43
    autoform: {                                                                                                      // 43
      type: 'hidden'                                                                                                 // 43
    }                                                                                                                // 43
  }                                                                                                                  // 43
};                                                                                                                   // 40
schema.labor = {                                                                                                     // 45
  idlabor: {                                                                                                         // 46
    type: String,                                                                                                    // 46
    optional: true,                                                                                                  // 46
    autoform: {                                                                                                      // 46
      type: 'hidden'                                                                                                 // 46
    }                                                                                                                // 46
  },                                                                                                                 // 46
  nama: {                                                                                                            // 47
    type: String,                                                                                                    // 47
    autoform: {                                                                                                      // 47
      options: selects.labor                                                                                         // 47
    }                                                                                                                // 47
  },                                                                                                                 // 47
  harga: {                                                                                                           // 48
    type: Number,                                                                                                    // 48
    optional: true,                                                                                                  // 48
    autoform: {                                                                                                      // 48
      type: 'hidden'                                                                                                 // 48
    }                                                                                                                // 48
  },                                                                                                                 // 48
  hasil: {                                                                                                           // 49
    type: String,                                                                                                    // 49
    optional: true,                                                                                                  // 49
    autoform: {                                                                                                      // 49
      type: 'hidden'                                                                                                 // 49
    }                                                                                                                // 49
  }                                                                                                                  // 49
};                                                                                                                   // 46
schema.radio = {                                                                                                     // 51
  idradio: {                                                                                                         // 52
    type: String,                                                                                                    // 52
    optional: true,                                                                                                  // 52
    autoform: {                                                                                                      // 52
      type: 'hidden'                                                                                                 // 52
    }                                                                                                                // 52
  },                                                                                                                 // 52
  nama: {                                                                                                            // 53
    type: String,                                                                                                    // 53
    autoform: {                                                                                                      // 53
      options: selects.radio                                                                                         // 53
    }                                                                                                                // 53
  },                                                                                                                 // 53
  harga: {                                                                                                           // 54
    type: Number,                                                                                                    // 54
    optional: true,                                                                                                  // 54
    autoform: {                                                                                                      // 54
      type: 'hidden'                                                                                                 // 54
    }                                                                                                                // 54
  },                                                                                                                 // 54
  hasil: {                                                                                                           // 55
    type: String,                                                                                                    // 55
    optional: true,                                                                                                  // 55
    autoform: {                                                                                                      // 55
      type: 'hidden'                                                                                                 // 55
    }                                                                                                                // 55
  }                                                                                                                  // 55
};                                                                                                                   // 52
schema.obat = {                                                                                                      // 57
  idobat: {                                                                                                          // 58
    type: String,                                                                                                    // 58
    optional: true,                                                                                                  // 58
    autoform: {                                                                                                      // 58
      type: 'hidden'                                                                                                 // 58
    }                                                                                                                // 58
  },                                                                                                                 // 58
  nama: {                                                                                                            // 59
    type: String,                                                                                                    // 59
    autoform: {                                                                                                      // 59
      options: selects.obat                                                                                          // 59
    }                                                                                                                // 59
  },                                                                                                                 // 59
  puyer: {                                                                                                           // 60
    type: String,                                                                                                    // 60
    optional: true                                                                                                   // 60
  },                                                                                                                 // 60
  aturan: {                                                                                                          // 61
    type: Object                                                                                                     // 61
  },                                                                                                                 // 61
  'aturan.kali': {                                                                                                   // 62
    type: Number                                                                                                     // 62
  },                                                                                                                 // 62
  'aturan.dosis': {                                                                                                  // 63
    type: Number                                                                                                     // 63
  },                                                                                                                 // 63
  'aturan.bentuk': {                                                                                                 // 64
    type: Number,                                                                                                    // 64
    autoform: {                                                                                                      // 64
      options: selects.bentuk                                                                                        // 64
    }                                                                                                                // 64
  },                                                                                                                 // 64
  jumlah: {                                                                                                          // 65
    type: Number                                                                                                     // 65
  },                                                                                                                 // 65
  harga: {                                                                                                           // 66
    type: Number,                                                                                                    // 66
    optional: true,                                                                                                  // 66
    autoform: {                                                                                                      // 66
      type: 'hidden'                                                                                                 // 66
    }                                                                                                                // 66
  },                                                                                                                 // 66
  subtotal: {                                                                                                        // 67
    type: Number,                                                                                                    // 67
    optional: true,                                                                                                  // 67
    autoform: {                                                                                                      // 67
      type: 'hidden'                                                                                                 // 67
    }                                                                                                                // 67
  },                                                                                                                 // 67
  hasil: {                                                                                                           // 68
    type: String,                                                                                                    // 68
    optional: true,                                                                                                  // 68
    autoform: {                                                                                                      // 68
      type: 'hidden'                                                                                                 // 68
    }                                                                                                                // 68
  }                                                                                                                  // 68
};                                                                                                                   // 58
schema.rawat = {                                                                                                     // 70
  no_mr: {                                                                                                           // 71
    type: Number                                                                                                     // 71
  },                                                                                                                 // 71
  rawat: {                                                                                                           // 72
    type: Array                                                                                                      // 72
  },                                                                                                                 // 72
  'rawat.$': {                                                                                                       // 73
    type: Object                                                                                                     // 73
  },                                                                                                                 // 73
  'rawat.$.tanggal': {                                                                                               // 74
    type: Date,                                                                                                      // 74
    autoform: {                                                                                                      // 74
      type: 'hidden'                                                                                                 // 74
    }                                                                                                                // 74
  },                                                                                                                 // 74
  'rawat.$.idbayar': {                                                                                               // 75
    type: String,                                                                                                    // 75
    optional: true,                                                                                                  // 75
    autoform: {                                                                                                      // 75
      type: 'hidden'                                                                                                 // 75
    }                                                                                                                // 75
  },                                                                                                                 // 75
  'rawat.$.jenis': {                                                                                                 // 76
    type: String,                                                                                                    // 76
    optional: true,                                                                                                  // 76
    autoform: {                                                                                                      // 76
      type: 'hidden'                                                                                                 // 76
    }                                                                                                                // 76
  },                                                                                                                 // 76
  'rawat.$.cara_bayar': {                                                                                            // 77
    type: Number,                                                                                                    // 77
    autoform: {                                                                                                      // 77
      options: selects.cara_bayar,                                                                                   // 77
      type: 'select-radio-inline'                                                                                    // 77
    }                                                                                                                // 77
  },                                                                                                                 // 77
  'rawat.$.klinik': {                                                                                                // 78
    type: Number,                                                                                                    // 78
    autoform: {                                                                                                      // 78
      options: selects.klinik,                                                                                       // 78
      type: 'select-radio-inline'                                                                                    // 78
    }                                                                                                                // 78
  },                                                                                                                 // 78
  'rawat.$.billRegis': {                                                                                             // 79
    type: Boolean,                                                                                                   // 79
    optional: true,                                                                                                  // 79
    autoform: {                                                                                                      // 79
      type: 'hidden'                                                                                                 // 79
    }                                                                                                                // 79
  },                                                                                                                 // 79
  'rawat.$.nobill': {                                                                                                // 80
    type: Number,                                                                                                    // 80
    autoform: {                                                                                                      // 80
      type: 'hidden'                                                                                                 // 80
    }                                                                                                                // 80
  },                                                                                                                 // 80
  'rawat.$.status_bayar': {                                                                                          // 81
    type: Boolean,                                                                                                   // 81
    optional: true,                                                                                                  // 81
    autoform: {                                                                                                      // 81
      type: 'hidden'                                                                                                 // 81
    }                                                                                                                // 81
  },                                                                                                                 // 81
  'rawat.$.rujukan': {                                                                                               // 82
    type: Number,                                                                                                    // 82
    optional: true,                                                                                                  // 82
    autoform: {                                                                                                      // 82
      options: selects.rujukan,                                                                                      // 82
      type: 'select-radio-inline'                                                                                    // 82
    }                                                                                                                // 82
  },                                                                                                                 // 82
  'rawat.$.anamesa': {                                                                                               // 83
    type: String,                                                                                                    // 83
    optional: true                                                                                                   // 83
  },                                                                                                                 // 83
  'rawat.$.diagnosa': {                                                                                              // 84
    type: String,                                                                                                    // 84
    optional: true                                                                                                   // 84
  },                                                                                                                 // 84
  'rawat.$.tindakan': {                                                                                              // 85
    type: [new SimpleSchema(schema.tindakan)],                                                                       // 85
    optional: true                                                                                                   // 85
  },                                                                                                                 // 85
  'rawat.$.labor': {                                                                                                 // 86
    type: [new SimpleSchema(schema.labor)],                                                                          // 86
    optional: true                                                                                                   // 86
  },                                                                                                                 // 86
  'rawat.$.radio': {                                                                                                 // 87
    type: [new SimpleSchema(schema.radio)],                                                                          // 87
    optional: true                                                                                                   // 87
  },                                                                                                                 // 87
  'rawat.$.obat': {                                                                                                  // 88
    type: [new SimpleSchema(schema.obat)],                                                                           // 88
    optional: true                                                                                                   // 88
  },                                                                                                                 // 88
  'rawat.$.total': {                                                                                                 // 89
    type: Object,                                                                                                    // 89
    optional: true,                                                                                                  // 89
    autoform: {                                                                                                      // 89
      type: 'hidden'                                                                                                 // 89
    }                                                                                                                // 89
  },                                                                                                                 // 89
  'rawat.$.total.tindakan': {                                                                                        // 90
    type: Number,                                                                                                    // 90
    optional: true                                                                                                   // 90
  },                                                                                                                 // 90
  'rawat.$.total.labor': {                                                                                           // 91
    type: Number,                                                                                                    // 91
    optional: true                                                                                                   // 91
  },                                                                                                                 // 91
  'rawat.$.total.radio': {                                                                                           // 92
    type: Number,                                                                                                    // 92
    optional: true                                                                                                   // 92
  },                                                                                                                 // 92
  'rawat.$.total.obat': {                                                                                            // 93
    type: Number,                                                                                                    // 93
    optional: true                                                                                                   // 93
  },                                                                                                                 // 93
  'rawat.$.total.semua': {                                                                                           // 94
    type: Number,                                                                                                    // 94
    optional: true                                                                                                   // 94
  },                                                                                                                 // 94
  'rawat.$.spm': {                                                                                                   // 95
    type: Number,                                                                                                    // 95
    optional: true,                                                                                                  // 95
    autoform: {                                                                                                      // 95
      type: 'hidden'                                                                                                 // 95
    }                                                                                                                // 95
  },                                                                                                                 // 95
  'rawat.$.pindah': {                                                                                                // 96
    type: Number,                                                                                                    // 96
    optional: true,                                                                                                  // 96
    autoform: {                                                                                                      // 96
      options: selects.klinik                                                                                        // 96
    }                                                                                                                // 96
  },                                                                                                                 // 96
  'rawat.$.keluar': {                                                                                                // 97
    type: Number,                                                                                                    // 97
    optional: true,                                                                                                  // 97
    autoform: {                                                                                                      // 97
      options: selects.keluar                                                                                        // 97
    }                                                                                                                // 97
  },                                                                                                                 // 97
  'rawat.$.petugas': {                                                                                               // 98
    type: String,                                                                                                    // 98
    autoform: {                                                                                                      // 98
      type: 'hidden'                                                                                                 // 98
    }                                                                                                                // 98
  }                                                                                                                  // 98
};                                                                                                                   // 71
schema.jalan = _.assign(schema.rawat, {});                                                                           // 100
schema.inap = _.assign(schema.rawat, {});                                                                            // 101
schema.igd = _.assign(schema.rawat, {});                                                                             // 102
schema.gudang = {                                                                                                    // 104
  idbarang: {                                                                                                        // 105
    type: String,                                                                                                    // 106
    autoform: {                                                                                                      // 107
      type: 'hidden'                                                                                                 // 107
    },                                                                                                               // 107
    autoValue: function () {                                                                                         // 108
      return randomId();                                                                                             // 461
    }                                                                                                                // 106
  },                                                                                                                 // 106
  jenis: {                                                                                                           // 109
    type: Number,                                                                                                    // 109
    autoform: {                                                                                                      // 109
      options: selects.barang                                                                                        // 109
    }                                                                                                                // 109
  },                                                                                                                 // 109
  nama: {                                                                                                            // 110
    type: String                                                                                                     // 110
  },                                                                                                                 // 110
  batch: {                                                                                                           // 111
    type: Array                                                                                                      // 111
  },                                                                                                                 // 111
  'batch.$': {                                                                                                       // 112
    type: Object                                                                                                     // 112
  },                                                                                                                 // 112
  'batch.$.idbatch': {                                                                                               // 113
    type: String,                                                                                                    // 114
    autoform: {                                                                                                      // 115
      type: 'hidden'                                                                                                 // 115
    },                                                                                                               // 115
    autoValue: function () {                                                                                         // 116
      return randomId();                                                                                             // 485
    }                                                                                                                // 114
  },                                                                                                                 // 114
  'batch.$.nobatch': {                                                                                               // 117
    type: String                                                                                                     // 117
  },                                                                                                                 // 117
  'batch.$.merek': {                                                                                                 // 118
    type: String                                                                                                     // 118
  },                                                                                                                 // 118
  'batch.$.satuan': {                                                                                                // 119
    type: Number,                                                                                                    // 119
    autoform: {                                                                                                      // 119
      options: selects.satuan                                                                                        // 119
    }                                                                                                                // 119
  },                                                                                                                 // 119
  'batch.$.masuk': {                                                                                                 // 120
    type: Date,                                                                                                      // 120
    autoform: {                                                                                                      // 120
      type: 'pickadate'                                                                                              // 120
    }                                                                                                                // 120
  },                                                                                                                 // 120
  'batch.$.kadaluarsa': {                                                                                            // 121
    type: Date,                                                                                                      // 121
    autoform: {                                                                                                      // 121
      type: 'pickadate'                                                                                              // 121
    }                                                                                                                // 121
  },                                                                                                                 // 121
  'batch.$.digudang': {                                                                                              // 122
    type: Number                                                                                                     // 122
  },                                                                                                                 // 122
  'batch.$.diapotik': {                                                                                              // 123
    type: Number                                                                                                     // 123
  },                                                                                                                 // 123
  'batch.$.beli': {                                                                                                  // 124
    type: Number,                                                                                                    // 124
    decimal: true                                                                                                    // 124
  },                                                                                                                 // 124
  'batch.$.jual': {                                                                                                  // 125
    type: Number,                                                                                                    // 125
    decimal: true                                                                                                    // 125
  },                                                                                                                 // 125
  'batch.$.suplier': {                                                                                               // 126
    type: String                                                                                                     // 126
  },                                                                                                                 // 126
  'batch.$.anggaran': {                                                                                              // 127
    type: Number,                                                                                                    // 127
    autoform: {                                                                                                      // 127
      options: selects.anggaran                                                                                      // 127
    }                                                                                                                // 127
  },                                                                                                                 // 127
  'batch.$.pengadaan': {                                                                                             // 128
    type: Number                                                                                                     // 128
  }                                                                                                                  // 128
};                                                                                                                   // 105
schema.farmasi = _.assign(schema.gudang, {});                                                                        // 130
schema.logistik = _.assign(schema.gudang, {});                                                                       // 131
schema.dokter = {                                                                                                    // 133
  nama: {                                                                                                            // 134
    type: String                                                                                                     // 134
  },                                                                                                                 // 134
  tipe: {                                                                                                            // 135
    type: Number,                                                                                                    // 135
    autoform: {                                                                                                      // 135
      options: selects.tipe_dokter                                                                                   // 135
    }                                                                                                                // 135
  },                                                                                                                 // 135
  poli: {                                                                                                            // 136
    type: Number,                                                                                                    // 136
    autoform: {                                                                                                      // 136
      options: selects.klinik                                                                                        // 136
    }                                                                                                                // 136
  }                                                                                                                  // 136
};                                                                                                                   // 134
schema.tarif = {                                                                                                     // 138
  jenis: {                                                                                                           // 139
    type: String                                                                                                     // 139
  },                                                                                                                 // 139
  nama: {                                                                                                            // 140
    type: String                                                                                                     // 140
  },                                                                                                                 // 140
  harga: {                                                                                                           // 141
    type: Number                                                                                                     // 141
  },                                                                                                                 // 141
  grup: {                                                                                                            // 142
    type: String,                                                                                                    // 142
    optional: true                                                                                                   // 142
  }                                                                                                                  // 142
};                                                                                                                   // 139
                                                                                                                     //
_.map(['dokter', 'tarif'], function (i) {                                                                            // 144
  var obj;                                                                                                           // 145
  obj = {                                                                                                            // 145
    active: {                                                                                                        // 145
      type: Boolean,                                                                                                 // 146
      autoform: {                                                                                                    // 147
        type: 'hidden'                                                                                               // 147
      },                                                                                                             // 147
      autoValue: function () {                                                                                       // 148
        return true;                                                                                                 // 587
      }                                                                                                              // 146
    }                                                                                                                // 146
  };                                                                                                                 // 145
  return _.assign(schema[i], obj);                                                                                   // 591
});                                                                                                                  // 144
                                                                                                                     //
_.map(['pasien', 'gudang', 'dokter', 'tarif'], function (i) {                                                        // 151
  var arr;                                                                                                           // 152
  coll[i] = new Meteor.Collection(i);                                                                                // 152
  arr = ['insert', 'update', 'remove'];                                                                              // 153
  return coll[i].allow(_.zipObject(arr, _.map(arr, function (i) {                                                    // 598
    return function () {                                                                                             // 599
      return true;                                                                                                   // 600
    };                                                                                                               // 154
  })));                                                                                                              // 154
});                                                                                                                  // 151
                                                                                                                     //
_.map(modules.slice(0, 10), function (i) {                                                                           // 156
  return Router.route('/' + i.name + '/:no_mr?', {                                                                   // 606
    name: i.name,                                                                                                    // 158
    action: function () {                                                                                            // 159
      return this.render('pasien');                                                                                  // 609
    },                                                                                                               // 158
    waitOn: function () {                                                                                            // 160
      return _.map(['dokter', 'tarif', 'gudang'], function (j) {                                                     // 612
        return Meteor.subscribe('coll', j, {}, {});                                                                  // 613
      });                                                                                                            // 161
    }                                                                                                                // 158
  });                                                                                                                // 158
});                                                                                                                  // 156
                                                                                                                     //
_.map(modules.slice(10, 12), function (i) {                                                                          // 164
  return Router.route('/' + i.name + '/:idbarang?', {                                                                // 620
    name: i.name,                                                                                                    // 166
    action: function () {                                                                                            // 167
      return this.render('gudang');                                                                                  // 623
    }                                                                                                                // 166
  });                                                                                                                // 166
});                                                                                                                  // 164
                                                                                                                     //
_.map(['panduan'], function (i) {                                                                                    // 169
  return Router.route('/' + i, {                                                                                     // 629
    action: function () {                                                                                            // 171
      return this.render(i);                                                                                         // 631
    }                                                                                                                // 171
  });                                                                                                                // 171
});                                                                                                                  // 169
                                                                                                                     //
Router.route('/manajemen', {                                                                                         // 173
  action: function () {                                                                                              // 174
    return this.render('manajemen');                                                                                 // 638
  },                                                                                                                 // 174
  waitOn: function () {                                                                                              // 175
    return [Meteor.subscribe('users'), Meteor.subscribe('coll', 'dokter', {}, {}), Meteor.subscribe('coll', 'tarif', {}, {})];
  }                                                                                                                  // 174
});                                                                                                                  // 174
Router.route('/login', function () {                                                                                 // 181
  return {                                                                                                           // 646
    action: function () {                                                                                            // 182
      return this.render('login');                                                                                   // 648
    }                                                                                                                // 182
  };                                                                                                                 // 182
});                                                                                                                  // 181
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
                                                                                                                     //
    if (ref = currentRoute(), indexOf.call(_.uniq(_.flatMap(_.keys(roles()), function (i) {                          // 6
      return _.find(rights, function (j) {                                                                           // 16
        return j.group === i;                                                                                        // 17
      }).list;                                                                                                       // 8
    })), ref) < 0) {                                                                                                 // 7
      return Router.go('/');                                                                                         // 20
    }                                                                                                                // 21
  });                                                                                                                // 5
  globalHelpers = [['coll', function () {                                                                            // 10
    return coll;                                                                                                     // 26
  }], ['schema', function () {                                                                                       // 11
    return new SimpleSchema(schema[currentRoute()]);                                                                 // 30
  }], ['zeros', function (num) {                                                                                     // 12
    return zeros(num);                                                                                               // 34
  }], ['showForm', function () {                                                                                     // 13
    return Session.get('showForm');                                                                                  // 38
  }], ['hari', function (date) {                                                                                     // 14
    return moment(date).format('D MMM YYYY');                                                                        // 42
  }], ['rupiah', function (val) {                                                                                    // 15
    return 'Rp ' + numeral(val).format('0,0');                                                                       // 46
  }], ['currentPar', function (param) {                                                                              // 16
    return currentPar(param);                                                                                        // 50
  }], ['stringify', function (obj) {                                                                                 // 17
    return JSON.stringify(obj);                                                                                      // 54
  }], ['startCase', function (val) {                                                                                 // 18
    return _.startCase(val);                                                                                         // 58
  }], ['modules', function () {                                                                                      // 19
    return modules;                                                                                                  // 62
  }], ['reverse', function (arr) {                                                                                   // 20
    return _.reverse(arr);                                                                                           // 66
  }], ['sortBy', function (arr, sel, sort) {                                                                         // 21
    return _.sortBy(arr, function (i) {                                                                              // 70
      return -i.tanggal.getTime();                                                                                   // 71
    });                                                                                                              // 22
  }], ['isTrue', function (a, b) {                                                                                   // 22
    return a === b;                                                                                                  // 76
  }], ['isFalse', function (a, b) {                                                                                  // 23
    return a !== b;                                                                                                  // 80
  }], ['look', function (option, value, field) {                                                                     // 24
    return look(option, value)[field];                                                                               // 84
  }], ['look2', function (option, value, field) {                                                                    // 25
    return look2(option, value)[field];                                                                              // 88
  }], ['routeIs', function (name) {                                                                                  // 26
    return currentRoute() === name;                                                                                  // 92
  }], ['userGroup', function (name) {                                                                                // 27
    return roles()[name];                                                                                            // 96
  }], ['userRole', function (name) {                                                                                 // 28
    return roles()[currentRoute()][0] === name;                                                                      // 100
  }], ['pagins', function (name) {                                                                                   // 29
    var end, l, length, limit, results;                                                                              // 31
    limit = Session.get('limit');                                                                                    // 31
    length = coll[name].find().fetch().length;                                                                       // 32
    end = (length - length % limit) / limit;                                                                         // 33
    return function () {                                                                                             // 108
      results = [];                                                                                                  // 109
                                                                                                                     //
      for (var l = 1; 1 <= end ? l <= end : l >= end; 1 <= end ? l++ : l--) {                                        // 110
        results.push(l);                                                                                             // 110
      }                                                                                                              // 110
                                                                                                                     //
      return results;                                                                                                // 111
    }.apply(this);                                                                                                   // 112
  }]];                                                                                                               // 30
                                                                                                                     //
  _.map(globalHelpers, function (i) {                                                                                // 37
    return Template.registerHelper.apply(Template, i);                                                               // 117
  });                                                                                                                // 37
                                                                                                                     //
  Template.body.events({                                                                                             // 39
    'keypress #search': function (event) {                                                                           // 40
      var term;                                                                                                      // 41
                                                                                                                     //
      if (event.key === 'Enter') {                                                                                   // 41
        term = event.target.value;                                                                                   // 42
                                                                                                                     //
        if (term.length > 2) {                                                                                       // 43
          return Session.set('search', term);                                                                        // 125
        }                                                                                                            // 41
      }                                                                                                              // 127
    }                                                                                                                // 40
  });                                                                                                                // 40
  Template.layout.onRendered(function () {                                                                           // 46
    Session.set('limit', 10);                                                                                        // 47
    return Session.set('page', 0);                                                                                   // 132
  });                                                                                                                // 46
  Template.menu.helpers({                                                                                            // 50
    menus: function () {                                                                                             // 51
      return _.flatMap(_.keys(roles()), function (i) {                                                               // 136
        var find;                                                                                                    // 53
        find = _.find(rights, function (j) {                                                                         // 53
          return j.group === i;                                                                                      // 139
        });                                                                                                          // 53
        return _.map(find.list, function (j) {                                                                       // 141
          return _.find(modules, function (k) {                                                                      // 142
            return k.name === j;                                                                                     // 143
          });                                                                                                        // 54
        });                                                                                                          // 54
      });                                                                                                            // 52
    },                                                                                                               // 51
    navTitle: function () {                                                                                          // 55
      var find;                                                                                                      // 56
      find = _.find(modules, function (i) {                                                                          // 56
        return i.name === currentRoute();                                                                            // 151
      });                                                                                                            // 56
      return (find != null ? find.full : void 0) || _.startCase(currentRoute());                                     // 153
    },                                                                                                               // 51
    today: function () {                                                                                             // 58
      return moment().format('LLL');                                                                                 // 156
    }                                                                                                                // 51
  });                                                                                                                // 51
  Template.menu.events({                                                                                             // 60
    'click #logout': function () {                                                                                   // 61
      return Meteor.logout();                                                                                        // 161
    },                                                                                                               // 61
    'click #refresh': function () {                                                                                  // 62
      return document.location.reload();                                                                             // 164
    }                                                                                                                // 61
  });                                                                                                                // 61
  Template.pasien.helpers({                                                                                          // 64
    route: function () {                                                                                             // 65
      return currentRoute();                                                                                         // 169
    },                                                                                                               // 65
    formType: function () {                                                                                          // 66
      if (currentRoute() === 'regis') {                                                                              // 67
        if (currentPar('no_mr')) {                                                                                   // 68
          return 'update';                                                                                           // 174
        } else {                                                                                                     // 68
          return 'insert';                                                                                           // 176
        }                                                                                                            // 67
      } else {                                                                                                       // 67
        return 'update-pushArray';                                                                                   // 179
      }                                                                                                              // 180
    },                                                                                                               // 65
    umur: function (date) {                                                                                          // 71
      return moment().diff(date, 'years') + ' tahun';                                                                // 183
    },                                                                                                               // 65
    showButton: function () {                                                                                        // 72
      return Router.current().params.no_mr || currentRoute() === 'regis';                                            // 186
    },                                                                                                               // 65
    showButtonText: function () {                                                                                    // 73
      switch (currentRoute()) {                                                                                      // 74
        case 'regis':                                                                                                // 74
          return '+ Pasien';                                                                                         // 191
                                                                                                                     //
        case 'jalan':                                                                                                // 74
          return '+ Rawat';                                                                                          // 193
      }                                                                                                              // 74
    },                                                                                                               // 65
    formDoc: function () {                                                                                           // 77
      return formDoc();                                                                                              // 197
    },                                                                                                               // 65
    preview: function () {                                                                                           // 78
      return Session.get('preview');                                                                                 // 200
    },                                                                                                               // 65
    omitFields: function () {                                                                                        // 79
      var arr;                                                                                                       // 80
      arr = ['anamesa', 'diagnosa', 'tindakan', 'labor', 'radio', 'obat', 'spm', 'keluar', 'pindah'];                // 80
                                                                                                                     //
      if (!(formDoc() && formDoc().billRegis)) {                                                                     // 81
        return arr;                                                                                                  // 206
      } else if (_.split(Meteor.user().username, '.')[0] !== 'dr') {                                                 // 81
        return arr.slice(2, +arr.length + 1 || 9e9);                                                                 // 208
      }                                                                                                              // 209
    },                                                                                                               // 65
    roleFilter: function (arr) {                                                                                     // 85
      return _.reverse(_.filter(arr, function (i) {                                                                  // 212
        var find;                                                                                                    // 86
        find = _.find(selects.klinik, function (j) {                                                                 // 86
          return j.label === _.startCase(roles().jalan[0]);                                                          // 215
        });                                                                                                          // 86
        return i.klinik === find.value;                                                                              // 217
      }));                                                                                                           // 85
    },                                                                                                               // 65
    userPoli: function () {                                                                                          // 89
      return roles().jalan;                                                                                          // 221
    },                                                                                                               // 65
    insurance: function (val) {                                                                                      // 90
      return 'Rp ' + numeral(val + 30000).format('0,0');                                                             // 224
    },                                                                                                               // 65
    selPol: function () {                                                                                            // 91
      return _.map(roles().jalan, function (i) {                                                                     // 227
        return _.find(selects.klinik, function (j) {                                                                 // 228
          return i === _.snakeCase(j.label);                                                                         // 229
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
        }                                                                                                            // 248
                                                                                                                     //
        sub = Meteor.subscribe('coll', 'pasien', selector, options);                                                 // 99
                                                                                                                     //
        if (sub.ready()) {                                                                                           // 100
          return coll.pasien.findOne();                                                                              // 251
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
          return coll.pasien.find().fetch();                                                                         // 274
        }                                                                                                            // 101
      } else if (roles().jalan) {                                                                                    // 101
        now = new Date();                                                                                            // 109
        past = new Date(now.getDate() - 2);                                                                          // 109
        kliniks = _.map(roles().jalan, function (i) {                                                                // 110
          var find;                                                                                                  // 111
          find = _.find(selects.klinik, function (j) {                                                               // 111
            return i === _.snakeCase(j.label);                                                                       // 282
          });                                                                                                        // 111
          return find.value;                                                                                         // 284
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
              return ref1 = i.rawat[i.rawat.length - 1].klinik, indexOf.call(kliniks, ref1) >= 0;                    // 304
            };                                                                                                       // 119
                                                                                                                     //
            b = function () {                                                                                        // 120
              return !i.rawat[i.rawat.length - 1].total.semua;                                                       // 307
            };                                                                                                       // 120
                                                                                                                     //
            selPol = Session.get('selPol');                                                                          // 121
                                                                                                                     //
            c = function () {                                                                                        // 122
              return i.rawat[i.rawat.length - 1].klinik === selPol;                                                  // 311
            };                                                                                                       // 122
                                                                                                                     //
            if (selPol) {                                                                                            // 123
              return b() && c();                                                                                     // 314
            } else {                                                                                                 // 123
              return a() && b();                                                                                     // 316
            }                                                                                                        // 317
          });                                                                                                        // 118
          return _.sortBy(filter, function (i) {                                                                     // 319
            return i.rawat[i.rawat.length - 1].tanggal;                                                              // 320
          });                                                                                                        // 124
        }                                                                                                            // 108
      } else if (currentRoute() === 'bayar') {                                                                       // 108
        selector = {                                                                                                 // 126
          rawat: {                                                                                                   // 126
            $elemMatch: {                                                                                            // 126
              $or: [{                                                                                                // 126
                'total.semua': 0,                                                                                    // 126
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
          return coll.pasien.find().fetch();                                                                         // 340
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
          return coll.pasien.find().fetch();                                                                         // 361
        }                                                                                                            // 129
      }                                                                                                              // 363
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
          _.map(['cara_bayar', 'klinik', 'rujukan'], function (i) {                                                  // 142
            $('div[data-schema-key="' + i + '"]').prepend('<p>' + _.startCase(i) + '</p>');                          // 143
                                                                                                                     //
            if (formDoc()) {                                                                                         // 144
              return $('input[name="' + i + '"][value="' + formDoc()[i] + '"]').prop('checked', true);               // 377
            }                                                                                                        // 378
          });                                                                                                        // 142
                                                                                                                     //
          _.map(['anamesa', 'diagnosa'], function (i) {                                                              // 145
            return $('input[name="' + i + '"]').val(formDoc()[i]);                                                   // 381
          });                                                                                                        // 145
        }                                                                                                            // 383
                                                                                                                     //
        list = ['cara_bayar', 'kelamin', 'agama', 'nikah', 'pendidikan', 'darah', 'pekerjaan'];                      // 147
                                                                                                                     //
        if (currentRoute() === 'regis') {                                                                            // 148
          return _.map(list, function (i) {                                                                          // 386
            return $('div[data-schema-key="regis.' + i + '"]').prepend('<p>' + _.startCase(i) + '</p>');             // 387
          });                                                                                                        // 148
        }                                                                                                            // 389
      };                                                                                                             // 139
                                                                                                                     //
      setTimeout(later, 1000);                                                                                       // 150
      Meteor.subscribe('coll', 'gudang', {}, {});                                                                    // 151
      return Session.set('begin', moment());                                                                         // 393
    },                                                                                                               // 137
    'dblclick #row': function () {                                                                                   // 153
      return Router.go('/' + currentRoute() + '/' + this.no_mr);                                                     // 396
    },                                                                                                               // 137
    'click #close': function () {                                                                                    // 155
      _.map(['showForm', 'formDoc', 'preview', 'search'], function (i) {                                             // 156
        return Session.set(i, null);                                                                                 // 400
      });                                                                                                            // 156
                                                                                                                     //
      return Router.go(currentRoute());                                                                              // 402
    },                                                                                                               // 137
    'click #card': function () {                                                                                     // 159
      var dialog;                                                                                                    // 160
      dialog = {                                                                                                     // 160
        title: 'Cetak Kartu',                                                                                        // 161
        message: 'Yakin untuk cetak kartu ini?'                                                                      // 162
      };                                                                                                             // 161
      return new Confirmation(dialog, function (ok) {                                                                // 410
        if (ok) {                                                                                                    // 163
          Meteor.call('billCard', currentPar('no_mr'), true);                                                        // 164
          return makePdf.card();                                                                                     // 413
        }                                                                                                            // 414
      });                                                                                                            // 163
    },                                                                                                               // 137
    'click #consent': function () {                                                                                  // 166
      var dialog;                                                                                                    // 167
      dialog = {                                                                                                     // 167
        title: 'Cetak General Consent',                                                                              // 168
        message: 'Yakin untuk cetak persetujuan pasien?'                                                             // 169
      };                                                                                                             // 168
      return new Confirmation(dialog, function (ok) {                                                                // 423
        if (ok) {                                                                                                    // 170
          return makePdf.consent();                                                                                  // 425
        }                                                                                                            // 426
      });                                                                                                            // 170
    },                                                                                                               // 137
    'dblclick #bill': function (event) {                                                                             // 171
      var dialog, nodes;                                                                                             // 172
      nodes = _.map(['pasien', 'idbayar'], function (i) {                                                            // 172
        return event.target.attributes[i].nodeValue;                                                                 // 432
      });                                                                                                            // 172
      dialog = {                                                                                                     // 174
        title: 'Pembayaran Pendaftaran',                                                                             // 175
        message: 'Apakah yakin pasien sudah membayar?'                                                               // 176
      };                                                                                                             // 175
      return new Confirmation(dialog, function (ok) {                                                                // 438
        if (ok) {                                                                                                    // 177
          if (nodes[1]) {                                                                                            // 178
            Meteor.call.apply(Meteor, ['billRegis'].concat(slice.call(nodes), [true]));                              // 179
            return makePdf.payRegCard(30000, 'Tiga Puluh Ribu Rupiah');                                              // 442
          } else {                                                                                                   // 178
            Meteor.call('billCard', nodes[0], false);                                                                // 182
            return makePdf.payRegCard(10000, 'Sepuluh Ribu Rupiah');                                                 // 445
          }                                                                                                          // 177
        }                                                                                                            // 447
      });                                                                                                            // 177
    },                                                                                                               // 137
    'dblclick #bayar': function (event) {                                                                            // 184
      var dialog, nodes;                                                                                             // 185
      nodes = _.map(['pasien', 'idbayar'], function (i) {                                                            // 185
        return event.target.attributes[i].nodeValue;                                                                 // 453
      });                                                                                                            // 185
      dialog = {                                                                                                     // 187
        title: 'Konfirmasi Pembayaran',                                                                              // 188
        message: 'Apakah yakin tagihan ini sudah dibayar?'                                                           // 189
      };                                                                                                             // 188
      return new Confirmation(dialog, function (ok) {                                                                // 459
        var doc, pasien;                                                                                             // 190
                                                                                                                     //
        if (ok) {                                                                                                    // 190
          Meteor.call.apply(Meteor, ['bayar'].concat(slice.call(nodes)));                                            // 191
          pasien = coll.pasien.findOne({                                                                             // 192
            no_mr: parseInt(nodes[0])                                                                                // 192
          });                                                                                                        // 192
          doc = _.find(pasien.rawat, function (i) {                                                                  // 193
            return i.idbayar === nodes[1];                                                                           // 467
          });                                                                                                        // 193
          return makePdf.payRawat(doc);                                                                              // 469
        }                                                                                                            // 470
      });                                                                                                            // 190
    },                                                                                                               // 137
    'dblclick #request': function (event) {                                                                          // 195
      var nodes;                                                                                                     // 196
      nodes = _.map(['pasien', 'idbayar', 'jenis', 'idjenis'], function (i) {                                        // 196
        return event.target.attributes[i].nodeValue;                                                                 // 476
      });                                                                                                            // 196
      return MaterializeModal.prompt({                                                                               // 478
        message: 'Isikan data requestnya',                                                                           // 199
        callback: function (err, res) {                                                                              // 200
          var params;                                                                                                // 200
                                                                                                                     //
          if (res.submit) {                                                                                          // 200
            params = ['request'].concat(slice.call(nodes), [res.value]);                                             // 201
            return Meteor.call.apply(Meteor, slice.call(params).concat([function (err, res) {                        // 484
              var flat, key, message, rekap, val;                                                                    // 202
                                                                                                                     //
              if (res) {                                                                                             // 202
                message = '';                                                                                        // 203
                                                                                                                     //
                for (key in meteorBabelHelpers.sanitizeForInObject(res)) {                                           // 204
                  val = res[key];                                                                                    // 489
                  message += '</p>' + key + ': ' + val + '</p>';                                                     // 205
                }                                                                                                    // 204
                                                                                                                     //
                MaterializeModal.message({                                                                           // 206
                  title: 'Penyerahan Obat',                                                                          // 207
                  message: message                                                                                   // 208
                });                                                                                                  // 207
                rekap = Session.get('rekap') || [];                                                                  // 209
                flat = _.flatten(_.toPairs(res));                                                                    // 210
                return Session.set('rekap', slice.call(rekap).concat([slice.call(nodes).concat(slice.call(flat))]));
              }                                                                                                      // 499
            }]));                                                                                                    // 202
          }                                                                                                          // 501
        }                                                                                                            // 199
      });                                                                                                            // 199
    },                                                                                                               // 137
    'dblclick #rekap': function () {                                                                                 // 212
      var headers;                                                                                                   // 213
      headers = ['Pasien', 'ID Bayar', 'Jenis', 'ID Request', 'No Batch', 'Jumlah'];                                 // 213
      makePdf.rekap([headers].concat(slice.call(Session.get('rekap'))));                                             // 214
      return Session.set('rekap', null);                                                                             // 509
    },                                                                                                               // 137
    'click .modal-trigger': function (event) {                                                                       // 216
      if (this.idbayar) {                                                                                            // 217
        Session.set('formDoc', this);                                                                                // 218
        Session.set('preview', modForm(this, this.idbayar));                                                         // 219
      }                                                                                                              // 515
                                                                                                                     //
      return $('#preview').modal('open');                                                                            // 516
    },                                                                                                               // 137
    'click #rmRawat': function () {                                                                                  // 221
      var dialog, self;                                                                                              // 222
      self = this;                                                                                                   // 222
      dialog = {                                                                                                     // 223
        title: 'Konfirmasi Hapus',                                                                                   // 224
        message: 'Apakah yakin hapus data rawat pasien ini?'                                                         // 225
      };                                                                                                             // 224
      return new Confirmation(dialog, function (ok) {                                                                // 525
        if (ok) {                                                                                                    // 226
          return Meteor.call('rmRawat', currentPar('no_mr'), self.idbayar);                                          // 527
        }                                                                                                            // 528
      });                                                                                                            // 226
    },                                                                                                               // 137
    'change #selPol': function (event) {                                                                             // 228
      return Session.set('selPol', parseInt(event.target.id));                                                       // 532
    },                                                                                                               // 137
    'click #rmPasien': function () {                                                                                 // 230
      var dialog;                                                                                                    // 231
      dialog = {                                                                                                     // 231
        title: 'Hapus Pasien',                                                                                       // 232
        message: 'Apakah yakin untuk menghapus pasien?'                                                              // 233
      };                                                                                                             // 232
      return new Confirmation(dialog, function (ok) {                                                                // 540
        if (ok) {                                                                                                    // 234
          Meteor.call('rmPasien', currentPar('no_mr'));                                                              // 235
          return Router.go('/' + currentRoute());                                                                    // 543
        }                                                                                                            // 544
      });                                                                                                            // 234
    }                                                                                                                // 137
  });                                                                                                                // 137
  Template["import"].events({                                                                                        // 238
    'change :file': function (event, template) {                                                                     // 239
      return Papa.parse(event.target.files[0], {                                                                     // 550
        header: true,                                                                                                // 241
        step: function (result) {                                                                                    // 242
          var data, modifier, selector;                                                                              // 243
          data = result.data[0];                                                                                     // 243
                                                                                                                     //
          if (currentRoute() === 'regis') {                                                                          // 244
            selector = {                                                                                             // 245
              no_mr: parseInt(data.no_mr)                                                                            // 245
            };                                                                                                       // 245
            modifier = {                                                                                             // 246
              regis: {                                                                                               // 246
                nama_lengkap: _.startCase(data.nama_lengkap),                                                        // 247
                alamat: _.startCase(data.alamat),                                                                    // 248
                agama: parseInt(data.agama),                                                                         // 249
                ayah: _.startCase(data.ayah),                                                                        // 250
                nikah: parseInt(data.nikah),                                                                         // 251
                pekerjaan: parseInt(data.pekerjaan),                                                                 // 252
                pendidikan: parseInt(data.pendidikan),                                                               // 253
                tgl_lahir: new Date(data.tgl_lahir),                                                                 // 254
                tmpt_kelahiran: _.startCase(data.tmpt_kelahiran)                                                     // 255
              }                                                                                                      // 247
            };                                                                                                       // 246
            return Meteor.call('import', 'pasien', selector, modifier);                                              // 572
          } else if (currentRoute() === 'manajemen') {                                                               // 244
            if (data.tipe) {                                                                                         // 258
              selector = {                                                                                           // 259
                nama: data.nama                                                                                      // 259
              };                                                                                                     // 259
              modifier = {                                                                                           // 260
                tipe: parseInt(data.tipe),                                                                           // 261
                poli: parseInt(data.poli),                                                                           // 262
                active: true                                                                                         // 263
              };                                                                                                     // 261
              return Meteor.call('import', 'dokter', selector, modifier);                                            // 583
            } else if (data.harga) {                                                                                 // 258
              selector = {                                                                                           // 266
                nama: _.snakeCase(data.nama)                                                                         // 266
              };                                                                                                     // 266
              modifier = {                                                                                           // 267
                harga: parseInt(data.harga),                                                                         // 268
                jenis: _.snakeCase(data.jenis),                                                                      // 269
                active: true                                                                                         // 270
              };                                                                                                     // 268
              data.grup && (modifier.grup = _.startCase(data.grup));                                                 // 271
              return Meteor.call('import', 'tarif', selector, modifier);                                             // 594
            } else if (data.password) {                                                                              // 265
              Meteor.call('newUser', data);                                                                          // 274
              return Meteor.call('addRole', data.username, [data.role], data.group);                                 // 597
            }                                                                                                        // 257
          } else if (currentRoute() === 'farmasi') {                                                                 // 257
            selector = {                                                                                             // 277
              nama: data.nama                                                                                        // 277
            };                                                                                                       // 277
            modifier = {                                                                                             // 278
              jenis: parseInt(data.jenis),                                                                           // 279
              idbarang: randomId(),                                                                                  // 280
              batch: [{                                                                                              // 281
                idbatch: randomId(),                                                                                 // 282
                anggaran: data.anggaran,                                                                             // 283
                beli: parseInt(data.beli),                                                                           // 284
                diapotik: parseInt(data.diapotik),                                                                   // 285
                digudang: parseInt(data.digudang),                                                                   // 286
                jenis: parseInt(data.jenis),                                                                         // 287
                jual: parseInt(data.jual),                                                                           // 288
                kadaluarsa: new Date(data.kadaluarsa),                                                               // 289
                masuk: new Date(data.masuk),                                                                         // 290
                merek: data.merek || '',                                                                             // 291
                nobatch: data.nobatch,                                                                               // 292
                pengadaan: parseInt(data.pengadaan),                                                                 // 293
                satuan: parseInt(data.satuan),                                                                       // 294
                suplier: data.suplier                                                                                // 295
              }]                                                                                                     // 282
            };                                                                                                       // 279
            return data.nama && Meteor.call('import', 'gudang', selector, modifier, 'batch');                        // 625
          }                                                                                                          // 626
        }                                                                                                            // 241
      });                                                                                                            // 241
    }                                                                                                                // 239
  });                                                                                                                // 239
  Template.gudang.helpers({                                                                                          // 299
    schemagudang: function () {                                                                                      // 300
      return new SimpleSchema(schema.gudang);                                                                        // 633
    },                                                                                                               // 300
    formType: function () {                                                                                          // 301
      if (currentPar('idbarang')) {                                                                                  // 301
        return 'update-pushArray';                                                                                   // 637
      } else {                                                                                                       // 301
        return 'insert';                                                                                             // 639
      }                                                                                                              // 640
    },                                                                                                               // 300
    gudangs: function () {                                                                                           // 302
      var byBatch, byName, selector, sub;                                                                            // 303
                                                                                                                     //
      if (currentPar('idbarang')) {                                                                                  // 303
        selector = {                                                                                                 // 304
          idbarang: currentPar('idbarang')                                                                           // 304
        };                                                                                                           // 304
        sub = Meteor.subscribe('coll', 'gudang', selector, {});                                                      // 305
                                                                                                                     //
        if (sub.ready()) {                                                                                           // 306
          return coll.gudang.findOne();                                                                              // 650
        }                                                                                                            // 303
      } else if (search()) {                                                                                         // 303
        byName = {                                                                                                   // 308
          nama: {                                                                                                    // 308
            $options: '-i',                                                                                          // 308
            $regex: '.*' + search() + '.*'                                                                           // 308
          }                                                                                                          // 308
        };                                                                                                           // 308
        byBatch = {                                                                                                  // 309
          idbatch: search()                                                                                          // 309
        };                                                                                                           // 309
        selector = {                                                                                                 // 310
          $or: [byName, byBatch]                                                                                     // 310
        };                                                                                                           // 310
        sub = Meteor.subscribe('coll', 'gudang', selector, {});                                                      // 311
        return sub.ready() && coll.gudang.find().fetch();                                                            // 666
      } else {                                                                                                       // 307
        sub = Meteor.subscribe('coll', 'gudang', {}, {});                                                            // 314
        return sub.ready() && coll.gudang.find().fetch();                                                            // 669
      }                                                                                                              // 670
    }                                                                                                                // 300
  });                                                                                                                // 300
  Template.gudang.events({                                                                                           // 317
    'click #showForm': function () {                                                                                 // 318
      return Session.set('showForm', !Session.get('showForm'));                                                      // 675
    },                                                                                                               // 318
    'dblclick #row': function () {                                                                                   // 320
      return Router.go('/' + currentRoute() + '/' + this.idbarang);                                                  // 678
    },                                                                                                               // 318
    'dblclick #transfer': function () {                                                                              // 321
      var data;                                                                                                      // 322
      data = this;                                                                                                   // 322
                                                                                                                     //
      if (roles().farmasi) {                                                                                         // 323
        return MaterializeModal.prompt({                                                                             // 684
          message: 'Transfer Gudang > Apotek',                                                                       // 325
          callback: function (err, res) {                                                                            // 326
            if (res.submit) {                                                                                        // 326
              return Meteor.call('transfer', currentPar('idbarang'), data.idbatch, parseInt(res.value));             // 688
            }                                                                                                        // 689
          }                                                                                                          // 325
        });                                                                                                          // 325
      }                                                                                                              // 692
    },                                                                                                               // 318
    'click #rmBarang': function () {                                                                                 // 328
      var dialog, self;                                                                                              // 329
      self = this;                                                                                                   // 329
      dialog = {                                                                                                     // 330
        title: 'Hapus Jenis Obat',                                                                                   // 331
        message: 'Apakah yakin untuk hapus jenis obat ini dari sistem?'                                              // 332
      };                                                                                                             // 331
      return new Confirmation(dialog, function (ok) {                                                                // 701
        if (ok) {                                                                                                    // 333
          return Meteor.call('rmBarang', self.idbarang);                                                             // 703
        }                                                                                                            // 704
      });                                                                                                            // 333
    }                                                                                                                // 318
  });                                                                                                                // 318
  Template.manajemen.onRendered(function () {                                                                        // 336
    return $('select#export').material_select();                                                                     // 709
  });                                                                                                                // 336
  Template.manajemen.helpers({                                                                                       // 339
    users: function () {                                                                                             // 340
      return Meteor.users.find().fetch();                                                                            // 713
    },                                                                                                               // 340
    onUser: function () {                                                                                            // 341
      return Session.get('onUser');                                                                                  // 716
    },                                                                                                               // 340
    selRoles: function () {                                                                                          // 342
      return ['petugas', 'admin'];                                                                                   // 719
    },                                                                                                               // 340
    klinik: function () {                                                                                            // 343
      return selects.klinik;                                                                                         // 722
    },                                                                                                               // 340
    schemadokter: function () {                                                                                      // 344
      return new SimpleSchema(schema.dokter);                                                                        // 725
    },                                                                                                               // 340
    schematarif: function () {                                                                                       // 345
      return new SimpleSchema(schema.tarif);                                                                         // 728
    },                                                                                                               // 340
    dokters: function () {                                                                                           // 346
      var options, selector;                                                                                         // 347
      selector = {                                                                                                   // 347
        active: true                                                                                                 // 347
      };                                                                                                             // 347
      options = {                                                                                                    // 348
        limit: limit(),                                                                                              // 348
        skip: page() * limit()                                                                                       // 348
      };                                                                                                             // 348
      return coll.dokter.find(selector, options).fetch();                                                            // 739
    },                                                                                                               // 340
    tarifs: function () {                                                                                            // 350
      var options, selector;                                                                                         // 351
      selector = {                                                                                                   // 351
        active: true                                                                                                 // 351
      };                                                                                                             // 351
      options = {                                                                                                    // 352
        limit: limit(),                                                                                              // 352
        skip: page() * limit()                                                                                       // 352
      };                                                                                                             // 352
      return coll.tarif.find(selector, options).fetch();                                                             // 750
    }                                                                                                                // 340
  });                                                                                                                // 340
  Template.manajemen.events({                                                                                        // 355
    'submit #userForm': function (event) {                                                                           // 356
      var doc, group, onUser, poli, repeat, role, theRole;                                                           // 357
      event.preventDefault();                                                                                        // 357
      onUser = Session.get('onUser');                                                                                // 358
                                                                                                                     //
      if (!onUser) {                                                                                                 // 359
        doc = {                                                                                                      // 360
          username: event.target.children.username.value,                                                            // 361
          password: event.target.children.password.value                                                             // 362
        };                                                                                                           // 361
        repeat = event.target.children.repeat.value;                                                                 // 363
                                                                                                                     //
        if (doc.password === repeat) {                                                                               // 364
          Meteor.call('newUser', doc);                                                                               // 365
          return $('input').val('');                                                                                 // 766
        } else {                                                                                                     // 364
          return Materialize.toast('Password tidak mirip', 3000);                                                    // 768
        }                                                                                                            // 359
      } else {                                                                                                       // 359
        role = $('input[name="role"]:checked', event.target)[0].id;                                                  // 370
        group = $('input[name="group"]:checked', event.target)[0].id;                                                // 371
        poli = $('input[name="poli"]:checked', event.target)[0];                                                     // 372
        theRole = !poli ? role : _.snakeCase(poli.id);                                                               // 373
        return Meteor.call('addRole', onUser._id, [theRole], group);                                                 // 775
      }                                                                                                              // 776
    },                                                                                                               // 356
    'dblclick #row': function () {                                                                                   // 375
      return Session.set('onUser', this);                                                                            // 779
    },                                                                                                               // 356
    'dblclick #reset': function () {                                                                                 // 376
      var dialog, self;                                                                                              // 377
      self = this;                                                                                                   // 377
      dialog = {                                                                                                     // 378
        title: 'Reset Peranan',                                                                                      // 379
        message: 'Anda yakin untuk menghapus semua perannya?'                                                        // 380
      };                                                                                                             // 379
      return new Confirmation(dialog, function (ok) {                                                                // 788
        if (ok) {                                                                                                    // 381
          return Meteor.call('rmRole', self._id);                                                                    // 790
        }                                                                                                            // 791
      });                                                                                                            // 381
    },                                                                                                               // 356
    'click #close': function () {                                                                                    // 383
      return console.log('tutup');                                                                                   // 795
    },                                                                                                               // 356
    'click #export': function () {                                                                                   // 384
      var select;                                                                                                    // 385
      select = $('select#export').val();                                                                             // 385
      return Meteor.call('export', select, function (err, content) {                                                 // 800
        var blob;                                                                                                    // 386
                                                                                                                     //
        if (content) {                                                                                               // 386
          blob = new Blob([content], {                                                                               // 387
            type: 'text/plain;charset=utf-8'                                                                         // 387
          });                                                                                                        // 387
          return saveAs(blob, select + '.csv');                                                                      // 806
        }                                                                                                            // 807
      });                                                                                                            // 386
    },                                                                                                               // 356
    'dblclick #baris': function (event) {                                                                            // 389
      var dialog, jenis, self;                                                                                       // 390
      jenis = event.currentTarget.className;                                                                         // 390
      dialog = {                                                                                                     // 391
        title: 'Hapus ' + _.startCase(jenis),                                                                        // 392
        message: 'Yakin untuk menghapus ' + jenis + ' dari daftar?'                                                  // 393
      };                                                                                                             // 392
      self = this;                                                                                                   // 394
      return new Confirmation(dialog, function (ok) {                                                                // 818
        if (ok) {                                                                                                    // 395
          return Meteor.call('inactive', jenis, self._id);                                                           // 820
        }                                                                                                            // 821
      });                                                                                                            // 395
    }                                                                                                                // 356
  });                                                                                                                // 356
  Template.login.onRendered(function () {                                                                            // 398
    return $('.slider').slider();                                                                                    // 826
  });                                                                                                                // 398
  Template.login.events({                                                                                            // 401
    'submit form': function (event) {                                                                                // 402
      var password, username;                                                                                        // 403
      event.preventDefault();                                                                                        // 403
      username = event.target.children.username.value;                                                               // 404
      password = event.target.children.password.value;                                                               // 405
      return Meteor.loginWithPassword(username, password, function (err) {                                           // 834
        if (err) {                                                                                                   // 407
          return Materialize.toast('Salah username / password', 3000);                                               // 836
        } else {                                                                                                     // 407
          return Router.go('/' + _.keys(roles())[0]);                                                                // 838
        }                                                                                                            // 839
      });                                                                                                            // 406
    }                                                                                                                // 402
  });                                                                                                                // 402
  Template.pagination.events({                                                                                       // 412
    'click #next': function () {                                                                                     // 413
      return Session.set('page', 1 + page());                                                                        // 845
    },                                                                                                               // 413
    'click #prev': function () {                                                                                     // 414
      return Session.set('page', -1 + page());                                                                       // 848
    },                                                                                                               // 413
    'click #num': function (event) {                                                                                 // 415
      return Session.set('page', parseInt(event.target.innerText));                                                  // 851
    }                                                                                                                // 413
  });                                                                                                                // 413
  Template.report.helpers({                                                                                          // 418
    datas: function () {                                                                                             // 419
      return Session.get('laporan');                                                                                 // 856
    }                                                                                                                // 419
  });                                                                                                                // 419
  Template.report.events({                                                                                           // 421
    'click .datepicker': function (event, template) {                                                                // 422
      var type;                                                                                                      // 423
      type = event.target.attributes.date.nodeValue;                                                                 // 423
      return $('#' + type).pickadate({                                                                               // 863
        onSet: function (data) {                                                                                     // 424
          var end, start;                                                                                            // 425
          Session.set(type + 'Date', data.select);                                                                   // 425
          start = Session.get('startDate');                                                                          // 426
          end = Session.get('endDate');                                                                              // 427
                                                                                                                     //
          if (start && end) {                                                                                        // 428
            return Meteor.call('report', template.data.jenis, start, end, function (err, res) {                      // 870
              return res && Session.set('laporan', res);                                                             // 871
            });                                                                                                      // 429
          }                                                                                                          // 873
        }                                                                                                            // 424
      });                                                                                                            // 424
    },                                                                                                               // 422
    'click #export': function (event, template) {                                                                    // 431
      var blob, content;                                                                                             // 432
      content = exportcsv.exportToCSV(Session.get('laporan').csv, true, ';');                                        // 432
      blob = new Blob([content], {                                                                                   // 433
        type: 'text/plain;charset=utf-8'                                                                             // 433
      });                                                                                                            // 433
      return saveAs(blob, template.data.jenis + '.csv');                                                             // 883
    }                                                                                                                // 422
  });                                                                                                                // 422
}                                                                                                                    // 886
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
require("./folder/menus.coffee.js");
require("./folder/modules.coffee.js");
require("./folder/pdf.coffee.js");
require("./folder/selects.coffee.js");
require("./both.coffee.js");
require("./client.coffee.js");
require("./server.coffee.js");
//# sourceMappingURL=app.js.map
