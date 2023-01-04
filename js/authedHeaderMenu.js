const authedHeaderBtn = document.querySelector(".authed-header-btn-img");
const authedHeaderMenuWrap = document.querySelector(".authed-header-menu-wrap");
const background = document.querySelector(".backdrop");
const authedHeaderMenuArrow = document.querySelector(".authed-header-arrow");

const dialogAuthedHeader = () =>{  
    authedHeaderBtn.style.width = "44px"
    // authedHeaderBtn.style.marginLeft = "-40px"
    authedHeaderMenuWrap.style.zIndex = "100";
    authedHeaderMenuArrow.style.zIndex = "200";
    background.style.zIndex = "99";    
}

dialogAuthedHeader();

//show and hide authorized user menu:
const handleAuthedHeaderBtnClick = () =>{
    authedHeaderMenuWrap.classList.remove("hidden");
    background.classList.remove("hidden");

    background.addEventListener("click", () =>{
        authedHeaderMenuWrap.classList.add("hidden");
        background.classList.add("hidden");
    });

    authedHeaderMenuArrow.addEventListener("click", () =>{
        authedHeaderMenuWrap.classList.add("hidden");
        background.classList.add("hidden");
    });

}

authedHeaderBtn.addEventListener("click", handleAuthedHeaderBtnClick);