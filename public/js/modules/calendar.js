import { camelCase } from "jquery";

import {getResource} from '../services/services';
// import getDate from './getDate';

function calendar() {

// Библиотека axios
function showDates(dates) {
    for (let i=0; i<dates.length; i++) {
        if (dates[i].month) {
            $(`[data-month="${dates[i].month}"] table td:contains("${dates[i].data}")`).addClass('red'); 
            // console.log(dates[i].month);
            // console.log( $(`[data-month="${dates[i].month}"] table td:contains("${dates[i].data}")`));
        }
        
    }
}

// axios.get('http://localhost:3000/requests')
//     .then(data => {
//         // console.log('Date from db');
//         console.log(data.data);
//         // for (let i=0; i<data.data.length; i++) {
//         //     if (data.data[i].month) {
//         //         $(`[data-month="${data.data[i].month}"] table td:contains("${data.data[i].data}")`).addClass('red'); 
//         //         console.log(data.data[i].month)
//         //     }
            
//         // }
//         showDates(data.data);
//     })
//     .catch(err => {
//         console.log(err);
//     });


let currentMonth = new Date().getMonth();
let prevMonthName;
let todayOfMonth = new Date().getDate(); //Получаем число сегодня
let thisYear = new Date().getFullYear();

/* Получаем день недели месяца */
function dayOfMonth(year, month, day) {
    let firstDayOfTheWeek = new Date(year, month-1, day).getDay();
    if (firstDayOfTheWeek === 0) {
        firstDayOfTheWeek = 7;
    }
    return firstDayOfTheWeek;
}

function daysInMonth (year, month) {
    return new Date(year, month, 0).getDate();
}

const tableTemplate = `<table><thead><th>ПН</th><th>ВТ</th><th>СР</th><th>ЧТ</th><th>ПТ</th><th>СБ</th><th>ВС</th></thead><tbody><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr></tbody></table>`;

let monthArray = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь','январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];
let start;
for (var i=0; i < 24; i++ ) {
    if ( currentMonth === i+1 ) { // Если следующая итерация - текущий месяц, то текущую итерацию записать как предыдущий
        prevMonthName = monthArray[i];
        $('#m1').append(`<h2>${prevMonthName}</h2>`);
        $('#m1').append(`${tableTemplate}`);
        start = 2; // Записываем в м2 
    }
    
    $('#m'+start).append(`<h2>${monthArray[i+1]}</h2>`);
    $('#m'+start).append(`${tableTemplate}`);
    start++;
}

let thisMonthLength; // Длина месяца

// Ф-ция заполнения календаря
function fillCalendarWithDays(element) {
    const thisMonth = currentMonth + element;
    thisMonthLength = daysInMonth(thisYear, thisMonth); // Длина месяца
    $(`#m${element+1} table tbody td`).each(function(index) { // Перебор в массиве
    // $(`.yep table tbody td`).each(function(index) { 
        if (index >= dayOfMonth(thisYear, thisMonth, 0) && index < (thisMonthLength + dayOfMonth(thisYear, thisMonth, 0)) ) {    
            $(this).append(`${-(dayOfMonth(thisYear, thisMonth, 0) - index -1)}`);
            $(this).addClass('day'); // отделяем дни месяца
        }

        /* Выходные - СБ, ВСК */
        if ( (index + 1) % 7  === 0 || (index + 1) % 7  === 6) {
            $(this).addClass('holiday');
        }
    });
}

function addDays(year, month) { /* Нужны ли входные данные?? */
    $('.yep').each( function(element) {

        /* Вставляем дни в ячейки */
        fillCalendarWithDays(element);

        /* Добавляем атрибут, чтобы знать порядок месяца */
        let yearCycleCurrentMonth = currentMonth + element;
        if (yearCycleCurrentMonth > 12) {
            yearCycleCurrentMonth = yearCycleCurrentMonth - 12;
            
        }
        $(this).attr('data-month',`${yearCycleCurrentMonth}`);

    });
    
}
addDays(thisYear, currentMonth);

/* СЕГОДНЯ */
$('.currentMonth table tbody td').each(function(index) { 
    if ( $(this)[0].innerHTML == todayOfMonth) {
        $(this).addClass("today");
    }
});


// }); // Документ готов

}

export default calendar;