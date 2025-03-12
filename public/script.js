const chatbox = document.getElementById('chatbox');
const input = document.getElementById('input');

function appendMessage(sender, message) {
    chatbox.innerHTML += `<p><strong>${sender}:</strong> ${message}</p>`;
    chatbox.scrollTop = chatbox.scrollHeight;
}

async function sendMessage() {
    const message = input.value.trim();
    if (!message) return;

    appendMessage('You', message);
    input.value = '';

    const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
    });

    const data = await response.json();
    appendMessage('Bot', data.reply);
}
