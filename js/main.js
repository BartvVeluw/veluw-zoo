// window.addEventListener('load', () => {
//   logo()
// })

// //logo begin
// const logoStart = document.getElementById('logostart');
// const h1Logo = document.getElementById('h1Logo')
// const start = document.getElementById('logoStart')

// function logo(){
//   const logo = new TimelineMax({delay: 0});

//   logo.from(h1Logo, 1, {y: -200, ease: 'bounce.out'})
//   logo.from(logoStart, 1, {scale: 0})
// }

// setTimeout(() => {
//   const logo = new TimelineMax({delay: 0});

//   logo.to(h1Logo, 0.5, {scale: 0})
//   logo.to(logoStart, 0.5, {x: -720, y: -380, scale: 0.2}, '-=0.5')
//   logo.to(start, 0.5, {alpha: 0})

// }, 3000)


// const card = document.querySelectorAll('.card');
// // const img = document.querySelectorAll('.imgContainer');

// card.forEach(c => {
//   console.log(c)
//   const img = document.querySelectorAll('.imgContainer')

//   c.addEventListener('mouseover', e => {
//     // console.log(e.target)
// console.log(e.target)

//     if(e.target.parentElement.classList.contains('card')){
//       console.log('ja')
//       const force = 50;
//       const dx = -e.clientX / window.innerWidth * force;
//       const dy = -e.clientY / window.innerHeight * force;

//       const image = document.querySelector('imgContainer')
//       image.style.backgroundPositionX = dx + 'px';
//       image.style.backgroundPositionX = dy + 'px';

//     }


//   })
// })

