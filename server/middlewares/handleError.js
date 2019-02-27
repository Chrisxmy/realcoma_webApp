
exports.handleError = function(){
    return async (ctx, next) => {
        try {
            await next();
        } catch (err) {
            ctx.response.status = err.statusCode || err.status || 500;
            ctx.response.body = {
                code: err.code,
                message: err.message
            };
        }
    };

}