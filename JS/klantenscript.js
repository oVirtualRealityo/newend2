// Functie om de data die we aanroepen te processeren
function processData(users) {
    console.log('Data from API:', users); // de array weergeven op de console voor controle achteraf, als de array geladen wordt en de elementen niet weten we dat het probleem in de functie zit.
    users.forEach(user => {
      const customerContainer = document.getElementById('customerContainer')
    // Hier ga ik de elementen aanmaken voor de personen in op te slaan. deze maken we een article en geven we ineens een classname mee voor manipulatie in css
      const userBox = document.createElement('article');
      let customerList = document.createElement('ul');
      let customerFigure = document.createElement('figure');
      let customerApp = document.createElement('section');
    // De sublistelementen zoals naam, aanspreking , leeftijd etc
      let customerFirstName = document.createElement('li');
      let customerLastName = document.createElement('li');
      let customerAge = document.createElement('p');
      let customerCountry = document.createElement('li');
      let customerTitle = document.createElement('li'); 
      let customerGender = document.createElement('li');
      let customerLocation = document.createElement('p');
      let customerIMG = document.createElement('img');
    // De elementen beginnen "aankleden"
      customerFirstName.textContent =" Voornaam: " + user.name.first;
      customerLastName.textContent ="Achternaam: " + user.name.last;
      // de geboortedatum eruit halen en trimmen: 
      let ageCustomerDate = user.dob.date;
      customerLocation.textContent = "Woonplaats: " + user.location.country  + " , " + user.location.state + " , " + user.location.city;
      ageCustomerDate = ageCustomerDate.substring(0,10);
      customerAge.innerHTML = " Leeftijd: " + parseInt(user.dob.age) + "Jaar " + " | " + " | " + "  Geboren op: " + ageCustomerDate;
      customerCountry.textContent = " Nationaliteit: " + user.nat;
      customerTitle.textContent = "Aanspreektitel: " + user.name.title;
      customerGender.textContent = " Geslacht: " + user.gender;
    // de elementen aan de UL hangen in correcte volgorde
      customerList.appendChild(customerTitle);
      customerList.appendChild(customerFirstName);
      customerList.appendChild(customerLastName);
      customerList.appendChild(customerGender);
      customerList.appendChild(customerCountry);
      
    // de andere elementen finaliseren
      customerIMG.src = user.picture.large;
      customerApp.appendChild(customerAge);
      customerApp.appendChild(customerLocation);
      customerFigure.appendChild(customerIMG);
      // Deze box heeft een classtitel mee voor een grid te definieren voor alles wat we er net hebben ingezet mee weg te werken en te organiseren.
      userBox.classList.add('customer');
      // dan hangen we de volgende elementen eraan: img, ul, p
      userBox.appendChild(customerFigure);
      userBox.appendChild(customerList);
      userBox.appendChild(customerApp); 
    
      // Dan de magische stap: de input inserten in de html. dit gebeurt heel simpel daar aan de container die we eerder hebben verklaard de userBox met dus alle data en elementen in te koppelen aan de html. dit heeft als resultaat dat de eerder gegenereerde UserBox dus voor elk lid dat we specifieren in de api url ingeladen wordt.
      customerContainer.appendChild(userBox);
    });
  
    // Vervolgens log ik op de console hoeveel users er geladen zijn zodat we makkelijk kunnen nakijken of alles werkt.
    console.log('Number of users:', users.length);
  }
  
// de plek van waar ik  de API aanspreek en de aanspreekmethode ik koos voor een http requester , hier slaag ik ook de url op voor gebruiksgemak en overzicht//
  const apiUrl = 'https://randomuser.me/api/?inc=gender,name,location,nat,dob,picture&results=64';
  const xhr = new XMLHttpRequest();
/*Hier ga ik een shorthand gebruiken om typwerk te besparen. xhr = X HTTP Request */ 
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
// de response files die we krijgen in een JSON format parsen zodat we deze makkelijk kunnen uitlezen achteraf, soms komen de files vanaf inkom binnen als json, soms niet vandaar dat ik het zo doe zodat ik deze manier voor elke API kan gebruiken.
        const response = JSON.parse(xhr.responseText);
        const users = response.results; // dan maken we een variabele gebruikers of "users" aan, hierin slagen we de response files op zodat we deze kunnen meegeven als parameter van processData
         
// De functie van hierboven vervolgens aanroepen zodat we de profielen kunnen inladen.
        processData(users);
      } 
// Anders een error bericht inladen. Dit doe ik voorlopig in het nederlands maar ik moet eens navragen of hier een standaard voor is. het internet is verdeeld.      
      else {
        console.error('Verzoek mislukt met als statuss:', xhr.status);
      }
    }
  };
  // de xhttprequest vervolgens aanroepen met een open (GET, de url die we hebben opgeslagen hierboven)), dan stel ik de header in op accept en JSON zodat deze doorgaat en vervolgens versturen we het request
  xhr.open('GET', apiUrl);
  xhr.setRequestHeader('Accept', 'application/json'); // De accept header instellen zoals eerder vermeld
  xhr.send(); // het request verzenden
  