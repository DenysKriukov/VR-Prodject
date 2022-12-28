import { USERS } from "../mocks/users.js"

const usersDataList = document.querySelector(".users-list-class");
const usersFilterRoleSelect = document.querySelector(".btnSelect");

const renderItem = (user) =>{
    const rowElement = document.createElement("tr");
    // rowElement.classList.add("users-list-row");

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
`
    
    rowElement.innerHTML = `
    <td><img class="users-list-img" src="../assets/img/${user.img}.png" alt="${user.name}"></td>
    <td>${user.name}</td>
    <td>${user.country}</td>
    <td>${user.age}</td>
    <td>${user.email}</td>
    <td>${user.role}</td>
    <td class="users-list-action">
        <button type="submit" class="users-dots">
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



//default users order:
const handleBtnReset = () =>{
    resetButton.style.display = "none";
    selectId.value = "default";
    
    renderList(usersDataList, initialUsers);
}

// sort

const handleRoleSelect = (e) =>{
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
}

usersFilterRoleSelect.addEventListener("change", handleRoleSelect);

dialogRoleShow ();