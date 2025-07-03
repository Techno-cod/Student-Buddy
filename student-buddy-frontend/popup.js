document.getElementById('hintBtn').addEventListener('click', () => {
  const chat = document.getElementById('chat');
  const loading = document.getElementById('loading');
  loading.innerText = "Thinking...";

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: () => {
        const lineElements = document.querySelectorAll('.view-lines .view-line');
        if (lineElements.length > 0) {
          const lines = Array.from(lineElements).map(line => line.innerText);
          return lines.reverse().join('\n');
        }
        return null;
      }
    }, (results) => {
      const userCode = results[0].result;
      if (!userCode) {
        loading.innerText = "";
        appendMessage("No code found. Are you on a LeetCode editor?", "bot");
        return;
      }

      appendMessage("Here’s the code I’m stuck at 👇\n" + userCode.slice(0, 200) + "...", "user");
      // Show typing indicator
       const typingBubble = document.createElement('div');
       typingBubble.className = 'bubble bot';
       typingBubble.id = 'typingIndicator';
       typingBubble.innerHTML = `Typing<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span>`;
       document.getElementById('chat').appendChild(typingBubble);
 

      fetch("http://localhost:8000/get-hint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: userCode })
      })
      .then(res => res.json())
      .then(data => {
        const typing = document.getElementById("typingIndicator");
        if (typing) typing.remove();
        loading.innerText = "";
        appendMessage(data.hint || data.error || "No response.", "bot");
      })
      .catch(err => {
        loading.innerText = "";
        appendMessage("Error contacting backend: " + err.message, "bot");
      });
    });
  });
});

document.getElementById('clearBtn').addEventListener('click', () => {
  document.getElementById('chat').innerHTML = "";
  localStorage.removeItem("chatHistory");

  // Show welcome again after clearing
  appendMessage("👋 Hi! I’m Student Buddy.\nClick 'Get Hint' to get a logical step based on your code. (Currently using mock hints)", "bot");
});

window.addEventListener('DOMContentLoaded', () => {
  // Load chat history if any
  const history = JSON.parse(localStorage.getItem("chatHistory") || "[]");
  if (history.length === 0) {
    appendMessage("👋 Hi! I’m Student Buddy.\nClick 'Get Hint' to get a logical step based on your code. (Currently using mock hints)", "bot");
  } else {
    history.forEach(msg => appendMessage(msg.text, msg.sender));
  }
});


function appendMessage(text, sender) {
  const chat = document.getElementById('chat');
  const row = document.createElement('div');
  row.className = `chat-row ${sender}`;

  if (sender === "bot") {
    const avatar = document.createElement('div');
    avatar.className = 'avatar';
    avatar.innerText = '🤖';
    row.appendChild(avatar);
  }

  const bubble = document.createElement('div');
  bubble.className = `bubble ${sender}`;
  bubble.innerText = text;

  row.appendChild(bubble);

  chat.appendChild(row);
  chat.scrollTop = chat.scrollHeight;
}