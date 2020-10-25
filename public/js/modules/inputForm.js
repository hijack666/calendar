import {postData} from '../services/services';

function inputForm() {
// $( document ).ready(function() {
    const formData = new FormData([form]);

    const object = {};
    const json = JSON.stringify(Object.fromEntries(formData.entries()));

    formData.forEach(function(value, key) { // Перебираем формДату и превращаем в json
        object[key] = value; 
    });

    postData('http://localhost:3000/requests', json)
                .then( data => {
                    console.log(data);
                
                }).catch((e) => {
                    console.log(e);
                }).finally(()=> {
                    console.log('finally');
                });

    // $('#inputForm').append(formTemplate);


// });
}
export {inputForm};
// export default inputForm;