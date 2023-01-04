const authedHeaderBtn = document.querySelector(".authed-header-btn");
const authedHeaderMenuWrap = document.querySelector(".header-menu-wrap");
const background = document.querySelector(".backdrop");

const dialogAuthedHeader = () =>{    
    authedHeaderMenuWrap.style.zIndex = "100";    
}

dialogAuthedHeader();

//show and hide authorized user menu:
const handleAuthedHeaderBtnClick = () =>{
    authedHeaderMenuWrap.classList.toggle("hidden");
    background.classList.remove("hidden");

    background.addEventListener("click", () =>{
        authedHeaderNavMenuWrap.classList.add("hidden");
        background.classList.add("hidden");
    });

}

authedHeaderBtn.addEventListener("click", handleAuthedHeaderBtnClick);