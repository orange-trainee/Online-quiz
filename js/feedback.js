// Get the message history div
const form = document.getElementById("message-form");
const nameInput = document.getElementById("name-input");
const messageInput = document.getElementById("message-input");
const messageHistory = document.getElementById("message-history");


window.alert = "you should log in first";
// Retrieve messages from local storage and display them on page load
const storedMessages = JSON.parse(localStorage.getItem("messages")) || [];
for (const message of storedMessages) {
  const messageDiv = document.createElement("div");
  messageDiv.innerHTML = `<p><strong>${message.name}</strong>: ${message.message}</p>`;
  messageHistory.appendChild(messageDiv);
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = nameInput.value;
  const message = messageInput.value;

  // Create new message div
  const messageDiv = document.createElement("div");
  messageDiv.className="feed";

messageHistory.className = "message-history";
  messageDiv.innerHTML = `<p><strong>${name}</strong>: ${message}</p>`;

  // Append the message div to message history
  messageHistory.appendChild(messageDiv);


  // Save message to local storage
  const storedMessages = JSON.parse(localStorage.getItem("messages")) || [];
  storedMessages.push({ name, message });
  localStorage.setItem("messages", JSON.stringify(storedMessages));

  // Clear input fields
  nameInput.value = "";
  messageInput.value = "";
});




