const main = document.querySelector('.memory-game');
const gameOver = document.getElementById('gameOver');
const speelNogEenKeer = document.getElementById('playAgain');
const gelukt = document.getElementById('gelukt');
const score = document.getElementById('score');
const scoreSpan = document.getElementById('scoreSpan')

//Spelregels btn
const spelregelsBtn = document.getElementById('spelRegels');
const regels = document.getElementById('regels');
const okeBtn = document.getElementById('oke');

const tijdSelect = document.getElementById('tijd');

let allCards = 0;



//Nu gaan we door de database heenloopen en zoeken we naar matchende nummers
const niveau = document.getElementById('opties');
niveau.addEventListener('change', function(e){
  console.log(e.target.select)
  let aantalKaarten;
  if(e.target.value === 'heelMakkelijk'){
    aantalKaarten = 3;
    localStorage.setItem('niveau', 3)
    // localStorage.setItem('niveau2', 'heelMakkelijk')
    playAgain()
  }else if(e.target.value === 'makkelijk'){
    e.target = 'selected';
    aantalKaarten = 5;
    localStorage.setItem('niveau', 5)
    // localStorage.setItem('niveau2', 'heelMakkelijk')
    playAgain()
  }else if(e.target.value === 'Gemiddeld'){
    aantalKaarten = 8;
    localStorage.setItem('niveau', 8)
    playAgain()
  }else if(e.target.value === 'moeilijk'){
    aantalKaarten = 10;
    localStorage.setItem('niveau', 10)
    playAgain()
  }else if(e.target.value === 'heelMoeilijk'){
    aantalKaarten = 12;
    localStorage.setItem('niveau', 12)
    playAgain()
  }
  console.log(aantalKaarten)
})

function startGame(){
  var aantalKaarten = localStorage.getItem('niveau');
  var tijd = localStorage.getItem('tijd')

  if(!aantalKaarten){
    aantalKaarten = 8
  }

  if(tijd === true){
    tijdSelect.value = 'aan';
  }

  function getDier(){

    //pak acht random nummers
    let randomNumbers = []
    function randomNumber(){
      while(randomNumbers.length < aantalKaarten){
        let number = Math.floor(1 + Math.random() * 25) + 1;
        if(randomNumbers.indexOf(number) === -1) randomNumbers.push(number)
      }
    }
  
    randomNumber()
  
    for(let i = 0; i < randomNumbers.length; i++){
      for(dier of alleDieren){
        if(randomNumbers[i] === dier.id){
          //Als ze matchen, output ze dan twee keer
          const card = `
          <div class="memory-card" data-flag="${dier.naam}">
              <img src="../images/dieren/${dier.foto}" class="front">
              <img src="../images/logo.jpg" class="back">
          </div>
          `
  
          const card2 = `
          <div class="memory-card" data-flag="${dier.naam}">
              <img src="../images/dieren/${dier.foto}" class="front">
              <img src="../images/logo.jpg" class="back">
          </div>
          `
  
          allCards++;
  
          main.innerHTML += card;
          main.innerHTML += card2;
        }
      }
    }
  }
  
  getDier()
}

startGame()


//Nu gaan we het spel zelf maken
const cards = document.querySelectorAll('.memory-card');

function speel(){
  let omgedraaid = false;
  let beveiligBord = false;
  let eersteKaart, tweedeKaart;

  let aantalOmgedraaid = 0;

  let uit = true;
  let timerCount = 20;


  function draaiKaart(){
    if(beveiligBord) return;
  
    if(this === eersteKaart) return;
  
    this.classList.toggle('flip')
  
    if(!omgedraaid){
      omgedraaid = true;
      eersteKaart = this;
      return;
    }
  
    tweedeKaart = this;
    isHetzelfde()
  }
  
  function isHetzelfde(){
    let isZelfde = eersteKaart.dataset.flag === tweedeKaart.dataset.flag;
  
    isZelfde ? isGoed() : isFout();
  }
  
  function isGoed(){
    eersteKaart.removeEventListener('click', draaiKaart)
    tweedeKaart.removeEventListener('click', draaiKaart)

    aantalOmgedraaid++;
    berekenScore()

    if(uit === false){
      timerCount += 3;
    }

    if(allCards === aantalOmgedraaid){
      // pauze = true;
      setTimeout(() => {
        gameOver.classList.remove('gone')
        gelukt.innerHTML = `Gefeliciteerd! Je hebt alle kaarten goed!`
        score.innerHTML = `Je score is: ${aantalOmgedraaid}`
        if(uit === false){
          score.innerHTML = `Je score is: ${aantalOmgedraaid * timerCount}`
        }
        speelNogEenKeer.addEventListener('click', playAgain)
      }, 400);
    }
  
    resetBord()
  }
  
  function isFout(){
    beveiligBord = true;
  
    setTimeout(() => {
      eersteKaart.classList.remove('flip')
      tweedeKaart.classList.remove('flip')
  
      resetBord()
    }, 500);
  }
  
  function resetBord(){
    [omgedraaid, beveiligBord] = [false, false];
    [eersteKaart, tweedeKaart] = [null, null];
  }
  
  //Shuffle de kaarten op het bord
  (function shuffle(){
    cards.forEach(card => {
      let random = Math.floor(Math.random() * 20);
      card.style.order = random;
    })
  })();
  
  //klik functie op elke card
  cards.forEach(card => card.addEventListener('click', draaiKaart))

  //Toon spelregels
  spelregelsBtn.addEventListener('click', () => {
    regels.classList.add('terug')
    gameOver.classList.remove('gone')
    gelukt.innerHTML = 'Pauze';
    pauze = true;
    
    // stopTijd()
  });

  okeBtn.addEventListener('click', () => {
    regels.classList.remove('terug')
    gameOver.classList.add('gone')
    pauze = false;
  })


  //Timer
  tijdSelect.addEventListener('change', e => {
    if(e.target.value === 'aan'){
      regels.classList.remove('terug')
      gameOver.classList.add('gone')
      localStorage.setItem('tijd', true)

      // playAgain()
      uit = false;
      let pauze = false;
      const timer = document.getElementById('timerSpan');
      timer.innerHTML = `${timerCount} seconden`;
    
      setInterval(() => {
        if(!pauze){
          timerCount--;
          timer.innerHTML = `${timerCount} seconden`
          berekenScore()
        }
    
        if(timerCount === 0){
          pauze = true;
          gameOver.classList.remove('gone')
          gelukt.innerHTML = `Helaas, je hebt niet alle kaarten kunnen vinden.`
          score.innerHTML = `Je score is: ${aantalOmgedraaid}`
          speelNogEenKeer.addEventListener('click', playAgain)
        }else if(allCards === aantalOmgedraaid){
          pauze = true;
        }
      }, 1000);
    }else{
      uit = true;
      localStorage.setItem('tijd', false)
    }
  })

  //Bereken de score
  function berekenScore(){
    if(uit === false){
      let aantalScore = aantalOmgedraaid * timerCount;
      scoreSpan.innerHTML = `Score: ${aantalScore}`;
    }else if(uit === true){
      let aantalScore = aantalOmgedraaid;
      scoreSpan.innerHTML = `score: ${aantalScore}`;
    }
  }
}

speel()

//game over
function playAgain(){
  gameOver.classList.add('gone')
  pauze = false;
  location.reload()
}


// const lsTijd = localStorage.getItem('tijd');

// if(lsTijd === true){
//   console.log('aan')
// }else{
//   console.log('uit')
// }




    // function timer(){
    //   const time = localStorage.getItem('tijd')

    //   if(time === true){
    //     uit = false;
    //     let pauze = false;
    //     const timer = document.getElementById('timerSpan');
    //     timer.innerHTML = `${timerCount} seconden`;
      
    //     setInterval(() => {
    //       if(!pauze){
    //         timerCount--;
    //         timer.innerHTML = `${timerCount} seconden`
    //         berekenScore()
    //       }
      
    //       if(timerCount === 0){
    //         pauze = true;
    //         gameOver.classList.remove('gone')
    //         gelukt.innerHTML = `Helaas, je hebt niet alle kaarten kunnen vinden.`
    //         score.innerHTML = `Je score is: ${aantalOmgedraaid}`
    //         speelNogEenKeer.addEventListener('click', playAgain)
    //       }else if(allCards === aantalOmgedraaid){
    //         pauze = true;
    //       }
    //     }, 1000);
    //   }else{
    //     uit = true;
    //     localStorage.setItem('tijd', false)
    // }}