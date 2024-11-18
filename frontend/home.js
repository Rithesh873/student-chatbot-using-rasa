// Rasa REST API endpoint
const rasaServerUrl = "http://localhost:5005/webhooks/rest/webhook"; // Updated port to 5006

// Function to display a message in the chat container
function displayMessage(message, sender) {
    const messagesContainer = document.getElementById("messages-container");
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", sender);
    
    const messageText = document.createElement("p");
    messageText.textContent = message;
    messageElement.appendChild(messageText);

    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight; // Scroll to the latest message
}

// Function to show the loading spinner
function showLoadingSpinner() {
    document.getElementById("loading-spinner").style.display = "block";
}

// Function to hide the loading spinner
function hideLoadingSpinner() {
    document.getElementById("loading-spinner").style.display = "none";
}

// Function to send a message to Rasa and get a response
function sendMessage() {
    const userInput = document.getElementById("user-input").value;
    if (userInput.trim() === "") return; // Prevent empty messages

    // Display the user's message
    displayMessage(userInput, "user");

    // Clear the input field
    document.getElementById("user-input").value = "";

    // Show the loading spinner while waiting for a response
    showLoadingSpinner();

    // Send the message to Rasa
    fetch(rasaServerUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: userInput, sender: "user" })
    })
    .then(response => response.json())
    .then(data => {
        // Hide the loading spinner
        hideLoadingSpinner();

        // Display each message from the bot
        data.forEach((response) => {
            displayMessage(response.text, "bot");
        });
    })
    .catch(error => {
        console.error("Error:", error);
        hideLoadingSpinner();
        displayMessage("Error connecting to the server. Please try again later.", "bot");
    });
}

// Add event listener to the send button
document.getElementById("send-btn").addEventListener("click", sendMessage);

// Optional: Send message on Enter key press
document.getElementById("user-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});
