﻿var tsjsmapjsSuffix = ".{ts,js.map,js}";

var bower = "bower_components/";
var src = "src/";
var app = src + "app/";
var tests = "tests/";

var config = {

    base: ".",
    buildDir: "./build/",
    debug: "debug",
    release: "release",
    css: "css",

    bootFile: src + "index.html",
    bootjQuery: bower + "jquery/dist/jquery.min.js",

    // The fonts we want Gulp to process
    fonts: [bower + "fontawesome/fonts/*.*"],

    images: src + "images/**/*.{gif,jpg,png}",

    // The scripts we want Gulp to process
    scripts: [
        // Bootstrapping
        app + "app" + tsjsmapjsSuffix,
        app + "config.route" + tsjsmapjsSuffix,

        // common Modules
        app + "common/common" + tsjsmapjsSuffix,
        app + "common/logger" + tsjsmapjsSuffix,
        app + "common/spinner" + tsjsmapjsSuffix,

        // common.bootstrap Modules
        app + "common/bootstrap/bootstrap.dialog" + tsjsmapjsSuffix,

        // directives
        app + "directives/**/*" + tsjsmapjsSuffix,

        // services
        app + "services/**/*" + tsjsmapjsSuffix,

        // controllers
        app + "about/**/*" + tsjsmapjsSuffix,
        app + "admin/**/*" + tsjsmapjsSuffix,
        app + "dashboard/**/*" + tsjsmapjsSuffix,
        app + "layout/**/*" + tsjsmapjsSuffix,
        app + "sages/**/*" + tsjsmapjsSuffix,
        app + "sayings/**/*" + tsjsmapjsSuffix
    ],

    // The styles we want Gulp to process
    styles: [
        src + "styles/styles.less"
    ],

    testConfig: tests + "karma.conf.js",

    tests: [
      tests + "bootstrapper.js",
      tests + "app/**/*.js"
    ],

    wiredepOptions: {
        exclude: [/jquery/],
        ignorePath: ".."
    }
};

config.debugFolder = config.buildDir + config.debug + "/";
config.releaseFolder = config.buildDir + config.release + "/";

config.templateFiles = [
    app + "**/*.html",
    "!" + config.bootFile // Exclude the launch page
];


module.exports = config;
