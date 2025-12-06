const successResponse = (res, statusCode, message, data = null) => {
    return res.status(statusCode).json({
        success: true,
        message: message,
        data: data
    });
};

const errorResponse = (res, statusCode, message, error = null) => {
    const response = {
        success: false,
        message: message
    };
    
    if (error && process.env.NODE_ENV === 'development') {
        response.error = error;
    }
    
    return res.status(statusCode).json(response);
};

module.exports = { successResponse, errorResponse };