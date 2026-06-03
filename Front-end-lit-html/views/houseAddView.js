import { postRequest } from "../api/postRequest.js";
import { postRequestAuthorized } from "../api/postRequestAuthorised.js";
import { loadCategories } from "../utils/houseCategories.js";
import { html, page } from "../utils/library.js"

const addTemplate = (submitAction, categories) => html`
    <section id="create">
        <div class="form">
        <h2>Add House</h2>

        <form @submit=${submitAction} class="create-form">
            <input type="text" name="title" placeholder="Title" required />
            <input type="text" name="address" placeholder="Address" required />
            <input type="text" name="imageUrl" placeholder="Image URL" required />
            <textarea name="description" placeholder="Description" required></textarea>
            <input type="number" name="pricePerMonth" placeholder="Price per Month" required />
            <select name="category" required>
                ${categories.map(c => html`
                    <option value=${c.id}>${c.name}</option>
                `)}
            </select>
            <button type="submit">Add House</button>
        </form>
        </div>
    </section>
`

export async function houseAddView(context, next) {
    async function submitAction(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        const houseObject = {
            title: formData.get('title'),
            address: formData.get('address'),
            imageUrl: formData.get('imageUrl'),
            description: formData.get('description'),
            pricePerMonth: formData.get('pricePerMonth'),
            category: Number(formData.get("category"))
        }

        const userData = context.user;
        
        const houseResult = await postRequestAuthorized(`/api/House`, userData, houseObject);
        //console.log(houseResult);
        page.redirect("/house/all");
    }
 
    let categories = await loadCategories();

    context.render(addTemplate(submitAction,categories));
    next();
}
