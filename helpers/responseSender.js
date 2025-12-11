const responseSender = {
    sendErrorResponse: (res, err, code) => {
        if (!code) {
            code = 500;
        }
        if (!err || code === 500) {
            err = "Some unexpected error occur";
        }

        return res.status(code).send({
            message: err,
            // errors: [err],
        });
    },
    sendValidationError: (res, errors) => {
        return res.status(422).send({
            message: "Validation Failed",
            errors: Array.isArray(errors) ? errors : ["Validation Failed"],
        });
    },
    sendSuccessResponse: (res, data, msg, code) => {
        if (!code) {
            code = 200;
        }
        if (!msg) {
            msg = "API executed successfully";
        }
        return res.status(code).send({
            message: msg,
            data: data ?? null,
        });
    },
};

export default responseSender;