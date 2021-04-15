const fetch = require('sync-fetch');
const Page = require("./_layout/Default");

module.exports = class extends Page {
    constructor(){
        super({title:"Home", sName:"Nguyen Ha Dao"});
    }
    render(sPage) {
        const oJson = fetch("https://mobile-app-d181c-default-rtdb.firebaseio.com/meals.json").json();
        console.log(oJson);
        let sResult = "<h1>Upcoming Popup Meals</h1>";
        Object.keys(oJson).map((key) => {
            const oEntity = oJson[key];
            oEntity.id = key;
            sResult += `
            <h2>${oEntity.title}</h2>
            <p><img width="400" height="320" src="${oEntity.featured_image}" alt="${oEntity.title}"</p>
            <p>${oEntity.full_description}</p>
            <p style="color:green">Date of event: ${oEntity.date_of_event}</p>
            <p style="color:green">Location: ${oEntity.location}</p>
            <p style="color:red">Price: ${oEntity.price}</p>
            <form action="https://sms-popup-restaurants.herokuapp.com/payment/" method="post">
            <input type="hidden" name="title" id="title" value="${oEntity.title}" />
            <input type="hidden" name="price" id="price" value="${oEntity.price}" />
            <input type="tel" name="tel" id="tel" placeholder="enter your number" />
            <button type="submit">Order now</button>
            </form>
            `;
        });
        return sResult;
    }
}