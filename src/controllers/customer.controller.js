const CustomerService = require('../services/customer.service')
const createError = require('../utils/create-error')

class CustomerController {
    async create(req, res, next) {
        try {
            const{
                name,
                type,
                phoneNumber,
                time,
                code,
                online
            } = req.body
            const data = await CustomerService.create({
                type: type.toLowerCase(),
                name,
                phoneNumber,
                time,
                code,
                online: online === "true" || online ? true : false,
            })

            res.json(data)
        } catch (error) {
            next(createError.InternalServerError(error))
        }
    }

    async get(req, res, next) {
        try {      
            const {
                customerId
            } = req.query

            const data = await CustomerService.get({
                customerId
            })

            res.json(data)
        } catch (error) {
            next(createError.InternalServerError(error))
        }
        
    }

    async getByPhoneNumber(req, res, next) {
        try {      
            const {
                phoneNumber
            } = req.query

            const data = await CustomerService.getByPhoneNumber({
                phoneNumber
            })

            res.json(data)
        } catch (error) {
            next(createError.InternalServerError(error))
        }
        
    }

    async getByType(req, res, next) {
        try {
            const {
                type,
            } = req.query

            const data = await CustomerService.getByType({
                type,
            })

            res.json(data)
        } catch (error) {
            next(createError.InternalServerError(error))
        }
    }

    async getByTypeAndBuyType(req, res, next) {
        try {
            const {
                type,
                online
            } = req.query

            const data = await CustomerService.getByTypeAndBuyType({
                type,
                online
            })

            res.json(data)
        } catch (error) {
            next(createError.InternalServerError(error))
        }
    }

    async getAllCodeByType(req, res, next) {
        try {
            const {
                type,
            } = req.query

            const data = await CustomerService.getAllCodeByType({
                type,
            })

            res.json(data)
        } catch (error) {
            next(createError.InternalServerError(error))
        }
    }
    
}

module.exports = new CustomerController()