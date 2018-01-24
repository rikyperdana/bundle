var require = meteorInstall({"list":{"categories.coffee":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// list/categories.coffee                                                                                     //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var hidden;
this.categories = [{
  name: 'dddtlh',
  title: 'Daya Dukung dan Daya Tampung Lingkungan Hidup (DDDTLH)',
  desc: 'Daya dukung lingkungan hidup adalah kemampuan lingkungan hidup untuk mendukung perikehidupan manusia, makhluk hidup lain, dan keseimbangan antara keduanya. Daya tampung lingkungan hidup adalah kemampuan lingkungan hidup untuk menyerap zat, energi, dan/atau komponen lain yang masuk atau dimasukkan ke dalamnya. Daya dukung dan daya tampung lingkungan hidup ditetapkan dengan tujuan untuk dimanfaatkan sebagai: 1. Acuan pemanfaatan sumber daya alam; 2. Muatan rencana perlindungan dan pengelolaan lingkungan hidup; 3. Muatan kajian lingkungan hidup strategis; 4. Indikator pada instrumen pengendalian lingungan hidup; 5. Informasi pengambilan keputusan pembangunan sebagaimana diamanatkan peraturan perundangan. Daya Dukung dan daya tampung lingkungan hidup meliputi: 1. Daya dukung dan daya tampung lingkungan hidup nasional dan pulau/kepulauan; 2. Daya dukung dan daya tampung lingkungan hidup provinsi dan wilayah ekoregion yang mencakup lintas kabupaten/kota; 3. Daya dukung dandaya tampung lingkungan hidup kabupaten/kota dan wilayah ekoregion yang tercakup dalam wilayah kabupaten/kota. Tahapan penetapan daya dukung dan daya tampung lingkungan hidup meliputi: 1. Pengukuran daya dukun dan daya tampung dan/atau penentuan nilai indeks daya dukung dan daya tampung lingkungan hidup; 2. Pnentuan status daya dukung dan daya tampung lingkungan hidup. '
}, {
  name: 'rpplh',
  title: 'Rencana Perlindungan dan Pengelolaan Lingkungan Hidup (RPPLH)',
  desc: 'Adalah rangkaian analisis yang sistematis, menyeluruh, dan partisipatif untuk memastikan bahwa prinsip Pembangunan Berkelanjutan telah menjadi dasar dan terintegrasi dalam pembangunan suatu wilayah dan/atau Kebijakan, Rencana, dan/atau Program(KRP). RPPLH Privinsi dan Kabupaten/Kota diamanatkan dalam Pasal 9 dan Pasal 10 Undang-Undang Nomor 32 Tahun 2009 tentang Perlindungan dan Pengelolaan Lingkungan Hidup. Selaint itu, pasal 12 ayat (2) huruf e dan lampiran pada angka I huruk K baris ke-1 Undang-undang Nomor 23 Tahun 2014 tentang Pemerintahan Daerah juga mengamanahkan penyusunan RPPLH. Menindaklanjuti ketentuan peraturan perundangan tersebut di atas dan untuk melengkapi tatalaksana dan panduan RPPLH tingkat Provinsi dan Kabupaten/Kota, Kementerian LHKRI menerbitkan Surat Edaran (SE) Menteri LHK RI Nomor SE.5/Menlhk/PKTL/PLA.3/11/2016 tanggal 11 November 2016 sebagai panduan umum sesuai kewenangannya. RPPLH selanjutnya ditetapkan dengan Peraturan Daerah Provinsi/Kabupaten/Kota; 3. Penetapan dya dukung dan daya tampung lingkungan hidup'
}, {
  name: 'klhs',
  title: 'Kajian Lingkungan Hidup Strategis (KLHS)',
  desc: 'Adalah rangkaian analisis yang sistematis, menyeluruh,  dan partisipatif untuk memastikan bahwa prinsip Pembangunan Berkelanjutan telah menjadi dasar dan terintegrasi dalam pembangunan suatu wilayah dan/atau Kebijakan, Rencana, dan/atau Program(KRP). Apabila prinsip-prinsip Pembangunan Berkelanjutan telah dipertimbangkan dan diintegrasikan dalam KRP pembangunan, maka diharapkan kemungkinan terjadinya dampak atau resiko Lingkungan Hidup dapat dihindari atau diminimalkan. Menindak lanjuti ketentuan Pasal 18 Undang-undang Nomor 32 Tahun 2009 tentang Perlindungan dan Pengelolaan Lingkungan Hidup, Pemerintah telah menetapkan Peraturan pemerintah Nomor 46 Tahun 2016 tentang Tata Cara Penyelenggaraan Kajian Lingkungan Hidup Strategis, yang selanjutnya disingkat dengan KLHS. Pada pasal 2. Peraturan Pemerintah tersebut ditetapkan bahwa Pemerintah Pusat dan Pemerintah Daerah WAJIB membuat KLHS, dalam penyusunan atau evaluasi RTRW beserta rencana rincinya, RPJPN/D, RPJMN/D, dan KRP pembangunan yang berpotensi menimbulkan dampak dan/atau resiko lingkungan hidup.'
}, {
  name: 'dpilkp',
  title: 'Amdal UKL/UPL/Izin Lingkungan'
}, {
  name: 's2-2016',
  title: 'Laporan Semester'
}, {
  name: 'slhd',
  title: 'SLHD / DIKPLHD'
}, {
  name: 'dikplhd',
  title: 'Dokumen Informasi Kinerja Pengelolaan Lingkungan Hidup Daerah'
}, {
  name: 'lak',
  title: 'Laporan Akhir Kegiatan'
}, {
  name: 'uu',
  title: 'Undang-undang'
}, {
  name: 'pp',
  title: 'Peraturan Pemerintah'
}, {
  name: 'perpres',
  title: 'Peraturan Presiden'
}, {
  name: 'kepres',
  title: 'Keputusan Presiden'
}, {
  name: 'permen',
  title: 'Peraturan Menteri'
}, {
  name: 'kepmen',
  title: 'Keputusan Menteri'
}, {
  name: 'perda',
  title: 'Peraturan Daerah'
}, {
  name: 'pergub',
  title: 'Peraturan/Keputusan Gubernur'
}, {
  name: 'semen',
  title: 'Surat Edaran'
}, {
  name: 'perusahaan',
  title: 'Daftar Perusahaan',
  desc: 'Halaman ini memuat daftar perusahaan berikut dokumen dan laporan perizinan lingkungan yang dimiliki'
}, {
  name: 'izin1',
  title: 'Data Izin Lingkungan'
}, {
  name: 'izin2',
  title: 'Izin Pembuangan Air Limbah'
}, {
  name: 'izin3',
  title: 'Izin Pemanfaatan Air Limbah'
}, {
  name: 'izin4',
  title: 'Izin Pengelolaan Limbah B3'
}, {
  name: 'kinerja1',
  title: 'Berita Acara Pengawasan'
}, {
  name: 'kinerja2',
  title: 'Tindak Lanjut Hasil Pengawasan'
}, {
  name: 'kinerja3',
  title: 'Kinerja Pengelolaan Lingkungan Hidup Perusahaan'
}, {
  name: 'lapor1',
  title: 'Laporan Pelaksanaan Izin Lingkungan'
}, {
  name: 'lapor2',
  title: 'Laporan Pelaksanaan Izin Pembuangan Air Limbah'
}, {
  name: 'lapor3',
  title: 'Laporan Pelaksanaan Izin Pemanfaatan Air Limbah'
}, {
  name: 'lapor4',
  title: 'Laporan Pelaksanaan Izin Pengelolaan Limbah B3'
}, {
  name: 'lapor5',
  title: 'Laporan Pelaksanaan Pengendalian Kebakaran Hutan dan Lahan'
}, {
  name: 'lapor6',
  title: 'Pelaporan Perizinan Lingkungan Oleh Usahan / Kegiatan'
}, {
  name: 'sop1',
  title: 'Penerbitan Izin Lingkungan'
}, {
  name: 'sop2',
  title: 'Pengawasan Izin Lingkungan'
}, {
  name: 'sop3',
  title: 'Penanganan Pengaduan'
}, {
  name: 'sop4',
  title: 'Penerbitan Rekomendasi dan Izin Pengumpulan Limbah B3'
}, {
  name: 'aduan1',
  title: 'Data Laporan Pengaduan Lingkungan Hidup'
}, {
  name: 'aduan2',
  title: 'Data Hasil Penanganan Pengaduan Lingkungan Hidup'
}, {
  name: 'aduan3',
  title: 'Laporan Pengaduan Oleh Masyarakat'
}];
hidden = [];
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"both.coffee":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// both.coffee                                                                                                //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var i, j, len, makeBoth;
Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});
Router.route('/', {
  action: function () {
    return this.render('home');
  }
});
Router.route('/struktur', {
  action: function () {
    return this.render('struktur');
  }
});
Router.route('/tupoksi', {
  action: function () {
    return this.render('tupoksi');
  }
});
this.coll = [];
this.schema = [];
this.files = new FS.Collection('files', {
  stores: [new FS.Store.GridFS('filesStore')],
  filter: {
    maxSize: 21234567,
    allow: {
      extensions: ['png', 'jpg', 'pdf']
    }
  }
});
files.allow({
  insert: function () {
    return true;
  },
  update: function () {
    return true;
  },
  remove: function () {
    return true;
  },
  download: function () {
    return true;
  },
  fetch: null
});

makeBoth = function (category) {
  Router.route('/' + category, {
    action: function () {
      return this.render('blog');
    },
    waitOn: function () {
      return Meteor.subscribe(category);
    }
  });
  coll[category] = new Meteor.Collection(category);
  coll[category].attachSchema({
    title: {
      type: String,
      label: 'Judul Data'
    },
    date: {
      type: Date,
      label: 'Tanggal Data'
    },
    text: {
      type: String,
      label: 'Isi Data',
      autoform: {
        type: 'quill'
      }
    },
    files: {
      type: [String],
      label: 'Lampiran',
      optional: true
    },
    'files.$': {
      type: String,
      optional: true,
      autoform: {
        afFieldInput: {
          type: 'fileUpload',
          collection: 'files'
        }
      }
    }
  });
  coll[category].allow({
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

  if (Meteor.isServer) {
    return Meteor.publish(category, function () {
      return coll[category].find({});
    });
  }
};

for (j = 0, len = categories.length; j < len; j++) {
  i = categories[j];
  makeBoth(i.name);
}

Meteor.methods({
  removePage: function (category, pageId) {
    return coll[category].remove({
      _id: pageId
    });
  },
  removeFile: function (fileId) {
    return files.remove({
      _id: fileId
    });
  }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"client.coffee":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// client.coffee                                                                                              //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var currentRoute;

if (Meteor.isClient) {
  currentRoute = function (cb) {
    return Router.current().route.getName();
  };

  Template.registerHelper('showAdd', function () {
    return Session.get('showAdd');
  });
  Template.registerHelper('editData', function () {
    return Session.get('editData');
  });
  Template.registerHelper('readData', function () {
    return Session.get('readData');
  });
  Template.registerHelper('theColl', function () {
    return coll[currentRoute(function (res) {
      return res;
    })];
  });
  Template.registerHelper('theSchema', function () {
    return schema[currentRoute(function (res) {
      return res;
    })];
  });
  Template.registerHelper('loggedIn', function () {
    if (Meteor.userId()) {
      return true;
    }
  });
  Template.registerHelper('category', function () {
    return _.findWhere(categories, {
      name: currentRoute(function (res) {
        return res;
      })
    });
  });
  Template.registerHelper('formMode', function () {
    var editData, readData, showAdd;
    showAdd = Session.get('showAdd');
    editData = Session.get('editData');
    readData = Session.get('readData');

    if (showAdd || editData || readData) {
      return true;
    }
  });
  Template.body.events({
    'click #showAdd': function () {
      return Session.set('showAdd', true);
    },
    'click #close': function () {
      Session.set('showAdd', false);
      Session.set('editData', null);
      return Session.set('readData', null);
    }
  });
  Template.home.onRendered(function () {
    return $('.parallax').parallax();
  });
  Template.menu.onRendered(function () {
    return $('.dropdown-button').dropdown({
      constrainWidth: true,
      belowOrigin: true,
      hover: true
    });
  });
  Template.menu.helpers({
    userEmail: function () {
      return Meteor.user().emails[0].address;
    },
    menuPerLing: function () {
      return categories.slice(0, 3);
    },
    menuAmdal: function () {
      return categories.slice(3, 4);
    },
    menuSemester: function () {
      return categories.slice(4, 5);
    },
    menuSlhd: function () {
      return categories.slice(5, 6);
    },
    menuDikplhd: function () {
      return categories.slice(6, 7);
    },
    menuLak: function () {
      return categories.slice(7, 8);
    },
    menuPeraturan: function () {
      return categories.slice(8, 17);
    },
    izin: function () {
      return categories.slice(17, 21);
    },
    kinerja: function () {
      return categories.slice(21, 24);
    },
    lapor: function () {
      return categories.slice(24, 30);
    },
    sop: function () {
      return categories.slice(30, 34);
    },
    aduan: function () {
      return categories.slice(34, 37);
    }
  });
  Template.blog.helpers({
    routeIs: function (name) {
      return Router.current().route.getName() === name;
    },
    datas: function (one, two) {
      return _.map(coll[currentRoute(function (res) {
        return res;
      })].find().fetch(), function (item) {
        item.short = item.text.slice(0, 301).replace(/<(?:.|\n)*?>/gm, '');
        return item;
      });
    }
  });
  Template.blog.events({
    'click #edit': function () {
      return Session.set('editData', this);
    },
    'click #read': function () {
      return Session.set('readData', this);
    },
    'click #remove': function () {
      var confirmRemove, data, dialog, route;
      route = currentRoute(function (res) {
        return res;
      });
      data = this;
      dialog = {
        message: 'Yakin hapus data?',
        title: 'Konfirmasi',
        okText: 'Ya',
        success: true,
        focus: 'cancel'
      };
      return confirmRemove = new Confirmation(dialog, function (ok) {
        var i, j, len, ref, results;

        if (ok) {
          Meteor.call('removePage', route, data._id);
          ref = data.files;
          results = [];

          for (j = 0, len = ref.length; j < len; j++) {
            i = ref[j];
            results.push(Meteor.call('removeFile', i));
          }

          return results;
        }
      });
    },
    'click #expand': function (event) {
      $('.truncate').removeClass('truncate');
      return $('#expand').addClass('hide');
    }
  });
  Template.edit.helpers({
    data: function () {
      return Session.get('editData');
    }
  });
  Template.read.onRendered(function () {
    return $('.materialboxed').materialbox();
  });
  Template.read.helpers({
    data: function () {
      var content;
      content = Session.get('readData');
      content.date = moment(content.date).format('dddd Do MMM YY');
      return content;
    },
    files: function () {
      var i, j, len, ref;
      ref = Session.get('readData').files;

      for (j = 0, len = ref.length; j < len; j++) {
        i = ref[j];
        Meteor.subscribe('file', i);
      }

      return files.find().fetch();
    }
  });
  AutoForm.addHooks(null, {
    after: {
      insert: function () {
        return Session.set('showAdd', false);
      },
      update: function () {
        return Session.set('editData', null);
      }
    }
  });
  Meteor.startup(function () {
    return AccountsEntry.config({
      homeRoute: '/',
      dashboardRoute: '/',
      waitEmailVerification: false
    });
  });
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"server.coffee":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                            //
// server.coffee                                                                                              //
//                                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                              //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
if (Meteor.isServer) {
  Meteor.publish('pages', function () {
    return pages.find({});
  });
  Meteor.publish('file', function (id) {
    return files.find({
      _id: id
    });
  });
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},{
  "extensions": [
    ".js",
    ".json",
    ".coffee"
  ]
});
require("./list/categories.coffee");
require("./both.coffee");
require("./client.coffee");
require("./server.coffee");
//# sourceURL=meteor://💻app/app/app.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvbGlzdC9jYXRlZ29yaWVzLmNvZmZlZSIsIm1ldGVvcjovL/CfkrthcHAvYm90aC5jb2ZmZWUiLCJtZXRlb3I6Ly/wn5K7YXBwL2NsaWVudC5jb2ZmZWUiLCJtZXRlb3I6Ly/wn5K7YXBwL3NlcnZlci5jb2ZmZWUiXSwibmFtZXMiOlsiaGlkZGVuIiwiY2F0ZWdvcmllcyIsIm5hbWUiLCJ0aXRsZSIsImRlc2MiLCJpIiwiaiIsImxlbiIsIm1ha2VCb3RoIiwiUm91dGVyIiwiY29uZmlndXJlIiwibGF5b3V0VGVtcGxhdGUiLCJsb2FkaW5nVGVtcGxhdGUiLCJyb3V0ZSIsImFjdGlvbiIsInJlbmRlciIsImNvbGwiLCJzY2hlbWEiLCJmaWxlcyIsIkZTIiwiQ29sbGVjdGlvbiIsInN0b3JlcyIsIlN0b3JlIiwiR3JpZEZTIiwiZmlsdGVyIiwibWF4U2l6ZSIsImFsbG93IiwiZXh0ZW5zaW9ucyIsImluc2VydCIsInVwZGF0ZSIsInJlbW92ZSIsImRvd25sb2FkIiwiZmV0Y2giLCJjYXRlZ29yeSIsIndhaXRPbiIsIk1ldGVvciIsInN1YnNjcmliZSIsImF0dGFjaFNjaGVtYSIsInR5cGUiLCJTdHJpbmciLCJsYWJlbCIsImRhdGUiLCJEYXRlIiwidGV4dCIsImF1dG9mb3JtIiwib3B0aW9uYWwiLCJhZkZpZWxkSW5wdXQiLCJjb2xsZWN0aW9uIiwiaXNTZXJ2ZXIiLCJwdWJsaXNoIiwiZmluZCIsImxlbmd0aCIsIm1ldGhvZHMiLCJyZW1vdmVQYWdlIiwicGFnZUlkIiwiX2lkIiwicmVtb3ZlRmlsZSIsImZpbGVJZCIsImN1cnJlbnRSb3V0ZSIsImlzQ2xpZW50IiwiY2IiLCJjdXJyZW50IiwiZ2V0TmFtZSIsIlRlbXBsYXRlIiwicmVnaXN0ZXJIZWxwZXIiLCJTZXNzaW9uIiwiZ2V0IiwicmVzIiwidXNlcklkIiwiXyIsImZpbmRXaGVyZSIsImVkaXREYXRhIiwicmVhZERhdGEiLCJzaG93QWRkIiwiYm9keSIsImV2ZW50cyIsInNldCIsImhvbWUiLCJvblJlbmRlcmVkIiwiJCIsInBhcmFsbGF4IiwibWVudSIsImRyb3Bkb3duIiwiY29uc3RyYWluV2lkdGgiLCJiZWxvd09yaWdpbiIsImhvdmVyIiwiaGVscGVycyIsInVzZXJFbWFpbCIsInVzZXIiLCJlbWFpbHMiLCJhZGRyZXNzIiwibWVudVBlckxpbmciLCJzbGljZSIsIm1lbnVBbWRhbCIsIm1lbnVTZW1lc3RlciIsIm1lbnVTbGhkIiwibWVudURpa3BsaGQiLCJtZW51TGFrIiwibWVudVBlcmF0dXJhbiIsIml6aW4iLCJraW5lcmphIiwibGFwb3IiLCJzb3AiLCJhZHVhbiIsImJsb2ciLCJyb3V0ZUlzIiwiZGF0YXMiLCJvbmUiLCJ0d28iLCJtYXAiLCJpdGVtIiwic2hvcnQiLCJyZXBsYWNlIiwiY29uZmlybVJlbW92ZSIsImRhdGEiLCJkaWFsb2ciLCJtZXNzYWdlIiwib2tUZXh0Iiwic3VjY2VzcyIsImZvY3VzIiwiQ29uZmlybWF0aW9uIiwib2siLCJyZWYiLCJyZXN1bHRzIiwiY2FsbCIsInB1c2giLCJldmVudCIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJlZGl0IiwicmVhZCIsIm1hdGVyaWFsYm94IiwiY29udGVudCIsIm1vbWVudCIsImZvcm1hdCIsIkF1dG9Gb3JtIiwiYWRkSG9va3MiLCJhZnRlciIsInN0YXJ0dXAiLCJBY2NvdW50c0VudHJ5IiwiY29uZmlnIiwiaG9tZVJvdXRlIiwiZGFzaGJvYXJkUm91dGUiLCJ3YWl0RW1haWxWZXJpZmljYXRpb24iLCJwYWdlcyIsImlkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFBQSxNQUFBO0FBQUEsS0FBQ0MsVUFBRCxHQUFjLENBQ2I7QUFBQUMsUUFBTSxRQUFOO0FBQWdCQyxTQUFPLHdEQUF2QjtBQUFpRkMsUUFBTTtBQUF2RixDQURhLEVBR2I7QUFBQUYsUUFBTSxPQUFOO0FBQWVDLFNBQU8sK0RBQXRCO0FBQXVGQyxRQUFNO0FBQTdGLENBSGEsRUFLYjtBQUFBRixRQUFNLE1BQU47QUFB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RCxDQThGRTtBQS9GSDtBQXFHQSxDOzs7Ozs7Ozs7Ozs7QUN6TUQsSUFBRzVHLE9BQU9hLFFBQVY7QUFFQ2IsU0FBT2MsT0FBUCxDQUFlLE9BQWYsRUFBd0I7QUFBckIsV0FBd0IrRixNQUFNOUYsSUFBTixDQUFXLEVBQVgsQ0FBeEI7QUFBSDtBQUVBZixTQUFPYyxPQUFQLENBQWUsTUFBZixFQUF1QixVQUFDZ0csRUFBRDtBQUNwQixXQUQ0Qi9ILE1BQU1nQyxJQUFOLENBQVc7QUFBQUssV0FBSzBGO0FBQUwsS0FBWCxDQUM1QjtBQURIO0FBS0EsQyIsImZpbGUiOiIvYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiQGNhdGVnb3JpZXMgPSBbXG5cdG5hbWU6ICdkZGR0bGgnLCB0aXRsZTogJ0RheWEgRHVrdW5nIGRhbiBEYXlhIFRhbXB1bmcgTGluZ2t1bmdhbiBIaWR1cCAoREREVExIKScsIGRlc2M6ICdEYXlhIGR1a3VuZyBsaW5na3VuZ2FuIGhpZHVwIGFkYWxhaCBrZW1hbXB1YW4gbGluZ2t1bmdhbiBoaWR1cCB1bnR1ayBtZW5kdWt1bmcgcGVyaWtlaGlkdXBhbiBtYW51c2lhLCBtYWtobHVrIGhpZHVwIGxhaW4sIGRhbiBrZXNlaW1iYW5nYW4gYW50YXJhIGtlZHVhbnlhLiBEYXlhIHRhbXB1bmcgbGluZ2t1bmdhbiBoaWR1cCBhZGFsYWgga2VtYW1wdWFuIGxpbmdrdW5nYW4gaGlkdXAgdW50dWsgbWVueWVyYXAgemF0LCBlbmVyZ2ksIGRhbi9hdGF1IGtvbXBvbmVuIGxhaW4geWFuZyBtYXN1ayBhdGF1IGRpbWFzdWtrYW4ga2UgZGFsYW1ueWEuIERheWEgZHVrdW5nIGRhbiBkYXlhIHRhbXB1bmcgbGluZ2t1bmdhbiBoaWR1cCBkaXRldGFwa2FuIGRlbmdhbiB0dWp1YW4gdW50dWsgZGltYW5mYWF0a2FuIHNlYmFnYWk6IDEuIEFjdWFuIHBlbWFuZmFhdGFuIHN1bWJlciBkYXlhIGFsYW07IDIuIE11YXRhbiByZW5jYW5hIHBlcmxpbmR1bmdhbiBkYW4gcGVuZ2Vsb2xhYW4gbGluZ2t1bmdhbiBoaWR1cDsgMy4gTXVhdGFuIGthamlhbiBsaW5na3VuZ2FuIGhpZHVwIHN0cmF0ZWdpczsgNC4gSW5kaWthdG9yIHBhZGEgaW5zdHJ1bWVuIHBlbmdlbmRhbGlhbiBsaW5ndW5nYW4gaGlkdXA7IDUuIEluZm9ybWFzaSBwZW5nYW1iaWxhbiBrZXB1dHVzYW4gcGVtYmFuZ3VuYW4gc2ViYWdhaW1hbmEgZGlhbWFuYXRrYW4gcGVyYXR1cmFuIHBlcnVuZGFuZ2FuLiBEYXlhIER1a3VuZyBkYW4gZGF5YSB0YW1wdW5nIGxpbmdrdW5nYW4gaGlkdXAgbWVsaXB1dGk6IDEuIERheWEgZHVrdW5nIGRhbiBkYXlhIHRhbXB1bmcgbGluZ2t1bmdhbiBoaWR1cCBuYXNpb25hbCBkYW4gcHVsYXUva2VwdWxhdWFuOyAyLiBEYXlhIGR1a3VuZyBkYW4gZGF5YSB0YW1wdW5nIGxpbmdrdW5nYW4gaGlkdXAgcHJvdmluc2kgZGFuIHdpbGF5YWggZWtvcmVnaW9uIHlhbmcgbWVuY2FrdXAgbGludGFzIGthYnVwYXRlbi9rb3RhOyAzLiBEYXlhIGR1a3VuZyBkYW5kYXlhIHRhbXB1bmcgbGluZ2t1bmdhbiBoaWR1cCBrYWJ1cGF0ZW4va290YSBkYW4gd2lsYXlhaCBla29yZWdpb24geWFuZyB0ZXJjYWt1cCBkYWxhbSB3aWxheWFoIGthYnVwYXRlbi9rb3RhLiBUYWhhcGFuIHBlbmV0YXBhbiBkYXlhIGR1a3VuZyBkYW4gZGF5YSB0YW1wdW5nIGxpbmdrdW5nYW4gaGlkdXAgbWVsaXB1dGk6IDEuIFBlbmd1a3VyYW4gZGF5YSBkdWt1biBkYW4gZGF5YSB0YW1wdW5nIGRhbi9hdGF1IHBlbmVudHVhbiBuaWxhaSBpbmRla3MgZGF5YSBkdWt1bmcgZGFuIGRheWEgdGFtcHVuZyBsaW5na3VuZ2FuIGhpZHVwOyAyLiBQbmVudHVhbiBzdGF0dXMgZGF5YSBkdWt1bmcgZGFuIGRheWEgdGFtcHVuZyBsaW5na3VuZ2FuIGhpZHVwLiAnXG4sXG5cdG5hbWU6ICdycHBsaCcsIHRpdGxlOiAnUmVuY2FuYSBQZXJsaW5kdW5nYW4gZGFuIFBlbmdlbG9sYWFuIExpbmdrdW5nYW4gSGlkdXAgKFJQUExIKScsIGRlc2M6ICdBZGFsYWggcmFuZ2thaWFuIGFuYWxpc2lzIHlhbmcgc2lzdGVtYXRpcywgbWVueWVsdXJ1aCwgZGFuIHBhcnRpc2lwYXRpZiB1bnR1ayBtZW1hc3Rpa2FuIGJhaHdhIHByaW5zaXAgUGVtYmFuZ3VuYW4gQmVya2VsYW5qdXRhbiB0ZWxhaCBtZW5qYWRpIGRhc2FyIGRhbiB0ZXJpbnRlZ3Jhc2kgZGFsYW0gcGVtYmFuZ3VuYW4gc3VhdHUgd2lsYXlhaCBkYW4vYXRhdSBLZWJpamFrYW4sIFJlbmNhbmEsIGRhbi9hdGF1IFByb2dyYW0oS1JQKS4gUlBQTEggUHJpdmluc2kgZGFuIEthYnVwYXRlbi9Lb3RhIGRpYW1hbmF0a2FuIGRhbGFtIFBhc2FsIDkgZGFuIFBhc2FsIDEwIFVuZGFuZy1VbmRhbmcgTm9tb3IgMzIgVGFodW4gMjAwOSB0ZW50YW5nIFBlcmxpbmR1bmdhbiBkYW4gUGVuZ2Vsb2xhYW4gTGluZ2t1bmdhbiBIaWR1cC4gU2VsYWludCBpdHUsIHBhc2FsIDEyIGF5YXQgKDIpIGh1cnVmIGUgZGFuIGxhbXBpcmFuIHBhZGEgYW5na2EgSSBodXJ1ayBLIGJhcmlzIGtlLTEgVW5kYW5nLXVuZGFuZyBOb21vciAyMyBUYWh1biAyMDE0IHRlbnRhbmcgUGVtZXJpbnRhaGFuIERhZXJhaCBqdWdhIG1lbmdhbWFuYWhrYW4gcGVueXVzdW5hbiBSUFBMSC4gTWVuaW5kYWtsYW5qdXRpIGtldGVudHVhbiBwZXJhdHVyYW4gcGVydW5kYW5nYW4gdGVyc2VidXQgZGkgYXRhcyBkYW4gdW50dWsgbWVsZW5na2FwaSB0YXRhbGFrc2FuYSBkYW4gcGFuZHVhbiBSUFBMSCB0aW5na2F0IFByb3ZpbnNpIGRhbiBLYWJ1cGF0ZW4vS290YSwgS2VtZW50ZXJpYW4gTEhLUkkgbWVuZXJiaXRrYW4gU3VyYXQgRWRhcmFuIChTRSkgTWVudGVyaSBMSEsgUkkgTm9tb3IgU0UuNS9NZW5saGsvUEtUTC9QTEEuMy8xMS8yMDE2IHRhbmdnYWwgMTEgTm92ZW1iZXIgMjAxNiBzZWJhZ2FpIHBhbmR1YW4gdW11bSBzZXN1YWkga2V3ZW5hbmdhbm55YS4gUlBQTEggc2VsYW5qdXRueWEgZGl0ZXRhcGthbiBkZW5nYW4gUGVyYXR1cmFuIERhZXJhaCBQcm92aW5zaS9LYWJ1cGF0ZW4vS290YTsgMy4gUGVuZXRhcGFuIGR5YSBkdWt1bmcgZGFuIGRheWEgdGFtcHVuZyBsaW5na3VuZ2FuIGhpZHVwJ1xuLFxuXHRuYW1lOiAna2xocycsIHRpdGxlOiAnS2FqaWFuIExpbmdrdW5nYW4gSGlkdXAgU3RyYXRlZ2lzIChLTEhTKScsIGRlc2M6ICdBZGFsYWggcmFuZ2thaWFuIGFuYWxpc2lzIHlhbmcgc2lzdGVtYXRpcywgbWVueWVsdXJ1aCwgIGRhbiBwYXJ0aXNpcGF0aWYgdW50dWsgbWVtYXN0aWthbiBiYWh3YSBwcmluc2lwIFBlbWJhbmd1bmFuIEJlcmtlbGFuanV0YW4gdGVsYWggbWVuamFkaSBkYXNhciBkYW4gdGVyaW50ZWdyYXNpIGRhbGFtIHBlbWJhbmd1bmFuIHN1YXR1IHdpbGF5YWggZGFuL2F0YXUgS2ViaWpha2FuLCBSZW5jYW5hLCBkYW4vYXRhdSBQcm9ncmFtKEtSUCkuIEFwYWJpbGEgcHJpbnNpcC1wcmluc2lwIFBlbWJhbmd1bmFuIEJlcmtlbGFuanV0YW4gdGVsYWggZGlwZXJ0aW1iYW5na2FuIGRhbiBkaWludGVncmFzaWthbiBkYWxhbSBLUlAgcGVtYmFuZ3VuYW4sIG1ha2EgZGloYXJhcGthbiBrZW11bmdraW5hbiB0ZXJqYWRpbnlhIGRhbXBhayBhdGF1IHJlc2lrbyBMaW5na3VuZ2FuIEhpZHVwIGRhcGF0IGRpaGluZGFyaSBhdGF1IGRpbWluaW1hbGthbi4gTWVuaW5kYWsgbGFuanV0aSBrZXRlbnR1YW4gUGFzYWwgMTggVW5kYW5nLXVuZGFuZyBOb21vciAzMiBUYWh1biAyMDA5IHRlbnRhbmcgUGVybGluZHVuZ2FuIGRhbiBQZW5nZWxvbGFhbiBMaW5na3VuZ2FuIEhpZHVwLCBQZW1lcmludGFoIHRlbGFoIG1lbmV0YXBrYW4gUGVyYXR1cmFuIHBlbWVyaW50YWggTm9tb3IgNDYgVGFodW4gMjAxNiB0ZW50YW5nIFRhdGEgQ2FyYSBQZW55ZWxlbmdnYXJhYW4gS2FqaWFuIExpbmdrdW5nYW4gSGlkdXAgU3RyYXRlZ2lzLCB5YW5nIHNlbGFuanV0bnlhIGRpc2luZ2thdCBkZW5nYW4gS0xIUy4gUGFkYSBwYXNhbCAyLiBQZXJhdHVyYW4gUGVtZXJpbnRhaCB0ZXJzZWJ1dCBkaXRldGFwa2FuIGJhaHdhIFBlbWVyaW50YWggUHVzYXQgZGFuIFBlbWVyaW50YWggRGFlcmFoIFdBSklCIG1lbWJ1YXQgS0xIUywgZGFsYW0gcGVueXVzdW5hbiBhdGF1IGV2YWx1YXNpIFJUUlcgYmVzZXJ0YSByZW5jYW5hIHJpbmNpbnlhLCBSUEpQTi9ELCBSUEpNTi9ELCBkYW4gS1JQIHBlbWJhbmd1bmFuIHlhbmcgYmVycG90ZW5zaSBtZW5pbWJ1bGthbiBkYW1wYWsgZGFuL2F0YXUgcmVzaWtvIGxpbmdrdW5nYW4gaGlkdXAuJ1xuLFxuXHRuYW1lOiAnZHBpbGtwJywgdGl0bGU6ICdBbWRhbCBVS0wvVVBML0l6aW4gTGluZ2t1bmdhbidcbixcblx0bmFtZTogJ3MyLTIwMTYnLCB0aXRsZTogJ0xhcG9yYW4gU2VtZXN0ZXInXG4sXG5cdG5hbWU6ICdzbGhkJywgdGl0bGU6ICdTTEhEIC8gRElLUExIRCdcbixcblx0bmFtZTogJ2Rpa3BsaGQnLCB0aXRsZTogJ0Rva3VtZW4gSW5mb3JtYXNpIEtpbmVyamEgUGVuZ2Vsb2xhYW4gTGluZ2t1bmdhbiBIaWR1cCBEYWVyYWgnXG4sXG5cdG5hbWU6ICdsYWsnLCB0aXRsZTogJ0xhcG9yYW4gQWtoaXIgS2VnaWF0YW4nXG4sXG5cdG5hbWU6ICd1dScsIHRpdGxlOiAnVW5kYW5nLXVuZGFuZydcbixcblx0bmFtZTogJ3BwJywgdGl0bGU6ICdQZXJhdHVyYW4gUGVtZXJpbnRhaCdcbixcblx0bmFtZTogJ3BlcnByZXMnLCB0aXRsZTogJ1BlcmF0dXJhbiBQcmVzaWRlbidcbixcblx0bmFtZTogJ2tlcHJlcycsIHRpdGxlOiAnS2VwdXR1c2FuIFByZXNpZGVuJ1xuLFxuXHRuYW1lOiAncGVybWVuJywgdGl0bGU6ICdQZXJhdHVyYW4gTWVudGVyaSdcbixcblx0bmFtZTogJ2tlcG1lbicsIHRpdGxlOiAnS2VwdXR1c2FuIE1lbnRlcmknXG4sXG5cdG5hbWU6ICdwZXJkYScsIHRpdGxlOiAnUGVyYXR1cmFuIERhZXJhaCdcbixcblx0bmFtZTogJ3Blcmd1YicsIHRpdGxlOiAnUGVyYXR1cmFuL0tlcHV0dXNhbiBHdWJlcm51cidcbixcblx0bmFtZTogJ3NlbWVuJywgdGl0bGU6ICdTdXJhdCBFZGFyYW4nXG4sXG4jIE1lbnUgcGFrIG5lbHNvblxuXHRuYW1lOiAncGVydXNhaGFhbicsIHRpdGxlOiAnRGFmdGFyIFBlcnVzYWhhYW4nLCBkZXNjOiAnSGFsYW1hbiBpbmkgbWVtdWF0IGRhZnRhciBwZXJ1c2FoYWFuIGJlcmlrdXQgZG9rdW1lbiBkYW4gbGFwb3JhbiBwZXJpemluYW4gbGluZ2t1bmdhbiB5YW5nIGRpbWlsaWtpJ1xuLFxuXHRuYW1lOiAnaXppbjEnLCB0aXRsZTogJ0RhdGEgSXppbiBMaW5na3VuZ2FuJ1xuLFxuXHRuYW1lOiAnaXppbjInLCB0aXRsZTogJ0l6aW4gUGVtYnVhbmdhbiBBaXIgTGltYmFoJ1xuLFxuXHRuYW1lOiAnaXppbjMnLCB0aXRsZTogJ0l6aW4gUGVtYW5mYWF0YW4gQWlyIExpbWJhaCdcbixcblx0bmFtZTogJ2l6aW40JywgdGl0bGU6ICdJemluIFBlbmdlbG9sYWFuIExpbWJhaCBCMydcbixcblx0bmFtZTogJ2tpbmVyamExJywgdGl0bGU6ICdCZXJpdGEgQWNhcmEgUGVuZ2F3YXNhbidcbixcblx0bmFtZTogJ2tpbmVyamEyJywgdGl0bGU6ICdUaW5kYWsgTGFuanV0IEhhc2lsIFBlbmdhd2FzYW4nXG4sXG5cdG5hbWU6ICdraW5lcmphMycsIHRpdGxlOiAnS2luZXJqYSBQZW5nZWxvbGFhbiBMaW5na3VuZ2FuIEhpZHVwIFBlcnVzYWhhYW4nXG4sXG5cdG5hbWU6ICdsYXBvcjEnLCB0aXRsZTogJ0xhcG9yYW4gUGVsYWtzYW5hYW4gSXppbiBMaW5na3VuZ2FuJ1xuLFxuXHRuYW1lOiAnbGFwb3IyJywgdGl0bGU6ICdMYXBvcmFuIFBlbGFrc2FuYWFuIEl6aW4gUGVtYnVhbmdhbiBBaXIgTGltYmFoJ1xuLFxuXHRuYW1lOiAnbGFwb3IzJywgdGl0bGU6ICdMYXBvcmFuIFBlbGFrc2FuYWFuIEl6aW4gUGVtYW5mYWF0YW4gQWlyIExpbWJhaCdcbixcblx0bmFtZTogJ2xhcG9yNCcsIHRpdGxlOiAnTGFwb3JhbiBQZWxha3NhbmFhbiBJemluIFBlbmdlbG9sYWFuIExpbWJhaCBCMydcbixcblx0bmFtZTogJ2xhcG9yNScsIHRpdGxlOiAnTGFwb3JhbiBQZWxha3NhbmFhbiBQZW5nZW5kYWxpYW4gS2ViYWthcmFuIEh1dGFuIGRhbiBMYWhhbidcbixcblx0bmFtZTogJ2xhcG9yNicsIHRpdGxlOiAnUGVsYXBvcmFuIFBlcml6aW5hbiBMaW5na3VuZ2FuIE9sZWggVXNhaGFuIC8gS2VnaWF0YW4nXG4sXG5cdG5hbWU6ICdzb3AxJywgdGl0bGU6ICdQZW5lcmJpdGFuIEl6aW4gTGluZ2t1bmdhbidcbixcblx0bmFtZTogJ3NvcDInLCB0aXRsZTogJ1Blbmdhd2FzYW4gSXppbiBMaW5na3VuZ2FuJ1xuLFxuXHRuYW1lOiAnc29wMycsIHRpdGxlOiAnUGVuYW5nYW5hbiBQZW5nYWR1YW4nXG4sXG5cdG5hbWU6ICdzb3A0JywgdGl0bGU6ICdQZW5lcmJpdGFuIFJla29tZW5kYXNpIGRhbiBJemluIFBlbmd1bXB1bGFuIExpbWJhaCBCMydcbixcblx0bmFtZTogJ2FkdWFuMScsIHRpdGxlOiAnRGF0YSBMYXBvcmFuIFBlbmdhZHVhbiBMaW5na3VuZ2FuIEhpZHVwJ1xuLFxuXHRuYW1lOiAnYWR1YW4yJywgdGl0bGU6ICdEYXRhIEhhc2lsIFBlbmFuZ2FuYW4gUGVuZ2FkdWFuIExpbmdrdW5nYW4gSGlkdXAnXG4sXG5cdG5hbWU6ICdhZHVhbjMnLCB0aXRsZTogJ0xhcG9yYW4gUGVuZ2FkdWFuIE9sZWggTWFzeWFyYWthdCdcbl1cblxuaGlkZGVuID0gW1xuI1x0bmFtZTogJ3N0cnVrdHVyJywgdGl0bGU6ICdTdHJ1a3R1ciBPcmdhbmlzYXNpJ1xuIyxcbiNcdG5hbWU6ICd0dXBva3NpJywgdGl0bGU6ICdUdWdhcyBkYW4gRnVuZ3NpJ1xuIyxcbiNcdG5hbWU6ICdzMS0yMDE2JywgdGl0bGU6ICdMYXBvcmFuIFNlbWVzdGVyIEkgMjAxNidcbiMsXG4jXHRuYW1lOiAnczItMjAxNycsIHRpdGxlOiAnTGFwb3JhbiBTZW1lc3RlciBJSSAyMDE3J1xuIyxcbiNcdG5hbWU6ICdzMS0yMDE4JywgdGl0bGU6ICdMYXBvcmFuIFNlbWVzdGVyIEkgMjAxOCdcbiMsXG4jXHRuYW1lOiAnczItMjAxOCcsIHRpdGxlOiAnTGFwb3JhbiBTZW1lc3RlciBJSSAyMDE4J1xuIyxcbiNcdG5hbWU6ICdzMS0yMDE5JywgdGl0bGU6ICdMYXBvcmFuIFNlbWVzdGVyIEkgMjAxOSdcbiMsXG4jXHRuYW1lOiAnczItMjAxOScsIHRpdGxlOiAnTGFwb3JhbiBTZW1lc3RlciBJSSAyMDE5J1xuIyxcbiNcdG5hbWU6ICdwa3BobCcsIHRpdGxlOiAnUGVuZ2FkdWFuIEthc3VzIGRhbiBQZW5lZ2FrYW4gSHVrdW0gTGluZ2t1bmdhbidcbiMsXG5dXG4iLCJSb3V0ZXIuY29uZmlndXJlXG5cdGxheW91dFRlbXBsYXRlOiAnbGF5b3V0J1xuXHRsb2FkaW5nVGVtcGxhdGU6ICdsb2FkaW5nJ1xuXG5Sb3V0ZXIucm91dGUgJy8nLCBhY3Rpb246IC0+IHRoaXMucmVuZGVyICdob21lJ1xuUm91dGVyLnJvdXRlICcvc3RydWt0dXInLCBhY3Rpb246IC0+IHRoaXMucmVuZGVyICdzdHJ1a3R1cidcblJvdXRlci5yb3V0ZSAnL3R1cG9rc2knLCBhY3Rpb246IC0+IHRoaXMucmVuZGVyICd0dXBva3NpJ1xuXG5AY29sbCA9IFtdXG5Ac2NoZW1hID0gW11cblxuQGZpbGVzID0gbmV3IEZTLkNvbGxlY3Rpb24gJ2ZpbGVzJyxcblx0c3RvcmVzOiBbbmV3IEZTLlN0b3JlLkdyaWRGUyAnZmlsZXNTdG9yZSddXG5cdGZpbHRlcjpcblx0XHRtYXhTaXplOiAyMTIzNDU2N1xuXHRcdGFsbG93OiBleHRlbnNpb25zOiBbJ3BuZycsICdqcGcnLCAncGRmJ11cbmZpbGVzLmFsbG93XG5cdGluc2VydDogLT4gdHJ1ZVxuXHR1cGRhdGU6IC0+IHRydWVcblx0cmVtb3ZlOiAtPiB0cnVlXG5cdGRvd25sb2FkOiAtPiB0cnVlXG5cdGZldGNoOiBudWxsXG5cbm1ha2VCb3RoID0gKGNhdGVnb3J5KSAtPlxuXHRSb3V0ZXIucm91dGUgJy8nICsgY2F0ZWdvcnksXG5cdFx0YWN0aW9uOiAtPiB0aGlzLnJlbmRlciAnYmxvZydcblx0XHR3YWl0T246IC0+IE1ldGVvci5zdWJzY3JpYmUgY2F0ZWdvcnlcblx0Y29sbFtjYXRlZ29yeV0gPSBuZXcgTWV0ZW9yLkNvbGxlY3Rpb24gY2F0ZWdvcnlcblx0Y29sbFtjYXRlZ29yeV0uYXR0YWNoU2NoZW1hXG5cdFx0dGl0bGU6IHR5cGU6IFN0cmluZywgbGFiZWw6ICdKdWR1bCBEYXRhJ1xuXHRcdGRhdGU6IHR5cGU6IERhdGUsIGxhYmVsOiAnVGFuZ2dhbCBEYXRhJ1xuXHRcdHRleHQ6IHR5cGU6IFN0cmluZywgbGFiZWw6ICdJc2kgRGF0YScsIGF1dG9mb3JtOiB0eXBlOiAncXVpbGwnXG5cdFx0ZmlsZXM6IHR5cGU6IFtTdHJpbmddLCBsYWJlbDogJ0xhbXBpcmFuJywgb3B0aW9uYWw6IHRydWVcblx0XHQnZmlsZXMuJCc6XG5cdFx0XHR0eXBlOiBTdHJpbmdcblx0XHRcdG9wdGlvbmFsOiB0cnVlXG5cdFx0XHRhdXRvZm9ybTpcblx0XHRcdFx0YWZGaWVsZElucHV0OlxuXHRcdFx0XHRcdHR5cGU6ICdmaWxlVXBsb2FkJ1xuXHRcdFx0XHRcdGNvbGxlY3Rpb246ICdmaWxlcydcblx0Y29sbFtjYXRlZ29yeV0uYWxsb3dcblx0XHRpbnNlcnQ6IC0+IHRydWVcblx0XHR1cGRhdGU6IC0+IHRydWVcblx0XHRyZW1vdmU6IC0+IHRydWVcblx0aWYgTWV0ZW9yLmlzU2VydmVyXG5cdFx0TWV0ZW9yLnB1Ymxpc2ggY2F0ZWdvcnksIC0+IGNvbGxbY2F0ZWdvcnldLmZpbmQge31cblxubWFrZUJvdGggaS5uYW1lIGZvciBpIGluIGNhdGVnb3JpZXNcblxuTWV0ZW9yLm1ldGhvZHNcblx0cmVtb3ZlUGFnZTogKGNhdGVnb3J5LCBwYWdlSWQpIC0+XG5cdFx0Y29sbFtjYXRlZ29yeV0ucmVtb3ZlIF9pZDogcGFnZUlkXG5cblx0cmVtb3ZlRmlsZTogKGZpbGVJZCkgLT5cblx0XHRmaWxlcy5yZW1vdmUgX2lkOiBmaWxlSWRcbiIsImlmIE1ldGVvci5pc0NsaWVudFxuXG5cdGN1cnJlbnRSb3V0ZSA9IChjYikgLT4gUm91dGVyLmN1cnJlbnQoKS5yb3V0ZS5nZXROYW1lKClcblxuXHRUZW1wbGF0ZS5yZWdpc3RlckhlbHBlciAnc2hvd0FkZCcsIC0+IFNlc3Npb24uZ2V0ICdzaG93QWRkJ1xuXHRUZW1wbGF0ZS5yZWdpc3RlckhlbHBlciAnZWRpdERhdGEnLCAtPiBTZXNzaW9uLmdldCAnZWRpdERhdGEnXG5cdFRlbXBsYXRlLnJlZ2lzdGVySGVscGVyICdyZWFkRGF0YScsIC0+IFNlc3Npb24uZ2V0ICdyZWFkRGF0YSdcblx0VGVtcGxhdGUucmVnaXN0ZXJIZWxwZXIgJ3RoZUNvbGwnLCAtPiBjb2xsW2N1cnJlbnRSb3V0ZSAocmVzKSAtPiByZXNdXG5cdFRlbXBsYXRlLnJlZ2lzdGVySGVscGVyICd0aGVTY2hlbWEnLCAtPiBzY2hlbWFbY3VycmVudFJvdXRlIChyZXMpIC0+IHJlc11cblx0VGVtcGxhdGUucmVnaXN0ZXJIZWxwZXIgJ2xvZ2dlZEluJywgLT4gdHJ1ZSBpZiBNZXRlb3IudXNlcklkKClcblxuXHRUZW1wbGF0ZS5yZWdpc3RlckhlbHBlciAnY2F0ZWdvcnknLCAtPlxuXHRcdF8uZmluZFdoZXJlIGNhdGVnb3JpZXMsIG5hbWU6IGN1cnJlbnRSb3V0ZSAocmVzKSAtPiByZXNcblxuXHRUZW1wbGF0ZS5yZWdpc3RlckhlbHBlciAnZm9ybU1vZGUnLCAtPlxuXHRcdHNob3dBZGQgPSBTZXNzaW9uLmdldCAnc2hvd0FkZCdcblx0XHRlZGl0RGF0YSA9IFNlc3Npb24uZ2V0ICdlZGl0RGF0YSdcblx0XHRyZWFkRGF0YSA9IFNlc3Npb24uZ2V0ICdyZWFkRGF0YSdcblx0XHR0cnVlIGlmIHNob3dBZGQgb3IgZWRpdERhdGEgb3IgcmVhZERhdGFcblxuXHRUZW1wbGF0ZS5ib2R5LmV2ZW50c1xuXHRcdCdjbGljayAjc2hvd0FkZCc6IC0+XG5cdFx0XHRTZXNzaW9uLnNldCAnc2hvd0FkZCcsIHRydWVcblx0XHQnY2xpY2sgI2Nsb3NlJzogLT5cblx0XHRcdFNlc3Npb24uc2V0ICdzaG93QWRkJywgZmFsc2Vcblx0XHRcdFNlc3Npb24uc2V0ICdlZGl0RGF0YScsIG51bGxcblx0XHRcdFNlc3Npb24uc2V0ICdyZWFkRGF0YScsIG51bGxcblxuXHRUZW1wbGF0ZS5ob21lLm9uUmVuZGVyZWQgLT5cblx0XHQkKCcucGFyYWxsYXgnKS5wYXJhbGxheCgpXG5cblx0VGVtcGxhdGUubWVudS5vblJlbmRlcmVkIC0+XG5cdFx0JCgnLmRyb3Bkb3duLWJ1dHRvbicpLmRyb3Bkb3duXG5cdFx0XHRjb25zdHJhaW5XaWR0aDogdHJ1ZVxuXHRcdFx0YmVsb3dPcmlnaW46IHRydWVcblx0XHRcdGhvdmVyOiB0cnVlXG5cblx0VGVtcGxhdGUubWVudS5oZWxwZXJzXG5cdFx0dXNlckVtYWlsOiAtPiBNZXRlb3IudXNlcigpLmVtYWlsc1swXS5hZGRyZXNzXG5cdFx0bWVudVBlckxpbmc6IC0+IGNhdGVnb3JpZXNbMC4uMl1cblx0XHRtZW51QW1kYWw6IC0+IGNhdGVnb3JpZXNbMy4uM11cblx0XHRtZW51U2VtZXN0ZXI6IC0+IGNhdGVnb3JpZXNbNC4uNF1cblx0XHRtZW51U2xoZDogLT4gY2F0ZWdvcmllc1s1Li41XVxuXHRcdG1lbnVEaWtwbGhkOiAtPiBjYXRlZ29yaWVzWzYuLjZdXG5cdFx0bWVudUxhazogLT4gY2F0ZWdvcmllc1s3Li43XVxuXHRcdG1lbnVQZXJhdHVyYW46IC0+IGNhdGVnb3JpZXNbOC4uMTZdXG5cdFx0aXppbjogLT4gY2F0ZWdvcmllc1sxNy4uMjBdXG5cdFx0a2luZXJqYTogLT4gY2F0ZWdvcmllc1syMS4uMjNdXG5cdFx0bGFwb3I6IC0+IGNhdGVnb3JpZXNbMjQuLjI5XVxuXHRcdHNvcDogLT4gY2F0ZWdvcmllc1szMC4uMzNdXG5cdFx0YWR1YW46IC0+IGNhdGVnb3JpZXNbMzQuLjM2XVxuXG5cdFRlbXBsYXRlLmJsb2cuaGVscGVyc1xuXHRcdHJvdXRlSXM6IChuYW1lKSAtPiBSb3V0ZXIuY3VycmVudCgpLnJvdXRlLmdldE5hbWUoKSBpcyBuYW1lXG5cdFx0ZGF0YXM6IChvbmUsIHR3byktPlxuXHRcdFx0Xy5tYXAgY29sbFtjdXJyZW50Um91dGUgKHJlcykgLT4gcmVzXS5maW5kKCkuZmV0Y2goKSwgKGl0ZW0pIC0+XG5cdFx0XHRcdGl0ZW0uc2hvcnQgPSBpdGVtLnRleHRbMC4uMzAwXS5yZXBsYWNlIC88KD86LnxcXG4pKj8+L2dtLCAnJ1xuXHRcdFx0XHRpdGVtXG5cblx0VGVtcGxhdGUuYmxvZy5ldmVudHNcblx0XHQnY2xpY2sgI2VkaXQnOiAtPiBTZXNzaW9uLnNldCAnZWRpdERhdGEnLCB0aGlzXG5cdFx0J2NsaWNrICNyZWFkJzogLT4gU2Vzc2lvbi5zZXQgJ3JlYWREYXRhJywgdGhpc1xuXHRcdCdjbGljayAjcmVtb3ZlJzogLT5cblx0XHRcdHJvdXRlID0gY3VycmVudFJvdXRlIChyZXMpIC0+IHJlc1xuXHRcdFx0ZGF0YSA9IHRoaXNcblx0XHRcdGRpYWxvZyA9XG5cdFx0XHRcdG1lc3NhZ2U6ICdZYWtpbiBoYXB1cyBkYXRhPydcblx0XHRcdFx0dGl0bGU6ICdLb25maXJtYXNpJ1xuXHRcdFx0XHRva1RleHQ6ICdZYSdcblx0XHRcdFx0c3VjY2VzczogdHJ1ZVxuXHRcdFx0XHRmb2N1czogJ2NhbmNlbCdcblx0XHRcdGNvbmZpcm1SZW1vdmUgPSBuZXcgQ29uZmlybWF0aW9uIGRpYWxvZywgKG9rKSAtPlxuXHRcdFx0XHRpZiBva1xuXHRcdFx0XHRcdE1ldGVvci5jYWxsICdyZW1vdmVQYWdlJywgcm91dGUsIGRhdGEuX2lkXG5cdFx0XHRcdFx0Zm9yIGkgaW4gZGF0YS5maWxlc1xuXHRcdFx0XHRcdFx0TWV0ZW9yLmNhbGwgJ3JlbW92ZUZpbGUnLCBpXG5cdFx0J2NsaWNrICNleHBhbmQnOiAoZXZlbnQpLT5cblx0XHRcdCQoJy50cnVuY2F0ZScpLnJlbW92ZUNsYXNzICd0cnVuY2F0ZSdcblx0XHRcdCQoJyNleHBhbmQnKS5hZGRDbGFzcyAnaGlkZSdcblxuXHRUZW1wbGF0ZS5lZGl0LmhlbHBlcnNcblx0XHRkYXRhOiAtPiBTZXNzaW9uLmdldCAnZWRpdERhdGEnXG5cblx0VGVtcGxhdGUucmVhZC5vblJlbmRlcmVkIC0+XG5cdFx0JCgnLm1hdGVyaWFsYm94ZWQnKS5tYXRlcmlhbGJveCgpXG5cblx0VGVtcGxhdGUucmVhZC5oZWxwZXJzXG5cdFx0ZGF0YTogLT5cblx0XHRcdGNvbnRlbnQgPSBTZXNzaW9uLmdldCAncmVhZERhdGEnXG5cdFx0XHRjb250ZW50LmRhdGUgPSBtb21lbnQoY29udGVudC5kYXRlKS5mb3JtYXQgJ2RkZGQgRG8gTU1NIFlZJ1xuXHRcdFx0Y29udGVudFxuXHRcdGZpbGVzOiAtPlxuXHRcdFx0Zm9yIGkgaW4gU2Vzc2lvbi5nZXQoJ3JlYWREYXRhJykuZmlsZXNcblx0XHRcdFx0TWV0ZW9yLnN1YnNjcmliZSAnZmlsZScsIGlcblx0XHRcdGZpbGVzLmZpbmQoKS5mZXRjaCgpXG5cblx0QXV0b0Zvcm0uYWRkSG9va3MgbnVsbCwgYWZ0ZXI6XG5cdFx0aW5zZXJ0OiAtPiBTZXNzaW9uLnNldCAnc2hvd0FkZCcsIGZhbHNlXG5cdFx0dXBkYXRlOiAtPiBTZXNzaW9uLnNldCAnZWRpdERhdGEnLCBudWxsXG5cblx0TWV0ZW9yLnN0YXJ0dXAgLT5cblx0XHRBY2NvdW50c0VudHJ5LmNvbmZpZ1xuXHRcdFx0aG9tZVJvdXRlOiAnLydcblx0XHRcdGRhc2hib2FyZFJvdXRlOiAnLydcblx0XHRcdHdhaXRFbWFpbFZlcmlmaWNhdGlvbjogZmFsc2VcbiIsImlmIE1ldGVvci5pc1NlcnZlclxuXG5cdE1ldGVvci5wdWJsaXNoICdwYWdlcycsIC0+IHBhZ2VzLmZpbmQge31cblxuXHRNZXRlb3IucHVibGlzaCAnZmlsZScsIChpZCkgLT4gZmlsZXMuZmluZCBfaWQ6IGlkXG4iXX0=
