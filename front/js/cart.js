<<<<<<< HEAD
//Je déclare mes variables
let blocItem = document.querySelector("#cart__items"),
    boutonOrder = document.querySelector("#order"), //ko//
    totalPrice = document.querySelector("#totalPrice");

// Je récupèr ge les infos du panier  //
let panier = localStorage.getItem('panier'),
=======
// Je récupère les infos du panier après avoir vérifié s'il était plein ou vide" //
let cart = localStorage.getItem('panier');
>>>>>>> f9254d074ec9faf0ba85a21bd08a76fbcea2180b
    items = [];
console.log(panier);

if (panier!= null){
    items = JSON.parse(panier);
}else{
        console.log(items);
        blocItem.innerHTML += `<h1>est vide<br>:(</h1>`;
    }
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
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`
      });
    });
  }
    getKanap();
    let boutonSupp = document.querySelectorAll(".deleteItem");
      console.log(boutonSupp);
      boutonSupp.forEach( () => {
        console.log('test');
      } );

// Je récupère les données de l'API //
let url='http://localhost:3000/api/products'
fetch(url) // récupère les données contenues dans l'api (ici le catalogue de canapé et leurs détails)
  .then((res) => res.json ())
  .then((lesKanaps) => {
    console.table(lesKanaps);
})

// Je déclare les champs de la page HTML du panier // 
let blocItem = document.querySelector("#cart__items");

blocItem.innerHTML = `<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
<div class="cart__item__img">
  <img src="../images/product01.jpg" alt="Photographie d'un canapé">
</div>
<div class="cart__item__content">
  <div class="cart__item__content__description">
    <h2>Nom du produit</h2>
    <p>Vert</p>
    <p>42,00 €</p>
  </div>
  <div class="cart__item__content__settings">
    <div class="cart__item__content__settings__quantity">
      <p>Qté : </p>
      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
    </div>
    <div class="cart__item__content__settings__delete">
      <p class="deleteItem">Supprimer</p>
    </div>
  </div>
</div>
</article>`
