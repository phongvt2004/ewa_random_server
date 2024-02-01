const {Schema, model} = require('mongoose');
const Customers = new Schema({
    name: {type: String, required: true},
    type: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    time: {type: Date, required: true},
    code: {type: String, required: true},
    online: {type: Boolean, required: true},
})
module.exports = model('Customers', Customers)