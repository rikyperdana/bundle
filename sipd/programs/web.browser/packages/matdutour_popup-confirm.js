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
var $ = Package.jquery.$;
var jQuery = Package.jquery.jQuery;
var Template = Package['templating-runtime'].Template;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var Spacebars = Package.spacebars.Spacebars;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var Confirmation;

(function(){

/////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                         //
// packages/matdutour_popup-confirm/lib/template.popup-confirm.js                          //
//                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////
                                                                                           //
                                                                                           // 1
Template.__checkName("popup_confirm");                                                     // 2
Template["popup_confirm"] = new Template("Template.popup_confirm", (function() {           // 3
  var view = this;                                                                         // 4
  return [ HTML.Raw('<div class="pc-dimmer"></div>\n  '), HTML.DIV({                       // 5
    class: "pc-container pc-enter",                                                        // 6
    id: function() {                                                                       // 7
      return Spacebars.mustache(view.lookup("_id"));                                       // 8
    }                                                                                      // 9
  }, "\n    ", HTML.DIV("\n      ", HTML.H3(Blaze.View("lookup:title", function() {        // 10
    return Spacebars.mustache(view.lookup("title"));                                       // 11
  })), "\n      ", HTML.DIV(Blaze.View("lookup:message", function() {                      // 12
    return Spacebars.makeRaw(Spacebars.mustache(view.lookup("message")));                  // 13
  })), "\n      ", HTML.BUTTON({                                                           // 14
    class: "pc-button pc-button-cancel",                                                   // 15
    id: "pc-cancel"                                                                        // 16
  }, HTML.SPAN(Blaze.View("lookup:cancelText", function() {                                // 17
    return Spacebars.mustache(view.lookup("cancelText"));                                  // 18
  }))), "\n      ", HTML.BUTTON({                                                          // 19
    class: function() {                                                                    // 20
      return [ "pc-button ", Blaze.If(function() {                                         // 21
        return Spacebars.call(view.lookup("success"));                                     // 22
      }, function() {                                                                      // 23
        return "pc-button-success";                                                        // 24
      }, function() {                                                                      // 25
        return "pc-button-error";                                                          // 26
      }) ];                                                                                // 27
    },                                                                                     // 28
    id: "pc-ok"                                                                            // 29
  }, HTML.SPAN(Blaze.View("lookup:okText", function() {                                    // 30
    return Spacebars.mustache(view.lookup("okText"));                                      // 31
  }))), "\n    "), "\n  ") ];                                                              // 32
}));                                                                                       // 33
                                                                                           // 34
/////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                         //
// packages/matdutour_popup-confirm/lib/popup-confirm.js                                   //
//                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////
                                                                                           //
Confirmation = (function () {                                                              // 1
  function Confirmation(_options, _callback) {                                             // 2
    var self = this;                                                                       // 3
                                                                                           // 4
    this._callback = _callback;                                                            // 5
                                                                                           // 6
    this._id = new Mongo.ObjectID().toHexString();                                         // 7
                                                                                           // 8
    this.options = {                                                                       // 9
      message: _options.message || "",                                                     // 10
      title: _options.title || "",                                                         // 11
      cancelText: _options.cancelText || "Cancel",                                         // 12
      okText: _options.okText || "Ok",                                                     // 13
      success: _options.success,                                                           // 14
      focus: _options.focus || "cancel",                                                   // 15
      _id: this._id                                                                        // 16
    };                                                                                     // 17
                                                                                           // 18
    this.view = Blaze.renderWithData(Template.popup_confirm, this.options, document.body);
                                                                                           // 20
    Meteor.setTimeout(function() {self._init();}, 50);                                     // 21
                                                                                           // 22
  }                                                                                        // 23
                                                                                           // 24
  Confirmation.prototype._init = function () {                                             // 25
    this.popup   = $("#" + this._id);                                                      // 26
                                                                                           // 27
    if(!this.popup) {                                                                      // 28
      var self = this;                                                                     // 29
      Meteor.setTimeout(function() { self._init(); }, 50);                                 // 30
      return;                                                                              // 31
    }                                                                                      // 32
                                                                                           // 33
    this.okButton      = this.popup.find("#pc-ok");                                        // 34
    this.cancelButton  = this.popup.find("#pc-cancel");                                    // 35
                                                                                           // 36
    if (this.options.focus.toLowerCase() === 'ok') this.okButton.focus();                  // 37
    else if (this.options.focus.toLowerCase() === 'cancel') this.cancelButton.focus();     // 38
                                                                                           // 39
    // TODO create a form and listen to submit                                             // 40
    this._okListener = this._okListener.bind(this);                                        // 41
    this._cancelListener = this._cancelListener.bind(this);                                // 42
                                                                                           // 43
    this.okButton.bind('click', this._okListener);                                         // 44
    this.cancelButton.bind('click', this._cancelListener);                                 // 45
  };                                                                                       // 46
                                                                                           // 47
  Confirmation.prototype._destroy = function () {                                          // 48
    Blaze.remove(this.view);                                                               // 49
  };                                                                                       // 50
                                                                                           // 51
  Confirmation.prototype._hide = function () {                                             // 52
    this.okButton.unbind('click', this._okListener);                                       // 53
    this.cancelButton.unbind('click', this._cancelListener);                               // 54
                                                                                           // 55
    var self = this;                                                                       // 56
    this.popup.addClass('pc-leave');                                                       // 57
    $(".pc-dimmer").addClass('pc-leave');                                                  // 58
    Meteor.setTimeout( function() { self._destroy(); }, 500 );                             // 59
  };                                                                                       // 60
                                                                                           // 61
  Confirmation.prototype._okListener = function () {                                       // 62
    this._hide();                                                                          // 63
    this._callback(true);                                                                  // 64
  };                                                                                       // 65
                                                                                           // 66
  Confirmation.prototype._cancelListener = function () {                                   // 67
    this._hide();                                                                          // 68
    this._callback(false);                                                                 // 69
  };                                                                                       // 70
                                                                                           // 71
  return Confirmation;                                                                     // 72
                                                                                           // 73
})();                                                                                      // 74
                                                                                           // 75
/////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['matdutour:popup-confirm'] = {}, {
  Confirmation: Confirmation
});

})();
