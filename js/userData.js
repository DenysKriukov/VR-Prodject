import { USERS } from "../mocks/users.js"

const usersTableRowsList = document.querySelector(".users-list-class");

const renderItem = (user) =>{
    const rowElement = document.createElement("tr");
    // rowElement.classList.add("users-list-row");

    usersTableRowsList.innerHTML = `
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

renderList(usersTableRowsList, USERS,);