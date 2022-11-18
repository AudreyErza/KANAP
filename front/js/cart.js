// Je récupère les infos du panier après avoir vérifié s'il était plein ou vide" //

let cart = localStorage.getItem('panier');
    items = [];
console.log(cart);

if (cart != null){
    items = JSON.parse(cart);
}else{
        console.log(items);
    }

// Je déclare les champs de la page HTML du panier // 
let kanapName = document.querySelector("#title"),
    kanapPrice = document.querySelector("#price"),
    imgKanap = document.querySelector(".item__img"),
    descKanap = document.querySelector("#description"),
    colorKanap = document.querySelector("#colors");
    kanapQuantity = document.querySelector("#quantity");