(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;

/* Package-scope variables */
var ExportCSV, line, exportcsv, saveAs;

(function(){

//////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                          //
// packages/lfergon_exportcsv/packages/lfergon_exportcsv.js                                 //
//                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////
                                                                                            //
(function () {

////////////////////////////////////////////////////////////////////////////////////////
//                                                                                    //
// packages/lfergon:exportcsv/lib/exportcsv.js                                        //
//                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////
                                                                                      //
ExportCSV = function() {                                                              // 1
                                                                                      // 2
};                                                                                    // 3
                                                                                      // 4
/**                                                                                   // 5
 * [exportcsv description]                                                            // 6
 * @param  {[type]} dataFromCollection [description]                                  // 7
 * @return {[type]}                    [description]                                  // 8
 */                                                                                   // 9
ExportCSV.prototype.exportToCSV = function (dataFromCollection, heading, delimiter) { // 10
  heading = heading ? heading : true;                                                 // 11
  delimiter = delimiter ? delimiter : ",";                                            // 12
                                                                                      // 13
  if (dataFromCollection && dataFromCollection.length === 0) {                        // 14
    return 'Not a valid array';                                                       // 15
  }                                                                                   // 16
  if (dataFromCollection === undefined) {                                             // 17
    return 'No results for the query';                                                // 18
  }                                                                                   // 19
  var str = '';                                                                       // 20
  // var line = '';                                                                   // 21
  // if (dataFromCollection.length > 0) {                                             // 22
  //   for (var property in dataFromCollection[0]) {                                  // 23
  //     if (dataFromCollection[0].hasOwnProperty(property)) {                        // 24
  //       line += property + delimiter;                                              // 25
  //     }                                                                            // 26
  //   }                                                                              // 27
  //   str += line.slice(0, -1) + '\r\n';                                             // 28
  // }                                                                                // 29
                                                                                      // 30
  // Insert heading values                                                            // 31
  if (heading) {                                                                      // 32
    var heading = Object.keys(dataFromCollection[0])                                  // 33
    str += heading.join(delimiter) + "\r\n"                                           // 34
  }                                                                                   // 35
                                                                                      // 36
  // Generate CSV                                                                     // 37
  for (var i = 0; i < dataFromCollection.length; i++) {                               // 38
    var lineFor = '';                                                                 // 39
    for (var key in dataFromCollection[i]) {                                          // 40
      if (dataFromCollection[i].hasOwnProperty(key)){                                 // 41
        var data = dataFromCollection[i][key];                                        // 42
        var dataString;                                                               // 43
                                                                                      // 44
        if (typeof data === 'number')                                                 // 45
          dataString = data.toString();                                               // 46
        else                                                                          // 47
          dataString = data.toString("utf8");                                         // 48
                                                                                      // 49
        if (dataString.length === 0) {                                                // 50
          lineFor += delimiter;                                                       // 51
        } else if (typeof data === 'object') {                                        // 52
                                                                                      // 53
          // Object is date                                                           // 54
          if (Object.prototype.toString.call(data) === '[object Date]') {             // 55
            lineFor += data.toISOString() + delimiter                                 // 56
          } else {                                                                    // 57
            lineFor += "[Object Object]" + delimiter;                                 // 58
          }                                                                           // 59
        }else {                                                                       // 60
          lineFor += dataString + delimiter;                                          // 61
        }                                                                             // 62
      }                                                                               // 63
    }                                                                                 // 64
    line = lineFor.slice(0, -1);                                                      // 65
    str += line + '\r\n';                                                             // 66
  }                                                                                   // 67
  return str;                                                                         // 68
};                                                                                    // 69
                                                                                      // 70
exportcsv = new ExportCSV();                                                          // 71
                                                                                      // 72
////////////////////////////////////////////////////////////////////////////////////////

}).call(this);

//////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
Package._define("lfergon:exportcsv", {
  exportcsv: exportcsv,
  saveAs: saveAs
});

})();
