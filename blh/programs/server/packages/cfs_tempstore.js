(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var FS = Package['cfs:base-package'].FS;
var ECMAScript = Package.ecmascript.ECMAScript;
var MongoInternals = Package.mongo.MongoInternals;
var Mongo = Package.mongo.Mongo;
var meteorInstall = Package.modules.meteorInstall;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;

/* Package-scope variables */
var _chunkPath, _fileReference;

var require = meteorInstall({"node_modules":{"meteor":{"cfs:tempstore":{"tempStore.js":function(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/cfs_tempstore/tempStore.js                                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// ##Temporary Storage
//
// Temporary storage is used for chunked uploads until all chunks are received
// and all copies have been made or given up. In some cases, the original file
// is stored only in temporary storage (for example, if all copies do some
// manipulation in beforeSave). This is why we use the temporary file as the
// basis for each saved copy, and then remove it after all copies are saved.
//
// Every chunk is saved as an individual temporary file. This is safer than
// attempting to write multiple incoming chunks to different positions in a
// single temporary file, which can lead to write conflicts.
//
// Using temp files also allows us to easily resume uploads, even if the server
// restarts, and to keep the working memory clear.
// The FS.TempStore emits events that others are able to listen to
var EventEmitter = Npm.require('events').EventEmitter; // We have a special stream concating all chunk files into one readable stream


var CombinedStream = Npm.require('combined-stream'); /** @namespace FS.TempStore
                                                      * @property FS.TempStore
                                                      * @type {object}
                                                      * @public
                                                      * @summary An event emitter
                                                      */

FS.TempStore = new EventEmitter(); // Create a tracker collection for keeping track of all chunks for any files that are currently in the temp store

var tracker = FS.TempStore.Tracker = new Mongo.Collection('cfs._tempstore.chunks'); /**
                                                                                     * @property FS.TempStore.Storage
                                                                                     * @type {StorageAdapter}
                                                                                     * @namespace FS.TempStore
                                                                                     * @private
                                                                                     * @summary This property is set to either `FS.Store.FileSystem` or `FS.Store.GridFS`
                                                                                     *
                                                                                     * __When and why:__
                                                                                     * We normally default to `cfs-filesystem` unless its not installed. *(we default to gridfs if installed)*
                                                                                     * But if `cfs-gridfs` and `cfs-worker` is installed we default to `cfs-gridfs`
                                                                                     *
                                                                                     * If `cfs-gridfs` and `cfs-filesystem` is not installed we log a warning.
                                                                                     * the user can set `FS.TempStore.Storage` them selfs eg.:
                                                                                     * ```js
                                                                                     *   // Its important to set `internal: true` this lets the SA know that we
                                                                                     *   // are using this internally and it will give us direct SA api
                                                                                     *   FS.TempStore.Storage = new FS.Store.GridFS('_tempstore', { internal: true });
                                                                                     * ```
                                                                                     *
                                                                                     * > Note: This is considered as `advanced` use, its not a common pattern.
                                                                                     */
FS.TempStore.Storage = null; // We will not mount a storage adapter until needed. This allows us to check for the
// existance of FS.FileWorker, which is loaded after this package because it
// depends on this package.

function mountStorage() {
  if (FS.TempStore.Storage) return; // XXX: We could replace this test, testing the FS scope for grifFS etc.
  // This is on the todo later when we get "stable"

  if (Package["cfs:gridfs"] && (Package["cfs:worker"] || !Package["cfs:filesystem"])) {
    // If the file worker is installed we would prefer to use the gridfs sa
    // for scalability. We also default to gridfs if filesystem is not found
    // Use the gridfs
    FS.TempStore.Storage = new FS.Store.GridFS('_tempstore', {
      internal: true
    });
  } else if (Package["cfs:filesystem"]) {
    // use the Filesystem
    FS.TempStore.Storage = new FS.Store.FileSystem('_tempstore', {
      internal: true
    });
  } else {
    throw new Error('FS.TempStore.Storage is not set: Install cfs:filesystem or cfs:gridfs or set it manually');
  }

  FS.debug && console.log('TempStore is mounted on', FS.TempStore.Storage.typeName);
}

function mountFile(fileObj, name) {
  if (!fileObj.isMounted()) {
    throw new Error(name + ' cannot work with unmounted file');
  }
} // We update the fileObj on progress


FS.TempStore.on('progress', function (fileObj, chunkNum, count, total, result) {
  FS.debug && console.log('TempStore progress: Received ' + count + ' of ' + total + ' chunks for ' + fileObj.name());
}); // XXX: TODO
// FS.TempStore.on('stored', function(fileObj, chunkCount, result) {
//   // This should work if we pass on result from the SA on stored event...
//   fileObj.update({ $set: { chunkSum: 1, chunkCount: chunkCount, size: result.size } });
// });
// Stream implementation
/**
 * @method _chunkPath
 * @private
 * @param {Number} [n] Chunk number
 * @returns {String} Chunk naming convention
 */

_chunkPath = function (n) {
  return (n || 0) + '.chunk';
}; /**
    * @method _fileReference
    * @param {FS.File} fileObj
    * @param {Number} chunk
    * @private
    * @returns {String} Generated SA specific fileKey for the chunk
    *
    * Note: Calling function should call mountStorage() first, and
    * make sure that fileObj is mounted.
    */

_fileReference = function (fileObj, chunk, existing) {
  // Maybe it's a chunk we've already saved
  existing = existing || tracker.findOne({
    fileId: fileObj._id,
    collectionName: fileObj.collectionName
  }); // Make a temporary fileObj just for fileKey generation

  var tempFileObj = new FS.File({
    collectionName: fileObj.collectionName,
    _id: fileObj._id,
    original: {
      name: _chunkPath(chunk)
    },
    copies: {
      _tempstore: {
        key: existing && existing.keys[chunk]
      }
    }
  }); // Return a fitting fileKey SA specific

  return FS.TempStore.Storage.adapter.fileKey(tempFileObj);
}; /**
    * @method FS.TempStore.exists
    * @param {FS.File} File object
    * @returns {Boolean} Is this file, or parts of it, currently stored in the TempStore
    */

FS.TempStore.exists = function (fileObj) {
  var existing = tracker.findOne({
    fileId: fileObj._id,
    collectionName: fileObj.collectionName
  });
  return !!existing;
}; /**
    * @method FS.TempStore.listParts
    * @param {FS.File} fileObj
    * @returns {Object} of parts already stored
    * @todo This is not yet implemented, milestone 1.1.0
    */

FS.TempStore.listParts = function fsTempStoreListParts(fileObj) {
  var self = this;
  console.warn('This function is not correctly implemented using SA in TempStore'); //XXX This function might be necessary for resume. Not currently supported.
}; /**
    * @method FS.TempStore.removeFile
    * @public
    * @param {FS.File} fileObj
    * This function removes the file from tempstorage - it cares not if file is
    * already removed or not found, goal is reached anyway.
    */

FS.TempStore.removeFile = function fsTempStoreRemoveFile(fileObj) {
  var self = this; // Ensure that we have a storage adapter mounted; if not, throw an error.

  mountStorage(); // If fileObj is not mounted or can't be, throw an error

  mountFile(fileObj, 'FS.TempStore.removeFile'); // Emit event

  self.emit('remove', fileObj);
  var chunkInfo = tracker.findOne({
    fileId: fileObj._id,
    collectionName: fileObj.collectionName
  });

  if (chunkInfo) {
    // Unlink each file
    FS.Utility.each(chunkInfo.keys || {}, function (key, chunk) {
      var fileKey = _fileReference(fileObj, chunk, chunkInfo);

      FS.TempStore.Storage.adapter.remove(fileKey, FS.Utility.noop);
    }); // Remove fileObj from tracker collection, too

    tracker.remove({
      _id: chunkInfo._id
    });
  }
}; /**
    * @method FS.TempStore.removeAll
    * @public
    * @summary This function removes all files from tempstorage - it cares not if file is
    * already removed or not found, goal is reached anyway.
    */

FS.TempStore.removeAll = function fsTempStoreRemoveAll() {
  var self = this; // Ensure that we have a storage adapter mounted; if not, throw an error.

  mountStorage();
  tracker.find().forEach(function (chunkInfo) {
    // Unlink each file
    FS.Utility.each(chunkInfo.keys || {}, function (key, chunk) {
      var fileKey = _fileReference({
        _id: chunkInfo.fileId,
        collectionName: chunkInfo.collectionName
      }, chunk, chunkInfo);

      FS.TempStore.Storage.adapter.remove(fileKey, FS.Utility.noop);
    }); // Remove from tracker collection, too

    tracker.remove({
      _id: chunkInfo._id
    });
  });
}; /**
    * @method FS.TempStore.createWriteStream
    * @public
    * @param {FS.File} fileObj File to store in temporary storage
    * @param {Number | String} [options]
    * @returns {Stream} Writeable stream
    *
    * `options` of different types mean differnt things:
    * * `undefined` We store the file in one part
    * *(Normal server-side api usage)*
    * * `Number` the number is the part number total
    * *(multipart uploads will use this api)*
    * * `String` the string is the name of the `store` that wants to store file data
    * *(stores that want to sync their data to the rest of the files stores will use this)*
    *
    * > Note: fileObj must be mounted on a `FS.Collection`, it makes no sense to store otherwise
    */

FS.TempStore.createWriteStream = function (fileObj, options) {
  var self = this; // Ensure that we have a storage adapter mounted; if not, throw an error.

  mountStorage(); // If fileObj is not mounted or can't be, throw an error

  mountFile(fileObj, 'FS.TempStore.createWriteStream'); // Cache the selector for use multiple times below

  var selector = {
    fileId: fileObj._id,
    collectionName: fileObj.collectionName
  }; // TODO, should pass in chunkSum so we don't need to use FS.File for it

  var chunkSum = fileObj.chunkSum || 1; // Add fileObj to tracker collection

  tracker.upsert(selector, {
    $setOnInsert: {
      keys: {}
    }
  }); // Determine how we're using the writeStream

  var isOnePart = false,
      isMultiPart = false,
      isStoreSync = false,
      chunkNum = 0;

  if (options === +options) {
    isMultiPart = true;
    chunkNum = options;
  } else if (options === '' + options) {
    isStoreSync = true;
  } else {
    isOnePart = true;
  } // XXX: it should be possible for a store to sync by storing data into the
  // tempstore - this could be done nicely by setting the store name as string
  // in the chunk variable?
  // This store name could be passed on the the fileworker via the uploaded
  // event
  // So the uploaded event can return:
  // undefined - if data is stored into and should sync out to all storage adapters
  // number - if a chunk has been uploaded
  // string - if a storage adapter wants to sync its data to the other SA's
  // Find a nice location for the chunk data


  var fileKey = _fileReference(fileObj, chunkNum); // Create the stream as Meteor safe stream


  var writeStream = FS.TempStore.Storage.adapter.createWriteStream(fileKey); // When the stream closes we update the chunkCount

  writeStream.safeOn('stored', function (result) {
    // Save key in tracker document
    var setObj = {};
    setObj['keys.' + chunkNum] = result.fileKey;
    tracker.update(selector, {
      $set: setObj
    });
    var temp = tracker.findOne(selector);

    if (!temp) {
      FS.debug && console.log('NOT FOUND FROM TEMPSTORE => EXIT (REMOVED)');
      return;
    } // Get updated chunkCount


    var chunkCount = FS.Utility.size(temp.keys); // Progress

    self.emit('progress', fileObj, chunkNum, chunkCount, chunkSum, result);
    var modifier = {
      $set: {}
    };

    if (!fileObj.instance_id) {
      modifier.$set.instance_id = process.env.COLLECTIONFS_ENV_NAME_UNIQUE_ID ? process.env[process.env.COLLECTIONFS_ENV_NAME_UNIQUE_ID] : process.env.METEOR_PARENT_PID;
    } // If upload is completed


    if (chunkCount === chunkSum) {
      // We no longer need the chunk info
      modifier.$unset = {
        chunkCount: 1,
        chunkSum: 1,
        chunkSize: 1
      }; // Check if the file has been uploaded before

      if (typeof fileObj.uploadedAt === 'undefined') {
        // We set the uploadedAt date
        modifier.$set.uploadedAt = new Date();
      } else {
        // We have been uploaded so an event were file data is updated is
        // called synchronizing - so this must be a synchronizedAt?
        modifier.$set.synchronizedAt = new Date();
      } // Update the fileObject


      fileObj.update(modifier); // Fire ending events

      var eventName = isStoreSync ? 'synchronized' : 'stored';
      self.emit(eventName, fileObj, result); // XXX is emitting "ready" necessary?

      self.emit('ready', fileObj, chunkCount, result);
    } else {
      // Update the chunkCount on the fileObject
      modifier.$set.chunkCount = chunkCount;
      fileObj.update(modifier);
    }
  }); // Emit errors

  writeStream.on('error', function (error) {
    FS.debug && console.log('TempStore writeStream error:', error);
    self.emit('error', error, fileObj);
  });
  return writeStream;
}; /**
     * @method FS.TempStore.createReadStream
     * @public
     * @param {FS.File} fileObj The file to read
     * @return {Stream} Returns readable stream
     *
     */

FS.TempStore.createReadStream = function (fileObj) {
  // Ensure that we have a storage adapter mounted; if not, throw an error.
  mountStorage(); // If fileObj is not mounted or can't be, throw an error

  mountFile(fileObj, 'FS.TempStore.createReadStream');
  FS.debug && console.log('FS.TempStore creating read stream for ' + fileObj._id); // Determine how many total chunks there are from the tracker collection

  var chunkInfo = tracker.findOne({
    fileId: fileObj._id,
    collectionName: fileObj.collectionName
  }) || {};
  var totalChunks = FS.Utility.size(chunkInfo.keys);

  function getNextStreamFunc(chunk) {
    return Meteor.bindEnvironment(function (next) {
      var fileKey = _fileReference(fileObj, chunk);

      var chunkReadStream = FS.TempStore.Storage.adapter.createReadStream(fileKey);
      next(chunkReadStream);
    }, function (error) {
      throw error;
    });
  } // Make a combined stream


  var combinedStream = CombinedStream.create(); // Add each chunk stream to the combined stream when the previous chunk stream ends

  var currentChunk = 0;

  for (var chunk = 0; chunk < totalChunks; chunk++) {
    combinedStream.append(getNextStreamFunc(chunk));
  } // Return the combined stream


  return combinedStream;
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});
require("./node_modules/meteor/cfs:tempstore/tempStore.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['cfs:tempstore'] = {};

})();

//# sourceURL=meteor://💻app/packages/cfs_tempstore.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvY2ZzOnRlbXBzdG9yZS90ZW1wU3RvcmUuanMiXSwibmFtZXMiOlsiRXZlbnRFbWl0dGVyIiwiTnBtIiwicmVxdWlyZSIsIkNvbWJpbmVkU3RyZWFtIiwiRlMiLCJUZW1wU3RvcmUiLCJ0cmFja2VyIiwiVHJhY2tlciIsIk1vbmdvIiwiQ29sbGVjdGlvbiIsIlN0b3JhZ2UiLCJtb3VudFN0b3JhZ2UiLCJQYWNrYWdlIiwiU3RvcmUiLCJHcmlkRlMiLCJpbnRlcm5hbCIsIkZpbGVTeXN0ZW0iLCJFcnJvciIsImRlYnVnIiwiY29uc29sZSIsImxvZyIsInR5cGVOYW1lIiwibW91bnRGaWxlIiwiZmlsZU9iaiIsIm5hbWUiLCJpc01vdW50ZWQiLCJvbiIsImNodW5rTnVtIiwiY291bnQiLCJ0b3RhbCIsInJlc3VsdCIsIl9jaHVua1BhdGgiLCJuIiwiX2ZpbGVSZWZlcmVuY2UiLCJjaHVuayIsImV4aXN0aW5nIiwiZmluZE9uZSIsImZpbGVJZCIsIl9pZCIsImNvbGxlY3Rpb25OYW1lIiwidGVtcEZpbGVPYmoiLCJGaWxlIiwib3JpZ2luYWwiLCJjb3BpZXMiLCJfdGVtcHN0b3JlIiwia2V5Iiwia2V5cyIsImFkYXB0ZXIiLCJmaWxlS2V5IiwiZXhpc3RzIiwibGlzdFBhcnRzIiwiZnNUZW1wU3RvcmVMaXN0UGFydHMiLCJzZWxmIiwid2FybiIsInJlbW92ZUZpbGUiLCJmc1RlbXBTdG9yZVJlbW92ZUZpbGUiLCJlbWl0IiwiY2h1bmtJbmZvIiwiVXRpbGl0eSIsImVhY2giLCJyZW1vdmUiLCJub29wIiwicmVtb3ZlQWxsIiwiZnNUZW1wU3RvcmVSZW1vdmVBbGwiLCJmaW5kIiwiZm9yRWFjaCIsImNyZWF0ZVdyaXRlU3RyZWFtIiwib3B0aW9ucyIsInNlbGVjdG9yIiwiY2h1bmtTdW0iLCJ1cHNlcnQiLCIkc2V0T25JbnNlcnQiLCJpc09uZVBhcnQiLCJpc011bHRpUGFydCIsImlzU3RvcmVTeW5jIiwid3JpdGVTdHJlYW0iLCJzYWZlT24iLCJzZXRPYmoiLCJ1cGRhdGUiLCIkc2V0IiwidGVtcCIsImNodW5rQ291bnQiLCJzaXplIiwibW9kaWZpZXIiLCJpbnN0YW5jZV9pZCIsInByb2Nlc3MiLCJlbnYiLCJDT0xMRUNUSU9ORlNfRU5WX05BTUVfVU5JUVVFX0lEIiwiTUVURU9SX1BBUkVOVF9QSUQiLCIkdW5zZXQiLCJjaHVua1NpemUiLCJ1cGxvYWRlZEF0IiwiRGF0ZSIsInN5bmNocm9uaXplZEF0IiwiZXZlbnROYW1lIiwiZXJyb3IiLCJjcmVhdGVSZWFkU3RyZWFtIiwidG90YWxDaHVua3MiLCJnZXROZXh0U3RyZWFtRnVuYyIsIk1ldGVvciIsImJpbmRFbnZpcm9ubWVudCIsIm5leHQiLCJjaHVua1JlYWRTdHJlYW0iLCJjb21iaW5lZFN0cmVhbSIsImNyZWF0ZSIsImN1cnJlbnRDaHVuayIsImFwcGVuZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBLElBQUlBLGVBQWVDLElBQUlDLE9BQUosQ0FBWSxRQUFaLEVBQXNCRixZQUF6QyxDLENBRUE7OztBQUNBLElBQUlHLGlCQUFpQkYsSUFBSUMsT0FBSixDQUFZLGlCQUFaLENBQXJCLEMsQ0FFQTs7Ozs7OztBQU1BRSxHQUFHQyxTQUFILEdBQWUsSUFBSUwsWUFBSixFQUFmLEMsQ0FFQTs7QUFDQSxJQUFJTSxVQUFVRixHQUFHQyxTQUFILENBQWFFLE9BQWIsR0FBdUIsSUFBSUMsTUFBTUMsVUFBVixDQUFxQix1QkFBckIsQ0FBckMsQyxDQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFxQkFMLEdBQUdDLFNBQUgsQ0FBYUssT0FBYixHQUF1QixJQUF2QixDLENBRUE7QUFDQTtBQUNBOztBQUNBLFNBQVNDLFlBQVQsR0FBd0I7QUFFdEIsTUFBSVAsR0FBR0MsU0FBSCxDQUFhSyxPQUFqQixF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d0JXLEtBQXhCLENBQWQ7O0FBQ0EsVUFBSW9FLGtCQUFrQmxHLEdBQUdDLFNBQUgsQ0FBYUssT0FBYixDQUFxQnFDLE9BQXJCLENBQTZCaUQsZ0JBQTdCLENBQThDaEQsT0FBOUMsQ0FBdEI7QUFDQXFELFdBQUtDLGVBQUw7QUFDRCxLQUpNLEVBSUosVUFBVVAsS0FBVixFQUFpQjtBQUNsQixZQUFNQSxLQUFOO0FBQ0QsS0FOTSxDQUFQO0FBT0QsR0FyQitDLENBdUJoRDs7O0FBQ0EsTUFBSVEsaUJBQWlCcEcsZUFBZXFHLE1BQWYsRUFBckIsQ0F4QmdELENBMEJoRDs7QUFDQSxNQUFJQyxlQUFlLENBQW5COztBQUNBLE9BQUssSUFBSXZFLFFBQVEsQ0FBakIsRUFBb0JBLFFBQVErRCxXQUE1QixFQUF5Qy9ELE9BQXpDLEVBQWtEO0FBQ2hEcUUsbUJBQWVHLE1BQWYsQ0FBc0JSLGtCQUFrQmhFLEtBQWxCLENBQXRCO0FBQ0QsR0E5QitDLENBZ0NoRDs7O0FBQ0EsU0FBT3FFLGNBQVA7QUFDRCxDQWxDRCxDIiwiZmlsZSI6Ii9wYWNrYWdlcy9jZnNfdGVtcHN0b3JlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gIyNUZW1wb3JhcnkgU3RvcmFnZVxuLy9cbi8vIFRlbXBvcmFyeSBzdG9yYWdlIGlzIHVzZWQgZm9yIGNodW5rZWQgdXBsb2FkcyB1bnRpbCBhbGwgY2h1bmtzIGFyZSByZWNlaXZlZFxuLy8gYW5kIGFsbCBjb3BpZXMgaGF2ZSBiZWVuIG1hZGUgb3IgZ2l2ZW4gdXAuIEluIHNvbWUgY2FzZXMsIHRoZSBvcmlnaW5hbCBmaWxlXG4vLyBpcyBzdG9yZWQgb25seSBpbiB0ZW1wb3Jhcnkgc3RvcmFnZSAoZm9yIGV4YW1wbGUsIGlmIGFsbCBjb3BpZXMgZG8gc29tZVxuLy8gbWFuaXB1bGF0aW9uIGluIGJlZm9yZVNhdmUpLiBUaGlzIGlzIHdoeSB3ZSB1c2UgdGhlIHRlbXBvcmFyeSBmaWxlIGFzIHRoZVxuLy8gYmFzaXMgZm9yIGVhY2ggc2F2ZWQgY29weSwgYW5kIHRoZW4gcmVtb3ZlIGl0IGFmdGVyIGFsbCBjb3BpZXMgYXJlIHNhdmVkLlxuLy9cbi8vIEV2ZXJ5IGNodW5rIGlzIHNhdmVkIGFzIGFuIGluZGl2aWR1YWwgdGVtcG9yYXJ5IGZpbGUuIFRoaXMgaXMgc2FmZXIgdGhhblxuLy8gYXR0ZW1wdGluZyB0byB3cml0ZSBtdWx0aXBsZSBpbmNvbWluZyBjaHVua3MgdG8gZGlmZmVyZW50IHBvc2l0aW9ucyBpbiBhXG4vLyBzaW5nbGUgdGVtcG9yYXJ5IGZpbGUsIHdoaWNoIGNhbiBsZWFkIHRvIHdyaXRlIGNvbmZsaWN0cy5cbi8vXG4vLyBVc2luZyB0ZW1wIGZpbGVzIGFsc28gYWxsb3dzIHVzIHRvIGVhc2lseSByZXN1bWUgdXBsb2FkcywgZXZlbiBpZiB0aGUgc2VydmVyXG4vLyByZXN0YXJ0cywgYW5kIHRvIGtlZXAgdGhlIHdvcmtpbmcgbWVtb3J5IGNsZWFyLlxuXG4vLyBUaGUgRlMuVGVtcFN0b3JlIGVtaXRzIGV2ZW50cyB0aGF0IG90aGVycyBhcmUgYWJsZSB0byBsaXN0ZW4gdG9cbnZhciBFdmVudEVtaXR0ZXIgPSBOcG0ucmVxdWlyZSgnZXZlbnRzJykuRXZlbnRFbWl0dGVyO1xuXG4vLyBXZSBoYXZlIGEgc3BlY2lhbCBzdHJlYW0gY29uY2F0aW5nIGFsbCBjaHVuayBmaWxlcyBpbnRvIG9uZSByZWFkYWJsZSBzdHJlYW1cbnZhciBDb21iaW5lZFN0cmVhbSA9IE5wbS5yZXF1aXJlKCdjb21iaW5lZC1zdHJlYW0nKTtcblxuLyoqIEBuYW1lc3BhY2UgRlMuVGVtcFN0b3JlXG4gKiBAcHJvcGVydHkgRlMuVGVtcFN0b3JlXG4gKiBAdHlwZSB7b2JqZWN0fVxuICogQHB1YmxpY1xuICogQHN1bW1hcnkgQW4gZXZlbnQgZW1pdHRlclxuICovXG5GUy5UZW1wU3RvcmUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbi8vIENyZWF0ZSBhIHRyYWNrZXIgY29sbGVjdGlvbiBmb3Iga2VlcGluZyB0cmFjayBvZiBhbGwgY2h1bmtzIGZvciBhbnkgZmlsZXMgdGhhdCBhcmUgY3VycmVudGx5IGluIHRoZSB0ZW1wIHN0b3JlXG52YXIgdHJhY2tlciA9IEZTLlRlbXBTdG9yZS5UcmFja2VyID0gbmV3IE1vbmdvLkNvbGxlY3Rpb24oJ2Nmcy5fdGVtcHN0b3JlLmNodW5rcycpO1xuXG4vKipcbiAqIEBwcm9wZXJ0eSBGUy5UZW1wU3RvcmUuU3RvcmFnZVxuICogQHR5cGUge1N0b3JhZ2VBZGFwdGVyfVxuICogQG5hbWVzcGFjZSBGUy5UZW1wU3RvcmVcbiAqIEBwcml2YXRlXG4gKiBAc3VtbWFyeSBUaGlzIHByb3BlcnR5IGlzIHNldCB0byBlaXRoZXIgYEZTLlN0b3JlLkZpbGVTeXN0ZW1gIG9yIGBGUy5TdG9yZS5HcmlkRlNgXG4gKlxuICogX19XaGVuIGFuZCB3aHk6X19cbiAqIFdlIG5vcm1hbGx5IGRlZmF1bHQgdG8gYGNmcy1maWxlc3lzdGVtYCB1bmxlc3MgaXRzIG5vdCBpbnN0YWxsZWQuICood2UgZGVmYXVsdCB0byBncmlkZnMgaWYgaW5zdGFsbGVkKSpcbiAqIEJ1dCBpZiBgY2ZzLWdyaWRmc2AgYW5kIGBjZnMtd29ya2VyYCBpcyBpbnN0YWxsZWQgd2UgZGVmYXVsdCB0byBgY2ZzLWdyaWRmc2BcbiAqXG4gKiBJZiBgY2ZzLWdyaWRmc2AgYW5kIGBjZnMtZmlsZXN5c3RlbWAgaXMgbm90IGluc3RhbGxlZCB3ZSBsb2cgYSB3YXJuaW5nLlxuICogdGhlIHVzZXIgY2FuIHNldCBgRlMuVGVtcFN0b3JlLlN0b3JhZ2VgIHRoZW0gc2VsZnMgZWcuOlxuICogYGBganNcbiAqICAgLy8gSXRzIGltcG9ydGFudCB0byBzZXQgYGludGVybmFsOiB0cnVlYCB0aGlzIGxldHMgdGhlIFNBIGtub3cgdGhhdCB3ZVxuICogICAvLyBhcmUgdXNpbmcgdGhpcyBpbnRlcm5hbGx5IGFuZCBpdCB3aWxsIGdpdmUgdXMgZGlyZWN0IFNBIGFwaVxuICogICBGUy5UZW1wU3RvcmUuU3RvcmFnZSA9IG5ldyBGUy5TdG9yZS5HcmlkRlMoJ190ZW1wc3RvcmUnLCB7IGludGVybmFsOiB0cnVlIH0pO1xuICogYGBgXG4gKlxuICogPiBOb3RlOiBUaGlzIGlzIGNvbnNpZGVyZWQgYXMgYGFkdmFuY2VkYCB1c2UsIGl0cyBub3QgYSBjb21tb24gcGF0dGVybi5cbiAqL1xuRlMuVGVtcFN0b3JlLlN0b3JhZ2UgPSBudWxsO1xuXG4vLyBXZSB3aWxsIG5vdCBtb3VudCBhIHN0b3JhZ2UgYWRhcHRlciB1bnRpbCBuZWVkZWQuIFRoaXMgYWxsb3dzIHVzIHRvIGNoZWNrIGZvciB0aGVcbi8vIGV4aXN0YW5jZSBvZiBGUy5GaWxlV29ya2VyLCB3aGljaCBpcyBsb2FkZWQgYWZ0ZXIgdGhpcyBwYWNrYWdlIGJlY2F1c2UgaXRcbi8vIGRlcGVuZHMgb24gdGhpcyBwYWNrYWdlLlxuZnVuY3Rpb24gbW91bnRTdG9yYWdlKCkge1xuXG4gIGlmIChGUy5UZW1wU3RvcmUuU3RvcmFnZSkgcmV0dXJuO1xuXG4gIC8vIFhYWDogV2UgY291bGQgcmVwbGFjZSB0aGlzIHRlc3QsIHRlc3RpbmcgdGhlIEZTIHNjb3BlIGZvciBncmlmRlMgZXRjLlxuICAvLyBUaGlzIGlzIG9uIHRoZSB0b2RvIGxhdGVyIHdoZW4gd2UgZ2V0IFwic3RhYmxlXCJcbiAgaWYgKFBhY2thZ2VbXCJjZnM6Z3JpZGZzXCJdICYmIChQYWNrYWdlW1wiY2ZzOndvcmtlclwiXSB8fCAhUGFja2FnZVtcImNmczpmaWxlc3lzdGVtXCJdKSkge1xuICAgIC8vIElmIHRoZSBmaWxlIHdvcmtlciBpcyBpbnN0YWxsZWQgd2Ugd291bGQgcHJlZmVyIHRvIHVzZSB0aGUgZ3JpZGZzIHNhXG4gICAgLy8gZm9yIHNjYWxhYmlsaXR5LiBXZSBhbHNvIGRlZmF1bHQgdG8gZ3JpZGZzIGlmIGZpbGVzeXN0ZW0gaXMgbm90IGZvdW5kXG5cbiAgICAvLyBVc2UgdGhlIGdyaWRmc1xuICAgIEZTLlRlbXBTdG9yZS5TdG9yYWdlID0gbmV3IEZTLlN0b3JlLkdyaWRGUygnX3RlbXBzdG9yZScsIHsgaW50ZXJuYWw6IHRydWUgfSk7XG4gIH0gZWxzZSBpZiAoUGFja2FnZVtcImNmczpmaWxlc3lzdGVtXCJdKSB7XG5cbiAgICAvLyB1c2UgdGhlIEZpbGVzeXN0ZW1cbiAgICBGUy5UZW1wU3RvcmUuU3RvcmFnZSA9IG5ldyBGUy5TdG9yZS5GaWxlU3lzdGVtKCdfdGVtcHN0b3JlJywgeyBpbnRlcm5hbDogdHJ1ZSB9KTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZTLlRlbXBTdG9yZS5TdG9yYWdlIGlzIG5vdCBzZXQ6IEluc3RhbGwgY2ZzOmZpbGVzeXN0ZW0gb3IgY2ZzOmdyaWRmcyBvciBzZXQgaXQgbWFudWFsbHknKTtcbiAgfVxuXG4gIEZTLmRlYnVnICYmIGNvbnNvbGUubG9nKCdUZW1wU3RvcmUgaXMgbW91bnRlZCBvbicsIEZTLlRlbXBTdG9yZS5TdG9yYWdlLnR5cGVOYW1lKTtcbn1cblxuZnVuY3Rpb24gbW91bnRGaWxlKGZpbGVPYmosIG5hbWUpIHtcbiAgaWYgKCFmaWxlT2JqLmlzTW91bnRlZCgpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKG5hbWUgKyAnIGNhbm5vdCB3b3JrIHdpdGggdW5tb3VudGVkIGZpbGUnKTtcbiAgfVxufVxuXG4vLyBXZSB1cGRhdGUgdGhlIGZpbGVPYmogb24gcHJvZ3Jlc3NcbkZTLlRlbXBTdG9yZS5vbigncHJvZ3Jlc3MnLCBmdW5jdGlvbihmaWxlT2JqLCBjaHVua051bSwgY291bnQsIHRvdGFsLCByZXN1bHQpIHtcbiAgRlMuZGVidWcgJiYgY29uc29sZS5sb2coJ1RlbXBTdG9yZSBwcm9ncmVzczogUmVjZWl2ZWQgJyArIGNvdW50ICsgJyBvZiAnICsgdG90YWwgKyAnIGNodW5rcyBmb3IgJyArIGZpbGVPYmoubmFtZSgpKTtcbn0pO1xuXG4vLyBYWFg6IFRPRE9cbi8vIEZTLlRlbXBTdG9yZS5vbignc3RvcmVkJywgZnVuY3Rpb24oZmlsZU9iaiwgY2h1bmtDb3VudCwgcmVzdWx0KSB7XG4vLyAgIC8vIFRoaXMgc2hvdWxkIHdvcmsgaWYgd2UgcGFzcyBvbiByZXN1bHQgZnJvbSB0aGUgU0Egb24gc3RvcmVkIGV2ZW50Li4uXG4vLyAgIGZpbGVPYmoudXBkYXRlKHsgJHNldDogeyBjaHVua1N1bTogMSwgY2h1bmtDb3VudDogY2h1bmtDb3VudCwgc2l6ZTogcmVzdWx0LnNpemUgfSB9KTtcbi8vIH0pO1xuXG4vLyBTdHJlYW0gaW1wbGVtZW50YXRpb25cblxuLyoqXG4gKiBAbWV0aG9kIF9jaHVua1BhdGhcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge051bWJlcn0gW25dIENodW5rIG51bWJlclxuICogQHJldHVybnMge1N0cmluZ30gQ2h1bmsgbmFtaW5nIGNvbnZlbnRpb25cbiAqL1xuX2NodW5rUGF0aCA9IGZ1bmN0aW9uKG4pIHtcbiAgcmV0dXJuIChuIHx8IDApICsgJy5jaHVuayc7XG59O1xuXG4vKipcbiAqIEBtZXRob2QgX2ZpbGVSZWZlcmVuY2VcbiAqIEBwYXJhbSB7RlMuRmlsZX0gZmlsZU9ialxuICogQHBhcmFtIHtOdW1iZXJ9IGNodW5rXG4gKiBAcHJpdmF0ZVxuICogQHJldHVybnMge1N0cmluZ30gR2VuZXJhdGVkIFNBIHNwZWNpZmljIGZpbGVLZXkgZm9yIHRoZSBjaHVua1xuICpcbiAqIE5vdGU6IENhbGxpbmcgZnVuY3Rpb24gc2hvdWxkIGNhbGwgbW91bnRTdG9yYWdlKCkgZmlyc3QsIGFuZFxuICogbWFrZSBzdXJlIHRoYXQgZmlsZU9iaiBpcyBtb3VudGVkLlxuICovXG5fZmlsZVJlZmVyZW5jZSA9IGZ1bmN0aW9uKGZpbGVPYmosIGNodW5rLCBleGlzdGluZykge1xuICAvLyBNYXliZSBpdCdzIGEgY2h1bmsgd2UndmUgYWxyZWFkeSBzYXZlZFxuICBleGlzdGluZyA9IGV4aXN0aW5nIHx8IHRyYWNrZXIuZmluZE9uZSh7ZmlsZUlkOiBmaWxlT2JqLl9pZCwgY29sbGVjdGlvbk5hbWU6IGZpbGVPYmouY29sbGVjdGlvbk5hbWV9KTtcblxuICAvLyBNYWtlIGEgdGVtcG9yYXJ5IGZpbGVPYmoganVzdCBmb3IgZmlsZUtleSBnZW5lcmF0aW9uXG4gIHZhciB0ZW1wRmlsZU9iaiA9IG5ldyBGUy5GaWxlKHtcbiAgICBjb2xsZWN0aW9uTmFtZTogZmlsZU9iai5jb2xsZWN0aW9uTmFtZSxcbiAgICBfaWQ6IGZpbGVPYmouX2lkLFxuICAgIG9yaWdpbmFsOiB7XG4gICAgICBuYW1lOiBfY2h1bmtQYXRoKGNodW5rKVxuICAgIH0sXG4gICAgY29waWVzOiB7XG4gICAgICBfdGVtcHN0b3JlOiB7XG4gICAgICAgIGtleTogZXhpc3RpbmcgJiYgZXhpc3Rpbmcua2V5c1tjaHVua11cbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIC8vIFJldHVybiBhIGZpdHRpbmcgZmlsZUtleSBTQSBzcGVjaWZpY1xuICByZXR1cm4gRlMuVGVtcFN0b3JlLlN0b3JhZ2UuYWRhcHRlci5maWxlS2V5KHRlbXBGaWxlT2JqKTtcbn07XG5cbi8qKlxuICogQG1ldGhvZCBGUy5UZW1wU3RvcmUuZXhpc3RzXG4gKiBAcGFyYW0ge0ZTLkZpbGV9IEZpbGUgb2JqZWN0XG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gSXMgdGhpcyBmaWxlLCBvciBwYXJ0cyBvZiBpdCwgY3VycmVudGx5IHN0b3JlZCBpbiB0aGUgVGVtcFN0b3JlXG4gKi9cbkZTLlRlbXBTdG9yZS5leGlzdHMgPSBmdW5jdGlvbihmaWxlT2JqKSB7XG4gIHZhciBleGlzdGluZyA9IHRyYWNrZXIuZmluZE9uZSh7ZmlsZUlkOiBmaWxlT2JqLl9pZCwgY29sbGVjdGlvbk5hbWU6IGZpbGVPYmouY29sbGVjdGlvbk5hbWV9KTtcbiAgcmV0dXJuICEhZXhpc3Rpbmc7XG59O1xuXG4vKipcbiAqIEBtZXRob2QgRlMuVGVtcFN0b3JlLmxpc3RQYXJ0c1xuICogQHBhcmFtIHtGUy5GaWxlfSBmaWxlT2JqXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBvZiBwYXJ0cyBhbHJlYWR5IHN0b3JlZFxuICogQHRvZG8gVGhpcyBpcyBub3QgeWV0IGltcGxlbWVudGVkLCBtaWxlc3RvbmUgMS4xLjBcbiAqL1xuRlMuVGVtcFN0b3JlLmxpc3RQYXJ0cyA9IGZ1bmN0aW9uIGZzVGVtcFN0b3JlTGlzdFBhcnRzKGZpbGVPYmopIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICBjb25zb2xlLndhcm4oJ1RoaXMgZnVuY3Rpb24gaXMgbm90IGNvcnJlY3RseSBpbXBsZW1lbnRlZCB1c2luZyBTQSBpbiBUZW1wU3RvcmUnKTtcbiAgLy9YWFggVGhpcyBmdW5jdGlvbiBtaWdodCBiZSBuZWNlc3NhcnkgZm9yIHJlc3VtZS4gTm90IGN1cnJlbnRseSBzdXBwb3J0ZWQuXG59O1xuXG4vKipcbiAqIEBtZXRob2QgRlMuVGVtcFN0b3JlLnJlbW92ZUZpbGVcbiAqIEBwdWJsaWNcbiAqIEBwYXJhbSB7RlMuRmlsZX0gZmlsZU9ialxuICogVGhpcyBmdW5jdGlvbiByZW1vdmVzIHRoZSBmaWxlIGZyb20gdGVtcHN0b3JhZ2UgLSBpdCBjYXJlcyBub3QgaWYgZmlsZSBpc1xuICogYWxyZWFkeSByZW1vdmVkIG9yIG5vdCBmb3VuZCwgZ29hbCBpcyByZWFjaGVkIGFueXdheS5cbiAqL1xuRlMuVGVtcFN0b3JlLnJlbW92ZUZpbGUgPSBmdW5jdGlvbiBmc1RlbXBTdG9yZVJlbW92ZUZpbGUoZmlsZU9iaikge1xuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgLy8gRW5zdXJlIHRoYXQgd2UgaGF2ZSBhIHN0b3JhZ2UgYWRhcHRlciBtb3VudGVkOyBpZiBub3QsIHRocm93IGFuIGVycm9yLlxuICBtb3VudFN0b3JhZ2UoKTtcblxuICAvLyBJZiBmaWxlT2JqIGlzIG5vdCBtb3VudGVkIG9yIGNhbid0IGJlLCB0aHJvdyBhbiBlcnJvclxuICBtb3VudEZpbGUoZmlsZU9iaiwgJ0ZTLlRlbXBTdG9yZS5yZW1vdmVGaWxlJyk7XG5cbiAgLy8gRW1pdCBldmVudFxuICBzZWxmLmVtaXQoJ3JlbW92ZScsIGZpbGVPYmopO1xuXG4gIHZhciBjaHVua0luZm8gPSB0cmFja2VyLmZpbmRPbmUoe1xuICAgIGZpbGVJZDogZmlsZU9iai5faWQsXG4gICAgY29sbGVjdGlvbk5hbWU6IGZpbGVPYmouY29sbGVjdGlvbk5hbWVcbiAgfSk7XG5cbiAgaWYgKGNodW5rSW5mbykge1xuXG4gICAgLy8gVW5saW5rIGVhY2ggZmlsZVxuICAgIEZTLlV0aWxpdHkuZWFjaChjaHVua0luZm8ua2V5cyB8fCB7fSwgZnVuY3Rpb24gKGtleSwgY2h1bmspIHtcbiAgICAgIHZhciBmaWxlS2V5ID0gX2ZpbGVSZWZlcmVuY2UoZmlsZU9iaiwgY2h1bmssIGNodW5rSW5mbyk7XG4gICAgICBGUy5UZW1wU3RvcmUuU3RvcmFnZS5hZGFwdGVyLnJlbW92ZShmaWxlS2V5LCBGUy5VdGlsaXR5Lm5vb3ApO1xuICAgIH0pO1xuXG4gICAgLy8gUmVtb3ZlIGZpbGVPYmogZnJvbSB0cmFja2VyIGNvbGxlY3Rpb24sIHRvb1xuICAgIHRyYWNrZXIucmVtb3ZlKHtfaWQ6IGNodW5rSW5mby5faWR9KTtcblxuICB9XG59O1xuXG4vKipcbiAqIEBtZXRob2QgRlMuVGVtcFN0b3JlLnJlbW92ZUFsbFxuICogQHB1YmxpY1xuICogQHN1bW1hcnkgVGhpcyBmdW5jdGlvbiByZW1vdmVzIGFsbCBmaWxlcyBmcm9tIHRlbXBzdG9yYWdlIC0gaXQgY2FyZXMgbm90IGlmIGZpbGUgaXNcbiAqIGFscmVhZHkgcmVtb3ZlZCBvciBub3QgZm91bmQsIGdvYWwgaXMgcmVhY2hlZCBhbnl3YXkuXG4gKi9cbkZTLlRlbXBTdG9yZS5yZW1vdmVBbGwgPSBmdW5jdGlvbiBmc1RlbXBTdG9yZVJlbW92ZUFsbCgpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIC8vIEVuc3VyZSB0aGF0IHdlIGhhdmUgYSBzdG9yYWdlIGFkYXB0ZXIgbW91bnRlZDsgaWYgbm90LCB0aHJvdyBhbiBlcnJvci5cbiAgbW91bnRTdG9yYWdlKCk7XG5cbiAgdHJhY2tlci5maW5kKCkuZm9yRWFjaChmdW5jdGlvbiAoY2h1bmtJbmZvKSB7XG4gICAgLy8gVW5saW5rIGVhY2ggZmlsZVxuICAgIEZTLlV0aWxpdHkuZWFjaChjaHVua0luZm8ua2V5cyB8fCB7fSwgZnVuY3Rpb24gKGtleSwgY2h1bmspIHtcbiAgICAgIHZhciBmaWxlS2V5ID0gX2ZpbGVSZWZlcmVuY2Uoe19pZDogY2h1bmtJbmZvLmZpbGVJZCwgY29sbGVjdGlvbk5hbWU6IGNodW5rSW5mby5jb2xsZWN0aW9uTmFtZX0sIGNodW5rLCBjaHVua0luZm8pO1xuICAgICAgRlMuVGVtcFN0b3JlLlN0b3JhZ2UuYWRhcHRlci5yZW1vdmUoZmlsZUtleSwgRlMuVXRpbGl0eS5ub29wKTtcbiAgICB9KTtcblxuICAgIC8vIFJlbW92ZSBmcm9tIHRyYWNrZXIgY29sbGVjdGlvbiwgdG9vXG4gICAgdHJhY2tlci5yZW1vdmUoe19pZDogY2h1bmtJbmZvLl9pZH0pO1xuICB9KTtcbn07XG5cbi8qKlxuICogQG1ldGhvZCBGUy5UZW1wU3RvcmUuY3JlYXRlV3JpdGVTdHJlYW1cbiAqIEBwdWJsaWNcbiAqIEBwYXJhbSB7RlMuRmlsZX0gZmlsZU9iaiBGaWxlIHRvIHN0b3JlIGluIHRlbXBvcmFyeSBzdG9yYWdlXG4gKiBAcGFyYW0ge051bWJlciB8IFN0cmluZ30gW29wdGlvbnNdXG4gKiBAcmV0dXJucyB7U3RyZWFtfSBXcml0ZWFibGUgc3RyZWFtXG4gKlxuICogYG9wdGlvbnNgIG9mIGRpZmZlcmVudCB0eXBlcyBtZWFuIGRpZmZlcm50IHRoaW5nczpcbiAqICogYHVuZGVmaW5lZGAgV2Ugc3RvcmUgdGhlIGZpbGUgaW4gb25lIHBhcnRcbiAqICooTm9ybWFsIHNlcnZlci1zaWRlIGFwaSB1c2FnZSkqXG4gKiAqIGBOdW1iZXJgIHRoZSBudW1iZXIgaXMgdGhlIHBhcnQgbnVtYmVyIHRvdGFsXG4gKiAqKG11bHRpcGFydCB1cGxvYWRzIHdpbGwgdXNlIHRoaXMgYXBpKSpcbiAqICogYFN0cmluZ2AgdGhlIHN0cmluZyBpcyB0aGUgbmFtZSBvZiB0aGUgYHN0b3JlYCB0aGF0IHdhbnRzIHRvIHN0b3JlIGZpbGUgZGF0YVxuICogKihzdG9yZXMgdGhhdCB3YW50IHRvIHN5bmMgdGhlaXIgZGF0YSB0byB0aGUgcmVzdCBvZiB0aGUgZmlsZXMgc3RvcmVzIHdpbGwgdXNlIHRoaXMpKlxuICpcbiAqID4gTm90ZTogZmlsZU9iaiBtdXN0IGJlIG1vdW50ZWQgb24gYSBgRlMuQ29sbGVjdGlvbmAsIGl0IG1ha2VzIG5vIHNlbnNlIHRvIHN0b3JlIG90aGVyd2lzZVxuICovXG5GUy5UZW1wU3RvcmUuY3JlYXRlV3JpdGVTdHJlYW0gPSBmdW5jdGlvbihmaWxlT2JqLCBvcHRpb25zKSB7XG4gIHZhciBzZWxmID0gdGhpcztcblxuICAvLyBFbnN1cmUgdGhhdCB3ZSBoYXZlIGEgc3RvcmFnZSBhZGFwdGVyIG1vdW50ZWQ7IGlmIG5vdCwgdGhyb3cgYW4gZXJyb3IuXG4gIG1vdW50U3RvcmFnZSgpO1xuXG4gIC8vIElmIGZpbGVPYmogaXMgbm90IG1vdW50ZWQgb3IgY2FuJ3QgYmUsIHRocm93IGFuIGVycm9yXG4gIG1vdW50RmlsZShmaWxlT2JqLCAnRlMuVGVtcFN0b3JlLmNyZWF0ZVdyaXRlU3RyZWFtJyk7XG5cbiAgLy8gQ2FjaGUgdGhlIHNlbGVjdG9yIGZvciB1c2UgbXVsdGlwbGUgdGltZXMgYmVsb3dcbiAgdmFyIHNlbGVjdG9yID0ge2ZpbGVJZDogZmlsZU9iai5faWQsIGNvbGxlY3Rpb25OYW1lOiBmaWxlT2JqLmNvbGxlY3Rpb25OYW1lfTtcblxuICAvLyBUT0RPLCBzaG91bGQgcGFzcyBpbiBjaHVua1N1bSBzbyB3ZSBkb24ndCBuZWVkIHRvIHVzZSBGUy5GaWxlIGZvciBpdFxuICB2YXIgY2h1bmtTdW0gPSBmaWxlT2JqLmNodW5rU3VtIHx8IDE7XG5cbiAgLy8gQWRkIGZpbGVPYmogdG8gdHJhY2tlciBjb2xsZWN0aW9uXG4gIHRyYWNrZXIudXBzZXJ0KHNlbGVjdG9yLCB7JHNldE9uSW5zZXJ0OiB7a2V5czoge319fSk7XG5cbiAgLy8gRGV0ZXJtaW5lIGhvdyB3ZSdyZSB1c2luZyB0aGUgd3JpdGVTdHJlYW1cbiAgdmFyIGlzT25lUGFydCA9IGZhbHNlLCBpc011bHRpUGFydCA9IGZhbHNlLCBpc1N0b3JlU3luYyA9IGZhbHNlLCBjaHVua051bSA9IDA7XG4gIGlmIChvcHRpb25zID09PSArb3B0aW9ucykge1xuICAgIGlzTXVsdGlQYXJ0ID0gdHJ1ZTtcbiAgICBjaHVua051bSA9IG9wdGlvbnM7XG4gIH0gZWxzZSBpZiAob3B0aW9ucyA9PT0gJycrb3B0aW9ucykge1xuICAgIGlzU3RvcmVTeW5jID0gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICBpc09uZVBhcnQgPSB0cnVlO1xuICB9XG5cbiAgLy8gWFhYOiBpdCBzaG91bGQgYmUgcG9zc2libGUgZm9yIGEgc3RvcmUgdG8gc3luYyBieSBzdG9yaW5nIGRhdGEgaW50byB0aGVcbiAgLy8gdGVtcHN0b3JlIC0gdGhpcyBjb3VsZCBiZSBkb25lIG5pY2VseSBieSBzZXR0aW5nIHRoZSBzdG9yZSBuYW1lIGFzIHN0cmluZ1xuICAvLyBpbiB0aGUgY2h1bmsgdmFyaWFibGU/XG4gIC8vIFRoaXMgc3RvcmUgbmFtZSBjb3VsZCBiZSBwYXNzZWQgb24gdGhlIHRoZSBmaWxld29ya2VyIHZpYSB0aGUgdXBsb2FkZWRcbiAgLy8gZXZlbnRcbiAgLy8gU28gdGhlIHVwbG9hZGVkIGV2ZW50IGNhbiByZXR1cm46XG4gIC8vIHVuZGVmaW5lZCAtIGlmIGRhdGEgaXMgc3RvcmVkIGludG8gYW5kIHNob3VsZCBzeW5jIG91dCB0byBhbGwgc3RvcmFnZSBhZGFwdGVyc1xuICAvLyBudW1iZXIgLSBpZiBhIGNodW5rIGhhcyBiZWVuIHVwbG9hZGVkXG4gIC8vIHN0cmluZyAtIGlmIGEgc3RvcmFnZSBhZGFwdGVyIHdhbnRzIHRvIHN5bmMgaXRzIGRhdGEgdG8gdGhlIG90aGVyIFNBJ3NcblxuICAvLyBGaW5kIGEgbmljZSBsb2NhdGlvbiBmb3IgdGhlIGNodW5rIGRhdGFcbiAgdmFyIGZpbGVLZXkgPSBfZmlsZVJlZmVyZW5jZShmaWxlT2JqLCBjaHVua051bSk7XG5cbiAgLy8gQ3JlYXRlIHRoZSBzdHJlYW0gYXMgTWV0ZW9yIHNhZmUgc3RyZWFtXG4gIHZhciB3cml0ZVN0cmVhbSA9IEZTLlRlbXBTdG9yZS5TdG9yYWdlLmFkYXB0ZXIuY3JlYXRlV3JpdGVTdHJlYW0oZmlsZUtleSk7XG5cbiAgLy8gV2hlbiB0aGUgc3RyZWFtIGNsb3NlcyB3ZSB1cGRhdGUgdGhlIGNodW5rQ291bnRcbiAgd3JpdGVTdHJlYW0uc2FmZU9uKCdzdG9yZWQnLCBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAvLyBTYXZlIGtleSBpbiB0cmFja2VyIGRvY3VtZW50XG4gICAgdmFyIHNldE9iaiA9IHt9O1xuICAgIHNldE9ialsna2V5cy4nICsgY2h1bmtOdW1dID0gcmVzdWx0LmZpbGVLZXk7XG4gICAgdHJhY2tlci51cGRhdGUoc2VsZWN0b3IsIHskc2V0OiBzZXRPYmp9KTtcblxuICAgIHZhciB0ZW1wID0gdHJhY2tlci5maW5kT25lKHNlbGVjdG9yKTtcblxuICAgIGlmICghdGVtcCkge1xuICAgICAgRlMuZGVidWcgJiYgY29uc29sZS5sb2coJ05PVCBGT1VORCBGUk9NIFRFTVBTVE9SRSA9PiBFWElUIChSRU1PVkVEKScpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIEdldCB1cGRhdGVkIGNodW5rQ291bnRcbiAgICB2YXIgY2h1bmtDb3VudCA9IEZTLlV0aWxpdHkuc2l6ZSh0ZW1wLmtleXMpO1xuXG4gICAgLy8gUHJvZ3Jlc3NcbiAgICBzZWxmLmVtaXQoJ3Byb2dyZXNzJywgZmlsZU9iaiwgY2h1bmtOdW0sIGNodW5rQ291bnQsIGNodW5rU3VtLCByZXN1bHQpO1xuXG4gICAgdmFyIG1vZGlmaWVyID0geyAkc2V0OiB7fSB9O1xuICAgIGlmICghZmlsZU9iai5pbnN0YW5jZV9pZCkge1xuICAgICAgbW9kaWZpZXIuJHNldC5pbnN0YW5jZV9pZCA9IHByb2Nlc3MuZW52LkNPTExFQ1RJT05GU19FTlZfTkFNRV9VTklRVUVfSUQgPyBwcm9jZXNzLmVudltwcm9jZXNzLmVudi5DT0xMRUNUSU9ORlNfRU5WX05BTUVfVU5JUVVFX0lEXSA6IHByb2Nlc3MuZW52Lk1FVEVPUl9QQVJFTlRfUElEO1xuICAgIH1cblxuICAgIC8vIElmIHVwbG9hZCBpcyBjb21wbGV0ZWRcbiAgICBpZiAoY2h1bmtDb3VudCA9PT0gY2h1bmtTdW0pIHtcbiAgICAgIC8vIFdlIG5vIGxvbmdlciBuZWVkIHRoZSBjaHVuayBpbmZvXG4gICAgICBtb2RpZmllci4kdW5zZXQgPSB7Y2h1bmtDb3VudDogMSwgY2h1bmtTdW06IDEsIGNodW5rU2l6ZTogMX07XG5cbiAgICAgIC8vIENoZWNrIGlmIHRoZSBmaWxlIGhhcyBiZWVuIHVwbG9hZGVkIGJlZm9yZVxuICAgICAgaWYgKHR5cGVvZiBmaWxlT2JqLnVwbG9hZGVkQXQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIC8vIFdlIHNldCB0aGUgdXBsb2FkZWRBdCBkYXRlXG4gICAgICAgIG1vZGlmaWVyLiRzZXQudXBsb2FkZWRBdCA9IG5ldyBEYXRlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBXZSBoYXZlIGJlZW4gdXBsb2FkZWQgc28gYW4gZXZlbnQgd2VyZSBmaWxlIGRhdGEgaXMgdXBkYXRlZCBpc1xuICAgICAgICAvLyBjYWxsZWQgc3luY2hyb25pemluZyAtIHNvIHRoaXMgbXVzdCBiZSBhIHN5bmNocm9uaXplZEF0P1xuICAgICAgICBtb2RpZmllci4kc2V0LnN5bmNocm9uaXplZEF0ID0gbmV3IERhdGUoKTtcbiAgICAgIH1cblxuICAgICAgLy8gVXBkYXRlIHRoZSBmaWxlT2JqZWN0XG4gICAgICBmaWxlT2JqLnVwZGF0ZShtb2RpZmllcik7XG5cbiAgICAgIC8vIEZpcmUgZW5kaW5nIGV2ZW50c1xuICAgICAgdmFyIGV2ZW50TmFtZSA9IGlzU3RvcmVTeW5jID8gJ3N5bmNocm9uaXplZCcgOiAnc3RvcmVkJztcbiAgICAgIHNlbGYuZW1pdChldmVudE5hbWUsIGZpbGVPYmosIHJlc3VsdCk7XG5cbiAgICAgIC8vIFhYWCBpcyBlbWl0dGluZyBcInJlYWR5XCIgbmVjZXNzYXJ5P1xuICAgICAgc2VsZi5lbWl0KCdyZWFkeScsIGZpbGVPYmosIGNodW5rQ291bnQsIHJlc3VsdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFVwZGF0ZSB0aGUgY2h1bmtDb3VudCBvbiB0aGUgZmlsZU9iamVjdFxuICAgICAgbW9kaWZpZXIuJHNldC5jaHVua0NvdW50ID0gY2h1bmtDb3VudDtcbiAgICAgIGZpbGVPYmoudXBkYXRlKG1vZGlmaWVyKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIEVtaXQgZXJyb3JzXG4gIHdyaXRlU3RyZWFtLm9uKCdlcnJvcicsIGZ1bmN0aW9uIChlcnJvcikge1xuICAgIEZTLmRlYnVnICYmIGNvbnNvbGUubG9nKCdUZW1wU3RvcmUgd3JpdGVTdHJlYW0gZXJyb3I6JywgZXJyb3IpO1xuICAgIHNlbGYuZW1pdCgnZXJyb3InLCBlcnJvciwgZmlsZU9iaik7XG4gIH0pO1xuXG4gIHJldHVybiB3cml0ZVN0cmVhbTtcbn07XG5cbi8qKlxuICAqIEBtZXRob2QgRlMuVGVtcFN0b3JlLmNyZWF0ZVJlYWRTdHJlYW1cbiAgKiBAcHVibGljXG4gICogQHBhcmFtIHtGUy5GaWxlfSBmaWxlT2JqIFRoZSBmaWxlIHRvIHJlYWRcbiAgKiBAcmV0dXJuIHtTdHJlYW19IFJldHVybnMgcmVhZGFibGUgc3RyZWFtXG4gICpcbiAgKi9cbkZTLlRlbXBTdG9yZS5jcmVhdGVSZWFkU3RyZWFtID0gZnVuY3Rpb24oZmlsZU9iaikge1xuICAvLyBFbnN1cmUgdGhhdCB3ZSBoYXZlIGEgc3RvcmFnZSBhZGFwdGVyIG1vdW50ZWQ7IGlmIG5vdCwgdGhyb3cgYW4gZXJyb3IuXG4gIG1vdW50U3RvcmFnZSgpO1xuXG4gIC8vIElmIGZpbGVPYmogaXMgbm90IG1vdW50ZWQgb3IgY2FuJ3QgYmUsIHRocm93IGFuIGVycm9yXG4gIG1vdW50RmlsZShmaWxlT2JqLCAnRlMuVGVtcFN0b3JlLmNyZWF0ZVJlYWRTdHJlYW0nKTtcblxuICBGUy5kZWJ1ZyAmJiBjb25zb2xlLmxvZygnRlMuVGVtcFN0b3JlIGNyZWF0aW5nIHJlYWQgc3RyZWFtIGZvciAnICsgZmlsZU9iai5faWQpO1xuXG4gIC8vIERldGVybWluZSBob3cgbWFueSB0b3RhbCBjaHVua3MgdGhlcmUgYXJlIGZyb20gdGhlIHRyYWNrZXIgY29sbGVjdGlvblxuICB2YXIgY2h1bmtJbmZvID0gdHJhY2tlci5maW5kT25lKHtmaWxlSWQ6IGZpbGVPYmouX2lkLCBjb2xsZWN0aW9uTmFtZTogZmlsZU9iai5jb2xsZWN0aW9uTmFtZX0pIHx8IHt9O1xuICB2YXIgdG90YWxDaHVua3MgPSBGUy5VdGlsaXR5LnNpemUoY2h1bmtJbmZvLmtleXMpO1xuXG4gIGZ1bmN0aW9uIGdldE5leHRTdHJlYW1GdW5jKGNodW5rKSB7XG4gICAgcmV0dXJuIE1ldGVvci5iaW5kRW52aXJvbm1lbnQoZnVuY3Rpb24obmV4dCkge1xuICAgICAgdmFyIGZpbGVLZXkgPSBfZmlsZVJlZmVyZW5jZShmaWxlT2JqLCBjaHVuayk7XG4gICAgICB2YXIgY2h1bmtSZWFkU3RyZWFtID0gRlMuVGVtcFN0b3JlLlN0b3JhZ2UuYWRhcHRlci5jcmVhdGVSZWFkU3RyZWFtKGZpbGVLZXkpO1xuICAgICAgbmV4dChjaHVua1JlYWRTdHJlYW0pO1xuICAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfSk7XG4gIH1cblxuICAvLyBNYWtlIGEgY29tYmluZWQgc3RyZWFtXG4gIHZhciBjb21iaW5lZFN0cmVhbSA9IENvbWJpbmVkU3RyZWFtLmNyZWF0ZSgpO1xuXG4gIC8vIEFkZCBlYWNoIGNodW5rIHN0cmVhbSB0byB0aGUgY29tYmluZWQgc3RyZWFtIHdoZW4gdGhlIHByZXZpb3VzIGNodW5rIHN0cmVhbSBlbmRzXG4gIHZhciBjdXJyZW50Q2h1bmsgPSAwO1xuICBmb3IgKHZhciBjaHVuayA9IDA7IGNodW5rIDwgdG90YWxDaHVua3M7IGNodW5rKyspIHtcbiAgICBjb21iaW5lZFN0cmVhbS5hcHBlbmQoZ2V0TmV4dFN0cmVhbUZ1bmMoY2h1bmspKTtcbiAgfVxuXG4gIC8vIFJldHVybiB0aGUgY29tYmluZWQgc3RyZWFtXG4gIHJldHVybiBjb21iaW5lZFN0cmVhbTtcbn07XG4iXX0=
