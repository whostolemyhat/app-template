'use strict';

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        app: 'app', // path to app files
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            options: {
                spawn: false
            },

            watchsass: {
                files: [
                    '<%= app %>/sass/**/*.scss',
                ],
                tasks: ['sass:dev']
            },

            js: {
                files: [
                    '<%= app %>/js/**/*.js'
                ],
                tasks: ['jshint'],
            },


            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= app %>/*.html',
                    '<%= app %>/js/**/*.js',
                    '<%= app %>/css/*.css',
                    '<%= app %>/img/*.{gif,jpg,jpeg,png,svg,webp}'
                ]
            }
        },
        
        concat: {
            dev: {
                options: {
                    // Replace all 'use strict' statements in the code with a single one at the top
                    // and replace all namespace declarations
                    banner: "<%= tag.banner %>\n'use strict';\nvar jt = jt || {};\n\n",
                    process: function(src, filepath) {
                        return '// Source: ' + filepath + '\n' +
                            src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1')
                                .replace(/(var jt = jt \|\| {};)/g, '');
                    },
                },
                files: {
                    '<%= app %>/js/main.js': [
                        '<%= app %>/js/src/_search.js',
                        '<%= app %>/js/src/_main.js' // main always last
                    ]
                },
            }
        },

        sass: {
            dev: {
                options: {
                    style: 'expanded',
                    lineNumbers: true
                },
                files: {
                    '<%= app %>/css/main.css': '<%= app %>/sass/main.scss'
                }
            },
            prod: {
                options: {
                    style: 'compressed',
                    lineNumbers: false
                },
                files: {
                    '<%= app %>/build/css/main.css': '<%= app %>/sass/main.scss'
                }
            }
        },

        clean: [ '<%= app %>/build/' ],

        tag: {
            banner: '/* <%= pkg.name %>*/\n' +
                    '/* v<%= pkg.version %>*/\n' +
                    '/* <%= pkg.author %>*/\n' +
                    '/* Last updated: <%= grunt.template.today("dd-mm-yyyy") %> */\n' +
                    '/* This is a generated file: any changes made here will be lost. */\n'
        },

        uglify: {
            options: {
                banner: '<%= tag.banner %>'
            },
            dist: {
                src: ['<%= app %>/js/*.js'], // not vendor files
                dest: '<%= app %>/build/js/app.min.js'
            }
        },

        jshint: {
            options: {
                force: true,
                jshintrc: '.jshintrc',
                reporter: require('jshint-summary')
            },
            all: [
                'Gruntfile.js',
                '<%= app %>/js/*.js'
            ]
        },


        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                hostname: 'localhost',
            },
            livereload: {
                options: {
                    base: ['<%= app %>']
                }
            }
        }

    });

    grunt.registerTask('default', ['sass:dev', 'concat:dev', 'connect:livereload', 'watch']);
    grunt.registerTask('build', ['jshint', 'clean', 'uglify', 'sass:prod']);
};
