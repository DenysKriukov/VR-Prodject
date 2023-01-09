import { USERS } from "../mocks/users.js"

const initializedUsers = [...USERS];
const usersDataList = document.querySelector(".users-list-class");
const usersRoleSelect = document.querySelector(".btnSelectRole");
const selectId = document.getElementById("select");
const resetButton = document.querySelector(".reset-button");
const background = document.querySelector(".backdrop");

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

    const completeBodyElement = list.slice(0, 5).reduce((bodyElement, item) =>{
        bodyElement.appendChild(renderItem(item));

        return bodyElement;
    }, bodyElement);

    
    element.appendChild(completeBodyElement);
}

renderList(usersDataList, USERS,);


//default users:
const handleBtnReset = () => {
    resetButton.style.display = "none";
    selectId.value = "default";
    
    renderList(usersDataList, initializedUsers);
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
    
    renderList(usersDataList, sortedUsers);
    
    resetButton.addEventListener("click", handleBtnReset);
}

usersRoleSelect.addEventListener("change", handleRoleSelect);

//dialog Role:
const dialogRoleShow = () =>{
    const userRole = JSON.parse(localStorage.getItem("user")).role;
    const userLogged = JSON.parse(localStorage.getItem("user"));
    const usersBtnDots = document.querySelectorAll(".users-list-dots");
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
    
                background.classList.toggle("hidden");
        }

 usersBtnDots[elem].addEventListener("click", handleUsersBtnDots);       

        background.addEventListener("click", () =>{
            background.classList.add("hidden");
            role[elem].classList.add("hidden");
        })
    }

}

dialogRoleShow ();
