export function userMiddleware(context, next){
    const user = localStorage.getItem('user');
    context.user = user;
    next();
}
