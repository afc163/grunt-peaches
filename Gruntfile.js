/*
 * grunt-peaches
 * https://github.com/afc163/peaches
 *
 * Copyright (c) 2013 afc163
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    peaches: {
      default_options: {
        options: {
            "servers":{
                "beautify": false , // 是否需要格式化输出，默认为 false
                "model":"local", // 指定上传图片到哪台服务器，默认支持 'alipay', 'tfsdaily', 默认为 alipay
                "format":"png8", // 输出图片的格式,支持 png8 和 png24, 默认为 png8
                "sort":"h", // 输出图片的排列规则, h 为竖排, v 为横排 默认为 h
                "alipay":{
                    "name": "alipay",
                    "root": "./images",
                    "tmp": "./tmp",
                    "bizName": "linzhi.gao",
                    "token": "linzhi.gao"
                }
            }
        },
        files: [{
          expand:true,
          cwd: 'test/fixtures/',
          src: '**/*.css',
          dest: 'test/tmp'
        }]
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'peaches', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
