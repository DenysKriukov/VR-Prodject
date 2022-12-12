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


const overlay = document.querySelector(".overlay");
const auth = document.querySelector(".authorization");
const signInButton = document.querySelector(".nav-btnSign-in");
const closeSingIn = document.querySelector(".overlay");

signInButton.addEventListener('click', () => {
   overlay.classList.add('open');
   auth.classList.add('open');
   scrollController.disabledScroll();
})

closeSingIn.addEventListener('click', () => {
   overlay.classList.remove('open');
   auth.classList.remove('open');
   scrollController.enabledScroll();
})


const scrollController = {
   scrollPosition: 0,
   disabledScroll () {
      scrollController.scrollPosition = window.scrollY;
      document.body.style.cssText = `
        overflow: hidden;
        top: -${scrollController.scrollPosition}px;
        left: 0;
        height: 100vh;
        width: 100 vw;
        padding-right: ${window.innerWidth - document.body.offsetWidth}px;
      `;
      document.documentElement.style.scrollBehavior = 'unset';
   },
   enabledScroll () {
      document.body.style.cssText = '';
      window.scroll({top: scrollController.scrollPosition})
      document.documentElement.style.scrollBehavior = '';
   }
}



document.addEventListener("keydown", function (e) { 
  if (e.key === "Escape" && !auth.classList.contains("add('open')")) {
   overlay.classList.remove('open');
   auth.classList.remove('open');
   scrollController.enabledScroll();
  }
});