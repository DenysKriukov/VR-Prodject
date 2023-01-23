import { CARDS } from "../mocks/cards.js"

const addingFormBtn = document.querySelector(".modal-Add");
const addingName = document.getElementById("adding-name");
const addingDescription = document.getElementById("adding-description");
const addingReview = document.getElementById("adding-review");
const addingImage = document.getElementById("adding-image");
const authNewGame = document.querySelector(".newGame");
const overlayNewGame = document.querySelector(".overlayNewGame");
const cardsList = document.querySelector(".games-section");
const CardsDataSelect = document.querySelector(".select-option-game");
const resetButton = document.querySelector(".reset-button");
const selectId = document.getElementById("select");
const gameDialog = document.querySelector(".game-dialog");
const paginationList = document.querySelector(".pagination");
const contentEmptyGames = document.querySelector(".empty-games-wrap");
const gamesHeader = document.querySelector(".games-header");
const overlayGameDialog = document.querySelector(".overlayGame");


const cards = JSON.parse(localStorage.getItem("cards")) || [];
const authedUser = JSON.parse(localStorage.getItem('user')) || {name:"player name"};

// render game card:
const renderItem = (card) =>{
    const liElement = document.createElement("li");
    liElement.classList.add("game-card-item");

    liElement.innerHTML = `
        <img class="game-img" 
        src="../assets/img/games/${card.img}.png" 
        alt=${card.name}> 
        <div class="card-wrap-text">
            <div class="card-wrap-text-left">
                <h4 class="game-name">${card.gameName}</h4>
                <p class="game-description">${card.gameDescription}</p>
            </div> 
            <diw class="card-wrap-text-right">
                <h4 class="user-name">${authedUser.name}</h4>
                <p class="user-review">${card.userReview}</p>
            </diw>
        </div>
    `;


    liElement.addEventListener("click", () => handleClickCard(card));

    return liElement;
}


// render game card list:
const renderList = (element, list) => {
    const divElement = document.createElement("div");
    divElement.classList.add("game-cards");
    divElement.style.display = "flex";
    divElement.style.justifyContent = "center";
    divElement.style.flexWrap = "wrap";
    divElement.style.gap = "40px";

    const completeDivElement = list.reduce((divElement, item) =>{
        divElement.appendChild(renderItem(item));


        return divElement;
    }, divElement);

    element.appendChild(completeDivElement);
}




// render card dialog:
const handleClickCard = (card) =>{
    gameDialog.classList.remove("hidden");
    overlayGameDialog.classList.remove("hidden");
    scrollController.disabledScroll();
  
    document.querySelector(".game-dialog-game-img").src = `../assets/img/games/${card.img}.png`;
    document.querySelector(".game-dialog-game-name").innerHTML = card.gameName;
    document.querySelector(".game-dialog-game-description").innerHTML = card.gameDescription;
    document.querySelector(".game-dialog-user-name").innerHTML = authedUser.name;
    document.querySelector(".game-dialog-user-review").innerHTML = card.userReview;

}

const resetInputsField = () =>{
    addingName.value = "";
    addingDescription.value="";
    addingReview.value="";
    addingImage.value="";
}

const closeGameDialog = () =>{
    overlayNewGame.classList.remove('open');
    authNewGame.classList.remove('open');
    gameDialog.classList.add("hidden");
    overlayGameDialog.classList.add("hidden");
    scrollController.enabledScroll();
    resetInputsField();
}


const contentGridList = document.querySelector(".games-section");
const paginationListBtns = document.querySelector(".pagination");
let notesOnPage = 12;            


const pagination = () =>{
  
    
    const amountElementOnPage = Math.ceil(JSON.parse(localStorage.getItem('cards')).length / notesOnPage);

    let items = [];
    for(let i = 1; i <= amountElementOnPage; i++){
        const div = document.createElement("div");
       div.classList.add("pagination-list");
       div.classList.add("hidden");

        if(JSON.parse(localStorage.getItem('cards')).length > notesOnPage){
           div.classList.remove("hidden");
        }

        const button = document.createElement("button");
        button.classList.add("pagination-btn");

       div.appendChild(button);
        button.innerHTML = i;
        paginationListBtns.appendChild(div);
        items.push(button);
    }

    let active;
    showPage(items[0]);

    for(let item of items){
        item.addEventListener("click", function(){
            showPage(this);
        })
    }

    function showPage(elem) {
        if(active){
            active.classList.remove("active");
        }
        
        active = elem;
        elem.classList.add("active");
    
        let pageNum = +elem.innerHTML;
        let start = (pageNum - 1) * notesOnPage;
        let end = start + notesOnPage;
        let notes = JSON.parse(localStorage.getItem('cards')).slice(start, end);
    
        contentGridList.innerHTML = "";
    
        renderList(cardsList, notes); 
    }    
}

const handleAddNewGame = (e) =>{
    e.preventDefault();

  
    const contentDivItem = document.querySelector(".content-div-item");
    const addingName = document.getElementById("adding-name").value;
    const addingDescription = document.getElementById("adding-description").value;
    const addingReview = document.getElementById("adding-review").value;
    const addingImage = document.getElementById("adding-image").value;

    if(addingImage === "default"){
        alert("choose the image from the list");
        return;
    }
    
    const addedCards = [{name: addingName, description: addingDescription, review: addingReview, img: addingImage, date: Date.now()}];

    for(let i = 0; i < cards.length; i++){
        if(cards[i].img === addingImage){
            alert("such game already exist");
            return;
        }
    }

    cards.push({name: addingName, description: addingDescription, review: addingReview, img: addingImage, date: Date.now()});
    localStorage.setItem("cards", JSON.stringify(cards));
    
    renderList(contentDivItem, addedCards);
    closeGameDialog();

    pagination();

}
addingFormBtn.addEventListener("click", handleAddNewGame);



const checkEmptyGames = () =>{
    const loggedUser = JSON.parse(localStorage.getItem("user"));

    if(loggedUser){
        paginationList.style.display = "flex";
        contentEmptyGames.style.display = "none";
        gamesHeader.style.display = "flex";
    }
}

// checkEmptyGames();

const handleClickBackground = () =>{
    resetInputsField();
    closeGameDialog();
} 

overlayGameDialog.addEventListener("click", handleClickBackground);

//default cards:
const handleBtnReset = () =>{
    cardsList.innerHTML = "";
    resetButton.style.display = "none";
    selectId.value = "default";

    renderList(cardsList, JSON.parse(localStorage.getItem("cards")).slice(0, notesOnPage));
}

//sort cards by date:
const handleSortCards = (e) =>{
    cardsList.innerHTML = "";
    const sortType = e.target.value;
    let sortedGames = null;

//sort:
    switch (sortType) {
        case "new-first": 
            sortedGames = cards.sort((a, b) => b.date - a.date);
            break;
        case "new-second":
            sortedGames = cards.sort((a, b) => a.date - b.date);
            break;        
        }
        renderList(cardsList, sortedGames.slice(0, notesOnPage));

        resetButton.style.display = "block";
        resetButton.addEventListener("click", handleBtnReset);
    }

CardsDataSelect.addEventListener("change", handleSortCards);


window.addEventListener("DOMContentLoaded", () =>{
    checkEmptyGames();
    pagination();
});



