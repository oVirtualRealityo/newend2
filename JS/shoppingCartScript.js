/* mijn dropdown declareren en open en dicht laten klikken */
const openSearch = document.getElementById('openSearch');
const hiddenSearch = document.getElementById('hiddenSearch');

const openCart = document.getElementById("openCart");
const hiddenCart = document.getElementById("hiddenCart");

const openPopupCart = document.getElementById("popupShoppingCart");
const hiddenPopupCart = document.getElementById("shopCartPopup");
const closePopupShop = document.getElementById("closeShopCart");

/* functie om de searchbar open en dicht te krijgen */
openSearch.addEventListener("click", function (e) {
    // de actieve classe eraan hangen
    openSearch.classList.toggle("activeSideButton")
    if (hiddenSearch.style.display === "block") {
        hiddenSearch.style.display = "none";}
    else  {
        hiddenSearch.style.display = "block";}
}
);

/* functie om de shoppingcart open of dicht te doen */
openCart.addEventListener("click", function (e) {
    /* de activeclass toevoegen zoals in labo 18 */
    openCart.classList.toggle("activeSideButton")

    if (hiddenCart.style.display === "block") {
        hiddenCart.style.display = "none";}
    else  {
        hiddenCart.style.display = "block";}
}
);


openPopupCart.addEventListener("click", function (e) {
    if (hiddenPopupCart.style.display === "block") {
        hiddenPopupCart.style.display = "none";}
        else { hiddenPopupCart.style.display = "block";}


});

closePopupShop.addEventListener("click", function (e) {
    hiddenPopupCart.style.display = "none";

});
/* nu de shoppingcart , de content zoeken en toevoegen doormiddel van js en functies */

/*eerst ga ik een plek maken om mijn items in te zetten, een lijstje */
let cart =[];

/* voor elke button de event listener en variabelen op voorhand laten vastzetten */
const buyButtons = document.querySelectorAll('.buyButton');

/* dit is een manier die ik persoonlijk het overzichtelijkste vind */
/* een functie om door elke button met deze tag te gaan vervolgens op elke button de listener zetten*/
buyButtons.forEach(function(button){
    button.addEventListener("click", function(e){
        /* de productdetails voor elke button oproepen */
        let product = e.target.closest(".product"); /* dit stelt de parent in, zodat de volgende "let's" weten waar ze hun data moeten halen */
        let productName = product.querySelector("h3").textContent; /* de sausnaam uit de html halen */
        let productImage = product.querySelector("img"); /* zo kunnen we eventueel de foto nog gebruiken */
        let amountItems =  parseInt(product.querySelector(".bottleCountNumber").value);

        let productPrice = parseFloat(product.querySelector('.priceValue').textContent.replace(",",".")); /* zo hebben we meteen de prijs zonder al teveel gedoe */


        addToCart(productName, productPrice, productImage, amountItems); /* dit voegt het item toe aan het mandje indien nodig */
        totalCounts();
        totalCountsPopUp();
        addTotal();
        
    });
});

/* vervolgens moet ik de add to cart functie uitbreiden. dit zoals we geleerd hebben in labo016 ik wil een hoeveelheid dat hij weergeeft.
dit kan ik doen door een vaste waarde van 1 te geven. eerst schrijf ik straks een loop die nagaat of het item al in het mandje zit
indien dit het geval is gaat de count ++ indien niet word de eerste count 1
graag zou ik ook willen dat de prijs actueel blijft, dus indien je 2 sauzen koopt gaat de prijs naar 2 flesjes
dit is gemakkelijk met Aantal Items X prijs Item */
function addToCart(name, price, image, quantity) {
    let ItemInCartIndex = -1; // een indexnotatie die ik zo nog nodig heb. dit om de true value te bepalen in de array

    for (let i = 0; i < cart.length; i++) {
        if (cart[i].name === name) {
            ItemInCartIndex = i; 
            break;
        }
    }

    if (ItemInCartIndex !== -1) {
        cart[ItemInCartIndex].quantity += quantity;
        /* als het product al voorkomt doen we er eentje bij */
    }    
    else {
        cart.push({image: image, name: name, price: price , quantity: quantity});
        /* product toevoegen met naam prijs en aantal */
    }
    showCart();
    showCartPopUp();
}
    /* onze shopping cart zoeken en het element aanspreken om te inserten */
    function showCart() {
    const myShoppingCart = document.getElementById('myShoppingCart');
    /* de html resetten */
    myShoppingCart.innerHTML = '';
    /* toevoegen aan de display door een nieuw element te creeeren */
    cart.forEach(function(item) {
        let newRow = myShoppingCart.insertRow(-1);

        let picColumn = newRow.insertCell(0);
        let nameColumn = newRow.insertCell(1);
        let AmountColumn = newRow.insertCell(2);
        let priceColumn = newRow.insertCell(3);
        let remove = newRow.insertCell(4);

        let minusButton = document.createElement('button');
        minusButton.classList.add('removeButton');
        minusButton.addEventListener('click', function () {
            removeSauce(item.name); 
        
        });
       

        /* box creeeren voor de afbeelding in te gooien */
        let smallPic = document.createElement('img');
        smallPic.src = item.image.src;
        smallPic.alt = item.image.alt;
        smallPic.style.width = '60px';
        smallPic.style.height = 'auto';
        smallPic.style.margin = '0PX';
        smallPic.style.border = '2px solid yellow';
        smallPic.style.borderRadius = '50%'

        /* de cellen hun waardes geven */
        picColumn.appendChild(smallPic);
        nameColumn.textContent = item.name;
        AmountColumn.textContent = item.quantity;
        priceColumn.textContent = '€' + (item.price * item.quantity).toFixed(2);
        remove.appendChild(minusButton);
        

    });


}

/* functie voor de totale prijs en aantallen */
function totalCounts(){
    /* de vars voor de counts bij te houden */
    
    let totalAmount = 0;
    /* dan gaan we per item in het karretje kijken */ 
    cart.forEach(function(item) {
        totalAmount += parseFloat(item.quantity) * parseFloat(item.price);
    let noTaxEvasion = (totalAmount + ((totalAmount/100)*20)).toFixed(2);
    const totalPrice = document.getElementById('totalCartPrice');
    const totalWithVAT = document.getElementById('totalWithVAT');
    totalPrice.textContent = '€' + totalAmount;
    totalWithVAT.textContent = '€' + noTaxEvasion;
});
    
}
/* en nog eentje voor de popupcart */ 
/* deze is ook herschreven met dezelfde stijl en andere parameters */
function totalCountsPopUp(){
    /* de vars voor de counts bij te houden */
    let totalCount = 0;
    let totalAmount = 0;
    /* dan gaan we per item in het karretje kijken */ 
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


/* een functie voor de removebutton */
function removeSauce(name) {
    for (let i = 0 ; i < cart.length; i++) {
        if (cart[i].name === name)  {cart.splice(i, 1);
            break;
        }
}
    document.getElementById('totalCountPopup').textContent = '';
    document.getElementById('popupPrice1').textContent = '';
    document.getElementById('totalWithVATPopup').textContent = '';
    document.getElementById('totalCartPrice').textContent = "";
    document.getElementById('totalWithVAT').textContent ="";
    showCart();
    showCartPopUp();
    totalCountsPopUp();
    totalCounts();
    addTotal();
}

/* de functie van de popup shopcart, deze kan ik in se gewoon hergebruiken mits ik enkele parameters aanpas */

function showCartPopUp() {
    const myShoppingCart = document.getElementById('myShoppingCartPopup');
    /* de html resetten */
    myShoppingCart.innerHTML = '';
    /* toevoegen aan de display door een nieuw element te creeeren */
    cart.forEach(function(item) {
        let newRow = myShoppingCart.insertRow(-1);

        let picColumn = newRow.insertCell(0);
        let nameColumn = newRow.insertCell(1);
        let AmountColumn = newRow.insertCell(2);
        let priceColumn = newRow.insertCell(3);
        let remove = newRow.insertCell(4);

        let minusButton = document.createElement('button');
        minusButton.classList.add('removeButton');
        minusButton.addEventListener('click', function () {
            removeSauce(item.name);
            showCartPopUp();
          
        });
        totalCountsPopUp();

        /* box creeeren voor de afbeelding in te gooien */
        let smallPic = document.createElement('img');
        smallPic.src = item.image.src;
        smallPic.alt = item.image.alt;
        smallPic.style.width = '60px';
        smallPic.style.height = 'auto';
        smallPic.style.margin = '0PX';
        smallPic.style.border = '2px solid yellow';
        smallPic.style.borderRadius = '50%'

        /* de cellen hun waardes geven */
        picColumn.appendChild(smallPic);
        nameColumn.textContent = item.name;
        AmountColumn.textContent = item.quantity;
        priceColumn.textContent = '€' + (item.price * item.quantity).toFixed(2);
        remove.appendChild(minusButton);
        

    });


}
/* dit is een extratje om te laten zien in de header hoeveel items er in het mandje zitten */
function addTotal() {
    let countBox = document.getElementById('cartCounter');
    let total = 0;
    cart.forEach(function(item) {
        total += item.quantity;

    });
    countBox.textContent = "";
    countBox.textContent = total;
}