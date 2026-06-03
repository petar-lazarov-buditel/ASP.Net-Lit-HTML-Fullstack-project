export function userMiddleware(context, next){
    //const user = localStorage.getItem('user');
    const user = JSON.parse(localStorage.getItem('authData'));
    context.user = user;
    // console.log(user);
    // console.log(user.userName);
    // console.log(user.token);
    next();
}
