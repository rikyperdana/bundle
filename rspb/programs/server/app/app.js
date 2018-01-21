var require = meteorInstall({"folder":{"hooks.coffee.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// folder/hooks.coffee.js                                                                                            //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var closeForm, currentPar, currentRoute;                                                                             // 1
                                                                                                                     //
if (Meteor.isClient) {                                                                                               // 1
  currentRoute = function () {                                                                                       // 4
    return Router.current().route.getName();                                                                         // 5
  };                                                                                                                 // 4
                                                                                                                     //
  currentPar = function (param) {                                                                                    // 5
    return Router.current().params[param];                                                                           // 8
  };                                                                                                                 // 5
                                                                                                                     //
  this.randomId = function () {                                                                                      // 6
    return Math.random().toString(36).slice(2);                                                                      // 11
  };                                                                                                                 // 6
                                                                                                                     //
  this.modForm = function (doc, idbayar) {                                                                           // 8
    var begin, i, l, len, ref, stop, total;                                                                          // 8
                                                                                                                     //
    if (currentRoute() === 'jalan') {                                                                                // 8
      doc.tanggal = new Date();                                                                                      // 9
      doc.idbayar = idbayar ? idbayar : randomId();                                                                  // 10
      doc.jenis = currentRoute();                                                                                    // 11
      total = {                                                                                                      // 12
        tindakan: 0,                                                                                                 // 12
        labor: 0,                                                                                                    // 12
        radio: 0,                                                                                                    // 12
        obat: 0                                                                                                      // 12
      };                                                                                                             // 12
                                                                                                                     //
      _.map(['tindakan', 'labor', 'radio'], function (i) {                                                           // 13
        var find, j, l, len, ref, results;                                                                           // 14
                                                                                                                     //
        if (doc[i]) {                                                                                                // 14
          ref = doc[i];                                                                                              // 14
          results = [];                                                                                              // 14
                                                                                                                     //
          for (l = 0, len = ref.length; l < len; l++) {                                                              // 30
            j = ref[l];                                                                                              // 31
            j['id' + i] = randomId();                                                                                // 15
            find = _.find(coll.tarif.find().fetch(), function (k) {                                                  // 16
              return k._id === j.nama;                                                                               // 34
            });                                                                                                      // 16
            j.harga = find.harga;                                                                                    // 17
            results.push(total[i] += j.harga);                                                                       // 37
          }                                                                                                          // 14
                                                                                                                     //
          return results;                                                                                            // 39
        }                                                                                                            // 40
      });                                                                                                            // 13
                                                                                                                     //
      if (doc.obat) {                                                                                                // 19
        ref = doc.obat;                                                                                              // 19
                                                                                                                     //
        for (l = 0, len = ref.length; l < len; l++) {                                                                // 19
          i = ref[l];                                                                                                // 45
          i.idobat = randomId();                                                                                     // 19
        }                                                                                                            // 19
      }                                                                                                              // 48
                                                                                                                     //
      doc.total = {                                                                                                  // 20
        tindakan: total.tindakan,                                                                                    // 21
        labor: total.labor,                                                                                          // 22
        radio: total.radio                                                                                           // 23
      };                                                                                                             // 21
      doc.total.semua = doc.total.tindakan + doc.total.labor + doc.total.radio;                                      // 24
                                                                                                                     //
      if (doc.total.semua > 0 || doc.cara_bayar !== 1) {                                                             // 25
        doc.billRegis = true;                                                                                        // 25
      }                                                                                                              // 57
                                                                                                                     //
      if (doc.total.semua > 0 && doc.cara_bayar !== 1) {                                                             // 26
        doc.status_bayar = true;                                                                                     // 26
      }                                                                                                              // 60
                                                                                                                     //
      if (doc.obat && 0 === doc.total.semua) {                                                                       // 27
        doc.billRegis = true;                                                                                        // 28
        doc.status_bayar = true;                                                                                     // 29
      }                                                                                                              // 64
                                                                                                                     //
      begin = Session.get('begin');                                                                                  // 30
      stop = moment();                                                                                               // 30
      doc.spm = stop.diff(begin, 'minutes');                                                                         // 31
      doc.petugas = Meteor.userId();                                                                                 // 32
      doc.nobill = parseInt(_.toString(Date.now()).substr(7, 13));                                                   // 33
      return doc;                                                                                                    // 70
    }                                                                                                                // 71
  };                                                                                                                 // 8
                                                                                                                     //
  closeForm = function () {                                                                                          // 36
    return _.map(['showForm', 'formDoc'], function (i) {                                                             // 74
      return Session.get(i, null);                                                                                   // 75
    });                                                                                                              // 37
  };                                                                                                                 // 36
                                                                                                                     //
  AutoForm.addHooks('formPasien', {                                                                                  // 40
    before: {                                                                                                        // 41
      'update-pushArray': function (doc) {                                                                           // 42
        var formDoc;                                                                                                 // 43
        formDoc = Session.get('formDoc');                                                                            // 43
                                                                                                                     //
        if (formDoc) {                                                                                               // 44
          Meteor.call('rmRawat', currentPar('no_mr'), formDoc.idbayar);                                              // 44
        }                                                                                                            // 85
                                                                                                                     //
        return this.result(modForm(doc));                                                                            // 86
      }                                                                                                              // 42
    },                                                                                                               // 42
    after: {                                                                                                         // 46
      insert: function () {                                                                                          // 47
        return closeForm();                                                                                          // 91
      },                                                                                                             // 47
      'update-pushArray': function (err, res) {                                                                      // 48
        closeForm();                                                                                                 // 49
                                                                                                                     //
        if (res) {                                                                                                   // 50
          return Meteor.call('pindah', currentPar('no_mr'));                                                         // 96
        }                                                                                                            // 97
      }                                                                                                              // 47
    },                                                                                                               // 47
    formToDoc: function (doc) {                                                                                      // 51
      Session.set('preview', modForm(doc));                                                                          // 52
      return doc;                                                                                                    // 102
    }                                                                                                                // 41
  });                                                                                                                // 41
  AutoForm.addHooks('formGudang', {                                                                                  // 55
    before: {                                                                                                        // 56
      insert: function (doc) {                                                                                       // 57
        doc.idbarang = randomId();                                                                                   // 58
        doc.batch[0].idbatch = randomId();                                                                           // 59
        return this.result(doc);                                                                                     // 110
      },                                                                                                             // 57
      'update-pushArray': function (doc) {                                                                           // 61
        doc.idbatch = randomId();                                                                                    // 62
        return this.result(doc);                                                                                     // 114
      }                                                                                                              // 57
    }                                                                                                                // 57
  });                                                                                                                // 56
}                                                                                                                    // 118
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
var look;                                                                                                            // 1
                                                                                                                     //
if (Meteor.isClient) {                                                                                               // 1
  look = function (list, val) {                                                                                      // 3
    return _.find(selects[list], function (i) {                                                                      // 5
      return i.value === val;                                                                                        // 6
    });                                                                                                              // 3
  };                                                                                                                 // 3
                                                                                                                     //
  this.makePdf = {                                                                                                   // 4
    card: function () {                                                                                              // 5
      var doc, pdf;                                                                                                  // 6
      doc = coll.pasien.findOne();                                                                                   // 6
      pdf = pdfMake.createPdf({                                                                                      // 7
        content: ['Nama: ' + doc.regis.nama_lengkap, 'No. MR: ' + doc.no_mr],                                        // 8
        pageSize: 'B8',                                                                                              // 12
        pageMargins: [110, 50, 0, 0],                                                                                // 13
        pageOrientation: 'landscape'                                                                                 // 14
      });                                                                                                            // 8
      return pdf.download(doc.no_mr + '_card.pdf');                                                                  // 19
    },                                                                                                               // 5
    consent: function () {                                                                                           // 16
      var doc, pdf;                                                                                                  // 17
      doc = coll.pasien.findOne();                                                                                   // 17
      pdf = pdfMake.createPdf({                                                                                      // 18
        content: [{                                                                                                  // 19
          text: 'PEMERINTAH PROVINSI RIAU\nRUMAH SAKIT UMUM DAERAH PETALA BUMI\nJL. Dr. Soetomo No. 65, Telp. (0761) 23024',
          alignment: 'center'                                                                                        // 20
        }, '\nDATA UMUM PASIEN', '\nNAMA LENGKAP : ' + doc.regis.nama_lengkap, 'TEMPAT & TANGGAL LAHIR : ' + doc.regis.tmpt_lahir + ', tanggal ' + moment(doc.regis.tgl_lahir).format('D/MMMM/YYYY'), 'GOLONGAN DARAH : ' + look('darah', doc.regis.darah).label, 'JENIS KELAMIN : ' + look('kelamin', doc.regis.kelamin).label, 'AGAMA : ' + look('agama', doc.regis.agama).label, 'PENDIDIKAN : ' + look('pendidikan', doc.regis.pendidikan).label, 'PEKERJAAN : ' + look('pekerjaan', doc.regis.pekerjaan).label, 'NAMA AYAH : ' + doc.regis.ayah, 'NAMA IBU : ' + doc.regis.ibu, 'NAMA SUAMI/ISTRI : ' + doc.regis.pasangan, 'ALAMAT : ' + doc.regis.alamat, 'NO. TELP / HP : ' + doc.regis.kontak, '\nPERSETUJUAN UMUM (GENERAL CONSENT)', '\nSaya akan mentaati peraturan yang berlaku di RSUD Petala Bumi', 'Saya memberi kuasa kepada dokter dan semua tenaga kesehatan untuk melakukan pemeriksaan / pengobatan / tindakan yang diperlakukan upaya kesembuhan saya / pasien tersebut diatas', 'Saya memberi kuasa kepada dokter dan semua tenaga kesehatan yang ikut merawat saya untuk memberikan keterangan medis saya kepada yang bertanggung jawab atas biaya perawatan saya.', 'Saya memberi kuasa kepada RSUD Petala Bumi untuk menginformasikan identitas sosial saya kepada keluarga / rekan / masyarakat', 'Saya mengatakan bahwa informasi hasil pemeriksaan / rekam medis saya dapat digunakan untuk pendidikan / penelitian demi kemajuan ilmu kesehatan', '\nPetunjuk :', 'S: Setuju', 'TS: Tidak Setuju', {
          text: 'Pekanbaru,                        .\n\n\n__________________',                                       // 43
          alignment: 'right'                                                                                         // 43
        }]                                                                                                           // 43
      });                                                                                                            // 19
      return pdf.download(doc.no_mr + '_consent.pdf');                                                               // 35
    },                                                                                                               // 5
    payRawat: function (doc) {                                                                                       // 46
      var find, i, j, l, len, len1, m, pasien, pdf, ref, ref1, rows, table;                                          // 47
      pasien = coll.pasien.findOne();                                                                                // 47
      rows = [['Uraian', 'Harga']];                                                                                  // 48
      ref = ['tindakan', 'labor', 'radio'];                                                                          // 49
                                                                                                                     //
      for (l = 0, len = ref.length; l < len; l++) {                                                                  // 49
        i = ref[l];                                                                                                  // 43
                                                                                                                     //
        if (doc[i]) {                                                                                                // 50
          ref1 = doc[i];                                                                                             // 50
                                                                                                                     //
          for (m = 0, len1 = ref1.length; m < len1; m++) {                                                           // 50
            j = ref1[m];                                                                                             // 47
            find = _.find(coll.tarif.find().fetch(), function (k) {                                                  // 51
              return k._id === j.nama;                                                                               // 49
            });                                                                                                      // 51
            rows.push([_.startCase(find.nama), _.toString(j.harga)]);                                                // 52
          }                                                                                                          // 50
        }                                                                                                            // 53
      }                                                                                                              // 49
                                                                                                                     //
      table = {                                                                                                      // 53
        table: {                                                                                                     // 53
          widths: [400, 100],                                                                                        // 53
          body: rows                                                                                                 // 53
        }                                                                                                            // 53
      };                                                                                                             // 53
      pdf = pdfMake.createPdf({                                                                                      // 54
        content: [{                                                                                                  // 55
          text: 'PEMERINTAH PROVINSI RIAU\nRUMAH SAKIT UMUM DAERAH PETALA BUMI\nJL. DR. SOETOMO NO. 65, TELP. (0761) 23024, PEKANBARU',
          alignment: 'center'                                                                                        // 56
        }, '\nRINCIAN BIAYA RAWAT JALAN', 'IDENTITAS PASIEN', 'NO. MR' + pasien.no_mr, 'NAMA PASIEN' + pasien.regis.nama_lengkap, 'JENIS KELAMIN' + look('kelamin', pasien.regis.kelamin).label, 'TANGGAL LAHIR' + moment(pasien.regis.tgl_lahir).format('D MM YYYY'), 'UMUR' + _.toString(moment().diff(pasien.regis.tgl_lahir, 'years')), 'KLINIK', '\n\nRINCIAN PEMBAYARAN', table, 'TOTAL BIAYA' + 'Rp ' + _.toString(numeral(doc.total.semua).format('0,0')), '\nPEKANBARU, ' + moment().format('DD MM YYYY'), 'PETUGAS']
      });                                                                                                            // 55
      return pdf.download(pasien.no_mr + '_payRawat.pdf');                                                           // 69
    },                                                                                                               // 5
    payRegCard: function (amount, words) {                                                                           // 72
      var doc, pdf;                                                                                                  // 73
      doc = coll.pasien.findOne();                                                                                   // 73
      pdf = pdfMake.createPdf({                                                                                      // 74
        content: [{                                                                                                  // 75
          text: 'PEMERINTAH PROVINSI RIAU\nRUMAH SAKIT UMUM DAERAH PETALA BUMI\nJL. DR. SOETOMO NO. 65, TELP. (0761) 23024, PEKANBARU',
          alignment: 'center'                                                                                        // 76
        }, '\nKARCIS', 'TANGGAL : ' + moment().format('DD MM YYYY'), 'NO. MR : ' + _.toString(doc.no_mr), 'NAMA PASIEN : ' + doc.regis.nama_lengkap, '\nTARIF : Rp ' + _.toString(amount), {
          text: '(' + words + ')',                                                                                   // 84
          italics: true                                                                                              // 84
        }]                                                                                                           // 84
      });                                                                                                            // 75
      return pdf.download(doc.no_mr + '_payRegCard.pdf');                                                            // 85
    },                                                                                                               // 5
    rekap: function (rows) {                                                                                         // 87
      var pdf, strings;                                                                                              // 88
      strings = _.map(rows, function (i) {                                                                           // 88
        return _.map(i, function (j) {                                                                               // 90
          return _.toString(j);                                                                                      // 91
        });                                                                                                          // 88
      });                                                                                                            // 88
      pdf = pdfMake.createPdf({                                                                                      // 89
        content: [{                                                                                                  // 89
          table: {                                                                                                   // 89
            body: strings                                                                                            // 89
          }                                                                                                          // 89
        }]                                                                                                           // 89
      });                                                                                                            // 89
      return pdf.download('rekap.pdf');                                                                              // 103
    }                                                                                                                // 5
  };                                                                                                                 // 5
}                                                                                                                    // 106
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
var i, j, k, l, len, len1, len2, makeGudang, makeOther, makePasien, randomId, ref, ref1, ref2;                       // 1
this._ = lodash;                                                                                                     // 1
Router.configure({                                                                                                   // 3
  layoutTemplate: 'layout',                                                                                          // 4
  loadingTemplate: 'loading'                                                                                         // 5
});                                                                                                                  // 4
Router.route('/', {                                                                                                  // 7
  action: function () {                                                                                              // 8
    return this.render('home');                                                                                      // 12
  }                                                                                                                  // 8
});                                                                                                                  // 8
this.coll = {};                                                                                                      // 10
this.schema = {};                                                                                                    // 11
                                                                                                                     //
randomId = function () {                                                                                             // 13
  return Math.random().toString(36).slice(2);                                                                        // 21
};                                                                                                                   // 13
                                                                                                                     //
schema.regis = {                                                                                                     // 15
  no_mr: {                                                                                                           // 16
    type: Number                                                                                                     // 16
  },                                                                                                                 // 16
  regis: {                                                                                                           // 17
    type: Object                                                                                                     // 17
  },                                                                                                                 // 17
  'regis.nama_lengkap': {                                                                                            // 18
    type: String                                                                                                     // 18
  },                                                                                                                 // 18
  'regis.tgl_lahir': {                                                                                               // 19
    type: Date,                                                                                                      // 19
    autoform: {                                                                                                      // 19
      type: 'pickadate',                                                                                             // 19
      pickadateOptions: {                                                                                            // 19
        selectYears: 150,                                                                                            // 19
        selectMonths: true                                                                                           // 19
      }                                                                                                              // 19
    }                                                                                                                // 19
  },                                                                                                                 // 19
  'regis.tmpt_lahir': {                                                                                              // 20
    type: String,                                                                                                    // 20
    optional: true                                                                                                   // 20
  },                                                                                                                 // 20
  'regis.cara_bayar': {                                                                                              // 21
    type: Number,                                                                                                    // 21
    autoform: {                                                                                                      // 21
      options: selects.cara_bayar,                                                                                   // 21
      type: 'select-radio-inline'                                                                                    // 21
    }                                                                                                                // 21
  },                                                                                                                 // 21
  'regis.kelamin': {                                                                                                 // 22
    type: Number,                                                                                                    // 22
    autoform: {                                                                                                      // 22
      options: selects.kelamin,                                                                                      // 22
      type: 'select-radio-inline'                                                                                    // 22
    }                                                                                                                // 22
  },                                                                                                                 // 22
  'regis.agama': {                                                                                                   // 23
    type: Number,                                                                                                    // 23
    autoform: {                                                                                                      // 23
      options: selects.agama,                                                                                        // 23
      type: 'select-radio-inline'                                                                                    // 23
    }                                                                                                                // 23
  },                                                                                                                 // 23
  'regis.nikah': {                                                                                                   // 24
    type: Number,                                                                                                    // 24
    autoform: {                                                                                                      // 24
      options: selects.nikah,                                                                                        // 24
      type: 'select-radio-inline'                                                                                    // 24
    }                                                                                                                // 24
  },                                                                                                                 // 24
  'regis.pendidikan': {                                                                                              // 25
    type: Number,                                                                                                    // 25
    optional: true,                                                                                                  // 25
    autoform: {                                                                                                      // 25
      options: selects.pendidikan,                                                                                   // 25
      type: 'select-radio-inline'                                                                                    // 25
    }                                                                                                                // 25
  },                                                                                                                 // 25
  'regis.darah': {                                                                                                   // 26
    type: Number,                                                                                                    // 26
    optional: true,                                                                                                  // 26
    autoform: {                                                                                                      // 26
      options: selects.darah,                                                                                        // 26
      type: 'select-radio-inline'                                                                                    // 26
    }                                                                                                                // 26
  },                                                                                                                 // 26
  'regis.pekerjaan': {                                                                                               // 27
    type: Number,                                                                                                    // 27
    optional: true,                                                                                                  // 27
    autoform: {                                                                                                      // 27
      options: selects.pekerjaan,                                                                                    // 27
      type: 'select-radio-inline'                                                                                    // 27
    }                                                                                                                // 27
  },                                                                                                                 // 27
  'regis.kabupaten': {                                                                                               // 28
    type: String,                                                                                                    // 28
    optional: true                                                                                                   // 28
  },                                                                                                                 // 28
  'regis.kecamatan': {                                                                                               // 29
    type: String,                                                                                                    // 29
    optional: true                                                                                                   // 29
  },                                                                                                                 // 29
  'regis.kelurahan': {                                                                                               // 30
    type: String,                                                                                                    // 30
    optional: true                                                                                                   // 30
  },                                                                                                                 // 30
  'regis.alamat': {                                                                                                  // 31
    type: String                                                                                                     // 31
  },                                                                                                                 // 31
  'regis.kontak': {                                                                                                  // 32
    type: String,                                                                                                    // 32
    optional: true                                                                                                   // 32
  },                                                                                                                 // 32
  'regis.ayah': {                                                                                                    // 33
    type: String,                                                                                                    // 33
    optional: true                                                                                                   // 33
  },                                                                                                                 // 33
  'regis.ibu': {                                                                                                     // 34
    type: String,                                                                                                    // 34
    optional: true                                                                                                   // 34
  },                                                                                                                 // 34
  'regis.pasangan': {                                                                                                // 35
    type: String,                                                                                                    // 35
    optional: true                                                                                                   // 35
  },                                                                                                                 // 35
  'regis.petugas': {                                                                                                 // 36
    type: String,                                                                                                    // 37
    autoform: {                                                                                                      // 38
      type: 'hidden'                                                                                                 // 38
    },                                                                                                               // 38
    autoValue: function () {                                                                                         // 39
      if (Meteor.isClient) {                                                                                         // 39
        return Meteor.userId();                                                                                      // 138
      }                                                                                                              // 139
    }                                                                                                                // 37
  },                                                                                                                 // 37
  'regis.date': {                                                                                                    // 40
    type: Date,                                                                                                      // 41
    autoform: {                                                                                                      // 42
      type: 'hidden'                                                                                                 // 42
    },                                                                                                               // 42
    autoValue: function () {                                                                                         // 43
      return new Date();                                                                                             // 148
    }                                                                                                                // 41
  },                                                                                                                 // 41
  'regis.billCard': {                                                                                                // 44
    type: Boolean,                                                                                                   // 44
    optional: true,                                                                                                  // 44
    autoform: {                                                                                                      // 44
      type: 'hidden'                                                                                                 // 44
    }                                                                                                                // 44
  }                                                                                                                  // 44
};                                                                                                                   // 16
schema.tindakan = {                                                                                                  // 46
  idtindakan: {                                                                                                      // 47
    type: String,                                                                                                    // 47
    optional: true,                                                                                                  // 47
    autoform: {                                                                                                      // 47
      type: 'hidden'                                                                                                 // 47
    }                                                                                                                // 47
  },                                                                                                                 // 47
  nama: {                                                                                                            // 48
    type: String,                                                                                                    // 48
    autoform: {                                                                                                      // 48
      options: selects.tindakan                                                                                      // 48
    }                                                                                                                // 48
  },                                                                                                                 // 48
  dokter: {                                                                                                          // 49
    type: String,                                                                                                    // 49
    autoform: {                                                                                                      // 49
      options: selects.dokter                                                                                        // 49
    }                                                                                                                // 49
  },                                                                                                                 // 49
  harga: {                                                                                                           // 50
    type: Number,                                                                                                    // 50
    optional: true,                                                                                                  // 50
    autoform: {                                                                                                      // 50
      type: 'hidden'                                                                                                 // 50
    }                                                                                                                // 50
  }                                                                                                                  // 50
};                                                                                                                   // 47
schema.labor = {                                                                                                     // 52
  idlabor: {                                                                                                         // 53
    type: String,                                                                                                    // 53
    optional: true,                                                                                                  // 53
    autoform: {                                                                                                      // 53
      type: 'hidden'                                                                                                 // 53
    }                                                                                                                // 53
  },                                                                                                                 // 53
  nama: {                                                                                                            // 54
    type: String,                                                                                                    // 54
    autoform: {                                                                                                      // 54
      options: selects.labor                                                                                         // 54
    }                                                                                                                // 54
  },                                                                                                                 // 54
  harga: {                                                                                                           // 55
    type: Number,                                                                                                    // 55
    optional: true,                                                                                                  // 55
    autoform: {                                                                                                      // 55
      type: 'hidden'                                                                                                 // 55
    }                                                                                                                // 55
  },                                                                                                                 // 55
  hasil: {                                                                                                           // 56
    type: String,                                                                                                    // 56
    optional: true,                                                                                                  // 56
    autoform: {                                                                                                      // 56
      type: 'hidden'                                                                                                 // 56
    }                                                                                                                // 56
  }                                                                                                                  // 56
};                                                                                                                   // 53
schema.radio = {                                                                                                     // 58
  idradio: {                                                                                                         // 59
    type: String,                                                                                                    // 59
    optional: true,                                                                                                  // 59
    autoform: {                                                                                                      // 59
      type: 'hidden'                                                                                                 // 59
    }                                                                                                                // 59
  },                                                                                                                 // 59
  nama: {                                                                                                            // 60
    type: String,                                                                                                    // 60
    autoform: {                                                                                                      // 60
      options: selects.radio                                                                                         // 60
    }                                                                                                                // 60
  },                                                                                                                 // 60
  harga: {                                                                                                           // 61
    type: Number,                                                                                                    // 61
    optional: true,                                                                                                  // 61
    autoform: {                                                                                                      // 61
      type: 'hidden'                                                                                                 // 61
    }                                                                                                                // 61
  },                                                                                                                 // 61
  hasil: {                                                                                                           // 62
    type: String,                                                                                                    // 62
    optional: true,                                                                                                  // 62
    autoform: {                                                                                                      // 62
      type: 'hidden'                                                                                                 // 62
    }                                                                                                                // 62
  }                                                                                                                  // 62
};                                                                                                                   // 59
schema.obat = {                                                                                                      // 64
  idobat: {                                                                                                          // 65
    type: String,                                                                                                    // 65
    optional: true,                                                                                                  // 65
    autoform: {                                                                                                      // 65
      type: 'hidden'                                                                                                 // 65
    }                                                                                                                // 65
  },                                                                                                                 // 65
  nama: {                                                                                                            // 66
    type: String,                                                                                                    // 66
    autoform: {                                                                                                      // 66
      options: selects.obat                                                                                          // 66
    }                                                                                                                // 66
  },                                                                                                                 // 66
  puyer: {                                                                                                           // 67
    type: String,                                                                                                    // 67
    optional: true                                                                                                   // 67
  },                                                                                                                 // 67
  aturan: {                                                                                                          // 68
    type: Object                                                                                                     // 68
  },                                                                                                                 // 68
  'aturan.kali': {                                                                                                   // 69
    type: Number                                                                                                     // 69
  },                                                                                                                 // 69
  'aturan.dosis': {                                                                                                  // 70
    type: Number                                                                                                     // 70
  },                                                                                                                 // 70
  'aturan.bentuk': {                                                                                                 // 71
    type: Number,                                                                                                    // 71
    autoform: {                                                                                                      // 71
      options: selects.bentuk                                                                                        // 71
    }                                                                                                                // 71
  },                                                                                                                 // 71
  jumlah: {                                                                                                          // 72
    type: Number                                                                                                     // 72
  },                                                                                                                 // 72
  harga: {                                                                                                           // 73
    type: Number,                                                                                                    // 73
    optional: true,                                                                                                  // 73
    autoform: {                                                                                                      // 73
      type: 'hidden'                                                                                                 // 73
    }                                                                                                                // 73
  },                                                                                                                 // 73
  subtotal: {                                                                                                        // 74
    type: Number,                                                                                                    // 74
    optional: true,                                                                                                  // 74
    autoform: {                                                                                                      // 74
      type: 'hidden'                                                                                                 // 74
    }                                                                                                                // 74
  },                                                                                                                 // 74
  hasil: {                                                                                                           // 75
    type: String,                                                                                                    // 75
    optional: true,                                                                                                  // 75
    autoform: {                                                                                                      // 75
      type: 'hidden'                                                                                                 // 75
    }                                                                                                                // 75
  }                                                                                                                  // 75
};                                                                                                                   // 65
schema.rawat = {                                                                                                     // 77
  no_mr: {                                                                                                           // 78
    type: Number                                                                                                     // 78
  },                                                                                                                 // 78
  rawat: {                                                                                                           // 79
    type: Array                                                                                                      // 79
  },                                                                                                                 // 79
  'rawat.$': {                                                                                                       // 80
    type: Object                                                                                                     // 80
  },                                                                                                                 // 80
  'rawat.$.tanggal': {                                                                                               // 81
    type: Date,                                                                                                      // 81
    autoform: {                                                                                                      // 81
      type: 'hidden'                                                                                                 // 81
    }                                                                                                                // 81
  },                                                                                                                 // 81
  'rawat.$.idbayar': {                                                                                               // 82
    type: String,                                                                                                    // 82
    optional: true,                                                                                                  // 82
    autoform: {                                                                                                      // 82
      type: 'hidden'                                                                                                 // 82
    }                                                                                                                // 82
  },                                                                                                                 // 82
  'rawat.$.jenis': {                                                                                                 // 83
    type: String,                                                                                                    // 83
    optional: true,                                                                                                  // 83
    autoform: {                                                                                                      // 83
      type: 'hidden'                                                                                                 // 83
    }                                                                                                                // 83
  },                                                                                                                 // 83
  'rawat.$.cara_bayar': {                                                                                            // 84
    type: Number,                                                                                                    // 84
    autoform: {                                                                                                      // 84
      options: selects.cara_bayar,                                                                                   // 84
      type: 'select-radio-inline'                                                                                    // 84
    }                                                                                                                // 84
  },                                                                                                                 // 84
  'rawat.$.klinik': {                                                                                                // 85
    type: Number,                                                                                                    // 85
    autoform: {                                                                                                      // 85
      options: selects.klinik,                                                                                       // 85
      type: 'select-radio-inline'                                                                                    // 85
    }                                                                                                                // 85
  },                                                                                                                 // 85
  'rawat.$.billRegis': {                                                                                             // 86
    type: Boolean,                                                                                                   // 86
    optional: true,                                                                                                  // 86
    autoform: {                                                                                                      // 86
      type: 'hidden'                                                                                                 // 86
    }                                                                                                                // 86
  },                                                                                                                 // 86
  'rawat.$.nobill': {                                                                                                // 87
    type: Number,                                                                                                    // 87
    autoform: {                                                                                                      // 87
      type: 'hidden'                                                                                                 // 87
    }                                                                                                                // 87
  },                                                                                                                 // 87
  'rawat.$.status_bayar': {                                                                                          // 88
    type: Boolean,                                                                                                   // 88
    optional: true,                                                                                                  // 88
    autoform: {                                                                                                      // 88
      type: 'hidden'                                                                                                 // 88
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
  'rawat.$.anamesa': {                                                                                               // 90
    type: String,                                                                                                    // 90
    optional: true                                                                                                   // 90
  },                                                                                                                 // 90
  'rawat.$.diagnosa': {                                                                                              // 91
    type: String,                                                                                                    // 91
    optional: true                                                                                                   // 91
  },                                                                                                                 // 91
  'rawat.$.tindakan': {                                                                                              // 92
    type: [new SimpleSchema(schema.tindakan)],                                                                       // 92
    optional: true                                                                                                   // 92
  },                                                                                                                 // 92
  'rawat.$.labor': {                                                                                                 // 93
    type: [new SimpleSchema(schema.labor)],                                                                          // 93
    optional: true                                                                                                   // 93
  },                                                                                                                 // 93
  'rawat.$.radio': {                                                                                                 // 94
    type: [new SimpleSchema(schema.radio)],                                                                          // 94
    optional: true                                                                                                   // 94
  },                                                                                                                 // 94
  'rawat.$.obat': {                                                                                                  // 95
    type: [new SimpleSchema(schema.obat)],                                                                           // 95
    optional: true                                                                                                   // 95
  },                                                                                                                 // 95
  'rawat.$.total': {                                                                                                 // 96
    type: Object,                                                                                                    // 96
    optional: true,                                                                                                  // 96
    autoform: {                                                                                                      // 96
      type: 'hidden'                                                                                                 // 96
    }                                                                                                                // 96
  },                                                                                                                 // 96
  'rawat.$.total.tindakan': {                                                                                        // 97
    type: Number,                                                                                                    // 97
    optional: true                                                                                                   // 97
  },                                                                                                                 // 97
  'rawat.$.total.labor': {                                                                                           // 98
    type: Number,                                                                                                    // 98
    optional: true                                                                                                   // 98
  },                                                                                                                 // 98
  'rawat.$.total.radio': {                                                                                           // 99
    type: Number,                                                                                                    // 99
    optional: true                                                                                                   // 99
  },                                                                                                                 // 99
  'rawat.$.total.obat': {                                                                                            // 100
    type: Number,                                                                                                    // 100
    optional: true                                                                                                   // 100
  },                                                                                                                 // 100
  'rawat.$.total.semua': {                                                                                           // 101
    type: Number,                                                                                                    // 101
    optional: true                                                                                                   // 101
  },                                                                                                                 // 101
  'rawat.$.spm': {                                                                                                   // 102
    type: Number,                                                                                                    // 102
    optional: true,                                                                                                  // 102
    autoform: {                                                                                                      // 102
      type: 'hidden'                                                                                                 // 102
    }                                                                                                                // 102
  },                                                                                                                 // 102
  'rawat.$.pindah': {                                                                                                // 103
    type: Number,                                                                                                    // 103
    optional: true,                                                                                                  // 103
    autoform: {                                                                                                      // 103
      options: selects.klinik                                                                                        // 103
    }                                                                                                                // 103
  },                                                                                                                 // 103
  'rawat.$.keluar': {                                                                                                // 104
    type: Number,                                                                                                    // 104
    optional: true,                                                                                                  // 104
    autoform: {                                                                                                      // 104
      options: selects.keluar                                                                                        // 104
    }                                                                                                                // 104
  },                                                                                                                 // 104
  'rawat.$.petugas': {                                                                                               // 105
    type: String,                                                                                                    // 105
    autoform: {                                                                                                      // 105
      type: 'hidden'                                                                                                 // 105
    }                                                                                                                // 105
  }                                                                                                                  // 105
};                                                                                                                   // 78
schema.jalan = _.assign(schema.rawat, {});                                                                           // 107
schema.inap = _.assign(schema.rawat, {});                                                                            // 108
schema.igd = _.assign(schema.rawat, {});                                                                             // 109
schema.gudang = {                                                                                                    // 111
  idbarang: {                                                                                                        // 112
    type: String,                                                                                                    // 113
    autoform: {                                                                                                      // 114
      type: 'hidden'                                                                                                 // 114
    },                                                                                                               // 114
    autoValue: function () {                                                                                         // 115
      return randomId();                                                                                             // 473
    }                                                                                                                // 113
  },                                                                                                                 // 113
  jenis: {                                                                                                           // 116
    type: Number,                                                                                                    // 116
    autoform: {                                                                                                      // 116
      options: selects.barang                                                                                        // 116
    }                                                                                                                // 116
  },                                                                                                                 // 116
  nama: {                                                                                                            // 117
    type: String                                                                                                     // 117
  },                                                                                                                 // 117
  batch: {                                                                                                           // 118
    type: Array                                                                                                      // 118
  },                                                                                                                 // 118
  'batch.$': {                                                                                                       // 119
    type: Object                                                                                                     // 119
  },                                                                                                                 // 119
  'batch.$.idbatch': {                                                                                               // 120
    type: String,                                                                                                    // 121
    autoform: {                                                                                                      // 122
      type: 'hidden'                                                                                                 // 122
    },                                                                                                               // 122
    autoValue: function () {                                                                                         // 123
      return randomId();                                                                                             // 497
    }                                                                                                                // 121
  },                                                                                                                 // 121
  'batch.$.nobatch': {                                                                                               // 124
    type: String                                                                                                     // 124
  },                                                                                                                 // 124
  'batch.$.merek': {                                                                                                 // 125
    type: String                                                                                                     // 125
  },                                                                                                                 // 125
  'batch.$.satuan': {                                                                                                // 126
    type: Number,                                                                                                    // 126
    autoform: {                                                                                                      // 126
      options: selects.satuan                                                                                        // 126
    }                                                                                                                // 126
  },                                                                                                                 // 126
  'batch.$.masuk': {                                                                                                 // 127
    type: Date,                                                                                                      // 127
    autoform: {                                                                                                      // 127
      type: 'pickadate'                                                                                              // 127
    }                                                                                                                // 127
  },                                                                                                                 // 127
  'batch.$.kadaluarsa': {                                                                                            // 128
    type: Date,                                                                                                      // 128
    autoform: {                                                                                                      // 128
      type: 'pickadate'                                                                                              // 128
    }                                                                                                                // 128
  },                                                                                                                 // 128
  'batch.$.digudang': {                                                                                              // 129
    type: Number                                                                                                     // 129
  },                                                                                                                 // 129
  'batch.$.diapotik': {                                                                                              // 130
    type: Number                                                                                                     // 130
  },                                                                                                                 // 130
  'batch.$.beli': {                                                                                                  // 131
    type: Number,                                                                                                    // 131
    decimal: true                                                                                                    // 131
  },                                                                                                                 // 131
  'batch.$.jual': {                                                                                                  // 132
    type: Number,                                                                                                    // 132
    decimal: true                                                                                                    // 132
  },                                                                                                                 // 132
  'batch.$.suplier': {                                                                                               // 133
    type: String                                                                                                     // 133
  },                                                                                                                 // 133
  'batch.$.anggaran': {                                                                                              // 134
    type: Number,                                                                                                    // 134
    autoform: {                                                                                                      // 134
      options: selects.anggaran                                                                                      // 134
    }                                                                                                                // 134
  },                                                                                                                 // 134
  'batch.$.pengadaan': {                                                                                             // 135
    type: Number                                                                                                     // 135
  }                                                                                                                  // 135
};                                                                                                                   // 112
schema.farmasi = _.assign(schema.gudang, {});                                                                        // 137
schema.logistik = _.assign(schema.gudang, {});                                                                       // 138
schema.dokter = {                                                                                                    // 140
  nama: {                                                                                                            // 141
    type: String                                                                                                     // 141
  },                                                                                                                 // 141
  tipe: {                                                                                                            // 142
    type: Number,                                                                                                    // 142
    autoform: {                                                                                                      // 142
      options: selects.tipe_dokter                                                                                   // 142
    }                                                                                                                // 142
  },                                                                                                                 // 142
  poli: {                                                                                                            // 143
    type: Number,                                                                                                    // 143
    autoform: {                                                                                                      // 143
      options: selects.klinik                                                                                        // 143
    }                                                                                                                // 143
  }                                                                                                                  // 143
};                                                                                                                   // 141
schema.tarif = {                                                                                                     // 145
  jenis: {                                                                                                           // 146
    type: String                                                                                                     // 146
  },                                                                                                                 // 146
  nama: {                                                                                                            // 147
    type: String                                                                                                     // 147
  },                                                                                                                 // 147
  harga: {                                                                                                           // 148
    type: Number                                                                                                     // 148
  },                                                                                                                 // 148
  grup: {                                                                                                            // 149
    type: String,                                                                                                    // 149
    optional: true                                                                                                   // 149
  }                                                                                                                  // 149
};                                                                                                                   // 146
                                                                                                                     //
_.map(['dokter', 'tarif'], function (i) {                                                                            // 151
  var obj;                                                                                                           // 152
  obj = {                                                                                                            // 152
    active: {                                                                                                        // 152
      type: Boolean,                                                                                                 // 153
      autoform: {                                                                                                    // 154
        type: 'hidden'                                                                                               // 154
      },                                                                                                             // 154
      autoValue: function () {                                                                                       // 155
        return true;                                                                                                 // 599
      }                                                                                                              // 153
    }                                                                                                                // 153
  };                                                                                                                 // 152
  return _.assign(schema[i], obj);                                                                                   // 603
});                                                                                                                  // 151
                                                                                                                     //
_.map(['pasien', 'gudang', 'dokter', 'tarif'], function (i) {                                                        // 158
  coll[i] = new Meteor.Collection(i);                                                                                // 159
  return coll[i].allow({                                                                                             // 608
    insert: function () {                                                                                            // 161
      return true;                                                                                                   // 610
    },                                                                                                               // 161
    update: function () {                                                                                            // 162
      return true;                                                                                                   // 613
    },                                                                                                               // 161
    remove: function () {                                                                                            // 163
      return true;                                                                                                   // 616
    }                                                                                                                // 161
  });                                                                                                                // 161
});                                                                                                                  // 158
                                                                                                                     //
makePasien = function (modul) {                                                                                      // 165
  return Router.route('/' + modul + '/:no_mr?', {                                                                    // 622
    name: modul,                                                                                                     // 167
    action: function () {                                                                                            // 168
      return this.render('pasien');                                                                                  // 625
    },                                                                                                               // 167
    waitOn: function () {                                                                                            // 169
      return _.map(['dokter', 'tarif', 'gudang'], function (i) {                                                     // 628
        return Meteor.subscribe('coll', i, {}, {});                                                                  // 629
      });                                                                                                            // 170
    }                                                                                                                // 167
  });                                                                                                                // 167
};                                                                                                                   // 165
                                                                                                                     //
ref = modules.slice(0, 10);                                                                                          // 173
                                                                                                                     //
for (j = 0, len = ref.length; j < len; j++) {                                                                        // 173
  i = ref[j];                                                                                                        // 637
  makePasien(i.name);                                                                                                // 173
}                                                                                                                    // 173
                                                                                                                     //
makeGudang = function (modul) {                                                                                      // 175
  return Router.route('/' + modul + '/:idbarang?', {                                                                 // 642
    name: modul,                                                                                                     // 177
    action: function () {                                                                                            // 178
      return this.render('gudang');                                                                                  // 645
    }                                                                                                                // 177
  });                                                                                                                // 177
};                                                                                                                   // 175
                                                                                                                     //
ref1 = modules.slice(10, 12);                                                                                        // 180
                                                                                                                     //
for (k = 0, len1 = ref1.length; k < len1; k++) {                                                                     // 180
  i = ref1[k];                                                                                                       // 652
  makeGudang(i.name);                                                                                                // 180
}                                                                                                                    // 180
                                                                                                                     //
makeOther = function (name) {                                                                                        // 182
  return Router.route('/' + name, {                                                                                  // 657
    action: function () {                                                                                            // 184
      return this.render(name);                                                                                      // 659
    }                                                                                                                // 184
  });                                                                                                                // 184
};                                                                                                                   // 182
                                                                                                                     //
ref2 = ['panduan'];                                                                                                  // 186
                                                                                                                     //
for (l = 0, len2 = ref2.length; l < len2; l++) {                                                                     // 186
  i = ref2[l];                                                                                                       // 666
  makeOther(i);                                                                                                      // 186
}                                                                                                                    // 186
                                                                                                                     //
Router.route('/manajemen', {                                                                                         // 188
  action: function () {                                                                                              // 189
    return this.render('manajemen');                                                                                 // 672
  },                                                                                                                 // 189
  waitOn: function () {                                                                                              // 190
    return [Meteor.subscribe('users'), Meteor.subscribe('coll', 'dokter', {}, {}), Meteor.subscribe('coll', 'tarif', {}, {})];
  }                                                                                                                  // 189
});                                                                                                                  // 189
Router.route('/login', function () {                                                                                 // 196
  return {                                                                                                           // 680
    action: function () {                                                                                            // 197
      return this.render('login');                                                                                   // 682
    }                                                                                                                // 197
  };                                                                                                                 // 197
});                                                                                                                  // 196
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"client.coffee.js":function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// client.coffee.js                                                                                                  //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var currentPar,                                                                                                      // 1
    currentRoute,                                                                                                    // 1
    formDoc,                                                                                                         // 1
    roles,                                                                                                           // 1
    search,                                                                                                          // 1
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
  AutoForm.setDefaultTemplate('materialize');                                                                        // 3
                                                                                                                     //
  currentRoute = function () {                                                                                       // 4
    return Router.current().route.getName();                                                                         // 8
  };                                                                                                                 // 4
                                                                                                                     //
  currentPar = function (param) {                                                                                    // 5
    return Router.current().params[param];                                                                           // 11
  };                                                                                                                 // 5
                                                                                                                     //
  search = function () {                                                                                             // 6
    return Session.get('search');                                                                                    // 14
  };                                                                                                                 // 6
                                                                                                                     //
  formDoc = function () {                                                                                            // 7
    return Session.get('formDoc');                                                                                   // 17
  };                                                                                                                 // 7
                                                                                                                     //
  this.limit = function () {                                                                                         // 8
    return Session.get('limit');                                                                                     // 20
  };                                                                                                                 // 8
                                                                                                                     //
  this.page = function () {                                                                                          // 9
    return Session.get('page');                                                                                      // 23
  };                                                                                                                 // 9
                                                                                                                     //
  roles = function () {                                                                                              // 10
    return Meteor.user().roles;                                                                                      // 26
  };                                                                                                                 // 10
                                                                                                                     //
  Router.onBeforeAction(function () {                                                                                // 12
    if (!Meteor.userId()) {                                                                                          // 13
      return this.render('login');                                                                                   // 30
    } else {                                                                                                         // 13
      return this.next();                                                                                            // 32
    }                                                                                                                // 33
  });                                                                                                                // 12
  Router.onAfterAction(function () {                                                                                 // 14
    var ref;                                                                                                         // 15
                                                                                                                     //
    if (ref = currentRoute(), indexOf.call(_.uniq(_.flatMap(_.keys(roles()), function (i) {                          // 15
      return _.find(rights, function (j) {                                                                           // 38
        return j.group === i;                                                                                        // 39
      }).list;                                                                                                       // 17
    })), ref) < 0) {                                                                                                 // 16
      return Router.go('/');                                                                                         // 42
    }                                                                                                                // 43
  });                                                                                                                // 14
  Template.registerHelper('coll', function () {                                                                      // 19
    return coll;                                                                                                     // 46
  });                                                                                                                // 19
  Template.registerHelper('schema', function () {                                                                    // 20
    return new SimpleSchema(schema[currentRoute()]);                                                                 // 49
  });                                                                                                                // 20
  Template.registerHelper('zeros', function (num) {                                                                  // 21
    var size;                                                                                                        // 22
    size = _.size(_.toString(num));                                                                                  // 22
                                                                                                                     //
    if (size < 7) {                                                                                                  // 23
      return '0'.repeat(6 - size) + _.toString(num);                                                                 // 55
    }                                                                                                                // 56
  });                                                                                                                // 21
  Template.registerHelper('showForm', function () {                                                                  // 24
    return Session.get('showForm');                                                                                  // 59
  });                                                                                                                // 24
  Template.registerHelper('hari', function (date) {                                                                  // 25
    return moment(date).format('D MMM YYYY');                                                                        // 62
  });                                                                                                                // 25
  Template.registerHelper('rupiah', function (val) {                                                                 // 26
    return 'Rp ' + numeral(val).format('0,0');                                                                       // 65
  });                                                                                                                // 26
  Template.registerHelper('currentPar', function (param) {                                                           // 27
    return currentPar(param);                                                                                        // 68
  });                                                                                                                // 27
  Template.registerHelper('stringify', function (obj) {                                                              // 28
    return JSON.stringify(obj);                                                                                      // 71
  });                                                                                                                // 28
  Template.registerHelper('startCase', function (val) {                                                              // 29
    return _.startCase(val);                                                                                         // 74
  });                                                                                                                // 29
  Template.registerHelper('modules', function () {                                                                   // 30
    return modules;                                                                                                  // 77
  });                                                                                                                // 30
  Template.registerHelper('reverse', function (arr) {                                                                // 31
    return _.reverse(arr);                                                                                           // 80
  });                                                                                                                // 31
  Template.registerHelper('sortBy', function (arr, sel, sort) {                                                      // 32
    return _.sortBy(arr, function (i) {                                                                              // 83
      return -i.tanggal.getTime();                                                                                   // 84
    });                                                                                                              // 32
  });                                                                                                                // 32
  Template.registerHelper('isTrue', function (a, b) {                                                                // 33
    return a === b;                                                                                                  // 88
  });                                                                                                                // 33
  Template.registerHelper('isFalse', function (a, b) {                                                               // 34
    return a !== b;                                                                                                  // 91
  });                                                                                                                // 34
  Template.registerHelper('look', function (option, value, field) {                                                  // 35
    var find;                                                                                                        // 36
    find = _.find(selects[option], function (i) {                                                                    // 36
      return i.value === value;                                                                                      // 96
    });                                                                                                              // 36
    return find[field];                                                                                              // 98
  });                                                                                                                // 35
  Template.registerHelper('look2', function (option, value, field) {                                                 // 38
    var find;                                                                                                        // 39
    find = _.find(coll[option].find().fetch(), function (i) {                                                        // 39
      return i._id === value;                                                                                        // 103
    });                                                                                                              // 39
    return _.startCase(find[field]);                                                                                 // 105
  });                                                                                                                // 38
  Template.registerHelper('routeIs', function (name) {                                                               // 41
    return currentRoute() === name;                                                                                  // 108
  });                                                                                                                // 41
  Template.registerHelper('userGroup', function (name) {                                                             // 43
    return roles()[name];                                                                                            // 111
  });                                                                                                                // 43
  Template.registerHelper('userRole', function (name) {                                                              // 45
    return roles()[currentRoute()][0] === name;                                                                      // 114
  });                                                                                                                // 45
  Template.registerHelper('pagins', function (name) {                                                                // 47
    var end, l, length, limit, results;                                                                              // 48
    limit = Session.get('limit');                                                                                    // 48
    length = coll[name].find().fetch().length;                                                                       // 49
    end = (length - length % limit) / limit;                                                                         // 50
    return function () {                                                                                             // 121
      results = [];                                                                                                  // 122
                                                                                                                     //
      for (var l = 1; 1 <= end ? l <= end : l >= end; 1 <= end ? l++ : l--) {                                        // 123
        results.push(l);                                                                                             // 123
      }                                                                                                              // 123
                                                                                                                     //
      return results;                                                                                                // 124
    }.apply(this);                                                                                                   // 125
  });                                                                                                                // 47
  Template.body.events({                                                                                             // 53
    'keypress #search': function (event) {                                                                           // 54
      var term;                                                                                                      // 55
                                                                                                                     //
      if (event.key === 'Enter') {                                                                                   // 55
        term = event.target.value;                                                                                   // 56
                                                                                                                     //
        if (term.length > 2) {                                                                                       // 57
          return Session.set('search', term);                                                                        // 133
        }                                                                                                            // 55
      }                                                                                                              // 135
    }                                                                                                                // 54
  });                                                                                                                // 54
  Template.layout.onRendered(function () {                                                                           // 60
    Session.set('limit', 10);                                                                                        // 61
    return Session.set('page', 0);                                                                                   // 140
  });                                                                                                                // 60
  Template.menu.helpers({                                                                                            // 64
    menus: function () {                                                                                             // 65
      return _.flatMap(_.keys(roles()), function (i) {                                                               // 144
        var find;                                                                                                    // 67
        find = _.find(rights, function (j) {                                                                         // 67
          return j.group === i;                                                                                      // 147
        });                                                                                                          // 67
        return _.map(find.list, function (j) {                                                                       // 149
          return _.find(modules, function (k) {                                                                      // 150
            return k.name === j;                                                                                     // 151
          });                                                                                                        // 68
        });                                                                                                          // 68
      });                                                                                                            // 66
    },                                                                                                               // 65
    navTitle: function () {                                                                                          // 69
      var find;                                                                                                      // 70
      find = _.find(modules, function (i) {                                                                          // 70
        return i.name === currentRoute();                                                                            // 159
      });                                                                                                            // 70
                                                                                                                     //
      if (find) {                                                                                                    // 71
        return find.full;                                                                                            // 162
      } else {                                                                                                       // 71
        return _.startCase(currentRoute());                                                                          // 164
      }                                                                                                              // 165
    },                                                                                                               // 65
    today: function () {                                                                                             // 72
      return moment().format('LLL');                                                                                 // 168
    }                                                                                                                // 65
  });                                                                                                                // 65
  Template.menu.events({                                                                                             // 73
    'click #logout': function () {                                                                                   // 74
      return Meteor.logout();                                                                                        // 173
    },                                                                                                               // 74
    'click #refresh': function () {                                                                                  // 75
      return document.location.reload();                                                                             // 176
    }                                                                                                                // 74
  });                                                                                                                // 74
  Template.pasien.helpers({                                                                                          // 77
    route: function () {                                                                                             // 78
      return currentRoute();                                                                                         // 181
    },                                                                                                               // 78
    formType: function () {                                                                                          // 79
      if (currentRoute() === 'regis') {                                                                              // 80
        if (currentPar('no_mr')) {                                                                                   // 81
          return 'update';                                                                                           // 186
        } else {                                                                                                     // 81
          return 'insert';                                                                                           // 188
        }                                                                                                            // 80
      } else {                                                                                                       // 80
        return 'update-pushArray';                                                                                   // 191
      }                                                                                                              // 192
    },                                                                                                               // 78
    umur: function (date) {                                                                                          // 84
      return moment().diff(date, 'years') + ' tahun';                                                                // 195
    },                                                                                                               // 78
    showButton: function () {                                                                                        // 85
      return Router.current().params.no_mr || currentRoute() === 'regis';                                            // 198
    },                                                                                                               // 78
    showButtonText: function () {                                                                                    // 86
      switch (currentRoute()) {                                                                                      // 87
        case 'regis':                                                                                                // 87
          return '+ Pasien';                                                                                         // 203
                                                                                                                     //
        case 'jalan':                                                                                                // 87
          return '+ Rawat';                                                                                          // 205
      }                                                                                                              // 87
    },                                                                                                               // 78
    formDoc: function () {                                                                                           // 90
      return formDoc();                                                                                              // 209
    },                                                                                                               // 78
    preview: function () {                                                                                           // 91
      return Session.get('preview');                                                                                 // 212
    },                                                                                                               // 78
    omitFields: function () {                                                                                        // 92
      if (!(formDoc() && formDoc().billRegis)) {                                                                     // 93
        return ['anamesa', 'diagnosa', 'tindakan', 'labor', 'radio', 'obat', 'spm', 'keluar', 'pindah'];             // 216
      }                                                                                                              // 217
    },                                                                                                               // 78
    roleFilter: function (arr) {                                                                                     // 95
      return _.reverse(_.filter(arr, function (i) {                                                                  // 220
        var find;                                                                                                    // 96
        find = _.find(selects.klinik, function (j) {                                                                 // 96
          return j.label === _.startCase(roles().jalan[0]);                                                          // 223
        });                                                                                                          // 96
        return i.klinik === find.value;                                                                              // 225
      }));                                                                                                           // 95
    },                                                                                                               // 78
    userPoli: function () {                                                                                          // 99
      return roles().jalan;                                                                                          // 229
    },                                                                                                               // 78
    insurance: function (val) {                                                                                      // 100
      return 'Rp ' + numeral(val + 30000).format('0,0');                                                             // 232
    },                                                                                                               // 78
    selPol: function () {                                                                                            // 101
      return _.map(roles().jalan, function (i) {                                                                     // 235
        return _.find(selects.klinik, function (j) {                                                                 // 236
          return i === _.snakeCase(j.label);                                                                         // 237
        });                                                                                                          // 102
      });                                                                                                            // 101
    },                                                                                                               // 78
    pasiens: function () {                                                                                           // 103
      var arr, byName, byNoMR, elem, filter, kliniks, now, options, past, ref, ref1, selSub, selector, sub;          // 104
                                                                                                                     //
      if (currentPar('no_mr')) {                                                                                     // 104
        selector = {                                                                                                 // 105
          no_mr: parseInt(currentPar('no_mr'))                                                                       // 105
        };                                                                                                           // 105
        options = {                                                                                                  // 106
          fields: {                                                                                                  // 106
            no_mr: 1,                                                                                                // 106
            regis: 1                                                                                                 // 106
          }                                                                                                          // 106
        };                                                                                                           // 106
        arr = ['bayar', 'jalan', 'labor', 'radio', 'obat'];                                                          // 107
                                                                                                                     //
        if (ref = currentRoute(), indexOf.call(arr, ref) >= 0) {                                                     // 108
          options.fields.rawat = 1;                                                                                  // 108
        }                                                                                                            // 256
                                                                                                                     //
        sub = Meteor.subscribe('coll', 'pasien', selector, options);                                                 // 109
                                                                                                                     //
        if (sub.ready()) {                                                                                           // 110
          return coll.pasien.findOne();                                                                              // 259
        }                                                                                                            // 104
      } else if (search()) {                                                                                         // 104
        byName = {                                                                                                   // 112
          'regis.nama_lengkap': {                                                                                    // 112
            $options: '-i',                                                                                          // 112
            $regex: '.*' + search() + '.*'                                                                           // 112
          }                                                                                                          // 112
        };                                                                                                           // 112
        byNoMR = {                                                                                                   // 113
          no_mr: parseInt(search())                                                                                  // 113
        };                                                                                                           // 113
        selector = {                                                                                                 // 114
          $or: [byName, byNoMR]                                                                                      // 114
        };                                                                                                           // 114
        options = {                                                                                                  // 115
          fields: {                                                                                                  // 115
            no_mr: 1,                                                                                                // 115
            regis: 1                                                                                                 // 115
          }                                                                                                          // 115
        };                                                                                                           // 115
        sub = Meteor.subscribe('coll', 'pasien', selector, options);                                                 // 116
                                                                                                                     //
        if (sub.ready()) {                                                                                           // 117
          return coll.pasien.find().fetch();                                                                         // 282
        }                                                                                                            // 111
      } else if (roles().jalan) {                                                                                    // 111
        now = new Date();                                                                                            // 119
        past = new Date(now.getDate() - 2);                                                                          // 119
        kliniks = _.map(roles().jalan, function (i) {                                                                // 120
          var find;                                                                                                  // 121
          find = _.find(selects.klinik, function (j) {                                                               // 121
            return i === _.snakeCase(j.label);                                                                       // 290
          });                                                                                                        // 121
          return find.value;                                                                                         // 292
        });                                                                                                          // 120
        selector = {                                                                                                 // 123
          rawat: {                                                                                                   // 123
            $elemMatch: {                                                                                            // 123
              klinik: {                                                                                              // 124
                $in: kliniks                                                                                         // 124
              },                                                                                                     // 124
              tanggal: {                                                                                             // 125
                $gt: past                                                                                            // 125
              }                                                                                                      // 125
            }                                                                                                        // 124
          }                                                                                                          // 123
        };                                                                                                           // 123
        sub = Meteor.subscribe('coll', 'pasien', selector, {});                                                      // 126
                                                                                                                     //
        if (sub.ready()) {                                                                                           // 127
          filter = _.filter(coll.pasien.find().fetch(), function (i) {                                               // 128
            var a, b, c, selPol;                                                                                     // 129
                                                                                                                     //
            a = function () {                                                                                        // 129
              var ref1;                                                                                              // 129
              return ref1 = i.rawat[i.rawat.length - 1].klinik, indexOf.call(kliniks, ref1) >= 0;                    // 312
            };                                                                                                       // 129
                                                                                                                     //
            b = function () {                                                                                        // 130
              return !i.rawat[i.rawat.length - 1].total.semua;                                                       // 315
            };                                                                                                       // 130
                                                                                                                     //
            selPol = Session.get('selPol');                                                                          // 131
                                                                                                                     //
            c = function () {                                                                                        // 132
              return i.rawat[i.rawat.length - 1].klinik === selPol;                                                  // 319
            };                                                                                                       // 132
                                                                                                                     //
            if (selPol) {                                                                                            // 133
              return b() && c();                                                                                     // 322
            } else {                                                                                                 // 133
              return a() && b();                                                                                     // 324
            }                                                                                                        // 325
          });                                                                                                        // 128
          return _.sortBy(filter, function (i) {                                                                     // 327
            return i.rawat[i.rawat.length - 1].tanggal;                                                              // 328
          });                                                                                                        // 134
        }                                                                                                            // 118
      } else if (currentRoute() === 'bayar') {                                                                       // 118
        selector = {                                                                                                 // 136
          rawat: {                                                                                                   // 136
            $elemMatch: {                                                                                            // 136
              $or: [{                                                                                                // 136
                'total.semua': 0,                                                                                    // 136
                'status_bayar': {                                                                                    // 136
                  $ne: true                                                                                          // 136
                }                                                                                                    // 136
              }]                                                                                                     // 136
            }                                                                                                        // 136
          }                                                                                                          // 136
        };                                                                                                           // 136
        sub = Meteor.subscribe('coll', 'pasien', selector, {});                                                      // 137
                                                                                                                     //
        if (sub.ready()) {                                                                                           // 138
          return coll.pasien.find().fetch();                                                                         // 348
        }                                                                                                            // 135
      } else if ((ref1 = currentRoute()) === 'labor' || ref1 === 'radio' || ref1 === 'obat') {                       // 135
        elem = {                                                                                                     // 140
          'status_bayar': true                                                                                       // 140
        };                                                                                                           // 140
        elem[currentRoute()] = {                                                                                     // 141
          $exists: true,                                                                                             // 141
          $elemMatch: {                                                                                              // 141
            hasil: {                                                                                                 // 141
              $exists: false                                                                                         // 141
            }                                                                                                        // 141
          }                                                                                                          // 141
        };                                                                                                           // 141
        selSub = {                                                                                                   // 142
          rawat: {                                                                                                   // 142
            $elemMatch: elem                                                                                         // 142
          }                                                                                                          // 142
        };                                                                                                           // 142
        sub = Meteor.subscribe('coll', 'pasien', selSub, {});                                                        // 143
                                                                                                                     //
        if (sub.ready()) {                                                                                           // 144
          return coll.pasien.find().fetch();                                                                         // 369
        }                                                                                                            // 139
      }                                                                                                              // 371
    }                                                                                                                // 78
  });                                                                                                                // 78
  Template.pasien.events({                                                                                           // 146
    'click #showForm': function () {                                                                                 // 147
      var later;                                                                                                     // 148
      Session.set('showForm', !Session.get('showForm'));                                                             // 148
                                                                                                                     //
      later = function () {                                                                                          // 149
        var list;                                                                                                    // 150
        $('.autoform-remove-item').trigger('click');                                                                 // 150
                                                                                                                     //
        if (currentRoute() === 'jalan') {                                                                            // 151
          _.map(['cara_bayar', 'klinik', 'rujukan'], function (i) {                                                  // 151
            if (formDoc()) {                                                                                         // 152
              $('input[name="' + i + '"][value="' + formDoc()[i] + '"]').prop('checked', true);                      // 152
            }                                                                                                        // 385
                                                                                                                     //
            return $('div[data-schema-key="' + i + '"]').prepend('<p>' + _.startCase(i) + '</p>');                   // 386
          });                                                                                                        // 151
        }                                                                                                            // 388
                                                                                                                     //
        list = ['cara_bayar', 'kelamin', 'agama', 'nikah', 'pendidikan', 'darah', 'pekerjaan'];                      // 154
                                                                                                                     //
        if (currentRoute() === 'regis') {                                                                            // 155
          return _.map(list, function (i) {                                                                          // 391
            return $('div[data-schema-key="regis.' + i + '"]').prepend('<p>' + _.startCase(i) + '</p>');             // 392
          });                                                                                                        // 155
        }                                                                                                            // 394
      };                                                                                                             // 149
                                                                                                                     //
      setTimeout(later, 1000);                                                                                       // 157
      Meteor.subscribe('coll', 'gudang', {}, {});                                                                    // 158
      return Session.set('begin', moment());                                                                         // 398
    },                                                                                                               // 147
    'dblclick #row': function () {                                                                                   // 160
      return Router.go('/' + currentRoute() + '/' + this.no_mr);                                                     // 401
    },                                                                                                               // 147
    'click #close': function () {                                                                                    // 162
      _.map(['showForm', 'formDoc', 'preview', 'search'], function (i) {                                             // 163
        return Session.set(i, null);                                                                                 // 405
      });                                                                                                            // 163
                                                                                                                     //
      return Router.go(currentRoute());                                                                              // 407
    },                                                                                                               // 147
    'click #card': function () {                                                                                     // 166
      var dialog;                                                                                                    // 167
      dialog = {                                                                                                     // 167
        title: 'Cetak Kartu',                                                                                        // 168
        message: 'Yakin untuk cetak kartu ini?'                                                                      // 169
      };                                                                                                             // 168
      return new Confirmation(dialog, function (ok) {                                                                // 415
        if (ok) {                                                                                                    // 170
          Meteor.call('billCard', currentPar('no_mr'), true);                                                        // 171
          return makePdf.card();                                                                                     // 418
        }                                                                                                            // 419
      });                                                                                                            // 170
    },                                                                                                               // 147
    'click #consent': function () {                                                                                  // 173
      var dialog;                                                                                                    // 174
      dialog = {                                                                                                     // 174
        title: 'Cetak General Consent',                                                                              // 175
        message: 'Yakin untuk cetak persetujuan pasien?'                                                             // 176
      };                                                                                                             // 175
      return new Confirmation(dialog, function (ok) {                                                                // 428
        if (ok) {                                                                                                    // 177
          return makePdf.consent();                                                                                  // 430
        }                                                                                                            // 431
      });                                                                                                            // 177
    },                                                                                                               // 147
    'dblclick #bill': function (event) {                                                                             // 178
      var dialog, nodes;                                                                                             // 179
      nodes = _.map(['pasien', 'idbayar'], function (i) {                                                            // 179
        return event.target.attributes[i].nodeValue;                                                                 // 437
      });                                                                                                            // 179
      dialog = {                                                                                                     // 181
        title: 'Pembayaran Pendaftaran',                                                                             // 182
        message: 'Apakah yakin pasien sudah membayar?'                                                               // 183
      };                                                                                                             // 182
      return new Confirmation(dialog, function (ok) {                                                                // 443
        if (ok) {                                                                                                    // 184
          if (nodes[1]) {                                                                                            // 185
            Meteor.call.apply(Meteor, ['billRegis'].concat(slice.call(nodes), [true]));                              // 186
            return makePdf.payRegCard(30000, 'Tiga Puluh Ribu Rupiah');                                              // 447
          } else {                                                                                                   // 185
            Meteor.call('billCard', nodes[0], false);                                                                // 189
            return makePdf.payRegCard(10000, 'Sepuluh Ribu Rupiah');                                                 // 450
          }                                                                                                          // 184
        }                                                                                                            // 452
      });                                                                                                            // 184
    },                                                                                                               // 147
    'dblclick #bayar': function (event) {                                                                            // 191
      var dialog, nodes;                                                                                             // 192
      nodes = _.map(['pasien', 'idbayar'], function (i) {                                                            // 192
        return event.target.attributes[i].nodeValue;                                                                 // 458
      });                                                                                                            // 192
      dialog = {                                                                                                     // 194
        title: 'Konfirmasi Pembayaran',                                                                              // 195
        message: 'Apakah yakin tagihan ini sudah dibayar?'                                                           // 196
      };                                                                                                             // 195
      return new Confirmation(dialog, function (ok) {                                                                // 464
        var doc, pasien;                                                                                             // 197
                                                                                                                     //
        if (ok) {                                                                                                    // 197
          Meteor.call.apply(Meteor, ['bayar'].concat(slice.call(nodes)));                                            // 198
          pasien = coll.pasien.findOne({                                                                             // 199
            no_mr: parseInt(nodes[0])                                                                                // 199
          });                                                                                                        // 199
          doc = _.find(pasien.rawat, function (i) {                                                                  // 200
            return i.idbayar === nodes[1];                                                                           // 472
          });                                                                                                        // 200
          return makePdf.payRawat(doc);                                                                              // 474
        }                                                                                                            // 475
      });                                                                                                            // 197
    },                                                                                                               // 147
    'dblclick #request': function (event) {                                                                          // 202
      var nodes;                                                                                                     // 203
      nodes = _.map(['pasien', 'idbayar', 'jenis', 'idjenis'], function (i) {                                        // 203
        return event.target.attributes[i].nodeValue;                                                                 // 481
      });                                                                                                            // 203
      return MaterializeModal.prompt({                                                                               // 483
        message: 'Isikan data requestnya',                                                                           // 206
        callback: function (err, res) {                                                                              // 207
          var params;                                                                                                // 207
                                                                                                                     //
          if (res.submit) {                                                                                          // 207
            params = ['request'].concat(slice.call(nodes), [res.value]);                                             // 208
            return Meteor.call.apply(Meteor, slice.call(params).concat([function (err, res) {                        // 489
              var flat, key, message, rekap, val;                                                                    // 209
                                                                                                                     //
              if (res) {                                                                                             // 209
                message = '';                                                                                        // 210
                                                                                                                     //
                for (key in meteorBabelHelpers.sanitizeForInObject(res)) {                                           // 211
                  val = res[key];                                                                                    // 494
                  message += '</p>' + key + ': ' + val + '</p>';                                                     // 212
                }                                                                                                    // 211
                                                                                                                     //
                MaterializeModal.message({                                                                           // 213
                  title: 'Penyerahan Obat',                                                                          // 214
                  message: message                                                                                   // 215
                });                                                                                                  // 214
                rekap = Session.get('rekap') || [];                                                                  // 216
                flat = _.flatten(_.toPairs(res));                                                                    // 217
                return Session.set('rekap', slice.call(rekap).concat([slice.call(nodes).concat(slice.call(flat))]));
              }                                                                                                      // 504
            }]));                                                                                                    // 209
          }                                                                                                          // 506
        }                                                                                                            // 206
      });                                                                                                            // 206
    },                                                                                                               // 147
    'dblclick #rekap': function () {                                                                                 // 219
      var headers;                                                                                                   // 220
      headers = ['Pasien', 'ID Bayar', 'Jenis', 'ID Request', 'No Batch', 'Jumlah'];                                 // 220
      makePdf.rekap([headers].concat(slice.call(Session.get('rekap'))));                                             // 221
      return Session.set('rekap', null);                                                                             // 514
    },                                                                                                               // 147
    'click .modal-trigger': function (event) {                                                                       // 223
      if (this.idbayar) {                                                                                            // 224
        Session.set('formDoc', this);                                                                                // 225
        Session.set('preview', modForm(this, this.idbayar));                                                         // 226
      }                                                                                                              // 520
                                                                                                                     //
      return $('#preview').modal('open');                                                                            // 521
    },                                                                                                               // 147
    'click #rmRawat': function () {                                                                                  // 228
      var dialog, self;                                                                                              // 229
      self = this;                                                                                                   // 229
      dialog = {                                                                                                     // 230
        title: 'Konfirmasi Hapus',                                                                                   // 231
        message: 'Apakah yakin hapus data rawat pasien ini?'                                                         // 232
      };                                                                                                             // 231
      return new Confirmation(dialog, function (ok) {                                                                // 530
        if (ok) {                                                                                                    // 233
          return Meteor.call('rmRawat', currentPar('no_mr'), self.idbayar);                                          // 532
        }                                                                                                            // 533
      });                                                                                                            // 233
    },                                                                                                               // 147
    'change #selPol': function (event) {                                                                             // 235
      return Session.set('selPol', parseInt(event.target.id));                                                       // 537
    },                                                                                                               // 147
    'click #rmPasien': function () {                                                                                 // 237
      var dialog;                                                                                                    // 238
      dialog = {                                                                                                     // 238
        title: 'Hapus Pasien',                                                                                       // 239
        message: 'Apakah yakin untuk menghapus pasien?'                                                              // 240
      };                                                                                                             // 239
      return new Confirmation(dialog, function (ok) {                                                                // 545
        if (ok) {                                                                                                    // 241
          Meteor.call('rmPasien', currentPar('no_mr'));                                                              // 242
          return Router.go('/' + currentRoute());                                                                    // 548
        }                                                                                                            // 549
      });                                                                                                            // 241
    }                                                                                                                // 147
  });                                                                                                                // 147
  Template["import"].events({                                                                                        // 245
    'change :file': function (event, template) {                                                                     // 246
      return Papa.parse(event.target.files[0], {                                                                     // 555
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
                agama: parseInt(data.agama),                                                                         // 256
                ayah: _.startCase(data.ayah),                                                                        // 257
                nikah: parseInt(data.nikah),                                                                         // 258
                pekerjaan: parseInt(data.pekerjaan),                                                                 // 259
                pendidikan: parseInt(data.pendidikan),                                                               // 260
                tgl_lahir: new Date(data.tgl_lahir),                                                                 // 261
                tmpt_kelahiran: _.startCase(data.tmpt_kelahiran)                                                     // 262
              }                                                                                                      // 254
            };                                                                                                       // 253
            return Meteor.call('import', 'pasien', selector, modifier);                                              // 577
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
              return Meteor.call('import', 'dokter', selector, modifier);                                            // 588
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
              return Meteor.call('import', 'tarif', selector, modifier);                                             // 599
            } else if (data.password) {                                                                              // 272
              Meteor.call('newUser', data);                                                                          // 281
              return Meteor.call('addRole', data.username, [data.role], data.group);                                 // 602
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
            return data.nama && Meteor.call('import', 'gudang', selector, modifier, 'batch');                        // 630
          }                                                                                                          // 631
        }                                                                                                            // 248
      });                                                                                                            // 248
    }                                                                                                                // 246
  });                                                                                                                // 246
  Template.gudang.helpers({                                                                                          // 306
    schemagudang: function () {                                                                                      // 307
      return new SimpleSchema(schema.gudang);                                                                        // 638
    },                                                                                                               // 307
    formType: function () {                                                                                          // 308
      if (currentPar('idbarang')) {                                                                                  // 308
        return 'update-pushArray';                                                                                   // 642
      } else {                                                                                                       // 308
        return 'insert';                                                                                             // 644
      }                                                                                                              // 645
    },                                                                                                               // 307
    gudangs: function () {                                                                                           // 309
      var byBatch, byName, selector, sub;                                                                            // 310
                                                                                                                     //
      if (currentPar('idbarang')) {                                                                                  // 310
        selector = {                                                                                                 // 311
          idbarang: currentPar('idbarang')                                                                           // 311
        };                                                                                                           // 311
        sub = Meteor.subscribe('coll', 'gudang', selector, {});                                                      // 312
                                                                                                                     //
        if (sub.ready()) {                                                                                           // 313
          return coll.gudang.findOne();                                                                              // 655
        }                                                                                                            // 310
      } else if (search()) {                                                                                         // 310
        byName = {                                                                                                   // 315
          nama: {                                                                                                    // 315
            $options: '-i',                                                                                          // 315
            $regex: '.*' + search() + '.*'                                                                           // 315
          }                                                                                                          // 315
        };                                                                                                           // 315
        byBatch = {                                                                                                  // 316
          idbatch: search()                                                                                          // 316
        };                                                                                                           // 316
        selector = {                                                                                                 // 317
          $or: [byName, byBatch]                                                                                     // 317
        };                                                                                                           // 317
        sub = Meteor.subscribe('coll', 'gudang', selector, {});                                                      // 318
        return sub.ready() && coll.gudang.find().fetch();                                                            // 671
      } else {                                                                                                       // 314
        sub = Meteor.subscribe('coll', 'gudang', {}, {});                                                            // 321
        return sub.ready() && coll.gudang.find().fetch();                                                            // 674
      }                                                                                                              // 675
    }                                                                                                                // 307
  });                                                                                                                // 307
  Template.gudang.events({                                                                                           // 324
    'click #showForm': function () {                                                                                 // 325
      return Session.set('showForm', !Session.get('showForm'));                                                      // 680
    },                                                                                                               // 325
    'dblclick #row': function () {                                                                                   // 327
      return Router.go('/' + currentRoute() + '/' + this.idbarang);                                                  // 683
    },                                                                                                               // 325
    'dblclick #transfer': function () {                                                                              // 328
      var data;                                                                                                      // 329
      data = this;                                                                                                   // 329
                                                                                                                     //
      if (roles().farmasi) {                                                                                         // 330
        return MaterializeModal.prompt({                                                                             // 689
          message: 'Transfer Gudang > Apotek',                                                                       // 332
          callback: function (err, res) {                                                                            // 333
            if (res.submit) {                                                                                        // 333
              return Meteor.call('transfer', currentPar('idbarang'), data.idbatch, parseInt(res.value));             // 693
            }                                                                                                        // 694
          }                                                                                                          // 332
        });                                                                                                          // 332
      }                                                                                                              // 697
    },                                                                                                               // 325
    'click #rmBarang': function () {                                                                                 // 335
      var dialog, self;                                                                                              // 336
      self = this;                                                                                                   // 336
      dialog = {                                                                                                     // 337
        title: 'Hapus Jenis Obat',                                                                                   // 338
        message: 'Apakah yakin untuk hapus jenis obat ini dari sistem?'                                              // 339
      };                                                                                                             // 338
      return new Confirmation(dialog, function (ok) {                                                                // 706
        if (ok) {                                                                                                    // 340
          return Meteor.call('rmBarang', self.idbarang);                                                             // 708
        }                                                                                                            // 709
      });                                                                                                            // 340
    }                                                                                                                // 325
  });                                                                                                                // 325
  Template.manajemen.onRendered(function () {                                                                        // 343
    return $('select#export').material_select();                                                                     // 714
  });                                                                                                                // 343
  Template.manajemen.helpers({                                                                                       // 346
    users: function () {                                                                                             // 347
      return Meteor.users.find().fetch();                                                                            // 718
    },                                                                                                               // 347
    onUser: function () {                                                                                            // 348
      return Session.get('onUser');                                                                                  // 721
    },                                                                                                               // 347
    selRoles: function () {                                                                                          // 349
      return ['petugas', 'admin'];                                                                                   // 724
    },                                                                                                               // 347
    klinik: function () {                                                                                            // 350
      return selects.klinik;                                                                                         // 727
    },                                                                                                               // 347
    schemadokter: function () {                                                                                      // 351
      return new SimpleSchema(schema.dokter);                                                                        // 730
    },                                                                                                               // 347
    schematarif: function () {                                                                                       // 352
      return new SimpleSchema(schema.tarif);                                                                         // 733
    },                                                                                                               // 347
    dokters: function () {                                                                                           // 353
      var options, selector;                                                                                         // 354
      selector = {                                                                                                   // 354
        active: true                                                                                                 // 354
      };                                                                                                             // 354
      options = {                                                                                                    // 355
        limit: limit(),                                                                                              // 355
        skip: page() * limit()                                                                                       // 355
      };                                                                                                             // 355
      return coll.dokter.find(selector, options).fetch();                                                            // 744
    },                                                                                                               // 347
    tarifs: function () {                                                                                            // 357
      var options, selector;                                                                                         // 358
      selector = {                                                                                                   // 358
        active: true                                                                                                 // 358
      };                                                                                                             // 358
      options = {                                                                                                    // 359
        limit: limit(),                                                                                              // 359
        skip: page() * limit()                                                                                       // 359
      };                                                                                                             // 359
      return coll.tarif.find(selector, options).fetch();                                                             // 755
    }                                                                                                                // 347
  });                                                                                                                // 347
  Template.manajemen.events({                                                                                        // 362
    'submit #userForm': function (event) {                                                                           // 363
      var doc, group, onUser, poli, repeat, role, theRole;                                                           // 364
      event.preventDefault();                                                                                        // 364
      onUser = Session.get('onUser');                                                                                // 365
                                                                                                                     //
      if (!onUser) {                                                                                                 // 366
        doc = {                                                                                                      // 367
          username: event.target.children.username.value,                                                            // 368
          password: event.target.children.password.value                                                             // 369
        };                                                                                                           // 368
        repeat = event.target.children.repeat.value;                                                                 // 370
                                                                                                                     //
        if (doc.password === repeat) {                                                                               // 371
          Meteor.call('newUser', doc);                                                                               // 372
          return $('input').val('');                                                                                 // 771
        } else {                                                                                                     // 371
          return Materialize.toast('Password tidak mirip', 3000);                                                    // 773
        }                                                                                                            // 366
      } else {                                                                                                       // 366
        role = $('input[name="role"]:checked', event.target)[0].id;                                                  // 377
        group = $('input[name="group"]:checked', event.target)[0].id;                                                // 378
        poli = $('input[name="poli"]:checked', event.target)[0];                                                     // 379
        theRole = !poli ? role : _.snakeCase(poli.id);                                                               // 380
        return Meteor.call('addRole', onUser._id, [theRole], group);                                                 // 780
      }                                                                                                              // 781
    },                                                                                                               // 363
    'dblclick #row': function () {                                                                                   // 382
      return Session.set('onUser', this);                                                                            // 784
    },                                                                                                               // 363
    'dblclick #reset': function () {                                                                                 // 383
      var dialog, self;                                                                                              // 384
      self = this;                                                                                                   // 384
      dialog = {                                                                                                     // 385
        title: 'Reset Peranan',                                                                                      // 386
        message: 'Anda yakin untuk menghapus semua perannya?'                                                        // 387
      };                                                                                                             // 386
      return new Confirmation(dialog, function (ok) {                                                                // 793
        if (ok) {                                                                                                    // 388
          return Meteor.call('rmRole', self._id);                                                                    // 795
        }                                                                                                            // 796
      });                                                                                                            // 388
    },                                                                                                               // 363
    'click #close': function () {                                                                                    // 390
      return console.log('tutup');                                                                                   // 800
    },                                                                                                               // 363
    'click #export': function () {                                                                                   // 391
      var select;                                                                                                    // 392
      select = $('select#export').val();                                                                             // 392
      return Meteor.call('export', select, function (err, content) {                                                 // 805
        var blob;                                                                                                    // 393
                                                                                                                     //
        if (content) {                                                                                               // 393
          blob = new Blob([content], {                                                                               // 394
            type: 'text/plain;charset=utf-8'                                                                         // 394
          });                                                                                                        // 394
          return saveAs(blob, select + '.csv');                                                                      // 811
        }                                                                                                            // 812
      });                                                                                                            // 393
    },                                                                                                               // 363
    'dblclick #baris': function (event) {                                                                            // 396
      var dialog, jenis, self;                                                                                       // 397
      jenis = event.currentTarget.className;                                                                         // 397
      dialog = {                                                                                                     // 398
        title: 'Hapus ' + _.startCase(jenis),                                                                        // 399
        message: 'Yakin untuk menghapus ' + jenis + ' dari daftar?'                                                  // 400
      };                                                                                                             // 399
      self = this;                                                                                                   // 401
      return new Confirmation(dialog, function (ok) {                                                                // 823
        if (ok) {                                                                                                    // 402
          return Meteor.call('inactive', jenis, self._id);                                                           // 825
        }                                                                                                            // 826
      });                                                                                                            // 402
    }                                                                                                                // 363
  });                                                                                                                // 363
  Template.login.onRendered(function () {                                                                            // 405
    return $('.slider').slider();                                                                                    // 831
  });                                                                                                                // 405
  Template.login.events({                                                                                            // 408
    'submit form': function (event) {                                                                                // 409
      var password, username;                                                                                        // 410
      event.preventDefault();                                                                                        // 410
      username = event.target.children.username.value;                                                               // 411
      password = event.target.children.password.value;                                                               // 412
      return Meteor.loginWithPassword(username, password, function (err) {                                           // 839
        if (err) {                                                                                                   // 414
          return Materialize.toast('Salah username / password', 3000);                                               // 841
        } else {                                                                                                     // 414
          return Router.go('/' + _.keys(roles())[0]);                                                                // 843
        }                                                                                                            // 844
      });                                                                                                            // 413
    }                                                                                                                // 409
  });                                                                                                                // 409
  Template.pagination.events({                                                                                       // 419
    'click #next': function () {                                                                                     // 420
      return Session.set('page', 1 + page());                                                                        // 850
    },                                                                                                               // 420
    'click #prev': function () {                                                                                     // 421
      return Session.set('page', -1 + page());                                                                       // 853
    },                                                                                                               // 420
    'click #num': function (event) {                                                                                 // 422
      return Session.set('page', parseInt(event.target.innerText));                                                  // 856
    }                                                                                                                // 420
  });                                                                                                                // 420
  Template.report.helpers({                                                                                          // 425
    datas: function () {                                                                                             // 426
      return Session.get('laporan');                                                                                 // 861
    }                                                                                                                // 426
  });                                                                                                                // 426
  Template.report.events({                                                                                           // 428
    'click .datepicker': function (event, template) {                                                                // 429
      var type;                                                                                                      // 430
      type = event.target.attributes.date.nodeValue;                                                                 // 430
      return $('#' + type).pickadate({                                                                               // 868
        onSet: function (data) {                                                                                     // 431
          var end, start;                                                                                            // 432
          Session.set(type + 'Date', data.select);                                                                   // 432
          start = Session.get('startDate');                                                                          // 433
          end = Session.get('endDate');                                                                              // 434
                                                                                                                     //
          if (start && end) {                                                                                        // 435
            return Meteor.call('report', template.data.jenis, start, end, function (err, res) {                      // 875
              return res && Session.set('laporan', res);                                                             // 876
            });                                                                                                      // 436
          }                                                                                                          // 878
        }                                                                                                            // 431
      });                                                                                                            // 431
    },                                                                                                               // 429
    'click #export': function (event, template) {                                                                    // 438
      var blob, content;                                                                                             // 439
      content = exportcsv.exportToCSV(Session.get('laporan').csv, true, ';');                                        // 439
      blob = new Blob([content], {                                                                                   // 440
        type: 'text/plain;charset=utf-8'                                                                             // 440
      });                                                                                                            // 440
      return saveAs(blob, template.data.jenis + '.csv');                                                             // 888
    }                                                                                                                // 429
  });                                                                                                                // 429
}                                                                                                                    // 891
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
      var docs, filter, look, look2;                                                                                 // 132
                                                                                                                     //
      filter = function (arr) {                                                                                      // 132
        return _.filter(arr, function (i) {                                                                          // 285
          var ref;                                                                                                   // 133
          return new Date(start) < (ref = new Date(i.tanggal)) && ref < new Date(end);                               // 287
        });                                                                                                          // 132
      };                                                                                                             // 132
                                                                                                                     //
      look = function (list, val) {                                                                                  // 134
        return _.find(selects[list], function (i) {                                                                  // 291
          return i.value === val;                                                                                    // 292
        });                                                                                                          // 134
      };                                                                                                             // 134
                                                                                                                     //
      look2 = function (list, id) {                                                                                  // 135
        return _.find(coll[list].find().fetch(), function (i) {                                                      // 296
          return i._id === id;                                                                                       // 297
        });                                                                                                          // 135
      };                                                                                                             // 135
                                                                                                                     //
      docs = _.flatMap(coll.pasien.find().fetch(), function (i) {                                                    // 136
        return _.map(filter(i.rawat), function (j) {                                                                 // 301
          var obj, pick;                                                                                             // 137
          obj = {                                                                                                    // 137
            no_mr: i.no_mr,                                                                                          // 138
            nama_lengkap: _.startCase(i.regis.nama_lengkap),                                                         // 139
            no_bill: j.nobill,                                                                                       // 140
            cara_bayar: look('cara_bayar', j.cara_bayar).label,                                                      // 141
            rujukan: j.rujukan ? look('rujukan', j.rujukan).label : '',                                              // 142
            klinik: look('klinik', j.klinik).label,                                                                  // 143
            diagnosa: j.diagnosa || '-',                                                                             // 144
            tindakan: _.flatMap(['tindakan', 'labor', 'radio'], function (k) {                                       // 145
              var saring;                                                                                            // 146
              saring = _.filter(j[k], function (l) {                                                                 // 146
                return l;                                                                                            // 314
              });                                                                                                    // 146
              return _.map(saring, function (l) {                                                                    // 316
                return '/' + _.startCase(look2('tarif', l.nama).nama);                                               // 317
              });                                                                                                    // 147
            }),                                                                                                      // 145
            harga: 'Rp ' + j.total.semua,                                                                            // 148
            petugas: Meteor.users.findOne({                                                                          // 149
              _id: j.petugas                                                                                         // 149
            }).username,                                                                                             // 149
            keluar: j.keluar ? look('keluar', j.keluar).label : '-',                                                 // 150
            baru_lama: 'L'                                                                                           // 151
          };                                                                                                         // 138
                                                                                                                     //
          if (jenis === 'pendaftaran') {                                                                             // 152
            pick = _.pick(obj, ['no_mr', 'nama_lengkap', 'cara_bayar', 'rujukan', 'klinik', 'baru_lama']);           // 153
          } else if (jenis === 'pembayaran') {                                                                       // 152
            pick = _.pick(obj, ['tanggal', 'no_bill', 'no_mr', 'nama_lengkap', 'klinik', 'tindakan', 'harga', 'petugas']);
          } else if (jenis === 'rawat_jalan') {                                                                      // 154
            pick = _.pick(obj, ['tanggal', 'no_mr', 'nama_lengkap', 'kelamin', 'umur', 'cara_bayar', 'diagnosa', 'tindakan', 'petugas', 'keluar', 'rujukan']);
          }                                                                                                          // 333
                                                                                                                     //
          return pick;                                                                                               // 334
        });                                                                                                          // 136
      });                                                                                                            // 136
      return {                                                                                                       // 337
        headers: _.map(_.keys(docs[0]), function (i) {                                                               // 159
          return _.startCase(i);                                                                                     // 339
        }),                                                                                                          // 159
        rows: _.map(docs, function (i) {                                                                             // 160
          return _.values(i);                                                                                        // 342
        }),                                                                                                          // 160
        csv: docs                                                                                                    // 161
      };                                                                                                             // 159
    }                                                                                                                // 13
  });                                                                                                                // 13
}                                                                                                                    // 348
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},{
  "extensions": [
    ".js",
    ".json",
    ".coffee"
  ]
});
require("./folder/hooks.coffee.js");
require("./folder/menus.coffee.js");
require("./folder/modules.coffee.js");
require("./folder/pdf.coffee.js");
require("./folder/selects.coffee.js");
require("./both.coffee.js");
require("./client.coffee.js");
require("./server.coffee.js");
//# sourceMappingURL=app.js.map
