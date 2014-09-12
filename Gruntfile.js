/*
 * Filename : Gruntfile.js
 * Author : Chintan Kotadia
 * 
 * Foundation framework integration with grunt, bower and compass
 * This file handles compression, concatenation, uglify and livereload
 * of javascript and scss files.
 */
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options: {
        loadPath: ['app/assets/bower/foundation/scss']
      },
      dist: {
        options: {
          style: 'compressed',
          compass: true
        },
        files: {
          './public/assets/css/framework.css': './app/assets/scss/framework.scss',
          './public/assets/css/app.css': './app/assets/scss/app.scss'
        }        
      }
    },

    concat: {
      options: {
        separator: ';',
      },
      dist: {
        files: {
          './public/assets/js/core.js': [
            './app/assets/bower/foundation/js/vendor/modernizr.js',
            './app/assets/bower/foundation/js/vendor/jquery.js',
            './app/assets/bower/foundation/js/vendor/fastclick.js',
            './app/assets/bower/foundation/js/vendor/jquery.cookie.js',
            './app/assets/bower/foundation/js/vendor/placeholder.js',
            './app/assets/bower/foundation/js/foundation.js',
            './app/assets/js/core/*.js'
          ],
          './public/assets/js/app.js': ['./app/assets/js/*.js']
        },
      }
    },

    uglify: {
      options: {
        mangle: true
      },
      dist: {
        files: {
          './public/assets/js/core.js': './public/assets/js/core.js',
          './public/assets/js/app.js': './public/assets/js/app.js'
        }
      }
    },

    watch: {
      grunt: {
        files: ['Gruntfile.js']
      },
      sass: {
        files: './app/assets/scss/**/*.scss',
        tasks: ['sass'],
        options: {
          livereload: true
        }
      },
      dist: {
        files: './app/assets/js/**/*.js',
        tasks: ['concat:dist', 'uglify:dist'],
        options: {
          livereload: true
        }
      }
    }
  });

  //Loading of various plugins
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  //Registration of different tasks
  grunt.registerTask('build', ['sass', 'concat', 'uglify']);
  grunt.registerTask('default', ['build','watch']);
}
