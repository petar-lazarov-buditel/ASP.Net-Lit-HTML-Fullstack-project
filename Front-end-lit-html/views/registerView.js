import { postRequest } from "../api/postRequest.js";
import { html } from "../utils/library.js";

const registerTemplate = (submitAction) => {
    return html `
        <section id="register">
            <div class="form">
                <h2>Register</h2>
                <form @submit = ${submitAction} class="register-form">
                    <input type="text" name="email" id="email" placeholder="email" value="john1@mail.bg" />
                    <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="password"
                    value="12345678"
                    />
                    <input
                    type="password"
                    name="repassword"
                    id="repassword"
                    placeholder="repassword"
                    value="12345678"
                    />
                    <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="username"
                    value="john1"
                    />
                    <button type="submit">register</button>
                    <p class="message">
                    Not registered? <a href="/register">Create an account</a>
                    </p>
                </form>
            </div>
        </section>
    `;
}

export function registerView(context, next){
    async function submitAction(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get('email');
        const password = formData.get('password');
        const username = formData.get('username');
        const repassword = formData.get("repassword");
        const userObject = {
            email,
            password,
            username,
            repassword
        }

        try {
            if(email && password && username){
                if(password != repassword){
                    throw new Error('the passwords are not the same')
                }
                const userResult = await postRequest('/register', userObject);
                //localStorage.setItem('user', userResult.token);
                event.target.reset();
                context.page.redirect('/');
            }
        } catch (error) {
            window.alert(error.message);
        }
    }

    context.render(registerTemplate(submitAction));
    next();
}
