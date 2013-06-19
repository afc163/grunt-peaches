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
      server: {
        "name":"alipay",
        "root":"./",
        "username":"liuqin.sheng",
        "tmp":"./tmp",
        "baseURI":"https://i.alipayobjects.com",
        "uploadUrl":"https://ecmng.alipay.com/home/uploadFile.json"
      }
    });

    var fname, destfile, src;
    this.files.forEach(function(fileObj) {
      fileObj.src.forEach(function(fpath) {

        if (fpath.indexOf('-debug.css') > 0) {
            return;
        }
        
        // get the right filename and filepath
        if (fileObj.cwd) {
          // not expanded
          fname = fpath;
          fpath = path.join(fileObj.cwd, fpath);
        } else {
          fname = path.relative(fileObj.orig.cwd || '', fpath);
        }
        if (grunt.file.isDir(fpath)) {
          grunt.file.mkdir(fpath);
          return;
        }

        src = grunt.file.read(fpath);
        destfile = path.join(fileObj.dest, fname);

        require('peaches')(src, options, function(err, styleText) {
          if (err) {
            grunt.log.writeln('Peaches error: ' + err + '.');
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

          done();
        });
      });
    });

  });

};
