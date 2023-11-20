
const {StatusCodes} = require('http-status-codes')
class AppErrors extends Error{
    constructor(
        name="AppError",
        message="Somthing went wrong",
        explanation="Somthing went wrong",
        statusCode = StatusCodes.INTERNAL_SERVER_ERROR
    ){
        super();
        this.name = name,
        this.message = message,
        this.explanation = explanation,  
        this.statusCode = statusCode
    }
}

module.exports = AppErrors;