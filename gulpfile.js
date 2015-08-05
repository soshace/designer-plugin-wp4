var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    obfuscate = require('gulp-obfuscate'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    minifyCss = require('gulp-minify-css')
    ;

gulp.task('default', function() {

});

gulp.task('buildDesignerScripts', function() {
    return gulp.src([
            'js/designer/Trial.js',
            'js/designer/DEOptions.js',
            'js/designer/ObjectType.js',
            'js/designer/FlipKind.js',
            'js/designer/AlignSide.js',
            'js/designer/events/EventDispatcher.js',
            'js/designer/extend.js',
            'js/designer/events/Events.js',
            'js/designer/events/DEEvents.js',
            'js/designer/Util.js',
            'js/designer/vo/ConfigVO.js',
            'js/designer/vo/DesignVO.js',
            'js/designer/CanvasManager.js',
            'js/designer/ControlsModelVO.js',
            'js/designer/ConfigManager.js',
            'js/designer/ControlsManager.js',
            'js/designer/StatusManager.js',
            'js/designer/vo/QuoteLocationVO.js',
            'js/designer/vo/DesignInfoVO.js',
            'js/designer/OrderManager.js',
            'js/designer/AuthManager.js',
            'js/designer/SaveLoadManager.js',
            'js/designer/ProductManager.js',
            'js/designer/VectorEffect.js',
            'js/designer/ArcUp.js',
            'js/designer/TextEffectsManager.js',
            'js/designer/HistoryManager.js',
            'js/designer/DEModel.js',
            'js/designer/FontManager.js',
            'js/designer/Obj.js',
            'js/designer/DesignerJs.js',
            'js/designer/TrackerManager.js',
            'js/designer/TrialWaterMark.js',
            'js/designer/vo/StyleVO.js',
            'js/designer/DEDesigner.js',
            'js/designer/RulerManager.js',
            'DesignerJS.js'

        ])
        .pipe(concat('allDesigner.js'))
        .pipe(uglify())
        //.pipe(obfuscate())
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('buildOtherScripts', function() {
    return gulp.src([
        'assets/js/jquery.touchSwipe.min.js',
        'assets/bootstrap/js/bootstrap.js',
        'assets/js/jquery.nouislider.min.js',
        'assets/js/farbtastic.js',
        'assets/js/jquery.tooltipster.min.js',
        'assets/js/jquery.colorPicker.js',
        'assets/js/jquery.PrintArea.js',
        'lib/DELibs.js',
        'assets/js/designer-ui-components.js',
        //'UI.js'

    ])
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        //.pipe(obfuscate())
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('buildUiScript', function () {
    return gulp.src([
            'UI.js'
        ])
        .pipe(concat('UI.min.js'))
        .pipe(uglify())
        //.pipe(obfuscate())
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('minifycss',function(){
    gulp.src(['assets/css/*.css',  '!assets/css/style-ios.css'])
        .pipe(concat('styles.min.css'))
        .pipe(minifyCss({keepBreaks:false}))
        .pipe(gulp.dest('dist/css/'))
});

// Concatenate & Minify JS
gulp.task('scripts', ['buildDesignerScripts', 'buildOtherScripts', 'buildUiScript']);