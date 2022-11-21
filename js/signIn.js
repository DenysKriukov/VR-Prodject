// const signInButton = document.querySelector(".nav-btnSign-in");

// const handleSignIn = () => {
//    console.log("handleSignIn");
// };

// signInButton.addEventListener('click', handleSignIn);


// const singIn = document.querySelector(".container-modal");
// const signInButton = document.querySelector(".nav-btnSign-in");

// signInButton.onclick = () => {

//    singIn.classList.toggle('open')

// }


const singIn = document.querySelector(".container-modal");
const signInButton = document.querySelector(".nav-btnSign-in");
const closeSingIn = document.querySelector(".container-modal");

signInButton.addEventListener('click', () => {
   singIn.classList.add('open');
})

closeSingIn.addEventListener('click', () => {
   singIn.classList.remove('open');
})
