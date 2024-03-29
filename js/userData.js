import { USERS } from "../mocks/users.js"

const initializedUsers = [...USERS];
const usersDataList = document.querySelector(".users-list-class");
const usersRoleSelect = document.querySelector(".btnSelectRole");
const selectId = document.getElementById("select");
const resetButton = document.querySelector(".reset-button");
const background = document.querySelector(".backdrop");
const signInFormBtn = document.querySelector(".modal-SignIn");
const logOutBtn = document.querySelector(".log-out-btn");


const renderItem = (user) =>{
    const rowElement = document.createElement("tr");
    rowElement.classList.add("users-list-row");

    usersDataList.innerHTML = `
    <tbody>
        <tr>
            <th>Avatar</th>
            <th>Name</th>
            <th>Country</th>
            <th>Age</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
        </tr>
    </tbody>
`;
    rowElement.innerHTML = `
    <td><img class="users-list-img" src="../assets/img/${user.img}.png" alt="${user.name}"></td>
    <td>${user.name}</td>
    <td>${user.country}</td>
    <td>${user.age}</td>
    <td>${user.email}</td>
    <td>${user.role}</td>
    <td class="users-list-action">
        <button type="submit" class="users-dots" data-id="${user.id}" data-name="${user.name}">
            <img class="users-list-dots" src="../assets/img/userListDots.svg" alt="">
        </button>
        <div class="role hidden">
            <ul class="role-list">
                <li class="role-item role-send-email"><button>Send email</button></li>
                <li class="role-item role-change-role"><button>Change Role</button></li>
                <li class="role-item role-block"><button>Block</button></li>
                <li class="role-item role-delete"><button>Delete</button></li>
            </ul>
        </div>
    </td>
    `;
 
    return rowElement;
};

const renderList = (element, list) =>{
    const bodyElement = document.createElement("tbody");

    const completeBodyElement = list.reduce((bodyElement, item) =>{
        bodyElement.appendChild(renderItem(item));
        bodyElement.classList.add("users-list-rows");

        return bodyElement;
    }, bodyElement);

    
    element.appendChild(completeBodyElement);
}

renderList(usersDataList, USERS);


//dialog Role:
const dialogRoleShow = () =>{
    const userRole = JSON.parse(localStorage.getItem("user")).role;
    const userLogged = JSON.parse(localStorage.getItem("user"));
    const usersBtnDots = document.querySelectorAll(".users-dots");
    const role = document.querySelectorAll(".role");
    const RoleChangeRole = document.querySelectorAll(".role-change-role");
    const RoleSendEmail = document.querySelectorAll(".role-send-email");
    const RoleBlock = document.querySelectorAll(".role-block");
    const RoleDelete = document.querySelectorAll(".role-delete");
    
    for(let elem in usersBtnDots){
        const handleUsersBtnDots = () => {
                role[elem].classList.toggle("hidden");
                
                if(userRole === "moderator"){
                    RoleDelete[elem].classList.add("hidden");
                }
    
                if(userRole === "user"){
                    RoleChangeRole[elem].classList.add("hidden");
                    RoleBlock[elem].classList.add("hidden");
                    RoleDelete[elem].classList.add("hidden");
                }

                if(userLogged.id === usersBtnDots[elem].getAttribute("data-id")){
                    background.classList.toggle("hidden");
                    return;
                }else{
                    RoleChangeRole[elem].addEventListener("click", function showRole(){
                        console.log("change role:", "\n",
                        "id:", userLogged.id, "name:", userLogged.name, "\n",
                        "id:", usersBtnDots[elem].getAttribute("data-id"), "name:", usersBtnDots[elem].getAttribute("data-name"));
                    })
        
                    RoleBlock[elem].addEventListener("click", () => {     
                        console.log("block:", "\n",
                        "id:", userLogged.id, "name:", userLogged.name, "\n",
                        "id:", usersBtnDots[elem].getAttribute("data-id"), "name:", usersBtnDots[elem].getAttribute("data-name"));
                    })
        
                    RoleDelete[elem].addEventListener("click", () => {
                        console.log("delete:", "\n",
                        "id:", userLogged.id, "name:", userLogged.name, "\n",
                        "id:", usersBtnDots[elem].getAttribute("data-id"), "name:", usersBtnDots[elem].getAttribute("data-name"));
                    })
        
                    RoleSendEmail[elem].addEventListener("click", () => {
                        console.log("send email:", "\n",
                        "id:", userLogged.id, "name:", userLogged.name, "\n",
                        "id:", usersBtnDots[elem].getAttribute("data-id"), "name:", usersBtnDots[elem].getAttribute("data-name"));
                    })
                }

                background.classList.toggle("hidden");
                
        }
   
        usersBtnDots[elem].addEventListener("click", handleUsersBtnDots);       

        background.addEventListener("click", () =>{
            background.classList.add("hidden");
            role[elem].classList.add("hidden");
        })
    } 
}

const enabledActions = () =>{
    const usersBtnDots = document.querySelectorAll(".users-dots");
    for(let elem in usersBtnDots){
        usersBtnDots[elem].removeAttribute("disabled", "");
       dialogRoleShow ();
    } 
}

signInFormBtn.addEventListener("click", enabledActions);

const disabledActions = () =>{
    const usersBtnDots = document.querySelectorAll(".users-dots");
    for(let elem in usersBtnDots){
        usersBtnDots[elem].setAttribute("disabled", "");
        renderList(usersDataList, initializedUsers.slice(0, notesOnPage));
    }
}

logOutBtn.addEventListener("click", disabledActions);


// pagination:

const usersDatasRows = document.querySelector(".users-list-class");
const paginationListBtns = document.querySelector(".pagination");
let notesOnPage = 5;                                                               

const pagination = () =>{
    const amountElementOnPage = Math.ceil(USERS.length / (notesOnPage));

    let items = [];
    for(let i = 1; i <= amountElementOnPage; i++){
        const div = document.createElement("div");
        div.classList.add("pagination-list");
        div.classList.add("hidden");

        if(USERS.length > notesOnPage){
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
            dialogRoleShow ();
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
        
        let notes = USERS.slice(start, end);
    
        usersDatasRows.innerHTML = "";
        
        renderList(usersDataList, notes);     
    }  
    
   

}







// let table = document.querySelector('#table');
// let pagination = document.querySelector('#pagination');

// let notesOnPage = 3;
// let countOfItems = Math.ceil(users.length / notesOnPage);

// let showPage = (function() {
// 	let active;
	
// 	return function(item) {
// 		if (active) {
// 			active.classList.remove('active');
// 		}
// 		active = item;
		
// 		item.classList.add('active');
		
// 		let pageNum = +item.innerHTML;
		
// 		let start = (pageNum - 1) * notesOnPage;
// 		let end = start + notesOnPage;
		
// 		let notes = users.slice(start, end);
		
// 		table.innerHTML = '';
// 		for (let note of notes) {
// 			let tr = document.createElement('tr');
// 			table.appendChild(tr);
			
// 			createCell(note.name, tr);
// 			createCell(note.surname, tr);
// 			createCell(note.age, tr);
// 		}
// 	};
// }());

// let items = [];
// for (let i = 1; i <= countOfItems; i++) {
// 	let li = document.createElement('li');
// 	li.innerHTML = i;
// 	pagination.appendChild(li);
// 	items.push(li);
// }

// showPage(items[0]);

// for (let item of items) {
// 	item.addEventListener('click', function() {
// 		showPage(this);
// 	});
// }

// function createCell(text, tr) {
// 	let td = document.createElement('td');
// 	td.innerHTML = text;
// 	tr.appendChild(td);
// }







//default users:
const handleBtnReset = () => {
    usersDataList.innerHTML = "";
    resetButton.style.display = "none";
    selectId.value = "default";
    
    renderList(usersDataList, initializedUsers.slice(0, notesOnPage));
    dialogRoleShow ();
}


//sort:
const handleRoleSelect = (e) => {
    const sortRole = e.target.value;
    let sortedUsers = null;
    
    switch (sortRole) {
        case "admin": 
            resetButton.style.display = "block";
            sortedUsers = USERS.sort((a) => a.role === "admin" ?  -1 : 0);
            break;
        case "moderator":
            resetButton.style.display = "block";
            sortedUsers = USERS.sort((a) => a.role === "moderator" ?  -1 : 0);
            break;
        case "user":
            resetButton.style.display = "block";
            sortedUsers = USERS.sort((a) => a.role === "user" ?  -1 : 0);
            break;
    }
  
    renderList(usersDataList, sortedUsers.slice(0, notesOnPage) );
    
    resetButton.addEventListener("click", handleBtnReset);
    dialogRoleShow ();
 
}

usersRoleSelect.addEventListener("change", handleRoleSelect);
pagination();
dialogRoleShow ();


// let arrayPage = [...USERS]
// const pagList = document.querySelectorAll('.pagination');
// const showList = document.querySelectorAll('.users-list-row');

// function paginationBtn(arr,size = 5){
// 	let btn = '';
	
// 	pagList.forEach((elem,i) => {
// 		for(let i = 0; i < arr.length/size;i++){
// 			btn += `<button class='pagination-btn'>${i + 1}</button>`
// 		}
// 		elem.innerHTML = btn;
// 	});
// }

// paginationBtn(arrayPage);
// const btnPag = document.querySelectorAll('.pagination-btn');

// function smartList(page,size = 5){
// 	let arrayList = [];
// 	arrayList = arrayPage.slice().splice(page*size,size);
// 	showList.forEach((elem,i) => {
// 		let item = '';
// 		for(let i = 0; i < arrayList.length; i++){
// 			item += `<div class='users-list-row'>${arrayList[i]}</div>`
// 		}
// 		elem.innerHTML = item;
// 	})
// 	btnPag[0].classList.add('btn--active');
// }

// function addClass(btnElem, prevBtn){
// 	prevBtn.forEach(elem => elem.classList.remove('btn--active'));
// 	btnElem.classList.add('btn--active');
// }

// btnPag.forEach((elem,i) => {
// 	elem.addEventListener('click', () => {smartList(i); addClass(elem,btnPag);});
// });

// smartList(0);
