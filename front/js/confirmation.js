const orderId = new URL(window.location.href).searchParams.get("order")
document.getElementById("orderId").innerHTML= orderId
localStorage.removeItem("panier")