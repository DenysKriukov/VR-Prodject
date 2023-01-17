// const addNewGame = document.querySelector(".btnAdd");

// const handleaddNewGame = () => {
//    console.log("handleaddNewGame");
// };

// addNewGame.addEventListener('click', handleaddNewGame);

const overlayNewGame = document.querySelector(".overlayNewGame");
const authNewGame = document.querySelector(".newGame");
const addButton = document.querySelector(".btnAdd");
const closeAuthNewGame = document.querySelector(".overlayNewGame");

addButton.addEventListener('click', () => {
   overlayNewGame.classList.add('open');
   authNewGame.classList.add('open');
   scrollController.disabledScroll();
})

closeAuthNewGame.addEventListener('click', () => {
   overlayNewGame.classList.remove('open');
   authNewGame.classList.remove('open');
   scrollController.enabledScroll();
})

// const scrollController = {
//    scrollPosition: 0,
//    disabledScroll () {
//       scrollController.scrollPosition = window.scrollY;
//       document.body.style.cssText = `
//         overflow: hidden;
//         top: -${scrollController.scrollPosition}px;
//         left: 0;
//         height: 100vh;
//         width: 100 vw;
//         padding-right: ${window.innerWidth - document.body.offsetWidth}px;
//       `;
//       document.documentElement.style.scrollBehavior = 'unset';
//    },
//    enabledScroll () {
//       document.body.style.cssText = '';
//       window.scroll({top: scrollController.scrollPosition})
//       document.documentElement.style.scrollBehavior = '';
//    }
// }

document.addEventListener("keydown", function (e) { 
  if (e.key === "Escape" && !auth.classList.contains("add('open')")) {
   overlayNewGame.classList.remove('open');
   authNewGame.classList.remove('open');
   scrollController.enabledScroll();
  }
});
