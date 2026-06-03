import { getRequest } from "../api/getRequest.js";
import { html } from "../utils/library.js";

const houseTemplate = (house) => html`
    <div class="house">
        <h3 class="title">${house.title}</h3>
        <p class="address">${house.address}</p>
        <h4 class="category">${house.category}</h3>
        <img src=${house.imageUrl} alt="image" width="400"/>
        <p class="description">${house.description}</p>
        <p class="pricePerMonth">Price per month ${house.pricePerMonth}</p>
        <a class="details-btn" href="/house/${house.id}/details">More Info</a>
        <p class="publishedBy">House ID ${house.id}</p>
    </div>
`

const houseCatalogTemplate = (housesAllTemplates) => html`${housesAllTemplates.length > 0
    ? html`
            <h2>Houses</h2>
            <section>${housesAllTemplates}</section>
        `
    : html`
            <h2>No houses added here</h2>
        `
    }
`
export async function housesAllView(context, next) {
    const allHousesObjects = await getRequest('/api/House/All')
    const allHousesArray = []
    for (const element of allHousesObjects) {
        const househtml = houseTemplate(element)
        allHousesArray.push(househtml)
    }
    context.render(houseCatalogTemplate(allHousesArray))
    next()
}
