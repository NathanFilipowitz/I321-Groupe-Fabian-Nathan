import responseSender from '../helpers/responseSender.js'

export default function errorHandler(err, req, res, next) {
    console.error(`Erreur [Code: ${err.code || 500}]:`, err.message);

    const statusCode = err.code || 500;
    const message = err.message || "Une erreur inattendue est survenue.";

    if (err.name === "ValidationError") {
        const errorDetails = err.details?.map(d => d.message) || [err.message];
        return responseSender.sendValidationError(res, errorDetails);
    }

    return responseSender.sendErrorResponse(res, message, statusCode);
};