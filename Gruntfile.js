module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {

            // Set our watch options for livereload
            options: {
                livereload: {
                    options: {
                        livereload: true
                    },
                    files: ['public/**/*']
                }
            },

            // Watch our Sass files for changes...
            sass: {
                files: [ 'source/css/**/*.{scss,sass}' ],
                tasks: [ 'compass' ]
            },

            // Keep an eye on the Pattern Lab pattern templates...
            patterns: {
                files: [
                    'source/_patterns/**/*.mustache',
                    'source/_patterns/**/*.json',
                    'source/_data/*.json'
                ],
                tasks: [ 'shell:patternlab' ],
                options: {
                    spawn: false,
                    livereload: true
                }
            }
        },

        // Process our .scss files using Compass.
        compass: {
            dist: {
                options: {
                    sassDir: ['source/css/'],
                    cssDir: 'public/css/'
                }
            }
        },

        // Rebuilds our Pattern Lab site if a template file has changed.
        shell: {
            patternlab: {
                command: "php core/builder.php -pg"
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-shell');

    grunt.registerTask('default',["watch"]);

};