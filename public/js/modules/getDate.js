import {postData} from '../services/services';
// import { inputForm } from './inputForm.js';

function getDate() {
// $( document ).ready(function() {

    let chosenDate = [];
    /* Получаем дату из календаря */
    $('.yep table tbody td').on('click', function(event) {
        let getMonthFromCalendar = $(this)[0].parentElement.parentElement.parentNode.parentElement.attributes['data-month'].value;
        
        // if ($(event.target).is(this) == false ) { // если кликнул не по дате, надо ее стереть, пока не рабит
        //     chosenDate.length = 0;
        //     console.log('chosenDate');
        // }

        chosenDate = []; // обновляем массив, в нем должно быть два значения: число, месяц

        chosenDate.push($(this)[0].innerHTML, getMonthFromCalendar);
        // console.log(chosenDate);
        const object = {
                month: chosenDate[1],
                data: chosenDate[0]
        };
        console.log(object);
        const json = JSON.stringify(object);
    
        //Отправляет дату в db
        postData('http://localhost:3000/requests', json)
                .then( data => {
                    console.log(data);
                
                }).catch((e) => {
                    console.log(e);
                }).finally(()=> {
                    console.log('finally');
                });
    });

// });
}

export default getDate;