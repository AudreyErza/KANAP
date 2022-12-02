const urlPage = new URLSearchParams(window.location.search),
      ID= urlPage.get("id")
      url=`http://localhost:3000/api/products/${ID}`

//déclaration des différents champs
    const kanapName = document.querySelector("#title"),
        kanapPrice = document.querySelector("#price"),
        imgKanap = document.querySelector(".item__img"),
        descKanap = document.querySelector("#description"),
        colorKanap = document.querySelector("#colors");
        kanapQuantity = document.querySelector("#quantity");
        
        
// ---------------
// APPEL DE L'API 
// ----------------

let getKanap = function () {
fetch(url) // récupère les données contenues dans l'api (ici le catalogue de canapé et leurs détails)
  .then((response) => response.json ())
  .then((kanap) => {
    console.table(kanap);

    // Affichage des infos dans chaque champ
        kanapName.innerHTML = kanap.name;
        kanapPrice.innerHTML = kanap.price;
        imgKanap.innerHTML = `<img src="${kanap.imageUrl}" alt="Photographie d'un canapé">`;
        descKanap.innerHTML = kanap.description;
        
        kanap.colors.forEach(color =>{
          const option = document.createElement('option')
          option.innerHTML = color;
          option.value = color;
          colorKanap.appendChild(option)
        });
// Déclaration du bouton et ajout d'un événement au click sur le bouton //

let boutonAjout = document.querySelector('#addToCart'),
msgTest = "Test bouton";

boutonAjout.addEventListener('click',()=> {addPanier({id:ID,"color":colorKanap.value,"quantity":kanapQuantity.value})});
        });
      }
getKanap();



// // Sauvegarde du panier // 

function savePanier (panier) {
  localStorage.setItem('panier',JSON.stringify(panier));
}
//Récupération du panier//
function getPanier() {
  let panier = localStorage.getItem('panier');
  if(panier == null){
    return [];
  }else{
      return JSON.parse(panier);
}
}

// Ajout au panier //
function addPanier(item){
  if (kanapQuantity.value<=0 || kanapQuantity.value>100 || colorKanap.value == ''){
    alert('Merci de selectionner une couleur et de vérifier que la quantité à ajouter est comprise entre 0 et 100.');
  } else {
  getPanier();
  let panier = getPanier();
  let produitExistant = panier.find(p => p.id == item.id && p.color == item.color);
  if (produitExistant != undefined){
    produitExistant.quantity = parseInt(produitExistant.quantity);
    item.quantity = parseInt(item.quantity);
    produitExistant.quantity += item.quantity; 
    if(produitExistant.quantity>100){
      alert('La quantité maximale de produit est de 100');
    }else{
      savePanier(panier);
    }
  } else {
    panier.push(item);
    savePanier(panier);
    }
  }
}

