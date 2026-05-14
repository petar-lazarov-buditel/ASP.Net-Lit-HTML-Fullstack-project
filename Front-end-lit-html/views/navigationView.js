import { html, render } from "../utils/library.js"
import { logoutView } from "./logoutView.js";

const headerElement = document.querySelector('header');
const navigationTemplate = (isUser) => {
    return html`
        <nav>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/house/all">All houses</a></li>

                ${isUser
                ? html`
                    <li class="user"><a href="/characters/add">Add Character</a></li>
                    <li class="user"><a href="javascript:void(0)" @click=${logoutView}>Logout</a></li>
                `
                : html`
                    <li class="guest"><a href="/register">Register</a></li>
                    <li class="guest"><a href="/login">Login</a></li>
                `}
            </ul>
        </nav>
    `;
}

export function navigationView(context, next) {
    const user = context.user;
    //console.log(user);
    
    render(navigationTemplate(user), headerElement);
    next();
}
