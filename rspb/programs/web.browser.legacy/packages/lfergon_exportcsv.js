//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


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






(function () {

////////////////////////////////////////////////////////////////////////////////////////
//                                                                                    //
// packages/lfergon:exportcsv/lib/FileSaver.min.js                                    //
//                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////
                                                                                      //
/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */   // 1
saveAs=saveAs||(navigator.msSaveBlob&&navigator.msSaveBlob.bind(navigator))||(function(h){var r=h.document,l=function(){return h.URL||h.webkitURL||h},e=h.URL||h.webkitURL||h,n=r.createElementNS("http://www.w3.org/1999/xhtml","a"),g="download" in n,j=function(t){var s=r.createEvent("MouseEvents");s.initMouseEvent("click",true,false,h,0,0,0,0,0,false,false,false,false,0,null);t.dispatchEvent(s)},o=h.webkitRequestFileSystem,p=h.requestFileSystem||o||h.mozRequestFileSystem,m=function(s){(h.setImmediate||h.setTimeout)(function(){throw s},0)},c="application/octet-stream",k=0,b=[],i=function(){var t=b.length;while(t--){var s=b[t];if(typeof s==="string"){e.revokeObjectURL(s)}else{s.remove()}}b.length=0},q=function(t,s,w){s=[].concat(s);var v=s.length;while(v--){var x=t["on"+s[v]];if(typeof x==="function"){try{x.call(t,w||t)}catch(u){m(u)}}}},f=function(t,u){var v=this,B=t.type,E=false,x,w,s=function(){var F=l().createObjectURL(t);b.push(F);return F},A=function(){q(v,"writestart progress write writeend".split(" "))},D=function(){if(E||!x){x=s(t)}if(w){w.location.href=x}v.readyState=v.DONE;A()},z=function(F){return function(){if(v.readyState!==v.DONE){return F.apply(this,arguments)}}},y={create:true,exclusive:false},C;v.readyState=v.INIT;if(!u){u="download"}if(g){x=s(t);n.href=x;n.download=u;j(n);v.readyState=v.DONE;A();return}if(h.chrome&&B&&B!==c){C=t.slice||t.webkitSlice;t=C.call(t,0,t.size,c);E=true}if(o&&u!=="download"){u+=".download"}if(B===c||o){w=h}else{w=h.open()}if(!p){D();return}k+=t.size;p(h.TEMPORARY,k,z(function(F){F.root.getDirectory("saved",y,z(function(G){var H=function(){G.getFile(u,y,z(function(I){I.createWriter(z(function(J){J.onwriteend=function(K){w.location.href=I.toURL();b.push(I);v.readyState=v.DONE;q(v,"writeend",K)};J.onerror=function(){var K=J.error;if(K.code!==K.ABORT_ERR){D()}};"writestart progress write abort".split(" ").forEach(function(K){J["on"+K]=v["on"+K]});J.write(t);v.abort=function(){J.abort();v.readyState=v.DONE};v.readyState=v.WRITING}),D)}),D)};G.getFile(u,{create:false},z(function(I){I.remove();H()}),z(function(I){if(I.code===I.NOT_FOUND_ERR){H()}else{D()}}))}),D)}),D)},d=f.prototype,a=function(s,t){return new f(s,t)};d.abort=function(){var s=this;s.readyState=s.DONE;q(s,"abort")};d.readyState=d.INIT=0;d.WRITING=1;d.DONE=2;d.error=d.onwritestart=d.onprogress=d.onwrite=d.onabort=d.onerror=d.onwriteend=null;h.addEventListener("unload",i,false);return a}(self));
                                                                                      // 3
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
