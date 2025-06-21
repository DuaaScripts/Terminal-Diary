const input = document.getElementById("input");
const output = document.getElementById("output");

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const command = input.value.trim();
    handleCommand(command);
    input.value = "";
  }
});

let recentDates = []; // this will store last 15 dates in order


function handleCommand(cmd) {
  const entry = document.createElement("div");
  entry.textContent = "> " + cmd;
  output.appendChild(entry);

  let response = document.createElement("div");
  const lowerCmd = cmd.toLowerCase();

  if (lowerCmd === "help") {
    response.innerHTML = "Available commands: <br> list-entries, open-entry [date], new-entry [text], show-all, clear";
  }

  else if (lowerCmd === "list-entries") {
    const savedEntries = JSON.parse(localStorage.getItem("entries")) || {};
    const dates = Object.keys(savedEntries);
    response.textContent = dates.length
      ? "📅 Entries: " + dates.join(", ")
      : "No entries found!";
  }

  else if (lowerCmd.startsWith("rm-entry" ) || lowerCmd.startsWith("delete-entry") ) {
    const parts = lowerCmd.split(" ");
    const input = parts[1];

    let entries = JSON.parse(localStorage.getItem("entries")) || {};
    if (!input) {
        response.textContent = "⚠️ Please provide a date or index!";
    }
    else if( !isNaN(input)){
      const index = Number(input) - 1;
      const date = recentDates[index];
      if( date && entries[date]){
        delete entries[date];
        localStorage.setItem("entries", JSON.stringify(entries));

        response.textContent= "📝 Entry deleted!";
    }
    else{
      response.textContent= "⚠️ Invalid index!";
    }

  }
  else{
    //user gave dage 
    if( entries[input]){
      delete entries[input];
      localStorage.setItem("entries", JSON.stringify(entries));

      response.textContent= "📝 Entry deleted!";
    }
    else{
      response.textContent= "⚠️ Entry not found!";
    }
  }



}

  else if (lowerCmd === "show-all") {
  const saved = JSON.parse(localStorage.getItem("entries")) || {};
  const dates = Object.keys(saved).sort().reverse(); // newest first
  recentDates = dates.slice(0, 15); // store latest 15 globally

  if (recentDates.length === 0) {
    response.textContent = "No entries found!";
  } else {
    response.innerHTML = "📅 Recent Entries:<br>";
    recentDates.forEach((date, index) => {
      response.innerHTML += `${index + 1}. ${date}<br>`;
    });
  }
}


  else if (lowerCmd.startsWith("open-entry")) {
  const parts = cmd.split(" ");
  const input = parts[1];

  const saved = JSON.parse(localStorage.getItem("entries")) || {};

  if (!input) {
    response.textContent = "Please provide a date or index number!";
  } else if (!isNaN(input)) {
    // User gave a number
    const index = Number(input) - 1;
    const date = recentDates[index];

    if (date && saved[date]) {
      response.textContent = `📖 ${date}: ${saved[date]}`;
    } else {
      response.textContent = "Invalid entry number.";
    }
  } else {
    // User gave a date
    if (saved[input]) {
      response.textContent = `📖 ${input}: ${saved[input]}`;
    } else {
      response.textContent = `No entry found for ${input}`;
    }
  }
}


  else if (lowerCmd.startsWith("new-entry")) {
    const entryText = cmd.substring(10).trim();
    if (!entryText) {
      response.textContent = "⚠️ Please provide entry text!";
    } else {
      
      const date = new Date().toISOString().split("T")[0];
      let entries = JSON.parse(localStorage.getItem("entries")) || {};

      if(entries[date]){
        entries[date] += "\n" + entryText;
        response.textContent=`✏️ Entry added to ${date}`;
      }
      else{
        entries[date] = entryText;
        response.textContent= `✏️ New Entry added to ${date}`;
      }

      localStorage.setItem("entries", JSON.stringify(entries));

    }
  }

  else if (lowerCmd === "clear") {
    output.innerHTML = "";
    return;
  }

  else {
    response.textContent = "Unknown command. Try 'help'";
  }

  output.appendChild(response);
  output.scrollTop = output.scrollHeight;
}
