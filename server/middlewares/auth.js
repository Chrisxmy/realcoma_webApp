module.exports = function(){
    return async (ctx, next) => {
        const userid = ctx.cookies.get('userid')
        if(userid) {
           await next()
        } else {
            ctx.throw(401, 'no Auth', { code: 401 });
        }

    };

}