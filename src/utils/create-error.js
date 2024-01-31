module.exports = {
    Unauthorized: (message = "Unauthorized") => {
        return {
            code: 401,
            message
        }
    },
    NotFound: (message = "NotFound") => {
        return {
            code: 404,
            message
        }
    },
    InternalServerError: (message = "Internal Server Error") => {
        return {
            code: 500,
            message
        }
    },
    Forbidden: (message = "Forbidden") => {
        return {
            code: 403,
            message
        }
    }
}