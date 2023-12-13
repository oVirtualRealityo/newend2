/* dit is nog een proces in werking en dient enkel om te shopcart te openen en te laden op pagina's waar geen aside is */
/* MAG GENEGEERD WORDEN, HEEFT GEEN FUNCTIONALITEIT TOT NU TOE BEHALVE OP ASIDELOZE PAGINAS DE PRODUCTEN OPEN EN DICHT DOEN */


const openPopupCart = document.getElementById("popupShoppingCart");
const hiddenPopupCart = document.getElementById("shopCartPopup");
const closePopupShop = document.getElementById("closeShopCart");

/* de button een popup cart laten tonen */
openPopupCart.addEventListener("click", function (e) {
    if (hiddenPopupCart.style.display === "block") {
        hiddenPopupCart.style.display = "none";}
        else { hiddenPopupCart.style.display = "block";}


});
/* de sluitknop een close option geven */
closePopupShop.addEventListener("click", function (e) {
    hiddenPopupCart.style.display = "none";

});

/* hiermee houd ik een totale count bij van de prijzen voor hoeveel en welke items erin zitten */
function totalCountsPopUp(){
    /* de vars voor de counts bij te houden */
    let totalCount = 0;
    let totalAmount = 0;
    /* dan gaan we per item in het karretje kijken en het aabtal + prijs berekenen*/ 
    cart.forEach(function(item) {
        totalCount += item.quantity;
        totalAmount += parseFloat(item.quantity) * parseFloat(item.price);
    let noTaxEvasion = (totalAmount + ((totalAmount/100)*20)).toFixed(2);
    const totalCountEnd = document.getElementById('totalCountPopup');
    const totalPrice = document.getElementById('popupPrice1');
    const totalWithVAT = document.getElementById('totalWithVATPopup');
    totalCountEnd.textContent = '#' + totalCount;
    totalPrice.textContent = '€' + totalAmount;
    totalWithVAT.textContent = '€' + noTaxEvasion;

});
}
/* de remove funtie */
// deze is vrij primitief en maakt weer gebruik van een splice 
function removeSauce(name) {
    for (let i = 0 ; i < cart.length; i++) {
        if (cart[i].name === name)  {cart.splice(i, 1);
            break;
        }
}
/* de console leegmaken en vervolgens alles terug updaten door de showcart functie terug aan te roepen. */
    document.getElementById('totalCountPopup').textContent = '';
    document.getElementById('popupPrice1').textContent = '';
    document.getElementById('totalWithVATPopup').textContent = '';
    document.getElementById('totalCartPrice').textContent = "";
    document.getElementById('totalWithVAT').textContent ="";
    showCartPopUp();
    totalCountsPopUp();
    addTotal();
}