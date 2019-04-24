(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;

/* Package-scope variables */
var shell;

(function(){

////////////////////////////////////////////////////////////////////////////
//                                                                        //
// packages/izzilab_shelljs/packages/izzilab_shelljs.js                   //
//                                                                        //
////////////////////////////////////////////////////////////////////////////
                                                                          //
(function () {

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/izzilab:shelljs/shelljs.js                               //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
shell = Npm.require('shelljs');                                      // 1
///////////////////////////////////////////////////////////////////////

}).call(this);

////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['izzilab:shelljs'] = {}, {
  shell: shell
});

})();
