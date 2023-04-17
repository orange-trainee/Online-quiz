const uploadInput = document.querySelector('#upload-image');
const userImage = document.querySelector('#user-image');
const uploadButton = document.querySelector('#upload-button');
const subMenu = document.getElementById("subMenu");
const logOut=document.getElementById("logOut");
const username=document.getElementById("username");
if (sessionStorage.getItem("currentUser")===null) {
  window.location.href = "index.html";
}
const arr = JSON.parse(sessionStorage.getItem("currentUser"));;
username.textContent=arr['name'];


// Check if user image data is already saved in local storage
if (localStorage.getItem('userImage')) {
  userImage.src = localStorage.getItem('userImage');
  uploadButton.style.backgroundImage = `url(${localStorage.getItem('userImage')})`; // Set the background image of the button to the saved image
  uploadButton.style.backgroundSize = "cover"; // Adjust background image size to fit the button
}
uploadInput.addEventListener('change', function() {
  const file = this.files[0];
  const reader = new FileReader();
  
  reader.addEventListener('load', function() {
    userImage.src = reader.result;
    localStorage.setItem('userImage', reader.result); // Save the user image data to local storage
  });
  
  if (file) {
    reader.readAsDataURL(file);
    uploadButton.style.backgroundImage = `url(${URL.createObjectURL(file)})`; // Set the background image of the button to the selected image
    uploadButton.style.backgroundSize = "cover"; // Adjust background image size to fit the button
  }
});

uploadInput.addEventListener('click', function() {
  this.value = null; // Reset the file input field
  uploadButton.style.backgroundImage = ''; // Remove the background image of the button
  userImage.src = 'images/profile.png'; // Reset the user image to the default image
  localStorage.removeItem('userImage'); // Remove the saved user image data from local storage
});

function toggleMenu() {
  subMenu.classList.toggle("open-menu");
}

uploadButton.addEventListener('click', toggleMenu);

logOut.addEventListener('click', () => {
  sessionStorage.clear();
  
  window.location.href = "http://127.0.0.1:5500/2134_gotto_job/index.html";
});

