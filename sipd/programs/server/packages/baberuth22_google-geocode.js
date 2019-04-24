(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var HTTP = Package.http.HTTP;
var HTTPInternals = Package.http.HTTPInternals;

/* Package-scope variables */
var geocode;

(function(){

////////////////////////////////////////////////////////////////////////////////////
//                                                                                //
// packages/baberuth22_google-geocode/google-geocode.js                           //
//                                                                                //
////////////////////////////////////////////////////////////////////////////////////
                                                                                  //
geocode = {
	data: { },
	getActualLocation: function (url, callback) {
		var self = this;
		HTTP.call('GET', url, { timeout: 5000 }, function (err, result) {
			if (err){
				callback(err);
			}

			if (result.statusCode === 200) {
				self.data = JSON.parse(result.content);
				callback(self.data);
			}
		});
	},
	getSecureLocation: function (address, callback) {
		var url = 'https://maps.googleapis.com/maps/api/geocode/json?address='+address;
		this.getActualLocation(url, callback);
	},
	getLocation: function(address, callback){
		var url = 'http://maps.googleapis.com/maps/api/geocode/json?address='+address;
		this.getActualLocation(url, callback);
	},
	getAddrObj: function(){
		return this.data.results[0].address_components.map(function(comp){
			// console.log(comp.types[0])
			return {
				'longName': comp.long_name,
				'shortName': comp.short_name,
				'type': comp.types[0]
			}
		})
	},
	getAddrStr: function(){
		return this.data.results[0].formatted_address;
	},
	getStreetNumber: function() {
        var streetNumber;
        this.getAddrObj().forEach(function(comp) {
            if (comp.type === 'street_number') streetNumber = comp.longName;
        });
        return streetNumber;
    },
    getStreet: function() {
        var street;
        this.getAddrObj().forEach(function(comp) {
            if (comp.type === 'route') street = comp.longName;
        });
        return street;
    },
    getSuburb: function() {
        var suburb;
        this.getAddrObj().forEach(function(comp) {
            if (comp.type === 'neighborhood') suburb = comp.longName;
        });
        return suburb;
    },
    getCity: function() {
        var city;
        this.getAddrObj().forEach(function(comp) {
            if (comp.type === 'locality') city = comp.longName;
        });
        return city;
    },
	getPostalCode: function() {
        var postalCode;
        this.getAddrObj().forEach(function(comp) {
            if (comp.type === 'postal_code') postalCode = comp.longName;
        });
        return postalCode;
    },
    getCountry: function() {
        var country;
        this.getAddrObj().forEach(function(comp) {
            if (comp.type === 'country') country = comp.longName;
        });
        return country;
    }
};

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
