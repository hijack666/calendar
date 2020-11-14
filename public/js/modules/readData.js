const fs = require('fs');

// let savedDates;

function readData(file) {
    
    let data = fs.readFileSync(file, 'utf8');
    // console.log(JSON.parse(data));
    return data;
}

export default readData;