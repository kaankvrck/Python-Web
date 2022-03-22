const user = document.getElementById("user_id").innerHTML;

const socket = io();
socket.on('connect', () => {
  socket.emit('joined_room', user);
});

const addToBox = msg => {
  const messages = document.getElementById("messages");
  const newMessage = document.createElement('div');
  newMessage.innerHTML = msg;
  messages.appendChild(newMessage);
}

const chatBox = document.getElementById('chat_input');
document.getElementById('chat_form').onsubmit = (e) => {
  e.preventDefault();
  let message = chatBox.value.trim();
  if (message.length) {
    let data = {
      user: user,
      message: message
    };
    socket.emit('new_message', data);
  }
  chatBox.value = "";
  chatBox.focus();
}

socket.on("joined_announcement",(user) => {
    addToBox(`<strong>${user}</strong> aramıza katıldı!`);
});

socket.on("broadcast_message", (data) => {
    addToBox(`<strong>${data.user}:</strong> ${data.message}`);
})