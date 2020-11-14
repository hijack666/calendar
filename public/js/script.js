import calendar from './modules/calendar';
import getDate from './modules/getDate';
// import readData from './modules/readData';

window.$ = window.jQuery = require('jquery');

window.addEventListener('DOMContentLoaded', () => {
    $( document ).ready(function() {

    // readData('./public/data/db'); // читаем файл
    calendar();
    getDate();
    
    
    });


});