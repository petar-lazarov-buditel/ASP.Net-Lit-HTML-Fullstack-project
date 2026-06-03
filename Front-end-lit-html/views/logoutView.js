import { page } from "../utils/library.js";

export function logoutView(){
    localStorage.removeItem('authData');
    page.redirect('/');
}
