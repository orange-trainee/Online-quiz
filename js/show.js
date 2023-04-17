const show1 = document.getElementById("show1");
const alertDiv = document.querySelector(".alert-danger");

show1.addEventListener("click", function() {
    if (sessionStorage.getItem("currentUser")===null) {
        alertDiv.style.display = "block";  
    }
    else{
        window.location.assign("http://127.0.0.1:5500/user.html");
    }
  
});

const show2 = document.getElementById("show2");
const alertDiv2 = document.querySelector("#alert2");

show2.addEventListener("click", function() {
    if (sessionStorage.getItem("currentUser")===null) {
        alertDiv2.style.display = "block";  
    }
    else{
        window.location.assign("http://127.0.0.1:5500/user.html");
    }
  
});
const show3 = document.getElementById("show3");
const alertDiv3 = document.querySelector("#alert3");

show3.addEventListener("click", function() {
    if (sessionStorage.getItem("currentUser")===null) {
        alertDiv3.style.display = "block";  
    }
    else{
        window.location.assign("http://127.0.0.1:5500/user.html");
    }
  
});
const show4 = document.getElementById("show4");
const alertDiv4 = document.querySelector("#alert4");

show4.addEventListener("click", function() {
    if (sessionStorage.getItem("currentUser")===null) {
        alertDiv4.style.display = "block";  
    }
    else{
        window.location.assign("http://127.0.0.1:5500/user.html");
    }
  
});
