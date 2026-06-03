import { deleteMethod } from "../api/deleteRequest.js";
import { getRequest } from "../api/getRequest.js";
import { postRequest } from "../api/postRequest.js";

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

export async function detailsView(context) {
  const houseId = context.params.id;
  const house = await getRequest(`/api/House/${houseId}`);

  const userData = context.user; //localStorage.getItem('authData'));
  let isLoggedin = userData != null;
  console.log('userData ' + userData);

  let isOwner = false;
  let buttonsHTMLResult = html``;

  if (isLoggedin) {
    isOwner = userData.userId == house.ownerId;
    console.log(house)
    console.log(isOwner)
    if (isOwner) {
      buttonsHTMLResult = html`           
      <!--Edit and Delete are only for creator-->
      <div id="action-buttons">
          <a href=${`/house/${house.id}/edit`} id="edit-btn">Edit</a>
         <a @click=${(e) => deleteAction(e, house.id)} href="javascript:void(0)" id="delete-btn">Delete</a>
      </div>`;
    }
  }

  async function deleteAction(event, houseId) {
    event.preventDefault();
    const choice = confirm('Are you sure you want to delete this item?');


    if (choice) {
      await deleteMethod(`/api/house/${houseId}`, userData);
      context.page.redirect('/');
    }
  }

  context.render(detailsTemplate(house, buttonsHTMLResult))
};
