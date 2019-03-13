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
var SimpleSchema = Package['aldeed:simple-schema'].SimpleSchema;
var MongoObject = Package['aldeed:simple-schema'].MongoObject;
var _ = Package.underscore._;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var check = Package.check.check;
var Match = Package.check.Match;
var EJSON = Package.ejson.EJSON;
var Mongo = Package.mongo.Mongo;

(function(){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/aldeed_collection2/packages/aldeed_collection2.js        //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/aldeed:collection2/collection2.js                                                                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
// Extend the schema options allowed by SimpleSchema                                                                  // 1
SimpleSchema.extendOptions({                                                                                          // 2
  index: Match.Optional(Match.OneOf(Number, String, Boolean)),                                                        // 3
  unique: Match.Optional(Boolean),                                                                                    // 4
  denyInsert: Match.Optional(Boolean),                                                                                // 5
  denyUpdate: Match.Optional(Boolean)                                                                                 // 6
});                                                                                                                   // 7
                                                                                                                      // 8
// Define some extra validation error messages                                                                        // 9
SimpleSchema.messages({                                                                                               // 10
  notUnique: "[label] must be unique",                                                                                // 11
  insertNotAllowed: "[label] cannot be set during an insert",                                                         // 12
  updateNotAllowed: "[label] cannot be set during an update"                                                          // 13
});                                                                                                                   // 14
                                                                                                                      // 15
/*                                                                                                                    // 16
 * Public API                                                                                                         // 17
 */                                                                                                                   // 18
                                                                                                                      // 19
// backwards compatibility                                                                                            // 20
if (typeof Mongo === "undefined") {                                                                                   // 21
  Mongo = {};                                                                                                         // 22
  Mongo.Collection = Meteor.Collection;                                                                               // 23
}                                                                                                                     // 24
                                                                                                                      // 25
/**                                                                                                                   // 26
 * Mongo.Collection.prototype.attachSchema                                                                            // 27
 * @param {SimpleSchema|Object} ss - SimpleSchema instance or a schema definition object from which to create a new SimpleSchema instance
 * @param {Object} [options]                                                                                          // 29
 * @param {Boolean} [options.transform=false] Set to `true` if your document must be passed through the collection's transform to properly validate.
 * @return {undefined}                                                                                                // 31
 *                                                                                                                    // 32
 * Use this method to attach a schema to a collection created by another package,                                     // 33
 * such as Meteor.users. It is most likely unsafe to call this method more than                                       // 34
 * once for a single collection, or to call this for a collection that had a                                          // 35
 * schema object passed to its constructor.                                                                           // 36
 */                                                                                                                   // 37
Mongo.Collection.prototype.attachSchema = function c2AttachSchema(ss, options) {                                      // 38
  var self = this;                                                                                                    // 39
  options = options || {};                                                                                            // 40
                                                                                                                      // 41
  if (!(ss instanceof SimpleSchema)) {                                                                                // 42
    ss = new SimpleSchema(ss);                                                                                        // 43
  }                                                                                                                   // 44
                                                                                                                      // 45
  self._c2 = self._c2 || {};                                                                                          // 46
                                                                                                                      // 47
  // If we've already attached one schema, we combine both into a new schema                                          // 48
  if (self._c2._simpleSchema) {                                                                                       // 49
    ss = new SimpleSchema([self._c2._simpleSchema, ss]);                                                              // 50
  }                                                                                                                   // 51
                                                                                                                      // 52
  // Track the schema in the collection                                                                               // 53
  self._c2._simpleSchema = ss;                                                                                        // 54
                                                                                                                      // 55
  // Loop over fields definitions and ensure collection indexes (server side only)                                    // 56
  _.each(ss.schema(), function(definition, fieldName) {                                                               // 57
    if (Meteor.isServer && ('index' in definition || definition.unique === true)) {                                   // 58
                                                                                                                      // 59
      function setUpIndex() {                                                                                         // 60
        var index = {}, indexValue;                                                                                   // 61
        // If they specified `unique: true` but not `index`, we assume `index: 1` to set up the unique index in mongo // 62
        if ('index' in definition) {                                                                                  // 63
          indexValue = definition['index'];                                                                           // 64
          if (indexValue === true) {                                                                                  // 65
            indexValue = 1;                                                                                           // 66
          }                                                                                                           // 67
        } else {                                                                                                      // 68
          indexValue = 1;                                                                                             // 69
        }                                                                                                             // 70
        var indexName = 'c2_' + fieldName;                                                                            // 71
        // In the index object, we want object array keys without the ".$" piece                                      // 72
        var idxFieldName = fieldName.replace(/\.\$\./g, ".");                                                         // 73
        index[idxFieldName] = indexValue;                                                                             // 74
        var unique = !!definition.unique && (indexValue === 1 || indexValue === -1);                                  // 75
        var sparse = !!definition.optional && unique;                                                                 // 76
        if (indexValue !== false) {                                                                                   // 77
          self._collection._ensureIndex(index, {                                                                      // 78
            background: true,                                                                                         // 79
            name: indexName,                                                                                          // 80
            unique: unique,                                                                                           // 81
            sparse: sparse                                                                                            // 82
          });                                                                                                         // 83
        } else {                                                                                                      // 84
          try {                                                                                                       // 85
            self._collection._dropIndex(indexName);                                                                   // 86
          } catch (err) {                                                                                             // 87
            console.warn("Collection2: Tried to drop mongo index " + indexName + ", but there is no index with that name");
          }                                                                                                           // 89
        }                                                                                                             // 90
      }                                                                                                               // 91
                                                                                                                      // 92
      Meteor.startup(setUpIndex);                                                                                     // 93
    }                                                                                                                 // 94
  });                                                                                                                 // 95
                                                                                                                      // 96
  // Set up additional checks                                                                                         // 97
  ss.validator(function() {                                                                                           // 98
    var test, totalUsing, totalWillUse, sel;                                                                          // 99
    var def = this.definition;                                                                                        // 100
    var val = this.value;                                                                                             // 101
    var op = this.operator;                                                                                           // 102
    var key = this.key;                                                                                               // 103
                                                                                                                      // 104
    if (def.denyInsert && val !== void 0 && !op) {                                                                    // 105
      // This is an insert of a defined value into a field where denyInsert=true                                      // 106
      return "insertNotAllowed";                                                                                      // 107
    }                                                                                                                 // 108
                                                                                                                      // 109
    if (def.denyUpdate && op) {                                                                                       // 110
      // This is an insert of a defined value into a field where denyUpdate=true                                      // 111
      if (op !== "$set" || (op === "$set" && val !== void 0)) {                                                       // 112
        return "updateNotAllowed";                                                                                    // 113
      }                                                                                                               // 114
    }                                                                                                                 // 115
                                                                                                                      // 116
    return true;                                                                                                      // 117
  });                                                                                                                 // 118
                                                                                                                      // 119
  defineDeny(self, options);                                                                                          // 120
  keepInsecure(self);                                                                                                 // 121
};                                                                                                                    // 122
                                                                                                                      // 123
Mongo.Collection.prototype.simpleSchema = function c2SS() {                                                           // 124
  var self = this;                                                                                                    // 125
  return self._c2 ? self._c2._simpleSchema : null;                                                                    // 126
};                                                                                                                    // 127
                                                                                                                      // 128
// Wrap DB write operation methods                                                                                    // 129
_.each(['insert', 'update', 'upsert'], function(methodName) {                                                         // 130
  var _super = Mongo.Collection.prototype[methodName];                                                                // 131
  Mongo.Collection.prototype[methodName] = function () {                                                              // 132
    var self = this, args = _.toArray(arguments);                                                                     // 133
    if (self._c2) {                                                                                                   // 134
      args = doValidate.call(self, methodName, args, false,                                                           // 135
        (Meteor.isClient && Meteor.userId && Meteor.userId()) || null, Meteor.isServer);                              // 136
      if (!args) {                                                                                                    // 137
        // doValidate already called the callback or threw the error                                                  // 138
        if (methodName === "insert") {                                                                                // 139
          // insert should always return an ID to match core behavior                                                 // 140
          return self._makeNewID();                                                                                   // 141
        } else {                                                                                                      // 142
          return;                                                                                                     // 143
        }                                                                                                             // 144
      }                                                                                                               // 145
    }                                                                                                                 // 146
    return _super.apply(self, args);                                                                                  // 147
  };                                                                                                                  // 148
});                                                                                                                   // 149
                                                                                                                      // 150
/*                                                                                                                    // 151
 * Private                                                                                                            // 152
 */                                                                                                                   // 153
                                                                                                                      // 154
function doValidate(type, args, skipAutoValue, userId, isFromTrustedCode) {                                           // 155
  var self = this, schema = self._c2._simpleSchema,                                                                   // 156
      doc, callback, error, options, isUpsert, selector;                                                              // 157
                                                                                                                      // 158
  if (!args.length) {                                                                                                 // 159
    throw new Error(type + " requires an argument");                                                                  // 160
  }                                                                                                                   // 161
                                                                                                                      // 162
  // Gather arguments and cache the selector                                                                          // 163
  if (type === "insert") {                                                                                            // 164
    doc = args[0];                                                                                                    // 165
    options = args[1];                                                                                                // 166
    callback = args[2];                                                                                               // 167
                                                                                                                      // 168
    // The real insert doesn't take options                                                                           // 169
    if (typeof options === "function") {                                                                              // 170
      args = [doc, options];                                                                                          // 171
    } else if (typeof callback === "function") {                                                                      // 172
      args = [doc, callback];                                                                                         // 173
    } else {                                                                                                          // 174
      args = [doc];                                                                                                   // 175
    }                                                                                                                 // 176
                                                                                                                      // 177
  } else if (type === "update" || type === "upsert") {                                                                // 178
    selector = args[0];                                                                                               // 179
    doc = args[1];                                                                                                    // 180
    options = args[2];                                                                                                // 181
    callback = args[3];                                                                                               // 182
  } else {                                                                                                            // 183
    throw new Error("invalid type argument");                                                                         // 184
  }                                                                                                                   // 185
                                                                                                                      // 186
  // Support missing options arg                                                                                      // 187
  if (!callback && typeof options === "function") {                                                                   // 188
    callback = options;                                                                                               // 189
    options = {};                                                                                                     // 190
  }                                                                                                                   // 191
  options = options || {};                                                                                            // 192
                                                                                                                      // 193
  // If update was called with upsert:true or upsert was called, flag as an upsert                                    // 194
  isUpsert = (type === "upsert" || (type === "update" && options.upsert === true));                                   // 195
                                                                                                                      // 196
  // Add a default callback function if we're on the client and no callback was given                                 // 197
  if (Meteor.isClient && !callback) {                                                                                 // 198
    // Client can't block, so it can't report errors by exception,                                                    // 199
    // only by callback. If they forget the callback, give them a                                                     // 200
    // default one that logs the error, so they aren't totally                                                        // 201
    // baffled if their writes don't work because their database is                                                   // 202
    // down.                                                                                                          // 203
    callback = function(err) {                                                                                        // 204
      if (err)                                                                                                        // 205
        Meteor._debug(type + " failed: " + (err.reason || err.stack));                                                // 206
    };                                                                                                                // 207
  }                                                                                                                   // 208
                                                                                                                      // 209
  // If client validation is fine or is skipped but then something                                                    // 210
  // is found to be invalid on the server, we get that error back                                                     // 211
  // as a special Meteor.Error that we need to parse.                                                                 // 212
  if (Meteor.isClient) {                                                                                              // 213
    var last = args.length - 1;                                                                                       // 214
    if (typeof args[last] === 'function') {                                                                           // 215
      callback = args[last] = wrapCallbackForParsingServerErrors(self, options.validationContext, callback);          // 216
    }                                                                                                                 // 217
  }                                                                                                                   // 218
                                                                                                                      // 219
  // If _id has already been added, remove it temporarily if it's                                                     // 220
  // not explicitly defined in the schema.                                                                            // 221
  var id;                                                                                                             // 222
  if (Meteor.isServer && doc._id && !schema.allowsKey("_id")) {                                                       // 223
    id = doc._id;                                                                                                     // 224
    delete doc._id;                                                                                                   // 225
  }                                                                                                                   // 226
                                                                                                                      // 227
  function doClean(docToClean, getAutoValues, filter, autoConvert, removeEmptyStrings, trimStrings) {                 // 228
    // Clean the doc/modifier in place                                                                                // 229
    schema.clean(docToClean, {                                                                                        // 230
      filter: filter,                                                                                                 // 231
      autoConvert: autoConvert,                                                                                       // 232
      getAutoValues: getAutoValues,                                                                                   // 233
      isModifier: (type !== "insert"),                                                                                // 234
      removeEmptyStrings: removeEmptyStrings,                                                                         // 235
      trimStrings: trimStrings,                                                                                       // 236
      extendAutoValueContext: {                                                                                       // 237
        isInsert: (type === "insert"),                                                                                // 238
        isUpdate: (type === "update" && options.upsert !== true),                                                     // 239
        isUpsert: isUpsert,                                                                                           // 240
        userId: userId,                                                                                               // 241
        isFromTrustedCode: isFromTrustedCode,                                                                         // 242
        docId: ((type === "update" || type === "upsert") && selector && selector._id) ? selector._id : void 0         // 243
      }                                                                                                               // 244
    });                                                                                                               // 245
  }                                                                                                                   // 246
                                                                                                                      // 247
  // Preliminary cleaning on both client and server. On the server, automatic                                         // 248
  // values will also be set at this point.                                                                           // 249
  doClean(doc, (Meteor.isServer && !skipAutoValue), options.filter !== false, options.autoConvert !== false, options.removeEmptyStrings !== false, options.trimStrings !== false);
                                                                                                                      // 251
  // We clone before validating because in some cases we need to adjust the                                           // 252
  // object a bit before validating it. If we adjusted `doc` itself, our                                              // 253
  // changes would persist into the database.                                                                         // 254
  var docToValidate = {};                                                                                             // 255
  for (var prop in doc) {                                                                                             // 256
    // We omit prototype properties when cloning because they will not be valid                                       // 257
    // and mongo omits them when saving to the database anyway.                                                       // 258
    if (doc.hasOwnProperty(prop)) {                                                                                   // 259
      docToValidate[prop] = doc[prop];                                                                                // 260
    }                                                                                                                 // 261
  }                                                                                                                   // 262
                                                                                                                      // 263
  // On the server, upserts are possible; SimpleSchema handles upserts pretty                                         // 264
  // well by default, but it will not know about the fields in the selector,                                          // 265
  // which are also stored in the database if an insert is performed. So we                                           // 266
  // will allow these fields to be considered for validation by adding them                                           // 267
  // to the $set in the modifier. This is no doubt prone to errors, but there                                         // 268
  // probably isn't any better way right now.                                                                         // 269
  if (Meteor.isServer && isUpsert && _.isObject(selector)) {                                                          // 270
    var set = docToValidate.$set || {};                                                                               // 271
    docToValidate.$set = _.clone(selector);                                                                           // 272
    _.extend(docToValidate.$set, set);                                                                                // 273
  }                                                                                                                   // 274
                                                                                                                      // 275
  // Set automatic values for validation on the client.                                                               // 276
  // On the server, we already updated doc with auto values, but on the client,                                       // 277
  // we will add them to docToValidate for validation purposes only.                                                  // 278
  // This is because we want all actual values generated on the server.                                               // 279
  if (Meteor.isClient) {                                                                                              // 280
    doClean(docToValidate, true, false, false, false, false);                                                         // 281
  }                                                                                                                   // 282
                                                                                                                      // 283
  // Validate doc                                                                                                     // 284
  var ctx = schema.namedContext(options.validationContext);                                                           // 285
  var isValid;                                                                                                        // 286
  if (options.validate === false) {                                                                                   // 287
    isValid = true;                                                                                                   // 288
  } else {                                                                                                            // 289
    isValid = ctx.validate(docToValidate, {                                                                           // 290
      modifier: (type === "update" || type === "upsert"),                                                             // 291
      upsert: isUpsert,                                                                                               // 292
      extendedCustomContext: {                                                                                        // 293
        isInsert: (type === "insert"),                                                                                // 294
        isUpdate: (type === "update" && options.upsert !== true),                                                     // 295
        isUpsert: isUpsert,                                                                                           // 296
        userId: userId,                                                                                               // 297
        isFromTrustedCode: isFromTrustedCode,                                                                         // 298
        docId: ((type === "update" || type === "upsert") && selector && selector._id) ? selector._id : void 0         // 299
      }                                                                                                               // 300
    });                                                                                                               // 301
  }                                                                                                                   // 302
                                                                                                                      // 303
  if (isValid) {                                                                                                      // 304
    // Add the ID back                                                                                                // 305
    if (id) {                                                                                                         // 306
      doc._id = id;                                                                                                   // 307
    }                                                                                                                 // 308
    // Update the args to reflect the cleaned doc                                                                     // 309
    if (type === "insert") {                                                                                          // 310
      args[0] = doc;                                                                                                  // 311
    } else {                                                                                                          // 312
      args[1] = doc;                                                                                                  // 313
    }                                                                                                                 // 314
                                                                                                                      // 315
    // If callback, set invalidKey when we get a mongo unique error                                                   // 316
    if (Meteor.isServer) {                                                                                            // 317
      var last = args.length - 1;                                                                                     // 318
      if (typeof args[last] === 'function') {                                                                         // 319
        args[last] = wrapCallbackForParsingMongoValidationErrors(self, doc, options.validationContext, args[last]);   // 320
      }                                                                                                               // 321
    }                                                                                                                 // 322
    return args;                                                                                                      // 323
  } else {                                                                                                            // 324
    error = getErrorObject(ctx);                                                                                      // 325
    if (callback) {                                                                                                   // 326
      // insert/update/upsert pass `false` when there's an error, so we do that                                       // 327
      callback(error, false);                                                                                         // 328
    } else {                                                                                                          // 329
      throw error;                                                                                                    // 330
    }                                                                                                                 // 331
  }                                                                                                                   // 332
}                                                                                                                     // 333
                                                                                                                      // 334
function getErrorObject(context) {                                                                                    // 335
  var message, invalidKeys = context.invalidKeys();                                                                   // 336
  if (invalidKeys.length) {                                                                                           // 337
    message = context.keyErrorMessage(invalidKeys[0].name);                                                           // 338
  } else {                                                                                                            // 339
    message = "Failed validation";                                                                                    // 340
  }                                                                                                                   // 341
  var error = new Error(message);                                                                                     // 342
  error.invalidKeys = invalidKeys;                                                                                    // 343
  // If on the server, we add a sanitized error, too, in case we're                                                   // 344
  // called from a method.                                                                                            // 345
  if (Meteor.isServer) {                                                                                              // 346
    error.sanitizedError = new Meteor.Error(400, message);                                                            // 347
  }                                                                                                                   // 348
  return error;                                                                                                       // 349
}                                                                                                                     // 350
                                                                                                                      // 351
function addUniqueError(context, errorMessage) {                                                                      // 352
  var name = errorMessage.split('c2_')[1].split(' ')[0];                                                              // 353
  var val = errorMessage.split('dup key:')[1].split('"')[1];                                                          // 354
  context.addInvalidKeys([{                                                                                           // 355
    name: name,                                                                                                       // 356
    type: 'notUnique',                                                                                                // 357
    value: val                                                                                                        // 358
  }]);                                                                                                                // 359
}                                                                                                                     // 360
                                                                                                                      // 361
function wrapCallbackForParsingMongoValidationErrors(col, doc, vCtx, cb) {                                            // 362
  return function wrappedCallbackForParsingMongoValidationErrors(error) {                                             // 363
    if (error && ((error.name === "MongoError" && error.code === 11001) || error.message.indexOf('MongoError: E11000' !== -1)) && error.message.indexOf('c2_') !== -1) {
      var context = col.simpleSchema().namedContext(vCtx);                                                            // 365
      addUniqueError(context, error.message);                                                                         // 366
      arguments[0] = getErrorObject(context);                                                                         // 367
    }                                                                                                                 // 368
    return cb.apply(this, arguments);                                                                                 // 369
  };                                                                                                                  // 370
}                                                                                                                     // 371
                                                                                                                      // 372
function wrapCallbackForParsingServerErrors(col, vCtx, cb) {                                                          // 373
  return function wrappedCallbackForParsingServerErrors(error) {                                                      // 374
    // Handle our own validation errors                                                                               // 375
    var context = col.simpleSchema().namedContext(vCtx);                                                              // 376
    if (error instanceof Meteor.Error && error.error === 400 && error.reason === "INVALID" && typeof error.details === "string") {
      var invalidKeysFromServer = EJSON.parse(error.details);                                                         // 378
      context.addInvalidKeys(invalidKeysFromServer);                                                                  // 379
      arguments[0] = getErrorObject(context);                                                                         // 380
    }                                                                                                                 // 381
    // Handle Mongo unique index errors, which are forwarded to the client as 409 errors                              // 382
    else if (error instanceof Meteor.Error && error.error === 409 && error.reason && error.reason.indexOf('E11000') !== -1 && error.reason.indexOf('c2_') !== -1) {
      addUniqueError(context, error.reason);                                                                          // 384
      arguments[0] = getErrorObject(context);                                                                         // 385
    }                                                                                                                 // 386
    return cb.apply(this, arguments);                                                                                 // 387
  };                                                                                                                  // 388
}                                                                                                                     // 389
                                                                                                                      // 390
var alreadyInsecured = {};                                                                                            // 391
function keepInsecure(c) {                                                                                            // 392
  // If insecure package is in use, we need to add allow rules that return                                            // 393
  // true. Otherwise, it would seemingly turn off insecure mode.                                                      // 394
  if (Package && Package.insecure && !alreadyInsecured[c._name]) {                                                    // 395
    c.allow({                                                                                                         // 396
      insert: function() {                                                                                            // 397
        return true;                                                                                                  // 398
      },                                                                                                              // 399
      update: function() {                                                                                            // 400
        return true;                                                                                                  // 401
      },                                                                                                              // 402
      remove: function () {                                                                                           // 403
        return true;                                                                                                  // 404
      },                                                                                                              // 405
      fetch: [],                                                                                                      // 406
      transform: null                                                                                                 // 407
    });                                                                                                               // 408
    alreadyInsecured[c._name] = true;                                                                                 // 409
  }                                                                                                                   // 410
  // If insecure package is NOT in use, then adding the two deny functions                                            // 411
  // does not have any effect on the main app's security paradigm. The                                                // 412
  // user will still be required to add at least one allow function of her                                            // 413
  // own for each operation for this collection. And the user may still add                                           // 414
  // additional deny functions, but does not have to.                                                                 // 415
}                                                                                                                     // 416
                                                                                                                      // 417
var alreadyDefined = {};                                                                                              // 418
function defineDeny(c, options) {                                                                                     // 419
  if (!alreadyDefined[c._name]) {                                                                                     // 420
                                                                                                                      // 421
    // First define deny functions to extend doc with the results of clean                                            // 422
    // and autovalues. This must be done with "transform: null" or we would be                                        // 423
    // extending a clone of doc and therefore have no effect.                                                         // 424
    c.deny({                                                                                                          // 425
      insert: function(userId, doc) {                                                                                 // 426
        var ss = c.simpleSchema();                                                                                    // 427
        // If _id has already been added, remove it temporarily if it's                                               // 428
        // not explicitly defined in the schema.                                                                      // 429
        var id;                                                                                                       // 430
        if (Meteor.isServer && doc._id && !ss.allowsKey("_id")) {                                                     // 431
          id = doc._id;                                                                                               // 432
          delete doc._id;                                                                                             // 433
        }                                                                                                             // 434
                                                                                                                      // 435
        // Referenced doc is cleaned in place                                                                         // 436
        ss.clean(doc, {                                                                                               // 437
          isModifier: false,                                                                                          // 438
          // We don't do these here because they are done on the client if desired                                    // 439
          filter: false,                                                                                              // 440
          autoConvert: false,                                                                                         // 441
          removeEmptyStrings: false,                                                                                  // 442
          trimStrings: false,                                                                                         // 443
          extendAutoValueContext: {                                                                                   // 444
            isInsert: true,                                                                                           // 445
            isUpdate: false,                                                                                          // 446
            isUpsert: false,                                                                                          // 447
            userId: userId,                                                                                           // 448
            isFromTrustedCode: false                                                                                  // 449
          }                                                                                                           // 450
        });                                                                                                           // 451
                                                                                                                      // 452
        // Add the ID back                                                                                            // 453
        if (id) {                                                                                                     // 454
          doc._id = id;                                                                                               // 455
        }                                                                                                             // 456
                                                                                                                      // 457
        return false;                                                                                                 // 458
      },                                                                                                              // 459
      update: function(userId, doc, fields, modifier) {                                                               // 460
        var ss = c.simpleSchema();                                                                                    // 461
        // Referenced modifier is cleaned in place                                                                    // 462
        ss.clean(modifier, {                                                                                          // 463
          isModifier: true,                                                                                           // 464
          // We don't do these here because they are done on the client if desired                                    // 465
          filter: false,                                                                                              // 466
          autoConvert: false,                                                                                         // 467
          removeEmptyStrings: false,                                                                                  // 468
          trimStrings: false,                                                                                         // 469
          extendAutoValueContext: {                                                                                   // 470
            isInsert: false,                                                                                          // 471
            isUpdate: true,                                                                                           // 472
            isUpsert: false,                                                                                          // 473
            userId: userId,                                                                                           // 474
            isFromTrustedCode: false,                                                                                 // 475
            docId: doc && doc._id                                                                                     // 476
          }                                                                                                           // 477
        });                                                                                                           // 478
                                                                                                                      // 479
        return false;                                                                                                 // 480
      },                                                                                                              // 481
      fetch: ['_id'],                                                                                                 // 482
      transform: null                                                                                                 // 483
    });                                                                                                               // 484
                                                                                                                      // 485
    // Second define deny functions to validate again on the server                                                   // 486
    // for client-initiated inserts and updates. These should be                                                      // 487
    // called after the clean/autovalue functions since we're adding                                                  // 488
    // them after. These must *not* have "transform: null" if options.transform is true because                       // 489
    // we need to pass the doc through any transforms to be sure                                                      // 490
    // that custom types are properly recognized for type validation.                                                 // 491
    c.deny(_.extend({                                                                                                 // 492
      insert: function(userId, doc) {                                                                                 // 493
        // We pass the false options because we will have done them on client if desired                              // 494
        doValidate.call(c, "insert", [doc, {trimStrings: false, removeEmptyStrings: false, filter: false, autoConvert: false}, function(error) {
            if (error) {                                                                                              // 496
              throw new Meteor.Error(400, 'INVALID', EJSON.stringify(error.invalidKeys));                             // 497
            }                                                                                                         // 498
          }], true, userId, false);                                                                                   // 499
                                                                                                                      // 500
        return false;                                                                                                 // 501
      },                                                                                                              // 502
      update: function(userId, doc, fields, modifier) {                                                               // 503
        // NOTE: This will never be an upsert because client-side upserts                                             // 504
        // are not allowed once you define allow/deny functions.                                                      // 505
        // We pass the false options because we will have done them on client if desired                              // 506
        doValidate.call(c, "update", [{_id: doc && doc._id}, modifier, {trimStrings: false, removeEmptyStrings: false, filter: false, autoConvert: false}, function(error) {
            if (error) {                                                                                              // 508
              throw new Meteor.Error(400, 'INVALID', EJSON.stringify(error.invalidKeys));                             // 509
            }                                                                                                         // 510
          }], true, userId, false);                                                                                   // 511
                                                                                                                      // 512
        return false;                                                                                                 // 513
      },                                                                                                              // 514
      fetch: ['_id']                                                                                                  // 515
    }, options.transform === true ? {} : {transform: null}));                                                         // 516
                                                                                                                      // 517
    // note that we've already done this collection so that we don't do it again                                      // 518
    // if attachSchema is called again                                                                                // 519
    alreadyDefined[c._name] = true;                                                                                   // 520
  }                                                                                                                   // 521
}                                                                                                                     // 522
                                                                                                                      // 523
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);

///////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
Package._define("aldeed:collection2");

})();
