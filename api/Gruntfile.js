'use strict';

var request = require('request');

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  var reloadPort = 35729,
    files;

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    develop: {
      server: {
        file: 'app.js'
      }
    },
    watch: {
      options: {
        nospawn: true,
        livereload: reloadPort
      },
      js: {
        files: ['app.js', 'app/**/*.js', 'config/**/*.js', 'models/**/*.js', 'routes/**/*.js', 'services/**/*.js', 'test/**/*.js'],
        tasks: ['mochaTest', 'delayed-livereload']
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          clearRequireCache: true,
          run: true
        },
        src: ['test/**/*.js']
      }
    },
    exec: {
      mongoStart: {
        cmd: "docker start mongo",
        callback: function (error, stdout, stderr) {
          grunt.log.write('stdout: ' + stdout);
          grunt.log.write('stderr: ' + stderr);
        },
        task: ['delay']
      },
      mongoRun: {
        cmd: "docker run --name mongo -v ~/projects/data/dev:/data/db -p 27017:27017 -d mongo",
        callback: function (error, stdout, stderr) {
          grunt.log.write('stdout: ' + stdout);
          grunt.log.write('stderr: ' + stderr);
        }
      }
    }
  });

  grunt.config.requires('watch.js.files');
  files = grunt.config('watch.js.files');
  files = grunt.file.expand(files);

  grunt.registerTask('delayed-livereload', 'Live reload after the node server has restarted.', function () {
    var done = this.async();
    setTimeout(function () {
      request.get('http://localhost:' + reloadPort + '/changed?files=' + files.join(','), function (err, res) {
        var reloaded = !err && res.statusCode === 200;
        if (reloaded)
          grunt.log.ok('Delayed live reload successful.');
        else
          grunt.log.error('Unable to make a delayed live reload.');
        done(reloaded);
      });
    }, 500);
  });

  grunt.registerTask('delay', '1000 ms delay', function () {
    var done = this.async();
    setTimeout(function () {
      grunt.log.writeln("1 sec delay");
      done();
    }, 1000);
  });

  grunt.registerTask('usage', 'display usage parameters', function () {
    grunt.log.subhead("usage :");
    grunt.log.ok("\t grunt dev");
    grunt.log.writeln(`\t Start mongo container , watch , live reload , mocha test on updates
    \t Assumption : mongoStart task has been run at least once so that mongo image is present`);
    grunt.log.ok("\t grunt mongo");
    grunt.log.writeln(`\t Create and run mongo db container with volume mount 
    \t Assumption : ~/projects/data/dev folder exists`);
  });

  grunt.registerTask('default', ['usage']);
  grunt.registerTask('dev', ['exec:mongoStart', 'delay', 'develop', 'watch']);
  grunt.registerTask('mongo', ['exec:mongoRun']);
};