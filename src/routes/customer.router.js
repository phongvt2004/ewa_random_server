const express = require('express');
const router = express.Router();
const CustomerController = require('../controllers/customer.controller')


router.post('/create', CustomerController.create)
router.get('/get/id', CustomerController.get)
router.get('/get/phone', CustomerController.getByPhoneNumber)
router.get('/get/type', CustomerController.getByType)
router.get('/get/code/type', CustomerController.getAllCodeByType)
router.get('/test', (req, res) => {
    res.json("data")
})

module.exports = router