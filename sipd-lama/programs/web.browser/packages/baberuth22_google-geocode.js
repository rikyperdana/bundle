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
var HTTP = Package.http.HTTP;

/* Package-scope variables */
var geocode;

(function(){

////////////////////////////////////////////////////////////////////////////////////
//                                                                                //
// packages/baberuth22_google-geocode/google-geocode.js                           //
//                                                                                //
////////////////////////////////////////////////////////////////////////////////////
                                                                                  //
geocode = {                                                                       // 1
	data: { },                                                                       // 2
	getActualLocation: function (url, callback) {                                    // 3
		var self = this;                                                                // 4
		HTTP.call('GET', url, { timeout: 5000 }, function (err, result) {               // 5
			if (err){                                                                      // 6
				callback(err);                                                                // 7
			}                                                                              // 8
                                                                                  // 9
			if (result.statusCode === 200) {                                               // 10
				self.data = JSON.parse(result.content);                                       // 11
				callback(self.data);                                                          // 12
			}                                                                              // 13
		});                                                                             // 14
	},                                                                               // 15
	getSecureLocation: function (address, callback) {                                // 16
		var url = 'https://maps.googleapis.com/maps/api/geocode/json?address='+address;
		this.getActualLocation(url, callback);                                          // 18
	},                                                                               // 19
	getLocation: function(address, callback){                                        // 20
		var url = 'http://maps.googleapis.com/maps/api/geocode/json?address='+address;  // 21
		this.getActualLocation(url, callback);                                          // 22
	},                                                                               // 23
	getAddrObj: function(){                                                          // 24
		return this.data.results[0].address_components.map(function(comp){              // 25
			// console.log(comp.types[0])                                                  // 26
			return {                                                                       // 27
				'longName': comp.long_name,                                                   // 28
				'shortName': comp.short_name,                                                 // 29
				'type': comp.types[0]                                                         // 30
			}                                                                              // 31
		})                                                                              // 32
	},                                                                               // 33
	getAddrStr: function(){                                                          // 34
		return this.data.results[0].formatted_address;                                  // 35
	},                                                                               // 36
	getStreetNumber: function() {                                                    // 37
        var streetNumber;                                                         // 38
        this.getAddrObj().forEach(function(comp) {                                // 39
            if (comp.type === 'street_number') streetNumber = comp.longName;      // 40
        });                                                                       // 41
        return streetNumber;                                                      // 42
    },                                                                            // 43
    getStreet: function() {                                                       // 44
        var street;                                                               // 45
        this.getAddrObj().forEach(function(comp) {                                // 46
            if (comp.type === 'route') street = comp.longName;                    // 47
        });                                                                       // 48
        return street;                                                            // 49
    },                                                                            // 50
    getSuburb: function() {                                                       // 51
        var suburb;                                                               // 52
        this.getAddrObj().forEach(function(comp) {                                // 53
            if (comp.type === 'neighborhood') suburb = comp.longName;             // 54
        });                                                                       // 55
        return suburb;                                                            // 56
    },                                                                            // 57
    getCity: function() {                                                         // 58
        var city;                                                                 // 59
        this.getAddrObj().forEach(function(comp) {                                // 60
            if (comp.type === 'locality') city = comp.longName;                   // 61
        });                                                                       // 62
        return city;                                                              // 63
    },                                                                            // 64
	getPostalCode: function() {                                                      // 65
        var postalCode;                                                           // 66
        this.getAddrObj().forEach(function(comp) {                                // 67
            if (comp.type === 'postal_code') postalCode = comp.longName;          // 68
        });                                                                       // 69
        return postalCode;                                                        // 70
    },                                                                            // 71
    getCountry: function() {                                                      // 72
        var country;                                                              // 73
        this.getAddrObj().forEach(function(comp) {                                // 74
            if (comp.type === 'country') country = comp.longName;                 // 75
        });                                                                       // 76
        return country;                                                           // 77
    }                                                                             // 78
};                                                                                // 79
                                                                                  // 80
////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['baberuth22:google-geocode'] = {}, {
  geocode: geocode
});

})();
