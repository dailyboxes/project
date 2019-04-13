const gulp = require("gulp"),
    htmlmin = require("gulp-htmlmin"),
    minifyCSS = require("gulp-minify-css"),
    sass = require("gulp-sass"),
    ugly = require("gulp-uglify"),
    babel = require("gulp-babel"),
    connect = require("gulp-connect");


gulp.task("html", () => {
    gulp.src("src/**/*.html")
        .pipe(htmlmin({
            removeComments: true,//清除HTML注释
            collapseWhitespace: true,//压缩HTML
            collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
            removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
            removeScriptTypeAttributes: false,//删除<script>的type="text/javascript"
            removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
            minifyJS: true,//压缩页面JS
            minifyCSS: true//压缩页面CSS
        })
    )
    .pipe(gulp.dest("dist"))
    .pipe(connect.reload())
});

gulp.task("minicss", () => {
    gulp.src("src/css/**/*.scss")
        .pipe(sass())
        .pipe(minifyCSS())
        .pipe(gulp.dest("dist/css"))
        .pipe(connect.reload())
});

gulp.task("js", () => {
    gulp.src("src/js/**/*.js")
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(ugly())
        .pipe(gulp.dest("dist/js"))
        .pipe(connect.reload())
});

gulp.task("libs", () => {
    gulp.src("src/libs/**/*")
        .pipe(gulp.dest("dist/libs"))
        .pipe(connect.reload())
});

gulp.task("img", () => {
    gulp.src("src/img/**/*")
        .pipe(gulp.dest("dist/img"))
        .pipe(connect.reload())
});

gulp.task("api", () => {
    gulp.src("src/php/**/*")
        .pipe(gulp.dest("dist/api"))
        .pipe(connect.reload())
});

gulp.task("server", () => {
    connect.server({
        port : 1005,
        livereload : true,
        root : "dist"
    })
});

gulp.task("watch", () => {
    gulp.watch("src/**/*.html", ["html"]);
    gulp.watch("src/**/*.scss", ["minicss"]);
    gulp.watch("src/**/*.js", ["js"]);
})

gulp.task("default", ["html","minicss","js","libs","img","api","server","watch"]);

