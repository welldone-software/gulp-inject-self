var through = require('through2'),
  gutil = require('gulp-util'),
  fs = require('fs'),
  PluginError = gutil.PluginError;

const PLUGIN_NAME = 'gulp-inject-self';

function wrapRegex(destPath, search, options) {
  var replaceWith = (options && options.replaceWith) || function(contents){ return contents; };

  return through.obj(function(file, enc, callback) {
    if (file.isNull()) {
      return callback(null, file);
    }

    if (file.isStream()) {
      var err = new PluginError(PLUGIN_NAME, 'Streams not yet supported');
      return callback(err, file);
    }

    function doReplace() {
      fs.readFile(destPath, 'utf8', function (err, destFileContents) {
        if (err) {
          err = new PluginError(PLUGIN_NAME, 'Error in reading destination file: ' + err);
          return callback(err, file);
        }

        file.contents = new Buffer(destFileContents.replace(search, replaceWith(String(file.contents))));
        callback(null, file);
      });
    }

    if (options && options.skipBinary) {
      istextorbinary.isText('', file.contents, function(err, result) {
        if (err) {
          return callback(err, file);
        }

        if (!result) {
          callback(null, file);
        } else {
          doReplace();
        }
      });

      return;
    }

    doReplace();
  });
}

module.exports = wrapRegex;