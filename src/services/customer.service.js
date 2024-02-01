const Customers = require('../models/customer.model')
const createError = require('../utils/create-error')

class CustomerService {
    static create = async(data) => {
        try {
            const customer = new Customers(data)
            const result = await customer.save()
            return {customer: result, status: 200}
        } catch (error) {
            console.log(error)
            throw error 
        }
    }

    static get = async({
        customerId
    }) => {
        const customer = await Customers.findById(customerId)
        if(customer) {
            return customer
        } else {
            return createError.NotFound("Customers not found")
        }
    }

    static getByPhoneNumber = async({
        phoneNumber
    }) => {
        const customeres = await Customers.aggregate([{
            $match: {
                phoneNumber: phoneNumber
            },
        }])
        if(customeres.length > 0) {
            return customeres
        } else {
            return createError.NotFound("Customers not found")
        }
    }

    
    static getByType = async({type}) => {
        const customer = await Customers.aggregate([{
            $match: {
                type: type,
            },
        }])
        if(customer.length>0) return customer
        else return createError.NotFound("Type not found")
    }
    
    static getByTypeAndBuyType = async({type, online}) => {
        const customer = await Customers.aggregate([{
            $match: {
                type: type,
                online
            },
        }])
        if(customer.length>0) return customer
        else return createError.NotFound("Type not found")
    }

    static getAllCodeByType = async({type}) => {
        const customer = await Customers.aggregate([{
            $match: {
                type: type,
            },
        },
        {
            $project: {
                type: 0,
            }
        }])
        if(customer.length>0) return customer
        else return createError.NotFound("Type not found")
    }
}

module.exports = CustomerService