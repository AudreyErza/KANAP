// Je récupère les infos du panier après avoir vérifié s'il était plein ou vide" //
let cart = localStorage.getItem('panier');
    items = [];
console.log(cart);

if (cart != null){
    items = JSON.parse(cart);
}else{
        console.log(items);
    }

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