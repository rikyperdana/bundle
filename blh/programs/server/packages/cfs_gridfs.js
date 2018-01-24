(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var FS = Package['cfs:base-package'].FS;
var ECMAScript = Package.ecmascript.ECMAScript;
var meteorInstall = Package.modules.meteorInstall;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;

var require = meteorInstall({"node_modules":{"meteor":{"cfs:gridfs":{"gridfs.server.js":function(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/cfs_gridfs/gridfs.server.js                                                                                //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var path = Npm.require('path');

var mongodb = Npm.require('mongodb');

var ObjectID = Npm.require('mongodb').ObjectID;

var Grid = Npm.require('gridfs-stream'); //var Grid = Npm.require('gridfs-locking-stream');


var chunkSize = 1024 * 1024 * 2; // 256k is default GridFS chunk size, but performs terribly for largish files
/**
 * @public
 * @constructor
 * @param {String} name - The store name
 * @param {Object} options
 * @param {Function} [options.beforeSave] - Function to run before saving a file from the server. The context of the function will be the `FS.File` instance we're saving. The function may alter its properties.
 * @param {Number} [options.maxTries=5] - Max times to attempt saving a file
 * @returns {FS.StorageAdapter} An instance of FS.StorageAdapter.
 *
 * Creates a GridFS store instance on the server. Inherits from FS.StorageAdapter
 * type.
 */

FS.Store.GridFS = function (name, options) {
  var self = this;
  options = options || {};
  var gridfsName = name;
  var mongoOptions = options.mongoOptions || {};
  if (!(self instanceof FS.Store.GridFS)) throw new Error('FS.Store.GridFS missing keyword "new"');

  if (!options.mongoUrl) {
    options.mongoUrl = process.env.MONGO_URL; // When using a Meteor MongoDB instance, preface name with "cfs_gridfs."

    gridfsName = "cfs_gridfs." + name;
  }

  if (!options.mongoOptions) {
    options.mongoOptions = {
      db: {
        native_parser: true
      },
      server: {
        auto_reconnect: true
      }
    };
  }

  if (options.chunkSize) {
    chunkSize = options.chunkSize;
  }

  return new FS.StorageAdapter(name, options, {
    typeName: 'storage.gridfs',
    fileKey: function (fileObj) {
      // We should not have to mount the file here - We assume its taken
      // care of - Otherwise we create new files instead of overwriting
      var key = {
        _id: null,
        filename: null
      }; // If we're passed a fileObj, we retrieve the _id and filename from it.

      if (fileObj) {
        var info = fileObj._getInfo(name, {
          updateFileRecordFirst: false
        });

        key._id = info.key || null;
        key.filename = info.name || fileObj.name({
          updateFileRecordFirst: false
        }) || fileObj.collectionName + '-' + fileObj._id;
      } // If key._id is null at this point, createWriteStream will let GridFS generate a new ID


      return key;
    },
    createReadStream: function (fileKey, options) {
      options = options || {}; // Init GridFS

      var gfs = new Grid(self.db, mongodb); // Set the default streamning settings

      var settings = {
        _id: new ObjectID(fileKey._id),
        root: gridfsName
      }; // Check if this should be a partial read

      if (typeof options.start !== 'undefined' && typeof options.end !== 'undefined') {
        // Add partial info
        settings.range = {
          startPos: options.start,
          endPos: options.end
        };
      }

      FS.debug && console.log('GRIDFS', settings);
      return gfs.createReadStream(settings);
    },
    createWriteStream: function (fileKey, options) {
      options = options || {}; // Init GridFS

      var gfs = new Grid(self.db, mongodb);
      var opts = {
        filename: fileKey.filename,
        mode: 'w',
        root: gridfsName,
        chunk_size: options.chunk_size || chunkSize,
        // We allow aliases, metadata and contentType to be passed in via
        // options
        aliases: options.aliases || [],
        metadata: options.metadata || null,
        content_type: options.contentType || 'application/octet-stream'
      };

      if (fileKey._id) {
        opts._id = new ObjectID(fileKey._id);
      }

      var writeStream = gfs.createWriteStream(opts);
      writeStream.on('close', function (file) {
        if (!file) {
          // gridfs-stream will emit "close" without passing a file
          // if there is an error. We can simply exit here because
          // the "error" listener will also be called in this case.
          return;
        }

        if (FS.debug) console.log('SA GridFS - DONE!'); // Emit end and return the fileKey, size, and updated date

        writeStream.emit('stored', {
          // Set the generated _id so that we know it for future reads and writes.
          // We store the _id as a string and only convert to ObjectID right before
          // reading, writing, or deleting. If we store the ObjectID itself,
          // Meteor (EJSON?) seems to convert it to a LocalCollection.ObjectID,
          // which GFS doesn't understand.
          fileKey: file._id.toString(),
          size: file.length,
          storedAt: file.uploadDate || new Date()
        });
      });
      writeStream.on('error', function (error) {
        console.log('SA GridFS - ERROR!', error);
      });
      return writeStream;
    },
    remove: function (fileKey, callback) {
      // Init GridFS
      var gfs = new Grid(self.db, mongodb);

      try {
        gfs.remove({
          _id: new ObjectID(fileKey._id),
          root: gridfsName
        }, callback);
      } catch (err) {
        callback(err);
      }
    },
    // Not implemented
    watch: function () {
      throw new Error("GridFS storage adapter does not support the sync option");
    },
    init: function (callback) {
      mongodb.MongoClient.connect(options.mongoUrl, mongoOptions, function (err, db) {
        if (err) {
          return callback(err);
        }

        self.db = db;
        callback(null);
      });
    }
  });
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});
require("./node_modules/meteor/cfs:gridfs/gridfs.server.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['cfs:gridfs'] = {};

})();

//# sourceURL=meteor://💻app/packages/cfs_gridfs.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvcGFja2FnZXMvY2ZzOmdyaWRmcy9ncmlkZnMuc2VydmVyLmpzIl0sIm5hbWVzIjpbInBhdGgiLCJOcG0iLCJyZXF1aXJlIiwibW9uZ29kYiIsIk9iamVjdElEIiwiR3JpZCIsImNodW5rU2l6ZSIsIkZTIiwiU3RvcmUiLCJHcmlkRlMiLCJuYW1lIiwib3B0aW9ucyIsInNlbGYiLCJncmlkZnNOYW1lIiwibW9uZ29PcHRpb25zIiwiRXJyb3IiLCJtb25nb1VybCIsInByb2Nlc3MiLCJlbnYiLCJNT05HT19VUkwiLCJkYiIsIm5hdGl2ZV9wYXJzZXIiLCJzZXJ2ZXIiLCJhdXRvX3JlY29ubmVjdCIsIlN0b3JhZ2VBZGFwdGVyIiwidHlwZU5hbWUiLCJmaWxlS2V5IiwiZmlsZU9iaiIsImtleSIsIl9pZCIsImZpbGVuYW1lIiwiaW5mbyIsIl9nZXRJbmZvIiwidXBkYXRlRmlsZVJlY29yZEZpcnN0IiwiY29sbGVjdGlvbk5hbWUiLCJjcmVhdGVSZWFkU3RyZWFtIiwiZ2ZzIiwic2V0dGluZ3MiLCJyb290Iiwic3RhcnQiLCJlbmQiLCJyYW5nZSIsInN0YXJ0UG9zIiwiZW5kUG9zIiwiZGVidWciLCJjb25zb2xlIiwibG9nIiwiY3JlYXRlV3JpdGVTdHJlYW0iLCJvcHRzIiwibW9kZSIsImNodW5rX3NpemUiLCJhbGlhc2VzIiwibWV0YWRhdGEiLCJjb250ZW50X3R5cGUiLCJjb250ZW50VHlwZSIsIndyaXRlU3RyZWFtIiwib24iLCJmaWxlIiwiZW1pdCIsInRvU3RyaW5nIiwic2l6ZSIsImxlbmd0aCIsInN0b3JlZEF0IiwidXBsb2FkRGF0ZSIsIkRhdGUiLCJlcnJvciIsInJlbW92ZSIsImNhbGxiYWNrIiwiZXJyIiwid2F0Y2giLCJpbml0IiwiTW9uZ29DbGllbnQiLCJjb25uZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLE9BQU9DLElBQUlDLE9BQUosQ0FBWSxNQUFaLENBQVg7O0FB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ZGZzLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHBhdGggPSBOcG0ucmVxdWlyZSgncGF0aCcpO1xudmFyIG1vbmdvZGIgPSBOcG0ucmVxdWlyZSgnbW9uZ29kYicpO1xudmFyIE9iamVjdElEID0gTnBtLnJlcXVpcmUoJ21vbmdvZGInKS5PYmplY3RJRDtcbnZhciBHcmlkID0gTnBtLnJlcXVpcmUoJ2dyaWRmcy1zdHJlYW0nKTtcbi8vdmFyIEdyaWQgPSBOcG0ucmVxdWlyZSgnZ3JpZGZzLWxvY2tpbmctc3RyZWFtJyk7XG5cbnZhciBjaHVua1NpemUgPSAxMDI0KjEwMjQqMjsgLy8gMjU2ayBpcyBkZWZhdWx0IEdyaWRGUyBjaHVuayBzaXplLCBidXQgcGVyZm9ybXMgdGVycmlibHkgZm9yIGxhcmdpc2ggZmlsZXNcblxuLyoqXG4gKiBAcHVibGljXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIC0gVGhlIHN0b3JlIG5hbWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy5iZWZvcmVTYXZlXSAtIEZ1bmN0aW9uIHRvIHJ1biBiZWZvcmUgc2F2aW5nIGEgZmlsZSBmcm9tIHRoZSBzZXJ2ZXIuIFRoZSBjb250ZXh0IG9mIHRoZSBmdW5jdGlvbiB3aWxsIGJlIHRoZSBgRlMuRmlsZWAgaW5zdGFuY2Ugd2UncmUgc2F2aW5nLiBUaGUgZnVuY3Rpb24gbWF5IGFsdGVyIGl0cyBwcm9wZXJ0aWVzLlxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLm1heFRyaWVzPTVdIC0gTWF4IHRpbWVzIHRvIGF0dGVtcHQgc2F2aW5nIGEgZmlsZVxuICogQHJldHVybnMge0ZTLlN0b3JhZ2VBZGFwdGVyfSBBbiBpbnN0YW5jZSBvZiBGUy5TdG9yYWdlQWRhcHRlci5cbiAqXG4gKiBDcmVhdGVzIGEgR3JpZEZTIHN0b3JlIGluc3RhbmNlIG9uIHRoZSBzZXJ2ZXIuIEluaGVyaXRzIGZyb20gRlMuU3RvcmFnZUFkYXB0ZXJcbiAqIHR5cGUuXG4gKi9cblxuRlMuU3RvcmUuR3JpZEZTID0gZnVuY3Rpb24obmFtZSwgb3B0aW9ucykge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIHZhciBncmlkZnNOYW1lID0gbmFtZTtcbiAgdmFyIG1vbmdvT3B0aW9ucyA9IG9wdGlvbnMubW9uZ29PcHRpb25zIHx8IHt9O1xuXG4gIGlmICghKHNlbGYgaW5zdGFuY2VvZiBGUy5TdG9yZS5HcmlkRlMpKVxuICAgIHRocm93IG5ldyBFcnJvcignRlMuU3RvcmUuR3JpZEZTIG1pc3Npbmcga2V5d29yZCBcIm5ld1wiJyk7XG5cbiAgaWYgKCFvcHRpb25zLm1vbmdvVXJsKSB7XG4gICAgb3B0aW9ucy5tb25nb1VybCA9IHByb2Nlc3MuZW52Lk1PTkdPX1VSTDtcbiAgICAvLyBXaGVuIHVzaW5nIGEgTWV0ZW9yIE1vbmdvREIgaW5zdGFuY2UsIHByZWZhY2UgbmFtZSB3aXRoIFwiY2ZzX2dyaWRmcy5cIlxuICAgIGdyaWRmc05hbWUgPSBcImNmc19ncmlkZnMuXCIgKyBuYW1lO1xuICB9XG5cbiAgaWYgKCFvcHRpb25zLm1vbmdvT3B0aW9ucykge1xuICAgIG9wdGlvbnMubW9uZ29PcHRpb25zID0geyBkYjogeyBuYXRpdmVfcGFyc2VyOiB0cnVlIH0sIHNlcnZlcjogeyBhdXRvX3JlY29ubmVjdDogdHJ1ZSB9fTtcbiAgfVxuXG4gIGlmIChvcHRpb25zLmNodW5rU2l6ZSkge1xuICAgIGNodW5rU2l6ZSA9IG9wdGlvbnMuY2h1bmtTaXplO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBGUy5TdG9yYWdlQWRhcHRlcihuYW1lLCBvcHRpb25zLCB7XG5cbiAgICB0eXBlTmFtZTogJ3N0b3JhZ2UuZ3JpZGZzJyxcbiAgICBmaWxlS2V5OiBmdW5jdGlvbihmaWxlT2JqKSB7XG4gICAgICAvLyBXZSBzaG91bGQgbm90IGhhdmUgdG8gbW91bnQgdGhlIGZpbGUgaGVyZSAtIFdlIGFzc3VtZSBpdHMgdGFrZW5cbiAgICAgIC8vIGNhcmUgb2YgLSBPdGhlcndpc2Ugd2UgY3JlYXRlIG5ldyBmaWxlcyBpbnN0ZWFkIG9mIG92ZXJ3cml0aW5nXG4gICAgICB2YXIga2V5ID0ge1xuICAgICAgICBfaWQ6IG51bGwsXG4gICAgICAgIGZpbGVuYW1lOiBudWxsXG4gICAgICB9O1xuXG4gICAgICAvLyBJZiB3ZSdyZSBwYXNzZWQgYSBmaWxlT2JqLCB3ZSByZXRyaWV2ZSB0aGUgX2lkIGFuZCBmaWxlbmFtZSBmcm9tIGl0LlxuICAgICAgaWYgKGZpbGVPYmopIHtcbiAgICAgICAgdmFyIGluZm8gPSBmaWxlT2JqLl9nZXRJbmZvKG5hbWUsIHt1cGRhdGVGaWxlUmVjb3JkRmlyc3Q6IGZhbHNlfSk7XG4gICAgICAgIGtleS5faWQgPSBpbmZvLmtleSB8fCBudWxsO1xuICAgICAgICBrZXkuZmlsZW5hbWUgPSBpbmZvLm5hbWUgfHwgZmlsZU9iai5uYW1lKHt1cGRhdGVGaWxlUmVjb3JkRmlyc3Q6IGZhbHNlfSkgfHwgKGZpbGVPYmouY29sbGVjdGlvbk5hbWUgKyAnLScgKyBmaWxlT2JqLl9pZCk7XG4gICAgICB9XG5cbiAgICAgIC8vIElmIGtleS5faWQgaXMgbnVsbCBhdCB0aGlzIHBvaW50LCBjcmVhdGVXcml0ZVN0cmVhbSB3aWxsIGxldCBHcmlkRlMgZ2VuZXJhdGUgYSBuZXcgSURcbiAgICAgIHJldHVybiBrZXk7XG4gICAgfSxcbiAgICBjcmVhdGVSZWFkU3RyZWFtOiBmdW5jdGlvbihmaWxlS2V5LCBvcHRpb25zKSB7XG4gICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgICAgLy8gSW5pdCBHcmlkRlNcbiAgICAgIHZhciBnZnMgPSBuZXcgR3JpZChzZWxmLmRiLCBtb25nb2RiKTtcblxuICAgICAgLy8gU2V0IHRoZSBkZWZhdWx0IHN0cmVhbW5pbmcgc2V0dGluZ3NcbiAgICAgIHZhciBzZXR0aW5ncyA9IHtcbiAgICAgICAgX2lkOiBuZXcgT2JqZWN0SUQoZmlsZUtleS5faWQpLFxuICAgICAgICByb290OiBncmlkZnNOYW1lXG4gICAgICB9O1xuXG4gICAgICAvLyBDaGVjayBpZiB0aGlzIHNob3VsZCBiZSBhIHBhcnRpYWwgcmVhZFxuICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLnN0YXJ0ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2Ygb3B0aW9ucy5lbmQgIT09ICd1bmRlZmluZWQnICkge1xuICAgICAgICAvLyBBZGQgcGFydGlhbCBpbmZvXG4gICAgICAgIHNldHRpbmdzLnJhbmdlID0ge1xuICAgICAgICAgIHN0YXJ0UG9zOiBvcHRpb25zLnN0YXJ0LFxuICAgICAgICAgIGVuZFBvczogb3B0aW9ucy5lbmRcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgRlMuZGVidWcgJiYgY29uc29sZS5sb2coJ0dSSURGUycsIHNldHRpbmdzKTtcblxuICAgICAgcmV0dXJuIGdmcy5jcmVhdGVSZWFkU3RyZWFtKHNldHRpbmdzKTtcblxuICAgIH0sXG4gICAgY3JlYXRlV3JpdGVTdHJlYW06IGZ1bmN0aW9uKGZpbGVLZXksIG9wdGlvbnMpIHtcbiAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gICAgICAvLyBJbml0IEdyaWRGU1xuICAgICAgdmFyIGdmcyA9IG5ldyBHcmlkKHNlbGYuZGIsIG1vbmdvZGIpO1xuXG4gICAgICB2YXIgb3B0cyA9IHtcbiAgICAgICAgZmlsZW5hbWU6IGZpbGVLZXkuZmlsZW5hbWUsXG4gICAgICAgIG1vZGU6ICd3JyxcbiAgICAgICAgcm9vdDogZ3JpZGZzTmFtZSxcbiAgICAgICAgY2h1bmtfc2l6ZTogb3B0aW9ucy5jaHVua19zaXplIHx8IGNodW5rU2l6ZSxcbiAgICAgICAgLy8gV2UgYWxsb3cgYWxpYXNlcywgbWV0YWRhdGEgYW5kIGNvbnRlbnRUeXBlIHRvIGJlIHBhc3NlZCBpbiB2aWFcbiAgICAgICAgLy8gb3B0aW9uc1xuICAgICAgICBhbGlhc2VzOiBvcHRpb25zLmFsaWFzZXMgfHwgW10sXG4gICAgICAgIG1ldGFkYXRhOiBvcHRpb25zLm1ldGFkYXRhIHx8IG51bGwsXG4gICAgICAgIGNvbnRlbnRfdHlwZTogb3B0aW9ucy5jb250ZW50VHlwZSB8fCAnYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtJ1xuICAgICAgfTtcblxuICAgICAgaWYgKGZpbGVLZXkuX2lkKSB7XG4gICAgICAgIG9wdHMuX2lkID0gbmV3IE9iamVjdElEKGZpbGVLZXkuX2lkKTtcbiAgICAgIH1cblxuICAgICAgdmFyIHdyaXRlU3RyZWFtID0gZ2ZzLmNyZWF0ZVdyaXRlU3RyZWFtKG9wdHMpO1xuXG4gICAgICB3cml0ZVN0cmVhbS5vbignY2xvc2UnLCBmdW5jdGlvbihmaWxlKSB7XG4gICAgICAgIGlmICghZmlsZSkge1xuICAgICAgICAgIC8vIGdyaWRmcy1zdHJlYW0gd2lsbCBlbWl0IFwiY2xvc2VcIiB3aXRob3V0IHBhc3NpbmcgYSBmaWxlXG4gICAgICAgICAgLy8gaWYgdGhlcmUgaXMgYW4gZXJyb3IuIFdlIGNhbiBzaW1wbHkgZXhpdCBoZXJlIGJlY2F1c2VcbiAgICAgICAgICAvLyB0aGUgXCJlcnJvclwiIGxpc3RlbmVyIHdpbGwgYWxzbyBiZSBjYWxsZWQgaW4gdGhpcyBjYXNlLlxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChGUy5kZWJ1ZykgY29uc29sZS5sb2coJ1NBIEdyaWRGUyAtIERPTkUhJyk7XG5cbiAgICAgICAgLy8gRW1pdCBlbmQgYW5kIHJldHVybiB0aGUgZmlsZUtleSwgc2l6ZSwgYW5kIHVwZGF0ZWQgZGF0ZVxuICAgICAgICB3cml0ZVN0cmVhbS5lbWl0KCdzdG9yZWQnLCB7XG4gICAgICAgICAgLy8gU2V0IHRoZSBnZW5lcmF0ZWQgX2lkIHNvIHRoYXQgd2Uga25vdyBpdCBmb3IgZnV0dXJlIHJlYWRzIGFuZCB3cml0ZXMuXG4gICAgICAgICAgLy8gV2Ugc3RvcmUgdGhlIF9pZCBhcyBhIHN0cmluZyBhbmQgb25seSBjb252ZXJ0IHRvIE9iamVjdElEIHJpZ2h0IGJlZm9yZVxuICAgICAgICAgIC8vIHJlYWRpbmcsIHdyaXRpbmcsIG9yIGRlbGV0aW5nLiBJZiB3ZSBzdG9yZSB0aGUgT2JqZWN0SUQgaXRzZWxmLFxuICAgICAgICAgIC8vIE1ldGVvciAoRUpTT04/KSBzZWVtcyB0byBjb252ZXJ0IGl0IHRvIGEgTG9jYWxDb2xsZWN0aW9uLk9iamVjdElELFxuICAgICAgICAgIC8vIHdoaWNoIEdGUyBkb2Vzbid0IHVuZGVyc3RhbmQuXG4gICAgICAgICAgZmlsZUtleTogZmlsZS5faWQudG9TdHJpbmcoKSxcbiAgICAgICAgICBzaXplOiBmaWxlLmxlbmd0aCxcbiAgICAgICAgICBzdG9yZWRBdDogZmlsZS51cGxvYWREYXRlIHx8IG5ldyBEYXRlKClcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgd3JpdGVTdHJlYW0ub24oJ2Vycm9yJywgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1NBIEdyaWRGUyAtIEVSUk9SIScsIGVycm9yKTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gd3JpdGVTdHJlYW07XG5cbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24oZmlsZUtleSwgY2FsbGJhY2spIHtcbiAgICAgIC8vIEluaXQgR3JpZEZTXG4gICAgICB2YXIgZ2ZzID0gbmV3IEdyaWQoc2VsZi5kYiwgbW9uZ29kYik7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGdmcy5yZW1vdmUoeyBfaWQ6IG5ldyBPYmplY3RJRChmaWxlS2V5Ll9pZCksIHJvb3Q6IGdyaWRmc05hbWUgfSwgY2FsbGJhY2spO1xuICAgICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgY2FsbGJhY2soZXJyKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gTm90IGltcGxlbWVudGVkXG4gICAgd2F0Y2g6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiR3JpZEZTIHN0b3JhZ2UgYWRhcHRlciBkb2VzIG5vdCBzdXBwb3J0IHRoZSBzeW5jIG9wdGlvblwiKTtcbiAgICB9LFxuXG4gICAgaW5pdDogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgIG1vbmdvZGIuTW9uZ29DbGllbnQuY29ubmVjdChvcHRpb25zLm1vbmdvVXJsLCBtb25nb09wdGlvbnMsIGZ1bmN0aW9uIChlcnIsIGRiKSB7XG4gICAgICAgIGlmIChlcnIpIHsgcmV0dXJuIGNhbGxiYWNrKGVycik7IH1cbiAgICAgICAgc2VsZi5kYiA9IGRiO1xuICAgICAgICBjYWxsYmFjayhudWxsKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG59O1xuIl19
