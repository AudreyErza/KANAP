//Je déclare mes variables
let blocItem = document.querySelector("#cart__items"),
    boutonOrder = document.querySelector("#order"),
    displayPrice = document.querySelector("#totalPrice"),
    displayQuantity = document.querySelector("#totalQuantity");

// Je récupèr ge les infos du panier  //
let panier = localStorage.getItem('panier'),
    items = [];

if (panier!= null){
    items = JSON.parse(panier);
}
if(items.length < 1){ 
  blocItem.innerHTML = '<h1>est vide ! <br> :( </h1>';}
  
// Je récupère les données de l'API //
let getKanap = function () {
  fetch('http://localhost:3000/api/products')
    .then((response) => response.json ())
    .then((kanap) => {
      items.forEach(element => {
        let product = kanap.find(p => p._id == element.id);
        blocItem.innerHTML += `<article class="cart__item" data-id="${product._id}" data-color="${element.color}">
        <div class="cart__item__img">
          <img src="${product.imageUrl}" alt="${product.altTxt}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${product.name}</h2>
            <p>${element.color}</p>
            <p>${product.price}€</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté :</p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${element.quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`;

      let boutonSupp = document.querySelectorAll(".deleteItem");
      boutonSupp.forEach( (delBtn,i) => {
        delBtn.addEventListener("click",() => {
          items.splice(i,1);
          localStorage.setItem('panier',JSON.stringify(items));
          blocItem.innerHTML = '';
          getKanap();
          if(items.length < 1){ 
            blocItem.innerHTML = '<h1>est vide ! <br> :( </h1>';
          }          
        })
      } );
      let change = document.querySelectorAll(".itemQuantity");
        change.forEach((chgBtn,i) => {chgBtn.addEventListener("change",() => {
          console.log(items[i].quantity); // Quantité déja présente dans le panier 
          console.log(chgBtn.value); // Nouvelle quantité 
          items[i].quantity = chgBtn.value;
          localStorage.setItem('panier',JSON.stringify(items));
          blocItem.innerHTML = '';
          getKanap();   
        })
      });      
    })
    let totalPrice =0;
    let totalQuantity =0;
    items.forEach((element)=> {
      let product = kanap.find(p => p._id == element.id);
      let totalArticle = product.price*element.quantity;
      totalPrice += totalArticle;
      totalQuantity += parseInt(element.quantity);
    })
    displayPrice.innerHTML= totalPrice;
    displayQuantity.innerHTML = totalQuantity;

  })
}
    getKanap();

//  //form fictif//


// déclaration des variables du formulaire // 
let products = [];
const btnfirstName = document.getElementById("firstName"),
      regexFirstName = /[A-Za-z]{2,25}/,
      firstNameErrorMsg = document.getElementById("firstNameErrorMsg"),
      //lastName//
      btnlastName = document.getElementById("lastName"),
      regexlastName = /[A-Za-z]{2,25}/,
      lastNameErrorMsg = document.getElementById("lastNameErrorMsg"),
      //adress//
      btnAddress = document.getElementById("address"),
      regexAddress = /[A-Za-z]{2,25}/,
      addressErrorMsg = document.getElementById("addressErrorMsg"),
      //city//
      btncity = document.getElementById("city"),
      regexcity = /[A-Za-z]{2,25}/,
      cityErrorMsg = document.getElementById("cityErrorMsg"),
      //email//
      btnEmail = document.getElementById("email"),
      regexEmail = /^(?:(?:[\w`~!#$%^&*\-=+;:{}'|,?\/]+(?:(?:\.(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?\/\.()<>\[\] @]|\\"|\\\\)*"|[\w`~!#$%^&*\-=+;:{}'|,?\/]+))*\.[\w`~!#$%^&*\-=+;:{}'|,?\/]+)?)|(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?\/\.()<>\[\] @]|\\"|\\\\)+"))@(?:[a-zA-Z\d\-]+(?:\.[a-zA-Z\d\-]+)*|\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])$/,
      emailErrorMsg = document.getElementById("emailErrorMsg");

let   checkFirstName = false,
      checklastName = false,
      checkAddress = false,
      checkCity = false,
      checkEmail = false;



btnfirstName.addEventListener("keypress",(p) => {
  p = regexFirstName.test(btnfirstName.value);
  firstNameErrorMsg.innerHTML = p ? "" : "Merci de saisir le nom"
  checkFirstName = p? true : false 
})
btnlastName.addEventListener("keypress",(p) => {
  p = regexlastName.test(btnlastName.value);
  lastNameErrorMsg.innerHTML = p ? "" : "Merci de saisir le nom"
  checklastName = p? true : false 
})
btnAddress.addEventListener("keypress",(p) => {
  p = regexAddress.test(btnAddress.value);
  addressErrorMsg.innerHTML = p ? "" : "Merci de saisir l'adresse"
  checkAddress = p? true : false 
})
btncity.addEventListener("keypress",(p) => {
  p = regexcity.test(btncity.value);
  cityErrorMsg.innerHTML = p ? "" : "Merci de saisir la ville"
  checkCity = p? true : false 
})
btnEmail.addEventListener("keypress",(p) => {
  p = regexEmail.test(btnEmail.value);
  emailErrorMsg.innerHTML = p ? "" : "Merci de saisir une adresse e-mail"
  checkEmail = p? true : false 
})
      //Validation du formulaire//
      boutonOrder.addEventListener("click",(order) => {
        order.preventDefault();
        if (checkFirstName) {         
      let contact ={
          firstName: firstName.value,
          lastName: lastName.value,
          address: address.value,
          city: city.value,
          email: email.value,}
          // Pousser dans le tableau les IDS du localStorage avec une boucle //
          for(i of items){          
            // console.log(i.id)
            products.push(i.id);
            // console.log(products);
            // console.log(contact);
          }
          let response = fetch('http://localhost:3000/api/products/order', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ contact, products })
          })
          .then((response) => response.json ())
          .then((data) => {
          window.location.href = `confirmation.html?order=${data.orderId}`
        })
        }else{
          alert("Merci de compléter le formulaire");
        };
      });

