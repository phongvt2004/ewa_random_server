const express = require('express');
const router = express.Router();
const customerRouter = require('./customer.router');
const createZipFile = require('../utils/create-zip');
const { InternalServerError } = require('../utils/create-error');

router.post('/v1/create-zip-file', async (req, res, next) => {
    console.log(req.body)
    const {
        phoneNumber,
        code,
        type
    } = req.body;
    try {

        let zipFileName = await createZipFile(phoneNumber, code, type);
        res.json(zipFileName)
    } catch (err) {
        res.json(InternalServerError(err))
    }
})

router.use('/v1/customer', customerRouter)

module.exports = router;