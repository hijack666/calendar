import { camelCase } from "jquery";

import {getResource} from '../services/services';
// import getDate from './getDate';

function calendar() {

// Библиотека axios
axios.get('http://localhost:3000/requests')
    .then(data => {
        console.log('Date from db');
        console.log(data.data);
    })
    .catch(err => {
        console.log(err);
    });

let currentMonth = new Date().getMonth();
let currentMonthName;
let todayOfMonth = new Date().getDate(); //Получаем число сегодня
let thisYear = new Date().getFullYear();
let currentDayOfWeek = new Date().getDay();

/* Получаем день недели месяца */
function dayOfMonth(year, month, day) {
    let firstDayOfTheWeek = new Date(year, month-1, day).getDay();
    if (firstDayOfTheWeek === 0) {
        firstDayOfTheWeek = 7;
    }
    return firstDayOfTheWeek;
}

function daysInMonth (year, month) {
    // console.log(new Date(year, month, 0).getDate())
    return new Date(year, month, 0).getDate();
}

const tableTemplate = `<table><thead><th>ПН</th><th>ВТ</th><th>СР</th><th>ЧТ</th><th>ПТ</th><th>СБ</th><th>ВС</th></thead><tbody><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr></tbody></table>`;

let monthArray = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь','январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];
for (var i=0; i < 12; i++ ) {
    if ( currentMonth === i ) {
        currentMonthName = monthArray[i];
        // nextMonth = monthArray[i];
        $('#m1').append(`<h2>${currentMonthName}</h2>`);
        // i++;
        $('#m1').append(`${tableTemplate}`);
        for (var k=2; k<13; k++) { // Массив в массиве, переделать
            $('#m'+k).append(`<h2>${monthArray[i+1]}</h2>`);
            $('#m'+k).append(`${tableTemplate}`);
            i++;
        }
    }
}

console.log(currentMonthName);
// console.log(daysInMonth(currentMonth+1, thisYear));
let thisMonthLength;
// let monthLength;

// function countDaysInMonth(year, month) {
//     thisMonthLength = daysInMonth(thisYear, currentMonth+1);
//     currentMonth = currentMonth + 1;
//     // monthLength = thisMonthLength;
//     console.log(thisMonthLength);
//     return thisMonthLength;
// }

function fillCalendarWithDays(element) {
    const thisMonth = currentMonth + element + 1;
    thisMonthLength = daysInMonth(thisYear, thisMonth);
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
        let yearCycleCurrentMonth = currentMonth + 1 + element;
        if (yearCycleCurrentMonth > 12) {
            yearCycleCurrentMonth = yearCycleCurrentMonth - 12;
            
        }
        $(this).attr('data-month',`${yearCycleCurrentMonth}`);

    });
    
}
addDays(thisYear, currentMonth);

/* СЕГОДНЯ */
$('#m1 table tbody td').each(function(index) { 
    if ( $(this)[0].innerHTML == todayOfMonth) {
        console.log(this);
        $(this).addClass("today");
    }
    // console.log(this.innerHTML);
});


// }); // Документ готов

}

export default calendar;