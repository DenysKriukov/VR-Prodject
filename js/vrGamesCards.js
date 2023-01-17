import { CARDS } from "../mocks/cards.js"

const initialCards = [...CARDS];
const cardsList = document.querySelector(".games-section");
const CardsDataSelect = document.querySelector(".select-option-game");
const resetButton = document.querySelector(".reset-button");
const selectId = document.getElementById("select");
const gameDialog = document.querySelector(".game-dialog");
const overlayGameDialog = document.querySelector(".overlayGame");


//render cards:

const renderItem = (card) =>{
    const liElement = document.createElement("li");
    liElement.classList.add("game-card-list");

    liElement.innerHTML = `
    <div class="game-card" data-aos="flip-right">
        <img class="game-img" src="../assets/img/games/${card.img}.png" alt=${card.alt}> 
        <div class="card-wrap-text">
            <div class="card-wrap-text-left">
                <h4 class="game-name">${card.gameName}</h4>
                <p class="game-description">${card.gameDescription}</p>
            </div> 
            <diw class="card-wrap-text-right">
                <h4 class="user-name">${card.user.userName}</h4>
                <p class="user-review">${card.user.userReview}</p>
            </diw>
        </div>
    </div>
    `;

    liElement.addEventListener("click", () => handleClickCard(card));

    return liElement;
}

const renderList = (element, list, className) => {
    const divElement = document.createElement("div");
      divElement.classList.add("game-cards");
      divElement.style.display = "flex";
      divElement.style.flexWrap = "wrap";
      divElement.style.justifyContent = "center";
      divElement.style.gap = "40px";
    

    const completeDivElement = list.reduce((divElement, item) =>{
        divElement.appendChild(renderItem(item));
        

        return divElement;
    }, divElement);

    element.appendChild(completeDivElement);
}

renderList(cardsList, CARDS);


// pagination:

const gamesDatasRow = document.querySelector(".games-section");
const paginationBtns = document.querySelector(".pagination");
let notesOnPage = 12;                                                               

const pagination = () =>{
    
    const amountElementOnPage = Math.ceil(CARDS.length / (notesOnPage));

    let items = [];
    for(let i = 1; i <= amountElementOnPage; i++){
        const div = document.createElement("div");
        div.classList.add("pagination-list");
        div.classList.add("hidden");

        if(CARDS.length > notesOnPage){
            div.classList.remove("hidden");
        }

        const button = document.createElement("button");
        button.classList.add("pagination-btn");
        div.appendChild(button);
        button.innerHTML = i;
        paginationBtns.appendChild(div);
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
        let notes = CARDS.slice(start, end);
    
        gamesDatasRow.innerHTML = "";
    
        renderList(cardsList, notes);      
    }
}

pagination();



//default cards:

const handleBtnReset = () =>{
    cardsList.innerHTML = "";
    resetButton.style.display = "none";
    selectId.value = "default";

    renderList(cardsList, initialCards.slice(0, notesOnPage));
}

//sort cards:

const handleSortCards = (e) =>{
    cardsList.innerHTML = "";
    const sortType = e.target.value;
    let sortedGames = null;

//sort:

    switch (sortType) {
        case "new-first": 
            resetButton.style.display = "block";
            sortedGames = CARDS.sort((a, b) => b.date - a.date);
            break;
        case "new-second":
            resetButton.style.display = "block";
            sortedGames = CARDS.sort((a, b) => a.date - b.date);
            break;        
        }

        renderList(cardsList, sortedGames.slice(0, notesOnPage));
        resetButton.addEventListener("click", handleBtnReset);
    }

    CardsDataSelect.addEventListener("change", handleSortCards);

    // render card dialog:
const handleClickCard = (card) =>{
    gameDialog.classList.remove("hidden");
    overlayGameDialog.classList.remove("hidden");
    scrollController.disabledScroll();
  
    document.querySelector(".game-dialog-game-img").src = `../assets/img/games/${card.img}.png`;
    document.querySelector(".game-dialog-game-name").innerHTML = card.gameName;
    document.querySelector(".game-dialog-game-description").innerHTML = card.gameDescription;
    document.querySelector(".game-dialog-user-name").innerHTML = card.user.userName;
    document.querySelector(".game-dialog-user-review").innerHTML = card.user.userReview;
}

const closeGameDialog = () =>{

    gameDialog.classList.add("hidden");
    overlayGameDialog.classList.add("hidden");
    scrollController.enabledScroll();
}
overlayGameDialog.addEventListener("click", closeGameDialog);