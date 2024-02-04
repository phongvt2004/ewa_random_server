const fs = require('fs-extra');
const path = require('path');

const check_missing_image = async (customers) => {
    let count = 0
    let count2 = 0
    for(let customer of customers) {
        if(customer.time > new Date("2024-01-27T22:46:27") ) continue;
        let filePath = path.join(__dirname, "..", "public", "ticket", `${customer.phoneNumber}_${customer.code}.png`)
        let exists = await fs.exists(filePath)
        if(!exists) {
            console.log(`${customer.phoneNumber}_${customer.code}`)
            count++;
        }
        count2++;
    }
    console.log(count2);
    return count;
}

module.exports = check_missing_image;