let gulp = require("gulp");
let ts = require("gulp-typescript");
let babel = require("gulp-babel");
let rename = require("gulp-rename");

let reporter = ts.reporter.defaultReporter();

gulp.task("ts-babel", function () {
    // Using my existing tsconfig.json file
    let tsProject = ts.createProject(__dirname + "/tsconfig.json");

    // The `base` part is needed so
    //  that `dest()` doesnt map folders correctly after rename
    return gulp.src("public/scripts/**/*.ts", { base: "./" })
        .pipe(tsProject(reporter))
        .pipe(babel({
            optional: ["runtime"]
        }))
        .pipe(rename(function (path) {
            path.extname = ".js";
        }))
        .pipe(gulp.dest("./build"));
});