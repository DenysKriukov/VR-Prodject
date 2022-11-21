// const addNewGame = document.querySelector(".btnAdd");

// const handleaddNewGame = () => {
//    console.log("handleaddNewGame");
// };

// addNewGame.addEventListener('click', handleaddNewGame);


const addGame = document.querySelector(".container-modal-game");
const addNewGameBtn = document.querySelector(".btnAdd");
const closeaddGame = document.querySelector(".container-modal-game");

addNewGameBtn.addEventListener('click', () => {
   addGame.classList.add('open');
})

closeaddGame.addEventListener('click', () => {
   addGame.classList.remove('open');
})
