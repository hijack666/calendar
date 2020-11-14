import saveData from './saveData';
import readData from './readData';

function getDate() {
    
    let object = { "1": [], "2": [], "3": [], "4": [], "5": [], "6": [], "7": [], "8": [], "9": [], "10":[], "11": [], "12": [] }; // изначально в бд такой объект-строка

    readData('./public/data/db'); // читаем бд
    object = JSON.parse(readData('./public/data/db')); // парсим в жсон
    // console.log(object);
    // saveData('./public/data/db', JSON.stringify(object)); // для первичной записи
    
    
    

    /* Получаем дату из календаря */
    $('.yep table tbody td').on('click', function(event) {

        let getMonthFromCalendar = $(this)[0].parentElement.parentElement.parentNode.parentElement.attributes['data-month'].value;
        let getDayFromCalendar = $(this)[0].innerHTML;

        object[getMonthFromCalendar].push(getDayFromCalendar); // в массив в объекте записываем число
  
        saveData('./public/data/db', JSON.stringify(object)); // сохраняем строкой, и по кругу
        // console.log(getMonthFromCalendar, getDayFromCalendar);

        

    });


    /* Отображаем даты из БД */
    function showDatesOnCalendar() {
        readData('./public/data/db'); // читаем бд
        object = JSON.parse(readData('./public/data/db')); // парсим в жсон
        // console.log(object);
        let month;
        let daysArray;
        let day;
        
        for (let m in object) {
            // console.log(m); //получаем номер месяца в объекте
            // console.log(object[m]); // получаем массив
            month = m;
            daysArray = object[m];
            // console.log(daysArray);
            // $([`[data-month="${m}"] table td:contains("${object[m]}")`] ).addClass('data');
            if (daysArray.length > 0) {
                for (let d =0; d< daysArray.length; d++) {
                    day = daysArray[d];
                    console.log(month, day);
                    $([`[data-month="${month}"] table td:contains("${day}")`] ).addClass('savedData');
                    // console.log($([`[data-month="${month}"] table td:contains("${day}")`] ));
                }
            }
            
            
        }
        
        
        // $([`[data-month="${month}"] table td:contains("${day}")`] ).addClass('data');
        // console.log(findMonth);
        // $([`[data-month="${findMonth}"] table td:contains("${object.month[day]}")`] ).addClass('data');
    }
    showDatesOnCalendar();
    

}

export default getDate;