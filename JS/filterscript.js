// de filterbuttons opzoeken en de "filterbox" de dropdown met de filteropties in 
const openFilter = document.getElementById('openFilter');
const hiddenFilter = document.getElementById('hiddenFilter');


/* nu een functie voor de filterbox */ 
openFilter.addEventListener("click", function (e) {
    // active class aanbrengen zoals labo18 FAQ
    openFilter.classList.toggle("activeSideButton")
    if (hiddenFilter.style.display === "block") {
        hiddenFilter.style.display = "none";}
    else  {
        hiddenFilter.style.display = "block";}
    }
    );

/* we wachten tot alles geladen is voor we de filterchecks uitvoeren */
document.addEventListener("DOMContentLoaded", function() {
    const filterCheckboxes = document.querySelectorAll('input[type="checkbox"]');
    const products = document.querySelectorAll('.product');
/* dubbel nakijken of de pagina laadt met wat er gemarkeerd staat in de checkboxes */
    filterCheckboxes.forEach(function(checkbox) {
        checkbox.addEventListener("change", function() {
            /* de this functie vond ik lastig om te begrijpen maar dit is wel gelukt. Nu vind ik het een extreem handige optie. 
            in dit geval refereert this altijd naar het filterbox en dus ook de value die erin zit waarom effectief de verandering van status gebeurt. 
            die value kunnen we er dan uithalen en opslaan in een variabele Ingridient */
            const ingredient = this.value;
            products.forEach(function(product) {
                /* dan gaan we de meerdere ingridienten per product opzoeken deze slagen we dan op in een variable met als meervouwd "ingridients" 
                deze halen we op door de dataset vanuit de html te koppelen aan deze variabele, eigen creeeren we dus een array van ingridienten per item op de pagina
                dit doen we door ze te splitsen op elke komma, normaal gezien gebruik je hier ook een trim bij maar dit hoeft nu eigenlijk niet omdat ik de spatie meeneem in mijn split
                */
                const ingredients = product.dataset.ingredients.trim(" ").split(', ');
                /* dan gaan we kijken welk product bij welke checkbox hoort */
                if (ingredients.includes(ingredient)) {
                    /* en dan aan en uitzetten volgens de huidige stand van de checkbox: aangevinkt is tonen, afgevinkt is display none */
                    if (checkbox.checked) {
                        product.style.display = "block";
                    } else {
                        product.style.display = "none";
                    }
                }
            });
        });



        /* dit is hoe ik het eerst deed en werkt dus ook als vervanging voor bovenstaande code */
        /* nu heb ik hem echter laten staan zodat u beide manieren kunt beoordelen en tevens deze functie een dubbele check uitvoert. zo zijn we zeker dat als de filters uitgaan enkel
         de sauzen worden getoond die enkel dat bepaalde ingridient hebben, achteraf na een toggle mogen alle sauzen erop komen die dit ingridient bevatten  dus ipv "enkel dit" naar "ook dit"
         dit kunt u testen door alle filters af te zetten behalve 1 normaal krijgt u dan enkel de producten te zien die geen enkel van de andere producten in zich heeft 
         indien u deze dan aan en uit toggelt krijgt u alle producten te zien die deze peper maar ook andere in zich hebben maar niet degene zonder de filterwaarde*/

        let ingredient = checkbox.value;
        products.forEach(function(product) {
            const ingredients = product.dataset.ingredients.split(', ');
            if (ingredients.includes(ingredient)) {
                if (checkbox.checked) {
                    product.style.display = "block";
                } else {
                    product.style.display = "none";
                }
            }
        });
    });
});