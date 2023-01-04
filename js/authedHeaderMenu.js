const authedHeaderNavBtn = document.querySelector(".authed-header-btn-img");
const authedHeaderNavMenuWrap = document.querySelector(".authed-header-menu-wrap");
const background = document.querySelector(".backdrop");
// const authedHeaderMenuArrow = document.querySelector(".authed-header-arrow");

const dialogAuthedNavHeader = () =>{  
    authedHeaderNavBtn.style.width = "44px"
    // authedHeaderNavBtn.style.marginLeft = "-40px"
    authedHeaderNavMenuWrap.style.zIndex = "100";
    // authedHeaderNavMenuArrow.style.zIndex = "200";
    background.style.zIndex = "99";    
}

dialogAuthedNavHeader();

//show and hide authorized user menu:
const handleAuthedHeaderNavBtnClick = () =>{
    authedHeaderNavMenuWrap.classList.remove("hidden");
    background.classList.remove("hidden");

    background.addEventListener("click", () =>{
        authedHeaderNavMenuWrap.classList.add("hidden");
        background.classList.add("hidden");
    });

    // authedHeaderNavMenuArrow.addEventListener("click", () =>{
    //     authedHeaderNavMenuWrap.classList.add("hidden");
    //     background.classList.add("hidden");
    // });

}

authedHeaderNavBtn.addEventListener("click", handleAuthedHeaderNavBtnClick);