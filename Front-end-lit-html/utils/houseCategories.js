import { getRequest } from "../api/getRequest";

export async function loadCategories() {
    const categoriesObjectsArray = await getRequest("/api/House/categories");
    //console.log(categoriesObjectsArray);
    return categoriesObjectsArray;
}