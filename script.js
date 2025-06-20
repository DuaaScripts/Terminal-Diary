const input = document.getElementById("input");
const output = document.getElementById("output");

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const command = input.value.trim();
    handleCommand(command);
    input.value = "";
  }
});

function handleCommand(cmd) {
  const entry = document.createElement("div");
  entry.textContent = "> " + cmd;
  output.appendChild(entry);

  let response = document.createElement("div");
  
  switch (cmd.toLowerCase()) {
    case "help":
      response.innerHTML = "Available commands: <br> list-entries, open-entry, clear";
      break;
    case "list-entries":
      response.textContent = "🗓 Entries: 2025-06-20, 2025-06-18, 2025-06-15";
      break;
    case "open-entry 2025-06-20":
      response.textContent = "📓 Entry: Today I got inspired to bring the soul back to coding.";
      break;
    case "clear":
      output.innerHTML = "";
      return;
    default:
      response.textContent = "Unknown command. Try 'help'";
  }

  output.appendChild(response);
}
