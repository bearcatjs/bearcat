'use strict';

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  var src = ['test/bearcat.js', 'test/beans/support/*.js', 'test/context/applicationContext.js', 'test/util/*.js',
    'test/resource/*.js', 'test/aop/aop.js', 'test/aop/aop_annotation.js', 'test/aop/advisor.js', 'test/aop/aspect.js',
    'test/aop/framework/*.js', 'test/aop/pointcut.js', 'test/aop/targetSource.js', 'test/beans/*.js', 'test/model/*.js'
  ];

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    mochaTest: {
      dot: {
        options: {
          reporter: 'dot',
          timeout: 100000,
          require: 'coverage/blanket'
        },
        src: src
      },
      coverage: {
        options: {
          reporter: 'html-cov',
          quiet: true,
          captureFile: 'coverage.html'
        },
        src: src
      }
    },
    clean: {
      "coverage.html": {
        src: ['coverage.html']
      }
    },
    browserify: {
      tests: {
        src: src,
        dest: './test/browser/browserified_tests.js'
      },
      standalone: {
        src: ['index.js'],
        dest: './dist/bearcat.js',
        options: {
          browserifyOptions: {
            standalone: 'bearcat'
          }
        }
      }
    },
    uglify: {
      dist: {
        files: {
          './dist/bearcat.min.js': ['<%= browserify.standalone.dest %>'],
        }
      }
    },
  });

  // Default task.
  grunt.registerTask('default', ['clean', 'mochaTest']);
  grunt.registerTask('browser_test', ['browserify:tests']);
  grunt.registerTask('package', ['browserify:standalone', 'uglify']);
};