/*
 * grunt-peaches
 * https://github.com/afc163/peaches
 *
 * Copyright (c) 2013 afc163
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  var path = require('path');

  grunt.registerMultiTask('peaches', 'generate sprites image.', function() {
    // Force task into async mode and grab a handle to the "done" function.
    var done = this.async();

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      model: "alipay",
      servers: {
        "alipay": {
          "name": "alipay",
          "root": "./tmp",
          "username": "liuqin.sheng",
          "tmp": "./tmp",
          "baseURI": "https://i.alipayobjects.com",
          "uploadUrl": "https://ecmng.alipay.com/home/uploadFile.json"
        },
        "tfsdaily": {
          "name": "tfsdaily",
          "root": "./images",
          "tmp": "./tmp"
        }
      }
    });

    if(!options.server) {
      options.server = options.servers[options.model];
    }

    var destfile, src, srcContent;

    grunt.util.async.map(this.files, function(fileObj, callback) {
      if( fileObj.src.length > 1 ){
        grunt.log.warn('This plugin don\'t support multi src file mapping to one dest file');
        return;
      }

      var src = fileObj.src[0];
      var destfile = fileObj.dest;

      if (src.indexOf('-debug.css') > 0) {
          return;
      }

      srcContent = grunt.file.read(src);

      require('peaches')(srcContent, options, function(err, styleText) {

        if (err) {
          grunt.log.writeln('Peaches error: ' + err + '.');
          callback(err);
          return;
        }

        // Write the destination file.
        grunt.file.write(destfile, styleText);

        // Print a success message.
        grunt.log.writeln('File "' + destfile + '" created.');

        // Remove temp png files
        grunt.file.glob.sync('sprite-*.png').forEach(function(f) {
          grunt.file.delete(f);
        });

        callback(null, 'done');

      });
    }, function(err,results) {
      err ? done(false) : done();
    });

  });

};
