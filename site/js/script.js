const getForm = document.getElementById("reg");
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
var getSubmitButton = document.querySelector(".btn");
var getMessage = document.querySelector(".message");
var passwordMatch = true;
var tempIndex = null;
arrEntry =[];

displayUsers();

function onKeyUp() {
    
    const password = document.querySelector('input[name=password]');
    const confirm = document.querySelector('input[name=repassword]');
    console.log(confirm.value);
    console.log(password.value);
    if (confirm.value === password.value) {
        passwordMatch = true;
        getMessage.classList.remove("unmatch");
        getMessage.classList.add("match");
        getMessage.innerHTML = "password match";
        
    } else {
        passwordMatch = false;
        getMessage.classList.remove("match");
        getMessage.classList.add("unmatch")
        getMessage.innerHTML = "password doesnt match"
        
    }
    
}

onSubmit = (event) => {
    
    event.preventDefault();
    if(passwordMatch == true) {
        selectGender = document.getElementById('gender').value;
        const dataEntry = {
            firstName: getFname.value,
            lastName: getLname.value,
            email: getEmail.value,
            password: getPassword.value,
            rePassword: getRepassword.value,
            gender: selectGender, 
        }
        if(getSubmitButton.value == "Submit"){
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
        else if(getSubmitButton.value == "Edit") {

            getLocalStorage = localStorage.getItem("Data Entry");

            getLocalStorage==null? arrEntry=[] : arrEntry = JSON.parse(getLocalStorage)
            arrEntry.splice(tempIndex,1);
            arrEntry.splice(tempIndex,0,dataEntry);

            localStorage.setItem("Data Entry", JSON.stringify(arrEntry));

            displayUsers();

            getFname.value="";
            getLname.value="";
            getEmail.value="";
            getPassword.value="";
            getRepassword.value="";
        }
    } else {
        // getRepassword.setCustomValidity("Passwords Don't Match");
    }

}

function displayUsers()
{
    getLocalStorage = localStorage.getItem("Data Entry");
    getLocalStorage==null? arrEntry =[] : arrEntry = JSON.parse(getLocalStorage)
    
    arrEntry.length != 0? clearallBtn.classList.add("active") : clearallBtn.classList.remove("active");

    let liShowEntry = "";
    // arrEntry = arrEntry.reverse();
    arrEntry.forEach((element, index) => {
        liShowEntry += `<li ><h4 style="color:white"><b>User ${arrEntry.length-index}: </b></h4><p>Username: ${element.firstName + " " + element.lastName}</p> <p>Email: ${element.email}</p> <p>Gender: ${element.gender}<span onclick="editTask(${index})" id="edits"><i class="fas fa-edit"></i></span></p> Password: ${element.password} <span onclick="deleteTask(${index})" id="deletes"><i class="fas fa-trash"></i></span></li>`;
    })
   
    showEntry.innerHTML = liShowEntry;
    getPendingTasks.innerHTML = `${arrEntry.length}`;

    getSubmitButton.value = "Submit";
}

function deleteTask(index) {
    getLocaleStorage = localStorage.getItem("Data Entry");
    arrEntry = JSON.parse(getLocalStorage);

    arrEntry.splice(index,1);

    localStorage.setItem("Data Entry", JSON.stringify(arrEntry));

    displayUsers();
}

function editTask(index) {
    getLocaleStorage = localStorage.getItem("Data Entry");
    arrEntry= JSON.parse(getLocalStorage);

    // arrEntry = arrEntry.reverse();

    getFname.value = arrEntry[index].firstName;
    getLname.value = arrEntry[index].lastName;
    getEmail.value = arrEntry[index].email;
    selectGender = gender;
    getPassword.value = arrEntry[index].password;
    getRepassword.value = arrEntry[index].rePassword;
    getSubmitButton.value = "Edit";
    tempIndex = index;

    
    
}



clearallBtn.onclick = () => {
    listArr=[];
    localStorage.setItem("Data Entry", JSON.stringify(listArr));
    displayUsers();
}
    