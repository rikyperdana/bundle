var require = meteorInstall({"folder":{"parent":{"funcs.coffee.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// folder/parent/funcs.coffee.js                                                                                      //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
this._ = lodash;                                                                                                      // 1
this.coll = {};                                                                                                       // 2
this.schema = {};                                                                                                     // 2
                                                                                                                      //
this.look = function (list, val) {                                                                                    // 3
  return _.find(selects[list], function (i) {                                                                         // 8
    return i.value === val;                                                                                           // 9
  });                                                                                                                 // 3
};                                                                                                                    // 3
                                                                                                                      //
this.look2 = function (list, id) {                                                                                    // 4
  return _.find(coll[list].find().fetch(), function (i) {                                                             // 14
    return i._id === id;                                                                                              // 15
  });                                                                                                                 // 4
};                                                                                                                    // 4
                                                                                                                      //
this.randomId = function () {                                                                                         // 5
  return Math.random().toString(36).slice(2);                                                                         // 20
};                                                                                                                    // 5
                                                                                                                      //
this.zeros = function (num) {                                                                                         // 6
  var size;                                                                                                           // 7
  size = _.size(_.toString(num));                                                                                     // 7
  return '0'.repeat(6 - size) + _.toString(num);                                                                      // 26
};                                                                                                                    // 6
                                                                                                                      //
if (Meteor.isClient) {                                                                                                // 10
  AutoForm.setDefaultTemplate('materialize');                                                                         // 13
                                                                                                                      //
  this.currentRoute = function () {                                                                                   // 14
    return Router.current().route.getName();                                                                          // 32
  };                                                                                                                  // 14
                                                                                                                      //
  this.currentPar = function (param) {                                                                                // 15
    return Router.current().params[param];                                                                            // 35
  };                                                                                                                  // 15
                                                                                                                      //
  this.search = function () {                                                                                         // 16
    return Session.get('search');                                                                                     // 38
  };                                                                                                                  // 16
                                                                                                                      //
  this.formDoc = function () {                                                                                        // 17
    return Session.get('formDoc');                                                                                    // 41
  };                                                                                                                  // 17
                                                                                                                      //
  this.limit = function () {                                                                                          // 18
    return Session.get('limit');                                                                                      // 44
  };                                                                                                                  // 18
                                                                                                                      //
  this.page = function () {                                                                                           // 19
    return Session.get('page');                                                                                       // 47
  };                                                                                                                  // 19
                                                                                                                      //
  this.roles = function () {                                                                                          // 20
    return Meteor.user().roles;                                                                                       // 50
  };                                                                                                                  // 20
                                                                                                                      //
  this.userGroup = function (name) {                                                                                  // 21
    return roles()[name];                                                                                             // 53
  };                                                                                                                  // 21
                                                                                                                      //
  this.userRole = function (name) {                                                                                   // 22
    return roles()[currentRoute()][0] === name;                                                                       // 56
  };                                                                                                                  // 22
                                                                                                                      //
  this.tag = function (tag, val) {                                                                                    // 23
    return '<' + tag + '>' + val + '</' + tag + '>';                                                                  // 59
  };                                                                                                                  // 23
                                                                                                                      //
  this.sessNull = function () {                                                                                       // 24
    return _.map(_.tail(_.keys(Session.keys)), function (i) {                                                         // 62
      return Session.set(i, null);                                                                                    // 63
    });                                                                                                               // 24
  };                                                                                                                  // 24
}                                                                                                                     // 66
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"hooks.coffee.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// folder/hooks.coffee.js                                                                                             //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
if (Meteor.isClient) {                                                                                                // 1
  this.modForm = function (doc, idbayar) {                                                                            // 3
    var begin, find, i, l, len, ref, stop;                                                                            // 3
                                                                                                                      //
    if (currentRoute() === 'jalan') {                                                                                 // 3
      doc.tanggal = new Date();                                                                                       // 4
      doc.idbayar = idbayar ? idbayar : randomId();                                                                   // 5
      doc.jenis = currentRoute();                                                                                     // 6
      doc.total = {                                                                                                   // 7
        tindakan: 0,                                                                                                  // 7
        labor: 0,                                                                                                     // 7
        radio: 0,                                                                                                     // 7
        obat: 0                                                                                                       // 7
      };                                                                                                              // 7
                                                                                                                      //
      _.map(['tindakan', 'labor', 'radio'], function (i) {                                                            // 8
        var find, j, l, len, ref, results;                                                                            // 9
                                                                                                                      //
        if (doc[i]) {                                                                                                 // 9
          ref = doc[i];                                                                                               // 9
          results = [];                                                                                               // 9
                                                                                                                      //
          for (l = 0, len = ref.length; l < len; l++) {                                                               // 19
            j = ref[l];                                                                                               // 20
            j['id' + i] = randomId();                                                                                 // 10
            find = _.find(coll.tarif.find().fetch(), function (k) {                                                   // 11
              return k._id === j.nama;                                                                                // 23
            });                                                                                                       // 11
            j.harga = find.harga;                                                                                     // 12
            results.push(doc.total[i] += j.harga);                                                                    // 26
          }                                                                                                           // 9
                                                                                                                      //
          return results;                                                                                             // 28
        }                                                                                                             // 29
      });                                                                                                             // 8
                                                                                                                      //
      ref = doc.obat != null;                                                                                         // 14
                                                                                                                      //
      for (l = 0, len = ref.length; l < len; l++) {                                                                   // 14
        i = ref[l];                                                                                                   // 33
        i.idobat = randomId();                                                                                        // 15
        find = _.find(coll.gudang.find().fetch(), function (k) {                                                      // 16
          return k._id === i.nama;                                                                                    // 36
        });                                                                                                           // 16
        i.harga = 0;                                                                                                  // 17
        i.subtotal = i.harga * i.jumlah;                                                                              // 18
        doc.total.obat += i.subtotal;                                                                                 // 19
      }                                                                                                               // 14
                                                                                                                      //
      doc.total.semua = _.reduce(_.values(doc.total), function (acc, val) {                                           // 20
        return acc + val;                                                                                             // 43
      });                                                                                                             // 20
                                                                                                                      //
      if (doc.anamesa_perawat || doc.anamesa_dokter) {                                                                // 21
        doc.billRegis = true;                                                                                         // 21
      }                                                                                                               // 47
                                                                                                                      //
      if (doc.total.semua > 0 || doc.cara_bayar !== 1) {                                                              // 22
        doc.billRegis = true;                                                                                         // 22
      }                                                                                                               // 50
                                                                                                                      //
      if (doc.total.semua > 0 && doc.cara_bayar !== 1) {                                                              // 23
        doc.status_bayar = true;                                                                                      // 23
      }                                                                                                               // 53
                                                                                                                      //
      if (doc.obat && 0 === doc.total.semua) {                                                                        // 24
        doc.billRegis = true;                                                                                         // 25
        doc.status_bayar = true;                                                                                      // 26
      }                                                                                                               // 57
                                                                                                                      //
      begin = Session.get('begin');                                                                                   // 27
      stop = moment();                                                                                                // 27
      doc.spm = stop.diff(begin, 'minutes');                                                                          // 28
      doc.petugas = Meteor.userId();                                                                                  // 29
      doc.nobill = parseInt(_.toString(Date.now()).substr(7, 13));                                                    // 30
      return doc;                                                                                                     // 63
    }                                                                                                                 // 64
  };                                                                                                                  // 3
                                                                                                                      //
  AutoForm.addHooks('formPasien', {                                                                                   // 33
    before: {                                                                                                         // 34
      'update-pushArray': function (doc) {                                                                            // 35
        var formDoc;                                                                                                  // 36
        formDoc = Session.get('formDoc');                                                                             // 36
                                                                                                                      //
        if (formDoc) {                                                                                                // 37
          Meteor.call('rmRawat', currentPar('no_mr'), formDoc.idbayar);                                               // 37
        }                                                                                                             // 73
                                                                                                                      //
        return this.result(modForm(doc));                                                                             // 74
      }                                                                                                               // 35
    },                                                                                                                // 35
    after: {                                                                                                          // 39
      insert: function () {                                                                                           // 40
        return sessNull();                                                                                            // 79
      },                                                                                                              // 40
      'update-pushArray': function (err, res) {                                                                       // 41
        sessNull();                                                                                                   // 42
                                                                                                                      //
        if (res) {                                                                                                    // 43
          return Meteor.call('pindah', currentPar('no_mr'));                                                          // 84
        }                                                                                                             // 85
      }                                                                                                               // 40
    },                                                                                                                // 40
    formToDoc: function (doc) {                                                                                       // 44
      Session.set('preview', modForm(doc));                                                                           // 45
                                                                                                                      //
      if (currentRoute() === 'regis') {                                                                               // 46
        Meteor.call('patientExist', doc.no_mr, function (err, res) {                                                  // 47
          if (res) {                                                                                                  // 47
            Materialize.toast('No MR sudah dipakai pasien yang lain', 3000);                                          // 48
            return $('input[name="no_mr"]').val('');                                                                  // 94
          }                                                                                                           // 95
        });                                                                                                           // 47
      }                                                                                                               // 97
                                                                                                                      //
      return doc;                                                                                                     // 98
    }                                                                                                                 // 34
  });                                                                                                                 // 34
  AutoForm.addHooks('formGudang', {                                                                                   // 52
    before: {                                                                                                         // 53
      insert: function (doc) {                                                                                        // 54
        doc.idbarang = randomId();                                                                                    // 55
        doc.batch[0].idbatch = randomId();                                                                            // 56
        return this.result(doc);                                                                                      // 106
      },                                                                                                              // 54
      'update-pushArray': function (doc) {                                                                            // 58
        doc.idbatch = randomId();                                                                                     // 59
        return this.result(doc);                                                                                      // 110
      }                                                                                                               // 54
    }                                                                                                                 // 54
  });                                                                                                                 // 53
}                                                                                                                     // 114
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"modules.coffee.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// folder/modules.coffee.js                                                                                           //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
this.modules = [{                                                                                                     // 1
  name: 'regis',                                                                                                      // 2
  full: 'Pendaftaran',                                                                                                // 3
  icon: 'people',                                                                                                     // 4
  color: 'orange'                                                                                                     // 5
}, {                                                                                                                  // 2
  name: 'bayar',                                                                                                      // 7
  full: 'Pembayaran',                                                                                                 // 8
  icon: 'monetization_on',                                                                                            // 9
  color: 'green'                                                                                                      // 10
}, {                                                                                                                  // 7
  name: 'jalan',                                                                                                      // 12
  full: 'Rawat Jalan',                                                                                                // 13
  icon: 'directions',                                                                                                 // 14
  color: 'blue'                                                                                                       // 15
}, {                                                                                                                  // 12
  name: 'igd',                                                                                                        // 17
  full: 'IGD',                                                                                                        // 18
  icon: 'airport_shuttle',                                                                                            // 19
  color: 'red'                                                                                                        // 20
}, {                                                                                                                  // 17
  name: 'inap',                                                                                                       // 22
  full: 'Rawat Inap',                                                                                                 // 23
  icon: 'hotel',                                                                                                      // 24
  color: 'cyan'                                                                                                       // 25
}, {                                                                                                                  // 22
  name: 'labor',                                                                                                      // 27
  full: 'Laboratorium',                                                                                               // 28
  icon: 'wb_incandescent',                                                                                            // 29
  color: 'amber'                                                                                                      // 30
}, {                                                                                                                  // 27
  name: 'radio',                                                                                                      // 32
  full: 'Radiologi',                                                                                                  // 33
  icon: 'airline_seat_flat',                                                                                          // 34
  color: 'indigo'                                                                                                     // 35
}, {                                                                                                                  // 32
  name: 'obat',                                                                                                       // 37
  full: 'Apotek',                                                                                                     // 38
  icon: 'enhanced_encryption',                                                                                        // 39
  color: 'light-green'                                                                                                // 40
}, {                                                                                                                  // 37
  name: 'admisi',                                                                                                     // 42
  full: 'Admisi',                                                                                                     // 43
  icon: 'assignment',                                                                                                 // 44
  color: 'purple'                                                                                                     // 45
}, {                                                                                                                  // 42
  name: 'rekam',                                                                                                      // 47
  full: 'Rekam Medik',                                                                                                // 48
  icon: 'content_copy',                                                                                               // 49
  color: 'brown'                                                                                                      // 50
}, {                                                                                                                  // 47
  name: 'farmasi',                                                                                                    // 52
  full: 'Gudang Farmasi',                                                                                             // 53
  icon: 'local_pharmacy',                                                                                             // 54
  color: 'orange'                                                                                                     // 55
}, {                                                                                                                  // 52
  name: 'logistik',                                                                                                   // 57
  full: 'Gudang Logistik',                                                                                            // 58
  icon: 'rv_hookup',                                                                                                  // 59
  color: 'blue-grey'                                                                                                  // 60
}, {                                                                                                                  // 57
  name: 'manajemen',                                                                                                  // 62
  full: 'Manajemen',                                                                                                  // 63
  icon: 'people',                                                                                                     // 64
  color: 'orange'                                                                                                     // 65
}];                                                                                                                   // 62
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"pdf.coffee.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// folder/pdf.coffee.js                                                                                               //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var slice = [].slice;                                                                                                 // 1
                                                                                                                      //
if (Meteor.isClient) {                                                                                                // 1
  this.makePdf = {                                                                                                    // 3
    card: function () {                                                                                               // 4
      var doc, pdf;                                                                                                   // 5
      doc = coll.pasien.findOne();                                                                                    // 5
      pdf = pdfMake.createPdf({                                                                                       // 6
        content: ['Nama  : ' + doc.regis.nama_lengkap, 'No. MR: ' + zeros(doc.no_mr)],                                // 7
        pageSize: 'B8',                                                                                               // 11
        pageMargins: [110, 50, 0, 0],                                                                                 // 12
        pageOrientation: 'landscape'                                                                                  // 13
      });                                                                                                             // 7
      return pdf.download(zeros(doc.no_mr) + '_card.pdf');                                                            // 14
    },                                                                                                                // 4
    consent: function () {                                                                                            // 15
      var doc, pdf;                                                                                                   // 16
      doc = coll.pasien.findOne();                                                                                    // 16
      pdf = pdfMake.createPdf({                                                                                       // 17
        content: [{                                                                                                   // 18
          text: 'PEMERINTAH PROVINSI RIAU\nRUMAH SAKIT UMUM DAERAH PETALA BUMI\nJL. Dr. Soetomo No. 65, Telp. (0761) 23024',
          alignment: 'center'                                                                                         // 19
        }, {                                                                                                          // 19
          text: '\nDATA UMUM PASIEN',                                                                                 // 20
          alignment: 'center'                                                                                         // 20
        }, {                                                                                                          // 20
          columns: [['NO. MR', 'NAMA LENGKAP', 'TEMPAT & TANGGAL LAHIR', 'GOLONGAN DARAH', 'JENIS KELAMIN', 'AGAMA', 'PENDIDIKAN', 'PEKERJAAN', 'NAMA AYAH', 'NAMA IBU', 'NAMA SUAMI / ISTRI', 'ALAMAT', 'NO. TELP / HP'], _.map([zeros(doc.no_mr), doc.regis.nama_lengkap, (doc.regis.tmpt_lahir || '-') + ', ' + moment(doc.regis.tgl_lahir).format('D/MM/YYYY')].concat(slice.call(_.map(['darah', 'kelamin', 'agama', 'pendidikan', 'pekerjaan'], function (i) {
            var ref;                                                                                                  // 28
            return ((ref = look(i, doc.regis[i])) != null ? ref.label : void 0) || '-';                               // 31
          })), slice.call(_.map(['ayah', 'ibu', 'pasangan', 'alamat', 'kontak'], function (i) {                       // 27
            return doc.regis[i] || '-';                                                                               // 33
          }))), function (i) {                                                                                        // 29
            return ': ' + i;                                                                                          // 35
          })]                                                                                                         // 23
        }, {                                                                                                          // 21
          text: '\nPERSETUJUAN UMUM (GENERAL CONSENT)',                                                               // 33
          alignment: 'center'                                                                                         // 33
        }, {                                                                                                          // 33
          table: {                                                                                                    // 34
            body: [['S', 'TS', {                                                                                      // 34
              text: 'Keterangan',                                                                                     // 35
              alignment: 'center'                                                                                     // 35
            }]].concat(slice.call(_.map([['Saya akan mentaati peraturan yang berlaku di RSUD Petala Bumi'], ['Saya memberi kuasa kepada dokter dan semua tenaga kesehatan untuk melakukan pemeriksaan / pengobatan / tindakan yang diperlakukan upaya kesembuhan saya / pasien tersebut diatas'], ['Saya memberi kuasa kepada dokter dan semua tenaga kesehatan yang ikut merawat saya untuk memberikan keterangan medis saya kepada yang bertanggung jawab atas biaya perawatan saya.'], ['Saya memberi kuasa kepada RSUD Petala Bumi untuk menginformasikan identitas sosial saya kepada keluarga / rekan / masyarakat'], ['Saya mengatakan bahwa informasi hasil pemeriksaan / rekam medis saya dapat digunakan untuk pendidikan / penelitian demi kemajuan ilmu kesehatan']], function (i) {
              return [' ', ' '].concat(slice.call(i));                                                                // 49
            })))                                                                                                      // 36
          }                                                                                                           // 34
        }, '\nPetunjuk :', 'S: Setuju', 'TS: Tidak Setuju', {                                                         // 34
          alignment: 'justify',                                                                                       // 47
          columns: [{                                                                                                 // 47
            text: '\n\n\n\n__________________\n' + _.startCase(Meteor.user().username),                               // 48
            alignment: 'center'                                                                                       // 48
          }, {                                                                                                        // 48
            text: 'Pekanbaru, ' + moment().format('DD/MM/YYYY') + '\n\n\n\n__________________\n' + _.startCase(doc.regis.nama_lengkap),
            alignment: 'center'                                                                                       // 49
          }]                                                                                                          // 49
        }]                                                                                                            // 47
      });                                                                                                             // 18
      return pdf.download(zeros(doc.no_mr) + '_consent.pdf');                                                         // 66
    },                                                                                                                // 4
    payRawat: function (no_mr, doc) {                                                                                 // 53
      var find, i, j, l, len, len1, m, pasien, pdf, ref, ref1, ref2, ref3, rows, table;                               // 54
      pasien = coll.pasien.findOne({                                                                                  // 54
        no_mr: parseInt(no_mr)                                                                                        // 54
      });                                                                                                             // 54
      rows = [['Uraian', 'Harga']];                                                                                   // 55
      ref = ['tindakan', 'labor', 'radio'];                                                                           // 56
                                                                                                                      //
      for (l = 0, len = ref.length; l < len; l++) {                                                                   // 56
        i = ref[l];                                                                                                   // 76
                                                                                                                      //
        if (doc[i]) {                                                                                                 // 57
          ref1 = doc[i];                                                                                              // 57
                                                                                                                      //
          for (m = 0, len1 = ref1.length; m < len1; m++) {                                                            // 57
            j = ref1[m];                                                                                              // 80
            find = _.find(coll.tarif.find().fetch(), function (k) {                                                   // 58
              return k._id === j.nama;                                                                                // 82
            });                                                                                                       // 58
            rows.push([_.startCase(find.nama), _.toString(j.harga)]);                                                 // 59
          }                                                                                                           // 57
        }                                                                                                             // 86
      }                                                                                                               // 56
                                                                                                                      //
      table = {                                                                                                       // 60
        table: {                                                                                                      // 60
          widths: ['*', 'auto'],                                                                                      // 60
          body: rows                                                                                                  // 60
        }                                                                                                             // 60
      };                                                                                                              // 60
      pdf = pdfMake.createPdf({                                                                                       // 61
        content: [{                                                                                                   // 62
          text: 'PEMERINTAH PROVINSI RIAU\nRUMAH SAKIT UMUM DAERAH PETALA BUMI\nJL. DR. SOETOMO NO. 65, TELP. (0761) 23024, PEKANBARU',
          alignment: 'center'                                                                                         // 63
        }, {                                                                                                          // 63
          text: '\nRINCIAN BIAYA RAWAT JALAN\n',                                                                      // 64
          alignment: 'center'                                                                                         // 64
        }, {                                                                                                          // 64
          columns: [['NO. MR', 'NAMA PASIEN', 'JENIS KELAMIN', 'TANGGAL LAHIR', 'UMUR', 'KLINIK'], _.map([zeros(pasien.no_mr), _.startCase(pasien.regis.nama_lengkap), ((ref2 = look('kelamin', pasien.regis.kelamin)) != null ? ref2.label : void 0) || '-', moment().format('D/MM/YYYY'), moment().diff(pasien.regis.tgl_lahir, 'years') + ' tahun', ((ref3 = look('klinik', doc.klinik)) != null ? ref3.label : void 0) || '-'], function (i) {
            return ': ' + i;                                                                                          // 105
          })]                                                                                                         // 67
        }, {                                                                                                          // 65
          text: '\n\nRINCIAN PEMBAYARAN',                                                                             // 76
          alignment: 'center'                                                                                         // 76
        }, table, '\nTOTAL BIAYA' + 'Rp ' + _.toString(numeral(doc.total.semua).format('0,0')), {                     // 76
          text: '\nPEKANBARU, ' + moment().format('D/MM/YYYY') + '\n\n\n\n\n' + _.startCase(Meteor.user().username),  // 79
          alignment: 'right'                                                                                          // 80
        }]                                                                                                            // 79
      });                                                                                                             // 62
      return pdf.download(zeros(pasien.no_mr) + '_payRawat.pdf');                                                     // 117
    },                                                                                                                // 4
    payRegCard: function (no_mr, amount, words) {                                                                     // 83
      var doc, pdf;                                                                                                   // 84
      doc = coll.pasien.findOne({                                                                                     // 84
        no_mr: parseInt(no_mr)                                                                                        // 84
      });                                                                                                             // 84
      pdf = pdfMake.createPdf({                                                                                       // 85
        content: [{                                                                                                   // 86
          text: 'PEMERINTAH PROVINSI RIAU\nRUMAH SAKIT UMUM DAERAH PETALA BUMI\nJL. DR. SOETOMO NO. 65, TELP. (0761) 23024, PEKANBARU',
          alignment: 'center'                                                                                         // 87
        }, {                                                                                                          // 87
          text: '\n\nKARCIS',                                                                                         // 88
          alignment: 'center'                                                                                         // 88
        }, {                                                                                                          // 88
          columns: [['TANGGAL', 'NO. MR', 'NAMA PASIEN', 'TARIF', '\n\nPETUGAS'], _.map([moment().format('DD/MM/YYYY'), zeros(doc.no_mr), _.startCase(doc.regis.nama_lengkap), 'Rp ' + amount, '\n\n' + _.startCase(Meteor.user().username)], function (i) {
            return ': ' + i;                                                                                          // 135
          })]                                                                                                         // 91
        }]                                                                                                            // 89
      });                                                                                                             // 86
      return pdf.download(zeros(doc.no_mr) + '_payRegCard.pdf');                                                      // 141
    },                                                                                                                // 4
    rekap: function (rows) {                                                                                          // 101
      var pdf, strings;                                                                                               // 102
      strings = _.map(rows, function (i) {                                                                            // 102
        return _.map(i, function (j) {                                                                                // 146
          return _.toString(j);                                                                                       // 147
        });                                                                                                           // 102
      });                                                                                                             // 102
      pdf = pdfMake.createPdf({                                                                                       // 103
        content: [{                                                                                                   // 103
          table: {                                                                                                    // 103
            body: strings                                                                                             // 103
          }                                                                                                           // 103
        }]                                                                                                            // 103
      });                                                                                                             // 103
      return pdf.download('rekap.pdf');                                                                               // 159
    }                                                                                                                 // 4
  };                                                                                                                  // 4
}                                                                                                                     // 162
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"rights.coffee.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// folder/rights.coffee.js                                                                                            //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var slice = [].slice;                                                                                                 // 1
                                                                                                                      //
if (Meteor.isClient) {                                                                                                // 1
  this.rights = [{                                                                                                    // 3
    group: 'regis',                                                                                                   // 4
    list: ['regis', 'jalan']                                                                                          // 5
  }, {                                                                                                                // 4
    group: 'bayar',                                                                                                   // 7
    list: ['bayar']                                                                                                   // 8
  }, {                                                                                                                // 7
    group: 'jalan',                                                                                                   // 10
    list: ['jalan', 'farmasi']                                                                                        // 11
  }, {                                                                                                                // 10
    group: 'inap',                                                                                                    // 13
    list: ['inap', 'farmasi']                                                                                         // 14
  }, {                                                                                                                // 13
    group: 'labor',                                                                                                   // 16
    list: ['labor']                                                                                                   // 17
  }, {                                                                                                                // 16
    group: 'radio',                                                                                                   // 19
    list: ['radio']                                                                                                   // 20
  }, {                                                                                                                // 19
    group: 'obat',                                                                                                    // 22
    list: ['obat', 'farmasi']                                                                                         // 23
  }, {                                                                                                                // 22
    group: 'rekam',                                                                                                   // 25
    list: ['rekam', 'regis']                                                                                          // 26
  }, {                                                                                                                // 25
    group: 'admisi',                                                                                                  // 28
    list: ['admisi']                                                                                                  // 29
  }, {                                                                                                                // 28
    group: 'manajemen',                                                                                               // 31
    list: ['manajemen']                                                                                               // 32
  }, {                                                                                                                // 31
    group: 'farmasi',                                                                                                 // 34
    list: ['farmasi']                                                                                                 // 35
  }];                                                                                                                 // 34
                                                                                                                      //
  _.map(rights, function (i) {                                                                                        // 38
    i.list = slice.call(i.list).concat(['panduan']);                                                                  // 39
    return i;                                                                                                         // 42
  });                                                                                                                 // 38
}                                                                                                                     // 44
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"selects.coffee.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// folder/selects.coffee.js                                                                                           //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
this.selects = {                                                                                                      // 1
  rawat: ['Rawat Jalan', 'Rawat Inap', 'IGD'],                                                                        // 2
  pekerjaan: ['PNS', 'BUMN/BUMD', 'TNI/Polri', 'Dokter', 'Karyawan Swasta', 'Wirausaha', 'Honorer', 'Pensiun', 'Petani', 'Buruh', 'Tidak Bekerja', 'Dan Lain-lain'],
  kelamin: ['Laki-laki', 'Perempuan'],                                                                                // 4
  agama: ['Islam', 'Katolik', 'Protestan', 'Buddha', 'Hindu', 'Kong Hu Chu'],                                         // 5
  pendidikan: ['SD', 'SMP', 'SMA', 'Diploma', 'S1', 'S2', 'S3', 'Tidak Sekolah'],                                     // 6
  darah: ['A', 'B', 'C', 'AB', 'O'],                                                                                  // 7
  cara_bayar: ['Umum', 'BPJS', 'Jamkesda Pekanbaru', 'Jamkesda Kampar', 'Lapas/Dinsos', 'Free'],                      // 8
  nikah: ['Nikah', 'Belum Nikah', 'Janda', 'Duda'],                                                                   // 9
  klinik: ['Penyakit Dalam', 'Gigi', 'Kebidanan', 'THT', 'Anak', 'Saraf', 'Mata', 'Bedah', 'Paru', 'Tb. Dots', 'Kulit', 'Fisioterapi', 'Gizi', 'Metadon', 'Psikologi', 'Tindakan', 'APS Labor', 'APS Radio'],
  bentuk: ['butir', 'kapsul', 'tablet', 'sendok makan', 'sendok teh'],                                                // 11
  tipe_dokter: ['Umum', 'Spesialis'],                                                                                 // 12
  rujukan: ['Datang Sendiri', 'RS Lain', 'Puskesmas', 'Faskes Lainnya'],                                              // 13
  keluar: ['Pulang', 'Rujuk'],                                                                                        // 14
  barang: ['Generik', 'Non-Generik', 'Obat Narkotika', 'BHP'],                                                        // 15
  satuan: ['Botol', 'Vial', 'Ampul', 'Pcs'],                                                                          // 16
  anggaran: ['BLUD'],                                                                                                 // 17
  alias: ['Tn.', 'Ny.', 'Nn.', 'An.', 'By.']                                                                          // 18
};                                                                                                                    // 2
                                                                                                                      //
_.map(_.keys(selects), function (i) {                                                                                 // 20
  return selects[i] = _.map(selects[i], function (j, x) {                                                             // 22
    return {                                                                                                          // 23
      label: j,                                                                                                       // 20
      value: x + 1                                                                                                    // 20
    };                                                                                                                // 20
  });                                                                                                                 // 20
});                                                                                                                   // 20
                                                                                                                      //
selects.karcis = _.map([15000, 20000, 25000, 30000, 40000], function (i) {                                            // 22
  return {                                                                                                            // 31
    value: i,                                                                                                         // 22
    label: 'Rp ' + i                                                                                                  // 22
  };                                                                                                                  // 22
});                                                                                                                   // 22
                                                                                                                      //
selects.tindakan = function () {                                                                                      // 24
  var selector, sub;                                                                                                  // 24
                                                                                                                      //
  if (Meteor.isClient) {                                                                                              // 24
    sub = Meteor.subscribe('coll', 'tarif', {}, {});                                                                  // 25
    selector = {                                                                                                      // 26
      jenis: Meteor.user().roles.jalan[0]                                                                             // 26
    };                                                                                                                // 26
                                                                                                                      //
    if (sub.ready()) {                                                                                                // 27
      return _.map(coll.tarif.find(selector).fetch(), function (i) {                                                  // 45
        return {                                                                                                      // 46
          value: i._id,                                                                                               // 28
          label: _.startCase(i.nama)                                                                                  // 28
        };                                                                                                            // 28
      });                                                                                                             // 27
    }                                                                                                                 // 24
  }                                                                                                                   // 52
};                                                                                                                    // 24
                                                                                                                      //
selects.dokter = function () {                                                                                        // 30
  var find, selector, sub;                                                                                            // 30
                                                                                                                      //
  if (Meteor.isClient) {                                                                                              // 30
    sub = Meteor.subscribe('coll', 'dokter', {}, {});                                                                 // 31
    find = _.find(selects.klinik, function (i) {                                                                      // 32
      return Meteor.user().roles.jalan[0] === _.snakeCase(i.label);                                                   // 60
    });                                                                                                               // 32
    selector = {                                                                                                      // 34
      poli: find.value                                                                                                // 34
    };                                                                                                                // 34
                                                                                                                      //
    if (sub.ready()) {                                                                                                // 35
      return _.map(coll.dokter.find(selector).fetch(), function (i) {                                                 // 66
        return {                                                                                                      // 67
          value: i._id,                                                                                               // 36
          label: i.nama                                                                                               // 36
        };                                                                                                            // 36
      });                                                                                                             // 35
    }                                                                                                                 // 30
  }                                                                                                                   // 73
};                                                                                                                    // 30
                                                                                                                      //
selects.obat = function () {                                                                                          // 38
  var filter, sub;                                                                                                    // 38
                                                                                                                      //
  if (Meteor.isClient) {                                                                                              // 38
    sub = Meteor.subscribe('coll', 'gudang', {}, {});                                                                 // 39
                                                                                                                      //
    filter = function (arr) {                                                                                         // 40
      return _.filter(arr, function (i) {                                                                             // 81
        return i.jenis === 1;                                                                                         // 82
      });                                                                                                             // 40
    };                                                                                                                // 40
                                                                                                                      //
    if (sub.ready()) {                                                                                                // 41
      return _.map(filter(coll.gudang.find().fetch()), function (i) {                                                 // 86
        return {                                                                                                      // 87
          value: i._id,                                                                                               // 42
          label: i.nama                                                                                               // 42
        };                                                                                                            // 42
      });                                                                                                             // 41
    }                                                                                                                 // 38
  }                                                                                                                   // 93
};                                                                                                                    // 38
                                                                                                                      //
_.map(['labor', 'radio'], function (i) {                                                                              // 44
  return selects[i] = function () {                                                                                   // 97
    var selector, sub;                                                                                                // 45
                                                                                                                      //
    if (Meteor.isClient) {                                                                                            // 45
      sub = Meteor.subscribe('coll', 'tarif', {}, {});                                                                // 46
      selector = {                                                                                                    // 47
        jenis: i                                                                                                      // 47
      };                                                                                                              // 47
                                                                                                                      //
      if (sub.ready()) {                                                                                              // 48
        return _.map(coll.tarif.find(selector).fetch(), function (j) {                                                // 105
          return {                                                                                                    // 106
            value: j._id,                                                                                             // 49
            label: _.startCase(j.nama)                                                                                // 49
          };                                                                                                          // 49
        });                                                                                                           // 48
      }                                                                                                               // 45
    }                                                                                                                 // 112
  };                                                                                                                  // 45
});                                                                                                                   // 44
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"both.coffee.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// both.coffee.js                                                                                                     //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Router.configure({                                                                                                    // 1
  layoutTemplate: 'layout',                                                                                           // 2
  loadingTemplate: 'loading'                                                                                          // 3
});                                                                                                                   // 2
Router.route('/', {                                                                                                   // 5
  action: function () {                                                                                               // 6
    return this.render('home');                                                                                       // 8
  }                                                                                                                   // 6
});                                                                                                                   // 6
schema.regis = {                                                                                                      // 8
  no_mr: {                                                                                                            // 9
    type: Number,                                                                                                     // 9
    max: 999999                                                                                                       // 9
  },                                                                                                                  // 9
  regis: {                                                                                                            // 10
    type: Object                                                                                                      // 10
  },                                                                                                                  // 10
  'regis.alias': {                                                                                                    // 11
    type: Number,                                                                                                     // 11
    optional: true,                                                                                                   // 11
    autoform: {                                                                                                       // 11
      options: selects.alias,                                                                                         // 11
      type: 'select-radio-inline'                                                                                     // 11
    }                                                                                                                 // 11
  },                                                                                                                  // 11
  'regis.nama_lengkap': {                                                                                             // 12
    type: String                                                                                                      // 12
  },                                                                                                                  // 12
  'regis.tgl_lahir': {                                                                                                // 13
    type: Date,                                                                                                       // 13
    autoform: {                                                                                                       // 13
      type: 'pickadate',                                                                                              // 13
      pickadateOptions: {                                                                                             // 13
        selectYears: 150,                                                                                             // 13
        selectMonths: true                                                                                            // 13
      }                                                                                                               // 13
    }                                                                                                                 // 13
  },                                                                                                                  // 13
  'regis.tmpt_lahir': {                                                                                               // 14
    type: String,                                                                                                     // 14
    optional: true                                                                                                    // 14
  },                                                                                                                  // 14
  'regis.cara_bayar': {                                                                                               // 15
    type: Number,                                                                                                     // 15
    autoform: {                                                                                                       // 15
      options: selects.cara_bayar,                                                                                    // 15
      type: 'select-radio-inline'                                                                                     // 15
    }                                                                                                                 // 15
  },                                                                                                                  // 15
  'regis.kelamin': {                                                                                                  // 16
    type: Number,                                                                                                     // 16
    autoform: {                                                                                                       // 16
      options: selects.kelamin,                                                                                       // 16
      type: 'select-radio-inline'                                                                                     // 16
    }                                                                                                                 // 16
  },                                                                                                                  // 16
  'regis.agama': {                                                                                                    // 17
    type: Number,                                                                                                     // 17
    autoform: {                                                                                                       // 17
      options: selects.agama,                                                                                         // 17
      type: 'select-radio-inline'                                                                                     // 17
    }                                                                                                                 // 17
  },                                                                                                                  // 17
  'regis.nikah': {                                                                                                    // 18
    type: Number,                                                                                                     // 18
    autoform: {                                                                                                       // 18
      options: selects.nikah,                                                                                         // 18
      type: 'select-radio-inline'                                                                                     // 18
    }                                                                                                                 // 18
  },                                                                                                                  // 18
  'regis.pendidikan': {                                                                                               // 19
    type: Number,                                                                                                     // 19
    optional: true,                                                                                                   // 19
    autoform: {                                                                                                       // 19
      options: selects.pendidikan,                                                                                    // 19
      type: 'select-radio-inline'                                                                                     // 19
    }                                                                                                                 // 19
  },                                                                                                                  // 19
  'regis.darah': {                                                                                                    // 20
    type: Number,                                                                                                     // 20
    optional: true,                                                                                                   // 20
    autoform: {                                                                                                       // 20
      options: selects.darah,                                                                                         // 20
      type: 'select-radio-inline'                                                                                     // 20
    }                                                                                                                 // 20
  },                                                                                                                  // 20
  'regis.pekerjaan': {                                                                                                // 21
    type: Number,                                                                                                     // 21
    optional: true,                                                                                                   // 21
    autoform: {                                                                                                       // 21
      options: selects.pekerjaan,                                                                                     // 21
      type: 'select-radio-inline'                                                                                     // 21
    }                                                                                                                 // 21
  },                                                                                                                  // 21
  'regis.kabupaten': {                                                                                                // 22
    type: String,                                                                                                     // 22
    optional: true                                                                                                    // 22
  },                                                                                                                  // 22
  'regis.kecamatan': {                                                                                                // 23
    type: String,                                                                                                     // 23
    optional: true                                                                                                    // 23
  },                                                                                                                  // 23
  'regis.kelurahan': {                                                                                                // 24
    type: String,                                                                                                     // 24
    optional: true                                                                                                    // 24
  },                                                                                                                  // 24
  'regis.alamat': {                                                                                                   // 25
    type: String                                                                                                      // 25
  },                                                                                                                  // 25
  'regis.kontak': {                                                                                                   // 26
    type: String,                                                                                                     // 26
    optional: true                                                                                                    // 26
  },                                                                                                                  // 26
  'regis.ayah': {                                                                                                     // 27
    type: String,                                                                                                     // 27
    optional: true                                                                                                    // 27
  },                                                                                                                  // 27
  'regis.ibu': {                                                                                                      // 28
    type: String,                                                                                                     // 28
    optional: true                                                                                                    // 28
  },                                                                                                                  // 28
  'regis.pasangan': {                                                                                                 // 29
    type: String,                                                                                                     // 29
    optional: true                                                                                                    // 29
  },                                                                                                                  // 29
  'regis.petugas': {                                                                                                  // 30
    type: String,                                                                                                     // 31
    autoform: {                                                                                                       // 32
      type: 'hidden'                                                                                                  // 32
    },                                                                                                                // 32
    autoValue: function () {                                                                                          // 33
      if (Meteor.isClient) {                                                                                          // 33
        return Meteor.userId();                                                                                       // 135
      }                                                                                                               // 136
    }                                                                                                                 // 31
  },                                                                                                                  // 31
  'regis.date': {                                                                                                     // 34
    type: Date,                                                                                                       // 35
    autoform: {                                                                                                       // 36
      type: 'hidden'                                                                                                  // 36
    },                                                                                                                // 36
    autoValue: function () {                                                                                          // 37
      return new Date();                                                                                              // 145
    }                                                                                                                 // 35
  },                                                                                                                  // 35
  'regis.billCard': {                                                                                                 // 38
    type: Boolean,                                                                                                    // 38
    optional: true,                                                                                                   // 38
    autoform: {                                                                                                       // 38
      type: 'hidden'                                                                                                  // 38
    }                                                                                                                 // 38
  }                                                                                                                   // 38
};                                                                                                                    // 9
schema.fisik = {                                                                                                      // 40
  tekanan_darah: {                                                                                                    // 41
    type: String,                                                                                                     // 41
    optional: true                                                                                                    // 41
  },                                                                                                                  // 41
  nadi: {                                                                                                             // 42
    type: Number,                                                                                                     // 42
    optional: true                                                                                                    // 42
  },                                                                                                                  // 42
  suhu: {                                                                                                             // 43
    type: Number,                                                                                                     // 43
    decimal: true,                                                                                                    // 43
    optional: true                                                                                                    // 43
  },                                                                                                                  // 43
  pernapasan: {                                                                                                       // 44
    type: Number,                                                                                                     // 44
    optional: true                                                                                                    // 44
  },                                                                                                                  // 44
  berat: {                                                                                                            // 45
    type: Number,                                                                                                     // 45
    optional: true                                                                                                    // 45
  },                                                                                                                  // 45
  tinggi: {                                                                                                           // 46
    type: Number,                                                                                                     // 46
    optional: true                                                                                                    // 46
  },                                                                                                                  // 46
  lila: {                                                                                                             // 47
    type: Number,                                                                                                     // 47
    optional: true                                                                                                    // 47
  }                                                                                                                   // 47
};                                                                                                                    // 41
schema.tindakan = {                                                                                                   // 49
  idtindakan: {                                                                                                       // 50
    type: String,                                                                                                     // 50
    optional: true,                                                                                                   // 50
    autoform: {                                                                                                       // 50
      type: 'hidden'                                                                                                  // 50
    }                                                                                                                 // 50
  },                                                                                                                  // 50
  nama: {                                                                                                             // 51
    type: String,                                                                                                     // 51
    autoform: {                                                                                                       // 51
      options: selects.tindakan,                                                                                      // 51
      type: 'universe-select'                                                                                         // 51
    }                                                                                                                 // 51
  },                                                                                                                  // 51
  dokter: {                                                                                                           // 52
    type: String,                                                                                                     // 52
    autoform: {                                                                                                       // 52
      options: selects.dokter                                                                                         // 52
    }                                                                                                                 // 52
  },                                                                                                                  // 52
  harga: {                                                                                                            // 53
    type: Number,                                                                                                     // 53
    optional: true,                                                                                                   // 53
    autoform: {                                                                                                       // 53
      type: 'hidden'                                                                                                  // 53
    }                                                                                                                 // 53
  }                                                                                                                   // 53
};                                                                                                                    // 50
schema.labor = {                                                                                                      // 55
  idlabor: {                                                                                                          // 56
    type: String,                                                                                                     // 56
    optional: true,                                                                                                   // 56
    autoform: {                                                                                                       // 56
      type: 'hidden'                                                                                                  // 56
    }                                                                                                                 // 56
  },                                                                                                                  // 56
  nama: {                                                                                                             // 57
    type: String,                                                                                                     // 57
    autoform: {                                                                                                       // 57
      options: selects.labor                                                                                          // 57
    }                                                                                                                 // 57
  },                                                                                                                  // 57
  harga: {                                                                                                            // 58
    type: Number,                                                                                                     // 58
    optional: true,                                                                                                   // 58
    autoform: {                                                                                                       // 58
      type: 'hidden'                                                                                                  // 58
    }                                                                                                                 // 58
  },                                                                                                                  // 58
  hasil: {                                                                                                            // 59
    type: String,                                                                                                     // 59
    optional: true,                                                                                                   // 59
    autoform: {                                                                                                       // 59
      type: 'hidden'                                                                                                  // 59
    }                                                                                                                 // 59
  }                                                                                                                   // 59
};                                                                                                                    // 56
schema.radio = {                                                                                                      // 61
  idradio: {                                                                                                          // 62
    type: String,                                                                                                     // 62
    optional: true,                                                                                                   // 62
    autoform: {                                                                                                       // 62
      type: 'hidden'                                                                                                  // 62
    }                                                                                                                 // 62
  },                                                                                                                  // 62
  nama: {                                                                                                             // 63
    type: String,                                                                                                     // 63
    autoform: {                                                                                                       // 63
      options: selects.radio                                                                                          // 63
    }                                                                                                                 // 63
  },                                                                                                                  // 63
  harga: {                                                                                                            // 64
    type: Number,                                                                                                     // 64
    optional: true,                                                                                                   // 64
    autoform: {                                                                                                       // 64
      type: 'hidden'                                                                                                  // 64
    }                                                                                                                 // 64
  },                                                                                                                  // 64
  hasil: {                                                                                                            // 65
    type: String,                                                                                                     // 65
    optional: true,                                                                                                   // 65
    autoform: {                                                                                                       // 65
      type: 'hidden'                                                                                                  // 65
    }                                                                                                                 // 65
  }                                                                                                                   // 65
};                                                                                                                    // 62
schema.obat = {                                                                                                       // 67
  idobat: {                                                                                                           // 68
    type: String,                                                                                                     // 68
    optional: true,                                                                                                   // 68
    autoform: {                                                                                                       // 68
      type: 'hidden'                                                                                                  // 68
    }                                                                                                                 // 68
  },                                                                                                                  // 68
  nama: {                                                                                                             // 69
    type: String,                                                                                                     // 69
    autoform: {                                                                                                       // 69
      options: selects.obat                                                                                           // 69
    }                                                                                                                 // 69
  },                                                                                                                  // 69
  puyer: {                                                                                                            // 70
    type: String,                                                                                                     // 70
    optional: true                                                                                                    // 70
  },                                                                                                                  // 70
  aturan: {                                                                                                           // 71
    type: Object                                                                                                      // 71
  },                                                                                                                  // 71
  'aturan.kali': {                                                                                                    // 72
    type: Number                                                                                                      // 72
  },                                                                                                                  // 72
  'aturan.dosis': {                                                                                                   // 73
    type: Number                                                                                                      // 73
  },                                                                                                                  // 73
  'aturan.bentuk': {                                                                                                  // 74
    type: Number,                                                                                                     // 74
    autoform: {                                                                                                       // 74
      options: selects.bentuk                                                                                         // 74
    }                                                                                                                 // 74
  },                                                                                                                  // 74
  jumlah: {                                                                                                           // 75
    type: Number                                                                                                      // 75
  },                                                                                                                  // 75
  harga: {                                                                                                            // 76
    type: Number,                                                                                                     // 76
    optional: true,                                                                                                   // 76
    autoform: {                                                                                                       // 76
      type: 'hidden'                                                                                                  // 76
    }                                                                                                                 // 76
  },                                                                                                                  // 76
  subtotal: {                                                                                                         // 77
    type: Number,                                                                                                     // 77
    optional: true,                                                                                                   // 77
    autoform: {                                                                                                       // 77
      type: 'hidden'                                                                                                  // 77
    }                                                                                                                 // 77
  },                                                                                                                  // 77
  hasil: {                                                                                                            // 78
    type: String,                                                                                                     // 78
    optional: true,                                                                                                   // 78
    autoform: {                                                                                                       // 78
      type: 'hidden'                                                                                                  // 78
    }                                                                                                                 // 78
  }                                                                                                                   // 78
};                                                                                                                    // 68
schema.rawat = {                                                                                                      // 80
  no_mr: {                                                                                                            // 81
    type: Number                                                                                                      // 81
  },                                                                                                                  // 81
  rawat: {                                                                                                            // 82
    type: Array                                                                                                       // 82
  },                                                                                                                  // 82
  'rawat.$': {                                                                                                        // 83
    type: Object                                                                                                      // 83
  },                                                                                                                  // 83
  'rawat.$.tanggal': {                                                                                                // 84
    type: Date,                                                                                                       // 84
    autoform: {                                                                                                       // 84
      type: 'hidden'                                                                                                  // 84
    }                                                                                                                 // 84
  },                                                                                                                  // 84
  'rawat.$.idbayar': {                                                                                                // 85
    type: String,                                                                                                     // 85
    optional: true,                                                                                                   // 85
    autoform: {                                                                                                       // 85
      type: 'hidden'                                                                                                  // 85
    }                                                                                                                 // 85
  },                                                                                                                  // 85
  'rawat.$.jenis': {                                                                                                  // 86
    type: String,                                                                                                     // 86
    optional: true,                                                                                                   // 86
    autoform: {                                                                                                       // 86
      type: 'hidden'                                                                                                  // 86
    }                                                                                                                 // 86
  },                                                                                                                  // 86
  'rawat.$.cara_bayar': {                                                                                             // 87
    type: Number,                                                                                                     // 87
    autoform: {                                                                                                       // 87
      options: selects.cara_bayar,                                                                                    // 87
      type: 'select-radio-inline'                                                                                     // 87
    }                                                                                                                 // 87
  },                                                                                                                  // 87
  'rawat.$.klinik': {                                                                                                 // 88
    type: Number,                                                                                                     // 88
    autoform: {                                                                                                       // 88
      options: selects.klinik,                                                                                        // 88
      type: 'select-radio-inline'                                                                                     // 88
    }                                                                                                                 // 88
  },                                                                                                                  // 88
  'rawat.$.karcis': {                                                                                                 // 89
    type: Number,                                                                                                     // 89
    optional: true,                                                                                                   // 89
    autoform: {                                                                                                       // 89
      options: selects.karcis,                                                                                        // 89
      type: 'select-radio-inline'                                                                                     // 89
    }                                                                                                                 // 89
  },                                                                                                                  // 89
  'rawat.$.rujukan': {                                                                                                // 90
    type: Number,                                                                                                     // 90
    optional: true,                                                                                                   // 90
    autoform: {                                                                                                       // 90
      options: selects.rujukan,                                                                                       // 90
      type: 'select-radio-inline'                                                                                     // 90
    }                                                                                                                 // 90
  },                                                                                                                  // 90
  'rawat.$.billRegis': {                                                                                              // 91
    type: Boolean,                                                                                                    // 91
    optional: true,                                                                                                   // 91
    autoform: {                                                                                                       // 91
      type: 'hidden'                                                                                                  // 91
    }                                                                                                                 // 91
  },                                                                                                                  // 91
  'rawat.$.nobill': {                                                                                                 // 92
    type: Number,                                                                                                     // 92
    autoform: {                                                                                                       // 92
      type: 'hidden'                                                                                                  // 92
    }                                                                                                                 // 92
  },                                                                                                                  // 92
  'rawat.$.status_bayar': {                                                                                           // 93
    type: Boolean,                                                                                                    // 93
    optional: true,                                                                                                   // 93
    autoform: {                                                                                                       // 93
      type: 'hidden'                                                                                                  // 93
    }                                                                                                                 // 93
  },                                                                                                                  // 93
  'rawat.$.anamesa_perawat': {                                                                                        // 94
    type: String,                                                                                                     // 94
    optional: true,                                                                                                   // 94
    autoform: {                                                                                                       // 94
      afFieldInput: {                                                                                                 // 94
        type: 'textarea',                                                                                             // 94
        rows: 6                                                                                                       // 94
      }                                                                                                               // 94
    }                                                                                                                 // 94
  },                                                                                                                  // 94
  'rawat.$.fisik': {                                                                                                  // 95
    optional: true,                                                                                                   // 95
    type: [new SimpleSchema(schema.fisik)]                                                                            // 95
  },                                                                                                                  // 95
  'rawat.$.anamesa_dokter': {                                                                                         // 96
    type: String,                                                                                                     // 96
    optional: true,                                                                                                   // 96
    autoform: {                                                                                                       // 96
      afFieldInput: {                                                                                                 // 96
        type: 'textarea',                                                                                             // 96
        rows: 6                                                                                                       // 96
      }                                                                                                               // 96
    }                                                                                                                 // 96
  },                                                                                                                  // 96
  'rawat.$.diagnosa': {                                                                                               // 97
    type: String,                                                                                                     // 97
    optional: true,                                                                                                   // 97
    autoform: {                                                                                                       // 97
      afFieldInput: {                                                                                                 // 97
        type: 'textarea',                                                                                             // 97
        rows: 6                                                                                                       // 97
      }                                                                                                               // 97
    }                                                                                                                 // 97
  },                                                                                                                  // 97
  'rawat.$.planning': {                                                                                               // 98
    type: String,                                                                                                     // 98
    optional: true,                                                                                                   // 98
    autoform: {                                                                                                       // 98
      afFieldInput: {                                                                                                 // 98
        type: 'textarea',                                                                                             // 98
        rows: 6                                                                                                       // 98
      }                                                                                                               // 98
    }                                                                                                                 // 98
  },                                                                                                                  // 98
  'rawat.$.tindakan': {                                                                                               // 99
    type: [new SimpleSchema(schema.tindakan)],                                                                        // 99
    optional: true                                                                                                    // 99
  },                                                                                                                  // 99
  'rawat.$.labor': {                                                                                                  // 100
    type: [new SimpleSchema(schema.labor)],                                                                           // 100
    optional: true                                                                                                    // 100
  },                                                                                                                  // 100
  'rawat.$.radio': {                                                                                                  // 101
    type: [new SimpleSchema(schema.radio)],                                                                           // 101
    optional: true                                                                                                    // 101
  },                                                                                                                  // 101
  'rawat.$.obat': {                                                                                                   // 102
    type: [new SimpleSchema(schema.obat)],                                                                            // 102
    optional: true                                                                                                    // 102
  },                                                                                                                  // 102
  'rawat.$.total': {                                                                                                  // 103
    type: Object,                                                                                                     // 103
    optional: true,                                                                                                   // 103
    autoform: {                                                                                                       // 103
      type: 'hidden'                                                                                                  // 103
    }                                                                                                                 // 103
  },                                                                                                                  // 103
  'rawat.$.total.tindakan': {                                                                                         // 104
    type: Number,                                                                                                     // 104
    optional: true                                                                                                    // 104
  },                                                                                                                  // 104
  'rawat.$.total.labor': {                                                                                            // 105
    type: Number,                                                                                                     // 105
    optional: true                                                                                                    // 105
  },                                                                                                                  // 105
  'rawat.$.total.radio': {                                                                                            // 106
    type: Number,                                                                                                     // 106
    optional: true                                                                                                    // 106
  },                                                                                                                  // 106
  'rawat.$.total.obat': {                                                                                             // 107
    type: Number,                                                                                                     // 107
    optional: true                                                                                                    // 107
  },                                                                                                                  // 107
  'rawat.$.total.semua': {                                                                                            // 108
    type: Number,                                                                                                     // 108
    optional: true                                                                                                    // 108
  },                                                                                                                  // 108
  'rawat.$.spm': {                                                                                                    // 109
    type: Number,                                                                                                     // 109
    optional: true,                                                                                                   // 109
    autoform: {                                                                                                       // 109
      type: 'hidden'                                                                                                  // 109
    }                                                                                                                 // 109
  },                                                                                                                  // 109
  'rawat.$.pindah': {                                                                                                 // 110
    type: Number,                                                                                                     // 110
    optional: true,                                                                                                   // 110
    autoform: {                                                                                                       // 110
      options: selects.klinik                                                                                         // 110
    }                                                                                                                 // 110
  },                                                                                                                  // 110
  'rawat.$.keluar': {                                                                                                 // 111
    type: Number,                                                                                                     // 111
    optional: true,                                                                                                   // 111
    autoform: {                                                                                                       // 111
      options: selects.keluar                                                                                         // 111
    }                                                                                                                 // 111
  },                                                                                                                  // 111
  'rawat.$.petugas': {                                                                                                // 112
    type: String,                                                                                                     // 112
    autoform: {                                                                                                       // 112
      type: 'hidden'                                                                                                  // 112
    }                                                                                                                 // 112
  }                                                                                                                   // 112
};                                                                                                                    // 81
schema.jalan = _.assign(schema.rawat, {});                                                                            // 114
schema.inap = _.assign(schema.rawat, {});                                                                             // 115
schema.igd = _.assign(schema.rawat, {});                                                                              // 116
schema.gudang = {                                                                                                     // 118
  idbarang: {                                                                                                         // 119
    type: String,                                                                                                     // 120
    autoform: {                                                                                                       // 121
      type: 'hidden'                                                                                                  // 121
    },                                                                                                                // 121
    autoValue: function () {                                                                                          // 122
      return randomId();                                                                                              // 547
    }                                                                                                                 // 120
  },                                                                                                                  // 120
  jenis: {                                                                                                            // 123
    type: Number,                                                                                                     // 123
    autoform: {                                                                                                       // 123
      options: selects.barang                                                                                         // 123
    }                                                                                                                 // 123
  },                                                                                                                  // 123
  nama: {                                                                                                             // 124
    type: String                                                                                                      // 124
  },                                                                                                                  // 124
  batch: {                                                                                                            // 125
    type: Array                                                                                                       // 125
  },                                                                                                                  // 125
  'batch.$': {                                                                                                        // 126
    type: Object                                                                                                      // 126
  },                                                                                                                  // 126
  'batch.$.idbatch': {                                                                                                // 127
    type: String,                                                                                                     // 128
    autoform: {                                                                                                       // 129
      type: 'hidden'                                                                                                  // 129
    },                                                                                                                // 129
    autoValue: function () {                                                                                          // 130
      return randomId();                                                                                              // 571
    }                                                                                                                 // 128
  },                                                                                                                  // 128
  'batch.$.nobatch': {                                                                                                // 131
    type: String                                                                                                      // 131
  },                                                                                                                  // 131
  'batch.$.merek': {                                                                                                  // 132
    type: String                                                                                                      // 132
  },                                                                                                                  // 132
  'batch.$.satuan': {                                                                                                 // 133
    type: Number,                                                                                                     // 133
    autoform: {                                                                                                       // 133
      options: selects.satuan                                                                                         // 133
    }                                                                                                                 // 133
  },                                                                                                                  // 133
  'batch.$.masuk': {                                                                                                  // 134
    type: Date,                                                                                                       // 134
    autoform: {                                                                                                       // 134
      type: 'pickadate'                                                                                               // 134
    }                                                                                                                 // 134
  },                                                                                                                  // 134
  'batch.$.kadaluarsa': {                                                                                             // 135
    type: Date,                                                                                                       // 135
    autoform: {                                                                                                       // 135
      type: 'pickadate'                                                                                               // 135
    }                                                                                                                 // 135
  },                                                                                                                  // 135
  'batch.$.digudang': {                                                                                               // 136
    type: Number                                                                                                      // 136
  },                                                                                                                  // 136
  'batch.$.diapotik': {                                                                                               // 137
    type: Number                                                                                                      // 137
  },                                                                                                                  // 137
  'batch.$.beli': {                                                                                                   // 138
    type: Number,                                                                                                     // 138
    decimal: true                                                                                                     // 138
  },                                                                                                                  // 138
  'batch.$.jual': {                                                                                                   // 139
    type: Number,                                                                                                     // 139
    decimal: true                                                                                                     // 139
  },                                                                                                                  // 139
  'batch.$.suplier': {                                                                                                // 140
    type: String                                                                                                      // 140
  },                                                                                                                  // 140
  'batch.$.anggaran': {                                                                                               // 141
    type: Number,                                                                                                     // 141
    autoform: {                                                                                                       // 141
      options: selects.anggaran                                                                                       // 141
    }                                                                                                                 // 141
  },                                                                                                                  // 141
  'batch.$.pengadaan': {                                                                                              // 142
    type: Number                                                                                                      // 142
  }                                                                                                                   // 142
};                                                                                                                    // 119
schema.farmasi = _.assign(schema.gudang, {});                                                                         // 144
schema.logistik = _.assign(schema.gudang, {});                                                                        // 145
schema.dokter = {                                                                                                     // 147
  nama: {                                                                                                             // 148
    type: String                                                                                                      // 148
  },                                                                                                                  // 148
  tipe: {                                                                                                             // 149
    type: Number,                                                                                                     // 149
    autoform: {                                                                                                       // 149
      options: selects.tipe_dokter                                                                                    // 149
    }                                                                                                                 // 149
  },                                                                                                                  // 149
  poli: {                                                                                                             // 150
    type: Number,                                                                                                     // 150
    autoform: {                                                                                                       // 150
      options: selects.klinik                                                                                         // 150
    }                                                                                                                 // 150
  }                                                                                                                   // 150
};                                                                                                                    // 148
schema.tarif = {                                                                                                      // 152
  jenis: {                                                                                                            // 153
    type: String                                                                                                      // 153
  },                                                                                                                  // 153
  nama: {                                                                                                             // 154
    type: String                                                                                                      // 154
  },                                                                                                                  // 154
  harga: {                                                                                                            // 155
    type: Number                                                                                                      // 155
  },                                                                                                                  // 155
  grup: {                                                                                                             // 156
    type: String,                                                                                                     // 156
    optional: true                                                                                                    // 156
  }                                                                                                                   // 156
};                                                                                                                    // 153
                                                                                                                      //
_.map(['dokter', 'tarif'], function (i) {                                                                             // 158
  var obj;                                                                                                            // 159
  obj = {                                                                                                             // 159
    active: {                                                                                                         // 159
      type: Boolean,                                                                                                  // 160
      autoform: {                                                                                                     // 161
        type: 'hidden'                                                                                                // 161
      },                                                                                                              // 161
      autoValue: function () {                                                                                        // 162
        return true;                                                                                                  // 673
      }                                                                                                               // 160
    }                                                                                                                 // 160
  };                                                                                                                  // 159
  return _.assign(schema[i], obj);                                                                                    // 677
});                                                                                                                   // 158
                                                                                                                      //
_.map(['pasien', 'gudang', 'dokter', 'tarif'], function (i) {                                                         // 165
  var arr;                                                                                                            // 166
  coll[i] = new Meteor.Collection(i);                                                                                 // 166
  arr = ['insert', 'update', 'remove'];                                                                               // 167
  return coll[i].allow(_.zipObject(arr, _.map(arr, function (i) {                                                     // 684
    return function () {                                                                                              // 685
      return true;                                                                                                    // 686
    };                                                                                                                // 168
  })));                                                                                                               // 168
});                                                                                                                   // 165
                                                                                                                      //
_.map(modules.slice(0, 10), function (i) {                                                                            // 170
  return Router.route('/' + i.name + '/:no_mr?', {                                                                    // 692
    name: i.name,                                                                                                     // 172
    action: function () {                                                                                             // 173
      return this.render('pasien');                                                                                   // 695
    },                                                                                                                // 172
    waitOn: function () {                                                                                             // 174
      return _.map(['dokter', 'tarif', 'gudang'], function (j) {                                                      // 698
        return Meteor.subscribe('coll', j, {}, {});                                                                   // 699
      });                                                                                                             // 175
    }                                                                                                                 // 172
  });                                                                                                                 // 172
});                                                                                                                   // 170
                                                                                                                      //
_.map(modules.slice(10, 12), function (i) {                                                                           // 178
  return Router.route('/' + i.name + '/:idbarang?', {                                                                 // 706
    name: i.name,                                                                                                     // 180
    action: function () {                                                                                             // 181
      return this.render('gudang');                                                                                   // 709
    }                                                                                                                 // 180
  });                                                                                                                 // 180
});                                                                                                                   // 178
                                                                                                                      //
_.map(['panduan'], function (i) {                                                                                     // 183
  return Router.route('/' + i, {                                                                                      // 715
    action: function () {                                                                                             // 185
      return this.render(i);                                                                                          // 717
    }                                                                                                                 // 185
  });                                                                                                                 // 185
});                                                                                                                   // 183
                                                                                                                      //
Router.route('/manajemen', {                                                                                          // 187
  action: function () {                                                                                               // 188
    return this.render('manajemen');                                                                                  // 724
  },                                                                                                                  // 188
  waitOn: function () {                                                                                               // 189
    return [Meteor.subscribe('users'), Meteor.subscribe('coll', 'dokter', {}, {}), Meteor.subscribe('coll', 'tarif', {}, {})];
  }                                                                                                                   // 188
});                                                                                                                   // 188
Router.route('/login', function () {                                                                                  // 195
  return {                                                                                                            // 732
    action: function () {                                                                                             // 196
      return this.render('login');                                                                                    // 734
    }                                                                                                                 // 196
  };                                                                                                                  // 196
});                                                                                                                   // 195
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"client.coffee.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// client.coffee.js                                                                                                   //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var globalHelpers,                                                                                                    // 1
    indexOf = [].indexOf || function (item) {                                                                         // 1
  for (var i = 0, l = this.length; i < l; i++) {                                                                      // 1
    if (i in this && this[i] === item) return i;                                                                      // 1
  }                                                                                                                   // 1
                                                                                                                      //
  return -1;                                                                                                          // 1
},                                                                                                                    // 1
    slice = [].slice;                                                                                                 // 1
                                                                                                                      //
if (Meteor.isClient) {                                                                                                // 1
  Router.onBeforeAction(function () {                                                                                 // 3
    if (!Meteor.userId()) {                                                                                           // 4
      return this.render('login');                                                                                    // 8
    } else {                                                                                                          // 4
      return this.next();                                                                                             // 10
    }                                                                                                                 // 11
  });                                                                                                                 // 3
  Router.onAfterAction(function () {                                                                                  // 5
    var ref;                                                                                                          // 6
    sessNull();                                                                                                       // 6
                                                                                                                      //
    if (ref = currentRoute(), indexOf.call(_.uniq(_.flatMap(_.keys(roles()), function (i) {                           // 7
      return _.find(rights, function (j) {                                                                            // 17
        return j.group === i;                                                                                         // 18
      }).list;                                                                                                        // 9
    })), ref) < 0) {                                                                                                  // 8
      return Router.go('/');                                                                                          // 21
    }                                                                                                                 // 22
  });                                                                                                                 // 5
  globalHelpers = [['coll', function () {                                                                             // 11
    return coll;                                                                                                      // 27
  }], ['schema', function () {                                                                                        // 12
    return new SimpleSchema(schema[currentRoute()]);                                                                  // 31
  }], ['zeros', function (num) {                                                                                      // 13
    return zeros(num);                                                                                                // 35
  }], ['showForm', function () {                                                                                      // 14
    return Session.get('showForm');                                                                                   // 39
  }], ['hari', function (date) {                                                                                      // 15
    return date && moment(date).format('D MMM YYYY');                                                                 // 43
  }], ['rupiah', function (val) {                                                                                     // 16
    return 'Rp ' + numeral(val).format('0,0');                                                                        // 47
  }], ['currentPar', function (param) {                                                                               // 17
    return currentPar(param);                                                                                         // 51
  }], ['stringify', function (obj) {                                                                                  // 18
    return JSON.stringify(obj);                                                                                       // 55
  }], ['startCase', function (val) {                                                                                  // 19
    return _.startCase(val);                                                                                          // 59
  }], ['modules', function () {                                                                                       // 20
    return modules;                                                                                                   // 63
  }], ['reverse', function (arr) {                                                                                    // 21
    return _.reverse(arr);                                                                                            // 67
  }], ['sortBy', function (arr, sel, sort) {                                                                          // 22
    return _.sortBy(arr, function (i) {                                                                               // 71
      return -i.tanggal.getTime();                                                                                    // 72
    });                                                                                                               // 23
  }], ['isTrue', function (a, b) {                                                                                    // 23
    return a === b;                                                                                                   // 77
  }], ['isFalse', function (a, b) {                                                                                   // 24
    return a !== b;                                                                                                   // 81
  }], ['look', function (option, value, field) {                                                                      // 25
    return look(option, value)[field];                                                                                // 85
  }], ['look2', function (option, value, field) {                                                                     // 26
    return look2(option, value)[field];                                                                               // 89
  }], ['routeIs', function (name) {                                                                                   // 27
    return currentRoute() === name;                                                                                   // 93
  }], ['userGroup', function (name) {                                                                                 // 28
    return userGroup(name);                                                                                           // 97
  }], ['userRole', function (name) {                                                                                  // 29
    return userRole(name);                                                                                            // 101
  }], ['pagins', function (name) {                                                                                    // 30
    var end, l, length, limit, results;                                                                               // 32
    limit = Session.get('limit');                                                                                     // 32
    length = coll[name].find().fetch().length;                                                                        // 33
    end = (length - length % limit) / limit;                                                                          // 34
    return function () {                                                                                              // 109
      results = [];                                                                                                   // 110
                                                                                                                      //
      for (var l = 1; 1 <= end ? l <= end : l >= end; 1 <= end ? l++ : l--) {                                         // 111
        results.push(l);                                                                                              // 111
      }                                                                                                               // 111
                                                                                                                      //
      return results;                                                                                                 // 112
    }.apply(this);                                                                                                    // 113
  }]];                                                                                                                // 31
                                                                                                                      //
  _.map(globalHelpers, function (i) {                                                                                 // 38
    return Template.registerHelper.apply(Template, i);                                                                // 118
  });                                                                                                                 // 38
                                                                                                                      //
  Template.body.events({                                                                                              // 40
    'keypress #search': function (event) {                                                                            // 41
      var term;                                                                                                       // 42
                                                                                                                      //
      if (event.key === 'Enter') {                                                                                    // 42
        term = event.target.value;                                                                                    // 43
                                                                                                                      //
        if (term.length > 2) {                                                                                        // 44
          return Session.set('search', term);                                                                         // 126
        }                                                                                                             // 42
      }                                                                                                               // 128
    }                                                                                                                 // 41
  });                                                                                                                 // 41
  Template.layout.onRendered(function () {                                                                            // 47
    Session.set('limit', 10);                                                                                         // 48
    return Session.set('page', 0);                                                                                    // 133
  });                                                                                                                 // 47
  Template.menu.helpers({                                                                                             // 51
    menus: function () {                                                                                              // 52
      return _.initial(_.flatMap(_.keys(roles()), function (i) {                                                      // 137
        var find;                                                                                                     // 54
        find = _.find(rights, function (j) {                                                                          // 54
          return j.group === i;                                                                                       // 140
        });                                                                                                           // 54
        return _.map(find.list, function (j) {                                                                        // 142
          return _.find(modules, function (k) {                                                                       // 143
            return k.name === j;                                                                                      // 144
          });                                                                                                         // 55
        });                                                                                                           // 55
      }));                                                                                                            // 53
    },                                                                                                                // 52
    navTitle: function () {                                                                                           // 56
      var find;                                                                                                       // 57
      find = _.find(modules, function (i) {                                                                           // 57
        return i.name === currentRoute();                                                                             // 152
      });                                                                                                             // 57
      return (find != null ? find.full : void 0) || _.startCase(currentRoute());                                      // 154
    },                                                                                                                // 52
    today: function () {                                                                                              // 59
      return moment().format('LLL');                                                                                  // 157
    }                                                                                                                 // 52
  });                                                                                                                 // 52
  Template.menu.events({                                                                                              // 61
    'click #logout': function () {                                                                                    // 62
      return Meteor.logout();                                                                                         // 162
    }                                                                                                                 // 62
  });                                                                                                                 // 62
  Template.pasien.helpers({                                                                                           // 64
    heads: function () {                                                                                              // 65
      return {                                                                                                        // 167
        pasien: ['No MR', 'Nama', 'Orang Tua', 'Alamat', 'Jenis Kelamin', 'Tgl Lahir'],                               // 66
        bayar: ['No MR', 'Nama', 'Tanggal', 'Total Biaya', 'Cara Bayar', 'Klinik', 'Aksi'],                           // 67
        labor: ['No MR', 'Pasien', 'Grup', 'Order', 'Aksi'],                                                          // 68
        radio: ['No MR', 'Pasien', 'Order', 'Aksi'],                                                                  // 69
        obat: ['No MR', 'Pasien', 'Nama Obat', 'Kali', 'Dosis', 'Bentuk', 'Jumlah', 'Serah'],                         // 70
        rawat: ['Tanggal', 'Klinik', 'Cara Bayar', 'Bayar Pendaftaran', 'Bayar Tindakan', 'Cek'],                     // 71
        fisik: ['Tekanan Darah', 'Nadi', 'Suhu', 'Pernapasan', 'Berat', 'Tinggi', 'LILA'],                            // 72
        previewDokter: ['Tindakan', 'Dokter', 'Harga'],                                                               // 73
        previewLabor: ['Grup', 'Order', 'Hasil'],                                                                     // 74
        previewRadio: ['Order', 'Arsip'],                                                                             // 75
        previewObat: ['Nama', 'Dosis', 'Bentuk', 'Kali', 'Jumlah']                                                    // 76
      };                                                                                                              // 66
    },                                                                                                                // 65
    route: function () {                                                                                              // 77
      return currentRoute();                                                                                          // 182
    },                                                                                                                // 65
    formType: function () {                                                                                           // 78
      if (currentRoute() === 'regis') {                                                                               // 79
        if (currentPar('no_mr')) {                                                                                    // 80
          return 'update';                                                                                            // 187
        } else {                                                                                                      // 80
          return 'insert';                                                                                            // 189
        }                                                                                                             // 79
      } else {                                                                                                        // 79
        return 'update-pushArray';                                                                                    // 192
      }                                                                                                               // 193
    },                                                                                                                // 65
    umur: function (date) {                                                                                           // 83
      return moment().diff(date, 'years') + ' tahun';                                                                 // 196
    },                                                                                                                // 65
    showButton: function () {                                                                                         // 84
      return Router.current().params.no_mr || currentRoute() === 'regis';                                             // 199
    },                                                                                                                // 65
    showButtonText: function () {                                                                                     // 85
      switch (currentRoute()) {                                                                                       // 86
        case 'regis':                                                                                                 // 86
          return '+ Pasien';                                                                                          // 204
                                                                                                                      //
        case 'jalan':                                                                                                 // 86
          return '+ Rawat';                                                                                           // 206
      }                                                                                                               // 86
    },                                                                                                                // 65
    formDoc: function () {                                                                                            // 89
      return formDoc();                                                                                               // 210
    },                                                                                                                // 65
    preview: function () {                                                                                            // 90
      return Session.get('preview');                                                                                  // 213
    },                                                                                                                // 65
    omitFields: function () {                                                                                         // 91
      var arr;                                                                                                        // 92
      arr = ['anamesa_perawat', 'fisik', 'anamesa_dokter', 'diagnosa', 'planning', 'tindakan', 'labor', 'radio', 'obat', 'spm', 'keluar', 'pindah'];
                                                                                                                      //
      if (!(formDoc() && formDoc().billRegis)) {                                                                      // 93
        return arr;                                                                                                   // 219
      } else if (_.split(Meteor.user().username, '.')[0] !== 'dr') {                                                  // 93
        return arr.slice(2, +arr.length + 1 || 9e9);                                                                  // 221
      }                                                                                                               // 222
    },                                                                                                                // 65
    roleFilter: function (arr) {                                                                                      // 97
      return _.reverse(_.filter(arr, function (i) {                                                                   // 225
        var find;                                                                                                     // 98
        find = _.find(selects.klinik, function (j) {                                                                  // 98
          return j.label === _.startCase(roles().jalan[0]);                                                           // 228
        });                                                                                                           // 98
        return i.klinik === find.value;                                                                               // 230
      }));                                                                                                            // 97
    },                                                                                                                // 65
    userPoli: function () {                                                                                           // 101
      return roles().jalan;                                                                                           // 234
    },                                                                                                                // 65
    insurance: function (val) {                                                                                       // 102
      return 'Rp ' + numeral(val + 30000).format('0,0');                                                              // 237
    },                                                                                                                // 65
    selPol: function () {                                                                                             // 103
      return _.map(roles().jalan, function (i) {                                                                      // 240
        return _.find(selects.klinik, function (j) {                                                                  // 241
          return i === _.snakeCase(j.label);                                                                          // 242
        });                                                                                                           // 104
      });                                                                                                             // 103
    },                                                                                                                // 65
    pasiens: function () {                                                                                            // 105
      var arr, byName, byNoMR, elem, filter, kliniks, now, options, past, ref, ref1, selSub, selector, sub;           // 106
                                                                                                                      //
      if (currentPar('no_mr')) {                                                                                      // 106
        selector = {                                                                                                  // 107
          no_mr: parseInt(currentPar('no_mr'))                                                                        // 107
        };                                                                                                            // 107
        options = {                                                                                                   // 108
          fields: {                                                                                                   // 108
            no_mr: 1,                                                                                                 // 108
            regis: 1                                                                                                  // 108
          }                                                                                                           // 108
        };                                                                                                            // 108
        arr = ['bayar', 'jalan', 'labor', 'radio', 'obat'];                                                           // 109
                                                                                                                      //
        if (ref = currentRoute(), indexOf.call(arr, ref) >= 0) {                                                      // 110
          options.fields.rawat = 1;                                                                                   // 110
        }                                                                                                             // 261
                                                                                                                      //
        sub = Meteor.subscribe('coll', 'pasien', selector, options);                                                  // 111
                                                                                                                      //
        if (sub.ready()) {                                                                                            // 112
          return coll.pasien.findOne();                                                                               // 264
        }                                                                                                             // 106
      } else if (search()) {                                                                                          // 106
        byName = {                                                                                                    // 114
          'regis.nama_lengkap': {                                                                                     // 114
            $options: '-i',                                                                                           // 114
            $regex: '.*' + search() + '.*'                                                                            // 114
          }                                                                                                           // 114
        };                                                                                                            // 114
        byNoMR = {                                                                                                    // 115
          no_mr: parseInt(search())                                                                                   // 115
        };                                                                                                            // 115
        selector = {                                                                                                  // 116
          $or: [byName, byNoMR]                                                                                       // 116
        };                                                                                                            // 116
        options = {                                                                                                   // 117
          fields: {                                                                                                   // 117
            no_mr: 1,                                                                                                 // 117
            regis: 1                                                                                                  // 117
          }                                                                                                           // 117
        };                                                                                                            // 117
        sub = Meteor.subscribe('coll', 'pasien', selector, options);                                                  // 118
                                                                                                                      //
        if (sub.ready()) {                                                                                            // 119
          return coll.pasien.find().fetch();                                                                          // 287
        }                                                                                                             // 113
      } else if (roles().jalan) {                                                                                     // 113
        now = new Date();                                                                                             // 121
        past = new Date(now.getDate() - 2);                                                                           // 121
        kliniks = _.map(roles().jalan, function (i) {                                                                 // 122
          var find;                                                                                                   // 123
          find = _.find(selects.klinik, function (j) {                                                                // 123
            return i === _.snakeCase(j.label);                                                                        // 295
          });                                                                                                         // 123
          return find.value;                                                                                          // 297
        });                                                                                                           // 122
        selector = {                                                                                                  // 125
          rawat: {                                                                                                    // 125
            $elemMatch: {                                                                                             // 125
              klinik: {                                                                                               // 126
                $in: kliniks                                                                                          // 126
              },                                                                                                      // 126
              tanggal: {                                                                                              // 127
                $gt: past                                                                                             // 127
              }                                                                                                       // 127
            }                                                                                                         // 126
          }                                                                                                           // 125
        };                                                                                                            // 125
        sub = Meteor.subscribe('coll', 'pasien', selector, {});                                                       // 128
                                                                                                                      //
        if (sub.ready()) {                                                                                            // 129
          filter = _.filter(coll.pasien.find().fetch(), function (i) {                                                // 130
            var a, b, c, selPol;                                                                                      // 131
                                                                                                                      //
            a = function () {                                                                                         // 131
              var ref1;                                                                                               // 131
              return ref1 = i.rawat[i.rawat.length - 1].klinik, indexOf.call(kliniks, ref1) >= 0;                     // 317
            };                                                                                                        // 131
                                                                                                                      //
            b = function () {                                                                                         // 132
              return !i.rawat[i.rawat.length - 1].total.semua;                                                        // 320
            };                                                                                                        // 132
                                                                                                                      //
            selPol = Session.get('selPol');                                                                           // 133
                                                                                                                      //
            c = function () {                                                                                         // 134
              return i.rawat[i.rawat.length - 1].klinik === selPol;                                                   // 324
            };                                                                                                        // 134
                                                                                                                      //
            if (selPol) {                                                                                             // 135
              return b() && c();                                                                                      // 327
            } else {                                                                                                  // 135
              return a() && b();                                                                                      // 329
            }                                                                                                         // 330
          });                                                                                                         // 130
          return _.sortBy(filter, function (i) {                                                                      // 332
            return i.rawat[i.rawat.length - 1].tanggal;                                                               // 333
          });                                                                                                         // 136
        }                                                                                                             // 120
      } else if (currentRoute() === 'bayar') {                                                                        // 120
        selector = {                                                                                                  // 138
          rawat: {                                                                                                    // 138
            $elemMatch: {                                                                                             // 138
              $or: [{                                                                                                 // 138
                'status_bayar': {                                                                                     // 138
                  $ne: true                                                                                           // 138
                }                                                                                                     // 138
              }]                                                                                                      // 138
            }                                                                                                         // 138
          }                                                                                                           // 138
        };                                                                                                            // 138
        sub = Meteor.subscribe('coll', 'pasien', selector, {});                                                       // 139
                                                                                                                      //
        if (sub.ready()) {                                                                                            // 140
          return coll.pasien.find().fetch();                                                                          // 352
        }                                                                                                             // 137
      } else if ((ref1 = currentRoute()) === 'labor' || ref1 === 'radio' || ref1 === 'obat') {                        // 137
        elem = {                                                                                                      // 142
          'status_bayar': true                                                                                        // 142
        };                                                                                                            // 142
        elem[currentRoute()] = {                                                                                      // 143
          $exists: true,                                                                                              // 143
          $elemMatch: {                                                                                               // 143
            hasil: {                                                                                                  // 143
              $exists: false                                                                                          // 143
            }                                                                                                         // 143
          }                                                                                                           // 143
        };                                                                                                            // 143
        selSub = {                                                                                                    // 144
          rawat: {                                                                                                    // 144
            $elemMatch: elem                                                                                          // 144
          }                                                                                                           // 144
        };                                                                                                            // 144
        sub = Meteor.subscribe('coll', 'pasien', selSub, {});                                                         // 145
                                                                                                                      //
        if (sub.ready()) {                                                                                            // 146
          return coll.pasien.find().fetch();                                                                          // 373
        }                                                                                                             // 141
      }                                                                                                               // 375
    }                                                                                                                 // 65
  });                                                                                                                 // 65
  Template.pasien.events({                                                                                            // 148
    'click #showForm': function () {                                                                                  // 149
      var later;                                                                                                      // 150
      Session.set('showForm', !Session.get('showForm'));                                                              // 150
                                                                                                                      //
      if (userGroup('regis')) {                                                                                       // 151
        Session.set('formDoc', null);                                                                                 // 151
      }                                                                                                               // 384
                                                                                                                      //
      later = function () {                                                                                           // 152
        var list;                                                                                                     // 153
        $('.autoform-remove-item').trigger('click');                                                                  // 153
                                                                                                                      //
        if (currentRoute() === 'jalan') {                                                                             // 154
          _.map(['cara_bayar', 'klinik', 'karcis', 'rujukan'], function (i) {                                         // 155
            $('div[data-schema-key="' + i + '"]').prepend(tag('p', _.startCase(i)));                                  // 156
                                                                                                                      //
            if (formDoc()) {                                                                                          // 157
              $('input[name="' + i + '"][value="' + formDoc()[i] + '"]').attr({                                       // 158
                checked: true                                                                                         // 158
              });                                                                                                     // 158
              return $('input[name="' + i + '"]').attr({                                                              // 395
                disabled: 'disabled'                                                                                  // 159
              });                                                                                                     // 159
            }                                                                                                         // 398
          });                                                                                                         // 155
                                                                                                                      //
          _.map(['anamesa_perawat'], function (i) {                                                                   // 160
            return $('textarea[name="' + i + '"]').val(formDoc()[i]);                                                 // 401
          });                                                                                                         // 160
        }                                                                                                             // 403
                                                                                                                      //
        list = ['cara_bayar', 'kelamin', 'agama', 'nikah', 'pendidikan', 'darah', 'pekerjaan'];                       // 162
                                                                                                                      //
        if (currentRoute() === 'regis') {                                                                             // 163
          return _.map(list, function (i) {                                                                           // 406
            return $('div[data-schema-key="regis.' + i + '"]').prepend(tag('p', _.startCase(i)));                     // 407
          });                                                                                                         // 163
        }                                                                                                             // 409
      };                                                                                                              // 152
                                                                                                                      //
      Meteor.setTimeout(later, 1000);                                                                                 // 165
      Meteor.subscribe('coll', 'gudang', {}, {});                                                                     // 166
      return Session.set('begin', moment());                                                                          // 413
    },                                                                                                                // 149
    'dblclick #row': function () {                                                                                    // 168
      return Router.go('/' + currentRoute() + '/' + this.no_mr);                                                      // 416
    },                                                                                                                // 149
    'click #close': function () {                                                                                     // 170
      sessNull();                                                                                                     // 170
      return Router.go(currentRoute());                                                                               // 420
    },                                                                                                                // 149
    'click #card': function () {                                                                                      // 171
      var dialog;                                                                                                     // 172
      dialog = {                                                                                                      // 172
        title: 'Cetak Kartu',                                                                                         // 173
        message: 'Yakin untuk cetak kartu ini?'                                                                       // 174
      };                                                                                                              // 173
      return new Confirmation(dialog, function (ok) {                                                                 // 428
        if (ok) {                                                                                                     // 175
          return makePdf.card();                                                                                      // 430
        }                                                                                                             // 431
      });                                                                                                             // 175
    },                                                                                                                // 149
    'click #consent': function () {                                                                                   // 178
      var dialog;                                                                                                     // 179
      dialog = {                                                                                                      // 179
        title: 'Cetak General Consent',                                                                               // 180
        message: 'Yakin untuk cetak persetujuan pasien?'                                                              // 181
      };                                                                                                              // 180
      return new Confirmation(dialog, function (ok) {                                                                 // 440
        if (ok) {                                                                                                     // 182
          return makePdf.consent();                                                                                   // 442
        }                                                                                                             // 443
      });                                                                                                             // 182
    },                                                                                                                // 149
    'dblclick #bill': function (event) {                                                                              // 183
      var dialog, nodes;                                                                                              // 184
      nodes = _.map(['pasien', 'idbayar', 'karcis'], function (i) {                                                   // 184
        return event.target.attributes[i].nodeValue;                                                                  // 449
      });                                                                                                             // 184
      dialog = {                                                                                                      // 186
        title: 'Pembayaran Pendaftaran',                                                                              // 187
        message: 'Apakah yakin pasien sudah membayar?'                                                                // 188
      };                                                                                                              // 187
      return new Confirmation(dialog, function (ok) {                                                                 // 455
        if (ok) {                                                                                                     // 189
          if (nodes[1]) {                                                                                             // 190
            Meteor.call.apply(Meteor, ['billRegis'].concat(slice.call(nodes.slice(0, 2)), [true]));                   // 191
            return makePdf.payRegCard(nodes[0], nodes[2], '...');                                                     // 459
          } else {                                                                                                    // 190
            Meteor.call('billCard', nodes[0], false);                                                                 // 194
            return makePdf.payRegCard(10000, 'Sepuluh Ribu Rupiah');                                                  // 462
          }                                                                                                           // 189
        }                                                                                                             // 464
      });                                                                                                             // 189
    },                                                                                                                // 149
    'dblclick #bayar': function (event) {                                                                             // 196
      var dialog, nodes;                                                                                              // 197
      nodes = _.map(['pasien', 'idbayar'], function (i) {                                                             // 197
        return event.target.attributes[i].nodeValue;                                                                  // 470
      });                                                                                                             // 197
      dialog = {                                                                                                      // 199
        title: 'Konfirmasi Pembayaran',                                                                               // 200
        message: 'Apakah yakin tagihan ini sudah dibayar?'                                                            // 201
      };                                                                                                              // 200
      return new Confirmation(dialog, function (ok) {                                                                 // 476
        var doc, pasien;                                                                                              // 202
                                                                                                                      //
        if (ok) {                                                                                                     // 202
          Meteor.call.apply(Meteor, ['bayar'].concat(slice.call(nodes)));                                             // 203
          pasien = coll.pasien.findOne({                                                                              // 204
            no_mr: parseInt(nodes[0])                                                                                 // 204
          });                                                                                                         // 204
          doc = _.find(pasien.rawat, function (i) {                                                                   // 205
            return i.idbayar === nodes[1];                                                                            // 484
          });                                                                                                         // 205
          return makePdf.payRawat(nodes[0], doc);                                                                     // 486
        }                                                                                                             // 487
      });                                                                                                             // 202
    },                                                                                                                // 149
    'dblclick #request': function (event) {                                                                           // 207
      var nodes;                                                                                                      // 208
      nodes = _.map(['pasien', 'idbayar', 'jenis', 'idjenis'], function (i) {                                         // 208
        return event.target.attributes[i].nodeValue;                                                                  // 493
      });                                                                                                             // 208
      return MaterializeModal.prompt({                                                                                // 495
        message: 'Isikan data requestnya',                                                                            // 211
        callback: function (err, res) {                                                                               // 212
          var params;                                                                                                 // 212
                                                                                                                      //
          if (res.submit) {                                                                                           // 212
            params = ['request'].concat(slice.call(nodes), [res.value]);                                              // 213
            return Meteor.call.apply(Meteor, slice.call(params).concat([function (err, res) {                         // 501
              var flat, key, message, rekap, val;                                                                     // 214
                                                                                                                      //
              if (res) {                                                                                              // 214
                message = '';                                                                                         // 215
                                                                                                                      //
                for (key in meteorBabelHelpers.sanitizeForInObject(res)) {                                            // 216
                  val = res[key];                                                                                     // 506
                  message += tag('p', key + ': ' + val);                                                              // 217
                }                                                                                                     // 216
                                                                                                                      //
                MaterializeModal.message({                                                                            // 218
                  title: 'Penyerahan Obat',                                                                           // 219
                  message: message                                                                                    // 220
                });                                                                                                   // 219
                rekap = Session.get('rekap') || [];                                                                   // 221
                flat = _.flatten(_.toPairs(res));                                                                     // 222
                return Session.set('rekap', slice.call(rekap).concat([slice.call(nodes).concat(slice.call(flat))]));  // 515
              }                                                                                                       // 516
            }]));                                                                                                     // 214
          }                                                                                                           // 518
        }                                                                                                             // 211
      });                                                                                                             // 211
    },                                                                                                                // 149
    'dblclick #rekap': function () {                                                                                  // 224
      var headers;                                                                                                    // 225
      headers = ['Pasien', 'ID Bayar', 'Jenis', 'ID Request', 'No Batch', 'Jumlah'];                                  // 225
      makePdf.rekap([headers].concat(slice.call(Session.get('rekap'))));                                              // 226
      return Session.set('rekap', null);                                                                              // 526
    },                                                                                                                // 149
    'click .modal-trigger': function (event) {                                                                        // 228
      if (this.idbayar) {                                                                                             // 229
        Session.set('formDoc', this);                                                                                 // 230
        Session.set('preview', modForm(this, this.idbayar));                                                          // 231
      }                                                                                                               // 532
                                                                                                                      //
      return $('#preview').modal('open');                                                                             // 533
    },                                                                                                                // 149
    'click #rmRawat': function () {                                                                                   // 233
      var dialog, self;                                                                                               // 234
      self = this;                                                                                                    // 234
      dialog = {                                                                                                      // 235
        title: 'Konfirmasi Hapus',                                                                                    // 236
        message: 'Apakah yakin hapus data rawat pasien ini?'                                                          // 237
      };                                                                                                              // 236
      return new Confirmation(dialog, function (ok) {                                                                 // 542
        if (ok) {                                                                                                     // 238
          return Meteor.call('rmRawat', currentPar('no_mr'), self.idbayar);                                           // 544
        }                                                                                                             // 545
      });                                                                                                             // 238
    },                                                                                                                // 149
    'change #selPol': function (event) {                                                                              // 240
      return Session.set('selPol', parseInt(event.target.id));                                                        // 549
    },                                                                                                                // 149
    'click #rmPasien': function () {                                                                                  // 242
      var dialog;                                                                                                     // 243
      dialog = {                                                                                                      // 243
        title: 'Hapus Pasien',                                                                                        // 244
        message: 'Apakah yakin untuk menghapus pasien?'                                                               // 245
      };                                                                                                              // 244
      return new Confirmation(dialog, function (ok) {                                                                 // 557
        if (ok) {                                                                                                     // 246
          Meteor.call('rmPasien', currentPar('no_mr'));                                                               // 247
          return Router.go('/' + currentRoute());                                                                     // 560
        }                                                                                                             // 561
      });                                                                                                             // 246
    }                                                                                                                 // 149
  });                                                                                                                 // 149
  Template["import"].events({                                                                                         // 250
    'change :file': function (event, template) {                                                                      // 251
      return Papa.parse(event.target.files[0], {                                                                      // 567
        header: true,                                                                                                 // 253
        step: function (result) {                                                                                     // 254
          var data, modifier, selector;                                                                               // 255
          data = result.data[0];                                                                                      // 255
                                                                                                                      //
          if (currentRoute() === 'regis') {                                                                           // 256
            selector = {                                                                                              // 257
              no_mr: parseInt(data.no_mr)                                                                             // 257
            };                                                                                                        // 257
            modifier = {                                                                                              // 258
              regis: {                                                                                                // 258
                nama_lengkap: _.startCase(data.nama_lengkap),                                                         // 259
                alamat: _.startCase(data.alamat),                                                                     // 260
                agama: data.agama ? parseInt(data.agama) : void 0,                                                    // 261
                ayah: data.ayah ? _.startCase(data.ayah) : void 0,                                                    // 262
                nikah: data.nikah ? parseInt(data.nikah) : void 0,                                                    // 263
                pekerjaan: data.pekerjaan ? parseInt(data.pekerjaan) : void 0,                                        // 264
                pendidikan: data.pendidikan ? parseInt(data.pendidikan) : void 0,                                     // 265
                tgl_lahir: Date.parse(data.tgl_lahir) ? new Date(date.tgl_lahir) : void 0,                            // 266
                tmpt_kelahiran: data.tmpt_kelahiran ? _.startCase(data.tmpt_kelahiran) : void 0                       // 267
              }                                                                                                       // 259
            };                                                                                                        // 258
            return Meteor.call('import', 'pasien', selector, modifier);                                               // 589
          } else if (currentRoute() === 'manajemen') {                                                                // 256
            if (data.tipe) {                                                                                          // 270
              selector = {                                                                                            // 271
                nama: data.nama                                                                                       // 271
              };                                                                                                      // 271
              modifier = {                                                                                            // 272
                tipe: parseInt(data.tipe),                                                                            // 273
                poli: parseInt(data.poli),                                                                            // 274
                active: true                                                                                          // 275
              };                                                                                                      // 273
              return Meteor.call('import', 'dokter', selector, modifier);                                             // 600
            } else if (data.harga) {                                                                                  // 270
              selector = {                                                                                            // 278
                nama: _.snakeCase(data.nama)                                                                          // 278
              };                                                                                                      // 278
              modifier = {                                                                                            // 279
                harga: parseInt(data.harga),                                                                          // 280
                jenis: _.snakeCase(data.jenis),                                                                       // 281
                active: true                                                                                          // 282
              };                                                                                                      // 280
              data.grup && (modifier.grup = _.startCase(data.grup));                                                  // 283
              return Meteor.call('import', 'tarif', selector, modifier);                                              // 611
            } else if (data.password) {                                                                               // 277
              Meteor.call('newUser', data);                                                                           // 286
              return Meteor.call('addRole', data.username, [data.role], data.group);                                  // 614
            }                                                                                                         // 269
          } else if (currentRoute() === 'farmasi') {                                                                  // 269
            selector = {                                                                                              // 289
              nama: data.nama                                                                                         // 289
            };                                                                                                        // 289
            modifier = {                                                                                              // 290
              jenis: parseInt(data.jenis),                                                                            // 291
              idbarang: randomId(),                                                                                   // 292
              batch: [{                                                                                               // 293
                idbatch: randomId(),                                                                                  // 294
                anggaran: data.anggaran,                                                                              // 295
                beli: parseInt(data.beli),                                                                            // 296
                diapotik: parseInt(data.diapotik),                                                                    // 297
                digudang: parseInt(data.digudang),                                                                    // 298
                jenis: parseInt(data.jenis),                                                                          // 299
                jual: parseInt(data.jual),                                                                            // 300
                kadaluarsa: new Date(data.kadaluarsa),                                                                // 301
                masuk: new Date(data.masuk),                                                                          // 302
                merek: data.merek || '',                                                                              // 303
                nobatch: data.nobatch,                                                                                // 304
                pengadaan: parseInt(data.pengadaan),                                                                  // 305
                satuan: parseInt(data.satuan),                                                                        // 306
                suplier: data.suplier                                                                                 // 307
              }]                                                                                                      // 294
            };                                                                                                        // 291
            return data.nama && Meteor.call('import', 'gudang', selector, modifier, 'batch');                         // 642
          }                                                                                                           // 643
        }                                                                                                             // 253
      });                                                                                                             // 253
    }                                                                                                                 // 251
  });                                                                                                                 // 251
  Template["export"].onRendered(function () {                                                                         // 311
    return $('select#export').material_select();                                                                      // 649
  });                                                                                                                 // 311
  Template["export"].events({                                                                                         // 314
    'click #export': function () {                                                                                    // 315
      var select;                                                                                                     // 316
      select = $('select#export').val();                                                                              // 316
      return Meteor.call('export', select, function (err, content) {                                                  // 655
        var blob;                                                                                                     // 317
                                                                                                                      //
        if (content) {                                                                                                // 317
          blob = new Blob([content], {                                                                                // 318
            type: 'text/plain;charset=utf-8'                                                                          // 318
          });                                                                                                         // 318
          return saveAs(blob, select + '.csv');                                                                       // 661
        }                                                                                                             // 662
      });                                                                                                             // 317
    }                                                                                                                 // 315
  });                                                                                                                 // 315
  Template.gudang.helpers({                                                                                           // 321
    heads: function () {                                                                                              // 322
      return {                                                                                                        // 668
        barang: ['Jenis Barang', 'Nama Barang', 'Di Gudang', 'Di Apotik'],                                            // 323
        batch: ['No Batch', 'Masuk', 'Kadaluarsa', 'Beli', 'Jual', 'Di Gudang', 'Di Apotik', 'Suplier']               // 324
      };                                                                                                              // 323
    },                                                                                                                // 322
    schemagudang: function () {                                                                                       // 325
      return new SimpleSchema(schema.gudang);                                                                         // 674
    },                                                                                                                // 322
    formType: function () {                                                                                           // 326
      if (currentPar('idbarang')) {                                                                                   // 326
        return 'update-pushArray';                                                                                    // 678
      } else {                                                                                                        // 326
        return 'insert';                                                                                              // 680
      }                                                                                                               // 681
    },                                                                                                                // 322
    warning: function (date) {                                                                                        // 327
      var diff;                                                                                                       // 328
      diff = (new Date().getFullYear() - date.getFullYear()) * 12 - (new Date().getMonth() - date.getMonth());        // 328
                                                                                                                      //
      switch (false) {                                                                                                // 329
        case !(diff < 2):                                                                                             // 329
          return 'red';                                                                                               // 688
                                                                                                                      //
        case !(diff < 7):                                                                                             // 329
          return 'orange';                                                                                            // 690
                                                                                                                      //
        case !(diff < 13):                                                                                            // 329
          return 'yellow';                                                                                            // 692
                                                                                                                      //
        default:                                                                                                      // 329
          return 'green';                                                                                             // 694
      }                                                                                                               // 329
    },                                                                                                                // 322
    gudangs: function () {                                                                                            // 334
      var aggr, byBatch, byName, selector, sub;                                                                       // 335
                                                                                                                      //
      aggr = function (i) {                                                                                           // 335
        return _.map(i, function (j) {                                                                                // 700
          var reduced;                                                                                                // 336
                                                                                                                      //
          reduced = function (name) {                                                                                 // 336
            return _.reduce(j.batch, function (sum, n) {                                                              // 703
              return sum + n[name];                                                                                   // 704
            }, 0);                                                                                                    // 336
          };                                                                                                          // 336
                                                                                                                      //
          j.akumulasi = {                                                                                             // 337
            digudang: reduced('digudang'),                                                                            // 337
            diapotik: reduced('diapotik')                                                                             // 337
          };                                                                                                          // 337
          return j;                                                                                                   // 711
        });                                                                                                           // 335
      };                                                                                                              // 335
                                                                                                                      //
      if (currentPar('idbarang')) {                                                                                   // 339
        selector = {                                                                                                  // 340
          idbarang: currentPar('idbarang')                                                                            // 340
        };                                                                                                            // 340
        sub = Meteor.subscribe('coll', 'gudang', selector, {});                                                       // 341
                                                                                                                      //
        if (sub.ready()) {                                                                                            // 342
          return coll.gudang.findOne();                                                                               // 720
        }                                                                                                             // 339
      } else if (search()) {                                                                                          // 339
        byName = {                                                                                                    // 344
          nama: {                                                                                                     // 344
            $options: '-i',                                                                                           // 344
            $regex: '.*' + search() + '.*'                                                                            // 344
          }                                                                                                           // 344
        };                                                                                                            // 344
        byBatch = {                                                                                                   // 345
          idbatch: search()                                                                                           // 345
        };                                                                                                            // 345
        selector = {                                                                                                  // 346
          $or: [byName, byBatch]                                                                                      // 346
        };                                                                                                            // 346
        sub = Meteor.subscribe('coll', 'gudang', selector, {});                                                       // 347
        return sub.ready() && aggr(coll.gudang.find().fetch());                                                       // 736
      } else {                                                                                                        // 343
        sub = Meteor.subscribe('coll', 'gudang', {}, {});                                                             // 350
        return sub.ready() && aggr(coll.gudang.find().fetch());                                                       // 739
      }                                                                                                               // 740
    }                                                                                                                 // 322
  });                                                                                                                 // 322
  Template.gudang.events({                                                                                            // 353
    'click #showForm': function () {                                                                                  // 354
      return Session.set('showForm', !Session.get('showForm'));                                                       // 745
    },                                                                                                                // 354
    'dblclick #row': function () {                                                                                    // 356
      return Router.go('/' + currentRoute() + '/' + this.idbarang);                                                   // 748
    },                                                                                                                // 354
    'dblclick #transfer': function () {                                                                               // 357
      var data;                                                                                                       // 358
      data = this;                                                                                                    // 358
                                                                                                                      //
      if (roles().farmasi) {                                                                                          // 359
        return MaterializeModal.prompt({                                                                              // 754
          message: 'Transfer Gudang > Apotek',                                                                        // 361
          callback: function (err, res) {                                                                             // 362
            if (res.submit) {                                                                                         // 362
              return Meteor.call('transfer', currentPar('idbarang'), data.idbatch, parseInt(res.value));              // 758
            }                                                                                                         // 759
          }                                                                                                           // 361
        });                                                                                                           // 361
      }                                                                                                               // 762
    },                                                                                                                // 354
    'click #rmBarang': function () {                                                                                  // 364
      var dialog, self;                                                                                               // 365
      self = this;                                                                                                    // 365
      dialog = {                                                                                                      // 366
        title: 'Hapus Jenis Obat',                                                                                    // 367
        message: 'Apakah yakin untuk hapus jenis obat ini dari sistem?'                                               // 368
      };                                                                                                              // 367
      return new Confirmation(dialog, function (ok) {                                                                 // 771
        if (ok) {                                                                                                     // 369
          return Meteor.call('rmBarang', self.idbarang);                                                              // 773
        }                                                                                                             // 774
      });                                                                                                             // 369
    }                                                                                                                 // 354
  });                                                                                                                 // 354
  Template.manajemen.helpers({                                                                                        // 372
    users: function () {                                                                                              // 373
      return Meteor.users.find().fetch();                                                                             // 780
    },                                                                                                                // 373
    onUser: function () {                                                                                             // 374
      return Session.get('onUser');                                                                                   // 783
    },                                                                                                                // 373
    selRoles: function () {                                                                                           // 375
      return ['petugas', 'admin'];                                                                                    // 786
    },                                                                                                                // 373
    klinik: function () {                                                                                             // 376
      return selects.klinik;                                                                                          // 789
    },                                                                                                                // 373
    schemadokter: function () {                                                                                       // 377
      return new SimpleSchema(schema.dokter);                                                                         // 792
    },                                                                                                                // 373
    schematarif: function () {                                                                                        // 378
      return new SimpleSchema(schema.tarif);                                                                          // 795
    },                                                                                                                // 373
    dokters: function () {                                                                                            // 379
      var options, selector;                                                                                          // 380
      selector = {                                                                                                    // 380
        active: true                                                                                                  // 380
      };                                                                                                              // 380
      options = {                                                                                                     // 381
        limit: limit(),                                                                                               // 381
        skip: page() * limit()                                                                                        // 381
      };                                                                                                              // 381
      return coll.dokter.find(selector, options).fetch();                                                             // 806
    },                                                                                                                // 373
    tarifs: function () {                                                                                             // 383
      var options, selector;                                                                                          // 384
      selector = {                                                                                                    // 384
        active: true                                                                                                  // 384
      };                                                                                                              // 384
      options = {                                                                                                     // 385
        limit: limit(),                                                                                               // 385
        skip: page() * limit()                                                                                        // 385
      };                                                                                                              // 385
      return coll.tarif.find(selector, options).fetch();                                                              // 817
    }                                                                                                                 // 373
  });                                                                                                                 // 373
  Template.manajemen.events({                                                                                         // 388
    'submit #userForm': function (event) {                                                                            // 389
      var doc, group, onUser, poli, repeat, role, theRole;                                                            // 390
      event.preventDefault();                                                                                         // 390
      onUser = Session.get('onUser');                                                                                 // 391
                                                                                                                      //
      if (!onUser) {                                                                                                  // 392
        doc = {                                                                                                       // 393
          username: event.target.children.username.value,                                                             // 394
          password: event.target.children.password.value                                                              // 395
        };                                                                                                            // 394
        repeat = event.target.children.repeat.value;                                                                  // 396
                                                                                                                      //
        if (doc.password === repeat) {                                                                                // 397
          Meteor.call('newUser', doc);                                                                                // 398
          return $('input').val('');                                                                                  // 833
        } else {                                                                                                      // 397
          return Materialize.toast('Password tidak mirip', 3000);                                                     // 835
        }                                                                                                             // 392
      } else {                                                                                                        // 392
        role = $('input[name="role"]:checked', event.target)[0].id;                                                   // 403
        group = $('input[name="group"]:checked', event.target)[0].id;                                                 // 404
        poli = $('input[name="poli"]:checked', event.target)[0];                                                      // 405
        theRole = !poli ? role : _.snakeCase(poli.id);                                                                // 406
        return Meteor.call('addRole', onUser._id, [theRole], group);                                                  // 842
      }                                                                                                               // 843
    },                                                                                                                // 389
    'dblclick #row': function () {                                                                                    // 408
      return Session.set('onUser', this);                                                                             // 846
    },                                                                                                                // 389
    'dblclick #reset': function () {                                                                                  // 409
      var dialog, self;                                                                                               // 410
      self = this;                                                                                                    // 410
      dialog = {                                                                                                      // 411
        title: 'Reset Peranan',                                                                                       // 412
        message: 'Anda yakin untuk menghapus semua perannya?'                                                         // 413
      };                                                                                                              // 412
      return new Confirmation(dialog, function (ok) {                                                                 // 855
        if (ok) {                                                                                                     // 414
          return Meteor.call('rmRole', self._id);                                                                     // 857
        }                                                                                                             // 858
      });                                                                                                             // 414
    },                                                                                                                // 389
    'click #close': function () {                                                                                     // 416
      return sessNull();                                                                                              // 862
    },                                                                                                                // 389
    'dblclick #baris': function (event) {                                                                             // 417
      var dialog, jenis, self;                                                                                        // 418
      jenis = event.currentTarget.className;                                                                          // 418
      dialog = {                                                                                                      // 419
        title: 'Hapus ' + _.startCase(jenis),                                                                         // 420
        message: 'Yakin untuk menghapus ' + jenis + ' dari daftar?'                                                   // 421
      };                                                                                                              // 420
      self = this;                                                                                                    // 422
      return new Confirmation(dialog, function (ok) {                                                                 // 872
        if (ok) {                                                                                                     // 423
          return Meteor.call('inactive', jenis, self._id);                                                            // 874
        }                                                                                                             // 875
      });                                                                                                             // 423
    }                                                                                                                 // 389
  });                                                                                                                 // 389
  Template.login.onRendered(function () {                                                                             // 426
    return $('.slider').slider();                                                                                     // 880
  });                                                                                                                 // 426
  Template.login.events({                                                                                             // 429
    'submit form': function (event) {                                                                                 // 430
      var password, username;                                                                                         // 431
      event.preventDefault();                                                                                         // 431
      username = event.target.children.username.value;                                                                // 432
      password = event.target.children.password.value;                                                                // 433
      return Meteor.loginWithPassword(username, password, function (err) {                                            // 888
        if (err) {                                                                                                    // 435
          return Materialize.toast('Salah username / password', 3000);                                                // 890
        } else {                                                                                                      // 435
          return Router.go('/' + _.keys(roles())[0]);                                                                 // 892
        }                                                                                                             // 893
      });                                                                                                             // 434
    }                                                                                                                 // 430
  });                                                                                                                 // 430
  Template.pagination.events({                                                                                        // 440
    'click #next': function () {                                                                                      // 441
      return Session.set('page', 1 + page());                                                                         // 899
    },                                                                                                                // 441
    'click #prev': function () {                                                                                      // 442
      return Session.set('page', -1 + page());                                                                        // 902
    },                                                                                                                // 441
    'click #num': function (event) {                                                                                  // 443
      return Session.set('page', parseInt(event.target.innerText));                                                   // 905
    }                                                                                                                 // 441
  });                                                                                                                 // 441
  Template.report.helpers({                                                                                           // 446
    datas: function () {                                                                                              // 447
      return Session.get('laporan');                                                                                  // 910
    }                                                                                                                 // 447
  });                                                                                                                 // 447
  Template.report.events({                                                                                            // 449
    'click .datepicker': function (event, template) {                                                                 // 450
      var type;                                                                                                       // 451
      type = event.target.attributes.date.nodeValue;                                                                  // 451
      return $('#' + type).pickadate({                                                                                // 917
        onSet: function (data) {                                                                                      // 452
          var end, start;                                                                                             // 453
          Session.set(type + 'Date', data.select);                                                                    // 453
          start = Session.get('startDate');                                                                           // 454
          end = Session.get('endDate');                                                                               // 455
                                                                                                                      //
          if (start && end) {                                                                                         // 456
            return Meteor.call('report', template.data.jenis, start, end, function (err, res) {                       // 924
              return res && Session.set('laporan', res);                                                              // 925
            });                                                                                                       // 457
          }                                                                                                           // 927
        }                                                                                                             // 452
      });                                                                                                             // 452
    },                                                                                                                // 450
    'click #export': function (event, template) {                                                                     // 459
      var blob, content;                                                                                              // 460
      content = exportcsv.exportToCSV(Session.get('laporan').csv, true, ';');                                         // 460
      blob = new Blob([content], {                                                                                    // 461
        type: 'text/plain;charset=utf-8'                                                                              // 461
      });                                                                                                             // 461
      return saveAs(blob, template.data.jenis + '.csv');                                                              // 937
    }                                                                                                                 // 450
  });                                                                                                                 // 450
}                                                                                                                     // 940
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"server.coffee.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server.coffee.js                                                                                                   //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
if (Meteor.isServer) {                                                                                                // 1
  Meteor.startup(function () {                                                                                        // 3
    return coll.pasien._ensureIndex({                                                                                 // 3
      'regis.nama_lengkap': 1                                                                                         // 4
    });                                                                                                               // 4
  });                                                                                                                 // 3
  Meteor.publish('coll', function (name, selector, options) {                                                         // 6
    return coll[name].find(selector, options);                                                                        // 8
  });                                                                                                                 // 6
  Meteor.publish('users', function () {                                                                               // 9
    return Meteor.users.find({});                                                                                     // 11
  });                                                                                                                 // 9
  Meteor.methods({                                                                                                    // 12
    "import": function (name, selector, modifier, arrName) {                                                          // 13
      var find, obj, sel;                                                                                             // 14
      find = coll[name].findOne(selector);                                                                            // 14
                                                                                                                      //
      if (!find) {                                                                                                    // 15
        return coll[name].upsert(selector, {                                                                          // 18
          $set: modifier                                                                                              // 16
        });                                                                                                           // 16
      } else if (arrName) {                                                                                           // 15
        sel = {                                                                                                       // 18
          _id: find._id                                                                                               // 18
        };                                                                                                            // 18
        obj = {};                                                                                                     // 19
        obj[arrName] = modifier[arrName][0];                                                                          // 19
        return coll[name].update(sel, {                                                                               // 27
          $push: obj                                                                                                  // 20
        });                                                                                                           // 20
      }                                                                                                               // 30
    },                                                                                                                // 13
    "export": function (jenis) {                                                                                      // 22
      var arr, find;                                                                                                  // 23
                                                                                                                      //
      if (jenis === 'regis') {                                                                                        // 23
        arr = _.map(coll.pasien.find().fetch(), function (i) {                                                        // 24
          return {                                                                                                    // 36
            no_mr: i.no_mr,                                                                                           // 25
            nama_lengkap: i.regis.nama_lengkap                                                                        // 26
          };                                                                                                          // 25
        });                                                                                                           // 24
      } else if (jenis === 'jalan') {                                                                                 // 23
        find = function (type, value) {                                                                               // 28
          var doc;                                                                                                    // 29
          doc = _.find(selects[type], function (i) {                                                                  // 29
            return i.value === value;                                                                                 // 45
          });                                                                                                         // 29
          return doc.label;                                                                                           // 47
        };                                                                                                            // 28
                                                                                                                      //
        arr = _.flatMap(coll.pasien.find().fetch(), function (i) {                                                    // 31
          if (i.rawat) {                                                                                              // 32
            return _.map(i.rawat, function (j) {                                                                      // 51
              return {                                                                                                // 52
                no_mr: i.no_mr,                                                                                       // 33
                nama_lengkap: i.regis.nama_lengkap,                                                                   // 34
                idbayar: j.idbayar,                                                                                   // 35
                cara_bayar: find('cara_bayar', j.cara_bayar),                                                         // 36
                klinik: find('klinik', j.klinik)                                                                      // 37
              };                                                                                                      // 33
            });                                                                                                       // 32
          }                                                                                                           // 60
        });                                                                                                           // 31
      } else if (jenis === 'farmasi') {                                                                               // 27
        arr = _.flatMap(coll.gudang.find().fetch(), function (i) {                                                    // 39
          return _.map(i.batch, function (j) {                                                                        // 64
            var body, head;                                                                                           // 41
            head = ['jenis', 'nama'];                                                                                 // 41
            head = _.zipObject(head, _.map(head, function (k) {                                                       // 42
              return i[k];                                                                                            // 68
            }));                                                                                                      // 42
            body = ['nobatch', 'merek', 'satuan', 'masuk', 'kadaluarsa', 'digudang', 'diapotik', 'beli', 'jual', 'suplier', 'anggaran', 'pengadaan'];
            body = _.zipObject(body, _.map(body, function (k) {                                                       // 44
              return j[k];                                                                                            // 72
            }));                                                                                                      // 44
            return _.assign(head, body);                                                                              // 74
          });                                                                                                         // 40
        });                                                                                                           // 39
      }                                                                                                               // 77
                                                                                                                      //
      return exportcsv.exportToCSV(arr, true, ';');                                                                   // 78
    },                                                                                                                // 13
    billCard: function (no_mr, state) {                                                                               // 48
      var modifier, selector;                                                                                         // 49
      selector = {                                                                                                    // 49
        no_mr: parseInt(no_mr)                                                                                        // 49
      };                                                                                                              // 49
      modifier = {                                                                                                    // 50
        $set: {                                                                                                       // 50
          'regis.billCard': state                                                                                     // 50
        }                                                                                                             // 50
      };                                                                                                              // 50
      return coll.pasien.update(selector, modifier);                                                                  // 90
    },                                                                                                                // 13
    billRegis: function (no_mr, idbayar, state) {                                                                     // 53
      var modifier, selector;                                                                                         // 54
      selector = {                                                                                                    // 54
        'rawat.idbayar': idbayar,                                                                                     // 54
        no_mr: parseInt(no_mr)                                                                                        // 54
      };                                                                                                              // 54
      modifier = {                                                                                                    // 55
        $set: {                                                                                                       // 55
          'rawat.$.billRegis': state                                                                                  // 55
        }                                                                                                             // 55
      };                                                                                                              // 55
      return coll.pasien.update(selector, modifier);                                                                  // 103
    },                                                                                                                // 13
    bayar: function (no_mr, idbayar) {                                                                                // 58
      var modifier, selector;                                                                                         // 59
      selector = {                                                                                                    // 59
        'rawat.idbayar': idbayar,                                                                                     // 59
        no_mr: parseInt(no_mr)                                                                                        // 59
      };                                                                                                              // 59
      modifier = {                                                                                                    // 60
        'rawat.$.status_bayar': true                                                                                  // 60
      };                                                                                                              // 60
      return coll.pasien.update(selector, {                                                                           // 114
        $set: modifier                                                                                                // 61
      });                                                                                                             // 61
    },                                                                                                                // 13
    request: function (no_mr, idbayar, jenis, idjenis, hasil) {                                                       // 63
      var filtered, findPasien, findStock, give, i, j, k, key, len, len1, len2, len3, m, modifier, n, o, p, q, ref, ref1, ref2, ref3, ref4, selector, sortedEd, sortedIn;
      selector = {                                                                                                    // 64
        no_mr: parseInt(no_mr)                                                                                        // 64
      };                                                                                                              // 64
      findPasien = coll.pasien.findOne(selector);                                                                     // 65
      ref = findPasien.rawat;                                                                                         // 66
                                                                                                                      //
      for (m = 0, len = ref.length; m < len; m++) {                                                                   // 66
        i = ref[m];                                                                                                   // 126
                                                                                                                      //
        if (i.idbayar === idbayar) {                                                                                  // 67
          if (i[jenis]) {                                                                                             // 67
            ref1 = i[jenis];                                                                                          // 67
                                                                                                                      //
            for (n = 0, len1 = ref1.length; n < len1; n++) {                                                          // 67
              j = ref1[n];                                                                                            // 131
                                                                                                                      //
              if (j['id' + jenis] === idjenis) {                                                                      // 68
                j.hasil = hasil;                                                                                      // 68
              }                                                                                                       // 134
            }                                                                                                         // 67
          }                                                                                                           // 67
        }                                                                                                             // 137
      }                                                                                                               // 66
                                                                                                                      //
      modifier = {                                                                                                    // 69
        rawat: findPasien.rawat                                                                                       // 69
      };                                                                                                              // 69
      coll.pasien.update(selector, {                                                                                  // 70
        $set: modifier                                                                                                // 70
      });                                                                                                             // 70
      give = {};                                                                                                      // 71
                                                                                                                      //
      if (jenis === 'obat') {                                                                                         // 72
        ref2 = findPasien.rawat;                                                                                      // 72
                                                                                                                      //
        for (o = 0, len2 = ref2.length; o < len2; o++) {                                                              // 72
          i = ref2[o];                                                                                                // 149
                                                                                                                      //
          if (i.idbayar === idbayar) {                                                                                // 73
            if (i.obat) {                                                                                             // 73
              ref3 = i.obat;                                                                                          // 73
                                                                                                                      //
              for (p = 0, len3 = ref3.length; p < len3; p++) {                                                        // 73
                j = ref3[p];                                                                                          // 154
                                                                                                                      //
                if (j.idobat === idjenis) {                                                                           // 74
                  findStock = coll.gudang.findOne({                                                                   // 75
                    _id: j.nama                                                                                       // 75
                  });                                                                                                 // 75
                                                                                                                      //
                  for (k = q = 1, ref4 = j.jumlah; 1 <= ref4 ? q <= ref4 : q >= ref4; k = 1 <= ref4 ? ++q : --q) {    // 76
                    filtered = _.filter(findStock.batch, function (l) {                                               // 77
                      return l.diapotik > 0;                                                                          // 161
                    });                                                                                               // 77
                    sortedIn = _.sortBy(filtered, function (l) {                                                      // 78
                      return new Date(l.masuk).getTime();                                                             // 164
                    });                                                                                               // 78
                    sortedEd = _.sortBy(sortedIn, function (l) {                                                      // 79
                      return new Date(l.kadaluarsa).getTime();                                                        // 167
                    });                                                                                               // 79
                    sortedEd[0].diapotik -= 1;                                                                        // 80
                    key = findStock.nama(+';' + sortedEd[0].nobatch);                                                 // 81
                    give[key] || (give[key] = 0);                                                                     // 82
                    give[key] += 1;                                                                                   // 82
                  }                                                                                                   // 76
                                                                                                                      //
                  selector = {                                                                                        // 83
                    _id: findStock._id                                                                                // 83
                  };                                                                                                  // 83
                  modifier = {                                                                                        // 84
                    $set: {                                                                                           // 84
                      batch: findStock.batch                                                                          // 84
                    }                                                                                                 // 84
                  };                                                                                                  // 84
                  coll.gudang.update(selector, modifier);                                                             // 85
                }                                                                                                     // 183
              }                                                                                                       // 73
            }                                                                                                         // 73
          }                                                                                                           // 186
        }                                                                                                             // 72
      }                                                                                                               // 188
                                                                                                                      //
      if (jenis === 'obat') {                                                                                         // 86
        return give;                                                                                                  // 190
      }                                                                                                               // 191
    },                                                                                                                // 13
    transfer: function (idbarang, idbatch, amount) {                                                                  // 88
      var modifier, selector;                                                                                         // 89
      selector = {                                                                                                    // 89
        idbarang: idbarang,                                                                                           // 89
        'batch.idbatch': idbatch                                                                                      // 89
      };                                                                                                              // 89
      modifier = {                                                                                                    // 90
        $inc: {                                                                                                       // 90
          'batch.$.digudang': -amount,                                                                                // 90
          'batch.$.diapotik': amount                                                                                  // 90
        }                                                                                                             // 90
      };                                                                                                              // 90
      return coll.gudang.update(selector, modifier);                                                                  // 205
    },                                                                                                                // 13
    rmPasien: function (no_mr) {                                                                                      // 93
      return coll.pasien.remove({                                                                                     // 208
        no_mr: parseInt(no_mr)                                                                                        // 94
      });                                                                                                             // 94
    },                                                                                                                // 13
    rmRawat: function (no_mr, idbayar) {                                                                              // 96
      var modifier, selector;                                                                                         // 97
      selector = {                                                                                                    // 97
        no_mr: parseInt(no_mr)                                                                                        // 97
      };                                                                                                              // 97
      modifier = {                                                                                                    // 98
        $pull: {                                                                                                      // 98
          rawat: {                                                                                                    // 98
            idbayar: idbayar                                                                                          // 98
          }                                                                                                           // 98
        }                                                                                                             // 98
      };                                                                                                              // 98
      return coll.pasien.update(selector, modifier);                                                                  // 224
    },                                                                                                                // 13
    addRole: function (id, roles, group, poli) {                                                                      // 101
      var role;                                                                                                       // 102
      role = poli || roles;                                                                                           // 102
      return Roles.addUsersToRoles(id, role, group);                                                                  // 229
    },                                                                                                                // 13
    rmRole: function (id) {                                                                                           // 105
      var modifier, selector;                                                                                         // 106
      selector = {                                                                                                    // 106
        _id: id                                                                                                       // 106
      };                                                                                                              // 106
      modifier = {                                                                                                    // 107
        $set: {                                                                                                       // 107
          roles: {}                                                                                                   // 107
        }                                                                                                             // 107
      };                                                                                                              // 107
      return Meteor.users.update(selector, modifier);                                                                 // 241
    },                                                                                                                // 13
    newUser: function (doc) {                                                                                         // 110
      var find;                                                                                                       // 111
      find = Accounts.findUserByUsername(doc.username);                                                               // 111
                                                                                                                      //
      if (find) {                                                                                                     // 112
        Accounts.setUsername(find._id, doc.username);                                                                 // 113
        return Accounts.setPassword(find._id, doc.password);                                                          // 248
      } else {                                                                                                        // 112
        return Accounts.createUser(doc);                                                                              // 250
      }                                                                                                               // 251
    },                                                                                                                // 13
    rmBarang: function (idbarang) {                                                                                   // 118
      return coll.gudang.remove({                                                                                     // 254
        idbarang: idbarang                                                                                            // 119
      });                                                                                                             // 119
    },                                                                                                                // 13
    inactive: function (name, id) {                                                                                   // 121
      var mod, sel;                                                                                                   // 122
      sel = {                                                                                                         // 122
        _id: id                                                                                                       // 122
      };                                                                                                              // 122
      mod = {                                                                                                         // 122
        $set: {                                                                                                       // 122
          active: false                                                                                               // 122
        }                                                                                                             // 122
      };                                                                                                              // 122
      return coll[name].update(sel, mod);                                                                             // 268
    },                                                                                                                // 13
    pindah: function (no_mr) {                                                                                        // 125
      var find, last, modifier, ref, selector;                                                                        // 126
      find = coll.pasien.findOne({                                                                                    // 126
        'no_mr': parseInt(no_mr)                                                                                      // 126
      });                                                                                                             // 126
      ref = find.rawat, last = ref[ref.length - 1];                                                                   // 127
                                                                                                                      //
      if (last.pindah) {                                                                                              // 128
        selector = {                                                                                                  // 129
          _id: find._id                                                                                               // 129
        };                                                                                                            // 129
        modifier = {                                                                                                  // 130
          $push: {                                                                                                    // 130
            rawat: {                                                                                                  // 130
              idbayar: randomId(),                                                                                    // 131
              tanggal: new Date(),                                                                                    // 132
              cara_bayar: last.cara_bayar,                                                                            // 133
              klinik: last.pindah,                                                                                    // 134
              billRegis: true,                                                                                        // 135
              total: {                                                                                                // 136
                semua: 0                                                                                              // 136
              }                                                                                                       // 136
            }                                                                                                         // 131
          }                                                                                                           // 130
        };                                                                                                            // 130
        return coll.pasien.update(selector, modifier);                                                                // 294
      }                                                                                                               // 295
    },                                                                                                                // 13
    report: function (jenis, start, end) {                                                                            // 139
      var docs, filter;                                                                                               // 140
                                                                                                                      //
      filter = function (arr) {                                                                                       // 140
        return _.filter(arr, function (i) {                                                                           // 300
          var ref;                                                                                                    // 141
          return new Date(start) < (ref = new Date(i.tanggal)) && ref < new Date(end);                                // 302
        });                                                                                                           // 140
      };                                                                                                              // 140
                                                                                                                      //
      docs = _.flatMap(coll.pasien.find().fetch(), function (i) {                                                     // 142
        return _.map(filter(i.rawat), function (j) {                                                                  // 306
          var obj;                                                                                                    // 143
          obj = {                                                                                                     // 143
            no_mr: i.no_mr,                                                                                           // 144
            nama_lengkap: _.startCase(i.regis.nama_lengkap),                                                          // 145
            tanggal: j.tanggal,                                                                                       // 146
            no_bill: j.nobill,                                                                                        // 147
            cara_bayar: look('cara_bayar', j.cara_bayar).label,                                                       // 148
            rujukan: j.rujukan ? look('rujukan', j.rujukan).label : '',                                               // 149
            klinik: look('klinik', j.klinik).label,                                                                   // 150
            diagnosa: j.diagnosa || '-',                                                                              // 151
            tindakan: _.flatMap(['tindakan', 'labor', 'radio'], function (k) {                                        // 152
              var saring;                                                                                             // 153
              saring = _.filter(j[k], function (l) {                                                                  // 153
                return l;                                                                                             // 320
              });                                                                                                     // 153
              return _.map(saring, function (l) {                                                                     // 322
                return '/' + _.startCase(look2('tarif', l.nama).nama);                                                // 323
              });                                                                                                     // 154
            }),                                                                                                       // 152
            harga: 'Rp ' + j.total.semua,                                                                             // 155
            petugas: Meteor.users.findOne({                                                                           // 156
              _id: j.petugas                                                                                          // 156
            }).username,                                                                                              // 156
            keluar: j.keluar ? look('keluar', j.keluar).label : '-',                                                  // 157
            baru_lama: i.rawat.length > 0 ? 'Lama' : 'Baru'                                                           // 158
          };                                                                                                          // 144
                                                                                                                      //
          if (jenis === 'pendaftaran') {                                                                              // 159
            return _.pick(obj, ['tanggal', 'no_mr', 'nama_lengkap', 'cara_bayar', 'rujukan', 'klinik', 'baru_lama']);
          } else if (jenis === 'pembayaran') {                                                                        // 159
            return _.pick(obj, ['tanggal', 'no_bill', 'no_mr', 'nama_lengkap', 'klinik', 'diagnosa', 'tindakan', 'harga', 'petugas']);
          } else if (jenis === 'rawat_jalan') {                                                                       // 161
            return _.pick(obj, ['tanggal', 'no_mr', 'nama_lengkap', 'kelamin', 'umur', 'cara_bayar', 'diagnosa', 'tindakan', 'petugas', 'keluar', 'rujukan']);
          }                                                                                                           // 339
        });                                                                                                           // 142
      });                                                                                                             // 142
      return {                                                                                                        // 342
        headers: _.map(_.keys(docs[0]), function (i) {                                                                // 165
          return _.startCase(i);                                                                                      // 344
        }),                                                                                                           // 165
        rows: _.map(docs, function (i) {                                                                              // 166
          return _.values(i);                                                                                         // 347
        }),                                                                                                           // 166
        csv: docs                                                                                                     // 167
      };                                                                                                              // 165
    },                                                                                                                // 13
    patientExist: function (no_mr) {                                                                                  // 169
      if (coll.pasien.findOne({                                                                                       // 170
        no_mr: parseInt(no_mr)                                                                                        // 170
      })) {                                                                                                           // 170
        return true;                                                                                                  // 356
      }                                                                                                               // 357
    }                                                                                                                 // 13
  });                                                                                                                 // 13
}                                                                                                                     // 360
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
