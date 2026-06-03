import { userMiddleware } from "./middlewares/userMiddleware.js";
import { render, page } from "./utils/library.js";
import { homeView } from "./views/homeView.js";
import {  houseAddView } from "./views/houseAddView.js";
import { detailsView } from "./views/houseDetailsView.js";
import { houseEditView } from "./views/houseEditView.js";
import { housesAllView } from "./views/housesAllView.js";
import { loginView } from "./views/loginView.js";
import { logoutView } from "./views/logoutView.js";
import { navigationView } from "./views/navigationView.js";
import { registerView } from "./views/registerView.js";

const mainElement = document.querySelector('main');

const insertContext = function(context, next){
    context.render = (content) => render(content, mainElement);
    next();
};

page(insertContext);
page(userMiddleware);
page(navigationView);
page('/', homeView);
page('/login', loginView);
page('/logout', logoutView);
page('/register', registerView);
page('/house/all',housesAllView)
page("/house/:id/details", detailsView);
page("/house/add",houseAddView);
page("/house/:id/edit",houseEditView);


page.start();
