/* een array aanmaken om de wishlist items in te storen */
const wishlist= [];

/* de wishlistbuttons verzamelen */
let wishlistButtons = document.querySelectorAll('.addToWishlist');
/* dan gaan we per geklikte button een basisfunctie uitvoeren */
wishlistButtons.forEach(function(button, index){
    button.addEventListener('click', function(e) {
        /* het bijhoorende product opslaan doormiddel van een.target.closest en dan de productclasse zo kunnen we de waardes eruit halen die erbij horen, op die manier werken we zeker in de juiste productcontainer*/
        let parentProduct = e.target.closest('.product');
        let wishlistIMG = parentProduct.querySelector('.wishlistIMG');
        /* als deze al in wishlist staat terug uit de lijst halen */
        if (wishlist.includes(index)) {
            let sauceIndex = wishlist.indexOf(index);
            wishlist.splice(sauceIndex, 1);
            wishlistIMG.classList.remove('active2');
        }
        /* indien de saus niet in de array zit dan voegen we deze toe en zetten we het icon op display block doormiddel van de class toe te voegen. */
        else {
            wishlist.push(index);
            wishlistIMG.classList.add('active2');
        }
        /* nakijken of alles correct gelogged wordt */
      //  console.log(wishlist); 
    }); 
});
