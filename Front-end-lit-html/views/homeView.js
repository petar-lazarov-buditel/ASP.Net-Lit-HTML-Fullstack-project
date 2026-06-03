import { html } from "../utils/library.js";

const homeTemplate = () => {
    return html `
        <div class="homePage">Home page</div>
    `;
}

export function homeView(context){
    context.render(homeTemplate());
}
