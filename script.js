const API_KEY = "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":

/* SEND MESSAGE */

async function sendMessage(){

  const input =
    document.getElementById("userInput");

  const chatbox =
    document.getElementById("chatbox");

  const text = input.value;

  if(text.trim() === "") return;

  addMessage(text, "user");

  input.value = "";

  try{

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method:"POST",

        headers:{
          "Content-Type":"application/json",
          "Authorization":"Bearer " + API_KEY
        },

        body:JSON.stringify({
          model:"gpt-4.1-mini",

          messages:[
            {
              role:"system",
              content:
              "You are Friday, a futuristic smart AI assistant like Jarvis."
            },

            {
              role:"user",
              content:text
            }
          ]
        })
      }
    );

    const data = await response.json();

    const reply =
      data.choices[0].message.content;

    addMessage(reply, "bot");

  }catch(error){

    addMessage(
      "Error connecting to AI.",
      "bot"
    );
  }
}

/* ADD MESSAGE */

function addMessage(text, sender){

  const chatbox =
    document.getElementById("chatbox");

  const message =
    document.createElement("div");

  message.classList.add(
    "message",
    sender
  );

  message.innerText = text;

  chatbox.appendChild(message);

  chatbox.scrollTop =
    chatbox.scrollHeight;
}

/* MENU */

const menuBtn =
  document.getElementById("menuBtn");

const menu =
  document.getElementById("menu");

menuBtn.addEventListener(
  "click",
  () => {
    menu.classList.toggle("hidden");
  }
);

/* ENTER KEY */

document
.getElementById("userInput")
.addEventListener(
  "keypress",
  function(event){

    if(event.key === "Enter"){
      sendMessage();
    }
  }
);
