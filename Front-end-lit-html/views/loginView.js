import { postRequest } from "../api/postRequest.js";
import { html } from "../utils/library.js";

const loginTemplate = (submitAction) => {
    return html `
        <section id="login">
            <div class="form">
                <h2>Login</h2>
                <form @submit = ${submitAction} class="login-form">
                    <input type="text" name="email" id="email" placeholder="email" value="john1@mail.bg" />
                    <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="password"
                    value="12345678"
                    />
                    <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="username"
                    value="john1"
                    />
                    <button type="submit">login</button>
                    <p class="message">
                    Not registered? <a href="/register">Create an account</a>
                    </p>
                </form>
            </div>
        </section>
    `;
}

export function loginView(context, next){
    async function submitAction(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get('email');
        const password = formData.get('password');
        const username = formData.get('username');
        const userObject = {
            email,
            password,
            username
        }

        try {
            if(email && password && username){
                const userResult = await postRequest('/login', userObject);
                localStorage.setItem('user', userResult.token);
                event.target.reset();
                context.page.redirect('/');
            }
        } catch (error) {
            window.alert(error.message);
        }
    }

    context.render(loginTemplate(submitAction));
    next();
}
