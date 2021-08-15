const getFname = document.getElementById("fname");
const getLname = document.getElementById("lname");
const getEmail = document.getElementById("email");
const getPassword = document.getElementById("password");
const getRepassword = document.getElementById("repassword");
const showEntry = document.querySelector(".showEntry");
var getLocalStorage = null;
var getPendingTasks = document.querySelector(".pendingTasks");
const clearallBtn = document.querySelector(".footer button");
var selectGender = document.getElementById('gender').value;
arrEntry =[];

displayUsers();

onSubmit = (event) => {
    event.preventDefault();
    selectGender = document.getElementById('gender').value;
    const dataEntry = {
        firstName: getFname.value,
        lastName: getLname.value,
        email: getEmail.value,
        password: getPassword.value,
        rePassword: getRepassword.value,
        gender: selectGender, 
    }

    getLocalStorage = localStorage.getItem("Data Entry");

    getLocalStorage==null? arrEntry=[] : arrEntry = JSON.parse(getLocalStorage)
    arrEntry.push(dataEntry);

    localStorage.setItem("Data Entry", JSON.stringify(arrEntry));

    displayUsers();

    getFname.value="";
    getLname.value="";
    getEmail.value="";
    getPassword.value="";
    getRepassword.value="";
}

function displayUsers()
{
    getLocalStorage = localStorage.getItem("Data Entry");
    getLocalStorage==null? arrEntry =[] : arrEntry = JSON.parse(getLocalStorage)
    
    arrEntry.length != 0? clearallBtn.classList.add("active") : clearallBtn.classList.remove("active");

    let liShowEntry = "";
    arrEntry = arrEntry.reverse();
    arrEntry.forEach((element, index) => {
        liShowEntry += `<li ><h4 style="color:white"><b>User ${arrEntry.length-index}: </b></h4><p>Username: ${element.firstName + " " + element.lastName}</p> <p>Email: ${element.email}</p> <p>Gender: ${element.gender}</p> Password: ${element.password} <span onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
    })
   
    showEntry.innerHTML = liShowEntry;
    getPendingTasks.innerHTML = `${arrEntry.length}`;
}

function deleteTask(index) {
    getLocaleStorage = localStorage.getItem("Data Entry");
    arrEntry = JSON.parse(getLocalStorage);

    arrEntry.splice(index,1);

    localStorage.setItem("Data Entry", JSON.stringify(arrEntry));

    displayUsers();
}

clearallBtn.onclick = () => {
    listArr=[];
    localStorage.setItem("Data Entry", JSON.stringify(listArr));
    displayUsers();
}
    