import { getRequest } from "../api/getRequest.js";
import { postRequest } from "../api/postRequest.js";
import { putRequest } from "../api/putRequest.js";
import { loadCategories } from "../utils/houseCategories.js";
import { html, page } from "../utils/library.js"

const editTemplate = (submitAction, categories, house) => html`
    <section id="create">
        <div class="form">
        <h2>Edit House</h2>

        <form @submit=${submitAction} class="create-form">
            <input type="text" name="title" placeholder="Title" value=${house.title} required />
            <input type="text" name="address" placeholder="Address" value=${house.address} required />
            <input type="text" name="imageUrl" placeholder="Image URL" value=${house.imageUrl} required />
            <textarea name="description" placeholder="Description" required>${house.description}</textarea>
            <input type="number" name="pricePerMonth" placeholder="Price per Month" value=${house.pricePerMonth} required />
            <select name="category" value=${house.category} required>
                ${categories.map(c => html`
                    <option value=${c.id}>${c.name}</option>
                `)}
            </select>
            <button type="submit">Save</button>
        </form>
        </div>
    </section>
`

export async function houseEditView(context, next) {
    const houseId = context.params.id;
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

        const houseResult = await putRequest(`/api/House/${houseId}`, houseObject);
        console.log(houseResult);
        page.redirect(`/house/${houseId}/details`);
    }
    let categories = await loadCategories();

    const house = await getRequest(`/api/House/${houseId}`);
    context.render(editTemplate(submitAction, categories, house));
    

    next();
    
}

