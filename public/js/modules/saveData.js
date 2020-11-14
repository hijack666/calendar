const fs = require('fs');

function saveData(file, data) {
    fs.writeFileSync(file, data);
}

export default saveData;