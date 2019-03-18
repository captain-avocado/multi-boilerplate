const gulp = require('gulp');
const config = require('../config');

function watch() {
  gulp.watch(config.src.scripts + '**/*', gulp.series('scripts'));
  gulp.watch(config.src.styles + '**/*', gulp.series('styles'));
  gulp.watch([config.src.images + '**/*', `!${config.src.svg}*.svg`], gulp.series('images'));
  gulp.watch(config.src.svg + '*.svg', gulp.series('svg'));
  gulp.watch([config.src.root + '*.html', config.src.fonts + '**/*', config.src.static + '**/*'], gulp.series('copy'));
}

gulp.task('watch', watch);
