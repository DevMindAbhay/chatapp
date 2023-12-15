const socket = io();

let name;
let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message__area');

do {
    name = prompt('Please enter your name:');
} while (!name);

textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value);
    }
});

function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim()
    };

    // Append 
    appendMessage(msg, 'outgoing');
    textarea.value = '';
    scrollToBottom();

    // Send to server
    socket.emit('message', msg);
}

// Receive messages
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming');
    scrollToBottom();
});

function appendMessage(msg, type) {
    const messageElement = document.createElement('div');
    messageElement.classList.add(type, 'message');
    messageElement.innerHTML = `<strong>${msg.user}:</strong> ${msg.message}`;
    messageArea.appendChild(messageElement);
}

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight;
}
