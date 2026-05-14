import { getRequest} from "../api/getRequest.js";
import { postRequest} from "../api/postRequest.js";

import { html } from "../utils/library.js";

const detailsTemplate = (house, buttonsHTMLResult) => html`
<!-- Details page -->
<section id="details">
  <div id="details-wrapper">
    <img id="details-img" src=${house.imageUrl} alt="example1" width="500" />
    <div>
      <p id="details-category">${house.category}</p>
      <div id="info-wrapper">
        <div id="details-description">
         <p id="title">${house.title}</p>
         <p id="description">${house.description}</p>
         <p id="more-info">${house.moreInfo}</p>
         <p id="pricePerMonth">${house.pricePerMonth}</p>

        </div>
      </div>
      ${buttonsHTMLResult}
    </div>
  </div>
</section>`;

export async function detailsView(context){
    const houseId = context.params.id;
    const house = await getRequest(`/api/House/${houseId}`);

    const userData = context.user; //localStorage.getItem('user'));
    let isUser = userData != null;
    let isOwner = false;
    let buttonsHTMLResult = html``;
    
    
    if(isUser){
        isOwner = userData.id == house.ownerId;


        if(isOwner){
            buttonsHTMLResult = html`           
                <!--Edit and Delete are only for creator-->
                <div id="action-buttons">
                    <a href=${`/house/${house.id}/edit`} id="edit-btn">Edit</a>
                    <a @click = ${deleteAction} href="javascript:void(0)" id="delete-btn">Delete</a>
                </div>`;
        }
    }

    async function deleteAction(event){
        event.preventDefault();
        const choice = confirm('Are you sure you want to delete this item?');
        if(choice){
            await deleteItem(context.params.id);
            context.page.redirect('/');
        }
    }
    
    context.render(detailsTemplate(house, buttonsHTMLResult));
}
