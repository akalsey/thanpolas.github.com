module.exports = function(grunt) {

  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Project configuration.
  grunt.initConfig({

    copy: {
      dist: {
        files: {
          '_site_git/' : '_site/**'
        }
      },
      css : {
        files: {
          '_site/assets/themes/thanpolas/css/tpstyle.css': 'assets/themes/thanpolas/css/tpstyle.css'
        }
      }
    },
    shell: {
      jekyll: {
        command: 'rm -rf _site/*; jekyll',
        stdout: true
      }
    },
    less: {
      development: {
        options: {
          paths: ['assets/themes/thanpolas/less']
        },
        files: {
          'assets/themes/thanpolas/css/tpstyle.css': ['assets/themes/thanpolas/less/main.less']
        }
      }
    },

    watch: {
      options: {
        livereload: true
      },
      less: {
        files: ['assets/themes/thanpolas/less/*.less'],
        tasks: ['lessCopy']
      },
      jekyllSources: {
        files: [
          // capture all except css
          '*.html', '*.yml', 'assets/js/**.js', '_posts/**',
          'projects/**', 'blog/**', 'about/**', '_includes/**',
          'atom.xml', '**/*.md'
        ],
        tasks: ['shell:jekyll']
      }
    },

    connect: {
      server: {
        options: {
          base: '_site/',
          port: 9009
        }
      }
    },
    open: {
      server: {
        path: 'http://localhost:<%= connect.server.options.port %>/'
      }
    }
  });

  // less watch
  grunt.registerTask('lessCopy', ['less:development', 'copy:css']);

  grunt.registerTask('server', [
    'connect:server',
    'open:server',
    'watch'
  ]);

  // Default task.
  grunt.registerTask('default', 'server');

};
