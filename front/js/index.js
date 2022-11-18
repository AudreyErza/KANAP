// ---------------
// APPEL DE L'API 
// ----------------
let url='http://localhost:3000/api/products'
fetch(url) // récupère les données contenues dans l'api (ici le catalogue de canapé et leurs détails)
  .then((res) => res.json ())
  .then((lesKanaps) => {
    console.table(lesKanaps);
    getKanaps(lesKanaps);
})
  .catch((err) => {console.log="<h1>erreur 404</h1>";
  document.querySelector(".titles").innerHTML = "<h1>Oups, les canapés ont disparu ! </h1>";
})

// ------
// AFFICHAGE DES ELEMENTS 
// ------

function getKanaps(index){
    //je déclare que la zone ou je veux que mes canapés apparaissent s'appelle "blocKanap" et qu'elle correspond à la div qui s'apelle "items" en HTML
    let blocKanaps = document.querySelector("#items");
    // Je récupère les infos du tableau pour les afficher 
    for (let kanap of index) {
    //J'affiche le script html en commentaire dans la page HTML dans un INNER HTML. Je modifie les données 
    //"en dur" par les variables qui correspondent à ce que je vais chercher dans le tableau fourni par l'API. 
        blocKanaps.innerHTML += `<a href="./product.html?id=${kanap._id}">
        <article>
          <img src="${kanap.imageUrl}" alt=${kanap.altTxt}>
          <h3 class="productName">${kanap.name}</h3>
          <p class="productDescription">${kanap.description}</p>
        </article>
      </a>`;
      }
    }
