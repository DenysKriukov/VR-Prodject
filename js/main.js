
AOS.init();

// const headerMobileNav = document.querySelector(".nav-wrap");

// const toggleBurgerMenu = () => {
//     headerMobileNav.classList.toggle("open")
// };

// const toggleBurgerMenu = () => {
//     console. log("123");
// };
const nawWrap = document.querySelector(".nav-wrap");
const navButtonBurger = document.querySelector(".nav-button-burger");


nawWrap.onclick = () => {
    
   nawWrap.classList.toggle('open')
    
}