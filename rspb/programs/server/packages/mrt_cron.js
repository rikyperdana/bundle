(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;

(function(){

/////////////////////////////////////////////////////////////////////////////////////
//                                                                                 //
// packages/mrt_cron/packages/mrt_cron.js                                          //
//                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////
                                                                                   //
(function () {

//////////////////////////////////////////////////////////////////////////////
//                                                                          //
// packages/mrt:cron/meteor.cron.js                                         //
//                                                                          //
//////////////////////////////////////////////////////////////////////////////
                                                                            //
// Generated by CoffeeScript 1.6.2                                          // 1
(function() {                                                               // 2
  Meteor.Cron = (function() {                                               // 3
    Cron.prototype.delay = 1000 * 60;                                       // 4
                                                                            // 5
    Cron.prototype.events = [];                                             // 6
                                                                            // 7
    function Cron(options) {                                                // 8
      if (options != null ? options.delay : void 0) {                       // 9
        this.delay = options.delay;                                         // 10
      }                                                                     // 11
      if (options != null ? options.events : void 0) {                      // 12
        this.convert(options.events);                                       // 13
      }                                                                     // 14
      this["do"]();                                                         // 15
      this.watch();                                                         // 16
    }                                                                       // 17
                                                                            // 18
    Cron.prototype.convert = function(events) {                             // 19
      var cron, event, isDate, isDay, isHour, isMin, isMon, self, _results; // 20
                                                                            // 21
      self = this;                                                          // 22
      _results = [];                                                        // 23
      for (event in events) {                                               // 24
        cron = event.split(/\s/);                                           // 25
        if (cron[0] >= 0 && cron[0] <= 59 || cron[0] === '*') {             // 26
          isMin = 1;                                                        // 27
        }                                                                   // 28
        if (cron[1] >= 0 && cron[1] <= 23 || cron[1] === '*') {             // 29
          isHour = 1;                                                       // 30
        }                                                                   // 31
        if (cron[2] >= 0 && cron[2] <= 31 || cron[2] === '*') {             // 32
          isDate = 1;                                                       // 33
        }                                                                   // 34
        if (cron[3] >= 0 && cron[3] <= 12 || cron[3] === '*') {             // 35
          isMon = 1;                                                        // 36
        }                                                                   // 37
        if (cron[4] >= 0 && cron[4] <= 6 || cron[4] === '*') {              // 38
          isDay = 1;                                                        // 39
        }                                                                   // 40
        if (isMin && isHour && isDate && isMon && isDay) {                  // 41
          _results.push(self.events.push({                                  // 42
            cron: cron,                                                     // 43
            func: events[event]                                             // 44
          }));                                                              // 45
        } else {                                                            // 46
          _results.push(void 0);                                            // 47
        }                                                                   // 48
      }                                                                     // 49
      return _results;                                                      // 50
    };                                                                      // 51
                                                                            // 52
    Cron.prototype.watch = function() {                                     // 53
      var self;                                                             // 54
                                                                            // 55
      self = this;                                                          // 56
      return Meteor.setInterval(function() {                                // 57
        return self["do"]();                                                // 58
      }, self.delay);                                                       // 59
    };                                                                      // 60
                                                                            // 61
    Cron.prototype.doEvent = function(event) {                              // 62
      var cron, isDate, isDay, isHour, isMin, isMon;                        // 63
                                                                            // 64
      cron = event.cron;                                                    // 65
      if (cron[0] === "" + this.now.getMinutes() || cron[0] === '*') {      // 66
        isMin = 1;                                                          // 67
      }                                                                     // 68
      if (cron[1] === "" + this.now.getHours() || cron[1] === '*') {        // 69
        isHour = 1;                                                         // 70
      }                                                                     // 71
      if (cron[2] === "" + this.now.getDate() || cron[2] === '*') {         // 72
        isDate = 1;                                                         // 73
      }                                                                     // 74
      if (cron[3] === "" + this.now.getMonth() || cron[3] === '*') {        // 75
        isMon = 1;                                                          // 76
      }                                                                     // 77
      if (cron[4] === "" + this.now.getDay() || cron[4] === '*') {          // 78
        isDay = 1;                                                          // 79
      }                                                                     // 80
      if (isMin && isHour && isDate && isMon && isDay) {                    // 81
        return event.func();                                                // 82
      }                                                                     // 83
    };                                                                      // 84
                                                                            // 85
    Cron.prototype["do"] = function() {                                     // 86
      var event, _i, _len, _ref, _results;                                  // 87
                                                                            // 88
      this.now = new Date();                                                // 89
      _ref = this.events;                                                   // 90
      _results = [];                                                        // 91
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {                   // 92
        event = _ref[_i];                                                   // 93
        _results.push(this.doEvent(event));                                 // 94
      }                                                                     // 95
      return _results;                                                      // 96
    };                                                                      // 97
                                                                            // 98
    return Cron;                                                            // 99
                                                                            // 100
  })();                                                                     // 101
                                                                            // 102
}).call(this);                                                              // 103
                                                                            // 104
//////////////////////////////////////////////////////////////////////////////

}).call(this);

/////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
Package._define("mrt:cron");

})();
