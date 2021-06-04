/* Modulos principales ES6*/
import { task, src, dest, watch } from 'gulp'; /* Modulo que requiere a Gulp */
const browserSync = require ('browser-sync').create(); /* Modulo que se encarga de reinciar el navegador*/
import sass from 'gulp-sass'; /* Modulo que se encarga de convertir/compilar el codigo */

/* Sino compila el modulo de arriba intenta:
const gulp = require('gulp'); 
const browserSync = require ('browser-sync').create();
const sass = require('gulp-sass');
*/

/* Tarea sass : Convertir bootstrap y codigo sass a html */
task('sass', () => {
  return src([
    'node_modules/bootstrap/scss/bootstrap.scss',
    'src/scss/*.scss'
  ])
  .pipe(sass({outputStyle: 'compressed'}))
  .pipe(dest('src/css'))
  .pipe(browserSync.stream());
});

/* Tarea js */
task('js', () => {
  return src([
    'node_modules/bootstrap/dist/js/bootstrap.min.js',
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/popper.js/dist/umd/popper.min.js'
  ])
  .pipe(dest('src/js'))
  .pipe(browserSync.stream());
});

/* Tarea reiniciar server: Apenas agamos cambios se refejara en nuestro navegador */
task('serve', ['sass'], () => {
  browserSync.init({
    server: './src'
  });

  watch([
    'node_modules/bootstrap/scss/bootstrap.min.scss',
    'src/scss/*.scss'
  ], ['sass']);

  watch('src/*.html').on('change', browserSync.reload);

});

/* Tarea font-awesome */
task('font-awesome', () => {
  return src('node_modules/@fortawesome/fontawesome-free/css/fontawesome.min.css')
  .pipe(dest('src/css'));
})

task('fonts', () => {
  return src('node_modules/@fortawesome/fontawesome-free/webfonts/*')
    .pipe(dest('src/fonts'));
});

task('default', ['js', 'serve', 'font-awesome', 'fonts'])
