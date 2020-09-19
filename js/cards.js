const main = document.querySelector('main');
const search = document.getElementById('search');
const filter = document.getElementById('filter');
const toggleMenu = document.getElementById('toggleMenu');
const menuGone = document.getElementById('menuGone');

const selectHerkomst = document.querySelectorAll('.continetenLabel');
const selectSoort = document.getElementById('selectSoort');
// const selectHerkomst = document.getElementById('selectHerkomst');
const emptySearch = document.getElementById('emptySearch');
const arrowTop = document.getElementById('arrowUp')

const taal = document.getElementById('taal');

const nextPage = document.getElementById('nextPage')



let aantalDieren = 0;
//Haal alle kaarten op
function toonDieren(){

  for(dier of alleDieren){
    aantalDieren++;

    const card = document.createElement('div');

    card.classList.add('card')
    card.classList.add(`${dier.ras}`)
    card.classList.add(`${dier.herkomstClass}`)
    card.classList.add(`${dier.id}`)

    card.innerHTML = `
    <div class="cardImg">
    <img src="../images/dieren/${dier.foto}" alt="${dier.naam}">
    </div>
      <h2 class="dierenNaam">${dier.naam}</h2>
    <div class="dierenSoort dierInfo">
      <h3>Soort:</h3>
      <h3 class="dierenNaam">${dier.ras}</h3>
    </div>
    <div class="dierenHerkomst dierInfo">
      <h3>Herkomst:</h3>
      <h3 class="dierenNaam">${dier.herkomst}</h3>
    </div>
    <div class="herkomstPic">
      <img src="../images/continenten/${dier.herkomstPic}">
    </div>
    <button class="animalOverlay" id=${dier.id}>
      Meer Info
    </button>
    </div>
    `

    //click event voor kaarten en naam uispraak
    card.addEventListener('click', (e) => {
      if(e.target.classList.contains('card')){

        const box = e.target;
        const text = box.querySelector('h2').textContent;
        setTextMessage(text)
        speakText()

      }else if(e.target.parentElement.classList.contains('card')){

        const box = e.target.parentElement;
        const text = box.querySelector('h2').textContent;
        setTextMessage(text)
        speakText()

      }else if(e.target.parentElement.parentElement.classList.contains('card')){

        const box = e.target.parentElement.parentElement;
        const text = box.querySelector('h2').textContent;
        setTextMessage(text)
        speakText()

      }
    })

    main.appendChild(card)
  }
}

toonDieren()


// singleCard.forEach(item => {
//   item.addEventListener('mouseover', function(e){
//     if(e.target.classList.contains('card') || e.target.parentElement.classList.contains('card')){
//       const image = item.children[1];
//       image.classList.toggle('toggleImg')
//     }
//   })
// })


//Toggle filter div
filter.addEventListener('click', () => {
  toggleMenu.classList.toggle('toggle')
})
menuGone.addEventListener('click', () => {
  toggleMenu.classList.toggle('toggle')
})

//Zoek dieren via zoekbalk
search.addEventListener('input', (e) => {
  const textInput = e.target.value.toUpperCase();
  const cards = document.querySelectorAll('.card');


  cards.forEach(card => {
    const titel = card.querySelector('.dierenNaam').innerText.toUpperCase();

    if(card.classList.contains('cardGone')){
      card.classList.remove('cardGone')
    }else if(card.classList.contains('herkomstGone')){
      card.classList.remove('herkomstGone')
    }

    selectHerkomst.value = 'Alle';
    selectSoort.value = 'Alle';

    if(titel.indexOf(textInput) > -1){
      card.classList.remove('cardGone')
    }else{
      card.classList.add('cardGone')
    }
  })
})



function zoekDieren(){
//filter per soort
selectSoort.addEventListener('change', (e) => {
  const singleCard = document.querySelectorAll('.card')  

  toggleMenu.classList.toggle('toggle')

    singleCard.forEach(card => {

      if(e.target.value === 'Alle'){
        if(card.classList.contains('cardGone')){
          card.classList.remove('cardGone')
          card.classList.remove('herkomstGone')
        }
      }else if(!card.classList.contains(e.target.value)){
        card.classList.add('cardGone');
      }else{
        card.classList.remove('cardGone');
      }
    })
})




// Filter per herkomst
selectHerkomst.forEach(label => {
  
  label.addEventListener('change', (e) => {

    const singleCard = document.querySelectorAll('.card');
  
    toggleMenu.classList.toggle('toggle')
  
    singleCard.forEach(card => {
      
      if(e.target.value === 'Alle'){
        if(card.classList.contains('herkomstGone')){
          card.classList.remove('herkomstGone')
          }
        }else if(!card.classList.contains(e.target.value)){
          card.classList.add('herkomstGone');
        }else{
          card.classList.remove('herkomstGone');
      }
    })
  })

})
}


zoekDieren()

taal.addEventListener('change', () => {
  toggleMenu.classList.toggle('toggle')
})


//Hover over kaart en krijg meer info
const singleCard = document.querySelectorAll('.card');


singleCard.forEach(card => {

  card.addEventListener('mouseover', e => {
    if(e.target.classList.contains('card')){

      const box = e.target;
      const btn = box.querySelector('button')
      btn.style.left = 0;

    }else if(e.target.parentElement.classList.contains('card')){

      const box = e.target.parentElement;
      const btn = box.querySelector('button')
      btn.style.left = 0;

    }else if(e.target.parentElement.parentElement.classList.contains('card')){

      const box = e.target.parentElement.parentElement;
      const btn = box.querySelector('button')
      btn.style.left = 0;

    }
  })

  card.addEventListener('mouseout', e => {
    if(e.target.classList.contains('card')){

      const box = e.target;
      const btn = box.querySelector('button')
      btn.style.left = '-200px';

    }else if(e.target.parentElement.classList.contains('card')){

      const box = e.target.parentElement;
      const btn = box.querySelector('button')
      btn.style.left = '-200px';

    }else if(e.target.parentElement.parentElement.classList.contains('card')){

      const box = e.target.parentElement.parentElement;
      const btn = box.querySelector('button')
      btn.style.left = '-200px';

    }
  })
})

//Klik op meer info en ga naar nieuwe pagina
const overlay = document.querySelectorAll('.animalOverlay')
overlay.forEach(over => {
  over.addEventListener('click', e => {

    //Stuur data naar volgende pagina
    for(dier of alleDieren){
      if(e.target.id == dier.id){
        

        localStorage.setItem('id', dier.id);
        localStorage.setItem('naam', dier.naam)

        localStorage.setItem('ras', dier.ras)
        localStorage.setItem('herkomst', dier.herkomst)
        localStorage.setItem('herkomstPic', dier.herkomstPic)
        localStorage.setItem('herkomstClass', dier.herkomstClass)
        localStorage.setItem('herkomstInfo', dier.info)
        localStorage.setItem('foto', dier.foto)
        localStorage.setItem('leeftijd', dier.leeftijd)

        window.open('dierInfo.html', '_self')
      }
    }

  })
})


//Kijk if alle kaarten zichtbaar zijn of niet en output text
  window.onchange = function(){ 



    let aantal = 0;
    const singleCard = document.querySelectorAll('.card');

    singleCard.forEach(card => {
      if(card.classList.contains('cardGone') || card.classList.contains('herkomstGone')){
        //Voeg het aantal kaarten met display none in de aantal variabele
        aantal++
      }
    })


    //De volgende code zorgt ervoor dat de DOM weet welke value van de radio buttons word ingevoerd. Deze value word daarna gebruikt om de juiste text te outputten. 
    const input = document.querySelectorAll('input')
    let selected;

    input.forEach(e => {
      if(e.checked){
        selected = e.value;
      }
      return selected;
    })

    //Kijk of het aantalDieren variabelen macht met het aantal kaarten dat display none heeft
    if(aantalDieren === aantal){

      if(selected === 'Oceaan'){
        emptySearch.innerHTML = `<h1>Geen resultaten voor ${selectSoort.value} in de ${selected}</h1>`
      }else if(selected === 'zuidAmerika'){
        emptySearch.innerHTML = `<h1>Geen resultaten voor ${selectSoort.value} in Zuid Amerika</h1>`
      }else if(selected === 'noordAmerika'){
        emptySearch.innerHTML = `<h1>Geen resultaten voor ${selectSoort.value} in Noord Amerika</h1>`
      }else if(selected === 'middenAmerika'){
        emptySearch.innerHTML = `<h1>Geen resultaten voor ${selectSoort.value} in Centraal Amerika</h1>`
      }else{
        emptySearch.innerHTML = `<h1>Geen resultaten voor ${selectSoort.value} in ${selected}</h1>`
      }
    }else{
      emptySearch.innerHTML = 'Klik op een dier..';
    }
  }

//Link naar top page btn
arrowTop.addEventListener('click', () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
})


//Beweeg de kaarten (tilt.js)
VanillaTilt.init(document.querySelectorAll(".card"), {
  max: 15,
  speed: 800
});



//Web Speech API

const message = new SpeechSynthesisUtterance();

//Store Voices
let voices = []


function getVoices(){
  voices = speechSynthesis.getVoices();

  voices.forEach(voice => {
    const option = document.createElement('option');

    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;

    taal.appendChild(option)    
  })  
}

//set text
function setTextMessage(text){
  message.text = text;
}

//speak text
function speakText(){
  speechSynthesis.speak(message)
}

//Voices change
speechSynthesis.addEventListener('voiceschanged', getVoices)

taal.addEventListener('change', (e) => {
  message.voice = voices.find(voice => voice.name === e.target.value)
})

getVoices()

