
const addingFormBtn = document.querySelector(".modal-Add");
const addingName = document.getElementById("adding-name");
const addingDescription = document.getElementById("adding-description");
const addingReview = document.getElementById("adding-review");
const addingImage = document.getElementById("adding-image");
const addingModal = document.querySelector(".addNewGame");
const overlay = document.querySelector(".overlay");
const cardsList = document.querySelector(".games-section");
const CardsDataSelect = document.querySelector(".select-option-game");
const resetButton = document.querySelector(".reset-button");
const selectId = document.getElementById("select");
const gameDialog = document.querySelector(".game-dialog");
const paginationList = document.querySelector(".pagination");
const contentEmptyGames = document.querySelector(".empty-games-wrap");
const gamesHeader = document.querySelector(".games-header");


const cards = JSON.parse(localStorage.getItem("cards")) || [];
const authedUser = JSON.parse(localStorage.getItem('user')) || {name: "player name"};

//render game card:
const renderItem = (card) =>{
    const liElement = document.createElement("li");
    liElement.classList.add("content__grid-item");
    liElement.setAttribute("id", card.id);
    liElement.innerHTML = `
        <img
            class="content__grid-item-img resize-photo"
            src="../../Assets/images/Games/${card.img}.png"
            alt=${card.name}
        />
        <div class="content__grid-item-description">
            <div class="content__grid-item-description-left">
                <h3 class="game-name">${card.name}</h3>
                <span class="game-description">${card.description}</span>
            </div>
            <div class="content__grid-item-description-right">
                <h3 class="user-name">${authedUser.name}</h3>
                <span class="user-review">${card.review}</span>
            </div>
        </div>
    `;


    liElement.addEventListener("click", () => handleClickCard(card));

    return liElement;
}