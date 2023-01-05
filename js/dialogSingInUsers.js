import { USERS } from "../mocks/users.js"


const elementBody = document.querySelector("body");
const auth = document.querySelector(".authorization");
const signInFormBtn = document.querySelector(".modal-SignIn");
const authedHeader = document.querySelector(".authed-header");
const headerNavBtn = document.querySelector(".nav-btnSign-in");
const overlay = document.querySelector(".overlay");
const logOutBtn = document.querySelector(".log-out-btn");
const userMenu = document.querySelector(".authed-header-menu-wrap");
const signInEmail = document.getElementById("sign-in-email");
const signInPassword = document.getElementById("sign-in-password");
// const paginationList = document.querySelector(".pagination");
// const contentEmptyGames = document.querySelector(".empty-games-wrap");
// const gamesHeader = document.querySelector(".games-header");
// const contentGamesSection = document.querySelector(".games-section");
const signInButton = document.querySelector(".nav-btnSign-in");

// switch empty games to gamesHeader and pagination
// const checkEmptyGames = () =>{
//     const loggedUser = JSON.parse(localStorage.getItem("user"));
//     const gamesInLocalStorage = JSON.parse(localStorage.getItem("card"));

//     if(loggedUser != null){
//         paginationList.style.display = "flex";
//         contentEmptyGames.style.display = "none";
//         gamesHeader.style.display = "block";
//         contentGamesSection.style.display = "flex";
//     }

//     if(!loggedUser || loggedUser === null && gamesInLocalStorage != null){
//         paginationList.style.display = "none";
//         contentEmptyGames.style.display = "flex";
//         gamesHeader.style.display = "none";
//         contentGamesSection.style.display = "none";
//     } 
// }

const changeHeader = () =>{
    const user = JSON.parse(localStorage.getItem("user"));

    if(user){
        authedHeader.style.display = "flex";
        headerNavBtn.style.display = "none";          
        signInButton.style.display = "none"; 
        overlay.classList.remove('open');
        auth.classList.remove('open'); 
       
    }
    else{
        authedHeader.style.display = "none";
        headerNavBtn.style.display = "flex"; 
        signInButton.style.display = "flex"; 
    }
}

const resetInputsField = () =>{
    signInEmail.value = "";
    signInPassword.value = "";
}

const checkInputPassword = () =>{
    if(signInPassword.value.length < 6){
        alert("password is requiered minimum 6 symbols");
    }
}

const isUserSignIn = () =>{
    const email = document.getElementById("sign-in-email").value;
    const password = document.getElementById("sign-in-password").value;
    const user = USERS.find((user) => user.email === email && user.password === password);

    if(user){
        localStorage.setItem("user", JSON.stringify(user));
        elementBody.style.overflow = "";
        auth.classList.add("hidden");
        overlay.classList.add("hidden");
        resetInputsField();
        changeHeader();
    }else{
        alert("invalid email or password");
        checkInputPassword();
    }
}

const handleSignInFormBtn = () =>{
    isUserSignIn();
    // checkEmptyGames();
}

signInFormBtn.addEventListener("click", handleSignInFormBtn);

const handleLogOut = () =>{
    localStorage.setItem("user", null);
    userMenu.classList.add("hidden");
    changeHeader();

}

logOutBtn.addEventListener("click", handleLogOut);


window.addEventListener("DOMContentLoaded", () =>{
    changeHeader();
    // checkEmptyGames();
});