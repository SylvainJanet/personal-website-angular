module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "@angular-devkit/build-angular"],
    plugins: [
      require("karma-jasmine"),
      require("karma-chrome-launcher"),
      require("karma-firefox-launcher"),
      require("karma-jasmine-html-reporter"),
      // require("karma-safari-launcher"),
      // require("karma-edge-launcher"),
      require("karma-coverage"),
      require("karma-sabarivka-reporter"),
      require("@angular-devkit/build-angular/plugins/karma"),
    ],
    client: {
      jasmine: {
        // you can add configuration options for Jasmine here
        // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
        // for example, you can disable the random execution with `random: false`
        // or set a specific seed with `seed: 4321`
      },
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: false, // removes the duplicated traces
    },
    preprocessors: {
      "**/src/*.ts": "coverage",
    },
    coverageReporter: {
      dir: require("path").join(__dirname, "./coverage/"),
      subdir: ".",
      reporters: [{ type: "html" }, { type: "text-summary" }, { type: "lcov" }],
      check: {
        global: {
          statements: 100,
          branches: 100,
          functions: 100,
          lines: 100,
        },
      },
      include: [
        // Specify include pattern(s) first
        "src/**/*.(ts|js)",
        // Then specify "do not touch" patterns (note `!` sign on the beginning of each statement)
        "!src/main.ts",
        "!src/**/*.spec.(ts|js)",
        "!src/**/*.module.(ts|js)",
        "!src/**/*.unused.(ts|js)",
        "!src/**/environments/**",
        "!src/test/**",
      ],
      includeAllSources: true,
    },
    reporters: ["progress", "kjhtml", "sabarivka", "coverage"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: [
      "ChromeHeadlessNoSandbox",
      // "Chrome", // not headless
      // "Firefox", // not headless
      "FirefoxHeadless",
      // "Safari", // doesn't work : Errors on start
      // "Edge", // doesn't work : redirects to example.com and then hangs.
    ],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: "ChromeHeadless",
        flags: ["--no-sandbox"],
      },
    },
    singleRun: false,
    restartOnFileChange: true,
  });
};
