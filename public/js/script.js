import calendar from './modules/calendar';
import getDate from './modules/getDate';

window.addEventListener('DOMContentLoaded', () => {
    $( document ).ready(function() {
    calendar();
    getDate();
    });
});