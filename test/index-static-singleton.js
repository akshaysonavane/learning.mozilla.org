var indexStaticWatcher = require('../lib/build/index-static-watcher').create();

var indexStatic;
var indexRebuildTimeout = 60000;


exports.get = function() {
  if (!indexStatic) {
    throw new Error("indexStatic has not yet been built.");
  }
  return indexStatic;
};

exports.build = function(done) {
  this.timeout(indexRebuildTimeout);
  indexStaticWatcher.build(function(err, newIndexStatic) {
    if (err) return done(err);
    indexStatic = newIndexStatic;
    done();
  });
};

exports.indexRebuildTimeout = indexRebuildTimeout;
