document.querySelector("#start_chat").addEventListener("click", (event) => {
  const socket = io();
  const email = document.getElementById("email").value;
  const text = document.getElementById("txt_help").value;

  socket.on("connect", () => {
    const params = { email, text };
    
    socket.emit("client_first_access", params, (call, err) => {
      if (err) console.error(err);
      else console.log(call);
    })
  })
});