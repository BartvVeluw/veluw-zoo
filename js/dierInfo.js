const main = document.querySelector('main')
const arrowRight = document.getElementById('arrowRight')
const arrowLeft = document.getElementById('arrowLeft')

window.addEventListener('load', () => {

  localStorage.getItem('id')
  const naam = localStorage.getItem('naam')        
  const ras = localStorage.getItem('ras')
  const herkomst = localStorage.getItem('herkomst')
  const continent = localStorage.getItem('herkomstPic')
  localStorage.getItem('herkomstClass')
  const info = localStorage.getItem('herkomstInfo')
  const foto = localStorage.getItem('foto')
  const leeftijd = localStorage.getItem('leeftijd')

  const card = `
  <div id="container">

    <h1>${naam}</h1>

    <div id="fotoText">

    <div id="foto">
      <img src="../images/dierenGroot/${foto}">
    </div>

    <div id="rechts" style="background-image: url(../images/continenten/${continent}")>
      <h2>Ras: ${ras}</h2>
      <h2>Herkomst: ${herkomst}</h2>
      <h3>Word ongeveer ${leeftijd} jaar oud</h3>
    </div>

    </div>

    <div id="info">
      <p>${info}</p>
    </div>

    </div> 
  `


  main.innerHTML = card;

})

arrowRight.addEventListener('click', nextPage);
arrowLeft.addEventListener('click', previousPage);

//Tel het aantal dieren in de database 
let aantalDieren = 0;

  for(dier of alleDieren){
    aantalDieren++;
  }



function getDier(){
 
  const card = `
  <div id="container">

    <h1>${dier.naam}</h1>

    <div id="fotoText">

    <div id="foto">
    <img src="../images/dierenGroot/${foto}">
    </div>

    <div id="rechts" style="background-image: url(../images/continenten/${dier.herkomstPic}")>
      <h2>Ras: ${dier.ras}</h2>
      <h2>Herkomst: ${dier.herkomst}</h2>
      <h3>Word ongeveer ${dier.leeftijd} jaar oud</h3>
    </div>

    </div>

    <div id="info">
      <p>${dier.info}</p>
    </div>

    </div> 
  `
  main.innerHTML = card;

  
}

{/* <img src="../images/dierenGroot/${dier.foto}"></img> */}


//ga naar volgende pagina

function nextPage() {
  let id = localStorage.getItem('id');
  let count = id;
  

  for(dier of alleDieren){
    if(id == dier.id){
      count = dier.id;
      count++;
      localStorage.setItem('id', count)

      for(dier of alleDieren){
        if(count == dier.id){
          getDier()

        }else if(count === aantalDieren +1){
          localStorage.setItem('id', 1)
          count = 1;
          getDier()   
        }
      }  
    }
  }
}

//ga naar vorige pagina
function previousPage(){
  let id = localStorage.getItem('id');
  let count = id;

  for(dier of alleDieren){
    if(id == dier.id){
      count = dier.id;
      count--;

      localStorage.setItem('id', count)

      for(dier of alleDieren){
        if(count == dier.id){
          getDier()
        
        }else if(count === 0){
          localStorage.setItem('id', aantalDieren)
          // let id = localStorage.getItem('id')
          getDier()
        }
      }  
    }
  }
}



