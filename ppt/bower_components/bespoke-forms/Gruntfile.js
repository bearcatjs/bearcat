// Generated on 2013-11-13 using generator-bespokeplugin v0.1.3

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: '/*!\n' +
        ' * <%= pkg.title || pkg.name %> v<%= pkg.version %>\n' +
        ' * <%= pkg.homepage %>\n' +
        ' *\n' +
        ' * Copyright <%= grunt.template.today("yyyy") %>, <%= pkg.author.name %>\n' +
        ' * This content is released under the' +
        ' <%= _.pluck(pkg.licenses, "type").join(", ") %> license<%= pkg.licenses.length === 1 ? "" : "s" %>\n' +
        '' +
        ' */\n\n',
      microbanner: '/*! <%= pkg.title || pkg.name %> v<%= pkg.version %> ' +
        '© <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>, ' +
        'Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n'
    },
    clean: {
      files: ['dist']
    },
    concat: {
      options: {
        banner: '<%= meta.banner %>',
        stripBanners: true
      },
      dist: {
        src: ['src/<%= pkg.name %>.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= meta.microbanner %>'
      },
      dist: {
        src: ['<%= concat.dist.dest %>'],
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    jasmine: {
      src: ['src/**/*.js'],
      options: {
        vendor: [
          'node_modules/simulant/release/0.1.0/simulant.js',
          'node_modules/bespoke/dist/bespoke.js'
        ],
        specs: 'spec/*Spec.js',
        helpers: 'spec/*Helper.js'
      }
    },
    jshint: {
      src: [
        'Gruntfile.js',
        'src/**/*.js',
        'spec/**/*.js',
        'demo/**/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    micro: {
      src: '<%= uglify.dist.dest %>',
      options: {
        limit: 1024,
        gzip: true
      }
    },
    watch: {
      files: '<%= jshint.src %>',
      tasks: ['default']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-micro');

  grunt.registerTask('default', ['clean', 'jasmine', 'concat', 'uglify', 'micro']);

};
