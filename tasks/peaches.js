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

  grunt.registerMultiTask('peaches', 'generate sprites image.', function() {
    // Force task into async mode and grab a handle to the "done" function.
    var done = this.async();

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      punctuation: '.',
      separator: ', '
    });

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        return grunt.file.read(filepath);
      }).join();
    
      require('peaches')(src, {
        beautify: true,
        server: {
            "name":"alipayobjects",
            "root":"./",
            "username":"liuqin.sheng",
            "tmp":"./tmp",
            "baseURI":"https://i.alipayobjects.com",
            "uploadUrl":"https://ecmng.alipay.com/home/uploadFile.json"
        }
      } , function(err, styleText) {

        if (err) {
          grunt.log.writeln('Peaches error: ' + err + '.');
          return;
        }

        styleText = require('cssbeautify')(styleText);
        
        // Write the destination file.
        grunt.file.write(f.dest, styleText);

        // Print a success message.
        grunt.log.writeln('File "' + f.dest + '" created.');
        
        // Remove temp png files
        grunt.file.glob.sync('sprite-*.png').forEach(function(f) {
            grunt.file.delete(f);
        });

        done();
      });

    });
  });

};
