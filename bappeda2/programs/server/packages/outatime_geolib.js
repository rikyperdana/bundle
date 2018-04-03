(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;

/* Package-scope variables */
var geolib;

(function(){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/outatime_geolib/packages/outatime_geolib.js              //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/outatime:geolib/dist/geolib.js                                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/*! geolib 2.0.15 by Manuel Bieh                                                                                       // 1
* Library to provide geo functions like distance calculation,                                                          // 2
* conversion of decimal coordinates to sexagesimal and vice versa, etc.                                                // 3
* WGS 84 (World Geodetic System 1984)                                                                                  // 4
*                                                                                                                      // 5
* @author Manuel Bieh                                                                                                  // 6
* @url http://www.manuelbieh.com/                                                                                      // 7
* @version 2.0.15                                                                                                      // 8
* @license MIT                                                                                                         // 9
**/;(function(global, undefined) {                                                                                     // 10
                                                                                                                       // 11
	"use strict";                                                                                                         // 12
                                                                                                                       // 13
	function Geolib() {}                                                                                                  // 14
                                                                                                                       // 15
	// Setting readonly defaults                                                                                          // 16
	var geolib = Object.create(Geolib.prototype, {                                                                        // 17
		version: {                                                                                                           // 18
			value: "2.0.15"                                                                                                     // 19
		},                                                                                                                   // 20
		radius: {                                                                                                            // 21
			value: 6378137                                                                                                      // 22
		},                                                                                                                   // 23
		minLat: {                                                                                                            // 24
			value: -90                                                                                                          // 25
		},                                                                                                                   // 26
		maxLat: {                                                                                                            // 27
			value: 90                                                                                                           // 28
		},                                                                                                                   // 29
		minLon: {                                                                                                            // 30
			value: -180                                                                                                         // 31
		},                                                                                                                   // 32
		maxLon: {                                                                                                            // 33
			value: 180                                                                                                          // 34
		},                                                                                                                   // 35
		sexagesimalPattern: {                                                                                                // 36
			value: /^([0-9]{1,3})°\s*([0-9]{1,3}(?:\.(?:[0-9]{1,2}))?)'\s*(([0-9]{1,3}(\.([0-9]{1,2}))?)"\s*)?([NEOSW]?)$/      // 37
		},                                                                                                                   // 38
		measures: {                                                                                                          // 39
			value: Object.create(Object.prototype, {                                                                            // 40
				"m" : {value: 1},                                                                                                  // 41
				"km": {value: 0.001},                                                                                              // 42
				"cm": {value: 100},                                                                                                // 43
				"mm": {value: 1000},                                                                                               // 44
				"mi": {value: (1 / 1609.344)},                                                                                     // 45
				"sm": {value: (1 / 1852.216)},                                                                                     // 46
				"ft": {value: (100 / 30.48)},                                                                                      // 47
				"in": {value: (100 / 2.54)},                                                                                       // 48
				"yd": {value: (1 / 0.9144)}                                                                                        // 49
			})                                                                                                                  // 50
		},                                                                                                                   // 51
		prototype: {                                                                                                         // 52
			value: Geolib.prototype                                                                                             // 53
		},                                                                                                                   // 54
		extend: {                                                                                                            // 55
			value: function(methods, overwrite) {                                                                               // 56
				for(var prop in methods) {                                                                                         // 57
					if(typeof geolib.prototype[prop] === 'undefined' || overwrite === true) {                                         // 58
						geolib.prototype[prop] = methods[prop];                                                                          // 59
					}                                                                                                                 // 60
				}                                                                                                                  // 61
			}                                                                                                                   // 62
		}                                                                                                                    // 63
	});                                                                                                                   // 64
                                                                                                                       // 65
	if (typeof(Number.prototype.toRad) === "undefined") {                                                                 // 66
		Number.prototype.toRad = function() {                                                                                // 67
			return this * Math.PI / 180;                                                                                        // 68
		};                                                                                                                   // 69
	}                                                                                                                     // 70
                                                                                                                       // 71
	if (typeof(Number.prototype.toDeg) === "undefined") {                                                                 // 72
		Number.prototype.toDeg = function() {                                                                                // 73
			return this * 180 / Math.PI;                                                                                        // 74
		};                                                                                                                   // 75
	}                                                                                                                     // 76
                                                                                                                       // 77
	// Here comes the magic                                                                                               // 78
	geolib.extend({                                                                                                       // 79
                                                                                                                       // 80
		decimal: {},                                                                                                         // 81
                                                                                                                       // 82
		sexagesimal: {},                                                                                                     // 83
                                                                                                                       // 84
		distance: null,                                                                                                      // 85
                                                                                                                       // 86
		getKeys: function(point) {                                                                                           // 87
                                                                                                                       // 88
			// GeoJSON Array [longitude, latitude(, elevation)]                                                                 // 89
			if(Object.prototype.toString.call(point) == '[object Array]') {                                                     // 90
                                                                                                                       // 91
				return {                                                                                                           // 92
					longitude: point.length >= 1 ? 0 : undefined,                                                                     // 93
					latitude: point.length >= 2 ? 1 : undefined,                                                                      // 94
					elevation: point.length >= 3 ? 2 : undefined                                                                      // 95
				};                                                                                                                 // 96
                                                                                                                       // 97
			}                                                                                                                   // 98
                                                                                                                       // 99
			var getKey = function(possibleValues) {                                                                             // 100
                                                                                                                       // 101
				var key;                                                                                                           // 102
                                                                                                                       // 103
				possibleValues.every(function(val) {                                                                               // 104
					// TODO: check if point is an object                                                                              // 105
					if(typeof point != 'object') {                                                                                    // 106
						return true;                                                                                                     // 107
					}                                                                                                                 // 108
					return point.hasOwnProperty(val) ? (function() { key = val; return false; }()) : true;                            // 109
				});                                                                                                                // 110
                                                                                                                       // 111
				return key;                                                                                                        // 112
                                                                                                                       // 113
			};                                                                                                                  // 114
                                                                                                                       // 115
			var longitude = getKey(['lng', 'lon', 'longitude']);                                                                // 116
			var latitude = getKey(['lat', 'latitude']);                                                                         // 117
			var elevation = getKey(['alt', 'altitude', 'elevation', 'elev']);                                                   // 118
                                                                                                                       // 119
			// return undefined if not at least one valid property was found                                                    // 120
			if(typeof latitude == 'undefined' &&                                                                                // 121
				typeof longitude == 'undefined' &&                                                                                 // 122
				typeof elevation == 'undefined') {                                                                                 // 123
				return undefined;                                                                                                  // 124
			}                                                                                                                   // 125
                                                                                                                       // 126
			return {                                                                                                            // 127
				latitude: latitude,                                                                                                // 128
				longitude: longitude,                                                                                              // 129
				elevation: elevation                                                                                               // 130
			};                                                                                                                  // 131
                                                                                                                       // 132
		},                                                                                                                   // 133
                                                                                                                       // 134
		// returns latitude of a given point, converted to decimal                                                           // 135
		// set raw to true to avoid conversion                                                                               // 136
		getLat: function(point, raw) {                                                                                       // 137
			return raw === true ? point[this.getKeys(point).latitude] : this.useDecimal(point[this.getKeys(point).latitude]);   // 138
		},                                                                                                                   // 139
                                                                                                                       // 140
		// Alias for getLat                                                                                                  // 141
		latitude: function(point) {                                                                                          // 142
			return this.getLat.call(this, point);                                                                               // 143
		},                                                                                                                   // 144
                                                                                                                       // 145
		// returns longitude of a given point, converted to decimal                                                          // 146
		// set raw to true to avoid conversion                                                                               // 147
		getLon: function(point, raw) {                                                                                       // 148
			return raw === true ? point[this.getKeys(point).longitude] : this.useDecimal(point[this.getKeys(point).longitude]); // 149
		},                                                                                                                   // 150
                                                                                                                       // 151
		// Alias for getLon                                                                                                  // 152
		longitude: function(point) {                                                                                         // 153
			return this.getLon.call(this, point);                                                                               // 154
		},                                                                                                                   // 155
                                                                                                                       // 156
		getElev: function(point) {                                                                                           // 157
			return point[this.getKeys(point).elevation];                                                                        // 158
		},                                                                                                                   // 159
                                                                                                                       // 160
		// Alias for getElev                                                                                                 // 161
		elevation: function(point) {                                                                                         // 162
			return this.getElev.call(this, point);                                                                              // 163
		},                                                                                                                   // 164
                                                                                                                       // 165
		coords: function(point, raw) {                                                                                       // 166
                                                                                                                       // 167
			var retval = {                                                                                                      // 168
				latitude: raw === true ? point[this.getKeys(point).latitude] : this.useDecimal(point[this.getKeys(point).latitude]),
				longitude: raw === true ? point[this.getKeys(point).longitude] : this.useDecimal(point[this.getKeys(point).longitude])
			};                                                                                                                  // 171
                                                                                                                       // 172
			var elev = point[this.getKeys(point).elevation];                                                                    // 173
                                                                                                                       // 174
			if(typeof elev !== 'undefined') {                                                                                   // 175
				retval['elevation'] = elev;                                                                                        // 176
			}                                                                                                                   // 177
                                                                                                                       // 178
			return retval;                                                                                                      // 179
                                                                                                                       // 180
		},                                                                                                                   // 181
                                                                                                                       // 182
		// checks if a variable contains a valid latlong object                                                              // 183
		validate: function(point) {                                                                                          // 184
                                                                                                                       // 185
			var keys = this.getKeys(point);                                                                                     // 186
                                                                                                                       // 187
			if(typeof keys === 'undefined' || typeof keys.latitude === 'undefined' || keys.longitude === 'undefined') {         // 188
				return false;                                                                                                      // 189
			}                                                                                                                   // 190
                                                                                                                       // 191
			var lat = point[keys.latitude];                                                                                     // 192
			var lng = point[keys.longitude];                                                                                    // 193
                                                                                                                       // 194
			if(typeof lat === 'undefined' || !this.isDecimal(lat) && !this.isSexagesimal(lat)) {                                // 195
				return false;                                                                                                      // 196
			}                                                                                                                   // 197
                                                                                                                       // 198
			if(typeof lng === 'undefined' || !this.isDecimal(lng) && !this.isSexagesimal(lng)) {                                // 199
				return false;                                                                                                      // 200
			}                                                                                                                   // 201
                                                                                                                       // 202
			lat = this.useDecimal(lat);                                                                                         // 203
			lng = this.useDecimal(lng);                                                                                         // 204
                                                                                                                       // 205
			if(lat < this.minLat || lat > this.maxLat || lng < this.minLon || lng > this.maxLon) {                              // 206
				return false;                                                                                                      // 207
			}                                                                                                                   // 208
                                                                                                                       // 209
			return true;                                                                                                        // 210
                                                                                                                       // 211
		},                                                                                                                   // 212
                                                                                                                       // 213
		/**                                                                                                                  // 214
		* Calculates geodetic distance between two points specified by latitude/longitude using                              // 215
		* Vincenty inverse formula for ellipsoids                                                                            // 216
		* Vincenty Inverse Solution of Geodesics on the Ellipsoid (c) Chris Veness 2002-2010                                 // 217
		* (Licensed under CC BY 3.0)                                                                                         // 218
		*                                                                                                                    // 219
		* @param    object    Start position {latitude: 123, longitude: 123}                                                 // 220
		* @param    object    End position {latitude: 123, longitude: 123}                                                   // 221
		* @param    integer   Accuracy (in meters)                                                                           // 222
		* @return   integer   Distance (in meters)                                                                           // 223
		*/                                                                                                                   // 224
		getDistance: function(start, end, accuracy) {                                                                        // 225
                                                                                                                       // 226
			accuracy = Math.floor(accuracy) || 1;                                                                               // 227
                                                                                                                       // 228
			var s = this.coords(start);                                                                                         // 229
			var e = this.coords(end);                                                                                           // 230
                                                                                                                       // 231
			var a = 6378137, b = 6356752.314245,  f = 1/298.257223563;  // WGS-84 ellipsoid params                              // 232
			var L = (e['longitude']-s['longitude']).toRad();                                                                    // 233
                                                                                                                       // 234
			var cosSigma, sigma, sinAlpha, cosSqAlpha, cos2SigmaM, sinSigma;                                                    // 235
                                                                                                                       // 236
			var U1 = Math.atan((1-f) * Math.tan(parseFloat(s['latitude']).toRad()));                                            // 237
			var U2 = Math.atan((1-f) * Math.tan(parseFloat(e['latitude']).toRad()));                                            // 238
			var sinU1 = Math.sin(U1), cosU1 = Math.cos(U1);                                                                     // 239
			var sinU2 = Math.sin(U2), cosU2 = Math.cos(U2);                                                                     // 240
                                                                                                                       // 241
			var lambda = L, lambdaP, iterLimit = 100;                                                                           // 242
			do {                                                                                                                // 243
				var sinLambda = Math.sin(lambda), cosLambda = Math.cos(lambda);                                                    // 244
				sinSigma = (                                                                                                       // 245
					Math.sqrt(                                                                                                        // 246
						(                                                                                                                // 247
							cosU2 * sinLambda                                                                                               // 248
						) * (                                                                                                            // 249
							cosU2 * sinLambda                                                                                               // 250
						) + (                                                                                                            // 251
							cosU1 * sinU2 - sinU1 * cosU2 * cosLambda                                                                       // 252
						) * (                                                                                                            // 253
							cosU1 * sinU2 - sinU1 * cosU2 * cosLambda                                                                       // 254
						)                                                                                                                // 255
					)                                                                                                                 // 256
				);                                                                                                                 // 257
				if (sinSigma === 0) {                                                                                              // 258
					return geolib.distance = 0;  // co-incident points                                                                // 259
				}                                                                                                                  // 260
                                                                                                                       // 261
				cosSigma = sinU1 * sinU2 + cosU1 * cosU2 * cosLambda;                                                              // 262
				sigma = Math.atan2(sinSigma, cosSigma);                                                                            // 263
				sinAlpha = cosU1 * cosU2 * sinLambda / sinSigma;                                                                   // 264
				cosSqAlpha = 1 - sinAlpha * sinAlpha;                                                                              // 265
				cos2SigmaM = cosSigma - 2 * sinU1 * sinU2 / cosSqAlpha;                                                            // 266
                                                                                                                       // 267
				if (isNaN(cos2SigmaM)) {                                                                                           // 268
					cos2SigmaM = 0;  // equatorial line: cosSqAlpha=0 (§6)                                                            // 269
				}                                                                                                                  // 270
				var C = (                                                                                                          // 271
					f / 16 * cosSqAlpha * (                                                                                           // 272
						4 + f * (                                                                                                        // 273
							4 - 3 * cosSqAlpha                                                                                              // 274
						)                                                                                                                // 275
					)                                                                                                                 // 276
				);                                                                                                                 // 277
				lambdaP = lambda;                                                                                                  // 278
				lambda = (                                                                                                         // 279
					L + (                                                                                                             // 280
						1 - C                                                                                                            // 281
					) * f * sinAlpha * (                                                                                              // 282
						sigma + C * sinSigma * (                                                                                         // 283
							cos2SigmaM + C * cosSigma * (                                                                                   // 284
								-1 + 2 * cos2SigmaM * cos2SigmaM                                                                               // 285
							)                                                                                                               // 286
						)                                                                                                                // 287
					)                                                                                                                 // 288
				);                                                                                                                 // 289
                                                                                                                       // 290
			} while (Math.abs(lambda-lambdaP) > 1e-12 && --iterLimit>0);                                                        // 291
                                                                                                                       // 292
			if (iterLimit === 0) {                                                                                              // 293
				return NaN;  // formula failed to converge                                                                         // 294
			}                                                                                                                   // 295
                                                                                                                       // 296
			var uSq = (                                                                                                         // 297
				cosSqAlpha * (                                                                                                     // 298
					a * a - b * b                                                                                                     // 299
				) / (                                                                                                              // 300
					b*b                                                                                                               // 301
				)                                                                                                                  // 302
			);                                                                                                                  // 303
                                                                                                                       // 304
			var A = (                                                                                                           // 305
				1 + uSq / 16384 * (                                                                                                // 306
					4096 + uSq * (                                                                                                    // 307
						-768 + uSq * (                                                                                                   // 308
							320 - 175 * uSq                                                                                                 // 309
						)                                                                                                                // 310
					)                                                                                                                 // 311
				)                                                                                                                  // 312
			);                                                                                                                  // 313
                                                                                                                       // 314
			var B = (                                                                                                           // 315
				uSq / 1024 * (                                                                                                     // 316
					256 + uSq * (                                                                                                     // 317
						-128 + uSq * (                                                                                                   // 318
							74-47 * uSq                                                                                                     // 319
						)                                                                                                                // 320
					)                                                                                                                 // 321
				)                                                                                                                  // 322
			);                                                                                                                  // 323
                                                                                                                       // 324
			var deltaSigma = (                                                                                                  // 325
				B * sinSigma * (                                                                                                   // 326
					cos2SigmaM + B / 4 * (                                                                                            // 327
						cosSigma * (                                                                                                     // 328
							-1 + 2 * cos2SigmaM * cos2SigmaM                                                                                // 329
						) -B / 6 * cos2SigmaM * (                                                                                        // 330
							-3 + 4 * sinSigma * sinSigma                                                                                    // 331
						) * (                                                                                                            // 332
							-3 + 4 * cos2SigmaM * cos2SigmaM                                                                                // 333
						)                                                                                                                // 334
					)                                                                                                                 // 335
				)                                                                                                                  // 336
			);                                                                                                                  // 337
                                                                                                                       // 338
			var distance = b * A * (sigma - deltaSigma);                                                                        // 339
                                                                                                                       // 340
			distance = distance.toFixed(3); // round to 1mm precision                                                           // 341
                                                                                                                       // 342
			//if (start.hasOwnProperty(elevation) && end.hasOwnProperty(elevation)) {                                           // 343
			if (typeof this.elevation(start) !== 'undefined' && typeof this.elevation(end) !== 'undefined') {                   // 344
				var climb = Math.abs(this.elevation(start) - this.elevation(end));                                                 // 345
				distance = Math.sqrt(distance * distance + climb * climb);                                                         // 346
			}                                                                                                                   // 347
                                                                                                                       // 348
			return this.distance = Math.floor(                                                                                  // 349
				Math.round(distance / accuracy) * accuracy                                                                         // 350
			);                                                                                                                  // 351
                                                                                                                       // 352
			/*                                                                                                                  // 353
			// note: to return initial/final bearings in addition to distance, use something like:                              // 354
			var fwdAz = Math.atan2(cosU2*sinLambda,  cosU1*sinU2-sinU1*cosU2*cosLambda);                                        // 355
			var revAz = Math.atan2(cosU1*sinLambda, -sinU1*cosU2+cosU1*sinU2*cosLambda);                                        // 356
                                                                                                                       // 357
			return { distance: s, initialBearing: fwdAz.toDeg(), finalBearing: revAz.toDeg() };                                 // 358
			*/                                                                                                                  // 359
                                                                                                                       // 360
		},                                                                                                                   // 361
                                                                                                                       // 362
                                                                                                                       // 363
		/**                                                                                                                  // 364
		* Calculates the distance between two spots.                                                                         // 365
		* This method is more simple but also far more inaccurate                                                            // 366
		*                                                                                                                    // 367
		* @param    object    Start position {latitude: 123, longitude: 123}                                                 // 368
		* @param    object    End position {latitude: 123, longitude: 123}                                                   // 369
		* @param    integer   Accuracy (in meters)                                                                           // 370
		* @return   integer   Distance (in meters)                                                                           // 371
		*/                                                                                                                   // 372
		getDistanceSimple: function(start, end, accuracy) {                                                                  // 373
                                                                                                                       // 374
			accuracy = Math.floor(accuracy) || 1;                                                                               // 375
                                                                                                                       // 376
			var distance =                                                                                                      // 377
				Math.round(                                                                                                        // 378
					Math.acos(                                                                                                        // 379
						Math.sin(                                                                                                        // 380
							this.latitude(end).toRad()                                                                                      // 381
						) *                                                                                                              // 382
						Math.sin(                                                                                                        // 383
							this.latitude(start).toRad()                                                                                    // 384
						) +                                                                                                              // 385
						Math.cos(                                                                                                        // 386
							this.latitude(end).toRad()                                                                                      // 387
						) *                                                                                                              // 388
						Math.cos(                                                                                                        // 389
							this.latitude(start).toRad()                                                                                    // 390
						) *                                                                                                              // 391
						Math.cos(                                                                                                        // 392
							this.longitude(start).toRad() - this.longitude(end).toRad()                                                     // 393
						)                                                                                                                // 394
					) * this.radius                                                                                                   // 395
				);                                                                                                                 // 396
                                                                                                                       // 397
			return geolib.distance = Math.floor(Math.round(distance/accuracy)*accuracy);                                        // 398
                                                                                                                       // 399
		},                                                                                                                   // 400
                                                                                                                       // 401
                                                                                                                       // 402
		/**                                                                                                                  // 403
		* Calculates the center of a collection of geo coordinates                                                           // 404
		*                                                                                                                    // 405
		* @param		array		Collection of coords [{latitude: 51.510, longitude: 7.1321}, {latitude: 49.1238, longitude: "8° 30' W"}, ...]
		* @return		object		{latitude: centerLat, longitude: centerLng, distance: diagonalDistance}                           // 407
		*/                                                                                                                   // 408
		getCenter: function(coords) {                                                                                        // 409
                                                                                                                       // 410
			if (!coords.length) {                                                                                               // 411
				return false;                                                                                                      // 412
			}                                                                                                                   // 413
                                                                                                                       // 414
			var max = function( array ){                                                                                        // 415
				return Math.max.apply( Math, array );                                                                              // 416
			};                                                                                                                  // 417
                                                                                                                       // 418
			var min = function( array ){                                                                                        // 419
				return Math.min.apply( Math, array );                                                                              // 420
			};                                                                                                                  // 421
                                                                                                                       // 422
			var	latitude;                                                                                                       // 423
			var longitude;                                                                                                      // 424
			var splitCoords = {latitude: [], longitude: []};                                                                    // 425
                                                                                                                       // 426
			for(var coord in coords) {                                                                                          // 427
                                                                                                                       // 428
				splitCoords.latitude.push(                                                                                         // 429
					this.latitude(coords[coord])                                                                                      // 430
				);                                                                                                                 // 431
                                                                                                                       // 432
				splitCoords.longitude.push(                                                                                        // 433
					this.longitude(coords[coord])                                                                                     // 434
				);                                                                                                                 // 435
                                                                                                                       // 436
			}                                                                                                                   // 437
                                                                                                                       // 438
			var minLat = min(splitCoords.latitude);                                                                             // 439
			var minLon = min(splitCoords.longitude);                                                                            // 440
			var maxLat = max(splitCoords.latitude);                                                                             // 441
			var maxLon = max(splitCoords.longitude);                                                                            // 442
                                                                                                                       // 443
			latitude = ((minLat + maxLat)/2).toFixed(6);                                                                        // 444
			longitude = ((minLon + maxLon)/2).toFixed(6);                                                                       // 445
                                                                                                                       // 446
			// distance from the deepest left to the highest right point (diagonal distance)                                    // 447
			var distance = this.convertUnit('km', this.getDistance({latitude: minLat, longitude: minLon}, {latitude: maxLat, longitude: maxLon}));
                                                                                                                       // 449
			return {                                                                                                            // 450
				latitude: latitude,                                                                                                // 451
				longitude: longitude,                                                                                              // 452
				distance: distance                                                                                                 // 453
			};                                                                                                                  // 454
                                                                                                                       // 455
		},                                                                                                                   // 456
                                                                                                                       // 457
                                                                                                                       // 458
                                                                                                                       // 459
		/**                                                                                                                  // 460
		* Gets the max and min, latitude, longitude, and elevation (if provided).                                            // 461
		* @param		array		array with coords e.g. [{latitude: 51.5143, longitude: 7.4138}, {latitude: 123, longitude: 123}, ...] 
		* @return	object		{maxLat: maxLat,                                                                                   // 463
		*                     minLat: minLat		                                                                               // 464
		*                     maxLng: maxLng,                                                                                // 465
		*                     minLng: minLng,                                                                                // 466
		*                     maxElev: maxElev,                                                                              // 467
		*                     minElev: minElev}                                                                              // 468
		*/                                                                                                                   // 469
		getBounds: function(coords) {                                                                                        // 470
                                                                                                                       // 471
			if (!coords.length) {                                                                                               // 472
				return false;                                                                                                      // 473
			}                                                                                                                   // 474
                                                                                                                       // 475
			var useElevation = this.elevation(coords[0]);                                                                       // 476
                                                                                                                       // 477
			var stats = {                                                                                                       // 478
				maxLat: -Infinity,                                                                                                 // 479
				minLat: Infinity,                                                                                                  // 480
				maxLng: -Infinity,                                                                                                 // 481
				minLng: Infinity                                                                                                   // 482
			};                                                                                                                  // 483
                                                                                                                       // 484
			if (typeof useElevation != 'undefined') {                                                                           // 485
				stats.maxElev = 0;                                                                                                 // 486
				stats.minElev = Infinity;                                                                                          // 487
			}                                                                                                                   // 488
                                                                                                                       // 489
			for (var i = 0, l = coords.length; i < l; ++i) {                                                                    // 490
                                                                                                                       // 491
				stats.maxLat = Math.max(this.latitude(coords[i]), stats.maxLat);                                                   // 492
				stats.minLat = Math.min(this.latitude(coords[i]), stats.minLat);                                                   // 493
				stats.maxLng = Math.max(this.longitude(coords[i]), stats.maxLng);                                                  // 494
				stats.minLng = Math.min(this.longitude(coords[i]), stats.minLng);                                                  // 495
                                                                                                                       // 496
				if (useElevation) {                                                                                                // 497
					stats.maxElev = Math.max(this.elevation(coords[i]), stats.maxElev);                                               // 498
					stats.minElev = Math.min(this.elevation(coords[i]), stats.minElev);                                               // 499
				}                                                                                                                  // 500
                                                                                                                       // 501
			}                                                                                                                   // 502
                                                                                                                       // 503
			return stats;                                                                                                       // 504
                                                                                                                       // 505
		},                                                                                                                   // 506
                                                                                                                       // 507
                                                                                                                       // 508
		/**                                                                                                                  // 509
		* Computes the bounding coordinates of all points on the surface                                                     // 510
		* of the earth less than or equal to the specified great circle                                                      // 511
		* distance.                                                                                                          // 512
		*                                                                                                                    // 513
		* @param object Point position {latitude: 123, longitude: 123}                                                       // 514
		* @param number Distance (in meters).                                                                                // 515
		* @return array Collection of two points defining the SW and NE corners.                                             // 516
		*/                                                                                                                   // 517
		getBoundsOfDistance: function(point, distance) {                                                                     // 518
                                                                                                                       // 519
			var latitude = this.latitude(point);                                                                                // 520
			var longitude = this.longitude(point);                                                                              // 521
                                                                                                                       // 522
			var radLat = latitude.toRad();                                                                                      // 523
			var radLon = longitude.toRad();                                                                                     // 524
                                                                                                                       // 525
			var radDist = distance / this.radius;                                                                               // 526
			var minLat = radLat - radDist;                                                                                      // 527
			var maxLat = radLat + radDist;                                                                                      // 528
                                                                                                                       // 529
			var MAX_LAT_RAD = this.maxLat.toRad();                                                                              // 530
			var MIN_LAT_RAD = this.minLat.toRad();                                                                              // 531
			var MAX_LON_RAD = this.maxLon.toRad();                                                                              // 532
			var MIN_LON_RAD = this.minLon.toRad();                                                                              // 533
                                                                                                                       // 534
			var minLon;                                                                                                         // 535
			var maxLon;                                                                                                         // 536
                                                                                                                       // 537
			if (minLat > MIN_LAT_RAD && maxLat < MAX_LAT_RAD) {                                                                 // 538
                                                                                                                       // 539
				var deltaLon = Math.asin(Math.sin(radDist) / Math.cos(radLat));                                                    // 540
				minLon = radLon - deltaLon;                                                                                        // 541
                                                                                                                       // 542
				if (minLon < MIN_LON_RAD) {                                                                                        // 543
					minLon += 2 * Math.PI;                                                                                            // 544
				}                                                                                                                  // 545
                                                                                                                       // 546
				maxLon = radLon + deltaLon;                                                                                        // 547
                                                                                                                       // 548
				if (maxLon > MAX_LON_RAD) {                                                                                        // 549
					maxLon -= 2 * Math.PI;                                                                                            // 550
				}                                                                                                                  // 551
                                                                                                                       // 552
			} else {                                                                                                            // 553
				// A pole is within the distance.                                                                                  // 554
				minLat = Math.max(minLat, MIN_LAT_RAD);                                                                            // 555
				maxLat = Math.min(maxLat, MAX_LAT_RAD);                                                                            // 556
				minLon = MIN_LON_RAD;                                                                                              // 557
				maxLon = MAX_LON_RAD;                                                                                              // 558
			}                                                                                                                   // 559
                                                                                                                       // 560
			return [                                                                                                            // 561
				// Southwest                                                                                                       // 562
				{                                                                                                                  // 563
					latitude: minLat.toDeg(),                                                                                         // 564
					longitude: minLon.toDeg()                                                                                         // 565
				},                                                                                                                 // 566
				// Northeast                                                                                                       // 567
				{                                                                                                                  // 568
					latitude: maxLat.toDeg(),                                                                                         // 569
					longitude: maxLon.toDeg()                                                                                         // 570
				}                                                                                                                  // 571
			];                                                                                                                  // 572
                                                                                                                       // 573
		},                                                                                                                   // 574
                                                                                                                       // 575
                                                                                                                       // 576
		/**                                                                                                                  // 577
		* Checks whether a point is inside of a polygon or not.                                                              // 578
		* Note that the polygon coords must be in correct order!                                                             // 579
		*                                                                                                                    // 580
		* @param		object		coordinate to check e.g. {latitude: 51.5023, longitude: 7.3815}                                    // 581
		* @param		array		array with coords e.g. [{latitude: 51.5143, longitude: 7.4138}, {latitude: 123, longitude: 123}, ...] 
		* @return		bool		true if the coordinate is inside the given polygon                                                  // 583
		*/                                                                                                                   // 584
		isPointInside: function(latlng, coords) {                                                                            // 585
                                                                                                                       // 586
			for(var c = false, i = -1, l = coords.length, j = l - 1; ++i < l; j = i) {                                          // 587
                                                                                                                       // 588
				if(                                                                                                                // 589
					(                                                                                                                 // 590
						(this.longitude(coords[i]) <= this.longitude(latlng) && this.longitude(latlng) < this.longitude(coords[j])) ||   // 591
						(this.longitude(coords[j]) <= this.longitude(latlng) && this.longitude(latlng) < this.longitude(coords[i]))      // 592
					) &&                                                                                                              // 593
					(                                                                                                                 // 594
						this.latitude(latlng) < (this.latitude(coords[j]) - this.latitude(coords[i])) *                                  // 595
						(this.longitude(latlng) - this.longitude(coords[i])) /                                                           // 596
						(this.longitude(coords[j]) - this.longitude(coords[i])) +                                                        // 597
						this.latitude(coords[i])                                                                                         // 598
					)                                                                                                                 // 599
				) {                                                                                                                // 600
					c = !c;                                                                                                           // 601
				}                                                                                                                  // 602
                                                                                                                       // 603
			}                                                                                                                   // 604
                                                                                                                       // 605
			return c;                                                                                                           // 606
                                                                                                                       // 607
		},                                                                                                                   // 608
                                                                                                                       // 609
       /**                                                                                                             // 610
        * Pre calculate the polygon coords, to speed up the point inside check.                                        // 611
        * Use this function before calling isPointInsideWithPreparedPolygon()                                          // 612
        * @see          Algorythm from http://alienryderflex.com/polygon/                                              // 613
        * @param		array		array with coords e.g. [{latitude: 51.5143, longitude: 7.4138}, {latitude: 123, longitude: 123}, ...]
        */                                                                                                             // 615
		preparePolygonForIsPointInsideOptimized: function(coords) {                                                          // 616
                                                                                                                       // 617
			for(var i = 0, j = coords.length-1; i < coords.length; i++) {                                                       // 618
                                                                                                                       // 619
			if(this.longitude(coords[j]) === this.longitude(coords[i])) {                                                       // 620
                                                                                                                       // 621
					coords[i].constant = this.latitude(coords[i]);                                                                    // 622
					coords[i].multiple = 0;                                                                                           // 623
                                                                                                                       // 624
				} else {                                                                                                           // 625
                                                                                                                       // 626
					coords[i].constant = this.latitude(coords[i])-(this.longitude(coords[i])*this.latitude(coords[j]))/(this.longitude(coords[j])-this.longitude(coords[i]))+(this.longitude(coords[i])*this.latitude(coords[i]))/(this.longitude(coords[j])-this.longitude(coords[i]));
					coords[i].multiple = (this.latitude(coords[j])-this.latitude(coords[i]))/(this.longitude(coords[j])-this.longitude(coords[i]));
                                                                                                                       // 629
				}                                                                                                                  // 630
                                                                                                                       // 631
				j=i;                                                                                                               // 632
                                                                                                                       // 633
			}                                                                                                                   // 634
                                                                                                                       // 635
		},                                                                                                                   // 636
                                                                                                                       // 637
      /**                                                                                                              // 638
       * Checks whether a point is inside of a polygon or not.                                                         // 639
       * "This is useful if you have many points that need to be tested against the same (static) polygon."            // 640
       * Please call the function preparePolygonForIsPointInsideOptimized() with the same coords object before using this function.
       * Note that the polygon coords must be in correct order!                                                        // 642
       *                                                                                                               // 643
       * @see          Algorythm from http://alienryderflex.com/polygon/                                               // 644
       *                                                                                                               // 645
       * @param		object		coordinate to check e.g. {latitude: 51.5023, longitude: 7.3815}                               // 646
       * @param		array		array with coords e.g. [{latitude: 51.5143, longitude: 7.4138}, {latitude: 123, longitude: 123}, ...]
       * @return		bool		true if the coordinate is inside the given polygon                                             // 648
       */                                                                                                              // 649
		isPointInsideWithPreparedPolygon: function(point, coords) {                                                          // 650
                                                                                                                       // 651
			var flgPointInside = false,                                                                                         // 652
			y = this.longitude(point),                                                                                          // 653
			x = this.latitude(point);                                                                                           // 654
                                                                                                                       // 655
			for(var i = 0, j = coords.length-1; i < coords.length; i++) {                                                       // 656
                                                                                                                       // 657
				if ((this.longitude(coords[i]) < y && this.longitude(coords[j]) >=y ||                                             // 658
					this.longitude(coords[j]) < y && this.longitude(coords[i]) >= y)) {                                               // 659
                                                                                                                       // 660
					flgPointInside^=(y*coords[i].multiple+coords[i].constant < x);                                                    // 661
                                                                                                                       // 662
				}                                                                                                                  // 663
                                                                                                                       // 664
				j=i;                                                                                                               // 665
                                                                                                                       // 666
			}                                                                                                                   // 667
                                                                                                                       // 668
			return flgPointInside;                                                                                              // 669
                                                                                                                       // 670
		},                                                                                                                   // 671
                                                                                                                       // 672
                                                                                                                       // 673
		/**                                                                                                                  // 674
		* Shortcut for geolib.isPointInside()                                                                                // 675
		*/                                                                                                                   // 676
		isInside: function() {                                                                                               // 677
			return this.isPointInside.apply(this, arguments);                                                                   // 678
		},                                                                                                                   // 679
                                                                                                                       // 680
                                                                                                                       // 681
		/**                                                                                                                  // 682
		* Checks whether a point is inside of a circle or not.                                                               // 683
		*                                                                                                                    // 684
		* @param		object		coordinate to check (e.g. {latitude: 51.5023, longitude: 7.3815})                                  // 685
		* @param		object		coordinate of the circle's center (e.g. {latitude: 51.4812, longitude: 7.4025})                    // 686
		* @param		integer		maximum radius in meters                                                                          // 687
		* @return		bool		true if the coordinate is within the given radius                                                   // 688
		*/                                                                                                                   // 689
		isPointInCircle: function(latlng, center, radius) {                                                                  // 690
			return this.getDistance(latlng, center) < radius;                                                                   // 691
		},                                                                                                                   // 692
                                                                                                                       // 693
                                                                                                                       // 694
		/**                                                                                                                  // 695
		* Shortcut for geolib.isPointInCircle()                                                                              // 696
		*/                                                                                                                   // 697
		withinRadius: function() {                                                                                           // 698
			return this.isPointInCircle.apply(this, arguments);                                                                 // 699
		},                                                                                                                   // 700
                                                                                                                       // 701
                                                                                                                       // 702
		/**                                                                                                                  // 703
		* Gets rhumb line bearing of two points. Find out about the difference between rhumb line and                        // 704
		* great circle bearing on Wikipedia. It's quite complicated. Rhumb line should be fine in most cases:                // 705
		*                                                                                                                    // 706
		* http://en.wikipedia.org/wiki/Rhumb_line#General_and_mathematical_description                                       // 707
		*                                                                                                                    // 708
		* Function heavily based on Doug Vanderweide's great PHP version (licensed under GPL 3.0)                            // 709
		* http://www.dougv.com/2009/07/13/calculating-the-bearing-and-compass-rose-direction-between-two-latitude-longitude-coordinates-in-php/
		*                                                                                                                    // 711
		* @param		object		origin coordinate (e.g. {latitude: 51.5023, longitude: 7.3815})                                    // 712
		* @param		object		destination coordinate                                                                             // 713
		* @return		integer		calculated bearing                                                                               // 714
		*/                                                                                                                   // 715
		getRhumbLineBearing: function(originLL, destLL) {                                                                    // 716
                                                                                                                       // 717
			// difference of longitude coords                                                                                   // 718
			var diffLon = this.longitude(destLL).toRad() - this.longitude(originLL).toRad();                                    // 719
                                                                                                                       // 720
			// difference latitude coords phi                                                                                   // 721
			var diffPhi = Math.log(                                                                                             // 722
				Math.tan(                                                                                                          // 723
					this.latitude(destLL).toRad() / 2 + Math.PI / 4                                                                   // 724
				) /                                                                                                                // 725
				Math.tan(                                                                                                          // 726
					this.latitude(originLL).toRad() / 2 + Math.PI / 4                                                                 // 727
				)                                                                                                                  // 728
			);                                                                                                                  // 729
                                                                                                                       // 730
			// recalculate diffLon if it is greater than pi                                                                     // 731
			if(Math.abs(diffLon) > Math.PI) {                                                                                   // 732
				if(diffLon > 0) {                                                                                                  // 733
					diffLon = (2 * Math.PI - diffLon) * -1;                                                                           // 734
				}                                                                                                                  // 735
				else {                                                                                                             // 736
					diffLon = 2 * Math.PI + diffLon;                                                                                  // 737
				}                                                                                                                  // 738
			}                                                                                                                   // 739
                                                                                                                       // 740
			//return the angle, normalized                                                                                      // 741
			return (Math.atan2(diffLon, diffPhi).toDeg() + 360) % 360;                                                          // 742
                                                                                                                       // 743
		},                                                                                                                   // 744
                                                                                                                       // 745
                                                                                                                       // 746
		/**                                                                                                                  // 747
		* Gets great circle bearing of two points. See description of getRhumbLineBearing for more information               // 748
		*                                                                                                                    // 749
		* @param		object		origin coordinate (e.g. {latitude: 51.5023, longitude: 7.3815})                                    // 750
		* @param		object		destination coordinate                                                                             // 751
		* @return		integer		calculated bearing                                                                               // 752
		*/                                                                                                                   // 753
		getBearing: function(originLL, destLL) {                                                                             // 754
                                                                                                                       // 755
			destLL['latitude'] = this.latitude(destLL);                                                                         // 756
			destLL['longitude'] = this.longitude(destLL);                                                                       // 757
			originLL['latitude'] = this.latitude(originLL);                                                                     // 758
			originLL['longitude'] = this.longitude(originLL);                                                                   // 759
                                                                                                                       // 760
			var bearing = (                                                                                                     // 761
				(                                                                                                                  // 762
					Math.atan2(                                                                                                       // 763
						Math.sin(                                                                                                        // 764
							destLL['longitude'].toRad() -                                                                                   // 765
							originLL['longitude'].toRad()                                                                                   // 766
						) *                                                                                                              // 767
						Math.cos(                                                                                                        // 768
							destLL['latitude'].toRad()                                                                                      // 769
						),                                                                                                               // 770
						Math.cos(                                                                                                        // 771
							originLL['latitude'].toRad()                                                                                    // 772
						) *                                                                                                              // 773
						Math.sin(                                                                                                        // 774
							destLL['latitude'].toRad()                                                                                      // 775
						) -                                                                                                              // 776
						Math.sin(                                                                                                        // 777
							originLL['latitude'].toRad()                                                                                    // 778
						) *                                                                                                              // 779
						Math.cos(                                                                                                        // 780
							destLL['latitude'].toRad()                                                                                      // 781
						) *                                                                                                              // 782
						Math.cos(                                                                                                        // 783
							destLL['longitude'].toRad() - originLL['longitude'].toRad()                                                     // 784
						)                                                                                                                // 785
					)                                                                                                                 // 786
				).toDeg() + 360                                                                                                    // 787
			) % 360;                                                                                                            // 788
                                                                                                                       // 789
			return bearing;                                                                                                     // 790
                                                                                                                       // 791
		},                                                                                                                   // 792
                                                                                                                       // 793
                                                                                                                       // 794
		/**                                                                                                                  // 795
		* Gets the compass direction from an origin coordinate to a destination coordinate.                                  // 796
		*                                                                                                                    // 797
		* @param		object		origin coordinate (e.g. {latitude: 51.5023, longitude: 7.3815})                                    // 798
		* @param		object		destination coordinate                                                                             // 799
		* @param		string		Bearing mode. Can be either circle or rhumbline                                                    // 800
		* @return		object		Returns an object with a rough (NESW) and an exact direction (NNE, NE, ENE, E, ESE, etc).         // 801
		*/                                                                                                                   // 802
		getCompassDirection: function(originLL, destLL, bearingMode) {                                                       // 803
                                                                                                                       // 804
			var direction;                                                                                                      // 805
			var bearing;                                                                                                        // 806
                                                                                                                       // 807
			if(bearingMode == 'circle') {                                                                                       // 808
				// use great circle bearing                                                                                        // 809
				bearing = this.getBearing(originLL, destLL);                                                                       // 810
			} else {                                                                                                            // 811
				// default is rhumb line bearing                                                                                   // 812
				bearing = this.getRhumbLineBearing(originLL, destLL);                                                              // 813
			}                                                                                                                   // 814
                                                                                                                       // 815
			switch(Math.round(bearing/22.5)) {                                                                                  // 816
				case 1:                                                                                                            // 817
					direction = {exact: "NNE", rough: "N"};                                                                           // 818
					break;                                                                                                            // 819
				case 2:                                                                                                            // 820
					direction = {exact: "NE", rough: "N"};                                                                            // 821
					break;                                                                                                            // 822
				case 3:                                                                                                            // 823
					direction = {exact: "ENE", rough: "E"};                                                                           // 824
					break;                                                                                                            // 825
				case 4:                                                                                                            // 826
					direction = {exact: "E", rough: "E"};                                                                             // 827
					break;                                                                                                            // 828
				case 5:                                                                                                            // 829
					direction = {exact: "ESE", rough: "E"};                                                                           // 830
					break;                                                                                                            // 831
				case 6:                                                                                                            // 832
					direction = {exact: "SE", rough: "E"};                                                                            // 833
					break;                                                                                                            // 834
				case 7:                                                                                                            // 835
					direction = {exact: "SSE", rough: "S"};                                                                           // 836
					break;                                                                                                            // 837
				case 8:                                                                                                            // 838
					direction = {exact: "S", rough: "S"};                                                                             // 839
					break;                                                                                                            // 840
				case 9:                                                                                                            // 841
					direction = {exact: "SSW", rough: "S"};                                                                           // 842
					break;                                                                                                            // 843
				case 10:                                                                                                           // 844
					direction = {exact: "SW", rough: "S"};                                                                            // 845
					break;                                                                                                            // 846
				case 11:                                                                                                           // 847
					direction = {exact: "WSW", rough: "W"};                                                                           // 848
					break;                                                                                                            // 849
				case 12:                                                                                                           // 850
					direction = {exact: "W", rough: "W"};                                                                             // 851
					break;                                                                                                            // 852
				case 13:                                                                                                           // 853
					direction = {exact: "WNW", rough: "W"};                                                                           // 854
					break;                                                                                                            // 855
				case 14:                                                                                                           // 856
					direction = {exact: "NW", rough: "W"};                                                                            // 857
					break;                                                                                                            // 858
				case 15:                                                                                                           // 859
					direction = {exact: "NNW", rough: "N"};                                                                           // 860
					break;                                                                                                            // 861
				default:                                                                                                           // 862
					direction = {exact: "N", rough: "N"};                                                                             // 863
			}                                                                                                                   // 864
                                                                                                                       // 865
			direction['bearing'] = bearing;                                                                                     // 866
			return direction;                                                                                                   // 867
                                                                                                                       // 868
		},                                                                                                                   // 869
                                                                                                                       // 870
                                                                                                                       // 871
		/**                                                                                                                  // 872
		* Shortcut for getCompassDirection                                                                                   // 873
		*/                                                                                                                   // 874
		getDirection: function(originLL, destLL, bearingMode) {                                                              // 875
			return this.getCompassDirection.apply(this, arguments);                                                             // 876
		},                                                                                                                   // 877
                                                                                                                       // 878
                                                                                                                       // 879
		/**                                                                                                                  // 880
		* Sorts an array of coords by distance from a reference coordinate                                                   // 881
		*                                                                                                                    // 882
		* @param		object		reference coordinate e.g. {latitude: 51.5023, longitude: 7.3815}                                   // 883
		* @param		mixed		array or object with coords [{latitude: 51.5143, longitude: 7.4138}, {latitude: 123, longitude: 123}, ...] 
		* @return		array		ordered array                                                                                      // 885
		*/                                                                                                                   // 886
		orderByDistance: function(latlng, coords) {                                                                          // 887
                                                                                                                       // 888
			var coordsArray = [];                                                                                               // 889
                                                                                                                       // 890
			for(var coord in coords) {                                                                                          // 891
                                                                                                                       // 892
				var d = this.getDistance(latlng, coords[coord]);                                                                   // 893
                                                                                                                       // 894
				coordsArray.push({                                                                                                 // 895
					key: coord,                                                                                                       // 896
					latitude: this.latitude(coords[coord]),                                                                           // 897
					longitude: this.longitude(coords[coord]),                                                                         // 898
					distance: d                                                                                                       // 899
				});                                                                                                                // 900
                                                                                                                       // 901
			}                                                                                                                   // 902
                                                                                                                       // 903
			return coordsArray.sort(function(a, b) { return a.distance - b.distance; });                                        // 904
                                                                                                                       // 905
		},                                                                                                                   // 906
                                                                                                                       // 907
                                                                                                                       // 908
		/**                                                                                                                  // 909
		* Finds the nearest coordinate to a reference coordinate                                                             // 910
		*                                                                                                                    // 911
		* @param		object		reference coordinate e.g. {latitude: 51.5023, longitude: 7.3815}                                   // 912
		* @param		mixed		array or object with coords [{latitude: 51.5143, longitude: 7.4138}, {latitude: 123, longitude: 123}, ...] 
		* @return		array		ordered array                                                                                      // 914
		*/                                                                                                                   // 915
		findNearest: function(latlng, coords, offset, limit) {                                                               // 916
                                                                                                                       // 917
			offset = offset || 0;                                                                                               // 918
			limit = limit || 1;                                                                                                 // 919
			var ordered = this.orderByDistance(latlng, coords);                                                                 // 920
                                                                                                                       // 921
			if(limit === 1) {                                                                                                   // 922
				return ordered[offset];                                                                                            // 923
			} else {                                                                                                            // 924
				return ordered.splice(offset, limit);                                                                              // 925
			}                                                                                                                   // 926
                                                                                                                       // 927
		},                                                                                                                   // 928
                                                                                                                       // 929
                                                                                                                       // 930
		/**                                                                                                                  // 931
		* Calculates the length of a given path                                                                              // 932
		*                                                                                                                    // 933
		* @param		mixed		array or object with coords [{latitude: 51.5143, longitude: 7.4138}, {latitude: 123, longitude: 123}, ...] 
		* @return		integer		length of the path (in meters)                                                                   // 935
		*/                                                                                                                   // 936
		getPathLength: function(coords) {                                                                                    // 937
                                                                                                                       // 938
			var dist = 0;                                                                                                       // 939
			var last;                                                                                                           // 940
                                                                                                                       // 941
			for (var i = 0, l = coords.length; i < l; ++i) {                                                                    // 942
				if(last) {                                                                                                         // 943
					//console.log(coords[i], last, this.getDistance(coords[i], last));                                                // 944
					dist += this.getDistance(this.coords(coords[i]), last);                                                           // 945
				}                                                                                                                  // 946
				last = this.coords(coords[i]);                                                                                     // 947
			}                                                                                                                   // 948
                                                                                                                       // 949
			return dist;                                                                                                        // 950
                                                                                                                       // 951
		},                                                                                                                   // 952
                                                                                                                       // 953
                                                                                                                       // 954
		/**                                                                                                                  // 955
		* Calculates the speed between to points within a given time span.                                                   // 956
		*                                                                                                                    // 957
		* @param		object		coords with javascript timestamp {latitude: 51.5143, longitude: 7.4138, time: 1360231200880}       // 958
		* @param		object		coords with javascript timestamp {latitude: 51.5502, longitude: 7.4323, time: 1360245600460}       // 959
		* @param		object		options (currently "unit" is the only option. Default: km(h));                                     // 960
		* @return		float		speed in unit per hour                                                                             // 961
		*/                                                                                                                   // 962
		getSpeed: function(start, end, options) {                                                                            // 963
                                                                                                                       // 964
			var unit = options && options.unit || 'km';                                                                         // 965
                                                                                                                       // 966
			if(unit == 'mph') {                                                                                                 // 967
				unit = 'mi';                                                                                                       // 968
			} else if(unit == 'kmh') {                                                                                          // 969
				unit = 'km';                                                                                                       // 970
			}                                                                                                                   // 971
                                                                                                                       // 972
			var distance = geolib.getDistance(start, end);                                                                      // 973
			var time = ((end.time*1)/1000) - ((start.time*1)/1000);                                                             // 974
			var mPerHr = (distance/time)*3600;                                                                                  // 975
			var speed = Math.round(mPerHr * this.measures[unit] * 10000)/10000;                                                 // 976
			return speed;                                                                                                       // 977
                                                                                                                       // 978
		},                                                                                                                   // 979
                                                                                                                       // 980
                                                                                                                       // 981
		/**                                                                                                                  // 982
		* Converts a distance from meters to km, mm, cm, mi, ft, in or yd                                                    // 983
		*                                                                                                                    // 984
		* @param		string		Format to be converted in                                                                          // 985
		* @param		float		Distance in meters                                                                                  // 986
		* @param		float		Decimal places for rounding (default: 4)                                                            // 987
		* @return		float		Converted distance                                                                                 // 988
		*/                                                                                                                   // 989
		convertUnit: function(unit, distance, round) {                                                                       // 990
                                                                                                                       // 991
			if(distance === 0 || typeof distance === 'undefined') {                                                             // 992
                                                                                                                       // 993
				if(this.distance === 0) {                                                                                          // 994
					// throw 'No distance given.';                                                                                    // 995
					return 0;                                                                                                         // 996
				} else {                                                                                                           // 997
					distance = this.distance;                                                                                         // 998
				}                                                                                                                  // 999
                                                                                                                       // 1000
			}                                                                                                                   // 1001
                                                                                                                       // 1002
			unit = unit || 'm';                                                                                                 // 1003
			round = (null == round ? 4 : round);                                                                                // 1004
                                                                                                                       // 1005
			if(typeof this.measures[unit] !== 'undefined') {                                                                    // 1006
				return this.round(distance * this.measures[unit], round);                                                          // 1007
			} else {                                                                                                            // 1008
				throw new Error('Unknown unit for conversion.');                                                                   // 1009
			}                                                                                                                   // 1010
                                                                                                                       // 1011
		},                                                                                                                   // 1012
                                                                                                                       // 1013
                                                                                                                       // 1014
		/**                                                                                                                  // 1015
		* Checks if a value is in decimal format or, if neccessary, converts to decimal                                      // 1016
		*                                                                                                                    // 1017
		* @param		mixed		Value(s) to be checked/converted (array of latlng objects, latlng object, sexagesimal string, float)
		* @return		float		Input data in decimal format                                                                       // 1019
		*/                                                                                                                   // 1020
		useDecimal: function(value) {                                                                                        // 1021
                                                                                                                       // 1022
			if(Object.prototype.toString.call(value) === '[object Array]') {                                                    // 1023
                                                                                                                       // 1024
				var geolib = this;                                                                                                 // 1025
                                                                                                                       // 1026
				value = value.map(function(val) {                                                                                  // 1027
                                                                                                                       // 1028
					//if(!isNaN(parseFloat(val))) {                                                                                   // 1029
					if(geolib.isDecimal(val)) {                                                                                       // 1030
                                                                                                                       // 1031
						return geolib.useDecimal(val);                                                                                   // 1032
                                                                                                                       // 1033
					} else if(typeof val == 'object') {                                                                               // 1034
                                                                                                                       // 1035
						if(geolib.validate(val)) {                                                                                       // 1036
                                                                                                                       // 1037
							return geolib.coords(val);                                                                                      // 1038
                                                                                                                       // 1039
						} else {                                                                                                         // 1040
                                                                                                                       // 1041
							for(var prop in val) {                                                                                          // 1042
								val[prop] = geolib.useDecimal(val[prop]);                                                                      // 1043
							}                                                                                                               // 1044
                                                                                                                       // 1045
							return val;                                                                                                     // 1046
                                                                                                                       // 1047
						}                                                                                                                // 1048
                                                                                                                       // 1049
					} else if(geolib.isSexagesimal(val)) {                                                                            // 1050
                                                                                                                       // 1051
						return geolib.sexagesimal2decimal(val);                                                                          // 1052
                                                                                                                       // 1053
					} else {                                                                                                          // 1054
                                                                                                                       // 1055
						return val;                                                                                                      // 1056
                                                                                                                       // 1057
					}                                                                                                                 // 1058
                                                                                                                       // 1059
				});                                                                                                                // 1060
                                                                                                                       // 1061
				return value;                                                                                                      // 1062
                                                                                                                       // 1063
			} else if(typeof value === 'object' && this.validate(value)) {                                                      // 1064
                                                                                                                       // 1065
				return this.coords(value);                                                                                         // 1066
                                                                                                                       // 1067
			} else if(typeof value === 'object') {                                                                              // 1068
                                                                                                                       // 1069
				for(var prop in value) {                                                                                           // 1070
					value[prop] = this.useDecimal(value[prop]);                                                                       // 1071
				}                                                                                                                  // 1072
                                                                                                                       // 1073
				return value;                                                                                                      // 1074
                                                                                                                       // 1075
			}                                                                                                                   // 1076
                                                                                                                       // 1077
                                                                                                                       // 1078
			if (this.isDecimal(value)) {                                                                                        // 1079
                                                                                                                       // 1080
				return parseFloat(value);                                                                                          // 1081
                                                                                                                       // 1082
			} else if(this.isSexagesimal(value) === true) {                                                                     // 1083
                                                                                                                       // 1084
				return parseFloat(this.sexagesimal2decimal(value));                                                                // 1085
                                                                                                                       // 1086
			}                                                                                                                   // 1087
                                                                                                                       // 1088
			throw new Error('Unknown format.');                                                                                 // 1089
                                                                                                                       // 1090
		},                                                                                                                   // 1091
                                                                                                                       // 1092
		/**                                                                                                                  // 1093
		* Converts a decimal coordinate value to sexagesimal format                                                          // 1094
		*                                                                                                                    // 1095
		* @param		float		decimal                                                                                             // 1096
		* @return		string		Sexagesimal value (XX° YY' ZZ")                                                                   // 1097
		*/                                                                                                                   // 1098
		decimal2sexagesimal: function(dec) {                                                                                 // 1099
                                                                                                                       // 1100
			if (dec in this.sexagesimal) {                                                                                      // 1101
				return this.sexagesimal[dec];                                                                                      // 1102
			}                                                                                                                   // 1103
                                                                                                                       // 1104
			var tmp = dec.toString().split('.');                                                                                // 1105
                                                                                                                       // 1106
			var deg = Math.abs(tmp[0]);                                                                                         // 1107
			var min = ('0.' + tmp[1])*60;                                                                                       // 1108
			var sec = min.toString().split('.');                                                                                // 1109
                                                                                                                       // 1110
			min = Math.floor(min);                                                                                              // 1111
			sec = (('0.' + sec[1]) * 60).toFixed(2);                                                                            // 1112
                                                                                                                       // 1113
			this.sexagesimal[dec] = (deg + '° ' + min + "' " + sec + '"');                                                      // 1114
                                                                                                                       // 1115
			return this.sexagesimal[dec];                                                                                       // 1116
                                                                                                                       // 1117
		},                                                                                                                   // 1118
                                                                                                                       // 1119
                                                                                                                       // 1120
		/**                                                                                                                  // 1121
		* Converts a sexagesimal coordinate to decimal format                                                                // 1122
		*                                                                                                                    // 1123
		* @param		float		Sexagesimal coordinate                                                                              // 1124
		* @return		string		Decimal value (XX.XXXXXXXX)                                                                       // 1125
		*/                                                                                                                   // 1126
		sexagesimal2decimal: function(sexagesimal) {                                                                         // 1127
                                                                                                                       // 1128
			if (sexagesimal in this.decimal) {                                                                                  // 1129
				return this.decimal[sexagesimal];                                                                                  // 1130
			}                                                                                                                   // 1131
                                                                                                                       // 1132
			var	regEx = new RegExp(this.sexagesimalPattern);                                                                    // 1133
			var	data = regEx.exec(sexagesimal);                                                                                 // 1134
			var min = 0, sec = 0;                                                                                               // 1135
                                                                                                                       // 1136
			if(data) {                                                                                                          // 1137
				min = parseFloat(data[2]/60);                                                                                      // 1138
				sec = parseFloat(data[4]/3600) || 0;                                                                               // 1139
			}                                                                                                                   // 1140
                                                                                                                       // 1141
			var	dec = ((parseFloat(data[1]) + min + sec)).toFixed(8);                                                           // 1142
			//var	dec = ((parseFloat(data[1]) + min + sec));                                                                    // 1143
                                                                                                                       // 1144
				// South and West are negative decimals                                                                            // 1145
				dec = (data[7] == 'S' || data[7] == 'W') ? parseFloat(-dec) : parseFloat(dec);                                     // 1146
				//dec = (data[7] == 'S' || data[7] == 'W') ? -dec : dec;                                                           // 1147
                                                                                                                       // 1148
			this.decimal[sexagesimal] = dec;                                                                                    // 1149
                                                                                                                       // 1150
			return dec;                                                                                                         // 1151
                                                                                                                       // 1152
		},                                                                                                                   // 1153
                                                                                                                       // 1154
                                                                                                                       // 1155
		/**                                                                                                                  // 1156
		* Checks if a value is in decimal format                                                                             // 1157
		*                                                                                                                    // 1158
		* @param		string		Value to be checked                                                                                // 1159
		* @return		bool		True if in sexagesimal format                                                                       // 1160
		*/                                                                                                                   // 1161
		isDecimal: function(value) {                                                                                         // 1162
                                                                                                                       // 1163
			value = value.toString().replace(/\s*/, '');                                                                        // 1164
                                                                                                                       // 1165
			// looks silly but works as expected                                                                                // 1166
			// checks if value is in decimal format                                                                             // 1167
			return (!isNaN(parseFloat(value)) && parseFloat(value) == value);                                                   // 1168
                                                                                                                       // 1169
		},                                                                                                                   // 1170
                                                                                                                       // 1171
                                                                                                                       // 1172
		/**                                                                                                                  // 1173
		* Checks if a value is in sexagesimal format                                                                         // 1174
		*                                                                                                                    // 1175
		* @param		string		Value to be checked                                                                                // 1176
		* @return		bool		True if in sexagesimal format                                                                       // 1177
		*/                                                                                                                   // 1178
		isSexagesimal: function(value) {                                                                                     // 1179
                                                                                                                       // 1180
			value = value.toString().replace(/\s*/, '');                                                                        // 1181
                                                                                                                       // 1182
			return this.sexagesimalPattern.test(value);                                                                         // 1183
                                                                                                                       // 1184
		},                                                                                                                   // 1185
                                                                                                                       // 1186
		round: function(value, n) {                                                                                          // 1187
			var decPlace = Math.pow(10, n);                                                                                     // 1188
			return Math.round(value * decPlace)/decPlace;                                                                       // 1189
		}                                                                                                                    // 1190
                                                                                                                       // 1191
	});                                                                                                                   // 1192
                                                                                                                       // 1193
	// Node module                                                                                                        // 1194
	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {                                         // 1195
                                                                                                                       // 1196
		global.geolib = module.exports = geolib;                                                                             // 1197
                                                                                                                       // 1198
	// AMD module                                                                                                         // 1199
	} else if (typeof define === "function" && define.amd) {                                                              // 1200
                                                                                                                       // 1201
		define("geolib", [], function () {                                                                                   // 1202
			return geolib;                                                                                                      // 1203
		});                                                                                                                  // 1204
                                                                                                                       // 1205
	// we're in a browser                                                                                                 // 1206
	} else {                                                                                                              // 1207
                                                                                                                       // 1208
		global.geolib = geolib;                                                                                              // 1209
                                                                                                                       // 1210
	}                                                                                                                     // 1211
                                                                                                                       // 1212
}(this));                                                                                                              // 1213
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/outatime:geolib/meteor/export.js                                                                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// Geolib makes `geolib` global on the window (or global) object, while Meteor expects a file-scoped global variable   // 1
geolib = this.geolib;                                                                                                  // 2
delete this.geolib;                                                                                                    // 3
                                                                                                                       // 4
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);

///////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['outatime:geolib'] = {}, {
  geolib: geolib
});

})();
